import { __decorate, __metadata } from 'tslib';
import { Injectable, EventEmitter, ɵɵdefineInjectable, ViewContainerRef, Input, Output, Component, ViewChild, ElementRef, ViewChildren, QueryList, ComponentFactoryResolver, ɵɵinject, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { timer, interval, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgScrollbar, NgScrollbarModule } from 'ngx-scrollbar';
import { isString, isNumber, isArray, isObject, isBoolean } from 'util';
import { takeWhile } from 'rxjs/operators';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';

let LockScreenService = class LockScreenService {
    constructor() {
        this.color1 = "rgba(217,217,217,0.8)";
        this.color2 = "rgba(90,90,90,0.8)";
        this.createStyleTag();
    }
    createStyleTag() {
        let styleTag = document.createElement("style");
        let lockScreenAnime = document.getElementById("lockScreenCss");
        let styleData = ".loader { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color1 + ";  border-radius: 50%; width: 60px; height: 60px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -30px 0 0 -30px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite;} \n" +
            ".loader2 { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color2 + ";  border-radius: 50%; width: 90px; height: 90px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -45px 0 0 -45px; -webkit-animation: spin 1.2s linear infinite; animation: spin 1.2s linear infinite;} \n" +
            "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}";
        if (lockScreenAnime == null) {
            styleTag.innerText = styleData;
            styleTag.id = "lockScreenCss";
            document.head.appendChild(styleTag);
        }
        else {
            lockScreenAnime.innerText = styleData;
        }
    }
    setColor1(color) {
        this.color1 = color;
        this.createStyleTag();
    }
    setColor2(color) {
        this.color2 = color;
        this.createStyleTag();
    }
    lockScreen(timeout = 20000) {
        let lockScreenElement = document.getElementById("lockScreenLoading");
        if (lockScreenElement == null) {
            let lockScreenDiv = document.createElement("div");
            lockScreenDiv.id = "lockScreenLoading";
            lockScreenDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            lockScreenDiv.style.width = "100vw";
            lockScreenDiv.style.height = "100vh";
            lockScreenDiv.style.position = "fixed";
            lockScreenDiv.style.top = "0px";
            lockScreenDiv.style.left = "0px";
            lockScreenDiv.style.zIndex = "1051";
            let loading = document.createElement("div");
            let loading2 = document.createElement("div");
            loading.className = "loader";
            loading2.className = "loader2";
            lockScreenDiv.appendChild(loading);
            lockScreenDiv.appendChild(loading2);
            document.body.appendChild(lockScreenDiv);
            this.subscribeProcess = timer(timeout)
                .subscribe(() => {
                this.unLockScreen();
            });
        }
        else {
            if (typeof (this.subscribeProcess) != "undefined") {
                this.subscribeProcess.unsubscribe();
                this.subscribeProcess = timer(timeout)
                    .subscribe(() => {
                    this.unLockScreen();
                });
            }
        }
    }
    unLockScreen() {
        timer(500)
            .subscribe(() => {
            let lockScreenElement = document.getElementById("lockScreenLoading");
            if (lockScreenElement != null) {
                document.body.removeChild(lockScreenElement);
                if (typeof (this.subscribeProcess) != "undefined") {
                    this.subscribeProcess.unsubscribe();
                }
            }
        });
    }
};
LockScreenService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LockScreenService);

let AnimationService = class AnimationService {
    constructor() {
        this.animationEmitter = new EventEmitter();
        this.animationRegister = [];
        this.animationState = 'initial';
        this.initStateTimer = timer(100);
        this.animateQueueInterval = timer(100);
        this.reRendering = false;
        this.enableAnimation = false;
        this.count = 0;
    }
    registerAnimation(elementName) {
        if (!this.reRendering && this.enableAnimation) {
            const registerName = elementName + '_' + this.animationRegister.length;
            this.animationRegister.push(registerName);
            if (this.animationState === 'initial') {
                this.initStateTimer.subscribe(() => {
                    this.animateProcess();
                });
                this.animationState = 'initialed';
            }
            return registerName;
        }
    }
    animateProcess() {
        if (this.enableAnimation) {
            if (this.animationRegister.length > 0) {
                this.animateQueueInterval.subscribe(() => {
                    this.count++;
                    const queueName = this.animationRegister.shift();
                    this.animationEmitter.emit(queueName);
                    this.animateProcess();
                });
            }
            else {
                this.animationState = 'initial';
                this.count = 0;
            }
        }
    }
    setOnReRender(rerenderStatus) {
        this.reRendering = rerenderStatus;
    }
    setEnableAnimation(enable) {
        this.enableAnimation = (enable === 'true' || enable === true);
    }
};
AnimationService.ɵprov = ɵɵdefineInjectable({ factory: function AnimationService_Factory() { return new AnimationService(); }, token: AnimationService, providedIn: "root" });
AnimationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], AnimationService);

let InputComponent = class InputComponent {
    constructor(viewContainerRef, animationService) {
        this.viewContainerRef = viewContainerRef;
        this.animationService = animationService;
    }
    processCall(data) {
        // console.log(1,data);
    }
    ;
};
InputComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], InputComponent.prototype, "panelCallBack", void 0);
InputComponent = __decorate([
    Component({
        selector: 'lb9-input',
        template: ''
    }),
    __metadata("design:paramtypes", [ViewContainerRef, AnimationService])
], InputComponent);

let DynamicBehaviorComponent = class DynamicBehaviorComponent {
    constructor(animationService) {
        this.animationService = animationService;
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.animateTimer = timer(60);
        this.animationServiceInit = false;
        this.animateState = false;
        this.animateName = '';
    }
    animateProcess() {
        if (!this.animationServiceInit) {
            this.animateTimer.subscribe(() => {
                if (this.animateName == '') {
                    this.animateName = this.animationService.registerAnimation(this.fieldCreation.fieldName);
                }
            });
        }
        this.animationServiceInit = true;
        this.animationService.animationEmitter.subscribe((event) => {
            if (this.animateName === event) {
                this.animateState = true;
            }
        });
    }
    getLabelWidth() {
        let width = '';
        if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
            width = this.fieldCreation.labelWidth + 'px';
        }
        return width;
    }
    getInputWidth() {
        let width = '';
        if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
            width = 'calc(100% - ' + (parseInt(this.fieldCreation.labelWidth) + 6) + 'px)';
        }
        return width;
    }
    processCallBack(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    getCustomClass() {
        if (typeof (this.fieldCreation.customClass) != 'undefined') {
            return this.fieldCreation.customClass;
        }
        else {
            return '';
        }
    }
    checkRequire(index) {
        if (typeof (this.data[this.fieldCreation.fieldName][index]) != 'undefined' && this.fieldCreation.require == true && this.data[this.fieldCreation.fieldName][index] == '') {
            return 'require';
        }
        return '';
    }
    getDisable() {
        let check = false;
        if (this.option.mode == 'view' || this.fieldCreation.readonly || (this.option.enableRowIndex && this.option.enableRowIndex[this.rowIndex] == false)) {
            check = true;
        }
        if (this.option.mode == 'edit' && this.fieldCreation.editAble != undefined && this.fieldCreation.editAble == false) {
            check = true;
        }
        if (this.option.disableList != undefined && this.option.disableList[this.rowIndex] != undefined
            && this.option.disableList[this.rowIndex][this.fieldCreation.fieldName] != undefined) {
            check = this.option.disableList[this.rowIndex][this.fieldCreation.fieldName];
        }
        return check;
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
};
DynamicBehaviorComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicBehaviorComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicBehaviorComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicBehaviorComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicBehaviorComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicBehaviorComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicBehaviorComponent.prototype, "panelCallBack", void 0);
DynamicBehaviorComponent = __decorate([
    Component({
        template: ''
    }),
    __metadata("design:paramtypes", [AnimationService])
], DynamicBehaviorComponent);

let TextBoxComponent = class TextBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.columnCalculate = "";
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [""];
            }
        }
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push("");
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        this.allowTempData = true;
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            let regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
                && String(event.target.value).match(regexpValue)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    }
    processKeyDown(event, action, dataIndex) {
        if (this.allowTempData == true) {
            this.allowTempData = false;
            this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
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
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            let combineValue = this.tempValue + key;
            let check = true;
            let regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (typeof (this.fieldCreation.inputPattern) != "undefined") {
                if (!String(key).match(regexpInput)) {
                    check = false;
                }
            }
            if (typeof (this.fieldCreation.validateWhileKeyPress) != "undefined"
                && typeof (this.fieldCreation.valuePattern) != "undefined"
                && this.fieldCreation.validateWhileKeyPress) {
                let regexpValue = this.fieldCreation.valuePattern;
                if (typeof (this.fieldCreation.valuePattern) == "string") {
                    regexpValue = new RegExp(this.fieldCreation.valuePattern);
                }
                if (!String(combineValue).match(regexpValue)) {
                    check = false;
                }
            }
            if (check == false) {
                return false;
            }
        }
        return true;
    }
    processBlur(event, action, dataIndex) {
        let validate = true;
        let regexpValue = this.fieldCreation.valuePattern;
        if (typeof (this.fieldCreation.valuePattern) == "string") {
            regexpValue = new RegExp(this.fieldCreation.valuePattern);
        }
        if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
            && this.getDisable() == false) {
            let inputField = event.currentTarget;
            inputField && inputField.focus();
            validate = false;
        }
        if (this.fieldCreation.type == "number") {
            if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] < parseFloat(this.fieldCreation.min)) {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.min;
            }
            if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] > parseFloat(this.fieldCreation.max)) {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.max;
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        return validate;
    }
    getType() {
        if (this.fieldCreation.type == "number") {
            return "number";
        }
        else if (this.fieldCreation.type == "password") {
            return "password";
        }
        else {
            return "textbox";
        }
    }
};
TextBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextBoxComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextBoxComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextBoxComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextBoxComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextBoxComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TextBoxComponent.prototype, "callBack", void 0);
TextBoxComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n                <input type=\"{{getType()}}\" class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                       [readonly]=\"getDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       max=\"{{fieldCreation.max}}\"\r\n                       min=\"{{fieldCreation.min}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], TextBoxComponent);

let LabelComponent = class LabelComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.modeDisplay = "";
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            this.modeDisplay = "dp2hide";
        }
        else {
            this.modeDisplay = "";
        }
    }
    processCall(data) {
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
};
LabelComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], LabelComponent.prototype, "panelCallBack", void 0);
LabelComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{modeDisplay}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"labelDetail\">\r\n                <div id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\">{{data[fieldCreation.fieldName][dataIndex]}}</div>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], LabelComponent);

let CheckBoxComponent = class CheckBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
        this.showSelectAll = "dp2hide";
        this.selectAll = false;
        this.singleLine = "";
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        this.checkboxDisplay = "checkboxHide";
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) == "object") {
                this.data[this.fieldCreation.fieldName] = Object.assign({}, this.fieldCreation.default);
            }
            else {
                let defaultVal = {};
                for (let valueIndex in this.fieldCreation.valueList) {
                    defaultVal[this.fieldCreation.valueList[valueIndex].value] = false;
                }
                this.data[this.fieldCreation.fieldName] = defaultVal;
            }
        }
        if (this.fieldCreation.showSelectAll == true) {
            this.showSelectAll = "";
        }
        if (this.fieldCreation.displaySingleLine == true || this.option.displayMode == "table") {
            this.singleLine = "singlePerLine";
        }
        else {
            this.singleLine = "multiplePerLine";
        }
        if (this.option.displayMode != 'table') {
            this.checkboxDisplay = "checkboxShow";
        }
    }
    toggleSelectAll() {
        if (this.selectAll == true) {
            for (let dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = true;
            }
        }
        else {
            for (let dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = false;
            }
        }
        this.callBack.emit({
            action: 'selectAll',
            value: this.selectAll,
            fieldName: this.fieldCreation.fieldName
        });
    }
    processCall(data) {
    }
    processChange(event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    }
    toggleShowCheckBox() {
        if (!this.getDisable()) {
            if (this.checkboxDisplay == "checkboxHide") {
                this.checkboxDisplay = "checkboxShow";
            }
            else {
                this.checkboxDisplay = "checkboxHide";
            }
        }
    }
    haveChecked() {
        let haveChecked = false;
        for (let valueName in this.data[this.fieldCreation.fieldName]) {
            if (this.data[this.fieldCreation.fieldName][valueName] == true) {
                haveChecked = true;
                break;
            }
        }
        return haveChecked;
    }
};
CheckBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CheckBoxComponent.prototype, "panelCallBack", void 0);
CheckBoxComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative\">\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"checkBoxTableDisplay\">\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div *ngIf=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value] && haveChecked()\" class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"checkbox\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}_checked\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label>{{fieldCreation.valueList[listIndex].display}}</label>\r\n                    </div>\r\n                </ng-container>\r\n                <div *ngIf=\"!haveChecked()\">\r\n                    Not Selected\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"arrowToggle\" (click)=\"toggleShowCheckBox()\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{option.formId}}_{{rowIndex}}_arrowDown\">\r\n                <div class=\"arrowDown\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"{{(option.displayMode == 'table' ? 'checkboxList' : '')}} {{checkboxDisplay}}\">\r\n                <div class=\"{{(option.displayMode == 'table' ? 'checkboxListBox' : '')}}\">\r\n                    <div class=\"{{showSelectAll}}\">\r\n                        <input type=\"checkbox\" id=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\" (change)=\"toggleSelectAll()\"\r\n                               [disabled]=\"getDisable()\"\r\n                               [(ngModel)]=\"selectAll\"> <label for=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\">Select All</label>\r\n                    </div>\r\n                    <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                        <div class=\"checkBoxIndent {{singleLine}}\">\r\n                            <input type=\"checkbox\"\r\n                                   id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                                   [disabled]=\"getDisable()\"\r\n                                   (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                            <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n                        </div>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], CheckBoxComponent);

let TextAreaComponent = class TextAreaComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [""];
            }
        }
    }
    processCall(data) {
    }
};
TextAreaComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TextAreaComponent.prototype, "panelCallBack", void 0);
TextAreaComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n      <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n        <textarea id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                  [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                  [readonly]=\"getDisable()\"\r\n                  (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                  (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                  (keyup)=\"processCallBack($event,'keyup',dataIndex)\"\r\n                  (keypress)=\"processCallBack($event,'keypress',dataIndex)\"\r\n                  (keydown)=\"processCallBack($event,'keydown',dataIndex)\"\r\n                  (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                  (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                  placeholder=\"{{fieldCreation.placeholder}}\"\r\n                  maxlength=\"{{fieldCreation.maxLength}}\"></textarea>\r\n      </div>\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], TextAreaComponent);

let SelectBoxComponent = class SelectBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                if (typeof (this.fieldCreation.valueList[0]) != "undefined") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.valueList[0].value];
                }
            }
        }
    }
    processCall(data) {
    }
    processChange(event, action, dataIndex) {
        let valueObj = [];
        for (let dataIndexRaw in this.data[this.fieldCreation.fieldName]) {
            let value = this.data[this.fieldCreation.fieldName][dataIndexRaw];
            for (let valueListRow of this.fieldCreation.valueList) {
                if (valueListRow.value == value) {
                    valueObj.push(valueListRow);
                }
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            valueObj: valueObj,
            fieldName: this.fieldCreation.fieldName
        });
    }
    checkValueList(valueList) {
        if (valueList != undefined) {
            return true;
        }
        return false;
    }
};
SelectBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SelectBoxComponent.prototype, "panelCallBack", void 0);
SelectBoxComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{checkRequire(dataIndex)}}\">\r\n                <ng-container *ngIf=\"checkValueList(fieldCreation.valueList)\">\r\n                    <select class=\"select-style-custom {{fieldCreation.widthType == 'full' ?  'fullWidth' : ''}}\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                            [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                            [disabled]=\"getDisable()\"\r\n                            (change)=\"processChange($event,'change',dataIndex)\">\r\n                        <option *ngFor=\"let selectRow of fieldCreation.valueList\" value=\"{{selectRow.value}}\">{{selectRow.display}}</option>\r\n                    </select>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], SelectBoxComponent);

