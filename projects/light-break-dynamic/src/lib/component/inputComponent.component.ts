import {Component, Input, Output, ViewContainerRef, EventEmitter} from '@angular/core';
import {AnimationService} from '../service/animation.service';

@Component({
	selector: 'lb9-input',
	template: ''
})
export class InputComponent {
	constructor(public viewContainerRef: ViewContainerRef,private animationService: AnimationService) { }
	@Input() data;
	@Input() type;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
	@Input() rowIndex;
	@Output() callBack: EventEmitter<any>;
	@Output() panelCallBack: EventEmitter<any>;
	processCall(data) {
		// console.log(1,data);
	};
}
