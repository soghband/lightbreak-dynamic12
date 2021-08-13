import { __decorate, __extends, __metadata } from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.base64textString = [];
        _this.objKeys = Object.keys;
        _this.modeDisplay = "";
        _this.errorMsg = "";
        _this.acceptExt = "image/*";
        _this.fileTypeList = {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "svg": "image/svg+xml"
        };
        _this.animateProcess();
        return _this;
    }
    ImageComponent.prototype.ngOnInit = function () {
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
    };
    ImageComponent.prototype.handleFileSelect = function (evt) {
        this.base64textString = [];
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
            var files = evt.target.files;
            var validate = this.validateFileExtension();
            if (validate == true) {
                for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                    var file = files[fileIndex];
                    if (files && file) {
                        var reader = new FileReader();
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
    };
    ImageComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var filenameSplit = String(this.data[this.fieldCreation.fieldName].selectFile[this.base64textString.length].name).split('.');
        var ext = filenameSplit.pop().toLowerCase();
        if (this.fileTypeList[ext]) {
            var binaryString = readerEvt.target.result;
            // console.log("url(data:image/jpg;base64," + btoa(binaryString) + ")");
            this.base64textString.push("url('data:" + this.fileTypeList[ext] + ";base64," + btoa(binaryString) + "')");
        }
    };
    ImageComponent.prototype.getNasImageUrl = function (file) {
        if (file != null && file.length > 0) {
            return "url('" + file + "')";
        }
        return "";
    };
    ImageComponent.prototype.processCall = function (data) {
    };
    ImageComponent.prototype.getType = function (data) {
        return typeof (data);
    };
    ImageComponent.prototype.validateFileExtension = function () {
        this.errorMsg = "";
        if (typeof (this.fieldCreation.fileType) != "undefined") {
            var fileData = this.data[this.fieldCreation.fieldName].selectFile;
            var validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
            var validatePattern = new RegExp(validateExtensionString, "i");
            for (var fileDataIndex = 0; fileDataIndex < fileData.length; fileDataIndex++) {
                var fileName = fileData[fileDataIndex].name;
                var fileNameSplit = fileName.split(".");
                var extension = fileNameSplit.pop();
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
    };
    ImageComponent.prototype.checkFileRequire = function () {
        if ((!this.data[this.fieldCreation.fieldName].selectFile
            || !this.data[this.fieldCreation.fieldName].selectFile.length
            || this.data[this.fieldCreation.fieldName].selectFile.length == 0)
            && (!this.data[this.fieldCreation.fieldName].currentFile
                || !this.data[this.fieldCreation.fieldName].currentFile.length
                || this.data[this.fieldCreation.fieldName].currentFile.length == 0)) {
            return true;
        }
        return false;
    };
    ImageComponent.prototype.clickImage = function (index) {
        this.callBack.emit({
            fileIndex: index,
            base64: this.base64textString[index],
            fileData: this.data[this.fieldCreation.fieldName].selectFile[index],
            action: "click",
            fieldName: this.fieldCreation.fieldName
        });
    };
    ImageComponent.prototype.clickCurrentImage = function (index) {
        this.callBack.emit({
            fileIndex: index,
            fileData: this.data[this.fieldCreation.fieldName].currentFile[index],
            action: "click",
            fieldName: this.fieldCreation.fieldName
        });
    };
    ImageComponent.prototype.deleteCurrentImage = function (index) {
        this.data[this.fieldCreation.fieldName].currentFile.splice(index, 1);
        this.callBack.emit({
            fileIndex: index,
            action: "delete",
            fieldName: this.fieldCreation.fieldName
        });
    };
    ImageComponent.prototype.deleteImage = function (index) {
        this.base64textString.splice(index, 1);
        var fileCurrent = this.imageInputVC.nativeElement.files;
        var dt = new DataTransfer();
        for (var fileIndex = 0; fileIndex < fileCurrent.length; fileIndex++) {
            if (fileIndex != index) {
                var file = fileCurrent[fileIndex];
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
    };
    ImageComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "rowIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "inputIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ImageComponent.prototype, "panelCallBack", void 0);
    __decorate([
        ViewChild('imageInput'),
        __metadata("design:type", ElementRef)
    ], ImageComponent.prototype, "imageInputVC", void 0);
    ImageComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"\r\n     [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container\r\n                *ngIf=\"base64textString != null && base64textString.length == 0 && getType(data[fieldCreation.fieldName].currentFile) != 'undefined'\">\r\n            <div class=\"imageItem\" *ngFor=\"let fileIndex of objKeys(data[fieldCreation.fieldName].currentFile)\">\r\n                <div class=\"image\"\r\n                     [ngStyle]=\"{'background-image':getNasImageUrl(data[fieldCreation.fieldName].currentFile[fileIndex])}\"  (click)=\"clickCurrentImage(fileIndex)\"></div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteCurrentImage(fileIndex)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"base64textString != null && base64textString.length > 0\">\r\n            <div class=\"imageItem\" *ngFor=\"let indexB64 of objKeys(base64textString)\">\r\n                <div class=\"image\" [ngStyle]=\"{'background-image':base64textString[indexB64]}\" (click)=\"clickImage(indexB64)\">\r\n\r\n                </div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteImage(indexB64)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"posRelative {{fieldCreation.require && checkFileRequire() ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\" class=\"fullWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       #imageInput\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\"\r\n                 id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div class=\"dp2Error\">\r\n                {{errorMsg}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], ImageComponent);
    return ImageComponent;
}(DynamicBehaviorComponent));
export { ImageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9pbWFnZS9pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUtwRTtJQUFvQyxrQ0FBd0I7SUFzQjNELHdCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBbkJTLGNBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLG1CQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUc3QyxzQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDdEIsYUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsaUJBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsY0FBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGVBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsa0JBQVksR0FBRztZQUNkLE1BQU0sRUFBQyxZQUFZO1lBQ25CLEtBQUssRUFBQyxZQUFZO1lBQ2xCLEtBQUssRUFBQyxXQUFXO1lBQ2pCLEtBQUssRUFBQyxlQUFlO1NBQ3JCLENBQUE7UUFJQSxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0MsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFBO1NBQzVCO2FBQU07WUFDTixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUMzRCxXQUFXLEVBQUUsRUFBRTtZQUNmLFVBQVUsRUFBRSxFQUFFO1NBQ2QsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFBO1NBQzFDO0lBQ0YsQ0FBQztJQUVELHlDQUFnQixHQUFoQixVQUFpQixHQUFHO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxPQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3RFLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzVDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDckIsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7b0JBQzlELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNsQixJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO3dCQUM5QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3BELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDaEM7aUJBQ0Q7YUFDRDtTQUNEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2pCO1lBQ0MsS0FBSyxFQUFDLEdBQUc7WUFDVCxNQUFNLEVBQUMsWUFBWTtZQUNuQixTQUFTLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO1NBQ3RDLENBQ0QsQ0FBQztJQUNILENBQUM7SUFFRCw0Q0FBbUIsR0FBbkIsVUFBb0IsU0FBUztRQUU1QixJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdILElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDM0Msd0VBQXdFO1lBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUN2RztJQUVGLENBQUM7SUFFRCx1Q0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNsQixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxJQUFJO0lBRWhCLENBQUM7SUFFRCxnQ0FBTyxHQUFQLFVBQVEsSUFBSTtRQUNYLE9BQU8sT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCw4Q0FBcUIsR0FBckI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUN2RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ2xFLElBQUksdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLElBQUksZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELEtBQUssSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUMzRSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM1QyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDO29CQUN0QyxPQUFPLEtBQUssQ0FBQztpQkFDYjthQUNEO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDWjthQUFNO1lBQ04sT0FBTyxJQUFJLENBQUM7U0FDWjtJQUNGLENBQUM7SUFDRCx5Q0FBZ0IsR0FBaEI7UUFDQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVTtlQUNwRCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTTtlQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7ZUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXO21CQUNyRCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTTttQkFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDckUsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNELG1DQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2pCO1lBQ0MsU0FBUyxFQUFFLEtBQUs7WUFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7WUFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ25FLE1BQU0sRUFBQyxPQUFPO1lBQ2QsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUNELENBQUM7SUFDSCxDQUFDO0lBQ0QsMENBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2pCO1lBQ0MsU0FBUyxFQUFFLEtBQUs7WUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3BFLE1BQU0sRUFBQyxPQUFPO1lBQ2QsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUNELENBQUM7SUFDSCxDQUFDO0lBQ0QsMkNBQWtCLEdBQWxCLFVBQW1CLEtBQUs7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqQjtZQUNDLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE1BQU0sRUFBQyxRQUFRO1lBQ2YsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUNELENBQUM7SUFDSCxDQUFDO0lBQ0Qsb0NBQVcsR0FBWCxVQUFZLEtBQUs7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFBO1FBQ3pELElBQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7UUFDN0IsS0FBSyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDcEUsSUFBSSxTQUFTLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFNLElBQUksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ25DLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2xCO1NBQ0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTtRQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDakI7WUFDQyxTQUFTLEVBQUUsS0FBSztZQUNoQixNQUFNLEVBQUMsUUFBUTtZQUNmLFNBQVMsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7U0FDdEMsQ0FDRCxDQUFDO0lBQ0gsQ0FBQzs7Z0JBM0s4QixnQkFBZ0I7O0lBckJ0QztRQUFSLEtBQUssRUFBRTs7Z0RBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7a0RBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7eURBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7b0RBQVU7SUFDVDtRQUFSLEtBQUssRUFBRTs7c0RBQVk7SUFDVjtRQUFULE1BQU0sRUFBRTs7b0RBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzt5REFBb0M7SUFDcEI7UUFBeEIsU0FBUyxDQUFDLFlBQVksQ0FBQztrQ0FBZSxVQUFVO3dEQUFDO0lBUnRDLGNBQWM7UUFIMUIsU0FBUyxDQUFDO1lBQ1Ysd2lHQUFxQztTQUNyQyxDQUFDO3lDQXVCOEIsZ0JBQWdCO09BdEJuQyxjQUFjLENBa00xQjtJQUFELHFCQUFDO0NBQUEsQUFsTUQsQ0FBb0Msd0JBQXdCLEdBa00zRDtTQWxNWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHR0ZW1wbGF0ZVVybDogJy4vaW1hZ2UuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSByb3dJbmRleDtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAVmlld0NoaWxkKCdpbWFnZUlucHV0JykgaW1hZ2VJbnB1dFZDOiBFbGVtZW50UmVmO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZTtcclxuXHRiYXNlNjR0ZXh0U3RyaW5nID0gW107XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdG1vZGVEaXNwbGF5ID0gXCJcIjtcclxuXHRlcnJvck1zZyA9IFwiXCI7XHJcblx0YWNjZXB0RXh0ID0gXCJpbWFnZS8qXCI7XHJcblx0ZmlsZVR5cGVMaXN0ID0ge1xyXG5cdFx0XCJqcGVnXCI6XCJpbWFnZS9qcGVnXCIsXHJcblx0XHRcImpwZ1wiOlwiaW1hZ2UvanBlZ1wiLFxyXG5cdFx0XCJwbmdcIjpcImltYWdlL3BuZ1wiLFxyXG5cdFx0XCJzdmdcIjpcImltYWdlL3N2Zyt4bWxcIlxyXG5cdH1cclxuXHRcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMyA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDNcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XHJcblx0XHRcdHRoaXMubW9kZURpc3BsYXkgPSBcImRwMmhpZGVcIlxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tb2RlRGlzcGxheSA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKHt9LCB7XHJcblx0XHRcdGN1cnJlbnRGaWxlOiBbXSxcclxuXHRcdFx0c2VsZWN0RmlsZToge30sXHJcblx0XHR9KVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5hY2NlcHQpIHtcclxuXHRcdFx0dGhpcy5hY2NlcHRFeHQgPSB0aGlzLmZpZWxkQ3JlYXRpb24uYWNjZXB0XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRoYW5kbGVGaWxlU2VsZWN0KGV2dCkge1xyXG5cdFx0dGhpcy5iYXNlNjR0ZXh0U3RyaW5nID0gW107XHJcblx0XHRpZiAodHlwZW9mKGV2dC50YXJnZXQpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNlbGVjdEZpbGUgPSBldnQudGFyZ2V0LmZpbGVzO1xyXG5cdFx0XHRsZXQgZmlsZXMgPSBldnQudGFyZ2V0LmZpbGVzO1xyXG5cdFx0XHRsZXQgdmFsaWRhdGUgPSB0aGlzLnZhbGlkYXRlRmlsZUV4dGVuc2lvbigpO1xyXG5cdFx0XHRpZiAodmFsaWRhdGUgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGZvciAobGV0IGZpbGVJbmRleCA9IDA7IGZpbGVJbmRleCA8IGZpbGVzLmxlbmd0aDsgZmlsZUluZGV4KyspIHtcclxuXHRcdFx0XHRcdGxldCBmaWxlID0gZmlsZXNbZmlsZUluZGV4XTtcclxuXHRcdFx0XHRcdGlmIChmaWxlcyAmJiBmaWxlKSB7XHJcblx0XHRcdFx0XHRcdGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdFx0XHRyZWFkZXIub25sb2FkID0gdGhpcy5faGFuZGxlUmVhZGVyTG9hZGVkLmJpbmQodGhpcyk7XHJcblx0XHRcdFx0XHRcdHJlYWRlci5yZWFkQXNCaW5hcnlTdHJpbmcoZmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoXHJcblx0XHRcdHtcclxuXHRcdFx0XHRldmVudDpldnQsXHJcblx0XHRcdFx0YWN0aW9uOlwiZmlsZVNlbGVjdFwiLFxyXG5cdFx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRfaGFuZGxlUmVhZGVyTG9hZGVkKHJlYWRlckV2dCkge1xyXG5cdFx0XHJcblx0XHRsZXQgZmlsZW5hbWVTcGxpdCA9IFN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc2VsZWN0RmlsZVt0aGlzLmJhc2U2NHRleHRTdHJpbmcubGVuZ3RoXS5uYW1lKS5zcGxpdCgnLicpO1xyXG5cdFx0bGV0IGV4dCA9IGZpbGVuYW1lU3BsaXQucG9wKCkudG9Mb3dlckNhc2UoKTtcclxuXHRcdGlmICh0aGlzLmZpbGVUeXBlTGlzdFtleHRdKSB7XHJcblx0XHRcdGxldCBiaW5hcnlTdHJpbmcgPSByZWFkZXJFdnQudGFyZ2V0LnJlc3VsdDtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJ1cmwoZGF0YTppbWFnZS9qcGc7YmFzZTY0LFwiICsgYnRvYShiaW5hcnlTdHJpbmcpICsgXCIpXCIpO1xyXG5cdFx0XHR0aGlzLmJhc2U2NHRleHRTdHJpbmcucHVzaChcInVybCgnZGF0YTpcIit0aGlzLmZpbGVUeXBlTGlzdFtleHRdK1wiO2Jhc2U2NCxcIiArIGJ0b2EoYmluYXJ5U3RyaW5nKSArIFwiJylcIik7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdGdldE5hc0ltYWdlVXJsKGZpbGUpIHtcclxuXHRcdGlmIChmaWxlICE9IG51bGwgJiYgZmlsZS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHJldHVybiBcInVybCgnXCIgKyBmaWxlICsgXCInKVwiO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiXCI7XHJcblx0fVxyXG5cclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblxyXG5cdH1cclxuXHJcblx0Z2V0VHlwZShkYXRhKSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mKGRhdGEpO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGVGaWxlRXh0ZW5zaW9uKCkge1xyXG5cdFx0dGhpcy5lcnJvck1zZyA9IFwiXCI7XHJcblx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5maWxlVHlwZSkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRsZXQgZmlsZURhdGEgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc2VsZWN0RmlsZTtcclxuXHRcdFx0bGV0IHZhbGlkYXRlRXh0ZW5zaW9uU3RyaW5nID0gdGhpcy5maWVsZENyZWF0aW9uLmZpbGVUeXBlLnJlcGxhY2UoW1wiLFwiXSwgW1wifFwiXSk7XHJcblx0XHRcdGxldCB2YWxpZGF0ZVBhdHRlcm4gPSBuZXcgUmVnRXhwKHZhbGlkYXRlRXh0ZW5zaW9uU3RyaW5nLCBcImlcIik7XHJcblx0XHRcdGZvciAobGV0IGZpbGVEYXRhSW5kZXggPSAwO2ZpbGVEYXRhSW5kZXggPCBmaWxlRGF0YS5sZW5ndGg7ZmlsZURhdGFJbmRleCsrKSB7XHJcblx0XHRcdFx0bGV0IGZpbGVOYW1lID0gZmlsZURhdGFbZmlsZURhdGFJbmRleF0ubmFtZTtcclxuXHRcdFx0XHRsZXQgZmlsZU5hbWVTcGxpdCA9IGZpbGVOYW1lLnNwbGl0KFwiLlwiKTtcclxuXHRcdFx0XHRsZXQgZXh0ZW5zaW9uID0gZmlsZU5hbWVTcGxpdC5wb3AoKTtcclxuXHRcdFx0XHRpZiAoIXZhbGlkYXRlUGF0dGVybi50ZXN0KGV4dGVuc2lvbikpIHtcclxuXHRcdFx0XHRcdHRoaXMuZXJyb3JNc2cgPSBcIkZpbGUgdHlwZSBtaXNtYXRjaC5cIjtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y2hlY2tGaWxlUmVxdWlyZSgpIHtcclxuXHRcdGlmICgoIXRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlXHJcblx0XHRcdHx8ICF0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc2VsZWN0RmlsZS5sZW5ndGhcclxuXHRcdFx0fHwgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNlbGVjdEZpbGUubGVuZ3RoID09IDApXHJcblx0XHRcdCYmICghdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmN1cnJlbnRGaWxlXHJcblx0XHRcdHx8ICF0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uY3VycmVudEZpbGUubGVuZ3RoXHJcblx0XHRcdHx8IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5jdXJyZW50RmlsZS5sZW5ndGggPT0gMCkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdGNsaWNrSW1hZ2UoaW5kZXgpIHtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpbGVJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0YmFzZTY0OiB0aGlzLmJhc2U2NHRleHRTdHJpbmdbaW5kZXhdLFxyXG5cdFx0XHRcdGZpbGVEYXRhOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc2VsZWN0RmlsZVtpbmRleF0sXHJcblx0XHRcdFx0YWN0aW9uOlwiY2xpY2tcIixcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH1cclxuXHRjbGlja0N1cnJlbnRJbWFnZShpbmRleCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZmlsZUluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRmaWxlRGF0YTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmN1cnJlbnRGaWxlW2luZGV4XSxcclxuXHRcdFx0XHRhY3Rpb246XCJjbGlja1wiLFxyXG5cdFx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblx0fVxyXG5cdGRlbGV0ZUN1cnJlbnRJbWFnZShpbmRleCkge1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmN1cnJlbnRGaWxlLnNwbGljZShpbmRleCwxKVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZmlsZUluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRhY3Rpb246XCJkZWxldGVcIixcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH1cclxuXHRkZWxldGVJbWFnZShpbmRleCkge1xyXG5cdFx0dGhpcy5iYXNlNjR0ZXh0U3RyaW5nLnNwbGljZShpbmRleCwxKVxyXG5cdFx0Y29uc3QgZmlsZUN1cnJlbnQgPSB0aGlzLmltYWdlSW5wdXRWQy5uYXRpdmVFbGVtZW50LmZpbGVzXHJcblx0XHRjb25zdCBkdCA9IG5ldyBEYXRhVHJhbnNmZXIoKVxyXG5cdFx0Zm9yIChsZXQgZmlsZUluZGV4ID0gMDsgZmlsZUluZGV4IDwgZmlsZUN1cnJlbnQubGVuZ3RoOyBmaWxlSW5kZXgrKykge1xyXG5cdFx0XHRpZiAoZmlsZUluZGV4ICE9IGluZGV4KSB7XHJcblx0XHRcdFx0Y29uc3QgZmlsZSA9IGZpbGVDdXJyZW50W2ZpbGVJbmRleF1cclxuXHRcdFx0XHRkdC5pdGVtcy5hZGQoZmlsZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5pbWFnZUlucHV0VkMubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnXHJcblx0XHR0aGlzLmltYWdlSW5wdXRWQy5uYXRpdmVFbGVtZW50LmZpbGVzID0gZHQuZmlsZXNcclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlID0gZHQuZmlsZXNcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGZpbGVJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0YWN0aW9uOlwiZGVsZXRlXCIsXHJcblx0XHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9XHJcbn1cclxuIl19