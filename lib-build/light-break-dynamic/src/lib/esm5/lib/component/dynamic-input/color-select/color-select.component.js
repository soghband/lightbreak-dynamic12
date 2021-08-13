import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
var ColorSelectComponent = /** @class */ (function (_super) {
    __extends(ColorSelectComponent, _super);
    function ColorSelectComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.objKeys = Object.keys;
        _this.animateProcess();
        return _this;
    }
    ColorSelectComponent.prototype.ngOnInit = function () {
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
                if (this.fieldCreation.fieldName.valueList) {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.fieldName.valueList[0].value];
                }
                else {
                    this.data[this.fieldCreation.fieldName] = [null];
                }
            }
        }
    };
    ColorSelectComponent.prototype.assignColor = function (color, dataIndex) {
        this.data[this.fieldCreation.fieldName][dataIndex] = color;
    };
    ColorSelectComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push("");
    };
    ColorSelectComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    ColorSelectComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ColorSelectComponent.prototype, "panelCallBack", void 0);
    ColorSelectComponent = __decorate([
        Component({
            selector: 'lb9-color-select',
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\n    <lb9-dynamic-form-label-panel\n            [fieldCreation]=\"fieldCreation\"\n            [option]=\"option\"\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\n                <div *ngFor=\"let colorList of fieldCreation.valueList\" class=\"colorSelect {{data[fieldCreation.fieldName][dataIndex] === colorList.value ? ' colorSelected': ''}}\" [style]=\"{background:colorList.value}\" (click)=\"assignColor(colorList.value, dataIndex)\">\n\n                </div>\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\n            </div>\n        </ng-container>\n        <div class=\"dp2Note\">\n            {{fieldCreation.note}}\n        </div>\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\n                class=\"glyphicon glyphicon-plus\"></span></div>\n    </div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], ColorSelectComponent);
    return ColorSelectComponent;
}(DynamicBehaviorComponent));
export { ColorSelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvY29sb3Itc2VsZWN0L2NvbG9yLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFNcEU7SUFBMEMsd0NBQXdCO0lBV2hFLDhCQUFZLGdCQUFtQztRQUEvQyxZQUNFLGtCQUFNLGdCQUFnQixDQUFDLFNBRXhCO1FBUlMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGFBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBS3BCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7SUFDeEIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDRSxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO1lBQ3hDLEtBQUssQ0FBQztnQkFDSixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDN0IsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ3JELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDeEY7cUJBQU0sSUFBRyxPQUFNLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7b0JBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hFO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7b0JBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0Y7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ2pEO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFDRCwwQ0FBVyxHQUFYLFVBQVksS0FBSyxFQUFFLFNBQVM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM3RCxDQUFDO0lBQ0QsMENBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFBZSxTQUFTO1FBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOztnQkFqRDhCLGdCQUFnQjs7SUFWdEM7UUFBUixLQUFLLEVBQUU7O3NEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O3dEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7OytEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7OzREQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7OzBEQUFVO0lBQ1I7UUFBVCxNQUFNLEVBQUU7OzBEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7K0RBQW9DO0lBUGxDLG9CQUFvQjtRQUpoQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLGtwREFBNEM7U0FDN0MsQ0FBQzt5Q0FZK0IsZ0JBQWdCO09BWHBDLG9CQUFvQixDQTZEaEM7SUFBRCwyQkFBQztDQUFBLEFBN0RELENBQTBDLHdCQUF3QixHQTZEakU7U0E3RFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tICcuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50JztcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xiOS1jb2xvci1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3Itc2VsZWN0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2xvclNlbGVjdENvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGRhdGE7XG4gIEBJbnB1dCgpIG9wdGlvbjtcbiAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcbiAgQElucHV0KCkgaW5wdXRJbmRleDtcbiAgQElucHV0KCkgcm93SW5kZXg7XG4gIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIG9iaktleXMgPSBPYmplY3Qua2V5cztcbiAgY29sdW1uQ2FsY3VsYXRlO1xuICBcbiAgY29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcbiAgICBzdXBlcihhbmltYXRpb25TZXJ2aWNlKTtcbiAgICB0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XG4gIH1cbiAgXG4gIG5nT25Jbml0KCkge1xuICAgIHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcbiAgICAgIGNhc2UgMSA6XG4gICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyIDpcbiAgICAgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDMgOlxuICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNCA6XG4gICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdCA6XG4gICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gXCJhZGRcIikge1xuICAgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkpIHtcbiAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KTtcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiggdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHRdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZS52YWx1ZUxpc3QpIHtcbiAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZS52YWx1ZUxpc3RbMF0udmFsdWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFtudWxsXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFzc2lnbkNvbG9yKGNvbG9yLCBkYXRhSW5kZXgpIHtcbiAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IGNvbG9yO1xuICB9XG4gIGFkZE11bHRpVmFsKCkge1xuICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5wdXNoKFwiXCIpO1xuICB9XG4gIFxuICBkZWxldGVNdWx0aVZhbChkYXRhSW5kZXgpIHtcbiAgICBpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zcGxpY2UoZGF0YUluZGV4LDEpO1xuICAgIH1cbiAgfVxufVxuIl19