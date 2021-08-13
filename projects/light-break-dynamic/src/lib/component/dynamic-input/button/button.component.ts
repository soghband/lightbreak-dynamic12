import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

@Component({
	templateUrl: './button.component.html'
})
export class ButtonComponent extends DynamicBehaviorComponent implements OnInit {
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
	}

	processClick(event, action, dataIndex, valueList) {
        if (!this.getDisable() && !this.disableList(valueList.value)) {
			if (typeof(this.data[this.fieldCreation.fieldName]) != "undefined" && typeof(this.data[this.fieldCreation.fieldName][dataIndex]) != "undefined") {
				this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
			}
			this.callBack.emit({
				event:event,
				action:action,
				dataIndex:dataIndex,
				valueList:valueList,
				fieldName:this.fieldCreation.fieldName
			});
		}
	}
	disableList(value) {
		if (this.fieldCreation.disableList && this.fieldCreation.disableList.indexOf(value) > -1) {
			return true;
		}
		return false;
	}
}
