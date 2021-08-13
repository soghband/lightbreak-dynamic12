import { ViewContainerRef, EventEmitter } from '@angular/core';
import { AnimationService } from '../service/animation.service';
export declare class InputComponent {
    viewContainerRef: ViewContainerRef;
    private animationService;
    constructor(viewContainerRef: ViewContainerRef, animationService: AnimationService);
    data: any;
    type: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    processCall(data: any): void;
}
//# sourceMappingURL=inputComponent.component.d.ts.map