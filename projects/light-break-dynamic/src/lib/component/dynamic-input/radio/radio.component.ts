import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

class DynamicBehaviorComponentimplements {
}

@Component({
	templateUrl: './radio.component.html',
})
export class RadioComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	objKey = Object.keys;
	columnCalculate;
	selectAll = false;
	singleLine = "";
	
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
        if (this.fieldCreation.displaySingleLine == true) {
            this.singleLine = "singleLine";
        }
	}
	processCall(data) {

	}

	processChange($event, s, valueList) {
		this.callBack.emit({
			action:'change',
			displayValue: valueList,
			currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
			fieldName:this.fieldCreation.fieldName
		});
	}
}
