import { __decorate, __extends, __metadata, __values } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var SwappingBoxComponent = /** @class */ (function (_super) {
    __extends(SwappingBoxComponent, _super);
    function SwappingBoxComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.modeDisplay = "";
        _this.objKeys = Object.keys;
        _this.optionText = "Option";
        _this.selectedText = "Selected";
        _this.selectAllText = "Select All";
        _this.removeAllText = "Remove All";
        _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        _this.filter = "";
        _this.filterToggle = "filterInvisible";
        _this.animateProcess();
        return _this;
    }
    SwappingBoxComponent.prototype.ngOnInit = function () {
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
            this.modeDisplay = "dp2hide";
        }
        else {
            this.modeDisplay = "";
        }
        if (this.fieldCreation.optionText) {
            this.optionText = this.fieldCreation.optionText;
        }
        if (this.fieldCreation.selectedText) {
            this.selectedText = this.fieldCreation.selectedText;
        }
        if (this.fieldCreation.selectAllText) {
            this.selectAllText = this.fieldCreation.selectAllText;
        }
        if (this.fieldCreation.removeAllText) {
            this.removeAllText = this.fieldCreation.removeAllText;
        }
    };
    SwappingBoxComponent.prototype.processCall = function (data) {
    };
    SwappingBoxComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    };
    SwappingBoxComponent.prototype.checkDestData = function (valueList) {
        var e_1, _a;
        var checkValue = valueList.value;
        var checkDisplay = valueList.display.toLowerCase();
        var foundFlag = false;
        try {
            for (var _b = __values(this.data[this.fieldCreation.fieldName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dataRow = _c.value;
                if (dataRow.value == checkValue) {
                    foundFlag = true;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (foundFlag == true) {
            return false;
        }
        if (this.filter.length > 0 && checkDisplay.indexOf(this.filter.toLowerCase()) == -1) {
            return false;
        }
        return true;
    };
    SwappingBoxComponent.prototype.transferData = function (valueIndex) {
        var e_2, _a;
        if (!this.getDisable()) {
            var value = this.fieldCreation.valueList[valueIndex].value;
            var foundFlag = false;
            try {
                for (var _b = __values(this.data[this.fieldCreation.fieldName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var dataRow = _c.value;
                    if (dataRow.value == value) {
                        foundFlag = true;
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (foundFlag == false) {
                if (typeof (this.data[this.fieldCreation.fieldName]) == "undefined") {
                    this.data[this.fieldCreation.fieldName] = [];
                }
                this.data[this.fieldCreation.fieldName].push(this.fieldCreation.valueList[valueIndex]);
            }
            var valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "add",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        }
    };
    SwappingBoxComponent.prototype.removeData = function (dataIndex) {
        if (!this.getDisable()) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            var valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "remove",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        }
    };
    SwappingBoxComponent.prototype.removeAll = function () {
        this.data[this.fieldCreation.fieldName] = [];
    };
    SwappingBoxComponent.prototype.selectAll = function () {
        this.data[this.fieldCreation.fieldName] = this.fieldCreation.valueList;
    };
    SwappingBoxComponent.prototype.toggleFilter = function () {
        if (this.filterToggle === "filterInvisible") {
            this.filterToggle = "filterVisible";
        }
        else {
            this.filter = "";
            this.filterToggle = "filterInvisible";
        }
    };
    SwappingBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SwappingBoxComponent.prototype, "panelCallBack", void 0);
    SwappingBoxComponent = __decorate([
        Component({
            template: "<div *ngIf=\"data[fieldCreation.fieldName]\" class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"  [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n            <div class=\"posRelative\">\r\n                <div class=\"dp2Table\">\r\n                    <div class=\"dp2Row\">\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"optionText\"></div>\r\n                                <div class=\"filterEnable\" (click)=\"toggleFilter()\"><span class=\"glyphicon glyphicon-search\"></span></div>\r\n                                <input type=\"text\" class=\"filter {{filterToggle}}\"\r\n                                       [readOnly]=\"filterToggle == 'filterInvisible'\"\r\n                                       [(ngModel)]=\"filter\" placeholder=\"Filter\"/>\r\n                            </div>\r\n                            <div class=\"source\">\r\n                                <ng-container *ngFor=\"let valueIndex of objKeys(fieldCreation.valueList)\">\r\n                                    <div class=\"source_select\" *ngIf=\"checkDestData(fieldCreation.valueList[valueIndex])\" (click)=\"transferData(valueIndex)\" [innerHTML]=\"fieldCreation.valueList[valueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"dp2Cell iconBox\">\r\n                            <abbr title=\"{{selectAllText}}\">\r\n                                <div class=\"selectAll\" (click)=\"selectAll()\"><span class=\"glyphicon glyphicon-forward\"></span></div>\r\n                            </abbr>\r\n                            <abbr title=\"{{removeAllText}}\">\r\n                                <div class=\"removeAll\" (click)=\"removeAll()\"><span class=\"glyphicon glyphicon-backward\"></span></div>\r\n                            </abbr>\r\n                        </div>\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"selectedText\"></div>\r\n                            </div>\r\n                            <div class=\"destination\">\r\n                                <ng-container *ngFor=\"let dataValueIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                                    <div class=\"source_select\" (click)=\"removeData(dataValueIndex)\" [innerHTML]=\"data[fieldCreation.fieldName][dataValueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n<div *ngIf=\"!data[fieldCreation.fieldName]\">Data undefined: {{fieldCreation.fieldName}}</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], SwappingBoxComponent);
    return SwappingBoxComponent;
}(DynamicBehaviorComponent));
export { SwappingBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhcHBpbmctYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvc3dhcHBpbmctYm94L3N3YXBwaW5nLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBMEMsd0NBQXdCO0lBa0JqRSw4QkFBWSxnQkFBbUM7UUFBL0MsWUFDQyxrQkFBTSxnQkFBZ0IsQ0FBQyxTQUV2QjtRQWZTLGNBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLG1CQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU3QyxpQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixhQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QixnQkFBVSxHQUFHLFFBQVEsQ0FBQztRQUN0QixrQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUMxQixtQkFBYSxHQUFHLFlBQVksQ0FBQztRQUM3QixtQkFBYSxHQUFHLFlBQVksQ0FBQztRQUNuQixzQkFBZ0IsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBQ2xFLFlBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixrQkFBWSxHQUFHLGlCQUFpQixDQUFDO1FBR2hDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7SUFDdkIsQ0FBQztJQUVELHVDQUFRLEdBQVI7UUFDQyxRQUFRLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFF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QUFVO0lBQ1g7UUFBVCxNQUFNLEVBQUU7OzBEQUErQjtJQUM5QjtRQUFULE1BQU0sRUFBRTs7K0RBQW9DO0lBUGpDLG9CQUFvQjtRQUhoQyxTQUFTLENBQUM7WUFDVCxvckhBQTRDO1NBQzdDLENBQUM7eUNBbUI4QixnQkFBZ0I7T0FsQm5DLG9CQUFvQixDQXdJaEM7SUFBRCwyQkFBQztDQUFBLEFBeElELENBQTBDLHdCQUF3QixHQXdJakU7U0F4SVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gXCIuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vc3dhcHBpbmctYm94LmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFN3YXBwaW5nQm94Q29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdG1vZGVEaXNwbGF5ID0gXCJcIjtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0b3B0aW9uVGV4dCA9IFwiT3B0aW9uXCI7XHJcblx0c2VsZWN0ZWRUZXh0ID0gXCJTZWxlY3RlZFwiO1xyXG5cdHNlbGVjdEFsbFRleHQgPSBcIlNlbGVjdCBBbGxcIjtcclxuXHRyZW1vdmVBbGxUZXh0ID0gXCJSZW1vdmUgQWxsXCI7XHJcbiAgICBwdWJsaWMgc2Nyb2xsYmFyT3B0aW9ucyA9IHsgYXhpczogJ3knLCB0aGVtZTogJ21pbmltYWwtZGFyaycgfTtcclxuXHRmaWx0ZXIgPSBcIlwiO1xyXG5cdGZpbHRlclRvZ2dsZSA9IFwiZmlsdGVySW52aXNpYmxlXCI7XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHRcdGNhc2UgMSA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDFcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgNCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDRcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gXCJhZGRcIikge1xyXG5cdFx0XHR0aGlzLm1vZGVEaXNwbGF5ID0gXCJkcDJoaWRlXCJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubW9kZURpc3BsYXkgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5vcHRpb25UZXh0KSB7XHJcblx0XHRcdHRoaXMub3B0aW9uVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5vcHRpb25UZXh0XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnNlbGVjdGVkVGV4dCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5zZWxlY3RlZFRleHRcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uc2VsZWN0QWxsVGV4dCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdEFsbFRleHQgPSB0aGlzLmZpZWxkQ3JlYXRpb24uc2VsZWN0QWxsVGV4dFxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5yZW1vdmVBbGxUZXh0KSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlQWxsVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5yZW1vdmVBbGxUZXh0XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG5cdHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcblx0XHR0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGZlaWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAgIGNoZWNrRGVzdERhdGEodmFsdWVMaXN0KSB7XHJcblx0XHRsZXQgY2hlY2tWYWx1ZSA9IHZhbHVlTGlzdC52YWx1ZTtcclxuXHRcdGxldCBjaGVja0Rpc3BsYXkgPSB2YWx1ZUxpc3QuZGlzcGxheS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBmb3VuZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBkYXRhUm93IG9mIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVJvdy52YWx1ZSA9PSBjaGVja1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0aWYgKGZvdW5kRmxhZyA9PSB0cnVlKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHQgICAgaWYgKHRoaXMuZmlsdGVyLmxlbmd0aCA+IDAgJiYgY2hlY2tEaXNwbGF5LmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPT0gLTEpIHtcclxuXHRcdCAgICByZXR1cm4gZmFsc2VcclxuXHQgICAgfVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmZXJEYXRhKHZhbHVlSW5kZXgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlzYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbdmFsdWVJbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YVJvdyBvZiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhUm93LnZhbHVlID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm91bmRGbGFnID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnB1c2godGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFt2YWx1ZUluZGV4XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdmFsdWVPYmogPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcImFkZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVPYmo6IHZhbHVlT2JqLFxyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlRGF0YShkYXRhSW5kZXgpIHtcclxuXHRcdGlmICghdGhpcy5nZXREaXNhYmxlKCkpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsMSk7XHJcblx0XHRcdGxldCB2YWx1ZU9iaiA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKTtcclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRhY3Rpb246XCJyZW1vdmVcIixcclxuXHRcdFx0XHR2YWx1ZU9iajp2YWx1ZU9iaixcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW1vdmVBbGwoKSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbXTtcclxuXHR9XHJcblx0c2VsZWN0QWxsKCkge1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdDtcclxuXHR9XHJcblx0dG9nZ2xlRmlsdGVyKCkge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyVG9nZ2xlID09PSBcImZpbHRlckludmlzaWJsZVwiKSB7XHJcblx0XHRcdHRoaXMuZmlsdGVyVG9nZ2xlID0gXCJmaWx0ZXJWaXNpYmxlXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmZpbHRlciA9IFwiXCJcclxuXHRcdFx0dGhpcy5maWx0ZXJUb2dnbGUgPSBcImZpbHRlckludmlzaWJsZVwiO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=