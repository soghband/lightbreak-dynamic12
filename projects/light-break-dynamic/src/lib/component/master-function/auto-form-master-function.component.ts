import {Component, OnInit, Input, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormHttpRequestService} from '../../service/form-http-request.service';
import {Subscription, timer} from 'rxjs';
import {ContentPopupComponent} from '../content-popup/content-popup.component';
import {DynamicFormComponent} from '../dynamic-form/dynamic-form.component';
import {DynamicTableComponent} from '../dynamic-table/dynamic-table.component';
import {LockScreenService} from '../../service/lock-screen.service';

@Component({
	template: '',
})
export class AutoFormMasterFunctionComponent implements OnInit, OnDestroy {
	@ViewChild("formPopUp") formPopUp: ContentPopupComponent;
	@ViewChild("confirmPopUp") confirmPopUp: ContentPopupComponent;
	@ViewChild("errorPopUp") errorPopUp: ContentPopupComponent;
	@ViewChild("dynamicForm") dynamicForm: DynamicFormComponent;
	@ViewChild("filterForm") filterForm: DynamicFormComponent;
	@ViewChild("dynamicTable") dynamicTable: DynamicTableComponent;
	@Input() saveControlFunction: Function = (mode, formName, param) => {
		return true;
	}
	@Input() refinedListData: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() refinedSaveData: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() refinedDeleteData: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() refinedMasterData: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() refinedListPayload: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() refinedError: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() refinedMasterDataPayload: Function = (data, formName="", provideData = null) => {
		return data;
	}
	@Input() provideData = {};
	@Input() formName = 'test';
	@Input() button = {
		add: "Add",
		save: "Save",
		clear: "Clear",
		reset: "Reset",
		search: "Search",
		confirm: "Confirm",
		cancel: "Cancel"
	}
	@Output() callback = new EventEmitter()
	private subscription : Subscription = new Subscription();
	order = [];
	mode = "add";
	form:any = {
		form: {},
		data: []
	};
	filterMode = "single";
	filter:any = {
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
	}
	model:any = {}
	dataList:any = {};
	config:any = {};
	page = 0;
	limit = 0;
	tempDelete = null;
	masterData:any = {};
	errorContent = "";
	private tempFilter = null;
	
