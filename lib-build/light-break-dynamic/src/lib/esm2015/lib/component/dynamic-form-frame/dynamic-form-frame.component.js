import { Component, EventEmitter, Input, Output } from '@angular/core';
export class DynamicFormFrameComponent {
    constructor() {
        this.showDeleteRow = false;
        this.callback = new EventEmitter();
    }
    ngOnInit() {
    }
    deleteRowProcess() {
        this.callback.emit({
            action: "deleteRow",
            rowIndex: this.rowIndex
        });
    }
}
DynamicFormFrameComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-dynamic-form-frame',
                template: "<div class=\"mainPanelDF\">\r\n    <div class=\"panelAlign\">\r\n        <div class=\"header\">\r\n            <div>{{header[rowIndex]}}</div>\r\n            <div class=\"closeBtn {{showDeleteRow ? 'show':'hide'}}\" id=\"delete_row_frame_{{rowIndex}}\" (click)=\"deleteRowProcess()\">\r\n                <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"contentPanel\">\r\n            <ng-content></ng-content>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"
            },] }
];
DynamicFormFrameComponent.ctorParameters = () => [];
DynamicFormFrameComponent.propDecorators = {
    header: [{ type: Input }],
    showDeleteRow: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callback: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWZyYW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1mb3JtLWZyYW1lL2R5bmFtaWMtZm9ybS1mcmFtZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU03RSxNQUFNLE9BQU8seUJBQXlCO0lBS2xDO1FBSFMsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFckIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFeEMsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZixNQUFNLEVBQUMsV0FBVztZQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQzs7O1lBcEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxnaUJBQWtEO2FBQ3JEOzs7O3FCQUVJLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xiOS1keW5hbWljLWZvcm0tZnJhbWUnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtZm9ybS1mcmFtZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtRnJhbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgaGVhZGVyO1xyXG4gICAgQElucHV0KCkgc2hvd0RlbGV0ZVJvdyA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcbiAgICBAT3V0cHV0KCkgY2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVSb3dQcm9jZXNzKCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGFjdGlvbjpcImRlbGV0ZVJvd1wiLFxyXG4gICAgICAgICAgICByb3dJbmRleDogdGhpcy5yb3dJbmRleFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19