import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from "../../dynamic-behavior/dynamic-behavior.component";
import { AnimationService } from '../../../service/animation.service';
var FileUploadComponent = /** @class */ (function (_super) {
    __extends(FileUploadComponent, _super);
    function FileUploadComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.acceptExt = ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf";
        _this.animateProcess();
        return _this;
    }
    FileUploadComponent.prototype.ngOnInit = function () {
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
    };
    FileUploadComponent.prototype.handleFileSelect = function (evt) {
        if (typeof (evt.target) != "undefined") {
            this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
        }
        this.callBack.emit({
            event: evt,
            action: "fileSelect",
            fieldName: this.fieldCreation.fieldName
        });
    };
    FileUploadComponent.prototype.processCall = function (data) {
    };
    FileUploadComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FileUploadComponent.prototype, "panelCallBack", void 0);
    FileUploadComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative {{fieldCreation.require && (!data[fieldCreation.fieldName].selectFile || !data[fieldCreation.fieldName].selectFile.length || data[fieldCreation.fieldName].selectFile.length == 0) ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\"\r\n                       class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\" name=\"{{fieldCreation.fieldName}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], FileUploadComponent);
    return FileUploadComponent;
}(DynamicBehaviorComponent));
export { FileUploadComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFLcEU7SUFBeUMsdUNBQXdCO0lBVWhFLDZCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBUFMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGVBQVMsR0FBRyw4Q0FBOEMsQ0FBQztRQUcxRCxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0lBQ3ZCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0MsUUFBUSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQ2pDLE1BQU07WUFDUDtnQkFDQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUMzRCxXQUFXLEVBQUUsRUFBRTtZQUNmLFVBQVUsRUFBRSxFQUFFO1NBQ2QsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFBO1NBQzFDO0lBQ0YsQ0FBQztJQUNELDhDQUFnQixHQUFoQixVQUFpQixHQUFHO1FBQ25CLElBQUksT0FBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0RTtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqQjtZQUNDLEtBQUssRUFBQyxHQUFHO1lBQ1QsTUFBTSxFQUFDLFlBQVk7WUFDbkIsU0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUztTQUN0QyxDQUNELENBQUM7SUFDSCxDQUFDO0lBQ0QseUNBQVcsR0FBWCxVQUFZLElBQUk7SUFFaEIsQ0FBQzs7Z0JBNUM4QixnQkFBZ0I7O0lBVHRDO1FBQVIsS0FBSyxFQUFFOztxREFBTTtJQUNMO1FBQVIsS0FBSyxFQUFFOzt1REFBUTtJQUNQO1FBQVIsS0FBSyxFQUFFOzs4REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzsyREFBWTtJQUNSO1FBQVIsS0FBSyxFQUFFOzt5REFBVTtJQUNYO1FBQVQsTUFBTSxFQUFFOzt5REFBK0I7SUFDOUI7UUFBVCxNQUFNLEVBQUU7OzhEQUFvQztJQVBqQyxtQkFBbUI7UUFIL0IsU0FBUyxDQUFDO1lBQ1Ysc3JEQUEyQztTQUMzQyxDQUFDO3lDQVc4QixnQkFBZ0I7T0FWbkMsbUJBQW1CLENBdUQvQjtJQUFELDBCQUFDO0NBQUEsQUF2REQsQ0FBeUMsd0JBQXdCLEdBdURoRTtTQXZEWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlVXJsOiAnLi9maWxlLXVwbG9hZC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWRDb21wb25lbnQgZXh0ZW5kcyBEeW5hbWljQmVoYXZpb3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIGRhdGE7XHJcblx0QElucHV0KCkgb3B0aW9uO1xyXG5cdEBJbnB1dCgpIGZpZWxkQ3JlYXRpb247XHJcblx0QElucHV0KCkgaW5wdXRJbmRleDtcclxuICAgIEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRjb2x1bW5DYWxjdWxhdGU7XHJcblx0YWNjZXB0RXh0ID0gXCIueGxzeCwueGxzLC5kb2MsIC5kb2N4LC5wcHQsIC5wcHR4LC50eHQsLnBkZlwiO1xyXG5cdGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcblx0XHRzdXBlcihhbmltYXRpb25TZXJ2aWNlKTtcclxuXHRcdHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wxXCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMiA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDJcIjtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sM1wiO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2w0XCI7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJcIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oe30sIHtcclxuXHRcdFx0Y3VycmVudEZpbGU6IFtdLFxyXG5cdFx0XHRzZWxlY3RGaWxlOiB7fSxcclxuXHRcdH0pXHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmFjY2VwdCkge1xyXG5cdFx0XHR0aGlzLmFjY2VwdEV4dCA9IHRoaXMuZmllbGRDcmVhdGlvbi5hY2NlcHRcclxuXHRcdH1cclxuXHR9XHJcblx0aGFuZGxlRmlsZVNlbGVjdChldnQpe1xyXG5cdFx0aWYgKHR5cGVvZihldnQudGFyZ2V0KSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zZWxlY3RGaWxlID0gZXZ0LnRhcmdldC5maWxlcztcclxuXHRcdH1cclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdChcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGV2ZW50OmV2dCxcclxuXHRcdFx0XHRhY3Rpb246XCJmaWxlU2VsZWN0XCIsXHJcblx0XHRcdFx0ZmllbGROYW1lOnRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVcclxuXHRcdFx0fVxyXG5cdFx0KTtcclxuXHR9XHJcblx0cHJvY2Vzc0NhbGwoZGF0YSkge1xyXG5cclxuXHR9XHJcbn1cclxuIl19