import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'lb12-dynamic-form-label-panel',
    templateUrl: './dynamic-form-label-panel.component.html'
})
export class DynamicFormLabelPanelComponent implements OnInit {
    @Input() fieldCreation;
    @Input() option;
    @Input() width;
    @Output() panelCallBack = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }

    getLabelDisplay() {
        if (typeof(this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
            return "dp2hide";
        } else if (this.option.labelAlign == "left") {
            return "singleLine"
        } else {
            return "";
        }
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }
}
