import { EventEmitter, OnInit, QueryList } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { AnimationService } from '../../../service/animation.service';
export declare class AutoCompleteComponent extends DynamicBehaviorComponent implements OnInit {
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    aNgScrollBar: QueryList<NgScrollbar>;
    columnCalculate: string;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    autoCompleteFilterList: any[];
    displayAutoComplete: any[];
    setOnList: any[];
    maxShowData: number;
    selectIndex: number;
    tempValue: any[];
    tempValueValidate: {};
    tempFilter: any[];
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    displayIndex: any[];
    allowTempData: boolean;
    fixScrollBar: boolean;
    btnHover: boolean;
    assignByEnter: boolean;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    getDataFromValue(value: any): any;
    addMultiVal(): void;
    deleteMultiVal(dataIndex: any): void;
    processClick(event: any, action: any, dataIndex: any): void;
    processFocus(event: any, action: any, dataIndex: any): void;
    hideList(dataIndex: any): void;
    setOverList(dataIndex: any): void;
    setOutList(dataIndex: any): void;
    processKeyUp(event: any, action: any, dataIndex: any): boolean;
    processKeyDown(event: any, action: any, dataIndex: any): void;
    processCall(data: any): void;
    checkReadonly(): boolean;
    assignData(event: any, dataIndex: any, data: any): void;
    processCallBackKeyPress(event: any, action: any, dataIndex: any): boolean;
    processBlur(event: any, action: any, dataIndex: any): void;
    mouseOverChangeIndex(filterIndex: any): void;
    filterAutoComplete(dataIndex: any, force?: boolean): void;
    refineValueList(): void;
    checkDefault(): boolean;
    setBtnHover(status: any): void;
}
//# sourceMappingURL=auto-complete.component.d.ts.map