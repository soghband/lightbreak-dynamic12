import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class SelectBoxComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    columnCalculate: any;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    processCall(data: any): void;
    processChange(event: any, action: any, dataIndex: any): void;
    checkValueList(valueList: any): boolean;
}
