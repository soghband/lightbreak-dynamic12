import { OnInit } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
export declare class SideBarComponent implements OnInit {
    sideBarWidth: number;
    aNgScrollBar: NgScrollbar;
    componentWidth: string;
    sideBarWidthCal: string;
    contentWidthCal: string;
    leftOffset: string;
    active: boolean;
    fixScrollBar: boolean;
    scrollbarOptions: {
        axis: string;
        theme: string;
    };
    constructor();
    ngOnInit(): void;
    toggleSideBar(): void;
    reProcessScrollBar(): void;
}
//# sourceMappingURL=side-bar.component.d.ts.map