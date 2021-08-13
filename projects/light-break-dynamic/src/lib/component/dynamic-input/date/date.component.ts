import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {AnimationService} from '../../../service/animation.service';
import {DatePickerComponent} from './date-picker/date-picker.component';


@Component({
	templateUrl: './date.component.html',
})
export class DateComponent extends DynamicBehaviorComponent implements OnInit {
	@ViewChildren('dateInput') dateInputVC : QueryList<ElementRef>;
	@ViewChildren('datePicker') calendarVC : QueryList<DatePickerComponent>;
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
	@Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	defaultMonthListLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	defaultMonthListShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	defaultWeekDay = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
	columnCalculate = '';
	objKeys = Object.keys;
	calendarIndex = 0;
	tempValue;
	haveChange = false;
	
	constructor(animationService : AnimationService) {
		super(animationService);
		this.animateProcess();
	}
	
	ngOnInit() {
		if (this.fieldCreation.monthListLong === undefined) {
			this.fieldCreation.monthListLong = this.defaultMonthListLong
		}
		if (this.fieldCreation.monthListShort === undefined) {
			this.fieldCreation.monthListShort = this.defaultMonthListShort
		}
		if (this.fieldCreation.weekDay === undefined) {
			this.fieldCreation.weekDay = this.defaultWeekDay
		}
		if (this.fieldCreation.yearOffset === undefined) {
			this.fieldCreation.yearOffset = 0
		}
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
				if (Array.isArray(this.fieldCreation.default)) {
					this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
				} else if (typeof (this.fieldCreation.default) == 'string') {
					this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
				}
			} else {
				this.data[this.fieldCreation.fieldName] = [{
					display:"",
					value:""
				}];
			}
		}
		for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
			if (String(this.data[this.fieldCreation.fieldName][dataIndex].value).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
				this.setDisplay(dataIndex);
			}
		}
	}
	
	addMultiVal() {
		this.data[this.fieldCreation.fieldName].push({
			display:"",
			value:""
		});
	}
	
	deleteMultiVal(dataIndex) {
		if (this.data[this.fieldCreation.fieldName].length > 1) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
		}
	}
	
	processKeyUp(event, action, dataIndex) {
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
		if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
			let regexp = this.fieldCreation.valuePattern
			if (typeof(this.fieldCreation.valuePattern) == "string") {
				regexp = new RegExp(this.fieldCreation.valuePattern);
			}
			if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexp)) {
				return true;
			} else {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
				return false;
			}
		}
		
	}
	
	processKeyDown(event, action, dataIndex) {
		this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
		this.haveChange = true;
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
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
		if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
			let key = event.key;
			let combineValue = this.tempValue + key;
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
		let calendarRef = this.calendarVC.toArray();
		calendarRef[this.calendarIndex].closeCalendar();
		if (this.haveChange) {
			let regexpValue = this.fieldCreation.valuePattern
			if (typeof(this.fieldCreation.valuePattern) == "string") {
				regexpValue = new RegExp(this.fieldCreation.valuePattern);
			}
			if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)) {
				event.target.focus();
				validate = false;
			} else {
				if (this.fieldCreation.inputDatePattern) {
					let dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].display.split(/(-|\s|\/)/)
					let patternSplit = this.fieldCreation.inputDatePattern.toLowerCase().split(/(-|\s|\/)/)
					let year = 0;
					let month = 0;
					let day = 0;
					for (let dataTypeIndex in patternSplit) {
						if (patternSplit[dataTypeIndex].substr(0,1) === "y") {
							if (this.fieldCreation.inputYearOffset) {
								year = parseInt(dataSplit[dataTypeIndex]) + parseInt(this.fieldCreation.inputYearOffset);
							} else {
								year = parseInt(dataSplit[dataTypeIndex])
							}
						}
						if (patternSplit[dataTypeIndex].substr(0,1) === "m") {
							month = parseInt(dataSplit[dataTypeIndex]) - 1;
						}
						if (patternSplit[dataTypeIndex].substr(0,1) === "d") {
							day = parseInt(dataSplit[dataTypeIndex]);
						}
					}
					let dateCheck = new Date(year,month,day);
					let dateString = dateCheck.getFullYear()+"-"+(dateCheck.getMonth()+1)+"-"+dateCheck.getDate()
					this.data[this.fieldCreation.fieldName][dataIndex].value = dateString;
				} else {
					this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display
				}
				this.setDisplay(dataIndex)
				this.haveChange = false
			}
		}
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			validateStatus: validate,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
	}
	
	processCall(data) {
	
	}
	
	processPanelCallBack(event) {
		this.panelCallBack.emit({
			feildName: this.fieldCreation.fieldName
		});
	}
	
	setDate(event,dataIndex) {
		let dateString = event.year + '-' + this.pad((event.month + 1),2) + '-' + this.pad(event.day,2);
		this.data[this.fieldCreation.fieldName][dataIndex] = {
			display: dateString,
			value: dateString
		};
		if (this.fieldCreation.displayFormat) {
			this.setDisplay(dataIndex);
		}
	}
	setDisplay(dataIndex) {
		let dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].value.split("-");
		let dateSet = {
			year: parseInt(dataSplit[0]),
			month: (parseInt(dataSplit[1])-1),
			day: parseInt(dataSplit[2]),
		}
		let dateString = this.fieldCreation.displayFormat;
		let valueString = dateSet.year + '-' + this.pad((dateSet.month + 1),2) + '-' + this.pad(dateSet.day,2);
		if (dateString.indexOf("DD") > -1) {
			let stringDD = this.pad(dateSet.day,2);
			dateString = dateString.replace("DD", stringDD);
		} else if (dateString.indexOf("D") > -1) {
			let stringD = String(dateSet.day);
			dateString = dateString.replace("D", stringD);
		}
		if (dateString.indexOf("MMMM") > -1) {
			let stringMMMM = this.fieldCreation.monthListLong[dateSet.month];
			dateString = dateString.replace("MMMM", stringMMMM);
		} else if (dateString.indexOf("MMM") > -1) {
			let stringMMM = this.fieldCreation.monthListShort[dateSet.month];
			dateString = dateString.replace("MMM", stringMMM);
		} else if (dateString.indexOf("MM") > -1) {
			let stringMM = this.pad((dateSet.month + 1),2);
			dateString = dateString.replace("MM", stringMM);
		} else if (dateString.indexOf("M") > -1) {
			let stringM = String(dateSet.month + 1);
			dateString = dateString.replace("M", stringM);
		}
		if (dateString.indexOf("YYYY") > -1) {
			let stringYYYY = String(dateSet.year + this.fieldCreation.yearOffset);
			dateString = dateString.replace("YYYY", stringYYYY);
		} else if (dateString.indexOf("YY") > -1) {
			let stringYY = String(dateSet.year + this.fieldCreation.yearOffset).substr(2,2);
			dateString = dateString.replace("YY", stringYY);
		}
		this.data[this.fieldCreation.fieldName][dataIndex] = {
			display: dateString,
			value: valueString
		};
	}
	pad(n, width, z='0') {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	getDateDisable() {
		if (this.getDisable() ||
			(((this.fieldCreation.yearOffset && this.fieldCreation.yearOffset != 0) ||
			(this.fieldCreation.displayFormat && this.fieldCreation.displayFormat != "YYYY-MM-DD")) &&
				(!this.fieldCreation.valuePattern || !this.fieldCreation.inputDatePattern))) {
			return true;
		}
		return false;
	}
	
	setFocus(data) {
		let inputRef = this.dateInputVC.toArray();
		inputRef[this.calendarIndex].nativeElement.focus()
	}
	openCalendar(data,index) {
		this.calendarIndex = index
		let calendarRef = this.calendarVC.toArray();
		let inputRef = this.dateInputVC.toArray();
		calendarRef[index].open(data);
		inputRef[index].nativeElement.focus()
	}
}
