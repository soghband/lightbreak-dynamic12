import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export class TextAreaComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.animateProcess();
    }
    ngOnInit() {
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = "dp2Col1";
                break;
            case 2:
                this.columnCalculate = "dp2Col2";
                break;
            case 3:
                this.columnCalculate = "dp2Col3";
                break;
            case 4:
                this.columnCalculate = "dp2Col4";
                break;
            default:
                this.columnCalculate = "";
        }
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [""];
            }
        }
    }
    processCall(data) {
    }
}
TextAreaComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n      <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n        <textarea id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                  [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                  [readonly]=\"getDisable()\"\r\n                  (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                  (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                  (keyup)=\"processCallBack($event,'keyup',dataIndex)\"\r\n                  (keypress)=\"processCallBack($event,'keypress',dataIndex)\"\r\n                  (keydown)=\"processCallBack($event,'keydown',dataIndex)\"\r\n                  (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                  (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                  placeholder=\"{{fieldCreation.placeholder}}\"\r\n                  maxlength=\"{{fieldCreation.maxLength}}\"></textarea>\r\n      </div>\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
            },] }
];
TextAreaComponent.ctorParameters = () => [
    { type: AnimationService }
];
TextAreaComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1hcmVhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC90ZXh0LWFyZWEvdGV4dC1hcmVhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSx3QkFBd0I7SUFVOUQsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFMZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0MsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFHckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRSxRQUFRO1FBQ1AsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFO1lBQzlCLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxFQUFFO2dCQUN0RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZGO3FCQUFNLElBQUcsT0FBTSxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO29CQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN2RTthQUNEO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Q7SUFDRixDQUFDO0lBQ0osV0FBVyxDQUFDLElBQUk7SUFFaEIsQ0FBQzs7O1lBakRELFNBQVMsU0FBQztnQkFDVCwyOURBQXlDO2FBQzFDOzs7WUFKTyxnQkFBZ0I7OzttQkFNdEIsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDRixLQUFLO3VCQUNSLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RleHQtYXJlYS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRleHRBcmVhQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG5cdCAgICBzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHQgICAgY2FzZSAxIDpcclxuXHRcdFx0ICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdCAgICBicmVhaztcclxuXHRcdCAgICBjYXNlIDIgOlxyXG5cdFx0XHQgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0ICAgIGNhc2UgMyA6XHJcblx0XHRcdCAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHQgICAgYnJlYWs7XHJcblx0XHQgICAgY2FzZSA0IDpcclxuXHRcdFx0ICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdCAgICBicmVhaztcclxuXHRcdCAgICBkZWZhdWx0IDpcclxuXHRcdFx0ICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHQgICAgfVxyXG5cdCAgICBpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XHJcblx0XHQgICAgaWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHQgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpKSB7XHJcblx0XHRcdFx0ICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG5cdFx0XHQgICAgfSBlbHNlIGlmKHR5cGVvZiggdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHQgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW3RoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0XTtcclxuXHRcdFx0ICAgIH1cclxuXHRcdCAgICB9IGVsc2Uge1xyXG5cdFx0XHQgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW1wiXCJdO1xyXG5cdFx0ICAgIH1cclxuXHQgICAgfVxyXG4gICAgfVxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG59XHJcbiJdfQ==