let HiddenComponent = class HiddenComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
    }
    processCall(data) {
    }
};
HiddenComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], HiddenComponent.prototype, "panelCallBack", void 0);
HiddenComponent = __decorate([
    Component({
        template: "<ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n    <input type=\"hidden\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\" name=\"{{fieldCreation.fieldName}}\" [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\" [readonly]=\"option.mode == 'view'\"/>\r\n</ng-container>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], HiddenComponent);

let FileUploadComponent = class FileUploadComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.acceptExt = ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf";
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        this.data[this.fieldCreation.fieldName] = Object.assign({}, {
            currentFile: [],
            selectFile: {},
        });
        if (this.fieldCreation.accept) {
            this.acceptExt = this.fieldCreation.accept;
        }
    }
    handleFileSelect(evt) {
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
        }
        this.callBack.emit({
            event: evt,
            action: "fileSelect",
            fieldName: this.fieldCreation.fieldName
        });
    }
    processCall(data) {
    }
};
FileUploadComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FileUploadComponent.prototype, "panelCallBack", void 0);
FileUploadComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative {{fieldCreation.require && (!data[fieldCreation.fieldName].selectFile || !data[fieldCreation.fieldName].selectFile.length || data[fieldCreation.fieldName].selectFile.length == 0) ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\"\r\n                       class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\" name=\"{{fieldCreation.fieldName}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], FileUploadComponent);

let ImageComponent = class ImageComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.base64textString = [];
        this.objKeys = Object.keys;
        this.modeDisplay = "";
        this.errorMsg = "";
        this.acceptExt = "image/*";
        this.fileTypeList = {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "svg": "image/svg+xml"
        };
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            this.modeDisplay = "dp2hide";
        }
        else {
            this.modeDisplay = "";
        }
        this.data[this.fieldCreation.fieldName] = Object.assign({}, {
            currentFile: [],
            selectFile: {},
        });
        if (this.fieldCreation.accept) {
            this.acceptExt = this.fieldCreation.accept;
        }
    }
    handleFileSelect(evt) {
        this.base64textString = [];
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
            let files = evt.target.files;
            let validate = this.validateFileExtension();
            if (validate == true) {
                for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
                    let file = files[fileIndex];
                    if (files && file) {
                        let reader = new FileReader();
                        reader.onload = this._handleReaderLoaded.bind(this);
                        reader.readAsBinaryString(file);
                    }
                }
            }
        }
        this.callBack.emit({
            event: evt,
            action: "fileSelect",
            fieldName: this.fieldCreation.fieldName
        });
    }
    _handleReaderLoaded(readerEvt) {
        let filenameSplit = String(this.data[this.fieldCreation.fieldName].selectFile[this.base64textString.length].name).split('.');
        let ext = filenameSplit.pop().toLowerCase();
        if (this.fileTypeList[ext]) {
            let binaryString = readerEvt.target.result;
            // console.log("url(data:image/jpg;base64," + btoa(binaryString) + ")");
            this.base64textString.push("url('data:" + this.fileTypeList[ext] + ";base64," + btoa(binaryString) + "')");
        }
    }
    getNasImageUrl(file) {
        if (file != null && file.length > 0) {
            return "url('" + file + "')";
        }
        return "";
    }
    processCall(data) {
    }
    getType(data) {
        return typeof (data);
    }
    validateFileExtension() {
        this.errorMsg = "";
        if (typeof (this.fieldCreation.fileType) != "undefined") {
            let fileData = this.data[this.fieldCreation.fieldName].selectFile;
            let validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
            let validatePattern = new RegExp(validateExtensionString, "i");
            for (let fileDataIndex = 0; fileDataIndex < fileData.length; fileDataIndex++) {
                let fileName = fileData[fileDataIndex].name;
                let fileNameSplit = fileName.split(".");
                let extension = fileNameSplit.pop();
                if (!validatePattern.test(extension)) {
                    this.errorMsg = "File type mismatch.";
                    return false;
                }
            }
            return true;
        }
        else {
            return true;
        }
    }
    checkFileRequire() {
        if ((!this.data[this.fieldCreation.fieldName].selectFile
            || !this.data[this.fieldCreation.fieldName].selectFile.length
            || this.data[this.fieldCreation.fieldName].selectFile.length == 0)
            && (!this.data[this.fieldCreation.fieldName].currentFile
                || !this.data[this.fieldCreation.fieldName].currentFile.length
                || this.data[this.fieldCreation.fieldName].currentFile.length == 0)) {
            return true;
        }
        return false;
    }
    clickImage(index) {
        this.callBack.emit({
            fileIndex: index,
            base64: this.base64textString[index],
            fileData: this.data[this.fieldCreation.fieldName].selectFile[index],
            action: "click",
            fieldName: this.fieldCreation.fieldName
        });
    }
    clickCurrentImage(index) {
        this.callBack.emit({
            fileIndex: index,
            fileData: this.data[this.fieldCreation.fieldName].currentFile[index],
            action: "click",
            fieldName: this.fieldCreation.fieldName
        });
    }
    deleteCurrentImage(index) {
        this.data[this.fieldCreation.fieldName].currentFile.splice(index, 1);
        this.callBack.emit({
            fileIndex: index,
            action: "delete",
            fieldName: this.fieldCreation.fieldName
        });
    }
    deleteImage(index) {
        this.base64textString.splice(index, 1);
        const fileCurrent = this.imageInputVC.nativeElement.files;
        const dt = new DataTransfer();
        for (let fileIndex = 0; fileIndex < fileCurrent.length; fileIndex++) {
            if (fileIndex != index) {
                const file = fileCurrent[fileIndex];
                dt.items.add(file);
            }
        }
        this.imageInputVC.nativeElement.value = '';
        this.imageInputVC.nativeElement.files = dt.files;
        this.data[this.fieldCreation.fieldName].selectFile = dt.files;
        this.callBack.emit({
            fileIndex: index,
            action: "delete",
            fieldName: this.fieldCreation.fieldName
        });
    }
};
ImageComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "rowIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "inputIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ImageComponent.prototype, "panelCallBack", void 0);
__decorate([
    ViewChild('imageInput'),
    __metadata("design:type", ElementRef)
], ImageComponent.prototype, "imageInputVC", void 0);
ImageComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"\r\n     [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container\r\n                *ngIf=\"base64textString != null && base64textString.length == 0 && getType(data[fieldCreation.fieldName].currentFile) != 'undefined'\">\r\n            <div class=\"imageItem\" *ngFor=\"let fileIndex of objKeys(data[fieldCreation.fieldName].currentFile)\">\r\n                <div class=\"image\"\r\n                     [ngStyle]=\"{'background-image':getNasImageUrl(data[fieldCreation.fieldName].currentFile[fileIndex])}\"  (click)=\"clickCurrentImage(fileIndex)\"></div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteCurrentImage(fileIndex)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"base64textString != null && base64textString.length > 0\">\r\n            <div class=\"imageItem\" *ngFor=\"let indexB64 of objKeys(base64textString)\">\r\n                <div class=\"image\" [ngStyle]=\"{'background-image':base64textString[indexB64]}\" (click)=\"clickImage(indexB64)\">\r\n\r\n                </div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteImage(indexB64)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"posRelative {{fieldCreation.require && checkFileRequire() ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\" class=\"fullWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       #imageInput\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\"\r\n                 id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div class=\"dp2Error\">\r\n                {{errorMsg}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], ImageComponent);

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

let ButtonComponent = class ButtonComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
    }
    processClick(event, action, dataIndex, valueList) {
        if (!this.getDisable() && !this.disableList(valueList.value)) {
            if (typeof (this.data[this.fieldCreation.fieldName]) != "undefined" && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != "undefined") {
                this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                valueList: valueList,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
    disableList(value) {
        if (this.fieldCreation.disableList && this.fieldCreation.disableList.indexOf(value) > -1) {
            return true;
        }
        return false;
    }
};
ButtonComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "panelCallBack", void 0);
ButtonComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n\r\n      <div class=\"posRelative\">\r\n        <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n          <div class=\"btn-style-dynamic {{(fieldCreation.smallButton ? 'btn-small' : '')}}{{(getDisable() ? ' btn-disable' : '')}}{{(disableList(fieldCreation.valueList[valueListIndex].value) ? ' btn-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n               (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n               (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n        </ng-container>\r\n      </div>\r\n\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], ButtonComponent);

let SwappingBoxComponent = class SwappingBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.modeDisplay = "";
        this.objKeys = Object.keys;
        this.optionText = "Option";
        this.selectedText = "Selected";
        this.selectAllText = "Select All";
        this.removeAllText = "Remove All";
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        this.filter = "";
        this.filterToggle = "filterInvisible";
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            this.modeDisplay = "dp2hide";
        }
        else {
            this.modeDisplay = "";
        }
        if (this.fieldCreation.optionText) {
            this.optionText = this.fieldCreation.optionText;
        }
        if (this.fieldCreation.selectedText) {
            this.selectedText = this.fieldCreation.selectedText;
        }
        if (this.fieldCreation.selectAllText) {
            this.selectAllText = this.fieldCreation.selectAllText;
        }
        if (this.fieldCreation.removeAllText) {
            this.removeAllText = this.fieldCreation.removeAllText;
        }
    }
    processCall(data) {
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
    checkDestData(valueList) {
        let checkValue = valueList.value;
        let checkDisplay = valueList.display.toLowerCase();
        let foundFlag = false;
        for (let dataRow of this.data[this.fieldCreation.fieldName]) {
            if (dataRow.value == checkValue) {
                foundFlag = true;
                break;
            }
        }
        if (foundFlag == true) {
            return false;
        }
        if (this.filter.length > 0 && checkDisplay.indexOf(this.filter.toLowerCase()) == -1) {
            return false;
        }
        return true;
    }
    transferData(valueIndex) {
        if (!this.getDisable()) {
            let value = this.fieldCreation.valueList[valueIndex].value;
            let foundFlag = false;
            for (let dataRow of this.data[this.fieldCreation.fieldName]) {
                if (dataRow.value == value) {
                    foundFlag = true;
                    break;
                }
            }
            if (foundFlag == false) {
                if (typeof (this.data[this.fieldCreation.fieldName]) == "undefined") {
                    this.data[this.fieldCreation.fieldName] = [];
                }
                this.data[this.fieldCreation.fieldName].push(this.fieldCreation.valueList[valueIndex]);
            }
            let valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "add",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
    removeData(dataIndex) {
        if (!this.getDisable()) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            let valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "remove",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
    removeAll() {
        this.data[this.fieldCreation.fieldName] = [];
    }
    selectAll() {
        this.data[this.fieldCreation.fieldName] = this.fieldCreation.valueList;
    }
    toggleFilter() {
        if (this.filterToggle === "filterInvisible") {
            this.filterToggle = "filterVisible";
        }
        else {
            this.filter = "";
            this.filterToggle = "filterInvisible";
        }
    }
};
SwappingBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], SwappingBoxComponent.prototype, "panelCallBack", void 0);
SwappingBoxComponent = __decorate([
    Component({
        template: "<div *ngIf=\"data[fieldCreation.fieldName]\" class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"  [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n            <div class=\"posRelative\">\r\n                <div class=\"dp2Table\">\r\n                    <div class=\"dp2Row\">\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"optionText\"></div>\r\n                                <div class=\"filterEnable\" (click)=\"toggleFilter()\"><span class=\"glyphicon glyphicon-search\"></span></div>\r\n                                <input type=\"text\" class=\"filter {{filterToggle}}\"\r\n                                       [readOnly]=\"filterToggle == 'filterInvisible'\"\r\n                                       [(ngModel)]=\"filter\" placeholder=\"Filter\"/>\r\n                            </div>\r\n                            <div class=\"source\">\r\n                                <ng-container *ngFor=\"let valueIndex of objKeys(fieldCreation.valueList)\">\r\n                                    <div class=\"source_select\" *ngIf=\"checkDestData(fieldCreation.valueList[valueIndex])\" (click)=\"transferData(valueIndex)\" [innerHTML]=\"fieldCreation.valueList[valueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"dp2Cell iconBox\">\r\n                            <abbr title=\"{{selectAllText}}\">\r\n                                <div class=\"selectAll\" (click)=\"selectAll()\"><span class=\"glyphicon glyphicon-forward\"></span></div>\r\n                            </abbr>\r\n                            <abbr title=\"{{removeAllText}}\">\r\n                                <div class=\"removeAll\" (click)=\"removeAll()\"><span class=\"glyphicon glyphicon-backward\"></span></div>\r\n                            </abbr>\r\n                        </div>\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"selectedText\"></div>\r\n                            </div>\r\n                            <div class=\"destination\">\r\n                                <ng-container *ngFor=\"let dataValueIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                                    <div class=\"source_select\" (click)=\"removeData(dataValueIndex)\" [innerHTML]=\"data[fieldCreation.fieldName][dataValueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n<div *ngIf=\"!data[fieldCreation.fieldName]\">Data undefined: {{fieldCreation.fieldName}}</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], SwappingBoxComponent);

let MapValueComponent = class MapValueComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.columnCalculate = "";
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    }
    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    }
    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
        return true;
    }
};
MapValueComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "panelCallBack", void 0);
MapValueComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"dp2Table fullWidth dp2TableSpace\">\r\n            <div class=\"dp2Row posRelative\">\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"displayPanel\">\r\n                        Display\r\n                    </div>\r\n                </div>\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"valuePanel\">\r\n                        Value\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                <div class=\"dp2Row\">\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} displayPanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_display_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} valuePanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_value_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].value\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                            <div *ngIf=\"option.mode != 'view'\" class=\"deleteBtn\"\r\n                                 (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ng-container>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div *ngIf=\"!(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                    class=\"glyphicon glyphicon-plus\"></span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], MapValueComponent);

class DynamicBehaviorComponentimplements {
}
let RadioComponent = class RadioComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
        this.selectAll = false;
        this.singleLine = "";
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.fieldCreation.displaySingleLine == true) {
            this.singleLine = "singleLine";
        }
    }
    processCall(data) {
    }
    processChange($event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    }
};
RadioComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], RadioComponent.prototype, "panelCallBack", void 0);
RadioComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKey(data[fieldCreation.fieldName])\">\r\n            <div>\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"radio\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{dataIndex}}_{{rowIndex}}\"\r\n                               value=\"{{fieldCreation.valueList[listIndex].value}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n\r\n                    </div>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], RadioComponent);

let DateComponent = class DateComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.defaultMonthListLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.defaultMonthListShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.defaultWeekDay = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
        this.columnCalculate = '';
        this.objKeys = Object.keys;
        this.calendarIndex = 0;
        this.haveChange = false;
        this.animateProcess();
    }
    ngOnInit() {
        if (this.fieldCreation.monthListLong === undefined) {
            this.fieldCreation.monthListLong = this.defaultMonthListLong;
        }
        if (this.fieldCreation.monthListShort === undefined) {
            this.fieldCreation.monthListShort = this.defaultMonthListShort;
        }
        if (this.fieldCreation.weekDay === undefined) {
            this.fieldCreation.weekDay = this.defaultWeekDay;
        }
        if (this.fieldCreation.yearOffset === undefined) {
            this.fieldCreation.yearOffset = 0;
        }
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
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == 'string') {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [{
                        display: "",
                        value: ""
                    }];
            }
        }
        for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
            if (String(this.data[this.fieldCreation.fieldName][dataIndex].value).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
                this.setDisplay(dataIndex);
            }
        }
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            let regexp = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexp = new RegExp(this.fieldCreation.valuePattern);
            }
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexp)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    }
    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.haveChange = true;
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
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
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            let combineValue = this.tempValue + key;
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
        let calendarRef = this.calendarVC.toArray();
        calendarRef[this.calendarIndex].closeCalendar();
        if (this.haveChange) {
            let regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)) {
                event.target.focus();
                validate = false;
            }
            else {
                if (this.fieldCreation.inputDatePattern) {
                    let dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].display.split(/(-|\s|\/)/);
                    let patternSplit = this.fieldCreation.inputDatePattern.toLowerCase().split(/(-|\s|\/)/);
                    let year = 0;
                    let month = 0;
                    let day = 0;
                    for (let dataTypeIndex in patternSplit) {
                        if (patternSplit[dataTypeIndex].substr(0, 1) === "y") {
                            if (this.fieldCreation.inputYearOffset) {
                                year = parseInt(dataSplit[dataTypeIndex]) + parseInt(this.fieldCreation.inputYearOffset);
                            }
                            else {
                                year = parseInt(dataSplit[dataTypeIndex]);
                            }
                        }
                        if (patternSplit[dataTypeIndex].substr(0, 1) === "m") {
                            month = parseInt(dataSplit[dataTypeIndex]) - 1;
                        }
                        if (patternSplit[dataTypeIndex].substr(0, 1) === "d") {
                            day = parseInt(dataSplit[dataTypeIndex]);
                        }
                    }
                    let dateCheck = new Date(year, month, day);
                    let dateString = dateCheck.getFullYear() + "-" + (dateCheck.getMonth() + 1) + "-" + dateCheck.getDate();
                    this.data[this.fieldCreation.fieldName][dataIndex].value = dateString;
                }
                else {
                    this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display;
                }
                this.setDisplay(dataIndex);
                this.haveChange = false;
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    processCall(data) {
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
    setDate(event, dataIndex) {
        let dateString = event.year + '-' + this.pad((event.month + 1), 2) + '-' + this.pad(event.day, 2);
        this.data[this.fieldCreation.fieldName][dataIndex] = {
            display: dateString,
            value: dateString
        };
        if (this.fieldCreation.displayFormat) {
            this.setDisplay(dataIndex);
        }
    }
    setDisplay(dataIndex) {
        let dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].value.split("-");
        let dateSet = {
            year: parseInt(dataSplit[0]),
            month: (parseInt(dataSplit[1]) - 1),
            day: parseInt(dataSplit[2]),
        };
        let dateString = this.fieldCreation.displayFormat;
        let valueString = dateSet.year + '-' + this.pad((dateSet.month + 1), 2) + '-' + this.pad(dateSet.day, 2);
        if (dateString.indexOf("DD") > -1) {
            let stringDD = this.pad(dateSet.day, 2);
            dateString = dateString.replace("DD", stringDD);
        }
        else if (dateString.indexOf("D") > -1) {
            let stringD = String(dateSet.day);
            dateString = dateString.replace("D", stringD);
        }
        if (dateString.indexOf("MMMM") > -1) {
            let stringMMMM = this.fieldCreation.monthListLong[dateSet.month];
            dateString = dateString.replace("MMMM", stringMMMM);
        }
        else if (dateString.indexOf("MMM") > -1) {
            let stringMMM = this.fieldCreation.monthListShort[dateSet.month];
            dateString = dateString.replace("MMM", stringMMM);
        }
        else if (dateString.indexOf("MM") > -1) {
            let stringMM = this.pad((dateSet.month + 1), 2);
            dateString = dateString.replace("MM", stringMM);
        }
        else if (dateString.indexOf("M") > -1) {
            let stringM = String(dateSet.month + 1);
            dateString = dateString.replace("M", stringM);
        }
        if (dateString.indexOf("YYYY") > -1) {
            let stringYYYY = String(dateSet.year + this.fieldCreation.yearOffset);
            dateString = dateString.replace("YYYY", stringYYYY);
        }
        else if (dateString.indexOf("YY") > -1) {
            let stringYY = String(dateSet.year + this.fieldCreation.yearOffset).substr(2, 2);
            dateString = dateString.replace("YY", stringYY);
        }
        this.data[this.fieldCreation.fieldName][dataIndex] = {
            display: dateString,
            value: valueString
        };
    }
    pad(n, width, z = '0') {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    getDateDisable() {
        if (this.getDisable() ||
            (((this.fieldCreation.yearOffset && this.fieldCreation.yearOffset != 0) ||
                (this.fieldCreation.displayFormat && this.fieldCreation.displayFormat != "YYYY-MM-DD")) &&
                (!this.fieldCreation.valuePattern || !this.fieldCreation.inputDatePattern))) {
            return true;
        }
        return false;
    }
    setFocus(data) {
        let inputRef = this.dateInputVC.toArray();
        inputRef[this.calendarIndex].nativeElement.focus();
    }
    openCalendar(data, index) {
        this.calendarIndex = index;
        let calendarRef = this.calendarVC.toArray();
        let inputRef = this.dateInputVC.toArray();
        calendarRef[index].open(data);
        inputRef[index].nativeElement.focus();
    }
};
DateComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    ViewChildren('dateInput'),
    __metadata("design:type", QueryList)
], DateComponent.prototype, "dateInputVC", void 0);
__decorate([
    ViewChildren('datePicker'),
    __metadata("design:type", QueryList)
], DateComponent.prototype, "calendarVC", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DateComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DateComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DateComponent.prototype, "panelCallBack", void 0);
DateComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex].value == '' ? 'require' : ''}}\">\r\n                <input type=\"textbox\" #dateInput\r\n                       class=\"dateWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                       [readonly]=\"getDateDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div class=\"dateToggle{{getDisable() ? ' disable' : ' enable'}}\"\r\n                     (click)=\"!getDisable() ? openCalendar(data[fieldCreation.fieldName][dataIndex].value, dataIndex) : null\"><span class=\"glyphicon glyphicon-calendar\"></span></div>\r\n                <lb9-date-picker #datePicker\r\n                                 (setDate)=\"setDate($event,dataIndex)\"\r\n                                 (inputFocus)=\"setFocus($event,dataIndex)\"\r\n                                 [monthListLong]=\"fieldCreation.monthListLong\"\r\n                                 [monthListShort]=\"fieldCreation.monthListShort\"\r\n                                 [weekDay]=\"fieldCreation.weekDay\"\r\n                                 [showToday]=\"fieldCreation.showToday\"\r\n                                 [todayText]=\"fieldCreation.todayText\"\r\n                                 [closeOnDateSelect]=\"fieldCreation.closeOnDateSelect\"\r\n                                 [yearOffset]=\"fieldCreation.yearOffset\"></lb9-date-picker>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\"\r\n                     class=\"deleteBtnWithDate\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\"\r\n             (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], DateComponent);

let ButtonIconComponent = class ButtonIconComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
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
    }
    processClick(event, action, dataIndex, valueList) {
        if (!this.getDisable()) {
            if (typeof (this.data[this.fieldCreation.fieldName]) != 'undefined' && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != 'undefined') {
                this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                valueList: valueList,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
};
ButtonIconComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonIconComponent.prototype, "panelCallBack", void 0);
ButtonIconComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n\r\n        <div class=\"icon {{(getDisable() ? 'icon-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n             (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n             (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], ButtonIconComponent);

let ColorSelectComponent = class ColorSelectComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                if (this.fieldCreation.fieldName.valueList) {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.fieldName.valueList[0].value];
                }
                else {
                    this.data[this.fieldCreation.fieldName] = [null];
                }
            }
        }
    }
    assignColor(color, dataIndex) {
        this.data[this.fieldCreation.fieldName][dataIndex] = color;
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push("");
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
};
ColorSelectComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "panelCallBack", void 0);
ColorSelectComponent = __decorate([
    Component({
        selector: 'lb9-color-select',
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\n    <lb9-dynamic-form-label-panel\n            [fieldCreation]=\"fieldCreation\"\n            [option]=\"option\"\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\n                <div *ngFor=\"let colorList of fieldCreation.valueList\" class=\"colorSelect {{data[fieldCreation.fieldName][dataIndex] === colorList.value ? ' colorSelected': ''}}\" [style]=\"{background:colorList.value}\" (click)=\"assignColor(colorList.value, dataIndex)\">\n\n                </div>\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\n            </div>\n        </ng-container>\n        <div class=\"dp2Note\">\n            {{fieldCreation.note}}\n        </div>\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\n                class=\"glyphicon glyphicon-plus\"></span></div>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], ColorSelectComponent);

let DynamicInputComponent = class DynamicInputComponent {
    constructor(componentFactoryResolver, animationService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.animationService = animationService;
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.componentTypes = {
            'textBox': TextBoxComponent,
            'textArea': TextAreaComponent,
            'label': LabelComponent,
            'checkBox': CheckBoxComponent,
            'colorSelect': ColorSelectComponent,
            'selectBox': SelectBoxComponent,
            'hidden': HiddenComponent,
            'fileUpload': FileUploadComponent,
            'image': ImageComponent,
            'autoComplete': AutoCompleteComponent,
            'button': ButtonComponent,
            'buttonIcon': ButtonIconComponent,
            'swappingBox': SwappingBoxComponent,
            'mapValue': MapValueComponent,
            'radio': RadioComponent,
            'date': DateComponent,
            'number': TextBoxComponent,
            'password': TextBoxComponent,
        };
    }
    ngOnInit() {
        this.createComponent();
    }
    createComponent() {
        let component;
        if (typeof (this.type) == 'undefined' || typeof (this.componentTypes[this.type]) == 'undefined') {
            component = LabelComponent;
        }
        else {
            component = this.componentTypes[this.type];
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let componentRef = this.inputComp.viewContainerRef.createComponent(componentFactory);
        this.instantInput = componentRef.instance;
        this.instantInput.data = this.data;
        this.instantInput.type = this.type;
        this.instantInput.rowIndex = this.rowIndex;
        this.instantInput.option = this.option;
        this.instantInput.fieldCreation = this.fieldCreation;
        let callBack = this.callBack;
        this.instantInput.callBack.subscribe(function (input) {
            callBack.emit(input);
        });
        let panelCallBack = this.panelCallBack;
        let inputIndex = this.inputIndex;
        this.instantInput.panelCallBack.subscribe(function (input) {
            let eventData = Object.assign(input, {
                fieldIndex: inputIndex
            });
            panelCallBack.emit(eventData);
        });
    }
    processCall(data) {
        this.instantInput.processCall(data);
    }
};
DynamicInputComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: AnimationService }
];
__decorate([
    ViewChild(InputComponent, { static: true }),
    __metadata("design:type", InputComponent)
], DynamicInputComponent.prototype, "inputComp", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "type", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicInputComponent.prototype, "panelCallBack", void 0);
DynamicInputComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-input',
        template: "<lb9-input></lb9-input>\r\n\r\n"
    }),
    __metadata("design:paramtypes", [ComponentFactoryResolver, AnimationService])
], DynamicInputComponent);

