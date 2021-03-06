import { EventEmitter, OnInit } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export declare class TextBoxComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    columnCalculate: string;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    tempValue: any;
    allowTempData: boolean;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    addMultiVal(): void;
    deleteMultiVal(dataIndex: any): void;
    processKeyUp(event: any, action: any, dataIndex: any): boolean;
    processKeyDown(event: any, action: any, dataIndex: any): void;
    processCallBackKeyPress(event: any, action: any, dataIndex: any): boolean;
    processBlur(event: any, action: any, dataIndex: any): boolean;
    getType(): "password" | "number" | "textbox";
}
//# sourceMappingURL=textbox.component.d.ts.map