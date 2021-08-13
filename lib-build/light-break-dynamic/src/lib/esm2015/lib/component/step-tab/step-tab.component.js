import { Component, Input, Output, EventEmitter } from '@angular/core';
export class StepTabComponent {
    constructor() {
        this.tabList = [];
        this.stepClick = false;
        this.callBack = new EventEmitter();
        this.calculateCss = '';
        this.objKeys = Object.keys;
        this.activeStep = 0;
    }
    ngOnInit() {
        this.lastTab = this.tabList.length - 1;
        const percentWidth = Math.floor(100 / this.tabList.length);
        this.calculateCss = 'calc(' + String(percentWidth) + '% - 2px)';
    }
    getActive(tabNumber) {
        if (tabNumber == this.activeStep) {
            return "stepShow";
        }
        else {
            return "stepHide";
        }
    }
    prevStep() {
        if (this.activeStep > 0) {
            this.activeStep--;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
    nextStep() {
        if (this.activeStep < (this.tabList.length - 1)) {
            this.activeStep++;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
    gotoStep(stepIndex) {
        if (this.tabList[stepIndex]) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
    gotoStepClick(stepIndex) {
        if (this.tabList[stepIndex] && this.stepClick) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    }
}
StepTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-step-tab',
                template: "<div class=\"tabStepPanel\">\r\n    <div *ngFor=\"let tabIndex of objKeys(tabList)\" class=\"tabStep{{tabIndex == activeStep ? ' active': tabIndex < activeStep ? ' pass': tabIndex > activeStep ? ' inactive':''}}\" [style.width]=\"tabIndex == lastTab ? '' : calculateCss\" (click)=\"gotoStepClick(tabIndex)\">\r\n        <div [innerHTML]=\"(tabIndex == activeStep ? tabList[tabIndex].header: tabIndex <= activeStep ? tabList[tabIndex].pass ? tabList[tabIndex].pass: tabList[tabIndex].header: tabList[tabIndex].header)\" class=\"header\" id=\"clickStepTab_{{tabIndex}}\"></div>\r\n        <div *ngIf=\"tabIndex != lastTab\" class=\"line\"></div>\r\n        <div class=\"tabLabel{{tabIndex <= activeStep ? ' active':''}}\" id=\"clickStepTab_label_{{tabIndex}}\" [innerHTML]=\"tabList[tabIndex].label\"></div>\r\n    </div>\r\n</div>\r\n",
                styles: [""]
            },] }
];
StepTabComponent.ctorParameters = () => [];
StepTabComponent.propDecorators = {
    tabList: [{ type: Input }],
    stepClick: [{ type: Input }],
    callBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9zdGVwLXRhYi9zdGVwLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8vRSxNQUFNLE9BQU8sZ0JBQWdCO0lBU3pCO1FBUlMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsZUFBVSxHQUFHLENBQUMsQ0FBQztJQUdmLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3BFLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBUztRQUNmLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDOUIsT0FBTyxVQUFVLENBQUE7U0FDcEI7YUFBTTtZQUNILE9BQU8sVUFBVSxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTthQUN4QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNPLGFBQWEsQ0FBQyxTQUFTO1FBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNmLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDeEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7WUFqRUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4Qiw2MEJBQXdDOzthQUUzQzs7OztzQkFFSSxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktc3RlcC10YWInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3N0ZXAtdGFiLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL3N0ZXAtdGFiLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0ZXBUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgdGFiTGlzdCA9IFtdO1xyXG4gICAgQElucHV0KCkgc3RlcENsaWNrID0gZmFsc2U7XHJcbiAgICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjYWxjdWxhdGVDc3MgPSAnJztcclxuICAgIGxhc3RUYWI7XHJcbiAgICBvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcbiAgICBhY3RpdmVTdGVwID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmxhc3RUYWIgPSB0aGlzLnRhYkxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICBjb25zdCBwZXJjZW50V2lkdGggPSBNYXRoLmZsb29yKDEwMCAvIHRoaXMudGFiTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQ3NzID0gJ2NhbGMoJyArIFN0cmluZyhwZXJjZW50V2lkdGgpICsgJyUgLSAycHgpJztcclxuICAgIH1cclxuXHJcbiAgICBnZXRBY3RpdmUodGFiTnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRhYk51bWJlciA9PSB0aGlzLmFjdGl2ZVN0ZXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RlcFNob3dcIlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0ZXBIaWRlXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcmV2U3RlcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVTdGVwID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0ZXAtLTtcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3N0ZXBDaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogdGhpcy5hY3RpdmVTdGVwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG5leHRTdGVwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVN0ZXAgPCAodGhpcy50YWJMaXN0Lmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RlcCsrO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnc3RlcENoYW5nZScsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiB0aGlzLmFjdGl2ZVN0ZXBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ290b1N0ZXAoc3RlcEluZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFiTGlzdFtzdGVwSW5kZXhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RlcCA9IHN0ZXBJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3N0ZXBDaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogdGhpcy5hY3RpdmVTdGVwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZ290b1N0ZXBDbGljayhzdGVwSW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy50YWJMaXN0W3N0ZXBJbmRleF0gJiYgdGhpcy5zdGVwQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGVwID0gc3RlcEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnc3RlcENoYW5nZScsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiB0aGlzLmFjdGl2ZVN0ZXBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=