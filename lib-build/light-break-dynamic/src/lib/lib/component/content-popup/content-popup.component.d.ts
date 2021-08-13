import { OnInit, EventEmitter } from '@angular/core';
export declare class ContentPopupComponent implements OnInit {
    header: string;
    footer: string;
    elementName: string;
    closeByButtonOnly: boolean;
    customClass: any;
    noScroll: boolean;
    callBack: EventEmitter<any>;
    display: boolean;
    overContent: boolean;
    animationState: string;
    onAnimation: boolean;
    closeDelay: import("rxjs").Observable<number>;
    constructor();
    ngOnInit(): void;
    closePopup(forceClose?: boolean): void;
    showPopup(): void;
    releaseContent(): void;
    lockContent(): void;
    callbackProcess(action: any): void;
}
