import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicContainerComponent } from '../dynamic-container/dynamic-container.component';
let DynamicFormRowComponent = class DynamicFormRowComponent {
    constructor() {
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
    }
    ngOnInit() {
    }
    processCallBack(event) {
        this.callBack.emit(event);
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }
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
export { DynamicFormRowComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWZvcm0tcm93L2R5bmFtaWMtZm9ybS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFNM0YsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFhaEM7UUFKVSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0MsV0FBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFHckIsQ0FBQztJQUVELFFBQVE7SUFFUixDQUFDO0lBQ0QsZUFBZSxDQUFDLEtBQUs7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELG9CQUFvQixDQUFDLEtBQUs7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUVKLENBQUE7QUF6QjRDO0lBQXhDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQzs4QkFBbUIsU0FBUztpRUFBNEI7QUFDdkY7SUFBUixLQUFLLEVBQUU7OzhEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7O21FQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs7dURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7cURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTs7eURBQVU7QUFFUjtJQUFULE1BQU0sRUFBRTs7eURBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFOzs4REFBb0M7QUFWcEMsdUJBQXVCO0lBSm5DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsZ29CQUFnRDtLQUNuRCxDQUFDOztHQUNXLHVCQUF1QixDQTJCbkM7U0EzQlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0NvbnRhaW5lckNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1jb250YWluZXIvZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktZHluYW1pYy1mb3JtLXJvdycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1mb3JtLXJvdy5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybVJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgQFZpZXdDaGlsZHJlbihEeW5hbWljQ29udGFpbmVyQ29tcG9uZW50KSBjb250YWluZXJMaXN0UmVmOiBRdWVyeUxpc3Q8RHluYW1pY0NvbnRhaW5lckNvbXBvbmVudD47XHJcbiAgICBASW5wdXQoKSBjb250YWluZXJMaXN0O1xyXG4gICAgQElucHV0KCkgX3JlUmVuZGVyRmllbGRMaXN0O1xyXG4gICAgQElucHV0KCkgb3B0aW9uO1xyXG4gICAgQElucHV0KCkgZGF0YTtcclxuICAgIEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIG9iaktleSA9IE9iamVjdC5rZXlzO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuICAgIHByb2Nlc3NDYWxsQmFjayhldmVudCl7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbENhbGxCYWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=