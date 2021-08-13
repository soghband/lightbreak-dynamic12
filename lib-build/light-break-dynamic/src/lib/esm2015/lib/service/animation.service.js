import { __decorate, __metadata } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
let AnimationService = class AnimationService {
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
};
AnimationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AnimationService_Factory() { return new AnimationService(); }, token: AnimationService, providedIn: "root" });
AnimationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], AnimationService);
export { AnimationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBVyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBS3JDLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBWTVCO1FBVkEscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0QyxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxTQUFTLENBQUM7UUFDM0IsbUJBQWMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIseUJBQW9CLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCLFVBQUssR0FBRyxDQUFDLENBQUM7SUFJVixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsV0FBVztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzlDLE1BQU0sWUFBWSxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUN2RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFDLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV2QixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQTthQUNqQztZQUNELE9BQU8sWUFBWSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVELGNBQWM7UUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQyxDQUNELENBQUE7YUFDRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDZjtTQUNEO0lBQ0YsQ0FBQztJQUVELGFBQWEsQ0FBQyxjQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFNO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0QsQ0FBQTs7QUF0RFksZ0JBQWdCO0lBSDVCLFVBQVUsQ0FBQztRQUNYLFVBQVUsRUFBRSxNQUFNO0tBQ2xCLENBQUM7O0dBQ1csZ0JBQWdCLENBc0Q1QjtTQXREWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludGVydmFsLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblNlcnZpY2Uge1xuXHRcblx0YW5pbWF0aW9uRW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0YW5pbWF0aW9uUmVnaXN0ZXIgPSBbXTtcblx0YW5pbWF0aW9uU3RhdGUgPSAnaW5pdGlhbCc7XG5cdGluaXRTdGF0ZVRpbWVyID0gdGltZXIoMTAwKTtcblx0YW5pbWF0ZVF1ZXVlSW50ZXJ2YWwgPSB0aW1lcigxMDApO1xuXHRyZVJlbmRlcmluZyA9IGZhbHNlO1xuXHRlbmFibGVBbmltYXRpb24gPSBmYWxzZTtcblx0XG5cdGNvdW50ID0gMDtcblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcblx0fVxuXHRyZWdpc3RlckFuaW1hdGlvbihlbGVtZW50TmFtZSkge1xuXHRcdGlmICghdGhpcy5yZVJlbmRlcmluZyAmJiB0aGlzLmVuYWJsZUFuaW1hdGlvbikge1xuXHRcdFx0Y29uc3QgcmVnaXN0ZXJOYW1lID0gZWxlbWVudE5hbWUgKyAnXycgKyB0aGlzLmFuaW1hdGlvblJlZ2lzdGVyLmxlbmd0aDtcblx0XHRcdHRoaXMuYW5pbWF0aW9uUmVnaXN0ZXIucHVzaChyZWdpc3Rlck5hbWUpO1xuXHRcdFx0aWYgKHRoaXMuYW5pbWF0aW9uU3RhdGUgPT09ICdpbml0aWFsJykge1xuXHRcdFx0XHR0aGlzLmluaXRTdGF0ZVRpbWVyLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdpbml0aWFsZWQnXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVnaXN0ZXJOYW1lO1xuXHRcdH1cblx0fVxuXHRcblx0YW5pbWF0ZVByb2Nlc3MoKSB7XG5cdFx0aWYgKHRoaXMuZW5hYmxlQW5pbWF0aW9uKSB7XG5cdFx0XHRpZiAodGhpcy5hbmltYXRpb25SZWdpc3Rlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVF1ZXVlSW50ZXJ2YWwuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuY291bnQrKztcblx0XHRcdFx0XHRcdGNvbnN0IHF1ZXVlTmFtZSA9IHRoaXMuYW5pbWF0aW9uUmVnaXN0ZXIuc2hpZnQoKTtcblx0XHRcdFx0XHRcdHRoaXMuYW5pbWF0aW9uRW1pdHRlci5lbWl0KHF1ZXVlTmFtZSk7XG5cdFx0XHRcdFx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2luaXRpYWwnO1xuXHRcdFx0XHR0aGlzLmNvdW50ID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHNldE9uUmVSZW5kZXIocmVyZW5kZXJTdGF0dXMpIHtcblx0XHR0aGlzLnJlUmVuZGVyaW5nID0gcmVyZW5kZXJTdGF0dXNcblx0fVxuXHRcblx0c2V0RW5hYmxlQW5pbWF0aW9uKGVuYWJsZSkge1xuXHRcdHRoaXMuZW5hYmxlQW5pbWF0aW9uID0gKGVuYWJsZSA9PT0gJ3RydWUnIHx8IGVuYWJsZSA9PT0gdHJ1ZSk7XG5cdH1cbn1cbiJdfQ==