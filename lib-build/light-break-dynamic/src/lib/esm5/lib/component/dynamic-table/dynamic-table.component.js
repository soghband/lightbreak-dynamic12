import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
var DynamicTableComponent = /** @class */ (function () {
    function DynamicTableComponent() {
        this.callBack = new EventEmitter();
        this.currentPage = 1;
        this.sortData = "";
    }
    DynamicTableComponent.prototype.ngOnInit = function () {
    };
    DynamicTableComponent.prototype.processCallBack = function (data) {
        this.callBack.emit(data);
        this.sortData = data.sortValue;
    };
    DynamicTableComponent.prototype.getTotalPage = function () {
        var totalPage = null;
        if (this.tableCreation.data.totalRecord) {
            totalPage = Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum);
        }
        else if (this.tableCreation.pagination && this.tableCreation.pagination.totalRowNum) {
            totalPage = Math.ceil(this.tableCreation.pagination.totalRowNum / this.tableCreation.rowLimit);
        }
        return totalPage;
    };
    DynamicTableComponent.prototype.getPageRank = function () {
        var beginRecord = null;
        var endRecode = null;
        if (this.tableCreation.data.pageRowNum) {
            beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + 1);
            endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + this.tableCreation.data.data.length);
        }
        else {
            beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.rowLimit)) + 1);
            endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.rowLimit)) + this.tableCreation.data.length);
        }
        return {
            begin: beginRecord,
            end: endRecode
        };
    };
    DynamicTableComponent.prototype.processPagingCallBack = function (data) {
        this.currentPage = data;
        this.callBack.emit({
            action: "page",
            pageNumber: data,
            limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
        });
    };
    DynamicTableComponent.prototype.processRowLimitCallBack = function (data) {
        this.tableCreation.rowLimit = data;
        this.callBack.emit({
            action: "page",
            pageNumber: 1,
            limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
        });
    };
    DynamicTableComponent.prototype.getCheckedList = function () {
        return this.tableRef.getCheckedList();
    };
    DynamicTableComponent.prototype.clearCheckedList = function () {
        this.tableRef.clearCheckList();
    };
    __decorate([
        ViewChild("tableID", { static: false }),
        __metadata("design:type", TableComponent)
    ], DynamicTableComponent.prototype, "tableRef", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "tableCreation", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicTableComponent.prototype, "callBack", void 0);
    DynamicTableComponent = __decorate([
        Component({
            selector: 'lb9-dynamic-table',
            template: "<ng-container *ngIf=\"tableCreation.data\">\r\n    <lb9-table [tableCreation]=\"tableCreation\"\r\n                [pageNumber]=\"currentPage\" \r\n                [sortData]=\"sortData\" #tableID \r\n                (callBack)=\"processCallBack($event)\"></lb9-table>\r\n                \r\n    <lb9-paging *ngIf=\"tableCreation.showPaging\" [currentPage]=\"currentPage\"\r\n                [totalPage]=\"getTotalPage()\"\r\n                [dataRank]=\"getPageRank()\"\r\n                [totalRecord]=\"(tableCreation.data.totalRecord ? tableCreation.data.totalRecord : tableCreation.pagination.totalRowNum)\"\r\n                [customClass]=\"tableCreation.customClassPaging\"\r\n                [pageControlType]=\"tableCreation.pageControlType\"\r\n                [rowLimit]=\"tableCreation.rowLimit\"\r\n                [rowLimitOption]=\"tableCreation.rowLimitOption\"\r\n                (pagingProcess)=\"processPagingCallBack($event)\"\r\n                (rowLimitCallback)=\"processRowLimitCallBack($event)\"></lb9-paging>\r\n</ng-container>\r\n<ng-container *ngIf=\"!tableCreation.data\">\r\n    <div class=\"listDataNotFound\" [innerHTML]=\"tableCreation.dataNotFoundString ? tableCreation.dataNotFoundString:'Data Not Found.'\">\r\n\r\n    </div>\r\n</ng-container>\r\n"
        }),
        __metadata("design:paramtypes", [])
    ], DynamicTableComponent);
    return DynamicTableComponent;
}());
export { DynamicTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLXRhYmxlL2R5bmFtaWMtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFNdkQ7SUFNQztRQUhVLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFHZCxDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtJQUVBLENBQUM7SUFDRCwrQ0FBZSxHQUFmLFVBQWdCLElBQUk7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFDRCw0Q0FBWSxHQUFaO1FBQ0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUMvRjthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQ3RGLFNBQVMs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QVcsY0FBYzsyREFBQztJQUN6RDtRQUFSLEtBQUssRUFBRTs7Z0VBQWU7SUFDYjtRQUFULE1BQU0sRUFBRTs7MkRBQStCO0lBSDVCLHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGl4Q0FBNkM7U0FDN0MsQ0FBQzs7T0FDVyxxQkFBcUIsQ0FtRWpDO0lBQUQsNEJBQUM7Q0FBQSxBQW5FRCxJQW1FQztTQW5FWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7VGFibGVDb21wb25lbnR9IGZyb20gJy4vdGFibGUvdGFibGUuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtdGFibGUnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLXRhYmxlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY1RhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRAVmlld0NoaWxkKFwidGFibGVJRFwiLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFibGVSZWY6IFRhYmxlQ29tcG9uZW50O1xyXG5cdEBJbnB1dCgpIHRhYmxlQ3JlYXRpb247XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdGN1cnJlbnRQYWdlID0gMTtcclxuXHRzb3J0RGF0YSA9IFwiXCI7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdH1cclxuXHRuZ09uSW5pdCgpIHtcclxuXHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsQmFjayhkYXRhKSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoZGF0YSk7XHJcblx0XHR0aGlzLnNvcnREYXRhID0gZGF0YS5zb3J0VmFsdWU7XHJcblx0fVxyXG5cdGdldFRvdGFsUGFnZSgpIHtcclxuXHRcdGxldCB0b3RhbFBhZ2UgPSBudWxsO1xyXG5cdFx0aWYgKHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLnRvdGFsUmVjb3JkKSB7XHJcblx0XHRcdHRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS50b3RhbFJlY29yZCAvIHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLnBhZ2VSb3dOdW0pXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMudGFibGVDcmVhdGlvbi5wYWdpbmF0aW9uICYmIHRoaXMudGFibGVDcmVhdGlvbi5wYWdpbmF0aW9uLnRvdGFsUm93TnVtKSB7XHJcblx0XHRcdHRvdGFsUGFnZSA9IE1hdGguY2VpbCh0aGlzLnRhYmxlQ3JlYXRpb24ucGFnaW5hdGlvbi50b3RhbFJvd051bSAvIHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0b3RhbFBhZ2U7XHJcblx0fVxyXG5cclxuXHRnZXRQYWdlUmFuaygpIHtcclxuXHRcdGxldCBiZWdpblJlY29yZCA9IG51bGw7XHJcblx0XHRsZXQgZW5kUmVjb2RlID0gbnVsbDtcclxuXHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5wYWdlUm93TnVtKSB7XHJcblx0XHRcdGJlZ2luUmVjb3JkXHQ9ICgoKHRoaXMuY3VycmVudFBhZ2UtMSkqcGFyc2VJbnQodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEucGFnZVJvd051bSkpKzEpO1xyXG5cdFx0XHRlbmRSZWNvZGUgPSAoKCh0aGlzLmN1cnJlbnRQYWdlLTEpKnBhcnNlSW50KHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLnBhZ2VSb3dOdW0pKSArIHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLmRhdGEubGVuZ3RoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGJlZ2luUmVjb3JkXHQ9ICgoKHRoaXMuY3VycmVudFBhZ2UtMSkqcGFyc2VJbnQodGhpcy50YWJsZUNyZWF0aW9uLnJvd0xpbWl0KSkrMSk7XHJcblx0XHRcdGVuZFJlY29kZSA9ICgoKHRoaXMuY3VycmVudFBhZ2UtMSkqcGFyc2VJbnQodGhpcy50YWJsZUNyZWF0aW9uLnJvd0xpbWl0KSkgKyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5sZW5ndGgpO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YmVnaW46YmVnaW5SZWNvcmQsXHJcblx0XHRcdGVuZDplbmRSZWNvZGVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb2Nlc3NQYWdpbmdDYWxsQmFjayhkYXRhKSB7XHJcblx0XHR0aGlzLmN1cnJlbnRQYWdlID0gZGF0YTtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0YWN0aW9uOiBcInBhZ2VcIixcclxuXHRcdFx0XHRwYWdlTnVtYmVyOiBkYXRhLFxyXG5cdFx0XHRcdGxpbWl0OiAodGhpcy50YWJsZUNyZWF0aW9uLnJvd0xpbWl0ID8gdGhpcy50YWJsZUNyZWF0aW9uLnJvd0xpbWl0IDogdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEucGFnZVJvd051bSlcclxuXHRcdFx0fVxyXG5cdFx0KVxyXG5cdH1cclxuXHRwcm9jZXNzUm93TGltaXRDYWxsQmFjayhkYXRhKSB7XHJcblx0XHR0aGlzLnRhYmxlQ3JlYXRpb24ucm93TGltaXQgPSBkYXRhXHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRcdGFjdGlvbjogXCJwYWdlXCIsXHJcblx0XHRcdFx0cGFnZU51bWJlcjogMSxcclxuXHRcdFx0XHRsaW1pdDogKHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdCA/IHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdCA6IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLnBhZ2VSb3dOdW0pXHJcblx0XHRcdH1cclxuXHRcdClcclxuXHR9XHJcblx0Z2V0Q2hlY2tlZExpc3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy50YWJsZVJlZi5nZXRDaGVja2VkTGlzdCgpO1xyXG5cdH1cclxuXHRjbGVhckNoZWNrZWRMaXN0KCkge1xyXG5cdFx0dGhpcy50YWJsZVJlZi5jbGVhckNoZWNrTGlzdCgpO1xyXG5cdH1cclxufVxyXG4iXX0=