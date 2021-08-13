import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {AnimationService} from '../../../service/animation.service';

@Component({
	templateUrl: './image.component.html'
})
export class ImageComponent extends DynamicBehaviorComponent implements OnInit {
	@Input() data;
	@Input() option;
	@Input() fieldCreation;
	@Input() rowIndex;
	@Input() inputIndex;
	@Output() callBack = new EventEmitter();
	@Output() panelCallBack = new EventEmitter();
	@ViewChild('imageInput') imageInputVC: ElementRef;
	columnCalculate;
	base64textString = [];
	objKeys = Object.keys;
	modeDisplay = "";
	errorMsg = "";
	acceptExt = "image/*";
	fileTypeList = {
		"jpeg":"image/jpeg",
		"jpg":"image/jpeg",
		"png":"image/png",
		"svg":"image/svg+xml"
	}
	
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
		this.data[this.fieldCreation.fieldName] = Object.assign({}, {
			currentFile: [],
			selectFile: {},
		})
		if (this.fieldCreation.accept) {
			this.acceptExt = this.fieldCreation.accept
		}
	}

	handleFileSelect(evt) {
		this.base64textString = [];
		if (typeof(evt.target) != "undefined") {
			this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
			let files = evt.target.files;
			let validate = this.validateFileExtension();
			if (validate == true) {
				for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
					let file = files[fileIndex];
					if (files && file) {
						let reader = new FileReader();
						reader.onload = this._handleReaderLoaded.bind(this);
						reader.readAsBinaryString(file);
					}
				}
			}
		}
		this.callBack.emit(
			{
				event:evt,
				action:"fileSelect",
				fieldName:this.fieldCreation.fieldName
			}
		);
	}

	_handleReaderLoaded(readerEvt) {
		
		let filenameSplit = String(this.data[this.fieldCreation.fieldName].selectFile[this.base64textString.length].name).split('.');
		let ext = filenameSplit.pop().toLowerCase();
		if (this.fileTypeList[ext]) {
			let binaryString = readerEvt.target.result;
			// console.log("url(data:image/jpg;base64," + btoa(binaryString) + ")");
			this.base64textString.push("url('data:"+this.fileTypeList[ext]+";base64," + btoa(binaryString) + "')");
		}
		
	}

	getNasImageUrl(file) {
		if (file != null && file.length > 0) {
			return "url('" + file + "')";
		}
		return "";
	}

	processCall(data) {

	}

	getType(data) {
		return typeof(data);
	}

	validateFileExtension() {
		this.errorMsg = "";
		if (typeof(this.fieldCreation.fileType) != "undefined") {
			let fileData = this.data[this.fieldCreation.fieldName].selectFile;
			let validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
			let validatePattern = new RegExp(validateExtensionString, "i");
			for (let fileDataIndex = 0;fileDataIndex < fileData.length;fileDataIndex++) {
				let fileName = fileData[fileDataIndex].name;
				let fileNameSplit = fileName.split(".");
				let extension = fileNameSplit.pop();
				if (!validatePattern.test(extension)) {
					this.errorMsg = "File type mismatch.";
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	}
	checkFileRequire() {
		if ((!this.data[this.fieldCreation.fieldName].selectFile
			|| !this.data[this.fieldCreation.fieldName].selectFile.length
			|| this.data[this.fieldCreation.fieldName].selectFile.length == 0)
			&& (!this.data[this.fieldCreation.fieldName].currentFile
			|| !this.data[this.fieldCreation.fieldName].currentFile.length
			|| this.data[this.fieldCreation.fieldName].currentFile.length == 0)) {
			return true;
		}
		return false;
	}
	clickImage(index) {
		this.callBack.emit(
			{
				fileIndex: index,
				base64: this.base64textString[index],
				fileData: this.data[this.fieldCreation.fieldName].selectFile[index],
				action:"click",
				fieldName:this.fieldCreation.fieldName
			}
		);
	}
	clickCurrentImage(index) {
		this.callBack.emit(
			{
				fileIndex: index,
				fileData: this.data[this.fieldCreation.fieldName].currentFile[index],
				action:"click",
				fieldName:this.fieldCreation.fieldName
			}
		);
	}
	deleteCurrentImage(index) {
		this.data[this.fieldCreation.fieldName].currentFile.splice(index,1)
		this.callBack.emit(
			{
				fileIndex: index,
				action:"delete",
				fieldName:this.fieldCreation.fieldName
			}
		);
	}
	deleteImage(index) {
		this.base64textString.splice(index,1)
		const fileCurrent = this.imageInputVC.nativeElement.files
		const dt = new DataTransfer()
		for (let fileIndex = 0; fileIndex < fileCurrent.length; fileIndex++) {
			if (fileIndex != index) {
				const file = fileCurrent[fileIndex]
				dt.items.add(file)
			}
		}
		this.imageInputVC.nativeElement.value = ''
		this.imageInputVC.nativeElement.files = dt.files
		this.data[this.fieldCreation.fieldName].selectFile = dt.files
		this.callBack.emit(
			{
				fileIndex: index,
				action:"delete",
				fieldName:this.fieldCreation.fieldName
			}
		);
	}
}
