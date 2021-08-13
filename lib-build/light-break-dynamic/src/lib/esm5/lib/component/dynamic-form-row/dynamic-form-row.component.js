import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicContainerComponent } from '../dynamic-container/dynamic-container.component';
var DynamicFormRowComponent = /** @class */ (function () {
    function DynamicFormRowComponent() {
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
    }
    DynamicFormRowComponent.prototype.ngOnInit = function () {
    };
    DynamicFormRowComponent.prototype.processCallBack = function (event) {
        this.callBack.emit(event);
    };
    DynamicFormRowComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit(event);
    };
    __decorate([
        ViewChildren(DynamicContainerComponent),
        __metadata("design:type", QueryList)
    ], DynamicFormRowComponent.prototype, "containerListRef", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "containerList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "_reRenderFieldList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicFormRowComponent.prototype, "panelCallBack", void 0);
    DynamicFormRowComponent = __decorate([
        Component({
            selector: 'lb9-dynamic-form-row',
            template: "<ng-container *ngIf=\"containerList\">\r\n  <ng-container *ngFor=\"let containerIndex of objKey(containerList)\">\r\n    <lb9-dynamic-container\r\n            [containerCreation]=\"containerList[containerIndex]\"\r\n            [data]=\"data\"\r\n            [actionDataIndex]=\"rowIndex\"\r\n            [containerIndex]=\"containerIndex\"\r\n            [option]=\"option\"\r\n            [reRenderField]=\"_reRenderFieldList\"\r\n            (callBack)=\"processCallBack($event)\"\r\n            (panelCallBack)=\"processPanelCallBack($event)\">\r\n\r\n    </lb9-dynamic-container>\r\n  </ng-container>\r\n</ng-container>\r\n"
        }),
        __metadata("design:paramtypes", [])
    ], DynamicFormRowComponent);
    return DynamicFormRowComponent;
}());
export { DynamicFormRowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWZvcm0tcm93L2R5bmFtaWMtZm9ybS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFNM0Y7SUFhSTtRQUpVLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3QyxXQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUdyQixDQUFDO0lBRUQsMENBQVEsR0FBUjtJQUVBLENBQUM7SUFDRCxpREFBZSxHQUFmLFVBQWdCLEtBQUs7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELHNEQUFvQixHQUFwQixVQUFxQixLQUFLO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUF2QndDO1FBQXhDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQztrQ0FBbUIsU0FBUztxRUFBNEI7SUFDdkY7UUFBUixLQUFLLEVBQUU7O2tFQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3VFQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs7MkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7eURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7NkRBQVU7SUFFUjtRQUFULE1BQU0sRUFBRTs7NkRBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOztrRUFBb0M7SUFWcEMsdUJBQXVCO1FBSm5DLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsZ29CQUFnRDtTQUNuRCxDQUFDOztPQUNXLHVCQUF1QixDQTJCbkM7SUFBRCw4QkFBQztDQUFBLEFBM0JELElBMkJDO1NBM0JZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNDb250YWluZXJDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtY29udGFpbmVyL2R5bmFtaWMtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtZm9ybS1yb3cnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS1yb3cuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Sb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBWaWV3Q2hpbGRyZW4oRHluYW1pY0NvbnRhaW5lckNvbXBvbmVudCkgY29udGFpbmVyTGlzdFJlZjogUXVlcnlMaXN0PER5bmFtaWNDb250YWluZXJDb21wb25lbnQ+O1xyXG4gICAgQElucHV0KCkgY29udGFpbmVyTGlzdDtcclxuICAgIEBJbnB1dCgpIF9yZVJlbmRlckZpZWxkTGlzdDtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIGRhdGE7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBvYmpLZXkgPSBPYmplY3Qua2V5cztcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcm9jZXNzQ2FsbEJhY2soZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzUGFuZWxDYWxsQmFjayhldmVudCkge1xyXG4gICAgICAgIHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19