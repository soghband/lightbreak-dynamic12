import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export class SelectBoxComponent extends DynamicBehaviorComponent {
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
                if (typeof (this.fieldCreation.valueList[0]) != "undefined") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.valueList[0].value];
                }
            }
        }
    }
    processCall(data) {
    }
    processChange(event, action, dataIndex) {
        let valueObj = [];
        for (let dataIndexRaw in this.data[this.fieldCreation.fieldName]) {
            let value = this.data[this.fieldCreation.fieldName][dataIndexRaw];
            for (let valueListRow of this.fieldCreation.valueList) {
                if (valueListRow.value == value) {
                    valueObj.push(valueListRow);
                }
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            valueObj: valueObj,
            fieldName: this.fieldCreation.fieldName
        });
    }
    checkValueList(valueList) {
        if (valueList != undefined) {
            return true;
        }
        return false;
    }
}
SelectBoxComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{checkRequire(dataIndex)}}\">\r\n                <ng-container *ngIf=\"checkValueList(fieldCreation.valueList)\">\r\n                    <select class=\"select-style-custom {{fieldCreation.widthType == 'full' ?  'fullWidth' : ''}}\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                            [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                            [disabled]=\"getDisable()\"\r\n                            (change)=\"processChange($event,'change',dataIndex)\">\r\n                        <option *ngFor=\"let selectRow of fieldCreation.valueList\" value=\"{{selectRow.value}}\">{{selectRow.display}}</option>\r\n                    </select>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
SelectBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
SelectBoxComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWJveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvc2VsZWN0LWJveC9zZWxlY3QtYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSx3QkFBd0I7SUFVL0QsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFMZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFJckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ1AsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFO1lBQzlCLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxFQUFFO2dCQUN0RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3ZGO3FCQUFNLElBQUcsT0FBTSxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO29CQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN2RTthQUNEO2lCQUFNO2dCQUNOLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxFQUFFO29CQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEY7YUFDRDtTQUNEO0lBQ0YsQ0FBQztJQUNELFdBQVcsQ0FBQyxJQUFJO0lBRWhCLENBQUM7SUFDRCxhQUFhLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTO1FBQ25DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbEUsS0FBSSxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtnQkFDckQsSUFBSSxZQUFZLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRTtvQkFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDNUI7YUFDRDtTQUNEO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbEIsS0FBSyxFQUFDLEtBQUs7WUFDWCxNQUFNLEVBQUMsTUFBTTtZQUNiLFNBQVMsRUFBQyxTQUFTO1lBQ25CLFFBQVEsRUFBQyxRQUFRO1lBQ2pCLFNBQVMsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7U0FDdEMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVFLGNBQWMsQ0FBQyxTQUFTO1FBQzFCLElBQUksU0FBUyxJQUFJLFNBQVMsRUFBQztZQUMxQixPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDWCxDQUFDOzs7WUE3RUosU0FBUyxTQUFDO2dCQUNWLDR4REFBMEM7YUFDMUM7OztZQUpPLGdCQUFnQjs7O21CQU10QixLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUNGLEtBQUs7dUJBQ1IsTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gXCIuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHR0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWJveC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdEJveENvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRjb2x1bW5DYWxjdWxhdGU7XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHRcdGNhc2UgMSA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDFcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgNCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDRcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gXCJhZGRcIikge1xyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KTtcclxuXHRcdFx0XHR9IGVsc2UgaWYodHlwZW9mKCB0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW3RoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKHR5cGVvZih0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0WzBdKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFswXS52YWx1ZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG5cdHByb2Nlc3NDaGFuZ2UoZXZlbnQsYWN0aW9uLGRhdGFJbmRleCkge1xyXG5cdFx0bGV0IHZhbHVlT2JqID0gW107XHJcblx0XHRmb3IgKGxldCBkYXRhSW5kZXhSYXcgaW4gdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSB7XHJcblx0XHRcdGxldCB2YWx1ZSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhSYXddO1xyXG5cdFx0XHRmb3IobGV0IHZhbHVlTGlzdFJvdyBvZiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdFx0aWYgKHZhbHVlTGlzdFJvdy52YWx1ZSA9PSB2YWx1ZSkge1xyXG5cdFx0XHRcdFx0dmFsdWVPYmoucHVzaCh2YWx1ZUxpc3RSb3cpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OmV2ZW50LFxyXG5cdFx0XHRhY3Rpb246YWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG5cdFx0XHR2YWx1ZU9iajp2YWx1ZU9iaixcclxuXHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNoZWNrVmFsdWVMaXN0KHZhbHVlTGlzdCkge1xyXG5cdFx0aWYgKHZhbHVlTGlzdCAhPSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG4iXX0=