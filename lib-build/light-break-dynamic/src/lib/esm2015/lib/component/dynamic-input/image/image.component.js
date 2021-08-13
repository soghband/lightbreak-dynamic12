import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
export class ImageComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.base64textString = [];
        this.objKeys = Object.keys;
        this.modeDisplay = "";
        this.errorMsg = "";
        this.acceptExt = "image/*";
        this.fileTypeList = {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "svg": "image/svg+xml"
        };
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            this.modeDisplay = "dp2hide";
        }
        else {
            this.modeDisplay = "";
        }
        this.data[this.fieldCreation.fieldName] = Object.assign({}, {
            currentFile: [],
            selectFile: {},
        });
        if (this.fieldCreation.accept) {
            this.acceptExt = this.fieldCreation.accept;
        }
    }
    handleFileSelect(evt) {
        this.base64textString = [];
        if (typeof (evt.target) != "undefined") {
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
        this.callBack.emit({
            event: evt,
            action: "fileSelect",
            fieldName: this.fieldCreation.fieldName
        });
    }
    _handleReaderLoaded(readerEvt) {
        let filenameSplit = String(this.data[this.fieldCreation.fieldName].selectFile[this.base64textString.length].name).split('.');
        let ext = filenameSplit.pop().toLowerCase();
        if (this.fileTypeList[ext]) {
            let binaryString = readerEvt.target.result;
            // console.log("url(data:image/jpg;base64," + btoa(binaryString) + ")");
            this.base64textString.push("url('data:" + this.fileTypeList[ext] + ";base64," + btoa(binaryString) + "')");
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
        return typeof (data);
    }
    validateFileExtension() {
        this.errorMsg = "";
        if (typeof (this.fieldCreation.fileType) != "undefined") {
            let fileData = this.data[this.fieldCreation.fieldName].selectFile;
            let validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
            let validatePattern = new RegExp(validateExtensionString, "i");
            for (let fileDataIndex = 0; fileDataIndex < fileData.length; fileDataIndex++) {
                let fileName = fileData[fileDataIndex].name;
                let fileNameSplit = fileName.split(".");
                let extension = fileNameSplit.pop();
                if (!validatePattern.test(extension)) {
                    this.errorMsg = "File type mismatch.";
                    return false;
                }
            }
            return true;
        }
        else {
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
        this.callBack.emit({
            fileIndex: index,
            base64: this.base64textString[index],
            fileData: this.data[this.fieldCreation.fieldName].selectFile[index],
            action: "click",
            fieldName: this.fieldCreation.fieldName
        });
    }
    clickCurrentImage(index) {
        this.callBack.emit({
            fileIndex: index,
            fileData: this.data[this.fieldCreation.fieldName].currentFile[index],
            action: "click",
            fieldName: this.fieldCreation.fieldName
        });
    }
    deleteCurrentImage(index) {
        this.data[this.fieldCreation.fieldName].currentFile.splice(index, 1);
        this.callBack.emit({
            fileIndex: index,
            action: "delete",
            fieldName: this.fieldCreation.fieldName
        });
    }
    deleteImage(index) {
        this.base64textString.splice(index, 1);
        const fileCurrent = this.imageInputVC.nativeElement.files;
        const dt = new DataTransfer();
        for (let fileIndex = 0; fileIndex < fileCurrent.length; fileIndex++) {
            if (fileIndex != index) {
                const file = fileCurrent[fileIndex];
                dt.items.add(file);
            }
        }
        this.imageInputVC.nativeElement.value = '';
        this.imageInputVC.nativeElement.files = dt.files;
        this.data[this.fieldCreation.fieldName].selectFile = dt.files;
        this.callBack.emit({
            fileIndex: index,
            action: "delete",
            fieldName: this.fieldCreation.fieldName
        });
    }
}
ImageComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"\r\n     [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container\r\n                *ngIf=\"base64textString != null && base64textString.length == 0 && getType(data[fieldCreation.fieldName].currentFile) != 'undefined'\">\r\n            <div class=\"imageItem\" *ngFor=\"let fileIndex of objKeys(data[fieldCreation.fieldName].currentFile)\">\r\n                <div class=\"image\"\r\n                     [ngStyle]=\"{'background-image':getNasImageUrl(data[fieldCreation.fieldName].currentFile[fileIndex])}\"  (click)=\"clickCurrentImage(fileIndex)\"></div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteCurrentImage(fileIndex)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"base64textString != null && base64textString.length > 0\">\r\n            <div class=\"imageItem\" *ngFor=\"let indexB64 of objKeys(base64textString)\">\r\n                <div class=\"image\" [ngStyle]=\"{'background-image':base64textString[indexB64]}\" (click)=\"clickImage(indexB64)\">\r\n\r\n                </div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteImage(indexB64)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"posRelative {{fieldCreation.require && checkFileRequire() ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\" class=\"fullWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       #imageInput\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\"\r\n                 id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div class=\"dp2Error\">\r\n                {{errorMsg}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
ImageComponent.ctorParameters = () => [
    { type: AnimationService }
];
ImageComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    rowIndex: [{ type: Input }],
    inputIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }],
    imageInputVC: [{ type: ViewChild, args: ['imageInput',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2ltYWdlL2ltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUtwRSxNQUFNLE9BQU8sY0FBZSxTQUFRLHdCQUF3QjtJQXNCM0QsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFqQmYsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzdDLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN0QixpQkFBWSxHQUFHO1lBQ2QsTUFBTSxFQUFDLFlBQVk7WUFDbkIsS0FBSyxFQUFDLFlBQVk7WUFDbEIsS0FBSyxFQUFDLFdBQVc7WUFDakIsS0FBSyxFQUFDLGVBQWU7U0FDckIsQ0FBQTtRQUlBLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUTtRQUNQLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDekMsS0FBSyxDQUFDO2dCQUNM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QVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tICcuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50JztcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlVXJsOiAnLi9pbWFnZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBWaWV3Q2hpbGQoJ2ltYWdlSW5wdXQnKSBpbWFnZUlucHV0VkM6IEVsZW1lbnRSZWY7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdGJhc2U2NHRleHRTdHJpbmcgPSBbXTtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0bW9kZURpc3BsYXkgPSBcIlwiO1xyXG5cdGVycm9yTXNnID0gXCJcIjtcclxuXHRhY2NlcHRFeHQgPSBcImltYWdlLypcIjtcclxuXHRmaWxlVHlwZUxpc3QgPSB7XHJcblx0XHRcImpwZWdcIjpcImltYWdlL2pwZWdcIixcclxuXHRcdFwianBnXCI6XCJpbWFnZS9qcGVnXCIsXHJcblx0XHRcInBuZ1wiOlwiaW1hZ2UvcG5nXCIsXHJcblx0XHRcInN2Z1wiOlwiaW1hZ2Uvc3ZnK3htbFwiXHJcblx0fVxyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcblx0XHRzdXBlcihhbmltYXRpb25TZXJ2aWNlKTtcclxuXHRcdHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMiA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5tb2RlID09IFwiYWRkXCIpIHtcclxuXHRcdFx0dGhpcy5tb2RlRGlzcGxheSA9IFwiZHAyaGlkZVwiXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1vZGVEaXNwbGF5ID0gXCJcIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIHtcclxuXHRcdFx0Y3VycmVudEZpbGU6IFtdLFxyXG5cdFx0XHRzZWxlY3RGaWxlOiB7fSxcclxuXHRcdH0pXHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmFjY2VwdCkge1xyXG5cdFx0XHR0aGlzLmFjY2VwdEV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5hY2NlcHRcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGhhbmRsZUZpbGVTZWxlY3QoZXZ0KSB7XHJcblx0XHR0aGlzLmJhc2U2NHRleHRTdHJpbmcgPSBbXTtcclxuXHRcdGlmICh0eXBlb2YoZXZ0LnRhcmdldCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc2VsZWN0RmlsZSA9IGV2dC50YXJnZXQuZmlsZXM7XHJcblx0XHRcdGxldCBmaWxlcyA9IGV2dC50YXJnZXQuZmlsZXM7XHJcblx0XHRcdGxldCB2YWxpZGF0ZSA9IHRoaXMudmFsaWRhdGVGaWxlRXh0ZW5zaW9uKCk7XHJcblx0XHRcdGlmICh2YWxpZGF0ZSA9PSB0cnVlKSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgZmlsZUluZGV4ID0gMDsgZmlsZUluZGV4IDwgZmlsZXMubGVuZ3RoOyBmaWxlSW5kZXgrKykge1xyXG5cdFx0XHRcdFx0bGV0IGZpbGUgPSBmaWxlc1tmaWxlSW5kZXhdO1xyXG5cdFx0XHRcdFx0aWYgKGZpbGVzICYmIGZpbGUpIHtcclxuXHRcdFx0XHRcdFx0bGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdHJlYWRlci5vbmxvYWQgPSB0aGlzLl9oYW5kbGVSZWFkZXJMb2FkZWQuYmluZCh0aGlzKTtcclxuXHRcdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0JpbmFyeVN0cmluZyhmaWxlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGV2ZW50OmV2dCxcclxuXHRcdFx0XHRhY3Rpb246XCJmaWxlU2VsZWN0XCIsXHJcblx0XHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdF9oYW5kbGVSZWFkZXJMb2FkZWQocmVhZGVyRXZ0KSB7XHJcblx0XHRcclxuXHRcdGxldCBmaWxlbmFtZVNwbGl0ID0gU3RyaW5nKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlW3RoaXMuYmFzZTY0dGV4dFN0cmluZy5sZW5ndGhdLm5hbWUpLnNwbGl0KCcuJyk7XHJcblx0XHRsZXQgZXh0ID0gZmlsZW5hbWVTcGxpdC5wb3AoKS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0aWYgKHRoaXMuZmlsZVR5cGVMaXN0W2V4dF0pIHtcclxuXHRcdFx0bGV0IGJpbmFyeVN0cmluZyA9IHJlYWRlckV2dC50YXJnZXQucmVzdWx0O1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcInVybChkYXRhOmltYWdlL2pwZztiYXNlNjQsXCIgKyBidG9hKGJpbmFyeVN0cmluZykgKyBcIilcIik7XHJcblx0XHRcdHRoaXMuYmFzZTY0dGV4dFN0cmluZy5wdXNoKFwidXJsKCdkYXRhOlwiK3RoaXMuZmlsZVR5cGVMaXN0W2V4dF0rXCI7YmFzZTY0LFwiICsgYnRvYShiaW5hcnlTdHJpbmcpICsgXCInKVwiKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0Z2V0TmFzSW1hZ2VVcmwoZmlsZSkge1xyXG5cdFx0aWYgKGZpbGUgIT0gbnVsbCAmJiBmaWxlLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0cmV0dXJuIFwidXJsKCdcIiArIGZpbGUgKyBcIicpXCI7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gXCJcIjtcclxuXHR9XHJcblxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRUeXBlKGRhdGEpIHtcclxuXHRcdHJldHVybiB0eXBlb2YoZGF0YSk7XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZUZpbGVFeHRlbnNpb24oKSB7XHJcblx0XHR0aGlzLmVycm9yTXNnID0gXCJcIjtcclxuXHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLmZpbGVUeXBlKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdGxldCBmaWxlRGF0YSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlO1xyXG5cdFx0XHRsZXQgdmFsaWRhdGVFeHRlbnNpb25TdHJpbmcgPSB0aGlzLmZpZWxkQ3JlYXRpb24uZmlsZVR5cGUucmVwbGFjZShbXCIsXCJdLCBbXCJ8XCJdKTtcclxuXHRcdFx0bGV0IHZhbGlkYXRlUGF0dGVybiA9IG5ldyBSZWdFeHAodmFsaWRhdGVFeHRlbnNpb25TdHJpbmcsIFwiaVwiKTtcclxuXHRcdFx0Zm9yIChsZXQgZmlsZURhdGFJbmRleCA9IDA7ZmlsZURhdGFJbmRleCA8IGZpbGVEYXRhLmxlbmd0aDtmaWxlRGF0YUluZGV4KyspIHtcclxuXHRcdFx0XHRsZXQgZmlsZU5hbWUgPSBmaWxlRGF0YVtmaWxlRGF0YUluZGV4XS5uYW1lO1xyXG5cdFx0XHRcdGxldCBmaWxlTmFtZVNwbGl0ID0gZmlsZU5hbWUuc3BsaXQoXCIuXCIpO1xyXG5cdFx0XHRcdGxldCBleHRlbnNpb24gPSBmaWxlTmFtZVNwbGl0LnBvcCgpO1xyXG5cdFx0XHRcdGlmICghdmFsaWRhdGVQYXR0ZXJuLnRlc3QoZXh0ZW5zaW9uKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5lcnJvck1zZyA9IFwiRmlsZSB0eXBlIG1pc21hdGNoLlwiO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjaGVja0ZpbGVSZXF1aXJlKCkge1xyXG5cdFx0aWYgKCghdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNlbGVjdEZpbGVcclxuXHRcdFx0fHwgIXRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlLmxlbmd0aFxyXG5cdFx0XHR8fCB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc2VsZWN0RmlsZS5sZW5ndGggPT0gMClcclxuXHRcdFx0JiYgKCF0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uY3VycmVudEZpbGVcclxuXHRcdFx0fHwgIXRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5jdXJyZW50RmlsZS5sZW5ndGhcclxuXHRcdFx0fHwgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmN1cnJlbnRGaWxlLmxlbmd0aCA9PSAwKSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0Y2xpY2tJbWFnZShpbmRleCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZmlsZUluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRiYXNlNjQ6IHRoaXMuYmFzZTY0dGV4dFN0cmluZ1tpbmRleF0sXHJcblx0XHRcdFx0ZmlsZURhdGE6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlW2luZGV4XSxcclxuXHRcdFx0XHRhY3Rpb246XCJjbGlja1wiLFxyXG5cdFx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fVxyXG5cdGNsaWNrQ3VycmVudEltYWdlKGluZGV4KSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWxlSW5kZXg6IGluZGV4LFxyXG5cdFx0XHRcdGZpbGVEYXRhOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uY3VycmVudEZpbGVbaW5kZXhdLFxyXG5cdFx0XHRcdGFjdGlvbjpcImNsaWNrXCIsXHJcblx0XHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9XHJcblx0ZGVsZXRlQ3VycmVudEltYWdlKGluZGV4KSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uY3VycmVudEZpbGUuc3BsaWNlKGluZGV4LDEpXHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmaWxlSW5kZXg6IGluZGV4LFxyXG5cdFx0XHRcdGFjdGlvbjpcImRlbGV0ZVwiLFxyXG5cdFx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fVxyXG5cdGRlbGV0ZUltYWdlKGluZGV4KSB7XHJcblx0XHR0aGlzLmJhc2U2NHRleHRTdHJpbmcuc3BsaWNlKGluZGV4LDEpXHJcblx0XHRjb25zdCBmaWxlQ3VycmVudCA9IHRoaXMuaW1hZ2VJbnB1dFZDLm5hdGl2ZUVsZW1lbnQuZmlsZXNcclxuXHRcdGNvbnN0IGR0ID0gbmV3IERhdGFUcmFuc2ZlcigpXHJcblx0XHRmb3IgKGxldCBmaWxlSW5kZXggPSAwOyBmaWxlSW5kZXggPCBmaWxlQ3VycmVudC5sZW5ndGg7IGZpbGVJbmRleCsrKSB7XHJcblx0XHRcdGlmIChmaWxlSW5kZXggIT0gaW5kZXgpIHtcclxuXHRcdFx0XHRjb25zdCBmaWxlID0gZmlsZUN1cnJlbnRbZmlsZUluZGV4XVxyXG5cdFx0XHRcdGR0Lml0ZW1zLmFkZChmaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmltYWdlSW5wdXRWQy5uYXRpdmVFbGVtZW50LnZhbHVlID0gJydcclxuXHRcdHRoaXMuaW1hZ2VJbnB1dFZDLm5hdGl2ZUVsZW1lbnQuZmlsZXMgPSBkdC5maWxlc1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNlbGVjdEZpbGUgPSBkdC5maWxlc1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZmlsZUluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRhY3Rpb246XCJkZWxldGVcIixcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH1cclxufVxyXG4iXX0=