import { OnInit, EventEmitter } from '@angular/core';
export declare class StepTabComponent implements OnInit {
    tabList: any[];
    stepClick: boolean;
    callBack: EventEmitter<any>;
    calculateCss: string;
    lastTab: any;
    objKeys: {
        (o: object): string[];
        (o: {}): string[];
    };
    activeStep: number;
    constructor();
    ngOnInit(): void;
    getActive(tabNumber: any): "stepShow" | "stepHide";
    prevStep(): void;
    nextStep(): void;
    gotoStep(stepIndex: any): void;
    private gotoStepClick;
}
