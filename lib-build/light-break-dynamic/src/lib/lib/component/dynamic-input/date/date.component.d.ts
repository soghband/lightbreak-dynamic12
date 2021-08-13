import { ElementRef, EventEmitter, OnInit, QueryList } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
import { DatePickerComponent } from './date-picker/date-picker.component';
export declare class DateComponent extends DynamicBehaviorComponent implements OnInit {
    dateInputVC: QueryList<ElementRef>;
    calendarVC: QueryList<DatePickerComponent>;
    data: any;
    option: any;
    fieldCreation: any;
    inputIndex: any;
    rowIndex: any;
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    defaultMonthListLong: string[];
    defaultMonthListShort: string[];
    defaultWeekDay: string[];
    columnCalculate: string;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    calendarIndex: number;
    tempValue: any;
    haveChange: boolean;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    addMultiVal(): void;
    deleteMultiVal(dataIndex: any): void;
    processKeyUp(event: any, action: any, dataIndex: any): boolean;
    processKeyDown(event: any, action: any, dataIndex: any): void;
    processCallBackKeyPress(event: any, action: any, dataIndex: any): boolean;
    processBlur(event: any, action: any, dataIndex: any): void;
    processCall(data: any): void;
    processPanelCallBack(event: any): void;
    setDate(event: any, dataIndex: any): void;
    setDisplay(dataIndex: any): void;
    pad(n: any, width: any, z?: string): any;
    getDateDisable(): boolean;
    setFocus(data: any): void;
    openCalendar(data: any, index: any): void;
}
//# sourceMappingURL=date.component.d.ts.map