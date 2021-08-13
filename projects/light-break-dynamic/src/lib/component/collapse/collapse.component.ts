import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SlideInOutAnimation} from './animetion';
import {timer} from 'rxjs';

@Component({
	selector: 'lb9-collapse',
	templateUrl: './collapse.component.html',
	styleUrls: ['./collapse.component.scss'],
	animations: [SlideInOutAnimation]
})
export class CollapseComponent implements OnInit {
	@Input() header = 'Collapse';
	@Output() callBack = new EventEmitter();
	
	animationState = 'out';
	active = false;
	onAction = false;
	
	timeDelay = timer(1000);
	
	constructor() {
	}
	
	ngOnInit(): void {
	}
	
	toggleShowDiv() {
		if (this.onAction === false) {
			if (this.animationState === 'out') {
				this.animationState = 'in';
				this.active = true;
			} else {
				this.animationState = 'out';
				this.active = false;
			}
			this.onAction = true;
			this.timeDelay.subscribe(() => {
				this.onAction = false;
			})
		}
	}
}
