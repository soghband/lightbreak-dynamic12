import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {DynamicInputComponent} from "../dynamic-input/dynamic-input.component";
import {timer} from 'rxjs';

@Component({
	selector: 'lb9-dynamic-container',
	templateUrl: './dynamic-container.component.html'
})
export class DynamicContainerComponent implements OnInit {
	@ViewChildren(DynamicInputComponent) inputChild: QueryList<DynamicInputComponent>;
	@Input() containerCreation;
	@Input() data;
	@Input() option;
	@Input() actionDataIndex;
	@Input() containerIndex;
	@Input() reRenderField = [];
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	emitFieldSelect = false;
	objKey = Object.keys;
	widthCalculator;

	constructor() {
	}

	ngOnInit() {
		if (typeof(this.containerCreation.columnSpan) != "undefined") {
			let calculateString = this.containerCreation.columnSpan.split("/");
			let size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1]))*100);
			if (calculateString[1] == 1) {
				this.widthCalculator = size + "%";
			} else {
				this.widthCalculator = "calc("+ size + "% - 2px)";
			}
		} else {
			this.widthCalculator = "100%";
		}
	}
	processCallBack(event) {
		event.rowIndex = this.actionDataIndex;
		this.callBack.emit(event)
	}
	processPanelCallBack(event) {
		this.emitFieldSelect = true;
		let dataEvent = Object.assign(event,{
			containerIndex:this.containerIndex
		});
		this.panelCallBack.emit(dataEvent);
		timer(200).subscribe(() =>{
			this.emitFieldSelect = false;
		})
	}
	callPanelCallBack(event) {
		if (!this.emitFieldSelect) {
			this.panelCallBack.emit({
				fieldName: null,
				fieldIndex: null,
				containerIndex:this.containerIndex
			});
		}
	}
	getDynamicInput(inputIndex) {
		let inputComponent = this.inputChild.find(instantInput => instantInput.inputIndex == inputIndex);
		return inputComponent;
	}

    checkReRender(fieldName) {
		if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
			return false;
		}
		return true;
    }
}
