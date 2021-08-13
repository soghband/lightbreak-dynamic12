import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';


@Component({
	templateUrl: './textbox.component.html'
})
export class TextBoxComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
 	@Input() fieldCreation;
 	@Input() inputIndex;
 	@Input() rowIndex;
	@Output() callBack = new EventEmitter();
	columnCalculate = "";
	objKeys = Object.keys;
	tempValue;
    allowTempData: boolean;
	constructor(animationService : AnimationService) {
		super(animationService);
		this.animateProcess();
	}
	ngOnInit() {
		switch (this.fieldCreation.columnPerLine) {
			case 1 :
				this.columnCalculate = "dp2Col1";
				break;
			case 2 :
				this.columnCalculate = "dp2Col2";
				break;
			case 3 :
				this.columnCalculate = "dp2Col3";
				break;
			case 4 :
				this.columnCalculate = "dp2Col4";
				break;
			default :
				this.columnCalculate = "";
		}
		if (this.option.mode == "add") {
			if (typeof(this.fieldCreation.default) != "undefined") {
				if (Array.isArray(this.fieldCreation.default)) {
					this.data[this.fieldCreation.fieldName] = Object.assign([],this.fieldCreation.default);
				} else if(typeof( this.fieldCreation.default) == "string") {
					this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
				}
			} else {
				this.data[this.fieldCreation.fieldName] = [""];
			}
		}
	}
	addMultiVal() {
		this.data[this.fieldCreation.fieldName].push("");
	}

	deleteMultiVal(dataIndex) {
		if (this.data[this.fieldCreation.fieldName].length > 1) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
		}
	}
	processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName,
	        value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        this.allowTempData = true;
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)){
	        let regexpValue = this.fieldCreation.valuePattern
	        if (typeof(this.fieldCreation.valuePattern) == "string") {
		        regexpValue = new RegExp(this.fieldCreation.valuePattern);
	        }
			if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
				&& String(event.target.value).match(regexpValue)) {
				return true;
			} else {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
				return false;
			}
		}

	}
	processKeyDown(event, action, dataIndex) {
		if (this.allowTempData == true) {
			this.allowTempData = false;
			this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
		}
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName,
	        value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
	}
	processCallBackKeyPress(event, action, dataIndex) {
		this.callBack.emit({
			event:event,
			action:action,
			dataIndex:dataIndex,
			fieldName:this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		});
		if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true){
			let key = event.key;
			let combineValue = this.tempValue + key;
			let check = true;
			let regexpInput = this.fieldCreation.inputPattern
			if (typeof(this.fieldCreation.inputPattern) == "string") {
				regexpInput = new RegExp(this.fieldCreation.inputPattern);
			}
			if (typeof(this.fieldCreation.inputPattern) != "undefined") {
				if (!String(key).match(regexpInput)) {
                	check = false;
				}
			}
            if (typeof(this.fieldCreation.validateWhileKeyPress) != "undefined"
                && typeof(this.fieldCreation.valuePattern) != "undefined"
                && this.fieldCreation.validateWhileKeyPress) {
	            let regexpValue = this.fieldCreation.valuePattern
	            if (typeof(this.fieldCreation.valuePattern) == "string") {
		            regexpValue = new RegExp(this.fieldCreation.valuePattern);
	            }
                if (!String(combineValue).match(regexpValue)) {
                    check = false;
                }
            }
            if (check == false) {
				return false
			}
		}
		return true;
	}
	processBlur(event, action, dataIndex) {
		let validate = true;
		let regexpValue = this.fieldCreation.valuePattern
		if (typeof(this.fieldCreation.valuePattern) == "string") {
			regexpValue = new RegExp(this.fieldCreation.valuePattern);
		}
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
			&& this.getDisable() == false) {
	        let inputField: HTMLElement = event.currentTarget;
	        inputField && inputField.focus();
            validate = false;
		}
        if (this.fieldCreation.type == "number") {
			if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] < parseFloat(this.fieldCreation.min)) {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.min;
			}
			if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] > parseFloat(this.fieldCreation.max)) {
				this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.max;
			}
		}
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
			validateStatus:validate,
            fieldName: this.fieldCreation.fieldName,
	        value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        return validate;
	}

	getType() {
		if (this.fieldCreation.type == "number") {
			return "number";
		} else if (this.fieldCreation.type == "password") {
			return "password";
		} else {
			return "textbox";
		}
	}
}
