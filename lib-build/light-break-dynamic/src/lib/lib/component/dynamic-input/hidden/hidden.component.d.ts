import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class HiddenComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    columnCalculate: any;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    processCall(data: any): void;
}
//# sourceMappingURL=hidden.component.d.ts.map