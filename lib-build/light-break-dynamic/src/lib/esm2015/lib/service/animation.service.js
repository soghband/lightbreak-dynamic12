import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
export class AnimationService {
    constructor() {
        this.animationEmitter = new EventEmitter();
        this.animationRegister = [];
        this.animationState = 'initial';
        this.initStateTimer = timer(100);
        this.animateQueueInterval = timer(100);
        this.reRendering = false;
        this.enableAnimation = false;
        this.count = 0;
    }
    registerAnimation(elementName) {
        if (!this.reRendering && this.enableAnimation) {
            const registerName = elementName + '_' + this.animationRegister.length;
            this.animationRegister.push(registerName);
            if (this.animationState === 'initial') {
                this.initStateTimer.subscribe(() => {
                    this.animateProcess();
                });
                this.animationState = 'initialed';
            }
            return registerName;
        }
    }
    animateProcess() {
        if (this.enableAnimation) {
            if (this.animationRegister.length > 0) {
                this.animateQueueInterval.subscribe(() => {
                    this.count++;
                    const queueName = this.animationRegister.shift();
                    this.animationEmitter.emit(queueName);
                    this.animateProcess();
                });
            }
            else {
                this.animationState = 'initial';
                this.count = 0;
            }
        }
    }
    setOnReRender(rerenderStatus) {
        this.reRendering = rerenderStatus;
    }
    setEnableAnimation(enable) {
        this.enableAnimation = (enable === 'true' || enable === true);
    }
}
AnimationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AnimationService_Factory() { return new AnimationService(); }, token: AnimationService, providedIn: "root" });
AnimationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
AnimationService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvc2VydmljZS9hbmltYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQVcsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUtyQyxNQUFNLE9BQU8sZ0JBQWdCO0lBWTVCO1FBVkEscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0QyxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxTQUFTLENBQUM7UUFDM0IsbUJBQWMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIseUJBQW9CLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLFVBQUssR0FBRyxDQUFDLENBQUM7SUFJVixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsV0FBVztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzlDLE1BQU0sWUFBWSxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUN2RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFDLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV2QixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQTthQUNqQztZQUNELE9BQU8sWUFBWSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVELGNBQWM7UUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUNELENBQUE7YUFDRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDZjtTQUNEO0lBQ0YsQ0FBQztJQUVELGFBQWEsQ0FBQyxjQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFNO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7O1lBeERELFVBQVUsU0FBQztnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aW50ZXJ2YWwsIHRpbWVyfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuXHRwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uU2VydmljZSB7XG5cdFxuXHRhbmltYXRpb25FbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRhbmltYXRpb25SZWdpc3RlciA9IFtdO1xuXHRhbmltYXRpb25TdGF0ZSA9ICdpbml0aWFsJztcblx0aW5pdFN0YXRlVGltZXIgPSB0aW1lcigxMDApO1xuXHRhbmltYXRlUXVldWVJbnRlcnZhbCA9IHRpbWVyKDEwMCk7XG5cdHJlUmVuZGVyaW5nID0gZmFsc2U7XG5cdGVuYWJsZUFuaW1hdGlvbiA9IGZhbHNlO1xuXHRcblx0Y291bnQgPSAwO1xuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdFxuXHR9XG5cdHJlZ2lzdGVyQW5pbWF0aW9uKGVsZW1lbnROYW1lKSB7XG5cdFx0aWYgKCF0aGlzLnJlUmVuZGVyaW5nICYmIHRoaXMuZW5hYmxlQW5pbWF0aW9uKSB7XG5cdFx0XHRjb25zdCByZWdpc3Rlck5hbWUgPSBlbGVtZW50TmFtZSArICdfJyArIHRoaXMuYW5pbWF0aW9uUmVnaXN0ZXIubGVuZ3RoO1xuXHRcdFx0dGhpcy5hbmltYXRpb25SZWdpc3Rlci5wdXNoKHJlZ2lzdGVyTmFtZSk7XG5cdFx0XHRpZiAodGhpcy5hbmltYXRpb25TdGF0ZSA9PT0gJ2luaXRpYWwnKSB7XG5cdFx0XHRcdHRoaXMuaW5pdFN0YXRlVGltZXIuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2luaXRpYWxlZCdcblx0XHRcdH1cblx0XHRcdHJldHVybiByZWdpc3Rlck5hbWU7XG5cdFx0fVxuXHR9XG5cdFxuXHRhbmltYXRlUHJvY2VzcygpIHtcblx0XHRpZiAodGhpcy5lbmFibGVBbmltYXRpb24pIHtcblx0XHRcdGlmICh0aGlzLmFuaW1hdGlvblJlZ2lzdGVyLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dGhpcy5hbmltYXRlUXVldWVJbnRlcnZhbC5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5jb3VudCsrO1xuXHRcdFx0XHRcdFx0Y29uc3QgcXVldWVOYW1lID0gdGhpcy5hbmltYXRpb25SZWdpc3Rlci5zaGlmdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5hbmltYXRpb25FbWl0dGVyLmVtaXQocXVldWVOYW1lKTtcblx0XHRcdFx0XHRcdHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnaW5pdGlhbCc7XG5cdFx0XHRcdHRoaXMuY291bnQgPSAwO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0c2V0T25SZVJlbmRlcihyZXJlbmRlclN0YXR1cykge1xuXHRcdHRoaXMucmVSZW5kZXJpbmcgPSByZXJlbmRlclN0YXR1c1xuXHR9XG5cdFxuXHRzZXRFbmFibGVBbmltYXRpb24oZW5hYmxlKSB7XG5cdFx0dGhpcy5lbmFibGVBbmltYXRpb24gPSAoZW5hYmxlID09PSAndHJ1ZScgfHwgZW5hYmxlID09PSB0cnVlKTtcblx0fVxufVxuIl19