import {EventEmitter, Injectable} from '@angular/core';
import {interval, timer} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AnimationService {
	
	animationEmitter = new EventEmitter();
	animationRegister = [];
	animationState = 'initial';
	initStateTimer = timer(100);
	animateQueueInterval = timer(100);
	reRendering = false;
	enableAnimation = false;
	
	count = 0;
	
	constructor() {
	
	}
	registerAnimation(elementName) {
		if (!this.reRendering && this.enableAnimation) {
			const registerName = elementName + '_' + this.animationRegister.length;
			this.animationRegister.push(registerName);
			if (this.animationState === 'initial') {
				this.initStateTimer.subscribe(() => {
					this.animateProcess();
					
				});
				this.animationState = 'initialed'
			}
			return registerName;
		}
	}
	
	animateProcess() {
		if (this.enableAnimation) {
			if (this.animationRegister.length > 0) {
				this.animateQueueInterval.subscribe(() => {
						this.count++;
						const queueName = this.animationRegister.shift();
						this.animationEmitter.emit(queueName);
						this.animateProcess();
					}
				)
			} else {
				this.animationState = 'initial';
				this.count = 0;
			}
		}
	}
	
	setOnReRender(rerenderStatus) {
		this.reRendering = rerenderStatus
	}
	
	setEnableAnimation(enable) {
		this.enableAnimation = (enable === 'true' || enable === true);
	}
}