let DynamicContainerComponent = class DynamicContainerComponent {
    constructor() {
        this.reRenderField = [];
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.emitFieldSelect = false;
        this.objKey = Object.keys;
    }
    ngOnInit() {
        if (typeof (this.containerCreation.columnSpan) != "undefined") {
            let calculateString = this.containerCreation.columnSpan.split("/");
            let size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
            if (calculateString[1] == 1) {
                this.widthCalculator = size + "%";
            }
            else {
                this.widthCalculator = "calc(" + size + "% - 2px)";
            }
        }
        else {
            this.widthCalculator = "100%";
        }
    }
    processCallBack(event) {
        event.rowIndex = this.actionDataIndex;
        this.callBack.emit(event);
    }
    processPanelCallBack(event) {
        this.emitFieldSelect = true;
        let dataEvent = Object.assign(event, {
            containerIndex: this.containerIndex
        });
        this.panelCallBack.emit(dataEvent);
        timer(200).subscribe(() => {
            this.emitFieldSelect = false;
        });
    }
    callPanelCallBack(event) {
        if (!this.emitFieldSelect) {
            this.panelCallBack.emit({
                fieldName: null,
                fieldIndex: null,
                containerIndex: this.containerIndex
            });
        }
    }
    getDynamicInput(inputIndex) {
        let inputComponent = this.inputChild.find(instantInput => instantInput.inputIndex == inputIndex);
        return inputComponent;
    }
    checkReRender(fieldName) {
        if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
            return false;
        }
        return true;
    }
};
__decorate([
    ViewChildren(DynamicInputComponent),
    __metadata("design:type", QueryList)
], DynamicContainerComponent.prototype, "inputChild", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "containerCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "actionDataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "containerIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "reRenderField", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "panelCallBack", void 0);
DynamicContainerComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-container',
        template: "<div class=\"fieldContainer {{containerCreation.customClass ? containerCreation.customClass : ''}}\" [style.width]=\"widthCalculator\" id=\"{{containerCreation.containerName}}\" (click)=\"callPanelCallBack($event)\">\r\n    <ng-container *ngIf=\"containerCreation.fieldList\">\r\n        <ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n            <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n                <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                                   [data]=\"data[actionDataIndex]\"\r\n                                   [rowIndex]=\"actionDataIndex\"\r\n                                   [inputIndex]=\"inputData\"\r\n                                   [option]=\"option\"\r\n                                   [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                                   (callBack)=\"processCallBack($event)\"\r\n                                   (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n            </ng-container>\r\n        </ng-container>\r\n    </ng-container>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicContainerComponent);

let DynamicFormRowComponent = class DynamicFormRowComponent {
    constructor() {
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
    }
    ngOnInit() {
    }
    processCallBack(event) {
        this.callBack.emit(event);
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }
};
__decorate([
    ViewChildren(DynamicContainerComponent),
    __metadata("design:type", QueryList)
], DynamicFormRowComponent.prototype, "containerListRef", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "containerList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "_reRenderFieldList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormRowComponent.prototype, "panelCallBack", void 0);
DynamicFormRowComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-form-row',
        template: "<ng-container *ngIf=\"containerList\">\r\n  <ng-container *ngFor=\"let containerIndex of objKey(containerList)\">\r\n    <lb9-dynamic-container\r\n            [containerCreation]=\"containerList[containerIndex]\"\r\n            [data]=\"data\"\r\n            [actionDataIndex]=\"rowIndex\"\r\n            [containerIndex]=\"containerIndex\"\r\n            [option]=\"option\"\r\n            [reRenderField]=\"_reRenderFieldList\"\r\n            (callBack)=\"processCallBack($event)\"\r\n            (panelCallBack)=\"processPanelCallBack($event)\">\r\n\r\n    </lb9-dynamic-container>\r\n  </ng-container>\r\n</ng-container>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicFormRowComponent);

let DynamicContainerTableComponent = class DynamicContainerTableComponent {
    constructor() {
        this.reRenderField = [];
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
    }
    ngOnInit() {
        if (typeof (this.containerCreation.columnSpan) != "undefined") {
            let calculateString = this.containerCreation.columnSpan.split("/");
            let size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
            if (calculateString[1] == 1) {
                this.widthCalculator = size + "%";
            }
            else {
                this.widthCalculator = "calc(" + size + "% - 2px)";
            }
        }
        else {
            this.widthCalculator = "100%";
        }
    }
    processCallBack(event) {
        event.rowIndex = this.actionDataIndex;
        this.callBack.emit(event);
    }
    processPanelCallBack(event) {
        let dataEvent = Object.assign(event, {
            containerIndex: this.containerIndex
        });
        this.panelCallBack.emit(dataEvent);
    }
    getDynamicInput(inputIndex) {
        let inputComponent = this.inputChild.find(instantInput => instantInput.inputIndex == inputIndex);
        return inputComponent;
    }
    checkReRender(fieldName) {
        if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
            return false;
        }
        return true;
    }
    deleteRow(actionDataIndex) {
        this.callBack.emit({
            action: "deleteRow",
            rowIndex: actionDataIndex
        });
    }
};
__decorate([
    ViewChildren(DynamicInputComponent),
    __metadata("design:type", QueryList)
], DynamicContainerTableComponent.prototype, "inputChild", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "containerCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "actionDataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "containerIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "reRenderField", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "panelCallBack", void 0);
DynamicContainerTableComponent = __decorate([
    Component({
        selector: '[lb9-dynamic-container-table]',
        template: "<ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n    <td *ngIf=\"containerCreation.fieldList[inputData].type != 'hidden'\">\r\n        <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n            <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                               [data]=\"data[actionDataIndex]\"\r\n                               [rowIndex]=\"actionDataIndex\"\r\n                               [inputIndex]=\"inputData\"\r\n                               [option]=\"option\"\r\n                               [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                               (callBack)=\"processCallBack($event)\"\r\n                               (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n        </ng-container>\r\n    </td>\r\n</ng-container>\r\n\r\n<td *ngIf=\"option.deleteRow\">\r\n     <span *ngIf=\"!option.disableDelete || (option.disableDelete && !option.disableDelete[actionDataIndex])\"\r\n           class=\"btn-action delete\" id=\"delete_{{actionDataIndex}}\"\r\n           (click)=\"deleteRow(actionDataIndex)\"><abbr title=\"{{option.deleteRowText}}\"><span\r\n             class=\"glyphicon glyphicon-remove-circle\"></span></abbr></span>\r\n</td>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicContainerTableComponent);

let DynamicFormComponent = class DynamicFormComponent {
    constructor(animationService) {
        this.animationService = animationService;
        this.actionDataIndex = 0;
        this.defaultData = {};
        this.showForm = false;
        this.option = {};
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.frameHeader = [];
        this.objKey = Object.keys;
        this.fieldLabelList = [];
        this._reRenderFieldList = [];
        this.refinedContainerTableMode = [];
        this.tempDeleteData = [];
        this.onDeleteProcess = false;
        this.tempAddData = [];
        this.onAddProcess = false;
        this.setDataQueue = [];
        this.duplicateQueue = [];
        this.savePoint = {};
        this.startMilliseconds = null;
    }
    ngOnInit() {
        this.verifyField();
        // console.log("form>>",this.formCreation);
        this.formCreation.form.option = Object.assign(this.option, this.formCreation.form.option);
        this.getDefault();
        this.compareModel();
        if (this.formCreation.form.option.frame == true) {
            this.generateFrameHeader();
        }
        this.getFieldLabel();
        if (this.formCreation.form.option.displayMode == 'table') {
            this.refineContainerTableMode();
        }
        this.animationService.setEnableAnimation(this.formCreation.form.option.enableAnimation);
    }
    compareModel() {
        if (this.model) {
            for (let containerIndex in this.formCreation.form.containerList) {
                let containerData = this.formCreation.form.containerList[containerIndex];
                for (let fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].modelName && this.model[containerData.fieldList[fieldIndex].modelName]) {
                        let modelData = this.model[containerData.fieldList[fieldIndex].modelName];
                        for (let attribute in modelData) {
                            if (containerData.fieldList[fieldIndex][attribute] == undefined || containerData.fieldList[fieldIndex][attribute] == null) {
                                containerData.fieldList[fieldIndex][attribute] = modelData[attribute];
                            }
                        }
                    }
                }
            }
        }
    }
    verifyField() {
        let fieldList = this.getFieldList();
        let check = true;
        for (let fieldName of fieldList) {
            for (let dataIndex in this.formCreation.data) {
                if (this.formCreation.data[dataIndex][fieldName] == undefined) {
                    check = false;
                    console.error('Dynamic form error field data not exists: \'' + fieldName + '\' data row: ' + dataIndex);
                }
            }
        }
        if (check == true) {
            this.showForm = true;
        }
    }
    generateFrameHeader() {
        this.frameHeader = [];
        if (this.formCreation.form.option.frameName != undefined
            && this.formCreation.form.option.frameName != ''
            && Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            this.frameHeader = this.formCreation.form.option.frameName;
        }
        else if (this.formCreation.form.option.frameName != undefined
            && this.formCreation.form.option.frameName != ''
            && !Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.data.length == 1) {
            this.frameHeader[0] = this.formCreation.form.option.frameName;
        }
        else if (this.formCreation.form.option.frameName != undefined
            && this.formCreation.form.option.frameName != ''
            && !Array.isArray(this.formCreation.form.option.frameName)
            && this.formCreation.data.length > 1) {
            let count = 0;
            for (let dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = String(this.formCreation.form.option.frameName) + String(count);
            }
            //return this.formCreation.form.option.frameName + (parseInt(rowIndex)+1);
        }
        else {
            let count = 0;
            for (let dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = 'Form ' + String(count);
            }
            //return "Form " +(parseInt(rowIndex)+1);
        }
    }
    processCallBack(event) {
        if (event.action == 'deleteRow') {
            this.deleteRow(event.rowIndex);
        }
        else {
            timer(100).subscribe(() => {
                this.callBack.emit(event);
            });
        }
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }
    getDefault() {
        let setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            for (let container of this.formCreation.form.containerList) {
                for (let fieldCreation of container.fieldList) {
                    if (fieldCreation.type != 'checkBox') {
                        if (typeof (fieldCreation.default) != 'undefined') {
                            if (Array.isArray(fieldCreation.default)) {
                                if (setValueType.indexOf(fieldCreation.type) == -1) {
                                    this.defaultData[fieldCreation.fieldName] = Object.assign([], fieldCreation.default);
                                }
                                else {
                                    let defaultSet = [];
                                    for (const checkValue of fieldCreation.default) {
                                        if (!checkValue.display || !checkValue.value) {
                                            defaultSet.push({
                                                display: checkValue,
                                                value: checkValue
                                            });
                                        }
                                        else {
                                            defaultSet.push(checkValue);
                                        }
                                    }
                                    this.defaultData[fieldCreation.fieldName] = Object.assign([], defaultSet);
                                }
                            }
                            else if (typeof (fieldCreation.default) == 'string') {
                                if (setValueType.indexOf(fieldCreation.type) == -1) {
                                    this.defaultData[fieldCreation.fieldName] = Object.assign([], [fieldCreation.default]);
                                }
                                else {
                                    if (!fieldCreation.default.display || !fieldCreation.default.value) {
                                        this.defaultData[fieldCreation.fieldName] = Object.assign([], [{
                                                display: fieldCreation.default,
                                                value: fieldCreation.default
                                            }]);
                                    }
                                    else {
                                        this.defaultData[fieldCreation.fieldName] = Object.assign([], [fieldCreation.default]);
                                    }
                                }
                            }
                        }
                        else {
                            if (setValueType.indexOf(fieldCreation.type) > -1) {
                                this.defaultData[fieldCreation.fieldName] = Object.assign([], [{
                                        display: '',
                                        value: ''
                                    }]);
                            }
                            else {
                                this.defaultData[fieldCreation.fieldName] = Object.assign([], ['']);
                            }
                        }
                    }
                    else {
                        if (typeof (fieldCreation.default) == 'object') {
                            this.defaultData[fieldCreation.fieldName] = Object.assign({}, fieldCreation.default);
                        }
                        else {
                            let defaultVal = {};
                            for (let valueListData of fieldCreation.valueList) {
                                defaultVal[valueListData.value] = false;
                            }
                            this.defaultData[fieldCreation.fieldName] = Object.assign({}, defaultVal);
                        }
                    }
                }
            }
        }
        return this.defaultData;
    }
    reRenderForm() {
        this.getDefault();
        this.compareModel();
        this.refineContainerTableMode();
        if (this.formCreation.form.option.frame == true) {
            this.generateFrameHeader();
        }
        ;
        this.getFieldLabel();
        if (this.formCreation.form.option.displayMode == 'table') {
            this.refineContainerTableMode();
        }
        ;
        this.showForm = false;
        this.animationService.setOnReRender(true);
        interval(100).pipe(takeWhile(() => !this.showForm))
            .subscribe(() => {
            this.showForm = true;
            this.animationService.setOnReRender(false);
            // console.log(this.formCreation);
        });
    }
    reRenderField(fieldArray, rowIndex = 0) {
        if (!Array.isArray(fieldArray)) {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, [fieldArray]);
        }
        else {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, fieldArray);
        }
        interval(100).pipe(takeWhile(() => this._reRenderFieldList != null))
            .subscribe(() => {
            // console.log("check");
            let checkFlag = true;
            for (let fieldName of this._reRenderFieldList) {
                let getFieldElement = this.getDynamicInput(fieldName, rowIndex);
                if (getFieldElement != null) {
                    // console.log("Still Found: "+fieldName,getFieldElement);
                    checkFlag = false;
                }
            }
            if (checkFlag) {
                this._reRenderFieldList = [];
            }
            // console.log(this.formCreation);
        });
    }
    setFieldAttribute(fieldName, attributeName, attributeValue) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName] = attributeValue;
                }
            }
        }
    }
    setContainerAttribute(containerName, attributeName, attributeValue) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            if (containerData.containerName == containerName) {
                this.formCreation.form.containerList[containerIndex][attributeName] = attributeValue;
            }
        }
    }
    getFieldAttribute(fieldName, attributeName) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName];
                }
            }
        }
    }
    setDataValue(fieldName, rowIndex, value, multi = false) {
        if (this.formCreation.data[rowIndex] != undefined) {
            this.setDataProcess(fieldName, rowIndex, value, multi);
        }
        else {
            this.setDataQueue.push({
                fieldName: fieldName,
                rowIndex: rowIndex,
                value: value,
                multi: multi
            });
            this.onFormReady(rowIndex + 1).subscribe((data) => {
                if (data.status == 'ready') {
                    while (this.setDataQueue.length > 0) {
                        let setDataSet = this.setDataQueue.shift();
                        this.setDataProcess(setDataSet.fieldName, setDataSet.rowIndex, setDataSet.value, setDataSet.multi);
                    }
                }
                else {
                    console.error('Dynamic form row number ' + rowIndex + ' didn\'t create. Can\'t set data.');
                }
            });
        }
    }
    setDataProcess(fieldName, rowIndex, value, multi = false) {
        let fieldType = this.getFieldType(fieldName);
        if (multi == false && fieldType != 'checkBox' && fieldType != 'fileUpload' && fieldType != 'image') {
            if (Array.isArray(value)) {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
            }
            else {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], [value]);
            }
        }
        else {
            if (Array.isArray(value)) {
                this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
            }
            else {
                this.formCreation.data[rowIndex][fieldName] = Object.assign({}, value);
            }
        }
    }
    getFieldType(fieldName) {
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex].type;
                }
            }
        }
    }
    getDataValue(fieldName, rowIndex, dataIndex = null) {
        if (typeof (this.formCreation) != 'undefined') {
            if (typeof (this.formCreation.data[rowIndex]) == 'undefined') {
                return 'Row index not exits.';
            }
            if (typeof (this.formCreation.data[rowIndex][fieldName]) == 'undefined') {
                return 'Field name not exits: ' + fieldName;
            }
            if (dataIndex == null) {
                let dataType;
                if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                    dataType = [];
                }
                else {
                    dataType = {};
                }
                let dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                return dataClone;
            }
            else if (this.formCreation.data[rowIndex][fieldName]) {
                if (typeof (this.formCreation.data[rowIndex][fieldName][dataIndex]) == 'undefined') {
                    return 'Date index not exits in field ' + fieldName + ': ' + dataIndex;
                }
                else {
                    let dataType;
                    if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                        dataType = [];
                    }
                    else {
                        dataType = {};
                    }
                    let dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                    return dataClone[dataIndex];
                }
            }
        }
    }
    getDynamicInput(fieldName, rowIndex = 0) {
        let formRowRef = null;
        let containerListRef = null;
        if (this.formCreation.form.option.displayMode == 'table') {
            formRowRef = this.formTableRow.toArray();
            containerListRef = formRowRef[rowIndex];
        }
        else {
            formRowRef = this.formRow.toArray();
            if (formRowRef[rowIndex]) {
                containerListRef = formRowRef[rowIndex].containerListRef;
            }
        }
        if (containerListRef) {
            for (let containerIndex in this.formCreation.form.containerList) {
                let containerData = this.formCreation.form.containerList[containerIndex];
                for (let fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                        let fieldType = containerData.fieldList[fieldIndex].type;
                        let container = null;
                        if (this.formCreation.form.option.displayMode == 'table') {
                            container = containerListRef;
                        }
                        else {
                            container = containerListRef.find(instantContainer => instantContainer.containerIndex == containerIndex);
                        }
                        if (container != undefined) {
                            let input = container.getDynamicInput(fieldIndex);
                            if (fieldType == 'hidden' && this.formCreation.form.option.displayMode == 'table' && input == undefined) {
                                return {
                                    type: 'hidden'
                                };
                            }
                            else {
                                return input;
                            }
                        }
                        return null;
                    }
                }
            }
        }
    }
    mapSetAttribute(attributeObject) {
        for (let fieldName in attributeObject) {
            for (let attribute in attributeObject[fieldName]) {
                this.setFieldAttribute(fieldName, attribute, attributeObject[fieldName][attribute]);
            }
        }
    }
    mapSetValue(valueObject, rowIndex) {
        for (let fieldName in valueObject) {
            const type = this.getFieldAttribute(fieldName, "type");
            let valueData = (valueObject[fieldName] == null || (valueObject[fieldName] == '' && typeof (valueObject[fieldName]) != "object") ? '' : valueObject[fieldName]);
            if (type === "autoComplete") {
                let valueSetObject = [];
                if (isString(valueData) || isNumber(valueData)) {
                    let input = this.getDynamicInput(fieldName);
                    let getExistsData = input.instantInput.getDataFromValue(valueData);
                    if (getExistsData) {
                        valueSetObject.push(getExistsData);
                    }
                    else {
                        valueSetObject.push({
                            display: valueData,
                            value: valueData
                        });
                    }
                }
                else {
                    if (isArray(valueData)) {
                        let check = true;
                        for (let valueRow of valueData) {
                            if (!valueRow.display || !valueRow.value) {
                                check = false;
                                break;
                            }
                        }
                        if (check) {
                            valueSetObject = valueData;
                        }
                        else {
                            console.error("Set Pattern Incorrect");
                            valueSetObject = [
                                {
                                    display: '',
                                    value: ''
                                }
                            ];
                        }
                    }
                    else {
                        if (valueData.display && valueData.value) {
                            valueSetObject.push(valueData);
                        }
                        else {
                            console.error("Set Pattern Incorrect");
                            valueSetObject = [
                                {
                                    display: '',
                                    value: ''
                                }
                            ];
                        }
                    }
                }
                this.setDataValue(fieldName, rowIndex, valueSetObject);
            }
            else {
                this.setDataValue(fieldName, rowIndex, valueData);
            }
        }
    }
    mapGetValue(valueObject, rowIndex) {
        var mapValue = Object.assign({}, valueObject);
        for (let mapFieldName in mapValue) {
            if (typeof (mapValue[mapFieldName]) == 'string') {
                let dataTypeSplit = mapValue[mapFieldName].split(':');
                let dataType = (typeof (dataTypeSplit[1]) != 'undefined' ? dataTypeSplit[1] : '');
                let dataFieldDetail = dataTypeSplit[0].split('.');
                let fieldName = dataFieldDetail.shift();
                let type = this.getFieldAttribute(fieldName, 'type');
                let normalType = [
                    'colorSelect',
                    'textBox',
                    'textArea',
                    'label',
                    'hidden',
                    'number'
                ];
                let dropDownType = [
                    'selectBox',
                    'radio'
                ];
                let setValueType = [
                    'autoComplete',
                    'swappingBox',
                    'mapValue'
                ];
                let fileValueType = [
                    'fileUpload',
                    'image'
                ];
                let checkBoxValueType = [
                    'checkBox'
                ];
                let dateValueType = [
                    'date'
                ];
                if (normalType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                    }
                    else if (data.length > 1) {
                        mapValue[mapFieldName] = data;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (dropDownType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let setType = dataFieldDetail.pop();
                    if (data.length == 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                        }
                        else {
                            let value = data.shift();
                            let valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            for (let valueListRow of valueListAttribute) {
                                if (valueListRow.value == value) {
                                    mapValue[mapFieldName] = valueListRow.display;
                                    break;
                                }
                            }
                        }
                    }
                    else if (data.length > 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = data;
                        }
                        else {
                            let displayList = [];
                            let valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            for (let dataRow of data) {
                                let value = dataRow;
                                for (let valueListRow of valueListAttribute) {
                                    if (valueListRow.value == value) {
                                        displayList.push(valueListRow.display);
                                        break;
                                    }
                                }
                            }
                            mapValue[mapFieldName] = displayList;
                        }
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (setValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let setType = dataFieldDetail.pop();
                    if (setType != 'value' && setType != 'display' && setType != 'all') {
                        setType = 'value';
                    }
                    if (data.length == 1) {
                        let dataShift = data.shift();
                        if (setType != 'all') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, dataShift[setType]);
                        }
                        else {
                            mapValue[mapFieldName] = {
                                display: dataShift['display'],
                                value: dataShift['value']
                            };
                        }
                    }
                    else if (data.length > 1) {
                        let dataArray = [];
                        for (let dataIndex in data) {
                            if (setType != 'all') {
                                dataArray.push(data[dataIndex][setType]);
                            }
                            else {
                                dataArray.push({
                                    display: data[dataIndex]['display'],
                                    value: data[dataIndex]['value'],
                                });
                            }
                        }
                        mapValue[mapFieldName] = dataArray;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (fileValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let fileArray = [];
                    for (let i = 0; i < data["selectFile"].length; i++) {
                        fileArray.push(data["selectFile"][i]);
                    }
                    if (fileArray.length == 1) {
                        mapValue[mapFieldName] = this.convertDataType(dataType, fileArray[0]);
                    }
                    else if (fileArray.length > 1) {
                        mapValue[mapFieldName] = fileArray;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (checkBoxValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    let valueList = this.getFieldAttribute(fieldName, 'valueList');
                    let setType = dataFieldDetail.pop();
                    if (Object.keys(data).length > 0) {
                        if (setType != 'value' && setType != 'display' && setType != 'all') {
                            mapValue[mapFieldName] = data;
                        }
                        else if (setType == 'display') {
                            let returnValue = [];
                            for (let valueListRow of valueList) {
                                if (data[valueListRow.value] == true) {
                                    returnValue.push(valueListRow.display);
                                }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            }
                            else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else if (setType == 'value') {
                            let returnValue = [];
                            for (let valueListRow of valueList) {
                                if (data[valueListRow.value] == true) {
                                    returnValue.push(valueListRow.value);
                                }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            }
                            else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else if (setType == 'all') {
                            let returnValue = [];
                            for (let valueListRow of valueList) {
                                if (data[valueListRow.value] == true) {
                                    returnValue.push({
                                        display: valueListRow.display,
                                        value: valueListRow.value,
                                        checked: true
                                    });
                                }
                                else {
                                    returnValue.push({
                                        display: valueListRow.display,
                                        value: valueListRow.value,
                                        checked: false
                                    });
                                }
                            }
                            mapValue[mapFieldName] = returnValue;
                        }
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (dateValueType.indexOf(type) > -1) {
                    let data = this.getDataValue(fieldName, rowIndex);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = data.shift().value;
                    }
                    else if (data.length > 1) {
                        let dateList = [];
                        for (let dataRow in data) {
                            dateList.push(data[dataRow].value);
                        }
                        mapValue[mapFieldName] = dateList;
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
            }
        }
        return mapValue;
    }
    convertDataType(dataType, data) {
        if (dataType == 'string' && !isString(data)) {
            return data.toString();
        }
        else if (dataType == 'int' && !isNumber(data)) {
            let returnData = parseInt(data);
            return (isNaN(returnData) ? 0 : returnData);
        }
        else if (dataType == 'float' && !isNumber(data)) {
            let returnData = parseFloat(data);
            return (isNaN(returnData) ? 0 : returnData);
        }
        else if (dataType == 'bool' && isString(data) && (data.toLowerCase() == 'true' || data.toLowerCase() == 'false')) {
            let returnData = (data == 'true');
            return returnData;
        }
        else {
            return data;
        }
    }
    checkRequireField(rowIndex) {
        let setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        let fileValueType = [
            'fileUpload',
            'image'
        ];
        let fieldList = this.getFieldList();
        let requireStatus = true;
        for (let fieldName of fieldList) {
            let fieldRequireAttribute = this.getFieldAttribute(fieldName, 'require');
            let fieldType = this.getFieldAttribute(fieldName, 'type');
            if (typeof (fieldRequireAttribute) != 'undefined' && fieldRequireAttribute == true) {
                let fieldData = this.getDataValue(fieldName, rowIndex);
                if (isArray(fieldData)) {
                    if (setValueType.indexOf(fieldType) > -1) {
                        for (let fieldDataRow in fieldData) {
                            if ((fieldData[fieldDataRow]["value"] == null || fieldData[fieldDataRow]["value"] == '')
                                && (fieldData[fieldDataRow]["display"] == null || fieldData[fieldDataRow]["display"] == '')) {
                                requireStatus = false;
                                break;
                            }
                        }
                    }
                    else {
                        for (let fieldDataRow in fieldData) {
                            if (fieldData[fieldDataRow] == null || fieldData[fieldDataRow] == '') {
                                requireStatus = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (setValueType.indexOf(fieldType) > -1) {
                        if ((fieldData["value"] == null || fieldData["value"] == '')
                            && (fieldData["display"] == null || fieldData["display"] == '')) {
                            requireStatus = false;
                        }
                    }
                    else if (fileValueType.indexOf(fieldType) > -1) {
                        ;
                        if (!fieldData["selectFile"].length || fieldData["selectFile"].length === 0) {
                            requireStatus = false;
                        }
                    }
                    else if (fieldType == 'checkBox') {
                        let haveChecked = false;
                        for (let dataKey in fieldData) {
                            if (fieldData[dataKey] == true) {
                                haveChecked = true;
                                break;
                            }
                        }
                        if (haveChecked == false) {
                            requireStatus = false;
                        }
                    }
                    else {
                        if (fieldData == null || fieldData == '') {
                            requireStatus = false;
                        }
                    }
                }
                if (requireStatus == false) {
                    break;
                }
            }
        }
        return requireStatus;
    }
    checkValidateField(roleIndex) {
        let fieldList = this.getFieldList();
        let checkPatternStatus = true;
        for (let fieldName of fieldList) {
            let fieldValuePattern = this.getFieldAttribute(fieldName, 'valuePattern');
            let fieldType = this.getFieldAttribute(fieldName, 'type');
            if (typeof (fieldValuePattern) != 'undefined') {
                let fieldData = this.getDataValue(fieldName, roleIndex);
                if (isArray(fieldData)) {
                    if (fieldType == 'autoComplete') {
                        for (let fieldDataRow in fieldData) {
                            if (!String(fieldData[fieldDataRow]["display"]).match(fieldValuePattern)) {
                                checkPatternStatus = false;
                                break;
                            }
                        }
                    }
                    else {
                        for (let fieldDataRow in fieldData) {
                            if (!String(fieldData[fieldDataRow]).match(fieldValuePattern)) {
                                checkPatternStatus = false;
                                break;
                            }
                        }
                    }
                }
                else {
                    if (fieldType == 'autoComplete') {
                        if (!String(fieldData["value"]).match(fieldValuePattern)) {
                            checkPatternStatus = false;
                        }
                    }
                    else {
                        if (!String(fieldData).match(fieldValuePattern)) {
                            checkPatternStatus = false;
                        }
                    }
                }
                if (checkPatternStatus == false) {
                    break;
                }
            }
        }
        return checkPatternStatus;
    }
    getFieldList() {
        let fieldList = [];
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                fieldList.push(containerData.fieldList[fieldIndex].fieldName);
            }
        }
        return fieldList;
    }
    getFieldLabel() {
        let fieldLabel = [];
        for (let containerIndex in this.formCreation.form.containerList) {
            let containerData = this.formCreation.form.containerList[containerIndex];
            for (let fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].type != 'hidden') {
                    fieldLabel.push(containerData.fieldList[fieldIndex].label);
                }
            }
        }
        this.fieldLabelList = fieldLabel;
    }
    getFrameHeader(rowIndex) {
        if (typeof (this.formCreation.form.option.frameName) != 'undefined' && Array.isArray(this.formCreation.form.option.frameName) && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            return this.formCreation.form.option.frameName[rowIndex];
        }
        else if (typeof (this.formCreation.form.option.frameName) != 'undefined' && typeof (this.formCreation.form.option.frameName) != 'undefined' && !Array.isArray(this.formCreation.form.option.frameName)) {
            return this.formCreation.form.option.frameName + (parseInt(rowIndex) + 1);
        }
        else {
            return 'Form ' + (parseInt(rowIndex) + 1);
        }
    }
    getFormRow() {
        if (this.onAddProcess) {
            return this.tempAddData.length;
        }
        else if (this.onDeleteProcess) {
            return this.tempDeleteData.length;
        }
        return this.formCreation.data.length;
    }
    setRowNum(rowNum) {
        let currentRowNum = this.getFormRow();
        if (currentRowNum < rowNum) {
            while (currentRowNum < rowNum) {
                const defaultValue = Object.assign({}, this.getDefault());
                this.formCreation.data.push(defaultValue);
                currentRowNum = this.getFormRow();
            }
        }
        else {
            while (currentRowNum > rowNum) {
                this.formCreation.data.pop();
                currentRowNum = this.getFormRow();
            }
        }
        // this.reRenderForm();
        return this.onFormReady(rowNum);
    }
    addRow(rowIndex = null, sourceAction = null) {
        let rowCount = this.getFormRow();
        let _rowIndex = rowIndex;
        if (rowIndex == null) {
            _rowIndex = this.formCreation.data.length;
        }
        let defaultValue = Object.assign({}, this.getDefault());
        if (!this.onAddProcess) {
            this.tempAddData = this.formCreation.data;
            this.onAddProcess = true;
            this.animationService.setOnReRender(true);
        }
        this.tempAddData.splice(_rowIndex, 0, defaultValue);
        let tempData = [];
        for (let dataRowIndex in this.tempAddData) {
            if (dataRowIndex < _rowIndex) {
                tempData[dataRowIndex] = this.tempAddData[dataRowIndex];
            }
            else if (dataRowIndex >= _rowIndex) {
                tempData[dataRowIndex + rowCount] = this.tempAddData[dataRowIndex];
            }
        }
        this.formCreation.data = tempData;
        if (this.addDataTimer != null) {
            this.addDataTimer.unsubscribe();
        }
        this.addDataTimer = timer(200).subscribe(() => {
            this.formCreation.data = Object.assign([], this.tempAddData);
            this.onAddProcess = false;
            this.animationService.setOnReRender(false);
            this.generateFrameHeader();
        });
        this.callBack.emit({
            action: 'addRow',
            sourceAction: sourceAction,
            rowIndex: _rowIndex
        });
    }
    // deleteRowTest(rowIndex, sourceAction = null) {
    //     let check = true;
    //     if (isArray(rowIndex)) {
    //         for (let rowIndexNum of rowIndex) {
    //             if (this.formCreation.data[rowIndexNum] == undefined) {
    //                 check = false;
    //                 break;
    //             }
    //         }
    //     } else {
    //         if (this.formCreation.data[rowIndex] == undefined) {
    //             check = false;
    //         }
    //     }
    //     if (check) {
    //         if (isArray(rowIndex)) {
    //             rowIndex.sort();
    //             rowIndex.reverse();
    //             for (let rowIndexNum of rowIndex) {
    //                 this.formCreation.data.splice(rowIndexNum, 1);
    //             }
    //         } else {
    //             this.formCreation.data.splice(rowIndex, 1);
    //         }
    //     }
    // }
    deleteRow(rowIndex, sourceAction = null) {
        let check = true;
        if (isArray(rowIndex)) {
            for (let rowIndexNum of rowIndex) {
                if (this.formCreation.data[rowIndexNum] == undefined) {
                    check = false;
                    break;
                }
            }
        }
        else {
            if (this.formCreation.data[rowIndex] == undefined) {
                check = false;
            }
        }
        if (check) {
            let rowCount = this.getFormRow();
            let tempRowList = [];
            let tempEnableRow = [];
            let tempDisableDelete = [];
            let tempDisableList = [];
            let tempDeleteData;
            let tempEnableRowData;
            let tempDisableDeleteData;
            let tempDisableListData;
            for (let dataRowIndex in this.formCreation.data) {
                tempRowList[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.data[dataRowIndex];
                if (this.formCreation.form.option.enableRowIndex != undefined) {
                    tempEnableRow[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.form.option.enableRowIndex[dataRowIndex];
                }
                if (this.formCreation.form.option.disableDelete != undefined) {
                    tempDisableDelete[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.form.option.disableDelete[dataRowIndex];
                }
                if (this.formCreation.form.option.disableList != undefined) {
                    tempDisableList[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.form.option.disableList[dataRowIndex];
                }
            }
            if (!this.onDeleteProcess) {
                tempDeleteData = Object.assign([], this.formCreation.data);
                if (this.formCreation.form.option.enableRowIndex != undefined) {
                    tempEnableRowData = Object.assign([], this.formCreation.form.option.enableRowIndex);
                }
                if (this.formCreation.form.option.disableDelete != undefined) {
                    tempDisableDeleteData = Object.assign([], this.formCreation.form.option.disableDelete);
                }
                if (this.formCreation.form.option.disableList != undefined) {
                    tempDisableListData = Object.assign([], this.formCreation.form.option.disableList);
                }
                this.onDeleteProcess = true;
                this.animationService.setOnReRender(true);
            }
            if (isArray(rowIndex)) {
                rowIndex.sort();
                rowIndex.reverse();
                for (let rowIndexNum of rowIndex) {
                    tempDeleteData.splice(rowIndexNum, 1);
                    if (this.formCreation.form.option.enableRowIndex != undefined) {
                        tempEnableRowData.splice(rowIndexNum, 1);
                    }
                    if (this.formCreation.form.option.disableDelete != undefined) {
                        tempDisableDeleteData.splice(rowIndexNum, 1);
                    }
                    if (this.formCreation.form.option.disableList != undefined) {
                        tempDisableListData.splice(rowIndexNum, 1);
                    }
                }
            }
            else {
                tempDeleteData.splice(rowIndex, 1);
                if (this.formCreation.form.option.enableRowIndex != undefined) {
                    tempEnableRowData.splice(rowIndex, 1);
                }
                if (this.formCreation.form.option.disableDelete != undefined) {
                    tempDisableDeleteData.splice(rowIndex, 1);
                }
                if (this.formCreation.form.option.disableList != undefined) {
                    tempDisableListData.splice(rowIndex, 1);
                }
            }
            this.formCreation.data = tempRowList;
            this.formCreation.form.option.enableRowIndex = tempEnableRow;
            this.formCreation.form.option.disableDelete = tempDisableDelete;
            this.formCreation.form.option.disableList = tempDisableList;
            if (this.deleteDataTimer != null) {
                this.deleteDataTimer = null;
            }
            this.deleteDataTimer = timer(200).subscribe(() => {
                this.formCreation.data = Object.assign([], tempDeleteData);
                this.formCreation.form.option.enableRowIndex = Object.assign([], tempEnableRowData);
                this.formCreation.form.option.disableDelete = Object.assign([], tempDisableDeleteData);
                this.formCreation.form.option.disableList = Object.assign([], tempDisableListData);
                this.onDeleteProcess = false;
                this.animationService.setOnReRender(false);
                this.generateFrameHeader();
            });
        }
        this.generateFrameHeader();
        // this.reRenderForm();
        // Observable.timer(400).subscribe(() => {
        //     let fieldList = this.getFieldList();
        //     for (let fieldName of fieldList) {
        //         let tempData = Object.assign([],this.formCreation.data[rowIndex][fieldName]);
        //         console.log(tempData);
        //         this.formCreation.data[rowIndex][fieldName] = Object.assign([],this.defaultData[fieldName]);
        //         this.formCreation.data[rowIndex][fieldName] = Object.assign([],tempData);
        //     }
        // });
        this.callBack.emit({
            action: 'deleteRow',
            sourceAction: sourceAction,
            rowIndex: rowIndex
        });
    }
    callBackFrame(event) {
        if (event.action == 'deleteRow') {
            this.deleteRow(event.rowIndex);
        }
    }
    enableRow(rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = true;
    }
    disableRow(rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = false;
    }
    disableField(rowIndex, fieldName) {
        if (this.formCreation.form.option.disableList == undefined) {
            this.formCreation.form.option.disableList = [];
        }
        if (this.formCreation.form.option.disableList[rowIndex] == undefined) {
            this.formCreation.form.option.disableList[rowIndex] = {};
        }
        this.formCreation.form.option.disableList[rowIndex][fieldName] = true;
    }
    enableField(rowIndex, fieldName) {
        if (this.formCreation.form.option.disableList == undefined) {
            this.formCreation.form.option.disableList = [];
        }
        if (this.formCreation.form.option.disableList[rowIndex] == undefined) {
            this.formCreation.form.option.disableList[rowIndex] = {};
        }
        this.formCreation.form.option.disableList[rowIndex][fieldName] = false;
    }
    enableDeleteRow(rowIndex) {
        if (this.formCreation.form.option.disableDelete == undefined) {
            this.formCreation.form.option.disableDelete = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = false;
    }
    disableDeleteRow(rowIndex) {
        if (this.formCreation.form.option.disableDelete == undefined) {
            this.formCreation.form.option.disableDelete = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = true;
    }
    reFilter(rowIndex) {
        let fieldList = this.getFieldList();
        for (let fieldName of fieldList) {
            let fieldType = this.getFieldAttribute(fieldName, 'type');
            let value = this.getDataValue(fieldName, rowIndex);
            if (isArray(value)) {
                if (fieldType == 'autoComplete') {
                    for (let valueRow in value) {
                        let dynamicInput = this.getDynamicInput(fieldName, rowIndex);
                        dynamicInput.instantInput.filterAutoComplete(valueRow, true);
                    }
                }
            }
        }
    }
    reFilterField(fieldName, rowIndex, dataIndex) {
        let dynamicInput = this.getDynamicInput(fieldName, rowIndex);
        dynamicInput.instantInput.filterAutoComplete(dataIndex, true);
    }
    onFormReady(rowNum, data = null, timeout = 15000, debug = false) {
        if (this.startMilliseconds == null) {
            let dateStart = new Date();
            this.startMilliseconds = dateStart.getTime();
        }
        let readyStatus = null;
        let response = new Observable((observable) => {
            interval(200).pipe(takeWhile(() => {
                return readyStatus != true && this.startMilliseconds != null;
            }))
                .subscribe(() => {
                let dateCurrent = new Date();
                let currentMilliseconds = dateCurrent.getTime();
                let diffTime = currentMilliseconds - this.startMilliseconds;
                let fieldList = this.getFieldList();
                let checkField = [];
                for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
                    for (let fieldName of fieldList) {
                        let dynamicInput = this.getDynamicInput(fieldName, rowIndex);
                        checkField.push(dynamicInput);
                    }
                }
                if (debug) {
                    console.log(checkField);
                }
                if (checkField.indexOf(null) > -1 || checkField.indexOf(undefined) > -1) {
                    readyStatus = false;
                }
                else {
                    readyStatus = true;
                }
                if (readyStatus == true || diffTime > timeout) {
                    this.startMilliseconds = null;
                    if (readyStatus == true) {
                        observable.next({
                            status: 'ready',
                            data: data
                        });
                    }
                    else {
                        observable.next({
                            status: 'timeout',
                            data: data
                        });
                    }
                    observable.complete();
                }
            });
        });
        return response;
    }
    refineContainerTableMode() {
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            let fieldList = [];
            for (let container of this.formCreation.form.containerList) {
                for (let fieldCreation of container.fieldList) {
                    fieldList.push(fieldCreation);
                }
            }
            this.refinedContainerTableMode = [];
            this.refinedContainerTableMode.push({
                fieldList: fieldList
            });
        }
    }
    duplicateDataRow(sourceRow, destinationRow, actionOnFromReady = true) {
        if (this.formCreation.data[sourceRow] != undefined && this.formCreation.data[destinationRow] != undefined) {
            this.duplicateRowProcess(sourceRow, destinationRow);
        }
        else if (actionOnFromReady) {
            this.duplicateQueue.push({
                sourceRow: sourceRow,
                destinationRow: destinationRow
            });
            this.onFormReady(destinationRow + 1).subscribe((readyStatus) => {
                if (readyStatus.status == 'ready') {
                    while (this.duplicateQueue.length > 0) {
                        let duplicateData = this.duplicateQueue.shift();
                        this.duplicateRowProcess(duplicateData.sourceRow, duplicateData.destinationRow);
                    }
                }
                else {
                    console.error('Dynamic form row number ' + destinationRow + ' didn\'t create. Can\'t duplicate data');
                }
            });
        }
        else {
            console.error('Data index incorrect. Can\'t duplicate data.');
        }
    }
    duplicateToNewRow(sourceRow = 0, sourceAction = null) {
        let dataNewRow = {};
        let haveData = false;
        if (this.formCreation.data[sourceRow] != undefined) {
            dataNewRow = Object.assign({}, this.formCreation.data[sourceRow]);
            haveData = true;
        }
        else if (this.formCreation.data.length > 0) {
            dataNewRow = Object.assign({}, this.formCreation.data[0]);
            haveData = true;
        }
        else {
            console.error('duplicate new row fail not found any data');
        }
        if (haveData) {
            let defaultValue = Object.assign({}, this.getDefault());
            for (let fieldName in defaultValue) {
                if (dataNewRow[fieldName] != undefined) {
                    let value = Object.assign([], dataNewRow[fieldName]);
                    let newValue = [];
                    for (let valueRow of value) {
                        if (isObject(valueRow)) {
                            newValue.push(Object.assign({}, valueRow));
                        }
                        else {
                            newValue.push(valueRow);
                        }
                    }
                    defaultValue[fieldName] = newValue;
                }
            }
            this.formCreation.data.push(defaultValue);
        }
        this.callBack.emit({
            action: 'duplicateToNewRow',
            sourceAction: sourceAction,
            sourceIndex: sourceRow
        });
    }
    duplicateRowProcess(sourceRow, destinationRow) {
        let fieldList = this.getFieldList();
        let objGet = {};
        for (let fieldName of fieldList) {
            objGet[fieldName] = fieldName + '.all';
        }
        let sourceData = this.mapGetValue(objGet, sourceRow);
        for (let fieldName in sourceData) {
            let type = this.getFieldAttribute(fieldName, 'type');
            if (type == 'checkBox') {
                let value = {};
                for (let valueData of sourceData[fieldName]) {
                    value[valueData.value] = valueData.checked;
                }
                sourceData[fieldName] = value;
            }
        }
        this.mapSetValue(sourceData, destinationRow);
    }
    checkDuplicate(fieldArray, regEx = /(.*)/, regExIndex = 0) {
        let tempDataCheck = [];
        let mapGet = {};
        let check = true;
        for (let fieldList of fieldArray) {
            mapGet[fieldList] = fieldList;
        }
        let formRow = this.getFormRow();
        for (let i = 0; i < formRow; i++) {
            let data = this.mapGetValue(mapGet, i);
            for (let dataKey in data) {
                let regTest = new RegExp(regEx);
                let match = regTest.exec(data[dataKey]);
                if (match != null) {
                    if (tempDataCheck.indexOf(match[regExIndex]) > -1) {
                        check = false;
                        break;
                    }
                    else {
                        tempDataCheck.push(match[regExIndex]);
                    }
                }
            }
            if (check == false) {
                break;
            }
        }
        return check;
    }
    checkRequireAll() {
        let check = true;
        let formRow = this.getFormRow();
        for (let i = 0; i < formRow; i++) {
            if (!this.checkRequireField(i)) {
                check = false;
                break;
            }
        }
        return check;
    }
    checkValidateAll() {
        let check = true;
        let formRow = this.getFormRow();
        for (let i = 0; i < formRow; i++) {
            if (!this.checkValidateField(i)) {
                check = false;
                break;
            }
        }
        return check;
    }
    setMode(mode) {
        this.formCreation.form.option.mode = mode;
    }
    enableAdd() {
        if (this.formCreation.form.option.addRow == undefined) {
            this.formCreation.form.option.addRow = true;
        }
        this.formCreation.form.option.addRow = true;
    }
    disableAdd() {
        if (this.formCreation.form.option.addRow == undefined) {
            this.formCreation.form.option.addRow = false;
        }
        this.formCreation.form.option.addRow = false;
    }
    enableDelete() {
        if (this.formCreation.form.option.deleteRow == undefined) {
            this.formCreation.form.option.deleteRow = true;
        }
        this.formCreation.form.option.deleteRow = true;
    }
    disableDelete() {
        if (this.formCreation.form.option.deleteRow == undefined) {
            this.formCreation.form.option.deleteRow = true;
        }
        this.formCreation.form.option.deleteRow = true;
    }
    setDefault(rowIndex = 0) {
        if (this.formCreation.data[0]) {
            this.getDefault();
            for (let fieldName in this.defaultData) {
                this.setDataValue(fieldName, 0, this.defaultData[fieldName]);
            }
        }
    }
    setSavePoint(savePointName = "default") {
        let savePointData = [];
        let rowNum = this.getFormRow();
        let fieldList = this.getFieldList();
        let mapGet = {};
        for (let fieldName of fieldList) {
            mapGet[fieldName] = fieldName;
        }
        for (let i = 0; i < rowNum; i++) {
            let data = this.mapGetValue(mapGet, i);
            savePointData.push(data);
        }
        this.savePoint[savePointName] = savePointData;
    }
    getSavePoint(savePointName = "default") {
        if (this.savePoint[savePointName]) {
            let savePointData = this.savePoint[savePointName];
            for (let savePointIndex in savePointData) {
                this.mapSetValue(savePointData[savePointIndex], savePointIndex);
            }
        }
    }
    getParam(rowIndex = 0) {
        let fieldList = this.getFieldList();
        let param = {};
        for (let fieldName of fieldList) {
            param[fieldName] = fieldName;
        }
        param = this.mapGetValue(param, rowIndex);
        return param;
    }
};
DynamicFormComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    ViewChildren(DynamicFormRowComponent),
    __metadata("design:type", QueryList)
], DynamicFormComponent.prototype, "formRow", void 0);
__decorate([
    ViewChildren(DynamicContainerTableComponent),
    __metadata("design:type", QueryList)
], DynamicFormComponent.prototype, "formTableRow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "formCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "model", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "actionDataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "defaultData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "showForm", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "option", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormComponent.prototype, "panelCallBack", void 0);
DynamicFormComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-form',
        template: "<div class=\"formPanel defaultDynamicForm {{formCreation.form.option.customClass ? formCreation.form.option.customClass : ''}}\">\r\n    <form *ngIf=\"showForm\" action=\"\" method=\"post\">\r\n        <ng-container *ngIf=\"!formCreation.form.option.displayMode || formCreation.form.option.displayMode != 'table'\">\r\n            <ng-container *ngFor=\"let rowIndex of objKey(formCreation.data)\">\r\n                <ng-container *ngIf=\"formCreation.form.option.frame == true\">\r\n                    <lb9-dynamic-form-frame [header]=\"frameHeader\"\r\n                                            [rowIndex]=\"rowIndex\"\r\n                                            [showDeleteRow]=\"formCreation.form.option.deleteRow\"\r\n                                            (callback)=\"callBackFrame($event)\">\r\n                        <lb9-dynamic-form-row [_reRenderFieldList]=\"_reRenderFieldList\"\r\n                                              [containerList]=\"formCreation.form.containerList\"\r\n                                              [option]=\"formCreation.form.option\"\r\n                                              [data]=\"formCreation.data\"\r\n                                              [rowIndex]=\"rowIndex\"\r\n                                              (callBack)=\"processCallBack($event)\"\r\n                                              (panelCallBack)=\"processPanelCallBack($event)\">\r\n\r\n                        </lb9-dynamic-form-row>\r\n\r\n                    </lb9-dynamic-form-frame>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"formCreation.form.option.frame == false || !formCreation.form.option.frame\">\r\n                    <lb9-dynamic-form-row [_reRenderFieldList]=\"_reRenderFieldList\"\r\n                                          [containerList]=\"formCreation.form.containerList\"\r\n                                          [option]=\"formCreation.form.option\"\r\n                                          [data]=\"formCreation.data\"\r\n                                          [rowIndex]=\"rowIndex\"\r\n                                          (callBack)=\"processCallBack($event)\"\r\n                                          (panelCallBack)=\"processPanelCallBack($event)\">\r\n                    </lb9-dynamic-form-row>\r\n                </ng-container>\r\n            </ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"formCreation.form.option.displayMode == 'table'\">\r\n            <div class=\"table-form-default-dynamic\">\r\n                <div class=\"header\"></div>\r\n                <div class=\"scroll\">\r\n                    <table>\r\n                        <tr>\r\n                            <th *ngFor=\"let fieldLabel of fieldLabelList\" [innerHTML]=\"fieldLabel\">\r\n                            </th>\r\n                            <th *ngIf=\"formCreation.form.option.deleteRow\">\r\n\r\n                            </th>\r\n                        </tr>\r\n                        <ng-container *ngFor=\"let rowIndex of objKey(formCreation.data)\">\r\n                            <ng-container *ngIf=\"formCreation.form.containerList\">\r\n                                <ng-container *ngFor=\"let containerIndex of objKey(refinedContainerTableMode)\">\r\n                                    <tr lb9-dynamic-container-table\r\n                                        [containerCreation]=\"refinedContainerTableMode[containerIndex]\"\r\n                                        [data]=\"formCreation.data\"\r\n                                        [actionDataIndex]=\"rowIndex\"\r\n                                        [containerIndex]=\"containerIndex\"\r\n                                        [option]=\"formCreation.form.option\"\r\n                                        [reRenderField]=\"_reRenderFieldList\"\r\n                                        (callBack)=\"processCallBack($event)\"\r\n                                        (panelCallBack)=\"processPanelCallBack($event)\">\r\n                                    </tr>\r\n                                </ng-container>\r\n                            </ng-container>\r\n                        </ng-container>\r\n                        <tr *ngIf=\"formCreation.form.option.addRow && formCreation.form.option.displayMode == 'table'\">\r\n                            <td [colSpan]=\"fieldLabelList.length+1\">\r\n                                <div class=\"dp2AddNewBtnTbl\" id=\"add_row_data_table_footer\" (click)=\"addRow()\">\r\n                                    <span class=\"glyphicon glyphicon-plus-sign\"></span>\r\n                                    <div *ngIf=\"formCreation.form.option.addRowText\">{{formCreation.form.option.addRowText}}</div>\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div *ngIf=\"formCreation.form.option.addRow && formCreation.form.option.displayMode != 'table'\" class=\"dp2AddNew\">\r\n            <div class=\"dp2AddNewBtn\" id=\"add_row_data\" (click)=\"addRow()\">\r\n                <span class=\"glyphicon glyphicon-plus-sign\"></span>\r\n                <div *ngIf=\"formCreation.form.option.addRowText\">{{formCreation.form.option.addRowText}}</div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n",
        entryComponents: [
            LabelComponent,
            TextBoxComponent,
            TextAreaComponent,
            CheckBoxComponent,
            ColorSelectComponent,
            SelectBoxComponent,
            HiddenComponent,
            FileUploadComponent,
            ImageComponent,
            AutoCompleteComponent,
            ButtonComponent,
            ButtonIconComponent,
            SwappingBoxComponent,
            MapValueComponent,
            RadioComponent,
            DateComponent
        ],
        providers: [AnimationService]
    }),
    __metadata("design:paramtypes", [AnimationService])
], DynamicFormComponent);

let TableComponent = class TableComponent {
    constructor() {
        this.callBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.sortField = "";
        this.sortType = "ASC";
        this.checkData = [];
        this.checkDataTemp = [];
        this.radioData = "";
        this.checkSelectAll = false;
    }
    get pageNumber() {
        return this._pageNumber;
    }
    ;
    get sortData() {
        return this._sortData;
    }
    set pageNumber(val) {
        this._pageNumber = val;
    }
    ;
    set sortData(val) {
        this._sortData = val;
    }
    ngOnInit() {
        this.sortField = this.tableCreation.fieldList[0].fieldName;
    }
    ngOnChanges(changes) {
        this.processCheckSelectAll();
    }
    processCheckSelectAll() {
        let checkStatusSelectAll = true;
        let data = (this.tableCreation.data.data ? this.tableCreation.data.data : this.tableCreation.data);
        for (let rowIndex in data) {
            let primaryKey = this.getPrimary(rowIndex);
            if ((typeof (this.checkData[primaryKey]) == "undefined" || this.checkData[primaryKey] == false) && !this.checkIgnore(rowIndex)) {
                checkStatusSelectAll = false;
                break;
            }
        }
        if (checkStatusSelectAll == true) {
            this.checkSelectAll = true;
        }
        else {
            this.checkSelectAll = false;
        }
    }
    getData(fieldData, row) {
        let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
        let strData = "";
        if (fieldData.fieldName.length > 1) {
            if (fieldData.multiType == "join") {
                let dataAll = [];
                for (let fieldName of fieldData.fieldName) {
                    if (dataRow[fieldName] != null && dataRow[fieldName] != "") {
                        dataAll.push(dataRow[fieldName]);
                    }
                }
                strData = dataAll.join(fieldData.joinChar);
            }
            else if (fieldData.multiType == "oneFromLast") {
                let dataAll = [];
                for (let fieldName of fieldData.fieldName) {
                    dataAll.push(dataRow[fieldName]);
                }
                while (dataAll.length > 0 && (strData == null || strData == "")) {
                    strData = dataAll.pop();
                }
            }
            else if (fieldData.multiType == "oneFromFirst") {
                let dataAll = [];
                for (let fieldName of fieldData.fieldName) {
                    dataAll.push(dataRow[fieldName]);
                }
                while (dataAll.length > 0 && (strData == null || strData == "")) {
                    strData = dataAll.shift();
                }
            }
        }
        else {
            strData = dataRow[fieldData.fieldName];
        }
        return strData;
    }
    getFieldId(fieldData) {
        let fieldArray = [];
        for (let fieldName of fieldData) {
            fieldArray.push(fieldName);
        }
        let fieldId = fieldArray.join("_");
        return fieldId;
    }
    editRow(row) {
        let primaryKeyList = {};
        let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
        for (let primaryItem of this.tableCreation.primaryField) {
            if (dataRow[primaryItem]) {
                primaryKeyList[primaryItem] = dataRow[primaryItem];
            }
            else {
                console.log("Primary key data not found: " + primaryItem);
            }
        }
        this.callBack.emit({
            action: 'edit',
            rowIndex: row,
            rowData: dataRow,
            primaryKey: primaryKeyList
        });
    }
    deleteRow(row) {
        let primaryKeyList = {};
        let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
        for (let primaryItem of this.tableCreation.primaryField) {
            if (dataRow[primaryItem]) {
                primaryKeyList[primaryItem] = dataRow[primaryItem];
            }
            else {
                console.log("Primary key data not found: " + primaryItem);
            }
        }
        this.callBack.emit({
            action: 'delete',
            rowIndex: row,
            rowData: dataRow,
            primaryKey: primaryKeyList
        });
    }
    sortBy(dataIndex) {
        if (this.tableCreation.sorting == true && this.tableCreation.fieldList[dataIndex].sorting != false) {
            let sortField;
            if (typeof (this.tableCreation.fieldList[dataIndex].fieldNameDb) != "undefined") {
                sortField = this.tableCreation.fieldList[dataIndex].fieldNameDb;
            }
            else {
                sortField = this.tableCreation.fieldList[dataIndex].fieldName;
            }
            let fieldName = sortField.join(",");
            if (this.sortField == fieldName) {
                if (this.sortType == "DESC") {
                    this.sortType = "ASC";
                }
                else {
                    this.sortType = "DESC";
                }
            }
            else {
                this.sortField = fieldName;
                this.sortType = "ASC";
            }
            // console.log('function sortBy sortType = ',this.sortType)
            let sort = this.sortField + " " + this.sortType;
            this.callBack.emit({
                action: "sort",
                sortValue: sort,
                fieldName: sortField,
                order: this.sortType
            });
        }
    }
    dataAction(rowNum, fieldName) {
        this.callBack.emit({
            action: "click_data",
            fieldName: fieldName.join(','),
            data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowNum] : this.tableCreation.data[rowNum])
        });
    }
    checkAction(rowIndex) {
        let checkStatus = "";
        let primaryKey = this.getPrimary(rowIndex);
        if (this.checkData[primaryKey] == true) {
            checkStatus = "check";
            this.checkDataTemp[primaryKey] = Object.assign({}, (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex]));
        }
        else {
            checkStatus = "unCheck";
            delete this.checkDataTemp[primaryKey];
        }
        this.processCheckSelectAll();
        this.callBack.emit({
            type: "checkBox",
            action: checkStatus,
            primaryKey: primaryKey,
            data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex])
        });
    }
    radioAction(rowIndex) {
        this.callBack.emit({
            type: "radio",
            action: "change",
            primaryKey: this.getPrimary(rowIndex),
            data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex])
        });
    }
    getPrimary(rowIndex) {
        let primaryField = this.tableCreation.primaryField;
        let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex]);
        let primaryKey = [];
        if (Array.isArray(primaryField)) {
            for (let primaryListRow of primaryField) {
                if (typeof (dataRow[primaryListRow]) != "undefined") {
                    primaryKey.push(dataRow[primaryListRow]);
                }
            }
        }
        else {
            if (typeof (dataRow[primaryField]) != "undefined") {
                primaryKey.push(dataRow[primaryField]);
            }
        }
        return primaryKey.join("_");
    }
    getCheckedList() {
        let checkList = [];
        for (let checkedRowIndex in this.checkDataTemp) {
            checkList.push(this.checkDataTemp[checkedRowIndex]);
        }
        return checkList;
    }
    clearCheckList() {
        this.checkData = [];
        this.checkDataTemp = [];
        this.checkSelectAll = false;
    }
    checkActionAll() {
        let data = (this.tableCreation.data.data ? this.tableCreation.data.data : this.tableCreation.data);
        if (this.checkSelectAll == true) {
            for (let rowIndex in data) {
                if (!this.checkIgnore(rowIndex)) {
                    let primaryKey = this.getPrimary(rowIndex);
                    this.checkData[primaryKey] = true;
                    this.checkDataTemp[primaryKey] = Object.assign({}, data[rowIndex]);
                }
            }
        }
        else {
            for (let rowIndex in data) {
                let primaryKey = this.getPrimary(rowIndex);
                this.checkData[primaryKey] = false;
                delete this.checkDataTemp[primaryKey];
            }
        }
    }
    checkIgnore(rowIndex) {
        if (typeof (this.tableCreation.ignoreSelect) != "undefined") {
            let dataSplitCheck = this.tableCreation.ignoreSelect.split(":");
            let dataField = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] : this.tableCreation.data[rowIndex][dataSplitCheck[0]]);
            if (typeof (dataField) != "undefined") {
                if (isBoolean(dataField)) {
                    return dataField;
                }
                else if (dataSplitCheck.length == 2) {
                    if (this.tableCreation.data.data) {
                        if (this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
                            return true;
                        }
                    }
                    else {
                        if (this.tableCreation.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
                            return true;
                        }
                    }
                }
                else {
                    return false;
                }
            }
        }
        return false;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TableComponent.prototype, "pageNumber", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TableComponent.prototype, "sortData", null);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TableComponent.prototype, "tableCreation", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TableComponent.prototype, "callBack", void 0);
