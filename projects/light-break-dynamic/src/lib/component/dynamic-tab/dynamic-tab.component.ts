import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isString} from '@angular-package/type';

@Component({
	selector: 'lb9-dynamic-tab',
	templateUrl: './dynamic-tab.component.html'
})
export class DynamicTabComponent implements OnInit {
	@Input() tabCreation;
	@Input() lockTab = false;
	@Output() callBack = new EventEmitter();
	objKeys = Object.keys;
	currentTab = 0;


	constructor() {
	}

	ngOnInit() {
	}

	processCallBack(data) {
		if (this.getDisableTab(parseInt(data.tabNum))) {
			this.currentTab = parseInt(data.tabNum);
			this.callBack.emit(data);
		}
	}
	getDisableTab(tabIndex) {
		if (this.lockTab) {
			return false;
		}
		if (this.tabCreation.option.lockByIndex != undefined) {
			if (this.tabCreation.option.lockByIndex[parseInt(tabIndex)] != undefined) {
				return !this.tabCreation.option.lockByIndex[parseInt(tabIndex)];
			}
			return true;
		}
		return true;
	}
	disableTab(tabIndex) {
		if (this.tabCreation.option.lockByIndex == undefined) {
			this.tabCreation.option.lockByIndex = [];
		}
		this.tabCreation.option.lockByIndex[tabIndex] = true;
	}
	enableTab(tabIndex) {
		if (this.tabCreation.option.lockByIndex == undefined) {
			this.tabCreation.option.lockByIndex = [];
		}
		this.tabCreation.option.lockByIndex[tabIndex] = false;
	}
	nextTab() {
		let lastTab = false;
		if (this.currentTab == this.tabCreation.tabList.length-2) {
			lastTab = true;
		}
		if (this.currentTab < this.tabCreation.tabList.length-1){
			this.currentTab = this.currentTab+1;
			this.callBack.emit({
				action: "nextTab",
				fromTab: {
					name: this.tabCreation.tabList[this.currentTab - 1],
					index: this.currentTab - 1
				},
				toTab: {
					name: this.tabCreation.tabList[this.currentTab],
					index: this.currentTab
				},
				last: lastTab
			});
		} else {
			this.callBack.emit({
				action: "nextTab",
				fromTab: {
					name: this.tabCreation.tabList[this.currentTab],
					index: this.currentTab
				},
				toTab: {
					name: this.tabCreation.tabList[this.currentTab],
					index: this.currentTab
				},
				last: true
			});
		}
	}
	toggleLockTab() {
		if (this.lockTab) {
			this.lockTab = false;
		} else {
			this.lockTab = true;
		}
	}
	getCssStatus(tabNumber) {
		if (!isNaN(parseFloat(tabNumber)) && isFinite(tabNumber)) {
			if (tabNumber == this.currentTab) {
				return "p2DShowTab"
			}
			return "p2DHideTab"
		} else {
			if (this.tabCreation.tabList.indexOf(tabNumber) == this.currentTab) {
				return "p2DShowTab"
			}
			return "p2DHideTab";
		}

	}
	gotoTab(tabIndex) {
		if (isString(tabIndex)) {
			let index = this.tabCreation.tabList.indexOf(tabIndex);
			if (index == -1) {
				console.error("Tab name not found.")
			} else {
				this.currentTab = index
			}
		} else {
			if (tabIndex > (this.tabCreation.tabList.length - 1)) {
				console.error("Tab index not found.")
			} else {
				this.currentTab = tabIndex
			}
		}
	}
}
