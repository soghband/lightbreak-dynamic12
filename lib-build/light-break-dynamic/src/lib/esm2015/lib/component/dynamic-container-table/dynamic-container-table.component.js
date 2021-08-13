import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
export class DynamicContainerTableComponent {
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
}
DynamicContainerTableComponent.decorators = [
    { type: Component, args: [{
                selector: '[lb9-dynamic-container-table]',
                template: "<ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n    <td *ngIf=\"containerCreation.fieldList[inputData].type != 'hidden'\">\r\n        <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n            <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                               [data]=\"data[actionDataIndex]\"\r\n                               [rowIndex]=\"actionDataIndex\"\r\n                               [inputIndex]=\"inputData\"\r\n                               [option]=\"option\"\r\n                               [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                               (callBack)=\"processCallBack($event)\"\r\n                               (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n        </ng-container>\r\n    </td>\r\n</ng-container>\r\n\r\n<td *ngIf=\"option.deleteRow\">\r\n     <span *ngIf=\"!option.disableDelete || (option.disableDelete && !option.disableDelete[actionDataIndex])\"\r\n           class=\"btn-action delete\" id=\"delete_{{actionDataIndex}}\"\r\n           (click)=\"deleteRow(actionDataIndex)\"><abbr title=\"{{option.deleteRowText}}\"><span\r\n             class=\"glyphicon glyphicon-remove-circle\"></span></abbr></span>\r\n</td>\r\n"
            },] }
];
DynamicContainerTableComponent.ctorParameters = () => [];
DynamicContainerTableComponent.propDecorators = {
    inputChild: [{ type: ViewChildren, args: [DynamicInputComponent,] }],
    containerCreation: [{ type: Input }],
    data: [{ type: Input }],
    option: [{ type: Input }],
    actionDataIndex: [{ type: Input }],
    containerIndex: [{ type: Input }],
    reRenderField: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb250YWluZXItdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWNvbnRhaW5lci10YWJsZS9keW5hbWljLWNvbnRhaW5lci10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBYSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFNL0UsTUFBTSxPQUFPLDhCQUE4QjtJQWN2QztRQU5TLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxXQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUlyQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDMUQsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQzthQUNyQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRSxJQUFJLEdBQUcsVUFBVSxDQUFDO2FBQ3JEO1NBQ0o7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ2pCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQTtRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QixDQUFDO0lBQ0Qsb0JBQW9CLENBQUMsS0FBSztRQUN0QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQztZQUNoQyxjQUFjLEVBQUMsSUFBSSxDQUFDLGNBQWM7U0FDckMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELGVBQWUsQ0FBQyxVQUFVO1FBQ3RCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQztRQUNqRyxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQVM7UUFDbkIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDOUUsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsU0FBUyxDQUFDLGVBQWU7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZixNQUFNLEVBQUUsV0FBVztZQUNuQixRQUFRLEVBQUUsZUFBZTtTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUE3REosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLDYwQ0FBdUQ7YUFDeEQ7Ozs7eUJBR0ksWUFBWSxTQUFDLHFCQUFxQjtnQ0FDbEMsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0lucHV0Q29tcG9uZW50fSBmcm9tICcuLi9keW5hbWljLWlucHV0L2R5bmFtaWMtaW5wdXQuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnW2xiOS1keW5hbWljLWNvbnRhaW5lci10YWJsZV0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWNvbnRhaW5lci10YWJsZS5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29udGFpbmVyVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIEBWaWV3Q2hpbGRyZW4oRHluYW1pY0lucHV0Q29tcG9uZW50KSBpbnB1dENoaWxkOiBRdWVyeUxpc3Q8RHluYW1pY0lucHV0Q29tcG9uZW50PjtcclxuICAgIEBJbnB1dCgpIGNvbnRhaW5lckNyZWF0aW9uO1xyXG4gICAgQElucHV0KCkgZGF0YTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIGFjdGlvbkRhdGFJbmRleDtcclxuICAgIEBJbnB1dCgpIGNvbnRhaW5lckluZGV4O1xyXG4gICAgQElucHV0KCkgcmVSZW5kZXJGaWVsZCA9IFtdO1xyXG4gICAgQE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgQE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBvYmpLZXkgPSBPYmplY3Qua2V5cztcclxuICAgIHdpZHRoQ2FsY3VsYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAodHlwZW9mKHRoaXMuY29udGFpbmVyQ3JlYXRpb24uY29sdW1uU3BhbikgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBsZXQgY2FsY3VsYXRlU3RyaW5nID0gdGhpcy5jb250YWluZXJDcmVhdGlvbi5jb2x1bW5TcGFuLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICAgICAgbGV0IHNpemUgPSBNYXRoLmZsb29yKChwYXJzZUZsb2F0KGNhbGN1bGF0ZVN0cmluZ1swXSkgLyBwYXJzZUZsb2F0KGNhbGN1bGF0ZVN0cmluZ1sxXSkpKjEwMCk7XHJcbiAgICAgICAgICAgIGlmIChjYWxjdWxhdGVTdHJpbmdbMV0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aENhbGN1bGF0b3IgPSBzaXplICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoQ2FsY3VsYXRvciA9IFwiY2FsYyhcIisgc2l6ZSArIFwiJSAtIDJweClcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2lkdGhDYWxjdWxhdG9yID0gXCIxMDAlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0NhbGxCYWNrKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucm93SW5kZXggPSB0aGlzLmFjdGlvbkRhdGFJbmRleFxyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdChldmVudClcclxuICAgIH1cclxuICAgIHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGRhdGFFdmVudCA9IE9iamVjdC5hc3NpZ24oZXZlbnQse1xyXG4gICAgICAgICAgICBjb250YWluZXJJbmRleDp0aGlzLmNvbnRhaW5lckluZGV4XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdChkYXRhRXZlbnQpO1xyXG4gICAgfVxyXG4gICAgZ2V0RHluYW1pY0lucHV0KGlucHV0SW5kZXgpIHtcclxuICAgICAgICBsZXQgaW5wdXRDb21wb25lbnQgPSB0aGlzLmlucHV0Q2hpbGQuZmluZChpbnN0YW50SW5wdXQgPT4gaW5zdGFudElucHV0LmlucHV0SW5kZXggPT0gaW5wdXRJbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0Q29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrUmVSZW5kZXIoZmllbGROYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVSZW5kZXJGaWVsZC5sZW5ndGggIT0gMCAmJiB0aGlzLnJlUmVuZGVyRmllbGQuaW5kZXhPZihmaWVsZE5hbWUpID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVSb3coYWN0aW9uRGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgYWN0aW9uOiBcImRlbGV0ZVJvd1wiLFxyXG4gICAgICAgICAgICByb3dJbmRleDogYWN0aW9uRGF0YUluZGV4XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19