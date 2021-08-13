import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
	selector: 'lb9-paging',
	templateUrl: './paging.component.html'
})
export class PagingComponent implements OnInit {
	@Input() currentPage = 1;
	@Input() totalPage = 1;
	@Input() totalRecord = 1;
	@Input() dataRank;
	@Input() customClass;
	@Input() pageControlType = "auto"
	@Input() rowLimit = null
	@Input() rowLimitOption = null
	@Output() pagingProcess = new EventEmitter();
	@Output() rowLimitCallback = new EventEmitter();
	inputWidth;
	tempValue;
	tempTotalPage = 0;
	totalPageCal = 0;
	pageList = [];
	rowLimitOptionValue = 10;
	constructor() {
	}
	ngOnInit() {
		this.inputWidth = ((String(this.totalPage).length * 15)+27)+"px";
		this.rowLimitOptionValue = this.rowLimit
		// console.log(this.rowLimitOptionValue)
	}

	checkInput(event) {
		let modValue = parseInt(String(event.target.value)+event.key);
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
    if(event.code == "NumpadEnter" || event.key == "Enter" || event.code == "Enter"){
      this.checkValue()
    }
		return false;
	}
	goFirst() {
		if (this.currentPage != 1) {
			this.currentPage = 1;
			this.processPaging()
		}
	}
	goLast() {
		if (this.currentPage != this.totalPage) {
			this.currentPage = this.totalPage;
			this.processPaging()
		}
	}
	goPrev() {
		if (this.currentPage != 1) {
			if (this.currentPage > 1) {
				this.currentPage --;
			}
			this.processPaging()
		}
	}
	goNext() {
		if (this.currentPage != this.totalPage) {
			if (this.currentPage < this.totalPage) {
				this.currentPage ++;
			}
			this.processPaging()
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
			this.processPaging()
		}
	}
	getTotalRecordStr() {
		let str = "";
		if (typeof(this.dataRank) != "undefined") {
			str ="Showing "+this.dataRank.begin + " to "+this.dataRank.end+" of "+this.totalRecord;
		}
		return str;
	}
	processPagingBtn(page) {
		if (page != this.currentPage) {
			this.currentPage = page
			this.processPaging();
		}
	}
	processPaging() {
        this.pagingProcess.emit(this.currentPage);
	}
	genPageArray() {
		if (this.tempTotalPage == 0 || this.tempTotalPage != this.totalPage) {
			this.pageList = [];
			for(let i = 1; i <= this.totalPage; i ++) {
				this.pageList.push(i)
			}
			this.tempTotalPage = this.totalPage
		}
		return this.pageList;
	}
	changeRowLimit() {
		this.rowLimitCallback.emit(this.rowLimitOptionValue)
	}
}
