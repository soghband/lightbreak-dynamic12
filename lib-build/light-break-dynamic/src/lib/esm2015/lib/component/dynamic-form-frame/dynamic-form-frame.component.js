import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let DynamicFormFrameComponent = class DynamicFormFrameComponent {
    constructor() {
        this.showDeleteRow = false;
        this.callback = new EventEmitter();
    }
    ngOnInit() {
    }
    deleteRowProcess() {
        this.callback.emit({
            action: "deleteRow",
            rowIndex: this.rowIndex
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "showDeleteRow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "callback", void 0);
DynamicFormFrameComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-form-frame',
        template: "<div class=\"mainPanelDF\">\r\n    <div class=\"panelAlign\">\r\n        <div class=\"header\">\r\n            <div>{{header[rowIndex]}}</div>\r\n            <div class=\"closeBtn {{showDeleteRow ? 'show':'hide'}}\" id=\"delete_row_frame_{{rowIndex}}\" (click)=\"deleteRowProcess()\">\r\n                <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"contentPanel\">\r\n            <ng-content></ng-content>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicFormFrameComponent);
export { DynamicFormFrameComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWZyYW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtZm9ybS1mcmFtZS9keW5hbWljLWZvcm0tZnJhbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTTdFLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBS2xDO1FBSFMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFckIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFeEMsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZixNQUFNLEVBQUMsV0FBVztZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKLENBQUE7QUFoQlk7SUFBUixLQUFLLEVBQUU7O3lEQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O2dFQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7MkRBQVU7QUFDUjtJQUFULE1BQU0sRUFBRTs7MkRBQStCO0FBSi9CLHlCQUF5QjtJQUpyQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLGdpQkFBa0Q7S0FDckQsQ0FBQzs7R0FDVyx5QkFBeUIsQ0FpQnJDO1NBakJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtZm9ybS1mcmFtZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1mb3JtLWZyYW1lLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1GcmFtZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBoZWFkZXI7XHJcbiAgICBASW5wdXQoKSBzaG93RGVsZXRlUm93ID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuICAgIEBPdXRwdXQoKSBjYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZVJvd1Byb2Nlc3MoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjay5lbWl0KHtcclxuICAgICAgICAgICAgYWN0aW9uOlwiZGVsZXRlUm93XCIsXHJcbiAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLnJvd0luZGV4XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iXX0=