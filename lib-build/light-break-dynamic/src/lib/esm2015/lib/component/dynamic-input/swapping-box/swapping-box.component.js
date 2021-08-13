import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
let SwappingBoxComponent = class SwappingBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.modeDisplay = "";
        this.objKeys = Object.keys;
        this.optionText = "Option";
        this.selectedText = "Selected";
        this.selectAllText = "Select All";
        this.removeAllText = "Remove All";
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        this.filter = "";
        this.filterToggle = "filterInvisible";
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
    }
    processCall(data) {
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
    checkDestData(valueList) {
        let checkValue = valueList.value;
        let checkDisplay = valueList.display.toLowerCase();
        let foundFlag = false;
        for (let dataRow of this.data[this.fieldCreation.fieldName]) {
            if (dataRow.value == checkValue) {
                foundFlag = true;
                break;
            }
        }
        if (foundFlag == true) {
            return false;
        }
        if (this.filter.length > 0 && checkDisplay.indexOf(this.filter.toLowerCase()) == -1) {
            return false;
        }
        return true;
    }
    transferData(valueIndex) {
        if (!this.getDisable()) {
            let value = this.fieldCreation.valueList[valueIndex].value;
            let foundFlag = false;
            for (let dataRow of this.data[this.fieldCreation.fieldName]) {
                if (dataRow.value == value) {
                    foundFlag = true;
                    break;
                }
            }
            if (foundFlag == false) {
                if (typeof (this.data[this.fieldCreation.fieldName]) == "undefined") {
                    this.data[this.fieldCreation.fieldName] = [];
                }
                this.data[this.fieldCreation.fieldName].push(this.fieldCreation.valueList[valueIndex]);
            }
            let valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "add",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
    removeData(dataIndex) {
        if (!this.getDisable()) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            let valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
            this.callBack.emit({
                action: "remove",
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        }
    }
    removeAll() {
        this.data[this.fieldCreation.fieldName] = [];
    }
    selectAll() {
        this.data[this.fieldCreation.fieldName] = this.fieldCreation.valueList;
    }
    toggleFilter() {
        if (this.filterToggle === "filterInvisible") {
            this.filterToggle = "filterVisible";
        }
        else {
            this.filter = "";
            this.filterToggle = "filterInvisible";
        }
    }
};
SwappingBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
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
export { SwappingBoxComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhcHBpbmctYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvc3dhcHBpbmctYm94L3N3YXBwaW5nLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSx3QkFBd0I7SUFrQmpFLFlBQVksZ0JBQW1DO1FBQzlDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBYmYsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsaUJBQVksR0FBRyxVQUFVLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDbkIscUJBQWdCLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQztRQUNsRSxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztRQUdoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDUCxRQUFRLElBQUksQ0FBQyxh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cUNBbUI4QixnQkFBZ0I7R0FsQm5DLG9CQUFvQixDQXdJaEM7U0F4SVksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gXCIuLi8uLi9keW5hbWljLWJlaGF2aW9yL2R5bmFtaWMtYmVoYXZpb3IuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vc3dhcHBpbmctYm94LmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFN3YXBwaW5nQm94Q29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0Y29sdW1uQ2FsY3VsYXRlO1xyXG5cdG1vZGVEaXNwbGF5ID0gXCJcIjtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0b3B0aW9uVGV4dCA9IFwiT3B0aW9uXCI7XHJcblx0c2VsZWN0ZWRUZXh0ID0gXCJTZWxlY3RlZFwiO1xyXG5cdHNlbGVjdEFsbFRleHQgPSBcIlNlbGVjdCBBbGxcIjtcclxuXHRyZW1vdmVBbGxUZXh0ID0gXCJSZW1vdmUgQWxsXCI7XHJcbiAgICBwdWJsaWMgc2Nyb2xsYmFyT3B0aW9ucyA9IHsgYXhpczogJ3knLCB0aGVtZTogJ21pbmltYWwtZGFyaycgfTtcclxuXHRmaWx0ZXIgPSBcIlwiO1xyXG5cdGZpbHRlclRvZ2dsZSA9IFwiZmlsdGVySW52aXNpYmxlXCI7XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHRcdGNhc2UgMSA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDFcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgNCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDRcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gXCJhZGRcIikge1xyXG5cdFx0XHR0aGlzLm1vZGVEaXNwbGF5ID0gXCJkcDJoaWRlXCJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubW9kZURpc3BsYXkgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5vcHRpb25UZXh0KSB7XHJcblx0XHRcdHRoaXMub3B0aW9uVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5vcHRpb25UZXh0XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnNlbGVjdGVkVGV4dCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5zZWxlY3RlZFRleHRcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uc2VsZWN0QWxsVGV4dCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdEFsbFRleHQgPSB0aGlzLmZpZWxkQ3JlYXRpb24uc2VsZWN0QWxsVGV4dFxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5yZW1vdmVBbGxUZXh0KSB7XHJcblx0XHRcdHRoaXMucmVtb3ZlQWxsVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5yZW1vdmVBbGxUZXh0XHJcblx0XHR9XHJcblx0fVxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHJcblx0fVxyXG5cdHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcblx0XHR0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGZlaWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAgIGNoZWNrRGVzdERhdGEodmFsdWVMaXN0KSB7XHJcblx0XHRsZXQgY2hlY2tWYWx1ZSA9IHZhbHVlTGlzdC52YWx1ZTtcclxuXHRcdGxldCBjaGVja0Rpc3BsYXkgPSB2YWx1ZUxpc3QuZGlzcGxheS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBmb3VuZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBkYXRhUm93IG9mIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YVJvdy52YWx1ZSA9PSBjaGVja1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3VuZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cdFx0aWYgKGZvdW5kRmxhZyA9PSB0cnVlKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHQgICAgaWYgKHRoaXMuZmlsdGVyLmxlbmd0aCA+IDAgJiYgY2hlY2tEaXNwbGF5LmluZGV4T2YodGhpcy5maWx0ZXIudG9Mb3dlckNhc2UoKSkgPT0gLTEpIHtcclxuXHRcdCAgICByZXR1cm4gZmFsc2VcclxuXHQgICAgfVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmZXJEYXRhKHZhbHVlSW5kZXgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZ2V0RGlzYWJsZSgpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbdmFsdWVJbmRleF0udmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBmb3VuZEZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YVJvdyBvZiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhUm93LnZhbHVlID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRGbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm91bmRGbGFnID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnB1c2godGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFt2YWx1ZUluZGV4XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdmFsdWVPYmogPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcImFkZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWVPYmo6IHZhbHVlT2JqLFxyXG4gICAgICAgICAgICAgICAgZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlRGF0YShkYXRhSW5kZXgpIHtcclxuXHRcdGlmICghdGhpcy5nZXREaXNhYmxlKCkpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsMSk7XHJcblx0XHRcdGxldCB2YWx1ZU9iaiA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKTtcclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRhY3Rpb246XCJyZW1vdmVcIixcclxuXHRcdFx0XHR2YWx1ZU9iajp2YWx1ZU9iaixcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW1vdmVBbGwoKSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBbXTtcclxuXHR9XHJcblx0c2VsZWN0QWxsKCkge1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdDtcclxuXHR9XHJcblx0dG9nZ2xlRmlsdGVyKCkge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyVG9nZ2xlID09PSBcImZpbHRlckludmlzaWJsZVwiKSB7XHJcblx0XHRcdHRoaXMuZmlsdGVyVG9nZ2xlID0gXCJmaWx0ZXJWaXNpYmxlXCI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmZpbHRlciA9IFwiXCJcclxuXHRcdFx0dGhpcy5maWx0ZXJUb2dnbGUgPSBcImZpbHRlckludmlzaWJsZVwiO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=