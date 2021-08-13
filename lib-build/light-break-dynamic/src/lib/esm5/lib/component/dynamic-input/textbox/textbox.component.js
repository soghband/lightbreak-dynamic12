import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var TextBoxComponent = /** @class */ (function (_super) {
    __extends(TextBoxComponent, _super);
    function TextBoxComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.columnCalculate = "";
        _this.objKeys = Object.keys;
        _this.animateProcess();
        return _this;
    }
    TextBoxComponent.prototype.ngOnInit = function () {
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
    };
    TextBoxComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push("");
    };
    TextBoxComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    TextBoxComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        this.allowTempData = true;
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            var regexpValue = this.fieldCreation.valuePattern;
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
    };
    TextBoxComponent.prototype.processKeyDown = function (event, action, dataIndex) {
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
    };
    TextBoxComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            var combineValue = this.tempValue + key;
            var check = true;
            var regexpInput = this.fieldCreation.inputPattern;
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
                var regexpValue = this.fieldCreation.valuePattern;
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
    };
    TextBoxComponent.prototype.processBlur = function (event, action, dataIndex) {
        var validate = true;
        var regexpValue = this.fieldCreation.valuePattern;
        if (typeof (this.fieldCreation.valuePattern) == "string") {
            regexpValue = new RegExp(this.fieldCreation.valuePattern);
        }
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
            && this.getDisable() == false) {
            var inputField = event.currentTarget;
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
    };
    TextBoxComponent.prototype.getType = function () {
        if (this.fieldCreation.type == "number") {
            return "number";
        }
        else if (this.fieldCreation.type == "password") {
            return "password";
        }
        else {
            return "textbox";
        }
    };
    TextBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextBoxComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextBoxComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextBoxComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextBoxComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextBoxComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TextBoxComponent.prototype, "callBack", void 0);
    TextBoxComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n                <input type=\"{{getType()}}\" class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                       [readonly]=\"getDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       max=\"{{fieldCreation.max}}\"\r\n                       min=\"{{fieldCreation.min}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], TextBoxComponent);
    return TextBoxComponent;
}(DynamicBehaviorComponent));
export { TextBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L3RleHRib3gvdGV4dGJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFNcEU7SUFBc0Msb0NBQXdCO0lBVzdELDBCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBUlMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMscUJBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsYUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFLckIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztJQUN2QixDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNDLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDekMsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1A7Z0JBQ0MsSUFBSSxDQUFDLGVBQWUsR0FB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QUMsYUFBYSxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDakQsT0FBTyxVQUFVLENBQUM7U0FDbEI7YUFBTTtZQUNOLE9BQU8sU0FBUyxDQUFDO1NBQ2pCO0lBQ0YsQ0FBQzs7Z0JBNUo4QixnQkFBZ0I7O0lBVnRDO1FBQVIsS0FBSyxFQUFFOztrREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOztvREFBUTtJQUNOO1FBQVIsS0FBSyxFQUFFOzsyREFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzt3REFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFOztzREFBVTtJQUNUO1FBQVQsTUFBTSxFQUFFOztzREFBK0I7SUFONUIsZ0JBQWdCO1FBSDVCLFNBQVMsQ0FBQztZQUNWLDJrRkFBdUM7U0FDdkMsQ0FBQzt5Q0FZOEIsZ0JBQWdCO09BWG5DLGdCQUFnQixDQXdLNUI7SUFBRCx1QkFBQztDQUFBLEFBeEtELENBQXNDLHdCQUF3QixHQXdLN0Q7U0F4S1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gXCIuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGVVcmw6ICcuL3RleHRib3guY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUZXh0Qm94Q29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuIFx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuIFx0QElucHV0KCkgaW5wdXRJbmRleDtcclxuIFx0QElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdHRlbXBWYWx1ZTtcclxuICAgIGFsbG93VGVtcERhdGE6IGJvb2xlYW47XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMyA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDNcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZih0eXBlb2YoIHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHRdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbXCJcIl07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0YWRkTXVsdGlWYWwoKSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ucHVzaChcIlwiKTtcclxuXHR9XHJcblxyXG5cdGRlbGV0ZU11bHRpVmFsKGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zcGxpY2UoZGF0YUluZGV4LDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzS2V5VXAoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdCAgICAgICAgdmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hbGxvd1RlbXBEYXRhID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZXZlbnQuY3RybEtleSA9PSB0cnVlICYmIChldmVudC5jaGFyQ29kZSA9PSA4NiB8fCBldmVudC53aGljaCA9PSA4Nikpe1xyXG5cdCAgICAgICAgbGV0IHJlZ2V4cFZhbHVlID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVyblxyXG5cdCAgICAgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHQgICAgICAgIHJlZ2V4cFZhbHVlID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKTtcclxuXHQgICAgICAgIH1cclxuXHRcdFx0aWYgKFN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSkubWF0Y2gocmVnZXhwVmFsdWUpXHJcblx0XHRcdFx0JiYgU3RyaW5nKGV2ZW50LnRhcmdldC52YWx1ZSkubWF0Y2gocmVnZXhwVmFsdWUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB0aGlzLnRlbXBWYWx1ZTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdHByb2Nlc3NLZXlEb3duKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMuYWxsb3dUZW1wRGF0YSA9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuYWxsb3dUZW1wRGF0YSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnRlbXBWYWx1ZSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdO1xyXG5cdFx0fVxyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGV2ZW50OmV2ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb246YWN0aW9uLFxyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHQgICAgICAgIHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG4gICAgICAgIH0pO1xyXG5cdH1cclxuXHRwcm9jZXNzQ2FsbEJhY2tLZXlQcmVzcyhldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OmV2ZW50LFxyXG5cdFx0XHRhY3Rpb246YWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG5cdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KTtcclxuXHRcdGlmIChldmVudC5rZXlDb2RlICE9IDQ2ICYmIGV2ZW50LmtleUNvZGUgIT0gOCAmJiBldmVudC5jdHJsS2V5ICE9IHRydWUgJiYgZXZlbnQuYWx0S2V5ICE9IHRydWUpe1xyXG5cdFx0XHRsZXQga2V5ID0gZXZlbnQua2V5O1xyXG5cdFx0XHRsZXQgY29tYmluZVZhbHVlID0gdGhpcy50ZW1wVmFsdWUgKyBrZXk7XHJcblx0XHRcdGxldCBjaGVjayA9IHRydWU7XHJcblx0XHRcdGxldCByZWdleHBJbnB1dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm5cclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0cmVnZXhwSW5wdXQgPSBuZXcgUmVnRXhwKHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybikgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdGlmICghU3RyaW5nKGtleSkubWF0Y2gocmVnZXhwSW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICBcdGNoZWNrID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLnZhbGlkYXRlV2hpbGVLZXlQcmVzcykgIT0gXCJ1bmRlZmluZWRcIlxyXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pICE9IFwidW5kZWZpbmVkXCJcclxuICAgICAgICAgICAgICAgICYmIHRoaXMuZmllbGRDcmVhdGlvbi52YWxpZGF0ZVdoaWxlS2V5UHJlc3MpIHtcclxuXHQgICAgICAgICAgICBsZXQgcmVnZXhwVmFsdWUgPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuXHJcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHQgICAgICAgICAgICByZWdleHBWYWx1ZSA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybik7XHJcblx0ICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFTdHJpbmcoY29tYmluZVZhbHVlKS5tYXRjaChyZWdleHBWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGVjayA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0cHJvY2Vzc0JsdXIoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHRsZXQgdmFsaWRhdGUgPSB0cnVlO1xyXG5cdFx0bGV0IHJlZ2V4cFZhbHVlID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVyblxyXG5cdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdHJlZ2V4cFZhbHVlID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKTtcclxuXHRcdH1cclxuICAgICAgICBpZiAoIVN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSkubWF0Y2gocmVnZXhwVmFsdWUpXHJcblx0XHRcdCYmIHRoaXMuZ2V0RGlzYWJsZSgpID09IGZhbHNlKSB7XHJcblx0ICAgICAgICBsZXQgaW5wdXRGaWVsZDogSFRNTEVsZW1lbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cdCAgICAgICAgaW5wdXRGaWVsZCAmJiBpbnB1dEZpZWxkLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHZhbGlkYXRlID0gZmFsc2U7XHJcblx0XHR9XHJcbiAgICAgICAgaWYgKHRoaXMuZmllbGRDcmVhdGlvbi50eXBlID09IFwibnVtYmVyXCIpIHtcclxuXHRcdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5taW4gIT0gdW5kZWZpbmVkICYmIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdIDwgcGFyc2VGbG9hdCh0aGlzLmZpZWxkQ3JlYXRpb24ubWluKSkge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0gdGhpcy5maWVsZENyZWF0aW9uLm1pbjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLm1pbiAhPSB1bmRlZmluZWQgJiYgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPiBwYXJzZUZsb2F0KHRoaXMuZmllbGRDcmVhdGlvbi5tYXgpKSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB0aGlzLmZpZWxkQ3JlYXRpb24ubWF4O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcblx0XHRcdHZhbGlkYXRlU3RhdHVzOnZhbGlkYXRlLFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0ICAgICAgICB2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsaWRhdGU7XHJcblx0fVxyXG5cclxuXHRnZXRUeXBlKCkge1xyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi50eXBlID09IFwibnVtYmVyXCIpIHtcclxuXHRcdFx0cmV0dXJuIFwibnVtYmVyXCI7XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuZmllbGRDcmVhdGlvbi50eXBlID09IFwicGFzc3dvcmRcIikge1xyXG5cdFx0XHRyZXR1cm4gXCJwYXNzd29yZFwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIFwidGV4dGJveFwiO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=