TableComponent = __decorate([
    Component({
        selector: 'lb9-table',
        template: "<div id=\"dynamicTable\" class=\"{{tableCreation.customClass ? tableCreation.customClass : ''}}\">\r\n    <div class=\"header\" id=\"head_brand_list\">{{tableCreation.header}}</div>\r\n    <div class=\"scroll\">\r\n        <table>\r\n            <tr>\r\n                <ng-container *ngIf=\"tableCreation.primaryField && tableCreation.showSelect && tableCreation.showSelect != 'none'\">\r\n                    <th>\r\n                        <input *ngIf=\"tableCreation.showSelect == 'checkBox'\" type=\"checkbox\"  id=\"checkBox_select_all\"\r\n                               [(ngModel)]=\"checkSelectAll\"\r\n                               (change)=\"checkActionAll()\" name=\"checkBox_all\" >\r\n                    </th>\r\n                </ng-container>\r\n                <ng-container *ngFor=\"let dataIndex of objKeys(tableCreation.fieldList)\">\r\n                    <th *ngIf=\"tableCreation.fieldList[dataIndex].hideHeader != true\"\r\n                        id=\"id_{{getFieldId(tableCreation.fieldList[dataIndex].fieldName)}}_header\"\r\n                        [colSpan]=\"tableCreation.fieldList[dataIndex].headerSpan ? tableCreation.fieldList[dataIndex].headerSpan : '1'\"\r\n                        class=\"{{(tableCreation.sorting == true && tableCreation.fieldList[dataIndex].sorting != false? 'actionClick' : '')}}{{tableCreation.fieldList[dataIndex].thCustomClass ? ' '+tableCreation.fieldList[dataIndex].thCustomClass : ''}}\"\r\n                        (click)=\"sortBy(dataIndex)\">\r\n                        {{tableCreation.fieldList[dataIndex].displayHeader}}\r\n                        <span *ngIf=\"(sortField == tableCreation.fieldList[dataIndex].fieldNameDb || sortField == tableCreation.fieldList[dataIndex].fieldName) && tableCreation.sorting == true && tableCreation.fieldList[dataIndex].sorting != false\"\r\n                             class=\"{{sortType == 'DESC' ? 'glyphicon glyphicon-sort-by-attributes-alt' : 'glyphicon glyphicon-sort-by-attributes'}}\"></span>\r\n                    </th>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"tableCreation.showDelete || tableCreation.showEdit\">\r\n                    <th id=\"action\" class=\"actionTh\" [innerHTML]=\"tableCreation.actionHeader ? tableCreation.actionHeader: 'Action'\">\r\n                    </th>\r\n                </ng-container>\r\n            </tr>\r\n            <tr *ngFor=\"let rowIndex of objKeys((tableCreation.data.data ? tableCreation.data.data :tableCreation.data))\" class=\"table_class\" id=\"id_row_{{tableCreation.tableId}}_{{rowIndex}}\">\r\n                <ng-container *ngIf=\"tableCreation.primaryField && tableCreation.showSelect && tableCreation.showSelect != 'none'\">\r\n                    <td id=\"select_{{rowIndex}}\">\r\n                        <div *ngIf=\"!checkIgnore(rowIndex)\">\r\n                            <input *ngIf=\"tableCreation.showSelect == 'checkBox'\" type=\"checkbox\" id=\"checkBox_{{rowIndex}}\"\r\n                                   [(ngModel)]=\"checkData[getPrimary(rowIndex)]\"\r\n                                   (change)=\"checkAction(rowIndex)\" name=\"checkBox_{{rowIndex}}\" >\r\n                            <input *ngIf=\"tableCreation.showSelect == 'radioBox'\" type=\"radio\"\r\n                                   value=\"{{getPrimary(rowIndex)}}\"\r\n                                   name=\"tableRadio_{{tableCreation.tableId}}\" id=\"radioBox_{{rowIndex}}\"\r\n                                   [(ngModel)]=\"radioData\"\r\n                                   (change)=\"radioAction(rowIndex)\" >\r\n                        </div>\r\n                    </td>\r\n                </ng-container>\r\n                <ng-container *ngFor=\"let dataIndex of objKeys(tableCreation.fieldList)\">\r\n                    <td id=\"id_{{getFieldId(tableCreation.fieldList[dataIndex].fieldName)}}_{{rowIndex}}_{{tableCreation.tableId}}\"\r\n                        class=\"{{tableCreation.fieldList[dataIndex].align}} {{tableCreation.fieldList[dataIndex].tdCustomClass ? tableCreation.fieldList[dataIndex].tdCustomClass : ''}}\">\r\n                        <div class=\"{{tableCreation.fieldList[dataIndex].dataStyle}}\">\r\n                            <ng-container *ngIf=\"tableCreation.fieldList[dataIndex].action == false\">\r\n                                <div [innerHTML]=\"getData(tableCreation.fieldList[dataIndex],rowIndex)\"></div>\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"tableCreation.fieldList[dataIndex].action == true\">\r\n                                <div class=\"dataAction\" (click)=\"dataAction(rowIndex,tableCreation.fieldList[dataIndex].fieldName)\" [innerHTML]=\"getData(tableCreation.fieldList[dataIndex],rowIndex)\"></div>\r\n                            </ng-container>\r\n                        </div>\r\n                    </td>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"tableCreation.showDelete || tableCreation.showEdit\">\r\n                    <td id=\"action_{{rowIndex}}\" class=\"actionTd\">\r\n                        <span *ngIf=\"tableCreation.showEdit\" class=\"btn-action edit\" id=\"edit_{{rowIndex}}\"\r\n                              (click)=\"editRow(rowIndex)\"><span\r\n                                class=\"glyphicon glyphicon-edit\"></span></span>\r\n                        <span *ngIf=\"tableCreation.showDelete\" class=\"btn-action delete\" id=\"delete_{{rowIndex}}\"\r\n                              (click)=\"deleteRow(rowIndex)\"><span\r\n                                class=\"glyphicon glyphicon-trash\"></span></span>\r\n                    </td>\r\n                </ng-container>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [])
], TableComponent);

let DynamicTableComponent = class DynamicTableComponent {
    constructor() {
        this.callBack = new EventEmitter();
        this.currentPage = 1;
        this.sortData = "";
    }
    ngOnInit() {
    }
    processCallBack(data) {
        this.callBack.emit(data);
        this.sortData = data.sortValue;
    }
    getTotalPage() {
        let totalPage = null;
        if (this.tableCreation.data.totalRecord) {
            totalPage = Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum);
        }
        else if (this.tableCreation.pagination && this.tableCreation.pagination.totalRowNum) {
            totalPage = Math.ceil(this.tableCreation.pagination.totalRowNum / this.tableCreation.rowLimit);
        }
        return totalPage;
    }
    getPageRank() {
        let beginRecord = null;
        let endRecode = null;
        if (this.tableCreation.data.pageRowNum) {
            beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + 1);
            endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + this.tableCreation.data.data.length);
        }
        else {
            beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.rowLimit)) + 1);
            endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.rowLimit)) + this.tableCreation.data.length);
        }
        return {
            begin: beginRecord,
            end: endRecode
        };
    }
    processPagingCallBack(data) {
        this.currentPage = data;
        this.callBack.emit({
            action: "page",
            pageNumber: data,
            limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
        });
    }
    processRowLimitCallBack(data) {
        this.tableCreation.rowLimit = data;
        this.callBack.emit({
            action: "page",
            pageNumber: 1,
            limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
        });
    }
    getCheckedList() {
        return this.tableRef.getCheckedList();
    }
    clearCheckedList() {
        this.tableRef.clearCheckList();
    }
};
__decorate([
    ViewChild("tableID", { static: false }),
    __metadata("design:type", TableComponent)
], DynamicTableComponent.prototype, "tableRef", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicTableComponent.prototype, "tableCreation", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicTableComponent.prototype, "callBack", void 0);
DynamicTableComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-table',
        template: "<ng-container *ngIf=\"tableCreation.data\">\r\n    <lb9-table [tableCreation]=\"tableCreation\"\r\n                [pageNumber]=\"currentPage\" \r\n                [sortData]=\"sortData\" #tableID \r\n                (callBack)=\"processCallBack($event)\"></lb9-table>\r\n                \r\n    <lb9-paging *ngIf=\"tableCreation.showPaging\" [currentPage]=\"currentPage\"\r\n                [totalPage]=\"getTotalPage()\"\r\n                [dataRank]=\"getPageRank()\"\r\n                [totalRecord]=\"(tableCreation.data.totalRecord ? tableCreation.data.totalRecord : tableCreation.pagination.totalRowNum)\"\r\n                [customClass]=\"tableCreation.customClassPaging\"\r\n                [pageControlType]=\"tableCreation.pageControlType\"\r\n                [rowLimit]=\"tableCreation.rowLimit\"\r\n                [rowLimitOption]=\"tableCreation.rowLimitOption\"\r\n                (pagingProcess)=\"processPagingCallBack($event)\"\r\n                (rowLimitCallback)=\"processRowLimitCallBack($event)\"></lb9-paging>\r\n</ng-container>\r\n<ng-container *ngIf=\"!tableCreation.data\">\r\n    <div class=\"listDataNotFound\" [innerHTML]=\"tableCreation.dataNotFoundString ? tableCreation.dataNotFoundString:'Data Not Found.'\">\r\n\r\n    </div>\r\n</ng-container>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicTableComponent);

