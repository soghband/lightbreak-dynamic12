import { EventEmitter } from '@angular/core';
import { AnimationService } from '../../service/animation.service';
export declare class DynamicBehaviorComponent {
    private animationService;
    fieldCreation: any;
    option: any;
    data: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    animateTimer: import("rxjs").Observable<number>;
    animationServiceInit: boolean;
    animateState: boolean;
    animateName: string;
    constructor(animationService: AnimationService);
    animateProcess(): void;
    getLabelWidth(): string;
    getInputWidth(): string;
    processCallBack(event: any, action: any, dataIndex: any): void;
    getCustomClass(): any;
    checkRequire(index: any): "require" | "";
    getDisable(): boolean;
    processPanelCallBack(event: any): void;
}
//# sourceMappingURL=dynamic-behavior.component.d.ts.map