import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
export class FileUploadComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.acceptExt = ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf";
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
        this.data[this.fieldCreation.fieldName] = Object.assign({}, {
            currentFile: [],
            selectFile: {},
        });
        if (this.fieldCreation.accept) {
            this.acceptExt = this.fieldCreation.accept;
        }
    }
    handleFileSelect(evt) {
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
        }
        this.callBack.emit({
            event: evt,
            action: "fileSelect",
            fieldName: this.fieldCreation.fieldName
        });
    }
    processCall(data) {
    }
}
FileUploadComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative {{fieldCreation.require && (!data[fieldCreation.fieldName].selectFile || !data[fieldCreation.fieldName].selectFile.length || data[fieldCreation.fieldName].selectFile.length == 0) ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\"\r\n                       class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\" name=\"{{fieldCreation.fieldName}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
            },] }
];
FileUploadComponent.ctorParameters = () => [
    { type: AnimationService }
];
FileUploadComponent.propDecorators = {
    data: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLG1EQUFtRCxDQUFDO0FBQzNGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSx3QkFBd0I7SUFVaEUsWUFBWSxnQkFBbUM7UUFDOUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFMZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFN0MsY0FBUyxHQUFHLDhDQUE4QyxDQUFDO1FBRzFELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUTtRQUNQLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDekMsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1AsS0FBSyxDQUFDO2dCQUNMLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1A7Z0JBQ0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDM0QsV0FBVyxFQUFFLEVBQUU7WUFDZixVQUFVLEVBQUUsRUFBRTtTQUNkLENBQUMsQ0FBQTtRQUNGLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQTtTQUMxQztJQUNGLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxHQUFHO1FBQ25CLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0RTtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqQjtZQUNDLEtBQUssRUFBQyxHQUFHO1lBQ1QsTUFBTSxFQUFDLFlBQVk7WUFDbkIsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUNELENBQUM7SUFDSCxDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQUk7SUFFaEIsQ0FBQzs7O1lBekRELFNBQVMsU0FBQztnQkFDVixzckRBQTJDO2FBQzNDOzs7WUFKTyxnQkFBZ0I7OzttQkFNdEIsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDRixLQUFLO3VCQUNSLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RHluYW1pY0JlaGF2aW9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZpbGUtdXBsb2FkLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZENvbXBvbmVudCBleHRlbmRzIER5bmFtaWNCZWhhdmlvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgZGF0YTtcclxuXHRASW5wdXQoKSBvcHRpb247XHJcblx0QElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZTtcclxuXHRhY2NlcHRFeHQgPSBcIi54bHN4LC54bHMsLmRvYywgLmRvY3gsLnBwdCwgLnBwdHgsLnR4dCwucGRmXCI7XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuZmllbGRDcmVhdGlvbi5jb2x1bW5QZXJMaW5lKSB7XHJcblx0XHRcdGNhc2UgMSA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDFcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgNCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDRcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwge1xyXG5cdFx0XHRjdXJyZW50RmlsZTogW10sXHJcblx0XHRcdHNlbGVjdEZpbGU6IHt9LFxyXG5cdFx0fSlcclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uYWNjZXB0KSB7XHJcblx0XHRcdHRoaXMuYWNjZXB0RXh0ID0gdGhpcy5maWVsZENyZWF0aW9uLmFjY2VwdFxyXG5cdFx0fVxyXG5cdH1cclxuXHRoYW5kbGVGaWxlU2VsZWN0KGV2dCl7XHJcblx0XHRpZiAodHlwZW9mKGV2dC50YXJnZXQpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNlbGVjdEZpbGUgPSBldnQudGFyZ2V0LmZpbGVzO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZXZlbnQ6ZXZ0LFxyXG5cdFx0XHRcdGFjdGlvbjpcImZpbGVTZWxlY3RcIixcclxuXHRcdFx0XHRmaWVsZE5hbWU6dGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0XHR9XHJcblx0XHQpO1xyXG5cdH1cclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblxyXG5cdH1cclxufVxyXG4iXX0=