let PagingComponent = class PagingComponent {
    constructor() {
        this.currentPage = 1;
        this.totalPage = 1;
        this.totalRecord = 1;
        this.pageControlType = "auto";
        this.rowLimit = null;
        this.rowLimitOption = null;
        this.pagingProcess = new EventEmitter();
        this.rowLimitCallback = new EventEmitter();
        this.tempTotalPage = 0;
        this.totalPageCal = 0;
        this.pageList = [];
        this.rowLimitOptionValue = 10;
    }
    ngOnInit() {
        this.inputWidth = ((String(this.totalPage).length * 15) + 27) + "px";
        this.rowLimitOptionValue = this.rowLimit;
        // console.log(this.rowLimitOptionValue)
    }
    checkInput(event) {
        let modValue = parseInt(String(event.target.value) + event.key);
        if ((event.key.match(/^([0-9])$/)
            || (event.ctrlKey == true && (event.code == "KeyV" || event.code == "KeyC"))
            || event.code == "Backspace"
            || event.code == "ArrowUp"
            || event.code == "ArrowDown"
            || event.code == "ArrowLeft"
            || event.code == "ArrowRight"
            || event.code == "Tab") && modValue <= this.totalPage) {
            return true;
        }
        if (event.code == "NumpadEnter" || event.key == "Enter" || event.code == "Enter") {
            this.checkValue();
        }
        return false;
    }
    goFirst() {
        if (this.currentPage != 1) {
            this.currentPage = 1;
            this.processPaging();
        }
    }
    goLast() {
        if (this.currentPage != this.totalPage) {
            this.currentPage = this.totalPage;
            this.processPaging();
        }
    }
    goPrev() {
        if (this.currentPage != 1) {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.processPaging();
        }
    }
    goNext() {
        if (this.currentPage != this.totalPage) {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            }
            this.processPaging();
        }
    }
    keepValue() {
        this.tempValue = this.currentPage;
    }
    checkValue() {
        if (this.currentPage == 0 || this.currentPage == null) {
            this.currentPage = this.tempValue;
        }
        if (this.currentPage != this.tempValue) {
            this.processPaging();
        }
    }
    getTotalRecordStr() {
        let str = "";
        if (typeof (this.dataRank) != "undefined") {
            str = "Showing " + this.dataRank.begin + " to " + this.dataRank.end + " of " + this.totalRecord;
        }
        return str;
    }
    processPagingBtn(page) {
        if (page != this.currentPage) {
            this.currentPage = page;
            this.processPaging();
        }
    }
    processPaging() {
        this.pagingProcess.emit(this.currentPage);
    }
    genPageArray() {
        if (this.tempTotalPage == 0 || this.tempTotalPage != this.totalPage) {
            this.pageList = [];
            for (let i = 1; i <= this.totalPage; i++) {
                this.pageList.push(i);
            }
            this.tempTotalPage = this.totalPage;
        }
        return this.pageList;
    }
    changeRowLimit() {
        this.rowLimitCallback.emit(this.rowLimitOptionValue);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "currentPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "totalPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "totalRecord", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "dataRank", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "customClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "pageControlType", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "rowLimit", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "rowLimitOption", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "pagingProcess", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PagingComponent.prototype, "rowLimitCallback", void 0);
PagingComponent = __decorate([
    Component({
        selector: 'lb9-paging',
        template: "<div id=\"pagingPanel\" class=\"{{customClass ? customClass: ''}}\">\r\n    <div class=\"totalRecord\">{{getTotalRecordStr()}}</div>\r\n\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage > 5) || pageControlType=='input'\">\r\n        <div class=\"first\" id=\"arrowLeftFirst\" (click)=\"goFirst()\">\r\n            <span class=\"glyphicon glyphicon-fast-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n            <!--<div class=\"arrowLeft innerLeftArrow\"></div>-->\r\n        </div>\r\n        <div class=\"previous\" id=\"arrowLeft\" (click)=\"goPrev()\">\r\n            <span class=\"glyphicon glyphicon-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n        </div>\r\n        <input class=\"currentPage\" id=\"inputRow\" type=\"text\" [(ngModel)]=\"currentPage\" max=\"{{totalPage}}\" min=\"1\"\r\n               [style.width]=\"inputWidth\"\r\n               (keydown)=\"checkInput($event)\" (focus)=\"keepValue()\" (blur)=\"checkValue()\"/>\r\n        <div class=\"totalRow\">\r\n            / {{totalPage}}\r\n        </div>\r\n        <div class=\"next\" id=\"arrowNext\" (click)=\"goNext()\">\r\n            <span class=\"glyphicon glyphicon-forward\"></span>\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n        <div class=\"last\" id=\"arrowNextLast\" (click)=\"goLast()\">\r\n            <span class=\"glyphicon glyphicon-fast-forward\"></span>\r\n            <!--<div class=\"arrowRight innerRightArrow\"></div>-->\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n    </div>\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage <= 5) || pageControlType=='button'\">\r\n        <div class=\"pageBtn{{pageNum == currentPage ? ' pageBtnActive': ''}}\" *ngFor=\"let pageNum of genPageArray()\" (click)=\"processPagingBtn(pageNum)\">{{pageNum}}</div>\r\n    </div>\r\n    <div class=\"pageLimitOption\" *ngIf=\"rowLimitOption\">\r\n        <select [(ngModel)]=\"rowLimitOptionValue\" (change)=\"changeRowLimit()\">\r\n            <option *ngFor=\"let value of rowLimitOption\" [value]=\"value\">{{value}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n"
    }),
    __metadata("design:paramtypes", [])
], PagingComponent);

let ErrorMsgBubbleComponent = class ErrorMsgBubbleComponent {
    constructor() {
        this.maxShow = 5;
        this.data = [];
        this.objKeys = Object.keys;
    }
    ngOnInit() {
    }
    clearError() {
        this.data = [];
    }
    addError(key, msg) {
        let exitsData = false;
        for (let errorIndex in this.data) {
            if (this.data[errorIndex].key == key) {
                exitsData = true;
            }
        }
        if (exitsData == false) {
            let error = {
                key: key,
                msg: msg
            };
            this.data.push(error);
        }
    }
    removeError(key) {
        let removeIndex = "";
        for (let errorIndex in this.data) {
            if (this.data[errorIndex].key == key) {
                removeIndex = errorIndex;
                break;
            }
        }
        this.data.splice(parseInt(removeIndex), 1);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ErrorMsgBubbleComponent.prototype, "maxShow", void 0);
ErrorMsgBubbleComponent = __decorate([
    Component({
        selector: 'lb9-error-msg-bubble',
        template: "<div id=\"errorBubble\">\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgPanel\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRow\">\r\n                {{data[i].msg}}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgSpace\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRowSpace\">\r\n\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n",
        styles: ["#errorBubble .errorMsgPanel{position:fixed;bottom:0;left:0;width:calc(100% - 30px);margin:15px;border:1px solid #ff4356;border-radius:10px;box-shadow:3px 3px 3px rgba(0,0,0,.5);background:#ffe1d9;z-index:1060}#errorBubble .errorMsgPanel .errorRow{color:#ff4356;border-top:1px dotted #ff988a;padding:0 10px;line-height:30px}#errorBubble .errorMsgPanel .errorRow:first-child{border-top:0}#errorBubble .errorMsgSpace{margin:15px}#errorBubble .errorMsgSpace .errorRowSpace{height:30px}"]
    }),
    __metadata("design:paramtypes", [])
], ErrorMsgBubbleComponent);

let DynamicTabComponent = class DynamicTabComponent {
    constructor() {
        this.lockTab = false;
        this.callBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.currentTab = 0;
    }
    ngOnInit() {
    }
    processCallBack(data) {
        if (this.getDisableTab(parseInt(data.tabNum))) {
            this.currentTab = parseInt(data.tabNum);
            this.callBack.emit(data);
        }
    }
    getDisableTab(tabIndex) {
        if (this.lockTab) {
            return false;
        }
        if (this.tabCreation.option.lockByIndex != undefined) {
            if (this.tabCreation.option.lockByIndex[parseInt(tabIndex)] != undefined) {
                return !this.tabCreation.option.lockByIndex[parseInt(tabIndex)];
            }
            return true;
        }
        return true;
    }
    disableTab(tabIndex) {
        if (this.tabCreation.option.lockByIndex == undefined) {
            this.tabCreation.option.lockByIndex = [];
        }
        this.tabCreation.option.lockByIndex[tabIndex] = true;
    }
    enableTab(tabIndex) {
        if (this.tabCreation.option.lockByIndex == undefined) {
            this.tabCreation.option.lockByIndex = [];
        }
        this.tabCreation.option.lockByIndex[tabIndex] = false;
    }
    nextTab() {
        let lastTab = false;
        if (this.currentTab == this.tabCreation.tabList.length - 2) {
            lastTab = true;
        }
        if (this.currentTab < this.tabCreation.tabList.length - 1) {
            this.currentTab = this.currentTab + 1;
            this.callBack.emit({
                action: "nextTab",
                fromTab: {
                    name: this.tabCreation.tabList[this.currentTab - 1],
                    index: this.currentTab - 1
                },
                toTab: {
                    name: this.tabCreation.tabList[this.currentTab],
                    index: this.currentTab
                },
                last: lastTab
            });
        }
        else {
            this.callBack.emit({
                action: "nextTab",
                fromTab: {
                    name: this.tabCreation.tabList[this.currentTab],
                    index: this.currentTab
                },
                toTab: {
                    name: this.tabCreation.tabList[this.currentTab],
                    index: this.currentTab
                },
                last: true
            });
        }
    }
    toggleLockTab() {
        if (this.lockTab) {
            this.lockTab = false;
        }
        else {
            this.lockTab = true;
        }
    }
    getCssStatus(tabNumber) {
        if (!isNaN(parseFloat(tabNumber)) && isFinite(tabNumber)) {
            if (tabNumber == this.currentTab) {
                return "p2DShowTab";
            }
            return "p2DHideTab";
        }
        else {
            if (this.tabCreation.tabList.indexOf(tabNumber) == this.currentTab) {
                return "p2DShowTab";
            }
            return "p2DHideTab";
        }
    }
    gotoTab(tabIndex) {
        if (isString(tabIndex)) {
            let index = this.tabCreation.tabList.indexOf(tabIndex);
            if (index == -1) {
                console.error("Tab name not found.");
            }
            else {
                this.currentTab = index;
            }
        }
        else {
            if (tabIndex > (this.tabCreation.tabList.length - 1)) {
                console.error("Tab index not found.");
            }
            else {
                this.currentTab = tabIndex;
            }
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicTabComponent.prototype, "tabCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicTabComponent.prototype, "lockTab", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicTabComponent.prototype, "callBack", void 0);
DynamicTabComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-tab',
        template: "<div class=\"{{tabCreation.option.customClass ? tabCreation.option.customClass:'dynamicTab'}}\">\r\n  <div *ngFor=\"let i of objKeys(tabCreation.tabList)\" (click)=\"processCallBack({tabNum:i,tabName:tabCreation.tabList[i]})\" class=\"tabComponent {{currentTab == i ? 'active':'inactive'}}\" id=\"dynamic_tab_{{tabCreation.tabList[i]}}\">\r\n    {{tabCreation.tabList[i]}}\r\n  </div>\r\n</div>"
    }),
    __metadata("design:paramtypes", [])
], DynamicTabComponent);

let DynamicPopupComponent = class DynamicPopupComponent {
    constructor() {
        this.callback = new EventEmitter();
        this.confirmStatus = false;
        this.showStatus = false;
        this.queue = false;
        this.statusPopup = 'hidePopup';
        this.popupProperties = {
            header: 'popupHeader',
            type: 'info',
            icon: 'glyphicon-info-sign',
            colorClass: '',
            eventCode: '',
            data: {},
            message: 'Informations'
        };
        this.tempData = {
            header: 'popupHeader',
            type: 'info',
            icon: 'glyphicon-info-sign',
            colorClass: '',
            eventCode: '',
            data: {},
            message: 'Informations'
        };
    }
    ngOnInit() {
    }
    set(type, message, eventCode = '000', data = {}) {
        switch (type) {
            case 'error':
                this.tempData = {
                    header: 'Error',
                    type: 'error',
                    icon: 'glyphicon-remove-sign',
                    colorClass: 'cError',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'warning':
                this.tempData = {
                    header: 'Warning',
                    type: 'warning',
                    icon: 'glyphicon-alert',
                    colorClass: 'cWarning',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'success':
                this.tempData = {
                    header: 'Success',
                    type: 'success',
                    icon: 'glyphicon-ok-sign',
                    colorClass: 'cSuccess',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'confirm':
                this.confirmStatus = false;
                this.tempData = {
                    header: 'Confirm',
                    type: 'confirm',
                    icon: 'glyphicon-question-sign',
                    colorClass: 'cConfirm',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'info':
                this.tempData = {
                    header: 'Informations',
                    type: 'info',
                    icon: 'glyphicon-info-sign',
                    colorClass: 'cInfo',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
        }
        this.showModel();
    }
    showModel() {
        this.checkModalOpening();
        if (this.showStatus == false) {
            // $('#dynamicPopup').modal('show');
            this.popupProperties = this.tempData;
            this.statusPopup = 'showPopup';
            this.showStatus = true;
            this.queue = true;
        }
        else {
            this.hideModal();
            interval(500).pipe(takeWhile(() => {
                return this.queue == true;
            }))
                .subscribe(() => {
                if (this.showStatus == false) {
                    // $('#dynamicPopup').modal('show');
                    this.popupProperties = this.tempData;
                    this.statusPopup = 'showPopup';
                    this.showStatus = true;
                    this.queue = false;
                }
            });
        }
    }
    hideModal() {
        this.statusPopup = 'hidePopup';
        interval(500).pipe(takeWhile(() => {
            return this.showStatus == true;
        }))
            .subscribe(() => {
            if (this.showStatus == true) {
                this.showStatus = false;
            }
        });
    }
    checkModalOpening() {
        interval(500)
            .pipe(takeWhile(() => {
            return this.showStatus == true;
        }))
            .subscribe(() => {
            // if (this.showStatus == true && $('#dynamicPopup').css("display") == "none") {
            if (this.showStatus == true && this.statusPopup == '') {
                this.showStatus = false;
            }
        });
    }
    confirm() {
        this.confirmStatus = true;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
            data: this.popupProperties.data
        });
        this.hideModal();
    }
    close() {
        this.confirmStatus = false;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
        });
        this.hideModal();
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicPopupComponent.prototype, "callback", void 0);
DynamicPopupComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-popup',
        template: "<div class=\"dynamic-popup {{statusPopup}}\" id=\"dynamicPopup\">\r\n  <div class=\"foreground-close\" (click)=\"close()\"></div>\r\n  <div class=\"dynamic-popup-inside\">\r\n    <div class=\"dynamic-popup-container\">\r\n      <div class=\"dynamic-popup-header\">\r\n        <p class=\"dynamic-popup-title\">{{popupProperties.header}}</p>\r\n      </div>\r\n      <div class=\"dynamic-popup-body text-center\">\r\n        <span class=\"glyphicon {{popupProperties.icon}} {{popupProperties.colorClass}}\"></span>\r\n        <p id=\"messageLabel\" class=\"data-msg\" [innerHTML]=\"popupProperties.message\"></p>\r\n      </div>\r\n      <div class=\"dynamic-popup-footer text-right\">\r\n        <div *ngIf=\"popupProperties.type == 'confirm'\" id=\"btnDynamicPopupConfirm\" class=\"btn-style-dynamic btn-small\"\r\n             (click)=\"confirm()\"><span class=\"glyphicon glyphicon-ok\"></span>\r\n          <span>OK</span></div>\r\n        <div id=\"btnDynamicPopupClose\" class=\"btn-style-dynamic btn-small\" data-dismiss=\"modal\" aria-label=\"Close\"\r\n             (click)=\"close()\"><span\r\n          class=\"glyphicon glyphicon-remove-circle\"></span> <span>Close</span></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicPopupComponent);

let P2PanelComponent = class P2PanelComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
    }
    ngOnInit() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], P2PanelComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], P2PanelComponent.prototype, "showCloseBtn", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], P2PanelComponent.prototype, "header", void 0);
