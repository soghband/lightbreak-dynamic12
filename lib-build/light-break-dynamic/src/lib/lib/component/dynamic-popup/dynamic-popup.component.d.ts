import { OnInit, EventEmitter } from '@angular/core';
export declare class DynamicPopupComponent implements OnInit {
    callback: EventEmitter<any>;
    confirmStatus: boolean;
    showStatus: boolean;
    queue: boolean;
    statusPopup: string;
    popupProperties: any;
    tempData: any;
    constructor();
    ngOnInit(): void;
    set(type: any, message: any, eventCode?: string, data?: {}): void;
    showModel(): void;
    hideModal(): void;
    checkModalOpening(): void;
    confirm(): void;
    close(): void;
}
//# sourceMappingURL=dynamic-popup.component.d.ts.map