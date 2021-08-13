import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PagingComponent = /** @class */ (function () {
    function PagingComponent() {
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
    PagingComponent.prototype.ngOnInit = function () {
        this.inputWidth = ((String(this.totalPage).length * 15) + 27) + "px";
        this.rowLimitOptionValue = this.rowLimit;
        // console.log(this.rowLimitOptionValue)
    };
    PagingComponent.prototype.checkInput = function (event) {
        var modValue = parseInt(String(event.target.value) + event.key);
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
    };
    PagingComponent.prototype.goFirst = function () {
        if (this.currentPage != 1) {
            this.currentPage = 1;
            this.processPaging();
        }
    };
    PagingComponent.prototype.goLast = function () {
        if (this.currentPage != this.totalPage) {
            this.currentPage = this.totalPage;
            this.processPaging();
        }
    };
    PagingComponent.prototype.goPrev = function () {
        if (this.currentPage != 1) {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.processPaging();
        }
    };
    PagingComponent.prototype.goNext = function () {
        if (this.currentPage != this.totalPage) {
            if (this.currentPage < this.totalPage) {
                this.currentPage++;
            }
            this.processPaging();
        }
    };
    PagingComponent.prototype.keepValue = function () {
        this.tempValue = this.currentPage;
    };
    PagingComponent.prototype.checkValue = function () {
        if (this.currentPage == 0 || this.currentPage == null) {
            this.currentPage = this.tempValue;
        }
        if (this.currentPage != this.tempValue) {
            this.processPaging();
        }
    };
    PagingComponent.prototype.getTotalRecordStr = function () {
        var str = "";
        if (typeof (this.dataRank) != "undefined") {
            str = "Showing " + this.dataRank.begin + " to " + this.dataRank.end + " of " + this.totalRecord;
        }
        return str;
    };
    PagingComponent.prototype.processPagingBtn = function (page) {
        if (page != this.currentPage) {
            this.currentPage = page;
            this.processPaging();
        }
    };
    PagingComponent.prototype.processPaging = function () {
        this.pagingProcess.emit(this.currentPage);
    };
    PagingComponent.prototype.genPageArray = function () {
        if (this.tempTotalPage == 0 || this.tempTotalPage != this.totalPage) {
            this.pageList = [];
            for (var i = 1; i <= this.totalPage; i++) {
                this.pageList.push(i);
            }
            this.tempTotalPage = this.totalPage;
        }
        return this.pageList;
    };
    PagingComponent.prototype.changeRowLimit = function () {
        this.rowLimitCallback.emit(this.rowLimitOptionValue);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "currentPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "totalPage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "totalRecord", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "dataRank", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "customClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "pageControlType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "rowLimit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "rowLimitOption", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "pagingProcess", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PagingComponent.prototype, "rowLimitCallback", void 0);
    PagingComponent = __decorate([
        Component({
            selector: 'lb9-paging',
            template: "<div id=\"pagingPanel\" class=\"{{customClass ? customClass: ''}}\">\r\n    <div class=\"totalRecord\">{{getTotalRecordStr()}}</div>\r\n\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage > 5) || pageControlType=='input'\">\r\n        <div class=\"first\" id=\"arrowLeftFirst\" (click)=\"goFirst()\">\r\n            <span class=\"glyphicon glyphicon-fast-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n            <!--<div class=\"arrowLeft innerLeftArrow\"></div>-->\r\n        </div>\r\n        <div class=\"previous\" id=\"arrowLeft\" (click)=\"goPrev()\">\r\n            <span class=\"glyphicon glyphicon-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n        </div>\r\n        <input class=\"currentPage\" id=\"inputRow\" type=\"text\" [(ngModel)]=\"currentPage\" max=\"{{totalPage}}\" min=\"1\"\r\n               [style.width]=\"inputWidth\"\r\n               (keydown)=\"checkInput($event)\" (focus)=\"keepValue()\" (blur)=\"checkValue()\"/>\r\n        <div class=\"totalRow\">\r\n            / {{totalPage}}\r\n        </div>\r\n        <div class=\"next\" id=\"arrowNext\" (click)=\"goNext()\">\r\n            <span class=\"glyphicon glyphicon-forward\"></span>\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n        <div class=\"last\" id=\"arrowNextLast\" (click)=\"goLast()\">\r\n            <span class=\"glyphicon glyphicon-fast-forward\"></span>\r\n            <!--<div class=\"arrowRight innerRightArrow\"></div>-->\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n    </div>\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage <= 5) || pageControlType=='button'\">\r\n        <div class=\"pageBtn{{pageNum == currentPage ? ' pageBtnActive': ''}}\" *ngFor=\"let pageNum of genPageArray()\" (click)=\"processPagingBtn(pageNum)\">{{pageNum}}</div>\r\n    </div>\r\n    <div class=\"pageLimitOption\" *ngIf=\"rowLimitOption\">\r\n        <select [(ngModel)]=\"rowLimitOptionValue\" (change)=\"changeRowLimit()\">\r\n            <option *ngFor=\"let value of rowLimitOption\" [value]=\"value\">{{value}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n"
        }),
        __metadata("design:paramtypes", [])
    ], PagingComponent);
    return PagingComponent;
}());
export { PagingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtdGFibGUvcGFnaW5nL3BhZ2luZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLN0U7SUFpQkM7UUFoQlMsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBR2hCLG9CQUFlLEdBQUcsTUFBTSxDQUFBO1FBQ3hCLGFBQVEsR0FBRyxJQUFJLENBQUE7UUFDZixtQkFBYyxHQUFHLElBQUksQ0FBQTtRQUNwQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdoRCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO0lBRXpCLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3hDLHdDQUF3QztJQUN6QyxDQUFDO0lBRUQsb0NBQVUsR0FBVixVQUFXLEtBQUs7UUFDZixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FB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VDtRQUFSLEtBQUssRUFBRTs7d0RBQWE7SUFDWjtRQUFSLEtBQUssRUFBRTs7NERBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOztxREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7MkRBQXNCO0lBQ3BCO1FBQVQsTUFBTSxFQUFFOzswREFBb0M7SUFDbkM7UUFBVCxNQUFNLEVBQUU7OzZEQUF1QztJQVZwQyxlQUFlO1FBSjNCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLG93RUFBc0M7U0FDdEMsQ0FBQzs7T0FDVyxlQUFlLENBOEczQjtJQUFELHNCQUFDO0NBQUEsQUE5R0QsSUE4R0M7U0E5R1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LXBhZ2luZycsXHJcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2luZy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhZ2luZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgY3VycmVudFBhZ2UgPSAxO1xyXG5cdEBJbnB1dCgpIHRvdGFsUGFnZSA9IDE7XHJcblx0QElucHV0KCkgdG90YWxSZWNvcmQgPSAxO1xyXG5cdEBJbnB1dCgpIGRhdGFSYW5rO1xyXG5cdEBJbnB1dCgpIGN1c3RvbUNsYXNzO1xyXG5cdEBJbnB1dCgpIHBhZ2VDb250cm9sVHlwZSA9IFwiYXV0b1wiXHJcblx0QElucHV0KCkgcm93TGltaXQgPSBudWxsXHJcblx0QElucHV0KCkgcm93TGltaXRPcHRpb24gPSBudWxsXHJcblx0QE91dHB1dCgpIHBhZ2luZ1Byb2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHJvd0xpbWl0Q2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0aW5wdXRXaWR0aDtcclxuXHR0ZW1wVmFsdWU7XHJcblx0dGVtcFRvdGFsUGFnZSA9IDA7XHJcblx0dG90YWxQYWdlQ2FsID0gMDtcclxuXHRwYWdlTGlzdCA9IFtdO1xyXG5cdHJvd0xpbWl0T3B0aW9uVmFsdWUgPSAxMDtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmlucHV0V2lkdGggPSAoKFN0cmluZyh0aGlzLnRvdGFsUGFnZSkubGVuZ3RoICogMTUpKzI3KStcInB4XCI7XHJcblx0XHR0aGlzLnJvd0xpbWl0T3B0aW9uVmFsdWUgPSB0aGlzLnJvd0xpbWl0XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnJvd0xpbWl0T3B0aW9uVmFsdWUpXHJcblx0fVxyXG5cclxuXHRjaGVja0lucHV0KGV2ZW50KSB7XHJcblx0XHRsZXQgbW9kVmFsdWUgPSBwYXJzZUludChTdHJpbmcoZXZlbnQudGFyZ2V0LnZhbHVlKStldmVudC5rZXkpO1xyXG5cdFx0aWYgKChldmVudC5rZXkubWF0Y2goL14oWzAtOV0pJC8pXHJcblx0XHRcdHx8IChldmVudC5jdHJsS2V5ID09IHRydWUgJiYgKGV2ZW50LmNvZGUgPT0gXCJLZXlWXCIgfHwgZXZlbnQuY29kZSA9PSBcIktleUNcIikpXHJcblx0XHRcdHx8IGV2ZW50LmNvZGUgPT0gXCJCYWNrc3BhY2VcIlxyXG5cdFx0XHR8fCBldmVudC5jb2RlID09IFwiQXJyb3dVcFwiXHJcblx0XHRcdHx8IGV2ZW50LmNvZGUgPT0gXCJBcnJvd0Rvd25cIlxyXG5cdFx0XHR8fCBldmVudC5jb2RlID09IFwiQXJyb3dMZWZ0XCJcclxuXHRcdFx0fHwgZXZlbnQuY29kZSA9PSBcIkFycm93UmlnaHRcIlxyXG5cdFx0XHR8fCBldmVudC5jb2RlID09IFwiVGFiXCIpICYmIG1vZFZhbHVlIDw9IHRoaXMudG90YWxQYWdlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG4gICAgaWYoZXZlbnQuY29kZSA9PSBcIk51bXBhZEVudGVyXCIgfHwgZXZlbnQua2V5ID09IFwiRW50ZXJcIiB8fCBldmVudC5jb2RlID09IFwiRW50ZXJcIil7XHJcbiAgICAgIHRoaXMuY2hlY2tWYWx1ZSgpXHJcbiAgICB9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdGdvRmlyc3QoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSAxKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSAxO1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnb0xhc3QoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSB0aGlzLnRvdGFsUGFnZSkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy50b3RhbFBhZ2U7XHJcblx0XHRcdHRoaXMucHJvY2Vzc1BhZ2luZygpXHJcblx0XHR9XHJcblx0fVxyXG5cdGdvUHJldigpIHtcclxuXHRcdGlmICh0aGlzLmN1cnJlbnRQYWdlICE9IDEpIHtcclxuXHRcdFx0aWYgKHRoaXMuY3VycmVudFBhZ2UgPiAxKSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSAtLTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnb05leHQoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSB0aGlzLnRvdGFsUGFnZSkge1xyXG5cdFx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSA8IHRoaXMudG90YWxQYWdlKSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSArKztcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRrZWVwVmFsdWUoKSB7XHJcblx0XHR0aGlzLnRlbXBWYWx1ZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcblx0fVxyXG5cdGNoZWNrVmFsdWUoKSB7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSA9PSAwIHx8IHRoaXMuY3VycmVudFBhZ2UgPT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy50ZW1wVmFsdWU7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGFnZSAhPSB0aGlzLnRlbXBWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NQYWdpbmcoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRUb3RhbFJlY29yZFN0cigpIHtcclxuXHRcdGxldCBzdHIgPSBcIlwiO1xyXG5cdFx0aWYgKHR5cGVvZih0aGlzLmRhdGFSYW5rKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdHN0ciA9XCJTaG93aW5nIFwiK3RoaXMuZGF0YVJhbmsuYmVnaW4gKyBcIiB0byBcIit0aGlzLmRhdGFSYW5rLmVuZCtcIiBvZiBcIit0aGlzLnRvdGFsUmVjb3JkO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcblx0cHJvY2Vzc1BhZ2luZ0J0bihwYWdlKSB7XHJcblx0XHRpZiAocGFnZSAhPSB0aGlzLmN1cnJlbnRQYWdlKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlXHJcblx0XHRcdHRoaXMucHJvY2Vzc1BhZ2luZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzUGFnaW5nKCkge1xyXG4gICAgICAgIHRoaXMucGFnaW5nUHJvY2Vzcy5lbWl0KHRoaXMuY3VycmVudFBhZ2UpO1xyXG5cdH1cclxuXHRnZW5QYWdlQXJyYXkoKSB7XHJcblx0XHRpZiAodGhpcy50ZW1wVG90YWxQYWdlID09IDAgfHwgdGhpcy50ZW1wVG90YWxQYWdlICE9IHRoaXMudG90YWxQYWdlKSB7XHJcblx0XHRcdHRoaXMucGFnZUxpc3QgPSBbXTtcclxuXHRcdFx0Zm9yKGxldCBpID0gMTsgaSA8PSB0aGlzLnRvdGFsUGFnZTsgaSArKykge1xyXG5cdFx0XHRcdHRoaXMucGFnZUxpc3QucHVzaChpKVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudGVtcFRvdGFsUGFnZSA9IHRoaXMudG90YWxQYWdlXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5wYWdlTGlzdDtcclxuXHR9XHJcblx0Y2hhbmdlUm93TGltaXQoKSB7XHJcblx0XHR0aGlzLnJvd0xpbWl0Q2FsbGJhY2suZW1pdCh0aGlzLnJvd0xpbWl0T3B0aW9uVmFsdWUpXHJcblx0fVxyXG59XHJcbiJdfQ==