import { Injectable } from '@angular/core';
import { timer } from "rxjs";
export class LockScreenService {
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
}
LockScreenService.decorators = [
    { type: Injectable }
];
LockScreenService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpZ2h0LWJyZWFrLWR5bmFtaWMvc3JjL2xpYi9zZXJ2aWNlL2xvY2stc2NyZWVuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRzNCLE1BQU0sT0FBTyxpQkFBaUI7SUFJN0I7UUFGQSxXQUFNLEdBQUcsdUJBQXVCLENBQUE7UUFDaEMsV0FBTSxHQUFHLG9CQUFvQixDQUFBO1FBRTVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBQ0QsY0FBYztRQUNiLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRCxJQUFJLFNBQVMsR0FBRywyRUFBMkUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLHFOQUFxTjtZQUNoVSw0RUFBNEUsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLHlOQUF5TjtZQUNsVCx3RkFBd0YsQ0FBQztRQUMxRixJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDNUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7WUFDOUIsUUFBUSxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUM7WUFDOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNOLGVBQWUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQ3RDO0lBQ0YsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFLO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxL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bSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dGltZXJ9IGZyb20gXCJyeGpzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMb2NrU2NyZWVuU2VydmljZSB7XHJcblx0c3Vic2NyaWJlUHJvY2VzcztcclxuXHRjb2xvcjEgPSBcInJnYmEoMjE3LDIxNywyMTcsMC44KVwiXHJcblx0Y29sb3IyID0gXCJyZ2JhKDkwLDkwLDkwLDAuOClcIlxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jcmVhdGVTdHlsZVRhZygpXHJcblx0fVxyXG5cdGNyZWF0ZVN0eWxlVGFnKCkge1xyXG5cdFx0bGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdFx0bGV0IGxvY2tTY3JlZW5BbmltZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9ja1NjcmVlbkNzc1wiKTtcclxuXHRcdGxldCBzdHlsZURhdGEgPSBcIi5sb2FkZXIgeyBib3JkZXI6IDhweCBzb2xpZCByZ2JhKDE2NiwxNjYsMTY2LDAuMik7IGJvcmRlci10b3A6IDhweCBzb2xpZCBcIiArIHRoaXMuY29sb3IxICsgXCI7ICBib3JkZXItcmFkaXVzOiA1MCU7IHdpZHRoOiA2MHB4OyBoZWlnaHQ6IDYwcHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogNTAlOyB0b3A6IDUwJTsgei1pbmRleDogMTsgbWFyZ2luOiAtMzBweCAwIDAgLTMwcHg7IC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTsgYW5pbWF0aW9uOiBzcGluIDFzIGxpbmVhciBpbmZpbml0ZTt9IFxcblwiK1xyXG5cdFx0XHRcIi5sb2FkZXIyIHsgYm9yZGVyOiA4cHggc29saWQgcmdiYSgxNjYsMTY2LDE2NiwwLjIpOyBib3JkZXItdG9wOiA4cHggc29saWQgXCIrdGhpcy5jb2xvcjIrXCI7ICBib3JkZXItcmFkaXVzOiA1MCU7IHdpZHRoOiA5MHB4OyBoZWlnaHQ6IDkwcHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDogNTAlOyB0b3A6IDUwJTsgei1pbmRleDogMTsgbWFyZ2luOiAtNDVweCAwIDAgLTQ1cHg7IC13ZWJraXQtYW5pbWF0aW9uOiBzcGluIDEuMnMgbGluZWFyIGluZmluaXRlOyBhbmltYXRpb246IHNwaW4gMS4ycyBsaW5lYXIgaW5maW5pdGU7fSBcXG5cIiArXHJcblx0XHRcdFwiQGtleWZyYW1lcyBzcGluIHsgMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfSAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfX1cIjtcclxuXHRcdGlmIChsb2NrU2NyZWVuQW5pbWUgPT0gbnVsbCkge1xyXG5cdFx0XHRzdHlsZVRhZy5pbm5lclRleHQgPSBzdHlsZURhdGFcclxuXHRcdFx0c3R5bGVUYWcuaWQgPSBcImxvY2tTY3JlZW5Dc3NcIjtcclxuXHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsb2NrU2NyZWVuQW5pbWUuaW5uZXJUZXh0ID0gc3R5bGVEYXRhO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZXRDb2xvcjEoY29sb3IpIHtcclxuXHRcdHRoaXMuY29sb3IxID0gY29sb3JcclxuXHRcdHRoaXMuY3JlYXRlU3R5bGVUYWcoKTtcclxuXHR9XHJcblx0XHJcblx0c2V0Q29sb3IyKGNvbG9yKSB7XHJcblx0XHR0aGlzLmNvbG9yMiA9IGNvbG9yXHJcblx0XHR0aGlzLmNyZWF0ZVN0eWxlVGFnKCk7XHJcblx0fVxyXG5cdGxvY2tTY3JlZW4odGltZW91dD0yMDAwMCkge1xyXG5cdFx0bGV0IGxvY2tTY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NrU2NyZWVuTG9hZGluZ1wiKTtcclxuXHRcdGlmIChsb2NrU2NyZWVuRWxlbWVudCA9PSBudWxsKSB7XHJcblx0XHRcdGxldCBsb2NrU2NyZWVuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5pZCA9IFwibG9ja1NjcmVlbkxvYWRpbmdcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC41KVwiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLndpZHRoID0gXCIxMDB2d1wiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLmhlaWdodCA9IFwiMTAwdmhcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuXHRcdFx0bG9ja1NjcmVlbkRpdi5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG5cdFx0XHRsb2NrU2NyZWVuRGl2LnN0eWxlLnpJbmRleCA9IFwiMTA1MVwiO1xyXG5cdFx0XHRsZXQgbG9hZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGxldCBsb2FkaW5nMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGxvYWRpbmcuY2xhc3NOYW1lID0gXCJsb2FkZXJcIjtcclxuXHRcdFx0bG9hZGluZzIuY2xhc3NOYW1lID0gXCJsb2FkZXIyXCI7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuYXBwZW5kQ2hpbGQobG9hZGluZyk7XHJcblx0XHRcdGxvY2tTY3JlZW5EaXYuYXBwZW5kQ2hpbGQobG9hZGluZzIpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvY2tTY3JlZW5EaXYpO1xyXG5cdFx0XHR0aGlzLnN1YnNjcmliZVByb2Nlc3MgPSB0aW1lcih0aW1lb3V0KVxyXG5cdFx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy51bkxvY2tTY3JlZW4oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5zdWJzY3JpYmVQcm9jZXNzKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0dGhpcy5zdWJzY3JpYmVQcm9jZXNzLnVuc3Vic2NyaWJlKCk7XHJcblx0XHRcdFx0dGhpcy5zdWJzY3JpYmVQcm9jZXNzID0gdGltZXIodGltZW91dClcclxuXHRcdFx0XHRcdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVuTG9ja1NjcmVlbigpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0dW5Mb2NrU2NyZWVuKCkge1xyXG5cdFx0dGltZXIoNTAwKVxyXG5cdFx0XHQuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRsZXQgbG9ja1NjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2tTY3JlZW5Mb2FkaW5nXCIpO1xyXG5cdFx0XHRcdGlmIChsb2NrU2NyZWVuRWxlbWVudCAhPSBudWxsKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxvY2tTY3JlZW5FbGVtZW50KTtcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YodGhpcy5zdWJzY3JpYmVQcm9jZXNzKSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc3Vic2NyaWJlUHJvY2Vzcy51bnN1YnNjcmliZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuIl19