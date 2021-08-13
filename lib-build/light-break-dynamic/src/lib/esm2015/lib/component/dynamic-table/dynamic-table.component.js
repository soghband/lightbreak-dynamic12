import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
let DynamicTableComponent = class DynamicTableComponent {
    constructor() {
        this.callBack = new EventEmitter();
        this.currentPage = 1;
        this.sortData = "";
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
            totalPage = Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum);
        }
        else if (this.tableCreation.pagination && this.tableCreation.pagination.totalRowNum) {
            totalPage = Math.ceil(this.tableCreation.pagination.totalRowNum / this.tableCreation.rowLimit);
        }
        return totalPage;
    }
    getPageRank() {
        let beginRecord = null;
        let endRecode = null;
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
    }
    processPagingCallBack(data) {
        this.currentPage = data;
        this.callBack.emit({
            action: "page",
            pageNumber: data,
            limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
        });
    }
    processRowLimitCallBack(data) {
        this.tableCreation.rowLimit = data;
        this.callBack.emit({
            action: "page",
            pageNumber: 1,
            limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
        });
    }
    getCheckedList() {
        return this.tableRef.getCheckedList();
    }
    clearCheckedList() {
        this.tableRef.clearCheckList();
    }
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
export { DynamicTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLXRhYmxlL2R5bmFtaWMtdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFNdkQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFNakM7UUFIVSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBR2QsQ0FBQztJQUNELFFBQVE7SUFFUixDQUFDO0lBQ0QsZUFBZSxDQUFDLElBQUk7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxZQUFZO1FBQ1gsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUMvRjthQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFF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QUFDO0FBQ3pEO0lBQVIsS0FBSyxFQUFFOzs0REFBZTtBQUNiO0lBQVQsTUFBTSxFQUFFOzt1REFBK0I7QUFINUIscUJBQXFCO0lBSmpDLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsaXhDQUE2QztLQUM3QyxDQUFDOztHQUNXLHFCQUFxQixDQW1FakM7U0FuRVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1RhYmxlQ29tcG9uZW50fSBmcm9tICcuL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS1keW5hbWljLXRhYmxlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy10YWJsZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QFZpZXdDaGlsZChcInRhYmxlSURcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIHRhYmxlUmVmOiBUYWJsZUNvbXBvbmVudDtcclxuXHRASW5wdXQoKSB0YWJsZUNyZWF0aW9uO1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRjdXJyZW50UGFnZSA9IDE7XHJcblx0c29ydERhdGEgPSBcIlwiO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHR9XHJcblx0bmdPbkluaXQoKSB7XHJcblxyXG5cdH1cclxuXHRwcm9jZXNzQ2FsbEJhY2soZGF0YSkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KGRhdGEpO1xyXG5cdFx0dGhpcy5zb3J0RGF0YSA9IGRhdGEuc29ydFZhbHVlO1xyXG5cdH1cclxuXHRnZXRUb3RhbFBhZ2UoKSB7XHJcblx0XHRsZXQgdG90YWxQYWdlID0gbnVsbDtcclxuXHRcdGlmICh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS50b3RhbFJlY29yZCkge1xyXG5cdFx0XHR0b3RhbFBhZ2UgPSBNYXRoLmNlaWwodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEudG90YWxSZWNvcmQgLyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5wYWdlUm93TnVtKVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnRhYmxlQ3JlYXRpb24ucGFnaW5hdGlvbiAmJiB0aGlzLnRhYmxlQ3JlYXRpb24ucGFnaW5hdGlvbi50b3RhbFJvd051bSkge1xyXG5cdFx0XHR0b3RhbFBhZ2UgPSBNYXRoLmNlaWwodGhpcy50YWJsZUNyZWF0aW9uLnBhZ2luYXRpb24udG90YWxSb3dOdW0gLyB0aGlzLnRhYmxlQ3JlYXRpb24ucm93TGltaXQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG90YWxQYWdlO1xyXG5cdH1cclxuXHJcblx0Z2V0UGFnZVJhbmsoKSB7XHJcblx0XHRsZXQgYmVnaW5SZWNvcmQgPSBudWxsO1xyXG5cdFx0bGV0IGVuZFJlY29kZSA9IG51bGw7XHJcblx0XHRpZiAodGhpcy50YWJsZUNyZWF0aW9uLmRhdGEucGFnZVJvd051bSkge1xyXG5cdFx0XHRiZWdpblJlY29yZFx0PSAoKCh0aGlzLmN1cnJlbnRQYWdlLTEpKnBhcnNlSW50KHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLnBhZ2VSb3dOdW0pKSsxKTtcclxuXHRcdFx0ZW5kUmVjb2RlID0gKCgodGhpcy5jdXJyZW50UGFnZS0xKSpwYXJzZUludCh0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5wYWdlUm93TnVtKSkgKyB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5kYXRhLmxlbmd0aCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRiZWdpblJlY29yZFx0PSAoKCh0aGlzLmN1cnJlbnRQYWdlLTEpKnBhcnNlSW50KHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdCkpKzEpO1xyXG5cdFx0XHRlbmRSZWNvZGUgPSAoKCh0aGlzLmN1cnJlbnRQYWdlLTEpKnBhcnNlSW50KHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdCkpICsgdGhpcy50YWJsZUNyZWF0aW9uLmRhdGEubGVuZ3RoKTtcclxuXHRcdH1cclxuXHRcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGJlZ2luOmJlZ2luUmVjb3JkLFxyXG5cdFx0XHRlbmQ6ZW5kUmVjb2RlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm9jZXNzUGFnaW5nQ2FsbEJhY2soZGF0YSkge1xyXG5cdFx0dGhpcy5jdXJyZW50UGFnZSA9IGRhdGE7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRcdGFjdGlvbjogXCJwYWdlXCIsXHJcblx0XHRcdFx0cGFnZU51bWJlcjogZGF0YSxcclxuXHRcdFx0XHRsaW1pdDogKHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdCA/IHRoaXMudGFibGVDcmVhdGlvbi5yb3dMaW1pdCA6IHRoaXMudGFibGVDcmVhdGlvbi5kYXRhLnBhZ2VSb3dOdW0pXHJcblx0XHRcdH1cclxuXHRcdClcclxuXHR9XHJcblx0cHJvY2Vzc1Jvd0xpbWl0Q2FsbEJhY2soZGF0YSkge1xyXG5cdFx0dGhpcy50YWJsZUNyZWF0aW9uLnJvd0xpbWl0ID0gZGF0YVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRhY3Rpb246IFwicGFnZVwiLFxyXG5cdFx0XHRcdHBhZ2VOdW1iZXI6IDEsXHJcblx0XHRcdFx0bGltaXQ6ICh0aGlzLnRhYmxlQ3JlYXRpb24ucm93TGltaXQgPyB0aGlzLnRhYmxlQ3JlYXRpb24ucm93TGltaXQgOiB0aGlzLnRhYmxlQ3JlYXRpb24uZGF0YS5wYWdlUm93TnVtKVxyXG5cdFx0XHR9XHJcblx0XHQpXHJcblx0fVxyXG5cdGdldENoZWNrZWRMaXN0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGFibGVSZWYuZ2V0Q2hlY2tlZExpc3QoKTtcclxuXHR9XHJcblx0Y2xlYXJDaGVja2VkTGlzdCgpIHtcclxuXHRcdHRoaXMudGFibGVSZWYuY2xlYXJDaGVja0xpc3QoKTtcclxuXHR9XHJcbn1cclxuIl19