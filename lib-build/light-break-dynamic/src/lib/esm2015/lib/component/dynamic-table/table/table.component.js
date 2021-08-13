import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isBoolean } from 'util';
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
export { TableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy10YWJsZS90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBTS9CLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUF5QjFCO1FBUlUsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixtQkFBYyxHQUFHLEtBQUssQ0FBQztJQUUxQixDQUFDO0lBdEJELElBQUksVUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQUNGLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ1EsSUFBSSxVQUFVLENBQUMsR0FBRztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBQUEsQ0FBQztJQUNPLElBQUksUUFBUSxDQUFDLEdBQUc7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7SUFDckIsQ0FBQztJQWFELFFBQVE7UUFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENB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Z0RBQStCO0FBakI1QixjQUFjO0lBSjFCLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLGdzTEFBcUM7S0FDckMsQ0FBQzs7R0FDVyxjQUFjLENBeVExQjtTQXpRWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzQm9vbGVhbn0gZnJvbSAndXRpbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS10YWJsZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuXHRwcml2YXRlIF9wYWdlTnVtYmVyO1xyXG5cdHByaXZhdGUgX3NvcnREYXRhO1xyXG5cdGdldCBwYWdlTnVtYmVyKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhZ2VOdW1iZXI7XHJcblx0fTtcclxuXHRnZXQgc29ydERhdGEoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc29ydERhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHNldCBwYWdlTnVtYmVyKHZhbCkge1xyXG5cdFx0dGhpcy5fcGFnZU51bWJlciA9IHZhbDtcclxuXHR9O1xyXG5cdEBJbnB1dCgpIHNldCBzb3J0RGF0YSh2YWwpIHtcclxuXHRcdHRoaXMuX3NvcnREYXRhID0gdmFsXHJcblx0fVxyXG5cdEBJbnB1dCgpIHRhYmxlQ3JlYXRpb247XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRzb3J0RmllbGQgPSBcIlwiO1xyXG5cdHNvcnRUeXBlID0gXCJBU0NcIjtcclxuXHRjaGVja0RhdGEgPSBbXTtcclxuXHRjaGVja0RhdGFUZW1wID0gW107XHJcbiAgICByYWRpb0RhdGEgPSBcIlwiO1xyXG4gICAgY2hlY2tTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5zb3J0RmllbGQgPSB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0WzBdLmZpZWxkTmFtZTtcclxuXHR9XHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcblx0XHR0aGlzLnByb2Nlc3NDaGVja1NlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0NoZWNrU2VsZWN0QWxsKCkge1xyXG5cdFx0bGV0IGNoZWNrU3RhdHVzU2VsZWN0QWxsID0gdHJ1ZTtcclxuXHRcdGxldCBkYXRhID0gKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YSlcclxuXHRcdGZvciAobGV0IHJvd0luZGV4IGluIGRhdGEpIHtcclxuXHRcdFx0bGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpO1xyXG5cdFx0XHRpZiAoKHR5cGVvZih0aGlzLmNoZWNrRGF0YVtwcmltYXJ5S2V5XSkgPT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmNoZWNrRGF0YVtwcmltYXJ5S2V5XSA9PSBmYWxzZSkgJiYgIXRoaXMuY2hlY2tJZ25vcmUocm93SW5kZXgpKSB7XHJcblx0XHRcdFx0Y2hlY2tTdGF0dXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGNoZWNrU3RhdHVzU2VsZWN0QWxsID09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5jaGVja1NlbGVjdEFsbCA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNoZWNrU2VsZWN0QWxsID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERhdGEoZmllbGREYXRhLHJvdykge1xyXG5cdFx0bGV0IGRhdGFSb3cgPSAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93XTogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93XSk7XHJcblx0XHRsZXQgc3RyRGF0YSA9IFwiXCI7XHJcblx0XHRpZiAoZmllbGREYXRhLmZpZWxkTmFtZS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdGlmIChmaWVsZERhdGEubXVsdGlUeXBlID09IFwiam9pblwiKSB7XHJcblx0XHRcdFx0bGV0IGRhdGFBbGwgPSBbXTtcclxuXHRcdFx0XHRmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGREYXRhLmZpZWxkTmFtZSkge1xyXG5cdFx0XHRcdFx0aWYgKGRhdGFSb3dbZmllbGROYW1lXSAhPSBudWxsICYmIGRhdGFSb3dbZmllbGROYW1lXSAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFBbGwucHVzaChkYXRhUm93W2ZpZWxkTmFtZV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzdHJEYXRhID0gZGF0YUFsbC5qb2luKGZpZWxkRGF0YS5qb2luQ2hhcik7XHJcblx0XHRcdH0gZWxzZSBpZiAoZmllbGREYXRhLm11bHRpVHlwZSA9PSBcIm9uZUZyb21MYXN0XCIpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUFsbCA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZERhdGEuZmllbGROYW1lKSB7XHJcblx0XHRcdFx0XHRkYXRhQWxsLnB1c2goZGF0YVJvd1tmaWVsZE5hbWVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d2hpbGUgKGRhdGFBbGwubGVuZ3RoID4gMCAmJiAoc3RyRGF0YSA9PSBudWxsIHx8IHN0ckRhdGEgPT0gXCJcIikpIHtcclxuXHRcdFx0XHRcdHN0ckRhdGEgPSBkYXRhQWxsLnBvcCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChmaWVsZERhdGEubXVsdGlUeXBlID09IFwib25lRnJvbUZpcnN0XCIpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUFsbCA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZERhdGEuZmllbGROYW1lKSB7XHJcblx0XHRcdFx0XHRkYXRhQWxsLnB1c2goZGF0YVJvd1tmaWVsZE5hbWVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d2hpbGUgKGRhdGFBbGwubGVuZ3RoID4gMCAmJiAoc3RyRGF0YSA9PSBudWxsIHx8IHN0ckRhdGEgPT0gXCJcIikpIHtcclxuXHRcdFx0XHRcdHN0ckRhdGEgPSBkYXRhQWxsLnNoaWZ0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHJEYXRhID0gZGF0YVJvd1tmaWVsZERhdGEuZmllbGROYW1lXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJEYXRhO1xyXG5cdH1cclxuXHRnZXRGaWVsZElkKGZpZWxkRGF0YSkge1xyXG5cclxuXHRcdGxldCBmaWVsZEFycmF5ID0gW107XHJcblx0XHRmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGREYXRhKSB7XHJcblx0XHRcdGZpZWxkQXJyYXkucHVzaChmaWVsZE5hbWUpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGZpZWxkSWQgPSBmaWVsZEFycmF5LmpvaW4oXCJfXCIpO1xyXG5cdFx0cmV0dXJuIGZpZWxkSWQ7XHJcblx0fVxyXG5cdGVkaXRSb3cocm93KSB7XHJcblx0XHRsZXQgcHJpbWFyeUtleUxpc3Q6YW55ID0ge307XHJcblx0XHRsZXQgZGF0YVJvdyA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3ddOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YVtyb3ddKTtcclxuXHRcdGZvcihsZXQgcHJpbWFyeUl0ZW0gb2YgdGhpcy50YWJsZUNyZWF0aW9uLnByaW1hcnlGaWVsZCkge1xyXG5cdFx0XHRpZiAoZGF0YVJvd1twcmltYXJ5SXRlbV0pIHtcclxuXHRcdFx0XHRwcmltYXJ5S2V5TGlzdFtwcmltYXJ5SXRlbV0gPSBkYXRhUm93W3ByaW1hcnlJdGVtXVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUHJpbWFyeSBrZXkgZGF0YSBub3QgZm91bmQ6IFwiK3ByaW1hcnlJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0YWN0aW9uOidlZGl0JyxcclxuXHRcdFx0cm93SW5kZXg6IHJvdyxcclxuXHRcdFx0cm93RGF0YTogZGF0YVJvdyxcclxuXHRcdFx0cHJpbWFyeUtleTogcHJpbWFyeUtleUxpc3RcclxuXHRcdH0pXHJcblx0fVxyXG5cdGRlbGV0ZVJvdyhyb3cpIHtcclxuXHRcdGxldCBwcmltYXJ5S2V5TGlzdDphbnkgPSB7fTtcclxuXHRcdGxldCBkYXRhUm93ID0gKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd106IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd10pO1xyXG5cdFx0Zm9yKGxldCBwcmltYXJ5SXRlbSBvZiB0aGlzLnRhYmxlQ3JlYXRpb24ucHJpbWFyeUZpZWxkKSB7XHJcblx0XHRcdGlmIChkYXRhUm93W3ByaW1hcnlJdGVtXSkge1xyXG5cdFx0XHRcdHByaW1hcnlLZXlMaXN0W3ByaW1hcnlJdGVtXSA9IGRhdGFSb3dbcHJpbWFyeUl0ZW1dXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQcmltYXJ5IGtleSBkYXRhIG5vdCBmb3VuZDogXCIrcHJpbWFyeUl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246J2RlbGV0ZScsXHJcblx0XHRcdHJvd0luZGV4OiByb3csXHJcblx0XHRcdHJvd0RhdGE6IGRhdGFSb3csXHJcblx0XHRcdHByaW1hcnlLZXk6IHByaW1hcnlLZXlMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxuXHRzb3J0QnkoZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy50YWJsZUNyZWF0aW9uLnNvcnRpbmcgPT0gdHJ1ZSAmJiB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0W2RhdGFJbmRleF0uc29ydGluZyAhPSBmYWxzZSkge1xyXG5cdFx0XHRsZXQgc29ydEZpZWxkO1xyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMudGFibGVDcmVhdGlvbi5maWVsZExpc3RbZGF0YUluZGV4XS5maWVsZE5hbWVEYikgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdHNvcnRGaWVsZCA9IHRoaXMudGFibGVDcmVhdGlvbi5maWVsZExpc3RbZGF0YUluZGV4XS5maWVsZE5hbWVEYjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzb3J0RmllbGQgPSB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0W2RhdGFJbmRleF0uZmllbGROYW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBmaWVsZE5hbWUgPSBzb3J0RmllbGQuam9pbihcIixcIik7XHJcblx0XHRcdGlmICh0aGlzLnNvcnRGaWVsZCA9PSBmaWVsZE5hbWUpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5zb3J0VHlwZSA9PSBcIkRFU0NcIikge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3J0VHlwZSA9IFwiQVNDXCJcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3J0VHlwZSA9IFwiREVTQ1wiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydEZpZWxkID0gZmllbGROYW1lO1xyXG5cdFx0XHRcdHRoaXMuc29ydFR5cGUgPSBcIkFTQ1wiO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBzb3J0Qnkgc29ydFR5cGUgPSAnLHRoaXMuc29ydFR5cGUpXHJcblx0XHRcdGxldCBzb3J0ID0gdGhpcy5zb3J0RmllbGQgKyBcIiBcIiArIHRoaXMuc29ydFR5cGU7XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0YWN0aW9uOlwic29ydFwiLFxyXG5cdFx0XHRcdHNvcnRWYWx1ZTpzb3J0LFxyXG5cdFx0XHRcdGZpZWxkTmFtZTogc29ydEZpZWxkLFxyXG5cdFx0XHRcdG9yZGVyOiB0aGlzLnNvcnRUeXBlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZGF0YUFjdGlvbihyb3dOdW0sZmllbGROYW1lKSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246XCJjbGlja19kYXRhXCIsXHJcblx0XHRcdGZpZWxkTmFtZTpmaWVsZE5hbWUuam9pbignLCcpLFxyXG5cdFx0XHRkYXRhOiAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93TnVtXTogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93TnVtXSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNoZWNrQWN0aW9uKHJvd0luZGV4KSB7XHJcblx0XHRsZXQgY2hlY2tTdGF0dXMgPSBcIlwiO1xyXG5cdFx0bGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpXHJcblx0XHRpZiAodGhpcy5jaGVja0RhdGFbcHJpbWFyeUtleV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjaGVja1N0YXR1cyA9IFwiY2hlY2tcIlxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRGF0YVRlbXBbcHJpbWFyeUtleV0gPSBPYmplY3QuYXNzaWduKHt9LCh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF06IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSkpXHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja1N0YXR1cyA9IFwidW5DaGVja1wiXHJcblx0XHRcdGRlbGV0ZSAgdGhpcy5jaGVja0RhdGFUZW1wW3ByaW1hcnlLZXldO1xyXG5cdFx0fVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc0NoZWNrU2VsZWN0QWxsKCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZTogXCJjaGVja0JveFwiLFxyXG4gICAgICAgICAgICBhY3Rpb246Y2hlY2tTdGF0dXMsXHJcbiAgICAgICAgICAgIHByaW1hcnlLZXk6cHJpbWFyeUtleSxcclxuICAgICAgICAgICAgZGF0YTogKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd0luZGV4XTp0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJhZGlvQWN0aW9uKHJvd0luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0dHlwZTogXCJyYWRpb1wiLFxyXG4gICAgICAgICAgICBhY3Rpb246XCJjaGFuZ2VcIixcclxuICAgICAgICAgICAgcHJpbWFyeUtleTp0aGlzLmdldFByaW1hcnkocm93SW5kZXgpLFxyXG4gICAgICAgICAgICBkYXRhOih0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF06dGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpbWFyeShyb3dJbmRleCkge1xyXG5cdFx0bGV0IHByaW1hcnlGaWVsZCA9IHRoaXMudGFibGVDcmVhdGlvbi5wcmltYXJ5RmllbGQ7XHJcbiAgICAgICAgbGV0IGRhdGFSb3cgPSAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93SW5kZXhdOnRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSk7XHJcbiAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBbXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmltYXJ5RmllbGQpKSB7XHJcbiAgICAgICAgXHRmb3IgKGxldCBwcmltYXJ5TGlzdFJvdyBvZiBwcmltYXJ5RmllbGQpIHtcclxuICAgICAgICBcdFx0aWYgKHR5cGVvZihkYXRhUm93W3ByaW1hcnlMaXN0Um93XSkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXkucHVzaChkYXRhUm93W3ByaW1hcnlMaXN0Um93XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgIFx0aWYgKHR5cGVvZihkYXRhUm93W3ByaW1hcnlGaWVsZF0pICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHByaW1hcnlLZXkucHVzaChkYXRhUm93W3ByaW1hcnlGaWVsZF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIHByaW1hcnlLZXkuam9pbihcIl9cIik7XHJcbiAgICB9XHJcbiAgICBnZXRDaGVja2VkTGlzdCgpIHtcclxuXHRcdGxldCBjaGVja0xpc3QgPSBbXTtcclxuXHRcdGZvciAobGV0IGNoZWNrZWRSb3dJbmRleCBpbiB0aGlzLmNoZWNrRGF0YVRlbXApIHtcclxuICAgICAgICAgICAgY2hlY2tMaXN0LnB1c2godGhpcy5jaGVja0RhdGFUZW1wW2NoZWNrZWRSb3dJbmRleF0pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2hlY2tMaXN0O1xyXG5cdH1cclxuICAgIGNsZWFyQ2hlY2tMaXN0KCkge1xyXG5cdFx0dGhpcy5jaGVja0RhdGEgPSBbXTtcclxuXHRcdHRoaXMuY2hlY2tEYXRhVGVtcCA9IFtdO1xyXG5cdFx0dGhpcy5jaGVja1NlbGVjdEFsbCA9IGZhbHNlO1xyXG5cdH1cclxuICAgIGNoZWNrQWN0aW9uQWxsKCkge1xyXG5cdCAgICBsZXQgZGF0YSA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YTp0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YSlcclxuXHRcdGlmICh0aGlzLmNoZWNrU2VsZWN0QWxsID09IHRydWUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggaW4gZGF0YSkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5jaGVja0lnbm9yZShyb3dJbmRleCkpIHtcclxuXHRcdFx0XHRcdGxldCBwcmltYXJ5S2V5ID0gdGhpcy5nZXRQcmltYXJ5KHJvd0luZGV4KTtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tEYXRhW3ByaW1hcnlLZXldID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tEYXRhVGVtcFtwcmltYXJ5S2V5XSA9IE9iamVjdC5hc3NpZ24oe30sZGF0YVtyb3dJbmRleF0pO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0RhdGFbcHJpbWFyeUtleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNoZWNrRGF0YVRlbXBbcHJpbWFyeUtleV1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG4gICAgY2hlY2tJZ25vcmUocm93SW5kZXgpIHtcclxuXHRcdGlmICh0eXBlb2YodGhpcy50YWJsZUNyZWF0aW9uLmlnbm9yZVNlbGVjdCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRsZXQgZGF0YVNwbGl0Q2hlY2sgPSB0aGlzLnRhYmxlQ3JlYXRpb24uaWdub3JlU2VsZWN0LnNwbGl0KFwiOlwiKTtcclxuXHRcdFx0bGV0IGRhdGFGaWVsZCA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF1bZGF0YVNwbGl0Q2hlY2tbMF1dOnRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0pO1xyXG5cdFx0XHRpZiAodHlwZW9mKGRhdGFGaWVsZCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdGlmIChpc0Jvb2xlYW4oZGF0YUZpZWxkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFGaWVsZFxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGF0YVNwbGl0Q2hlY2subGVuZ3RoID09IDIpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0gPT0gZGF0YVNwbGl0Q2hlY2tbMV0pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0gPT0gZGF0YVNwbGl0Q2hlY2tbMV0pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==