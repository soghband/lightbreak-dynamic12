import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export class CheckBoxComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.objKey = Object.keys;
        this.showSelectAll = "dp2hide";
        this.selectAll = false;
        this.singleLine = "";
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        this.checkboxDisplay = "checkboxHide";
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
            if (typeof (this.fieldCreation.default) == "object") {
                this.data[this.fieldCreation.fieldName] = Object.assign({}, this.fieldCreation.default);
            }
            else {
                let defaultVal = {};
                for (let valueIndex in this.fieldCreation.valueList) {
                    defaultVal[this.fieldCreation.valueList[valueIndex].value] = false;
                }
                this.data[this.fieldCreation.fieldName] = defaultVal;
            }
        }
        if (this.fieldCreation.showSelectAll == true) {
            this.showSelectAll = "";
        }
        if (this.fieldCreation.displaySingleLine == true || this.option.displayMode == "table") {
            this.singleLine = "singlePerLine";
        }
        else {
            this.singleLine = "multiplePerLine";
        }
        if (this.option.displayMode != 'table') {
            this.checkboxDisplay = "checkboxShow";
        }
    }
    toggleSelectAll() {
        if (this.selectAll == true) {
            for (let dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = true;
            }
        }
        else {
            for (let dataIndex in this.fieldCreation.valueList) {
                this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = false;
            }
        }
        this.callBack.emit({
            action: 'selectAll',
            value: this.selectAll,
            fieldName: this.fieldCreation.fieldName
        });
    }
    processCall(data) {
    }
    processChange(event, s, valueList) {
        this.callBack.emit({
            action: 'change',
            displayValue: valueList,
            currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
            fieldName: this.fieldCreation.fieldName
        });
    }
    toggleShowCheckBox() {
        if (!this.getDisable()) {
            if (this.checkboxDisplay == "checkboxHide") {
                this.checkboxDisplay = "checkboxShow";
            }
            else {
                this.checkboxDisplay = "checkboxHide";
            }
        }
    }
    haveChecked() {
        let haveChecked = false;
        for (let valueName in this.data[this.fieldCreation.fieldName]) {
            if (this.data[this.fieldCreation.fieldName][valueName] == true) {
                haveChecked = true;
                break;
            }
        }
        return haveChecked;
    }
}
CheckBoxComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative\">\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"checkBoxTableDisplay\">\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div *ngIf=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value] && haveChecked()\" class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"checkbox\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}_checked\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label>{{fieldCreation.valueList[listIndex].display}}</label>\r\n                    </div>\r\n                </ng-container>\r\n                <div *ngIf=\"!haveChecked()\">\r\n                    Not Selected\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"arrowToggle\" (click)=\"toggleShowCheckBox()\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{option.formId}}_{{rowIndex}}_arrowDown\">\r\n                <div class=\"arrowDown\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"{{(option.displayMode == 'table' ? 'checkboxList' : '')}} {{checkboxDisplay}}\">\r\n                <div class=\"{{(option.displayMode == 'table' ? 'checkboxListBox' : '')}}\">\r\n                    <div class=\"{{showSelectAll}}\">\r\n                        <input type=\"checkbox\" id=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\" (change)=\"toggleSelectAll()\"\r\n                               [disabled]=\"getDisable()\"\r\n                               [(ngModel)]=\"selectAll\"> <label for=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\">Select All</label>\r\n                    </div>\r\n                    <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                        <div class=\"checkBoxIndent {{singleLine}}\">\r\n                            <input type=\"checkbox\"\r\n                                   id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                                   [disabled]=\"getDisable()\"\r\n                                   (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                            <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n                        </div>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
CheckBoxComponent.ctorParameters = () => [
    { type: AnimationService }
];
CheckBoxComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9jaGVjay1ib3gvY2hlY2stYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSx3QkFBd0I7SUFnQjlELFlBQVksZ0JBQW1DO1FBQzlDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBWGYsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLFdBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRXJCLGtCQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNiLHFCQUFnQixHQUFHLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFDLENBQUM7UUFDdEQsb0JBQWUsR0FBRyxjQUFjLENBQUM7UUFJbkMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ1AsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1B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bXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlVXJsOiAnLi9jaGVjay1ib3guY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGVja0JveENvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleSA9IE9iamVjdC5rZXlzO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZTtcclxuXHRzaG93U2VsZWN0QWxsID0gXCJkcDJoaWRlXCI7XHJcblx0c2VsZWN0QWxsID0gZmFsc2U7XHJcblx0c2luZ2xlTGluZSA9IFwiXCI7XHJcbiAgICBzY3JvbGxiYXJPcHRpb25zID0ge2F4aXM6ICd5JywgdGhlbWU6ICdtaW5pbWFsLWRhcmsnfTtcclxuICAgIGNoZWNrYm94RGlzcGxheSA9IFwiY2hlY2tib3hIaWRlXCI7XHJcbiAgICBcclxuXHRjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cdFx0c3VwZXIoYW5pbWF0aW9uU2VydmljZSk7XHJcblx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMVwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wyXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMyA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDNcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sNFwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpID09IFwib2JqZWN0XCIpIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKHt9LHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgZGVmYXVsdFZhbCA9IHt9O1xyXG5cdFx0XHRcdGZvciAobGV0IHZhbHVlSW5kZXggaW4gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdCkge1xyXG5cdFx0XHRcdFx0ZGVmYXVsdFZhbFt0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0W3ZhbHVlSW5kZXhdLnZhbHVlXSA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBkZWZhdWx0VmFsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnNob3dTZWxlY3RBbGwgPT0gdHJ1ZSkge1xyXG5cdFx0XHR0aGlzLnNob3dTZWxlY3RBbGwgPSBcIlwiXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5kaXNwbGF5U2luZ2xlTGluZSA9PSB0cnVlIHx8IHRoaXMub3B0aW9uLmRpc3BsYXlNb2RlID09IFwidGFibGVcIikge1xyXG5cdFx0XHR0aGlzLnNpbmdsZUxpbmUgPSBcInNpbmdsZVBlckxpbmVcIjtcclxuXHRcdH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2luZ2xlTGluZSA9IFwibXVsdGlwbGVQZXJMaW5lXCI7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vcHRpb24uZGlzcGxheU1vZGUgIT0gJ3RhYmxlJykge1xyXG5cdFx0XHR0aGlzLmNoZWNrYm94RGlzcGxheSA9IFwiY2hlY2tib3hTaG93XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRvZ2dsZVNlbGVjdEFsbCgpIHtcclxuXHRcdGlmICh0aGlzLnNlbGVjdEFsbCA9PSB0cnVlKSB7XHJcblx0XHRcdGZvciAobGV0IGRhdGFJbmRleCBpbiB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW3RoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3RbZGF0YUluZGV4XS52YWx1ZV0gPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRmb3IgIChsZXQgZGF0YUluZGV4IGluIHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZUxpc3QpIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlTGlzdFtkYXRhSW5kZXhdLnZhbHVlXSA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246J3NlbGVjdEFsbCcsXHJcblx0XHRcdHZhbHVlOiB0aGlzLnNlbGVjdEFsbCxcclxuXHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdH0pO1xyXG5cdH1cclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvY2Vzc0NoYW5nZShldmVudCwgcywgdmFsdWVMaXN0KSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRhY3Rpb246J2NoYW5nZScsXHJcblx0XHRcdGRpc3BsYXlWYWx1ZTogdmFsdWVMaXN0LFxyXG5cdFx0XHRjdXJyZW50VmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVt2YWx1ZUxpc3QudmFsdWVdLFxyXG5cdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0fSk7XHJcblx0fVxyXG4gICAgdG9nZ2xlU2hvd0NoZWNrQm94KCkge1xyXG5cdFx0aWYgKCF0aGlzLmdldERpc2FibGUoKSkge1xyXG5cdFx0XHRpZiAodGhpcy5jaGVja2JveERpc3BsYXkgPT0gXCJjaGVja2JveEhpZGVcIikge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hEaXNwbGF5ID0gXCJjaGVja2JveFNob3dcIlxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY2hlY2tib3hEaXNwbGF5ID0gXCJjaGVja2JveEhpZGVcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRoYXZlQ2hlY2tlZCgpIHtcclxuXHRcdGxldCBoYXZlQ2hlY2tlZCA9IGZhbHNlO1xyXG5cdFx0Zm9yIChsZXQgdmFsdWVOYW1lIGluIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG5cdFx0XHRpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW3ZhbHVlTmFtZV0gPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGhhdmVDaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGhhdmVDaGVja2VkO1xyXG5cdH1cclxufVxyXG4iXX0=