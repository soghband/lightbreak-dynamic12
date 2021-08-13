import { EventEmitter, OnInit } from '@angular/core';
export declare class DynamicFormLabelPanelComponent implements OnInit {
    fieldCreation: any;
    option: any;
    width: any;
    panelCallBack: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    getLabelDisplay(): "" | "dp2hide" | "singleLine";
    processPanelCallBack(event: any): void;
}
//# sourceMappingURL=dynamic-form-label-panel.component.d.ts.map