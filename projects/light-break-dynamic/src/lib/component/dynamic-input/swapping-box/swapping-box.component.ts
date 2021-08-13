import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

@Component({
  templateUrl: './swapping-box.component.html',
})
export class SwappingBoxComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	columnCalculate;
	modeDisplay = "";
	objKeys = Object.keys;
	optionText = "Option";
	selectedText = "Selected";
	selectAllText = "Select All";
	removeAllText = "Remove All";
    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
	filter = "";
	filterToggle = "filterInvisible";
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
			this.modeDisplay = "dp2hide"
		} else {
			this.modeDisplay = "";
		}
		if (this.fieldCreation.optionText) {
			this.optionText = this.fieldCreation.optionText
		}
		if (this.fieldCreation.selectedText) {
			this.selectedText = this.fieldCreation.selectedText
		}
		if (this.fieldCreation.selectAllText) {
			this.selectAllText = this.fieldCreation.selectAllText
		}
		if (this.fieldCreation.removeAllText) {
			this.removeAllText = this.fieldCreation.removeAllText
		}
	}
	processCall(data) {

	}
	processPanelCallBack(event) {
		this.panelCallBack.emit({
			feildName: this.fieldCreation.fieldName
		});
	}

    checkDestData(valueList) {
		let checkValue = valueList.value;
		let checkDisplay = valueList.display.toLowerCase();
        let foundFlag = false;
        for (let dataRow of this.data[this.fieldCreation.fieldName]) {
            if (dataRow.value == checkValue) {
                foundFlag = true;
                break;
            }
        }

		if (foundFlag == true) {
			return false;
		}
	    if (this.filter.length > 0 && checkDisplay.indexOf(this.filter.toLowerCase()) == -1) {
		    return false
	    }
		return true;
    }

    transferData(valueIndex) {
        if (!this.getDisable()) {
            let value = this.fieldCreation.valueList[valueIndex].value;
            let foundFlag = false;
            for (let dataRow of this.data[this.fieldCreation.fieldName]) {
                if (dataRow.value == value) {
                    foundFlag = true;
                    break;
                }
            }
            if (foundFlag == false) {
                if (typeof(this.data[this.fieldCreation.fieldName]) == "undefined") {
                    this.data[this.fieldCreation.fieldName] = [];
                }
                this.data[this.fieldCreation.fieldName].push(this.fieldCreation.valueList[valueIndex])
            }
            let valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "add",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            })
        }
    }
    removeData(dataIndex) {
		if (!this.getDisable()) {
			this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
			let valueObj = Object.assign([],this.data[this.fieldCreation.fieldName]);
			this.callBack.emit({
				action:"remove",
				valueObj:valueObj,
				fieldName:this.fieldCreation.fieldName
			})
		}
	}
	removeAll() {
		this.data[this.fieldCreation.fieldName] = [];
	}
	selectAll() {
		this.data[this.fieldCreation.fieldName] = this.fieldCreation.valueList;
	}
	toggleFilter() {
		if (this.filterToggle === "filterInvisible") {
			this.filterToggle = "filterVisible";
		} else {
			this.filter = ""
			this.filterToggle = "filterInvisible";
		}
	}
}
