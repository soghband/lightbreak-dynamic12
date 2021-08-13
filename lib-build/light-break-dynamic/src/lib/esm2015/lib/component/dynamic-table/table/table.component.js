import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isBoolean } from '@angular-package/type';
export class TableComponent {
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
}
TableComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-table',
                template: "<div id=\"dynamicTable\" class=\"{{tableCreation.customClass ? tableCreation.customClass : ''}}\">\r\n    <div class=\"header\" id=\"head_brand_list\">{{tableCreation.header}}</div>\r\n    <div class=\"scroll\">\r\n        <table>\r\n            <tr>\r\n                <ng-container *ngIf=\"tableCreation.primaryField && tableCreation.showSelect && tableCreation.showSelect != 'none'\">\r\n                    <th>\r\n                        <input *ngIf=\"tableCreation.showSelect == 'checkBox'\" type=\"checkbox\"  id=\"checkBox_select_all\"\r\n                               [(ngModel)]=\"checkSelectAll\"\r\n                               (change)=\"checkActionAll()\" name=\"checkBox_all\" >\r\n                    </th>\r\n                </ng-container>\r\n                <ng-container *ngFor=\"let dataIndex of objKeys(tableCreation.fieldList)\">\r\n                    <th *ngIf=\"tableCreation.fieldList[dataIndex].hideHeader != true\"\r\n                        id=\"id_{{getFieldId(tableCreation.fieldList[dataIndex].fieldName)}}_header\"\r\n                        [colSpan]=\"tableCreation.fieldList[dataIndex].headerSpan ? tableCreation.fieldList[dataIndex].headerSpan : '1'\"\r\n                        class=\"{{(tableCreation.sorting == true && tableCreation.fieldList[dataIndex].sorting != false? 'actionClick' : '')}}{{tableCreation.fieldList[dataIndex].thCustomClass ? ' '+tableCreation.fieldList[dataIndex].thCustomClass : ''}}\"\r\n                        (click)=\"sortBy(dataIndex)\">\r\n                        {{tableCreation.fieldList[dataIndex].displayHeader}}\r\n                        <span *ngIf=\"(sortField == tableCreation.fieldList[dataIndex].fieldNameDb || sortField == tableCreation.fieldList[dataIndex].fieldName) && tableCreation.sorting == true && tableCreation.fieldList[dataIndex].sorting != false\"\r\n                             class=\"{{sortType == 'DESC' ? 'glyphicon glyphicon-sort-by-attributes-alt' : 'glyphicon glyphicon-sort-by-attributes'}}\"></span>\r\n                    </th>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"tableCreation.showDelete || tableCreation.showEdit\">\r\n                    <th id=\"action\" class=\"actionTh\" [innerHTML]=\"tableCreation.actionHeader ? tableCreation.actionHeader: 'Action'\">\r\n                    </th>\r\n                </ng-container>\r\n            </tr>\r\n            <tr *ngFor=\"let rowIndex of objKeys((tableCreation.data.data ? tableCreation.data.data :tableCreation.data))\" class=\"table_class\" id=\"id_row_{{tableCreation.tableId}}_{{rowIndex}}\">\r\n                <ng-container *ngIf=\"tableCreation.primaryField && tableCreation.showSelect && tableCreation.showSelect != 'none'\">\r\n                    <td id=\"select_{{rowIndex}}\">\r\n                        <div *ngIf=\"!checkIgnore(rowIndex)\">\r\n                            <input *ngIf=\"tableCreation.showSelect == 'checkBox'\" type=\"checkbox\" id=\"checkBox_{{rowIndex}}\"\r\n                                   [(ngModel)]=\"checkData[getPrimary(rowIndex)]\"\r\n                                   (change)=\"checkAction(rowIndex)\" name=\"checkBox_{{rowIndex}}\" >\r\n                            <input *ngIf=\"tableCreation.showSelect == 'radioBox'\" type=\"radio\"\r\n                                   value=\"{{getPrimary(rowIndex)}}\"\r\n                                   name=\"tableRadio_{{tableCreation.tableId}}\" id=\"radioBox_{{rowIndex}}\"\r\n                                   [(ngModel)]=\"radioData\"\r\n                                   (change)=\"radioAction(rowIndex)\" >\r\n                        </div>\r\n                    </td>\r\n                </ng-container>\r\n                <ng-container *ngFor=\"let dataIndex of objKeys(tableCreation.fieldList)\">\r\n                    <td id=\"id_{{getFieldId(tableCreation.fieldList[dataIndex].fieldName)}}_{{rowIndex}}_{{tableCreation.tableId}}\"\r\n                        class=\"{{tableCreation.fieldList[dataIndex].align}} {{tableCreation.fieldList[dataIndex].tdCustomClass ? tableCreation.fieldList[dataIndex].tdCustomClass : ''}}\">\r\n                        <div class=\"{{tableCreation.fieldList[dataIndex].dataStyle}}\">\r\n                            <ng-container *ngIf=\"tableCreation.fieldList[dataIndex].action == false\">\r\n                                <div [innerHTML]=\"getData(tableCreation.fieldList[dataIndex],rowIndex)\"></div>\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"tableCreation.fieldList[dataIndex].action == true\">\r\n                                <div class=\"dataAction\" (click)=\"dataAction(rowIndex,tableCreation.fieldList[dataIndex].fieldName)\" [innerHTML]=\"getData(tableCreation.fieldList[dataIndex],rowIndex)\"></div>\r\n                            </ng-container>\r\n                        </div>\r\n                    </td>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"tableCreation.showDelete || tableCreation.showEdit\">\r\n                    <td id=\"action_{{rowIndex}}\" class=\"actionTd\">\r\n                        <span *ngIf=\"tableCreation.showEdit\" class=\"btn-action edit\" id=\"edit_{{rowIndex}}\"\r\n                              (click)=\"editRow(rowIndex)\"><span\r\n                                class=\"glyphicon glyphicon-edit\"></span></span>\r\n                        <span *ngIf=\"tableCreation.showDelete\" class=\"btn-action delete\" id=\"delete_{{rowIndex}}\"\r\n                              (click)=\"deleteRow(rowIndex)\"><span\r\n                                class=\"glyphicon glyphicon-trash\"></span></span>\r\n                    </td>\r\n                </ng-container>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>\r\n"
            },] }
];
TableComponent.ctorParameters = () => [];
TableComponent.propDecorators = {
    pageNumber: [{ type: Input }],
    sortData: [{ type: Input }],
    tableCreation: [{ type: Input }],
    callBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLXRhYmxlL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBTWhELE1BQU0sT0FBTyxjQUFjO0lBeUIxQjtRQVJVLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsbUJBQWMsR0FBRyxLQUFLLENBQUM7SUFFMUIsQ0FBQztJQXRCRCxJQUFJLFVBQVU7UUFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekIsQ0FBQztJQUFBLENBQUM7SUFDRixJQUFJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQWEsVUFBVSxDQUFDLEdBQUc7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUFBLENBQUM7SUFDRixJQUFhLFFBQVEsQ0FBQyxHQUFHO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO0lBQ3JCLENBQUM7SUFhRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxJ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Q0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc0Jvb2xlYW59IGZyb20gJ0Bhbmd1bGFyLXBhY2thZ2UvdHlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS10YWJsZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuXHRwcml2YXRlIF9wYWdlTnVtYmVyO1xyXG5cdHByaXZhdGUgX3NvcnREYXRhO1xyXG5cdGdldCBwYWdlTnVtYmVyKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhZ2VOdW1iZXI7XHJcblx0fTtcclxuXHRnZXQgc29ydERhdGEoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc29ydERhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHNldCBwYWdlTnVtYmVyKHZhbCkge1xyXG5cdFx0dGhpcy5fcGFnZU51bWJlciA9IHZhbDtcclxuXHR9O1xyXG5cdEBJbnB1dCgpIHNldCBzb3J0RGF0YSh2YWwpIHtcclxuXHRcdHRoaXMuX3NvcnREYXRhID0gdmFsXHJcblx0fVxyXG5cdEBJbnB1dCgpIHRhYmxlQ3JlYXRpb247XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRzb3J0RmllbGQgPSBcIlwiO1xyXG5cdHNvcnRUeXBlID0gXCJBU0NcIjtcclxuXHRjaGVja0RhdGEgPSBbXTtcclxuXHRjaGVja0RhdGFUZW1wID0gW107XHJcbiAgICByYWRpb0RhdGEgPSBcIlwiO1xyXG4gICAgY2hlY2tTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5zb3J0RmllbGQgPSB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0WzBdLmZpZWxkTmFtZTtcclxuXHR9XHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcblx0XHR0aGlzLnByb2Nlc3NDaGVja1NlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0NoZWNrU2VsZWN0QWxsKCkge1xyXG5cdFx0bGV0IGNoZWNrU3RhdHVzU2VsZWN0QWxsID0gdHJ1ZTtcclxuXHRcdGxldCBkYXRhID0gKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YSlcclxuXHRcdGZvciAobGV0IHJvd0luZGV4IGluIGRhdGEpIHtcclxuXHRcdFx0bGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpO1xyXG5cdFx0XHRpZiAoKHR5cGVvZih0aGlzLmNoZWNrRGF0YVtwcmltYXJ5S2V5XSkgPT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmNoZWNrRGF0YVtwcmltYXJ5S2V5XSA9PSBmYWxzZSkgJiYgIXRoaXMuY2hlY2tJZ25vcmUocm93SW5kZXgpKSB7XHJcblx0XHRcdFx0Y2hlY2tTdGF0dXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGNoZWNrU3RhdHVzU2VsZWN0QWxsID09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5jaGVja1NlbGVjdEFsbCA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNoZWNrU2VsZWN0QWxsID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERhdGEoZmllbGREYXRhLHJvdykge1xyXG5cdFx0bGV0IGRhdGFSb3cgPSAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93XTogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93XSk7XHJcblx0XHRsZXQgc3RyRGF0YSA9IFwiXCI7XHJcblx0XHRpZiAoZmllbGREYXRhLmZpZWxkTmFtZS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdGlmIChmaWVsZERhdGEubXVsdGlUeXBlID09IFwiam9pblwiKSB7XHJcblx0XHRcdFx0bGV0IGRhdGFBbGwgPSBbXTtcclxuXHRcdFx0XHRmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGREYXRhLmZpZWxkTmFtZSkge1xyXG5cdFx0XHRcdFx0aWYgKGRhdGFSb3dbZmllbGROYW1lXSAhPSBudWxsICYmIGRhdGFSb3dbZmllbGROYW1lXSAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFBbGwucHVzaChkYXRhUm93W2ZpZWxkTmFtZV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzdHJEYXRhID0gZGF0YUFsbC5qb2luKGZpZWxkRGF0YS5qb2luQ2hhcik7XHJcblx0XHRcdH0gZWxzZSBpZiAoZmllbGREYXRhLm11bHRpVHlwZSA9PSBcIm9uZUZyb21MYXN0XCIpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUFsbCA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZERhdGEuZmllbGROYW1lKSB7XHJcblx0XHRcdFx0XHRkYXRhQWxsLnB1c2goZGF0YVJvd1tmaWVsZE5hbWVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d2hpbGUgKGRhdGFBbGwubGVuZ3RoID4gMCAmJiAoc3RyRGF0YSA9PSBudWxsIHx8IHN0ckRhdGEgPT0gXCJcIikpIHtcclxuXHRcdFx0XHRcdHN0ckRhdGEgPSBkYXRhQWxsLnBvcCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChmaWVsZERhdGEubXVsdGlUeXBlID09IFwib25lRnJvbUZpcnN0XCIpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUFsbCA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZERhdGEuZmllbGROYW1lKSB7XHJcblx0XHRcdFx0XHRkYXRhQWxsLnB1c2goZGF0YVJvd1tmaWVsZE5hbWVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d2hpbGUgKGRhdGFBbGwubGVuZ3RoID4gMCAmJiAoc3RyRGF0YSA9PSBudWxsIHx8IHN0ckRhdGEgPT0gXCJcIikpIHtcclxuXHRcdFx0XHRcdHN0ckRhdGEgPSBkYXRhQWxsLnNoaWZ0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHJEYXRhID0gZGF0YVJvd1tmaWVsZERhdGEuZmllbGROYW1lXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJEYXRhO1xyXG5cdH1cclxuXHRnZXRGaWVsZElkKGZpZWxkRGF0YSkge1xyXG5cclxuXHRcdGxldCBmaWVsZEFycmF5ID0gW107XHJcblx0XHRmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGREYXRhKSB7XHJcblx0XHRcdGZpZWxkQXJyYXkucHVzaChmaWVsZE5hbWUpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGZpZWxkSWQgPSBmaWVsZEFycmF5LmpvaW4oXCJfXCIpO1xyXG5cdFx0cmV0dXJuIGZpZWxkSWQ7XHJcblx0fVxyXG5cdGVkaXRSb3cocm93KSB7XHJcblx0XHRsZXQgcHJpbWFyeUtleUxpc3Q6YW55ID0ge307XHJcblx0XHRsZXQgZGF0YVJvdyA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3ddOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YVtyb3ddKTtcclxuXHRcdGZvcihsZXQgcHJpbWFyeUl0ZW0gb2YgdGhpcy50YWJsZUNyZWF0aW9uLnByaW1hcnlGaWVsZCkge1xyXG5cdFx0XHRpZiAoZGF0YVJvd1twcmltYXJ5SXRlbV0pIHtcclxuXHRcdFx0XHRwcmltYXJ5S2V5TGlzdFtwcmltYXJ5SXRlbV0gPSBkYXRhUm93W3ByaW1hcnlJdGVtXVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUHJpbWFyeSBrZXkgZGF0YSBub3QgZm91bmQ6IFwiK3ByaW1hcnlJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0YWN0aW9uOidlZGl0JyxcclxuXHRcdFx0cm93SW5kZXg6IHJvdyxcclxuXHRcdFx0cm93RGF0YTogZGF0YVJvdyxcclxuXHRcdFx0cHJpbWFyeUtleTogcHJpbWFyeUtleUxpc3RcclxuXHRcdH0pXHJcblx0fVxyXG5cdGRlbGV0ZVJvdyhyb3cpIHtcclxuXHRcdGxldCBwcmltYXJ5S2V5TGlzdDphbnkgPSB7fTtcclxuXHRcdGxldCBkYXRhUm93ID0gKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd106IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd10pO1xyXG5cdFx0Zm9yKGxldCBwcmltYXJ5SXRlbSBvZiB0aGlzLnRhYmxlQ3JlYXRpb24ucHJpbWFyeUZpZWxkKSB7XHJcblx0XHRcdGlmIChkYXRhUm93W3ByaW1hcnlJdGVtXSkge1xyXG5cdFx0XHRcdHByaW1hcnlLZXlMaXN0W3ByaW1hcnlJdGVtXSA9IGRhdGFSb3dbcHJpbWFyeUl0ZW1dXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQcmltYXJ5IGtleSBkYXRhIG5vdCBmb3VuZDogXCIrcHJpbWFyeUl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246J2RlbGV0ZScsXHJcblx0XHRcdHJvd0luZGV4OiByb3csXHJcblx0XHRcdHJvd0RhdGE6IGRhdGFSb3csXHJcblx0XHRcdHByaW1hcnlLZXk6IHByaW1hcnlLZXlMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxuXHRzb3J0QnkoZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy50YWJsZUNyZWF0aW9uLnNvcnRpbmcgPT0gdHJ1ZSAmJiB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0W2RhdGFJbmRleF0uc29ydGluZyAhPSBmYWxzZSkge1xyXG5cdFx0XHRsZXQgc29ydEZpZWxkO1xyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMudGFibGVDcmVhdGlvbi5maWVsZExpc3RbZGF0YUluZGV4XS5maWVsZE5hbWVEYikgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdHNvcnRGaWVsZCA9IHRoaXMudGFibGVDcmVhdGlvbi5maWVsZExpc3RbZGF0YUluZGV4XS5maWVsZE5hbWVEYjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzb3J0RmllbGQgPSB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0W2RhdGFJbmRleF0uZmllbGROYW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBmaWVsZE5hbWUgPSBzb3J0RmllbGQuam9pbihcIixcIik7XHJcblx0XHRcdGlmICh0aGlzLnNvcnRGaWVsZCA9PSBmaWVsZE5hbWUpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5zb3J0VHlwZSA9PSBcIkRFU0NcIikge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3J0VHlwZSA9IFwiQVNDXCJcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3J0VHlwZSA9IFwiREVTQ1wiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydEZpZWxkID0gZmllbGROYW1lO1xyXG5cdFx0XHRcdHRoaXMuc29ydFR5cGUgPSBcIkFTQ1wiO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBzb3J0Qnkgc29ydFR5cGUgPSAnLHRoaXMuc29ydFR5cGUpXHJcblx0XHRcdGxldCBzb3J0ID0gdGhpcy5zb3J0RmllbGQgKyBcIiBcIiArIHRoaXMuc29ydFR5cGU7XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0YWN0aW9uOlwic29ydFwiLFxyXG5cdFx0XHRcdHNvcnRWYWx1ZTpzb3J0LFxyXG5cdFx0XHRcdGZpZWxkTmFtZTogc29ydEZpZWxkLFxyXG5cdFx0XHRcdG9yZGVyOiB0aGlzLnNvcnRUeXBlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZGF0YUFjdGlvbihyb3dOdW0sZmllbGROYW1lKSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246XCJjbGlja19kYXRhXCIsXHJcblx0XHRcdGZpZWxkTmFtZTpmaWVsZE5hbWUuam9pbignLCcpLFxyXG5cdFx0XHRkYXRhOiAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93TnVtXTogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93TnVtXSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNoZWNrQWN0aW9uKHJvd0luZGV4KSB7XHJcblx0XHRsZXQgY2hlY2tTdGF0dXMgPSBcIlwiO1xyXG5cdFx0bGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpXHJcblx0XHRpZiAodGhpcy5jaGVja0RhdGFbcHJpbWFyeUtleV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjaGVja1N0YXR1cyA9IFwiY2hlY2tcIlxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRGF0YVRlbXBbcHJpbWFyeUtleV0gPSBPYmplY3QuYXNzaWduKHt9LCh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF06IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSkpXHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja1N0YXR1cyA9IFwidW5DaGVja1wiXHJcblx0XHRcdGRlbGV0ZSAgdGhpcy5jaGVja0RhdGFUZW1wW3ByaW1hcnlLZXldO1xyXG5cdFx0fVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc0NoZWNrU2VsZWN0QWxsKCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZTogXCJjaGVja0JveFwiLFxyXG4gICAgICAgICAgICBhY3Rpb246Y2hlY2tTdGF0dXMsXHJcbiAgICAgICAgICAgIHByaW1hcnlLZXk6cHJpbWFyeUtleSxcclxuICAgICAgICAgICAgZGF0YTogKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd0luZGV4XTp0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJhZGlvQWN0aW9uKHJvd0luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0dHlwZTogXCJyYWRpb1wiLFxyXG4gICAgICAgICAgICBhY3Rpb246XCJjaGFuZ2VcIixcclxuICAgICAgICAgICAgcHJpbWFyeUtleTp0aGlzLmdldFByaW1hcnkocm93SW5kZXgpLFxyXG4gICAgICAgICAgICBkYXRhOih0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF06dGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpbWFyeShyb3dJbmRleCkge1xyXG5cdFx0bGV0IHByaW1hcnlGaWVsZCA9IHRoaXMudGFibGVDcmVhdGlvbi5wcmltYXJ5RmllbGQ7XHJcbiAgICAgICAgbGV0IGRhdGFSb3cgPSAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93SW5kZXhdOnRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSk7XHJcbiAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBbXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmltYXJ5RmllbGQpKSB7XHJcbiAgICAgICAgXHRmb3IgKGxldCBwcmltYXJ5TGlzdFJvdyBvZiBwcmltYXJ5RmllbGQpIHtcclxuICAgICAgICBcdFx0aWYgKHR5cGVvZihkYXRhUm93W3ByaW1hcnlMaXN0Um93XSkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXkucHVzaChkYXRhUm93W3ByaW1hcnlMaXN0Um93XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgIFx0aWYgKHR5cGVvZihkYXRhUm93W3ByaW1hcnlGaWVsZF0pICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHByaW1hcnlLZXkucHVzaChkYXRhUm93W3ByaW1hcnlGaWVsZF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIHByaW1hcnlLZXkuam9pbihcIl9cIik7XHJcbiAgICB9XHJcbiAgICBnZXRDaGVja2VkTGlzdCgpIHtcclxuXHRcdGxldCBjaGVja0xpc3QgPSBbXTtcclxuXHRcdGZvciAobGV0IGNoZWNrZWRSb3dJbmRleCBpbiB0aGlzLmNoZWNrRGF0YVRlbXApIHtcclxuICAgICAgICAgICAgY2hlY2tMaXN0LnB1c2godGhpcy5jaGVja0RhdGFUZW1wW2NoZWNrZWRSb3dJbmRleF0pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2hlY2tMaXN0O1xyXG5cdH1cclxuICAgIGNsZWFyQ2hlY2tMaXN0KCkge1xyXG5cdFx0dGhpcy5jaGVja0RhdGEgPSBbXTtcclxuXHRcdHRoaXMuY2hlY2tEYXRhVGVtcCA9IFtdO1xyXG5cdFx0dGhpcy5jaGVja1NlbGVjdEFsbCA9IGZhbHNlO1xyXG5cdH1cclxuICAgIGNoZWNrQWN0aW9uQWxsKCkge1xyXG5cdCAgICBsZXQgZGF0YSA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YTp0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YSlcclxuXHRcdGlmICh0aGlzLmNoZWNrU2VsZWN0QWxsID09IHRydWUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggaW4gZGF0YSkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5jaGVja0lnbm9yZShyb3dJbmRleCkpIHtcclxuXHRcdFx0XHRcdGxldCBwcmltYXJ5S2V5ID0gdGhpcy5nZXRQcmltYXJ5KHJvd0luZGV4KTtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tEYXRhW3ByaW1hcnlLZXldID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tEYXRhVGVtcFtwcmltYXJ5S2V5XSA9IE9iamVjdC5hc3NpZ24oe30sZGF0YVtyb3dJbmRleF0pO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0RhdGFbcHJpbWFyeUtleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNoZWNrRGF0YVRlbXBbcHJpbWFyeUtleV1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG4gICAgY2hlY2tJZ25vcmUocm93SW5kZXgpIHtcclxuXHRcdGlmICh0eXBlb2YodGhpcy50YWJsZUNyZWF0aW9uLmlnbm9yZVNlbGVjdCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRsZXQgZGF0YVNwbGl0Q2hlY2sgPSB0aGlzLnRhYmxlQ3JlYXRpb24uaWdub3JlU2VsZWN0LnNwbGl0KFwiOlwiKTtcclxuXHRcdFx0bGV0IGRhdGFGaWVsZCA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF1bZGF0YVNwbGl0Q2hlY2tbMF1dOnRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0pO1xyXG5cdFx0XHRpZiAodHlwZW9mKGRhdGFGaWVsZCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdGlmIChpc0Jvb2xlYW4oZGF0YUZpZWxkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFGaWVsZFxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGF0YVNwbGl0Q2hlY2subGVuZ3RoID09IDIpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0gPT0gZGF0YVNwbGl0Q2hlY2tbMV0pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0gPT0gZGF0YVNwbGl0Q2hlY2tbMV0pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==