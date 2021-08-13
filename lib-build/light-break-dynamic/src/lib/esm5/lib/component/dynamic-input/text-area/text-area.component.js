import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var TextAreaComponent = /** @class */ (function (_super) {
    __extends(TextAreaComponent, _super);
    function TextAreaComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.objKeys = Object.keys;
        _this.animateProcess();
        return _this;
    }
    TextAreaComponent.prototype.ngOnInit = function () {
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
    TextAreaComponent.prototype.processCall = function (data) {
    };
    TextAreaComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TextAreaComponent.prototype, "panelCallBack", void 0);
    TextAreaComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n      <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n        <textarea id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                  [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                  [readonly]=\"getDisable()\"\r\n                  (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                  (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                  (keyup)=\"processCallBack($event,'keyup',dataIndex)\"\r\n                  (keypress)=\"processCallBack($event,'keypress',dataIndex)\"\r\n                  (keydown)=\"processCallBack($event,'keydown',dataIndex)\"\r\n                  (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                  (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                  placeholder=\"{{fieldCreation.placeholder}}\"\r\n                  maxlength=\"{{fieldCreation.maxLength}}\"></textarea>\r\n      </div>\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], TextAreaComponent);
    return TextAreaComponent;
}(DynamicBehaviorComponent));
export { TextAreaComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvdGV4dC1hcmVhL3RleHQtYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBdUMscUNBQXdCO0lBVTlELDJCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBUFMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGFBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBR3JCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7SUFDdkIsQ0FBQztJQUVFLG9DQUFRLEdBQVI7UUFDQyxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO1lBQ3pDLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQO2dCQUNDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDOUIsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ3RELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdkY7cUJBQU0sSUFBRyxPQUFNLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7b0JBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZFO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDL0M7U0FDRDtJQUNGLENBQUM7SUFDSix1Q0FBVyxHQUFYLFVBQVksSUFBSTtJQUVoQixDQUFDOztnQkFwQzhCLGdCQUFnQjs7SUFUdEM7UUFBUixLQUFLLEVBQUU7O21EQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O3FEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7OzREQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3lEQUFZO0lBQ1I7UUFBUixLQUFLLEVBQUU7O3VEQUFVO0lBQ1g7UUFBVCxNQUFNLEVBQUU7O3VEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7NERBQW9DO0lBUGpDLGlCQUFpQjtRQUg3QixTQUFTLENBQUM7WUFDVCwyOURBQXlDO1NBQzFDLENBQUM7eUNBVzhCLGdCQUFnQjtPQVZuQyxpQkFBaUIsQ0ErQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQS9DRCxDQUF1Qyx3QkFBd0IsR0ErQzlEO1NBL0NZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYXJlYS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHRBcmVhQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cdCAgICBzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHQgICAgY2FzZSAxIDpcclxuXHRcdFx0ICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdCAgICBicmVhaztcclxuXHRcdCAgICBjYXNlIDIgOlxyXG5cdFx0XHQgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0ICAgIGNhc2UgMyA6XHJcblx0XHRcdCAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHQgICAgYnJlYWs7XHJcblx0XHQgICAgY2FzZSA0IDpcclxuXHRcdFx0ICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdCAgICBicmVhaztcclxuXHRcdCAgICBkZWZhdWx0IDpcclxuXHRcdFx0ICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHQgICAgfVxyXG5cdCAgICBpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XHJcblx0XHQgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHQgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpKSB7XHJcblx0XHRcdFx0ICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG5cdFx0XHQgICAgfSBlbHNlIGlmKHR5cGVvZiggdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHQgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW3RoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0XTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdCAgICB9IGVsc2Uge1xyXG5cdFx0XHQgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW1wiXCJdO1xyXG5cdFx0ICAgIH1cclxuXHQgICAgfVxyXG4gICAgfVxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG59XHJcbiJdfQ==