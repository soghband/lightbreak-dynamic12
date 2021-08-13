import { __decorate, __metadata, __values } from "tslib";
import { Component, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormHttpRequestService } from '../../service/form-http-request.service';
import { Subscription, timer } from 'rxjs';
import { ContentPopupComponent } from '../content-popup/content-popup.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import { LockScreenService } from '../../service/lock-screen.service';
var AutoFormMasterFunctionComponent = /** @class */ (function () {
    function AutoFormMasterFunctionComponent(httpRequest, lockScreen) {
        this.httpRequest = httpRequest;
        this.lockScreen = lockScreen;
        this.saveControlFunction = function (mode, formName, param) {
            return true;
        };
        this.refinedListData = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
            return data;
        };
        this.refinedSaveData = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
            return data;
        };
        this.refinedDeleteData = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
            return data;
        };
        this.refinedMasterData = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
            return data;
        };
        this.refinedListPayload = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
            return data;
        };
        this.refinedError = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
            return data;
        };
        this.refinedMasterDataPayload = function (data, formName, provideData) {
            if (formName === void 0) { formName = ""; }
            if (provideData === void 0) { provideData = null; }
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
    AutoFormMasterFunctionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(timer(100).subscribe(function () {
            _this.getConfig();
        }));
    };
    AutoFormMasterFunctionComponent.prototype.getConfig = function () {
        var _this = this;
        var savedConfigRaw = localStorage.getItem("masterFormData");
        var savedConfig = null;
        var parseConfig = null;
        if (savedConfigRaw !== null) {
            parseConfig = JSON.parse(savedConfigRaw);
        }
        if (parseConfig && parseConfig[this.formName]) {
            savedConfig = parseConfig[this.formName];
        }
        var checkHash = this.httpRequest.getHash(this.formName);
        this.lockScreen.lockScreen();
        if (checkHash === null || savedConfig == null || (savedConfig && checkHash !== savedConfig.hash)) {
            this.subscription.add(this.httpRequest.getConfig(this.formName).subscribe(function (resp) {
                _this.lockScreen.unLockScreen();
                if (resp.status && resp.status == true) {
                    _this.config = resp.config;
                    var saveConfig = {
                        hash: checkHash,
                        config: _this.config
                    };
                    if (!parseConfig) {
                        parseConfig = {};
                    }
                    parseConfig[_this.formName] = saveConfig;
                    localStorage.setItem("masterFormData", JSON.stringify(parseConfig));
                    _this.processConfig();
                }
            }));
        }
        else {
            this.config = savedConfig.config;
            this.processConfig();
        }
    };
    AutoFormMasterFunctionComponent.prototype.processConfig = function () {
        var _this = this;
        if (this.config.list) {
            this.dataList = this.config.list;
        }
        if (this.config.model) {
            this.model = this.config.model;
        }
        if (this.config.form) {
            this.form.form = this.config.form;
            this.subscription.add(timer(250).subscribe(function () {
                if (_this.form.data.length == 0) {
                    _this.dynamicForm.addRow();
                }
            }));
        }
        if (this.config.filterAdvance) {
            this.subscription.add(timer(250).subscribe(function () {
                var advanceFilter = {
                    containerName: "advanceFilter",
                    customClass: "hideFilter",
                    columnSpan: "1/1",
                    fieldList: _this.config.filterAdvance.fieldList
                };
                _this.filter.form.containerList.push(advanceFilter);
                _this.filterForm.reRenderForm();
                _this.filterForm.addRow();
                _this.processLoadMasterData();
            }));
        }
        else {
            this.subscription.add(timer(500).subscribe(function () {
                _this.filterForm.addRow();
                _this.processLoadMasterData();
            }));
        }
        if (this.config.button) {
            this.button = this.config.button;
        }
    };
    AutoFormMasterFunctionComponent.prototype.processLoadMasterData = function () {
        var _this = this;
        if (this.config.masterData) {
            var payload = {
                dataList: []
            };
            for (var fieldName in this.config.masterData) {
                payload.dataList.push({
                    moduleName: this.config.masterData[fieldName]
                });
            }
            payload = this.refinedMasterDataPayload(payload, this.formName, this.provideData);
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                _this.lockScreen.unLockScreen();
                if (resp && resp.status == true) {
                    for (var fieldName in _this.config.masterData) {
                        _this.masterData[fieldName] = resp.data[_this.config.masterData[fieldName]];
                    }
                    _this.masterData = _this.refinedMasterData(_this.masterData, _this.formName, _this.provideData);
                    _this.processAssignMasterData();
                }
                else {
                    alert("Error loading master data.");
                }
            }));
        }
    };
    AutoFormMasterFunctionComponent.prototype.processAssignMasterData = function () {
        var mapSetAttr = {};
        for (var fieldName in this.masterData) {
            mapSetAttr[fieldName] = {
                valueList: this.masterData[fieldName]
            };
        }
        this.dynamicForm.mapSetAttribute(mapSetAttr);
        this.filterForm.mapSetAttribute(mapSetAttr);
        this.processLoadList(1, (this.dataList.rowLimit ? this.dataList.rowLimit : 10), false);
    };
    AutoFormMasterFunctionComponent.prototype.processLoadList = function (page, limit, filter) {
        var e_1, _a;
        var _this = this;
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = true; }
        this.page = page;
        this.limit = limit;
        var filterParam = this.filterForm.getParam();
        if (this.config.module && this.config.module.list) {
            var payload = {
                moduleName: this.config.module.list,
                limit: limit,
                page: page
            };
            if (filter && this.filterMode == "single" && filterParam.filter && filterParam.filter.length > 0) {
                var param = {};
                try {
                    for (var _b = __values(this.config.filter.paramList), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var paramName = _c.value;
                        param[paramName] = filterParam.filter;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
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
            this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                _this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    if (resp.data[_this.config.module.list] && resp.data[_this.config.module.list].length > 0) {
                        _this.dataList.data = _this.refinedListData(resp.data[_this.config.module.list], _this.formName, _this.provideData);
                        _this.dataList.pagination = resp.data[_this.config.module.list + "Pagination"];
                    }
                    else {
                        if (_this.page > 1) {
                            _this.page--;
                            _this.dynamicTable.currentPage = _this.page;
                            _this.processLoadList(_this.page, _this.limit);
                        }
                        else {
                            _this.dataList.data = null;
                            _this.dataList.pagination = resp.data[_this.config.module.list + "Pagination"];
                        }
                    }
                }
            }));
        }
    };
    AutoFormMasterFunctionComponent.prototype.processListCallback = function (e) {
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
    };
    AutoFormMasterFunctionComponent.prototype.confirmDelete = function () {
        this.processDeleteData(this.tempDelete);
        this.confirmPopUp.closePopup(true);
    };
    AutoFormMasterFunctionComponent.prototype.processDeleteData = function (primaryKey) {
        var _this = this;
        if (this.config.module && this.config.module.delete) {
            var refinedData = this.refinedDeleteData(primaryKey, this.formName, this.provideData);
            var payload = {
                moduleName: this.config.module.delete,
                param: refinedData
            };
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                _this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    _this.processLoadList(_this.page, _this.limit);
                    _this.callback.emit({
                        event: "deleteSuccess",
                        formName: _this.formName,
                        data: primaryKey
                    });
                }
                else {
                    alert("Can't load delete data.");
                }
            }));
        }
    };
    AutoFormMasterFunctionComponent.prototype.openAddForm = function () {
        this.mode = 'add';
        this.dynamicForm.setMode('add');
        this.dynamicForm.setDefault();
        this.formPopUp.showPopup();
        this.callback.emit({
            event: "addOpen",
            formName: this.formName,
            data: null
        });
    };
    AutoFormMasterFunctionComponent.prototype.loadEditData = function (primaryKey) {
        var _this = this;
        if (this.config.module && this.config.module.list) {
            var payload = {
                moduleName: this.config.module.list,
                param: primaryKey
            };
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                _this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    var mapSet = resp.data[_this.config.module.list][0];
                    _this.mode = 'edit';
                    _this.dynamicForm.setMode('edit');
                    _this.dynamicForm.mapSetValue(mapSet, 0);
                    _this.dynamicForm.setSavePoint();
                    _this.formPopUp.showPopup();
                    _this.callback.emit({
                        event: "editOpen",
                        formName: _this.formName,
                        data: null
                    });
                }
                else {
                    alert("Can't load edit data.");
                }
            }));
        }
    };
    AutoFormMasterFunctionComponent.prototype.clearForm = function () {
        this.dynamicForm.setDefault();
    };
    AutoFormMasterFunctionComponent.prototype.resetForm = function () {
        this.dynamicForm.getSavePoint();
    };
    AutoFormMasterFunctionComponent.prototype.save = function () {
        var _this = this;
        var param = this.refinedSaveData(this.dynamicForm.getParam(), this.formName, this.provideData);
        if (this.dynamicForm.checkRequireAll() && this.dynamicForm.checkValidateAll() && this.saveControlFunction(this.mode, this.formName, param)) {
            var payload = {};
            if (this.mode == 'add' && this.config.module.add) {
                payload = {
                    moduleName: this.config.module.add,
                    param: param
                };
            }
            else if (this.mode == 'edit' && this.config.module.edit) {
                payload = {
                    moduleName: this.config.module.edit,
                    param: param
                };
            }
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                _this.lockScreen.unLockScreen();
                if (resp && resp.status == true) {
                    _this.clearFilter();
                    _this.processLoadList(_this.page, _this.limit);
                    _this.formPopUp.closePopup(true);
                    _this.callback.emit({
                        event: "saveSuccess",
                        formName: _this.formName,
                        data: null
                    });
                }
                else {
                    alert("Error can't save data.");
                }
            }, function (error) {
                _this.lockScreen.unLockScreen();
                _this.processError(error);
            }));
        }
    };
    AutoFormMasterFunctionComponent.prototype.switchFilterMode = function () {
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
    };
    AutoFormMasterFunctionComponent.prototype.processFilter = function () {
        var param = this.filterForm.getParam();
        if (JSON.stringify(this.tempFilter) !== JSON.stringify(param)) {
            this.tempFilter = param;
            this.page = 1;
            this.dynamicTable.currentPage = 1;
        }
        this.processLoadList(this.page, this.limit);
    };
    AutoFormMasterFunctionComponent.prototype.clearFilter = function () {
        this.filterForm.setDefault();
        this.processFilter();
    };
    AutoFormMasterFunctionComponent.prototype.actKnownError = function () {
        this.errorPopUp.closePopup(true);
    };
    AutoFormMasterFunctionComponent.prototype.processError = function (error) {
        var e_2, _a;
        error = this.refinedError(error, this.formName, this.provideData);
        var errorMsg = "";
        if (error.error.message) {
            if (typeof (error.error.message) === "object" && error.error.message.length > 0) {
                var errorArray = [];
                try {
                    for (var _b = __values(error.error.message), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var errorDataRow = _c.value;
                        if (typeof (errorDataRow) === "object") {
                            errorArray.push(JSON.stringify(errorDataRow));
                        }
                        else if (typeof (errorDataRow) === "string") {
                            errorArray.push(errorDataRow);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
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
    };
    AutoFormMasterFunctionComponent.prototype.check = function () {
        console.log(this.form);
    };
    AutoFormMasterFunctionComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AutoFormMasterFunctionComponent.ctorParameters = function () { return [
        { type: FormHttpRequestService },
        { type: LockScreenService }
    ]; };
    __decorate([
        ViewChild("formPopUp"),
        __metadata("design:type", ContentPopupComponent)
    ], AutoFormMasterFunctionComponent.prototype, "formPopUp", void 0);
    __decorate([
        ViewChild("confirmPopUp"),
        __metadata("design:type", ContentPopupComponent)
    ], AutoFormMasterFunctionComponent.prototype, "confirmPopUp", void 0);
    __decorate([
        ViewChild("errorPopUp"),
        __metadata("design:type", ContentPopupComponent)
    ], AutoFormMasterFunctionComponent.prototype, "errorPopUp", void 0);
    __decorate([
        ViewChild("dynamicForm"),
        __metadata("design:type", DynamicFormComponent)
    ], AutoFormMasterFunctionComponent.prototype, "dynamicForm", void 0);
    __decorate([
        ViewChild("filterForm"),
        __metadata("design:type", DynamicFormComponent)
    ], AutoFormMasterFunctionComponent.prototype, "filterForm", void 0);
    __decorate([
        ViewChild("dynamicTable"),
        __metadata("design:type", DynamicTableComponent)
    ], AutoFormMasterFunctionComponent.prototype, "dynamicTable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "saveControlFunction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedListData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedSaveData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedDeleteData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedMasterData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedListPayload", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedError", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AutoFormMasterFunctionComponent.prototype, "refinedMasterDataPayload", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AutoFormMasterFunctionComponent.prototype, "provideData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AutoFormMasterFunctionComponent.prototype, "formName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AutoFormMasterFunctionComponent.prototype, "button", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AutoFormMasterFunctionComponent.prototype, "callback", void 0);
    AutoFormMasterFunctionComponent = __decorate([
        Component({
            template: ''
        }),
        __metadata("design:paramtypes", [FormHttpRequestService, LockScreenService])
    ], AutoFormMasterFunctionComponent);
    return AutoFormMasterFunctionComponent;
}());
export { AutoFormMasterFunctionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1mb3JtLW1hc3Rlci1mdW5jdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9tYXN0ZXItZnVuY3Rpb24vYXV0by1mb3JtLW1hc3Rlci1mdW5jdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ25HLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBS3BFO0lBbUdDLHlDQUFvQixXQUFtQyxFQUFVLFVBQTZCO1FBQTFFLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBNUZyRix3QkFBbUIsR0FBYSxVQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSztZQUM5RCxPQUFPLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQTtRQUNRLG9CQUFlLEdBQWEsVUFBQyxJQUFJLEVBQUUsUUFBVyxFQUFFLFdBQWtCO1lBQS9CLHlCQUFBLEVBQUEsYUFBVztZQUFFLDRCQUFBLEVBQUEsa0JBQWtCO1lBQzFFLE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQyxDQUFBO1FBQ1Esb0JBQWUsR0FBYSxVQUFDLElBQUksRUFBRSxRQUFXLEVBQUUsV0FBa0I7WUFBL0IseUJBQUEsRUFBQSxhQUFXO1lBQUUsNEJBQUEsRUFBQSxrQkFBa0I7WUFDMUUsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7UUFDUSxzQkFBaUIsR0FBYSxVQUFDLElBQUksRUFBRSxRQUFXLEVBQUUsV0FBa0I7WUFBL0IseUJBQUEsRUFBQSxhQUFXO1lBQUUsNEJBQUEsRUFBQSxrQkFBa0I7WUFDNUUsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7UUFDUSxzQkFBaUIsR0FBYSxVQUFDLElBQUksRUFBRSxRQUFXLEVBQUUsV0FBa0I7WUFBL0IseUJBQUEsRUFBQSxhQUFXO1lBQUUsNEJBQUEsRUFBQSxrQkFBa0I7WUFDNUUsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7UUFDUSx1QkFBa0IsR0FBYSxVQUFDLElBQUksRUFBRSxRQUFXLEVBQUUsV0FBa0I7WUFBL0IseUJBQUEsRUFBQSxhQUFXO1lBQUUsNEJBQUEsRUFBQSxrQkFBa0I7WUFDN0UsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUE7UUFDUSxpQkFBWSxHQUFhLFVBQUMsSUFBSSxFQUFFLFFBQVcsRUFBRSxXQUFrQjtZQUEvQix5QkFBQSxFQUFBLGFBQVc7WUFBRSw0QkFBQSxFQUFBLGtCQUFrQjtZQUN2RSxPQUFPLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQTtRQUNRLDZCQUF3QixHQUFhLFVBQUMsSUFBSSxFQUFFLFFBQVcsRUFBRSxXQUFrQjtZQUEvQix5QkFBQSxFQUFBLGFBQVc7WUFBRSw0QkFBQSxFQUFBLGtCQUFrQjtZQUNuRixPQUFPLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQTtRQUNRLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsV0FBTSxHQUFHO1lBQ2pCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLFFBQVE7U0FDaEIsQ0FBQTtRQUNTLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO1FBQy9CLGlCQUFZLEdBQWtCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixTQUFJLEdBQU87WUFDVixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1NBQ1IsQ0FBQztRQUNGLGVBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsV0FBTSxHQUFPO1lBQ1osSUFBSSxFQUFFO2dCQUNMLE1BQU0sRUFBRTtvQkFDUCxJQUFJLEVBQUUsS0FBSztvQkFDWCxXQUFXLEVBQUUsRUFBRTtvQkFDZixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsZUFBZSxFQUFFLEtBQUs7aUJBQ3RCO2dCQUNELGFBQWEsRUFBRTtvQkFDZDt3QkFDQyxhQUFhLEVBQUUsY0FBYzt3QkFDN0IsV0FBVyxFQUFFLEVBQUU7d0JBQ2YsVUFBVSxFQUFFLEtBQUs7d0JBQ2pCLFNBQVMsRUFBRTs0QkFDVjtnQ0FDQyxTQUFTLEVBQUUsUUFBUTtnQ0FDbkIsS0FBSyxFQUFFLFNBQVM7Z0NBQ2hCLGFBQWEsRUFBRSxDQUFDO2dDQUNoQixJQUFJLEVBQUUsU0FBUztnQ0FDZixPQUFPLEVBQUU7b0NBQ1IsRUFBRTtpQ0FDRjtnQ0FDRCxZQUFZLEVBQUUsSUFBSTtnQ0FDbEIsWUFBWSxFQUFFLElBQUk7Z0NBQ2xCLHFCQUFxQixFQUFFLEtBQUs7Z0NBQzVCLFVBQVUsRUFBRSxLQUFLO2dDQUNqQixJQUFJLEVBQUUsRUFBRTtnQ0FDUixRQUFRLEVBQUUsS0FBSztnQ0FDZixPQUFPLEVBQUUsS0FBSztnQ0FDZCxTQUFTLEVBQUUsR0FBRztnQ0FDZCxVQUFVLEVBQUUsRUFBRTs2QkFDZDt5QkFDRDtxQkFDRDtpQkFDRDthQUNEO1lBQ0QsSUFBSSxFQUFFLEVBQUU7U0FDUixDQUFBO1FBQ0QsVUFBSyxHQUFPLEVBQUUsQ0FBQTtRQUNkLGFBQVEsR0FBTyxFQUFFLENBQUM7UUFDbEIsV0FBTSxHQUFPLEVBQUUsQ0FBQztRQUNoQixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZUFBVSxHQUFPLEVBQUUsQ0FBQztRQUNwQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNWLGVBQVUsR0FBRyxJQUFJLENBQUM7SUFHMUIsQ0FBQztJQUNELGtEQUFRLEdBQVI7UUFBQSxpQkFJQztRQUhBLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDMUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsbURBQVMsR0FBVDtRQUFBLGlCQWlDQztRQWhDQSxJQUFJLGNBQWMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDM0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDNUIsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlDLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ3hDO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDNUIsSUFBSSxTQUFTLEtBQUssSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBUTtnQkFDbEYsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUN2QyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQzFCLElBQUksVUFBVSxHQUFHO3dCQUNoQixJQUFJLEVBQUUsU0FBUzt3QkFDZixNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07cUJBQ25CLENBQUE7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDakIsV0FBVyxHQUFHLEVBQUUsQ0FBQTtxQkFDaEI7b0JBQ0QsV0FBVyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBQ3hDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3JCO1lBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3JCO0lBQ0YsQ0FBQztJQUNELHVEQUFhLEdBQWI7UUFBQSxpQkFxQ0M7UUFwQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFBO1NBQ2hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1NBQzlCO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQzFCO1lBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxJQUFJLGFBQWEsR0FBRztvQkFDbkIsYUFBYSxFQUFFLGVBQWU7b0JBQzlCLFdBQVcsRUFBRSxZQUFZO29CQUN6QixVQUFVLEVBQUUsS0FBSztvQkFDakIsU0FBUyxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVM7aUJBQzlDLENBQUE7Z0JBQ0QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDbEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDOUIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDekIsS0FBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6QixLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7U0FDaEM7SUFDRixDQUFDO0lBQ0QsK0RBQXFCLEdBQXJCO1FBQUEsaUJBeUJDO1FBeEJBLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDM0IsSUFBSSxPQUFPLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFLEVBQUU7YUFDWixDQUFBO1lBQ0QsS0FBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtnQkFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7aUJBQzdDLENBQUMsQ0FBQTthQUNGO1lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFRO2dCQUN2RSxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFBO2dCQUM5QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDaEMsS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTt3QkFDN0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7cUJBQ3pFO29CQUNELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzNGLEtBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2lCQUMvQjtxQkFBTTtvQkFDTixLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtpQkFDbkM7WUFDRixDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ0g7SUFDRixDQUFDO0lBQ0QsaUVBQXVCLEdBQXZCO1FBQ0MsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUc7Z0JBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQzthQUNyQyxDQUFBO1NBQ0Q7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDdkYsQ0FBQztJQUNELHlEQUFlLEdBQWYsVUFBZ0IsSUFBUSxFQUFFLEtBQVUsRUFBRSxNQUFhOztRQUFuRCxpQkE2Q0M7UUE3Q2UscUJBQUEsRUFBQSxRQUFRO1FBQUUsc0JBQUEsRUFBQSxVQUFVO1FBQUUsdUJBQUEsRUFBQSxhQUFhO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksV0FBVyxHQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDbEQsSUFBSSxPQUFPLEdBQUc7Z0JBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ25DLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJO2FBQ1YsQ0FBQTtZQUNELElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7O29CQUNmLEtBQXNCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQSxnQkFBQSw0QkFBRTt3QkFBL0MsSUFBSSxTQUFTLFdBQUE7d0JBQ2pCLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO3FCQUN0Qzs7Ozs7Ozs7O2dCQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUE7Z0JBQ3hCLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUE7YUFDbkQ7aUJBQU0sSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUU7Z0JBQ25ELE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUE7Z0JBQzlCLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUE7YUFDMUQ7WUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7YUFDNUI7WUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVE7Z0JBQ3ZFLEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3hGLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDL0csS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUMsWUFBWSxDQUFDLENBQUE7cUJBQzFFO3lCQUFNO3dCQUNOLElBQUksS0FBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7NEJBQ2pCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDWixLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDOzRCQUMxQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUM1Qzs2QkFBTTs0QkFDTixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7NEJBQ3pCLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFDLFlBQVksQ0FBQyxDQUFBO3lCQUMxRTtxQkFDRDtpQkFDRDtZQUNGLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNGLENBQUM7SUFDRCw2REFBbUIsR0FBbkIsVUFBb0IsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUM5QjthQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7YUFDZCxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxDQUFDO1NBQ1AsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUNELHVEQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCwyREFBaUIsR0FBakIsVUFBa0IsVUFBVTtRQUE1QixpQkFzQkM7UUFyQkEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDcEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0RixJQUFJLE9BQU8sR0FBRztnQkFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDckMsS0FBSyxFQUFFLFdBQVc7YUFDbEIsQ0FBQTtZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBUTtnQkFDdkUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDeEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ2xCLEtBQUssRUFBRSxlQUFlO3dCQUN0QixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7d0JBQ3ZCLElBQUksRUFBRSxVQUFVO3FCQUNoQixDQUFDLENBQUE7aUJBQ0Y7cUJBQU07b0JBQ04sS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQ2pDO1lBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0YsQ0FBQztJQUNELHFEQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJO1NBQ1YsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUNELHNEQUFZLEdBQVosVUFBYSxVQUFVO1FBQXZCLGlCQTBCQztRQXpCQSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNsRCxJQUFJLE9BQU8sR0FBRztnQkFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSTtnQkFDbkMsS0FBSyxFQUFFLFVBQVU7YUFDakIsQ0FBQTtZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBUTtnQkFDdkUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDeEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7b0JBQ25CLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqQyxLQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUNsQixLQUFLLEVBQUUsVUFBVTt3QkFDakIsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRO3dCQUN2QixJQUFJLEVBQUUsSUFBSTtxQkFDVixDQUFDLENBQUE7aUJBQ0Y7cUJBQU07b0JBQ04sS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7aUJBQzlCO1lBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0YsQ0FBQztJQUNELG1EQUFTLEdBQVQ7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCxtREFBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsOENBQUksR0FBSjtRQUFBLGlCQW1DQztRQWxDQSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0YsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzNJLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDakQsT0FBTyxHQUFHO29CQUNULFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUNsQyxLQUFLLE9BQUE7aUJBQ0wsQ0FBQTthQUNEO2lCQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUMxRCxPQUFPLEdBQUc7b0JBQ1QsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUk7b0JBQ25DLEtBQUssT0FBQTtpQkFDTCxDQUFBO2FBQ0Q7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQVE7Z0JBQ3ZFLEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQzlCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNoQyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7b0JBQ2xCLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQzFDLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzt3QkFDbEIsS0FBSyxFQUFFLGFBQWE7d0JBQ3BCLFFBQVEsRUFBRSxLQUFJLENBQUMsUUFBUTt3QkFDdkIsSUFBSSxFQUFFLElBQUk7cUJBQ1YsQ0FBQyxDQUFBO2lCQUNGO3FCQUFNO29CQUNOLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUNoQztZQUNGLENBQUMsRUFBQyxVQUFDLEtBQUs7Z0JBQ1AsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtnQkFDOUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDRixDQUFDO0lBQ0QsMERBQWdCLEdBQWhCO1FBQ0MsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtZQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO2dCQUNwRixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUE7YUFDaEY7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBQyxhQUFhLEVBQUMsWUFBWSxDQUFDLENBQUE7WUFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3ZFO2FBQU07WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQTtZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsRUFBQyxhQUFhLEVBQUMsRUFBRSxDQUFDLENBQUE7WUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUMsYUFBYSxFQUFDLFlBQVksQ0FBQyxDQUFBO1NBQ2pGO0lBQ0YsQ0FBQztJQUNELHVEQUFhLEdBQWI7UUFDQyxJQUFJLEtBQUssR0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQTtTQUNqQztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELHFEQUFXLEdBQVg7UUFDQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBQ0QsdURBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxzREFBWSxHQUFaLFVBQWEsS0FBSzs7UUFDakIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xFLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9FLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQzs7b0JBQ3BCLEtBQXlCLElBQUEsS0FBQSxTQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFBLGdCQUFBLDRCQUFFO3dCQUF6QyxJQUFJLFlBQVksV0FBQTt3QkFDcEIsSUFBSSxPQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssUUFBUSxFQUFFOzRCQUN0QyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTt5QkFDN0M7NkJBQU0sSUFBSSxPQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssUUFBUSxFQUFFOzRCQUM3QyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO3lCQUM3QjtxQkFDRDs7Ozs7Ozs7O2dCQUNELFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQ2xDO2lCQUFNO2dCQUNOLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQTthQUM5QjtTQUNEO2FBQU07WUFDTixRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtTQUN4QjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFBO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFLLEdBQUw7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0QscURBQVcsR0FBWDtRQUNDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDaEMsQ0FBQzs7Z0JBOVZnQyxzQkFBc0I7Z0JBQXNCLGlCQUFpQjs7SUFsR3RFO1FBQXZCLFNBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQVkscUJBQXFCO3NFQUFDO0lBQzlCO1FBQTFCLFNBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUscUJBQXFCO3lFQUFDO0lBQ3RDO1FBQXhCLFNBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEscUJBQXFCO3VFQUFDO0lBQ2pDO1FBQXpCLFNBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWMsb0JBQW9CO3dFQUFDO0lBQ25DO1FBQXhCLFNBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEsb0JBQW9CO3VFQUFDO0lBQy9CO1FBQTFCLFNBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUscUJBQXFCO3lFQUFDO0lBQ3REO1FBQVIsS0FBSyxFQUFFO2tDQUFzQixRQUFRO2dGQUVyQztJQUNRO1FBQVIsS0FBSyxFQUFFO2tDQUFrQixRQUFROzRFQUVqQztJQUNRO1FBQVIsS0FBSyxFQUFFO2tDQUFrQixRQUFROzRFQUVqQztJQUNRO1FBQVIsS0FBSyxFQUFFO2tDQUFvQixRQUFROzhFQUVuQztJQUNRO1FBQVIsS0FBSyxFQUFFO2tDQUFvQixRQUFROzhFQUVuQztJQUNRO1FBQVIsS0FBSyxFQUFFO2tDQUFxQixRQUFROytFQUVwQztJQUNRO1FBQVIsS0FBSyxFQUFFO2tDQUFlLFFBQVE7eUVBRTlCO0lBQ1E7UUFBUixLQUFLLEVBQUU7a0NBQTJCLFFBQVE7cUZBRTFDO0lBQ1E7UUFBUixLQUFLLEVBQUU7O3dFQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7cUVBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzttRUFRUDtJQUNTO1FBQVQsTUFBTSxFQUFFOztxRUFBOEI7SUExQzNCLCtCQUErQjtRQUgzQyxTQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsRUFBRTtTQUNaLENBQUM7eUNBb0dnQyxzQkFBc0IsRUFBc0IsaUJBQWlCO09BbkdsRiwrQkFBK0IsQ0FrYzNDO0lBQUQsc0NBQUM7Q0FBQSxBQWxjRCxJQWtjQztTQWxjWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtGb3JtSHR0cFJlcXVlc3RTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2Zvcm0taHR0cC1yZXF1ZXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0NvbnRlbnRQb3B1cENvbXBvbmVudH0gZnJvbSAnLi4vY29udGVudC1wb3B1cC9jb250ZW50LXBvcHVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RHluYW1pY0Zvcm1Db21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHtEeW5hbWljVGFibGVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtdGFibGUvZHluYW1pYy10YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0xvY2tTY3JlZW5TZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2xvY2stc2NyZWVuLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGU6ICcnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b0Zvcm1NYXN0ZXJGdW5jdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHRAVmlld0NoaWxkKFwiZm9ybVBvcFVwXCIpIGZvcm1Qb3BVcDogQ29udGVudFBvcHVwQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJjb25maXJtUG9wVXBcIikgY29uZmlybVBvcFVwOiBDb250ZW50UG9wdXBDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImVycm9yUG9wVXBcIikgZXJyb3JQb3BVcDogQ29udGVudFBvcHVwQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJkeW5hbWljRm9ybVwiKSBkeW5hbWljRm9ybTogRHluYW1pY0Zvcm1Db21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImZpbHRlckZvcm1cIikgZmlsdGVyRm9ybTogRHluYW1pY0Zvcm1Db21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImR5bmFtaWNUYWJsZVwiKSBkeW5hbWljVGFibGU6IER5bmFtaWNUYWJsZUNvbXBvbmVudDtcclxuXHRASW5wdXQoKSBzYXZlQ29udHJvbEZ1bmN0aW9uOiBGdW5jdGlvbiA9IChtb2RlLCBmb3JtTmFtZSwgcGFyYW0pID0+IHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRASW5wdXQoKSByZWZpbmVkTGlzdERhdGE6IEZ1bmN0aW9uID0gKGRhdGEsIGZvcm1OYW1lPVwiXCIsIHByb3ZpZGVEYXRhID0gbnVsbCkgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHJlZmluZWRTYXZlRGF0YTogRnVuY3Rpb24gPSAoZGF0YSwgZm9ybU5hbWU9XCJcIiwgcHJvdmlkZURhdGEgPSBudWxsKSA9PiB7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblx0QElucHV0KCkgcmVmaW5lZERlbGV0ZURhdGE6IEZ1bmN0aW9uID0gKGRhdGEsIGZvcm1OYW1lPVwiXCIsIHByb3ZpZGVEYXRhID0gbnVsbCkgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHJlZmluZWRNYXN0ZXJEYXRhOiBGdW5jdGlvbiA9IChkYXRhLCBmb3JtTmFtZT1cIlwiLCBwcm92aWRlRGF0YSA9IG51bGwpID0+IHtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHRASW5wdXQoKSByZWZpbmVkTGlzdFBheWxvYWQ6IEZ1bmN0aW9uID0gKGRhdGEsIGZvcm1OYW1lPVwiXCIsIHByb3ZpZGVEYXRhID0gbnVsbCkgPT4ge1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHJlZmluZWRFcnJvcjogRnVuY3Rpb24gPSAoZGF0YSwgZm9ybU5hbWU9XCJcIiwgcHJvdmlkZURhdGEgPSBudWxsKSA9PiB7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblx0QElucHV0KCkgcmVmaW5lZE1hc3RlckRhdGFQYXlsb2FkOiBGdW5jdGlvbiA9IChkYXRhLCBmb3JtTmFtZT1cIlwiLCBwcm92aWRlRGF0YSA9IG51bGwpID0+IHtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHRASW5wdXQoKSBwcm92aWRlRGF0YSA9IHt9O1xyXG5cdEBJbnB1dCgpIGZvcm1OYW1lID0gJ3Rlc3QnO1xyXG5cdEBJbnB1dCgpIGJ1dHRvbiA9IHtcclxuXHRcdGFkZDogXCJBZGRcIixcclxuXHRcdHNhdmU6IFwiU2F2ZVwiLFxyXG5cdFx0Y2xlYXI6IFwiQ2xlYXJcIixcclxuXHRcdHJlc2V0OiBcIlJlc2V0XCIsXHJcblx0XHRzZWFyY2g6IFwiU2VhcmNoXCIsXHJcblx0XHRjb25maXJtOiBcIkNvbmZpcm1cIixcclxuXHRcdGNhbmNlbDogXCJDYW5jZWxcIlxyXG5cdH1cclxuXHRAT3V0cHV0KCkgY2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKClcclxuXHRwcml2YXRlIHN1YnNjcmlwdGlvbiA6IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcclxuXHRvcmRlciA9IFtdO1xyXG5cdG1vZGUgPSBcImFkZFwiO1xyXG5cdGZvcm06YW55ID0ge1xyXG5cdFx0Zm9ybToge30sXHJcblx0XHRkYXRhOiBbXVxyXG5cdH07XHJcblx0ZmlsdGVyTW9kZSA9IFwic2luZ2xlXCI7XHJcblx0ZmlsdGVyOmFueSA9IHtcclxuXHRcdGZvcm06IHtcclxuXHRcdFx0b3B0aW9uOiB7XHJcblx0XHRcdFx0bW9kZTogXCJhZGRcIixcclxuXHRcdFx0XHRjdXN0b21DbGFzczogXCJcIixcclxuXHRcdFx0XHRsYWJlbEFsaWduOiBcImxlZnRcIixcclxuXHRcdFx0XHRlbmFibGVBbmltYXRpb246IGZhbHNlXHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRhaW5lckxpc3Q6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjb250YWluZXJOYW1lOiBcInNpbmdsZUZpbHRlclwiLFxyXG5cdFx0XHRcdFx0Y3VzdG9tQ2xhc3M6IFwiXCIsXHJcblx0XHRcdFx0XHRjb2x1bW5TcGFuOiBcIjEvMVwiLFxyXG5cdFx0XHRcdFx0ZmllbGRMaXN0OiBbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRmaWVsZE5hbWU6IFwiZmlsdGVyXCIsXHJcblx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiRmlsdGVyOlwiLFxyXG5cdFx0XHRcdFx0XHRcdGNvbHVtblBlckxpbmU6IDEsXHJcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0ZXh0Qm94XCIsXHJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDogW1xyXG5cdFx0XHRcdFx0XHRcdFx0XCJcIlxyXG5cdFx0XHRcdFx0XHRcdF0sXHJcblx0XHRcdFx0XHRcdFx0aW5wdXRQYXR0ZXJuOiBcIi4qXCIsXHJcblx0XHRcdFx0XHRcdFx0dmFsdWVQYXR0ZXJuOiBcIi4qXCIsXHJcblx0XHRcdFx0XHRcdFx0dmFsaWRhdGVXaGlsZUtleVByZXNzOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRtdWx0aVZhbHVlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRub3RlOiBcIlwiLFxyXG5cdFx0XHRcdFx0XHRcdHJlYWRvbmx5OiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRyZXF1aXJlOiBmYWxzZSxcclxuXHRcdFx0XHRcdFx0XHRtYXhMZW5ndGg6IDI1NSxcclxuXHRcdFx0XHRcdFx0XHRsYWJlbFdpZHRoOiA0NVxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fSxcclxuXHRcdGRhdGE6IFtdXHJcblx0fVxyXG5cdG1vZGVsOmFueSA9IHt9XHJcblx0ZGF0YUxpc3Q6YW55ID0ge307XHJcblx0Y29uZmlnOmFueSA9IHt9O1xyXG5cdHBhZ2UgPSAwO1xyXG5cdGxpbWl0ID0gMDtcclxuXHR0ZW1wRGVsZXRlID0gbnVsbDtcclxuXHRtYXN0ZXJEYXRhOmFueSA9IHt9O1xyXG5cdGVycm9yQ29udGVudCA9IFwiXCI7XHJcblx0cHJpdmF0ZSB0ZW1wRmlsdGVyID0gbnVsbDtcclxuXHRcclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBSZXF1ZXN0OiBGb3JtSHR0cFJlcXVlc3RTZXJ2aWNlLCBwcml2YXRlIGxvY2tTY3JlZW46IExvY2tTY3JlZW5TZXJ2aWNlKSB7XHJcblx0fVxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpPT4ge1xyXG5cdFx0XHR0aGlzLmdldENvbmZpZygpO1xyXG5cdFx0fSkpXHJcblx0fVxyXG5cdGdldENvbmZpZygpIHtcclxuXHRcdGxldCBzYXZlZENvbmZpZ1JhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWFzdGVyRm9ybURhdGFcIilcclxuXHRcdGxldCBzYXZlZENvbmZpZyA9IG51bGw7XHJcblx0XHRsZXQgcGFyc2VDb25maWcgPSBudWxsO1xyXG5cdFx0aWYgKHNhdmVkQ29uZmlnUmF3ICE9PSBudWxsKSB7XHJcblx0XHRcdHBhcnNlQ29uZmlnID0gSlNPTi5wYXJzZShzYXZlZENvbmZpZ1Jhdyk7XHJcblx0XHR9XHJcblx0XHRpZiAocGFyc2VDb25maWcgJiYgcGFyc2VDb25maWdbdGhpcy5mb3JtTmFtZV0pIHtcclxuXHRcdFx0c2F2ZWRDb25maWcgPSBwYXJzZUNvbmZpZ1t0aGlzLmZvcm1OYW1lXVxyXG5cdFx0fVxyXG5cdFx0bGV0IGNoZWNrSGFzaCA9IHRoaXMuaHR0cFJlcXVlc3QuZ2V0SGFzaCh0aGlzLmZvcm1OYW1lKTtcclxuXHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdGlmIChjaGVja0hhc2ggPT09IG51bGwgfHwgc2F2ZWRDb25maWcgPT0gbnVsbCB8fCAoc2F2ZWRDb25maWcgJiYgY2hlY2tIYXNoICE9PSBzYXZlZENvbmZpZy5oYXNoKSkge1xyXG5cdFx0XHR0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5odHRwUmVxdWVzdC5nZXRDb25maWcodGhpcy5mb3JtTmFtZSkuc3Vic2NyaWJlKChyZXNwOmFueSkgPT4ge1xyXG5cdFx0XHRcdHRoaXMubG9ja1NjcmVlbi51bkxvY2tTY3JlZW4oKVxyXG5cdFx0XHRcdGlmIChyZXNwLnN0YXR1cyAmJiByZXNwLnN0YXR1cyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNvbmZpZyA9IHJlc3AuY29uZmlnO1xyXG5cdFx0XHRcdFx0bGV0IHNhdmVDb25maWcgPSB7XHJcblx0XHRcdFx0XHRcdGhhc2g6IGNoZWNrSGFzaCxcclxuXHRcdFx0XHRcdFx0Y29uZmlnOiB0aGlzLmNvbmZpZ1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCFwYXJzZUNvbmZpZykge1xyXG5cdFx0XHRcdFx0XHRwYXJzZUNvbmZpZyA9IHt9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwYXJzZUNvbmZpZ1t0aGlzLmZvcm1OYW1lXSA9IHNhdmVDb25maWc7XHJcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm1hc3RlckZvcm1EYXRhXCIsIEpTT04uc3RyaW5naWZ5KHBhcnNlQ29uZmlnKSk7XHJcblx0XHRcdFx0XHR0aGlzLnByb2Nlc3NDb25maWcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jb25maWcgPSBzYXZlZENvbmZpZy5jb25maWc7XHJcblx0XHRcdHRoaXMucHJvY2Vzc0NvbmZpZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzQ29uZmlnKCkge1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLmxpc3QpIHtcclxuXHRcdFx0dGhpcy5kYXRhTGlzdCA9IHRoaXMuY29uZmlnLmxpc3RcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5tb2RlbCkge1xyXG5cdFx0XHR0aGlzLm1vZGVsID0gdGhpcy5jb25maWcubW9kZWxcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5mb3JtKSB7XHJcblx0XHRcdHRoaXMuZm9ybS5mb3JtID0gdGhpcy5jb25maWcuZm9ybTtcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRpbWVyKDI1MCkuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5mb3JtLmRhdGEubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHRcdHRoaXMuZHluYW1pY0Zvcm0uYWRkUm93KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmNvbmZpZy5maWx0ZXJBZHZhbmNlKSB7XHJcblx0XHRcdHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aW1lcigyNTApLnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0bGV0IGFkdmFuY2VGaWx0ZXIgPSB7XHJcblx0XHRcdFx0XHRjb250YWluZXJOYW1lOiBcImFkdmFuY2VGaWx0ZXJcIixcclxuXHRcdFx0XHRcdGN1c3RvbUNsYXNzOiBcImhpZGVGaWx0ZXJcIixcclxuXHRcdFx0XHRcdGNvbHVtblNwYW46IFwiMS8xXCIsXHJcblx0XHRcdFx0XHRmaWVsZExpc3Q6IHRoaXMuY29uZmlnLmZpbHRlckFkdmFuY2UuZmllbGRMaXN0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuZmlsdGVyLmZvcm0uY29udGFpbmVyTGlzdC5wdXNoKGFkdmFuY2VGaWx0ZXIpXHJcblx0XHRcdFx0dGhpcy5maWx0ZXJGb3JtLnJlUmVuZGVyRm9ybSgpXHJcblx0XHRcdFx0dGhpcy5maWx0ZXJGb3JtLmFkZFJvdygpO1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc0xvYWRNYXN0ZXJEYXRhKCk7XHJcblx0XHRcdH0pKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRpbWVyKDUwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHR0aGlzLmZpbHRlckZvcm0uYWRkUm93KCk7XHJcblx0XHRcdFx0dGhpcy5wcm9jZXNzTG9hZE1hc3RlckRhdGEoKTtcclxuXHRcdFx0fSkpXHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5jb25maWcuYnV0dG9uKSB7XHJcblx0XHRcdHRoaXMuYnV0dG9uID0gdGhpcy5jb25maWcuYnV0dG9uXHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NMb2FkTWFzdGVyRGF0YSgpIHtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5tYXN0ZXJEYXRhKSB7XHJcblx0XHRcdGxldCBwYXlsb2FkID0ge1xyXG5cdFx0XHRcdGRhdGFMaXN0OiBbXVxyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBpbiB0aGlzLmNvbmZpZy5tYXN0ZXJEYXRhKSB7XHJcblx0XHRcdFx0cGF5bG9hZC5kYXRhTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1hc3RlckRhdGFbZmllbGROYW1lXVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0cGF5bG9hZCA9IHRoaXMucmVmaW5lZE1hc3RlckRhdGFQYXlsb2FkKHBheWxvYWQsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHR0aGlzLmxvY2tTY3JlZW4ubG9ja1NjcmVlbigpXHJcblx0XHRcdHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmh0dHBSZXF1ZXN0LnBvc3QocGF5bG9hZCkuc3Vic2NyaWJlKChyZXNwOmFueSk9PiB7XHJcblx0XHRcdFx0dGhpcy5sb2NrU2NyZWVuLnVuTG9ja1NjcmVlbigpXHJcblx0XHRcdFx0aWYgKHJlc3AgJiYgcmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIHRoaXMuY29uZmlnLm1hc3RlckRhdGEpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5tYXN0ZXJEYXRhW2ZpZWxkTmFtZV0gPSByZXNwLmRhdGFbdGhpcy5jb25maWcubWFzdGVyRGF0YVtmaWVsZE5hbWVdXVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5tYXN0ZXJEYXRhID0gdGhpcy5yZWZpbmVkTWFzdGVyRGF0YSh0aGlzLm1hc3RlckRhdGEsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9jZXNzQXNzaWduTWFzdGVyRGF0YSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydChcIkVycm9yIGxvYWRpbmcgbWFzdGVyIGRhdGEuXCIpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSlcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvY2Vzc0Fzc2lnbk1hc3RlckRhdGEoKSB7XHJcblx0XHRsZXQgbWFwU2V0QXR0ciA9IHt9O1xyXG5cdFx0Zm9yIChsZXQgZmllbGROYW1lIGluIHRoaXMubWFzdGVyRGF0YSkge1xyXG5cdFx0XHRtYXBTZXRBdHRyW2ZpZWxkTmFtZV0gPSB7XHJcblx0XHRcdFx0dmFsdWVMaXN0OiB0aGlzLm1hc3RlckRhdGFbZmllbGROYW1lXVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmR5bmFtaWNGb3JtLm1hcFNldEF0dHJpYnV0ZShtYXBTZXRBdHRyKTtcclxuXHRcdHRoaXMuZmlsdGVyRm9ybS5tYXBTZXRBdHRyaWJ1dGUobWFwU2V0QXR0cik7XHJcblx0XHR0aGlzLnByb2Nlc3NMb2FkTGlzdCgxLCAodGhpcy5kYXRhTGlzdC5yb3dMaW1pdCA/IHRoaXMuZGF0YUxpc3Qucm93TGltaXQgOiAxMCksIGZhbHNlKVxyXG5cdH1cclxuXHRwcm9jZXNzTG9hZExpc3QocGFnZSA9IDEsIGxpbWl0ID0gMTAsIGZpbHRlciA9IHRydWUpIHtcclxuXHRcdHRoaXMucGFnZSA9IHBhZ2U7XHJcblx0XHR0aGlzLmxpbWl0ID0gbGltaXQ7XHJcblx0XHRsZXQgZmlsdGVyUGFyYW06YW55ID0gdGhpcy5maWx0ZXJGb3JtLmdldFBhcmFtKCk7XHJcblx0XHRpZiAodGhpcy5jb25maWcubW9kdWxlICYmIHRoaXMuY29uZmlnLm1vZHVsZS5saXN0KSB7XHJcblx0XHRcdGxldCBwYXlsb2FkID0ge1xyXG5cdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1vZHVsZS5saXN0LFxyXG5cdFx0XHRcdGxpbWl0OiBsaW1pdCxcclxuXHRcdFx0XHRwYWdlOiBwYWdlXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGZpbHRlciAmJiB0aGlzLmZpbHRlck1vZGUgPT0gXCJzaW5nbGVcIiAmJiBmaWx0ZXJQYXJhbS5maWx0ZXIgJiYgZmlsdGVyUGFyYW0uZmlsdGVyLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRsZXQgcGFyYW0gPSB7fTtcclxuXHRcdFx0XHRmb3IgKGxldCBwYXJhbU5hbWUgb2YgdGhpcy5jb25maWcuZmlsdGVyLnBhcmFtTGlzdCkge1xyXG5cdFx0XHRcdFx0cGFyYW1bcGFyYW1OYW1lXSA9IGZpbHRlclBhcmFtLmZpbHRlcjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGF5bG9hZFtcInBhcmFtXCJdID0gcGFyYW1cclxuXHRcdFx0XHRwYXlsb2FkW1wiY29uZGl0aW9uXCJdID0gdGhpcy5jb25maWcuZmlsdGVyLmNvbmRpdGlvblxyXG5cdFx0XHR9IGVsc2UgaWYgKGZpbHRlciAmJiB0aGlzLmZpbHRlck1vZGUgPT0gXCJtdWx0aXBsZVwiKSB7XHJcblx0XHRcdFx0cGF5bG9hZFtcInBhcmFtXCJdID0gZmlsdGVyUGFyYW1cclxuXHRcdFx0XHRwYXlsb2FkW1wiY29uZGl0aW9uXCJdID0gdGhpcy5jb25maWcuZmlsdGVyQWR2YW5jZS5jb25kaXRpb25cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5vcmRlci5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0cGF5bG9hZFtcInNvcnRcIl0gPSB0aGlzLm9yZGVyXHJcblx0XHRcdH1cclxuXHRcdFx0cGF5bG9hZCA9IHRoaXMucmVmaW5lZExpc3RQYXlsb2FkKHBheWxvYWQsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpXHJcblx0XHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuaHR0cFJlcXVlc3QucG9zdChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKHJlc3AuZGF0YVt0aGlzLmNvbmZpZy5tb2R1bGUubGlzdF0gJiYgcmVzcC5kYXRhW3RoaXMuY29uZmlnLm1vZHVsZS5saXN0XS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YUxpc3QuZGF0YSA9IHRoaXMucmVmaW5lZExpc3REYXRhKHJlc3AuZGF0YVt0aGlzLmNvbmZpZy5tb2R1bGUubGlzdF0sIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGFMaXN0LnBhZ2luYXRpb24gPSByZXNwLmRhdGFbdGhpcy5jb25maWcubW9kdWxlLmxpc3QrXCJQYWdpbmF0aW9uXCJdXHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5wYWdlID4gMSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wYWdlLS07XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5keW5hbWljVGFibGUuY3VycmVudFBhZ2UgPSB0aGlzLnBhZ2U7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5wcm9jZXNzTG9hZExpc3QodGhpcy5wYWdlLCB0aGlzLmxpbWl0KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhdGFMaXN0LmRhdGEgPSBudWxsXHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhTGlzdC5wYWdpbmF0aW9uID0gcmVzcC5kYXRhW3RoaXMuY29uZmlnLm1vZHVsZS5saXN0K1wiUGFnaW5hdGlvblwiXVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NMaXN0Q2FsbGJhY2soZSkge1xyXG5cdFx0aWYgKGUuYWN0aW9uID09ICdwYWdlJykge1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NMb2FkTGlzdChlLnBhZ2VOdW1iZXIsIGUubGltaXQpO1xyXG5cdFx0fSBlbHNlIGlmIChlLmFjdGlvbiA9PSAnZWRpdCcpIHtcclxuXHRcdFx0dGhpcy5sb2FkRWRpdERhdGEoZS5wcmltYXJ5S2V5KTtcclxuXHRcdH0gZWxzZSBpZiAoZS5hY3Rpb24gPT0gJ2RlbGV0ZScpIHtcclxuXHRcdFx0dGhpcy50ZW1wRGVsZXRlID0gZS5wcmltYXJ5S2V5O1xyXG5cdFx0XHR0aGlzLmNvbmZpcm1Qb3BVcC5zaG93UG9wdXAoKTtcclxuXHRcdH0gZWxzZSBpZiAoZS5hY3Rpb24gPT0gXCJzb3J0XCIpIHtcclxuXHRcdFx0dGhpcy5vcmRlciA9IFtdO1xyXG5cdFx0XHR0aGlzLm9yZGVyLnB1c2goe1xyXG5cdFx0XHRcdGZpZWxkTmFtZTogZS5maWVsZE5hbWUsXHJcblx0XHRcdFx0b3JkZXI6IGUub3JkZXJcclxuXHRcdFx0fSlcclxuXHRcdFx0dGhpcy5wcm9jZXNzTG9hZExpc3QodGhpcy5wYWdlLCB0aGlzLmxpbWl0KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBcImxpc3RFdmVudFwiLFxyXG5cdFx0XHRmb3JtTmFtZTogdGhpcy5mb3JtTmFtZSxcclxuXHRcdFx0ZGF0YTogZVxyXG5cdFx0fSlcclxuXHR9XHJcblx0Y29uZmlybURlbGV0ZSgpIHtcclxuXHRcdHRoaXMucHJvY2Vzc0RlbGV0ZURhdGEodGhpcy50ZW1wRGVsZXRlKTtcclxuXHRcdHRoaXMuY29uZmlybVBvcFVwLmNsb3NlUG9wdXAodHJ1ZSk7XHJcblx0fVxyXG5cdHByb2Nlc3NEZWxldGVEYXRhKHByaW1hcnlLZXkpIHtcclxuXHRcdGlmICh0aGlzLmNvbmZpZy5tb2R1bGUgJiYgdGhpcy5jb25maWcubW9kdWxlLmRlbGV0ZSkge1xyXG5cdFx0XHRsZXQgcmVmaW5lZERhdGEgPSB0aGlzLnJlZmluZWREZWxldGVEYXRhKHByaW1hcnlLZXksIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpO1xyXG5cdFx0XHRsZXQgcGF5bG9hZCA9IHtcclxuXHRcdFx0XHRtb2R1bGVOYW1lOiB0aGlzLmNvbmZpZy5tb2R1bGUuZGVsZXRlLFxyXG5cdFx0XHRcdHBhcmFtOiByZWZpbmVkRGF0YVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuaHR0cFJlcXVlc3QucG9zdChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9jZXNzTG9hZExpc3QodGhpcy5wYWdlLHRoaXMubGltaXQpO1xyXG5cdFx0XHRcdFx0dGhpcy5jYWxsYmFjay5lbWl0KHtcclxuXHRcdFx0XHRcdFx0ZXZlbnQ6IFwiZGVsZXRlU3VjY2Vzc1wiLFxyXG5cdFx0XHRcdFx0XHRmb3JtTmFtZTogdGhpcy5mb3JtTmFtZSxcclxuXHRcdFx0XHRcdFx0ZGF0YTogcHJpbWFyeUtleVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnQoXCJDYW4ndCBsb2FkIGRlbGV0ZSBkYXRhLlwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKTtcclxuXHRcdH1cclxuXHR9XHJcblx0b3BlbkFkZEZvcm0oKSB7XHJcblx0XHR0aGlzLm1vZGUgPSAnYWRkJztcclxuXHRcdHRoaXMuZHluYW1pY0Zvcm0uc2V0TW9kZSgnYWRkJyk7XHJcblx0XHR0aGlzLmR5bmFtaWNGb3JtLnNldERlZmF1bHQoKTtcclxuXHRcdHRoaXMuZm9ybVBvcFVwLnNob3dQb3B1cCgpXHJcblx0XHR0aGlzLmNhbGxiYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogXCJhZGRPcGVuXCIsXHJcblx0XHRcdGZvcm1OYW1lOiB0aGlzLmZvcm1OYW1lLFxyXG5cdFx0XHRkYXRhOiBudWxsXHJcblx0XHR9KVxyXG5cdH1cclxuXHRsb2FkRWRpdERhdGEocHJpbWFyeUtleSkge1xyXG5cdFx0aWYgKHRoaXMuY29uZmlnLm1vZHVsZSAmJiB0aGlzLmNvbmZpZy5tb2R1bGUubGlzdCkge1xyXG5cdFx0XHRsZXQgcGF5bG9hZCA9IHtcclxuXHRcdFx0XHRtb2R1bGVOYW1lOiB0aGlzLmNvbmZpZy5tb2R1bGUubGlzdCxcclxuXHRcdFx0XHRwYXJhbTogcHJpbWFyeUtleVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMubG9ja1NjcmVlbi5sb2NrU2NyZWVuKClcclxuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuaHR0cFJlcXVlc3QucG9zdChwYXlsb2FkKS5zdWJzY3JpYmUoKHJlc3A6YW55KT0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcC5zdGF0dXMgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0bGV0IG1hcFNldCA9IHJlc3AuZGF0YVt0aGlzLmNvbmZpZy5tb2R1bGUubGlzdF1bMF07XHJcblx0XHRcdFx0XHR0aGlzLm1vZGUgPSAnZWRpdCc7XHJcblx0XHRcdFx0XHR0aGlzLmR5bmFtaWNGb3JtLnNldE1vZGUoJ2VkaXQnKTtcclxuXHRcdFx0XHRcdHRoaXMuZHluYW1pY0Zvcm0ubWFwU2V0VmFsdWUobWFwU2V0LCAwKTtcclxuXHRcdFx0XHRcdHRoaXMuZHluYW1pY0Zvcm0uc2V0U2F2ZVBvaW50KCk7XHJcblx0XHRcdFx0XHR0aGlzLmZvcm1Qb3BVcC5zaG93UG9wdXAoKTtcclxuXHRcdFx0XHRcdHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcblx0XHRcdFx0XHRcdGV2ZW50OiBcImVkaXRPcGVuXCIsXHJcblx0XHRcdFx0XHRcdGZvcm1OYW1lOiB0aGlzLmZvcm1OYW1lLFxyXG5cdFx0XHRcdFx0XHRkYXRhOiBudWxsXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydChcIkNhbid0IGxvYWQgZWRpdCBkYXRhLlwiKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjbGVhckZvcm0oKSB7XHJcblx0XHR0aGlzLmR5bmFtaWNGb3JtLnNldERlZmF1bHQoKTtcclxuXHR9XHJcblx0cmVzZXRGb3JtKCkge1xyXG5cdFx0dGhpcy5keW5hbWljRm9ybS5nZXRTYXZlUG9pbnQoKTtcclxuXHR9XHJcblx0c2F2ZSgpIHtcclxuXHRcdGxldCBwYXJhbSA9IHRoaXMucmVmaW5lZFNhdmVEYXRhKHRoaXMuZHluYW1pY0Zvcm0uZ2V0UGFyYW0oKSwgdGhpcy5mb3JtTmFtZSwgdGhpcy5wcm92aWRlRGF0YSk7XHJcblx0XHRpZiAodGhpcy5keW5hbWljRm9ybS5jaGVja1JlcXVpcmVBbGwoKSAmJiB0aGlzLmR5bmFtaWNGb3JtLmNoZWNrVmFsaWRhdGVBbGwoKSAmJiB0aGlzLnNhdmVDb250cm9sRnVuY3Rpb24odGhpcy5tb2RlLCB0aGlzLmZvcm1OYW1lLCBwYXJhbSkpIHtcclxuXHRcdFx0bGV0IHBheWxvYWQgPSB7fTtcclxuXHRcdFx0aWYgKHRoaXMubW9kZSA9PSAnYWRkJyAmJiB0aGlzLmNvbmZpZy5tb2R1bGUuYWRkKSB7XHJcblx0XHRcdFx0cGF5bG9hZCA9IHtcclxuXHRcdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1vZHVsZS5hZGQsXHJcblx0XHRcdFx0XHRwYXJhbVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm1vZGUgPT0gJ2VkaXQnICYmIHRoaXMuY29uZmlnLm1vZHVsZS5lZGl0KSB7XHJcblx0XHRcdFx0cGF5bG9hZCA9IHtcclxuXHRcdFx0XHRcdG1vZHVsZU5hbWU6IHRoaXMuY29uZmlnLm1vZHVsZS5lZGl0LFxyXG5cdFx0XHRcdFx0cGFyYW1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5sb2NrU2NyZWVuLmxvY2tTY3JlZW4oKVxyXG5cdFx0XHR0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy5odHRwUmVxdWVzdC5wb3N0KHBheWxvYWQpLnN1YnNjcmliZSgocmVzcDphbnkpID0+IHtcclxuXHRcdFx0XHR0aGlzLmxvY2tTY3JlZW4udW5Mb2NrU2NyZWVuKClcclxuXHRcdFx0XHRpZiAocmVzcCAmJiByZXNwLnN0YXR1cyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNsZWFyRmlsdGVyKClcclxuXHRcdFx0XHRcdHRoaXMucHJvY2Vzc0xvYWRMaXN0KHRoaXMucGFnZSx0aGlzLmxpbWl0KVxyXG5cdFx0XHRcdFx0dGhpcy5mb3JtUG9wVXAuY2xvc2VQb3B1cCh0cnVlKTtcclxuXHRcdFx0XHRcdHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcblx0XHRcdFx0XHRcdGV2ZW50OiBcInNhdmVTdWNjZXNzXCIsXHJcblx0XHRcdFx0XHRcdGZvcm1OYW1lOiB0aGlzLmZvcm1OYW1lLFxyXG5cdFx0XHRcdFx0XHRkYXRhOiBudWxsXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydChcIkVycm9yIGNhbid0IHNhdmUgZGF0YS5cIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdHRoaXMubG9ja1NjcmVlbi51bkxvY2tTY3JlZW4oKVxyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc0Vycm9yKGVycm9yKTtcclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzd2l0Y2hGaWx0ZXJNb2RlKCkge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyTW9kZSA9PT0gXCJzaW5nbGVcIikge1xyXG5cdFx0XHR0aGlzLmZpbHRlck1vZGUgPSBcIm11bHRpcGxlXCJcclxuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmZpbHRlckFkdmFuY2Uub3B0aW9uICYmIHRoaXMuY29uZmlnLmZpbHRlckFkdmFuY2Uub3B0aW9uLmxhYmVsQWxpZ24pIHtcclxuXHRcdFx0XHR0aGlzLmZpbHRlci5mb3JtLm9wdGlvbi5sYWJlbEFsaWduID0gdGhpcy5jb25maWcuZmlsdGVyQWR2YW5jZS5vcHRpb24ubGFiZWxBbGlnblxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZmlsdGVyRm9ybS5zZXRDb250YWluZXJBdHRyaWJ1dGUoXCJzaW5nbGVGaWx0ZXJcIixcImN1c3RvbUNsYXNzXCIsXCJoaWRlRmlsdGVyXCIpXHJcblx0XHRcdHRoaXMuZmlsdGVyRm9ybS5zZXRDb250YWluZXJBdHRyaWJ1dGUoXCJhZHZhbmNlRmlsdGVyXCIsXCJjdXN0b21DbGFzc1wiLFwiXCIpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmZpbHRlci5mb3JtLm9wdGlvbi5sYWJlbEFsaWduID0gXCJsZWZ0XCJcclxuXHRcdFx0dGhpcy5maWx0ZXJNb2RlID0gXCJzaW5nbGVcIjtcclxuXHRcdFx0dGhpcy5maWx0ZXJGb3JtLnNldENvbnRhaW5lckF0dHJpYnV0ZShcInNpbmdsZUZpbHRlclwiLFwiY3VzdG9tQ2xhc3NcIixcIlwiKVxyXG5cdFx0XHR0aGlzLmZpbHRlckZvcm0uc2V0Q29udGFpbmVyQXR0cmlidXRlKFwiYWR2YW5jZUZpbHRlclwiLFwiY3VzdG9tQ2xhc3NcIixcImhpZGVGaWx0ZXJcIilcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvY2Vzc0ZpbHRlcigpIHtcclxuXHRcdGxldCBwYXJhbTphbnkgPSB0aGlzLmZpbHRlckZvcm0uZ2V0UGFyYW0oKVxyXG5cdFx0aWYgKEpTT04uc3RyaW5naWZ5KHRoaXMudGVtcEZpbHRlcikgIT09IEpTT04uc3RyaW5naWZ5KHBhcmFtKSkge1xyXG5cdFx0XHR0aGlzLnRlbXBGaWx0ZXIgPSBwYXJhbTtcclxuXHRcdFx0dGhpcy5wYWdlID0gMTtcclxuXHRcdFx0dGhpcy5keW5hbWljVGFibGUuY3VycmVudFBhZ2UgPSAxXHJcblx0XHR9XHJcblx0XHR0aGlzLnByb2Nlc3NMb2FkTGlzdCh0aGlzLnBhZ2UsIHRoaXMubGltaXQpO1xyXG5cdH1cclxuXHRjbGVhckZpbHRlcigpIHtcclxuXHRcdHRoaXMuZmlsdGVyRm9ybS5zZXREZWZhdWx0KCk7XHJcblx0XHR0aGlzLnByb2Nlc3NGaWx0ZXIoKVxyXG5cdH1cclxuXHRhY3RLbm93bkVycm9yKCkge1xyXG5cdFx0dGhpcy5lcnJvclBvcFVwLmNsb3NlUG9wdXAodHJ1ZSk7XHJcblx0fVxyXG5cdHByb2Nlc3NFcnJvcihlcnJvcikge1xyXG5cdFx0ZXJyb3IgPSB0aGlzLnJlZmluZWRFcnJvcihlcnJvciAsIHRoaXMuZm9ybU5hbWUsIHRoaXMucHJvdmlkZURhdGEpXHJcblx0XHRsZXQgZXJyb3JNc2cgPSBcIlwiO1xyXG5cdFx0aWYgKGVycm9yLmVycm9yLm1lc3NhZ2UpIHtcclxuXHRcdFx0aWYgKHR5cGVvZihlcnJvci5lcnJvci5tZXNzYWdlKSA9PT0gXCJvYmplY3RcIiAmJiBlcnJvci5lcnJvci5tZXNzYWdlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRsZXQgZXJyb3JBcnJheSA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGVycm9yRGF0YVJvdyBvZiBlcnJvci5lcnJvci5tZXNzYWdlKSB7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mKGVycm9yRGF0YVJvdykgPT09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHRcdFx0ZXJyb3JBcnJheS5wdXNoKEpTT04uc3RyaW5naWZ5KGVycm9yRGF0YVJvdykpXHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZihlcnJvckRhdGFSb3cpID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHRcdGVycm9yQXJyYXkucHVzaChlcnJvckRhdGFSb3cpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVycm9yTXNnID0gZXJyb3JBcnJheS5qb2luKFwiPGJyPlwiKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVycm9yTXNnID0gZXJyb3IuZXJyb3IubWVzc2FnZVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlcnJvck1zZyA9IGVycm9yLm1lc3NhZ2VcclxuXHRcdH1cclxuXHRcdHRoaXMuZXJyb3JDb250ZW50ID0gZXJyb3JNc2dcclxuXHRcdHRoaXMuZXJyb3JQb3BVcC5zaG93UG9wdXAoKTtcclxuXHR9XHJcblx0Y2hlY2soKSB7XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLmZvcm0pXHJcblx0fVxyXG5cdG5nT25EZXN0cm95KCkge1xyXG5cdFx0dGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxyXG5cdH1cclxufVxyXG4iXX0=