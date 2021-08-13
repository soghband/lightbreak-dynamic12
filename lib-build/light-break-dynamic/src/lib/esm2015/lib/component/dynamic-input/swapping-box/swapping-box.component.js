import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export class SwappingBoxComponent extends DynamicBehaviorComponent {
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
}
SwappingBoxComponent.decorators = [
    { type: Component, args: [{
                template: "<div *ngIf=\"data[fieldCreation.fieldName]\" class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"  [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n            <div class=\"posRelative\">\r\n                <div class=\"dp2Table\">\r\n                    <div class=\"dp2Row\">\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"optionText\"></div>\r\n                                <div class=\"filterEnable\" (click)=\"toggleFilter()\"><span class=\"glyphicon glyphicon-search\"></span></div>\r\n                                <input type=\"text\" class=\"filter {{filterToggle}}\"\r\n                                       [readOnly]=\"filterToggle == 'filterInvisible'\"\r\n                                       [(ngModel)]=\"filter\" placeholder=\"Filter\"/>\r\n                            </div>\r\n                            <div class=\"source\">\r\n                                <ng-container *ngFor=\"let valueIndex of objKeys(fieldCreation.valueList)\">\r\n                                    <div class=\"source_select\" *ngIf=\"checkDestData(fieldCreation.valueList[valueIndex])\" (click)=\"transferData(valueIndex)\" [innerHTML]=\"fieldCreation.valueList[valueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"dp2Cell iconBox\">\r\n                            <abbr title=\"{{selectAllText}}\">\r\n                                <div class=\"selectAll\" (click)=\"selectAll()\"><span class=\"glyphicon glyphicon-forward\"></span></div>\r\n                            </abbr>\r\n                            <abbr title=\"{{removeAllText}}\">\r\n                                <div class=\"removeAll\" (click)=\"removeAll()\"><span class=\"glyphicon glyphicon-backward\"></span></div>\r\n                            </abbr>\r\n                        </div>\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"selectedText\"></div>\r\n                            </div>\r\n                            <div class=\"destination\">\r\n                                <ng-container *ngFor=\"let dataValueIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                                    <div class=\"source_select\" (click)=\"removeData(dataValueIndex)\" [innerHTML]=\"data[fieldCreation.fieldName][dataValueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n<div *ngIf=\"!data[fieldCreation.fieldName]\">Data undefined: {{fieldCreation.fieldName}}</div>\r\n"
            },] }
];
SwappingBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
SwappingBoxComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhcHBpbmctYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9zd2FwcGluZy1ib3gvc3dhcHBpbmctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSx3QkFBd0I7SUFrQmpFLFlBQVksZ0JBQW1DO1FBQzlDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBYmYsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxRQUFRLENBQUM7UUFDdEIsaUJBQVksR0FBRyxVQUFVLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFDbkIscUJBQWdCLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQztRQUNsRSxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osaUJBQVksR0FBRyxpQkFBaUIsQ0FBQztRQUdoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELFFBQVE7UUFDUCxRQUFR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USxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNsQixNQUFNLEVBQUMsUUFBUTtnQkFDZixRQUFRLEVBQUMsUUFBUTtnQkFDakIsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUzthQUN0QyxDQUFDLENBQUE7U0FDRjtJQUNGLENBQUM7SUFDRCxTQUFTO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsU0FBUztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsWUFBWTtRQUNYLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxpQkFBaUIsRUFBRTtZQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQztTQUNwQzthQUFNO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQztTQUN0QztJQUNGLENBQUM7OztZQTFJRCxTQUFTLFNBQUM7Z0JBQ1Qsb3JIQUE0QzthQUM3Qzs7O1lBSk8sZ0JBQWdCOzs7bUJBTXRCLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0YsS0FBSzt1QkFDUixNQUFNOzRCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHRlbXBsYXRlVXJsOiAnLi9zd2FwcGluZy1ib3guY29tcG9uZW50Lmh0bWwnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3dhcHBpbmdCb3hDb21wb25lbnQgZXh0ZW5kcyBEeW5hbWljQmVoYXZpb3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIGRhdGE7XHJcblx0QElucHV0KCkgb3B0aW9uO1xyXG5cdEBJbnB1dCgpIGZpZWxkQ3JlYXRpb247XHJcblx0QElucHV0KCkgaW5wdXRJbmRleDtcclxuICAgIEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRjb2x1bW5DYWxjdWxhdGU7XHJcblx0bW9kZURpc3BsYXkgPSBcIlwiO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRvcHRpb25UZXh0ID0gXCJPcHRpb25cIjtcclxuXHRzZWxlY3RlZFRleHQgPSBcIlNlbGVjdGVkXCI7XHJcblx0c2VsZWN0QWxsVGV4dCA9IFwiU2VsZWN0IEFsbFwiO1xyXG5cdHJlbW92ZUFsbFRleHQgPSBcIlJlbW92ZSBBbGxcIjtcclxuICAgIHB1YmxpYyBzY3JvbGxiYXJPcHRpb25zID0geyBheGlzOiAneScsIHRoZW1lOiAnbWluaW1hbC1kYXJrJyB9O1xyXG5cdGZpbHRlciA9IFwiXCI7XHJcblx0ZmlsdGVyVG9nZ2xlID0gXCJmaWx0ZXJJbnZpc2libGVcIjtcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMyA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDNcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XHJcblx0XHRcdHRoaXMubW9kZURpc3BsYXkgPSBcImRwMmhpZGVcIlxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tb2RlRGlzcGxheSA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLm9wdGlvblRleHQpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25UZXh0ID0gdGhpcy5maWVsZENyZWF0aW9uLm9wdGlvblRleHRcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uc2VsZWN0ZWRUZXh0KSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRUZXh0ID0gdGhpcy5maWVsZENyZWF0aW9uLnNlbGVjdGVkVGV4dFxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5zZWxlY3RBbGxUZXh0KSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0QWxsVGV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5zZWxlY3RBbGxUZXh0XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnJlbW92ZUFsbFRleHQpIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVBbGxUZXh0ID0gdGhpcy5maWVsZENyZWF0aW9uLnJlbW92ZUFsbFRleHRcclxuXHRcdH1cclxuXHR9XHJcblx0cHJvY2Vzc0NhbGwoZGF0YSkge1xyXG5cclxuXHR9XHJcblx0cHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuXHRcdHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZmVpbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gICAgY2hlY2tEZXN0RGF0YSh2YWx1ZUxpc3QpIHtcclxuXHRcdGxldCBjaGVja1ZhbHVlID0gdmFsdWVMaXN0LnZhbHVlO1xyXG5cdFx0bGV0IGNoZWNrRGlzcGxheSA9IHZhbHVlTGlzdC5kaXNwbGF5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgbGV0IGZvdW5kRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGRhdGFSb3cgb2YgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhUm93LnZhbHVlID09IGNoZWNrVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZvdW5kRmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblx0XHRpZiAoZm91bmRGbGFnID09IHRydWUpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdCAgICBpZiAodGhpcy5maWx0ZXIubGVuZ3RoID4gMCAmJiBjaGVja0Rpc3BsYXkuaW5kZXhPZih0aGlzLmZpbHRlci50b0xvd2VyQ2FzZSgpKSA9PSAtMSkge1xyXG5cdFx0ICAgIHJldHVybiBmYWxzZVxyXG5cdCAgICB9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2ZlckRhdGEodmFsdWVJbmRleCkge1xyXG4gICAgICAgIGlmICghdGhpcy5nZXREaXNhYmxlKCkpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFt2YWx1ZUluZGV4XS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGZvdW5kRmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBkYXRhUm93IG9mIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFSb3cudmFsdWUgPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3VuZEZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmb3VuZEZsYWcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdKSA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ucHVzaCh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W3ZhbHVlSW5kZXhdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZU9iaiA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IFwiYWRkXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZU9iajogdmFsdWVPYmosXHJcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVEYXRhKGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKCF0aGlzLmdldERpc2FibGUoKSkge1xyXG5cdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0uc3BsaWNlKGRhdGFJbmRleCwxKTtcclxuXHRcdFx0bGV0IHZhbHVlT2JqID0gT2JqZWN0LmFzc2lnbihbXSx0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pO1xyXG5cdFx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRcdGFjdGlvbjpcInJlbW92ZVwiLFxyXG5cdFx0XHRcdHZhbHVlT2JqOnZhbHVlT2JqLFxyXG5cdFx0XHRcdGZpZWxkTmFtZTp0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbW92ZUFsbCgpIHtcclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFtdO1xyXG5cdH1cclxuXHRzZWxlY3RBbGwoKSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0O1xyXG5cdH1cclxuXHR0b2dnbGVGaWx0ZXIoKSB7XHJcblx0XHRpZiAodGhpcy5maWx0ZXJUb2dnbGUgPT09IFwiZmlsdGVySW52aXNpYmxlXCIpIHtcclxuXHRcdFx0dGhpcy5maWx0ZXJUb2dnbGUgPSBcImZpbHRlclZpc2libGVcIjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZmlsdGVyID0gXCJcIlxyXG5cdFx0XHR0aGlzLmZpbHRlclRvZ2dsZSA9IFwiZmlsdGVySW52aXNpYmxlXCI7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==