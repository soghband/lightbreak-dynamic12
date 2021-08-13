import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

@Component({
	templateUrl: './check-box.component.html'
})
export class CheckBoxComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	objKey = Object.keys;
	columnCalculate;
	showSelectAll = "dp2hide";
	selectAll = false;
	singleLine = "";
    scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
    checkboxDisplay = "checkboxHide";
    
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
			if (typeof(this.fieldCreation.default) == "object") {
				this.data[this.fieldCreation.fieldName] = Object.assign({},this.fieldCreation.default);
			} else {
				let defaultVal = {};
				for (let valueIndex in this.fieldCreation.valueList) {
					defaultVal[this.fieldCreation.valueList[valueIndex].value] = false;
				}
				this.data[this.fieldCreation.fieldName] = defaultVal;
			}
		}
		if (this.fieldCreation.showSelectAll == true) {
			this.showSelectAll = ""
		}

		if (this.fieldCreation.displaySingleLine == true || this.option.displayMode == "table") {
			this.singleLine = "singlePerLine";
		} else {
            this.singleLine = "multiplePerLine";
		}
		if (this.option.displayMode != 'table') {
			this.checkboxDisplay = "checkboxShow";
		}
	}
	toggleSelectAll() {
		if (this.selectAll == true) {
			for (let dataIndex in this.fieldCreation.valueList) {
				this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = true;
			}
		} else {
			for  (let dataIndex in this.fieldCreation.valueList) {
				this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = false;
			}
		}
		this.callBack.emit({
			action:'selectAll',
			value: this.selectAll,
			fieldName:this.fieldCreation.fieldName
		});
	}
	processCall(data) {

	}

	processChange(event, s, valueList) {
		this.callBack.emit({
			action:'change',
			displayValue: valueList,
			currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
			fieldName:this.fieldCreation.fieldName
		});
	}
    toggleShowCheckBox() {
		if (!this.getDisable()) {
			if (this.checkboxDisplay == "checkboxHide") {
				this.checkboxDisplay = "checkboxShow"
			} else {
				this.checkboxDisplay = "checkboxHide"
			}
		}
	}

	haveChecked() {
		let haveChecked = false;
		for (let valueName in this.data[this.fieldCreation.fieldName]) {
			if (this.data[this.fieldCreation.fieldName][valueName] == true) {
				haveChecked = true;
				break;
			}
		}
		return haveChecked;
	}
}
