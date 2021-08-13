import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
export declare class ImageComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    rowIndex: any;
    inputIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    imageInputVC: ElementRef;
    columnCalculate: any;
    base64textString: any[];
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    modeDisplay: string;
    errorMsg: string;
    acceptExt: string;
    fileTypeList: {
        "jpeg": string;
        "jpg": string;
        "png": string;
        "svg": string;
    };
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    handleFileSelect(evt: any): void;
    _handleReaderLoaded(readerEvt: any): void;
    getNasImageUrl(file: any): string;
    processCall(data: any): void;
    getType(data: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    validateFileExtension(): boolean;
    checkFileRequire(): boolean;
    clickImage(index: any): void;
    clickCurrentImage(index: any): void;
    deleteCurrentImage(index: any): void;
    deleteImage(index: any): void;
}
