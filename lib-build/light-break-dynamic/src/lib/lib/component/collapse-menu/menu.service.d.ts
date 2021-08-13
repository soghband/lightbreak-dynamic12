import { EventEmitter } from '@angular/core';
export declare class MenuService {
    emitMenu: EventEmitter<any>;
    menuData: string;
    constructor();
    setMenu(menu: any): void;
    getMenu(): string;
}
