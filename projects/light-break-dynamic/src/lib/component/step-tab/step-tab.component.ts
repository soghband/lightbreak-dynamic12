import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lb12-step-tab',
    templateUrl: './step-tab.component.html',
    styleUrls: ['./step-tab.component.scss']
})
export class StepTabComponent implements OnInit {
    @Input() tabList = [];
    @Input() stepClick = false;
    @Output() callBack = new EventEmitter();
    calculateCss = '';
    lastTab;
    objKeys = Object.keys;
    activeStep = 0;

    constructor() {
    }

    ngOnInit() {
        this.lastTab = this.tabList.length - 1;
        const percentWidth = Math.floor(100 / this.tabList.length);
        this.calculateCss = 'calc(' + String(percentWidth) + '% - 2px)';
    }

    getActive(tabNumber) {
        if (tabNumber == this.activeStep) {
            return "stepShow"
        } else {
            return "stepHide"
        }
    }
    prevStep() {
        if (this.activeStep > 0) {
            this.activeStep--;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
    nextStep() {
        if (this.activeStep < (this.tabList.length - 1)) {
            this.activeStep++;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
    gotoStep(stepIndex) {
        if (this.tabList[stepIndex]) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
    private gotoStepClick(stepIndex) {
        if (this.tabList[stepIndex] && this.stepClick) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }

}
