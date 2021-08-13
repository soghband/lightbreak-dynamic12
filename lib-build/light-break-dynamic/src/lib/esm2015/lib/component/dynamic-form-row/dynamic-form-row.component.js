import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { DynamicContainerComponent } from '../dynamic-container/dynamic-container.component';
export class DynamicFormRowComponent {
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
}
DynamicFormRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-dynamic-form-row',
                template: "<ng-container *ngIf=\"containerList\">\r\n  <ng-container *ngFor=\"let containerIndex of objKey(containerList)\">\r\n    <lb9-dynamic-container\r\n            [containerCreation]=\"containerList[containerIndex]\"\r\n            [data]=\"data\"\r\n            [actionDataIndex]=\"rowIndex\"\r\n            [containerIndex]=\"containerIndex\"\r\n            [option]=\"option\"\r\n            [reRenderField]=\"_reRenderFieldList\"\r\n            (callBack)=\"processCallBack($event)\"\r\n            (panelCallBack)=\"processPanelCallBack($event)\">\r\n\r\n    </lb9-dynamic-container>\r\n  </ng-container>\r\n</ng-container>\r\n"
            },] }
];
DynamicFormRowComponent.ctorParameters = () => [];
DynamicFormRowComponent.propDecorators = {
    containerListRef: [{ type: ViewChildren, args: [DynamicContainerComponent,] }],
    containerList: [{ type: Input }],
    _reRenderFieldList: [{ type: Input }],
    option: [{ type: Input }],
    data: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2R5bmFtaWMtZm9ybS1yb3cvZHluYW1pYy1mb3JtLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBYSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFNM0YsTUFBTSxPQUFPLHVCQUF1QjtJQWFoQztRQUpVLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3QyxXQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUdyQixDQUFDO0lBRUQsUUFBUTtJQUVSLENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Qsb0JBQW9CLENBQUMsS0FBSztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7WUE3QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLGdvQkFBZ0Q7YUFDbkQ7Ozs7K0JBR0ksWUFBWSxTQUFDLHlCQUF5Qjs0QkFDdEMsS0FBSztpQ0FDTCxLQUFLO3FCQUNMLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUVMLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNDb250YWluZXJDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtY29udGFpbmVyL2R5bmFtaWMtY29udGFpbmVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtZm9ybS1yb3cnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS1yb3cuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Sb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBWaWV3Q2hpbGRyZW4oRHluYW1pY0NvbnRhaW5lckNvbXBvbmVudCkgY29udGFpbmVyTGlzdFJlZjogUXVlcnlMaXN0PER5bmFtaWNDb250YWluZXJDb21wb25lbnQ+O1xyXG4gICAgQElucHV0KCkgY29udGFpbmVyTGlzdDtcclxuICAgIEBJbnB1dCgpIF9yZVJlbmRlckZpZWxkTGlzdDtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIGRhdGE7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHJcbiAgICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBvYmpLZXkgPSBPYmplY3Qua2V5cztcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcm9jZXNzQ2FsbEJhY2soZXZlbnQpe1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzUGFuZWxDYWxsQmFjayhldmVudCkge1xyXG4gICAgICAgIHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19