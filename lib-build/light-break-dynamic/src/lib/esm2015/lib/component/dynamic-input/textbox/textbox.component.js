import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export class TextBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.columnCalculate = "";
        this.objKeys = Object.keys;
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
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [""];
            }
        }
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push("");
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        this.allowTempData = true;
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            let regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
                && String(event.target.value).match(regexpValue)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    }
    processKeyDown(event, action, dataIndex) {
        if (this.allowTempData == true) {
            this.allowTempData = false;
            this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            let combineValue = this.tempValue + key;
            let check = true;
            let regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (typeof (this.fieldCreation.inputPattern) != "undefined") {
                if (!String(key).match(regexpInput)) {
                    check = false;
                }
            }
            if (typeof (this.fieldCreation.validateWhileKeyPress) != "undefined"
                && typeof (this.fieldCreation.valuePattern) != "undefined"
                && this.fieldCreation.validateWhileKeyPress) {
                let regexpValue = this.fieldCreation.valuePattern;
                if (typeof (this.fieldCreation.valuePattern) == "string") {
                    regexpValue = new RegExp(this.fieldCreation.valuePattern);
                }
                if (!String(combineValue).match(regexpValue)) {
                    check = false;
                }
            }
            if (check == false) {
                return false;
            }
        }
        return true;
    }
    processBlur(event, action, dataIndex) {
        let validate = true;
        let regexpValue = this.fieldCreation.valuePattern;
        if (typeof (this.fieldCreation.valuePattern) == "string") {
            regexpValue = new RegExp(this.fieldCreation.valuePattern);
        }
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
            && this.getDisable() == false) {
            let inputField = event.currentTarget;
            inputField && inputField.focus();
            validate = false;
        }
        if (this.fieldCreation.type == "number") {
            if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] < parseFloat(this.fieldCreation.min)) {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.min;
            }
            if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] > parseFloat(this.fieldCreation.max)) {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.max;
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        return validate;
    }
    getType() {
        if (this.fieldCreation.type == "number") {
            return "number";
        }
        else if (this.fieldCreation.type == "password") {
            return "password";
        }
        else {
            return "textbox";
        }
    }
}
TextBoxComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n                <input type=\"{{getType()}}\" class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                       [readonly]=\"getDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       max=\"{{fieldCreation.max}}\"\r\n                       min=\"{{fieldCreation.min}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
TextBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
TextBoxComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvdGV4dGJveC90ZXh0Ym94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBTXBFLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSx3QkFBd0I7SUFXN0QsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFOZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUtyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELFFBQVE7UUFDUCxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO1lBQ3pDLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFB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LElBQUksSUFBSSxVQUFVLEVBQUU7WUFDakQsT0FBTyxVQUFVLENBQUM7U0FDbEI7YUFBTTtZQUNOLE9BQU8sU0FBUyxDQUFDO1NBQ2pCO0lBQ0YsQ0FBQzs7O1lBMUtELFNBQVMsU0FBQztnQkFDViwya0ZBQXVDO2FBQ3ZDOzs7WUFMTyxnQkFBZ0I7OzttQkFPdEIsS0FBSztxQkFDTCxLQUFLOzRCQUNKLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHR0ZW1wbGF0ZVVybDogJy4vdGV4dGJveC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHRCb3hDb21wb25lbnQgZXh0ZW5kcyBEeW5hbWljQmVoYXZpb3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIGRhdGE7XHJcblx0QElucHV0KCkgb3B0aW9uO1xyXG4gXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG4gXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gXHRASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0Y29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0dGVtcFZhbHVlO1xyXG4gICAgYWxsb3dUZW1wRGF0YTogYm9vbGVhbjtcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMiA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5tb2RlID09IFwiYWRkXCIpIHtcclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSkge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSx0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKHR5cGVvZiggdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFt0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFtcIlwiXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRhZGRNdWx0aVZhbCgpIHtcclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5wdXNoKFwiXCIpO1xyXG5cdH1cclxuXHJcblx0ZGVsZXRlTXVsdGlWYWwoZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NLZXlVcChldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBldmVudDpldmVudCxcclxuICAgICAgICAgICAgYWN0aW9uOmFjdGlvbixcclxuICAgICAgICAgICAgZGF0YUluZGV4OmRhdGFJbmRleCxcclxuICAgICAgICAgICAgZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0ICAgICAgICB2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFsbG93VGVtcERhdGEgPSB0cnVlO1xyXG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ID09IHRydWUgJiYgKGV2ZW50LmNoYXJDb2RlID09IDg2IHx8IGV2ZW50LndoaWNoID09IDg2KSl7XHJcblx0ICAgICAgICBsZXQgcmVnZXhwVmFsdWUgPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuXHJcblx0ICAgICAgICBpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdCAgICAgICAgcmVnZXhwVmFsdWUgPSBuZXcgUmVnRXhwKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pO1xyXG5cdCAgICAgICAgfVxyXG5cdFx0XHRpZiAoU3RyaW5nKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKS5tYXRjaChyZWdleHBWYWx1ZSlcclxuXHRcdFx0XHQmJiBTdHJpbmcoZXZlbnQudGFyZ2V0LnZhbHVlKS5tYXRjaChyZWdleHBWYWx1ZSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IHRoaXMudGVtcFZhbHVlO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0cHJvY2Vzc0tleURvd24oZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5hbGxvd1RlbXBEYXRhID09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5hbGxvd1RlbXBEYXRhID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudGVtcFZhbHVlID0gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF07XHJcblx0XHR9XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdCAgICAgICAgdmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcbiAgICAgICAgfSk7XHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsQmFja0tleVByZXNzKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6ZXZlbnQsXHJcblx0XHRcdGFjdGlvbjphY3Rpb24sXHJcblx0XHRcdGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgIT0gNDYgJiYgZXZlbnQua2V5Q29kZSAhPSA4ICYmIGV2ZW50LmN0cmxLZXkgIT0gdHJ1ZSAmJiBldmVudC5hbHRLZXkgIT0gdHJ1ZSl7XHJcblx0XHRcdGxldCBrZXkgPSBldmVudC5rZXk7XHJcblx0XHRcdGxldCBjb21iaW5lVmFsdWUgPSB0aGlzLnRlbXBWYWx1ZSArIGtleTtcclxuXHRcdFx0bGV0IGNoZWNrID0gdHJ1ZTtcclxuXHRcdFx0bGV0IHJlZ2V4cElucHV0ID0gdGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVyblxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZWdleHBJbnB1dCA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0aWYgKCFTdHJpbmcoa2V5KS5tYXRjaChyZWdleHBJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIFx0Y2hlY2sgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24udmFsaWRhdGVXaGlsZUtleVByZXNzKSAhPSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikgIT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5maWVsZENyZWF0aW9uLnZhbGlkYXRlV2hpbGVLZXlQcmVzcykge1xyXG5cdCAgICAgICAgICAgIGxldCByZWdleHBWYWx1ZSA9IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm5cclxuXHQgICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdCAgICAgICAgICAgIHJlZ2V4cFZhbHVlID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKTtcclxuXHQgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIVN0cmluZyhjb21iaW5lVmFsdWUpLm1hdGNoKHJlZ2V4cFZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoZWNrID09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRwcm9jZXNzQmx1cihldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuXHRcdGxldCB2YWxpZGF0ZSA9IHRydWU7XHJcblx0XHRsZXQgcmVnZXhwVmFsdWUgPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuXHJcblx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0cmVnZXhwVmFsdWUgPSBuZXcgUmVnRXhwKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pO1xyXG5cdFx0fVxyXG4gICAgICAgIGlmICghU3RyaW5nKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKS5tYXRjaChyZWdleHBWYWx1ZSlcclxuXHRcdFx0JiYgdGhpcy5nZXREaXNhYmxlKCkgPT0gZmFsc2UpIHtcclxuXHQgICAgICAgIGxldCBpbnB1dEZpZWxkOiBIVE1MRWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0ICAgICAgICBpbnB1dEZpZWxkICYmIGlucHV0RmllbGQuZm9jdXMoKTtcclxuICAgICAgICAgICAgdmFsaWRhdGUgPSBmYWxzZTtcclxuXHRcdH1cclxuICAgICAgICBpZiAodGhpcy5maWVsZENyZWF0aW9uLnR5cGUgPT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLm1pbiAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPCBwYXJzZUZsb2F0KHRoaXMuZmllbGRDcmVhdGlvbi5taW4pKSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB0aGlzLmZpZWxkQ3JlYXRpb24ubWluO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24ubWluICE9IHVuZGVmaW5lZCAmJiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA+IHBhcnNlRmxvYXQodGhpcy5maWVsZENyZWF0aW9uLm1heCkpIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IHRoaXMuZmllbGRDcmVhdGlvbi5tYXg7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBldmVudDpldmVudCxcclxuICAgICAgICAgICAgYWN0aW9uOmFjdGlvbixcclxuICAgICAgICAgICAgZGF0YUluZGV4OmRhdGFJbmRleCxcclxuXHRcdFx0dmFsaWRhdGVTdGF0dXM6dmFsaWRhdGUsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHQgICAgICAgIHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0ZTtcclxuXHR9XHJcblxyXG5cdGdldFR5cGUoKSB7XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnR5cGUgPT0gXCJudW1iZXJcIikge1xyXG5cdFx0XHRyZXR1cm4gXCJudW1iZXJcIjtcclxuXHRcdH0gZWxzZSBpZiAodGhpcy5maWVsZENyZWF0aW9uLnR5cGUgPT0gXCJwYXNzd29yZFwiKSB7XHJcblx0XHRcdHJldHVybiBcInBhc3N3b3JkXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gXCJ0ZXh0Ym94XCI7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==