	constructor(private httpRequest: FormHttpRequestService, private lockScreen: LockScreenService) {
	}
	ngOnInit(): void {
		this.subscription.add(timer(100).subscribe(()=> {
			this.getConfig();
		}))
	}
	getConfig() {
		let savedConfigRaw = localStorage.getItem("masterFormData")
		let savedConfig = null;
		let parseConfig = null;
		if (savedConfigRaw !== null) {
			parseConfig = JSON.parse(savedConfigRaw);
		}
		if (parseConfig && parseConfig[this.formName]) {
			savedConfig = parseConfig[this.formName]
		}
		let checkHash = this.httpRequest.getHash(this.formName);
		this.lockScreen.lockScreen()
		if (checkHash === null || savedConfig == null || (savedConfig && checkHash !== savedConfig.hash)) {
			this.subscription.add(this.httpRequest.getConfig(this.formName).subscribe((resp:any) => {
				this.lockScreen.unLockScreen()
				if (resp.status && resp.status == true) {
					this.config = resp.config;
					let saveConfig = {
						hash: checkHash,
						config: this.config
					}
					if (!parseConfig) {
						parseConfig = {}
					}
					parseConfig[this.formName] = saveConfig;
					localStorage.setItem("masterFormData", JSON.stringify(parseConfig));
					this.processConfig();
				}
			}))
		} else {
			this.config = savedConfig.config;
			this.processConfig();
		}
	}
	processConfig() {
		if (this.config.list) {
			this.dataList = this.config.list
		}
		if (this.config.model) {
			this.model = this.config.model
		}
		if (this.config.form) {
			this.form.form = this.config.form;
			this.subscription.add(timer(250).subscribe(() => {
				if (this.form.data.length == 0) {
					this.dynamicForm.addRow();
				}
			}))
		}
		if (this.config.filterAdvance) {
			this.subscription.add(timer(250).subscribe(() => {
				let advanceFilter = {
					containerName: "advanceFilter",
					customClass: "hideFilter",
					columnSpan: "1/1",
					fieldList: this.config.filterAdvance.fieldList
				}
				this.filter.form.containerList.push(advanceFilter)
				this.filterForm.reRenderForm()
				this.filterForm.addRow();
				this.processLoadMasterData();
			}))
		} else {
			this.subscription.add(timer(500).subscribe(() => {
				this.filterForm.addRow();
				this.processLoadMasterData();
			}))
		}
		if (this.config.button) {
			this.button = this.config.button
		}
	}
	processLoadMasterData() {
		if (this.config.masterData) {
			let payload = {
				dataList: []
			}
			for (let fieldName in this.config.masterData) {
				payload.dataList.push({
					moduleName: this.config.masterData[fieldName]
				})
			}
			payload = this.refinedMasterDataPayload(payload, this.formName, this.provideData);
			this.lockScreen.lockScreen()
			this.subscription.add(this.httpRequest.post(payload).subscribe((resp:any)=> {
				this.lockScreen.unLockScreen()
				if (resp && resp.status == true) {
					for (let fieldName in this.config.masterData) {
						this.masterData[fieldName] = resp.data[this.config.masterData[fieldName]]
					}
					this.masterData = this.refinedMasterData(this.masterData, this.formName, this.provideData);
					this.processAssignMasterData();
				} else {
					alert("Error loading master data.")
				}
			}))
		}
	}
	processAssignMasterData() {
		let mapSetAttr = {};
		for (let fieldName in this.masterData) {
			mapSetAttr[fieldName] = {
				valueList: this.masterData[fieldName]
			}
		}
		this.dynamicForm.mapSetAttribute(mapSetAttr);
		this.filterForm.mapSetAttribute(mapSetAttr);
		this.processLoadList(1, (this.dataList.rowLimit ? this.dataList.rowLimit : 10), false)
	}
	processLoadList(page = 1, limit = 10, filter = true) {
		this.page = page;
		this.limit = limit;
		let filterParam:any = this.filterForm.getParam();
		if (this.config.module && this.config.module.list) {
			let payload = {
				moduleName: this.config.module.list,
				limit: limit,
				page: page
			}
			if (filter && this.filterMode == "single" && filterParam.filter && filterParam.filter.length > 0) {
				let param = {};
				for (let paramName of this.config.filter.paramList) {
					param[paramName] = filterParam.filter;
				}
				payload["param"] = param
				payload["condition"] = this.config.filter.condition
			} else if (filter && this.filterMode == "multiple") {
				payload["param"] = filterParam
				payload["condition"] = this.config.filterAdvance.condition
			}
			if (this.order.length > 0) {
				payload["sort"] = this.order
			}
			payload = this.refinedListPayload(payload, this.formName, this.provideData)
			this.lockScreen.lockScreen()
			this.subscription.add(this.httpRequest.post(payload).subscribe((resp:any)=> {
				this.lockScreen.unLockScreen()
				if (resp.status == true) {
					if (resp.data[this.config.module.list] && resp.data[this.config.module.list].length > 0) {
						this.dataList.data = this.refinedListData(resp.data[this.config.module.list], this.formName, this.provideData);
						this.dataList.pagination = resp.data[this.config.module.list+"Pagination"]
					} else {
						if (this.page > 1){
							this.page--;
							this.dynamicTable.currentPage = this.page;
							this.processLoadList(this.page, this.limit);
						} else {
							this.dataList.data = null
							this.dataList.pagination = resp.data[this.config.module.list+"Pagination"]
						}
					}
				}
			}));
		}
	}
	processListCallback(e) {
		if (e.action == 'page') {
			this.processLoadList(e.pageNumber, e.limit);
		} else if (e.action == 'edit') {
			this.loadEditData(e.primaryKey);
		} else if (e.action == 'delete') {
			this.tempDelete = e.primaryKey;
			this.confirmPopUp.showPopup();
		} else if (e.action == "sort") {
			this.order = [];
			this.order.push({
				fieldName: e.fieldName,
				order: e.order
			})
			this.processLoadList(this.page, this.limit);
		}
		this.callback.emit({
			event: "listEvent",
			formName: this.formName,
			data: e
		})
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
			}
			this.lockScreen.lockScreen()
			this.subscription.add(this.httpRequest.post(payload).subscribe((resp:any)=> {
				this.lockScreen.unLockScreen()
				if (resp.status == true) {
					this.processLoadList(this.page,this.limit);
					this.callback.emit({
						event: "deleteSuccess",
						formName: this.formName,
						data: primaryKey
					})
				} else {
					alert("Can't load delete data.");
				}
			}));
		}
	}
	openAddForm() {
		this.mode = 'add';
		this.dynamicForm.setMode('add');
		this.dynamicForm.setDefault();
		this.formPopUp.showPopup()
		this.callback.emit({
			event: "addOpen",
			formName: this.formName,
			data: null
		})
	}
	loadEditData(primaryKey) {
		if (this.config.module && this.config.module.list) {
			let payload = {
				moduleName: this.config.module.list,
				param: primaryKey
			}
			this.lockScreen.lockScreen()
			this.subscription.add(this.httpRequest.post(payload).subscribe((resp:any)=> {
				this.lockScreen.unLockScreen()
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
					})
				} else {
					alert("Can't load edit data.")
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
				}
			} else if (this.mode == 'edit' && this.config.module.edit) {
				payload = {
					moduleName: this.config.module.edit,
					param
				}
			}
			this.lockScreen.lockScreen()
			this.subscription.add(this.httpRequest.post(payload).subscribe((resp:any) => {
				this.lockScreen.unLockScreen()
				if (resp && resp.status == true) {
					this.clearFilter()
					this.processLoadList(this.page,this.limit)
					this.formPopUp.closePopup(true);
					this.callback.emit({
						event: "saveSuccess",
						formName: this.formName,
						data: null
					})
				} else {
					alert("Error can't save data.");
				}
			},(error) => {
				this.lockScreen.unLockScreen()
				this.processError(error);
			}));
		}
	}
	switchFilterMode() {
		if (this.filterMode === "single") {
			this.filterMode = "multiple"
			if (this.config.filterAdvance.option && this.config.filterAdvance.option.labelAlign) {
				this.filter.form.option.labelAlign = this.config.filterAdvance.option.labelAlign
			}
			this.filterForm.setContainerAttribute("singleFilter","customClass","hideFilter")
			this.filterForm.setContainerAttribute("advanceFilter","customClass","")
		} else {
			this.filter.form.option.labelAlign = "left"
			this.filterMode = "single";
			this.filterForm.setContainerAttribute("singleFilter","customClass","")
			this.filterForm.setContainerAttribute("advanceFilter","customClass","hideFilter")
		}
	}
	processFilter() {
		let param:any = this.filterForm.getParam()
		if (JSON.stringify(this.tempFilter) !== JSON.stringify(param)) {
			this.tempFilter = param;
			this.page = 1;
			this.dynamicTable.currentPage = 1
		}
		this.processLoadList(this.page, this.limit);
	}
	clearFilter() {
		this.filterForm.setDefault();
		this.processFilter()
	}
	actKnownError() {
		this.errorPopUp.closePopup(true);
	}
	processError(error) {
		error = this.refinedError(error , this.formName, this.provideData)
		let errorMsg = "";
		if (error.error.message) {
			if (typeof(error.error.message) === "object" && error.error.message.length > 0) {
				let errorArray = [];
				for (let errorDataRow of error.error.message) {
					if (typeof(errorDataRow) === "object") {
						errorArray.push(JSON.stringify(errorDataRow))
					} else if (typeof(errorDataRow) === "string") {
						errorArray.push(errorDataRow)
					}
				}
				errorMsg = errorArray.join("<br>")
			} else {
				errorMsg = error.error.message
			}
		} else {
			errorMsg = error.message
		}
		this.errorContent = errorMsg
		this.errorPopUp.showPopup();
	}
	check() {
		console.log(this.form)
	}
	ngOnDestroy() {
		this.subscription.unsubscribe()
	}
}
