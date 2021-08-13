import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {NgScrollbar} from 'ngx-scrollbar';
import {timer} from 'rxjs';
import {DynamicInputComponent} from '../dynamic-input.component';
import {AnimationService} from '../../../service/animation.service';

@Component({
	templateUrl: './auto-complete.component.html'
})
export class AutoCompleteComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
	@Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	@ViewChildren(NgScrollbar) aNgScrollBar: QueryList<NgScrollbar>;
	columnCalculate = '';
	objKeys = Object.keys;
	autoCompleteFilterList = [];
	displayAutoComplete = [];
	setOnList = [];
	maxShowData = 20;
	selectIndex = 0;
	tempValue = [];
	tempValueValidate = {};
	tempFilter = [];
	scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
	displayIndex = [];
	allowTempData: boolean;
	fixScrollBar: boolean;
	btnHover = false;
	assignByEnter = false;
	
	constructor(animationService : AnimationService) {
		super(animationService);
		this.animateProcess();
	}
	
	ngOnInit() {
		switch (this.fieldCreation.columnPerLine) {
			case 1 :
				this.columnCalculate = 'dp2Col1';
				break;
			case 2 :
				this.columnCalculate = 'dp2Col2';
				break;
			case 3 :
				this.columnCalculate = 'dp2Col3';
				break;
			case 4 :
				this.columnCalculate = 'dp2Col4';
				break;
			default :
				this.columnCalculate = '';
		}
		if (this.option.mode == 'add') {
			if (typeof (this.fieldCreation.default) != 'undefined') {
				this.data[this.fieldCreation.fieldName] = Object.assign([],[{
					display: '',
					value: ''
				}]);
				if (Array.isArray(this.fieldCreation.default) && this.checkDefault()) {
					let newDefault = [];
					for (let defaultDataRow of this.fieldCreation.default) {
						newDefault.push(Object.assign({}, defaultDataRow));
					}
					this.data[this.fieldCreation.fieldName] = newDefault;
				} else if (typeof (this.fieldCreation.default) == 'object' && this.checkDefault()) {
					this.data[this.fieldCreation.fieldName] = [Object.assign({}, this.fieldCreation.default)];
				}
			} else {
				this.data[this.fieldCreation.fieldName] = Object.assign([],[{
					display: '',
					value: ''
				}]);
			}
		}
		if (typeof (this.fieldCreation.maxShowData) != 'undefined' && parseInt(this.fieldCreation.maxShowData) > 0) {
			this.maxShowData = parseInt(this.fieldCreation.maxShowData);
		}
		for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
			this.autoCompleteFilterList[dataIndex] = [];
			this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
			this.setOnList[dataIndex] = false;
			this.tempValue[dataIndex] = Object.assign({}, this.data[this.fieldCreation.fieldName][dataIndex]);
		}
		// for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
		// 	this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
		// }
	}
	getDataFromValue(value) {
		for (let i of this.fieldCreation.valueList) {
			if (i.value === value) {
				return i;
			}
		}
		return null;
	}
	addMultiVal() {
		let dataLastIndex = this.data[this.fieldCreation.fieldName].length;
		this.autoCompleteFilterList[dataLastIndex] = [];
		this.displayAutoComplete[dataLastIndex] = 'autoCompleteHide';
		this.setOnList[dataLastIndex] = false;
		this.data[this.fieldCreation.fieldName].push({
			display: '',
			value: ''
		});
	}
	
	deleteMultiVal(dataIndex) {
		if (this.data[this.fieldCreation.fieldName].length > 1) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
		}
	}
	processClick(event, action, dataIndex) {
		if (this.fieldCreation.showAllOnClick) {
			this.selectIndex = 0;
			this.filterAutoComplete(dataIndex, true)
			this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
			if (this.aNgScrollBar.toArray()[dataIndex]) {
				this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
			}
		}
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		})
	}
	
	processFocus(event, action, dataIndex) {
		if (!this.fieldCreation.showButton || (this.fieldCreation.showButton && action === 'clickBtn')) {
			if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && !this.getDisable() && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == undefined || this.option.enableRowIndex[this.rowIndex] == true)))) {
				this.selectIndex = 0;
				this.filterAutoComplete(dataIndex);
				this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
			}
			this.callBack.emit({
				event: event,
				action: action,
				dataIndex: dataIndex,
				fieldName: this.fieldCreation.fieldName,
				value: this.data[this.fieldCreation.fieldName][dataIndex]
			});
			if (this.aNgScrollBar.toArray()[dataIndex]) {
				this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
			}
		}
	}
	
	hideList(dataIndex) {
		if (this.setOnList[dataIndex] == false) {
			this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
		}
	}
	
	setOverList(dataIndex) {
		this.setOnList[dataIndex] = true;
	}
	
	setOutList(dataIndex) {
		this.setOnList[dataIndex] = false;
	}
	
	processKeyUp(event, action, dataIndex) {
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
		if (!this.fieldCreation.showButton && event.which !== 38 && event.which !== 40) {
			this.allowTempData = true;
			if (this.checkReadonly()) {
				if (this.fieldCreation.valueList.length > 0 || this.fieldCreation.showAllOnClick == true) {
					if (typeof (this.data[this.fieldCreation.fieldName][dataIndex]) == 'undefined' || typeof (this.data[this.fieldCreation.fieldName][dataIndex].display) == 'undefined') {
						this.data[this.fieldCreation.fieldName][dataIndex] = {
							display: '',
							value: ''
						}
					}
					if (this.displayAutoComplete[dataIndex] != 'autoCompleteShow') {
						this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
					}
					let force = false;
					if (this.fieldCreation.showAllOnClick == true) {
						force = true
					}
					this.filterAutoComplete(dataIndex, force);
				}
				if (event.which == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != 'undefined') {
					this.assignByEnter = true;
					this.hideList(dataIndex);
				} else if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
					let regexpValue = this.fieldCreation.valuePattern
					if (typeof(this.fieldCreation.valuePattern) == "string") {
						regexpValue = new RegExp(this.fieldCreation.valuePattern);
					}
					if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)) {
						return true;
					} else {
						this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
						return false;
					}
				}
				if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
					for (let valueListRow of this.fieldCreation.valueList) {
						if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueListRow.display) {
							this.data[this.fieldCreation.fieldName][dataIndex].value = valueListRow.value;
							break;
						} else {
							this.data[this.fieldCreation.fieldName][dataIndex].value = '';
						}
					}
				}
			}
			let timerSb = timer(100)
				.subscribe(() => {
					if (this.aNgScrollBar.toArray()[dataIndex]) {
						this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
						timerSb.unsubscribe()
					}
				})
		}
	}
	
	processKeyDown(event, action, dataIndex) {
		if (this.fieldCreation.showButton) {
			this.hideList(dataIndex);
		}
		if (this.allowTempData == true) {
			this.tempValueValidate = this.data[this.fieldCreation.fieldName][dataIndex].display;
		}
		if (event.which == 38 && this.selectIndex > 0) {
			this.selectIndex--;
		} else if (event.which == 40 && this.selectIndex < (this.autoCompleteFilterList[dataIndex].length - 1)) {
			this.selectIndex++;
		}
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
	}
	
	processCall(data) {
		if (this.checkReadonly()) {
			if (data.process == 'processList') {
				let dataIndex = data.param.dataIndex;
				this.autoCompleteFilterList[dataIndex] = [];
				if (this.fieldCreation.valueList.length > 0) {
					if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
						let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
						for (let i of this.fieldCreation.valueList) {
							if (String(i.display).match(pattern)) {
								if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
									this.autoCompleteFilterList[dataIndex].push(i);
								} else {
									break;
								}
							}
						}
					}
				}
				this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
			} else if (data.process == 'clearFilter') {
				let dataIndex = data.param.dataIndex;
				this.autoCompleteFilterList[dataIndex] = [];
			}
		}
	}
	checkReadonly() {
		return (this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)))
	}
	assignData(event, dataIndex, data) {
		this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, data);
		this.tempValue[dataIndex] = Object.assign({}, data);
		this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
		this.setOnList[dataIndex] = false;
		this.callBack.emit({
			event: event,
			action: 'assignData',
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			assignData: data
		});
	}
	
	processCallBackKeyPress(event, action, dataIndex) {
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
		if (event.which == 32 || event.which > 46) {
			let key = event.key;
			let regexpInput = this.fieldCreation.inputPattern
			if (typeof(this.fieldCreation.inputPattern) == "string") {
				regexpInput = new RegExp(this.fieldCreation.inputPattern);
			}
			if (!String(key).match(regexpInput)) {
				return false;
			}
		}
		if (event.which == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != 'undefined') {
			this.assignByEnter = true;
			this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
			let data = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex])
			this.selectIndex = 0;
			this.callBack.emit({
				event: event,
				action: 'assignData',
				dataIndex: dataIndex,
				fieldName: this.fieldCreation.fieldName,
				assignData: data
			});
		}
		
		if (event.which != 46 && event.which != 8 && event.ctrlKey != true && event.altKey != true) {
			let key = event.key;
			let combineValue;
			if (typeof (this.tempValueValidate) != 'undefined') {
				combineValue = this.tempValueValidate + key;
			} else {
				combineValue = key;
			}
			let regexpInput = this.fieldCreation.inputPattern
			if (typeof(this.fieldCreation.inputPattern) == "string") {
				regexpInput = new RegExp(this.fieldCreation.inputPattern);
			}
			if (String(key).match(regexpInput)) {
				return true;
			}
			return false;
		}
		return true;
	}
	
	processBlur(event, action, dataIndex) {
		let validate = true;
		let regexpValue = this.fieldCreation.valuePattern
		if (typeof(this.fieldCreation.valuePattern) == "string") {
			regexpValue = new RegExp(this.fieldCreation.valuePattern);
		}
		if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)
			&& this.getDisable() == false) {
			let inputField: HTMLElement = event.currentTarget;
			inputField && inputField.focus();
			validate = false
		}
		if (typeof (this.fieldCreation.fixedValue) != 'undefined' && this.fieldCreation.fixedValue == true && this.btnHover == false) {
			if (this.data[this.fieldCreation.fieldName][dataIndex] && this.tempValue[dataIndex] && this.data[this.fieldCreation.fieldName][dataIndex].display != this.tempValue[dataIndex].display) {
				for (let valueList of this.fieldCreation.valueList) {
					if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueList.display) {
						this.tempValue[dataIndex] = Object.assign({}, valueList);
						break;
					}
				}
			}
			this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.tempValue[dataIndex]);
		}
		if (this.btnHover) {
			let timerSb = timer(100).subscribe(() => {
				event.target.focus();
				timerSb.unsubscribe();
			})
		}
		if (!this.fieldCreation.fixedValue && this.btnHover == false && !this.assignByEnter) {
			this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display
		}
		this.hideList(dataIndex);
		
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			validateStatus: validate,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
	}
	
	mouseOverChangeIndex(filterIndex) {
		// console.log(this.aNgScrollBar);
		
		
		this.selectIndex = filterIndex;
	}
	
	filterAutoComplete(dataIndex, force=false) {
		this.assignByEnter = false;
		this.refineValueList();
		if (((this.data[this.fieldCreation.fieldName][dataIndex].display
			&& (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0 || this.fieldCreation.showAllOnClick)
			&& this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display)
			|| this.fieldCreation.showAllData)
			&& this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display || force
		) {
			let resetSelectIndex = false;
			if (this.data[this.fieldCreation.fieldName][dataIndex].display.length == 0 && this.fieldCreation.showAllOnClick) {
				this.autoCompleteFilterList[dataIndex] = [];
				this.autoCompleteFilterList[dataIndex] = Object.assign(this.fieldCreation.valueList)
				resetSelectIndex = true;
			} else {
				this.autoCompleteFilterList[dataIndex] = [];
				// let filterList = this.autoCompleteFilterList[dataIndex];
				this.tempFilter[dataIndex] = this.data[this.fieldCreation.fieldName][dataIndex].display;
				// let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
				let pattern = this.data[this.fieldCreation.fieldName][dataIndex].display;
				for (let i of this.fieldCreation.valueList) {
					// if (String(i.display).match(pattern) > -1) {
					if (String(i.display).indexOf(pattern) > -1) {
						if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
							this.autoCompleteFilterList[dataIndex].push(i);
							resetSelectIndex = true;
						} else {
							break;
						}
					}
				}
			}
			if (resetSelectIndex == true) {
				this.selectIndex = 0;
			}
		}
	}
	
	refineValueList() {
		let newValueList = [];
		for (let listIndex in this.fieldCreation.valueList) {
			if (this.fieldCreation.disableRefined == undefined || this.fieldCreation.disableRefined == false) {
				if (this.fieldCreation.valueList[listIndex].display != '' && this.fieldCreation.valueList[listIndex].value != '') {
					newValueList.push({
						display: this.fieldCreation.valueList[listIndex].display,
						value: this.fieldCreation.valueList[listIndex].value
					});
				}
				if (this.fieldCreation.valueList[listIndex].display == '' && this.fieldCreation.valueList[listIndex].value != '') {
					newValueList.push({
						display: this.fieldCreation.valueList[listIndex].value,
						value: this.fieldCreation.valueList[listIndex].value
					});
				}
				if (this.fieldCreation.valueList[listIndex].value == '' && this.fieldCreation.valueList[listIndex].display != '') {
					newValueList.push({
						display: this.fieldCreation.valueList[listIndex].display,
						value: this.fieldCreation.valueList[listIndex].display
					});
				}
			} else {
				newValueList.push({
					display: this.fieldCreation.valueList[listIndex].display,
					value: this.fieldCreation.valueList[listIndex].value
				});
			}
		}
		this.fieldCreation.valueList = newValueList;
	}
	
	checkDefault() {
		let check = true;
		if (Array.isArray(this.fieldCreation.default)) {
			for (let dataRow of this.fieldCreation.default) {
				if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
					check = false;
				}
			}
		} else {
			let dataRow = Object.assign({},this.fieldCreation.default);
			if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
				check = false;
			}
		}
		return check;
	}
	setBtnHover(status){
		this.btnHover = status;
	}
}
