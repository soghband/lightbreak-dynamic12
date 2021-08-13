import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class FileUploadComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    columnCalculate: any;
    acceptExt: string;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    handleFileSelect(evt: any): void;
    processCall(data: any): void;
}
