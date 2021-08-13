import { __decorate, __metadata } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
var AnimationService = /** @class */ (function () {
    function AnimationService() {
        this.animationEmitter = new EventEmitter();
        this.animationRegister = [];
        this.animationState = 'initial';
        this.initStateTimer = timer(100);
        this.animateQueueInterval = timer(100);
        this.reRendering = false;
        this.enableAnimation = false;
        this.count = 0;
    }
    AnimationService.prototype.registerAnimation = function (elementName) {
        var _this = this;
        if (!this.reRendering && this.enableAnimation) {
            var registerName = elementName + '_' + this.animationRegister.length;
            this.animationRegister.push(registerName);
            if (this.animationState === 'initial') {
                this.initStateTimer.subscribe(function () {
                    _this.animateProcess();
                });
                this.animationState = 'initialed';
            }
            return registerName;
        }
    };
    AnimationService.prototype.animateProcess = function () {
        var _this = this;
        if (this.enableAnimation) {
            if (this.animationRegister.length > 0) {
                this.animateQueueInterval.subscribe(function () {
                    _this.count++;
                    var queueName = _this.animationRegister.shift();
                    _this.animationEmitter.emit(queueName);
                    _this.animateProcess();
                });
            }
            else {
                this.animationState = 'initial';
                this.count = 0;
            }
        }
    };
    AnimationService.prototype.setOnReRender = function (rerenderStatus) {
        this.reRendering = rerenderStatus;
    };
    AnimationService.prototype.setEnableAnimation = function (enable) {
        this.enableAnimation = (enable === 'true' || enable === true);
    };
    AnimationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AnimationService_Factory() { return new AnimationService(); }, token: AnimationService, providedIn: "root" });
    AnimationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AnimationService);
    return AnimationService;
}());
export { AnimationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBVyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7O0FBS3JDO0lBWUM7UUFWQSxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RDLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QixtQkFBYyxHQUFHLFNBQVMsQ0FBQztRQUMzQixtQkFBYyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1Qix5QkFBb0IsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEIsVUFBSyxHQUFHLENBQUMsQ0FBQztJQUlWLENBQUM7SUFDRCw0Q0FBaUIsR0FBakIsVUFBa0IsV0FBVztRQUE3QixpQkFhQztRQVpBLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDOUMsSUFBTSxZQUFZLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFdkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUE7YUFDakM7WUFDRCxPQUFPLFlBQVksQ0FBQztTQUNwQjtJQUNGLENBQUM7SUFFRCx5Q0FBYyxHQUFkO1FBQUEsaUJBZUM7UUFkQSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQztvQkFDbEMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNiLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDakQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdEMsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixDQUFDLENBQ0QsQ0FBQTthQUNEO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNmO1NBQ0Q7SUFDRixDQUFDO0lBRUQsd0NBQWEsR0FBYixVQUFjLGNBQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUE7SUFDbEMsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixNQUFNO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOztJQXJEVyxnQkFBZ0I7UUFINUIsVUFBVSxDQUFDO1lBQ1gsVUFBVSxFQUFFLE1BQU07U0FDbEIsQ0FBQzs7T0FDVyxnQkFBZ0IsQ0FzRDVCOzJCQTVERDtDQTREQyxBQXRERCxJQXNEQztTQXREWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2ludGVydmFsLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcblx0cHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblNlcnZpY2Uge1xuXHRcblx0YW5pbWF0aW9uRW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblx0YW5pbWF0aW9uUmVnaXN0ZXIgPSBbXTtcblx0YW5pbWF0aW9uU3RhdGUgPSAnaW5pdGlhbCc7XG5cdGluaXRTdGF0ZVRpbWVyID0gdGltZXIoMTAwKTtcblx0YW5pbWF0ZVF1ZXVlSW50ZXJ2YWwgPSB0aW1lcigxMDApO1xuXHRyZVJlbmRlcmluZyA9IGZhbHNlO1xuXHRlbmFibGVBbmltYXRpb24gPSBmYWxzZTtcblx0XG5cdGNvdW50ID0gMDtcblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcblx0fVxuXHRyZWdpc3RlckFuaW1hdGlvbihlbGVtZW50TmFtZSkge1xuXHRcdGlmICghdGhpcy5yZVJlbmRlcmluZyAmJiB0aGlzLmVuYWJsZUFuaW1hdGlvbikge1xuXHRcdFx0Y29uc3QgcmVnaXN0ZXJOYW1lID0gZWxlbWVudE5hbWUgKyAnXycgKyB0aGlzLmFuaW1hdGlvblJlZ2lzdGVyLmxlbmd0aDtcblx0XHRcdHRoaXMuYW5pbWF0aW9uUmVnaXN0ZXIucHVzaChyZWdpc3Rlck5hbWUpO1xuXHRcdFx0aWYgKHRoaXMuYW5pbWF0aW9uU3RhdGUgPT09ICdpbml0aWFsJykge1xuXHRcdFx0XHR0aGlzLmluaXRTdGF0ZVRpbWVyLnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdpbml0aWFsZWQnXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVnaXN0ZXJOYW1lO1xuXHRcdH1cblx0fVxuXHRcblx0YW5pbWF0ZVByb2Nlc3MoKSB7XG5cdFx0aWYgKHRoaXMuZW5hYmxlQW5pbWF0aW9uKSB7XG5cdFx0XHRpZiAodGhpcy5hbmltYXRpb25SZWdpc3Rlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVF1ZXVlSW50ZXJ2YWwuc3Vic2NyaWJlKCgpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuY291bnQrKztcblx0XHRcdFx0XHRcdGNvbnN0IHF1ZXVlTmFtZSA9IHRoaXMuYW5pbWF0aW9uUmVnaXN0ZXIuc2hpZnQoKTtcblx0XHRcdFx0XHRcdHRoaXMuYW5pbWF0aW9uRW1pdHRlci5lbWl0KHF1ZXVlTmFtZSk7XG5cdFx0XHRcdFx0XHR0aGlzLmFuaW1hdGVQcm9jZXNzKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2luaXRpYWwnO1xuXHRcdFx0XHR0aGlzLmNvdW50ID0gMDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHNldE9uUmVSZW5kZXIocmVyZW5kZXJTdGF0dXMpIHtcblx0XHR0aGlzLnJlUmVuZGVyaW5nID0gcmVyZW5kZXJTdGF0dXNcblx0fVxuXHRcblx0c2V0RW5hYmxlQW5pbWF0aW9uKGVuYWJsZSkge1xuXHRcdHRoaXMuZW5hYmxlQW5pbWF0aW9uID0gKGVuYWJsZSA9PT0gJ3RydWUnIHx8IGVuYWJsZSA9PT0gdHJ1ZSk7XG5cdH1cbn1cbiJdfQ==