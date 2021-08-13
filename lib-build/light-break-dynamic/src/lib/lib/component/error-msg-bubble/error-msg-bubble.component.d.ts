import { OnInit } from '@angular/core';
export declare class ErrorMsgBubbleComponent implements OnInit {
    maxShow: number;
    data: any[];
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    constructor();
    ngOnInit(): void;
    clearError(): void;
    addError(key: any, msg: any): void;
    removeError(key: any): void;
}
//# sourceMappingURL=error-msg-bubble.component.d.ts.map