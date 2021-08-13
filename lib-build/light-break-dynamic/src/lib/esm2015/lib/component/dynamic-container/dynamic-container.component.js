import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicInputComponent } from "../dynamic-input/dynamic-input.component";
import { timer } from 'rxjs';
let DynamicContainerComponent = class DynamicContainerComponent {
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
};
__decorate([
    ViewChildren(DynamicInputComponent),
    __metadata("design:type", QueryList)
], DynamicContainerComponent.prototype, "inputChild", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "containerCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "actionDataIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "containerIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "reRenderField", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicContainerComponent.prototype, "panelCallBack", void 0);
DynamicContainerComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-container',
        template: "<div class=\"fieldContainer {{containerCreation.customClass ? containerCreation.customClass : ''}}\" [style.width]=\"widthCalculator\" id=\"{{containerCreation.containerName}}\" (click)=\"callPanelCallBack($event)\">\r\n    <ng-container *ngIf=\"containerCreation.fieldList\">\r\n        <ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n            <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n                <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                                   [data]=\"data[actionDataIndex]\"\r\n                                   [rowIndex]=\"actionDataIndex\"\r\n                                   [inputIndex]=\"inputData\"\r\n                                   [option]=\"option\"\r\n                                   [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                                   (callBack)=\"processCallBack($event)\"\r\n                                   (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n            </ng-container>\r\n        </ng-container>\r\n    </ng-container>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicContainerComponent);
export { DynamicContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1jb250YWluZXIvZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU0zQixJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQWNyQztRQVBTLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUlyQixDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDN0QsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQzthQUNsQztpQkFBTTtnQkFDTixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRSxJQUFJLEdBQUcsVUFBVSxDQUFDO2FBQ2xEO1NBQ0Q7YUFBTTtZQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1NBQzlCO0lBQ0YsQ0FBQztJQUNELGVBQWUsQ0FBQyxLQUFLO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBQ0Qsb0JBQW9CLENBQUMsS0FBSztRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQztZQUNuQyxjQUFjLEVBQUMsSUFBSSxDQUFDLGNBQWM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBQ0QsaUJBQWlCLENBQUMsS0FBSztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGNBQWMsRUFBQyxJQUFJLENBQUMsY0FBYzthQUNsQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFDRCxlQUFlLENBQUMsVUFBVTtRQUN6QixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLENBQUM7UUFDakcsT0FBTyxjQUFjLENBQUM7SUFDdkIsQ0FBQztJQUVFLGFBQWEsQ0FBQyxTQUFTO1FBQ3pCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2pGLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNWLENBQUM7Q0FDSixDQUFBO0FBL0RxQztJQUFwQyxZQUFZLENBQUMscUJBQXFCLENBQUM7OEJBQWEsU0FBUzs2REFBd0I7QUFDekU7SUFBUixLQUFLLEVBQUU7O29FQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs7dURBQU07QUFDTDtJQUFSLEtBQUssRUFBRTs7eURBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7a0VBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOztpRUFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTs7Z0VBQW9CO0FBQ2xCO0lBQVQsTUFBTSxFQUFFOzsyREFBK0I7QUFDOUI7SUFBVCxNQUFNLEVBQUU7O2dFQUFvQztBQVRqQyx5QkFBeUI7SUFKckMsU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQywrckNBQWlEO0tBQ2pELENBQUM7O0dBQ1cseUJBQXlCLENBZ0VyQztTQWhFWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljSW5wdXRDb21wb25lbnR9IGZyb20gXCIuLi9keW5hbWljLWlucHV0L2R5bmFtaWMtaW5wdXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdsYjktZHluYW1pYy1jb250YWluZXInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBWaWV3Q2hpbGRyZW4oRHluYW1pY0lucHV0Q29tcG9uZW50KSBpbnB1dENoaWxkOiBRdWVyeUxpc3Q8RHluYW1pY0lucHV0Q29tcG9uZW50PjtcclxuXHRASW5wdXQoKSBjb250YWluZXJDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBhY3Rpb25EYXRhSW5kZXg7XHJcblx0QElucHV0KCkgY29udGFpbmVySW5kZXg7XHJcblx0QElucHV0KCkgcmVSZW5kZXJGaWVsZCA9IFtdO1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRlbWl0RmllbGRTZWxlY3QgPSBmYWxzZTtcclxuXHRvYmpLZXkgPSBPYmplY3Qua2V5cztcclxuXHR3aWR0aENhbGN1bGF0b3I7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRpZiAodHlwZW9mKHRoaXMuY29udGFpbmVyQ3JlYXRpb24uY29sdW1uU3BhbikgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRsZXQgY2FsY3VsYXRlU3RyaW5nID0gdGhpcy5jb250YWluZXJDcmVhdGlvbi5jb2x1bW5TcGFuLnNwbGl0KFwiL1wiKTtcclxuXHRcdFx0bGV0IHNpemUgPSBNYXRoLmZsb29yKChwYXJzZUZsb2F0KGNhbGN1bGF0ZVN0cmluZ1swXSkgLyBwYXJzZUZsb2F0KGNhbGN1bGF0ZVN0cmluZ1sxXSkpKjEwMCk7XHJcblx0XHRcdGlmIChjYWxjdWxhdGVTdHJpbmdbMV0gPT0gMSkge1xyXG5cdFx0XHRcdHRoaXMud2lkdGhDYWxjdWxhdG9yID0gc2l6ZSArIFwiJVwiO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMud2lkdGhDYWxjdWxhdG9yID0gXCJjYWxjKFwiKyBzaXplICsgXCIlIC0gMnB4KVwiO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLndpZHRoQ2FsY3VsYXRvciA9IFwiMTAwJVwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcm9jZXNzQ2FsbEJhY2soZXZlbnQpIHtcclxuXHRcdGV2ZW50LnJvd0luZGV4ID0gdGhpcy5hY3Rpb25EYXRhSW5kZXg7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoZXZlbnQpXHJcblx0fVxyXG5cdHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcblx0XHR0aGlzLmVtaXRGaWVsZFNlbGVjdCA9IHRydWU7XHJcblx0XHRsZXQgZGF0YUV2ZW50ID0gT2JqZWN0LmFzc2lnbihldmVudCx7XHJcblx0XHRcdGNvbnRhaW5lckluZGV4OnRoaXMuY29udGFpbmVySW5kZXhcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5wYW5lbENhbGxCYWNrLmVtaXQoZGF0YUV2ZW50KTtcclxuXHRcdHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+e1xyXG5cdFx0XHR0aGlzLmVtaXRGaWVsZFNlbGVjdCA9IGZhbHNlO1xyXG5cdFx0fSlcclxuXHR9XHJcblx0Y2FsbFBhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuXHRcdGlmICghdGhpcy5lbWl0RmllbGRTZWxlY3QpIHtcclxuXHRcdFx0dGhpcy5wYW5lbENhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRcdGZpZWxkTmFtZTogbnVsbCxcclxuXHRcdFx0XHRmaWVsZEluZGV4OiBudWxsLFxyXG5cdFx0XHRcdGNvbnRhaW5lckluZGV4OnRoaXMuY29udGFpbmVySW5kZXhcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldER5bmFtaWNJbnB1dChpbnB1dEluZGV4KSB7XHJcblx0XHRsZXQgaW5wdXRDb21wb25lbnQgPSB0aGlzLmlucHV0Q2hpbGQuZmluZChpbnN0YW50SW5wdXQgPT4gaW5zdGFudElucHV0LmlucHV0SW5kZXggPT0gaW5wdXRJbmRleCk7XHJcblx0XHRyZXR1cm4gaW5wdXRDb21wb25lbnQ7XHJcblx0fVxyXG5cclxuICAgIGNoZWNrUmVSZW5kZXIoZmllbGROYW1lKSB7XHJcblx0XHRpZiAodGhpcy5yZVJlbmRlckZpZWxkLmxlbmd0aCAhPSAwICYmIHRoaXMucmVSZW5kZXJGaWVsZC5pbmRleE9mKGZpZWxkTmFtZSkgPiAtMSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG4iXX0=