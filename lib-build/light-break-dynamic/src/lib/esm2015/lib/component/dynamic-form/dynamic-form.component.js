import { __decorate, __metadata } from "tslib";
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
export { DynamicFormComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtZm9ybS9keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQW9CLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDekUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDdkYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxj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QUFRLENBQUMsR0FBRyxFQUFFLENBQUE7U0FDM0Q7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMxRSxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDbEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFBO1NBQzNEO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDM0UsQ0FBQztJQUVELGVBQWUsQ0FBQyxRQUFRO1FBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxTQUFTLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNsRSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsUUFBUTtRQUNyQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxD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QUFDLElBQUk7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNoRCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDaEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNqRCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNuRCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMs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QUM7UUFDUCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLDIzS0FBNEM7UUFDNUMsZUFBZSxFQUFFO1lBQ2IsY0FBYztZQUNkLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsaUJBQWlCO1lBQ2pCLG9CQUFvQjtZQUNwQixrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QscUJBQXFCO1lBQ3JCLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsb0JBQW9CO1lBQ3BCLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2QsYUFBYTtTQUNoQjtRQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0tBQ2hDLENBQUM7cUNBNEJ3QyxnQkFBZ0I7R0EzQjdDLG9CQUFvQixDQSsxQ2hDO1NBLzFDWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdNb2R1bGUsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TGFiZWxDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvbGFiZWwvbGFiZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHtUZXh0Qm94Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L3RleHRib3gvdGV4dGJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1RleHRBcmVhQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L3RleHQtYXJlYS90ZXh0LWFyZWEuY29tcG9uZW50JztcclxuaW1wb3J0IHtDaGVja0JveENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9jaGVjay1ib3gvY2hlY2stYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7U2VsZWN0Qm94Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L3NlbGVjdC1ib3gvc2VsZWN0LWJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0hpZGRlbkNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9oaWRkZW4vaGlkZGVuLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RmlsZVVwbG9hZENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0ltYWdlQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2ltYWdlL2ltYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QXV0b0NvbXBsZXRlQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2F1dG8tY29tcGxldGUvYXV0by1jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0J1dHRvbkNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7aXNBcnJheSwgaXNOdW1iZXIsIGlzT2JqZWN0LCBpc1N0cmluZ30gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7U3dhcHBpbmdCb3hDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvc3dhcHBpbmctYm94L3N3YXBwaW5nLWJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge01hcFZhbHVlQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L21hcC12YWx1ZS9tYXAtdmFsdWUuY29tcG9uZW50JztcclxuaW1wb3J0IHtSYWRpb0NvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9yYWRpby9yYWRpby5jb21wb25lbnQnO1xyXG5pbXBvcnQge0RhdGVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvZGF0ZS9kYXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RHluYW1pY0Zvcm1Sb3dDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtZm9ybS1yb3cvZHluYW1pYy1mb3JtLXJvdy5jb21wb25lbnQnO1xyXG5pbXBvcnQge0R5bmFtaWNDb250YWluZXJUYWJsZUNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1jb250YWluZXItdGFibGUvZHluYW1pYy1jb250YWluZXItdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCB0aW1lciwgaW50ZXJ2YWx9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0J1dHRvbkljb25Db21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvYnV0dG9uLWljb24vYnV0dG9uLWljb24uY29tcG9uZW50JztcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHt0YWtlV2hpbGV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtDb2xvclNlbGVjdENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9jb2xvci1zZWxlY3QvY29sb3Itc2VsZWN0LmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtZm9ybScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1mb3JtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgICAgIExhYmVsQ29tcG9uZW50LFxyXG4gICAgICAgIFRleHRCb3hDb21wb25lbnQsXHJcbiAgICAgICAgVGV4dEFyZWFDb21wb25lbnQsXHJcbiAgICAgICAgQ2hlY2tCb3hDb21wb25lbnQsXHJcbiAgICAgICAgQ29sb3JTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgU2VsZWN0Qm94Q29tcG9uZW50LFxyXG4gICAgICAgIEhpZGRlbkNvbXBvbmVudCxcclxuICAgICAgICBGaWxlVXBsb2FkQ29tcG9uZW50LFxyXG4gICAgICAgIEltYWdlQ29tcG9uZW50LFxyXG4gICAgICAgIEF1dG9Db21wbGV0ZUNvbXBvbmVudCxcclxuICAgICAgICBCdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgQnV0dG9uSWNvbkNvbXBvbmVudCxcclxuICAgICAgICBTd2FwcGluZ0JveENvbXBvbmVudCxcclxuICAgICAgICBNYXBWYWx1ZUNvbXBvbmVudCxcclxuICAgICAgICBSYWRpb0NvbXBvbmVudCxcclxuICAgICAgICBEYXRlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbQW5pbWF0aW9uU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBWaWV3Q2hpbGRyZW4oRHluYW1pY0Zvcm1Sb3dDb21wb25lbnQpIGZvcm1Sb3c6IFF1ZXJ5TGlzdDxEeW5hbWljRm9ybVJvd0NvbXBvbmVudD47XHJcbiAgICBAVmlld0NoaWxkcmVuKER5bmFtaWNDb250YWluZXJUYWJsZUNvbXBvbmVudCkgZm9ybVRhYmxlUm93OiBRdWVyeUxpc3Q8RHluYW1pY0NvbnRhaW5lclRhYmxlQ29tcG9uZW50PjtcclxuICAgIEBJbnB1dCgpIGZvcm1DcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIG1vZGVsO1xyXG4gICAgQElucHV0KCkgYWN0aW9uRGF0YUluZGV4ID0gMDtcclxuICAgIEBJbnB1dCgpIGRlZmF1bHREYXRhOmFueSA9IHt9O1xyXG4gICAgQElucHV0KCkgc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbiA9IHt9O1xyXG4gICAgQE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBmcmFtZUhlYWRlciA9IFtdO1xyXG4gICAgb2JqS2V5ID0gT2JqZWN0LmtleXM7XHJcbiAgICBmaWVsZExhYmVsTGlzdCA9IFtdO1xyXG4gICAgX3JlUmVuZGVyRmllbGRMaXN0ID0gW107XHJcbiAgICByZWZpbmVkQ29udGFpbmVyVGFibGVNb2RlID0gW107XHJcbiAgICB0ZW1wRGVsZXRlRGF0YSA9IFtdO1xyXG4gICAgb25EZWxldGVQcm9jZXNzID0gZmFsc2U7XHJcbiAgICBkZWxldGVEYXRhVGltZXI6IGFueTtcclxuICAgIHRlbXBBZGREYXRhID0gW107XHJcbiAgICBvbkFkZFByb2Nlc3MgPSBmYWxzZTtcclxuICAgIGFkZERhdGFUaW1lcjogYW55O1xyXG4gICAgc2V0RGF0YVF1ZXVlID0gW107XHJcbiAgICBkdXBsaWNhdGVRdWV1ZSA9IFtdO1xyXG4gICAgc2F2ZVBvaW50OmFueSA9IHt9O1xyXG4gICAgcHJpdmF0ZSBzdGFydE1pbGxpc2Vjb25kczogbnVtYmVyID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuaW1hdGlvblNlcnZpY2U6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMudmVyaWZ5RmllbGQoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImZvcm0+PlwiLHRoaXMuZm9ybUNyZWF0aW9uKTtcclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbiA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb24sIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uKTtcclxuICAgICAgICB0aGlzLmdldERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmNvbXBhcmVNb2RlbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGcmFtZUhlYWRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEZpZWxkTGFiZWwoKTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzcGxheU1vZGUgPT0gJ3RhYmxlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmluZUNvbnRhaW5lclRhYmxlTW9kZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0RW5hYmxlQW5pbWF0aW9uKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZUFuaW1hdGlvbilcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29tcGFyZU1vZGVsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5tb2RlbE5hbWUgJiYgdGhpcy5tb2RlbFtjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5tb2RlbE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb2RlbERhdGEgPSB0aGlzLm1vZGVsW2NvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLm1vZGVsTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGF0dHJpYnV0ZSBpbiBtb2RlbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XVthdHRyaWJ1dGVdID09IHVuZGVmaW5lZCB8fCBjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XVthdHRyaWJ1dGVdID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XVthdHRyaWJ1dGVdID0gbW9kZWxEYXRhW2F0dHJpYnV0ZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdmVyaWZ5RmllbGQoKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtkYXRhSW5kZXhdW2ZpZWxkTmFtZV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEeW5hbWljIGZvcm0gZXJyb3IgZmllbGQgZGF0YSBub3QgZXhpc3RzOiBcXCcnICsgZmllbGROYW1lICsgJ1xcJyBkYXRhIHJvdzogJyArIGRhdGFJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWNrID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlRnJhbWVIZWFkZXIoKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUhlYWRlciA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgIT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSAhPSAnJ1xyXG4gICAgICAgICAgICAmJiBBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSlcclxuICAgICAgICAgICAgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lLmxlbmd0aCA9PSB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lSGVhZGVyID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICE9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAmJiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgIT0gJydcclxuICAgICAgICAgICAgJiYgIUFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKVxyXG4gICAgICAgICAgICAmJiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVIZWFkZXJbMF0gPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgIT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICYmIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSAhPSAnJ1xyXG4gICAgICAgICAgICAmJiAhQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpXHJcbiAgICAgICAgICAgICYmIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhS2V5IGluIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lSGVhZGVyW2RhdGFLZXldID0gU3RyaW5nKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSkgKyBTdHJpbmcoY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSArIChwYXJzZUludChyb3dJbmRleCkrMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YUtleSBpbiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZUhlYWRlcltkYXRhS2V5XSA9ICdGb3JtICcgKyBTdHJpbmcoY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vcmV0dXJuIFwiRm9ybSBcIiArKHBhcnNlSW50KHJvd0luZGV4KSsxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0NhbGxCYWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA9PSAnZGVsZXRlUm93Jykge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVJvdyhldmVudC5yb3dJbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGltZXIoMTAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbENhbGxCYWNrLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlZmF1bHQoKSB7XHJcbiAgICAgICAgbGV0IHNldFZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgJ2F1dG9Db21wbGV0ZScsXHJcbiAgICAgICAgICAgICdzd2FwcGluZ0JveCcsXHJcbiAgICAgICAgICAgICdtYXBWYWx1ZSdcclxuICAgICAgICBdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29udGFpbmVyIG9mIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGRDcmVhdGlvbiBvZiBjb250YWluZXIuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkQ3JlYXRpb24udHlwZSAhPSAnY2hlY2tCb3gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpZWxkQ3JlYXRpb24uZGVmYXVsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VmFsdWVUeXBlLmluZGV4T2YoZmllbGRDcmVhdGlvbi50eXBlKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIGZpZWxkQ3JlYXRpb24uZGVmYXVsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTZXQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGVja1ZhbHVlIG9mIGZpZWxkQ3JlYXRpb24uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja1ZhbHVlLmRpc3BsYXkgfHwgIWNoZWNrVmFsdWUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2V0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBjaGVja1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2hlY2tWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTZXQucHVzaChjaGVja1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIGRlZmF1bHRTZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChmaWVsZENyZWF0aW9uLmRlZmF1bHQpID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlVHlwZS5pbmRleE9mKGZpZWxkQ3JlYXRpb24udHlwZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCBbZmllbGRDcmVhdGlvbi5kZWZhdWx0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZENyZWF0aW9uLmRlZmF1bHQuZGlzcGxheSB8fCAhZmllbGRDcmVhdGlvbi5kZWZhdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmllbGRDcmVhdGlvbi5kZWZhdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZENyZWF0aW9uLmRlZmF1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgW2ZpZWxkQ3JlYXRpb24uZGVmYXVsdF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlVHlwZS5pbmRleE9mKGZpZWxkQ3JlYXRpb24udHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSxbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sWycnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChmaWVsZENyZWF0aW9uLmRlZmF1bHQpID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIGZpZWxkQ3JlYXRpb24uZGVmYXVsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFZhbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVMaXN0RGF0YSBvZiBmaWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWxbdmFsdWVMaXN0RGF0YS52YWx1ZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcmVSZW5kZXJGb3JtKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuY29tcGFyZU1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5yZWZpbmVDb250YWluZXJUYWJsZU1vZGUoKTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlRnJhbWVIZWFkZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0RmllbGRMYWJlbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNwbGF5TW9kZSA9PSAndGFibGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmaW5lQ29udGFpbmVyVGFibGVNb2RlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldE9uUmVSZW5kZXIodHJ1ZSk7XHJcbiAgICAgICAgaW50ZXJ2YWwoMTAwKS5waXBlKHRha2VXaGlsZSgoKSA9PiAhdGhpcy5zaG93Rm9ybSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0T25SZVJlbmRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmZvcm1DcmVhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlUmVuZGVyRmllbGQoZmllbGRBcnJheSwgcm93SW5kZXggPSAwKSB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGZpZWxkQXJyYXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0ID0gT2JqZWN0LmFzc2lnbih0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCwgW2ZpZWxkQXJyYXldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCA9IE9iamVjdC5hc3NpZ24odGhpcy5fcmVSZW5kZXJGaWVsZExpc3QsIGZpZWxkQXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbnRlcnZhbCgxMDApLnBpcGUodGFrZVdoaWxlKCgpID0+IHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0ICE9IG51bGwpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2hlY2tcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiB0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnZXRGaWVsZEVsZW1lbnQgPSB0aGlzLmdldER5bmFtaWNJbnB1dChmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0RmllbGRFbGVtZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTdGlsbCBGb3VuZDogXCIrZmllbGROYW1lLGdldEZpZWxkRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0ZsYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JtQ3JlYXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLmZpZWxkTmFtZSA9PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdLmZpZWxkTGlzdFtmaWVsZEluZGV4XVthdHRyaWJ1dGVOYW1lXSA9IGF0dHJpYnV0ZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0Q29udGFpbmVyQXR0cmlidXRlKGNvbnRhaW5lck5hbWUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuY29udGFpbmVyTmFtZSA9PSBjb250YWluZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdW2F0dHJpYnV0ZU5hbWVdID0gYXR0cmlidXRlVmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsIGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0uZmllbGROYW1lID09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdLmZpZWxkTGlzdFtmaWVsZEluZGV4XVthdHRyaWJ1dGVOYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCwgdmFsdWUsIG11bHRpID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YVByb2Nlc3MoZmllbGROYW1lLCByb3dJbmRleCwgdmFsdWUsIG11bHRpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGFRdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZTogZmllbGROYW1lLFxyXG4gICAgICAgICAgICAgICAgcm93SW5kZXg6IHJvd0luZGV4LFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbXVsdGk6IG11bHRpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uRm9ybVJlYWR5KHJvd0luZGV4ICsgMSkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PSAncmVhZHknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuc2V0RGF0YVF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNldERhdGFTZXQgPSB0aGlzLnNldERhdGFRdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFQcm9jZXNzKHNldERhdGFTZXQuZmllbGROYW1lLCBzZXREYXRhU2V0LnJvd0luZGV4LCBzZXREYXRhU2V0LnZhbHVlLCBzZXREYXRhU2V0Lm11bHRpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0R5bmFtaWMgZm9ybSByb3cgbnVtYmVyICcgKyByb3dJbmRleCArICcgZGlkblxcJ3QgY3JlYXRlLiBDYW5cXCd0IHNldCBkYXRhLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldERhdGFQcm9jZXNzKGZpZWxkTmFtZSwgcm93SW5kZXgsIHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRUeXBlKGZpZWxkTmFtZSk7XHJcbiAgICAgICAgaWYgKG11bHRpID09IGZhbHNlICYmIGZpZWxkVHlwZSAhPSAnY2hlY2tCb3gnICYmIGZpZWxkVHlwZSAhPSAnZmlsZVVwbG9hZCcgJiYgZmllbGRUeXBlICE9ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIFt2YWx1ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRGaWVsZFR5cGUoZmllbGROYW1lKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLmZpZWxkTmFtZSA9PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XS5maWVsZExpc3RbZmllbGRJbmRleF0udHlwZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCwgZGF0YUluZGV4ID0gbnVsbCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uKSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnUm93IGluZGV4IG5vdCBleGl0cy4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0ZpZWxkIG5hbWUgbm90IGV4aXRzOiAnICsgZmllbGROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhSW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFUeXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFDbG9uZSA9IE9iamVjdC5hc3NpZ24oZGF0YVR5cGUsIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFDbG9uZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdW2RhdGFJbmRleF0pID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdEYXRlIGluZGV4IG5vdCBleGl0cyBpbiBmaWVsZCAnICsgZmllbGROYW1lICsgJzogJyArIGRhdGFJbmRleDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFDbG9uZSA9IE9iamVjdC5hc3NpZ24oZGF0YVR5cGUsIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhQ2xvbmVbZGF0YUluZGV4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXREeW5hbWljSW5wdXQoZmllbGROYW1lLCByb3dJbmRleCA9IDApIHtcclxuICAgICAgICBsZXQgZm9ybVJvd1JlZiA9IG51bGxcclxuICAgICAgICBsZXQgY29udGFpbmVyTGlzdFJlZiA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc3BsYXlNb2RlID09ICd0YWJsZScpIHtcclxuICAgICAgICAgICAgZm9ybVJvd1JlZiA9IHRoaXMuZm9ybVRhYmxlUm93LnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyTGlzdFJlZiA9IGZvcm1Sb3dSZWZbcm93SW5kZXhdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcm1Sb3dSZWYgPSB0aGlzLmZvcm1Sb3cudG9BcnJheSgpO1xyXG4gICAgICAgICAgICBpZiAoZm9ybVJvd1JlZltyb3dJbmRleF0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckxpc3RSZWYgPSBmb3JtUm93UmVmW3Jvd0luZGV4XS5jb250YWluZXJMaXN0UmVmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250YWluZXJMaXN0UmVmKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5maWVsZE5hbWUgPT0gZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZFR5cGUgPSBjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS50eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc3BsYXlNb2RlID09ICd0YWJsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lckxpc3RSZWY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJMaXN0UmVmLmZpbmQoaW5zdGFudENvbnRhaW5lciA9PiBpbnN0YW50Q29udGFpbmVyLmNvbnRhaW5lckluZGV4ID09IGNvbnRhaW5lckluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gY29udGFpbmVyLmdldER5bmFtaWNJbnB1dChmaWVsZEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFR5cGUgPT0gJ2hpZGRlbicgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzcGxheU1vZGUgPT0gJ3RhYmxlJyAmJiBpbnB1dCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYXBTZXRBdHRyaWJ1dGUoYXR0cmlidXRlT2JqZWN0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIGluIGF0dHJpYnV0ZU9iamVjdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyaWJ1dGUgaW4gYXR0cmlidXRlT2JqZWN0W2ZpZWxkTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCBhdHRyaWJ1dGUsIGF0dHJpYnV0ZU9iamVjdFtmaWVsZE5hbWVdW2F0dHJpYnV0ZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1hcFNldFZhbHVlKHZhbHVlT2JqZWN0LCByb3dJbmRleCkge1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBpbiB2YWx1ZU9iamVjdCkge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsIFwidHlwZVwiKTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlRGF0YSA9ICh2YWx1ZU9iamVjdFtmaWVsZE5hbWVdID09IG51bGwgfHwgKHZhbHVlT2JqZWN0W2ZpZWxkTmFtZV0gPT0gJycgJiYgdHlwZW9mKHZhbHVlT2JqZWN0W2ZpZWxkTmFtZV0pICE9IFwib2JqZWN0XCIpID8gJycgOiB2YWx1ZU9iamVjdFtmaWVsZE5hbWVdKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiYXV0b0NvbXBsZXRlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVNldE9iamVjdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHZhbHVlRGF0YSkgfHwgaXNOdW1iZXIodmFsdWVEYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IHRoaXMuZ2V0RHluYW1pY0lucHV0KGZpZWxkTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdldEV4aXN0c0RhdGEgPSBpbnB1dC5pbnN0YW50SW5wdXQuZ2V0RGF0YUZyb21WYWx1ZSh2YWx1ZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXRFeGlzdHNEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0T2JqZWN0LnB1c2goZ2V0RXhpc3RzRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXRPYmplY3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB2YWx1ZURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZURhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlUm93IG9mIHZhbHVlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZVJvdy5kaXNwbGF5IHx8ICF2YWx1ZVJvdy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldE9iamVjdCA9IHZhbHVlRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNldCBQYXR0ZXJuIEluY29ycmVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0T2JqZWN0ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVEYXRhLmRpc3BsYXkgJiYgdmFsdWVEYXRhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldE9iamVjdC5wdXNoKHZhbHVlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2V0IFBhdHRlcm4gSW5jb3JyZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXRPYmplY3QgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgsIHZhbHVlU2V0T2JqZWN0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgsIHZhbHVlRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtYXBHZXRWYWx1ZSh2YWx1ZU9iamVjdCwgcm93SW5kZXgpIHtcclxuICAgICAgICB2YXIgbWFwVmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZU9iamVjdCk7XHJcbiAgICAgICAgZm9yIChsZXQgbWFwRmllbGROYW1lIGluIG1hcFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG1hcFZhbHVlW21hcEZpZWxkTmFtZV0pID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YVR5cGVTcGxpdCA9IG1hcFZhbHVlW21hcEZpZWxkTmFtZV0uc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhVHlwZSA9ICh0eXBlb2YgKGRhdGFUeXBlU3BsaXRbMV0pICE9ICd1bmRlZmluZWQnID8gZGF0YVR5cGVTcGxpdFsxXSA6ICcnKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhRmllbGREZXRhaWwgPSBkYXRhVHlwZVNwbGl0WzBdLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGROYW1lID0gZGF0YUZpZWxkRGV0YWlsLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndHlwZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vcm1hbFR5cGUgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbG9yU2VsZWN0JyxcclxuICAgICAgICAgICAgICAgICAgICAndGV4dEJveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHRBcmVhJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGFiZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICdudW1iZXInXTtcclxuICAgICAgICAgICAgICAgIGxldCBkcm9wRG93blR5cGUgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdEJveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JhZGlvJ1xyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGxldCBzZXRWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2F1dG9Db21wbGV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3N3YXBwaW5nQm94JyxcclxuICAgICAgICAgICAgICAgICAgICAnbWFwVmFsdWUnXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbGVWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2ZpbGVVcGxvYWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICdpbWFnZSdcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tCb3hWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NoZWNrQm94J1xyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRlVmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICdkYXRlJ1xyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxUeXBlLmluZGV4T2YodHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHRoaXMuY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCBkYXRhLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZHJvcERvd25UeXBlLmluZGV4T2YodHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldFR5cGUgPSBkYXRhRmllbGREZXRhaWwucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFR5cGUgIT0gJ2Rpc3BsYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdGhpcy5jb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIGRhdGEuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBkYXRhLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWVMaXN0QXR0cmlidXRlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd2YWx1ZUxpc3QnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlTGlzdFJvdyBvZiB2YWx1ZUxpc3RBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVMaXN0Um93LnZhbHVlID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB2YWx1ZUxpc3RSb3cuZGlzcGxheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFR5cGUgIT0gJ2Rpc3BsYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNwbGF5TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlTGlzdEF0dHJpYnV0ZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndmFsdWVMaXN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRhUm93IG9mIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBkYXRhUm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlTGlzdFJvdyBvZiB2YWx1ZUxpc3RBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlTGlzdFJvdy52YWx1ZSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheUxpc3QucHVzaCh2YWx1ZUxpc3RSb3cuZGlzcGxheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkaXNwbGF5TGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0VmFsdWVUeXBlLmluZGV4T2YodHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldFR5cGUgPSBkYXRhRmllbGREZXRhaWwucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldFR5cGUgIT0gJ3ZhbHVlJyAmJiBzZXRUeXBlICE9ICdkaXNwbGF5JyAmJiBzZXRUeXBlICE9ICdhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFR5cGUgPSAndmFsdWUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVNoaWZ0ID0gZGF0YS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VHlwZSAhPSAnYWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHRoaXMuY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCBkYXRhU2hpZnRbc2V0VHlwZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBkYXRhU2hpZnRbJ2Rpc3BsYXknXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YVNoaWZ0Wyd2YWx1ZSddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRhSW5kZXggaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFR5cGUgIT0gJ2FsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXRhW2RhdGFJbmRleF1bc2V0VHlwZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRhdGFbZGF0YUluZGV4XVsnZGlzcGxheSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZGF0YVtkYXRhSW5kZXhdWyd2YWx1ZSddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRhdGFBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVWYWx1ZVR5cGUuaW5kZXhPZih0eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZUFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhW1wic2VsZWN0RmlsZVwiXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlQXJyYXkucHVzaChkYXRhW1wic2VsZWN0RmlsZVwiXVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlQXJyYXkubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHRoaXMuY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCBmaWxlQXJyYXlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZUFycmF5Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGZpbGVBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrQm94VmFsdWVUeXBlLmluZGV4T2YodHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlTGlzdCA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndmFsdWVMaXN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNldFR5cGUgPSBkYXRhRmllbGREZXRhaWwucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGRhdGEpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFR5cGUgIT0gJ3ZhbHVlJyAmJiBzZXRUeXBlICE9ICdkaXNwbGF5JyAmJiBzZXRUeXBlICE9ICdhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZXRUeXBlID09ICdkaXNwbGF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZUxpc3RSb3cgb2YgdmFsdWVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdmFsdWVMaXN0Um93LnZhbHVlXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnB1c2godmFsdWVMaXN0Um93LmRpc3BsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB0aGlzLmNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgcmV0dXJuVmFsdWUuam9pbignJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0VHlwZSA9PSAndmFsdWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlTGlzdFJvdyBvZiB2YWx1ZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVt2YWx1ZUxpc3RSb3cudmFsdWVdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUucHVzaCh2YWx1ZUxpc3RSb3cudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB0aGlzLmNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgcmV0dXJuVmFsdWUuam9pbignJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0VHlwZSA9PSAnYWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZUxpc3RSb3cgb2YgdmFsdWVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdmFsdWVMaXN0Um93LnZhbHVlXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdmFsdWVMaXN0Um93LmRpc3BsYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVMaXN0Um93LnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHZhbHVlTGlzdFJvdy5kaXNwbGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlTGlzdFJvdy52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZVZhbHVlVHlwZS5pbmRleE9mKHR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkYXRhLnNoaWZ0KCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGVMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGRhdGFSb3cgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZUxpc3QucHVzaChkYXRhW2RhdGFSb3ddLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGF0ZUxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YVR5cGUgPT0gJ3N0cmluZycgJiYgIWlzU3RyaW5nKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PSAnaW50JyAmJiAhaXNOdW1iZXIoZGF0YSkpIHtcclxuICAgICAgICAgICAgbGV0IHJldHVybkRhdGEgPSBwYXJzZUludChkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIChpc05hTihyZXR1cm5EYXRhKSA/IDAgOiByZXR1cm5EYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFUeXBlID09ICdmbG9hdCcgJiYgIWlzTnVtYmVyKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5EYXRhID0gcGFyc2VGbG9hdChkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIChpc05hTihyZXR1cm5EYXRhKSA/IDAgOiByZXR1cm5EYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGFUeXBlID09ICdib29sJyAmJiBpc1N0cmluZyhkYXRhKSAmJiAoZGF0YS50b0xvd2VyQ2FzZSgpID09ICd0cnVlJyB8fCBkYXRhLnRvTG93ZXJDYXNlKCkgPT0gJ2ZhbHNlJykpIHtcclxuICAgICAgICAgICAgbGV0IHJldHVybkRhdGEgPSAoZGF0YSA9PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tSZXF1aXJlRmllbGQocm93SW5kZXgpIHtcclxuXHJcbiAgICAgICAgbGV0IHNldFZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgJ2F1dG9Db21wbGV0ZScsXHJcbiAgICAgICAgICAgICdzd2FwcGluZ0JveCcsXHJcbiAgICAgICAgICAgICdtYXBWYWx1ZSdcclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCBmaWxlVmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAnZmlsZVVwbG9hZCcsXHJcbiAgICAgICAgICAgICdpbWFnZSdcclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGxldCByZXF1aXJlU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFJlcXVpcmVBdHRyaWJ1dGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3JlcXVpcmUnKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndHlwZScpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChmaWVsZFJlcXVpcmVBdHRyaWJ1dGUpICE9ICd1bmRlZmluZWQnICYmIGZpZWxkUmVxdWlyZUF0dHJpYnV0ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGREYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShmaWVsZERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlVHlwZS5pbmRleE9mKGZpZWxkVHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZERhdGFSb3cgaW4gZmllbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddW1widmFsdWVcIl0gPT0gbnVsbCB8fCBmaWVsZERhdGFbZmllbGREYXRhUm93XVtcInZhbHVlXCJdID09ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChmaWVsZERhdGFbZmllbGREYXRhUm93XVtcImRpc3BsYXlcIl0gPT0gbnVsbCB8fCBmaWVsZERhdGFbZmllbGREYXRhUm93XVtcImRpc3BsYXlcIl0gPT0gJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGREYXRhUm93IGluIGZpZWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddID09IG51bGwgfHwgZmllbGREYXRhW2ZpZWxkRGF0YVJvd10gPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXRWYWx1ZVR5cGUuaW5kZXhPZihmaWVsZFR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChmaWVsZERhdGFbXCJ2YWx1ZVwiXSA9PSBudWxsIHx8IGZpZWxkRGF0YVtcInZhbHVlXCJdID09ICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGZpZWxkRGF0YVtcImRpc3BsYXlcIl0gPT0gbnVsbCB8fCBmaWVsZERhdGFbXCJkaXNwbGF5XCJdID09ICcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlVmFsdWVUeXBlLmluZGV4T2YoZmllbGRUeXBlKSA+IC0xKSB7O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpZWxkRGF0YVtcInNlbGVjdEZpbGVcIl0ubGVuZ3RoIHx8IGZpZWxkRGF0YVtcInNlbGVjdEZpbGVcIl0ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1aXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkVHlwZSA9PSAnY2hlY2tCb3gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXZlQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRhS2V5IGluIGZpZWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkRGF0YVtkYXRhS2V5XSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZUNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXZlQ2hlY2tlZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkRGF0YSA9PSBudWxsIHx8IGZpZWxkRGF0YSA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVTdGF0dXMgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVxdWlyZVN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1ZhbGlkYXRlRmllbGQocm9sZUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgbGV0IGNoZWNrUGF0dGVyblN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgZmllbGRWYWx1ZVBhdHRlcm4gPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3ZhbHVlUGF0dGVybicpO1xyXG4gICAgICAgICAgICBsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd0eXBlJyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGZpZWxkVmFsdWVQYXR0ZXJuKSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm9sZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGZpZWxkRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRUeXBlID09ICdhdXRvQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkRGF0YVJvdyBpbiBmaWVsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghU3RyaW5nKGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddW1wiZGlzcGxheVwiXSkubWF0Y2goZmllbGRWYWx1ZVBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQYXR0ZXJuU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZERhdGFSb3cgaW4gZmllbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVN0cmluZyhmaWVsZERhdGFbZmllbGREYXRhUm93XSkubWF0Y2goZmllbGRWYWx1ZVBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQYXR0ZXJuU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFR5cGUgPT0gJ2F1dG9Db21wbGV0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFTdHJpbmcoZmllbGREYXRhW1widmFsdWVcIl0pLm1hdGNoKGZpZWxkVmFsdWVQYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQYXR0ZXJuU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVN0cmluZyhmaWVsZERhdGEpLm1hdGNoKGZpZWxkVmFsdWVQYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tQYXR0ZXJuU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tQYXR0ZXJuU3RhdHVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrUGF0dGVyblN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBnZXRGaWVsZExpc3QoKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTGlzdC5wdXNoKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLmZpZWxkTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpZWxkTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGaWVsZExhYmVsKCkge1xyXG4gICAgICAgIGxldCBmaWVsZExhYmVsID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLnR5cGUgIT0gJ2hpZGRlbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZExhYmVsLnB1c2goY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0ubGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmllbGRMYWJlbExpc3QgPSBmaWVsZExhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZyYW1lSGVhZGVyKHJvd0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKSAhPSAndW5kZWZpbmVkJyAmJiBBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSkgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lLmxlbmd0aCA9PSB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lW3Jvd0luZGV4XTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSkgIT0gJ3VuZGVmaW5lZCcgJiYgIUFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICsgKHBhcnNlSW50KHJvd0luZGV4KSArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnRm9ybSAnICsgKHBhcnNlSW50KHJvd0luZGV4KSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRGb3JtUm93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uQWRkUHJvY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wQWRkRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9uRGVsZXRlUHJvY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZW1wRGVsZXRlRGF0YS5sZW5ndGhcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJvd051bShyb3dOdW0pIHtcclxuICAgICAgICBsZXQgY3VycmVudFJvd051bSA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgIGlmIChjdXJyZW50Um93TnVtIDwgcm93TnVtKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50Um93TnVtIDwgcm93TnVtKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldERlZmF1bHQoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLnB1c2goZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3dOdW0gPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50Um93TnVtID4gcm93TnVtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvd051bSA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMucmVSZW5kZXJGb3JtKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub25Gb3JtUmVhZHkocm93TnVtKTtcclxuICAgIH1cclxuICAgIGFkZFJvdyhyb3dJbmRleCA9IG51bGwsIHNvdXJjZUFjdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICBsZXQgX3Jvd0luZGV4ID0gcm93SW5kZXg7XHJcbiAgICAgICAgaWYgKHJvd0luZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgX3Jvd0luZGV4ID0gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGhcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRlZmF1bHRWYWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0RGVmYXVsdCgpKTtcclxuICAgICAgICBpZiAoIXRoaXMub25BZGRQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcEFkZERhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhXHJcbiAgICAgICAgICAgIHRoaXMub25BZGRQcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldE9uUmVSZW5kZXIodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVtcEFkZERhdGEuc3BsaWNlKF9yb3dJbmRleCwgMCwgZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICBsZXQgdGVtcERhdGEgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBkYXRhUm93SW5kZXggaW4gdGhpcy50ZW1wQWRkRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVJvd0luZGV4IDwgX3Jvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRGF0YVtkYXRhUm93SW5kZXhdID0gdGhpcy50ZW1wQWRkRGF0YVtkYXRhUm93SW5kZXhdXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YVJvd0luZGV4ID49IF9yb3dJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcERhdGFbZGF0YVJvd0luZGV4ICsgcm93Q291bnRdID0gdGhpcy50ZW1wQWRkRGF0YVtkYXRhUm93SW5kZXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSA9IHRlbXBEYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLmFkZERhdGFUaW1lciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGF0YVRpbWVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkRGF0YVRpbWVyID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy50ZW1wQWRkRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMub25BZGRQcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRPblJlUmVuZGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUZyYW1lSGVhZGVyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnYWRkUm93JyxcclxuICAgICAgICAgICAgc291cmNlQWN0aW9uOiBzb3VyY2VBY3Rpb24sXHJcbiAgICAgICAgICAgIHJvd0luZGV4OiBfcm93SW5kZXhcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGRlbGV0ZVJvd1Rlc3Qocm93SW5kZXgsIHNvdXJjZUFjdGlvbiA9IG51bGwpIHtcclxuICAgIC8vICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgLy8gICAgIGlmIChpc0FycmF5KHJvd0luZGV4KSkge1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCByb3dJbmRleE51bSBvZiByb3dJbmRleCkge1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhOdW1dID09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmIChjaGVjaykge1xyXG4gICAgLy8gICAgICAgICBpZiAoaXNBcnJheShyb3dJbmRleCkpIHtcclxuICAgIC8vICAgICAgICAgICAgIHJvd0luZGV4LnNvcnQoKTtcclxuICAgIC8vICAgICAgICAgICAgIHJvd0luZGV4LnJldmVyc2UoKTtcclxuICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IHJvd0luZGV4TnVtIG9mIHJvd0luZGV4KSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5zcGxpY2Uocm93SW5kZXhOdW0sIDEpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5zcGxpY2Uocm93SW5kZXgsIDEpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgZGVsZXRlUm93KHJvd0luZGV4LCBzb3VyY2VBY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNBcnJheShyb3dJbmRleCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXhOdW0gb2Ygcm93SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4TnVtXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgbGV0IHJvd0NvdW50ID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wUm93TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdGVtcEVuYWJsZVJvdyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdGVtcERpc2FibGVEZWxldGUgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEaXNhYmxlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdGVtcERlbGV0ZURhdGE7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRW5hYmxlUm93RGF0YTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEaXNhYmxlRGVsZXRlRGF0YTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEaXNhYmxlTGlzdERhdGE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFSb3dJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUm93TGlzdFtwYXJzZUludChkYXRhUm93SW5kZXgpICsgcGFyc2VJbnQocm93Q291bnQpXSA9IHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbZGF0YVJvd0luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRW5hYmxlUm93W3BhcnNlSW50KGRhdGFSb3dJbmRleCkgKyBwYXJzZUludChyb3dDb3VudCldID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXhbZGF0YVJvd0luZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVEZWxldGVbcGFyc2VJbnQoZGF0YVJvd0luZGV4KSArIHBhcnNlSW50KHJvd0NvdW50KV0gPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlW2RhdGFSb3dJbmRleF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZUxpc3RbcGFyc2VJbnQoZGF0YVJvd0luZGV4KSArIHBhcnNlSW50KHJvd0NvdW50KV0gPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtkYXRhUm93SW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLm9uRGVsZXRlUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGVtcERlbGV0ZURhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRW5hYmxlUm93RGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlRGVsZXRlRGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlTGlzdERhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGVsZXRlUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0T25SZVJlbmRlcih0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNBcnJheShyb3dJbmRleCkpIHtcclxuICAgICAgICAgICAgICAgIHJvd0luZGV4LnNvcnQoKTtcclxuICAgICAgICAgICAgICAgIHJvd0luZGV4LnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHJvd0luZGV4TnVtIG9mIHJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERlbGV0ZURhdGEuc3BsaWNlKHJvd0luZGV4TnVtLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFbmFibGVSb3dEYXRhLnNwbGljZShyb3dJbmRleE51bSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZURlbGV0ZURhdGEuc3BsaWNlKHJvd0luZGV4TnVtLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZUxpc3REYXRhLnNwbGljZShyb3dJbmRleE51bSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGVtcERlbGV0ZURhdGEuc3BsaWNlKHJvd0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRW5hYmxlUm93RGF0YS5zcGxpY2Uocm93SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVEZWxldGVEYXRhLnNwbGljZShyb3dJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVMaXN0RGF0YS5zcGxpY2Uocm93SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEgPSB0ZW1wUm93TGlzdDtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggPSB0ZW1wRW5hYmxlUm93O1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlID0gdGVtcERpc2FibGVEZWxldGU7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ID0gdGVtcERpc2FibGVMaXN0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVsZXRlRGF0YVRpbWVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlRGF0YVRpbWVyID0gbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRGF0YVRpbWVyID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRlbXBEZWxldGVEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ID0gT2JqZWN0LmFzc2lnbihbXSwgdGVtcEVuYWJsZVJvd0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSA9IE9iamVjdC5hc3NpZ24oW10sIHRlbXBEaXNhYmxlRGVsZXRlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCA9IE9iamVjdC5hc3NpZ24oW10sIHRlbXBEaXNhYmxlTGlzdERhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZVByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRPblJlUmVuZGVyKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGcmFtZUhlYWRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUZyYW1lSGVhZGVyKCk7XHJcbiAgICAgICAgLy8gdGhpcy5yZVJlbmRlckZvcm0oKTtcclxuICAgICAgICAvLyBPYnNlcnZhYmxlLnRpbWVyKDQwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAvLyAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAvLyAgICAgICAgIGxldCB0ZW1wRGF0YSA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRGF0YSk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSx0aGlzLmRlZmF1bHREYXRhW2ZpZWxkTmFtZV0pO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sdGVtcERhdGEpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgYWN0aW9uOiAnZGVsZXRlUm93JyxcclxuICAgICAgICAgICAgc291cmNlQWN0aW9uOiBzb3VyY2VBY3Rpb24sXHJcbiAgICAgICAgICAgIHJvd0luZGV4OiByb3dJbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxCYWNrRnJhbWUoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuYWN0aW9uID09ICdkZWxldGVSb3cnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlUm93KGV2ZW50LnJvd0luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlUm93KHJvd0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleFtyb3dJbmRleF0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVSb3cocm93SW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4W3Jvd0luZGV4XSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVGaWVsZChyb3dJbmRleCwgZmllbGROYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3Rbcm93SW5kZXhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtyb3dJbmRleF0gPSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtyb3dJbmRleF1bZmllbGROYW1lXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlRmllbGQocm93SW5kZXgsIGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W3Jvd0luZGV4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3Rbcm93SW5kZXhdID0ge31cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3Rbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVEZWxldGVSb3cocm93SW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlW3Jvd0luZGV4XSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVEZWxldGVSb3cocm93SW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlW3Jvd0luZGV4XSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVGaWx0ZXIocm93SW5kZXgpIHtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3R5cGUnKTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVHlwZSA9PSAnYXV0b0NvbXBsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlUm93IGluIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkeW5hbWljSW5wdXQ6IGFueSA9IHRoaXMuZ2V0RHluYW1pY0lucHV0KGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkeW5hbWljSW5wdXQuaW5zdGFudElucHV0LmZpbHRlckF1dG9Db21wbGV0ZSh2YWx1ZVJvdywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVGaWx0ZXJGaWVsZChmaWVsZE5hbWUsIHJvd0luZGV4LCBkYXRhSW5kZXgpIHtcclxuICAgICAgICBsZXQgZHluYW1pY0lucHV0OiBhbnkgPSB0aGlzLmdldER5bmFtaWNJbnB1dChmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICBkeW5hbWljSW5wdXQuaW5zdGFudElucHV0LmZpbHRlckF1dG9Db21wbGV0ZShkYXRhSW5kZXgsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRm9ybVJlYWR5KHJvd051bSwgZGF0YSA9IG51bGwsIHRpbWVvdXQgPSAxNTAwMCwgZGVidWcgPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0TWlsbGlzZWNvbmRzID09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGVTdGFydCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRNaWxsaXNlY29uZHMgPSBkYXRlU3RhcnQuZ2V0VGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVhZHlTdGF0dXMgPSBudWxsO1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IG5ldyBPYnNlcnZhYmxlKChvYnNlcnZhYmxlKSA9PiB7XHJcbiAgICAgICAgICAgIGludGVydmFsKDIwMCkucGlwZSh0YWtlV2hpbGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWR5U3RhdHVzICE9IHRydWUgJiYgdGhpcy5zdGFydE1pbGxpc2Vjb25kcyAhPSBudWxsXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlQ3VycmVudCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TWlsbGlzZWNvbmRzID0gZGF0ZUN1cnJlbnQuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZlRpbWUgPSBjdXJyZW50TWlsbGlzZWNvbmRzIC0gdGhpcy5zdGFydE1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVja0ZpZWxkID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCByb3dOdW07IHJvd0luZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHluYW1pY0lucHV0ID0gdGhpcy5nZXREeW5hbWljSW5wdXQoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tGaWVsZC5wdXNoKGR5bmFtaWNJbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjaGVja0ZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tGaWVsZC5pbmRleE9mKG51bGwpID4gLTEgfHwgY2hlY2tGaWVsZC5pbmRleE9mKHVuZGVmaW5lZCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZHlTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhZHlTdGF0dXMgPT0gdHJ1ZSB8fCBkaWZmVGltZSA+IHRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNaWxsaXNlY29uZHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWR5U3RhdHVzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLm5leHQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdyZWFkeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAndGltZW91dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZmluZUNvbnRhaW5lclRhYmxlTW9kZSgpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29udGFpbmVyIG9mIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGRDcmVhdGlvbiBvZiBjb250YWluZXIuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRMaXN0LnB1c2goZmllbGRDcmVhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZpbmVkQ29udGFpbmVyVGFibGVNb2RlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucmVmaW5lZENvbnRhaW5lclRhYmxlTW9kZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTGlzdDogZmllbGRMaXN0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkdXBsaWNhdGVEYXRhUm93KHNvdXJjZVJvdywgZGVzdGluYXRpb25Sb3csIGFjdGlvbk9uRnJvbVJlYWR5ID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3NvdXJjZVJvd10gIT0gdW5kZWZpbmVkICYmIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbZGVzdGluYXRpb25Sb3ddICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmR1cGxpY2F0ZVJvd1Byb2Nlc3Moc291cmNlUm93LCBkZXN0aW5hdGlvblJvdyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb25PbkZyb21SZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmR1cGxpY2F0ZVF1ZXVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgc291cmNlUm93OiBzb3VyY2VSb3csXHJcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblJvdzogZGVzdGluYXRpb25Sb3dcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5vbkZvcm1SZWFkeShkZXN0aW5hdGlvblJvdyArIDEpLnN1YnNjcmliZSgocmVhZHlTdGF0dXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5U3RhdHVzLnN0YXR1cyA9PSAncmVhZHknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZHVwbGljYXRlUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHVwbGljYXRlRGF0YSA9IHRoaXMuZHVwbGljYXRlUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVSb3dQcm9jZXNzKGR1cGxpY2F0ZURhdGEuc291cmNlUm93LCBkdXBsaWNhdGVEYXRhLmRlc3RpbmF0aW9uUm93KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0R5bmFtaWMgZm9ybSByb3cgbnVtYmVyICcgKyBkZXN0aW5hdGlvblJvdyArICcgZGlkblxcJ3QgY3JlYXRlLiBDYW5cXCd0IGR1cGxpY2F0ZSBkYXRhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRGF0YSBpbmRleCBpbmNvcnJlY3QuIENhblxcJ3QgZHVwbGljYXRlIGRhdGEuJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHVwbGljYXRlVG9OZXdSb3coc291cmNlUm93ID0gMCwgc291cmNlQWN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGxldCBkYXRhTmV3Um93ID0ge307XHJcbiAgICAgICAgbGV0IGhhdmVEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbc291cmNlUm93XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGF0YU5ld1JvdyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbc291cmNlUm93XSk7XHJcbiAgICAgICAgICAgIGhhdmVEYXRhID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBkYXRhTmV3Um93ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVswXSk7XHJcbiAgICAgICAgICAgIGhhdmVEYXRhID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkdXBsaWNhdGUgbmV3IHJvdyBmYWlsIG5vdCBmb3VuZCBhbnkgZGF0YScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoYXZlRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFZhbHVlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXREZWZhdWx0KCkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgaW4gZGVmYXVsdFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YU5ld1Jvd1tmaWVsZE5hbWVdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oW10sIGRhdGFOZXdSb3dbZmllbGROYW1lXSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZVJvdyBvZiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QodmFsdWVSb3cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS5wdXNoKE9iamVjdC5hc3NpZ24oe30sIHZhbHVlUm93KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnB1c2godmFsdWVSb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZVtmaWVsZE5hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5wdXNoKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2R1cGxpY2F0ZVRvTmV3Um93JyxcclxuICAgICAgICAgICAgc291cmNlQWN0aW9uOiBzb3VyY2VBY3Rpb24sXHJcbiAgICAgICAgICAgIHNvdXJjZUluZGV4OiBzb3VyY2VSb3dcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkdXBsaWNhdGVSb3dQcm9jZXNzKHNvdXJjZVJvdywgZGVzdGluYXRpb25Sb3cpIHtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBsZXQgb2JqR2V0ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBvYmpHZXRbZmllbGROYW1lXSA9IGZpZWxkTmFtZSArICcuYWxsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNvdXJjZURhdGEgPSB0aGlzLm1hcEdldFZhbHVlKG9iakdldCwgc291cmNlUm93KTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgaW4gc291cmNlRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndHlwZScpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAnY2hlY2tCb3gnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB7fTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlRGF0YSBvZiBzb3VyY2VEYXRhW2ZpZWxkTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVt2YWx1ZURhdGEudmFsdWVdID0gdmFsdWVEYXRhLmNoZWNrZWRcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VEYXRhW2ZpZWxkTmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hcFNldFZhbHVlKHNvdXJjZURhdGEsIGRlc3RpbmF0aW9uUm93KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0R1cGxpY2F0ZShmaWVsZEFycmF5LCByZWdFeCA9IC8oLiopLywgcmVnRXhJbmRleCA9IDApIHtcclxuICAgICAgICBsZXQgdGVtcERhdGFDaGVjayA9IFtdO1xyXG4gICAgICAgIGxldCBtYXBHZXQgPSB7fTtcclxuICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTGlzdCBvZiBmaWVsZEFycmF5KSB7XHJcbiAgICAgICAgICAgIG1hcEdldFtmaWVsZExpc3RdID0gZmllbGRMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZm9ybVJvdyA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybVJvdzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5tYXBHZXRWYWx1ZShtYXBHZXQsIGkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhS2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWdUZXN0ID0gbmV3IFJlZ0V4cChyZWdFeCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2ggPSByZWdUZXN0LmV4ZWMoZGF0YVtkYXRhS2V5XSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZW1wRGF0YUNoZWNrLmluZGV4T2YobWF0Y2hbcmVnRXhJbmRleF0pID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERhdGFDaGVjay5wdXNoKG1hdGNoW3JlZ0V4SW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2hlY2sgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGVjaztcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1JlcXVpcmVBbGwoKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBsZXQgZm9ybVJvdyA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybVJvdzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1JlcXVpcmVGaWVsZChpKSkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGVjaztcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1ZhbGlkYXRlQWxsKCkge1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgbGV0IGZvcm1Sb3cgPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1Sb3c7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tWYWxpZGF0ZUZpZWxkKGkpKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGUobW9kZSkge1xyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLm1vZGUgPSBtb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUFkZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uYWRkUm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5hZGRSb3cgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5hZGRSb3cgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVBZGQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmFkZFJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uYWRkUm93ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmFkZFJvdyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZURlbGV0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGVsZXRlUm93ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kZWxldGVSb3cgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kZWxldGVSb3cgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVEZWxldGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRlbGV0ZVJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGVsZXRlUm93ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGVsZXRlUm93ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RGVmYXVsdChyb3dJbmRleCA9IDApIHtcclxuICAgICAgICBpZih0aGlzLmZvcm1DcmVhdGlvbi5kYXRhWzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgaW4gdGhpcy5kZWZhdWx0RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhVmFsdWUoZmllbGROYW1lLDAsIHRoaXMuZGVmYXVsdERhdGFbZmllbGROYW1lXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldFNhdmVQb2ludChzYXZlUG9pbnROYW1lID0gXCJkZWZhdWx0XCIpIHtcclxuICAgICAgICBsZXQgc2F2ZVBvaW50RGF0YSA9IFtdO1xyXG4gICAgICAgIGxldCByb3dOdW0gPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBsZXQgbWFwR2V0OmFueSA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgbWFwR2V0W2ZpZWxkTmFtZV0gPSBmaWVsZE5hbWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dOdW07aSArKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubWFwR2V0VmFsdWUobWFwR2V0LGkpO1xyXG4gICAgICAgICAgICBzYXZlUG9pbnREYXRhLnB1c2goZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlUG9pbnRbc2F2ZVBvaW50TmFtZV0gPSBzYXZlUG9pbnREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRTYXZlUG9pbnQoc2F2ZVBvaW50TmFtZSA9IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2F2ZVBvaW50W3NhdmVQb2ludE5hbWVdKSB7XHJcbiAgICAgICAgICAgIGxldCBzYXZlUG9pbnREYXRhID0gdGhpcy5zYXZlUG9pbnRbc2F2ZVBvaW50TmFtZV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IHNhdmVQb2ludEluZGV4IGluIHNhdmVQb2ludERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwU2V0VmFsdWUoc2F2ZVBvaW50RGF0YVtzYXZlUG9pbnRJbmRleF0sIHNhdmVQb2ludEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0UGFyYW0ocm93SW5kZXggPSAwKSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge31cclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIHBhcmFtW2ZpZWxkTmFtZV0gPSBmaWVsZE5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtID0gdGhpcy5tYXBHZXRWYWx1ZShwYXJhbSwgcm93SW5kZXgpXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==