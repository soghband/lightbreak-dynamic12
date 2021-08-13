import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { timer } from "rxjs";
var LockScreenService = /** @class */ (function () {
    function LockScreenService() {
        this.color1 = "rgba(217,217,217,0.8)";
        this.color2 = "rgba(90,90,90,0.8)";
        this.createStyleTag();
    }
    LockScreenService.prototype.createStyleTag = function () {
        var styleTag = document.createElement("style");
        var lockScreenAnime = document.getElementById("lockScreenCss");
        var styleData = ".loader { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color1 + ";  border-radius: 50%; width: 60px; height: 60px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -30px 0 0 -30px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite;} \n" +
            ".loader2 { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color2 + ";  border-radius: 50%; width: 90px; height: 90px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -45px 0 0 -45px; -webkit-animation: spin 1.2s linear infinite; animation: spin 1.2s linear infinite;} \n" +
            "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}";
        if (lockScreenAnime == null) {
            styleTag.innerText = styleData;
            styleTag.id = "lockScreenCss";
            document.head.appendChild(styleTag);
        }
        else {
            lockScreenAnime.innerText = styleData;
        }
    };
    LockScreenService.prototype.setColor1 = function (color) {
        this.color1 = color;
        this.createStyleTag();
    };
    LockScreenService.prototype.setColor2 = function (color) {
        this.color2 = color;
        this.createStyleTag();
    };
    LockScreenService.prototype.lockScreen = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 20000; }
        var lockScreenElement = document.getElementById("lockScreenLoading");
        if (lockScreenElement == null) {
            var lockScreenDiv = document.createElement("div");
            lockScreenDiv.id = "lockScreenLoading";
            lockScreenDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            lockScreenDiv.style.width = "100vw";
            lockScreenDiv.style.height = "100vh";
            lockScreenDiv.style.position = "fixed";
            lockScreenDiv.style.top = "0px";
            lockScreenDiv.style.left = "0px";
            lockScreenDiv.style.zIndex = "1051";
            var loading = document.createElement("div");
            var loading2 = document.createElement("div");
            loading.className = "loader";
            loading2.className = "loader2";
            lockScreenDiv.appendChild(loading);
            lockScreenDiv.appendChild(loading2);
            document.body.appendChild(lockScreenDiv);
            this.subscribeProcess = timer(timeout)
                .subscribe(function () {
                _this.unLockScreen();
            });
        }
        else {
            if (typeof (this.subscribeProcess) != "undefined") {
                this.subscribeProcess.unsubscribe();
                this.subscribeProcess = timer(timeout)
                    .subscribe(function () {
                    _this.unLockScreen();
                });
            }
        }
    };
    LockScreenService.prototype.unLockScreen = function () {
        var _this = this;
        timer(500)
            .subscribe(function () {
            var lockScreenElement = document.getElementById("lockScreenLoading");
            if (lockScreenElement != null) {
                document.body.removeChild(lockScreenElement);
                if (typeof (_this.subscribeProcess) != "undefined") {
                    _this.subscribeProcess.unsubscribe();
                }
            }
        });
    };
    LockScreenService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], LockScreenService);
    return LockScreenService;
}());
export { LockScreenService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9sb2NrLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHM0I7SUFJQztRQUZBLFdBQU0sR0FBRyx1QkFBdUIsQ0FBQTtRQUNoQyxXQUFNLEdBQUcsb0JBQW9CLENBQUE7UUFFNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFDRCwwQ0FBYyxHQUFkO1FBQ0MsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9ELElBQUksU0FBUyxHQUFHLDJFQUEyRSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcscU5BQXFOO1lBQ2hVLDRFQUE0RSxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMseU5BQXlOO1lBQ2xULHdGQUF3RixDQUFDO1FBQzFGLElBQUksZUFBZSxJQUFJLElBQUksRUFBRTtZQUM1QixRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtZQUM5QixRQUFRLENBQUMsRUFBRSxHQUFHLGVBQWUsQ0FBQztZQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ04sZUFBZSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDdEM7SUFDRixDQUFDO0lBQ0QscUNBQVMsR0FBVCxVQUFVLEtBQUs7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUNuQixJQUFJLENBQUMs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QUM7Q0FBQSxBQTNFRCxJQTJFQztTQTNFWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3RpbWVyfSBmcm9tIFwicnhqc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTG9ja1NjcmVlblNlcnZpY2Uge1xyXG5cdHN1YnNjcmliZVByb2Nlc3M7XHJcblx0Y29sb3IxID0gXCJyZ2JhKDIxNywyMTcsMjE3LDAuOClcIlxyXG5cdGNvbG9yMiA9IFwicmdiYSg5MCw5MCw5MCwwLjgpXCJcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuY3JlYXRlU3R5bGVUYWcoKVxyXG5cdH1cclxuXHRjcmVhdGVTdHlsZVRhZygpIHtcclxuXHRcdGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRcdGxldCBsb2NrU2NyZWVuQW5pbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2tTY3JlZW5Dc3NcIik7XHJcblx0XHRsZXQgc3R5bGVEYXRhID0gXCIubG9hZGVyIHsgYm9yZGVyOiA4cHggc29saWQgcmdiYSgxNjYsMTY2LDE2NiwwLjIpOyBib3JkZXItdG9wOiA4cHggc29saWQgXCIgKyB0aGlzLmNvbG9yMSArIFwiOyAgYm9yZGVyLXJhZGl1czogNTAlOyB3aWR0aDogNjBweDsgaGVpZ2h0OiA2MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDUwJTsgdG9wOiA1MCU7IHotaW5kZXg6IDE7IG1hcmdpbjogLTMwcHggMCAwIC0zMHB4OyAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7IGFuaW1hdGlvbjogc3BpbiAxcyBsaW5lYXIgaW5maW5pdGU7fSBcXG5cIitcclxuXHRcdFx0XCIubG9hZGVyMiB7IGJvcmRlcjogOHB4IHNvbGlkIHJnYmEoMTY2LDE2NiwxNjYsMC4yKTsgYm9yZGVyLXRvcDogOHB4IHNvbGlkIFwiK3RoaXMuY29sb3IyK1wiOyAgYm9yZGVyLXJhZGl1czogNTAlOyB3aWR0aDogOTBweDsgaGVpZ2h0OiA5MHB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDUwJTsgdG9wOiA1MCU7IHotaW5kZXg6IDE7IG1hcmdpbjogLTQ1cHggMCAwIC00NXB4OyAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAxLjJzIGxpbmVhciBpbmZpbml0ZTsgYW5pbWF0aW9uOiBzcGluIDEuMnMgbGluZWFyIGluZmluaXRlO30gXFxuXCIgK1xyXG5cdFx0XHRcIkBrZXlmcmFtZXMgc3BpbiB7IDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH19XCI7XHJcblx0XHRpZiAobG9ja1NjcmVlbkFuaW1lID09IG51bGwpIHtcclxuXHRcdFx0c3R5bGVUYWcuaW5uZXJUZXh0ID0gc3R5bGVEYXRhXHJcblx0XHRcdHN0eWxlVGFnLmlkID0gXCJsb2NrU2NyZWVuQ3NzXCI7XHJcblx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bG9ja1NjcmVlbkFuaW1lLmlubmVyVGV4dCA9IHN0eWxlRGF0YTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2V0Q29sb3IxKGNvbG9yKSB7XHJcblx0XHR0aGlzLmNvbG9yMSA9IGNvbG9yXHJcblx0XHR0aGlzLmNyZWF0ZVN0eWxlVGFnKCk7XHJcblx0fVxyXG5cdFxyXG5cdHNldENvbG9yMihjb2xvcikge1xyXG5cdFx0dGhpcy5jb2xvcjIgPSBjb2xvclxyXG5cdFx0dGhpcy5jcmVhdGVTdHlsZVRhZygpO1xyXG5cdH1cclxuXHRsb2NrU2NyZWVuKHRpbWVvdXQ9MjAwMDApIHtcclxuXHRcdGxldCBsb2NrU2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9ja1NjcmVlbkxvYWRpbmdcIik7XHJcblx0XHRpZiAobG9ja1NjcmVlbkVsZW1lbnQgPT0gbnVsbCkge1xyXG5cdFx0XHRsZXQgbG9ja1NjcmVlbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuaWQgPSBcImxvY2tTY3JlZW5Mb2FkaW5nXCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNSlcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS53aWR0aCA9IFwiMTAwdndcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS5oZWlnaHQgPSBcIjEwMHZoXCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUudG9wID0gXCIwcHhcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS56SW5kZXggPSBcIjEwNTFcIjtcclxuXHRcdFx0bGV0IGxvYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRsZXQgbG9hZGluZzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRsb2FkaW5nLmNsYXNzTmFtZSA9IFwibG9hZGVyXCI7XHJcblx0XHRcdGxvYWRpbmcyLmNsYXNzTmFtZSA9IFwibG9hZGVyMlwiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LmFwcGVuZENoaWxkKGxvYWRpbmcpO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LmFwcGVuZENoaWxkKGxvYWRpbmcyKTtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2NrU2NyZWVuRGl2KTtcclxuXHRcdFx0dGhpcy5zdWJzY3JpYmVQcm9jZXNzID0gdGltZXIodGltZW91dClcclxuXHRcdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMudW5Mb2NrU2NyZWVuKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuc3Vic2NyaWJlUHJvY2VzcykgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdHRoaXMuc3Vic2NyaWJlUHJvY2Vzcy51bnN1YnNjcmliZSgpO1xyXG5cdFx0XHRcdHRoaXMuc3Vic2NyaWJlUHJvY2VzcyA9IHRpbWVyKHRpbWVvdXQpXHJcblx0XHRcdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy51bkxvY2tTY3JlZW4oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHVuTG9ja1NjcmVlbigpIHtcclxuXHRcdHRpbWVyKDUwMClcclxuXHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0bGV0IGxvY2tTY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NrU2NyZWVuTG9hZGluZ1wiKTtcclxuXHRcdFx0XHRpZiAobG9ja1NjcmVlbkVsZW1lbnQgIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsb2NrU2NyZWVuRWxlbWVudCk7XHJcblx0XHRcdFx0XHRpZiAodHlwZW9mKHRoaXMuc3Vic2NyaWJlUHJvY2VzcykgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN1YnNjcmliZVByb2Nlc3MudW5zdWJzY3JpYmUoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==