import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class RadioComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    objKey: {
        (o: object): string[];
        (o: {}): string[];
    };
    columnCalculate: any;
    selectAll: boolean;
    singleLine: string;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    processCall(data: any): void;
    processChange($event: any, s: any, valueList: any): void;
}
//# sourceMappingURL=radio.component.d.ts.map