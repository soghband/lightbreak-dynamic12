import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableComponent} from './table/table.component';

@Component({
	selector: 'lb12-dynamic-table',
	templateUrl: './dynamic-table.component.html'
})
export class DynamicTableComponent implements OnInit {
	@ViewChild("tableID", { static: false }) tableRef: TableComponent;
	@Input() tableCreation;
	@Output() callBack = new EventEmitter();
	currentPage = 1;
	sortData = "";
	constructor() {

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
			totalPage = Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum)
		} else if (this.tableCreation.pagination && this.tableCreation.pagination.totalRowNum) {
			totalPage = Math.ceil(this.tableCreation.pagination.totalRowNum / this.tableCreation.rowLimit)
		}
		return totalPage;
	}

	getPageRank() {
		let beginRecord = null;
		let endRecode = null;
		if (this.tableCreation.data.pageRowNum) {
			beginRecord	= (((this.currentPage-1)*parseInt(this.tableCreation.data.pageRowNum))+1);
			endRecode = (((this.currentPage-1)*parseInt(this.tableCreation.data.pageRowNum)) + this.tableCreation.data.data.length);
		} else {
			beginRecord	= (((this.currentPage-1)*parseInt(this.tableCreation.rowLimit))+1);
			endRecode = (((this.currentPage-1)*parseInt(this.tableCreation.rowLimit)) + this.tableCreation.data.length);
		}
	
		return {
			begin:beginRecord,
			end:endRecode
		}
	}

	processPagingCallBack(data) {
		this.currentPage = data;
		this.callBack.emit({
				action: "page",
				pageNumber: data,
				limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
			}
		)
	}
	processRowLimitCallBack(data) {
		this.tableCreation.rowLimit = data
		this.callBack.emit({
				action: "page",
				pageNumber: 1,
				limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
			}
		)
	}
	getCheckedList() {
		return this.tableRef.getCheckedList();
	}
	clearCheckedList() {
		this.tableRef.clearCheckList();
	}
}
