import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class CheckBoxComponent extends DynamicBehaviorComponent implements OnInit {
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
    showSelectAll: string;
    selectAll: boolean;
    singleLine: string;
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    checkboxDisplay: string;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    toggleSelectAll(): void;
    processCall(data: any): void;
    processChange(event: any, s: any, valueList: any): void;
    toggleShowCheckBox(): void;
    haveChecked(): boolean;
}
