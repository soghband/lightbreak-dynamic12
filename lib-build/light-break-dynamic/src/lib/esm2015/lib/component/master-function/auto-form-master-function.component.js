import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormHttpRequestService } from '../../service/form-http-request.service';
import { Subscription, timer } from 'rxjs';
import { LockScreenService } from '../../service/lock-screen.service';
export class AutoFormMasterFunctionComponent {
    constructor(httpRequest, lockScreen) {
        this.httpRequest = httpRequest;
        this.lockScreen = lockScreen;
        this.saveControlFunction = (mode, formName, param) => {
            return true;
        };
        this.refinedListData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedSaveData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedDeleteData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedMasterData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedListPayload = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedError = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedMasterDataPayload = (data, formName = "", provideData = null) => {
            return data;
        };
        this.provideData = {};
        this.formName = 'test';
        this.button = {
            add: "Add",
            save: "Save",
            clear: "Clear",
            reset: "Reset",
            search: "Search",
            confirm: "Confirm",
            cancel: "Cancel"
        };
        this.callback = new EventEmitter();
        this.subscription = new Subscription();
        this.order = [];
        this.mode = "add";
        this.form = {
            form: {},
            data: []
        };
        this.filterMode = "single";
        this.filter = {
            form: {
                option: {
                    mode: "add",
                    customClass: "",
                    labelAlign: "left",
                    enableAnimation: false
                },
                containerList: [
                    {
                        containerName: "singleFilter",
                        customClass: "",
                        columnSpan: "1/1",
                        fieldList: [
                            {
                                fieldName: "filter",
                                label: "Filter:",
                                columnPerLine: 1,
                                type: "textBox",
                                default: [
                                    ""
                                ],
                                inputPattern: ".*",
                                valuePattern: ".*",
                                validateWhileKeyPress: false,
                                multiValue: false,
                                note: "",
                                readonly: false,
                                require: false,
                                maxLength: 255,
                                labelWidth: 45
                            },
                        ]
                    }
                ]
            },
            data: []
        };
        this.model = {};
        this.dataList = {};
        this.config = {};
        this.page = 0;
        this.limit = 0;
        this.tempDelete = null;
        this.masterData = {};
        this.errorContent = "";
        this.tempFilter = null;
    }
    ngOnInit() {
        this.subscription.add(timer(100).subscribe(() => {
            this.getConfig();
        }));
    }
    getConfig() {
        let savedConfigRaw = localStorage.getItem("masterFormData");
        let savedConfig = null;
        let parseConfig = null;
        if (savedConfigRaw !== null) {
            parseConfig = JSON.parse(savedConfigRaw);
        }
        if (parseConfig && parseConfig[this.formName]) {
            savedConfig = parseConfig[this.formName];
        }
        let checkHash = this.httpRequest.getHash(this.formName);
        this.lockScreen.lockScreen();
        if (checkHash === null || savedConfig == null || (savedConfig && checkHash !== savedConfig.hash)) {
            this.subscription.add(this.httpRequest.getConfig(this.formName).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status && resp.status == true) {
                    this.config = resp.config;
                    let saveConfig = {
                        hash: checkHash,
                        config: this.config
                    };
                    if (!parseConfig) {
                        parseConfig = {};
                    }
                    parseConfig[this.formName] = saveConfig;
                    localStorage.setItem("masterFormData", JSON.stringify(parseConfig));
                    this.processConfig();
                }
            }));
        }
        else {
            this.config = savedConfig.config;
            this.processConfig();
        }
    }
    processConfig() {
        if (this.config.list) {
            this.dataList = this.config.list;
        }
        if (this.config.model) {
            this.model = this.config.model;
        }
        if (this.config.form) {
            this.form.form = this.config.form;
            this.subscription.add(timer(250).subscribe(() => {
                if (this.form.data.length == 0) {
                    this.dynamicForm.addRow();
                }
            }));
        }
        if (this.config.filterAdvance) {
            this.subscription.add(timer(250).subscribe(() => {
                let advanceFilter = {
                    containerName: "advanceFilter",
                    customClass: "hideFilter",
                    columnSpan: "1/1",
                    fieldList: this.config.filterAdvance.fieldList
                };
                this.filter.form.containerList.push(advanceFilter);
                this.filterForm.reRenderForm();
                this.filterForm.addRow();
                this.processLoadMasterData();
            }));
        }
        else {
            this.subscription.add(timer(500).subscribe(() => {
                this.filterForm.addRow();
                this.processLoadMasterData();
            }));
        }
        if (this.config.button) {
            this.button = this.config.button;
        }
    }
    processLoadMasterData() {
        if (this.config.masterData) {
            let payload = {
                dataList: []
            };
            for (let fieldName in this.config.masterData) {
                payload.dataList.push({
                    moduleName: this.config.masterData[fieldName]
                });
            }
            payload = this.refinedMasterDataPayload(payload, this.formName, this.provideData);
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp && resp.status == true) {
                    for (let fieldName in this.config.masterData) {
                        this.masterData[fieldName] = resp.data[this.config.masterData[fieldName]];
                    }
                    this.masterData = this.refinedMasterData(this.masterData, this.formName, this.provideData);
                    this.processAssignMasterData();
                }
                else {
                    alert("Error loading master data.");
                }
            }));
        }
    }
    processAssignMasterData() {
        let mapSetAttr = {};
        for (let fieldName in this.masterData) {
            mapSetAttr[fieldName] = {
                valueList: this.masterData[fieldName]
            };
        }
        this.dynamicForm.mapSetAttribute(mapSetAttr);
        this.filterForm.mapSetAttribute(mapSetAttr);
        this.processLoadList(1, (this.dataList.rowLimit ? this.dataList.rowLimit : 10), false);
    }
    processLoadList(page = 1, limit = 10, filter = true) {
        this.page = page;
        this.limit = limit;
        let filterParam = this.filterForm.getParam();
        if (this.config.module && this.config.module.list) {
            let payload = {
                moduleName: this.config.module.list,
                limit: limit,
                page: page
            };
            if (filter && this.filterMode == "single" && filterParam.filter && filterParam.filter.length > 0) {
                let param = {};
                for (let paramName of this.config.filter.paramList) {
                    param[paramName] = filterParam.filter;
                }
                payload["param"] = param;
                payload["condition"] = this.config.filter.condition;
            }
            else if (filter && this.filterMode == "multiple") {
                payload["param"] = filterParam;
                payload["condition"] = this.config.filterAdvance.condition;
            }
            if (this.order.length > 0) {
                payload["sort"] = this.order;
            }
            payload = this.refinedListPayload(payload, this.formName, this.provideData);
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    if (resp.data[this.config.module.list] && resp.data[this.config.module.list].length > 0) {
                        this.dataList.data = this.refinedListData(resp.data[this.config.module.list], this.formName, this.provideData);
                        this.dataList.pagination = resp.data[this.config.module.list + "Pagination"];
                    }
                    else {
                        if (this.page > 1) {
                            this.page--;
                            this.dynamicTable.currentPage = this.page;
                            this.processLoadList(this.page, this.limit);
                        }
                        else {
                            this.dataList.data = null;
                            this.dataList.pagination = resp.data[this.config.module.list + "Pagination"];
                        }
                    }
                }
            }));
        }
    }
    processListCallback(e) {
        if (e.action == 'page') {
            this.processLoadList(e.pageNumber, e.limit);
        }
        else if (e.action == 'edit') {
            this.loadEditData(e.primaryKey);
        }
        else if (e.action == 'delete') {
            this.tempDelete = e.primaryKey;
            this.confirmPopUp.showPopup();
        }
        else if (e.action == "sort") {
            this.order = [];
            this.order.push({
                fieldName: e.fieldName,
                order: e.order
            });
            this.processLoadList(this.page, this.limit);
        }
        this.callback.emit({
            event: "listEvent",
            formName: this.formName,
            data: e
        });
    }
    confirmDelete() {
        this.processDeleteData(this.tempDelete);
        this.confirmPopUp.closePopup(true);
    }
    processDeleteData(primaryKey) {
        if (this.config.module && this.config.module.delete) {
            let refinedData = this.refinedDeleteData(primaryKey, this.formName, this.provideData);
            let payload = {
                moduleName: this.config.module.delete,
                param: refinedData
            };
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    this.processLoadList(this.page, this.limit);
                    this.callback.emit({
                        event: "deleteSuccess",
                        formName: this.formName,
                        data: primaryKey
                    });
                }
                else {
                    alert("Can't load delete data.");
                }
            }));
        }
    }
    openAddForm() {
        this.mode = 'add';
        this.dynamicForm.setMode('add');
        this.dynamicForm.setDefault();
        this.formPopUp.showPopup();
        this.callback.emit({
            event: "addOpen",
            formName: this.formName,
            data: null
        });
    }
    loadEditData(primaryKey) {
        if (this.config.module && this.config.module.list) {
            let payload = {
                moduleName: this.config.module.list,
                param: primaryKey
            };
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    let mapSet = resp.data[this.config.module.list][0];
                    this.mode = 'edit';
                    this.dynamicForm.setMode('edit');
                    this.dynamicForm.mapSetValue(mapSet, 0);
                    this.dynamicForm.setSavePoint();
                    this.formPopUp.showPopup();
                    this.callback.emit({
                        event: "editOpen",
                        formName: this.formName,
                        data: null
                    });
                }
                else {
                    alert("Can't load edit data.");
                }
            }));
        }
    }
    clearForm() {
        this.dynamicForm.setDefault();
    }
    resetForm() {
        this.dynamicForm.getSavePoint();
    }
    save() {
        let param = this.refinedSaveData(this.dynamicForm.getParam(), this.formName, this.provideData);
        if (this.dynamicForm.checkRequireAll() && this.dynamicForm.checkValidateAll() && this.saveControlFunction(this.mode, this.formName, param)) {
            let payload = {};
            if (this.mode == 'add' && this.config.module.add) {
                payload = {
                    moduleName: this.config.module.add,
                    param
                };
            }
            else if (this.mode == 'edit' && this.config.module.edit) {
                payload = {
                    moduleName: this.config.module.edit,
                    param
                };
            }
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp && resp.status == true) {
                    this.clearFilter();
                    this.processLoadList(this.page, this.limit);
                    this.formPopUp.closePopup(true);
                    this.callback.emit({
                        event: "saveSuccess",
                        formName: this.formName,
                        data: null
                    });
                }
                else {
                    alert("Error can't save data.");
                }
            }, (error) => {
                this.lockScreen.unLockScreen();
                this.processError(error);
            }));
        }
    }
    switchFilterMode() {
        if (this.filterMode === "single") {
            this.filterMode = "multiple";
            if (this.config.filterAdvance.option && this.config.filterAdvance.option.labelAlign) {
                this.filter.form.option.labelAlign = this.config.filterAdvance.option.labelAlign;
            }
            this.filterForm.setContainerAttribute("singleFilter", "customClass", "hideFilter");
            this.filterForm.setContainerAttribute("advanceFilter", "customClass", "");
        }
        else {
            this.filter.form.option.labelAlign = "left";
            this.filterMode = "single";
            this.filterForm.setContainerAttribute("singleFilter", "customClass", "");
            this.filterForm.setContainerAttribute("advanceFilter", "customClass", "hideFilter");
        }
    }
    processFilter() {
        let param = this.filterForm.getParam();
        if (JSON.stringify(this.tempFilter) !== JSON.stringify(param)) {
            this.tempFilter = param;
            this.page = 1;
            this.dynamicTable.currentPage = 1;
        }
        this.processLoadList(this.page, this.limit);
    }
    clearFilter() {
        this.filterForm.setDefault();
        this.processFilter();
    }
    actKnownError() {
        this.errorPopUp.closePopup(true);
    }
    processError(error) {
        error = this.refinedError(error, this.formName, this.provideData);
        let errorMsg = "";
        if (error.error.message) {
            if (typeof (error.error.message) === "object" && error.error.message.length > 0) {
                let errorArray = [];
                for (let errorDataRow of error.error.message) {
                    if (typeof (errorDataRow) === "object") {
                        errorArray.push(JSON.stringify(errorDataRow));
                    }
                    else if (typeof (errorDataRow) === "string") {
                        errorArray.push(errorDataRow);
                    }
                }
                errorMsg = errorArray.join("<br>");
            }
            else {
                errorMsg = error.error.message;
            }
        }
        else {
            errorMsg = error.message;
        }
        this.errorContent = errorMsg;
        this.errorPopUp.showPopup();
    }
    check() {
        console.log(this.form);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AutoFormMasterFunctionComponent.decorators = [
    { type: Component, args: [{
                template: ''
            },] }
];
AutoFormMasterFunctionComponent.ctorParameters = () => [
    { type: FormHttpRequestService },
    { type: LockScreenService }
];
AutoFormMasterFunctionComponent.propDecorators = {
    formPopUp: [{ type: ViewChild, args: ["formPopUp",] }],
    confirmPopUp: [{ type: ViewChild, args: ["confirmPopUp",] }],
    errorPopUp: [{ type: ViewChild, args: ["errorPopUp",] }],
    dynamicForm: [{ type: ViewChild, args: ["dynamicForm",] }],
    filterForm: [{ type: ViewChild, args: ["filterForm",] }],
    dynamicTable: [{ type: ViewChild, args: ["dynamicTable",] }],
    saveControlFunction: [{ type: Input }],
    refinedListData: [{ type: Input }],
    refinedSaveData: [{ type: Input }],
    refinedDeleteData: [{ type: Input }],
    refinedMasterData: [{ type: Input }],
    refinedListPayload: [{ type: Input }],
    refinedError: [{ type: Input }],
    refinedMasterDataPayload: [{ type: Input }],
    provideData: [{ type: Input }],
    formName: [{ type: Input }],
    button: [{ type: Input }],
    callback: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb3JtLW1hc3Rlci1mdW5jdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L21hc3Rlci1mdW5jdGlvbi9hdXRvLWZvcm0tbWFzdGVyLWZ1bmN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUl6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUtwRSxNQUFNLE9BQU8sK0JBQStCO0lBbUczQyxZQUFvQixXQUFtQyxFQUFVLFVBQTZCO1FBQTFFLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBNUZyRix3QkFBbUIsR0FBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7UUFDUSxvQkFBZSxHQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBQyxFQUFFLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxFQUFFO1lBQzlFLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBO1FBQ1Esb0JBQWUsR0FBYSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUMsRUFBRSxFQUFFLFdBQVcsR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUM5RSxPQUFPLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQTtRQUNRLHNCQUFpQixH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QUN4QixTQUFTLFNBQUMsWUFBWTswQkFDdEIsU0FBUyxTQUFDLGFBQWE7eUJBQ3ZCLFNBQVMsU0FBQyxZQUFZOzJCQUN0QixTQUFTLFNBQUMsY0FBYztrQ0FDeEIsS0FBSzs4QkFHTCxLQUFLOzhCQUdMLEtBQUs7Z0NBR0wsS0FBSztnQ0FHTCxLQUFLO2lDQUdMLEtBQUs7MkJBR0wsS0FBSzt1Q0FHTCxLQUFLOzBCQUdMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO3VCQVNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtGb3JtSHR0cFJlcXVlc3RTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2Zvcm0taHR0cC1yZXF1ZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRlbnRQb3B1cENvbXBvbmVudH0gZnJvbSAnLi4vY29udGVudC1wb3B1cC9jb250ZW50LXBvcHVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RHluYW1pY0Zvcm1Db21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHtEeW5hbWljVGFibGVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtdGFibGUvZHluYW1pYy10YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0xvY2tTY3JlZW5TZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2xvY2stc2NyZWVuLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGU6ICcnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b0Zvcm1NYXN0ZXJGdW5jdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFwiZm9ybVBvcFVwXCIpIGZvcm1Qb3BVcDogQ29udGVudFBvcHVwQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJjb25maXJtUG9wVXBcIikgY29uZmlybVBvcFVwOiBDb250ZW50UG9wdXBDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImVycm9yUG9wVXBcIikgZXJyb3JQb3BVcDogQ29udGVudFBvcHVwQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJkeW5hbWljRm9ybVwiKSBkeW5hbWljRm9ybTogRHluYW1pY0Zvcm1Db21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImZpbHRlckZvcm1cIikgZmlsdGVyRm9ybTogRHluYW1pY0Zvcm1Db21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImR5bmFtaWNUYWJsZVwiKSBkeW5hbWljVGFibGU6IER5bmFtaWNUYWJsZUNvbXBvbmVudDtcclxuXHRASW5wdXQoKSBzYXZlQ29udHJvbEZ1bmN0aW9uOiBGdW5jdGlvbiA9IChtb2RlLCBmb3JtTmFtZSwgcGFyYW0pID0+IHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRASW5wdXQoKSByZWZpbmVkTGlzdERhdGE6IEZ1bmN0aW9uID0gKGRhdGEsIGZvcm1OYW1lPVwiXCIsIHByb3ZpZGVEYXRhID0gbnVsbCkgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHJlZmluZWRTYXZlRGF0YTogRnVuY3Rpb24gPSAoZGF0YSwgZm9ybU5hbWU9XCJcIiwgcHJvdmlkZURhdGEgPSBudWxsKSA9PiB7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblx0QElucHV0KCkgcmVmaW5lZERlbGV0ZURhdGE6IEZ1bmN0aW9uID0gKGRhdGEsIGZvcm1OYW1lPVwiXCIsIHByb3ZpZGVEYXRhID0gbnVsbCkgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHJlZmluZWRNYXN0ZXJEYXRhOiBGdW5jdGlvbiA9IChkYXRhLCBmb3JtTmFtZT1cIlwiLCBwcm92aWRlRGF0YSA9IG51bGwpID0+IHtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHRASW5wdXQoKSByZWZpbmVkTGlzdFBheWxvYWQ6IEZ1bmN0aW9uID0gKGRhdGEsIGZvcm1OYW1lPVwiXCIsIHByb3ZpZGVEYXRhID0gbnVsbCkgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHJlZmluZWRFcnJvcjogRnVuY3Rpb24gPSAoZGF0YSwgZm9ybU5hbWU9XCJcIiwgcHJvdmlkZURhdGEgPSBudWxsKSA9PiB7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblx0QElucHV0KCkgcmVmaW5lZE1hc3RlckRhdGFQYXlsb2FkOiBGdW5jdGlvbiA9IChkYXRhLCBmb3JtTmFtZT1cIlwiLCBwcm92aWRlRGF0YSA9IG51bGwpID0+IHtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHRASW5wdXQoKSBwcm92aWRlRGF0YSA9IHt9O1xyXG5cdEBJbnB1dCgpIGZvcm1OYW1lID0gJ3Rlc3QnO1xyXG5cdEBJbnB1dCgpIGJ1dHRvbiA9IHtcclxuXHRcdGFkZDogXCJBZGRcIixcclxuXHRcdHNhdmU6IFwiU2F2ZVwiLFxyXG5cdFx0Y2xlYXI6IFwiQ2xlYXJcIixcclxuXHRcdHJlc2V0OiBcIlJlc2V0XCIsXHJcblx0XHRzZWFyY2g6IFwiU2VhcmNoXCIsXHJcblx0XHRjb25maXJtOiBcIkNvbmZpcm1cIixcclxuXHRcdGNhbmNlbDogXCJDYW5jZWxcIlxyXG5cdH1cclxuXHRAT3V0cHV0KCkgY2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHRwcml2YXRlIHN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHRvcmRlciA9IFtdO1xyXG5cdG1vZGUgPSBcImFkZFwiO1xyXG5cdGZvcm06YW55ID0ge1xyXG5cdFx0Zm9ybToge30sXHJcblx0XHRkYXRhOiBbXVxyXG5cdH07XHJcblx0ZmlsdGVyTW9kZSA9IFwic2luZ2xlXCI7XHJcblx0ZmlsdGVyOmFueSA9IHtcclxuXHRcdGZvcm06IHtcclxuXHRcdFx0b3B0aW9uOiB7XHJcblx0XHRcdFx0bW9kZTogXCJhZGRcIixcclxuXHRcdFx0XHRjdXN0b21DbGFzczogXCJcIixcclxuXHRcdFx0XHRsYWJlbEFsaWduOiBcImxlZnRcIixcclxuXHRcdFx0XHRlbmFibGVBbmltYXRpb246IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRhaW5lckxpc3Q6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb250YWluZXJOYW1lOiBcInNpbmdsZUZpbHRlclwiLFxyXG5cdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwiXCIsXHJcblx0XHRcdFx0XHRjb2x1bW5TcGFuOiBcIjEvMVwiLFxyXG5cdFx0XHRcdFx0ZmllbGRMaXN0OiBbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRmaWVsZE5hbWU6IFwiZmlsdGVyXCIsXHJcblx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiRmlsdGVyOlwiLFxyXG5cdFx0XHRcdFx0XHRcdGNvbHVtblBlckxpbmU6IDEsXHJcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0ZXh0Qm94XCIsXHJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDogW1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJcIlxyXG5cdFx0XHRcdFx0XHRcdF0sXHJcblx0XHRcdFx0XHRcdFx0aW5wdXRQYXR0ZXJuOiBcIi4qXCIsXHJcblx0XHRcdFx0XHRcdFx0dmFsdWVQYXR0ZXJuOiBcIi4qXCIsXHJcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVXaGlsZUtleVByZXNzOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRtdWx0aVZhbHVlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRub3RlOiBcIlwiLFxyXG5cdFx0XHRcdFx0XHRcdHJlYWRvbmx5OiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRyZXF1aXJlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRtYXhMZW5ndGg6IDI1NSxcclxuXHRcdFx0XHRcdFx0XHRsYWJlbFdpZHRoOiA0NVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fSxcclxuXHRcdGRhdGE6IFtdXHJcblx0fVxyXG5cdG1vZGVsOmFueSA9IHt9XHJcblx0ZGF0YUxpc3Q6YW55ID0ge307XHJcblx0Y29uZmlnOmFueSA9IHt9O1xyXG5cdHBhZ2UgPSAwO1xyXG5cdGxpbWl0ID0gMDtcclxuXHR0ZW1wRGVsZXRlID0gbnVsbDtcclxuXHRtYXN0ZXJEYXRhOmFueSA9IHt9O1xyXG5cdGVycm9yQ29udGVudCA9IFwiXCI7XHJcblx0cHJpdmF0ZSB0ZW1wRmlsdGVyID0gbnVsbDtcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBSZXF1ZXN0OiBGb3JtSHR0cFJlcXVlc3RTZXJ2aWNlLCBwcml2YXRlIGxvY2tTY3JlZW46IExvY2tTY3JlZW5TZXJ2aWNlKSB7XHJcblx0fVxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpPT4ge1xyXG5cdFx0XHR0aGlzLmdldENvbmZpZygpO1xyXG5cdFx0fSkpXHJcblx0fVxyXG5cdGdldENvbmZpZygpIHtcclxuXHRcdGxldCBzYXZlZENvbmZpZ1JhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWFzdGVyRm9ybURhdGFcIilcclxuXHRcdGxldCBzYXZlZENvbmZpZyA9IG51bGw7XHJcblx0XHRsZXQgcGFyc2VDb25maWcgPSBudWxsO1xyXG5cdFx0aWYgKHNhdmVkQ29uZmlnUmF3ICE9PSBudWxsKSB7XHJcblx0XHRcdHBhcnNlQ29uZmlnID0gSlNPTi5wYXJzZShzYXZlZENvbmZpZ1Jhdyk7XHJcblx0XHR9XHJcblx0XHRpZiAocGFyc2VDb25maWcgJiYgcGFyc2VDb25maWdbdGhpcy5mb3JtTmFtZV0pIHtcclxuXHRcdFx0c2F2ZWRDb25maWcgPSBwYXJzZUNvbmZpZ1t0aGlzLmZvcm1OYW1lXVxyXG5cdFx0fVxyXG5cdFx0bGV0IGNoZWNrSGFzaCA9IHRoaXMuaHR0cFJlcXVlc3QuZ2V0SGFzaCh0aGlzLmZvcm1OYW1lKTtcclxuXHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdGlmIChjaGVja0hhc2ggPT09IG51bGwgfHwgc2F2ZWRDb25maWcgPT0gbnVsbCB8fCAoc2F2ZWRDb25maWcgJiYgY2hlY2tIYXNoICE9PSBzYXZlZENvbmZpZy5oYXNoKSkge1xyXG5cdFx0XHR0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5odHRwUmVxdWVzdC5nZXRDb25maWcodGhpcy5mb3JtTmFtZSkuc3Vic2NyaWJlKChyZXNwOmFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMubG9ja1NjcmVlbi51bkxvY2tTY3JlZW4oKVxyXG5cdFx0XHRcdGlmIChyZXNwLnN0YXR1cyAmJiByZXNwLnN0YXR1cyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNvbmZpZyA9IHJlc3AuY29uZmlnO1xyXG5cdFx0XHRcdFx0bGV0IHNhdmVDb25maWcgPSB7XHJcblx0XHRcdFx0XHRcdGhhc2g6IGNoZWNrSGFzaCxcclxuXHRcdFx0XHRcdFx0Y29uZmlnOiB0aGlzLmNvbmZpZ1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCFwYXJzZUNvbmZpZykge1xyXG5cdFx0XHRcdFx0XHRwYXJzZUNvbmZpZyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwYXJzZUNvbmZpZ1t0aGlzLmZvcm1OYW1lXSA9IHNhdmVDb25maWc7XHJcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm1hc3RlckZvcm1EYXRhXCIsIEpTT04uc3RyaW5naWZ5KHBhcnNlQ29uZmlnKSk7XHJcblx0XHRcdFx0XHR0aGlzLnByb2Nlc3NDb25maWcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb25maWcgPSBzYXZlZENvbmZpZy5jb25maWc7XHJcblx0XHRcdHRoaXMucHJvY2Vzc0NvbmZpZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzQ29uZmlnKCkge1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmxpc3QpIHtcclxuXHRcdFx0dGhpcy5kYXRhTGlzdCA9IHRoaXMuY29uZmlnLmxpc3RcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5tb2RlbCkge1xyXG5cdFx0XHR0aGlzLm1vZGVsID0gdGhpcy5jb25maWcubW9kZWxcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5mb3JtKSB7XHJcblx0XHRcdHRoaXMuZm9ybS5mb3JtID0gdGhpcy5jb25maWcuZm9ybTtcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRpbWVyKDI1MCkuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5mb3JtLmRhdGEubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHRcdHRoaXMuZHluYW1pY0Zvcm0uYWRkUm93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5maWx0ZXJBZHZhbmNlKSB7XHJcblx0XHRcdHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aW1lcigyNTApLnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0bGV0IGFkdmFuY2VGaWx0ZXIgPSB7XHJcblx0XHRcdFx0XHRjb250YWluZXJOYW1lOiBcImFkdmFuY2VGaWx0ZXJcIixcclxuXHRcdFx0XHRcdGN1c3RvbUNsYXNzOiBcImhpZGVGaWx0ZXJcIixcclxuXHRcdFx0XHRcdGNvbHVtblNwYW46IFwiMS8xXCIsXHJcblx0XHRcdFx0XHRmaWVsZExpc3Q6IHRoaXMuY29uZmlnLmZpbHRlckFkdmFuY2UuZmllbGRMaXN0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuZmlsdGVyLmZvcm0uY29udGFpbmVyTGlzdC5wdXNoKGFkdmFuY2VGaWx0ZXIpXHJcblx0XHRcdFx0dGhpcy5maWx0ZXJGb3JtLnJlUmVuZGVyRm9ybSgpXHJcblx0XHRcdFx0dGhpcy5maWx0ZXJGb3JtLmFkZFJvdygpO1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc0xvYWRNYXN0ZXJEYXRhKCk7XHJcblx0XHRcdH0pKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRpbWVyKDUwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmZpbHRlckZvcm0uYWRkUm93KCk7XHJcblx0XHRcdFx0dGhpcy5wcm9jZXNzTG9hZE1hc3RlckRhdGEoKTtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5jb25maWcuYnV0dG9uKSB7XHJcblx0XHRcdHRoaXMuYnV0dG9uID0gdGhpcy5jb25maWcuYnV0dG9uXHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NMb2FkTWFzdGVyRGF0YSgpIHtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5tYXN0ZXJEYXRhKSB7XHJcblx0XHRcdGxldCBwYXlsb2FkID0ge1xyXG5cdFx0XHRcdGRhdGFMaXN0OiBbXVxyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBpbiB0aGlzLmNvbmZpZy5tYXN0ZXJEYXRhKSB7XHJcblx0XHRcdFx0cGF5bG9hZC5kYXRhTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1hc3RlckRhdGFbZmllbGROYW1lXVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0cGF5bG9hZCA9IHRoaXMucmVmaW5lZE1hc3RlckRhdGFQYXlsb2FkKHBheWxvYWQsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHR0aGlzLmxvY2tTY3JlZW4ubG9ja1NjcmVlbigpXHJcblx0XHRcdHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmh0dHBSZXF1ZXN0LnBvc3QocGF5bG9hZCkuc3Vic2NyaWJlKChyZXNwOmFueSk9PiB7XHJcblx0XHRcdFx0dGhpcy5sb2NrU2NyZWVuLnVuTG9ja1NjcmVlbigpXHJcblx0XHRcdFx0aWYgKHJlc3AgJiYgcmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIHRoaXMuY29uZmlnLm1hc3RlckRhdGEpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5tYXN0ZXJEYXRhW2ZpZWxkTmFtZV0gPSByZXNwLmRhdGFbdGhpcy5jb25maWcubWFzdGVyRGF0YVtmaWVsZE5hbWVdXVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5tYXN0ZXJEYXRhID0gdGhpcy5yZWZpbmVkTWFzdGVyRGF0YSh0aGlzLm1hc3RlckRhdGEsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9jZXNzQXNzaWduTWFzdGVyRGF0YSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydChcIkVycm9yIGxvYWRpbmcgbWFzdGVyIGRhdGEuXCIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvY2Vzc0Fzc2lnbk1hc3RlckRhdGEoKSB7XHJcblx0XHRsZXQgbWFwU2V0QXR0ciA9IHt9O1xyXG5cdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIHRoaXMubWFzdGVyRGF0YSkge1xyXG5cdFx0XHRtYXBTZXRBdHRyW2ZpZWxkTmFtZV0gPSB7XHJcblx0XHRcdFx0dmFsdWVMaXN0OiB0aGlzLm1hc3RlckRhdGFbZmllbGROYW1lXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmR5bmFtaWNGb3JtLm1hcFNldEF0dHJpYnV0ZShtYXBTZXRBdHRyKTtcclxuXHRcdHRoaXMuZmlsdGVyRm9ybS5tYXBTZXRBdHRyaWJ1dGUobWFwU2V0QXR0cik7XHJcblx0XHR0aGlzLnByb2Nlc3NMb2FkTGlzdCgxLCAodGhpcy5kYXRhTGlzdC5yb3dMaW1pdCA/IHRoaXMuZGF0YUxpc3Qucm93TGltaXQgOiAxMCksIGZhbHNlKVxyXG5cdH1cclxuXHRwcm9jZXNzTG9hZExpc3QocGFnZSA9IDEsIGxpbWl0ID0gMTAsIGZpbHRlciA9IHRydWUpIHtcclxuXHRcdHRoaXMucGFnZSA9IHBhZ2U7XHJcblx0XHR0aGlzLmxpbWl0ID0gbGltaXQ7XHJcblx0XHRsZXQgZmlsdGVyUGFyYW06YW55ID0gdGhpcy5maWx0ZXJGb3JtLmdldFBhcmFtKCk7XHJcblx0XHRpZiAodGhpcy5jb25maWcubW9kdWxlICYmIHRoaXMuY29uZmlnLm1vZHVsZS5saXN0KSB7XHJcblx0XHRcdGxldCBwYXlsb2FkID0ge1xyXG5cdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1vZHVsZS5saXN0LFxyXG5cdFx0XHRcdGxpbWl0OiBsaW1pdCxcclxuXHRcdFx0XHRwYWdlOiBwYWdlXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGZpbHRlciAmJiB0aGlzLmZpbHRlck1vZGUgPT0gXCJzaW5nbGVcIiAmJiBmaWx0ZXJQYXJhbS5maWx0ZXIgJiYgZmlsdGVyUGFyYW0uZmlsdGVyLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRsZXQgcGFyYW0gPSB7fTtcclxuXHRcdFx0XHRmb3IgKGxldCBwYXJhbU5hbWUgb2YgdGhpcy5jb25maWcuZmlsdGVyLnBhcmFtTGlzdCkge1xyXG5cdFx0XHRcdFx0cGFyYW1bcGFyYW1OYW1lXSA9IGZpbHRlclBhcmFtLmZpbHRlcjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGF5bG9hZFtcInBhcmFtXCJdID0gcGFyYW1cclxuXHRcdFx0XHRwYXlsb2FkW1wiY29uZGl0aW9uXCJdID0gdGhpcy5jb25maWcuZmlsdGVyLmNvbmRpdGlvblxyXG5cdFx0XHR9IGVsc2UgaWYgKGZpbHRlciAmJiB0aGlzLmZpbHRlck1vZGUgPT0gXCJtdWx0aXBsZVwiKSB7XHJcblx0XHRcdFx0cGF5bG9hZFtcInBhcmFtXCJdID0gZmlsdGVyUGFyYW1cclxuXHRcdFx0XHRwYXlsb2FkW1wiY29uZGl0aW9uXCJdID0gdGhpcy5jb25maWcuZmlsdGVyQWR2YW5jZS5jb25kaXRpb25cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5vcmRlci5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0cGF5bG9hZFtcInNvcnRcIl0gPSB0aGlzLm9yZGVyXHJcblx0XHRcdH1cclxuXHRcdFx0cGF5bG9hZCA9IHRoaXMucmVmaW5lZExpc3RQYXlsb2FkKHBheWxvYWQsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpXHJcblx0XHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuaHR0cFJlcXVlc3QucG9zdChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKHJlc3AuZGF0YVt0aGlzLmNvbmZpZy5tb2R1bGUubGlzdF0gJiYgcmVzcC5kYXRhW3RoaXMuY29uZmlnLm1vZHVsZS5saXN0XS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YUxpc3QuZGF0YSA9IHRoaXMucmVmaW5lZExpc3REYXRhKHJlc3AuZGF0YVt0aGlzLmNvbmZpZy5tb2R1bGUubGlzdF0sIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGFMaXN0LnBhZ2luYXRpb24gPSByZXNwLmRhdGFbdGhpcy5jb25maWcubW9kdWxlLmxpc3QrXCJQYWdpbmF0aW9uXCJdXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5wYWdlID4gMSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wYWdlLS07XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5keW5hbWljVGFibGUuY3VycmVudFBhZ2UgPSB0aGlzLnBhZ2U7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9jZXNzTG9hZExpc3QodGhpcy5wYWdlLCB0aGlzLmxpbWl0KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhdGFMaXN0LmRhdGEgPSBudWxsXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhTGlzdC5wYWdpbmF0aW9uID0gcmVzcC5kYXRhW3RoaXMuY29uZmlnLm1vZHVsZS5saXN0K1wiUGFnaW5hdGlvblwiXVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NMaXN0Q2FsbGJhY2soZSkge1xyXG5cdFx0aWYgKGUuYWN0aW9uID09ICdwYWdlJykge1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NMb2FkTGlzdChlLnBhZ2VOdW1iZXIsIGUubGltaXQpO1xyXG5cdFx0fSBlbHNlIGlmIChlLmFjdGlvbiA9PSAnZWRpdCcpIHtcclxuXHRcdFx0dGhpcy5sb2FkRWRpdERhdGEoZS5wcmltYXJ5S2V5KTtcclxuXHRcdH0gZWxzZSBpZiAoZS5hY3Rpb24gPT0gJ2RlbGV0ZScpIHtcclxuXHRcdFx0dGhpcy50ZW1wRGVsZXRlID0gZS5wcmltYXJ5S2V5O1xyXG5cdFx0XHR0aGlzLmNvbmZpcm1Qb3BVcC5zaG93UG9wdXAoKTtcclxuXHRcdH0gZWxzZSBpZiAoZS5hY3Rpb24gPT0gXCJzb3J0XCIpIHtcclxuXHRcdFx0dGhpcy5vcmRlciA9IFtdO1xyXG5cdFx0XHR0aGlzLm9yZGVyLnB1c2goe1xyXG5cdFx0XHRcdGZpZWxkTmFtZTogZS5maWVsZE5hbWUsXHJcblx0XHRcdFx0b3JkZXI6IGUub3JkZXJcclxuXHRcdFx0fSlcclxuXHRcdFx0dGhpcy5wcm9jZXNzTG9hZExpc3QodGhpcy5wYWdlLCB0aGlzLmxpbWl0KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBcImxpc3RFdmVudFwiLFxyXG5cdFx0XHRmb3JtTmFtZTogdGhpcy5mb3JtTmFtZSxcclxuXHRcdFx0ZGF0YTogZVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Y29uZmlybURlbGV0ZSgpIHtcclxuXHRcdHRoaXMucHJvY2Vzc0RlbGV0ZURhdGEodGhpcy50ZW1wRGVsZXRlKTtcclxuXHRcdHRoaXMuY29uZmlybVBvcFVwLmNsb3NlUG9wdXAodHJ1ZSk7XHJcblx0fVxyXG5cdHByb2Nlc3NEZWxldGVEYXRhKHByaW1hcnlLZXkpIHtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5tb2R1bGUgJiYgdGhpcy5jb25maWcubW9kdWxlLmRlbGV0ZSkge1xyXG5cdFx0XHRsZXQgcmVmaW5lZERhdGEgPSB0aGlzLnJlZmluZWREZWxldGVEYXRhKHByaW1hcnlLZXksIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHRsZXQgcGF5bG9hZCA9IHtcclxuXHRcdFx0XHRtb2R1bGVOYW1lOiB0aGlzLmNvbmZpZy5tb2R1bGUuZGVsZXRlLFxyXG5cdFx0XHRcdHBhcmFtOiByZWZpbmVkRGF0YVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuaHR0cFJlcXVlc3QucG9zdChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9jZXNzTG9hZExpc3QodGhpcy5wYWdlLHRoaXMubGltaXQpO1xyXG5cdFx0XHRcdFx0dGhpcy5jYWxsYmFjay5lbWl0KHtcclxuXHRcdFx0XHRcdFx0ZXZlbnQ6IFwiZGVsZXRlU3VjY2Vzc1wiLFxyXG5cdFx0XHRcdFx0XHRmb3JtTmFtZTogdGhpcy5mb3JtTmFtZSxcclxuXHRcdFx0XHRcdFx0ZGF0YTogcHJpbWFyeUtleVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnQoXCJDYW4ndCBsb2FkIGRlbGV0ZSBkYXRhLlwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKTtcclxuXHRcdH1cclxuXHR9XHJcblx0b3BlbkFkZEZvcm0oKSB7XHJcblx0XHR0aGlzLm1vZGUgPSAnYWRkJztcclxuXHRcdHRoaXMuZHluYW1pY0Zvcm0uc2V0TW9kZSgnYWRkJyk7XHJcblx0XHR0aGlzLmR5bmFtaWNGb3JtLnNldERlZmF1bHQoKTtcclxuXHRcdHRoaXMuZm9ybVBvcFVwLnNob3dQb3B1cCgpXHJcblx0XHR0aGlzLmNhbGxiYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogXCJhZGRPcGVuXCIsXHJcblx0XHRcdGZvcm1OYW1lOiB0aGlzLmZvcm1OYW1lLFxyXG5cdFx0XHRkYXRhOiBudWxsXHJcblx0XHR9KVxyXG5cdH1cclxuXHRsb2FkRWRpdERhdGEocHJpbWFyeUtleSkge1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLm1vZHVsZSAmJiB0aGlzLmNvbmZpZy5tb2R1bGUubGlzdCkge1xyXG5cdFx0XHRsZXQgcGF5bG9hZCA9IHtcclxuXHRcdFx0XHRtb2R1bGVOYW1lOiB0aGlzLmNvbmZpZy5tb2R1bGUubGlzdCxcclxuXHRcdFx0XHRwYXJhbTogcHJpbWFyeUtleVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuaHR0cFJlcXVlc3QucG9zdChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0bGV0IG1hcFNldCA9IHJlc3AuZGF0YVt0aGlzLmNvbmZpZy5tb2R1bGUubGlzdF1bMF07XHJcblx0XHRcdFx0XHR0aGlzLm1vZGUgPSAnZWRpdCc7XHJcblx0XHRcdFx0XHR0aGlzLmR5bmFtaWNGb3JtLnNldE1vZGUoJ2VkaXQnKTtcclxuXHRcdFx0XHRcdHRoaXMuZHluYW1pY0Zvcm0ubWFwU2V0VmFsdWUobWFwU2V0LCAwKTtcclxuXHRcdFx0XHRcdHRoaXMuZHluYW1pY0Zvcm0uc2V0U2F2ZVBvaW50KCk7XHJcblx0XHRcdFx0XHR0aGlzLmZvcm1Qb3BVcC5zaG93UG9wdXAoKTtcclxuXHRcdFx0XHRcdHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcblx0XHRcdFx0XHRcdGV2ZW50OiBcImVkaXRPcGVuXCIsXHJcblx0XHRcdFx0XHRcdGZvcm1OYW1lOiB0aGlzLmZvcm1OYW1lLFxyXG5cdFx0XHRcdFx0XHRkYXRhOiBudWxsXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydChcIkNhbid0IGxvYWQgZWRpdCBkYXRhLlwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjbGVhckZvcm0oKSB7XHJcblx0XHR0aGlzLmR5bmFtaWNGb3JtLnNldERlZmF1bHQoKTtcclxuXHR9XHJcblx0cmVzZXRGb3JtKCkge1xyXG5cdFx0dGhpcy5keW5hbWljRm9ybS5nZXRTYXZlUG9pbnQoKTtcclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGxldCBwYXJhbSA9IHRoaXMucmVmaW5lZFNhdmVEYXRhKHRoaXMuZHluYW1pY0Zvcm0uZ2V0UGFyYW0oKSwgdGhpcy5mb3JtTmFtZSwgdGhpcy5wcm92aWRlRGF0YSk7XHJcblx0XHRpZiAodGhpcy5keW5hbWljRm9ybS5jaGVja1JlcXVpcmVBbGwoKSAmJiB0aGlzLmR5bmFtaWNGb3JtLmNoZWNrVmFsaWRhdGVBbGwoKSAmJiB0aGlzLnNhdmVDb250cm9sRnVuY3Rpb24odGhpcy5tb2RlLCB0aGlzLmZvcm1OYW1lLCBwYXJhbSkpIHtcclxuXHRcdFx0bGV0IHBheWxvYWQgPSB7fTtcclxuXHRcdFx0aWYgKHRoaXMubW9kZSA9PSAnYWRkJyAmJiB0aGlzLmNvbmZpZy5tb2R1bGUuYWRkKSB7XHJcblx0XHRcdFx0cGF5bG9hZCA9IHtcclxuXHRcdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1vZHVsZS5hZGQsXHJcblx0XHRcdFx0XHRwYXJhbVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm1vZGUgPT0gJ2VkaXQnICYmIHRoaXMuY29uZmlnLm1vZHVsZS5lZGl0KSB7XHJcblx0XHRcdFx0cGF5bG9hZCA9IHtcclxuXHRcdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1vZHVsZS5lZGl0LFxyXG5cdFx0XHRcdFx0cGFyYW1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5sb2NrU2NyZWVuLmxvY2tTY3JlZW4oKVxyXG5cdFx0XHR0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5odHRwUmVxdWVzdC5wb3N0KHBheWxvYWQpLnN1YnNjcmliZSgocmVzcDphbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcCAmJiByZXNwLnN0YXR1cyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNsZWFyRmlsdGVyKClcclxuXHRcdFx0XHRcdHRoaXMucHJvY2Vzc0xvYWRMaXN0KHRoaXMucGFnZSx0aGlzLmxpbWl0KVxyXG5cdFx0XHRcdFx0dGhpcy5mb3JtUG9wVXAuY2xvc2VQb3B1cCh0cnVlKTtcclxuXHRcdFx0XHRcdHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcblx0XHRcdFx0XHRcdGV2ZW50OiBcInNhdmVTdWNjZXNzXCIsXHJcblx0XHRcdFx0XHRcdGZvcm1OYW1lOiB0aGlzLmZvcm1OYW1lLFxyXG5cdFx0XHRcdFx0XHRkYXRhOiBudWxsXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydChcIkVycm9yIGNhbid0IHNhdmUgZGF0YS5cIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdHRoaXMubG9ja1NjcmVlbi51bkxvY2tTY3JlZW4oKVxyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc0Vycm9yKGVycm9yKTtcclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzd2l0Y2hGaWx0ZXJNb2RlKCkge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gXCJzaW5nbGVcIikge1xyXG5cdFx0XHR0aGlzLmZpbHRlck1vZGUgPSBcIm11bHRpcGxlXCJcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmZpbHRlckFkdmFuY2Uub3B0aW9uICYmIHRoaXMuY29uZmlnLmZpbHRlckFkdmFuY2Uub3B0aW9uLmxhYmVsQWxpZ24pIHtcclxuXHRcdFx0XHR0aGlzLmZpbHRlci5mb3JtLm9wdGlvbi5sYWJlbEFsaWduID0gdGhpcy5jb25maWcuZmlsdGVyQWR2YW5jZS5vcHRpb24ubGFiZWxBbGlnblxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZmlsdGVyRm9ybS5zZXRDb250YWluZXJBdHRyaWJ1dGUoXCJzaW5nbGVGaWx0ZXJcIixcImN1c3RvbUNsYXNzXCIsXCJoaWRlRmlsdGVyXCIpXHJcblx0XHRcdHRoaXMuZmlsdGVyRm9ybS5zZXRDb250YWluZXJBdHRyaWJ1dGUoXCJhZHZhbmNlRmlsdGVyXCIsXCJjdXN0b21DbGFzc1wiLFwiXCIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmZpbHRlci5mb3JtLm9wdGlvbi5sYWJlbEFsaWduID0gXCJsZWZ0XCJcclxuXHRcdFx0dGhpcy5maWx0ZXJNb2RlID0gXCJzaW5nbGVcIjtcclxuXHRcdFx0dGhpcy5maWx0ZXJGb3JtLnNldENvbnRhaW5lckF0dHJpYnV0ZShcInNpbmdsZUZpbHRlclwiLFwiY3VzdG9tQ2xhc3NcIixcIlwiKVxyXG5cdFx0XHR0aGlzLmZpbHRlckZvcm0uc2V0Q29udGFpbmVyQXR0cmlidXRlKFwiYWR2YW5jZUZpbHRlclwiLFwiY3VzdG9tQ2xhc3NcIixcImhpZGVGaWx0ZXJcIilcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvY2Vzc0ZpbHRlcigpIHtcclxuXHRcdGxldCBwYXJhbTphbnkgPSB0aGlzLmZpbHRlckZvcm0uZ2V0UGFyYW0oKVxyXG5cdFx0aWYgKEpTT04uc3RyaW5naWZ5KHRoaXMudGVtcEZpbHRlcikgIT09IEpTT04uc3RyaW5naWZ5KHBhcmFtKSkge1xyXG5cdFx0XHR0aGlzLnRlbXBGaWx0ZXIgPSBwYXJhbTtcclxuXHRcdFx0dGhpcy5wYWdlID0gMTtcclxuXHRcdFx0dGhpcy5keW5hbWljVGFibGUuY3VycmVudFBhZ2UgPSAxXHJcblx0XHR9XHJcblx0XHR0aGlzLnByb2Nlc3NMb2FkTGlzdCh0aGlzLnBhZ2UsIHRoaXMubGltaXQpO1xyXG5cdH1cclxuXHRjbGVhckZpbHRlcigpIHtcclxuXHRcdHRoaXMuZmlsdGVyRm9ybS5zZXREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnByb2Nlc3NGaWx0ZXIoKVxyXG5cdH1cclxuXHRhY3RLbm93bkVycm9yKCkge1xyXG5cdFx0dGhpcy5lcnJvclBvcFVwLmNsb3NlUG9wdXAodHJ1ZSk7XHJcblx0fVxyXG5cdHByb2Nlc3NFcnJvcihlcnJvcikge1xyXG5cdFx0ZXJyb3IgPSB0aGlzLnJlZmluZWRFcnJvcihlcnJvciAsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpXHJcblx0XHRsZXQgZXJyb3JNc2cgPSBcIlwiO1xyXG5cdFx0aWYgKGVycm9yLmVycm9yLm1lc3NhZ2UpIHtcclxuXHRcdFx0aWYgKHR5cGVvZihlcnJvci5lcnJvci5tZXNzYWdlKSA9PT0gXCJvYmplY3RcIiAmJiBlcnJvci5lcnJvci5tZXNzYWdlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRsZXQgZXJyb3JBcnJheSA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGVycm9yRGF0YVJvdyBvZiBlcnJvci5lcnJvci5tZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mKGVycm9yRGF0YVJvdykgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRcdFx0ZXJyb3JBcnJheS5wdXNoKEpTT04uc3RyaW5naWZ5KGVycm9yRGF0YVJvdykpXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZihlcnJvckRhdGFSb3cpID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHRcdGVycm9yQXJyYXkucHVzaChlcnJvckRhdGFSb3cpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVycm9yTXNnID0gZXJyb3JBcnJheS5qb2luKFwiPGJyPlwiKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVycm9yTXNnID0gZXJyb3IuZXJyb3IubWVzc2FnZVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlcnJvck1zZyA9IGVycm9yLm1lc3NhZ2VcclxuXHRcdH1cclxuXHRcdHRoaXMuZXJyb3JDb250ZW50ID0gZXJyb3JNc2dcclxuXHRcdHRoaXMuZXJyb3JQb3BVcC5zaG93UG9wdXAoKTtcclxuXHR9XHJcblx0Y2hlY2soKSB7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLmZvcm0pXHJcblx0fVxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxyXG5cdH1cclxufVxyXG4iXX0=