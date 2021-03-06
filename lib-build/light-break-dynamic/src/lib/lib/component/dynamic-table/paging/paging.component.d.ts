import { EventEmitter, OnInit } from '@angular/core';
export declare class PagingComponent implements OnInit {
    currentPage: number;
    totalPage: number;
    totalRecord: number;
    dataRank: any;
    customClass: any;
    pageControlType: string;
    rowLimit: any;
    rowLimitOption: any;
    pagingProcess: EventEmitter<any>;
    rowLimitCallback: EventEmitter<any>;
    inputWidth: any;
    tempValue: any;
    tempTotalPage: number;
    totalPageCal: number;
    pageList: any[];
    rowLimitOptionValue: number;
    constructor();
    ngOnInit(): void;
    checkInput(event: any): boolean;
    goFirst(): void;
    goLast(): void;
    goPrev(): void;
    goNext(): void;
    keepValue(): void;
    checkValue(): void;
    getTotalRecordStr(): string;
    processPagingBtn(page: any): void;
    processPaging(): void;
    genPageArray(): any[];
    changeRowLimit(): void;
}
//# sourceMappingURL=paging.component.d.ts.map