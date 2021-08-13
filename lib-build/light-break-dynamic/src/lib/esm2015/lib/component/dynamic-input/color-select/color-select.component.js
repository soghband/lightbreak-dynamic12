import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
let ColorSelectComponent = class ColorSelectComponent extends DynamicBehaviorComponent {
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
        if (this.option.mode == "add") {
            if (typeof (this.fieldCreation.default) != "undefined") {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == "string") {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                if (this.fieldCreation.fieldName.valueList) {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.fieldName.valueList[0].value];
                }
                else {
                    this.data[this.fieldCreation.fieldName] = [null];
                }
            }
        }
    }
    assignColor(color, dataIndex) {
        this.data[this.fieldCreation.fieldName][dataIndex] = color;
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push("");
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
};
ColorSelectComponent.ctorParameters = () => [
    { type: AnimationService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "option", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "fieldCreation", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "inputIndex", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "rowIndex", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "callBack", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ColorSelectComponent.prototype, "panelCallBack", void 0);
ColorSelectComponent = __decorate([
    Component({
        selector: 'lb9-color-select',
        template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\n    <lb9-dynamic-form-label-panel\n            [fieldCreation]=\"fieldCreation\"\n            [option]=\"option\"\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\n                <div *ngFor=\"let colorList of fieldCreation.valueList\" class=\"colorSelect {{data[fieldCreation.fieldName][dataIndex] === colorList.value ? ' colorSelected': ''}}\" [style]=\"{background:colorList.value}\" (click)=\"assignColor(colorList.value, dataIndex)\">\n\n                </div>\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\n            </div>\n        </ng-container>\n        <div class=\"dp2Note\">\n            {{fieldCreation.note}}\n        </div>\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\n                class=\"glyphicon glyphicon-plus\"></span></div>\n    </div>\n</div>\n"
    }),
    __metadata("design:paramtypes", [AnimationService])
], ColorSelectComponent);
export { ColorSelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Itc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvY29sb3Itc2VsZWN0L2NvbG9yLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFDM0YsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFNcEUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSx3QkFBd0I7SUFXaEUsWUFBWSxnQkFBbUM7UUFDN0MsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFOaEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBS3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUTtRQUNOLFFBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUU7WUFDeEMsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRTtZQUM3QixJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsRUFBRTtnQkFDckQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN4RjtxQkFBTSxJQUFHLE9BQU0sQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtvQkFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDeEU7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3RjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtpQkFDakQ7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzdELENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQVM7UUFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7Q0FDRixDQUFBOztZQWxEZ0MsZ0JBQWdCOztBQVZ0QztJQUFSLEtBQUssRUFBRTs7a0RBQU07QUFDTDtJQUFSLEtBQUssRUFBRTs7b0RBQVE7QUFDUDtJQUFSLEtBQUssRUFBRTs7MkRBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs7d0RBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTs7c0RBQVU7QUFDUjtJQUFULE1BQU0sRUFBRTs7c0RBQStCO0FBQzlCO0lBQVQsTUFBTSxFQUFFOzsyREFBb0M7QUFQbEMsb0JBQW9CO0lBSmhDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsa3BEQUE0QztLQUM3QyxDQUFDO3FDQVkrQixnQkFBZ0I7R0FYcEMsb0JBQW9CLENBNkRoQztTQTdEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gJy4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnQnO1xuaW1wb3J0IHtBbmltYXRpb25TZXJ2aWNlfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlL2FuaW1hdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGI5LWNvbG9yLXNlbGVjdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb2xvci1zZWxlY3QuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yU2VsZWN0Q29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGF0YTtcbiAgQElucHV0KCkgb3B0aW9uO1xuICBASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xuICBASW5wdXQoKSBpbnB1dEluZGV4O1xuICBASW5wdXQoKSByb3dJbmRleDtcbiAgQE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgb2JqS2V5cyA9IE9iamVjdC5rZXlzO1xuICBjb2x1bW5DYWxjdWxhdGU7XG4gIFxuICBjb25zdHJ1Y3RvcihhbmltYXRpb25TZXJ2aWNlIDogQW5pbWF0aW9uU2VydmljZSkge1xuICAgIHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xuICAgIHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcbiAgfVxuICBcbiAgbmdPbkluaXQoKSB7XG4gICAgc3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xuICAgICAgY2FzZSAxIDpcbiAgICAgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDFcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDIgOlxuICAgICAgICB0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9IFwiZHAyQ29sMlwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMyA6XG4gICAgICAgIHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gXCJkcDJDb2wzXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0IDpcbiAgICAgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcImRwMkNvbDRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0IDpcbiAgICAgICAgdGhpcy5jb2x1bW5DYWxjdWxhdGUgPSBcIlwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb24ubW9kZSA9PSBcImFkZFwiKSB7XG4gICAgICBpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSkge1xuICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IE9iamVjdC5hc3NpZ24oW10sdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xuICAgICAgICB9IGVsc2UgaWYodHlwZW9mKCB0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFt0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLnZhbHVlTGlzdCkge1xuICAgICAgICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLnZhbHVlTGlzdFswXS52YWx1ZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW251bGxdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXNzaWduQ29sb3IoY29sb3IsIGRhdGFJbmRleCkge1xuICAgIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0gY29sb3I7XG4gIH1cbiAgYWRkTXVsdGlWYWwoKSB7XG4gICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnB1c2goXCJcIik7XG4gIH1cbiAgXG4gIGRlbGV0ZU11bHRpVmFsKGRhdGFJbmRleCkge1xuICAgIGlmICh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsMSk7XG4gICAgfVxuICB9XG59XG4iXX0=