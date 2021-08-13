import { EventEmitter, OnInit, QueryList } from '@angular/core';
import { DynamicFormRowComponent } from '../dynamic-form-row/dynamic-form-row.component';
import { DynamicContainerTableComponent } from '../dynamic-container-table/dynamic-container-table.component';
import { Observable } from 'rxjs';
import { AnimationService } from '../../service/animation.service';
export declare class DynamicFormComponent implements OnInit {
    private animationService;
    formRow: QueryList<DynamicFormRowComponent>;
    formTableRow: QueryList<DynamicContainerTableComponent>;
    formCreation: any;
    model: any;
    actionDataIndex: number;
    defaultData: any;
    showForm: boolean;
    option: {};
    callBack: EventEmitter<any>;
    panelCallBack: EventEmitter<any>;
    frameHeader: any[];
    objKey: {
        (o: object): string[];
        (o: {}): string[];
    };
    fieldLabelList: any[];
    _reRenderFieldList: any[];
    refinedContainerTableMode: any[];
    tempDeleteData: any[];
    onDeleteProcess: boolean;
    deleteDataTimer: any;
    tempAddData: any[];
    onAddProcess: boolean;
    addDataTimer: any;
    setDataQueue: any[];
    duplicateQueue: any[];
    savePoint: any;
    private startMilliseconds;
    constructor(animationService: AnimationService);
    ngOnInit(): void;
    compareModel(): void;
    verifyField(): void;
    generateFrameHeader(): void;
    processCallBack(event: any): void;
    processPanelCallBack(event: any): void;
    getDefault(): any;
    reRenderForm(): void;
    reRenderField(fieldArray: any, rowIndex?: number): void;
    setFieldAttribute(fieldName: any, attributeName: any, attributeValue: any): void;
    setContainerAttribute(containerName: any, attributeName: any, attributeValue: any): void;
    getFieldAttribute(fieldName: any, attributeName: any): any;
    setDataValue(fieldName: any, rowIndex: any, value: any, multi?: boolean): void;
    setDataProcess(fieldName: any, rowIndex: any, value: any, multi?: boolean): void;
    getFieldType(fieldName: any): any;
    getDataValue(fieldName: any, rowIndex: any, dataIndex?: any): any;
    getDynamicInput(fieldName: any, rowIndex?: number): any;
    mapSetAttribute(attributeObject: any): void;
    mapSetValue(valueObject: any, rowIndex: any): void;
    mapGetValue(valueObject: any, rowIndex: any): any;
    convertDataType(dataType: any, data: any): any;
    checkRequireField(rowIndex: any): boolean;
    checkValidateField(roleIndex: any): boolean;
    getFieldList(): any[];
    getFieldLabel(): void;
    getFrameHeader(rowIndex: any): any;
    getFormRow(): any;
    setRowNum(rowNum: any): Observable<unknown>;
    addRow(rowIndex?: any, sourceAction?: any): void;
    deleteRow(rowIndex: any, sourceAction?: any): void;
    callBackFrame(event: any): void;
    enableRow(rowIndex: any): void;
    disableRow(rowIndex: any): void;
    disableField(rowIndex: any, fieldName: any): void;
    enableField(rowIndex: any, fieldName: any): void;
    enableDeleteRow(rowIndex: any): void;
    disableDeleteRow(rowIndex: any): void;
    reFilter(rowIndex: any): void;
    reFilterField(fieldName: any, rowIndex: any, dataIndex: any): void;
    onFormReady(rowNum: any, data?: any, timeout?: number, debug?: boolean): Observable<unknown>;
    refineContainerTableMode(): void;
    duplicateDataRow(sourceRow: any, destinationRow: any, actionOnFromReady?: boolean): void;
    duplicateToNewRow(sourceRow?: number, sourceAction?: any): void;
    duplicateRowProcess(sourceRow: any, destinationRow: any): void;
    checkDuplicate(fieldArray: any, regEx?: RegExp, regExIndex?: number): boolean;
    checkRequireAll(): boolean;
    checkValidateAll(): boolean;
    setMode(mode: any): void;
    enableAdd(): void;
    disableAdd(): void;
    enableDelete(): void;
    disableDelete(): void;
    setDefault(rowIndex?: number): void;
    setSavePoint(savePointName?: string): void;
    getSavePoint(savePointName?: string): void;
    getParam(rowIndex?: number): {};
}
//# sourceMappingURL=dynamic-form.component.d.ts.map