import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'lb9-error-msg-bubble',
	templateUrl: './error-msg-bubble.component.html',
	styleUrls: ['./error-msg-bubble.component.css']
})
export class ErrorMsgBubbleComponent implements OnInit {
	@Input() maxShow = 5;
	data = [];
	objKeys = Object.keys;
	constructor() {
	}

	ngOnInit() {

	}
    clearError() {
		this.data = [];
    }
    addError(key,msg) {
		let exitsData = false;
		for (let errorIndex in this.data) {
			if (this.data[errorIndex].key == key) {
				exitsData = true;
			}
		}
		if (exitsData == false){
			let error = {
				key : key,
				msg : msg
			};
			this.data.push(error);
		}
    }
    removeError(key) {
		let removeIndex = "";
	    for (let errorIndex in this.data) {
		    if (this.data[errorIndex].key == key) {
			    removeIndex = errorIndex;
			    break;
		    }
	    }
	    this.data.splice(parseInt(removeIndex),1);
    }
}
