import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var StepTabComponent = /** @class */ (function () {
    function StepTabComponent() {
        this.tabList = [];
        this.stepClick = false;
        this.callBack = new EventEmitter();
        this.calculateCss = '';
        this.objKeys = Object.keys;
        this.activeStep = 0;
    }
    StepTabComponent.prototype.ngOnInit = function () {
        this.lastTab = this.tabList.length - 1;
        var percentWidth = Math.floor(100 / this.tabList.length);
        this.calculateCss = 'calc(' + String(percentWidth) + '% - 2px)';
    };
    StepTabComponent.prototype.getActive = function (tabNumber) {
        if (tabNumber == this.activeStep) {
            return "stepShow";
        }
        else {
            return "stepHide";
        }
    };
    StepTabComponent.prototype.prevStep = function () {
        if (this.activeStep > 0) {
            this.activeStep--;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    };
    StepTabComponent.prototype.nextStep = function () {
        if (this.activeStep < (this.tabList.length - 1)) {
            this.activeStep++;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    };
    StepTabComponent.prototype.gotoStep = function (stepIndex) {
        if (this.tabList[stepIndex]) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
        }
    };
    StepTabComponent.prototype.gotoStepClick = function (stepIndex) {
        if (this.tabList[stepIndex] && this.stepClick) {
            this.activeStep = stepIndex;
            this.callBack.emit({
                action: 'stepChange',
                step: this.activeStep
            });
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
    return StepTabComponent;
}());
export { StepTabComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc3RlcC10YWIvc3RlcC10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTy9FO0lBU0k7UUFSUyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUVsQixZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QixlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBR2YsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDcEUsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxTQUFTO1FBQ2YsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM5QixPQUFPLFVBQVUsQ0FBQTtTQUNwQjthQUFNO1lBQ0gsT0FBTyxVQUFVLENBQUE7U0FDcEI7SUFDTCxDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNmLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDeEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNELG1DQUFRLEdBQVIsVUFBUyxTQUFTO1FBQ2QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNmLE1BQU0sRUFBRSxZQUFZO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDeEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBQ08sd0NBQWEsR0FBckIsVUFBc0IsU0FBUztRQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixNQUFNLEVBQUUsWUFBWTtnQkFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3hCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQTNEUTtRQUFSLEtBQUssRUFBRTs7cURBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7dURBQW1CO0lBQ2pCO1FBQVQsTUFBTSxFQUFFOztzREFBK0I7SUFIL0IsZ0JBQWdCO1FBTDVCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLDYwQkFBd0M7O1NBRTNDLENBQUM7O09BQ1csZ0JBQWdCLENBOEQ1QjtJQUFELHVCQUFDO0NBQUEsQUE5REQsSUE4REM7U0E5RFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xiOS1zdGVwLXRhYicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vc3RlcC10YWIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vc3RlcC10YWIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RlcFRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSB0YWJMaXN0ID0gW107XHJcbiAgICBASW5wdXQoKSBzdGVwQ2xpY2sgPSBmYWxzZTtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGNhbGN1bGF0ZUNzcyA9ICcnO1xyXG4gICAgbGFzdFRhYjtcclxuICAgIG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuICAgIGFjdGl2ZVN0ZXAgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubGFzdFRhYiA9IHRoaXMudGFiTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnRXaWR0aCA9IE1hdGguZmxvb3IoMTAwIC8gdGhpcy50YWJMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDc3MgPSAnY2FsYygnICsgU3RyaW5nKHBlcmNlbnRXaWR0aCkgKyAnJSAtIDJweCknO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFjdGl2ZSh0YWJOdW1iZXIpIHtcclxuICAgICAgICBpZiAodGFiTnVtYmVyID09IHRoaXMuYWN0aXZlU3RlcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJzdGVwU2hvd1wiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwic3RlcEhpZGVcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByZXZTdGVwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZVN0ZXAgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU3RlcC0tO1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnc3RlcENoYW5nZScsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiB0aGlzLmFjdGl2ZVN0ZXBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbmV4dFN0ZXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlU3RlcCA8ICh0aGlzLnRhYkxpc3QubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGVwKys7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdzdGVwQ2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHRoaXMuYWN0aXZlU3RlcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb3RvU3RlcChzdGVwSW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy50YWJMaXN0W3N0ZXBJbmRleF0pIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTdGVwID0gc3RlcEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAnc3RlcENoYW5nZScsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiB0aGlzLmFjdGl2ZVN0ZXBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb3RvU3RlcENsaWNrKHN0ZXBJbmRleCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhYkxpc3Rbc3RlcEluZGV4XSAmJiB0aGlzLnN0ZXBDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVN0ZXAgPSBzdGVwSW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICdzdGVwQ2hhbmdlJyxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHRoaXMuYWN0aXZlU3RlcFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==