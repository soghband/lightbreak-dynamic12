import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from "../../dynamic-behavior/dynamic-behavior.component";
import {AnimationService} from '../../../service/animation.service';

@Component({
	templateUrl: './file-upload.component.html'
})
export class FileUploadComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() inputIndex;
    @Input() rowIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	columnCalculate;
	acceptExt = ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf";
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
		this.data[this.fieldCreation.fieldName] = Object.assign({}, {
			currentFile: [],
			selectFile: {},
		})
		if (this.fieldCreation.accept) {
			this.acceptExt = this.fieldCreation.accept
		}
	}
	handleFileSelect(evt){
		if (typeof(evt.target) != "undefined") {
			this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
		}
		this.callBack.emit(
			{
				event:evt,
				action:"fileSelect",
				fieldName:this.fieldCreation.fieldName
			}
		);
	}
	processCall(data) {

	}
}
