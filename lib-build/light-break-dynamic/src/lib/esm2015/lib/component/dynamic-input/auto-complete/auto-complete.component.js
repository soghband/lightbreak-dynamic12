import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { timer } from 'rxjs';
import { AnimationService } from '../../../service/animation.service';
let AutoCompleteComponent = class AutoCompleteComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.columnCalculate = '';
        this.objKeys = Object.keys;
        this.autoCompleteFilterList = [];
        this.displayAutoComplete = [];
        this.setOnList = [];
        this.maxShowData = 20;
        this.selectIndex = 0;
        this.tempValue = [];
        this.tempValueValidate = {};
        this.tempFilter = [];
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        this.displayIndex = [];
        this.btnHover = false;
        this.assignByEnter = false;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = 'dp2Col1';
                break;
            case 2:
                this.columnCalculate = 'dp2Col2';
                break;
            case 3:
                this.columnCalculate = 'dp2Col3';
                break;
            case 4:
                this.columnCalculate = 'dp2Col4';
                break;
            default:
                this.columnCalculate = '';
        }
        if (this.option.mode == 'add') {
            if (typeof (this.fieldCreation.default) != 'undefined') {
                this.data[this.fieldCreation.fieldName] = Object.assign([], [{
                        display: '',
                        value: ''
                    }]);
                if (Array.isArray(this.fieldCreation.default) && this.checkDefault()) {
                    let newDefault = [];
                    for (let defaultDataRow of this.fieldCreation.default) {
                        newDefault.push(Object.assign({}, defaultDataRow));
                    }
                    this.data[this.fieldCreation.fieldName] = newDefault;
                }
                else if (typeof (this.fieldCreation.default) == 'object' && this.checkDefault()) {
                    this.data[this.fieldCreation.fieldName] = [Object.assign({}, this.fieldCreation.default)];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = Object.assign([], [{
                        display: '',
                        value: ''
                    }]);
            }
        }
        if (typeof (this.fieldCreation.maxShowData) != 'undefined' && parseInt(this.fieldCreation.maxShowData) > 0) {
            this.maxShowData = parseInt(this.fieldCreation.maxShowData);
        }
        for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
            this.autoCompleteFilterList[dataIndex] = [];
            this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
            this.setOnList[dataIndex] = false;
            this.tempValue[dataIndex] = Object.assign({}, this.data[this.fieldCreation.fieldName][dataIndex]);
        }
        // for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
        // 	this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
        // }
    }
    getDataFromValue(value) {
        for (let i of this.fieldCreation.valueList) {
            if (i.value === value) {
                return i;
            }
        }
        return null;
    }
    addMultiVal() {
        let dataLastIndex = this.data[this.fieldCreation.fieldName].length;
        this.autoCompleteFilterList[dataLastIndex] = [];
        this.displayAutoComplete[dataLastIndex] = 'autoCompleteHide';
        this.setOnList[dataLastIndex] = false;
        this.data[this.fieldCreation.fieldName].push({
            display: '',
            value: ''
        });
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processClick(event, action, dataIndex) {
        if (this.fieldCreation.showAllOnClick) {
            this.selectIndex = 0;
            this.filterAutoComplete(dataIndex, true);
            this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
            if (this.aNgScrollBar.toArray()[dataIndex]) {
                this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    processFocus(event, action, dataIndex) {
        if (!this.fieldCreation.showButton || (this.fieldCreation.showButton && action === 'clickBtn')) {
            if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && !this.getDisable() && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == undefined || this.option.enableRowIndex[this.rowIndex] == true)))) {
                this.selectIndex = 0;
                this.filterAutoComplete(dataIndex);
                this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            if (this.aNgScrollBar.toArray()[dataIndex]) {
                this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
            }
        }
    }
    hideList(dataIndex) {
        if (this.setOnList[dataIndex] == false) {
            this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
        }
    }
    setOverList(dataIndex) {
        this.setOnList[dataIndex] = true;
    }
    setOutList(dataIndex) {
        this.setOnList[dataIndex] = false;
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (!this.fieldCreation.showButton && event.which !== 38 && event.which !== 40) {
            this.allowTempData = true;
            if (this.checkReadonly()) {
                if (this.fieldCreation.valueList.length > 0 || this.fieldCreation.showAllOnClick == true) {
                    if (typeof (this.data[this.fieldCreation.fieldName][dataIndex]) == 'undefined' || typeof (this.data[this.fieldCreation.fieldName][dataIndex].display) == 'undefined') {
                        this.data[this.fieldCreation.fieldName][dataIndex] = {
                            display: '',
                            value: ''
                        };
                    }
                    if (this.displayAutoComplete[dataIndex] != 'autoCompleteShow') {
                        this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
                    }
                    let force = false;
                    if (this.fieldCreation.showAllOnClick == true) {
                        force = true;
                    }
                    this.filterAutoComplete(dataIndex, force);
                }
                if (event.which == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != 'undefined') {
                    this.assignByEnter = true;
                    this.hideList(dataIndex);
                }
                else if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                    let regexpValue = this.fieldCreation.valuePattern;
                    if (typeof (this.fieldCreation.valuePattern) == "string") {
                        regexpValue = new RegExp(this.fieldCreation.valuePattern);
                    }
                    if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)) {
                        return true;
                    }
                    else {
                        this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                        return false;
                    }
                }
                if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                    for (let valueListRow of this.fieldCreation.valueList) {
                        if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueListRow.display) {
                            this.data[this.fieldCreation.fieldName][dataIndex].value = valueListRow.value;
                            break;
                        }
                        else {
                            this.data[this.fieldCreation.fieldName][dataIndex].value = '';
                        }
                    }
                }
            }
            let timerSb = timer(100)
                .subscribe(() => {
                if (this.aNgScrollBar.toArray()[dataIndex]) {
                    this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
                    timerSb.unsubscribe();
                }
            });
        }
    }
    processKeyDown(event, action, dataIndex) {
        if (this.fieldCreation.showButton) {
            this.hideList(dataIndex);
        }
        if (this.allowTempData == true) {
            this.tempValueValidate = this.data[this.fieldCreation.fieldName][dataIndex].display;
        }
        if (event.which == 38 && this.selectIndex > 0) {
            this.selectIndex--;
        }
        else if (event.which == 40 && this.selectIndex < (this.autoCompleteFilterList[dataIndex].length - 1)) {
            this.selectIndex++;
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    processCall(data) {
        if (this.checkReadonly()) {
            if (data.process == 'processList') {
                let dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
                if (this.fieldCreation.valueList.length > 0) {
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                        let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
                        for (let i of this.fieldCreation.valueList) {
                            if (String(i.display).match(pattern)) {
                                if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                                    this.autoCompleteFilterList[dataIndex].push(i);
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                }
                this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
            }
            else if (data.process == 'clearFilter') {
                let dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
            }
        }
    }
    checkReadonly() {
        return (this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)));
    }
    assignData(event, dataIndex, data) {
        this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, data);
        this.tempValue[dataIndex] = Object.assign({}, data);
        this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
        this.setOnList[dataIndex] = false;
        this.callBack.emit({
            event: event,
            action: 'assignData',
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            assignData: data
        });
    }
    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.which == 32 || event.which > 46) {
            let key = event.key;
            let regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (!String(key).match(regexpInput)) {
                return false;
            }
        }
        if (event.which == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != 'undefined') {
            this.assignByEnter = true;
            this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
            let data = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
            this.selectIndex = 0;
            this.callBack.emit({
                event: event,
                action: 'assignData',
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                assignData: data
            });
        }
        if (event.which != 46 && event.which != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            let combineValue;
            if (typeof (this.tempValueValidate) != 'undefined') {
                combineValue = this.tempValueValidate + key;
            }
            else {
                combineValue = key;
            }
            let regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (String(key).match(regexpInput)) {
                return true;
            }
            return false;
        }
        return true;
    }
    processBlur(event, action, dataIndex) {
        let validate = true;
        let regexpValue = this.fieldCreation.valuePattern;
        if (typeof (this.fieldCreation.valuePattern) == "string") {
            regexpValue = new RegExp(this.fieldCreation.valuePattern);
        }
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)
            && this.getDisable() == false) {
            let inputField = event.currentTarget;
            inputField && inputField.focus();
            validate = false;
        }
        if (typeof (this.fieldCreation.fixedValue) != 'undefined' && this.fieldCreation.fixedValue == true && this.btnHover == false) {
            if (this.data[this.fieldCreation.fieldName][dataIndex] && this.tempValue[dataIndex] && this.data[this.fieldCreation.fieldName][dataIndex].display != this.tempValue[dataIndex].display) {
                for (let valueList of this.fieldCreation.valueList) {
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueList.display) {
                        this.tempValue[dataIndex] = Object.assign({}, valueList);
                        break;
                    }
                }
            }
            this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.tempValue[dataIndex]);
        }
        if (this.btnHover) {
            let timerSb = timer(100).subscribe(() => {
                event.target.focus();
                timerSb.unsubscribe();
            });
        }
        if (!this.fieldCreation.fixedValue && this.btnHover == false && !this.assignByEnter) {
            this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display;
        }
        this.hideList(dataIndex);
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    mouseOverChangeIndex(filterIndex) {
        // console.log(this.aNgScrollBar);
        this.selectIndex = filterIndex;
    }
    filterAutoComplete(dataIndex, force = false) {
        this.assignByEnter = false;
        this.refineValueList();
        if (((this.data[this.fieldCreation.fieldName][dataIndex].display
            && (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0 || this.fieldCreation.showAllOnClick)
            && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display)
            || this.fieldCreation.showAllData)
            && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display || force) {
            let resetSelectIndex = false;
            if (this.data[this.fieldCreation.fieldName][dataIndex].display.length == 0 && this.fieldCreation.showAllOnClick) {
                this.autoCompleteFilterList[dataIndex] = [];
                this.autoCompleteFilterList[dataIndex] = Object.assign(this.fieldCreation.valueList);
                resetSelectIndex = true;
            }
            else {
                this.autoCompleteFilterList[dataIndex] = [];
                // let filterList = this.autoCompleteFilterList[dataIndex];
                this.tempFilter[dataIndex] = this.data[this.fieldCreation.fieldName][dataIndex].display;
                // let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
                let pattern = this.data[this.fieldCreation.fieldName][dataIndex].display;
                for (let i of this.fieldCreation.valueList) {
                    // if (String(i.display).match(pattern) > -1) {
                    if (String(i.display).indexOf(pattern) > -1) {
                        if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                            this.autoCompleteFilterList[dataIndex].push(i);
                            resetSelectIndex = true;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            if (resetSelectIndex == true) {
                this.selectIndex = 0;
            }
        }
    }
    refineValueList() {
        let newValueList = [];
        for (let listIndex in this.fieldCreation.valueList) {
            if (this.fieldCreation.disableRefined == undefined || this.fieldCreation.disableRefined == false) {
                if (this.fieldCreation.valueList[listIndex].display != '' && this.fieldCreation.valueList[listIndex].value != '') {
                    newValueList.push({
                        display: this.fieldCreation.valueList[listIndex].display,
                        value: this.fieldCreation.valueList[listIndex].value
                    });
                }
                if (this.fieldCreation.valueList[listIndex].display == '' && this.fieldCreation.valueList[listIndex].value != '') {
                    newValueList.push({
                        display: this.fieldCreation.valueList[listIndex].value,
                        value: this.fieldCreation.valueList[listIndex].value
                    });
                }
                if (this.fieldCreation.valueList[listIndex].value == '' && this.fieldCreation.valueList[listIndex].display != '') {
                    newValueList.push({
                        display: this.fieldCreation.valueList[listIndex].display,
                        value: this.fieldCreation.valueList[listIndex].display
                    });
                }
            }
            else {
                newValueList.push({
                    display: this.fieldCreation.valueList[listIndex].display,
                    value: this.fieldCreation.valueList[listIndex].value
                });
            }
        }
        this.fieldCreation.valueList = newValueList;
    }
    checkDefault() {
        let check = true;
        if (Array.isArray(this.fieldCreation.default)) {
            for (let dataRow of this.fieldCreation.default) {
                if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
                    check = false;
                }
            }
        }
        else {
            let dataRow = Object.assign({}, this.fieldCreation.default);
            if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
                check = false;
            }
        }
        return check;
    }
    setBtnHover(status) {
        this.btnHover = status;
    }
};
AutoCompleteComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AutoCompleteComponent.prototype, "panelCallBack", void 0);
__decorate([
    ViewChildren(NgScrollbar),
    __metadata("design:type", QueryList)
], AutoCompleteComponent.prototype, "aNgScrollBar", void 0);
AutoCompleteComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n        [fieldCreation]=\"fieldCreation\"\r\n        [option]=\"option\"\r\n        [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && (!data[fieldCreation.fieldName][dataIndex].value || data[fieldCreation.fieldName][dataIndex].value == '') ? 'require' : ''}}\">\r\n                <input type=\"textbox\" class=\"{{fieldCreation.showButton ? 'autoCompleteWidth':'fullWidth'}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\" [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                       [autocomplete]=\"'off'\"\r\n                       [readonly]=\"getDisable()\"\r\n                       (focus)=\"processFocus($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processClick($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"{{fieldCreation.showButton ? 'deleteBtnWithAutoComplete': 'deleteBtn'}}\" (click)=\"deleteMultiVal(dataIndex)\"><span\r\n                        class=\"glyphicon glyphicon-minus\"></span></div>\r\n                <div *ngIf=\"autoCompleteFilterList[dataIndex].length > 0\"\r\n                     class=\"autoCompleteList {{displayAutoComplete[dataIndex]}}\"\r\n                     (mouseenter)=\"setOverList(dataIndex)\"\r\n                     (mouseleave)=\"setOutList(dataIndex)\">\r\n                    <ng-scrollbar #a_ngScrollbar class=\"autoCompleteScrollBox\">\r\n                        <div class=\"autoCompleteListBox {{fixScrollBar ? 'fix-ng-scrollbar' : ''}}\">\r\n                            <div *ngFor=\"let filterIndex of objKeys(autoCompleteFilterList[dataIndex])\" class=\"autoCompleteData  {{(selectIndex == filterIndex ? 'selectedIndex' : '')}}\"\r\n                                 (mouseenter)=\"mouseOverChangeIndex(filterIndex)\"\r\n                                 (click)=\"assignData($event,dataIndex,autoCompleteFilterList[dataIndex][filterIndex])\">\r\n                                {{autoCompleteFilterList[dataIndex][filterIndex].display}}\r\n                            </div>\r\n                        </div>\r\n                    </ng-scrollbar>\r\n                </div>\r\n                <div *ngIf=\"fieldCreation.showButton\" class=\"autoCompleteButtonPanel{{getDisable() ? ' disable': ' enable'}}\"\r\n                    (click)=\"!getDisable() ? processFocus($event, 'clickBtn', dataIndex) : null\"\r\n                    (mouseenter)=\"setBtnHover(true)\"\r\n                    (mouseleave)=\"setBtnHover(false)\">\r\n                    <span class=\"glyphicon glyphicon-search\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], AutoCompleteComponent);
export { AutoCompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2F1dG8tY29tcGxldGUvYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFhLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEUsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSx3QkFBd0I7SUEwQmxFLFlBQVksZ0JBQW1DO1FBQzlDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBckJmLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3QyxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QiwyQkFBc0IsR0FBRyxFQUFFLENBQUM7UUFDNUIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLGVB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WTtBQUNYO0lBQVIsS0FBSyxFQUFFOzt1REFBVTtBQUNSO0lBQVQsTUFBTSxFQUFFOzt1REFBK0I7QUFDOUI7SUFBVCxNQUFNLEVBQUU7OzREQUFvQztBQUNsQjtJQUExQixZQUFZLENBQUMsV0FBVyxDQUFDOzhCQUFlLFNBQVM7MkRBQWM7QUFScEQscUJBQXFCO0lBSGpDLFNBQVMsQ0FBQztRQUNWLHV4SUFBNkM7S0FDN0MsQ0FBQztxQ0EyQjhCLGdCQUFnQjtHQTFCbkMscUJBQXFCLENBOGRqQztTQTlkWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TmdTY3JvbGxiYXJ9IGZyb20gJ25neC1zY3JvbGxiYXInO1xyXG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtEeW5hbWljSW5wdXRDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQuY29tcG9uZW50JztcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlVXJsOiAnLi9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcblx0QElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBWaWV3Q2hpbGRyZW4oTmdTY3JvbGxiYXIpIGFOZ1Njcm9sbEJhcjogUXVlcnlMaXN0PE5nU2Nyb2xsYmFyPjtcclxuXHRjb2x1bW5DYWxjdWxhdGUgPSAnJztcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0YXV0b0NvbXBsZXRlRmlsdGVyTGlzdCA9IFtdO1xyXG5cdGRpc3BsYXlBdXRvQ29tcGxldGUgPSBbXTtcclxuXHRzZXRPbkxpc3QgPSBbXTtcclxuXHRtYXhTaG93RGF0YSA9IDIwO1xyXG5cdHNlbGVjdEluZGV4ID0gMDtcclxuXHR0ZW1wVmFsdWUgPSBbXTtcclxuXHR0ZW1wVmFsdWVWYWxpZGF0ZSA9IHt9O1xyXG5cdHRlbXBGaWx0ZXIgPSBbXTtcclxuXHRzY3JvbGxiYXJPcHRpb25zID0ge2F4aXM6ICd5JywgdGhlbWU6ICdtaW5pbWFsLWRhcmsnfTtcclxuXHRkaXNwbGF5SW5kZXggPSBbXTtcclxuXHRhbGxvd1RlbXBEYXRhOiBib29sZWFuO1xyXG5cdGZpeFNjcm9sbEJhcjogYm9vbGVhbjtcclxuXHRidG5Ib3ZlciA9IGZhbHNlO1xyXG5cdGFzc2lnbkJ5RW50ZXIgPSBmYWxzZTtcclxuXHRcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cdFxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDEnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDInO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDMnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDQnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gJ2FkZCcpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiAodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSxbe1xyXG5cdFx0XHRcdFx0ZGlzcGxheTogJycsXHJcblx0XHRcdFx0XHR2YWx1ZTogJydcclxuXHRcdFx0XHR9XSk7XHJcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpICYmIHRoaXMuY2hlY2tEZWZhdWx0KCkpIHtcclxuXHRcdFx0XHRcdGxldCBuZXdEZWZhdWx0ID0gW107XHJcblx0XHRcdFx0XHRmb3IgKGxldCBkZWZhdWx0RGF0YVJvdyBvZiB0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkge1xyXG5cdFx0XHRcdFx0XHRuZXdEZWZhdWx0LnB1c2goT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdERhdGFSb3cpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IG5ld0RlZmF1bHQ7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgKHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSA9PSAnb2JqZWN0JyAmJiB0aGlzLmNoZWNrRGVmYXVsdCgpKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSxbe1xyXG5cdFx0XHRcdFx0ZGlzcGxheTogJycsXHJcblx0XHRcdFx0XHR2YWx1ZTogJydcclxuXHRcdFx0XHR9XSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgKHRoaXMuZmllbGRDcmVhdGlvbi5tYXhTaG93RGF0YSkgIT0gJ3VuZGVmaW5lZCcgJiYgcGFyc2VJbnQodGhpcy5maWVsZENyZWF0aW9uLm1heFNob3dEYXRhKSA+IDApIHtcclxuXHRcdFx0dGhpcy5tYXhTaG93RGF0YSA9IHBhcnNlSW50KHRoaXMuZmllbGRDcmVhdGlvbi5tYXhTaG93RGF0YSk7XHJcblx0XHR9XHJcblx0XHRmb3IgKGxldCBkYXRhSW5kZXggaW4gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSB7XHJcblx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdID0gW107XHJcblx0XHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZUhpZGUnO1xyXG5cdFx0XHR0aGlzLnNldE9uTGlzdFtkYXRhSW5kZXhdID0gZmFsc2U7XHJcblx0XHRcdHRoaXMudGVtcFZhbHVlW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSk7XHJcblx0XHR9XHJcblx0XHQvLyBmb3IgKGxldCBkYXRhSW5kZXggaW4gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSB7XHJcblx0XHQvLyBcdHRoaXMudGVtcFZhbHVlW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKTtcclxuXHRcdC8vIH1cclxuXHR9XHJcblx0Z2V0RGF0YUZyb21WYWx1ZSh2YWx1ZSkge1xyXG5cdFx0Zm9yIChsZXQgaSBvZiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdGlmIChpLnZhbHVlID09PSB2YWx1ZSkge1xyXG5cdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0YWRkTXVsdGlWYWwoKSB7XHJcblx0XHRsZXQgZGF0YUxhc3RJbmRleCA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5sZW5ndGg7XHJcblx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUxhc3RJbmRleF0gPSBbXTtcclxuXHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhTGFzdEluZGV4XSA9ICdhdXRvQ29tcGxldGVIaWRlJztcclxuXHRcdHRoaXMuc2V0T25MaXN0W2RhdGFMYXN0SW5kZXhdID0gZmFsc2U7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ucHVzaCh7XHJcblx0XHRcdGRpc3BsYXk6ICcnLFxyXG5cdFx0XHR2YWx1ZTogJydcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRkZWxldGVNdWx0aVZhbChkYXRhSW5kZXgpIHtcclxuXHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ubGVuZ3RoID4gMSkge1xyXG5cdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc3BsaWNlKGRhdGFJbmRleCwgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NDbGljayhldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0FsbE9uQ2xpY2spIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RJbmRleCA9IDA7XHJcblx0XHRcdHRoaXMuZmlsdGVyQXV0b0NvbXBsZXRlKGRhdGFJbmRleCwgdHJ1ZSlcclxuXHRcdFx0dGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gPSAnYXV0b0NvbXBsZXRlU2hvdyc7XHJcblx0XHRcdGlmICh0aGlzLmFOZ1Njcm9sbEJhci50b0FycmF5KClbZGF0YUluZGV4XSkge1xyXG5cdFx0XHRcdHRoaXMuZml4U2Nyb2xsQmFyID0gdGhpcy5hTmdTY3JvbGxCYXIudG9BcnJheSgpW2RhdGFJbmRleF0uc3RhdGUuaXNWZXJ0aWNhbGx5U2Nyb2xsYWJsZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzRm9jdXMoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHRpZiAoIXRoaXMuZmllbGRDcmVhdGlvbi5zaG93QnV0dG9uIHx8ICh0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0J1dHRvbiAmJiBhY3Rpb24gPT09ICdjbGlja0J0bicpKSB7XHJcblx0XHRcdGlmICgodGhpcy5maWVsZENyZWF0aW9uLnJlYWRvbmx5ID09IHVuZGVmaW5lZCB8fCAodGhpcy5maWVsZENyZWF0aW9uLnJlYWRvbmx5ID09IGZhbHNlKSkgJiYgdGhpcy5vcHRpb24ubW9kZSAhPSAndmlldycgJiYgIXRoaXMuZ2V0RGlzYWJsZSgpICYmICh0aGlzLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9PSB1bmRlZmluZWQgfHwgKCh0aGlzLm9wdGlvbi5lbmFibGVSb3dJbmRleFt0aGlzLnJvd0luZGV4XSA9PSB1bmRlZmluZWQgfHwgdGhpcy5vcHRpb24uZW5hYmxlUm93SW5kZXhbdGhpcy5yb3dJbmRleF0gPT0gdHJ1ZSkpKSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0SW5kZXggPSAwO1xyXG5cdFx0XHRcdHRoaXMuZmlsdGVyQXV0b0NvbXBsZXRlKGRhdGFJbmRleCk7XHJcblx0XHRcdFx0dGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gPSAnYXV0b0NvbXBsZXRlU2hvdyc7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKHRoaXMuYU5nU2Nyb2xsQmFyLnRvQXJyYXkoKVtkYXRhSW5kZXhdKSB7XHJcblx0XHRcdFx0dGhpcy5maXhTY3JvbGxCYXIgPSB0aGlzLmFOZ1Njcm9sbEJhci50b0FycmF5KClbZGF0YUluZGV4XS5zdGF0ZS5pc1ZlcnRpY2FsbHlTY3JvbGxhYmxlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGhpZGVMaXN0KGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMuc2V0T25MaXN0W2RhdGFJbmRleF0gPT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gPSAnYXV0b0NvbXBsZXRlSGlkZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHNldE92ZXJMaXN0KGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy5zZXRPbkxpc3RbZGF0YUluZGV4XSA9IHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdHNldE91dExpc3QoZGF0YUluZGV4KSB7XHJcblx0XHR0aGlzLnNldE9uTGlzdFtkYXRhSW5kZXhdID0gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NLZXlVcChldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoIXRoaXMuZmllbGRDcmVhdGlvbi5zaG93QnV0dG9uICYmIGV2ZW50LndoaWNoICE9PSAzOCAmJiBldmVudC53aGljaCAhPT0gNDApIHtcclxuXHRcdFx0dGhpcy5hbGxvd1RlbXBEYXRhID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRoaXMuY2hlY2tSZWFkb25seSgpKSB7XHJcblx0XHRcdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QubGVuZ3RoID4gMCB8fCB0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0FsbE9uQ2xpY2sgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0pID09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheSkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB7XHJcblx0XHRcdFx0XHRcdFx0ZGlzcGxheTogJycsXHJcblx0XHRcdFx0XHRcdFx0dmFsdWU6ICcnXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICh0aGlzLmRpc3BsYXlBdXRvQ29tcGxldGVbZGF0YUluZGV4XSAhPSAnYXV0b0NvbXBsZXRlU2hvdycpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gPSAnYXV0b0NvbXBsZXRlU2hvdyc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgZm9yY2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0FsbE9uQ2xpY2sgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0XHRmb3JjZSA9IHRydWVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuZmlsdGVyQXV0b0NvbXBsZXRlKGRhdGFJbmRleCwgZm9yY2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoZXZlbnQud2hpY2ggPT0gMTMgJiYgdHlwZW9mICh0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XVt0aGlzLnNlbGVjdEluZGV4XSkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdHRoaXMuYXNzaWduQnlFbnRlciA9IHRydWU7XHJcblx0XHRcdFx0XHR0aGlzLmhpZGVMaXN0KGRhdGFJbmRleCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChldmVudC5jdHJsS2V5ID09IHRydWUgJiYgKGV2ZW50LmNoYXJDb2RlID09IDg2IHx8IGV2ZW50LndoaWNoID09IDg2KSkge1xyXG5cdFx0XHRcdFx0bGV0IHJlZ2V4cFZhbHVlID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVyblxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0XHRcdHJlZ2V4cFZhbHVlID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChTdHJpbmcodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0pLm1hdGNoKHJlZ2V4cFZhbHVlKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0gdGhpcy50ZW1wVmFsdWU7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgdmFsdWVMaXN0Um93IG9mIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkgPT0gdmFsdWVMaXN0Um93LmRpc3BsYXkpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS52YWx1ZSA9IHZhbHVlTGlzdFJvdy52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGxldCB0aW1lclNiID0gdGltZXIoMTAwKVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuYU5nU2Nyb2xsQmFyLnRvQXJyYXkoKVtkYXRhSW5kZXhdKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZml4U2Nyb2xsQmFyID0gdGhpcy5hTmdTY3JvbGxCYXIudG9BcnJheSgpW2RhdGFJbmRleF0uc3RhdGUuaXNWZXJ0aWNhbGx5U2Nyb2xsYWJsZTtcclxuXHRcdFx0XHRcdFx0dGltZXJTYi51bnN1YnNjcmliZSgpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0tleURvd24oZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnNob3dCdXR0b24pIHtcclxuXHRcdFx0dGhpcy5oaWRlTGlzdChkYXRhSW5kZXgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuYWxsb3dUZW1wRGF0YSA9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMudGVtcFZhbHVlVmFsaWRhdGUgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5O1xyXG5cdFx0fVxyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09IDM4ICYmIHRoaXMuc2VsZWN0SW5kZXggPiAwKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0SW5kZXgtLTtcclxuXHRcdH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT0gNDAgJiYgdGhpcy5zZWxlY3RJbmRleCA8ICh0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XS5sZW5ndGggLSAxKSkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdEluZGV4Kys7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblx0XHRpZiAodGhpcy5jaGVja1JlYWRvbmx5KCkpIHtcclxuXHRcdFx0aWYgKGRhdGEucHJvY2VzcyA9PSAncHJvY2Vzc0xpc3QnKSB7XHJcblx0XHRcdFx0bGV0IGRhdGFJbmRleCA9IGRhdGEucGFyYW0uZGF0YUluZGV4O1xyXG5cdFx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdID0gW107XHJcblx0XHRcdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHRsZXQgcGF0dGVybiA9IG5ldyBSZWdFeHAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheSwgJ2dpJyk7XHJcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgb2YgdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG5cdFx0XHRcdFx0XHRcdGlmIChTdHJpbmcoaS5kaXNwbGF5KS5tYXRjaChwYXR0ZXJuKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdLmxlbmd0aCA8IHRoaXMubWF4U2hvd0RhdGEgfHwgdGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxEYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdLnB1c2goaSk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gPSAnYXV0b0NvbXBsZXRlU2hvdyc7XHJcblx0XHRcdH0gZWxzZSBpZiAoZGF0YS5wcm9jZXNzID09ICdjbGVhckZpbHRlcicpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUluZGV4ID0gZGF0YS5wYXJhbS5kYXRhSW5kZXg7XHJcblx0XHRcdFx0dGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF0gPSBbXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRjaGVja1JlYWRvbmx5KCkge1xyXG5cdFx0cmV0dXJuICh0aGlzLmZpZWxkQ3JlYXRpb24ucmVhZG9ubHkgPT0gdW5kZWZpbmVkIHx8ICh0aGlzLmZpZWxkQ3JlYXRpb24ucmVhZG9ubHkgPT0gZmFsc2UpKSAmJiB0aGlzLm9wdGlvbi5tb2RlICE9ICd2aWV3JyAmJiAodGhpcy5vcHRpb24uZW5hYmxlUm93SW5kZXggPT0gdW5kZWZpbmVkIHx8ICgodGhpcy5vcHRpb24uZW5hYmxlUm93SW5kZXhbdGhpcy5yb3dJbmRleF0gPT0gdHJ1ZSB8fCB0aGlzLm9wdGlvbi5lbmFibGVSb3dJbmRleFt0aGlzLnJvd0luZGV4XSA9PSB1bmRlZmluZWQpKSlcclxuXHR9XHJcblx0YXNzaWduRGF0YShldmVudCwgZGF0YUluZGV4LCBkYXRhKSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xyXG5cdFx0dGhpcy50ZW1wVmFsdWVbZGF0YUluZGV4XSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xyXG5cdFx0dGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gPSAnYXV0b0NvbXBsZXRlSGlkZSc7XHJcblx0XHR0aGlzLnNldE9uTGlzdFtkYXRhSW5kZXhdID0gZmFsc2U7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogJ2Fzc2lnbkRhdGEnLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHRhc3NpZ25EYXRhOiBkYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0NhbGxCYWNrS2V5UHJlc3MoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKGV2ZW50LndoaWNoID09IDMyIHx8IGV2ZW50LndoaWNoID4gNDYpIHtcclxuXHRcdFx0bGV0IGtleSA9IGV2ZW50LmtleTtcclxuXHRcdFx0bGV0IHJlZ2V4cElucHV0ID0gdGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVyblxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZWdleHBJbnB1dCA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFTdHJpbmcoa2V5KS5tYXRjaChyZWdleHBJbnB1dCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChldmVudC53aGljaCA9PSAxMyAmJiB0eXBlb2YgKHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdW3RoaXMuc2VsZWN0SW5kZXhdKSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmFzc2lnbkJ5RW50ZXIgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdW3RoaXMuc2VsZWN0SW5kZXhdKTtcclxuXHRcdFx0bGV0IGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XVt0aGlzLnNlbGVjdEluZGV4XSlcclxuXHRcdFx0dGhpcy5zZWxlY3RJbmRleCA9IDA7XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRcdGFjdGlvbjogJ2Fzc2lnbkRhdGEnLFxyXG5cdFx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0XHRhc3NpZ25EYXRhOiBkYXRhXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiAoZXZlbnQud2hpY2ggIT0gNDYgJiYgZXZlbnQud2hpY2ggIT0gOCAmJiBldmVudC5jdHJsS2V5ICE9IHRydWUgJiYgZXZlbnQuYWx0S2V5ICE9IHRydWUpIHtcclxuXHRcdFx0bGV0IGtleSA9IGV2ZW50LmtleTtcclxuXHRcdFx0bGV0IGNvbWJpbmVWYWx1ZTtcclxuXHRcdFx0aWYgKHR5cGVvZiAodGhpcy50ZW1wVmFsdWVWYWxpZGF0ZSkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRjb21iaW5lVmFsdWUgPSB0aGlzLnRlbXBWYWx1ZVZhbGlkYXRlICsga2V5O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbWJpbmVWYWx1ZSA9IGtleTtcclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgcmVnZXhwSW5wdXQgPSB0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybikgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHJlZ2V4cElucHV0ID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoU3RyaW5nKGtleSkubWF0Y2gocmVnZXhwSW5wdXQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NCbHVyKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0bGV0IHZhbGlkYXRlID0gdHJ1ZTtcclxuXHRcdGxldCByZWdleHBWYWx1ZSA9IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm5cclxuXHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRyZWdleHBWYWx1ZSA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybik7XHJcblx0XHR9XHJcblx0XHRpZiAoIVN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5KS5tYXRjaChyZWdleHBWYWx1ZSlcclxuXHRcdFx0JiYgdGhpcy5nZXREaXNhYmxlKCkgPT0gZmFsc2UpIHtcclxuXHRcdFx0bGV0IGlucHV0RmllbGQ6IEhUTUxFbGVtZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuXHRcdFx0aW5wdXRGaWVsZCAmJiBpbnB1dEZpZWxkLmZvY3VzKCk7XHJcblx0XHRcdHZhbGlkYXRlID0gZmFsc2VcclxuXHRcdH1cclxuXHRcdGlmICh0eXBlb2YgKHRoaXMuZmllbGRDcmVhdGlvbi5maXhlZFZhbHVlKSAhPSAndW5kZWZpbmVkJyAmJiB0aGlzLmZpZWxkQ3JlYXRpb24uZml4ZWRWYWx1ZSA9PSB0cnVlICYmIHRoaXMuYnRuSG92ZXIgPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdICYmIHRoaXMudGVtcFZhbHVlW2RhdGFJbmRleF0gJiYgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheSAhPSB0aGlzLnRlbXBWYWx1ZVtkYXRhSW5kZXhdLmRpc3BsYXkpIHtcclxuXHRcdFx0XHRmb3IgKGxldCB2YWx1ZUxpc3Qgb2YgdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkgPT0gdmFsdWVMaXN0LmRpc3BsYXkpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy50ZW1wVmFsdWVbZGF0YUluZGV4XSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlTGlzdCk7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudGVtcFZhbHVlW2RhdGFJbmRleF0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuYnRuSG92ZXIpIHtcclxuXHRcdFx0bGV0IHRpbWVyU2IgPSB0aW1lcigxMDApLnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0ZXZlbnQudGFyZ2V0LmZvY3VzKCk7XHJcblx0XHRcdFx0dGltZXJTYi51bnN1YnNjcmliZSgpO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0aWYgKCF0aGlzLmZpZWxkQ3JlYXRpb24uZml4ZWRWYWx1ZSAmJiB0aGlzLmJ0bkhvdmVyID09IGZhbHNlICYmICF0aGlzLmFzc2lnbkJ5RW50ZXIpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0udmFsdWUgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5XHJcblx0XHR9XHJcblx0XHR0aGlzLmhpZGVMaXN0KGRhdGFJbmRleCk7XHJcblx0XHRcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHR2YWxpZGF0ZVN0YXR1czogdmFsaWRhdGUsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0bW91c2VPdmVyQ2hhbmdlSW5kZXgoZmlsdGVySW5kZXgpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuYU5nU2Nyb2xsQmFyKTtcclxuXHRcdFxyXG5cdFx0XHJcblx0XHR0aGlzLnNlbGVjdEluZGV4ID0gZmlsdGVySW5kZXg7XHJcblx0fVxyXG5cdFxyXG5cdGZpbHRlckF1dG9Db21wbGV0ZShkYXRhSW5kZXgsIGZvcmNlPWZhbHNlKSB7XHJcblx0XHR0aGlzLmFzc2lnbkJ5RW50ZXIgPSBmYWxzZTtcclxuXHRcdHRoaXMucmVmaW5lVmFsdWVMaXN0KCk7XHJcblx0XHRpZiAoKCh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5XHJcblx0XHRcdCYmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5Lmxlbmd0aCA+IDAgfHwgdGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxPbkNsaWNrKVxyXG5cdFx0XHQmJiB0aGlzLnRlbXBGaWx0ZXJbZGF0YUluZGV4XSAhPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5KVxyXG5cdFx0XHR8fCB0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0FsbERhdGEpXHJcblx0XHRcdCYmIHRoaXMudGVtcEZpbHRlcltkYXRhSW5kZXhdICE9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkgfHwgZm9yY2VcclxuXHRcdCkge1xyXG5cdFx0XHRsZXQgcmVzZXRTZWxlY3RJbmRleCA9IGZhbHNlO1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheS5sZW5ndGggPT0gMCAmJiB0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0FsbE9uQ2xpY2spIHtcclxuXHRcdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XSA9IFtdO1xyXG5cdFx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdID0gT2JqZWN0LmFzc2lnbih0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KVxyXG5cdFx0XHRcdHJlc2V0U2VsZWN0SW5kZXggPSB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdID0gW107XHJcblx0XHRcdFx0Ly8gbGV0IGZpbHRlckxpc3QgPSB0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XTtcclxuXHRcdFx0XHR0aGlzLnRlbXBGaWx0ZXJbZGF0YUluZGV4XSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXk7XHJcblx0XHRcdFx0Ly8gbGV0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXksICdnaScpO1xyXG5cdFx0XHRcdGxldCBwYXR0ZXJuID0gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheTtcclxuXHRcdFx0XHRmb3IgKGxldCBpIG9mIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuXHRcdFx0XHRcdC8vIGlmIChTdHJpbmcoaS5kaXNwbGF5KS5tYXRjaChwYXR0ZXJuKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRpZiAoU3RyaW5nKGkuZGlzcGxheSkuaW5kZXhPZihwYXR0ZXJuKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XS5sZW5ndGggPCB0aGlzLm1heFNob3dEYXRhIHx8IHRoaXMuZmllbGRDcmVhdGlvbi5zaG93QWxsRGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdLnB1c2goaSk7XHJcblx0XHRcdFx0XHRcdFx0cmVzZXRTZWxlY3RJbmRleCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHJlc2V0U2VsZWN0SW5kZXggPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0SW5kZXggPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHJlZmluZVZhbHVlTGlzdCgpIHtcclxuXHRcdGxldCBuZXdWYWx1ZUxpc3QgPSBbXTtcclxuXHRcdGZvciAobGV0IGxpc3RJbmRleCBpbiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uZGlzYWJsZVJlZmluZWQgPT0gdW5kZWZpbmVkIHx8IHRoaXMuZmllbGRDcmVhdGlvbi5kaXNhYmxlUmVmaW5lZCA9PSBmYWxzZSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0uZGlzcGxheSAhPSAnJyAmJiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0udmFsdWUgIT0gJycpIHtcclxuXHRcdFx0XHRcdG5ld1ZhbHVlTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLmRpc3BsYXksXHJcblx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0udmFsdWVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLmRpc3BsYXkgPT0gJycgJiYgdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLnZhbHVlICE9ICcnKSB7XHJcblx0XHRcdFx0XHRuZXdWYWx1ZUxpc3QucHVzaCh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS52YWx1ZSxcclxuXHRcdFx0XHRcdFx0dmFsdWU6IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS52YWx1ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0udmFsdWUgPT0gJycgJiYgdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLmRpc3BsYXkgIT0gJycpIHtcclxuXHRcdFx0XHRcdG5ld1ZhbHVlTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRcdFx0ZGlzcGxheTogdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLmRpc3BsYXksXHJcblx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0uZGlzcGxheVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5ld1ZhbHVlTGlzdC5wdXNoKHtcclxuXHRcdFx0XHRcdGRpc3BsYXk6IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS5kaXNwbGF5LFxyXG5cdFx0XHRcdFx0dmFsdWU6IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS52YWx1ZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0ID0gbmV3VmFsdWVMaXN0O1xyXG5cdH1cclxuXHRcclxuXHRjaGVja0RlZmF1bHQoKSB7XHJcblx0XHRsZXQgY2hlY2sgPSB0cnVlO1xyXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpKSB7XHJcblx0XHRcdGZvciAobGV0IGRhdGFSb3cgb2YgdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIChkYXRhUm93LmRpc3BsYXkpID09ICd1bmRlZmluZWQnIHx8IGRhdGFSb3cudmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRcdGNoZWNrID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgZGF0YVJvdyA9IE9iamVjdC5hc3NpZ24oe30sdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG5cdFx0XHRpZiAodHlwZW9mIChkYXRhUm93LmRpc3BsYXkpID09ICd1bmRlZmluZWQnIHx8IGRhdGFSb3cudmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRjaGVjayA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2hlY2s7XHJcblx0fVxyXG5cdHNldEJ0bkhvdmVyKHN0YXR1cyl7XHJcblx0XHR0aGlzLmJ0bkhvdmVyID0gc3RhdHVzO1xyXG5cdH1cclxufVxyXG4iXX0=