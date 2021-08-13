import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
let ButtonComponent = class ButtonComponent extends DynamicBehaviorComponent {
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
    }
    processClick(event, action, dataIndex, valueList) {
        if (!this.getDisable() && !this.disableList(valueList.value)) {
            if (typeof (this.data[this.fieldCreation.fieldName]) != "undefined" && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != "undefined") {
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
    disableList(value) {
        if (this.fieldCreation.disableList && this.fieldCreation.disableList.indexOf(value) > -1) {
            return true;
        }
        return false;
    }
};
ButtonComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "panelCallBack", void 0);
ButtonComponent = __decorate([
    Component({
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n\r\n      <div class=\"posRelative\">\r\n        <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n          <div class=\"btn-style-dynamic {{(fieldCreation.smallButton ? 'btn-small' : '')}}{{(getDisable() ? ' btn-disable' : '')}}{{(disableList(fieldCreation.valueList[valueListIndex].value) ? ' btn-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n               (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n               (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n        </ng-container>\r\n      </div>\r\n\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], ButtonComponent);
export { ButtonComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSx3QkFBd0I7SUFXNUQsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFOZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFLckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ1AsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtJQUNGLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkUsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksV0FBVyxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2hKLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2FBQ3JFO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xCLEtBQUssRUFBQyxLQUFLO2dCQUNYLE1BQU0sRUFBQyxNQUFNO2dCQUNiLFNBQVMsRUFBQyxTQUFTO2dCQUNuQixTQUFTLEVBQUMsU0FBUztnQkFDbkIsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUzthQUN0QyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFDRCxXQUFXLENBQUMsS0FBSztRQUNoQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN6RixPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0NBQ0QsQ0FBQTs7WUE1QytCLGdCQUFnQjs7QUFWdEM7SUFBUixLQUFLLEVBQUU7OzZDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7OytDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O3NEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7O21EQUFZO0FBQ1I7SUFBUixLQUFLLEVBQUU7O2lEQUFVO0FBQ1g7SUFBVCxNQUFNLEVBQUU7O2lEQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTs7c0RBQW9DO0FBUGpDLGVBQWU7SUFIM0IsU0FBUyxDQUFDO1FBQ1Ysa3BEQUFzQztLQUN0QyxDQUFDO3FDQVk4QixnQkFBZ0I7R0FYbkMsZUFBZSxDQXVEM0I7U0F2RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGVVcmw6ICcuL2J1dHRvbi5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRjb2x1bW5DYWxjdWxhdGU7XHJcblx0XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHRcdGNhc2UgMSA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDFcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgNCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDRcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvY2Vzc0NsaWNrKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCwgdmFsdWVMaXN0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdldERpc2FibGUoKSAmJiAhdGhpcy5kaXNhYmxlTGlzdCh2YWx1ZUxpc3QudmFsdWUpKSB7XHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSAhPSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZih0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSkgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0gdmFsdWVMaXN0LnZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0ZXZlbnQ6ZXZlbnQsXHJcblx0XHRcdFx0YWN0aW9uOmFjdGlvbixcclxuXHRcdFx0XHRkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG5cdFx0XHRcdHZhbHVlTGlzdDp2YWx1ZUxpc3QsXHJcblx0XHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGRpc2FibGVMaXN0KHZhbHVlKSB7XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmRpc2FibGVMaXN0ICYmIHRoaXMuZmllbGRDcmVhdGlvbi5kaXNhYmxlTGlzdC5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG4iXX0=