P2PanelComponent = __decorate([
    Component({
        selector: 'lb9-p2-panel',
        template: "<div id=\"{{id}}\" class=\"mainPanel\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
        styles: [".mainPanel{width:calc(100% - 30px);margin:15px;position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px rgba(0,0,0,.1)}.mainPanel .panelAlign .header{color:#fff;font-size:22px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:1px solid #ddd;border-top:0;padding:15px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:linear-gradient(#fff,#eee)}"]
    }),
    __metadata("design:paramtypes", [])
], P2PanelComponent);

let DynamicFormFrameComponent = class DynamicFormFrameComponent {
    constructor() {
        this.showDeleteRow = false;
        this.callback = new EventEmitter();
    }
    ngOnInit() {
    }
    deleteRowProcess() {
        this.callback.emit({
            action: "deleteRow",
            rowIndex: this.rowIndex
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "showDeleteRow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormFrameComponent.prototype, "callback", void 0);
DynamicFormFrameComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-form-frame',
        template: "<div class=\"mainPanelDF\">\r\n    <div class=\"panelAlign\">\r\n        <div class=\"header\">\r\n            <div>{{header[rowIndex]}}</div>\r\n            <div class=\"closeBtn {{showDeleteRow ? 'show':'hide'}}\" id=\"delete_row_frame_{{rowIndex}}\" (click)=\"deleteRowProcess()\">\r\n                <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"contentPanel\">\r\n            <ng-content></ng-content>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicFormFrameComponent);

const FadeInOutAnimation = [
    trigger('fadeInOut', [
        state('in', style({
            'opacity': '1',
            'visibility': 'visible'
        })),
        state('out', style({
            'opacity': '0',
            'visibility': 'hidden'
        })),
        transition('in => out', [group([
                animate('150ms ease-in-out', style({
                    'opacity': '0'
                })),
                animate('300ms ease-in-out', style({
                    'visibility': 'hidden'
                }))
            ])]),
        transition('out => in', [group([
                animate('200ms ease-in-out', style({
                    'visibility': 'visible'
                })),
                animate('200ms ease-in-out', style({
                    'opacity': '1'
                }))
            ])])
    ]),
];

let DatePickerComponent = class DatePickerComponent {
    constructor() {
        this.showToday = false;
        this.todayText = "Today";
        this.closeOnDateSelect = false;
        this.setDate = new EventEmitter();
        this.inputFocus = new EventEmitter();
        this.onfocus = false;
        this.showPanel = false;
        this.objKeys = Object.keys;
        this.month = 0;
        this.year = 1999;
        this.yearListGen = 0;
        this.dateList = [];
        this.yearList = [];
        this.currentDate = {
            year: 0,
            month: 0,
            day: 0
        };
        this.selectedDate = {
            year: 0,
            month: 0,
            day: 0
        };
        this.showDate = true;
        this.showYear = false;
        this.showMonth = false;
        this.animationState = 'out';
    }
    ngOnInit() {
        let currentDateVal = new Date();
        this.currentDate.day = currentDateVal.getDate();
        this.currentDate.month = currentDateVal.getMonth();
        this.currentDate.year = currentDateVal.getFullYear();
        this.selectedDate = this.currentDate;
        this.month = this.currentDate.month;
        this.year = this.currentDate.year;
        this.generateDateList();
        this.generateYearList();
    }
    generateDateList() {
        this.dateList = [];
        let firstDateOfMonth = new Date(this.year, this.month, 1);
        let lastDateOfMonth = new Date(this.year, this.month + 1, 0);
        let dayOfWeek = firstDateOfMonth.getDay();
        let startDate = firstDateOfMonth.getDate();
        let endDate = lastDateOfMonth.getDate();
        let dateRow = [];
        let dayCount = dayOfWeek;
        for (let i = startDate; i <= endDate; i++) {
            let dateForCal = new Date(this.year, this.month, i);
            dateRow.push({
                day: i,
                month: this.month,
                year: this.year,
                weekDay: dateForCal.getDay()
            });
            if (dayCount == 6 || i == endDate || (this.dateList.length < 5 && i == endDate && dateRow.length == 7)) {
                if (this.dateList.length < 5 && i == endDate && dateRow.length == 7) {
                    this.dateList.push(dateRow);
                    dateRow = [];
                }
                if (i == endDate && dateRow.length < 7) {
                    let nextMonthDate = new Date(this.year, this.month, endDate + 1);
                    let nextDate = nextMonthDate.getDate();
                    let nextMonth = nextMonthDate.getMonth();
                    let nextYear = nextMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.push({
                            day: nextDate,
                            month: nextMonth,
                            year: nextYear
                        });
                        if (dateRow.length == 7 && this.dateList.length < 5) {
                            this.dateList.push(dateRow);
                            dateRow = [];
                        }
                        nextDate++;
                    }
                }
                if (this.dateList.length == 0 && dateRow.length < 7) {
                    let prevMonthDate = new Date(this.year, this.month, 0);
                    let prevDate = prevMonthDate.getDate();
                    let prevMonth = prevMonthDate.getMonth();
                    let prevYear = prevMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.unshift({
                            day: prevDate,
                            month: prevMonth,
                            year: prevYear
                        });
                        prevDate--;
                    }
                }
                this.dateList.push(dateRow);
                dateRow = [];
                dayCount = 0;
            }
            else {
                dayCount++;
            }
        }
    }
    actionPrev() {
        if (this.month == 0) {
            this.year--;
            this.month = 11;
        }
        else {
            this.month--;
        }
        this.generateDateList();
    }
    actionNext() {
        if (this.month == 11) {
            this.year++;
            this.month = 0;
        }
        else {
            this.month++;
        }
        this.generateDateList();
    }
    generateYearList() {
        if (this.yearListGen == 0) {
            this.yearListGen = this.year;
        }
        let startYear = this.yearListGen - 10;
        let endYear = this.yearListGen + 10;
        this.yearList = [];
        for (let i = startYear; i <= endYear; i++) {
            this.yearList.push(i);
        }
    }
    actionPrevYear() {
        this.yearListGen = this.yearListGen - 20;
        this.generateYearList();
    }
    actionNextYear() {
        this.yearListGen = this.yearListGen + 20;
        this.generateYearList();
    }
    actionYearSelect() {
        this.showDate = false;
        this.showMonth = false;
        this.showYear = true;
    }
    selectYear(year) {
        this.year = parseInt(year);
        this.showYear = false;
        this.showMonth = true;
    }
    selectMonth(month) {
        this.month = parseInt(month);
        this.generateDateList();
        this.showMonth = false;
        this.showDate = true;
    }
    selectDate(date) {
        this.selectedDate = date;
        this.setDate.emit(this.selectedDate);
        if (this.closeOnDateSelect) {
            this.open(date);
        }
    }
    open(dateSelected = null) {
        if (String(dateSelected).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
            let dateSplit = String(dateSelected).split("-");
            let dateObj = {
                day: parseInt(dateSplit[2]),
                month: parseInt(dateSplit[1]) - 1,
                year: parseInt(dateSplit[0])
            };
            this.selectedDate = dateObj;
            this.month = parseInt(dateSplit[1]) - 1;
            this.year = parseInt(dateSplit[0]);
            this.generateDateList();
        }
        if (this.showPanel) {
            this.showPanel = false;
            this.animationState = 'out';
        }
        else {
            this.showPanel = true;
            this.animationState = 'in';
        }
    }
    selectToday() {
        // const today = this.currentDate.year+"-"+this.currentDate.month+"-"+this.currentDate.day;
        this.selectDate(this.currentDate);
    }
    closeCalendar() {
        if (this.showPanel && this.onfocus == false) {
            this.showPanel = false;
            this.animationState = 'out';
        }
    }
    setInputFocus() {
        this.onfocus = false;
        this.inputFocus.emit();
    }
    setCalendarFocus() {
        this.onfocus = true;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "monthListLong", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "monthListShort", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "weekDay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "yearOffset", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "showToday", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "todayText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "closeOnDateSelect", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "setDate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "inputFocus", void 0);
DatePickerComponent = __decorate([
    Component({
        selector: 'lb9-date-picker',
        template: "<div class=\"datePickerPanel\" [@fadeInOut]=\"animationState\" (mouseleave)=\"setInputFocus()\" (mouseenter)=\"setCalendarFocus()\">\r\n  <div class=\"datePickerAlign\">\r\n    <div class=\"monthYearPanel\">\r\n      <div class=\"monthYearDisplay\">\r\n        <div class=\"monthYearAction\" (click)=\"actionYearSelect()\">{{monthListLong[month]}} {{(year + yearOffset)}} <span class=\"glyphicon glyphicon-collapse-down\"></span></div>\r\n        <div class=\"prev\" (click)=\"actionPrev()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n        <div class=\"next\" (click)=\"actionNext()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dateTablePanel {{showDate ? 'showPanel':'hidePanel'}}\">\r\n      <table class=\"dateTable\">\r\n        <tr>\r\n          <th *ngFor=\"let day of weekDay\">\r\n            {{day}}\r\n          </th>\r\n        </tr>\r\n        <ng-container *ngFor=\"let dateRow of dateList\">\r\n          <tr>\r\n            <td *ngFor=\"let date of dateRow\">\r\n              <div class=\"dateBtn{{month != date.month? ' otherMonth' : ''}} {{date.day == currentDate.day && date.year == currentDate.year && date.month == currentDate.month ? 'dateCurrent':'dateNormal'}}{{date.weekDay == '0' ? ' dateSun':''}}{{date.weekDay == '6' ? ' dateSat':''}}\" (click)=\"selectDate(date)\">\r\n                <div class=\"{{date.day == selectedDate.day && date.year == selectedDate.year && date.month == selectedDate.month ? 'selected':''}}\" [innerHTML]=\"date.day\"></div>\r\n              </div>\r\n            </td>\r\n          </tr>\r\n        </ng-container>\r\n      </table>\r\n    </div>\r\n    <div class=\"monthTablePanel {{showMonth ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let monthNameIndex of objKeys(monthListLong)\" class=\"monthBtn\" (click)=\"selectMonth(monthNameIndex)\">{{monthListLong[monthNameIndex]}}</div>\r\n    </div>\r\n    <div class=\"yearTablePanel {{showYear ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let year of yearList\" class=\"yearBtn\" (click)=\"selectYear(year)\">{{year + yearOffset}}</div>\r\n      <div class=\"prevYear\" (click)=\"actionPrevYear()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n      <div class=\"nextYear\" (click)=\"actionNextYear()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n    </div>\r\n    <div *ngIf=\"showToday\" class=\"todayPanel\">\r\n      <div class=\"todayBtn\" [innerHTML]=\"todayText\" (click)=\"selectToday()\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
        animations: [FadeInOutAnimation]
    }),
    __metadata("design:paramtypes", [])
], DatePickerComponent);

let DynamicFormLabelPanelComponent = class DynamicFormLabelPanelComponent {
    constructor() {
        this.panelCallBack = new EventEmitter();
    }
    ngOnInit() {
    }
    getLabelDisplay() {
        if (typeof (this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
            return "dp2hide";
        }
        else if (this.option.labelAlign == "left") {
            return "singleLine";
        }
        else {
            return "";
        }
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormLabelPanelComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormLabelPanelComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicFormLabelPanelComponent.prototype, "width", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicFormLabelPanelComponent.prototype, "panelCallBack", void 0);
DynamicFormLabelPanelComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-form-label-panel',
        template: "<div *ngIf=\"fieldCreation.label != ''\" class=\"dp2Label {{getLabelDisplay()}} {{option.labelAlign == 'left' ? 'vAlignTop alignRight' : ''}}\"\r\n     [style.width]=\"width\" (click)=\"processPanelCallBack($event)\">\r\n  <div class=\"{{fieldCreation.require ? 'requireLabel':''}}\" [innerHTML]=\"fieldCreation.label\"></div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicFormLabelPanelComponent);

let PanelMainComponent = class PanelMainComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
        this.margin = false;
    }
    ngOnInit() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "showCloseBtn", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "margin", void 0);
PanelMainComponent = __decorate([
    Component({
        selector: 'lb9-panel-main',
        template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
        styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px rgba(0,0,0,.1)}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:1px solid #ddd;border-top:0;padding:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:linear-gradient(#fff,#eee)}.panelMargin{margin:15px;width:calc(100% - 30px)}"]
    }),
    __metadata("design:paramtypes", [])
], PanelMainComponent);

let PanelChildComponent = class PanelChildComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
        this.margin = true;
    }
    ngOnInit() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelChildComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelChildComponent.prototype, "showCloseBtn", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelChildComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelChildComponent.prototype, "margin", void 0);
PanelChildComponent = __decorate([
    Component({
        selector: 'lb9-panel-child',
        template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
        styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px rgba(0,0,0,.1)}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:1px solid #ddd;border-top:0;padding:10px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:linear-gradient(#fff,#eee)}.panelMargin{margin:5px;width:calc(100% - 10px)}"]
    }),
    __metadata("design:paramtypes", [])
], PanelChildComponent);

