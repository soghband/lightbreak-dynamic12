import { EventEmitter, OnInit } from '@angular/core';
export declare class DatePickerComponent implements OnInit {
    monthListLong: any;
    monthListShort: any;
    weekDay: any;
    yearOffset: any;
    showToday: boolean;
    todayText: string;
    closeOnDateSelect: boolean;
    setDate: EventEmitter<any>;
    inputFocus: EventEmitter<any>;
    onfocus: boolean;
    showPanel: boolean;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    month: number;
    year: number;
    yearListGen: number;
    dateList: any[];
    yearList: any[];
    currentDate: {
        year: number;
        month: number;
        day: number;
    };
    selectedDate: {
        year: number;
        month: number;
        day: number;
    };
    showDate: boolean;
    showYear: boolean;
    showMonth: boolean;
    animationState: string;
    constructor();
    ngOnInit(): void;
    generateDateList(): void;
    actionPrev(): void;
    actionNext(): void;
    generateYearList(): void;
    actionPrevYear(): void;
    actionNextYear(): void;
    actionYearSelect(): void;
    selectYear(year: any): void;
    selectMonth(month: any): void;
    selectDate(date: any): void;
    open(dateSelected?: any): void;
    selectToday(): void;
    closeCalendar(): void;
    setInputFocus(): void;
    setCalendarFocus(): void;
}
