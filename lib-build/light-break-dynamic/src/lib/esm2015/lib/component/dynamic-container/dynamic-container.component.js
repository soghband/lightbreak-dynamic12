import { Component, EventEmitter, Input, Output, ViewChildren } from '@angular/core';
import { DynamicInputComponent } from "../dynamic-input/dynamic-input.component";
import { timer } from 'rxjs';
export class DynamicContainerComponent {
    constructor() {
        this.reRenderField = [];
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.emitFieldSelect = false;
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
        this.emitFieldSelect = true;
        let dataEvent = Object.assign(event, {
            containerIndex: this.containerIndex
        });
        this.panelCallBack.emit(dataEvent);
        timer(200).subscribe(() => {
            this.emitFieldSelect = false;
        });
    }
    callPanelCallBack(event) {
        if (!this.emitFieldSelect) {
            this.panelCallBack.emit({
                fieldName: null,
                fieldIndex: null,
                containerIndex: this.containerIndex
            });
        }
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
}
DynamicContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-dynamic-container',
                template: "<div class=\"fieldContainer {{containerCreation.customClass ? containerCreation.customClass : ''}}\" [style.width]=\"widthCalculator\" id=\"{{containerCreation.containerName}}\" (click)=\"callPanelCallBack($event)\">\r\n    <ng-container *ngIf=\"containerCreation.fieldList\">\r\n        <ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n            <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n                <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                                   [data]=\"data[actionDataIndex]\"\r\n                                   [rowIndex]=\"actionDataIndex\"\r\n                                   [inputIndex]=\"inputData\"\r\n                                   [option]=\"option\"\r\n                                   [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                                   (callBack)=\"processCallBack($event)\"\r\n                                   (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n            </ng-container>\r\n        </ng-container>\r\n    </ng-container>\r\n</div>\r\n"
            },] }
];
DynamicContainerComponent.ctorParameters = () => [];
DynamicContainerComponent.propDecorators = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWNvbnRhaW5lci9keW5hbWljLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBYSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU0zQixNQUFNLE9BQU8seUJBQXlCO0lBY3JDO1FBUFMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBSXJCLENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUM3RCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdGLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFFLElBQUksR0FBRyxVQUFVLENBQUM7YUFDbEQ7U0FDRDthQUFNO1lBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7U0FDOUI7SUFDRixDQUFDO0lBQ0QsZUFBZSxDQUFDLEtBQUs7UUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxLQUFLO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDO1lBQ25DLGNBQWMsRUFBQyxJQUFJLENBQUMsY0FBYztTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsSUFBSTtnQkFDZixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxFQUFDLElBQUksQ0FBQyxjQUFjO2FBQ2xDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUNELGVBQWUsQ0FBQyxVQUFVO1FBQ3pCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQztRQUNqRyxPQUFPLGNBQWMsQ0FBQztJQUN2QixDQUFDO0lBRUUsYUFBYSxDQUFDLFNBQVM7UUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakYsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ1YsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQywrckNBQWlEO2FBQ2pEOzs7O3lCQUVDLFlBQVksU0FBQyxxQkFBcUI7Z0NBQ2xDLEtBQUs7bUJBQ0wsS0FBSztxQkFDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4uL2R5bmFtaWMtaW5wdXQvZHluYW1pYy1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHt0aW1lcn0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS1keW5hbWljLWNvbnRhaW5lcicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QFZpZXdDaGlsZHJlbihEeW5hbWljSW5wdXRDb21wb25lbnQpIGlucHV0Q2hpbGQ6IFF1ZXJ5TGlzdDxEeW5hbWljSW5wdXRDb21wb25lbnQ+O1xyXG5cdEBJbnB1dCgpIGNvbnRhaW5lckNyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGRhdGE7XHJcblx0QElucHV0KCkgb3B0aW9uO1xyXG5cdEBJbnB1dCgpIGFjdGlvbkRhdGFJbmRleDtcclxuXHRASW5wdXQoKSBjb250YWluZXJJbmRleDtcclxuXHRASW5wdXQoKSByZVJlbmRlckZpZWxkID0gW107XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdGVtaXRGaWVsZFNlbGVjdCA9IGZhbHNlO1xyXG5cdG9iaktleSA9IE9iamVjdC5rZXlzO1xyXG5cdHdpZHRoQ2FsY3VsYXRvcjtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdGlmICh0eXBlb2YodGhpcy5jb250YWluZXJDcmVhdGlvbi5jb2x1bW5TcGFuKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdGxldCBjYWxjdWxhdGVTdHJpbmcgPSB0aGlzLmNvbnRhaW5lckNyZWF0aW9uLmNvbHVtblNwYW4uc3BsaXQoXCIvXCIpO1xyXG5cdFx0XHRsZXQgc2l6ZSA9IE1hdGguZmxvb3IoKHBhcnNlRmxvYXQoY2FsY3VsYXRlU3RyaW5nWzBdKSAvIHBhcnNlRmxvYXQoY2FsY3VsYXRlU3RyaW5nWzFdKSkqMTAwKTtcclxuXHRcdFx0aWYgKGNhbGN1bGF0ZVN0cmluZ1sxXSA9PSAxKSB7XHJcblx0XHRcdFx0dGhpcy53aWR0aENhbGN1bGF0b3IgPSBzaXplICsgXCIlXCI7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy53aWR0aENhbGN1bGF0b3IgPSBcImNhbGMoXCIrIHNpemUgKyBcIiUgLSAycHgpXCI7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMud2lkdGhDYWxjdWxhdG9yID0gXCIxMDAlXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsQmFjayhldmVudCkge1xyXG5cdFx0ZXZlbnQucm93SW5kZXggPSB0aGlzLmFjdGlvbkRhdGFJbmRleDtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdChldmVudClcclxuXHR9XHJcblx0cHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuXHRcdHRoaXMuZW1pdEZpZWxkU2VsZWN0ID0gdHJ1ZTtcclxuXHRcdGxldCBkYXRhRXZlbnQgPSBPYmplY3QuYXNzaWduKGV2ZW50LHtcclxuXHRcdFx0Y29udGFpbmVySW5kZXg6dGhpcy5jb250YWluZXJJbmRleFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdChkYXRhRXZlbnQpO1xyXG5cdFx0dGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT57XHJcblx0XHRcdHRoaXMuZW1pdEZpZWxkU2VsZWN0ID0gZmFsc2U7XHJcblx0XHR9KVxyXG5cdH1cclxuXHRjYWxsUGFuZWxDYWxsQmFjayhldmVudCkge1xyXG5cdFx0aWYgKCF0aGlzLmVtaXRGaWVsZFNlbGVjdCkge1xyXG5cdFx0XHR0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0ZmllbGROYW1lOiBudWxsLFxyXG5cdFx0XHRcdGZpZWxkSW5kZXg6IG51bGwsXHJcblx0XHRcdFx0Y29udGFpbmVySW5kZXg6dGhpcy5jb250YWluZXJJbmRleFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z2V0RHluYW1pY0lucHV0KGlucHV0SW5kZXgpIHtcclxuXHRcdGxldCBpbnB1dENvbXBvbmVudCA9IHRoaXMuaW5wdXRDaGlsZC5maW5kKGluc3RhbnRJbnB1dCA9PiBpbnN0YW50SW5wdXQuaW5wdXRJbmRleCA9PSBpbnB1dEluZGV4KTtcclxuXHRcdHJldHVybiBpbnB1dENvbXBvbmVudDtcclxuXHR9XHJcblxyXG4gICAgY2hlY2tSZVJlbmRlcihmaWVsZE5hbWUpIHtcclxuXHRcdGlmICh0aGlzLnJlUmVuZGVyRmllbGQubGVuZ3RoICE9IDAgJiYgdGhpcy5yZVJlbmRlckZpZWxkLmluZGV4T2YoZmllbGROYW1lKSA+IC0xKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==