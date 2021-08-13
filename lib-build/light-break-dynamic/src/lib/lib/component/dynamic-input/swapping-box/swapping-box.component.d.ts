import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class SwappingBoxComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    columnCalculate: any;
    modeDisplay: string;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    optionText: string;
    selectedText: string;
    selectAllText: string;
    removeAllText: string;
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    filter: string;
    filterToggle: string;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    processCall(data: any): void;
    processPanelCallBack(event: any): void;
    checkDestData(valueList: any): boolean;
    transferData(valueIndex: any): void;
    removeData(dataIndex: any): void;
    removeAll(): void;
    selectAll(): void;
    toggleFilter(): void;
}
