import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicInputComponent } from "../dynamic-input/dynamic-input.component";
import { timer } from 'rxjs';
var DynamicContainerComponent = /** @class */ (function () {
    function DynamicContainerComponent() {
        this.reRenderField = [];
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.emitFieldSelect = false;
        this.objKey = Object.keys;
    }
    DynamicContainerComponent.prototype.ngOnInit = function () {
        if (typeof (this.containerCreation.columnSpan) != "undefined") {
            var calculateString = this.containerCreation.columnSpan.split("/");
            var size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
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
    };
    DynamicContainerComponent.prototype.processCallBack = function (event) {
        event.rowIndex = this.actionDataIndex;
        this.callBack.emit(event);
    };
    DynamicContainerComponent.prototype.processPanelCallBack = function (event) {
        var _this = this;
        this.emitFieldSelect = true;
        var dataEvent = Object.assign(event, {
            containerIndex: this.containerIndex
        });
        this.panelCallBack.emit(dataEvent);
        timer(200).subscribe(function () {
            _this.emitFieldSelect = false;
        });
    };
    DynamicContainerComponent.prototype.callPanelCallBack = function (event) {
        if (!this.emitFieldSelect) {
            this.panelCallBack.emit({
                fieldName: null,
                fieldIndex: null,
                containerIndex: this.containerIndex
            });
        }
    };
    DynamicContainerComponent.prototype.getDynamicInput = function (inputIndex) {
        var inputComponent = this.inputChild.find(function (instantInput) { return instantInput.inputIndex == inputIndex; });
        return inputComponent;
    };
    DynamicContainerComponent.prototype.checkReRender = function (fieldName) {
        if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
            return false;
        }
        return true;
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
    return DynamicContainerComponent;
}());
export { DynamicContainerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1jb250YWluZXIvZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDL0UsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU0zQjtJQWNDO1FBUFMsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBSXJCLENBQUM7SUFFRCw0Q0FBUSxHQUFSO1FBQ0MsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLFdBQVcsRUFBRTtZQUM3RCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdGLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFFLElBQUksR0FBRyxVQUFVLENBQUM7YUFDbEQ7U0FDRDthQUFNO1lBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7U0FDOUI7SUFDRixDQUFDO0lBQ0QsbURBQWUsR0FBZixVQUFnQixLQUFLO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBQ0Qsd0RBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFBMUIsaUJBU0M7UUFSQSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQztZQUNuQyxjQUFjLEVBQUMsSUFBSSxDQUFDLGNBQWM7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNwQixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUFDRCxxREFBaUIsR0FBakIsVUFBa0IsS0FBSztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGNBQWMsRUFBQyxJQUFJLENBQUMsY0FBYzthQUNsQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFDRCxtREFBZSxHQUFmLFVBQWdCLFVBQVU7UUFDekIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxZQUFZLENBQUMsVUFBVSxJQUFJLFVBQVUsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sY0FBYyxDQUFDO0lBQ3ZCLENBQUM7SUFFRSxpREFBYSxHQUFiLFVBQWMsU0FBUztRQUN6QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNqRixPQUFPLEtBQUssQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDVixDQUFDO0lBOURpQztRQUFwQyxZQUFZLENBQUMscUJBQXFCLENBQUM7a0NBQWEsU0FBUztpRUFBd0I7SUFDekU7UUFBUixLQUFLLEVBQUU7O3dFQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7MkRBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7NkRBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7c0VBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFOztxRUFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7b0VBQW9CO0lBQ2xCO1FBQVQsTUFBTSxFQUFFOzsrREFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7O29FQUFvQztJQVRqQyx5QkFBeUI7UUFKckMsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQywrckNBQWlEO1NBQ2pELENBQUM7O09BQ1cseUJBQXlCLENBZ0VyQztJQUFELGdDQUFDO0NBQUEsQUFoRUQsSUFnRUM7U0FoRVkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0lucHV0Q29tcG9uZW50fSBmcm9tIFwiLi4vZHluYW1pYy1pbnB1dC9keW5hbWljLWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtY29udGFpbmVyJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRAVmlld0NoaWxkcmVuKER5bmFtaWNJbnB1dENvbXBvbmVudCkgaW5wdXRDaGlsZDogUXVlcnlMaXN0PER5bmFtaWNJbnB1dENvbXBvbmVudD47XHJcblx0QElucHV0KCkgY29udGFpbmVyQ3JlYXRpb247XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgYWN0aW9uRGF0YUluZGV4O1xyXG5cdEBJbnB1dCgpIGNvbnRhaW5lckluZGV4O1xyXG5cdEBJbnB1dCgpIHJlUmVuZGVyRmllbGQgPSBbXTtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0ZW1pdEZpZWxkU2VsZWN0ID0gZmFsc2U7XHJcblx0b2JqS2V5ID0gT2JqZWN0LmtleXM7XHJcblx0d2lkdGhDYWxjdWxhdG9yO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0aWYgKHR5cGVvZih0aGlzLmNvbnRhaW5lckNyZWF0aW9uLmNvbHVtblNwYW4pICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0bGV0IGNhbGN1bGF0ZVN0cmluZyA9IHRoaXMuY29udGFpbmVyQ3JlYXRpb24uY29sdW1uU3Bhbi5zcGxpdChcIi9cIik7XHJcblx0XHRcdGxldCBzaXplID0gTWF0aC5mbG9vcigocGFyc2VGbG9hdChjYWxjdWxhdGVTdHJpbmdbMF0pIC8gcGFyc2VGbG9hdChjYWxjdWxhdGVTdHJpbmdbMV0pKSoxMDApO1xyXG5cdFx0XHRpZiAoY2FsY3VsYXRlU3RyaW5nWzFdID09IDEpIHtcclxuXHRcdFx0XHR0aGlzLndpZHRoQ2FsY3VsYXRvciA9IHNpemUgKyBcIiVcIjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLndpZHRoQ2FsY3VsYXRvciA9IFwiY2FsYyhcIisgc2l6ZSArIFwiJSAtIDJweClcIjtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy53aWR0aENhbGN1bGF0b3IgPSBcIjEwMCVcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvY2Vzc0NhbGxCYWNrKGV2ZW50KSB7XHJcblx0XHRldmVudC5yb3dJbmRleCA9IHRoaXMuYWN0aW9uRGF0YUluZGV4O1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KGV2ZW50KVxyXG5cdH1cclxuXHRwcm9jZXNzUGFuZWxDYWxsQmFjayhldmVudCkge1xyXG5cdFx0dGhpcy5lbWl0RmllbGRTZWxlY3QgPSB0cnVlO1xyXG5cdFx0bGV0IGRhdGFFdmVudCA9IE9iamVjdC5hc3NpZ24oZXZlbnQse1xyXG5cdFx0XHRjb250YWluZXJJbmRleDp0aGlzLmNvbnRhaW5lckluZGV4XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KGRhdGFFdmVudCk7XHJcblx0XHR0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PntcclxuXHRcdFx0dGhpcy5lbWl0RmllbGRTZWxlY3QgPSBmYWxzZTtcclxuXHRcdH0pXHJcblx0fVxyXG5cdGNhbGxQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcblx0XHRpZiAoIXRoaXMuZW1pdEZpZWxkU2VsZWN0KSB7XHJcblx0XHRcdHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRmaWVsZE5hbWU6IG51bGwsXHJcblx0XHRcdFx0ZmllbGRJbmRleDogbnVsbCxcclxuXHRcdFx0XHRjb250YWluZXJJbmRleDp0aGlzLmNvbnRhaW5lckluZGV4XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXREeW5hbWljSW5wdXQoaW5wdXRJbmRleCkge1xyXG5cdFx0bGV0IGlucHV0Q29tcG9uZW50ID0gdGhpcy5pbnB1dENoaWxkLmZpbmQoaW5zdGFudElucHV0ID0+IGluc3RhbnRJbnB1dC5pbnB1dEluZGV4ID09IGlucHV0SW5kZXgpO1xyXG5cdFx0cmV0dXJuIGlucHV0Q29tcG9uZW50O1xyXG5cdH1cclxuXHJcbiAgICBjaGVja1JlUmVuZGVyKGZpZWxkTmFtZSkge1xyXG5cdFx0aWYgKHRoaXMucmVSZW5kZXJGaWVsZC5sZW5ndGggIT0gMCAmJiB0aGlzLnJlUmVuZGVyRmllbGQuaW5kZXhPZihmaWVsZE5hbWUpID4gLTEpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuIl19