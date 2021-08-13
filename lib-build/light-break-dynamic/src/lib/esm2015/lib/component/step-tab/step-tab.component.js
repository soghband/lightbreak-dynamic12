import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let StepTabComponent = class StepTabComponent {
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
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepTabComponent.prototype, "tabList", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], StepTabComponent.prototype, "stepClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], StepTabComponent.prototype, "callBack", void 0);
StepTabComponent = __decorate([
    Component({
        selector: 'lb9-step-tab',
        template: "<div class=\"tabStepPanel\">\r\n    <div *ngFor=\"let tabIndex of objKeys(tabList)\" class=\"tabStep{{tabIndex == activeStep ? ' active': tabIndex < activeStep ? ' pass': tabIndex > activeStep ? ' inactive':''}}\" [style.width]=\"tabIndex == lastTab ? '' : calculateCss\" (click)=\"gotoStepClick(tabIndex)\">\r\n        <div [innerHTML]=\"(tabIndex == activeStep ? tabList[tabIndex].header: tabIndex <= activeStep ? tabList[tabIndex].pass ? tabList[tabIndex].pass: tabList[tabIndex].header: tabList[tabIndex].header)\" class=\"header\" id=\"clickStepTab_{{tabIndex}}\"></div>\r\n        <div *ngIf=\"tabIndex != lastTab\" class=\"line\"></div>\r\n        <div class=\"tabLabel{{tabIndex <= activeStep ? ' active':''}}\" id=\"clickStepTab_label_{{tabIndex}}\" [innerHTML]=\"tabList[tabIndex].label\"></div>\r\n    </div>\r\n</div>\r\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], StepTabComponent);
export { StepTabComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc3RlcC10YWIvc3RlcC10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTy9FLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBU3pCO1FBUlMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsZUFBVSxHQUFHLENBQUMsQ0FBQztJQUdmLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3BFLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBUztRQUNmLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDOUIsT0FBTyxVQUFVLENBQUE7U0FDcEI7YUFBTTtZQUNILE9BQU8sVUFBVSxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLFlBQVk7Z0JBQ3BCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTthQUN4QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDRCxRQUFRLENBQUMsU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNPLGFBQWEsQ0FBQyxTQUFTO1FBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNmLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDeEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBRUosQ0FBQTtBQTdEWTtJQUFSLEtBQUssRUFBRTs7aURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7bURBQW1CO0FBQ2pCO0lBQVQsTUFBTSxFQUFFOztrREFBK0I7QUFIL0IsZ0JBQWdCO0lBTDVCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLDYwQkFBd0M7O0tBRTNDLENBQUM7O0dBQ1csZ0JBQWdCLENBOEQ1QjtTQTlEWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGI5LXN0ZXAtdGFiJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9zdGVwLXRhYi5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9zdGVwLXRhYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGVwVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIHRhYkxpc3QgPSBbXTtcclxuICAgIEBJbnB1dCgpIHN0ZXBDbGljayA9IGZhbHNlO1xyXG4gICAgQE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY2FsY3VsYXRlQ3NzID0gJyc7XHJcbiAgICBsYXN0VGFiO1xyXG4gICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG4gICAgYWN0aXZlU3RlcCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0VGFiID0gdGhpcy50YWJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudFdpZHRoID0gTWF0aC5mbG9vcigxMDAgLyB0aGlzLnRhYkxpc3QubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNzcyA9ICdjYWxjKCcgKyBTdHJpbmcocGVyY2VudFdpZHRoKSArICclIC0gMnB4KSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWN0aXZlKHRhYk51bWJlcikge1xyXG4gICAgICAgIGlmICh0YWJOdW1iZXIgPT0gdGhpcy5hY3RpdmVTdGVwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInN0ZXBTaG93XCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGVwSGlkZVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJldlN0ZXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlU3RlcCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGVwLS07XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdzdGVwQ2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHRoaXMuYWN0aXZlU3RlcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBuZXh0U3RlcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVTdGVwIDwgKHRoaXMudGFiTGlzdC5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0ZXArKztcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3N0ZXBDaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogdGhpcy5hY3RpdmVTdGVwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdvdG9TdGVwKHN0ZXBJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhYkxpc3Rbc3RlcEluZGV4XSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0ZXAgPSBzdGVwSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdzdGVwQ2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHRoaXMuYWN0aXZlU3RlcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdvdG9TdGVwQ2xpY2soc3RlcEluZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFiTGlzdFtzdGVwSW5kZXhdICYmIHRoaXMuc3RlcENsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RlcCA9IHN0ZXBJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogJ3N0ZXBDaGFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogdGhpcy5hY3RpdmVTdGVwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19