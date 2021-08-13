import { EventEmitter } from '@angular/core';
export declare class AnimationService {
    animationEmitter: EventEmitter<any>;
    animationRegister: any[];
    animationState: string;
    initStateTimer: import("rxjs").Observable<number>;
    animateQueueInterval: import("rxjs").Observable<number>;
    reRendering: boolean;
    enableAnimation: boolean;
    count: number;
    constructor();
    registerAnimation(elementName: any): string;
    animateProcess(): void;
    setOnReRender(rerenderStatus: any): void;
    setEnableAnimation(enable: any): void;
}
//# sourceMappingURL=animation.service.d.ts.map