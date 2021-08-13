import { EventEmitter, OnInit } from '@angular/core';
import { TableComponent } from './table/table.component';
export declare class DynamicTableComponent implements OnInit {
    tableRef: TableComponent;
    tableCreation: any;
    callBack: EventEmitter<any>;
    currentPage: number;
    sortData: string;
    constructor();
    ngOnInit(): void;
    processCallBack(data: any): void;
    getTotalPage(): any;
    getPageRank(): {
        begin: any;
        end: any;
    };
    processPagingCallBack(data: any): void;
    processRowLimitCallBack(data: any): void;
    getCheckedList(): any[];
    clearCheckedList(): void;
}
