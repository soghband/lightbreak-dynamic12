import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
export class MapValueComponent extends DynamicBehaviorComponent {
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
}
MapValueComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"dp2Table fullWidth dp2TableSpace\">\r\n            <div class=\"dp2Row posRelative\">\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"displayPanel\">\r\n                        Display\r\n                    </div>\r\n                </div>\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"valuePanel\">\r\n                        Value\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                <div class=\"dp2Row\">\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} displayPanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_display_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} valuePanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_value_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].value\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                            <div *ngIf=\"option.mode != 'view'\" class=\"deleteBtn\"\r\n                                 (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ng-container>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div *ngIf=\"!(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                    class=\"glyphicon glyphicon-plus\"></span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
MapValueComponent.ctorParameters = () => [
    { type: AnimationService }
];
MapValueComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9tYXAtdmFsdWUvbWFwLXZhbHVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSx3QkFBd0I7SUFXM0QsWUFBWSxnQkFBbUM7UUFDM0MsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFObEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBSWxCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0QsUUFBUTtRQUNKLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDdEMsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxDQUFDO2dC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QUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7O1lBekZKLFNBQVMsU0FBQztnQkFDVCwyMkpBQXlDO2FBQzFDOzs7WUFKTyxnQkFBZ0I7OzttQkFNbkIsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tICcuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50JztcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtdmFsdWUuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBWYWx1ZUNvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBkYXRhO1xyXG4gICAgQElucHV0KCkgb3B0aW9uO1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuICAgIG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuICAgIHRlbXBWYWx1ZTtcclxuICAgIGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQgKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0IDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkTXVsdGlWYWwoKSB7XHJcbiAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5wdXNoKHtcclxuICAgICAgICAgIGRpc3BsYXk6XCJcIixcclxuICAgICAgICAgIHZhbHVlOlwiXCJcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGRlbGV0ZU11bHRpVmFsKGRhdGFJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc3BsaWNlKGRhdGFJbmRleCwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzS2V5VXAoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgPT0gdHJ1ZSAmJiAoZXZlbnQuY2hhckNvZGUgPT0gODYgfHwgZXZlbnQud2hpY2ggPT0gODYpKXtcclxuICAgICAgICAgICAgaWYgKFN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSkubWF0Y2godGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB0aGlzLnRlbXBWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcm9jZXNzS2V5RG93bihldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuICAgICAgICB0aGlzLnRlbXBWYWx1ZSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdO1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGV2ZW50OmV2ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb246YWN0aW9uLFxyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0NhbGxCYWNrS2V5UHJlc3MoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT0gNDYgJiYgZXZlbnQua2V5Q29kZSAhPSA4ICYmIGV2ZW50LmN0cmxLZXkgIT0gdHJ1ZSAmJiBldmVudC5hbHRLZXkgIT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5rZXk7XHJcbiAgICAgICAgICAgIGlmIChTdHJpbmcoa2V5KS5tYXRjaCh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuIl19