import {Injectable} from '@angular/core';
import {timer} from "rxjs";

@Injectable()
export class LockScreenService {
	subscribeProcess;
	color1 = "rgba(217,217,217,0.8)"
	color2 = "rgba(90,90,90,0.8)"
	constructor() {
		this.createStyleTag()
	}
	createStyleTag() {
		let styleTag = document.createElement("style");
		let lockScreenAnime = document.getElementById("lockScreenCss");
		let styleData = ".loader { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color1 + ";  border-radius: 50%; width: 60px; height: 60px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -30px 0 0 -30px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite;} \n"+
			".loader2 { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid "+this.color2+";  border-radius: 50%; width: 90px; height: 90px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -45px 0 0 -45px; -webkit-animation: spin 1.2s linear infinite; animation: spin 1.2s linear infinite;} \n" +
			"@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}";
		if (lockScreenAnime == null) {
			styleTag.innerText = styleData
			styleTag.id = "lockScreenCss";
			document.head.appendChild(styleTag);
		} else {
			lockScreenAnime.innerText = styleData;
		}
	}
	setColor1(color) {
		this.color1 = color
		this.createStyleTag();
	}
	
	setColor2(color) {
		this.color2 = color
		this.createStyleTag();
	}
	lockScreen(timeout=20000) {
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
		} else {
			if (typeof(this.subscribeProcess) != "undefined") {
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
					if (typeof(this.subscribeProcess) != "undefined") {
						this.subscribeProcess.unsubscribe();
					}
				}
			})
	}
}
