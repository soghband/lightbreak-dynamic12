import {Component, EventEmitter, Input, Output} from '@angular/core';
import {timer} from 'rxjs';
import {AnimationService} from '../../service/animation.service';

@Component({
	template: '',
})
export class DynamicBehaviorComponent {
	@Input() fieldCreation;
	@Input() option;
	@Input() data;
	@Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	animateTimer = timer(60);
	animationServiceInit = false;
	animateState = false;
	animateName = '';
	
	constructor(private animationService: AnimationService) {

	}
	
	animateProcess() {
		if (!this.animationServiceInit) {
			this.animateTimer.subscribe(() => {
				if (this.animateName == '') {
					this.animateName = this.animationService.registerAnimation(this.fieldCreation.fieldName);
				}
			});
		}
		this.animationServiceInit = true;
		this.animationService.animationEmitter.subscribe((event) => {
			if (this.animateName === event) {
				this.animateState = true;
			}
		})
	}
	
	getLabelWidth() {
		let width = '';
		if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
			width = this.fieldCreation.labelWidth + 'px';
		}
		return width;
	}
	
	getInputWidth() {
		let width = '';
		if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
			width = 'calc(100% - ' + (parseInt(this.fieldCreation.labelWidth) + 6) + 'px)'
		}
		return width;
	}
	
	processCallBack(event, action, dataIndex) {
		this.callBack.emit({
			event: event,
			action: action,
			dataIndex: dataIndex,
			fieldName: this.fieldCreation.fieldName,
			value: this.data[this.fieldCreation.fieldName][dataIndex]
		})
	}
	
	getCustomClass() {
		if (typeof (this.fieldCreation.customClass) != 'undefined') {
			return this.fieldCreation.customClass;
		} else {
			return '';
		}
	}
	
	checkRequire(index) {
		if (typeof (this.data[this.fieldCreation.fieldName][index]) != 'undefined' && this.fieldCreation.require == true && this.data[this.fieldCreation.fieldName][index] == '') {
			return 'require';
		}
		return '';
	}
	
	getDisable() {
		let check = false;
		if (this.option.mode == 'view' || this.fieldCreation.readonly || (this.option.enableRowIndex && this.option.enableRowIndex[this.rowIndex] == false)) {
			check = true;
		}
		if (this.option.mode == 'edit' && this.fieldCreation.editAble != undefined && this.fieldCreation.editAble == false) {
			check = true;
		}
		if (this.option.disableList != undefined && this.option.disableList[this.rowIndex] != undefined
			&& this.option.disableList[this.rowIndex][this.fieldCreation.fieldName] != undefined) {
			check = this.option.disableList[this.rowIndex][this.fieldCreation.fieldName];
			
		}
		return check;
	}
	
	processPanelCallBack(event) {
		this.panelCallBack.emit({
			feildName: this.fieldCreation.fieldName
		});
	}
}
