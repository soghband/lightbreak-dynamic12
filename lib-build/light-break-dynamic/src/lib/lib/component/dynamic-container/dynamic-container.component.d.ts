import { EventEmitter, OnInit, QueryList } from '@angular/core';
import { DynamicInputComponent } from "../dynamic-input/dynamic-input.component";
export declare class DynamicContainerComponent implements OnInit {
    inputChild: QueryList<DynamicInputComponent>;
    containerCreation: any;
    data: any;
    option: any;
    actionDataIndex: any;
    containerIndex: any;
    reRenderField: any[];
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    emitFieldSelect: boolean;
    objKey: {
        (o: object): string[];
        (o: {}): string[];
    };
    widthCalculator: any;
    constructor();
    ngOnInit(): void;
    processCallBack(event: any): void;
    processPanelCallBack(event: any): void;
    callPanelCallBack(event: any): void;
    getDynamicInput(inputIndex: any): DynamicInputComponent;
    checkReRender(fieldName: any): boolean;
}
//# sourceMappingURL=dynamic-container.component.d.ts.map