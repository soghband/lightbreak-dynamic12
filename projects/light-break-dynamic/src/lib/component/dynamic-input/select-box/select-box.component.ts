import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

@Component({
	templateUrl: './select-box.component.html'
})
export class SelectBoxComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	objKeys = Object.keys;
	columnCalculate;
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
				if (typeof(this.fieldCreation.valueList[0]) != "undefined") {
					this.data[this.fieldCreation.fieldName] = [this.fieldCreation.valueList[0].value];
				}
			}
		}
	}
	processCall(data) {

	}
	processChange(event,action,dataIndex) {
		let valueObj = [];
		for (let dataIndexRaw in this.data[this.fieldCreation.fieldName]) {
			let value = this.data[this.fieldCreation.fieldName][dataIndexRaw];
			for(let valueListRow of this.fieldCreation.valueList) {
				if (valueListRow.value == value) {
					valueObj.push(valueListRow);
				}
			}
		}

		this.callBack.emit({
			event:event,
			action:action,
			dataIndex:dataIndex,
			valueObj:valueObj,
			fieldName:this.fieldCreation.fieldName
		})
	}

    checkValueList(valueList) {
		if (valueList != undefined){
			return true;
		}
		return false;
    }
}
