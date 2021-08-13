import { Component, EventEmitter, Input, Output } from '@angular/core';
export class DynamicFormLabelPanelComponent {
    constructor() {
        this.panelCallBack = new EventEmitter();
    }
    ngOnInit() {
    }
    getLabelDisplay() {
        if (typeof (this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
            return "dp2hide";
        }
        else if (this.option.labelAlign == "left") {
            return "singleLine";
        }
        else {
            return "";
        }
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit(event);
    }
}
DynamicFormLabelPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-dynamic-form-label-panel',
                template: "<div *ngIf=\"fieldCreation.label != ''\" class=\"dp2Label {{getLabelDisplay()}} {{option.labelAlign == 'left' ? 'vAlignTop alignRight' : ''}}\"\r\n     [style.width]=\"width\" (click)=\"processPanelCallBack($event)\">\r\n  <div class=\"{{fieldCreation.require ? 'requireLabel':''}}\" [innerHTML]=\"fieldCreation.label\"></div>\r\n</div>\r\n"
            },] }
];
DynamicFormLabelPanelComponent.ctorParameters = () => [];
DynamicFormLabelPanelComponent.propDecorators = {
    fieldCreation: [{ type: Input }],
    option: [{ type: Input }],
    width: [{ type: Input }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWxhYmVsLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1mb3JtLWxhYmVsLXBhbmVsL2R5bmFtaWMtZm9ybS1sYWJlbC1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU03RSxNQUFNLE9BQU8sOEJBQThCO0lBS3ZDO1FBRFUsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRTdDLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksT0FBTyxFQUFFO1lBQ3pILE9BQU8sU0FBUyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLEVBQUU7WUFDekMsT0FBTyxZQUFZLENBQUE7U0FDdEI7YUFBTTtZQUNILE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBQ0Qsb0JBQW9CLENBQUMsS0FBSztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLGdXQUF3RDthQUMzRDs7Ozs0QkFFSSxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSzs0QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktZHluYW1pYy1mb3JtLWxhYmVsLXBhbmVsJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWZvcm0tbGFiZWwtcGFuZWwuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUxhYmVsUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIHdpZHRoO1xyXG4gICAgQE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMYWJlbERpc3BsYXkoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24ubGFiZWwpID09IFwidW5kZWZpbmVkXCIgfHwgdGhpcy5maWVsZENyZWF0aW9uLmxhYmVsID09IFwiXCIgfHwgdGhpcy5vcHRpb24uZGlzcGxheU1vZGUgPT0gXCJ0YWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImRwMmhpZGVcIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9uLmxhYmVsQWxpZ24gPT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic2luZ2xlTGluZVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcbn1cclxuIl19