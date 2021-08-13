import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { AnimationService } from '../service/animation.service';
var InputComponent = /** @class */ (function () {
    function InputComponent(viewContainerRef, animationService) {
        this.viewContainerRef = viewContainerRef;
        this.animationService = animationService;
    }
    InputComponent.prototype.processCall = function (data) {
        // console.log(1,data);
    };
    ;
    InputComponent.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: AnimationService }
    ]; };
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
    return InputComponent;
}());
export { InputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRDb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvaW5wdXRDb21wb25lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBTTlEO0lBQ0Msd0JBQW1CLGdCQUFrQyxFQUFTLGdCQUFrQztRQUE3RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFTckcsb0NBQVcsR0FBWCxVQUFZLElBQUk7UUFDZix1QkFBdUI7SUFDeEIsQ0FBQztJQUFBLENBQUM7O2dCQVhtQyxnQkFBZ0I7Z0JBQTJCLGdCQUFnQjs7SUFDdkY7UUFBUixLQUFLLEVBQUU7O2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O2dEQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O2tEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O3lEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3NEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7O29EQUFVO0lBQ1I7UUFBVCxNQUFNLEVBQUU7a0NBQVcsWUFBWTtvREFBTTtJQUM1QjtRQUFULE1BQU0sRUFBRTtrQ0FBZ0IsWUFBWTt5REFBTTtJQVQvQixjQUFjO1FBSjFCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxFQUFFO1NBQ1osQ0FBQzt5Q0FFb0MsZ0JBQWdCLEVBQTJCLGdCQUFnQjtPQURwRixjQUFjLENBYTFCO0lBQUQscUJBQUM7Q0FBQSxBQWJELElBYUM7U0FiWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDb250YWluZXJSZWYsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS1pbnB1dCcsXHJcblx0dGVtcGxhdGU6ICcnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dENvbXBvbmVudCB7XHJcblx0Y29uc3RydWN0b3IocHVibGljIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYscHJpdmF0ZSBhbmltYXRpb25TZXJ2aWNlOiBBbmltYXRpb25TZXJ2aWNlKSB7IH1cclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIHR5cGU7XHJcblx0QElucHV0KCkgb3B0aW9uO1xyXG5cdEBJbnB1dCgpIGZpZWxkQ3JlYXRpb247XHJcblx0QElucHV0KCkgaW5wdXRJbmRleDtcclxuXHRASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+O1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrOiBFdmVudEVtaXR0ZXI8YW55PjtcclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZygxLGRhdGEpO1xyXG5cdH07XHJcbn1cclxuIl19