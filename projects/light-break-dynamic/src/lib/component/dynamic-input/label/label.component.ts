import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

@Component({
  templateUrl: './label.component.html'
})
export class LabelComponent extends DynamicBehaviorComponent implements OnInit {
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
	}
	processCall(data) {

	}
	processPanelCallBack(event) {
		this.panelCallBack.emit({
			feildName: this.fieldCreation.fieldName
		});
	}
}
