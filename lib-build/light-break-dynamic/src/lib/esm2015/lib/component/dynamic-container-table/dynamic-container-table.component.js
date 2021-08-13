import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
let DynamicContainerTableComponent = class DynamicContainerTableComponent {
    constructor() {
        this.reRenderField = [];
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
    }
    ngOnInit() {
        if (typeof (this.containerCreation.columnSpan) != "undefined") {
            let calculateString = this.containerCreation.columnSpan.split("/");
            let size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
            if (calculateString[1] == 1) {
                this.widthCalculator = size + "%";
            }
            else {
                this.widthCalculator = "calc(" + size + "% - 2px)";
            }
        }
        else {
            this.widthCalculator = "100%";
        }
    }
    processCallBack(event) {
        event.rowIndex = this.actionDataIndex;
        this.callBack.emit(event);
    }
    processPanelCallBack(event) {
        let dataEvent = Object.assign(event, {
            containerIndex: this.containerIndex
        });
        this.panelCallBack.emit(dataEvent);
    }
    getDynamicInput(inputIndex) {
        let inputComponent = this.inputChild.find(instantInput => instantInput.inputIndex == inputIndex);
        return inputComponent;
    }
    checkReRender(fieldName) {
        if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
            return false;
        }
        return true;
    }
    deleteRow(actionDataIndex) {
        this.callBack.emit({
            action: "deleteRow",
            rowIndex: actionDataIndex
        });
    }
};
__decorate([
    ViewChildren(DynamicInputComponent),
    __metadata("design:type", QueryList)
], DynamicContainerTableComponent.prototype, "inputChild", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "containerCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "actionDataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "containerIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "reRenderField", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerTableComponent.prototype, "panelCallBack", void 0);
DynamicContainerTableComponent = __decorate([
    Component({
        selector: '[lb9-dynamic-container-table]',
        template: "<ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n    <td *ngIf=\"containerCreation.fieldList[inputData].type != 'hidden'\">\r\n        <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n            <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                               [data]=\"data[actionDataIndex]\"\r\n                               [rowIndex]=\"actionDataIndex\"\r\n                               [inputIndex]=\"inputData\"\r\n                               [option]=\"option\"\r\n                               [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                               (callBack)=\"processCallBack($event)\"\r\n                               (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n        </ng-container>\r\n    </td>\r\n</ng-container>\r\n\r\n<td *ngIf=\"option.deleteRow\">\r\n     <span *ngIf=\"!option.disableDelete || (option.disableDelete && !option.disableDelete[actionDataIndex])\"\r\n           class=\"btn-action delete\" id=\"delete_{{actionDataIndex}}\"\r\n           (click)=\"deleteRow(actionDataIndex)\"><abbr title=\"{{option.deleteRowText}}\"><span\r\n             class=\"glyphicon glyphicon-remove-circle\"></span></abbr></span>\r\n</td>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicContainerTableComponent);
export { DynamicContainerTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb250YWluZXItdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1jb250YWluZXItdGFibGUvZHluYW1pYy1jb250YWluZXItdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFNL0UsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFjdkM7UUFOUyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFJckIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLElBQUksV0FBVyxFQUFFO1lBQzFELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25FLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0YsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7YUFDckM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLEdBQUUsSUFBSSxHQUFHLFVBQVUsQ0FBQzthQUNyRDtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztTQUNqQztJQUNMLENBQUM7SUFDRCxlQUFlLENBQUMsS0FBSztRQUNqQixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUE7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUNELG9CQUFvQixDQUFDLEtBQUs7UUFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUM7WUFDaEMsY0FBYyxFQUFDLElBQUksQ0FBQyxjQUFjO1NBQ3JDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxlQUFlLENBQUMsVUFBVTtRQUN0QixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLENBQUM7UUFDakcsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFTO1FBQ25CLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzlFLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2YsTUFBTSxFQUFFLFdBQVc7WUFDbkIsUUFBUSxFQUFFLGVBQWU7U0FDNUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7QUF4RHdDO0lBQXBDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQzs4QkFBYSxTQUFTO2tFQUF3QjtBQUN6RTtJQUFSLEtBQUssRUFBRTs7eUVBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzs0REFBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOzs4REFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzt1RUFBaUI7QUFDaEI7SUFBUixLQUFLLEVBQUU7O3NFQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOztxRUFBb0I7QUFDbEI7SUFBVCxNQUFNLEVBQUU7O2dFQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTs7cUVBQW9DO0FBVnBDLDhCQUE4QjtJQUoxQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsK0JBQStCO1FBQ3pDLDYwQ0FBdUQ7S0FDeEQsQ0FBQzs7R0FDVyw4QkFBOEIsQ0EwRDFDO1NBMURZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNJbnB1dENvbXBvbmVudH0gZnJvbSAnLi4vZHluYW1pYy1pbnB1dC9keW5hbWljLWlucHV0LmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tsYjktZHluYW1pYy1jb250YWluZXItdGFibGVdJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1jb250YWluZXItdGFibGUuY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbnRhaW5lclRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBAVmlld0NoaWxkcmVuKER5bmFtaWNJbnB1dENvbXBvbmVudCkgaW5wdXRDaGlsZDogUXVlcnlMaXN0PER5bmFtaWNJbnB1dENvbXBvbmVudD47XHJcbiAgICBASW5wdXQoKSBjb250YWluZXJDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIGRhdGE7XHJcbiAgICBASW5wdXQoKSBvcHRpb247XHJcbiAgICBASW5wdXQoKSBhY3Rpb25EYXRhSW5kZXg7XHJcbiAgICBASW5wdXQoKSBjb250YWluZXJJbmRleDtcclxuICAgIEBJbnB1dCgpIHJlUmVuZGVyRmllbGQgPSBbXTtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgb2JqS2V5ID0gT2JqZWN0LmtleXM7XHJcbiAgICB3aWR0aENhbGN1bGF0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLmNvbnRhaW5lckNyZWF0aW9uLmNvbHVtblNwYW4pICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgbGV0IGNhbGN1bGF0ZVN0cmluZyA9IHRoaXMuY29udGFpbmVyQ3JlYXRpb24uY29sdW1uU3Bhbi5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgIGxldCBzaXplID0gTWF0aC5mbG9vcigocGFyc2VGbG9hdChjYWxjdWxhdGVTdHJpbmdbMF0pIC8gcGFyc2VGbG9hdChjYWxjdWxhdGVTdHJpbmdbMV0pKSoxMDApO1xyXG4gICAgICAgICAgICBpZiAoY2FsY3VsYXRlU3RyaW5nWzFdID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGhDYWxjdWxhdG9yID0gc2l6ZSArIFwiJVwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aENhbGN1bGF0b3IgPSBcImNhbGMoXCIrIHNpemUgKyBcIiUgLSAycHgpXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoQ2FsY3VsYXRvciA9IFwiMTAwJVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb2Nlc3NDYWxsQmFjayhldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnJvd0luZGV4ID0gdGhpcy5hY3Rpb25EYXRhSW5kZXhcclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoZXZlbnQpXHJcbiAgICB9XHJcbiAgICBwcm9jZXNzUGFuZWxDYWxsQmFjayhldmVudCkge1xyXG4gICAgICAgIGxldCBkYXRhRXZlbnQgPSBPYmplY3QuYXNzaWduKGV2ZW50LHtcclxuICAgICAgICAgICAgY29udGFpbmVySW5kZXg6dGhpcy5jb250YWluZXJJbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5wYW5lbENhbGxCYWNrLmVtaXQoZGF0YUV2ZW50KTtcclxuICAgIH1cclxuICAgIGdldER5bmFtaWNJbnB1dChpbnB1dEluZGV4KSB7XHJcbiAgICAgICAgbGV0IGlucHV0Q29tcG9uZW50ID0gdGhpcy5pbnB1dENoaWxkLmZpbmQoaW5zdGFudElucHV0ID0+IGluc3RhbnRJbnB1dC5pbnB1dEluZGV4ID09IGlucHV0SW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dENvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1JlUmVuZGVyKGZpZWxkTmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlUmVuZGVyRmllbGQubGVuZ3RoICE9IDAgJiYgdGhpcy5yZVJlbmRlckZpZWxkLmluZGV4T2YoZmllbGROYW1lKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlUm93KGFjdGlvbkRhdGFJbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGFjdGlvbjogXCJkZWxldGVSb3dcIixcclxuICAgICAgICAgICAgcm93SW5kZXg6IGFjdGlvbkRhdGFJbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==