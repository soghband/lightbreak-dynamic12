import { EventEmitter, OnInit, QueryList } from '@angular/core';
import { DynamicContainerComponent } from '../dynamic-container/dynamic-container.component';
export declare class DynamicFormRowComponent implements OnInit {
    containerListRef: QueryList<DynamicContainerComponent>;
    containerList: any;
    _reRenderFieldList: any;
    option: any;
    data: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    objKey: {
        (o: object): string[];
        (o: {}): string[];
    };
    constructor();
    ngOnInit(): void;
    processCallBack(event: any): void;
    processPanelCallBack(event: any): void;
}
//# sourceMappingURL=dynamic-form-row.component.d.ts.map