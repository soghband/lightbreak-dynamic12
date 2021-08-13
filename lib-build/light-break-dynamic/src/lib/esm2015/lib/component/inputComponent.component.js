import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { AnimationService } from '../service/animation.service';
let InputComponent = class InputComponent {
    constructor(viewContainerRef, animationService) {
        this.viewContainerRef = viewContainerRef;
        this.animationService = animationService;
    }
    processCall(data) {
        // console.log(1,data);
    }
    ;
};
InputComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputComponent.prototype, "panelCallBack", void 0);
InputComponent = __decorate([
    Component({
        selector: 'lb9-input',
        template: ''
    }),
    __metadata("design:paramtypes", [ViewContainerRef, AnimationService])
], InputComponent);
export { InputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRDb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvaW5wdXRDb21wb25lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBTTlELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDMUIsWUFBbUIsZ0JBQWtDLEVBQVMsZ0JBQWtDO1FBQTdFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUksQ0FBQztJQVNyRyxXQUFXLENBQUMsSUFBSTtRQUNmLHVCQUF1QjtJQUN4QixDQUFDO0lBQUEsQ0FBQztDQUNGLENBQUE7O1lBWnFDLGdCQUFnQjtZQUEyQixnQkFBZ0I7O0FBQ3ZGO0lBQVIsS0FBSyxFQUFFOzs0Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzs0Q0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzs4Q0FBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOztxREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOztrREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOztnREFBVTtBQUNSO0lBQVQsTUFBTSxFQUFFOzhCQUFXLFlBQVk7Z0RBQU07QUFDNUI7SUFBVCxNQUFNLEVBQUU7OEJBQWdCLFlBQVk7cURBQU07QUFUL0IsY0FBYztJQUoxQixTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsRUFBRTtLQUNaLENBQUM7cUNBRW9DLGdCQUFnQixFQUEyQixnQkFBZ0I7R0FEcEYsY0FBYyxDQWExQjtTQWJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgVmlld0NvbnRhaW5lclJlZiwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LWlucHV0JyxcclxuXHR0ZW1wbGF0ZTogJydcclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0Q29tcG9uZW50IHtcclxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixwcml2YXRlIGFuaW1hdGlvblNlcnZpY2U6IEFuaW1hdGlvblNlcnZpY2UpIHsgfVxyXG5cdEBJbnB1dCgpIGRhdGE7XHJcblx0QElucHV0KCkgdHlwZTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG5cdEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjazogRXZlbnRFbWl0dGVyPGFueT47XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKDEsZGF0YSk7XHJcblx0fTtcclxufVxyXG4iXX0=