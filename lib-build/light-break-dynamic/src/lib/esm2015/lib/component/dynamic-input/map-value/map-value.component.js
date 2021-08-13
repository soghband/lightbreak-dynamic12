import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
let MapValueComponent = class MapValueComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.columnCalculate = "";
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
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    }
    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    }
    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
        return true;
    }
};
MapValueComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapValueComponent.prototype, "panelCallBack", void 0);
MapValueComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"dp2Table fullWidth dp2TableSpace\">\r\n            <div class=\"dp2Row posRelative\">\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"displayPanel\">\r\n                        Display\r\n                    </div>\r\n                </div>\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"valuePanel\">\r\n                        Value\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                <div class=\"dp2Row\">\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} displayPanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_display_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} valuePanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_value_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].value\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                            <div *ngIf=\"option.mode != 'view'\" class=\"deleteBtn\"\r\n                                 (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ng-container>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div *ngIf=\"!(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                    class=\"glyphicon glyphicon-plus\"></span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], MapValueComponent);
export { MapValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvbWFwLXZhbHVlL21hcC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEUsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSx3QkFBd0I7SUFXM0QsWUFBWSxnQkFBbUM7UUFDM0MsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFObEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBSWxCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0QsUUFBUTtRQUNKLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDdEMsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FB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QyxZQUFZLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKLENBQUE7O1lBNUVrQyxnQkFBZ0I7O0FBVnRDO0lBQVIsS0FBSyxFQUFFOzsrQ0FBTTtBQUNMO0lBQVIsS0FBSyxFQUFFOztpREFBUTtBQUNQO0lBQVIsS0FBSyxFQUFFOzt3REFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFOztxREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOzttREFBVTtBQUNSO0lBQVQsTUFBTSxFQUFFOzttREFBK0I7QUFDOUI7SUFBVCxNQUFNLEVBQUU7O3dEQUFvQztBQVBwQyxpQkFBaUI7SUFIN0IsU0FBUyxDQUFDO1FBQ1QsMjJKQUF5QztLQUMxQyxDQUFDO3FDQVlpQyxnQkFBZ0I7R0FYdEMsaUJBQWlCLENBdUY3QjtTQXZGWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFwLXZhbHVlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwVmFsdWVDb21wb25lbnQgZXh0ZW5kcyBEeW5hbWljQmVoYXZpb3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgZGF0YTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIGZpZWxkQ3JlYXRpb247XHJcbiAgICBASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcbiAgICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcbiAgICBvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcbiAgICB0ZW1wVmFsdWU7XHJcbiAgICBjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuICAgIH1cclxuICAgIG5nT25Jbml0ICgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMSA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMiA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMyA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNCA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFkZE11bHRpVmFsKCkge1xyXG4gICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ucHVzaCh7XHJcbiAgICAgICAgICBkaXNwbGF5OlwiXCIsXHJcbiAgICAgICAgICB2YWx1ZTpcIlwiXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBkZWxldGVNdWx0aVZhbChkYXRhSW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0tleVVwKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGV2ZW50OmV2ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb246YWN0aW9uLFxyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ID09IHRydWUgJiYgKGV2ZW50LmNoYXJDb2RlID09IDg2IHx8IGV2ZW50LndoaWNoID09IDg2KSl7XHJcbiAgICAgICAgICAgIGlmIChTdHJpbmcodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0pLm1hdGNoKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0gdGhpcy50ZW1wVmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0tleURvd24oZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy50ZW1wVmFsdWUgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XTtcclxuICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBldmVudDpldmVudCxcclxuICAgICAgICAgICAgYWN0aW9uOmFjdGlvbixcclxuICAgICAgICAgICAgZGF0YUluZGV4OmRhdGFJbmRleCxcclxuICAgICAgICAgICAgZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByb2Nlc3NDYWxsQmFja0tleVByZXNzKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGV2ZW50OmV2ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb246YWN0aW9uLFxyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9IDQ2ICYmIGV2ZW50LmtleUNvZGUgIT0gOCAmJiBldmVudC5jdHJsS2V5ICE9IHRydWUgJiYgZXZlbnQuYWx0S2V5ICE9IHRydWUpe1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gZXZlbnQua2V5O1xyXG4gICAgICAgICAgICBpZiAoU3RyaW5nKGtleSkubWF0Y2godGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==