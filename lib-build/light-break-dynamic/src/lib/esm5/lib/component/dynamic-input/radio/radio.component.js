import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var DynamicBehaviorComponentimplements = /** @class */ (function () {
    function DynamicBehaviorComponentimplements() {
    }
    return DynamicBehaviorComponentimplements;
}());
var RadioComponent = /** @class */ (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.objKey = Object.keys;
        _this.selectAll = false;
        _this.singleLine = "";
        _this.animateProcess();
        return _this;
    }
    RadioComponent.prototype.ngOnInit = function () {
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
        if (this.fieldCreation.displaySingleLine == true) {
            this.singleLine = "singleLine";
        }
    };
    RadioComponent.prototype.processCall = function (data) {
    };
    RadioComponent.prototype.processChange = function ($event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    };
    RadioComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RadioComponent.prototype, "panelCallBack", void 0);
    RadioComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKey(data[fieldCreation.fieldName])\">\r\n            <div>\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"radio\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{dataIndex}}_{{rowIndex}}\"\r\n                               value=\"{{fieldCreation.valueList[listIndex].value}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n\r\n                    </div>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], RadioComponent);
    return RadioComponent;
}(DynamicBehaviorComponent));
export { RadioComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9yYWRpby9yYWRpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFcEU7SUFBQTtJQUNBLENBQUM7SUFBRCx5Q0FBQztBQUFELENBQUMsQUFERCxJQUNDO0FBS0Q7SUFBb0Msa0NBQXdCO0lBYTNELHdCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBVlMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLFlBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRXJCLGVBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVUsR0FBRyxFQUFFLENBQUM7UUFJZixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0MsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7U0FDbEM7SUFDUixDQUFDO0lBQ0Qsb0NBQVcsR0FBWCxVQUFZLElBQUk7SUFFaEIsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEIsTUFBTSxFQUFDLFFBQVE7WUFDZixZQUFZLEVBQUUsU0FBUztZQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDdEUsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUFDLENBQUM7SUFDSixDQUFDOztnQkFyQzhCLGdCQUFnQjs7SUFadEM7UUFBUixLQUFLLEVBQUU7O2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O2tEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3lEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3NEQUFZO0lBQ1I7UUFBUixLQUFLLEVBQUU7O29EQUFVO0lBQ1g7UUFBVCxNQUFNLEVBQUU7O29EQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7eURBQW9DO0lBUGpDLGNBQWM7UUFIMUIsU0FBUyxDQUFDO1lBQ1YsMmpFQUFxQztTQUNyQyxDQUFDO3lDQWM4QixnQkFBZ0I7T0FibkMsY0FBYyxDQW1EMUI7SUFBRCxxQkFBQztDQUFBLEFBbkRELENBQW9DLHdCQUF3QixHQW1EM0Q7U0FuRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50aW1wbGVtZW50cyB7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlVXJsOiAnLi9yYWRpby5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleSA9IE9iamVjdC5rZXlzO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZTtcclxuXHRzZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRzaW5nbGVMaW5lID0gXCJcIjtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMyA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDNcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0XHR9XHJcbiAgICAgICAgaWYgKHRoaXMuZmllbGRDcmVhdGlvbi5kaXNwbGF5U2luZ2xlTGluZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlTGluZSA9IFwic2luZ2xlTGluZVwiO1xyXG4gICAgICAgIH1cclxuXHR9XHJcblx0cHJvY2Vzc0NhbGwoZGF0YSkge1xyXG5cclxuXHR9XHJcblxyXG5cdHByb2Nlc3NDaGFuZ2UoJGV2ZW50LCBzLCB2YWx1ZUxpc3QpIHtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGFjdGlvbjonY2hhbmdlJyxcclxuXHRcdFx0ZGlzcGxheVZhbHVlOiB2YWx1ZUxpc3QsXHJcblx0XHRcdGN1cnJlbnRWYWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW3ZhbHVlTGlzdC52YWx1ZV0sXHJcblx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIl19