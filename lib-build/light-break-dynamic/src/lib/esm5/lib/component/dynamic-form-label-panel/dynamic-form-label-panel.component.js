import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
var DynamicFormLabelPanelComponent = /** @class */ (function () {
    function DynamicFormLabelPanelComponent() {
        this.panelCallBack = new EventEmitter();
    }
    DynamicFormLabelPanelComponent.prototype.ngOnInit = function () {
    };
    DynamicFormLabelPanelComponent.prototype.getLabelDisplay = function () {
        if (typeof (this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
            return "dp2hide";
        }
        else if (this.option.labelAlign == "left") {
            return "singleLine";
        }
        else {
            return "";
        }
    };
    DynamicFormLabelPanelComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit(event);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormLabelPanelComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormLabelPanelComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormLabelPanelComponent.prototype, "width", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicFormLabelPanelComponent.prototype, "panelCallBack", void 0);
    DynamicFormLabelPanelComponent = __decorate([
        Component({
            selector: 'lb9-dynamic-form-label-panel',
            template: "<div *ngIf=\"fieldCreation.label != ''\" class=\"dp2Label {{getLabelDisplay()}} {{option.labelAlign == 'left' ? 'vAlignTop alignRight' : ''}}\"\r\n     [style.width]=\"width\" (click)=\"processPanelCallBack($event)\">\r\n  <div class=\"{{fieldCreation.require ? 'requireLabel':''}}\" [innerHTML]=\"fieldCreation.label\"></div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [])
    ], DynamicFormLabelPanelComponent);
    return DynamicFormLabelPanelComponent;
}());
export { DynamicFormLabelPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWxhYmVsLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtZm9ybS1sYWJlbC1wYW5lbC9keW5hbWljLWZvcm0tbGFiZWwtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTTdFO0lBS0k7UUFEVSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFN0MsQ0FBQztJQUVELGlEQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsd0RBQWUsR0FBZjtRQUNJLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxPQUFPLEVBQUU7WUFDekgsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sRUFBRTtZQUN6QyxPQUFPLFlBQVksQ0FBQTtTQUN0QjthQUFNO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7SUFDRCw2REFBb0IsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBckJRO1FBQVIsS0FBSyxFQUFFOzt5RUFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOztrRUFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOztpRUFBTztJQUNMO1FBQVQsTUFBTSxFQUFFOzt5RUFBb0M7SUFKcEMsOEJBQThCO1FBSjFDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSw4QkFBOEI7WUFDeEMsZ1dBQXdEO1NBQzNELENBQUM7O09BQ1csOEJBQThCLENBdUIxQztJQUFELHFDQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0F2QlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktZHluYW1pYy1mb3JtLWxhYmVsLXBhbmVsJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWZvcm0tbGFiZWwtcGFuZWwuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUxhYmVsUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIHdpZHRoO1xyXG4gICAgQE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYWJlbERpc3BsYXkoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24ubGFiZWwpID09IFwidW5kZWZpbmVkXCIgfHwgdGhpcy5maWVsZENyZWF0aW9uLmxhYmVsID09IFwiXCIgfHwgdGhpcy5vcHRpb24uZGlzcGxheU1vZGUgPT0gXCJ0YWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImRwMmhpZGVcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uLmxhYmVsQWxpZ24gPT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic2luZ2xlTGluZVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIl19