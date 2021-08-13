import { __decorate, __metadata, __values } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { LabelComponent } from '../dynamic-input/label/label.component';
import { TextBoxComponent } from '../dynamic-input/textbox/textbox.component';
import { TextAreaComponent } from '../dynamic-input/text-area/text-area.component';
import { CheckBoxComponent } from '../dynamic-input/check-box/check-box.component';
import { SelectBoxComponent } from '../dynamic-input/select-box/select-box.component';
import { HiddenComponent } from '../dynamic-input/hidden/hidden.component';
import { FileUploadComponent } from '../dynamic-input/file-upload/file-upload.component';
import { ImageComponent } from '../dynamic-input/image/image.component';
import { AutoCompleteComponent } from '../dynamic-input/auto-complete/auto-complete.component';
import { ButtonComponent } from '../dynamic-input/button/button.component';
import { isArray, isNumber, isObject, isString } from 'util';
import { SwappingBoxComponent } from '../dynamic-input/swapping-box/swapping-box.component';
import { MapValueComponent } from '../dynamic-input/map-value/map-value.component';
import { RadioComponent } from '../dynamic-input/radio/radio.component';
import { DateComponent } from '../dynamic-input/date/date.component';
import { DynamicFormRowComponent } from '../dynamic-form-row/dynamic-form-row.component';
import { DynamicContainerTableComponent } from '../dynamic-container-table/dynamic-container-table.component';
import { Observable, timer, interval } from 'rxjs';
import { ButtonIconComponent } from '../dynamic-input/button-icon/button-icon.component';
import { AnimationService } from '../../service/animation.service';
import { takeWhile } from 'rxjs/operators';
import { ColorSelectComponent } from '../dynamic-input/color-select/color-select.component';
var DynamicFormComponent = /** @class */ (function () {
    function DynamicFormComponent(animationService) {
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
    DynamicFormComponent.prototype.ngOnInit = function () {
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
    };
    DynamicFormComponent.prototype.compareModel = function () {
        if (this.model) {
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].modelName && this.model[containerData.fieldList[fieldIndex].modelName]) {
                        var modelData = this.model[containerData.fieldList[fieldIndex].modelName];
                        for (var attribute in modelData) {
                            if (containerData.fieldList[fieldIndex][attribute] == undefined || containerData.fieldList[fieldIndex][attribute] == null) {
                                containerData.fieldList[fieldIndex][attribute] = modelData[attribute];
                            }
                        }
                    }
                }
            }
        }
    };
    DynamicFormComponent.prototype.verifyField = function () {
        var e_1, _a;
        var fieldList = this.getFieldList();
        var check = true;
        try {
            for (var fieldList_1 = __values(fieldList), fieldList_1_1 = fieldList_1.next(); !fieldList_1_1.done; fieldList_1_1 = fieldList_1.next()) {
                var fieldName = fieldList_1_1.value;
                for (var dataIndex in this.formCreation.data) {
                    if (this.formCreation.data[dataIndex][fieldName] == undefined) {
                        check = false;
                        console.error('Dynamic form error field data not exists: \'' + fieldName + '\' data row: ' + dataIndex);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fieldList_1_1 && !fieldList_1_1.done && (_a = fieldList_1.return)) _a.call(fieldList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (check == true) {
            this.showForm = true;
        }
    };
    DynamicFormComponent.prototype.generateFrameHeader = function () {
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
            var count = 0;
            for (var dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = String(this.formCreation.form.option.frameName) + String(count);
            }
            //return this.formCreation.form.option.frameName + (parseInt(rowIndex)+1);
        }
        else {
            var count = 0;
            for (var dataKey in this.formCreation.data) {
                count++;
                this.frameHeader[dataKey] = 'Form ' + String(count);
            }
            //return "Form " +(parseInt(rowIndex)+1);
        }
    };
    DynamicFormComponent.prototype.processCallBack = function (event) {
        var _this = this;
        if (event.action == 'deleteRow') {
            this.deleteRow(event.rowIndex);
        }
        else {
            timer(100).subscribe(function () {
                _this.callBack.emit(event);
            });
        }
    };
    DynamicFormComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit(event);
    };
    DynamicFormComponent.prototype.getDefault = function () {
        var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
        var setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            try {
                for (var _e = __values(this.formCreation.form.containerList), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var container = _f.value;
                    try {
                        for (var _g = (e_3 = void 0, __values(container.fieldList)), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var fieldCreation = _h.value;
                            if (fieldCreation.type != 'checkBox') {
                                if (typeof (fieldCreation.default) != 'undefined') {
                                    if (Array.isArray(fieldCreation.default)) {
                                        if (setValueType.indexOf(fieldCreation.type) == -1) {
                                            this.defaultData[fieldCreation.fieldName] = Object.assign([], fieldCreation.default);
                                        }
                                        else {
                                            var defaultSet = [];
                                            try {
                                                for (var _j = (e_4 = void 0, __values(fieldCreation.default)), _k = _j.next(); !_k.done; _k = _j.next()) {
                                                    var checkValue = _k.value;
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
                                            }
                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                            finally {
                                                try {
                                                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                                }
                                                finally { if (e_4) throw e_4.error; }
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
                                    var defaultVal = {};
                                    try {
                                        for (var _l = (e_5 = void 0, __values(fieldCreation.valueList)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                            var valueListData = _m.value;
                                            defaultVal[valueListData.value] = false;
                                        }
                                    }
                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                    finally {
                                        try {
                                            if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                        }
                                        finally { if (e_5) throw e_5.error; }
                                    }
                                    this.defaultData[fieldCreation.fieldName] = Object.assign({}, defaultVal);
                                }
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return this.defaultData;
    };
    DynamicFormComponent.prototype.reRenderForm = function () {
        var _this = this;
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
        interval(100).pipe(takeWhile(function () { return !_this.showForm; }))
            .subscribe(function () {
            _this.showForm = true;
            _this.animationService.setOnReRender(false);
            // console.log(this.formCreation);
        });
    };
    DynamicFormComponent.prototype.reRenderField = function (fieldArray, rowIndex) {
        var _this = this;
        if (rowIndex === void 0) { rowIndex = 0; }
        if (!Array.isArray(fieldArray)) {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, [fieldArray]);
        }
        else {
            this._reRenderFieldList = Object.assign(this._reRenderFieldList, fieldArray);
        }
        interval(100).pipe(takeWhile(function () { return _this._reRenderFieldList != null; }))
            .subscribe(function () {
            var e_6, _a;
            // console.log("check");
            var checkFlag = true;
            try {
                for (var _b = __values(_this._reRenderFieldList), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fieldName = _c.value;
                    var getFieldElement = _this.getDynamicInput(fieldName, rowIndex);
                    if (getFieldElement != null) {
                        // console.log("Still Found: "+fieldName,getFieldElement);
                        checkFlag = false;
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
            if (checkFlag) {
                _this._reRenderFieldList = [];
            }
            // console.log(this.formCreation);
        });
    };
    DynamicFormComponent.prototype.setFieldAttribute = function (fieldName, attributeName, attributeValue) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName] = attributeValue;
                }
            }
        }
    };
    DynamicFormComponent.prototype.setContainerAttribute = function (containerName, attributeName, attributeValue) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            if (containerData.containerName == containerName) {
                this.formCreation.form.containerList[containerIndex][attributeName] = attributeValue;
            }
        }
    };
    DynamicFormComponent.prototype.getFieldAttribute = function (fieldName, attributeName) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName];
                }
            }
        }
    };
    DynamicFormComponent.prototype.setDataValue = function (fieldName, rowIndex, value, multi) {
        var _this = this;
        if (multi === void 0) { multi = false; }
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
            this.onFormReady(rowIndex + 1).subscribe(function (data) {
                if (data.status == 'ready') {
                    while (_this.setDataQueue.length > 0) {
                        var setDataSet = _this.setDataQueue.shift();
                        _this.setDataProcess(setDataSet.fieldName, setDataSet.rowIndex, setDataSet.value, setDataSet.multi);
                    }
                }
                else {
                    console.error('Dynamic form row number ' + rowIndex + ' didn\'t create. Can\'t set data.');
                }
            });
        }
    };
    DynamicFormComponent.prototype.setDataProcess = function (fieldName, rowIndex, value, multi) {
        if (multi === void 0) { multi = false; }
        var fieldType = this.getFieldType(fieldName);
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
    };
    DynamicFormComponent.prototype.getFieldType = function (fieldName) {
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                    return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex].type;
                }
            }
        }
    };
    DynamicFormComponent.prototype.getDataValue = function (fieldName, rowIndex, dataIndex) {
        if (dataIndex === void 0) { dataIndex = null; }
        if (typeof (this.formCreation) != 'undefined') {
            if (typeof (this.formCreation.data[rowIndex]) == 'undefined') {
                return 'Row index not exits.';
            }
            if (typeof (this.formCreation.data[rowIndex][fieldName]) == 'undefined') {
                return 'Field name not exits: ' + fieldName;
            }
            if (dataIndex == null) {
                var dataType = void 0;
                if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                    dataType = [];
                }
                else {
                    dataType = {};
                }
                var dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                return dataClone;
            }
            else if (this.formCreation.data[rowIndex][fieldName]) {
                if (typeof (this.formCreation.data[rowIndex][fieldName][dataIndex]) == 'undefined') {
                    return 'Date index not exits in field ' + fieldName + ': ' + dataIndex;
                }
                else {
                    var dataType = void 0;
                    if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                        dataType = [];
                    }
                    else {
                        dataType = {};
                    }
                    var dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                    return dataClone[dataIndex];
                }
            }
        }
    };
    DynamicFormComponent.prototype.getDynamicInput = function (fieldName, rowIndex) {
        if (rowIndex === void 0) { rowIndex = 0; }
        var formRowRef = null;
        var containerListRef = null;
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
            var _loop_1 = function (containerIndex) {
                var containerData = this_1.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                        var fieldType = containerData.fieldList[fieldIndex].type;
                        var container = null;
                        if (this_1.formCreation.form.option.displayMode == 'table') {
                            container = containerListRef;
                        }
                        else {
                            container = containerListRef.find(function (instantContainer) { return instantContainer.containerIndex == containerIndex; });
                        }
                        if (container != undefined) {
                            var input = container.getDynamicInput(fieldIndex);
                            if (fieldType == 'hidden' && this_1.formCreation.form.option.displayMode == 'table' && input == undefined) {
                                return { value: {
                                        type: 'hidden'
                                    } };
                            }
                            else {
                                return { value: input };
                            }
                        }
                        return { value: null };
                    }
                }
            };
            var this_1 = this;
            for (var containerIndex in this.formCreation.form.containerList) {
                var state_1 = _loop_1(containerIndex);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
    };
    DynamicFormComponent.prototype.mapSetAttribute = function (attributeObject) {
        for (var fieldName in attributeObject) {
            for (var attribute in attributeObject[fieldName]) {
                this.setFieldAttribute(fieldName, attribute, attributeObject[fieldName][attribute]);
            }
        }
    };
    DynamicFormComponent.prototype.mapSetValue = function (valueObject, rowIndex) {
        var e_7, _a;
        for (var fieldName in valueObject) {
            var type = this.getFieldAttribute(fieldName, "type");
            var valueData = (valueObject[fieldName] == null || (valueObject[fieldName] == '' && typeof (valueObject[fieldName]) != "object") ? '' : valueObject[fieldName]);
            if (type === "autoComplete") {
                var valueSetObject = [];
                if (isString(valueData) || isNumber(valueData)) {
                    var input = this.getDynamicInput(fieldName);
                    var getExistsData = input.instantInput.getDataFromValue(valueData);
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
                        var check = true;
                        try {
                            for (var valueData_1 = (e_7 = void 0, __values(valueData)), valueData_1_1 = valueData_1.next(); !valueData_1_1.done; valueData_1_1 = valueData_1.next()) {
                                var valueRow = valueData_1_1.value;
                                if (!valueRow.display || !valueRow.value) {
                                    check = false;
                                    break;
                                }
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (valueData_1_1 && !valueData_1_1.done && (_a = valueData_1.return)) _a.call(valueData_1);
                            }
                            finally { if (e_7) throw e_7.error; }
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
    };
    DynamicFormComponent.prototype.mapGetValue = function (valueObject, rowIndex) {
        var e_8, _a, e_9, _b, e_10, _c, e_11, _d, e_12, _e, e_13, _f;
        var mapValue = Object.assign({}, valueObject);
        for (var mapFieldName in mapValue) {
            if (typeof (mapValue[mapFieldName]) == 'string') {
                var dataTypeSplit = mapValue[mapFieldName].split(':');
                var dataType = (typeof (dataTypeSplit[1]) != 'undefined' ? dataTypeSplit[1] : '');
                var dataFieldDetail = dataTypeSplit[0].split('.');
                var fieldName = dataFieldDetail.shift();
                var type = this.getFieldAttribute(fieldName, 'type');
                var normalType = [
                    'colorSelect',
                    'textBox',
                    'textArea',
                    'label',
                    'hidden',
                    'number'
                ];
                var dropDownType = [
                    'selectBox',
                    'radio'
                ];
                var setValueType = [
                    'autoComplete',
                    'swappingBox',
                    'mapValue'
                ];
                var fileValueType = [
                    'fileUpload',
                    'image'
                ];
                var checkBoxValueType = [
                    'checkBox'
                ];
                var dateValueType = [
                    'date'
                ];
                if (normalType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
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
                    var data = this.getDataValue(fieldName, rowIndex);
                    var setType = dataFieldDetail.pop();
                    if (data.length == 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                        }
                        else {
                            var value = data.shift();
                            var valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            try {
                                for (var valueListAttribute_1 = (e_8 = void 0, __values(valueListAttribute)), valueListAttribute_1_1 = valueListAttribute_1.next(); !valueListAttribute_1_1.done; valueListAttribute_1_1 = valueListAttribute_1.next()) {
                                    var valueListRow = valueListAttribute_1_1.value;
                                    if (valueListRow.value == value) {
                                        mapValue[mapFieldName] = valueListRow.display;
                                        break;
                                    }
                                }
                            }
                            catch (e_8_1) { e_8 = { error: e_8_1 }; }
                            finally {
                                try {
                                    if (valueListAttribute_1_1 && !valueListAttribute_1_1.done && (_a = valueListAttribute_1.return)) _a.call(valueListAttribute_1);
                                }
                                finally { if (e_8) throw e_8.error; }
                            }
                        }
                    }
                    else if (data.length > 1) {
                        if (setType != 'display') {
                            mapValue[mapFieldName] = data;
                        }
                        else {
                            var displayList = [];
                            var valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                            try {
                                for (var data_1 = (e_9 = void 0, __values(data)), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                                    var dataRow = data_1_1.value;
                                    var value = dataRow;
                                    try {
                                        for (var valueListAttribute_2 = (e_10 = void 0, __values(valueListAttribute)), valueListAttribute_2_1 = valueListAttribute_2.next(); !valueListAttribute_2_1.done; valueListAttribute_2_1 = valueListAttribute_2.next()) {
                                            var valueListRow = valueListAttribute_2_1.value;
                                            if (valueListRow.value == value) {
                                                displayList.push(valueListRow.display);
                                                break;
                                            }
                                        }
                                    }
                                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                    finally {
                                        try {
                                            if (valueListAttribute_2_1 && !valueListAttribute_2_1.done && (_c = valueListAttribute_2.return)) _c.call(valueListAttribute_2);
                                        }
                                        finally { if (e_10) throw e_10.error; }
                                    }
                                }
                            }
                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                            finally {
                                try {
                                    if (data_1_1 && !data_1_1.done && (_b = data_1.return)) _b.call(data_1);
                                }
                                finally { if (e_9) throw e_9.error; }
                            }
                            mapValue[mapFieldName] = displayList;
                        }
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (setValueType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    var setType = dataFieldDetail.pop();
                    if (setType != 'value' && setType != 'display' && setType != 'all') {
                        setType = 'value';
                    }
                    if (data.length == 1) {
                        var dataShift = data.shift();
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
                        var dataArray = [];
                        for (var dataIndex in data) {
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
                    var data = this.getDataValue(fieldName, rowIndex);
                    var fileArray = [];
                    for (var i = 0; i < data["selectFile"].length; i++) {
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
                    var data = this.getDataValue(fieldName, rowIndex);
                    var valueList = this.getFieldAttribute(fieldName, 'valueList');
                    var setType = dataFieldDetail.pop();
                    if (Object.keys(data).length > 0) {
                        if (setType != 'value' && setType != 'display' && setType != 'all') {
                            mapValue[mapFieldName] = data;
                        }
                        else if (setType == 'display') {
                            var returnValue = [];
                            try {
                                for (var valueList_1 = (e_11 = void 0, __values(valueList)), valueList_1_1 = valueList_1.next(); !valueList_1_1.done; valueList_1_1 = valueList_1.next()) {
                                    var valueListRow = valueList_1_1.value;
                                    if (data[valueListRow.value] == true) {
                                        returnValue.push(valueListRow.display);
                                    }
                                }
                            }
                            catch (e_11_1) { e_11 = { error: e_11_1 }; }
                            finally {
                                try {
                                    if (valueList_1_1 && !valueList_1_1.done && (_d = valueList_1.return)) _d.call(valueList_1);
                                }
                                finally { if (e_11) throw e_11.error; }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            }
                            else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else if (setType == 'value') {
                            var returnValue = [];
                            try {
                                for (var valueList_2 = (e_12 = void 0, __values(valueList)), valueList_2_1 = valueList_2.next(); !valueList_2_1.done; valueList_2_1 = valueList_2.next()) {
                                    var valueListRow = valueList_2_1.value;
                                    if (data[valueListRow.value] == true) {
                                        returnValue.push(valueListRow.value);
                                    }
                                }
                            }
                            catch (e_12_1) { e_12 = { error: e_12_1 }; }
                            finally {
                                try {
                                    if (valueList_2_1 && !valueList_2_1.done && (_e = valueList_2.return)) _e.call(valueList_2);
                                }
                                finally { if (e_12) throw e_12.error; }
                            }
                            if (returnValue.length == 1) {
                                mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                            }
                            else {
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else if (setType == 'all') {
                            var returnValue = [];
                            try {
                                for (var valueList_3 = (e_13 = void 0, __values(valueList)), valueList_3_1 = valueList_3.next(); !valueList_3_1.done; valueList_3_1 = valueList_3.next()) {
                                    var valueListRow = valueList_3_1.value;
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
                            }
                            catch (e_13_1) { e_13 = { error: e_13_1 }; }
                            finally {
                                try {
                                    if (valueList_3_1 && !valueList_3_1.done && (_f = valueList_3.return)) _f.call(valueList_3);
                                }
                                finally { if (e_13) throw e_13.error; }
                            }
                            mapValue[mapFieldName] = returnValue;
                        }
                    }
                    else {
                        mapValue[mapFieldName] = null;
                    }
                }
                else if (dateValueType.indexOf(type) > -1) {
                    var data = this.getDataValue(fieldName, rowIndex);
                    if (data.length == 1) {
                        mapValue[mapFieldName] = data.shift().value;
                    }
                    else if (data.length > 1) {
                        var dateList = [];
                        for (var dataRow in data) {
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
    };
    DynamicFormComponent.prototype.convertDataType = function (dataType, data) {
        if (dataType == 'string' && !isString(data)) {
            return data.toString();
        }
        else if (dataType == 'int' && !isNumber(data)) {
            var returnData = parseInt(data);
            return (isNaN(returnData) ? 0 : returnData);
        }
        else if (dataType == 'float' && !isNumber(data)) {
            var returnData = parseFloat(data);
            return (isNaN(returnData) ? 0 : returnData);
        }
        else if (dataType == 'bool' && isString(data) && (data.toLowerCase() == 'true' || data.toLowerCase() == 'false')) {
            var returnData = (data == 'true');
            return returnData;
        }
        else {
            return data;
        }
    };
    DynamicFormComponent.prototype.checkRequireField = function (rowIndex) {
        var e_14, _a;
        var setValueType = [
            'autoComplete',
            'swappingBox',
            'mapValue'
        ];
        var fileValueType = [
            'fileUpload',
            'image'
        ];
        var fieldList = this.getFieldList();
        var requireStatus = true;
        try {
            for (var fieldList_2 = __values(fieldList), fieldList_2_1 = fieldList_2.next(); !fieldList_2_1.done; fieldList_2_1 = fieldList_2.next()) {
                var fieldName = fieldList_2_1.value;
                var fieldRequireAttribute = this.getFieldAttribute(fieldName, 'require');
                var fieldType = this.getFieldAttribute(fieldName, 'type');
                if (typeof (fieldRequireAttribute) != 'undefined' && fieldRequireAttribute == true) {
                    var fieldData = this.getDataValue(fieldName, rowIndex);
                    if (isArray(fieldData)) {
                        if (setValueType.indexOf(fieldType) > -1) {
                            for (var fieldDataRow in fieldData) {
                                if ((fieldData[fieldDataRow]["value"] == null || fieldData[fieldDataRow]["value"] == '')
                                    && (fieldData[fieldDataRow]["display"] == null || fieldData[fieldDataRow]["display"] == '')) {
                                    requireStatus = false;
                                    break;
                                }
                            }
                        }
                        else {
                            for (var fieldDataRow in fieldData) {
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
                            var haveChecked = false;
                            for (var dataKey in fieldData) {
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
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (fieldList_2_1 && !fieldList_2_1.done && (_a = fieldList_2.return)) _a.call(fieldList_2);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return requireStatus;
    };
    DynamicFormComponent.prototype.checkValidateField = function (roleIndex) {
        var e_15, _a;
        var fieldList = this.getFieldList();
        var checkPatternStatus = true;
        try {
            for (var fieldList_3 = __values(fieldList), fieldList_3_1 = fieldList_3.next(); !fieldList_3_1.done; fieldList_3_1 = fieldList_3.next()) {
                var fieldName = fieldList_3_1.value;
                var fieldValuePattern = this.getFieldAttribute(fieldName, 'valuePattern');
                var fieldType = this.getFieldAttribute(fieldName, 'type');
                if (typeof (fieldValuePattern) != 'undefined') {
                    var fieldData = this.getDataValue(fieldName, roleIndex);
                    if (isArray(fieldData)) {
                        if (fieldType == 'autoComplete') {
                            for (var fieldDataRow in fieldData) {
                                if (!String(fieldData[fieldDataRow]["display"]).match(fieldValuePattern)) {
                                    checkPatternStatus = false;
                                    break;
                                }
                            }
                        }
                        else {
                            for (var fieldDataRow in fieldData) {
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
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (fieldList_3_1 && !fieldList_3_1.done && (_a = fieldList_3.return)) _a.call(fieldList_3);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return checkPatternStatus;
    };
    DynamicFormComponent.prototype.getFieldList = function () {
        var fieldList = [];
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                fieldList.push(containerData.fieldList[fieldIndex].fieldName);
            }
        }
        return fieldList;
    };
    DynamicFormComponent.prototype.getFieldLabel = function () {
        var fieldLabel = [];
        for (var containerIndex in this.formCreation.form.containerList) {
            var containerData = this.formCreation.form.containerList[containerIndex];
            for (var fieldIndex in containerData.fieldList) {
                if (containerData.fieldList[fieldIndex].type != 'hidden') {
                    fieldLabel.push(containerData.fieldList[fieldIndex].label);
                }
            }
        }
        this.fieldLabelList = fieldLabel;
    };
    DynamicFormComponent.prototype.getFrameHeader = function (rowIndex) {
        if (typeof (this.formCreation.form.option.frameName) != 'undefined' && Array.isArray(this.formCreation.form.option.frameName) && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
            return this.formCreation.form.option.frameName[rowIndex];
        }
        else if (typeof (this.formCreation.form.option.frameName) != 'undefined' && typeof (this.formCreation.form.option.frameName) != 'undefined' && !Array.isArray(this.formCreation.form.option.frameName)) {
            return this.formCreation.form.option.frameName + (parseInt(rowIndex) + 1);
        }
        else {
            return 'Form ' + (parseInt(rowIndex) + 1);
        }
    };
    DynamicFormComponent.prototype.getFormRow = function () {
        if (this.onAddProcess) {
            return this.tempAddData.length;
        }
        else if (this.onDeleteProcess) {
            return this.tempDeleteData.length;
        }
        return this.formCreation.data.length;
    };
    DynamicFormComponent.prototype.setRowNum = function (rowNum) {
        var currentRowNum = this.getFormRow();
        if (currentRowNum < rowNum) {
            while (currentRowNum < rowNum) {
                var defaultValue = Object.assign({}, this.getDefault());
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
    };
    DynamicFormComponent.prototype.addRow = function (rowIndex, sourceAction) {
        var _this = this;
        if (rowIndex === void 0) { rowIndex = null; }
        if (sourceAction === void 0) { sourceAction = null; }
        var rowCount = this.getFormRow();
        var _rowIndex = rowIndex;
        if (rowIndex == null) {
            _rowIndex = this.formCreation.data.length;
        }
        var defaultValue = Object.assign({}, this.getDefault());
        if (!this.onAddProcess) {
            this.tempAddData = this.formCreation.data;
            this.onAddProcess = true;
            this.animationService.setOnReRender(true);
        }
        this.tempAddData.splice(_rowIndex, 0, defaultValue);
        var tempData = [];
        for (var dataRowIndex in this.tempAddData) {
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
        this.addDataTimer = timer(200).subscribe(function () {
            _this.formCreation.data = Object.assign([], _this.tempAddData);
            _this.onAddProcess = false;
            _this.animationService.setOnReRender(false);
            _this.generateFrameHeader();
        });
        this.callBack.emit({
            action: 'addRow',
            sourceAction: sourceAction,
            rowIndex: _rowIndex
        });
    };
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
    DynamicFormComponent.prototype.deleteRow = function (rowIndex, sourceAction) {
        var e_16, _a, e_17, _b;
        var _this = this;
        if (sourceAction === void 0) { sourceAction = null; }
        var check = true;
        if (isArray(rowIndex)) {
            try {
                for (var rowIndex_1 = __values(rowIndex), rowIndex_1_1 = rowIndex_1.next(); !rowIndex_1_1.done; rowIndex_1_1 = rowIndex_1.next()) {
                    var rowIndexNum = rowIndex_1_1.value;
                    if (this.formCreation.data[rowIndexNum] == undefined) {
                        check = false;
                        break;
                    }
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (rowIndex_1_1 && !rowIndex_1_1.done && (_a = rowIndex_1.return)) _a.call(rowIndex_1);
                }
                finally { if (e_16) throw e_16.error; }
            }
        }
        else {
            if (this.formCreation.data[rowIndex] == undefined) {
                check = false;
            }
        }
        if (check) {
            var rowCount = this.getFormRow();
            var tempRowList = [];
            var tempEnableRow = [];
            var tempDisableDelete = [];
            var tempDisableList = [];
            var tempDeleteData_1;
            var tempEnableRowData_1;
            var tempDisableDeleteData_1;
            var tempDisableListData_1;
            for (var dataRowIndex in this.formCreation.data) {
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
                tempDeleteData_1 = Object.assign([], this.formCreation.data);
                if (this.formCreation.form.option.enableRowIndex != undefined) {
                    tempEnableRowData_1 = Object.assign([], this.formCreation.form.option.enableRowIndex);
                }
                if (this.formCreation.form.option.disableDelete != undefined) {
                    tempDisableDeleteData_1 = Object.assign([], this.formCreation.form.option.disableDelete);
                }
                if (this.formCreation.form.option.disableList != undefined) {
                    tempDisableListData_1 = Object.assign([], this.formCreation.form.option.disableList);
                }
                this.onDeleteProcess = true;
                this.animationService.setOnReRender(true);
            }
            if (isArray(rowIndex)) {
                rowIndex.sort();
                rowIndex.reverse();
                try {
                    for (var rowIndex_2 = __values(rowIndex), rowIndex_2_1 = rowIndex_2.next(); !rowIndex_2_1.done; rowIndex_2_1 = rowIndex_2.next()) {
                        var rowIndexNum = rowIndex_2_1.value;
                        tempDeleteData_1.splice(rowIndexNum, 1);
                        if (this.formCreation.form.option.enableRowIndex != undefined) {
                            tempEnableRowData_1.splice(rowIndexNum, 1);
                        }
                        if (this.formCreation.form.option.disableDelete != undefined) {
                            tempDisableDeleteData_1.splice(rowIndexNum, 1);
                        }
                        if (this.formCreation.form.option.disableList != undefined) {
                            tempDisableListData_1.splice(rowIndexNum, 1);
                        }
                    }
                }
                catch (e_17_1) { e_17 = { error: e_17_1 }; }
                finally {
                    try {
                        if (rowIndex_2_1 && !rowIndex_2_1.done && (_b = rowIndex_2.return)) _b.call(rowIndex_2);
                    }
                    finally { if (e_17) throw e_17.error; }
                }
            }
            else {
                tempDeleteData_1.splice(rowIndex, 1);
                if (this.formCreation.form.option.enableRowIndex != undefined) {
                    tempEnableRowData_1.splice(rowIndex, 1);
                }
                if (this.formCreation.form.option.disableDelete != undefined) {
                    tempDisableDeleteData_1.splice(rowIndex, 1);
                }
                if (this.formCreation.form.option.disableList != undefined) {
                    tempDisableListData_1.splice(rowIndex, 1);
                }
            }
            this.formCreation.data = tempRowList;
            this.formCreation.form.option.enableRowIndex = tempEnableRow;
            this.formCreation.form.option.disableDelete = tempDisableDelete;
            this.formCreation.form.option.disableList = tempDisableList;
            if (this.deleteDataTimer != null) {
                this.deleteDataTimer = null;
            }
            this.deleteDataTimer = timer(200).subscribe(function () {
                _this.formCreation.data = Object.assign([], tempDeleteData_1);
                _this.formCreation.form.option.enableRowIndex = Object.assign([], tempEnableRowData_1);
                _this.formCreation.form.option.disableDelete = Object.assign([], tempDisableDeleteData_1);
                _this.formCreation.form.option.disableList = Object.assign([], tempDisableListData_1);
                _this.onDeleteProcess = false;
                _this.animationService.setOnReRender(false);
                _this.generateFrameHeader();
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
    };
    DynamicFormComponent.prototype.callBackFrame = function (event) {
        if (event.action == 'deleteRow') {
            this.deleteRow(event.rowIndex);
        }
    };
    DynamicFormComponent.prototype.enableRow = function (rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = true;
    };
    DynamicFormComponent.prototype.disableRow = function (rowIndex) {
        if (this.formCreation.form.option.enableRowIndex == undefined) {
            this.formCreation.form.option.enableRowIndex = [];
        }
        this.formCreation.form.option.enableRowIndex[rowIndex] = false;
    };
    DynamicFormComponent.prototype.disableField = function (rowIndex, fieldName) {
        if (this.formCreation.form.option.disableList == undefined) {
            this.formCreation.form.option.disableList = [];
        }
        if (this.formCreation.form.option.disableList[rowIndex] == undefined) {
            this.formCreation.form.option.disableList[rowIndex] = {};
        }
        this.formCreation.form.option.disableList[rowIndex][fieldName] = true;
    };
    DynamicFormComponent.prototype.enableField = function (rowIndex, fieldName) {
        if (this.formCreation.form.option.disableList == undefined) {
            this.formCreation.form.option.disableList = [];
        }
        if (this.formCreation.form.option.disableList[rowIndex] == undefined) {
            this.formCreation.form.option.disableList[rowIndex] = {};
        }
        this.formCreation.form.option.disableList[rowIndex][fieldName] = false;
    };
    DynamicFormComponent.prototype.enableDeleteRow = function (rowIndex) {
        if (this.formCreation.form.option.disableDelete == undefined) {
            this.formCreation.form.option.disableDelete = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = false;
    };
    DynamicFormComponent.prototype.disableDeleteRow = function (rowIndex) {
        if (this.formCreation.form.option.disableDelete == undefined) {
            this.formCreation.form.option.disableDelete = [];
        }
        this.formCreation.form.option.disableDelete[rowIndex] = true;
    };
    DynamicFormComponent.prototype.reFilter = function (rowIndex) {
        var e_18, _a;
        var fieldList = this.getFieldList();
        try {
            for (var fieldList_4 = __values(fieldList), fieldList_4_1 = fieldList_4.next(); !fieldList_4_1.done; fieldList_4_1 = fieldList_4.next()) {
                var fieldName = fieldList_4_1.value;
                var fieldType = this.getFieldAttribute(fieldName, 'type');
                var value = this.getDataValue(fieldName, rowIndex);
                if (isArray(value)) {
                    if (fieldType == 'autoComplete') {
                        for (var valueRow in value) {
                            var dynamicInput = this.getDynamicInput(fieldName, rowIndex);
                            dynamicInput.instantInput.filterAutoComplete(valueRow, true);
                        }
                    }
                }
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (fieldList_4_1 && !fieldList_4_1.done && (_a = fieldList_4.return)) _a.call(fieldList_4);
            }
            finally { if (e_18) throw e_18.error; }
        }
    };
    DynamicFormComponent.prototype.reFilterField = function (fieldName, rowIndex, dataIndex) {
        var dynamicInput = this.getDynamicInput(fieldName, rowIndex);
        dynamicInput.instantInput.filterAutoComplete(dataIndex, true);
    };
    DynamicFormComponent.prototype.onFormReady = function (rowNum, data, timeout, debug) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (timeout === void 0) { timeout = 15000; }
        if (debug === void 0) { debug = false; }
        if (this.startMilliseconds == null) {
            var dateStart = new Date();
            this.startMilliseconds = dateStart.getTime();
        }
        var readyStatus = null;
        var response = new Observable(function (observable) {
            interval(200).pipe(takeWhile(function () {
                return readyStatus != true && _this.startMilliseconds != null;
            }))
                .subscribe(function () {
                var e_19, _a;
                var dateCurrent = new Date();
                var currentMilliseconds = dateCurrent.getTime();
                var diffTime = currentMilliseconds - _this.startMilliseconds;
                var fieldList = _this.getFieldList();
                var checkField = [];
                for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
                    try {
                        for (var fieldList_5 = (e_19 = void 0, __values(fieldList)), fieldList_5_1 = fieldList_5.next(); !fieldList_5_1.done; fieldList_5_1 = fieldList_5.next()) {
                            var fieldName = fieldList_5_1.value;
                            var dynamicInput = _this.getDynamicInput(fieldName, rowIndex);
                            checkField.push(dynamicInput);
                        }
                    }
                    catch (e_19_1) { e_19 = { error: e_19_1 }; }
                    finally {
                        try {
                            if (fieldList_5_1 && !fieldList_5_1.done && (_a = fieldList_5.return)) _a.call(fieldList_5);
                        }
                        finally { if (e_19) throw e_19.error; }
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
                    _this.startMilliseconds = null;
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
    };
    DynamicFormComponent.prototype.refineContainerTableMode = function () {
        var e_20, _a, e_21, _b;
        if (typeof (this.formCreation.form.containerList) != 'undefined') {
            var fieldList = [];
            try {
                for (var _c = __values(this.formCreation.form.containerList), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var container = _d.value;
                    try {
                        for (var _e = (e_21 = void 0, __values(container.fieldList)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var fieldCreation = _f.value;
                            fieldList.push(fieldCreation);
                        }
                    }
                    catch (e_21_1) { e_21 = { error: e_21_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_21) throw e_21.error; }
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_20) throw e_20.error; }
            }
            this.refinedContainerTableMode = [];
            this.refinedContainerTableMode.push({
                fieldList: fieldList
            });
        }
    };
    DynamicFormComponent.prototype.duplicateDataRow = function (sourceRow, destinationRow, actionOnFromReady) {
        var _this = this;
        if (actionOnFromReady === void 0) { actionOnFromReady = true; }
        if (this.formCreation.data[sourceRow] != undefined && this.formCreation.data[destinationRow] != undefined) {
            this.duplicateRowProcess(sourceRow, destinationRow);
        }
        else if (actionOnFromReady) {
            this.duplicateQueue.push({
                sourceRow: sourceRow,
                destinationRow: destinationRow
            });
            this.onFormReady(destinationRow + 1).subscribe(function (readyStatus) {
                if (readyStatus.status == 'ready') {
                    while (_this.duplicateQueue.length > 0) {
                        var duplicateData = _this.duplicateQueue.shift();
                        _this.duplicateRowProcess(duplicateData.sourceRow, duplicateData.destinationRow);
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
    };
    DynamicFormComponent.prototype.duplicateToNewRow = function (sourceRow, sourceAction) {
        var e_22, _a;
        if (sourceRow === void 0) { sourceRow = 0; }
        if (sourceAction === void 0) { sourceAction = null; }
        var dataNewRow = {};
        var haveData = false;
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
            var defaultValue = Object.assign({}, this.getDefault());
            for (var fieldName in defaultValue) {
                if (dataNewRow[fieldName] != undefined) {
                    var value = Object.assign([], dataNewRow[fieldName]);
                    var newValue = [];
                    try {
                        for (var value_1 = (e_22 = void 0, __values(value)), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                            var valueRow = value_1_1.value;
                            if (isObject(valueRow)) {
                                newValue.push(Object.assign({}, valueRow));
                            }
                            else {
                                newValue.push(valueRow);
                            }
                        }
                    }
                    catch (e_22_1) { e_22 = { error: e_22_1 }; }
                    finally {
                        try {
                            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                        }
                        finally { if (e_22) throw e_22.error; }
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
    };
    DynamicFormComponent.prototype.duplicateRowProcess = function (sourceRow, destinationRow) {
        var e_23, _a, e_24, _b;
        var fieldList = this.getFieldList();
        var objGet = {};
        try {
            for (var fieldList_6 = __values(fieldList), fieldList_6_1 = fieldList_6.next(); !fieldList_6_1.done; fieldList_6_1 = fieldList_6.next()) {
                var fieldName = fieldList_6_1.value;
                objGet[fieldName] = fieldName + '.all';
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (fieldList_6_1 && !fieldList_6_1.done && (_a = fieldList_6.return)) _a.call(fieldList_6);
            }
            finally { if (e_23) throw e_23.error; }
        }
        var sourceData = this.mapGetValue(objGet, sourceRow);
        for (var fieldName in sourceData) {
            var type = this.getFieldAttribute(fieldName, 'type');
            if (type == 'checkBox') {
                var value = {};
                try {
                    for (var _c = (e_24 = void 0, __values(sourceData[fieldName])), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var valueData = _d.value;
                        value[valueData.value] = valueData.checked;
                    }
                }
                catch (e_24_1) { e_24 = { error: e_24_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_24) throw e_24.error; }
                }
                sourceData[fieldName] = value;
            }
        }
        this.mapSetValue(sourceData, destinationRow);
    };
    DynamicFormComponent.prototype.checkDuplicate = function (fieldArray, regEx, regExIndex) {
        var e_25, _a;
        if (regEx === void 0) { regEx = /(.*)/; }
        if (regExIndex === void 0) { regExIndex = 0; }
        var tempDataCheck = [];
        var mapGet = {};
        var check = true;
        try {
            for (var fieldArray_1 = __values(fieldArray), fieldArray_1_1 = fieldArray_1.next(); !fieldArray_1_1.done; fieldArray_1_1 = fieldArray_1.next()) {
                var fieldList = fieldArray_1_1.value;
                mapGet[fieldList] = fieldList;
            }
        }
        catch (e_25_1) { e_25 = { error: e_25_1 }; }
        finally {
            try {
                if (fieldArray_1_1 && !fieldArray_1_1.done && (_a = fieldArray_1.return)) _a.call(fieldArray_1);
            }
            finally { if (e_25) throw e_25.error; }
        }
        var formRow = this.getFormRow();
        for (var i = 0; i < formRow; i++) {
            var data = this.mapGetValue(mapGet, i);
            for (var dataKey in data) {
                var regTest = new RegExp(regEx);
                var match = regTest.exec(data[dataKey]);
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
    };
    DynamicFormComponent.prototype.checkRequireAll = function () {
        var check = true;
        var formRow = this.getFormRow();
        for (var i = 0; i < formRow; i++) {
            if (!this.checkRequireField(i)) {
                check = false;
                break;
            }
        }
        return check;
    };
    DynamicFormComponent.prototype.checkValidateAll = function () {
        var check = true;
        var formRow = this.getFormRow();
        for (var i = 0; i < formRow; i++) {
            if (!this.checkValidateField(i)) {
                check = false;
                break;
            }
        }
        return check;
    };
    DynamicFormComponent.prototype.setMode = function (mode) {
        this.formCreation.form.option.mode = mode;
    };
    DynamicFormComponent.prototype.enableAdd = function () {
        if (this.formCreation.form.option.addRow == undefined) {
            this.formCreation.form.option.addRow = true;
        }
        this.formCreation.form.option.addRow = true;
    };
    DynamicFormComponent.prototype.disableAdd = function () {
        if (this.formCreation.form.option.addRow == undefined) {
            this.formCreation.form.option.addRow = false;
        }
        this.formCreation.form.option.addRow = false;
    };
    DynamicFormComponent.prototype.enableDelete = function () {
        if (this.formCreation.form.option.deleteRow == undefined) {
            this.formCreation.form.option.deleteRow = true;
        }
        this.formCreation.form.option.deleteRow = true;
    };
    DynamicFormComponent.prototype.disableDelete = function () {
        if (this.formCreation.form.option.deleteRow == undefined) {
            this.formCreation.form.option.deleteRow = true;
        }
        this.formCreation.form.option.deleteRow = true;
    };
    DynamicFormComponent.prototype.setDefault = function (rowIndex) {
        if (rowIndex === void 0) { rowIndex = 0; }
        if (this.formCreation.data[0]) {
            this.getDefault();
            for (var fieldName in this.defaultData) {
                this.setDataValue(fieldName, 0, this.defaultData[fieldName]);
            }
        }
    };
    DynamicFormComponent.prototype.setSavePoint = function (savePointName) {
        var e_26, _a;
        if (savePointName === void 0) { savePointName = "default"; }
        var savePointData = [];
        var rowNum = this.getFormRow();
        var fieldList = this.getFieldList();
        var mapGet = {};
        try {
            for (var fieldList_7 = __values(fieldList), fieldList_7_1 = fieldList_7.next(); !fieldList_7_1.done; fieldList_7_1 = fieldList_7.next()) {
                var fieldName = fieldList_7_1.value;
                mapGet[fieldName] = fieldName;
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (fieldList_7_1 && !fieldList_7_1.done && (_a = fieldList_7.return)) _a.call(fieldList_7);
            }
            finally { if (e_26) throw e_26.error; }
        }
        for (var i = 0; i < rowNum; i++) {
            var data = this.mapGetValue(mapGet, i);
            savePointData.push(data);
        }
        this.savePoint[savePointName] = savePointData;
    };
    DynamicFormComponent.prototype.getSavePoint = function (savePointName) {
        if (savePointName === void 0) { savePointName = "default"; }
        if (this.savePoint[savePointName]) {
            var savePointData = this.savePoint[savePointName];
            for (var savePointIndex in savePointData) {
                this.mapSetValue(savePointData[savePointIndex], savePointIndex);
            }
        }
    };
    DynamicFormComponent.prototype.getParam = function (rowIndex) {
        var e_27, _a;
        if (rowIndex === void 0) { rowIndex = 0; }
        var fieldList = this.getFieldList();
        var param = {};
        try {
            for (var fieldList_8 = __values(fieldList), fieldList_8_1 = fieldList_8.next(); !fieldList_8_1.done; fieldList_8_1 = fieldList_8.next()) {
                var fieldName = fieldList_8_1.value;
                param[fieldName] = fieldName;
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (fieldList_8_1 && !fieldList_8_1.done && (_a = fieldList_8.return)) _a.call(fieldList_8);
            }
            finally { if (e_27) throw e_27.error; }
        }
        param = this.mapGetValue(param, rowIndex);
        return param;
    };
    DynamicFormComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
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
    return DynamicFormComponent;
}());
export { DynamicFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQW9CLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDekUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDdkYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxj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UixLQUFLLEVBQUU7O3dEQUFhO0lBQ1g7UUFBVCxNQUFNLEVBQUU7OzBEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7K0RBQW9DO0lBVnBDLG9CQUFvQjtRQXZCaEMsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QiwyM0tBQTRDO1lBQzVDLGVBQWUsRUFBRTtnQkFDYixjQUFjO2dCQUNkLGdCQUFnQjtnQkFDaEIsaUJBQWlCO2dCQUNqQixpQkFBaUI7Z0JBQ2pCLG9CQUFvQjtnQkFDcEIsa0JBQWtCO2dCQUNsQixlQUFlO2dCQUNmLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxxQkFBcUI7Z0JBQ3JCLGVBQWU7Z0JBQ2YsbUJBQW1CO2dCQUNuQixvQkFBb0I7Z0JBQ3BCLGlCQUFpQjtnQkFDakIsY0FBYztnQkFDZCxhQUFhO2FBQ2hCO1lBQ0QsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDaEMsQ0FBQzt5Q0E0QndDLGdCQUFnQjtPQTNCN0Msb0JBQW9CLENBKzFDaEM7SUFBRCwyQkFBQztDQUFBLEFBLzFDRCxJQSsxQ0M7U0EvMUNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ01vZHVsZSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtMYWJlbENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1RleHRCb3hDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvdGV4dGJveC90ZXh0Ym94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7VGV4dEFyZWFDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvdGV4dC1hcmVhL3RleHQtYXJlYS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NoZWNrQm94Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2NoZWNrLWJveC9jaGVjay1ib3guY29tcG9uZW50JztcclxuaW1wb3J0IHtTZWxlY3RCb3hDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvc2VsZWN0LWJveC9zZWxlY3QtYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SGlkZGVuQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2hpZGRlbi9oaWRkZW4uY29tcG9uZW50JztcclxuaW1wb3J0IHtGaWxlVXBsb2FkQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SW1hZ2VDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtBdXRvQ29tcGxldGVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QnV0dG9uQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHtpc0FycmF5LCBpc051bWJlciwgaXNPYmplY3QsIGlzU3RyaW5nfSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtTd2FwcGluZ0JveENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9zd2FwcGluZy1ib3gvc3dhcHBpbmctYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TWFwVmFsdWVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvbWFwLXZhbHVlL21hcC12YWx1ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1JhZGlvQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L3JhZGlvL3JhZGlvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RGF0ZUNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9kYXRlL2RhdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtEeW5hbWljRm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1mb3JtLXJvdy9keW5hbWljLWZvcm0tcm93LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RHluYW1pY0NvbnRhaW5lclRhYmxlQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWNvbnRhaW5lci10YWJsZS9keW5hbWljLWNvbnRhaW5lci10YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIHRpbWVyLCBpbnRlcnZhbH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7QnV0dG9uSWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9idXR0b24taWNvbi9idXR0b24taWNvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge3Rha2VXaGlsZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge0NvbG9yU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2NvbG9yLXNlbGVjdC9jb2xvci1zZWxlY3QuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktZHluYW1pYy1mb3JtJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICAgICAgTGFiZWxDb21wb25lbnQsXHJcbiAgICAgICAgVGV4dEJveENvbXBvbmVudCxcclxuICAgICAgICBUZXh0QXJlYUNvbXBvbmVudCxcclxuICAgICAgICBDaGVja0JveENvbXBvbmVudCxcclxuICAgICAgICBDb2xvclNlbGVjdENvbXBvbmVudCxcclxuICAgICAgICBTZWxlY3RCb3hDb21wb25lbnQsXHJcbiAgICAgICAgSGlkZGVuQ29tcG9uZW50LFxyXG4gICAgICAgIEZpbGVVcGxvYWRDb21wb25lbnQsXHJcbiAgICAgICAgSW1hZ2VDb21wb25lbnQsXHJcbiAgICAgICAgQXV0b0NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgICAgIEJ1dHRvbkNvbXBvbmVudCxcclxuICAgICAgICBCdXR0b25JY29uQ29tcG9uZW50LFxyXG4gICAgICAgIFN3YXBwaW5nQm94Q29tcG9uZW50LFxyXG4gICAgICAgIE1hcFZhbHVlQ29tcG9uZW50LFxyXG4gICAgICAgIFJhZGlvQ29tcG9uZW50LFxyXG4gICAgICAgIERhdGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtBbmltYXRpb25TZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQFZpZXdDaGlsZHJlbihEeW5hbWljRm9ybVJvd0NvbXBvbmVudCkgZm9ybVJvdzogUXVlcnlMaXN0PER5bmFtaWNGb3JtUm93Q29tcG9uZW50PjtcclxuICAgIEBWaWV3Q2hpbGRyZW4oRHluYW1pY0NvbnRhaW5lclRhYmxlQ29tcG9uZW50KSBmb3JtVGFibGVSb3c6IFF1ZXJ5TGlzdDxEeW5hbWljQ29udGFpbmVyVGFibGVDb21wb25lbnQ+O1xyXG4gICAgQElucHV0KCkgZm9ybUNyZWF0aW9uO1xyXG4gICAgQElucHV0KCkgbW9kZWw7XHJcbiAgICBASW5wdXQoKSBhY3Rpb25EYXRhSW5kZXggPSAwO1xyXG4gICAgQElucHV0KCkgZGVmYXVsdERhdGE6YW55ID0ge307XHJcbiAgICBASW5wdXQoKSBzaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgb3B0aW9uID0ge307XHJcbiAgICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGZyYW1lSGVhZGVyID0gW107XHJcbiAgICBvYmpLZXkgPSBPYmplY3Qua2V5cztcclxuICAgIGZpZWxkTGFiZWxMaXN0ID0gW107XHJcbiAgICBfcmVSZW5kZXJGaWVsZExpc3QgPSBbXTtcclxuICAgIHJlZmluZWRDb250YWluZXJUYWJsZU1vZGUgPSBbXTtcclxuICAgIHRlbXBEZWxldGVEYXRhID0gW107XHJcbiAgICBvbkRlbGV0ZVByb2Nlc3MgPSBmYWxzZTtcclxuICAgIGRlbGV0ZURhdGFUaW1lcjogYW55O1xyXG4gICAgdGVtcEFkZERhdGEgPSBbXTtcclxuICAgIG9uQWRkUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgYWRkRGF0YVRpbWVyOiBhbnk7XHJcbiAgICBzZXREYXRhUXVldWUgPSBbXTtcclxuICAgIGR1cGxpY2F0ZVF1ZXVlID0gW107XHJcbiAgICBzYXZlUG9pbnQ6YW55ID0ge307XHJcbiAgICBwcml2YXRlIHN0YXJ0TWlsbGlzZWNvbmRzOiBudW1iZXIgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5pbWF0aW9uU2VydmljZTogQW5pbWF0aW9uU2VydmljZSkge1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy52ZXJpZnlGaWVsZCgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZm9ybT4+XCIsdGhpcy5mb3JtQ3JlYXRpb24pO1xyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbiwgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24pO1xyXG4gICAgICAgIHRoaXMuZ2V0RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuY29tcGFyZU1vZGVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUZyYW1lSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0RmllbGRMYWJlbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNwbGF5TW9kZSA9PSAndGFibGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmaW5lQ29udGFpbmVyVGFibGVNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRFbmFibGVBbmltYXRpb24odGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlQW5pbWF0aW9uKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb21wYXJlTW9kZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLm1vZGVsTmFtZSAmJiB0aGlzLm1vZGVsW2NvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLm1vZGVsTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vZGVsRGF0YSA9IHRoaXMubW9kZWxbY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0ubW9kZWxOYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYXR0cmlidXRlIGluIG1vZGVsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdW2F0dHJpYnV0ZV0gPT0gdW5kZWZpbmVkIHx8IGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdW2F0dHJpYnV0ZV0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdW2F0dHJpYnV0ZV0gPSBtb2RlbERhdGFbYXR0cmlidXRlXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2ZXJpZnlGaWVsZCgpIHtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YUluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW2RhdGFJbmRleF1bZmllbGROYW1lXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0R5bmFtaWMgZm9ybSBlcnJvciBmaWVsZCBkYXRhIG5vdCBleGlzdHM6IFxcJycgKyBmaWVsZE5hbWUgKyAnXFwnIGRhdGEgcm93OiAnICsgZGF0YUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlY2sgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dGb3JtID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVGcmFtZUhlYWRlcigpIHtcclxuICAgICAgICB0aGlzLmZyYW1lSGVhZGVyID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSAhPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICE9ICcnXHJcbiAgICAgICAgICAgICYmIEFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKVxyXG4gICAgICAgICAgICAmJiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUubGVuZ3RoID09IHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVIZWFkZXIgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgIT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSAhPSAnJ1xyXG4gICAgICAgICAgICAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpXHJcbiAgICAgICAgICAgICYmIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUhlYWRlclswXSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSAhPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICE9ICcnXHJcbiAgICAgICAgICAgICYmICFBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSlcclxuICAgICAgICAgICAgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFLZXkgaW4gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVIZWFkZXJbZGF0YUtleV0gPSBTdHJpbmcodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKSArIFN0cmluZyhjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICsgKHBhcnNlSW50KHJvd0luZGV4KSsxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhS2V5IGluIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVhZGVyW2RhdGFLZXldID0gJ0Zvcm0gJyArIFN0cmluZyhjb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9yZXR1cm4gXCJGb3JtIFwiICsocGFyc2VJbnQocm93SW5kZXgpKzEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzQ2FsbEJhY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuYWN0aW9uID09ICdkZWxldGVSb3cnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlUm93KGV2ZW50LnJvd0luZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aW1lcigxMDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVmYXVsdCgpIHtcclxuICAgICAgICBsZXQgc2V0VmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAnYXV0b0NvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ3N3YXBwaW5nQm94JyxcclxuICAgICAgICAgICAgJ21hcFZhbHVlJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWluZXIgb2YgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZENyZWF0aW9uIG9mIGNvbnRhaW5lci5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRDcmVhdGlvbi50eXBlICE9ICdjaGVja0JveCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZmllbGRDcmVhdGlvbi5kZWZhdWx0KSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZmllbGRDcmVhdGlvbi5kZWZhdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRWYWx1ZVR5cGUuaW5kZXhPZihmaWVsZENyZWF0aW9uLnR5cGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgZmllbGRDcmVhdGlvbi5kZWZhdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoZWNrVmFsdWUgb2YgZmllbGRDcmVhdGlvbi5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrVmFsdWUuZGlzcGxheSB8fCAhY2hlY2tWYWx1ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZXQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGNoZWNrVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjaGVja1ZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNldC5wdXNoKGNoZWNrVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgZGVmYXVsdFNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKGZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VmFsdWVUeXBlLmluZGV4T2YoZmllbGRDcmVhdGlvbi50eXBlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIFtmaWVsZENyZWF0aW9uLmRlZmF1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpZWxkQ3JlYXRpb24uZGVmYXVsdC5kaXNwbGF5IHx8ICFmaWVsZENyZWF0aW9uLmRlZmF1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmaWVsZENyZWF0aW9uLmRlZmF1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGZpZWxkQ3JlYXRpb24uZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCBbZmllbGRDcmVhdGlvbi5kZWZhdWx0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VmFsdWVUeXBlLmluZGV4T2YoZmllbGRDcmVhdGlvbi50eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSxbJyddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgZmllbGRDcmVhdGlvbi5kZWZhdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0VmFsID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZUxpc3REYXRhIG9mIGZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbFt2YWx1ZUxpc3REYXRhLnZhbHVlXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kZWZhdWx0RGF0YTtcclxuICAgIH1cclxuXHJcbiAgICByZVJlbmRlckZvcm0oKSB7XHJcbiAgICAgICAgdGhpcy5nZXREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5jb21wYXJlTW9kZWwoKTtcclxuICAgICAgICB0aGlzLnJlZmluZUNvbnRhaW5lclRhYmxlTW9kZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGcmFtZUhlYWRlcigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRGaWVsZExhYmVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc3BsYXlNb2RlID09ICd0YWJsZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZpbmVDb250YWluZXJUYWJsZU1vZGUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0T25SZVJlbmRlcih0cnVlKTtcclxuICAgICAgICBpbnRlcnZhbCgxMDApLnBpcGUodGFrZVdoaWxlKCgpID0+ICF0aGlzLnNob3dGb3JtKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dGb3JtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRPblJlUmVuZGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybUNyZWF0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVSZW5kZXJGaWVsZChmaWVsZEFycmF5LCByb3dJbmRleCA9IDApIHtcclxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZmllbGRBcnJheSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVSZW5kZXJGaWVsZExpc3QgPSBPYmplY3QuYXNzaWduKHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0LCBbZmllbGRBcnJheV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0ID0gT2JqZWN0LmFzc2lnbih0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCwgZmllbGRBcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGludGVydmFsKDEwMCkucGlwZSh0YWtlV2hpbGUoKCkgPT4gdGhpcy5fcmVSZW5kZXJGaWVsZExpc3QgIT0gbnVsbCkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJjaGVja1wiKTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0ZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdldEZpZWxkRWxlbWVudCA9IHRoaXMuZ2V0RHluYW1pY0lucHV0KGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXRGaWVsZEVsZW1lbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0aWxsIEZvdW5kOiBcIitmaWVsZE5hbWUsZ2V0RmllbGRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrRmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm1DcmVhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpIHtcclxuICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0uZmllbGROYW1lID09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF0uZmllbGRMaXN0W2ZpZWxkSW5kZXhdW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXRDb250YWluZXJBdHRyaWJ1dGUoY29udGFpbmVyTmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpIHtcclxuICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5jb250YWluZXJOYW1lID09IGNvbnRhaW5lck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF1bYXR0cmlidXRlTmFtZV0gPSBhdHRyaWJ1dGVWYWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5maWVsZE5hbWUgPT0gZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF0uZmllbGRMaXN0W2ZpZWxkSW5kZXhdW2F0dHJpYnV0ZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4LCB2YWx1ZSwgbXVsdGkgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhUHJvY2VzcyhmaWVsZE5hbWUsIHJvd0luZGV4LCB2YWx1ZSwgbXVsdGkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lOiBmaWVsZE5hbWUsXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleDogcm93SW5kZXgsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBtdWx0aTogbXVsdGlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMub25Gb3JtUmVhZHkocm93SW5kZXggKyAxKS5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09ICdyZWFkeScpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5zZXREYXRhUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2V0RGF0YVNldCA9IHRoaXMuc2V0RGF0YVF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVByb2Nlc3Moc2V0RGF0YVNldC5maWVsZE5hbWUsIHNldERhdGFTZXQucm93SW5kZXgsIHNldERhdGFTZXQudmFsdWUsIHNldERhdGFTZXQubXVsdGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRHluYW1pYyBmb3JtIHJvdyBudW1iZXIgJyArIHJvd0luZGV4ICsgJyBkaWRuXFwndCBjcmVhdGUuIENhblxcJ3Qgc2V0IGRhdGEuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YVByb2Nlc3MoZmllbGROYW1lLCByb3dJbmRleCwgdmFsdWUsIG11bHRpID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZFR5cGUoZmllbGROYW1lKTtcclxuICAgICAgICBpZiAobXVsdGkgPT0gZmFsc2UgJiYgZmllbGRUeXBlICE9ICdjaGVja0JveCcgJiYgZmllbGRUeXBlICE9ICdmaWxlVXBsb2FkJyAmJiBmaWVsZFR5cGUgIT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgW3ZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZWxkVHlwZShmaWVsZE5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0uZmllbGROYW1lID09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdLmZpZWxkTGlzdFtmaWVsZEluZGV4XS50eXBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4LCBkYXRhSW5kZXggPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24pICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdKSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdSb3cgaW5kZXggbm90IGV4aXRzLic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnRmllbGQgbmFtZSBub3QgZXhpdHM6ICcgKyBmaWVsZE5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGFJbmRleCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YVR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gW107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUNsb25lID0gT2JqZWN0LmFzc2lnbihkYXRhVHlwZSwgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUNsb25lO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV1bZGF0YUluZGV4XSkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0RhdGUgaW5kZXggbm90IGV4aXRzIGluIGZpZWxkICcgKyBmaWVsZE5hbWUgKyAnOiAnICsgZGF0YUluZGV4O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUNsb25lID0gT2JqZWN0LmFzc2lnbihkYXRhVHlwZSwgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFDbG9uZVtkYXRhSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldER5bmFtaWNJbnB1dChmaWVsZE5hbWUsIHJvd0luZGV4ID0gMCkge1xyXG4gICAgICAgIGxldCBmb3JtUm93UmVmID0gbnVsbFxyXG4gICAgICAgIGxldCBjb250YWluZXJMaXN0UmVmID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzcGxheU1vZGUgPT0gJ3RhYmxlJykge1xyXG4gICAgICAgICAgICBmb3JtUm93UmVmID0gdGhpcy5mb3JtVGFibGVSb3cudG9BcnJheSgpO1xyXG4gICAgICAgICAgICBjb250YWluZXJMaXN0UmVmID0gZm9ybVJvd1JlZltyb3dJbmRleF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybVJvd1JlZiA9IHRoaXMuZm9ybVJvdy50b0FycmF5KCk7XHJcbiAgICAgICAgICAgIGlmIChmb3JtUm93UmVmW3Jvd0luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyTGlzdFJlZiA9IGZvcm1Sb3dSZWZbcm93SW5kZXhdLmNvbnRhaW5lckxpc3RSZWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lckxpc3RSZWYpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLmZpZWxkTmFtZSA9PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkVHlwZSA9IGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzcGxheU1vZGUgPT0gJ3RhYmxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyTGlzdFJlZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lckxpc3RSZWYuZmluZChpbnN0YW50Q29udGFpbmVyID0+IGluc3RhbnRDb250YWluZXIuY29udGFpbmVySW5kZXggPT0gY29udGFpbmVySW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBjb250YWluZXIuZ2V0RHluYW1pY0lucHV0KGZpZWxkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVHlwZSA9PSAnaGlkZGVuJyAmJiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNwbGF5TW9kZSA9PSAndGFibGUnICYmIGlucHV0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdoaWRkZW4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1hcFNldEF0dHJpYnV0ZShhdHRyaWJ1dGVPYmplY3QpIHtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgaW4gYXR0cmlidXRlT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGF0dHJpYnV0ZSBpbiBhdHRyaWJ1dGVPYmplY3RbZmllbGROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsIGF0dHJpYnV0ZSwgYXR0cmlidXRlT2JqZWN0W2ZpZWxkTmFtZV1bYXR0cmlidXRlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFwU2V0VmFsdWUodmFsdWVPYmplY3QsIHJvd0luZGV4KSB7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIGluIHZhbHVlT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVEYXRhID0gKHZhbHVlT2JqZWN0W2ZpZWxkTmFtZV0gPT0gbnVsbCB8fCAodmFsdWVPYmplY3RbZmllbGROYW1lXSA9PSAnJyAmJiB0eXBlb2YodmFsdWVPYmplY3RbZmllbGROYW1lXSkgIT0gXCJvYmplY3RcIikgPyAnJyA6IHZhbHVlT2JqZWN0W2ZpZWxkTmFtZV0pO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJhdXRvQ29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlU2V0T2JqZWN0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcodmFsdWVEYXRhKSB8fCBpc051bWJlcih2YWx1ZURhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gdGhpcy5nZXREeW5hbWljSW5wdXQoZmllbGROYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2V0RXhpc3RzRGF0YSA9IGlucHV0Lmluc3RhbnRJbnB1dC5nZXREYXRhRnJvbVZhbHVlKHZhbHVlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldEV4aXN0c0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXRPYmplY3QucHVzaChnZXRFeGlzdHNEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldE9iamVjdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHZhbHVlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHZhbHVlRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVSb3cgb2YgdmFsdWVEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlUm93LmRpc3BsYXkgfHwgIXZhbHVlUm93LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0T2JqZWN0ID0gdmFsdWVEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2V0IFBhdHRlcm4gSW5jb3JyZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXRPYmplY3QgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZURhdGEuZGlzcGxheSAmJiB2YWx1ZURhdGEudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0T2JqZWN0LnB1c2godmFsdWVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXQgUGF0dGVybiBJbmNvcnJlY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldE9iamVjdCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCwgdmFsdWVTZXRPYmplY3QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCwgdmFsdWVEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1hcEdldFZhbHVlKHZhbHVlT2JqZWN0LCByb3dJbmRleCkge1xyXG4gICAgICAgIHZhciBtYXBWYWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlT2JqZWN0KTtcclxuICAgICAgICBmb3IgKGxldCBtYXBGaWVsZE5hbWUgaW4gbWFwVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAobWFwVmFsdWVbbWFwRmllbGROYW1lXSkgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhVHlwZVNwbGl0ID0gbWFwVmFsdWVbbWFwRmllbGROYW1lXS5zcGxpdCgnOicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFUeXBlID0gKHR5cGVvZiAoZGF0YVR5cGVTcGxpdFsxXSkgIT0gJ3VuZGVmaW5lZCcgPyBkYXRhVHlwZVNwbGl0WzFdIDogJycpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFGaWVsZERldGFpbCA9IGRhdGFUeXBlU3BsaXRbMF0uc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZE5hbWUgPSBkYXRhRmllbGREZXRhaWwuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd0eXBlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9ybWFsVHlwZSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3JTZWxlY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0Qm94JyxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dEFyZWEnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsYWJlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ251bWJlciddO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRyb3BEb3duVHlwZSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnc2VsZWN0Qm94JyxcclxuICAgICAgICAgICAgICAgICAgICAncmFkaW8nXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNldFZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnYXV0b0NvbXBsZXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnc3dhcHBpbmdCb3gnLFxyXG4gICAgICAgICAgICAgICAgICAgICdtYXBWYWx1ZSdcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZVZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnZmlsZVVwbG9hZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ltYWdlJ1xyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0JveFZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnY2hlY2tCb3gnXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGUnXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbFR5cGUuaW5kZXhPZih0eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdGhpcy5jb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIGRhdGEuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkcm9wRG93blR5cGUuaW5kZXhPZih0eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0VHlwZSA9IGRhdGFGaWVsZERldGFpbC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VHlwZSAhPSAnZGlzcGxheScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB0aGlzLmNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgZGF0YS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGEuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZUxpc3RBdHRyaWJ1dGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3ZhbHVlTGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVMaXN0Um93IG9mIHZhbHVlTGlzdEF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZUxpc3RSb3cudmFsdWUgPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHZhbHVlTGlzdFJvdy5kaXNwbGF5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VHlwZSAhPSAnZGlzcGxheScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVMaXN0QXR0cmlidXRlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd2YWx1ZUxpc3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGFSb3cgb2YgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGFSb3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVMaXN0Um93IG9mIHZhbHVlTGlzdEF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVMaXN0Um93LnZhbHVlID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TGlzdC5wdXNoKHZhbHVlTGlzdFJvdy5kaXNwbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRpc3BsYXlMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRWYWx1ZVR5cGUuaW5kZXhPZih0eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0VHlwZSA9IGRhdGFGaWVsZERldGFpbC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VHlwZSAhPSAndmFsdWUnICYmIHNldFR5cGUgIT0gJ2Rpc3BsYXknICYmIHNldFR5cGUgIT0gJ2FsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VHlwZSA9ICd2YWx1ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhU2hpZnQgPSBkYXRhLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRUeXBlICE9ICdhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdGhpcy5jb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIGRhdGFTaGlmdFtzZXRUeXBlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRhdGFTaGlmdFsnZGlzcGxheSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhU2hpZnRbJ3ZhbHVlJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YUFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGFJbmRleCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VHlwZSAhPSAnYWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGRhdGFbZGF0YUluZGV4XVtzZXRUeXBlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZGF0YVtkYXRhSW5kZXhdWydkaXNwbGF5J10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhW2RhdGFJbmRleF1bJ3ZhbHVlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGF0YUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZVZhbHVlVHlwZS5pbmRleE9mKHR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFbXCJzZWxlY3RGaWxlXCJdLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVBcnJheS5wdXNoKGRhdGFbXCJzZWxlY3RGaWxlXCJdW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVBcnJheS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdGhpcy5jb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIGZpbGVBcnJheVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlQXJyYXkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZmlsZUFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tCb3hWYWx1ZVR5cGUuaW5kZXhPZih0eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVMaXN0ID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd2YWx1ZUxpc3QnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0VHlwZSA9IGRhdGFGaWVsZERldGFpbC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VHlwZSAhPSAndmFsdWUnICYmIHNldFR5cGUgIT0gJ2Rpc3BsYXknICYmIHNldFR5cGUgIT0gJ2FsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldFR5cGUgPT0gJ2Rpc3BsYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlTGlzdFJvdyBvZiB2YWx1ZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVt2YWx1ZUxpc3RSb3cudmFsdWVdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUucHVzaCh2YWx1ZUxpc3RSb3cuZGlzcGxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHRoaXMuY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCByZXR1cm5WYWx1ZS5qb2luKCcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRUeXBlID09ICd2YWx1ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVMaXN0Um93IG9mIHZhbHVlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3ZhbHVlTGlzdFJvdy52YWx1ZV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS5wdXNoKHZhbHVlTGlzdFJvdy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHRoaXMuY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCByZXR1cm5WYWx1ZS5qb2luKCcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRUeXBlID09ICdhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlTGlzdFJvdyBvZiB2YWx1ZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVt2YWx1ZUxpc3RSb3cudmFsdWVdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB2YWx1ZUxpc3RSb3cuZGlzcGxheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZUxpc3RSb3cudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdmFsdWVMaXN0Um93LmRpc3BsYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVMaXN0Um93LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRlVmFsdWVUeXBlLmluZGV4T2YodHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRhdGEuc2hpZnQoKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0YVJvdyBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlTGlzdC5wdXNoKGRhdGFbZGF0YVJvd10udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkYXRlTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhVHlwZSA9PSAnc3RyaW5nJyAmJiAhaXNTdHJpbmcoZGF0YSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFUeXBlID09ICdpbnQnICYmICFpc051bWJlcihkYXRhKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuRGF0YSA9IHBhcnNlSW50KGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGlzTmFOKHJldHVybkRhdGEpID8gMCA6IHJldHVybkRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT0gJ2Zsb2F0JyAmJiAhaXNOdW1iZXIoZGF0YSkpIHtcclxuICAgICAgICAgICAgbGV0IHJldHVybkRhdGEgPSBwYXJzZUZsb2F0KGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGlzTmFOKHJldHVybkRhdGEpID8gMCA6IHJldHVybkRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT0gJ2Jvb2wnICYmIGlzU3RyaW5nKGRhdGEpICYmIChkYXRhLnRvTG93ZXJDYXNlKCkgPT0gJ3RydWUnIHx8IGRhdGEudG9Mb3dlckNhc2UoKSA9PSAnZmFsc2UnKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuRGF0YSA9IChkYXRhID09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5EYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja1JlcXVpcmVGaWVsZChyb3dJbmRleCkge1xyXG5cclxuICAgICAgICBsZXQgc2V0VmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAnYXV0b0NvbXBsZXRlJyxcclxuICAgICAgICAgICAgJ3N3YXBwaW5nQm94JyxcclxuICAgICAgICAgICAgJ21hcFZhbHVlJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGZpbGVWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICdmaWxlVXBsb2FkJyxcclxuICAgICAgICAgICAgJ2ltYWdlJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgbGV0IHJlcXVpcmVTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGZpZWxkUmVxdWlyZUF0dHJpYnV0ZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAncmVxdWlyZScpO1xyXG4gICAgICAgICAgICBsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd0eXBlJyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGZpZWxkUmVxdWlyZUF0dHJpYnV0ZSkgIT0gJ3VuZGVmaW5lZCcgJiYgZmllbGRSZXF1aXJlQXR0cmlidXRlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZERhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGZpZWxkRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VmFsdWVUeXBlLmluZGV4T2YoZmllbGRUeXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkRGF0YVJvdyBpbiBmaWVsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGREYXRhW2ZpZWxkRGF0YVJvd11bXCJ2YWx1ZVwiXSA9PSBudWxsIHx8IGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddW1widmFsdWVcIl0gPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddW1wiZGlzcGxheVwiXSA9PSBudWxsIHx8IGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddW1wiZGlzcGxheVwiXSA9PSAnJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZERhdGFSb3cgaW4gZmllbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGREYXRhW2ZpZWxkRGF0YVJvd10gPT0gbnVsbCB8fCBmaWVsZERhdGFbZmllbGREYXRhUm93XSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlVHlwZS5pbmRleE9mKGZpZWxkVHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkRGF0YVtcInZhbHVlXCJdID09IG51bGwgfHwgZmllbGREYXRhW1widmFsdWVcIl0gPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoZmllbGREYXRhW1wiZGlzcGxheVwiXSA9PSBudWxsIHx8IGZpZWxkRGF0YVtcImRpc3BsYXlcIl0gPT0gJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVWYWx1ZVR5cGUuaW5kZXhPZihmaWVsZFR5cGUpID4gLTEpIHs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmllbGREYXRhW1wic2VsZWN0RmlsZVwiXS5sZW5ndGggfHwgZmllbGREYXRhW1wic2VsZWN0RmlsZVwiXS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09ICdjaGVja0JveCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhdmVDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGFLZXkgaW4gZmllbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGREYXRhW2RhdGFLZXldID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXZlQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhdmVDaGVja2VkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGREYXRhID09IG51bGwgfHwgZmllbGREYXRhID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZVN0YXR1cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXF1aXJlU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVmFsaWRhdGVGaWVsZChyb2xlSW5kZXgpIHtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBsZXQgY2hlY2tQYXR0ZXJuU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFZhbHVlUGF0dGVybiA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndmFsdWVQYXR0ZXJuJyk7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3R5cGUnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZmllbGRWYWx1ZVBhdHRlcm4pICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGREYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb2xlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoZmllbGREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFR5cGUgPT0gJ2F1dG9Db21wbGV0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGREYXRhUm93IGluIGZpZWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFTdHJpbmcoZmllbGREYXRhW2ZpZWxkRGF0YVJvd11bXCJkaXNwbGF5XCJdKS5tYXRjaChmaWVsZFZhbHVlUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1BhdHRlcm5TdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkRGF0YVJvdyBpbiBmaWVsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghU3RyaW5nKGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddKS5tYXRjaChmaWVsZFZhbHVlUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1BhdHRlcm5TdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVHlwZSA9PSAnYXV0b0NvbXBsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVN0cmluZyhmaWVsZERhdGFbXCJ2YWx1ZVwiXSkubWF0Y2goZmllbGRWYWx1ZVBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1BhdHRlcm5TdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghU3RyaW5nKGZpZWxkRGF0YSkubWF0Y2goZmllbGRWYWx1ZVBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1BhdHRlcm5TdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjaGVja1BhdHRlcm5TdGF0dXMgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hlY2tQYXR0ZXJuU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZWxkTGlzdCgpIHtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZmllbGRMaXN0LnB1c2goY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0uZmllbGROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmllbGRMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZpZWxkTGFiZWwoKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGFiZWwgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0udHlwZSAhPSAnaGlkZGVuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTGFiZWwucHVzaChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5sYWJlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maWVsZExhYmVsTGlzdCA9IGZpZWxkTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RnJhbWVIZWFkZXIocm93SW5kZXgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpICE9ICd1bmRlZmluZWQnICYmIEFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKSAmJiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUubGVuZ3RoID09IHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWVbcm93SW5kZXhdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKSAhPSAndW5kZWZpbmVkJyAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgKyAocGFyc2VJbnQocm93SW5kZXgpICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdGb3JtICcgKyAocGFyc2VJbnQocm93SW5kZXgpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZvcm1Sb3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25BZGRQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBBZGREYXRhLmxlbmd0aDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub25EZWxldGVQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlbXBEZWxldGVEYXRhLmxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Um93TnVtKHJvd051bSkge1xyXG4gICAgICAgIGxldCBjdXJyZW50Um93TnVtID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRSb3dOdW0gPCByb3dOdW0pIHtcclxuICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnRSb3dOdW0gPCByb3dOdW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0RGVmYXVsdCgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEucHVzaChkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvd051bSA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnRSb3dOdW0gPiByb3dOdW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93TnVtID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5yZVJlbmRlckZvcm0oKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5vbkZvcm1SZWFkeShyb3dOdW0pO1xyXG4gICAgfVxyXG4gICAgYWRkUm93KHJvd0luZGV4ID0gbnVsbCwgc291cmNlQWN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGxldCByb3dDb3VudCA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgIGxldCBfcm93SW5kZXggPSByb3dJbmRleDtcclxuICAgICAgICBpZiAocm93SW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBfcm93SW5kZXggPSB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGVmYXVsdFZhbHVlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXREZWZhdWx0KCkpO1xyXG4gICAgICAgIGlmICghdGhpcy5vbkFkZFByb2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1wQWRkRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFcclxuICAgICAgICAgICAgdGhpcy5vbkFkZFByb2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0T25SZVJlbmRlcih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wQWRkRGF0YS5zcGxpY2UoX3Jvd0luZGV4LCAwLCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIGxldCB0ZW1wRGF0YSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGRhdGFSb3dJbmRleCBpbiB0aGlzLnRlbXBBZGREYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhUm93SW5kZXggPCBfcm93SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBEYXRhW2RhdGFSb3dJbmRleF0gPSB0aGlzLnRlbXBBZGREYXRhW2RhdGFSb3dJbmRleF1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhUm93SW5kZXggPj0gX3Jvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRGF0YVtkYXRhUm93SW5kZXggKyByb3dDb3VudF0gPSB0aGlzLnRlbXBBZGREYXRhW2RhdGFSb3dJbmRleF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhID0gdGVtcERhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkRGF0YVRpbWVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGREYXRhVGltZXIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGREYXRhVGltZXIgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnRlbXBBZGREYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5vbkFkZFByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldE9uUmVSZW5kZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlRnJhbWVIZWFkZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdhZGRSb3cnLFxyXG4gICAgICAgICAgICBzb3VyY2VBY3Rpb246IHNvdXJjZUFjdGlvbixcclxuICAgICAgICAgICAgcm93SW5kZXg6IF9yb3dJbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gZGVsZXRlUm93VGVzdChyb3dJbmRleCwgc291cmNlQWN0aW9uID0gbnVsbCkge1xyXG4gICAgLy8gICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAvLyAgICAgaWYgKGlzQXJyYXkocm93SW5kZXgpKSB7XHJcbiAgICAvLyAgICAgICAgIGZvciAobGV0IHJvd0luZGV4TnVtIG9mIHJvd0luZGV4KSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleE51bV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAvLyAgICAgICAgIGlmIChpc0FycmF5KHJvd0luZGV4KSkge1xyXG4gICAgLy8gICAgICAgICAgICAgcm93SW5kZXguc29ydCgpO1xyXG4gICAgLy8gICAgICAgICAgICAgcm93SW5kZXgucmV2ZXJzZSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXhOdW0gb2Ygcm93SW5kZXgpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLnNwbGljZShyb3dJbmRleE51bSwgMSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLnNwbGljZShyb3dJbmRleCwgMSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBkZWxldGVSb3cocm93SW5kZXgsIHNvdXJjZUFjdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIGlmIChpc0FycmF5KHJvd0luZGV4KSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCByb3dJbmRleE51bSBvZiByb3dJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhOdW1dID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVjaykge1xyXG4gICAgICAgICAgICBsZXQgcm93Q291bnQgPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBSb3dMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRW5hYmxlUm93ID0gW107XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGlzYWJsZURlbGV0ZSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdGVtcERpc2FibGVMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGVsZXRlRGF0YTtcclxuICAgICAgICAgICAgbGV0IHRlbXBFbmFibGVSb3dEYXRhO1xyXG4gICAgICAgICAgICBsZXQgdGVtcERpc2FibGVEZWxldGVEYXRhO1xyXG4gICAgICAgICAgICBsZXQgdGVtcERpc2FibGVMaXN0RGF0YTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YVJvd0luZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSb3dMaXN0W3BhcnNlSW50KGRhdGFSb3dJbmRleCkgKyBwYXJzZUludChyb3dDb3VudCldID0gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtkYXRhUm93SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFbmFibGVSb3dbcGFyc2VJbnQoZGF0YVJvd0luZGV4KSArIHBhcnNlSW50KHJvd0NvdW50KV0gPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleFtkYXRhUm93SW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZURlbGV0ZVtwYXJzZUludChkYXRhUm93SW5kZXgpICsgcGFyc2VJbnQocm93Q291bnQpXSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGVbZGF0YVJvd0luZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlTGlzdFtwYXJzZUludChkYXRhUm93SW5kZXgpICsgcGFyc2VJbnQocm93Q291bnQpXSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W2RhdGFSb3dJbmRleF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMub25EZWxldGVQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRGVsZXRlRGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFbmFibGVSb3dEYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVEZWxldGVEYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVMaXN0RGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVQcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRPblJlUmVuZGVyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0FycmF5KHJvd0luZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgcm93SW5kZXguc29ydCgpO1xyXG4gICAgICAgICAgICAgICAgcm93SW5kZXgucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXhOdW0gb2Ygcm93SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGVsZXRlRGF0YS5zcGxpY2Uocm93SW5kZXhOdW0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVuYWJsZVJvd0RhdGEuc3BsaWNlKHJvd0luZGV4TnVtLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlRGVsZXRlRGF0YS5zcGxpY2Uocm93SW5kZXhOdW0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlTGlzdERhdGEuc3BsaWNlKHJvd0luZGV4TnVtLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRGVsZXRlRGF0YS5zcGxpY2Uocm93SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFbmFibGVSb3dEYXRhLnNwbGljZShyb3dJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZURlbGV0ZURhdGEuc3BsaWNlKHJvd0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZUxpc3REYXRhLnNwbGljZShyb3dJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSA9IHRlbXBSb3dMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9IHRlbXBFbmFibGVSb3c7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgPSB0ZW1wRGlzYWJsZURlbGV0ZTtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgPSB0ZW1wRGlzYWJsZUxpc3Q7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5kZWxldGVEYXRhVGltZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVEYXRhVGltZXIgPSBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kZWxldGVEYXRhVGltZXIgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGVtcERlbGV0ZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggPSBPYmplY3QuYXNzaWduKFtdLCB0ZW1wRW5hYmxlUm93RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlID0gT2JqZWN0LmFzc2lnbihbXSwgdGVtcERpc2FibGVEZWxldGVEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ID0gT2JqZWN0LmFzc2lnbihbXSwgdGVtcERpc2FibGVMaXN0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVsZXRlUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldE9uUmVSZW5kZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUZyYW1lSGVhZGVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdlbmVyYXRlRnJhbWVIZWFkZXIoKTtcclxuICAgICAgICAvLyB0aGlzLnJlUmVuZGVyRm9ybSgpO1xyXG4gICAgICAgIC8vIE9ic2VydmFibGUudGltZXIoNDAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICAvLyAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHRlbXBEYXRhID0gT2JqZWN0LmFzc2lnbihbXSx0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBEYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLHRoaXMuZGVmYXVsdERhdGFbZmllbGROYW1lXSk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSx0ZW1wRGF0YSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdkZWxldGVSb3cnLFxyXG4gICAgICAgICAgICBzb3VyY2VBY3Rpb246IHNvdXJjZUFjdGlvbixcclxuICAgICAgICAgICAgcm93SW5kZXg6IHJvd0luZGV4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbEJhY2tGcmFtZShldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5hY3Rpb24gPT0gJ2RlbGV0ZVJvdycpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVSb3coZXZlbnQucm93SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVSb3cocm93SW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4W3Jvd0luZGV4XSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZVJvdyhyb3dJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXhbcm93SW5kZXhdID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUZpZWxkKHJvd0luZGV4LCBmaWVsZE5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtyb3dJbmRleF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W3Jvd0luZGV4XSA9IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVGaWVsZChyb3dJbmRleCwgZmllbGROYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3Rbcm93SW5kZXhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtyb3dJbmRleF0gPSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtyb3dJbmRleF1bZmllbGROYW1lXSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZURlbGV0ZVJvdyhyb3dJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGVbcm93SW5kZXhdID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZURlbGV0ZVJvdyhyb3dJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGVbcm93SW5kZXhdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZUZpbHRlcihyb3dJbmRleCkge1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndHlwZScpO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRUeXBlID09ICdhdXRvQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVSb3cgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR5bmFtaWNJbnB1dDogYW55ID0gdGhpcy5nZXREeW5hbWljSW5wdXQoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR5bmFtaWNJbnB1dC5pbnN0YW50SW5wdXQuZmlsdGVyQXV0b0NvbXBsZXRlKHZhbHVlUm93LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZUZpbHRlckZpZWxkKGZpZWxkTmFtZSwgcm93SW5kZXgsIGRhdGFJbmRleCkge1xyXG4gICAgICAgIGxldCBkeW5hbWljSW5wdXQ6IGFueSA9IHRoaXMuZ2V0RHluYW1pY0lucHV0KGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgIGR5bmFtaWNJbnB1dC5pbnN0YW50SW5wdXQuZmlsdGVyQXV0b0NvbXBsZXRlKGRhdGFJbmRleCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Gb3JtUmVhZHkocm93TnVtLCBkYXRhID0gbnVsbCwgdGltZW91dCA9IDE1MDAwLCBkZWJ1ZyA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRNaWxsaXNlY29uZHMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZVN0YXJ0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydE1pbGxpc2Vjb25kcyA9IGRhdGVTdGFydC5nZXRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZWFkeVN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gbmV3IE9ic2VydmFibGUoKG9ic2VydmFibGUpID0+IHtcclxuICAgICAgICAgICAgaW50ZXJ2YWwoMjAwKS5waXBlKHRha2VXaGlsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZHlTdGF0dXMgIT0gdHJ1ZSAmJiB0aGlzLnN0YXJ0TWlsbGlzZWNvbmRzICE9IG51bGxcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVDdXJyZW50ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRNaWxsaXNlY29uZHMgPSBkYXRlQ3VycmVudC5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZmVGltZSA9IGN1cnJlbnRNaWxsaXNlY29uZHMgLSB0aGlzLnN0YXJ0TWlsbGlzZWNvbmRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrRmllbGQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IHJvd051bTsgcm93SW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkeW5hbWljSW5wdXQgPSB0aGlzLmdldER5bmFtaWNJbnB1dChmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0ZpZWxkLnB1c2goZHluYW1pY0lucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrRmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja0ZpZWxkLmluZGV4T2YobnVsbCkgPiAtMSB8fCBjaGVja0ZpZWxkLmluZGV4T2YodW5kZWZpbmVkKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFkeVN0YXR1cyA9PSB0cnVlIHx8IGRpZmZUaW1lID4gdGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydE1pbGxpc2Vjb25kcyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhZHlTdGF0dXMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ3JlYWR5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICd0aW1lb3V0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmaW5lQ29udGFpbmVyVGFibGVNb2RlKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgbGV0IGZpZWxkTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWluZXIgb2YgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZENyZWF0aW9uIG9mIGNvbnRhaW5lci5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZExpc3QucHVzaChmaWVsZENyZWF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlZmluZWRDb250YWluZXJUYWJsZU1vZGUgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5yZWZpbmVkQ29udGFpbmVyVGFibGVNb2RlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZmllbGRMaXN0OiBmaWVsZExpc3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGR1cGxpY2F0ZURhdGFSb3coc291cmNlUm93LCBkZXN0aW5hdGlvblJvdywgYWN0aW9uT25Gcm9tUmVhZHkgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbc291cmNlUm93XSAhPSB1bmRlZmluZWQgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtkZXN0aW5hdGlvblJvd10gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlUm93UHJvY2Vzcyhzb3VyY2VSb3csIGRlc3RpbmF0aW9uUm93KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbk9uRnJvbVJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlUXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VSb3c6IHNvdXJjZVJvdyxcclxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uUm93OiBkZXN0aW5hdGlvblJvd1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLm9uRm9ybVJlYWR5KGRlc3RpbmF0aW9uUm93ICsgMSkuc3Vic2NyaWJlKChyZWFkeVN0YXR1czogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVhZHlTdGF0dXMuc3RhdHVzID09ICdyZWFkeScpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5kdXBsaWNhdGVRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkdXBsaWNhdGVEYXRhID0gdGhpcy5kdXBsaWNhdGVRdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR1cGxpY2F0ZVJvd1Byb2Nlc3MoZHVwbGljYXRlRGF0YS5zb3VyY2VSb3csIGR1cGxpY2F0ZURhdGEuZGVzdGluYXRpb25Sb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRHluYW1pYyBmb3JtIHJvdyBudW1iZXIgJyArIGRlc3RpbmF0aW9uUm93ICsgJyBkaWRuXFwndCBjcmVhdGUuIENhblxcJ3QgZHVwbGljYXRlIGRhdGEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEYXRhIGluZGV4IGluY29ycmVjdC4gQ2FuXFwndCBkdXBsaWNhdGUgZGF0YS4nKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkdXBsaWNhdGVUb05ld1Jvdyhzb3VyY2VSb3cgPSAwLCBzb3VyY2VBY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGRhdGFOZXdSb3cgPSB7fTtcclxuICAgICAgICBsZXQgaGF2ZURhdGEgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtzb3VyY2VSb3ddICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBkYXRhTmV3Um93ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtzb3VyY2VSb3ddKTtcclxuICAgICAgICAgICAgaGF2ZURhdGEgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGRhdGFOZXdSb3cgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhWzBdKTtcclxuICAgICAgICAgICAgaGF2ZURhdGEgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2R1cGxpY2F0ZSBuZXcgcm93IGZhaWwgbm90IGZvdW5kIGFueSBkYXRhJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhdmVEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0VmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldERlZmF1bHQoKSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBpbiBkZWZhdWx0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhTmV3Um93W2ZpZWxkTmFtZV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gT2JqZWN0LmFzc2lnbihbXSwgZGF0YU5ld1Jvd1tmaWVsZE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlUm93IG9mIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09iamVjdCh2YWx1ZVJvdykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgdmFsdWVSb3cpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUucHVzaCh2YWx1ZVJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlW2ZpZWxkTmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLnB1c2goZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnZHVwbGljYXRlVG9OZXdSb3cnLFxyXG4gICAgICAgICAgICBzb3VyY2VBY3Rpb246IHNvdXJjZUFjdGlvbixcclxuICAgICAgICAgICAgc291cmNlSW5kZXg6IHNvdXJjZVJvd1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGR1cGxpY2F0ZVJvd1Byb2Nlc3Moc291cmNlUm93LCBkZXN0aW5hdGlvblJvdykge1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGxldCBvYmpHZXQgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIG9iakdldFtmaWVsZE5hbWVdID0gZmllbGROYW1lICsgJy5hbGwnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc291cmNlRGF0YSA9IHRoaXMubWFwR2V0VmFsdWUob2JqR2V0LCBzb3VyY2VSb3cpO1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBpbiBzb3VyY2VEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd0eXBlJyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdjaGVja0JveCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVEYXRhIG9mIHNvdXJjZURhdGFbZmllbGROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW3ZhbHVlRGF0YS52YWx1ZV0gPSB2YWx1ZURhdGEuY2hlY2tlZFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNvdXJjZURhdGFbZmllbGROYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFwU2V0VmFsdWUoc291cmNlRGF0YSwgZGVzdGluYXRpb25Sb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRHVwbGljYXRlKGZpZWxkQXJyYXksIHJlZ0V4ID0gLyguKikvLCByZWdFeEluZGV4ID0gMCkge1xyXG4gICAgICAgIGxldCB0ZW1wRGF0YUNoZWNrID0gW107XHJcbiAgICAgICAgbGV0IG1hcEdldCA9IHt9O1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGRMaXN0IG9mIGZpZWxkQXJyYXkpIHtcclxuICAgICAgICAgICAgbWFwR2V0W2ZpZWxkTGlzdF0gPSBmaWVsZExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmb3JtUm93ID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtUm93OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLm1hcEdldFZhbHVlKG1hcEdldCwgaSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFLZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlZ1Rlc3QgPSBuZXcgUmVnRXhwKHJlZ0V4KTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXRjaCA9IHJlZ1Rlc3QuZXhlYyhkYXRhW2RhdGFLZXldKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBEYXRhQ2hlY2suaW5kZXhPZihtYXRjaFtyZWdFeEluZGV4XSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGF0YUNoZWNrLnB1c2gobWF0Y2hbcmVnRXhJbmRleF0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGVjayA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrUmVxdWlyZUFsbCgpIHtcclxuICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIGxldCBmb3JtUm93ID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtUm93OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrUmVxdWlyZUZpZWxkKGkpKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrVmFsaWRhdGVBbGwoKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZm9ybVJvdyA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybVJvdzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1ZhbGlkYXRlRmllbGQoaSkpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hlY2s7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kZShtb2RlKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24ubW9kZSA9IG1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlQWRkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5hZGRSb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmFkZFJvdyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmFkZFJvdyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUFkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uYWRkUm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5hZGRSb3cgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uYWRkUm93ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlRGVsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kZWxldGVSb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRlbGV0ZVJvdyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRlbGV0ZVJvdyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZURlbGV0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGVsZXRlUm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kZWxldGVSb3cgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kZWxldGVSb3cgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXREZWZhdWx0KHJvd0luZGV4ID0gMCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbMF0pIHtcclxuICAgICAgICAgICAgdGhpcy5nZXREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBpbiB0aGlzLmRlZmF1bHREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFWYWx1ZShmaWVsZE5hbWUsMCwgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZE5hbWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0U2F2ZVBvaW50KHNhdmVQb2ludE5hbWUgPSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgIGxldCBzYXZlUG9pbnREYXRhID0gW107XHJcbiAgICAgICAgbGV0IHJvd051bSA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGxldCBtYXBHZXQ6YW55ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBtYXBHZXRbZmllbGROYW1lXSA9IGZpZWxkTmFtZVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd051bTtpICsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5tYXBHZXRWYWx1ZShtYXBHZXQsaSk7XHJcbiAgICAgICAgICAgIHNhdmVQb2ludERhdGEucHVzaChkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVQb2ludFtzYXZlUG9pbnROYW1lXSA9IHNhdmVQb2ludERhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFNhdmVQb2ludChzYXZlUG9pbnROYW1lID0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICBpZiAodGhpcy5zYXZlUG9pbnRbc2F2ZVBvaW50TmFtZV0pIHtcclxuICAgICAgICAgICAgbGV0IHNhdmVQb2ludERhdGEgPSB0aGlzLnNhdmVQb2ludFtzYXZlUG9pbnROYW1lXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgc2F2ZVBvaW50SW5kZXggaW4gc2F2ZVBvaW50RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBTZXRWYWx1ZShzYXZlUG9pbnREYXRhW3NhdmVQb2ludEluZGV4XSwgc2F2ZVBvaW50SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRQYXJhbShyb3dJbmRleCA9IDApIHtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgcGFyYW1bZmllbGROYW1lXSA9IGZpZWxkTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyYW0gPSB0aGlzLm1hcEdldFZhbHVlKHBhcmFtLCByb3dJbmRleClcclxuICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICB9XHJcbn1cclxuIl19