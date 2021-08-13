import { __decorate, __extends, __metadata, __values } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { timer } from 'rxjs';
import { AnimationService } from '../../../service/animation.service';
var AutoCompleteComponent = /** @class */ (function (_super) {
    __extends(AutoCompleteComponent, _super);
    function AutoCompleteComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.columnCalculate = '';
        _this.objKeys = Object.keys;
        _this.autoCompleteFilterList = [];
        _this.displayAutoComplete = [];
        _this.setOnList = [];
        _this.maxShowData = 20;
        _this.selectIndex = 0;
        _this.tempValue = [];
        _this.tempValueValidate = {};
        _this.tempFilter = [];
        _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        _this.displayIndex = [];
        _this.btnHover = false;
        _this.assignByEnter = false;
        _this.animateProcess();
        return _this;
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
        var e_1, _a;
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
                    var newDefault = [];
                    try {
                        for (var _b = __values(this.fieldCreation.default), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var defaultDataRow = _c.value;
                            newDefault.push(Object.assign({}, defaultDataRow));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
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
        for (var dataIndex in this.data[this.fieldCreation.fieldName]) {
            this.autoCompleteFilterList[dataIndex] = [];
            this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
            this.setOnList[dataIndex] = false;
            this.tempValue[dataIndex] = Object.assign({}, this.data[this.fieldCreation.fieldName][dataIndex]);
        }
        // for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
        // 	this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
        // }
    };
    AutoCompleteComponent.prototype.getDataFromValue = function (value) {
        var e_2, _a;
        try {
            for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                var i = _c.value;
                if (i.value === value) {
                    return i;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    AutoCompleteComponent.prototype.addMultiVal = function () {
        var dataLastIndex = this.data[this.fieldCreation.fieldName].length;
        this.autoCompleteFilterList[dataLastIndex] = [];
        this.displayAutoComplete[dataLastIndex] = 'autoCompleteHide';
        this.setOnList[dataLastIndex] = false;
        this.data[this.fieldCreation.fieldName].push({
            display: '',
            value: ''
        });
    };
    AutoCompleteComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    AutoCompleteComponent.prototype.processClick = function (event, action, dataIndex) {
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
    };
    AutoCompleteComponent.prototype.processFocus = function (event, action, dataIndex) {
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
    };
    AutoCompleteComponent.prototype.hideList = function (dataIndex) {
        if (this.setOnList[dataIndex] == false) {
            this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
        }
    };
    AutoCompleteComponent.prototype.setOverList = function (dataIndex) {
        this.setOnList[dataIndex] = true;
    };
    AutoCompleteComponent.prototype.setOutList = function (dataIndex) {
        this.setOnList[dataIndex] = false;
    };
    AutoCompleteComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        var e_3, _a;
        var _this = this;
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
                    var force = false;
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
                    var regexpValue = this.fieldCreation.valuePattern;
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
                    try {
                        for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var valueListRow = _c.value;
                            if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueListRow.display) {
                                this.data[this.fieldCreation.fieldName][dataIndex].value = valueListRow.value;
                                break;
                            }
                            else {
                                this.data[this.fieldCreation.fieldName][dataIndex].value = '';
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            var timerSb_1 = timer(100)
                .subscribe(function () {
                if (_this.aNgScrollBar.toArray()[dataIndex]) {
                    _this.fixScrollBar = _this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
                    timerSb_1.unsubscribe();
                }
            });
        }
    };
    AutoCompleteComponent.prototype.processKeyDown = function (event, action, dataIndex) {
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
    };
    AutoCompleteComponent.prototype.processCall = function (data) {
        var e_4, _a;
        if (this.checkReadonly()) {
            if (data.process == 'processList') {
                var dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
                if (this.fieldCreation.valueList.length > 0) {
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                        var pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
                        try {
                            for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var i = _c.value;
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
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
            }
            else if (data.process == 'clearFilter') {
                var dataIndex = data.param.dataIndex;
                this.autoCompleteFilterList[dataIndex] = [];
            }
        }
    };
    AutoCompleteComponent.prototype.checkReadonly = function () {
        return (this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)));
    };
    AutoCompleteComponent.prototype.assignData = function (event, dataIndex, data) {
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
    };
    AutoCompleteComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.which == 32 || event.which > 46) {
            var key = event.key;
            var regexpInput = this.fieldCreation.inputPattern;
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
            var data = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
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
            var key = event.key;
            var combineValue = void 0;
            if (typeof (this.tempValueValidate) != 'undefined') {
                combineValue = this.tempValueValidate + key;
            }
            else {
                combineValue = key;
            }
            var regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (String(key).match(regexpInput)) {
                return true;
            }
            return false;
        }
        return true;
    };
    AutoCompleteComponent.prototype.processBlur = function (event, action, dataIndex) {
        var e_5, _a;
        var validate = true;
        var regexpValue = this.fieldCreation.valuePattern;
        if (typeof (this.fieldCreation.valuePattern) == "string") {
            regexpValue = new RegExp(this.fieldCreation.valuePattern);
        }
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)
            && this.getDisable() == false) {
            var inputField = event.currentTarget;
            inputField && inputField.focus();
            validate = false;
        }
        if (typeof (this.fieldCreation.fixedValue) != 'undefined' && this.fieldCreation.fixedValue == true && this.btnHover == false) {
            if (this.data[this.fieldCreation.fieldName][dataIndex] && this.tempValue[dataIndex] && this.data[this.fieldCreation.fieldName][dataIndex].display != this.tempValue[dataIndex].display) {
                try {
                    for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var valueList = _c.value;
                        if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueList.display) {
                            this.tempValue[dataIndex] = Object.assign({}, valueList);
                            break;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.tempValue[dataIndex]);
        }
        if (this.btnHover) {
            var timerSb_2 = timer(100).subscribe(function () {
                event.target.focus();
                timerSb_2.unsubscribe();
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
    };
    AutoCompleteComponent.prototype.mouseOverChangeIndex = function (filterIndex) {
        // console.log(this.aNgScrollBar);
        this.selectIndex = filterIndex;
    };
    AutoCompleteComponent.prototype.filterAutoComplete = function (dataIndex, force) {
        var e_6, _a;
        if (force === void 0) { force = false; }
        this.assignByEnter = false;
        this.refineValueList();
        if (((this.data[this.fieldCreation.fieldName][dataIndex].display
            && (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0 || this.fieldCreation.showAllOnClick)
            && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display)
            || this.fieldCreation.showAllData)
            && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display || force) {
            var resetSelectIndex = false;
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
                var pattern = this.data[this.fieldCreation.fieldName][dataIndex].display;
                try {
                    for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var i = _c.value;
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
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            if (resetSelectIndex == true) {
                this.selectIndex = 0;
            }
        }
    };
    AutoCompleteComponent.prototype.refineValueList = function () {
        var newValueList = [];
        for (var listIndex in this.fieldCreation.valueList) {
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
    };
    AutoCompleteComponent.prototype.checkDefault = function () {
        var e_7, _a;
        var check = true;
        if (Array.isArray(this.fieldCreation.default)) {
            try {
                for (var _b = __values(this.fieldCreation.default), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var dataRow = _c.value;
                    if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
                        check = false;
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        else {
            var dataRow = Object.assign({}, this.fieldCreation.default);
            if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
                check = false;
            }
        }
        return check;
    };
    AutoCompleteComponent.prototype.setBtnHover = function (status) {
        this.btnHover = status;
    };
    AutoCompleteComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
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
    return AutoCompleteComponent;
}(DynamicBehaviorComponent));
export { AutoCompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2F1dG8tY29tcGxldGUvYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFhLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBMkMseUNBQXdCO0lBMEJsRSwrQkFBWSxnQkFBbUM7UUFBL0MsWUFDQyxrQkFBTSxnQkFBZ0IsQ0FBQyxTQUV2QjtRQXZCUyxjQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixtQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0MscUJBQWUsR0FBRyxFQUFFLENBQUM7UUFDckIsYUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsNEJBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLHlCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUN6QixlQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsaUJBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsaUJBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsZUFBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLHVCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QixnQkFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixz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RyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxXQUFXLEVBQUU7Z0JBQzVFLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDZDtTQUNEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0QsMkNBQVcsR0FBWCxVQUFZLE1BQU07UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7Z0JBbmM4QixnQkFBZ0I7O0lBekJ0QztRQUFSLEtBQUssRUFBRTs7dURBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7eURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7Z0VBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7NkRBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTs7MkRBQVU7SUFDUjtRQUFULE1BQU0sRUFBRTs7MkRBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOztnRUFBb0M7SUFDbEI7UUFBMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQztrQ0FBZSxTQUFTOytEQUFjO0lBUnBELHFCQUFxQjtRQUhqQyxTQUFTLENBQUM7WUFDVix1eElBQTZDO1NBQzdDLENBQUM7eUNBMkI4QixnQkFBZ0I7T0ExQm5DLHFCQUFxQixDQThkakM7SUFBRCw0QkFBQztDQUFBLEFBOWRELENBQTJDLHdCQUF3QixHQThkbEU7U0E5ZFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gJy4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnQnO1xyXG5pbXBvcnQge05nU2Nyb2xsYmFyfSBmcm9tICduZ3gtc2Nyb2xsYmFyJztcclxuaW1wb3J0IHt0aW1lcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RHluYW1pY0lucHV0Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHR0ZW1wbGF0ZVVybDogJy4vYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZUNvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG5cdEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAVmlld0NoaWxkcmVuKE5nU2Nyb2xsYmFyKSBhTmdTY3JvbGxCYXI6IFF1ZXJ5TGlzdDxOZ1Njcm9sbGJhcj47XHJcblx0Y29sdW1uQ2FsY3VsYXRlID0gJyc7XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdGF1dG9Db21wbGV0ZUZpbHRlckxpc3QgPSBbXTtcclxuXHRkaXNwbGF5QXV0b0NvbXBsZXRlID0gW107XHJcblx0c2V0T25MaXN0ID0gW107XHJcblx0bWF4U2hvd0RhdGEgPSAyMDtcclxuXHRzZWxlY3RJbmRleCA9IDA7XHJcblx0dGVtcFZhbHVlID0gW107XHJcblx0dGVtcFZhbHVlVmFsaWRhdGUgPSB7fTtcclxuXHR0ZW1wRmlsdGVyID0gW107XHJcblx0c2Nyb2xsYmFyT3B0aW9ucyA9IHtheGlzOiAneScsIHRoZW1lOiAnbWluaW1hbC1kYXJrJ307XHJcblx0ZGlzcGxheUluZGV4ID0gW107XHJcblx0YWxsb3dUZW1wRGF0YTogYm9vbGVhbjtcclxuXHRmaXhTY3JvbGxCYXI6IGJvb2xlYW47XHJcblx0YnRuSG92ZXIgPSBmYWxzZTtcclxuXHRhc3NpZ25CeUVudGVyID0gZmFsc2U7XHJcblx0XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHRcclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wxJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wyJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wzJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2w0JztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSAnJztcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5tb2RlID09ICdhZGQnKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgKHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sW3tcclxuXHRcdFx0XHRcdGRpc3BsYXk6ICcnLFxyXG5cdFx0XHRcdFx0dmFsdWU6ICcnXHJcblx0XHRcdFx0fV0pO1xyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSAmJiB0aGlzLmNoZWNrRGVmYXVsdCgpKSB7XHJcblx0XHRcdFx0XHRsZXQgbmV3RGVmYXVsdCA9IFtdO1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgZGVmYXVsdERhdGFSb3cgb2YgdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpIHtcclxuXHRcdFx0XHRcdFx0bmV3RGVmYXVsdC5wdXNoKE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHREYXRhUm93KSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBuZXdEZWZhdWx0O1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mICh0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gJ29iamVjdCcgJiYgdGhpcy5jaGVja0RlZmF1bHQoKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW09iamVjdC5hc3NpZ24oe30sIHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sW3tcclxuXHRcdFx0XHRcdGRpc3BsYXk6ICcnLFxyXG5cdFx0XHRcdFx0dmFsdWU6ICcnXHJcblx0XHRcdFx0fV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodHlwZW9mICh0aGlzLmZpZWxkQ3JlYXRpb24ubWF4U2hvd0RhdGEpICE9ICd1bmRlZmluZWQnICYmIHBhcnNlSW50KHRoaXMuZmllbGRDcmVhdGlvbi5tYXhTaG93RGF0YSkgPiAwKSB7XHJcblx0XHRcdHRoaXMubWF4U2hvd0RhdGEgPSBwYXJzZUludCh0aGlzLmZpZWxkQ3JlYXRpb24ubWF4U2hvd0RhdGEpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgZGF0YUluZGV4IGluIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG5cdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XSA9IFtdO1xyXG5cdFx0XHR0aGlzLmRpc3BsYXlBdXRvQ29tcGxldGVbZGF0YUluZGV4XSA9ICdhdXRvQ29tcGxldGVIaWRlJztcclxuXHRcdFx0dGhpcy5zZXRPbkxpc3RbZGF0YUluZGV4XSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnRlbXBWYWx1ZVtkYXRhSW5kZXhdID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0pO1xyXG5cdFx0fVxyXG5cdFx0Ly8gZm9yIChsZXQgZGF0YUluZGV4IGluIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG5cdFx0Ly8gXHR0aGlzLnRlbXBWYWx1ZVtkYXRhSW5kZXhdID0gT2JqZWN0LmFzc2lnbih7fSx0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSk7XHJcblx0XHQvLyB9XHJcblx0fVxyXG5cdGdldERhdGFGcm9tVmFsdWUodmFsdWUpIHtcclxuXHRcdGZvciAobGV0IGkgb2YgdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG5cdFx0XHRpZiAoaS52YWx1ZSA9PT0gdmFsdWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cdGFkZE11bHRpVmFsKCkge1xyXG5cdFx0bGV0IGRhdGFMYXN0SW5kZXggPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ubGVuZ3RoO1xyXG5cdFx0dGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFMYXN0SW5kZXhdID0gW107XHJcblx0XHR0aGlzLmRpc3BsYXlBdXRvQ29tcGxldGVbZGF0YUxhc3RJbmRleF0gPSAnYXV0b0NvbXBsZXRlSGlkZSc7XHJcblx0XHR0aGlzLnNldE9uTGlzdFtkYXRhTGFzdEluZGV4XSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnB1c2goe1xyXG5cdFx0XHRkaXNwbGF5OiAnJyxcclxuXHRcdFx0dmFsdWU6ICcnXHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0ZGVsZXRlTXVsdGlWYWwoZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzQ2xpY2soZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxPbkNsaWNrKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0SW5kZXggPSAwO1xyXG5cdFx0XHR0aGlzLmZpbHRlckF1dG9Db21wbGV0ZShkYXRhSW5kZXgsIHRydWUpXHJcblx0XHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZVNob3cnO1xyXG5cdFx0XHRpZiAodGhpcy5hTmdTY3JvbGxCYXIudG9BcnJheSgpW2RhdGFJbmRleF0pIHtcclxuXHRcdFx0XHR0aGlzLmZpeFNjcm9sbEJhciA9IHRoaXMuYU5nU2Nyb2xsQmFyLnRvQXJyYXkoKVtkYXRhSW5kZXhdLnN0YXRlLmlzVmVydGljYWxseVNjcm9sbGFibGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0ZvY3VzKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKCF0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0J1dHRvbiB8fCAodGhpcy5maWVsZENyZWF0aW9uLnNob3dCdXR0b24gJiYgYWN0aW9uID09PSAnY2xpY2tCdG4nKSkge1xyXG5cdFx0XHRpZiAoKHRoaXMuZmllbGRDcmVhdGlvbi5yZWFkb25seSA9PSB1bmRlZmluZWQgfHwgKHRoaXMuZmllbGRDcmVhdGlvbi5yZWFkb25seSA9PSBmYWxzZSkpICYmIHRoaXMub3B0aW9uLm1vZGUgIT0gJ3ZpZXcnICYmICF0aGlzLmdldERpc2FibGUoKSAmJiAodGhpcy5vcHRpb24uZW5hYmxlUm93SW5kZXggPT0gdW5kZWZpbmVkIHx8ICgodGhpcy5vcHRpb24uZW5hYmxlUm93SW5kZXhbdGhpcy5yb3dJbmRleF0gPT0gdW5kZWZpbmVkIHx8IHRoaXMub3B0aW9uLmVuYWJsZVJvd0luZGV4W3RoaXMucm93SW5kZXhdID09IHRydWUpKSkpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdEluZGV4ID0gMDtcclxuXHRcdFx0XHR0aGlzLmZpbHRlckF1dG9Db21wbGV0ZShkYXRhSW5kZXgpO1xyXG5cdFx0XHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZVNob3cnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICh0aGlzLmFOZ1Njcm9sbEJhci50b0FycmF5KClbZGF0YUluZGV4XSkge1xyXG5cdFx0XHRcdHRoaXMuZml4U2Nyb2xsQmFyID0gdGhpcy5hTmdTY3JvbGxCYXIudG9BcnJheSgpW2RhdGFJbmRleF0uc3RhdGUuaXNWZXJ0aWNhbGx5U2Nyb2xsYWJsZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRoaWRlTGlzdChkYXRhSW5kZXgpIHtcclxuXHRcdGlmICh0aGlzLnNldE9uTGlzdFtkYXRhSW5kZXhdID09IGZhbHNlKSB7XHJcblx0XHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZUhpZGUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRzZXRPdmVyTGlzdChkYXRhSW5kZXgpIHtcclxuXHRcdHRoaXMuc2V0T25MaXN0W2RhdGFJbmRleF0gPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZXRPdXRMaXN0KGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy5zZXRPbkxpc3RbZGF0YUluZGV4XSA9IGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzS2V5VXAoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKCF0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0J1dHRvbiAmJiBldmVudC53aGljaCAhPT0gMzggJiYgZXZlbnQud2hpY2ggIT09IDQwKSB7XHJcblx0XHRcdHRoaXMuYWxsb3dUZW1wRGF0YSA9IHRydWU7XHJcblx0XHRcdGlmICh0aGlzLmNoZWNrUmVhZG9ubHkoKSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0Lmxlbmd0aCA+IDAgfHwgdGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxPbkNsaWNrID09IHRydWUpIHtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKSA9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkpID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0ge1xyXG5cdFx0XHRcdFx0XHRcdGRpc3BsYXk6ICcnLFxyXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiAnJ1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAodGhpcy5kaXNwbGF5QXV0b0NvbXBsZXRlW2RhdGFJbmRleF0gIT0gJ2F1dG9Db21wbGV0ZVNob3cnKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZVNob3cnO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IGZvcmNlID0gZmFsc2U7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxPbkNsaWNrID09IHRydWUpIHtcclxuXHRcdFx0XHRcdFx0Zm9yY2UgPSB0cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLmZpbHRlckF1dG9Db21wbGV0ZShkYXRhSW5kZXgsIGZvcmNlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGV2ZW50LndoaWNoID09IDEzICYmIHR5cGVvZiAodGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF1bdGhpcy5zZWxlY3RJbmRleF0pICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFzc2lnbkJ5RW50ZXIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5oaWRlTGlzdChkYXRhSW5kZXgpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZXZlbnQuY3RybEtleSA9PSB0cnVlICYmIChldmVudC5jaGFyQ29kZSA9PSA4NiB8fCBldmVudC53aGljaCA9PSA4NikpIHtcclxuXHRcdFx0XHRcdGxldCByZWdleHBWYWx1ZSA9IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm5cclxuXHRcdFx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0XHRyZWdleHBWYWx1ZSA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoU3RyaW5nKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKS5tYXRjaChyZWdleHBWYWx1ZSkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IHRoaXMudGVtcFZhbHVlO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IHZhbHVlTGlzdFJvdyBvZiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5ID09IHZhbHVlTGlzdFJvdy5kaXNwbGF5KSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0udmFsdWUgPSB2YWx1ZUxpc3RSb3cudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0udmFsdWUgPSAnJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgdGltZXJTYiA9IHRpbWVyKDEwMClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmFOZ1Njcm9sbEJhci50b0FycmF5KClbZGF0YUluZGV4XSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpeFNjcm9sbEJhciA9IHRoaXMuYU5nU2Nyb2xsQmFyLnRvQXJyYXkoKVtkYXRhSW5kZXhdLnN0YXRlLmlzVmVydGljYWxseVNjcm9sbGFibGU7XHJcblx0XHRcdFx0XHRcdHRpbWVyU2IudW5zdWJzY3JpYmUoKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NLZXlEb3duKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5zaG93QnV0dG9uKSB7XHJcblx0XHRcdHRoaXMuaGlkZUxpc3QoZGF0YUluZGV4KTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmFsbG93VGVtcERhdGEgPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLnRlbXBWYWx1ZVZhbGlkYXRlID0gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheTtcclxuXHRcdH1cclxuXHRcdGlmIChldmVudC53aGljaCA9PSAzOCAmJiB0aGlzLnNlbGVjdEluZGV4ID4gMCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdEluZGV4LS07XHJcblx0XHR9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDQwICYmIHRoaXMuc2VsZWN0SW5kZXggPCAodGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF0ubGVuZ3RoIC0gMSkpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RJbmRleCsrO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0NhbGwoZGF0YSkge1xyXG5cdFx0aWYgKHRoaXMuY2hlY2tSZWFkb25seSgpKSB7XHJcblx0XHRcdGlmIChkYXRhLnByb2Nlc3MgPT0gJ3Byb2Nlc3NMaXN0Jykge1xyXG5cdFx0XHRcdGxldCBkYXRhSW5kZXggPSBkYXRhLnBhcmFtLmRhdGFJbmRleDtcclxuXHRcdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XSA9IFtdO1xyXG5cdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0bGV0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXksICdnaScpO1xyXG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpIG9mIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoU3RyaW5nKGkuZGlzcGxheSkubWF0Y2gocGF0dGVybikpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XS5sZW5ndGggPCB0aGlzLm1heFNob3dEYXRhIHx8IHRoaXMuZmllbGRDcmVhdGlvbi5zaG93QWxsRGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XS5wdXNoKGkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZVNob3cnO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRhdGEucHJvY2VzcyA9PSAnY2xlYXJGaWx0ZXInKSB7XHJcblx0XHRcdFx0bGV0IGRhdGFJbmRleCA9IGRhdGEucGFyYW0uZGF0YUluZGV4O1xyXG5cdFx0XHRcdHRoaXMuYXV0b0NvbXBsZXRlRmlsdGVyTGlzdFtkYXRhSW5kZXhdID0gW107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0Y2hlY2tSZWFkb25seSgpIHtcclxuXHRcdHJldHVybiAodGhpcy5maWVsZENyZWF0aW9uLnJlYWRvbmx5ID09IHVuZGVmaW5lZCB8fCAodGhpcy5maWVsZENyZWF0aW9uLnJlYWRvbmx5ID09IGZhbHNlKSkgJiYgdGhpcy5vcHRpb24ubW9kZSAhPSAndmlldycgJiYgKHRoaXMub3B0aW9uLmVuYWJsZVJvd0luZGV4ID09IHVuZGVmaW5lZCB8fCAoKHRoaXMub3B0aW9uLmVuYWJsZVJvd0luZGV4W3RoaXMucm93SW5kZXhdID09IHRydWUgfHwgdGhpcy5vcHRpb24uZW5hYmxlUm93SW5kZXhbdGhpcy5yb3dJbmRleF0gPT0gdW5kZWZpbmVkKSkpXHJcblx0fVxyXG5cdGFzc2lnbkRhdGEoZXZlbnQsIGRhdGFJbmRleCwgZGF0YSkge1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuXHRcdHRoaXMudGVtcFZhbHVlW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcclxuXHRcdHRoaXMuZGlzcGxheUF1dG9Db21wbGV0ZVtkYXRhSW5kZXhdID0gJ2F1dG9Db21wbGV0ZUhpZGUnO1xyXG5cdFx0dGhpcy5zZXRPbkxpc3RbZGF0YUluZGV4XSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246ICdhc3NpZ25EYXRhJyxcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0YXNzaWduRGF0YTogZGF0YVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NDYWxsQmFja0tleVByZXNzKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KTtcclxuXHRcdGlmIChldmVudC53aGljaCA9PSAzMiB8fCBldmVudC53aGljaCA+IDQ2KSB7XHJcblx0XHRcdGxldCBrZXkgPSBldmVudC5rZXk7XHJcblx0XHRcdGxldCByZWdleHBJbnB1dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm5cclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKSA9PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdFx0cmVnZXhwSW5wdXQgPSBuZXcgUmVnRXhwKHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghU3RyaW5nKGtleSkubWF0Y2gocmVnZXhwSW5wdXQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoZXZlbnQud2hpY2ggPT0gMTMgJiYgdHlwZW9mICh0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XVt0aGlzLnNlbGVjdEluZGV4XSkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhpcy5hc3NpZ25CeUVudGVyID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XVt0aGlzLnNlbGVjdEluZGV4XSk7XHJcblx0XHRcdGxldCBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF1bdGhpcy5zZWxlY3RJbmRleF0pXHJcblx0XHRcdHRoaXMuc2VsZWN0SW5kZXggPSAwO1xyXG5cdFx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0XHRhY3Rpb246ICdhc3NpZ25EYXRhJyxcclxuXHRcdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdFx0YXNzaWduRGF0YTogZGF0YVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKGV2ZW50LndoaWNoICE9IDQ2ICYmIGV2ZW50LndoaWNoICE9IDggJiYgZXZlbnQuY3RybEtleSAhPSB0cnVlICYmIGV2ZW50LmFsdEtleSAhPSB0cnVlKSB7XHJcblx0XHRcdGxldCBrZXkgPSBldmVudC5rZXk7XHJcblx0XHRcdGxldCBjb21iaW5lVmFsdWU7XHJcblx0XHRcdGlmICh0eXBlb2YgKHRoaXMudGVtcFZhbHVlVmFsaWRhdGUpICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0Y29tYmluZVZhbHVlID0gdGhpcy50ZW1wVmFsdWVWYWxpZGF0ZSArIGtleTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb21iaW5lVmFsdWUgPSBrZXk7XHJcblx0XHRcdH1cclxuXHRcdFx0bGV0IHJlZ2V4cElucHV0ID0gdGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVyblxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZWdleHBJbnB1dCA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKFN0cmluZyhrZXkpLm1hdGNoKHJlZ2V4cElucHV0KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzQmx1cihldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuXHRcdGxldCB2YWxpZGF0ZSA9IHRydWU7XHJcblx0XHRsZXQgcmVnZXhwVmFsdWUgPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuXHJcblx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0cmVnZXhwVmFsdWUgPSBuZXcgUmVnRXhwKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFTdHJpbmcodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheSkubWF0Y2gocmVnZXhwVmFsdWUpXHJcblx0XHRcdCYmIHRoaXMuZ2V0RGlzYWJsZSgpID09IGZhbHNlKSB7XHJcblx0XHRcdGxldCBpbnB1dEZpZWxkOiBIVE1MRWxlbWVudCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblx0XHRcdGlucHV0RmllbGQgJiYgaW5wdXRGaWVsZC5mb2N1cygpO1xyXG5cdFx0XHR2YWxpZGF0ZSA9IGZhbHNlXHJcblx0XHR9XHJcblx0XHRpZiAodHlwZW9mICh0aGlzLmZpZWxkQ3JlYXRpb24uZml4ZWRWYWx1ZSkgIT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5maWVsZENyZWF0aW9uLmZpeGVkVmFsdWUgPT0gdHJ1ZSAmJiB0aGlzLmJ0bkhvdmVyID09IGZhbHNlKSB7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSAmJiB0aGlzLnRlbXBWYWx1ZVtkYXRhSW5kZXhdICYmIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkgIT0gdGhpcy50ZW1wVmFsdWVbZGF0YUluZGV4XS5kaXNwbGF5KSB7XHJcblx0XHRcdFx0Zm9yIChsZXQgdmFsdWVMaXN0IG9mIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5ID09IHZhbHVlTGlzdC5kaXNwbGF5KSB7XHJcblx0XHRcdFx0XHRcdHRoaXMudGVtcFZhbHVlW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZUxpc3QpO1xyXG5cdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRlbXBWYWx1ZVtkYXRhSW5kZXhdKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmJ0bkhvdmVyKSB7XHJcblx0XHRcdGxldCB0aW1lclNiID0gdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdGV2ZW50LnRhcmdldC5mb2N1cygpO1xyXG5cdFx0XHRcdHRpbWVyU2IudW5zdWJzY3JpYmUoKTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5maWVsZENyZWF0aW9uLmZpeGVkVmFsdWUgJiYgdGhpcy5idG5Ib3ZlciA9PSBmYWxzZSAmJiAhdGhpcy5hc3NpZ25CeUVudGVyKSB7XHJcblx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLnZhbHVlID0gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5oaWRlTGlzdChkYXRhSW5kZXgpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0dmFsaWRhdGVTdGF0dXM6IHZhbGlkYXRlLFxyXG5cdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdG1vdXNlT3ZlckNoYW5nZUluZGV4KGZpbHRlckluZGV4KSB7XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLmFOZ1Njcm9sbEJhcik7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0dGhpcy5zZWxlY3RJbmRleCA9IGZpbHRlckluZGV4O1xyXG5cdH1cclxuXHRcclxuXHRmaWx0ZXJBdXRvQ29tcGxldGUoZGF0YUluZGV4LCBmb3JjZT1mYWxzZSkge1xyXG5cdFx0dGhpcy5hc3NpZ25CeUVudGVyID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlZmluZVZhbHVlTGlzdCgpO1xyXG5cdFx0aWYgKCgodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheVxyXG5cdFx0XHQmJiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheS5sZW5ndGggPiAwIHx8IHRoaXMuZmllbGRDcmVhdGlvbi5zaG93QWxsT25DbGljaylcclxuXHRcdFx0JiYgdGhpcy50ZW1wRmlsdGVyW2RhdGFJbmRleF0gIT0gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheSlcclxuXHRcdFx0fHwgdGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxEYXRhKVxyXG5cdFx0XHQmJiB0aGlzLnRlbXBGaWx0ZXJbZGF0YUluZGV4XSAhPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5IHx8IGZvcmNlXHJcblx0XHQpIHtcclxuXHRcdFx0bGV0IHJlc2V0U2VsZWN0SW5kZXggPSBmYWxzZTtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkubGVuZ3RoID09IDAgJiYgdGhpcy5maWVsZENyZWF0aW9uLnNob3dBbGxPbkNsaWNrKSB7XHJcblx0XHRcdFx0dGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF0gPSBbXTtcclxuXHRcdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XSA9IE9iamVjdC5hc3NpZ24odGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdClcclxuXHRcdFx0XHRyZXNldFNlbGVjdEluZGV4ID0gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XSA9IFtdO1xyXG5cdFx0XHRcdC8vIGxldCBmaWx0ZXJMaXN0ID0gdGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF07XHJcblx0XHRcdFx0dGhpcy50ZW1wRmlsdGVyW2RhdGFJbmRleF0gPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5O1xyXG5cdFx0XHRcdC8vIGxldCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5LCAnZ2knKTtcclxuXHRcdFx0XHRsZXQgcGF0dGVybiA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXk7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSBvZiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdFx0XHQvLyBpZiAoU3RyaW5nKGkuZGlzcGxheSkubWF0Y2gocGF0dGVybikgPiAtMSkge1xyXG5cdFx0XHRcdFx0aWYgKFN0cmluZyhpLmRpc3BsYXkpLmluZGV4T2YocGF0dGVybikgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5hdXRvQ29tcGxldGVGaWx0ZXJMaXN0W2RhdGFJbmRleF0ubGVuZ3RoIDwgdGhpcy5tYXhTaG93RGF0YSB8fCB0aGlzLmZpZWxkQ3JlYXRpb24uc2hvd0FsbERhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmF1dG9Db21wbGV0ZUZpbHRlckxpc3RbZGF0YUluZGV4XS5wdXNoKGkpO1xyXG5cdFx0XHRcdFx0XHRcdHJlc2V0U2VsZWN0SW5kZXggPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChyZXNldFNlbGVjdEluZGV4ID09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdEluZGV4ID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZWZpbmVWYWx1ZUxpc3QoKSB7XHJcblx0XHRsZXQgbmV3VmFsdWVMaXN0ID0gW107XHJcblx0XHRmb3IgKGxldCBsaXN0SW5kZXggaW4gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG5cdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmRpc2FibGVSZWZpbmVkID09IHVuZGVmaW5lZCB8fCB0aGlzLmZpZWxkQ3JlYXRpb24uZGlzYWJsZVJlZmluZWQgPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLmRpc3BsYXkgIT0gJycgJiYgdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLnZhbHVlICE9ICcnKSB7XHJcblx0XHRcdFx0XHRuZXdWYWx1ZUxpc3QucHVzaCh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS5kaXNwbGF5LFxyXG5cdFx0XHRcdFx0XHR2YWx1ZTogdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLnZhbHVlXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS5kaXNwbGF5ID09ICcnICYmIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS52YWx1ZSAhPSAnJykge1xyXG5cdFx0XHRcdFx0bmV3VmFsdWVMaXN0LnB1c2goe1xyXG5cdFx0XHRcdFx0XHRkaXNwbGF5OiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0udmFsdWUsXHJcblx0XHRcdFx0XHRcdHZhbHVlOiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0udmFsdWVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLnZhbHVlID09ICcnICYmIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS5kaXNwbGF5ICE9ICcnKSB7XHJcblx0XHRcdFx0XHRuZXdWYWx1ZUxpc3QucHVzaCh7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbbGlzdEluZGV4XS5kaXNwbGF5LFxyXG5cdFx0XHRcdFx0XHR2YWx1ZTogdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtsaXN0SW5kZXhdLmRpc3BsYXlcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRuZXdWYWx1ZUxpc3QucHVzaCh7XHJcblx0XHRcdFx0XHRkaXNwbGF5OiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0uZGlzcGxheSxcclxuXHRcdFx0XHRcdHZhbHVlOiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W2xpc3RJbmRleF0udmFsdWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCA9IG5ld1ZhbHVlTGlzdDtcclxuXHR9XHJcblx0XHJcblx0Y2hlY2tEZWZhdWx0KCkge1xyXG5cdFx0bGV0IGNoZWNrID0gdHJ1ZTtcclxuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSkge1xyXG5cdFx0XHRmb3IgKGxldCBkYXRhUm93IG9mIHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiAoZGF0YVJvdy5kaXNwbGF5KSA9PSAndW5kZWZpbmVkJyB8fCBkYXRhUm93LnZhbHVlID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRjaGVjayA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGRhdGFSb3cgPSBPYmplY3QuYXNzaWduKHt9LHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KTtcclxuXHRcdFx0aWYgKHR5cGVvZiAoZGF0YVJvdy5kaXNwbGF5KSA9PSAndW5kZWZpbmVkJyB8fCBkYXRhUm93LnZhbHVlID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0Y2hlY2sgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNoZWNrO1xyXG5cdH1cclxuXHRzZXRCdG5Ib3ZlcihzdGF0dXMpe1xyXG5cdFx0dGhpcy5idG5Ib3ZlciA9IHN0YXR1cztcclxuXHR9XHJcbn1cclxuIl19