let LightBreakDynamicComponent = class LightBreakDynamicComponent {
    constructor() { }
    ngOnInit() {
    }
};
LightBreakDynamicComponent = __decorate([
    Component({
        selector: 'lib-LightBreakDynamic',
        template: `
    <p>
      light-break-dynamic works!
    </p>
  `
    }),
    __metadata("design:paramtypes", [])
], LightBreakDynamicComponent);

let ContentPopupComponent = class ContentPopupComponent {
    constructor() {
        this.header = "header";
        this.footer = "";
        this.elementName = 'default';
        this.closeByButtonOnly = false;
        this.customClass = null;
        this.noScroll = false;
        this.callBack = new EventEmitter();
        this.display = false;
        this.overContent = false;
        this.animationState = 'out';
        this.onAnimation = false;
        this.closeDelay = timer(400);
    }
    ngOnInit() {
    }
    closePopup(forceClose = false) {
        if (((!this.overContent && !this.closeByButtonOnly) || forceClose) && !this.onAnimation) {
            this.animationState = 'out';
            this.display = false;
            this.callbackProcess('close');
        }
    }
    showPopup() {
        this.animationState = 'in';
        this.display = true;
        this.callbackProcess('open');
        this.onAnimation = true;
        this.closeDelay.subscribe(() => {
            this.onAnimation = false;
        });
    }
    releaseContent() {
        this.overContent = true;
    }
    lockContent() {
        this.overContent = false;
    }
    callbackProcess(action) {
        this.callBack.emit({
            element: "popUp",
            name: this.elementName,
            action: action,
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "footer", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "elementName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "closeByButtonOnly", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "customClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "noScroll", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ContentPopupComponent.prototype, "callBack", void 0);
ContentPopupComponent = __decorate([
    Component({
        selector: 'lb9-content-popup',
        template: "<div class=\"lb9-dim\" [@fadeInOut]=\"animationState\" (click)=\"closePopup()\">\n    <div class=\"popupPanel\">\n        <div class=\"popupAlign\">\n            <div class=\"popupContentTable\">\n                <div class=\"popupContentRow\">\n                    <div class=\"popupContentCell\">\n                        <div class=\"popupContent{{customClass ? ' '+customClass: ''}}\" (mouseover)=\"releaseContent()\" (mouseout)=\"lockContent()\">\n                            <div class=\"closeBtn\">\n                                <abbr title=\"Close\">\n                                    <span class=\"glyphicon glyphicon-remove\" (click)=\"closePopup(true)\"></span>\n                                </abbr>\n                            </div>\n                            <div *ngIf=\"header.length > 0\" class=\"popupHeader\" [innerHTML]=\"header\">\n                            </div>\n                            <div class=\"popupContentDetail{{noScroll ? ' noScroll':' scroll'}}\">\n                                <ng-content>\n                                </ng-content>\n                            </div>\n                            <div *ngIf=\"footer.length > 0\" class=\"popupFooter\" [innerHTML]=\"footer\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
        animations: [FadeInOutAnimation],
        styles: [".lb9-dim{width:100vw;height:100vh;position:fixed;top:0;left:0;background:rgba(0,0,0,.2);z-index:99}.show{display:block}.hide{display:none}.popupPanel{max-width:95vw;max-height:95vh;margin:2.5vh auto;height:95vh}.popupPanel .popupAlign .popupContentTable{display:table;margin:0 auto}.popupPanel .popupAlign .popupContentTable .popupContentRow{display:table-row}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell{display:table-cell;vertical-align:middle;height:95vh;max-height:95vh}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent{position:relative}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent .closeBtn{cursor:pointer}"]
    }),
    __metadata("design:paramtypes", [])
], ContentPopupComponent);

const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '70vh', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
                animate('400ms ease-in-out', style({
                    'opacity': '0'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '0px'
                })),
                animate('700ms ease-in-out', style({
                    'visibility': 'hidden'
                }))
            ])]),
        transition('out => in', [group([
                animate('1ms ease-in-out', style({
                    'visibility': 'visible'
                })),
                animate('600ms ease-in-out', style({
                    'max-height': '70vh'
                })),
                animate('800ms ease-in-out', style({
                    'opacity': '1'
                }))
            ])])
    ]),
];

let CollapseComponent = class CollapseComponent {
    constructor() {
        this.header = 'Collapse';
        this.callBack = new EventEmitter();
        this.animationState = 'out';
        this.active = false;
        this.onAction = false;
        this.timeDelay = timer(1000);
    }
    ngOnInit() {
    }
    toggleShowDiv() {
        if (this.onAction === false) {
            if (this.animationState === 'out') {
                this.animationState = 'in';
                this.active = true;
            }
            else {
                this.animationState = 'out';
                this.active = false;
            }
            this.onAction = true;
            this.timeDelay.subscribe(() => {
                this.onAction = false;
            });
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseComponent.prototype, "header", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CollapseComponent.prototype, "callBack", void 0);
CollapseComponent = __decorate([
    Component({
        selector: 'lb9-collapse',
        template: "<div class=\"lbCollapse\">\n    <div class=\"collapseHeaderPanel{{active ? ' active':''}}\" (click)=\"toggleShowDiv()\">\n        <div class=\"collapseHeader\" [innerHTML]=\"header\">\n\n        </div>\n        <div class=\"collapseArrow\"></div>\n    </div>\n    <div class=\"collapseContent\" [@slideInOut]=\"animationState\">\n        <ng-content>\n\n        </ng-content>\n    </div>\n</div>\n",
        animations: [SlideInOutAnimation],
        styles: [".lbCollapse{margin-top:10px}.lbCollapse .collapseHeaderPanel{position:relative}.lbCollapse .collapseHeaderPanel .collapseArrow{position:absolute;right:0;top:0;width:10px;height:10px;border-top:4px solid #666;border-right:4px solid #666;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-transition:.5s;transition:.5s}.lbCollapse .active .collapseArrow{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition:.5s;transition:.5s}.lbCollapse .collapseContent{width:100%;overflow:auto}"]
    }),
    __metadata("design:paramtypes", [])
], CollapseComponent);

let StepTabComponent = class StepTabComponent {
    constructor() {
        this.tabList = [];
        this.stepClick = false;
        this.callBack = new EventEmitter();
        this.calculateCss = '';
        this.objKeys = Object.keys;
        this.activeStep = 0;
    }
    ngOnInit() {
        this.lastTab = this.tabList.length - 1;
        const percentWidth = Math.floor(100 / this.tabList.length);
        this.calculateCss = 'calc(' + String(percentWidth) + '% - 2px)';
    }
    getActive(tabNumber) {
        if (tabNumber == this.activeStep) {
            return "stepShow";
        }
        else {
            return "stepHide";
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
    gotoStepClick(stepIndex) {
        if (this.tabList[stepIndex] && this.stepClick) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepTabComponent.prototype, "tabList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepTabComponent.prototype, "stepClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], StepTabComponent.prototype, "callBack", void 0);
StepTabComponent = __decorate([
    Component({
        selector: 'lb9-step-tab',
        template: "<div class=\"tabStepPanel\">\r\n    <div *ngFor=\"let tabIndex of objKeys(tabList)\" class=\"tabStep{{tabIndex == activeStep ? ' active': tabIndex < activeStep ? ' pass': tabIndex > activeStep ? ' inactive':''}}\" [style.width]=\"tabIndex == lastTab ? '' : calculateCss\" (click)=\"gotoStepClick(tabIndex)\">\r\n        <div [innerHTML]=\"(tabIndex == activeStep ? tabList[tabIndex].header: tabIndex <= activeStep ? tabList[tabIndex].pass ? tabList[tabIndex].pass: tabList[tabIndex].header: tabList[tabIndex].header)\" class=\"header\" id=\"clickStepTab_{{tabIndex}}\"></div>\r\n        <div *ngIf=\"tabIndex != lastTab\" class=\"line\"></div>\r\n        <div class=\"tabLabel{{tabIndex <= activeStep ? ' active':''}}\" id=\"clickStepTab_label_{{tabIndex}}\" [innerHTML]=\"tabList[tabIndex].label\"></div>\r\n    </div>\r\n</div>\r\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], StepTabComponent);

let SideBarComponent = class SideBarComponent {
    constructor() {
        this.sideBarWidth = 200;
        this.componentWidth = "100vw";
        this.sideBarWidthCal = "200px";
        this.contentWidthCal = "calc(100vw - 200px)";
        this.leftOffset = "0px";
        this.active = true;
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
    }
    ngOnInit() {
        this.sideBarWidthCal = this.sideBarWidth + "px";
        this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
    }
    toggleSideBar() {
        if (this.active == true) {
            this.active = false;
            this.componentWidth = "calc(100vw + " + this.sideBarWidth + "px)";
            this.contentWidthCal = "calc(100vw - 0px)";
            this.leftOffset = "-" + this.sideBarWidth + "px";
        }
        else {
            this.active = true;
            this.componentWidth = "calc(100vw + 0px)";
            this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
            this.leftOffset = "0px";
        }
    }
    reProcessScrollBar() {
        timer(150).subscribe(() => {
            this.aNgScrollBar.update();
            timer(10).subscribe(() => {
                this.fixScrollBar = this.aNgScrollBar.state.isVerticallyScrollable;
            });
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], SideBarComponent.prototype, "sideBarWidth", void 0);
__decorate([
    ViewChild(NgScrollbar),
    __metadata("design:type", NgScrollbar)
], SideBarComponent.prototype, "aNgScrollBar", void 0);
SideBarComponent = __decorate([
    Component({
        selector: 'lb9-side-bar',
        template: "<div class=\"sbPanel\">\n    <div class=\"sbAlign\">\n        <div class=\"sbContent\">\n            <div class=\"topBar\">\n                <div class=\"expandIcon\" (click)=\"toggleSideBar()\"><span class=\"glyphicon glyphicon-menu-hamburger\"></span>\n                </div>\n                <div class=\"detailBar\">\n                    <ng-content select=\"[topBar]\"></ng-content>\n                </div>\n            </div>\n            <div class=\"contentBody\">\n                <div class=\"contentOffset\" [ngStyle]=\"{width: componentWidth, left: leftOffset}\">\n                    <div class=\"contentPanel\">\n                        <div class=\"leftSide\" [ngStyle]=\"{width: sideBarWidthCal}\">\n                            <ng-scrollbar class=\"fixHeight\">\n                                <div class=\"scrollHeight {{fixScrollBar ? 'fix-ng-scrollbar' : ''}}\" (click)=\"reProcessScrollBar()\">\n                                    <ng-content select=\"[sideBar]\"></ng-content>\n                                </div>\n                            </ng-scrollbar>\n                        </div>\n                        <div class=\"contentAll\" [ngStyle]=\"{width: contentWidthCal}\">\n                            <div class=\"contentBody\">\n                                <div class=\"blockContentSize\" [ngStyle]=\"{width: contentWidthCal}\">\n                                    <ng-content select=\"[contentBody]\"></ng-content>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n",
        styles: [".sbPanel{display:block;max-height:100vh;overflow:hidden}.sbPanel .sbAlign{position:relative;height:100vh;-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent{width:100vw;-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent .topBar{position:relative;height:40px;display:table;width:100%}.sbPanel .sbAlign .sbContent .topBar .expandIcon{color:#3a3a3a;line-height:40px;font-size:22px;padding:0 10px;display:table-cell;vertical-align:top;width:40px;text-align:center}.sbPanel .sbAlign .sbContent .topBar .detailBar{display:table-cell}.sbPanel .sbAlign .sbContent .contentBody{position:relative}.sbPanel .sbAlign .sbContent .contentBody .contentOffset{position:absolute;-webkit-transition:.5s;transition:.5s;max-height:calc(100vh - 40px);overflow:hidden}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel{display:table-row}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide{display:table-cell;vertical-align:top}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide .fixHeight{position:relative;max-height:calc(100vh - 40px);overflow:auto}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide .fixHeight .scrollHeight{min-height:calc(100vh - 40px);-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .contentAll{display:table-cell;overflow:hidden;-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .contentAll .blockContentSize{-webkit-transition:.5s;transition:.5s;height:calc(100vh - 40px);overflow:auto}"]
    }),
    __metadata("design:paramtypes", [])
], SideBarComponent);

let CollapseMenuComponent = class CollapseMenuComponent {
    constructor() {
        this.menuObject = {
            option: null,
            menuList: []
        };
        this.role = [];
        this.activeLinkCode = "";
        this.level = 0;
        this.option = {
            rootPadding: 10,
            childPadding: 10,
            itemHeight: 30
        };
        this.callback = new EventEmitter();
        this.padding = "0px";
        this.lineHeight = "30px";
    }
    ngOnInit() {
        if (this.menuObject.option) {
            this.option = Object.assign(this.option, this.menuObject.option);
            // console.log(this.option);
        }
        this.padding = String(this.option.childPadding + (this.level * this.option.childPadding)) + "px";
        this.lineHeight = this.option.itemHeight + "px";
    }
    activeItem(index) {
        if (this.menuObject.menuList[index].children) {
            if (!this.menuObject.menuList[index].active) {
                this.menuObject.menuList[index].active = true;
            }
            else {
                this.menuObject.menuList[index].active = false;
            }
        }
        this.callback.emit({
            route: this.menuObject.menuList[index].route,
            code: this.menuObject.menuList[index].code,
            children: (this.menuObject.menuList[index].children ? this.menuObject.menuList[index].children.length : 0)
        });
    }
    getHeight(index) {
        let height = "0px";
        if (this.menuObject.menuList[index].active) {
            let childActive = this.getChildActiveLength(this.menuObject.menuList[index].children);
            height = (childActive * this.option.itemHeight) + "px";
        }
        return height;
    }
    getChildActiveLength(menuChild) {
        let itemActive = 0;
        if (menuChild) {
            // itemActive = menuChild.menuList.length;
            for (let childItemIndex in menuChild.menuList) {
                let childItem = menuChild.menuList[childItemIndex];
                if (this.checkChildRole(childItem)) {
                    itemActive++;
                }
                if (childItem.active && this.checkRole(childItemIndex)) {
                    itemActive += this.getChildActiveLength(childItem.children);
                }
            }
        }
        return itemActive;
    }
    childCallback(data) {
        this.callback.emit(data);
    }
    checkRole(index) {
        if (!this.menuObject.menuList[index].role) {
            return true;
        }
        else {
            let allow = true;
            for (let roleItem of this.menuObject.menuList[index].role) {
                if (this.role != null && this.role.indexOf(roleItem) < 0) {
                    allow = false;
                }
                if (allow == false) {
                    break;
                }
            }
            return allow;
        }
    }
    checkChildRole(child) {
        if (!child.role) {
            return true;
        }
        else {
            let allow = true;
            for (let roleItem of child.role) {
                if (this.role != null && this.role.indexOf(roleItem) < 0) {
                    allow = false;
                }
                if (allow == false) {
                    break;
                }
            }
            return allow;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "menuObject", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "role", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "activeLinkCode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "level", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "option", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "callback", void 0);
CollapseMenuComponent = __decorate([
    Component({
        selector: 'lb9-collapse-menu',
        template: "<div *ngFor=\"let menuItem of menuObject.menuList;let i = index\" class=\"menuList\">\r\n    <div (click)=\"activeItem(i)\" *ngIf=\"checkRole(i)\"\r\n         class=\"menuItem{{activeLinkCode && activeLinkCode == menuItem.code && activeLinkCode != '' ? ' menuItemActive':''}}\r\n        {{menuItem.customClass ? ' '+menuItem.customClass:''}}\"\r\n         [ngStyle]=\"{paddingLeft:padding, lineHeight:lineHeight}\">\r\n        <div class=\"menuName\" [innerHTML]=\"menuItem.name\"></div>\r\n        <div [innerHTML]=\"menuItem.numberOfData\" *ngIf=\"menuItem.numberOfData\"></div>\r\n        <div class=\"menuArrow{{menuItem.active ? ' menuArrowExpand':''}}\" *ngIf=\"menuItem.children\"></div>\r\n    </div>\r\n    <div *ngIf=\"menuItem.children\" class=\"menuChild\" [ngStyle]=\"{height:getHeight(i)}\">\r\n        <lb9-collapse-menu [menuObject]=\"menuItem.children\"\r\n                           [activeLinkCode]=\"activeLinkCode\"\r\n                           [level]=\"level+1\"\r\n                           [option]=\"option\"\r\n                           [role]=\"role\"\r\n                           (callback)=\"childCallback($event)\"></lb9-collapse-menu>\r\n    </div>\r\n</div>\r\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], CollapseMenuComponent);

let FormHttpRequestService = class FormHttpRequestService {
    constructor(http) {
        this.http = http;
        this.apiUrl = "";
        this.formConfigUrl = "";
        this.checkHash = null;
        this.httpOption = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
    }
    processCheckHash() {
        this.getCheckHash().subscribe((resp) => {
            this.checkHash = resp;
        });
    }
    getHash(formName) {
        if (this.checkHash && this.checkHash[formName]) {
            return this.checkHash[formName];
        }
        return null;
    }
    getCheckHash() {
        const url = this.formConfigUrl + "_check-hash";
        return this.http.post(url, null, this.httpOption);
    }
    setToken(token) {
        this.httpOption.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Token': token
        });
    }
    setApiUrl(url) {
        this.apiUrl = url;
    }
    setFormConfigUrl(url) {
        if (!String(url).match(/\/$/)) {
            url = url + "/";
        }
        this.formConfigUrl = url;
        this.processCheckHash();
    }
    post(payload) {
        const url = this.apiUrl;
        return this.http.post(url, payload, this.httpOption);
    }
    getConfig(module) {
        const url = this.formConfigUrl + module;
        return this.http.post(url, null, this.httpOption);
    }
};
FormHttpRequestService.ctorParameters = () => [
    { type: HttpClient }
];
FormHttpRequestService.ɵprov = ɵɵdefineInjectable({ factory: function FormHttpRequestService_Factory() { return new FormHttpRequestService(ɵɵinject(HttpClient)); }, token: FormHttpRequestService, providedIn: "root" });
FormHttpRequestService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [HttpClient])
], FormHttpRequestService);

let AutoFormMasterFunctionComponent = class AutoFormMasterFunctionComponent {
    constructor(httpRequest, lockScreen) {
        this.httpRequest = httpRequest;
        this.lockScreen = lockScreen;
        this.saveControlFunction = (mode, formName, param) => {
            return true;
        };
        this.refinedListData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedSaveData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedDeleteData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedMasterData = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedListPayload = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedError = (data, formName = "", provideData = null) => {
            return data;
        };
        this.refinedMasterDataPayload = (data, formName = "", provideData = null) => {
            return data;
        };
        this.provideData = {};
        this.formName = 'test';
        this.button = {
            add: "Add",
            save: "Save",
            clear: "Clear",
            reset: "Reset",
            search: "Search",
            confirm: "Confirm",
            cancel: "Cancel"
        };
        this.callback = new EventEmitter();
        this.subscription = new Subscription();
        this.order = [];
        this.mode = "add";
        this.form = {
            form: {},
            data: []
        };
        this.filterMode = "single";
        this.filter = {
            form: {
                option: {
                    mode: "add",
                    customClass: "",
                    labelAlign: "left",
                    enableAnimation: false
                },
                containerList: [
                    {
                        containerName: "singleFilter",
                        customClass: "",
                        columnSpan: "1/1",
                        fieldList: [
                            {
                                fieldName: "filter",
                                label: "Filter:",
                                columnPerLine: 1,
                                type: "textBox",
                                default: [
                                    ""
                                ],
                                inputPattern: ".*",
                                valuePattern: ".*",
                                validateWhileKeyPress: false,
                                multiValue: false,
                                note: "",
                                readonly: false,
                                require: false,
                                maxLength: 255,
                                labelWidth: 45
                            },
                        ]
                    }
                ]
            },
            data: []
        };
        this.model = {};
        this.dataList = {};
        this.config = {};
        this.page = 0;
        this.limit = 0;
        this.tempDelete = null;
        this.masterData = {};
        this.errorContent = "";
        this.tempFilter = null;
    }
    ngOnInit() {
        this.subscription.add(timer(100).subscribe(() => {
            this.getConfig();
        }));
    }
    getConfig() {
        let savedConfigRaw = localStorage.getItem("masterFormData");
        let savedConfig = null;
        let parseConfig = null;
        if (savedConfigRaw !== null) {
            parseConfig = JSON.parse(savedConfigRaw);
        }
        if (parseConfig && parseConfig[this.formName]) {
            savedConfig = parseConfig[this.formName];
        }
        let checkHash = this.httpRequest.getHash(this.formName);
        this.lockScreen.lockScreen();
        if (checkHash === null || savedConfig == null || (savedConfig && checkHash !== savedConfig.hash)) {
            this.subscription.add(this.httpRequest.getConfig(this.formName).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status && resp.status == true) {
                    this.config = resp.config;
                    let saveConfig = {
                        hash: checkHash,
                        config: this.config
                    };
                    if (!parseConfig) {
                        parseConfig = {};
                    }
                    parseConfig[this.formName] = saveConfig;
                    localStorage.setItem("masterFormData", JSON.stringify(parseConfig));
                    this.processConfig();
                }
            }));
        }
        else {
            this.config = savedConfig.config;
            this.processConfig();
        }
    }
    processConfig() {
        if (this.config.list) {
            this.dataList = this.config.list;
        }
        if (this.config.model) {
            this.model = this.config.model;
        }
        if (this.config.form) {
            this.form.form = this.config.form;
            this.subscription.add(timer(250).subscribe(() => {
                if (this.form.data.length == 0) {
                    this.dynamicForm.addRow();
                }
            }));
        }
        if (this.config.filterAdvance) {
            this.subscription.add(timer(250).subscribe(() => {
                let advanceFilter = {
                    containerName: "advanceFilter",
                    customClass: "hideFilter",
                    columnSpan: "1/1",
                    fieldList: this.config.filterAdvance.fieldList
                };
                this.filter.form.containerList.push(advanceFilter);
                this.filterForm.reRenderForm();
                this.filterForm.addRow();
                this.processLoadMasterData();
            }));
        }
        else {
            this.subscription.add(timer(500).subscribe(() => {
                this.filterForm.addRow();
                this.processLoadMasterData();
            }));
        }
        if (this.config.button) {
            this.button = this.config.button;
        }
    }
    processLoadMasterData() {
        if (this.config.masterData) {
            let payload = {
                dataList: []
            };
            for (let fieldName in this.config.masterData) {
                payload.dataList.push({
                    moduleName: this.config.masterData[fieldName]
                });
            }
            payload = this.refinedMasterDataPayload(payload, this.formName, this.provideData);
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp && resp.status == true) {
                    for (let fieldName in this.config.masterData) {
                        this.masterData[fieldName] = resp.data[this.config.masterData[fieldName]];
                    }
                    this.masterData = this.refinedMasterData(this.masterData, this.formName, this.provideData);
                    this.processAssignMasterData();
                }
                else {
                    alert("Error loading master data.");
                }
            }));
        }
    }
    processAssignMasterData() {
        let mapSetAttr = {};
        for (let fieldName in this.masterData) {
            mapSetAttr[fieldName] = {
                valueList: this.masterData[fieldName]
            };
        }
        this.dynamicForm.mapSetAttribute(mapSetAttr);
        this.filterForm.mapSetAttribute(mapSetAttr);
        this.processLoadList(1, (this.dataList.rowLimit ? this.dataList.rowLimit : 10), false);
    }
    processLoadList(page = 1, limit = 10, filter = true) {
        this.page = page;
        this.limit = limit;
        let filterParam = this.filterForm.getParam();
        if (this.config.module && this.config.module.list) {
            let payload = {
                moduleName: this.config.module.list,
                limit: limit,
                page: page
            };
            if (filter && this.filterMode == "single" && filterParam.filter && filterParam.filter.length > 0) {
                let param = {};
                for (let paramName of this.config.filter.paramList) {
                    param[paramName] = filterParam.filter;
                }
                payload["param"] = param;
                payload["condition"] = this.config.filter.condition;
            }
            else if (filter && this.filterMode == "multiple") {
                payload["param"] = filterParam;
                payload["condition"] = this.config.filterAdvance.condition;
            }
            if (this.order.length > 0) {
                payload["sort"] = this.order;
            }
            payload = this.refinedListPayload(payload, this.formName, this.provideData);
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    if (resp.data[this.config.module.list] && resp.data[this.config.module.list].length > 0) {
                        this.dataList.data = this.refinedListData(resp.data[this.config.module.list], this.formName, this.provideData);
                        this.dataList.pagination = resp.data[this.config.module.list + "Pagination"];
                    }
                    else {
                        if (this.page > 1) {
                            this.page--;
                            this.dynamicTable.currentPage = this.page;
                            this.processLoadList(this.page, this.limit);
                        }
                        else {
                            this.dataList.data = null;
                            this.dataList.pagination = resp.data[this.config.module.list + "Pagination"];
                        }
                    }
                }
            }));
        }
    }
    processListCallback(e) {
        if (e.action == 'page') {
            this.processLoadList(e.pageNumber, e.limit);
        }
        else if (e.action == 'edit') {
            this.loadEditData(e.primaryKey);
        }
        else if (e.action == 'delete') {
            this.tempDelete = e.primaryKey;
            this.confirmPopUp.showPopup();
        }
        else if (e.action == "sort") {
            this.order = [];
            this.order.push({
                fieldName: e.fieldName,
                order: e.order
            });
            this.processLoadList(this.page, this.limit);
        }
        this.callback.emit({
            event: "listEvent",
            formName: this.formName,
            data: e
        });
    }
    confirmDelete() {
        this.processDeleteData(this.tempDelete);
        this.confirmPopUp.closePopup(true);
    }
    processDeleteData(primaryKey) {
        if (this.config.module && this.config.module.delete) {
            let refinedData = this.refinedDeleteData(primaryKey, this.formName, this.provideData);
            let payload = {
                moduleName: this.config.module.delete,
                param: refinedData
            };
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    this.processLoadList(this.page, this.limit);
                    this.callback.emit({
                        event: "deleteSuccess",
                        formName: this.formName,
                        data: primaryKey
                    });
                }
                else {
                    alert("Can't load delete data.");
                }
            }));
        }
    }
    openAddForm() {
        this.mode = 'add';
        this.dynamicForm.setMode('add');
        this.dynamicForm.setDefault();
        this.formPopUp.showPopup();
        this.callback.emit({
            event: "addOpen",
            formName: this.formName,
            data: null
        });
    }
    loadEditData(primaryKey) {
        if (this.config.module && this.config.module.list) {
            let payload = {
                moduleName: this.config.module.list,
                param: primaryKey
            };
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp.status == true) {
                    let mapSet = resp.data[this.config.module.list][0];
                    this.mode = 'edit';
                    this.dynamicForm.setMode('edit');
                    this.dynamicForm.mapSetValue(mapSet, 0);
                    this.dynamicForm.setSavePoint();
                    this.formPopUp.showPopup();
                    this.callback.emit({
                        event: "editOpen",
                        formName: this.formName,
                        data: null
                    });
                }
                else {
                    alert("Can't load edit data.");
                }
            }));
        }
    }
    clearForm() {
        this.dynamicForm.setDefault();
    }
    resetForm() {
        this.dynamicForm.getSavePoint();
    }
    save() {
        let param = this.refinedSaveData(this.dynamicForm.getParam(), this.formName, this.provideData);
        if (this.dynamicForm.checkRequireAll() && this.dynamicForm.checkValidateAll() && this.saveControlFunction(this.mode, this.formName, param)) {
            let payload = {};
            if (this.mode == 'add' && this.config.module.add) {
                payload = {
                    moduleName: this.config.module.add,
                    param
                };
            }
            else if (this.mode == 'edit' && this.config.module.edit) {
                payload = {
                    moduleName: this.config.module.edit,
                    param
                };
            }
            this.lockScreen.lockScreen();
            this.subscription.add(this.httpRequest.post(payload).subscribe((resp) => {
                this.lockScreen.unLockScreen();
                if (resp && resp.status == true) {
                    this.clearFilter();
                    this.processLoadList(this.page, this.limit);
                    this.formPopUp.closePopup(true);
                    this.callback.emit({
                        event: "saveSuccess",
                        formName: this.formName,
                        data: null
                    });
                }
                else {
                    alert("Error can't save data.");
                }
            }, (error) => {
                this.lockScreen.unLockScreen();
                this.processError(error);
            }));
        }
    }
    switchFilterMode() {
        if (this.filterMode === "single") {
            this.filterMode = "multiple";
            if (this.config.filterAdvance.option && this.config.filterAdvance.option.labelAlign) {
                this.filter.form.option.labelAlign = this.config.filterAdvance.option.labelAlign;
            }
            this.filterForm.setContainerAttribute("singleFilter", "customClass", "hideFilter");
            this.filterForm.setContainerAttribute("advanceFilter", "customClass", "");
        }
        else {
            this.filter.form.option.labelAlign = "left";
            this.filterMode = "single";
            this.filterForm.setContainerAttribute("singleFilter", "customClass", "");
            this.filterForm.setContainerAttribute("advanceFilter", "customClass", "hideFilter");
        }
    }
    processFilter() {
        let param = this.filterForm.getParam();
        if (JSON.stringify(this.tempFilter) !== JSON.stringify(param)) {
            this.tempFilter = param;
            this.page = 1;
            this.dynamicTable.currentPage = 1;
        }
        this.processLoadList(this.page, this.limit);
    }
    clearFilter() {
        this.filterForm.setDefault();
        this.processFilter();
    }
    actKnownError() {
        this.errorPopUp.closePopup(true);
    }
    processError(error) {
        error = this.refinedError(error, this.formName, this.provideData);
        let errorMsg = "";
        if (error.error.message) {
            if (typeof (error.error.message) === "object" && error.error.message.length > 0) {
                let errorArray = [];
                for (let errorDataRow of error.error.message) {
                    if (typeof (errorDataRow) === "object") {
                        errorArray.push(JSON.stringify(errorDataRow));
                    }
                    else if (typeof (errorDataRow) === "string") {
                        errorArray.push(errorDataRow);
                    }
                }
                errorMsg = errorArray.join("<br>");
            }
            else {
                errorMsg = error.error.message;
            }
        }
        else {
            errorMsg = error.message;
        }
        this.errorContent = errorMsg;
        this.errorPopUp.showPopup();
    }
    check() {
        console.log(this.form);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
AutoFormMasterFunctionComponent.ctorParameters = () => [
    { type: FormHttpRequestService },
    { type: LockScreenService }
];
__decorate([
    ViewChild("formPopUp"),
    __metadata("design:type", ContentPopupComponent)
], AutoFormMasterFunctionComponent.prototype, "formPopUp", void 0);
__decorate([
    ViewChild("confirmPopUp"),
    __metadata("design:type", ContentPopupComponent)
], AutoFormMasterFunctionComponent.prototype, "confirmPopUp", void 0);
__decorate([
    ViewChild("errorPopUp"),
    __metadata("design:type", ContentPopupComponent)
], AutoFormMasterFunctionComponent.prototype, "errorPopUp", void 0);
__decorate([
    ViewChild("dynamicForm"),
    __metadata("design:type", DynamicFormComponent)
], AutoFormMasterFunctionComponent.prototype, "dynamicForm", void 0);
__decorate([
    ViewChild("filterForm"),
    __metadata("design:type", DynamicFormComponent)
], AutoFormMasterFunctionComponent.prototype, "filterForm", void 0);
__decorate([
    ViewChild("dynamicTable"),
    __metadata("design:type", DynamicTableComponent)
], AutoFormMasterFunctionComponent.prototype, "dynamicTable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "saveControlFunction", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedListData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedSaveData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedDeleteData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedMasterData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedListPayload", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedError", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], AutoFormMasterFunctionComponent.prototype, "refinedMasterDataPayload", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoFormMasterFunctionComponent.prototype, "provideData", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoFormMasterFunctionComponent.prototype, "formName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], AutoFormMasterFunctionComponent.prototype, "button", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AutoFormMasterFunctionComponent.prototype, "callback", void 0);
AutoFormMasterFunctionComponent = __decorate([
    Component({
        template: ''
    }),
    __metadata("design:paramtypes", [FormHttpRequestService, LockScreenService])
], AutoFormMasterFunctionComponent);

