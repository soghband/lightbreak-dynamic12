import { Component, EventEmitter, Input, Output } from '@angular/core';
export class PagingComponent {
    constructor() {
        this.currentPage = 1;
        this.totalPage = 1;
        this.totalRecord = 1;
        this.pageControlType = "auto";
        this.rowLimit = null;
        this.rowLimitOption = null;
        this.pagingProcess = new EventEmitter();
        this.rowLimitCallback = new EventEmitter();
        this.tempTotalPage = 0;
        this.totalPageCal = 0;
        this.pageList = [];
        this.rowLimitOptionValue = 10;
    }
    ngOnInit() {
        this.inputWidth = ((String(this.totalPage).length * 15) + 27) + "px";
        this.rowLimitOptionValue = this.rowLimit;
        // console.log(this.rowLimitOptionValue)
    }
    checkInput(event) {
        let modValue = parseInt(String(event.target.value) + event.key);
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
        if (event.code == "NumpadEnter" || event.key == "Enter" || event.code == "Enter") {
            this.checkValue();
        }
        return false;
    }
    goFirst() {
        if (this.currentPage != 1) {
            this.currentPage = 1;
            this.processPaging();
        }
    }
    goLast() {
        if (this.currentPage != this.totalPage) {
            this.currentPage = this.totalPage;
            this.processPaging();
        }
    }
    goPrev() {
        if (this.currentPage != 1) {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.processPaging();
        }
    }
    goNext() {
        if (this.currentPage != this.totalPage) {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            }
            this.processPaging();
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
            this.processPaging();
        }
    }
    getTotalRecordStr() {
        let str = "";
        if (typeof (this.dataRank) != "undefined") {
            str = "Showing " + this.dataRank.begin + " to " + this.dataRank.end + " of " + this.totalRecord;
        }
        return str;
    }
    processPagingBtn(page) {
        if (page != this.currentPage) {
            this.currentPage = page;
            this.processPaging();
        }
    }
    processPaging() {
        this.pagingProcess.emit(this.currentPage);
    }
    genPageArray() {
        if (this.tempTotalPage == 0 || this.tempTotalPage != this.totalPage) {
            this.pageList = [];
            for (let i = 1; i <= this.totalPage; i++) {
                this.pageList.push(i);
            }
            this.tempTotalPage = this.totalPage;
        }
        return this.pageList;
    }
    changeRowLimit() {
        this.rowLimitCallback.emit(this.rowLimitOptionValue);
    }
}
PagingComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-paging',
                template: "<div id=\"pagingPanel\" class=\"{{customClass ? customClass: ''}}\">\r\n    <div class=\"totalRecord\">{{getTotalRecordStr()}}</div>\r\n\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage > 5) || pageControlType=='input'\">\r\n        <div class=\"first\" id=\"arrowLeftFirst\" (click)=\"goFirst()\">\r\n            <span class=\"glyphicon glyphicon-fast-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n            <!--<div class=\"arrowLeft innerLeftArrow\"></div>-->\r\n        </div>\r\n        <div class=\"previous\" id=\"arrowLeft\" (click)=\"goPrev()\">\r\n            <span class=\"glyphicon glyphicon-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n        </div>\r\n        <input class=\"currentPage\" id=\"inputRow\" type=\"text\" [(ngModel)]=\"currentPage\" max=\"{{totalPage}}\" min=\"1\"\r\n               [style.width]=\"inputWidth\"\r\n               (keydown)=\"checkInput($event)\" (focus)=\"keepValue()\" (blur)=\"checkValue()\"/>\r\n        <div class=\"totalRow\">\r\n            / {{totalPage}}\r\n        </div>\r\n        <div class=\"next\" id=\"arrowNext\" (click)=\"goNext()\">\r\n            <span class=\"glyphicon glyphicon-forward\"></span>\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n        <div class=\"last\" id=\"arrowNextLast\" (click)=\"goLast()\">\r\n            <span class=\"glyphicon glyphicon-fast-forward\"></span>\r\n            <!--<div class=\"arrowRight innerRightArrow\"></div>-->\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n    </div>\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage <= 5) || pageControlType=='button'\">\r\n        <div class=\"pageBtn{{pageNum == currentPage ? ' pageBtnActive': ''}}\" *ngFor=\"let pageNum of genPageArray()\" (click)=\"processPagingBtn(pageNum)\">{{pageNum}}</div>\r\n    </div>\r\n    <div class=\"pageLimitOption\" *ngIf=\"rowLimitOption\">\r\n        <select [(ngModel)]=\"rowLimitOptionValue\" (change)=\"changeRowLimit()\">\r\n            <option *ngFor=\"let value of rowLimitOption\" [value]=\"value\">{{value}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n"
            },] }
];
PagingComponent.ctorParameters = () => [];
PagingComponent.propDecorators = {
    currentPage: [{ type: Input }],
    totalPage: [{ type: Input }],
    totalRecord: [{ type: Input }],
    dataRank: [{ type: Input }],
    customClass: [{ type: Input }],
    pageControlType: [{ type: Input }],
    rowLimit: [{ type: Input }],
    rowLimitOption: [{ type: Input }],
    pagingProcess: [{ type: Output }],
    rowLimitCallback: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy10YWJsZS9wYWdpbmcvcGFnaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSzdFLE1BQU0sT0FBTyxlQUFlO0lBaUIzQjtRQWhCUyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFHaEIsb0JBQWUsR0FBRyxNQUFNLENBQUE7UUFDeEIsYUFBUSxHQUFHLElBQUksQ0FBQTtRQUNmLG1CQUFjLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2hELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCx3QkFBbUIsR0FBRyxFQUFFLENBQUM7SUFFekIsQ0FBQztJQUNELFFBQVE7UUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDakUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDeEMsd0NBQXdDO0lBQ3pDLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNmLElBQUksUUFBUSxHQUFH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QUNMLE1BQU07K0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LXBhZ2luZycsXHJcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2luZy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhZ2luZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgY3VycmVudFBhZ2UgPSAxO1xyXG5cdEBJbnB1dCgpIHRvdGFsUGFnZSA9IDE7XHJcblx0QElucHV0KCkgdG90YWxSZWNvcmQgPSAxO1xyXG5cdEBJbnB1dCgpIGRhdGFSYW5rO1xyXG5cdEBJbnB1dCgpIGN1c3RvbUNsYXNzO1xyXG5cdEBJbnB1dCgpIHBhZ2VDb250cm9sVHlwZSA9IFwiYXV0b1wiXHJcblx0QElucHV0KCkgcm93TGltaXQgPSBudWxsXHJcblx0QElucHV0KCkgcm93TGltaXRPcHRpb24gPSBudWxsXHJcblx0QE91dHB1dCgpIHBhZ2luZ1Byb2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHJvd0xpbWl0Q2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0aW5wdXRXaWR0aDtcclxuXHR0ZW1wVmFsdWU7XHJcblx0dGVtcFRvdGFsUGFnZSA9IDA7XHJcblx0dG90YWxQYWdlQ2FsID0gMDtcclxuXHRwYWdlTGlzdCA9IFtdO1xyXG5cdHJvd0xpbWl0T3B0aW9uVmFsdWUgPSAxMDtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmlucHV0V2lkdGggPSAoKFN0cmluZyh0aGlzLnRvdGFsUGFnZSkubGVuZ3RoICogMTUpKzI3KStcInB4XCI7XHJcblx0XHR0aGlzLnJvd0xpbWl0T3B0aW9uVmFsdWUgPSB0aGlzLnJvd0xpbWl0XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnJvd0xpbWl0T3B0aW9uVmFsdWUpXHJcblx0fVxyXG5cclxuXHRjaGVja0lucHV0KGV2ZW50KSB7XHJcblx0XHRsZXQgbW9kVmFsdWUgPSBwYXJzZUludChTdHJpbmcoZXZlbnQudGFyZ2V0LnZhbHVlKStldmVudC5rZXkpO1xyXG5cdFx0aWYgKChldmVudC5rZXkubWF0Y2goL14oWzAtOV0pJC8pXHJcblx0XHRcdHx8IChldmVudC5jdHJsS2V5ID09IHRydWUgJiYgKGV2ZW50LmNvZGUgPT0gXCJLZXlWXCIgfHwgZXZlbnQuY29kZSA9PSBcIktleUNcIikpXHJcblx0XHRcdHx8IGV2ZW50LmNvZGUgPT0gXCJCYWNrc3BhY2VcIlxyXG5cdFx0XHR8fCBldmVudC5jb2RlID09IFwiQXJyb3dVcFwiXHJcblx0XHRcdHx8IGV2ZW50LmNvZGUgPT0gXCJBcnJvd0Rvd25cIlxyXG5cdFx0XHR8fCBldmVudC5jb2RlID09IFwiQXJyb3dMZWZ0XCJcclxuXHRcdFx0fHwgZXZlbnQuY29kZSA9PSBcIkFycm93UmlnaHRcIlxyXG5cdFx0XHR8fCBldmVudC5jb2RlID09IFwiVGFiXCIpICYmIG1vZFZhbHVlIDw9IHRoaXMudG90YWxQYWdlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG4gICAgaWYoZXZlbnQuY29kZSA9PSBcIk51bXBhZEVudGVyXCIgfHwgZXZlbnQua2V5ID09IFwiRW50ZXJcIiB8fCBldmVudC5jb2RlID09IFwiRW50ZXJcIil7XHJcbiAgICAgIHRoaXMuY2hlY2tWYWx1ZSgpXHJcbiAgICB9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdGdvRmlyc3QoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSAxKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSAxO1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnb0xhc3QoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSB0aGlzLnRvdGFsUGFnZSkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy50b3RhbFBhZ2U7XHJcblx0XHRcdHRoaXMucHJvY2Vzc1BhZ2luZygpXHJcblx0XHR9XHJcblx0fVxyXG5cdGdvUHJldigpIHtcclxuXHRcdGlmICh0aGlzLmN1cnJlbnRQYWdlICE9IDEpIHtcclxuXHRcdFx0aWYgKHRoaXMuY3VycmVudFBhZ2UgPiAxKSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSAtLTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnb05leHQoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSB0aGlzLnRvdGFsUGFnZSkge1xyXG5cdFx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSA8IHRoaXMudG90YWxQYWdlKSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSArKztcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRrZWVwVmFsdWUoKSB7XHJcblx0XHR0aGlzLnRlbXBWYWx1ZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcblx0fVxyXG5cdGNoZWNrVmFsdWUoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSA9PSAwIHx8IHRoaXMuY3VycmVudFBhZ2UgPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy50ZW1wVmFsdWU7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSB0aGlzLnRlbXBWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRUb3RhbFJlY29yZFN0cigpIHtcclxuXHRcdGxldCBzdHIgPSBcIlwiO1xyXG5cdFx0aWYgKHR5cGVvZih0aGlzLmRhdGFSYW5rKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdHN0ciA9XCJTaG93aW5nIFwiK3RoaXMuZGF0YVJhbmsuYmVnaW4gKyBcIiB0byBcIit0aGlzLmRhdGFSYW5rLmVuZCtcIiBvZiBcIit0aGlzLnRvdGFsUmVjb3JkO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcblx0cHJvY2Vzc1BhZ2luZ0J0bihwYWdlKSB7XHJcblx0XHRpZiAocGFnZSAhPSB0aGlzLmN1cnJlbnRQYWdlKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlXHJcblx0XHRcdHRoaXMucHJvY2Vzc1BhZ2luZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzUGFnaW5nKCkge1xyXG4gICAgICAgIHRoaXMucGFnaW5nUHJvY2Vzcy5lbWl0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG5cdH1cclxuXHRnZW5QYWdlQXJyYXkoKSB7XHJcblx0XHRpZiAodGhpcy50ZW1wVG90YWxQYWdlID09IDAgfHwgdGhpcy50ZW1wVG90YWxQYWdlICE9IHRoaXMudG90YWxQYWdlKSB7XHJcblx0XHRcdHRoaXMucGFnZUxpc3QgPSBbXTtcclxuXHRcdFx0Zm9yKGxldCBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZTsgaSArKykge1xyXG5cdFx0XHRcdHRoaXMucGFnZUxpc3QucHVzaChpKVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudGVtcFRvdGFsUGFnZSA9IHRoaXMudG90YWxQYWdlXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlTGlzdDtcclxuXHR9XHJcblx0Y2hhbmdlUm93TGltaXQoKSB7XHJcblx0XHR0aGlzLnJvd0xpbWl0Q2FsbGJhY2suZW1pdCh0aGlzLnJvd0xpbWl0T3B0aW9uVmFsdWUpXHJcblx0fVxyXG59XHJcbiJdfQ==