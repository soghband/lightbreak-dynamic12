import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.objKeys = Object.keys;
        _this.animateProcess();
        return _this;
    }
    ButtonComponent.prototype.ngOnInit = function () {
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
    };
    ButtonComponent.prototype.processClick = function (event, action, dataIndex, valueList) {
        if (!this.getDisable() && !this.disableList(valueList.value)) {
            if (typeof (this.data[this.fieldCreation.fieldName]) != "undefined" && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != "undefined") {
                this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                valueList: valueList,
                fieldName: this.fieldCreation.fieldName
            });
        }
    };
    ButtonComponent.prototype.disableList = function (value) {
        if (this.fieldCreation.disableList && this.fieldCreation.disableList.indexOf(value) > -1) {
            return true;
        }
        return false;
    };
    ButtonComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ButtonComponent.prototype, "panelCallBack", void 0);
    ButtonComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n\r\n      <div class=\"posRelative\">\r\n        <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n          <div class=\"btn-style-dynamic {{(fieldCreation.smallButton ? 'btn-small' : '')}}{{(getDisable() ? ' btn-disable' : '')}}{{(disableList(fieldCreation.valueList[valueListIndex].value) ? ' btn-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n               (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n               (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n        </ng-container>\r\n      </div>\r\n\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], ButtonComponent);
    return ButtonComponent;
}(DynamicBehaviorComponent));
export { ButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBcUMsbUNBQXdCO0lBVzVELHlCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBUlMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGFBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBS3JCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7SUFDdkIsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDQyxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO1lBQ3pDLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQLEtBQUssQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNQO2dCQUNDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1NBQzNCO0lBQ0YsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuRSxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxXQUFXLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLFdBQVcsRUFBRTtnQkFDaEosSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDckU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDbEIsS0FBSyxFQUFDLEtBQUs7Z0JBQ1gsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsU0FBUyxFQUFDLFNBQVM7Z0JBQ25CLFNBQVMsRUFBQyxTQUFTO2dCQUNuQixTQUFTLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO2FBQ3RDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUNELHFDQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2hCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3pGLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7O2dCQTNDOEIsZ0JBQWdCOztJQVZ0QztRQUFSLEtBQUssRUFBRTs7aURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7bURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7MERBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7dURBQVk7SUFDUjtRQUFSLEtBQUssRUFBRTs7cURBQVU7SUFDWDtRQUFULE1BQU0sRUFBRTs7cURBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzswREFBb0M7SUFQakMsZUFBZTtRQUgzQixTQUFTLENBQUM7WUFDVixrcERBQXNDO1NBQ3RDLENBQUM7eUNBWThCLGdCQUFnQjtPQVhuQyxlQUFlLENBdUQzQjtJQUFELHNCQUFDO0NBQUEsQUF2REQsQ0FBcUMsd0JBQXdCLEdBdUQ1RDtTQXZEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gXCIuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHR0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZTtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMyA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDNcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm9jZXNzQ2xpY2soZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4LCB2YWx1ZUxpc3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlzYWJsZSgpICYmICF0aGlzLmRpc2FibGVMaXN0KHZhbHVlTGlzdC52YWx1ZSkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pICE9IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB2YWx1ZUxpc3QudmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRldmVudDpldmVudCxcclxuXHRcdFx0XHRhY3Rpb246YWN0aW9uLFxyXG5cdFx0XHRcdGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcblx0XHRcdFx0dmFsdWVMaXN0OnZhbHVlTGlzdCxcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZGlzYWJsZUxpc3QodmFsdWUpIHtcclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uZGlzYWJsZUxpc3QgJiYgdGhpcy5maWVsZENyZWF0aW9uLmRpc2FibGVMaXN0LmluZGV4T2YodmFsdWUpID4gLTEpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcbiJdfQ==