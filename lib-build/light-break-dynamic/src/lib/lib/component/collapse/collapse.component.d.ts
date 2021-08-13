import { OnInit, EventEmitter } from '@angular/core';
export declare class CollapseComponent implements OnInit {
    header: string;
    callBack: EventEmitter<any>;
    animationState: string;
    active: boolean;
    onAction: boolean;
    timeDelay: import("rxjs").Observable<number>;
    constructor();
    ngOnInit(): void;
    toggleShowDiv(): void;
}
