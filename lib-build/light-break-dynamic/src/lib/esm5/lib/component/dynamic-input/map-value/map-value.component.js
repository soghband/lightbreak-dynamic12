import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
var MapValueComponent = /** @class */ (function (_super) {
    __extends(MapValueComponent, _super);
    function MapValueComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.columnCalculate = "";
        _this.objKeys = Object.keys;
        _this.animateProcess();
        return _this;
    }
    MapValueComponent.prototype.ngOnInit = function () {
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
    };
    MapValueComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    };
    MapValueComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    MapValueComponent.prototype.processKeyUp = function (event, action, dataIndex) {
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
    };
    MapValueComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
    };
    MapValueComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }
        return true;
    };
    MapValueComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
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
    return MapValueComponent;
}(DynamicBehaviorComponent));
export { MapValueComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXZhbHVlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvbWFwLXZhbHVlL21hcC12YWx1ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBdUMscUNBQXdCO0lBVzNELDJCQUFZLGdCQUFtQztRQUEvQyxZQUNJLGtCQUFNLGdCQUFnQixDQUFDLFNBRTFCO1FBUlMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLGFBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBSWxCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7SUFDMUIsQ0FBQztJQUNELG9DQUFRLEdBQVI7UUFDSSxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFO1lBQ3RDLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDakMsTUFBTTtZQUNWLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FB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QUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztnQkEzRThCLGdCQUFnQjs7SUFWdEM7UUFBUixLQUFLLEVBQUU7O21EQUFNO0lBQ0w7UUFBUixLQUFLLEVBQUU7O3FEQUFRO0lBQ1A7UUFBUixLQUFLLEVBQUU7OzREQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7O3lEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7O3VEQUFVO0lBQ1I7UUFBVCxNQUFNLEVBQUU7O3VEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7NERBQW9DO0lBUHBDLGlCQUFpQjtRQUg3QixTQUFTLENBQUM7WUFDVCwyMkpBQXlDO1NBQzFDLENBQUM7eUNBWWlDLGdCQUFnQjtPQVh0QyxpQkFBaUIsQ0F1RjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXZGRCxDQUF1Qyx3QkFBd0IsR0F1RjlEO1NBdkZZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tICcuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50JztcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtdmFsdWUuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXBWYWx1ZUNvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBkYXRhO1xyXG4gICAgQElucHV0KCkgb3B0aW9uO1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuICAgIG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuICAgIHRlbXBWYWx1ZTtcclxuICAgIGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgc3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG4gICAgfVxyXG4gICAgbmdPbkluaXQgKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuICAgICAgICAgICAgY2FzZSAxIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0IDpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWRkTXVsdGlWYWwoKSB7XHJcbiAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5wdXNoKHtcclxuICAgICAgICAgIGRpc3BsYXk6XCJcIixcclxuICAgICAgICAgIHZhbHVlOlwiXCJcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGRlbGV0ZU11bHRpVmFsKGRhdGFJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc3BsaWNlKGRhdGFJbmRleCwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzS2V5VXAoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgPT0gdHJ1ZSAmJiAoZXZlbnQuY2hhckNvZGUgPT0gODYgfHwgZXZlbnQud2hpY2ggPT0gODYpKXtcclxuICAgICAgICAgICAgaWYgKFN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSkubWF0Y2godGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB0aGlzLnRlbXBWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcm9jZXNzS2V5RG93bihldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuICAgICAgICB0aGlzLnRlbXBWYWx1ZSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdO1xyXG4gICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGV2ZW50OmV2ZW50LFxyXG4gICAgICAgICAgICBhY3Rpb246YWN0aW9uLFxyXG4gICAgICAgICAgICBkYXRhSW5kZXg6ZGF0YUluZGV4LFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJvY2Vzc0NhbGxCYWNrS2V5UHJlc3MoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgZXZlbnQ6ZXZlbnQsXHJcbiAgICAgICAgICAgIGFjdGlvbjphY3Rpb24sXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDpkYXRhSW5kZXgsXHJcbiAgICAgICAgICAgIGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT0gNDYgJiYgZXZlbnQua2V5Q29kZSAhPSA4ICYmIGV2ZW50LmN0cmxLZXkgIT0gdHJ1ZSAmJiBldmVudC5hbHRLZXkgIT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBldmVudC5rZXk7XHJcbiAgICAgICAgICAgIGlmIChTdHJpbmcoa2V5KS5tYXRjaCh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuIl19