import { OnInit, EventEmitter } from '@angular/core';
export declare class CollapseMenuComponent implements OnInit {
    menuObject: {
        option: any;
        menuList: any[];
    };
    role: any[];
    activeLinkCode: string;
    level: number;
    option: {
        rootPadding: number;
        childPadding: number;
        itemHeight: number;
    };
    callback: EventEmitter<any>;
    padding: string;
    lineHeight: string;
    constructor();
    ngOnInit(): void;
    activeItem(index: any): void;
    getHeight(index: any): string;
    getChildActiveLength(menuChild: any): number;
    childCallback(data: any): void;
    checkRole(index: any): boolean;
    checkChildRole(child: any): boolean;
}
//# sourceMappingURL=collapse-menu.component.d.ts.map