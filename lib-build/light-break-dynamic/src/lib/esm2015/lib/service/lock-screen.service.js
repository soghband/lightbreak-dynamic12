import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { timer } from "rxjs";
let LockScreenService = class LockScreenService {
    constructor() {
        this.color1 = "rgba(217,217,217,0.8)";
        this.color2 = "rgba(90,90,90,0.8)";
        this.createStyleTag();
    }
    createStyleTag() {
        let styleTag = document.createElement("style");
        let lockScreenAnime = document.getElementById("lockScreenCss");
        let styleData = ".loader { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color1 + ";  border-radius: 50%; width: 60px; height: 60px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -30px 0 0 -30px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite;} \n" +
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
    }
    setColor1(color) {
        this.color1 = color;
        this.createStyleTag();
    }
    setColor2(color) {
        this.color2 = color;
        this.createStyleTag();
    }
    lockScreen(timeout = 20000) {
        let lockScreenElement = document.getElementById("lockScreenLoading");
        if (lockScreenElement == null) {
            let lockScreenDiv = document.createElement("div");
            lockScreenDiv.id = "lockScreenLoading";
            lockScreenDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
            lockScreenDiv.style.width = "100vw";
            lockScreenDiv.style.height = "100vh";
            lockScreenDiv.style.position = "fixed";
            lockScreenDiv.style.top = "0px";
            lockScreenDiv.style.left = "0px";
            lockScreenDiv.style.zIndex = "1051";
            let loading = document.createElement("div");
            let loading2 = document.createElement("div");
            loading.className = "loader";
            loading2.className = "loader2";
            lockScreenDiv.appendChild(loading);
            lockScreenDiv.appendChild(loading2);
            document.body.appendChild(lockScreenDiv);
            this.subscribeProcess = timer(timeout)
                .subscribe(() => {
                this.unLockScreen();
            });
        }
        else {
            if (typeof (this.subscribeProcess) != "undefined") {
                this.subscribeProcess.unsubscribe();
                this.subscribeProcess = timer(timeout)
                    .subscribe(() => {
                    this.unLockScreen();
                });
            }
        }
    }
    unLockScreen() {
        timer(500)
            .subscribe(() => {
            let lockScreenElement = document.getElementById("lockScreenLoading");
            if (lockScreenElement != null) {
                document.body.removeChild(lockScreenElement);
                if (typeof (this.subscribeProcess) != "undefined") {
                    this.subscribeProcess.unsubscribe();
                }
            }
        });
    }
};
LockScreenService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LockScreenService);
export { LockScreenService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bnb2RpZ2l0L2xpZ2h0LWJyZWFrLWR5bmFtaWMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZS9sb2NrLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHM0IsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFJN0I7UUFGQSxXQUFNLEdBQUcsdUJBQXVCLENBQUE7UUFDaEMsV0FBTSxHQUFHLG9CQUFvQixDQUFBO1FBRTVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBQ0QsY0FBYztRQUNiLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxJQUFJLFNBQVMsR0FBRywyRUFBMkUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLHFOQUFxTjtZQUNoVSw0RUFBNEUsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLHlOQUF5TjtZQUNsVCx3RkFBd0YsQ0FBQztRQUMxRixJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDNUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7WUFDOUIsUUFBUSxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUM7WUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNOLGVBQWUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3RDO0lBQ0YsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENB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RVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0aW1lcn0gZnJvbSBcInJ4anNcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIExvY2tTY3JlZW5TZXJ2aWNlIHtcclxuXHRzdWJzY3JpYmVQcm9jZXNzO1xyXG5cdGNvbG9yMSA9IFwicmdiYSgyMTcsMjE3LDIxNywwLjgpXCJcclxuXHRjb2xvcjIgPSBcInJnYmEoOTAsOTAsOTAsMC44KVwiXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmNyZWF0ZVN0eWxlVGFnKClcclxuXHR9XHJcblx0Y3JlYXRlU3R5bGVUYWcoKSB7XHJcblx0XHRsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0XHRsZXQgbG9ja1NjcmVlbkFuaW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NrU2NyZWVuQ3NzXCIpO1xyXG5cdFx0bGV0IHN0eWxlRGF0YSA9IFwiLmxvYWRlciB7IGJvcmRlcjogOHB4IHNvbGlkIHJnYmEoMTY2LDE2NiwxNjYsMC4yKTsgYm9yZGVyLXRvcDogOHB4IHNvbGlkIFwiICsgdGhpcy5jb2xvcjEgKyBcIjsgIGJvcmRlci1yYWRpdXM6IDUwJTsgd2lkdGg6IDYwcHg7IGhlaWdodDogNjBweDsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiA1MCU7IHRvcDogNTAlOyB6LWluZGV4OiAxOyBtYXJnaW46IC0zMHB4IDAgMCAtMzBweDsgLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlOyBhbmltYXRpb246IHNwaW4gMXMgbGluZWFyIGluZmluaXRlO30gXFxuXCIrXHJcblx0XHRcdFwiLmxvYWRlcjIgeyBib3JkZXI6IDhweCBzb2xpZCByZ2JhKDE2NiwxNjYsMTY2LDAuMik7IGJvcmRlci10b3A6IDhweCBzb2xpZCBcIit0aGlzLmNvbG9yMitcIjsgIGJvcmRlci1yYWRpdXM6IDUwJTsgd2lkdGg6IDkwcHg7IGhlaWdodDogOTBweDsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiA1MCU7IHRvcDogNTAlOyB6LWluZGV4OiAxOyBtYXJnaW46IC00NXB4IDAgMCAtNDVweDsgLXdlYmtpdC1hbmltYXRpb246IHNwaW4gMS4ycyBsaW5lYXIgaW5maW5pdGU7IGFuaW1hdGlvbjogc3BpbiAxLjJzIGxpbmVhciBpbmZpbml0ZTt9IFxcblwiICtcclxuXHRcdFx0XCJAa2V5ZnJhbWVzIHNwaW4geyAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9IDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9fVwiO1xyXG5cdFx0aWYgKGxvY2tTY3JlZW5BbmltZSA9PSBudWxsKSB7XHJcblx0XHRcdHN0eWxlVGFnLmlubmVyVGV4dCA9IHN0eWxlRGF0YVxyXG5cdFx0XHRzdHlsZVRhZy5pZCA9IFwibG9ja1NjcmVlbkNzc1wiO1xyXG5cdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvY2tTY3JlZW5BbmltZS5pbm5lclRleHQgPSBzdHlsZURhdGE7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNldENvbG9yMShjb2xvcikge1xyXG5cdFx0dGhpcy5jb2xvcjEgPSBjb2xvclxyXG5cdFx0dGhpcy5jcmVhdGVTdHlsZVRhZygpO1xyXG5cdH1cclxuXHRcclxuXHRzZXRDb2xvcjIoY29sb3IpIHtcclxuXHRcdHRoaXMuY29sb3IyID0gY29sb3JcclxuXHRcdHRoaXMuY3JlYXRlU3R5bGVUYWcoKTtcclxuXHR9XHJcblx0bG9ja1NjcmVlbih0aW1lb3V0PTIwMDAwKSB7XHJcblx0XHRsZXQgbG9ja1NjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2tTY3JlZW5Mb2FkaW5nXCIpO1xyXG5cdFx0aWYgKGxvY2tTY3JlZW5FbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0bGV0IGxvY2tTY3JlZW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LmlkID0gXCJsb2NrU2NyZWVuTG9hZGluZ1wiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjUpXCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUud2lkdGggPSBcIjEwMHZ3XCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUuaGVpZ2h0ID0gXCIxMDB2aFwiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLnRvcCA9IFwiMHB4XCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUubGVmdCA9IFwiMHB4XCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuc3R5bGUuekluZGV4ID0gXCIxMDUxXCI7XHJcblx0XHRcdGxldCBsb2FkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0bGV0IGxvYWRpbmcyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0bG9hZGluZy5jbGFzc05hbWUgPSBcImxvYWRlclwiO1xyXG5cdFx0XHRsb2FkaW5nMi5jbGFzc05hbWUgPSBcImxvYWRlcjJcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5hcHBlbmRDaGlsZChsb2FkaW5nKTtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5hcHBlbmRDaGlsZChsb2FkaW5nMik7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9ja1NjcmVlbkRpdik7XHJcblx0XHRcdHRoaXMuc3Vic2NyaWJlUHJvY2VzcyA9IHRpbWVyKHRpbWVvdXQpXHJcblx0XHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnVuTG9ja1NjcmVlbigpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHR5cGVvZih0aGlzLnN1YnNjcmliZVByb2Nlc3MpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHR0aGlzLnN1YnNjcmliZVByb2Nlc3MudW5zdWJzY3JpYmUoKTtcclxuXHRcdFx0XHR0aGlzLnN1YnNjcmliZVByb2Nlc3MgPSB0aW1lcih0aW1lb3V0KVxyXG5cdFx0XHRcdFx0LnN1YnNjcmliZSgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMudW5Mb2NrU2NyZWVuKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR1bkxvY2tTY3JlZW4oKSB7XHJcblx0XHR0aW1lcig1MDApXHJcblx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdGxldCBsb2NrU2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9ja1NjcmVlbkxvYWRpbmdcIik7XHJcblx0XHRcdFx0aWYgKGxvY2tTY3JlZW5FbGVtZW50ICE9IG51bGwpIHtcclxuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobG9ja1NjcmVlbkVsZW1lbnQpO1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZih0aGlzLnN1YnNjcmliZVByb2Nlc3MpICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdWJzY3JpYmVQcm9jZXNzLnVuc3Vic2NyaWJlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=