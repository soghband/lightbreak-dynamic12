import { EventEmitter, OnInit } from '@angular/core';
export declare class DynamicTabComponent implements OnInit {
    tabCreation: any;
    lockTab: boolean;
    callBack: EventEmitter<any>;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    currentTab: number;
    constructor();
    ngOnInit(): void;
    processCallBack(data: any): void;
    getDisableTab(tabIndex: any): boolean;
    disableTab(tabIndex: any): void;
    enableTab(tabIndex: any): void;
    nextTab(): void;
    toggleLockTab(): void;
    getCssStatus(tabNumber: any): "p2DShowTab" | "p2DHideTab";
    gotoTab(tabIndex: any): void;
}
//# sourceMappingURL=dynamic-tab.component.d.ts.map