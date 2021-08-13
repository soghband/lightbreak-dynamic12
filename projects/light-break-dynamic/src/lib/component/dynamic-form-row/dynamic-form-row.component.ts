import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {DynamicContainerComponent} from '../dynamic-container/dynamic-container.component';

@Component({
    selector: 'lb12-dynamic-form-row',
    templateUrl: './dynamic-form-row.component.html',
})
export class DynamicFormRowComponent implements OnInit {

    @ViewChildren(DynamicContainerComponent) containerListRef: QueryList<DynamicContainerComponent>;
    @Input() containerList;
    @Input() _reRenderFieldList;
    @Input() option;
    @Input() data;
    @Input() rowIndex;

    @Output() callBack = new EventEmitter();
    @Output() panelCallBack = new EventEmitter();

    objKey = Object.keys;
    constructor() {

    }

    ngOnInit() {

    }
    processCallBack(event){
        this.callBack.emit(event);
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }

}
