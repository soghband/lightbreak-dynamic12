import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var CheckBoxComponent = /** @class */ (function (_super) {
    __extends(CheckBoxComponent, _super);
    function CheckBoxComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.objKey = Object.keys;
        _this.showSelectAll = "dp2hide";
        _this.selectAll = false;
        _this.singleLine = "";
        _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        _this.checkboxDisplay = "checkboxHide";
        _this.animateProcess();
        return _this;
    }
    CheckBoxComponent.prototype.ngOnInit = function () {
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
            if (typeof (this.fieldCreation.default) == "object") {
                this.data[this.fieldCreation.fieldName] = Object.assign({}, this.fieldCreation.default);
            }
            else {
                var defaultVal = {};
                for (var valueIndex in this.fieldCreation.valueList) {
                    defaultVal[this.fieldCreation.valueList[valueIndex].value] = false;
                }
                this.data[this.fieldCreation.fieldName] = defaultVal;
            }
        }
        if (this.fieldCreation.showSelectAll == true) {
            this.showSelectAll = "";
        }
        if (this.fieldCreation.displaySingleLine == true || this.option.displayMode == "table") {
            this.singleLine = "singlePerLine";
        }
        else {
            this.singleLine = "multiplePerLine";
        }
        if (this.option.displayMode != 'table') {
            this.checkboxDisplay = "checkboxShow";
        }
    };
    CheckBoxComponent.prototype.toggleSelectAll = function () {
        if (this.selectAll == true) {
            for (var dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = true;
            }
        }
        else {
            for (var dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = false;
            }
        }
        this.callBack.emit({
            action: 'selectAll',
            value: this.selectAll,
            fieldName: this.fieldCreation.fieldName
        });
    };
    CheckBoxComponent.prototype.processCall = function (data) {
    };
    CheckBoxComponent.prototype.processChange = function (event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    };
    CheckBoxComponent.prototype.toggleShowCheckBox = function () {
        if (!this.getDisable()) {
            if (this.checkboxDisplay == "checkboxHide") {
                this.checkboxDisplay = "checkboxShow";
            }
            else {
                this.checkboxDisplay = "checkboxHide";
            }
        }
    };
    CheckBoxComponent.prototype.haveChecked = function () {
        var haveChecked = false;
        for (var valueName in this.data[this.fieldCreation.fieldName]) {
            if (this.data[this.fieldCreation.fieldName][valueName] == true) {
                haveChecked = true;
                break;
            }
        }
        return haveChecked;
    };
    CheckBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CheckBoxComponent.prototype, "panelCallBack", void 0);
    CheckBoxComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative\">\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"checkBoxTableDisplay\">\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div *ngIf=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value] && haveChecked()\" class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"checkbox\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}_checked\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label>{{fieldCreation.valueList[listIndex].display}}</label>\r\n                    </div>\r\n                </ng-container>\r\n                <div *ngIf=\"!haveChecked()\">\r\n                    Not Selected\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"arrowToggle\" (click)=\"toggleShowCheckBox()\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{option.formId}}_{{rowIndex}}_arrowDown\">\r\n                <div class=\"arrowDown\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"{{(option.displayMode == 'table' ? 'checkboxList' : '')}} {{checkboxDisplay}}\">\r\n                <div class=\"{{(option.displayMode == 'table' ? 'checkboxListBox' : '')}}\">\r\n                    <div class=\"{{showSelectAll}}\">\r\n                        <input type=\"checkbox\" id=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\" (change)=\"toggleSelectAll()\"\r\n                               [disabled]=\"getDisable()\"\r\n                               [(ngModel)]=\"selectAll\"> <label for=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\">Select All</label>\r\n                    </div>\r\n                    <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                        <div class=\"checkBoxIndent {{singleLine}}\">\r\n                            <input type=\"checkbox\"\r\n                                   id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                                   [disabled]=\"getDisable()\"\r\n                                   (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                            <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n                        </div>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], CheckBoxComponent);
    return CheckBoxComponent;
}(DynamicBehaviorComponent));
export { CheckBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvY2hlY2stYm94L2NoZWNrLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBdUMscUNBQXdCO0lBZ0I5RCwyQkFBWSxnQkFBbUM7UUFBL0MsWUFDQyxrQkFBTSxnQkFBZ0IsQ0FBQyxTQUV2QjtRQWJTLGNBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLG1CQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxZQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVyQixtQkFBYSxHQUFHLFNBQVMsQ0FBQztRQUMxQixlQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2Isc0JBQWdCLEdBQUcsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsQ0FBQztRQUN0RCxxQkFBZSxHQUFHLGNBQWMsQ0FBQztRQUluQyxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0MsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxD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TUFBTSxFQUFFOzt1REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7OzREQUFvQztJQVBqQyxpQkFBaUI7UUFIN0IsU0FBUyxDQUFDO1lBQ1YsbzBJQUF5QztTQUN6QyxDQUFDO3lDQWlCOEIsZ0JBQWdCO09BaEJuQyxpQkFBaUIsQ0E4RzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTlHRCxDQUF1Qyx3QkFBd0IsR0E4RzlEO1NBOUdZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGVVcmw6ICcuL2NoZWNrLWJveC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENoZWNrQm94Q29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0b2JqS2V5ID0gT2JqZWN0LmtleXM7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdHNob3dTZWxlY3RBbGwgPSBcImRwMmhpZGVcIjtcclxuXHRzZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRzaW5nbGVMaW5lID0gXCJcIjtcclxuICAgIHNjcm9sbGJhck9wdGlvbnMgPSB7YXhpczogJ3knLCB0aGVtZTogJ21pbmltYWwtZGFyayd9O1xyXG4gICAgY2hlY2tib3hEaXNwbGF5ID0gXCJjaGVja2JveEhpZGVcIjtcclxuICAgIFxyXG5cdGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcblx0XHRzdXBlcihhbmltYXRpb25TZXJ2aWNlKTtcclxuXHRcdHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMiA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5tb2RlID09IFwiYWRkXCIpIHtcclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gXCJvYmplY3RcIikge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxldCBkZWZhdWx0VmFsID0ge307XHJcblx0XHRcdFx0Zm9yIChsZXQgdmFsdWVJbmRleCBpbiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdFx0XHRkZWZhdWx0VmFsW3RoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbdmFsdWVJbmRleF0udmFsdWVdID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IGRlZmF1bHRWYWw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd1NlbGVjdEFsbCA9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuc2hvd1NlbGVjdEFsbCA9IFwiXCJcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmRpc3BsYXlTaW5nbGVMaW5lID09IHRydWUgfHwgdGhpcy5vcHRpb24uZGlzcGxheU1vZGUgPT0gXCJ0YWJsZVwiKSB7XHJcblx0XHRcdHRoaXMuc2luZ2xlTGluZSA9IFwic2luZ2xlUGVyTGluZVwiO1xyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaW5nbGVMaW5lID0gXCJtdWx0aXBsZVBlckxpbmVcIjtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5kaXNwbGF5TW9kZSAhPSAndGFibGUnKSB7XHJcblx0XHRcdHRoaXMuY2hlY2tib3hEaXNwbGF5ID0gXCJjaGVja2JveFNob3dcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0dG9nZ2xlU2VsZWN0QWxsKCkge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0QWxsID09IHRydWUpIHtcclxuXHRcdFx0Zm9yIChsZXQgZGF0YUluZGV4IGluIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtkYXRhSW5kZXhdLnZhbHVlXSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGZvciAgKGxldCBkYXRhSW5kZXggaW4gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVt0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2RhdGFJbmRleF0udmFsdWVdID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGFjdGlvbjonc2VsZWN0QWxsJyxcclxuXHRcdFx0dmFsdWU6IHRoaXMuc2VsZWN0QWxsLFxyXG5cdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG5cclxuXHRwcm9jZXNzQ2hhbmdlKGV2ZW50LCBzLCB2YWx1ZUxpc3QpIHtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGFjdGlvbjonY2hhbmdlJyxcclxuXHRcdFx0ZGlzcGxheVZhbHVlOiB2YWx1ZUxpc3QsXHJcblx0XHRcdGN1cnJlbnRWYWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW3ZhbHVlTGlzdC52YWx1ZV0sXHJcblx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHR9KTtcclxuXHR9XHJcbiAgICB0b2dnbGVTaG93Q2hlY2tCb3goKSB7XHJcblx0XHRpZiAoIXRoaXMuZ2V0RGlzYWJsZSgpKSB7XHJcblx0XHRcdGlmICh0aGlzLmNoZWNrYm94RGlzcGxheSA9PSBcImNoZWNrYm94SGlkZVwiKSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveERpc3BsYXkgPSBcImNoZWNrYm94U2hvd1wiXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jaGVja2JveERpc3BsYXkgPSBcImNoZWNrYm94SGlkZVwiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGhhdmVDaGVja2VkKCkge1xyXG5cdFx0bGV0IGhhdmVDaGVja2VkID0gZmFsc2U7XHJcblx0XHRmb3IgKGxldCB2YWx1ZU5hbWUgaW4gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSB7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bdmFsdWVOYW1lXSA9PSB0cnVlKSB7XHJcblx0XHRcdFx0aGF2ZUNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaGF2ZUNoZWNrZWQ7XHJcblx0fVxyXG59XHJcbiJdfQ==