let AutoFormComponent = class AutoFormComponent extends AutoFormMasterFunctionComponent {
    constructor(http, lockScr) {
        super(http, lockScr);
        this.http = http;
        this.lockScr = lockScr;
    }
};
AutoFormComponent.ctorParameters = () => [
    { type: FormHttpRequestService },
    { type: LockScreenService }
];
AutoFormComponent = __decorate([
    Component({
        selector: 'lb9-auto-form',
        template: "<div class=\"autoForm\">\n    <div class=\"searchPanel\">\n        <div class=\"searchPanelRow{{(config.module && config.module.list && config.filter && config.filter.paramList && config.filter.paramList.length > 0 ? '': ' hide')}}\">\n            <div class=\"searchInput\">\n                <ng-container *ngIf=\"filter.form && filter.form.containerList\">\n                    <lb9-dynamic-form #filterForm [formCreation]=\"filter\" [model]=\"model\"></lb9-dynamic-form>\n                </ng-container>\n            </div>\n            <div class=\"searchAdvBtn\" *ngIf=\"config.filterAdvance\">\n                <div class=\"more\" (click)=\"switchFilterMode()\">\n                    <span class=\"glyphicon glyphicon-list\"></span>\n                </div>\n            </div>\n            <div class=\"searchButton\">\n                <div class=\"btn-style-dynamic\" [innerHTML]=\"button.search\" (click)=\"processFilter()\"></div>\n                <div class=\"btn-style-dynamic clearBtn\" [innerHTML]=\"button.clear\" (click)=\"clearFilter()\"></div>\n            </div>\n\n        </div>\n    </div>\n    <div *ngIf=\"config.module && config.module.add\" class=\"btn-style-dynamic\" (click)=\"openAddForm()\" [innerHTML]=\"button.add\"></div>\n    <div class=\"{{config.module && config.module.list ? '': ' hide'}}\">\n        <lb9-dynamic-table #dynamicTable [tableCreation]=\"dataList\" (callBack)=\"processListCallback($event)\"></lb9-dynamic-table>\n    </div>\n</div>\n<lb9-content-popup #formPopUp [header]=\"(mode == 'add' ? (config.content ? config.content.addHeader : '') : (config.content ? config.content.editHeader : ''))\"\n                   [closeByButtonOnly]=\"true\"\n                   [noScroll]=\"true\">\n    <ng-container *ngIf=\"form.form && form.form.containerList\">\n        <lb9-dynamic-form  #dynamicForm [formCreation]=\"form\" [model]=\"model\"></lb9-dynamic-form>\n        <div class=\"btnPanel\">\n            <div class=\"btn-style-dynamic\" (click)=\"save()\" [innerHTML]=\"button.save\"></div>\n            <div *ngIf=\"mode == 'add'\" class=\"btn-style-dynamic clearBtn\" (click)=\"clearForm()\" [innerHTML]=\"button.clear\"></div>\n            <div *ngIf=\"mode == 'edit'\" class=\"btn-style-dynamic clearBtn\" (click)=\"resetForm()\" [innerHTML]=\"button.reset\"></div>\n        </div>\n    </ng-container>\n</lb9-content-popup>\n<lb9-content-popup #confirmPopUp [header]=\"config.content ? config.content.confirmDeleteHeader : ''\">\n    <div class=\"btn-style-dynamic\" (click)=\"confirmDelete()\" [innerHTML]=\"button.confirm\"></div>\n    <div class=\"btn-style-dynamic clearBtn\" (click)=\"confirmPopUp.closePopup(true)\" [innerHTML]=\"button.cancel\"></div>\n</lb9-content-popup>\n<lb9-content-popup #errorPopUp [header]=\"'Error'\">\n    <div>{{errorContent}}</div>\n    <div class=\"btnPanel\">\n        <div class=\"btn-style-dynamic text-center\" (click)=\"actKnownError()\" [innerHTML]=\"button.confirm\"></div>\n    </div>\n</lb9-content-popup>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [FormHttpRequestService, LockScreenService])
], AutoFormComponent);

let ContentPanelComponent = class ContentPanelComponent {
    constructor() {
        this.panelData = null;
    }
    ngOnInit() {
        // let htmlHead = document.getElementsByTagName("header")/
        let styleTag = document.createElement("style");
        styleTag.id = "style_" + this.panelData.id;
        styleTag.innerText = this.panelData.css;
        document.head.appendChild(styleTag);
    }
    ngOnDestroy() {
        let destroyId = document.getElementById("style_" + this.panelData.id);
        destroyId.remove();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPanelComponent.prototype, "panelData", void 0);
ContentPanelComponent = __decorate([
    Component({
        selector: 'lb9-content-panel',
        template: "<div id=\"{{panelData.id}}\">\n    <div [innerHTML]=\"panelData.html\">\n    </div>\n</div>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], ContentPanelComponent);

let LightBreakDynamicModule = class LightBreakDynamicModule {
};
LightBreakDynamicModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            NgScrollbarModule,
            HttpClientModule
        ],
        declarations: [
            DynamicInputComponent,
            LabelComponent,
            TextBoxComponent,
            InputComponent,
            DynamicFormComponent,
            CheckBoxComponent,
            TextAreaComponent,
            SelectBoxComponent,
            DynamicContainerComponent,
            HiddenComponent,
            FileUploadComponent,
            ImageComponent,
            AutoCompleteComponent,
            DynamicTableComponent,
            TableComponent,
            PagingComponent,
            DynamicBehaviorComponent,
            ErrorMsgBubbleComponent,
            ButtonComponent,
            ButtonIconComponent,
            DynamicTabComponent,
            DynamicPopupComponent,
            SwappingBoxComponent,
            MapValueComponent,
            RadioComponent,
            P2PanelComponent,
            DynamicFormFrameComponent,
            DateComponent,
            DatePickerComponent,
            DynamicContainerTableComponent,
            DynamicFormLabelPanelComponent,
            DynamicFormRowComponent,
            PanelMainComponent,
            PanelChildComponent,
            ButtonIconComponent,
            LightBreakDynamicComponent,
            ContentPopupComponent,
            CollapseComponent,
            StepTabComponent,
            SideBarComponent,
            CollapseMenuComponent,
            AutoFormMasterFunctionComponent,
            AutoFormComponent,
            ColorSelectComponent,
            ContentPanelComponent
        ],
        exports: [
            DynamicInputComponent,
            LabelComponent,
            TextBoxComponent,
            InputComponent,
            DynamicFormComponent,
            CheckBoxComponent,
            TextAreaComponent,
            SelectBoxComponent,
            DynamicContainerComponent,
            HiddenComponent,
            FileUploadComponent,
            ImageComponent,
            AutoCompleteComponent,
            DynamicTableComponent,
            TableComponent,
            PagingComponent,
            DynamicBehaviorComponent,
            ErrorMsgBubbleComponent,
            ButtonComponent,
            ButtonIconComponent,
            DynamicTabComponent,
            DynamicPopupComponent,
            SwappingBoxComponent,
            MapValueComponent,
            RadioComponent,
            P2PanelComponent,
            DynamicFormFrameComponent,
            DateComponent,
            DatePickerComponent,
            DynamicContainerTableComponent,
            DynamicFormLabelPanelComponent,
            DynamicFormRowComponent,
            PanelMainComponent,
            PanelChildComponent,
            NgScrollbarModule,
            LightBreakDynamicComponent,
            ContentPopupComponent,
            CollapseComponent,
            StepTabComponent,
            SideBarComponent,
            CollapseMenuComponent,
            AutoFormComponent,
            ContentPanelComponent
        ],
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA,
            NO_ERRORS_SCHEMA
        ],
        providers: []
    })
], LightBreakDynamicModule);

let MenuService = class MenuService {
    constructor() {
        this.emitMenu = new EventEmitter();
        this.menuData = "";
    }
    setMenu(menu) {
        this.menuData = menu;
        this.emitMenu.emit(this.menuData);
    }
    getMenu() {
        return this.menuData;
    }
};
MenuService.ɵprov = ɵɵdefineInjectable({ factory: function MenuService_Factory() { return new MenuService(); }, token: MenuService, providedIn: "root" });
MenuService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], MenuService);

/*
 * Public API Surface of light-break-dynamic
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AutoCompleteComponent, AutoFormComponent, AutoFormMasterFunctionComponent, ButtonComponent, ButtonIconComponent, CheckBoxComponent, CollapseComponent, ContentPopupComponent, DateComponent, DatePickerComponent, DynamicBehaviorComponent, DynamicContainerComponent, DynamicContainerTableComponent, DynamicFormComponent, DynamicFormFrameComponent, DynamicFormLabelPanelComponent, DynamicFormRowComponent, DynamicInputComponent, DynamicPopupComponent, DynamicTabComponent, DynamicTableComponent, ErrorMsgBubbleComponent, FileUploadComponent, FormHttpRequestService, HiddenComponent, ImageComponent, InputComponent, LabelComponent, LightBreakDynamicComponent, LightBreakDynamicModule, LockScreenService, MapValueComponent, MenuService, P2PanelComponent, PagingComponent, PanelChildComponent, PanelMainComponent, RadioComponent, SelectBoxComponent, StepTabComponent, SwappingBoxComponent, TableComponent, TextAreaComponent, TextBoxComponent, AnimationService as ɵa, ColorSelectComponent as ɵb, FadeInOutAnimation as ɵc, SlideInOutAnimation as ɵd, SideBarComponent as ɵe, CollapseMenuComponent as ɵf, ContentPanelComponent as ɵg };
//# sourceMappingURL=godigit-light-break-dynamic.js.map
