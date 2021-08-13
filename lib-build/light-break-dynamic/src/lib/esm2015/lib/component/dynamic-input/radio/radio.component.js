import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
class DynamicBehaviorComponentimplements {
}
export class RadioComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
        this.selectAll = false;
        this.singleLine = "";
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
        if (this.fieldCreation.displaySingleLine == true) {
            this.singleLine = "singleLine";
        }
    }
    processCall(data) {
    }
    processChange($event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    }
}
RadioComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKey(data[fieldCreation.fieldName])\">\r\n            <div>\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"radio\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{dataIndex}}_{{rowIndex}}\"\r\n                               value=\"{{fieldCreation.valueList[listIndex].value}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n\r\n                    </div>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
RadioComponent.ctorParameters = () => [
    { type: AnimationService }
];
RadioComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L3JhZGlvL3JhZGlvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRXBFLE1BQU0sa0NBQWtDO0NBQ3ZDO0FBS0QsTUFBTSxPQUFPLGNBQWUsU0FBUSx3QkFBd0I7SUFhM0QsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFSZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFckIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBSWYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ1AsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7U0FDbEM7SUFDUixDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQUk7SUFFaEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFNBQVM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEIsTUFBTSxFQUFDLFFBQVE7WUFDZixZQUFZLEVBQUUsU0FBUztZQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDdEUsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUFDLENBQUM7SUFDSixDQUFDOzs7WUFyREQsU0FBUyxTQUFDO2dCQUNWLDJqRUFBcUM7YUFDckM7OztZQVBPLGdCQUFnQjs7O21CQVN0QixLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUNGLEtBQUs7dUJBQ1IsTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gXCIuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5jbGFzcyBEeW5hbWljQmVoYXZpb3JDb21wb25lbnRpbXBsZW1lbnRzIHtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGVVcmw6ICcuL3JhZGlvLmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFJhZGlvQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0b2JqS2V5ID0gT2JqZWN0LmtleXM7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdHNlbGVjdEFsbCA9IGZhbHNlO1xyXG5cdHNpbmdsZUxpbmUgPSBcIlwiO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcblx0XHRzdXBlcihhbmltYXRpb25TZXJ2aWNlKTtcclxuXHRcdHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMiA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHRcdH1cclxuICAgICAgICBpZiAodGhpcy5maWVsZENyZWF0aW9uLmRpc3BsYXlTaW5nbGVMaW5lID09IHRydWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaW5nbGVMaW5lID0gXCJzaW5nbGVMaW5lXCI7XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvY2Vzc0NoYW5nZSgkZXZlbnQsIHMsIHZhbHVlTGlzdCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0YWN0aW9uOidjaGFuZ2UnLFxyXG5cdFx0XHRkaXNwbGF5VmFsdWU6IHZhbHVlTGlzdCxcclxuXHRcdFx0Y3VycmVudFZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bdmFsdWVMaXN0LnZhbHVlXSxcclxuXHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iXX0=