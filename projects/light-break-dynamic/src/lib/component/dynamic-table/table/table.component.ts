import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {isBoolean} from '@angular-package/type';

@Component({
	selector: 'lb12-table',
	templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges  {

	private _pageNumber;
	private _sortData;
	get pageNumber() {
		return this._pageNumber;
	};
	get sortData() {
		return this._sortData;
	}
	@Input() set pageNumber(val) {
		this._pageNumber = val;
	};
	@Input() set sortData(val) {
		this._sortData = val
	}
	@Input() tableCreation;
	@Output() callBack = new EventEmitter();
	objKeys = Object.keys;
	sortField = "";
	sortType = "ASC";
	checkData = [];
	checkDataTemp = [];
    radioData = "";
    checkSelectAll = false;
	constructor() {
	}

	ngOnInit() {
		this.sortField = this.tableCreation.fieldList[0].fieldName;
	}
    ngOnChanges(changes: SimpleChanges): void {
		this.processCheckSelectAll();
    }
    processCheckSelectAll() {
		let checkStatusSelectAll = true;
		let data = (this.tableCreation.data.data ? this.tableCreation.data.data: this.tableCreation.data)
		for (let rowIndex in data) {
			let primaryKey = this.getPrimary(rowIndex);
			if ((typeof(this.checkData[primaryKey]) == "undefined" || this.checkData[primaryKey] == false) && !this.checkIgnore(rowIndex)) {
				checkStatusSelectAll = false;
				break;
			}
		}
		if (checkStatusSelectAll == true) {
			this.checkSelectAll = true;
		} else {
			this.checkSelectAll = false;
		}
	}
	getData(fieldData,row) {
		let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row]: this.tableCreation.data[row]);
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
			} else if (fieldData.multiType == "oneFromLast") {
				let dataAll = [];
				for (let fieldName of fieldData.fieldName) {
					dataAll.push(dataRow[fieldName]);
				}
				while (dataAll.length > 0 && (strData == null || strData == "")) {
					strData = dataAll.pop();
				}
			} else if (fieldData.multiType == "oneFromFirst") {
				let dataAll = [];
				for (let fieldName of fieldData.fieldName) {
					dataAll.push(dataRow[fieldName]);
				}
				while (dataAll.length > 0 && (strData == null || strData == "")) {
					strData = dataAll.shift();
				}
			}
		} else {
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
		let primaryKeyList:any = {};
		let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row]: this.tableCreation.data[row]);
		for(let primaryItem of this.tableCreation.primaryField) {
			if (dataRow[primaryItem]) {
				primaryKeyList[primaryItem] = dataRow[primaryItem]
			} else {
				console.log("Primary key data not found: "+primaryItem);
			}
		}
		this.callBack.emit({
			action:'edit',
			rowIndex: row,
			rowData: dataRow,
			primaryKey: primaryKeyList
		})
	}
	deleteRow(row) {
		let primaryKeyList:any = {};
		let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row]: this.tableCreation.data[row]);
		for(let primaryItem of this.tableCreation.primaryField) {
			if (dataRow[primaryItem]) {
				primaryKeyList[primaryItem] = dataRow[primaryItem]
			} else {
				console.log("Primary key data not found: "+primaryItem);
			}
		}
		this.callBack.emit({
			action:'delete',
			rowIndex: row,
			rowData: dataRow,
			primaryKey: primaryKeyList
		})
	}
	sortBy(dataIndex) {
		if (this.tableCreation.sorting == true && this.tableCreation.fieldList[dataIndex].sorting != false) {
			let sortField;
			if (typeof(this.tableCreation.fieldList[dataIndex].fieldNameDb) != "undefined") {
				sortField = this.tableCreation.fieldList[dataIndex].fieldNameDb;
			} else {
				sortField = this.tableCreation.fieldList[dataIndex].fieldName;
			}
			let fieldName = sortField.join(",");
			if (this.sortField == fieldName) {
				if (this.sortType == "DESC") {
					this.sortType = "ASC"
				} else {
					this.sortType = "DESC"
				}
			} else {
				this.sortField = fieldName;
				this.sortType = "ASC";
			}
			// console.log('function sortBy sortType = ',this.sortType)
			let sort = this.sortField + " " + this.sortType;
			this.callBack.emit({
				action:"sort",
				sortValue:sort,
				fieldName: sortField,
				order: this.sortType
			});
		}
	}

	dataAction(rowNum,fieldName) {
		this.callBack.emit({
			action:"click_data",
			fieldName:fieldName.join(','),
			data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowNum]: this.tableCreation.data[rowNum])
		})
	}

    checkAction(rowIndex) {
		let checkStatus = "";
		let primaryKey = this.getPrimary(rowIndex)
		if (this.checkData[primaryKey] == true) {
            checkStatus = "check"
            this.checkDataTemp[primaryKey] = Object.assign({},(this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex]: this.tableCreation.data[rowIndex]))
		} else {
            checkStatus = "unCheck"
			delete  this.checkDataTemp[primaryKey];
		}
        this.processCheckSelectAll();
        this.callBack.emit({
            type: "checkBox",
            action:checkStatus,
            primaryKey:primaryKey,
            data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex]:this.tableCreation.data[rowIndex])
        })
    }
    radioAction(rowIndex) {
        this.callBack.emit({
			type: "radio",
            action:"change",
            primaryKey:this.getPrimary(rowIndex),
            data:(this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex]:this.tableCreation.data[rowIndex])
        })
    }

    getPrimary(rowIndex) {
		let primaryField = this.tableCreation.primaryField;
        let dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex]:this.tableCreation.data[rowIndex]);
        let primaryKey = [];
        if (Array.isArray(primaryField)) {
        	for (let primaryListRow of primaryField) {
        		if (typeof(dataRow[primaryListRow]) != "undefined") {
                    primaryKey.push(dataRow[primaryListRow]);
				}
			}
		} else {
        	if (typeof(dataRow[primaryField]) != "undefined") {
                primaryKey.push(dataRow[primaryField]);
			}
		}
        return primaryKey.join("_");
    }
    getCheckedList() {
		let checkList = [];
		for (let checkedRowIndex in this.checkDataTemp) {
            checkList.push(this.checkDataTemp[checkedRowIndex])
		}
		return checkList;
	}
    clearCheckList() {
		this.checkData = [];
		this.checkDataTemp = [];
		this.checkSelectAll = false;
	}
    checkActionAll() {
	    let data = (this.tableCreation.data.data ? this.tableCreation.data.data:this.tableCreation.data)
		if (this.checkSelectAll == true) {
            for (let rowIndex in data) {
				if (!this.checkIgnore(rowIndex)) {
					let primaryKey = this.getPrimary(rowIndex);
					this.checkData[primaryKey] = true;
					this.checkDataTemp[primaryKey] = Object.assign({},data[rowIndex]);
				}
            }
		} else {
            for (let rowIndex in data) {
                let primaryKey = this.getPrimary(rowIndex);
                this.checkData[primaryKey] = false;
                delete this.checkDataTemp[primaryKey]
            }
		}

	}

    checkIgnore(rowIndex) {
		if (typeof(this.tableCreation.ignoreSelect) != "undefined") {
			let dataSplitCheck = this.tableCreation.ignoreSelect.split(":");
			let dataField = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex][dataSplitCheck[0]]:this.tableCreation.data[rowIndex][dataSplitCheck[0]]);
			if (typeof(dataField) != "undefined") {
				if (isBoolean(dataField)) {
					return dataField
				} else if (dataSplitCheck.length == 2) {
					if (this.tableCreation.data.data) {
						if (this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
							return true;
						}
					} else {
						if (this.tableCreation.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
							return true;
						}
					}
				} else {
					return false;
				}
			}
        }
		return false;
    }
}
