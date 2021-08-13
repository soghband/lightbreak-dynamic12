import { __decorate, __metadata, __values } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isBoolean } from 'util';
var TableComponent = /** @class */ (function () {
    function TableComponent() {
        this.callBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.sortField = "";
        this.sortType = "ASC";
        this.checkData = [];
        this.checkDataTemp = [];
        this.radioData = "";
        this.checkSelectAll = false;
    }
    Object.defineProperty(TableComponent.prototype, "pageNumber", {
        get: function () {
            return this._pageNumber;
        },
        set: function (val) {
            this._pageNumber = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TableComponent.prototype, "sortData", {
        get: function () {
            return this._sortData;
        },
        set: function (val) {
            this._sortData = val;
        },
        enumerable: true,
        configurable: true
    });
    ;
    TableComponent.prototype.ngOnInit = function () {
        this.sortField = this.tableCreation.fieldList[0].fieldName;
    };
    TableComponent.prototype.ngOnChanges = function (changes) {
        this.processCheckSelectAll();
    };
    TableComponent.prototype.processCheckSelectAll = function () {
        var checkStatusSelectAll = true;
        var data = (this.tableCreation.data.data ? this.tableCreation.data.data : this.tableCreation.data);
        for (var rowIndex in data) {
            var primaryKey = this.getPrimary(rowIndex);
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
    };
    TableComponent.prototype.getData = function (fieldData, row) {
        var e_1, _a, e_2, _b, e_3, _c;
        var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
        var strData = "";
        if (fieldData.fieldName.length > 1) {
            if (fieldData.multiType == "join") {
                var dataAll = [];
                try {
                    for (var _d = __values(fieldData.fieldName), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var fieldName = _e.value;
                        if (dataRow[fieldName] != null && dataRow[fieldName] != "") {
                            dataAll.push(dataRow[fieldName]);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                strData = dataAll.join(fieldData.joinChar);
            }
            else if (fieldData.multiType == "oneFromLast") {
                var dataAll = [];
                try {
                    for (var _f = __values(fieldData.fieldName), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var fieldName = _g.value;
                        dataAll.push(dataRow[fieldName]);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                while (dataAll.length > 0 && (strData == null || strData == "")) {
                    strData = dataAll.pop();
                }
            }
            else if (fieldData.multiType == "oneFromFirst") {
                var dataAll = [];
                try {
                    for (var _h = __values(fieldData.fieldName), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var fieldName = _j.value;
                        dataAll.push(dataRow[fieldName]);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_3) throw e_3.error; }
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
    };
    TableComponent.prototype.getFieldId = function (fieldData) {
        var e_4, _a;
        var fieldArray = [];
        try {
            for (var fieldData_1 = __values(fieldData), fieldData_1_1 = fieldData_1.next(); !fieldData_1_1.done; fieldData_1_1 = fieldData_1.next()) {
                var fieldName = fieldData_1_1.value;
                fieldArray.push(fieldName);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (fieldData_1_1 && !fieldData_1_1.done && (_a = fieldData_1.return)) _a.call(fieldData_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        var fieldId = fieldArray.join("_");
        return fieldId;
    };
    TableComponent.prototype.editRow = function (row) {
        var e_5, _a;
        var primaryKeyList = {};
        var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
        try {
            for (var _b = __values(this.tableCreation.primaryField), _c = _b.next(); !_c.done; _c = _b.next()) {
                var primaryItem = _c.value;
                if (dataRow[primaryItem]) {
                    primaryKeyList[primaryItem] = dataRow[primaryItem];
                }
                else {
                    console.log("Primary key data not found: " + primaryItem);
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
        this.callBack.emit({
            action: 'edit',
            rowIndex: row,
            rowData: dataRow,
            primaryKey: primaryKeyList
        });
    };
    TableComponent.prototype.deleteRow = function (row) {
        var e_6, _a;
        var primaryKeyList = {};
        var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
        try {
            for (var _b = __values(this.tableCreation.primaryField), _c = _b.next(); !_c.done; _c = _b.next()) {
                var primaryItem = _c.value;
                if (dataRow[primaryItem]) {
                    primaryKeyList[primaryItem] = dataRow[primaryItem];
                }
                else {
                    console.log("Primary key data not found: " + primaryItem);
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
        this.callBack.emit({
            action: 'delete',
            rowIndex: row,
            rowData: dataRow,
            primaryKey: primaryKeyList
        });
    };
    TableComponent.prototype.sortBy = function (dataIndex) {
        if (this.tableCreation.sorting == true && this.tableCreation.fieldList[dataIndex].sorting != false) {
            var sortField = void 0;
            if (typeof (this.tableCreation.fieldList[dataIndex].fieldNameDb) != "undefined") {
                sortField = this.tableCreation.fieldList[dataIndex].fieldNameDb;
            }
            else {
                sortField = this.tableCreation.fieldList[dataIndex].fieldName;
            }
            var fieldName = sortField.join(",");
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
            var sort = this.sortField + " " + this.sortType;
            this.callBack.emit({
                action: "sort",
                sortValue: sort,
                fieldName: sortField,
                order: this.sortType
            });
        }
    };
    TableComponent.prototype.dataAction = function (rowNum, fieldName) {
        this.callBack.emit({
            action: "click_data",
            fieldName: fieldName.join(','),
            data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowNum] : this.tableCreation.data[rowNum])
        });
    };
    TableComponent.prototype.checkAction = function (rowIndex) {
        var checkStatus = "";
        var primaryKey = this.getPrimary(rowIndex);
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
    };
    TableComponent.prototype.radioAction = function (rowIndex) {
        this.callBack.emit({
            type: "radio",
            action: "change",
            primaryKey: this.getPrimary(rowIndex),
            data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex])
        });
    };
    TableComponent.prototype.getPrimary = function (rowIndex) {
        var e_7, _a;
        var primaryField = this.tableCreation.primaryField;
        var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex]);
        var primaryKey = [];
        if (Array.isArray(primaryField)) {
            try {
                for (var primaryField_1 = __values(primaryField), primaryField_1_1 = primaryField_1.next(); !primaryField_1_1.done; primaryField_1_1 = primaryField_1.next()) {
                    var primaryListRow = primaryField_1_1.value;
                    if (typeof (dataRow[primaryListRow]) != "undefined") {
                        primaryKey.push(dataRow[primaryListRow]);
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (primaryField_1_1 && !primaryField_1_1.done && (_a = primaryField_1.return)) _a.call(primaryField_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        else {
            if (typeof (dataRow[primaryField]) != "undefined") {
                primaryKey.push(dataRow[primaryField]);
            }
        }
        return primaryKey.join("_");
    };
    TableComponent.prototype.getCheckedList = function () {
        var checkList = [];
        for (var checkedRowIndex in this.checkDataTemp) {
            checkList.push(this.checkDataTemp[checkedRowIndex]);
        }
        return checkList;
    };
    TableComponent.prototype.clearCheckList = function () {
        this.checkData = [];
        this.checkDataTemp = [];
        this.checkSelectAll = false;
    };
    TableComponent.prototype.checkActionAll = function () {
        var data = (this.tableCreation.data.data ? this.tableCreation.data.data : this.tableCreation.data);
        if (this.checkSelectAll == true) {
            for (var rowIndex in data) {
                if (!this.checkIgnore(rowIndex)) {
                    var primaryKey = this.getPrimary(rowIndex);
                    this.checkData[primaryKey] = true;
                    this.checkDataTemp[primaryKey] = Object.assign({}, data[rowIndex]);
                }
            }
        }
        else {
            for (var rowIndex in data) {
                var primaryKey = this.getPrimary(rowIndex);
                this.checkData[primaryKey] = false;
                delete this.checkDataTemp[primaryKey];
            }
        }
    };
    TableComponent.prototype.checkIgnore = function (rowIndex) {
        if (typeof (this.tableCreation.ignoreSelect) != "undefined") {
            var dataSplitCheck = this.tableCreation.ignoreSelect.split(":");
            var dataField = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] : this.tableCreation.data[rowIndex][dataSplitCheck[0]]);
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
    return TableComponent;
}());
export { TableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy10YWJsZS90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBTS9CO0lBeUJDO1FBUlUsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixtQkFBYyxHQUFHLEtBQUssQ0FBQztJQUUxQixDQUFDO0lBdEJELHNCQUFJLHNDQUFVO2FBQWQ7WUFDQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUlRLFVBQWUsR0FBRztZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN4QixDQUFDOzs7T0FOQTtJQUFBLENBQUM7SUFDRixzQkFBSSxvQ0FBUTthQUFaO1lBQ0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLENBQUM7YUFJUSxVQUFhLEdBQUc7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7UUFDckIsQ0FBQzs7O09BTkE7SUFHQSxDQUFDO0lBZ0JGLGlDQUFRLEdBQVI7UUFDQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFD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LGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDbkYsT0FBTyxJQUFJLENBQUM7eUJBQ1o7cUJBQ0Q7eUJBQU07d0JBQ04sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQzlFLE9BQU8sSUFBSSxDQUFDO3lCQUNaO3FCQUNEO2lCQUNEO3FCQUFNO29CQUNOLE9BQU8sS0FBSyxDQUFDO2lCQUNiO2FBQ0Q7U0FDSztRQUNQLE9BQU8sS0FBSyxDQUFDO0lBQ1gsQ0FBQztJQTlQSztRQUFSLEtBQUssRUFBRTs7O29EQUVQO0lBQ1E7UUFBUixLQUFLLEVBQUU7OztrREFFUDtJQUNRO1FBQVIsS0FBSyxFQUFFOzt5REFBZTtJQUNiO1FBQVQsTUFBTSxFQUFFOztvREFBK0I7SUFqQjVCLGNBQWM7UUFKMUIsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsZ3NMQUFxQztTQUNyQyxDQUFDOztPQUNXLGNBQWMsQ0F5UTFCO0lBQUQscUJBQUM7Q0FBQSxBQXpRRCxJQXlRQztTQXpRWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2lzQm9vbGVhbn0gZnJvbSAndXRpbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS10YWJsZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuXHRwcml2YXRlIF9wYWdlTnVtYmVyO1xyXG5cdHByaXZhdGUgX3NvcnREYXRhO1xyXG5cdGdldCBwYWdlTnVtYmVyKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhZ2VOdW1iZXI7XHJcblx0fTtcclxuXHRnZXQgc29ydERhdGEoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc29ydERhdGE7XHJcblx0fVxyXG5cdEBJbnB1dCgpIHNldCBwYWdlTnVtYmVyKHZhbCkge1xyXG5cdFx0dGhpcy5fcGFnZU51bWJlciA9IHZhbDtcclxuXHR9O1xyXG5cdEBJbnB1dCgpIHNldCBzb3J0RGF0YSh2YWwpIHtcclxuXHRcdHRoaXMuX3NvcnREYXRhID0gdmFsXHJcblx0fVxyXG5cdEBJbnB1dCgpIHRhYmxlQ3JlYXRpb247XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRzb3J0RmllbGQgPSBcIlwiO1xyXG5cdHNvcnRUeXBlID0gXCJBU0NcIjtcclxuXHRjaGVja0RhdGEgPSBbXTtcclxuXHRjaGVja0RhdGFUZW1wID0gW107XHJcbiAgICByYWRpb0RhdGEgPSBcIlwiO1xyXG4gICAgY2hlY2tTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5zb3J0RmllbGQgPSB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0WzBdLmZpZWxkTmFtZTtcclxuXHR9XHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcblx0XHR0aGlzLnByb2Nlc3NDaGVja1NlbGVjdEFsbCgpO1xyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0NoZWNrU2VsZWN0QWxsKCkge1xyXG5cdFx0bGV0IGNoZWNrU3RhdHVzU2VsZWN0QWxsID0gdHJ1ZTtcclxuXHRcdGxldCBkYXRhID0gKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YSlcclxuXHRcdGZvciAobGV0IHJvd0luZGV4IGluIGRhdGEpIHtcclxuXHRcdFx0bGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpO1xyXG5cdFx0XHRpZiAoKHR5cGVvZih0aGlzLmNoZWNrRGF0YVtwcmltYXJ5S2V5XSkgPT0gXCJ1bmRlZmluZWRcIiB8fCB0aGlzLmNoZWNrRGF0YVtwcmltYXJ5S2V5XSA9PSBmYWxzZSkgJiYgIXRoaXMuY2hlY2tJZ25vcmUocm93SW5kZXgpKSB7XHJcblx0XHRcdFx0Y2hlY2tTdGF0dXNTZWxlY3RBbGwgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGNoZWNrU3RhdHVzU2VsZWN0QWxsID09IHRydWUpIHtcclxuXHRcdFx0dGhpcy5jaGVja1NlbGVjdEFsbCA9IHRydWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNoZWNrU2VsZWN0QWxsID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERhdGEoZmllbGREYXRhLHJvdykge1xyXG5cdFx0bGV0IGRhdGFSb3cgPSAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93XTogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93XSk7XHJcblx0XHRsZXQgc3RyRGF0YSA9IFwiXCI7XHJcblx0XHRpZiAoZmllbGREYXRhLmZpZWxkTmFtZS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdGlmIChmaWVsZERhdGEubXVsdGlUeXBlID09IFwiam9pblwiKSB7XHJcblx0XHRcdFx0bGV0IGRhdGFBbGwgPSBbXTtcclxuXHRcdFx0XHRmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGREYXRhLmZpZWxkTmFtZSkge1xyXG5cdFx0XHRcdFx0aWYgKGRhdGFSb3dbZmllbGROYW1lXSAhPSBudWxsICYmIGRhdGFSb3dbZmllbGROYW1lXSAhPSBcIlwiKSB7XHJcblx0XHRcdFx0XHRcdGRhdGFBbGwucHVzaChkYXRhUm93W2ZpZWxkTmFtZV0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzdHJEYXRhID0gZGF0YUFsbC5qb2luKGZpZWxkRGF0YS5qb2luQ2hhcik7XHJcblx0XHRcdH0gZWxzZSBpZiAoZmllbGREYXRhLm11bHRpVHlwZSA9PSBcIm9uZUZyb21MYXN0XCIpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUFsbCA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZERhdGEuZmllbGROYW1lKSB7XHJcblx0XHRcdFx0XHRkYXRhQWxsLnB1c2goZGF0YVJvd1tmaWVsZE5hbWVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d2hpbGUgKGRhdGFBbGwubGVuZ3RoID4gMCAmJiAoc3RyRGF0YSA9PSBudWxsIHx8IHN0ckRhdGEgPT0gXCJcIikpIHtcclxuXHRcdFx0XHRcdHN0ckRhdGEgPSBkYXRhQWxsLnBvcCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChmaWVsZERhdGEubXVsdGlUeXBlID09IFwib25lRnJvbUZpcnN0XCIpIHtcclxuXHRcdFx0XHRsZXQgZGF0YUFsbCA9IFtdO1xyXG5cdFx0XHRcdGZvciAobGV0IGZpZWxkTmFtZSBvZiBmaWVsZERhdGEuZmllbGROYW1lKSB7XHJcblx0XHRcdFx0XHRkYXRhQWxsLnB1c2goZGF0YVJvd1tmaWVsZE5hbWVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0d2hpbGUgKGRhdGFBbGwubGVuZ3RoID4gMCAmJiAoc3RyRGF0YSA9PSBudWxsIHx8IHN0ckRhdGEgPT0gXCJcIikpIHtcclxuXHRcdFx0XHRcdHN0ckRhdGEgPSBkYXRhQWxsLnNoaWZ0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHJEYXRhID0gZGF0YVJvd1tmaWVsZERhdGEuZmllbGROYW1lXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdHJEYXRhO1xyXG5cdH1cclxuXHRnZXRGaWVsZElkKGZpZWxkRGF0YSkge1xyXG5cclxuXHRcdGxldCBmaWVsZEFycmF5ID0gW107XHJcblx0XHRmb3IgKGxldCBmaWVsZE5hbWUgb2YgZmllbGREYXRhKSB7XHJcblx0XHRcdGZpZWxkQXJyYXkucHVzaChmaWVsZE5hbWUpO1xyXG5cdFx0fVxyXG5cdFx0bGV0IGZpZWxkSWQgPSBmaWVsZEFycmF5LmpvaW4oXCJfXCIpO1xyXG5cdFx0cmV0dXJuIGZpZWxkSWQ7XHJcblx0fVxyXG5cdGVkaXRSb3cocm93KSB7XHJcblx0XHRsZXQgcHJpbWFyeUtleUxpc3Q6YW55ID0ge307XHJcblx0XHRsZXQgZGF0YVJvdyA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3ddOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YVtyb3ddKTtcclxuXHRcdGZvcihsZXQgcHJpbWFyeUl0ZW0gb2YgdGhpcy50YWJsZUNyZWF0aW9uLnByaW1hcnlGaWVsZCkge1xyXG5cdFx0XHRpZiAoZGF0YVJvd1twcmltYXJ5SXRlbV0pIHtcclxuXHRcdFx0XHRwcmltYXJ5S2V5TGlzdFtwcmltYXJ5SXRlbV0gPSBkYXRhUm93W3ByaW1hcnlJdGVtXVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUHJpbWFyeSBrZXkgZGF0YSBub3QgZm91bmQ6IFwiK3ByaW1hcnlJdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0YWN0aW9uOidlZGl0JyxcclxuXHRcdFx0cm93SW5kZXg6IHJvdyxcclxuXHRcdFx0cm93RGF0YTogZGF0YVJvdyxcclxuXHRcdFx0cHJpbWFyeUtleTogcHJpbWFyeUtleUxpc3RcclxuXHRcdH0pXHJcblx0fVxyXG5cdGRlbGV0ZVJvdyhyb3cpIHtcclxuXHRcdGxldCBwcmltYXJ5S2V5TGlzdDphbnkgPSB7fTtcclxuXHRcdGxldCBkYXRhUm93ID0gKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd106IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd10pO1xyXG5cdFx0Zm9yKGxldCBwcmltYXJ5SXRlbSBvZiB0aGlzLnRhYmxlQ3JlYXRpb24ucHJpbWFyeUZpZWxkKSB7XHJcblx0XHRcdGlmIChkYXRhUm93W3ByaW1hcnlJdGVtXSkge1xyXG5cdFx0XHRcdHByaW1hcnlLZXlMaXN0W3ByaW1hcnlJdGVtXSA9IGRhdGFSb3dbcHJpbWFyeUl0ZW1dXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQcmltYXJ5IGtleSBkYXRhIG5vdCBmb3VuZDogXCIrcHJpbWFyeUl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246J2RlbGV0ZScsXHJcblx0XHRcdHJvd0luZGV4OiByb3csXHJcblx0XHRcdHJvd0RhdGE6IGRhdGFSb3csXHJcblx0XHRcdHByaW1hcnlLZXk6IHByaW1hcnlLZXlMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxuXHRzb3J0QnkoZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy50YWJsZUNyZWF0aW9uLnNvcnRpbmcgPT0gdHJ1ZSAmJiB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0W2RhdGFJbmRleF0uc29ydGluZyAhPSBmYWxzZSkge1xyXG5cdFx0XHRsZXQgc29ydEZpZWxkO1xyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMudGFibGVDcmVhdGlvbi5maWVsZExpc3RbZGF0YUluZGV4XS5maWVsZE5hbWVEYikgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdHNvcnRGaWVsZCA9IHRoaXMudGFibGVDcmVhdGlvbi5maWVsZExpc3RbZGF0YUluZGV4XS5maWVsZE5hbWVEYjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzb3J0RmllbGQgPSB0aGlzLnRhYmxlQ3JlYXRpb24uZmllbGRMaXN0W2RhdGFJbmRleF0uZmllbGROYW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBmaWVsZE5hbWUgPSBzb3J0RmllbGQuam9pbihcIixcIik7XHJcblx0XHRcdGlmICh0aGlzLnNvcnRGaWVsZCA9PSBmaWVsZE5hbWUpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5zb3J0VHlwZSA9PSBcIkRFU0NcIikge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3J0VHlwZSA9IFwiQVNDXCJcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3J0VHlwZSA9IFwiREVTQ1wiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc29ydEZpZWxkID0gZmllbGROYW1lO1xyXG5cdFx0XHRcdHRoaXMuc29ydFR5cGUgPSBcIkFTQ1wiO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdmdW5jdGlvbiBzb3J0Qnkgc29ydFR5cGUgPSAnLHRoaXMuc29ydFR5cGUpXHJcblx0XHRcdGxldCBzb3J0ID0gdGhpcy5zb3J0RmllbGQgKyBcIiBcIiArIHRoaXMuc29ydFR5cGU7XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0YWN0aW9uOlwic29ydFwiLFxyXG5cdFx0XHRcdHNvcnRWYWx1ZTpzb3J0LFxyXG5cdFx0XHRcdGZpZWxkTmFtZTogc29ydEZpZWxkLFxyXG5cdFx0XHRcdG9yZGVyOiB0aGlzLnNvcnRUeXBlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZGF0YUFjdGlvbihyb3dOdW0sZmllbGROYW1lKSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246XCJjbGlja19kYXRhXCIsXHJcblx0XHRcdGZpZWxkTmFtZTpmaWVsZE5hbWUuam9pbignLCcpLFxyXG5cdFx0XHRkYXRhOiAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93TnVtXTogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93TnVtXSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNoZWNrQWN0aW9uKHJvd0luZGV4KSB7XHJcblx0XHRsZXQgY2hlY2tTdGF0dXMgPSBcIlwiO1xyXG5cdFx0bGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpXHJcblx0XHRpZiAodGhpcy5jaGVja0RhdGFbcHJpbWFyeUtleV0gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjaGVja1N0YXR1cyA9IFwiY2hlY2tcIlxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRGF0YVRlbXBbcHJpbWFyeUtleV0gPSBPYmplY3QuYXNzaWduKHt9LCh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF06IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSkpXHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja1N0YXR1cyA9IFwidW5DaGVja1wiXHJcblx0XHRcdGRlbGV0ZSAgdGhpcy5jaGVja0RhdGFUZW1wW3ByaW1hcnlLZXldO1xyXG5cdFx0fVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc0NoZWNrU2VsZWN0QWxsKCk7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgdHlwZTogXCJjaGVja0JveFwiLFxyXG4gICAgICAgICAgICBhY3Rpb246Y2hlY2tTdGF0dXMsXHJcbiAgICAgICAgICAgIHByaW1hcnlLZXk6cHJpbWFyeUtleSxcclxuICAgICAgICAgICAgZGF0YTogKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEgPyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd0luZGV4XTp0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YVtyb3dJbmRleF0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJhZGlvQWN0aW9uKHJvd0luZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0dHlwZTogXCJyYWRpb1wiLFxyXG4gICAgICAgICAgICBhY3Rpb246XCJjaGFuZ2VcIixcclxuICAgICAgICAgICAgcHJpbWFyeUtleTp0aGlzLmdldFByaW1hcnkocm93SW5kZXgpLFxyXG4gICAgICAgICAgICBkYXRhOih0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF06dGhpcy50YWJsZUNyZWF0aW9uLmRhdGFbcm93SW5kZXhdKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJpbWFyeShyb3dJbmRleCkge1xyXG5cdFx0bGV0IHByaW1hcnlGaWVsZCA9IHRoaXMudGFibGVDcmVhdGlvbi5wcmltYXJ5RmllbGQ7XHJcbiAgICAgICAgbGV0IGRhdGFSb3cgPSAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YSA/IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGFbcm93SW5kZXhdOnRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XSk7XHJcbiAgICAgICAgbGV0IHByaW1hcnlLZXkgPSBbXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmltYXJ5RmllbGQpKSB7XHJcbiAgICAgICAgXHRmb3IgKGxldCBwcmltYXJ5TGlzdFJvdyBvZiBwcmltYXJ5RmllbGQpIHtcclxuICAgICAgICBcdFx0aWYgKHR5cGVvZihkYXRhUm93W3ByaW1hcnlMaXN0Um93XSkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXkucHVzaChkYXRhUm93W3ByaW1hcnlMaXN0Um93XSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG4gICAgICAgIFx0aWYgKHR5cGVvZihkYXRhUm93W3ByaW1hcnlGaWVsZF0pICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHByaW1hcnlLZXkucHVzaChkYXRhUm93W3ByaW1hcnlGaWVsZF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuIHByaW1hcnlLZXkuam9pbihcIl9cIik7XHJcbiAgICB9XHJcbiAgICBnZXRDaGVja2VkTGlzdCgpIHtcclxuXHRcdGxldCBjaGVja0xpc3QgPSBbXTtcclxuXHRcdGZvciAobGV0IGNoZWNrZWRSb3dJbmRleCBpbiB0aGlzLmNoZWNrRGF0YVRlbXApIHtcclxuICAgICAgICAgICAgY2hlY2tMaXN0LnB1c2godGhpcy5jaGVja0RhdGFUZW1wW2NoZWNrZWRSb3dJbmRleF0pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY2hlY2tMaXN0O1xyXG5cdH1cclxuICAgIGNsZWFyQ2hlY2tMaXN0KCkge1xyXG5cdFx0dGhpcy5jaGVja0RhdGEgPSBbXTtcclxuXHRcdHRoaXMuY2hlY2tEYXRhVGVtcCA9IFtdO1xyXG5cdFx0dGhpcy5jaGVja1NlbGVjdEFsbCA9IGZhbHNlO1xyXG5cdH1cclxuICAgIGNoZWNrQWN0aW9uQWxsKCkge1xyXG5cdCAgICBsZXQgZGF0YSA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YTp0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YSlcclxuXHRcdGlmICh0aGlzLmNoZWNrU2VsZWN0QWxsID09IHRydWUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggaW4gZGF0YSkge1xyXG5cdFx0XHRcdGlmICghdGhpcy5jaGVja0lnbm9yZShyb3dJbmRleCkpIHtcclxuXHRcdFx0XHRcdGxldCBwcmltYXJ5S2V5ID0gdGhpcy5nZXRQcmltYXJ5KHJvd0luZGV4KTtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tEYXRhW3ByaW1hcnlLZXldID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHRoaXMuY2hlY2tEYXRhVGVtcFtwcmltYXJ5S2V5XSA9IE9iamVjdC5hc3NpZ24oe30sZGF0YVtyb3dJbmRleF0pO1xyXG5cdFx0XHRcdH1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgcm93SW5kZXggaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByaW1hcnlLZXkgPSB0aGlzLmdldFByaW1hcnkocm93SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0RhdGFbcHJpbWFyeUtleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNoZWNrRGF0YVRlbXBbcHJpbWFyeUtleV1cclxuICAgICAgICAgICAgfVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG4gICAgY2hlY2tJZ25vcmUocm93SW5kZXgpIHtcclxuXHRcdGlmICh0eXBlb2YodGhpcy50YWJsZUNyZWF0aW9uLmlnbm9yZVNlbGVjdCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRsZXQgZGF0YVNwbGl0Q2hlY2sgPSB0aGlzLnRhYmxlQ3JlYXRpb24uaWdub3JlU2VsZWN0LnNwbGl0KFwiOlwiKTtcclxuXHRcdFx0bGV0IGRhdGFGaWVsZCA9ICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhID8gdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEuZGF0YVtyb3dJbmRleF1bZGF0YVNwbGl0Q2hlY2tbMF1dOnRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0pO1xyXG5cdFx0XHRpZiAodHlwZW9mKGRhdGFGaWVsZCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdGlmIChpc0Jvb2xlYW4oZGF0YUZpZWxkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGFGaWVsZFxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZGF0YVNwbGl0Q2hlY2subGVuZ3RoID09IDIpIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0gPT0gZGF0YVNwbGl0Q2hlY2tbMV0pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhW3Jvd0luZGV4XVtkYXRhU3BsaXRDaGVja1swXV0gPT0gZGF0YVNwbGl0Q2hlY2tbMV0pIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==