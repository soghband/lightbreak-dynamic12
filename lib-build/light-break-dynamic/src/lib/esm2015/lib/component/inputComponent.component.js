import { Component, Input, Output, ViewContainerRef } from '@angular/core';
import { AnimationService } from '../service/animation.service';
export class InputComponent {
    constructor(viewContainerRef, animationService) {
        this.viewContainerRef = viewContainerRef;
        this.animationService = animationService;
    }
    processCall(data) {
        // console.log(1,data);
    }
    ;
}
InputComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-input',
                template: ''
            },] }
];
InputComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: AnimationService }
];
InputComponent.propDecorators = {
    data: [{ type: Input }],
    type: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRDb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9pbnB1dENvbXBvbmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBTTlELE1BQU0sT0FBTyxjQUFjO0lBQzFCLFlBQW1CLGdCQUFrQyxFQUFTLGdCQUFrQztRQUE3RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUFJLENBQUM7SUFTckcsV0FBVyxDQUFDLElBQUk7UUFDZix1QkFBdUI7SUFDeEIsQ0FBQztJQUFBLENBQUM7OztZQWhCRixTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxFQUFFO2FBQ1o7OztZQU5pQyxnQkFBZ0I7WUFDMUMsZ0JBQWdCOzs7bUJBUXRCLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q29udGFpbmVyUmVmLCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdsYjktaW5wdXQnLFxyXG5cdHRlbXBsYXRlOiAnJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRDb21wb25lbnQge1xyXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLHByaXZhdGUgYW5pbWF0aW9uU2VydmljZTogQW5pbWF0aW9uU2VydmljZSkgeyB9XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSB0eXBlO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcblx0QElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrOiBFdmVudEVtaXR0ZXI8YW55PjtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjazogRXZlbnRFbWl0dGVyPGFueT47XHJcblx0cHJvY2Vzc0NhbGwoZGF0YSkge1xyXG5cdFx0Ly8gY29uc29sZS5sb2coMSxkYXRhKTtcclxuXHR9O1xyXG59XHJcbiJdfQ==