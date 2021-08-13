import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
export class ButtonIconComponent extends DynamicBehaviorComponent {
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
                this.columnCalculate = 'dp2Col1';
                break;
            case 2:
                this.columnCalculate = 'dp2Col2';
                break;
            case 3:
                this.columnCalculate = 'dp2Col3';
                break;
            case 4:
                this.columnCalculate = 'dp2Col4';
                break;
            default:
                this.columnCalculate = '';
        }
    }
    processClick(event, action, dataIndex, valueList) {
        if (!this.getDisable()) {
            if (typeof (this.data[this.fieldCreation.fieldName]) != 'undefined' && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != 'undefined') {
                this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                valueList: valueList,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
}
ButtonIconComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n\r\n        <div class=\"icon {{(getDisable() ? 'icon-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n             (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n             (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
            },] }
];
ButtonIconComponent.ctorParameters = () => [
    { type: AnimationService }
];
ButtonIconComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2J1dHRvbi1pY29uL2J1dHRvbi1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSx3QkFBd0I7SUFXN0QsWUFBWSxnQkFBbUM7UUFDM0MsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFObEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBS2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsUUFBUTtRQUNKLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDdEMsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNwQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxXQUFXLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLFdBQVcsRUFBRTtnQkFDL0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDeEU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsU0FBUztnQkFDcEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7YUFDMUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLDA3Q0FBMkM7YUFDOUM7OztZQUpPLGdCQUFnQjs7O21CQU1uQixLQUFLO3FCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gJy4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnQnO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLWljb24uY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uSWNvbkNvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBkYXRhO1xyXG4gICAgQElucHV0KCkgb3B0aW9uO1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG4gICAgY29sdW1uQ2FsY3VsYXRlO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wxJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSAnZHAyQ29sMic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNCA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2w0JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NDbGljayhldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgsIHZhbHVlTGlzdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5nZXREaXNhYmxlKCkpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdKSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB2YWx1ZUxpc3QudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZUxpc3Q6IHZhbHVlTGlzdCxcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19