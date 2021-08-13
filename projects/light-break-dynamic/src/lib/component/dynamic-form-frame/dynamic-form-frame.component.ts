import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'lb12-dynamic-form-frame',
    templateUrl: './dynamic-form-frame.component.html'
})
export class DynamicFormFrameComponent implements OnInit {
    @Input() header;
    @Input() showDeleteRow = false;
    @Input() rowIndex;
    @Output() callback = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }

    deleteRowProcess() {
        this.callback.emit({
            action:"deleteRow",
            rowIndex: this.rowIndex
        })
    }
}
