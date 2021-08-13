import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class TableComponent implements OnInit, OnChanges {
    private _pageNumber;
    private _sortData;
    get pageNumber(): any;
    get sortData(): any;
    set pageNumber(val: any);
    set sortData(val: any);
    tableCreation: any;
    callBack: EventEmitter<any>;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    sortField: string;
    sortType: string;
    checkData: any[];
    checkDataTemp: any[];
    radioData: string;
    checkSelectAll: boolean;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    processCheckSelectAll(): void;
    getData(fieldData: any, row: any): string;
    getFieldId(fieldData: any): string;
    editRow(row: any): void;
    deleteRow(row: any): void;
    sortBy(dataIndex: any): void;
    dataAction(rowNum: any, fieldName: any): void;
    checkAction(rowIndex: any): void;
    radioAction(rowIndex: any): void;
    getPrimary(rowIndex: any): string;
    getCheckedList(): any[];
    clearCheckList(): void;
    checkActionAll(): void;
    checkIgnore(rowIndex: any): boolean;
}
//# sourceMappingURL=table.component.d.ts.map