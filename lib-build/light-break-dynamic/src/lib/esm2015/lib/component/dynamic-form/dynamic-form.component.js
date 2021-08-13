import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
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
import { isArray, isNumber, isObject, isString } from '@angular-package/type';
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
export class DynamicFormComponent {
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
}
DynamicFormComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
DynamicFormComponent.ctorParameters = () => [
    { type: AnimationService }
];
DynamicFormComponent.propDecorators = {
    formRow: [{ type: ViewChildren, args: [DynamicFormRowComponent,] }],
    formTableRow: [{ type: ViewChildren, args: [DynamicContainerTableComponent,] }],
    formCreation: [{ type: Input }],
    model: [{ type: Input }],
    actionDataIndex: [{ type: Input }],
    defaultData: [{ type: Input }],
    showForm: [{ type: Input }],
    option: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1mb3JtL2R5bmFtaWMtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFvQixNQUFNLEVBQWEsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUM1RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUNwRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDekUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDdkYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDMUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFD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Qyw4QkFBOEI7MkJBQzNDLEtBQUs7b0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO3VCQUNMLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ01vZHVsZSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtMYWJlbENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1RleHRCb3hDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvdGV4dGJveC90ZXh0Ym94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7VGV4dEFyZWFDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvdGV4dC1hcmVhL3RleHQtYXJlYS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NoZWNrQm94Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2NoZWNrLWJveC9jaGVjay1ib3guY29tcG9uZW50JztcclxuaW1wb3J0IHtTZWxlY3RCb3hDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvc2VsZWN0LWJveC9zZWxlY3QtYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SGlkZGVuQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2hpZGRlbi9oaWRkZW4uY29tcG9uZW50JztcclxuaW1wb3J0IHtGaWxlVXBsb2FkQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SW1hZ2VDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtBdXRvQ29tcGxldGVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QnV0dG9uQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHtpc0FycmF5LCBpc051bWJlciwgaXNPYmplY3QsIGlzU3RyaW5nfSBmcm9tICdAYW5ndWxhci1wYWNrYWdlL3R5cGUnO1xyXG5pbXBvcnQge1N3YXBwaW5nQm94Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L3N3YXBwaW5nLWJveC9zd2FwcGluZy1ib3guY29tcG9uZW50JztcclxuaW1wb3J0IHtNYXBWYWx1ZUNvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9tYXAtdmFsdWUvbWFwLXZhbHVlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7UmFkaW9Db21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvcmFkaW8vcmFkaW8uY29tcG9uZW50JztcclxuaW1wb3J0IHtEYXRlQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2RhdGUvZGF0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0R5bmFtaWNGb3JtUm93Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWZvcm0tcm93L2R5bmFtaWMtZm9ybS1yb3cuY29tcG9uZW50JztcclxuaW1wb3J0IHtEeW5hbWljQ29udGFpbmVyVGFibGVDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtY29udGFpbmVyLXRhYmxlL2R5bmFtaWMtY29udGFpbmVyLXRhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgdGltZXIsIGludGVydmFsfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtCdXR0b25JY29uQ29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2J1dHRvbi1pY29uL2J1dHRvbi1pY29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7dGFrZVdoaWxlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7Q29sb3JTZWxlY3RDb21wb25lbnR9IGZyb20gJy4uL2R5bmFtaWMtaW5wdXQvY29sb3Itc2VsZWN0L2NvbG9yLXNlbGVjdC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xiOS1keW5hbWljLWZvcm0nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBMYWJlbENvbXBvbmVudCxcclxuICAgICAgICBUZXh0Qm94Q29tcG9uZW50LFxyXG4gICAgICAgIFRleHRBcmVhQ29tcG9uZW50LFxyXG4gICAgICAgIENoZWNrQm94Q29tcG9uZW50LFxyXG4gICAgICAgIENvbG9yU2VsZWN0Q29tcG9uZW50LFxyXG4gICAgICAgIFNlbGVjdEJveENvbXBvbmVudCxcclxuICAgICAgICBIaWRkZW5Db21wb25lbnQsXHJcbiAgICAgICAgRmlsZVVwbG9hZENvbXBvbmVudCxcclxuICAgICAgICBJbWFnZUNvbXBvbmVudCxcclxuICAgICAgICBBdXRvQ29tcGxldGVDb21wb25lbnQsXHJcbiAgICAgICAgQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIEJ1dHRvbkljb25Db21wb25lbnQsXHJcbiAgICAgICAgU3dhcHBpbmdCb3hDb21wb25lbnQsXHJcbiAgICAgICAgTWFwVmFsdWVDb21wb25lbnQsXHJcbiAgICAgICAgUmFkaW9Db21wb25lbnQsXHJcbiAgICAgICAgRGF0ZUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW0FuaW1hdGlvblNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBAVmlld0NoaWxkcmVuKER5bmFtaWNGb3JtUm93Q29tcG9uZW50KSBmb3JtUm93OiBRdWVyeUxpc3Q8RHluYW1pY0Zvcm1Sb3dDb21wb25lbnQ+O1xyXG4gICAgQFZpZXdDaGlsZHJlbihEeW5hbWljQ29udGFpbmVyVGFibGVDb21wb25lbnQpIGZvcm1UYWJsZVJvdzogUXVlcnlMaXN0PER5bmFtaWNDb250YWluZXJUYWJsZUNvbXBvbmVudD47XHJcbiAgICBASW5wdXQoKSBmb3JtQ3JlYXRpb247XHJcbiAgICBASW5wdXQoKSBtb2RlbDtcclxuICAgIEBJbnB1dCgpIGFjdGlvbkRhdGFJbmRleCA9IDA7XHJcbiAgICBASW5wdXQoKSBkZWZhdWx0RGF0YTphbnkgPSB7fTtcclxuICAgIEBJbnB1dCgpIHNob3dGb3JtID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBvcHRpb24gPSB7fTtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgZnJhbWVIZWFkZXIgPSBbXTtcclxuICAgIG9iaktleSA9IE9iamVjdC5rZXlzO1xyXG4gICAgZmllbGRMYWJlbExpc3QgPSBbXTtcclxuICAgIF9yZVJlbmRlckZpZWxkTGlzdCA9IFtdO1xyXG4gICAgcmVmaW5lZENvbnRhaW5lclRhYmxlTW9kZSA9IFtdO1xyXG4gICAgdGVtcERlbGV0ZURhdGEgPSBbXTtcclxuICAgIG9uRGVsZXRlUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgZGVsZXRlRGF0YVRpbWVyOiBhbnk7XHJcbiAgICB0ZW1wQWRkRGF0YSA9IFtdO1xyXG4gICAgb25BZGRQcm9jZXNzID0gZmFsc2U7XHJcbiAgICBhZGREYXRhVGltZXI6IGFueTtcclxuICAgIHNldERhdGFRdWV1ZSA9IFtdO1xyXG4gICAgZHVwbGljYXRlUXVldWUgPSBbXTtcclxuICAgIHNhdmVQb2ludDphbnkgPSB7fTtcclxuICAgIHByaXZhdGUgc3RhcnRNaWxsaXNlY29uZHM6IG51bWJlciA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmltYXRpb25TZXJ2aWNlOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnZlcmlmeUZpZWxkKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJmb3JtPj5cIix0aGlzLmZvcm1DcmVhdGlvbik7XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24gPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9uLCB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbik7XHJcbiAgICAgICAgdGhpcy5nZXREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5jb21wYXJlTW9kZWwoKTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlRnJhbWVIZWFkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRGaWVsZExhYmVsKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc3BsYXlNb2RlID09ICd0YWJsZScpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZpbmVDb250YWluZXJUYWJsZU1vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldEVuYWJsZUFuaW1hdGlvbih0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVBbmltYXRpb24pXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbXBhcmVNb2RlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0ubW9kZWxOYW1lICYmIHRoaXMubW9kZWxbY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0ubW9kZWxOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9kZWxEYXRhID0gdGhpcy5tb2RlbFtjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5tb2RlbE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBhdHRyaWJ1dGUgaW4gbW9kZWxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF1bYXR0cmlidXRlXSA9PSB1bmRlZmluZWQgfHwgY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF1bYXR0cmlidXRlXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF1bYXR0cmlidXRlXSA9IG1vZGVsRGF0YVthdHRyaWJ1dGVdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZlcmlmeUZpZWxkKCkge1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhSW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbZGF0YUluZGV4XVtmaWVsZE5hbWVdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRHluYW1pYyBmb3JtIGVycm9yIGZpZWxkIGRhdGEgbm90IGV4aXN0czogXFwnJyArIGZpZWxkTmFtZSArICdcXCcgZGF0YSByb3c6ICcgKyBkYXRhSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGVjayA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUZyYW1lSGVhZGVyKCkge1xyXG4gICAgICAgIHRoaXMuZnJhbWVIZWFkZXIgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICE9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAmJiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgIT0gJydcclxuICAgICAgICAgICAgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpXHJcbiAgICAgICAgICAgICYmIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZS5sZW5ndGggPT0gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUhlYWRlciA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSAhPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICE9ICcnXHJcbiAgICAgICAgICAgICYmICFBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSlcclxuICAgICAgICAgICAgJiYgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lSGVhZGVyWzBdID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lICE9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAmJiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgIT0gJydcclxuICAgICAgICAgICAgJiYgIUFycmF5LmlzQXJyYXkodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZnJhbWVOYW1lKVxyXG4gICAgICAgICAgICAmJiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YUtleSBpbiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZUhlYWRlcltkYXRhS2V5XSA9IFN0cmluZyh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpICsgU3RyaW5nKGNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUgKyAocGFyc2VJbnQocm93SW5kZXgpKzEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFLZXkgaW4gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVIZWFkZXJbZGF0YUtleV0gPSAnRm9ybSAnICsgU3RyaW5nKGNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3JldHVybiBcIkZvcm0gXCIgKyhwYXJzZUludChyb3dJbmRleCkrMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NDYWxsQmFjayhldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5hY3Rpb24gPT0gJ2RlbGV0ZVJvdycpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVSb3coZXZlbnQucm93SW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpbWVyKDEwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzUGFuZWxDYWxsQmFjayhldmVudCkge1xyXG4gICAgICAgIHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWZhdWx0KCkge1xyXG4gICAgICAgIGxldCBzZXRWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICdhdXRvQ29tcGxldGUnLFxyXG4gICAgICAgICAgICAnc3dhcHBpbmdCb3gnLFxyXG4gICAgICAgICAgICAnbWFwVmFsdWUnXHJcbiAgICAgICAgXTtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRhaW5lciBvZiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkQ3JlYXRpb24gb2YgY29udGFpbmVyLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZENyZWF0aW9uLnR5cGUgIT0gJ2NoZWNrQm94Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChmaWVsZENyZWF0aW9uLmRlZmF1bHQpICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWVsZENyZWF0aW9uLmRlZmF1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlVHlwZS5pbmRleE9mKGZpZWxkQ3JlYXRpb24udHlwZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCBmaWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U2V0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hlY2tWYWx1ZSBvZiBmaWVsZENyZWF0aW9uLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tWYWx1ZS5kaXNwbGF5IHx8ICFjaGVja1ZhbHVlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFNldC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogY2hlY2tWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNoZWNrVmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0U2V0LnB1c2goY2hlY2tWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCBkZWZhdWx0U2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAoZmllbGRDcmVhdGlvbi5kZWZhdWx0KSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRWYWx1ZVR5cGUuaW5kZXhPZihmaWVsZENyZWF0aW9uLnR5cGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdERhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgW2ZpZWxkQ3JlYXRpb24uZGVmYXVsdF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmllbGRDcmVhdGlvbi5kZWZhdWx0LmRpc3BsYXkgfHwgIWZpZWxkQ3JlYXRpb24uZGVmYXVsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZpZWxkQ3JlYXRpb24uZGVmYXVsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZmllbGRDcmVhdGlvbi5kZWZhdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIFtmaWVsZENyZWF0aW9uLmRlZmF1bHRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRWYWx1ZVR5cGUuaW5kZXhPZihmaWVsZENyZWF0aW9uLnR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLFsnJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoZmllbGRDcmVhdGlvbi5kZWZhdWx0KSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0RGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKHt9LCBmaWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRWYWwgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHZhbHVlTGlzdERhdGEgb2YgZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsW3ZhbHVlTGlzdERhdGEudmFsdWVdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRWYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHJlUmVuZGVyRm9ybSgpIHtcclxuICAgICAgICB0aGlzLmdldERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLmNvbXBhcmVNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMucmVmaW5lQ29udGFpbmVyVGFibGVNb2RlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUZyYW1lSGVhZGVyKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldEZpZWxkTGFiZWwoKTtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzcGxheU1vZGUgPT0gJ3RhYmxlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZmluZUNvbnRhaW5lclRhYmxlTW9kZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRPblJlUmVuZGVyKHRydWUpO1xyXG4gICAgICAgIGludGVydmFsKDEwMCkucGlwZSh0YWtlV2hpbGUoKCkgPT4gIXRoaXMuc2hvd0Zvcm0pKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldE9uUmVSZW5kZXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5mb3JtQ3JlYXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZVJlbmRlckZpZWxkKGZpZWxkQXJyYXksIHJvd0luZGV4ID0gMCkge1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShmaWVsZEFycmF5KSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCA9IE9iamVjdC5hc3NpZ24odGhpcy5fcmVSZW5kZXJGaWVsZExpc3QsIFtmaWVsZEFycmF5XSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVSZW5kZXJGaWVsZExpc3QgPSBPYmplY3QuYXNzaWduKHRoaXMuX3JlUmVuZGVyRmllbGRMaXN0LCBmaWVsZEFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW50ZXJ2YWwoMTAwKS5waXBlKHRha2VXaGlsZSgoKSA9PiB0aGlzLl9yZVJlbmRlckZpZWxkTGlzdCAhPSBudWxsKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNoZWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrRmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgdGhpcy5fcmVSZW5kZXJGaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2V0RmllbGRFbGVtZW50ID0gdGhpcy5nZXREeW5hbWljSW5wdXQoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldEZpZWxkRWxlbWVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU3RpbGwgRm91bmQ6IFwiK2ZpZWxkTmFtZSxnZXRGaWVsZEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0ZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVSZW5kZXJGaWVsZExpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZm9ybUNyZWF0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5maWVsZE5hbWUgPT0gZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XS5maWVsZExpc3RbZmllbGRJbmRleF1bYXR0cmlidXRlTmFtZV0gPSBhdHRyaWJ1dGVWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldENvbnRhaW5lckF0dHJpYnV0ZShjb250YWluZXJOYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSkge1xyXG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmNvbnRhaW5lck5hbWUgPT0gY29udGFpbmVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XVthdHRyaWJ1dGVOYW1lXSA9IGF0dHJpYnV0ZVZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCBhdHRyaWJ1dGVOYW1lKSB7XHJcbiAgICAgICAgZm9yIChsZXQgY29udGFpbmVySW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGRJbmRleCBpbiBjb250YWluZXJEYXRhLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLmZpZWxkTmFtZSA9PSBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XS5maWVsZExpc3RbZmllbGRJbmRleF1bYXR0cmlidXRlTmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgsIHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGFQcm9jZXNzKGZpZWxkTmFtZSwgcm93SW5kZXgsIHZhbHVlLCBtdWx0aSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhUXVldWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWU6IGZpZWxkTmFtZSxcclxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiByb3dJbmRleCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIG11bHRpOiBtdWx0aVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5vbkZvcm1SZWFkeShyb3dJbmRleCArIDEpLnN1YnNjcmliZSgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT0gJ3JlYWR5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLnNldERhdGFRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXREYXRhU2V0ID0gdGhpcy5zZXREYXRhUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhUHJvY2VzcyhzZXREYXRhU2V0LmZpZWxkTmFtZSwgc2V0RGF0YVNldC5yb3dJbmRleCwgc2V0RGF0YVNldC52YWx1ZSwgc2V0RGF0YVNldC5tdWx0aSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEeW5hbWljIGZvcm0gcm93IG51bWJlciAnICsgcm93SW5kZXggKyAnIGRpZG5cXCd0IGNyZWF0ZS4gQ2FuXFwndCBzZXQgZGF0YS4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhUHJvY2VzcyhmaWVsZE5hbWUsIHJvd0luZGV4LCB2YWx1ZSwgbXVsdGkgPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkVHlwZShmaWVsZE5hbWUpO1xyXG4gICAgICAgIGlmIChtdWx0aSA9PSBmYWxzZSAmJiBmaWVsZFR5cGUgIT0gJ2NoZWNrQm94JyAmJiBmaWVsZFR5cGUgIT0gJ2ZpbGVVcGxvYWQnICYmIGZpZWxkVHlwZSAhPSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCBbdmFsdWVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmllbGRUeXBlKGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5maWVsZE5hbWUgPT0gZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF0uZmllbGRMaXN0W2ZpZWxkSW5kZXhdLnR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgsIGRhdGFJbmRleCA9IG51bGwpIHtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbikgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0pID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1JvdyBpbmRleCBub3QgZXhpdHMuJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdGaWVsZCBuYW1lIG5vdCBleGl0czogJyArIGZpZWxkTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YUluZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhVHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgPSBbXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGUgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBkYXRhQ2xvbmUgPSBPYmplY3QuYXNzaWduKGRhdGFUeXBlLCB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhQ2xvbmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXVtkYXRhSW5kZXhdKSA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnRGF0ZSBpbmRleCBub3QgZXhpdHMgaW4gZmllbGQgJyArIGZpZWxkTmFtZSArICc6ICcgKyBkYXRhSW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhQ2xvbmUgPSBPYmplY3QuYXNzaWduKGRhdGFUeXBlLCB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtmaWVsZE5hbWVdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUNsb25lW2RhdGFJbmRleF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RHluYW1pY0lucHV0KGZpZWxkTmFtZSwgcm93SW5kZXggPSAwKSB7XHJcbiAgICAgICAgbGV0IGZvcm1Sb3dSZWYgPSBudWxsXHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckxpc3RSZWYgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNwbGF5TW9kZSA9PSAndGFibGUnKSB7XHJcbiAgICAgICAgICAgIGZvcm1Sb3dSZWYgPSB0aGlzLmZvcm1UYWJsZVJvdy50b0FycmF5KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lckxpc3RSZWYgPSBmb3JtUm93UmVmW3Jvd0luZGV4XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3JtUm93UmVmID0gdGhpcy5mb3JtUm93LnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgaWYgKGZvcm1Sb3dSZWZbcm93SW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJMaXN0UmVmID0gZm9ybVJvd1JlZltyb3dJbmRleF0uY29udGFpbmVyTGlzdFJlZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29udGFpbmVyTGlzdFJlZikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250YWluZXJEYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0W2NvbnRhaW5lckluZGV4XTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0uZmllbGROYW1lID09IGZpZWxkTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRUeXBlID0gY29udGFpbmVyRGF0YS5maWVsZExpc3RbZmllbGRJbmRleF0udHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNwbGF5TW9kZSA9PSAndGFibGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXJMaXN0UmVmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyTGlzdFJlZi5maW5kKGluc3RhbnRDb250YWluZXIgPT4gaW5zdGFudENvbnRhaW5lci5jb250YWluZXJJbmRleCA9PSBjb250YWluZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGNvbnRhaW5lci5nZXREeW5hbWljSW5wdXQoZmllbGRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRUeXBlID09ICdoaWRkZW4nICYmIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc3BsYXlNb2RlID09ICd0YWJsZScgJiYgaW5wdXQgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFwU2V0QXR0cmlidXRlKGF0dHJpYnV0ZU9iamVjdCkge1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBpbiBhdHRyaWJ1dGVPYmplY3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYXR0cmlidXRlIGluIGF0dHJpYnV0ZU9iamVjdFtmaWVsZE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgYXR0cmlidXRlLCBhdHRyaWJ1dGVPYmplY3RbZmllbGROYW1lXVthdHRyaWJ1dGVdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYXBTZXRWYWx1ZSh2YWx1ZU9iamVjdCwgcm93SW5kZXgpIHtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgaW4gdmFsdWVPYmplY3QpIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCBcInR5cGVcIik7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZURhdGEgPSAodmFsdWVPYmplY3RbZmllbGROYW1lXSA9PSBudWxsIHx8ICh2YWx1ZU9iamVjdFtmaWVsZE5hbWVdID09ICcnICYmIHR5cGVvZih2YWx1ZU9iamVjdFtmaWVsZE5hbWVdKSAhPSBcIm9iamVjdFwiKSA/ICcnIDogdmFsdWVPYmplY3RbZmllbGROYW1lXSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcImF1dG9Db21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVTZXRPYmplY3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyh2YWx1ZURhdGEpIHx8IGlzTnVtYmVyKHZhbHVlRGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSB0aGlzLmdldER5bmFtaWNJbnB1dChmaWVsZE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnZXRFeGlzdHNEYXRhID0gaW5wdXQuaW5zdGFudElucHV0LmdldERhdGFGcm9tVmFsdWUodmFsdWVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0RXhpc3RzRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldE9iamVjdC5wdXNoKGdldEV4aXN0c0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0T2JqZWN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdmFsdWVEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkodmFsdWVEYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZVJvdyBvZiB2YWx1ZURhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmFsdWVSb3cuZGlzcGxheSB8fCAhdmFsdWVSb3cudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXRPYmplY3QgPSB2YWx1ZURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXQgUGF0dGVybiBJbmNvcnJlY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldE9iamVjdCA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlRGF0YS5kaXNwbGF5ICYmIHZhbHVlRGF0YS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXRPYmplY3QucHVzaCh2YWx1ZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNldCBQYXR0ZXJuIEluY29ycmVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0T2JqZWN0ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4LCB2YWx1ZVNldE9iamVjdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4LCB2YWx1ZURhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWFwR2V0VmFsdWUodmFsdWVPYmplY3QsIHJvd0luZGV4KSB7XHJcbiAgICAgICAgdmFyIG1hcFZhbHVlID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsdWVPYmplY3QpO1xyXG4gICAgICAgIGZvciAobGV0IG1hcEZpZWxkTmFtZSBpbiBtYXBWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChtYXBWYWx1ZVttYXBGaWVsZE5hbWVdKSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGFUeXBlU3BsaXQgPSBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YVR5cGUgPSAodHlwZW9mIChkYXRhVHlwZVNwbGl0WzFdKSAhPSAndW5kZWZpbmVkJyA/IGRhdGFUeXBlU3BsaXRbMV0gOiAnJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUZpZWxkRGV0YWlsID0gZGF0YVR5cGVTcGxpdFswXS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGRhdGFGaWVsZERldGFpbC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3R5cGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCBub3JtYWxUeXBlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICdjb2xvclNlbGVjdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RleHRCb3gnLFxyXG4gICAgICAgICAgICAgICAgICAgICd0ZXh0QXJlYScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xhYmVsJyxcclxuICAgICAgICAgICAgICAgICAgICAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAnbnVtYmVyJ107XHJcbiAgICAgICAgICAgICAgICBsZXQgZHJvcERvd25UeXBlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICdzZWxlY3RCb3gnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyYWRpbydcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBsZXQgc2V0VmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICdhdXRvQ29tcGxldGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzd2FwcGluZ0JveCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ21hcFZhbHVlJ1xyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWxlVmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICdmaWxlVXBsb2FkJyxcclxuICAgICAgICAgICAgICAgICAgICAnaW1hZ2UnXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrQm94VmFsdWVUeXBlID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICdjaGVja0JveCdcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0ZVZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgICAgICAgICAnZGF0ZSdcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsVHlwZS5pbmRleE9mKHR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB0aGlzLmNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgZGF0YS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRyb3BEb3duVHlwZS5pbmRleE9mKHR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRUeXBlID0gZGF0YUZpZWxkRGV0YWlsLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRUeXBlICE9ICdkaXNwbGF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHRoaXMuY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCBkYXRhLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZGF0YS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlTGlzdEF0dHJpYnV0ZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndmFsdWVMaXN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZUxpc3RSb3cgb2YgdmFsdWVMaXN0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlTGlzdFJvdy52YWx1ZSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdmFsdWVMaXN0Um93LmRpc3BsYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRUeXBlICE9ICdkaXNwbGF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzcGxheUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZUxpc3RBdHRyaWJ1dGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3ZhbHVlTGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0YVJvdyBvZiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZGF0YVJvdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZUxpc3RSb3cgb2YgdmFsdWVMaXN0QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZUxpc3RSb3cudmFsdWUgPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlMaXN0LnB1c2godmFsdWVMaXN0Um93LmRpc3BsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGlzcGxheUxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldFZhbHVlVHlwZS5pbmRleE9mKHR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRUeXBlID0gZGF0YUZpZWxkRGV0YWlsLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXRUeXBlICE9ICd2YWx1ZScgJiYgc2V0VHlwZSAhPSAnZGlzcGxheScgJiYgc2V0VHlwZSAhPSAnYWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUeXBlID0gJ3ZhbHVlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFTaGlmdCA9IGRhdGEuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldFR5cGUgIT0gJ2FsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB0aGlzLmNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgZGF0YVNoaWZ0W3NldFR5cGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZGF0YVNoaWZ0WydkaXNwbGF5J10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGFTaGlmdFsndmFsdWUnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0YUluZGV4IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRUeXBlICE9ICdhbGwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goZGF0YVtkYXRhSW5kZXhdW3NldFR5cGVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBkYXRhW2RhdGFJbmRleF1bJ2Rpc3BsYXknXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGFbZGF0YUluZGV4XVsndmFsdWUnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBkYXRhQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWxlVmFsdWVUeXBlLmluZGV4T2YodHlwZSkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhVmFsdWUoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVtcInNlbGVjdEZpbGVcIl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUFycmF5LnB1c2goZGF0YVtcInNlbGVjdEZpbGVcIl1baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZUFycmF5Lmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSB0aGlzLmNvbnZlcnREYXRhVHlwZShkYXRhVHlwZSwgZmlsZUFycmF5WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbGVBcnJheS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBmaWxlQXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGVja0JveFZhbHVlVHlwZS5pbmRleE9mKHR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZUxpc3QgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3ZhbHVlTGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXRUeXBlID0gZGF0YUZpZWxkRGV0YWlsLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXRUeXBlICE9ICd2YWx1ZScgJiYgc2V0VHlwZSAhPSAnZGlzcGxheScgJiYgc2V0VHlwZSAhPSAnYWxsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0VHlwZSA9PSAnZGlzcGxheScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVMaXN0Um93IG9mIHZhbHVlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3ZhbHVlTGlzdFJvdy52YWx1ZV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS5wdXNoKHZhbHVlTGlzdFJvdy5kaXNwbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdGhpcy5jb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIHJldHVyblZhbHVlLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldFR5cGUgPT0gJ3ZhbHVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZUxpc3RSb3cgb2YgdmFsdWVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbdmFsdWVMaXN0Um93LnZhbHVlXSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlLnB1c2godmFsdWVMaXN0Um93LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gdGhpcy5jb252ZXJ0RGF0YVR5cGUoZGF0YVR5cGUsIHJldHVyblZhbHVlLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IHJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNldFR5cGUgPT0gJ2FsbCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVMaXN0Um93IG9mIHZhbHVlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW3ZhbHVlTGlzdFJvdy52YWx1ZV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHZhbHVlTGlzdFJvdy5kaXNwbGF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlTGlzdFJvdy52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB2YWx1ZUxpc3RSb3cuZGlzcGxheSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZUxpc3RSb3cudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGVWYWx1ZVR5cGUuaW5kZXhPZih0eXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBWYWx1ZVttYXBGaWVsZE5hbWVdID0gZGF0YS5zaGlmdCgpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkYXRhUm93IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVMaXN0LnB1c2goZGF0YVtkYXRhUm93XS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwVmFsdWVbbWFwRmllbGROYW1lXSA9IGRhdGVMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFZhbHVlW21hcEZpZWxkTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVydERhdGFUeXBlKGRhdGFUeXBlLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGFUeXBlID09ICdzdHJpbmcnICYmICFpc1N0cmluZyhkYXRhKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT0gJ2ludCcgJiYgIWlzTnVtYmVyKGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5EYXRhID0gcGFyc2VJbnQoZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoaXNOYU4ocmV0dXJuRGF0YSkgPyAwIDogcmV0dXJuRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PSAnZmxvYXQnICYmICFpc051bWJlcihkYXRhKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuRGF0YSA9IHBhcnNlRmxvYXQoZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoaXNOYU4ocmV0dXJuRGF0YSkgPyAwIDogcmV0dXJuRGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PSAnYm9vbCcgJiYgaXNTdHJpbmcoZGF0YSkgJiYgKGRhdGEudG9Mb3dlckNhc2UoKSA9PSAndHJ1ZScgfHwgZGF0YS50b0xvd2VyQ2FzZSgpID09ICdmYWxzZScpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5EYXRhID0gKGRhdGEgPT0gJ3RydWUnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrUmVxdWlyZUZpZWxkKHJvd0luZGV4KSB7XHJcblxyXG4gICAgICAgIGxldCBzZXRWYWx1ZVR5cGUgPSBbXHJcbiAgICAgICAgICAgICdhdXRvQ29tcGxldGUnLFxyXG4gICAgICAgICAgICAnc3dhcHBpbmdCb3gnLFxyXG4gICAgICAgICAgICAnbWFwVmFsdWUnXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgZmlsZVZhbHVlVHlwZSA9IFtcclxuICAgICAgICAgICAgJ2ZpbGVVcGxvYWQnLFxyXG4gICAgICAgICAgICAnaW1hZ2UnXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgZmllbGRMaXN0ID0gdGhpcy5nZXRGaWVsZExpc3QoKTtcclxuICAgICAgICBsZXQgcmVxdWlyZVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgZmllbGRSZXF1aXJlQXR0cmlidXRlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICdyZXF1aXJlJyk7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3R5cGUnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZmllbGRSZXF1aXJlQXR0cmlidXRlKSAhPSAndW5kZWZpbmVkJyAmJiBmaWVsZFJlcXVpcmVBdHRyaWJ1dGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkRGF0YSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoZmllbGREYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXRWYWx1ZVR5cGUuaW5kZXhPZihmaWVsZFR5cGUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGREYXRhUm93IGluIGZpZWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChmaWVsZERhdGFbZmllbGREYXRhUm93XVtcInZhbHVlXCJdID09IG51bGwgfHwgZmllbGREYXRhW2ZpZWxkRGF0YVJvd11bXCJ2YWx1ZVwiXSA9PSAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoZmllbGREYXRhW2ZpZWxkRGF0YVJvd11bXCJkaXNwbGF5XCJdID09IG51bGwgfHwgZmllbGREYXRhW2ZpZWxkRGF0YVJvd11bXCJkaXNwbGF5XCJdID09ICcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkRGF0YVJvdyBpbiBmaWVsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZERhdGFbZmllbGREYXRhUm93XSA9PSBudWxsIHx8IGZpZWxkRGF0YVtmaWVsZERhdGFSb3ddID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0VmFsdWVUeXBlLmluZGV4T2YoZmllbGRUeXBlKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGREYXRhW1widmFsdWVcIl0gPT0gbnVsbCB8fCBmaWVsZERhdGFbXCJ2YWx1ZVwiXSA9PSAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIChmaWVsZERhdGFbXCJkaXNwbGF5XCJdID09IG51bGwgfHwgZmllbGREYXRhW1wiZGlzcGxheVwiXSA9PSAnJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZVZhbHVlVHlwZS5pbmRleE9mKGZpZWxkVHlwZSkgPiAtMSkgeztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWVsZERhdGFbXCJzZWxlY3RGaWxlXCJdLmxlbmd0aCB8fCBmaWVsZERhdGFbXCJzZWxlY3RGaWxlXCJdLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUgPT0gJ2NoZWNrQm94Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGF2ZUNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0YUtleSBpbiBmaWVsZERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZERhdGFbZGF0YUtleV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhdmVDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGF2ZUNoZWNrZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZERhdGEgPT0gbnVsbCB8fCBmaWVsZERhdGEgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlU3RhdHVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmVTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tWYWxpZGF0ZUZpZWxkKHJvbGVJbmRleCkge1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGxldCBjaGVja1BhdHRlcm5TdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWVQYXR0ZXJuID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd2YWx1ZVBhdHRlcm4nKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRBdHRyaWJ1dGUoZmllbGROYW1lLCAndHlwZScpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChmaWVsZFZhbHVlUGF0dGVybikgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWVsZERhdGEgPSB0aGlzLmdldERhdGFWYWx1ZShmaWVsZE5hbWUsIHJvbGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShmaWVsZERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVHlwZSA9PSAnYXV0b0NvbXBsZXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZERhdGFSb3cgaW4gZmllbGREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIVN0cmluZyhmaWVsZERhdGFbZmllbGREYXRhUm93XVtcImRpc3BsYXlcIl0pLm1hdGNoKGZpZWxkVmFsdWVQYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGF0dGVyblN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZmllbGREYXRhUm93IGluIGZpZWxkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFTdHJpbmcoZmllbGREYXRhW2ZpZWxkRGF0YVJvd10pLm1hdGNoKGZpZWxkVmFsdWVQYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGF0dGVyblN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRUeXBlID09ICdhdXRvQ29tcGxldGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghU3RyaW5nKGZpZWxkRGF0YVtcInZhbHVlXCJdKS5tYXRjaChmaWVsZFZhbHVlUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGF0dGVyblN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFTdHJpbmcoZmllbGREYXRhKS5tYXRjaChmaWVsZFZhbHVlUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrUGF0dGVyblN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrUGF0dGVyblN0YXR1cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGVja1BhdHRlcm5TdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmllbGRMaXN0KCkge1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBjb250YWluZXJJbmRleCBpbiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckRhdGEgPSB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3RbY29udGFpbmVySW5kZXhdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBmaWVsZEluZGV4IGluIGNvbnRhaW5lckRhdGEuZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZExpc3QucHVzaChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS5maWVsZE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaWVsZExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmllbGRMYWJlbCgpIHtcclxuICAgICAgICBsZXQgZmllbGRMYWJlbCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGNvbnRhaW5lckluZGV4IGluIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyRGF0YSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0uY29udGFpbmVyTGlzdFtjb250YWluZXJJbmRleF07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGZpZWxkSW5kZXggaW4gY29udGFpbmVyRGF0YS5maWVsZExpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb250YWluZXJEYXRhLmZpZWxkTGlzdFtmaWVsZEluZGV4XS50eXBlICE9ICdoaWRkZW4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGRMYWJlbC5wdXNoKGNvbnRhaW5lckRhdGEuZmllbGRMaXN0W2ZpZWxkSW5kZXhdLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpZWxkTGFiZWxMaXN0ID0gZmllbGRMYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGcmFtZUhlYWRlcihyb3dJbmRleCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSkgIT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXkuaXNBcnJheSh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpICYmIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZS5sZW5ndGggPT0gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZVtyb3dJbmRleF07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSkgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5mcmFtZU5hbWUpICE9ICd1bmRlZmluZWQnICYmICFBcnJheS5pc0FycmF5KHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmZyYW1lTmFtZSArIChwYXJzZUludChyb3dJbmRleCkgKyAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0Zvcm0gJyArIChwYXJzZUludChyb3dJbmRleCkgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rm9ybVJvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkFkZFByb2Nlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcEFkZERhdGEubGVuZ3RoO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vbkRlbGV0ZVByb2Nlc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGVtcERlbGV0ZURhdGEubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSb3dOdW0ocm93TnVtKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRSb3dOdW0gPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICBpZiAoY3VycmVudFJvd051bSA8IHJvd051bSkge1xyXG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudFJvd051bSA8IHJvd051bSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5nZXREZWZhdWx0KCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5wdXNoKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93TnVtID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudFJvd051bSA+IHJvd051bSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YS5wb3AoKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3dOdW0gPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLnJlUmVuZGVyRm9ybSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9uRm9ybVJlYWR5KHJvd051bSk7XHJcbiAgICB9XHJcbiAgICBhZGRSb3cocm93SW5kZXggPSBudWxsLCBzb3VyY2VBY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgbGV0IHJvd0NvdW50ID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgbGV0IF9yb3dJbmRleCA9IHJvd0luZGV4O1xyXG4gICAgICAgIGlmIChyb3dJbmRleCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIF9yb3dJbmRleCA9IHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkZWZhdWx0VmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmdldERlZmF1bHQoKSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9uQWRkUHJvY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnRlbXBBZGREYXRhID0gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVxyXG4gICAgICAgICAgICB0aGlzLm9uQWRkUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uU2VydmljZS5zZXRPblJlUmVuZGVyKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbXBBZGREYXRhLnNwbGljZShfcm93SW5kZXgsIDAsIGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgbGV0IHRlbXBEYXRhID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZGF0YVJvd0luZGV4IGluIHRoaXMudGVtcEFkZERhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGFSb3dJbmRleCA8IF9yb3dJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcERhdGFbZGF0YVJvd0luZGV4XSA9IHRoaXMudGVtcEFkZERhdGFbZGF0YVJvd0luZGV4XVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFSb3dJbmRleCA+PSBfcm93SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBEYXRhW2RhdGFSb3dJbmRleCArIHJvd0NvdW50XSA9IHRoaXMudGVtcEFkZERhdGFbZGF0YVJvd0luZGV4XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEgPSB0ZW1wRGF0YTtcclxuICAgICAgICBpZiAodGhpcy5hZGREYXRhVGltZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZERhdGFUaW1lci51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZERhdGFUaW1lciA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMudGVtcEFkZERhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQWRkUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0T25SZVJlbmRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGcmFtZUhlYWRlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2FkZFJvdycsXHJcbiAgICAgICAgICAgIHNvdXJjZUFjdGlvbjogc291cmNlQWN0aW9uLFxyXG4gICAgICAgICAgICByb3dJbmRleDogX3Jvd0luZGV4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBkZWxldGVSb3dUZXN0KHJvd0luZGV4LCBzb3VyY2VBY3Rpb24gPSBudWxsKSB7XHJcbiAgICAvLyAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgIC8vICAgICBpZiAoaXNBcnJheShyb3dJbmRleCkpIHtcclxuICAgIC8vICAgICAgICAgZm9yIChsZXQgcm93SW5kZXhOdW0gb2Ygcm93SW5kZXgpIHtcclxuICAgIC8vICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4TnVtXSA9PSB1bmRlZmluZWQpIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgLy8gICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBpZiAoY2hlY2spIHtcclxuICAgIC8vICAgICAgICAgaWYgKGlzQXJyYXkocm93SW5kZXgpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICByb3dJbmRleC5zb3J0KCk7XHJcbiAgICAvLyAgICAgICAgICAgICByb3dJbmRleC5yZXZlcnNlKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBmb3IgKGxldCByb3dJbmRleE51bSBvZiByb3dJbmRleCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEuc3BsaWNlKHJvd0luZGV4TnVtLCAxKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEuc3BsaWNlKHJvd0luZGV4LCAxKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIGRlbGV0ZVJvdyhyb3dJbmRleCwgc291cmNlQWN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgaWYgKGlzQXJyYXkocm93SW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvd0luZGV4TnVtIG9mIHJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleE51bV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dDb3VudCA9IHRoaXMuZ2V0Rm9ybVJvdygpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcFJvd0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHRlbXBFbmFibGVSb3cgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEaXNhYmxlRGVsZXRlID0gW107XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGlzYWJsZUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHRlbXBEZWxldGVEYXRhO1xyXG4gICAgICAgICAgICBsZXQgdGVtcEVuYWJsZVJvd0RhdGE7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGlzYWJsZURlbGV0ZURhdGE7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGlzYWJsZUxpc3REYXRhO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhUm93SW5kZXggaW4gdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGVtcFJvd0xpc3RbcGFyc2VJbnQoZGF0YVJvd0luZGV4KSArIHBhcnNlSW50KHJvd0NvdW50KV0gPSB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW2RhdGFSb3dJbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVuYWJsZVJvd1twYXJzZUludChkYXRhUm93SW5kZXgpICsgcGFyc2VJbnQocm93Q291bnQpXSA9IHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4W2RhdGFSb3dJbmRleF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlRGVsZXRlW3BhcnNlSW50KGRhdGFSb3dJbmRleCkgKyBwYXJzZUludChyb3dDb3VudCldID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZVtkYXRhUm93SW5kZXhdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVMaXN0W3BhcnNlSW50KGRhdGFSb3dJbmRleCkgKyBwYXJzZUludChyb3dDb3VudCldID0gdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3RbZGF0YVJvd0luZGV4XVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vbkRlbGV0ZVByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBEZWxldGVEYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVuYWJsZVJvd0RhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZURlbGV0ZURhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGlzYWJsZUxpc3REYXRhID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRlbGV0ZVByb2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TZXJ2aWNlLnNldE9uUmVSZW5kZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkocm93SW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICByb3dJbmRleC5zb3J0KCk7XHJcbiAgICAgICAgICAgICAgICByb3dJbmRleC5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCByb3dJbmRleE51bSBvZiByb3dJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEZWxldGVEYXRhLnNwbGljZShyb3dJbmRleE51bSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRW5hYmxlUm93RGF0YS5zcGxpY2Uocm93SW5kZXhOdW0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVEZWxldGVEYXRhLnNwbGljZShyb3dJbmRleE51bSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpc2FibGVMaXN0RGF0YS5zcGxpY2Uocm93SW5kZXhOdW0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRlbXBEZWxldGVEYXRhLnNwbGljZShyb3dJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVuYWJsZVJvd0RhdGEuc3BsaWNlKHJvd0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlRGVsZXRlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlRGVsZXRlRGF0YS5zcGxpY2Uocm93SW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNhYmxlTGlzdERhdGEuc3BsaWNlKHJvd0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhID0gdGVtcFJvd0xpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ID0gdGVtcEVuYWJsZVJvdztcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZSA9IHRlbXBEaXNhYmxlRGVsZXRlO1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCA9IHRlbXBEaXNhYmxlTGlzdDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlbGV0ZURhdGFUaW1lciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZURhdGFUaW1lciA9IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZURhdGFUaW1lciA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEgPSBPYmplY3QuYXNzaWduKFtdLCB0ZW1wRGVsZXRlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9IE9iamVjdC5hc3NpZ24oW10sIHRlbXBFbmFibGVSb3dEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgPSBPYmplY3QuYXNzaWduKFtdLCB0ZW1wRGlzYWJsZURlbGV0ZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgPSBPYmplY3QuYXNzaWduKFtdLCB0ZW1wRGlzYWJsZUxpc3REYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25EZWxldGVQcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvblNlcnZpY2Uuc2V0T25SZVJlbmRlcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlRnJhbWVIZWFkZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVGcmFtZUhlYWRlcigpO1xyXG4gICAgICAgIC8vIHRoaXMucmVSZW5kZXJGb3JtKCk7XHJcbiAgICAgICAgLy8gT2JzZXJ2YWJsZS50aW1lcig0MDApLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgdGVtcERhdGEgPSBPYmplY3QuYXNzaWduKFtdLHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0pO1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2codGVtcERhdGEpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtyb3dJbmRleF1bZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5kZWZhdWx0RGF0YVtmaWVsZE5hbWVdKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLHRlbXBEYXRhKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2RlbGV0ZVJvdycsXHJcbiAgICAgICAgICAgIHNvdXJjZUFjdGlvbjogc291cmNlQWN0aW9uLFxyXG4gICAgICAgICAgICByb3dJbmRleDogcm93SW5kZXhcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxsQmFja0ZyYW1lKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmFjdGlvbiA9PSAnZGVsZXRlUm93Jykge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVJvdyhldmVudC5yb3dJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZVJvdyhyb3dJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXggPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZW5hYmxlUm93SW5kZXhbcm93SW5kZXhdID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlUm93KHJvd0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmVuYWJsZVJvd0luZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5lbmFibGVSb3dJbmRleFtyb3dJbmRleF0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRmllbGQocm93SW5kZXgsIGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W3Jvd0luZGV4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3Rbcm93SW5kZXhdID0ge31cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3Rbcm93SW5kZXhdW2ZpZWxkTmFtZV0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUZpZWxkKHJvd0luZGV4LCBmaWVsZE5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZUxpc3QgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kaXNhYmxlTGlzdFtyb3dJbmRleF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W3Jvd0luZGV4XSA9IHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVMaXN0W3Jvd0luZGV4XVtmaWVsZE5hbWVdID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlRGVsZXRlUm93KHJvd0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZVtyb3dJbmRleF0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRGVsZXRlUm93KHJvd0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRpc2FibGVEZWxldGUgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGlzYWJsZURlbGV0ZVtyb3dJbmRleF0gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlRmlsdGVyKHJvd0luZGV4KSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZEF0dHJpYnV0ZShmaWVsZE5hbWUsICd0eXBlJyk7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZFR5cGUgPT0gJ2F1dG9Db21wbGV0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZVJvdyBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHluYW1pY0lucHV0OiBhbnkgPSB0aGlzLmdldER5bmFtaWNJbnB1dChmaWVsZE5hbWUsIHJvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHluYW1pY0lucHV0Lmluc3RhbnRJbnB1dC5maWx0ZXJBdXRvQ29tcGxldGUodmFsdWVSb3csIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlRmlsdGVyRmllbGQoZmllbGROYW1lLCByb3dJbmRleCwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGR5bmFtaWNJbnB1dDogYW55ID0gdGhpcy5nZXREeW5hbWljSW5wdXQoZmllbGROYW1lLCByb3dJbmRleCk7XHJcbiAgICAgICAgZHluYW1pY0lucHV0Lmluc3RhbnRJbnB1dC5maWx0ZXJBdXRvQ29tcGxldGUoZGF0YUluZGV4LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkZvcm1SZWFkeShyb3dOdW0sIGRhdGEgPSBudWxsLCB0aW1lb3V0ID0gMTUwMDAsIGRlYnVnID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydE1pbGxpc2Vjb25kcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlU3RhcnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TWlsbGlzZWNvbmRzID0gZGF0ZVN0YXJ0LmdldFRpbWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlYWR5U3RhdHVzID0gbnVsbDtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2YWJsZSkgPT4ge1xyXG4gICAgICAgICAgICBpbnRlcnZhbCgyMDApLnBpcGUodGFrZVdoaWxlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkeVN0YXR1cyAhPSB0cnVlICYmIHRoaXMuc3RhcnRNaWxsaXNlY29uZHMgIT0gbnVsbFxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0ZUN1cnJlbnQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudE1pbGxpc2Vjb25kcyA9IGRhdGVDdXJyZW50LmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpZmZUaW1lID0gY3VycmVudE1pbGxpc2Vjb25kcyAtIHRoaXMuc3RhcnRNaWxsaXNlY29uZHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tGaWVsZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgcm93TnVtOyByb3dJbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR5bmFtaWNJbnB1dCA9IHRoaXMuZ2V0RHluYW1pY0lucHV0KGZpZWxkTmFtZSwgcm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRmllbGQucHVzaChkeW5hbWljSW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tGaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrRmllbGQuaW5kZXhPZihudWxsKSA+IC0xIHx8IGNoZWNrRmllbGQuaW5kZXhPZih1bmRlZmluZWQpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWR5U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWR5U3RhdHVzID09IHRydWUgfHwgZGlmZlRpbWUgPiB0aW1lb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TWlsbGlzZWNvbmRzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFkeVN0YXR1cyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5uZXh0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAncmVhZHknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUubmV4dCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ3RpbWVvdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICByZWZpbmVDb250YWluZXJUYWJsZU1vZGUoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5jb250YWluZXJMaXN0KSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBsZXQgZmllbGRMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbnRhaW5lciBvZiB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLmNvbnRhaW5lckxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkQ3JlYXRpb24gb2YgY29udGFpbmVyLmZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTGlzdC5wdXNoKGZpZWxkQ3JlYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVmaW5lZENvbnRhaW5lclRhYmxlTW9kZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnJlZmluZWRDb250YWluZXJUYWJsZU1vZGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBmaWVsZExpc3Q6IGZpZWxkTGlzdFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHVwbGljYXRlRGF0YVJvdyhzb3VyY2VSb3csIGRlc3RpbmF0aW9uUm93LCBhY3Rpb25PbkZyb21SZWFkeSA9IHRydWUpIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVtzb3VyY2VSb3ddICE9IHVuZGVmaW5lZCAmJiB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW2Rlc3RpbmF0aW9uUm93XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVSb3dQcm9jZXNzKHNvdXJjZVJvdywgZGVzdGluYXRpb25Sb3cpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uT25Gcm9tUmVhZHkpIHtcclxuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVRdWV1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZVJvdzogc291cmNlUm93LFxyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25Sb3c6IGRlc3RpbmF0aW9uUm93XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMub25Gb3JtUmVhZHkoZGVzdGluYXRpb25Sb3cgKyAxKS5zdWJzY3JpYmUoKHJlYWR5U3RhdHVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkeVN0YXR1cy5zdGF0dXMgPT0gJ3JlYWR5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmR1cGxpY2F0ZVF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZURhdGEgPSB0aGlzLmR1cGxpY2F0ZVF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlUm93UHJvY2VzcyhkdXBsaWNhdGVEYXRhLnNvdXJjZVJvdywgZHVwbGljYXRlRGF0YS5kZXN0aW5hdGlvblJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdEeW5hbWljIGZvcm0gcm93IG51bWJlciAnICsgZGVzdGluYXRpb25Sb3cgKyAnIGRpZG5cXCd0IGNyZWF0ZS4gQ2FuXFwndCBkdXBsaWNhdGUgZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGEgaW5kZXggaW5jb3JyZWN0LiBDYW5cXCd0IGR1cGxpY2F0ZSBkYXRhLicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGR1cGxpY2F0ZVRvTmV3Um93KHNvdXJjZVJvdyA9IDAsIHNvdXJjZUFjdGlvbiA9IG51bGwpIHtcclxuICAgICAgICBsZXQgZGF0YU5ld1JvdyA9IHt9O1xyXG4gICAgICAgIGxldCBoYXZlRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3NvdXJjZVJvd10gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGRhdGFOZXdSb3cgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmZvcm1DcmVhdGlvbi5kYXRhW3NvdXJjZVJvd10pO1xyXG4gICAgICAgICAgICBoYXZlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZGF0YU5ld1JvdyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGFbMF0pO1xyXG4gICAgICAgICAgICBoYXZlRGF0YSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignZHVwbGljYXRlIG5ldyByb3cgZmFpbCBub3QgZm91bmQgYW55IGRhdGEnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGF2ZURhdGEpIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRWYWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2V0RGVmYXVsdCgpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIGluIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFOZXdSb3dbZmllbGROYW1lXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBPYmplY3QuYXNzaWduKFtdLCBkYXRhTmV3Um93W2ZpZWxkTmFtZV0pXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWVSb3cgb2YgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlUm93KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUucHVzaChPYmplY3QuYXNzaWduKHt9LCB2YWx1ZVJvdykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZS5wdXNoKHZhbHVlUm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWVbZmllbGROYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmRhdGEucHVzaChkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBhY3Rpb246ICdkdXBsaWNhdGVUb05ld1JvdycsXHJcbiAgICAgICAgICAgIHNvdXJjZUFjdGlvbjogc291cmNlQWN0aW9uLFxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleDogc291cmNlUm93XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZHVwbGljYXRlUm93UHJvY2Vzcyhzb3VyY2VSb3csIGRlc3RpbmF0aW9uUm93KSB7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgbGV0IG9iakdldCA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZExpc3QpIHtcclxuICAgICAgICAgICAgb2JqR2V0W2ZpZWxkTmFtZV0gPSBmaWVsZE5hbWUgKyAnLmFsbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzb3VyY2VEYXRhID0gdGhpcy5tYXBHZXRWYWx1ZShvYmpHZXQsIHNvdXJjZVJvdyk7XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIGluIHNvdXJjZURhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmdldEZpZWxkQXR0cmlidXRlKGZpZWxkTmFtZSwgJ3R5cGUnKTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ2NoZWNrQm94Jykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZURhdGEgb2Ygc291cmNlRGF0YVtmaWVsZE5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbdmFsdWVEYXRhLnZhbHVlXSA9IHZhbHVlRGF0YS5jaGVja2VkXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc291cmNlRGF0YVtmaWVsZE5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXBTZXRWYWx1ZShzb3VyY2VEYXRhLCBkZXN0aW5hdGlvblJvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tEdXBsaWNhdGUoZmllbGRBcnJheSwgcmVnRXggPSAvKC4qKS8sIHJlZ0V4SW5kZXggPSAwKSB7XHJcbiAgICAgICAgbGV0IHRlbXBEYXRhQ2hlY2sgPSBbXTtcclxuICAgICAgICBsZXQgbWFwR2V0ID0ge307XHJcbiAgICAgICAgbGV0IGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZExpc3Qgb2YgZmllbGRBcnJheSkge1xyXG4gICAgICAgICAgICBtYXBHZXRbZmllbGRMaXN0XSA9IGZpZWxkTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZvcm1Sb3cgPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1Sb3c7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubWFwR2V0VmFsdWUobWFwR2V0LCBpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YUtleSBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVnVGVzdCA9IG5ldyBSZWdFeHAocmVnRXgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gcmVnVGVzdC5leGVjKGRhdGFbZGF0YUtleV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGVtcERhdGFDaGVjay5pbmRleE9mKG1hdGNoW3JlZ0V4SW5kZXhdKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBEYXRhQ2hlY2sucHVzaChtYXRjaFtyZWdFeEluZGV4XSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoZWNrID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hlY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tSZXF1aXJlQWxsKCkge1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgbGV0IGZvcm1Sb3cgPSB0aGlzLmdldEZvcm1Sb3coKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1Sb3c7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tSZXF1aXJlRmllbGQoaSkpIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hlY2s7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tWYWxpZGF0ZUFsbCgpIHtcclxuICAgICAgICBsZXQgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIGxldCBmb3JtUm93ID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtUm93OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVmFsaWRhdGVGaWVsZChpKSkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjaGVjaztcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RlKG1vZGUpIHtcclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5tb2RlID0gbW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVBZGQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmFkZFJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uYWRkUm93ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uYWRkUm93ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlQWRkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5hZGRSb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmFkZFJvdyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5hZGRSb3cgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVEZWxldGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRlbGV0ZVJvdyA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGVsZXRlUm93ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb3JtQ3JlYXRpb24uZm9ybS5vcHRpb24uZGVsZXRlUm93ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRGVsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvcm1DcmVhdGlvbi5mb3JtLm9wdGlvbi5kZWxldGVSb3cgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRlbGV0ZVJvdyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0aW9uLmZvcm0ub3B0aW9uLmRlbGV0ZVJvdyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldERlZmF1bHQocm93SW5kZXggPSAwKSB7XHJcbiAgICAgICAgaWYodGhpcy5mb3JtQ3JlYXRpb24uZGF0YVswXSkge1xyXG4gICAgICAgICAgICB0aGlzLmdldERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIGluIHRoaXMuZGVmYXVsdERhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YVZhbHVlKGZpZWxkTmFtZSwwLCB0aGlzLmRlZmF1bHREYXRhW2ZpZWxkTmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRTYXZlUG9pbnQoc2F2ZVBvaW50TmFtZSA9IFwiZGVmYXVsdFwiKSB7XHJcbiAgICAgICAgbGV0IHNhdmVQb2ludERhdGEgPSBbXTtcclxuICAgICAgICBsZXQgcm93TnVtID0gdGhpcy5nZXRGb3JtUm93KCk7XHJcbiAgICAgICAgbGV0IGZpZWxkTGlzdCA9IHRoaXMuZ2V0RmllbGRMaXN0KCk7XHJcbiAgICAgICAgbGV0IG1hcEdldDphbnkgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGRMaXN0KSB7XHJcbiAgICAgICAgICAgIG1hcEdldFtmaWVsZE5hbWVdID0gZmllbGROYW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93TnVtO2kgKyspIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLm1hcEdldFZhbHVlKG1hcEdldCxpKTtcclxuICAgICAgICAgICAgc2F2ZVBvaW50RGF0YS5wdXNoKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZVBvaW50W3NhdmVQb2ludE5hbWVdID0gc2F2ZVBvaW50RGF0YTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0U2F2ZVBvaW50KHNhdmVQb2ludE5hbWUgPSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgIGlmICh0aGlzLnNhdmVQb2ludFtzYXZlUG9pbnROYW1lXSkge1xyXG4gICAgICAgICAgICBsZXQgc2F2ZVBvaW50RGF0YSA9IHRoaXMuc2F2ZVBvaW50W3NhdmVQb2ludE5hbWVdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzYXZlUG9pbnRJbmRleCBpbiBzYXZlUG9pbnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFNldFZhbHVlKHNhdmVQb2ludERhdGFbc2F2ZVBvaW50SW5kZXhdLCBzYXZlUG9pbnRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFBhcmFtKHJvd0luZGV4ID0gMCkge1xyXG4gICAgICAgIGxldCBmaWVsZExpc3QgPSB0aGlzLmdldEZpZWxkTGlzdCgpO1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgZmllbGROYW1lIG9mIGZpZWxkTGlzdCkge1xyXG4gICAgICAgICAgICBwYXJhbVtmaWVsZE5hbWVdID0gZmllbGROYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJhbSA9IHRoaXMubWFwR2V0VmFsdWUocGFyYW0sIHJvd0luZGV4KVxyXG4gICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgIH1cclxufVxyXG4iXX0=