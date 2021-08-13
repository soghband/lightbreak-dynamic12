import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
var DynamicFormFrameComponent = /** @class */ (function () {
    function DynamicFormFrameComponent() {
        this.showDeleteRow = false;
        this.callback = new EventEmitter();
    }
    DynamicFormFrameComponent.prototype.ngOnInit = function () {
    };
    DynamicFormFrameComponent.prototype.deleteRowProcess = function () {
        this.callback.emit({
            action: "deleteRow",
            rowIndex: this.rowIndex
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormFrameComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormFrameComponent.prototype, "showDeleteRow", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicFormFrameComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicFormFrameComponent.prototype, "callback", void 0);
    DynamicFormFrameComponent = __decorate([
        Component({
            selector: 'lb9-dynamic-form-frame',
            template: "<div class=\"mainPanelDF\">\r\n    <div class=\"panelAlign\">\r\n        <div class=\"header\">\r\n            <div>{{header[rowIndex]}}</div>\r\n            <div class=\"closeBtn {{showDeleteRow ? 'show':'hide'}}\" id=\"delete_row_frame_{{rowIndex}}\" (click)=\"deleteRowProcess()\">\r\n                <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"contentPanel\">\r\n            <ng-content></ng-content>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"
        }),
        __metadata("design:paramtypes", [])
    ], DynamicFormFrameComponent);
    return DynamicFormFrameComponent;
}());
export { DynamicFormFrameComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWZyYW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtZm9ybS1mcmFtZS9keW5hbWljLWZvcm0tZnJhbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTTdFO0lBS0k7UUFIUyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUVyQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV4QyxDQUFDO0lBRUQsNENBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxvREFBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNmLE1BQU0sRUFBQyxXQUFXO1lBQ2xCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQixDQUFDLENBQUE7SUFDTixDQUFDO0lBZlE7UUFBUixLQUFLLEVBQUU7OzZEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7O29FQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7K0RBQVU7SUFDUjtRQUFULE1BQU0sRUFBRTs7K0RBQStCO0lBSi9CLHlCQUF5QjtRQUpyQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLGdpQkFBa0Q7U0FDckQsQ0FBQzs7T0FDVyx5QkFBeUIsQ0FpQnJDO0lBQUQsZ0NBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWpCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xiOS1keW5hbWljLWZvcm0tZnJhbWUnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS1mcmFtZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtRnJhbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgaGVhZGVyO1xyXG4gICAgQElucHV0KCkgc2hvd0RlbGV0ZVJvdyA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcbiAgICBAT3V0cHV0KCkgY2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVSb3dQcm9jZXNzKCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGFjdGlvbjpcImRlbGV0ZVJvd1wiLFxyXG4gICAgICAgICAgICByb3dJbmRleDogdGhpcy5yb3dJbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19