import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isString } from '@angular-package/type';
export class DynamicTabComponent {
    constructor() {
        this.lockTab = false;
        this.callBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.currentTab = 0;
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
        if (this.currentTab == this.tabCreation.tabList.length - 2) {
            lastTab = true;
        }
        if (this.currentTab < this.tabCreation.tabList.length - 1) {
            this.currentTab = this.currentTab + 1;
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
        }
        else {
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
        }
        else {
            this.lockTab = true;
        }
    }
    getCssStatus(tabNumber) {
        if (!isNaN(parseFloat(tabNumber)) && isFinite(tabNumber)) {
            if (tabNumber == this.currentTab) {
                return "p2DShowTab";
            }
            return "p2DHideTab";
        }
        else {
            if (this.tabCreation.tabList.indexOf(tabNumber) == this.currentTab) {
                return "p2DShowTab";
            }
            return "p2DHideTab";
        }
    }
    gotoTab(tabIndex) {
        if (isString(tabIndex)) {
            let index = this.tabCreation.tabList.indexOf(tabIndex);
            if (index == -1) {
                console.error("Tab name not found.");
            }
            else {
                this.currentTab = index;
            }
        }
        else {
            if (tabIndex > (this.tabCreation.tabList.length - 1)) {
                console.error("Tab index not found.");
            }
            else {
                this.currentTab = tabIndex;
            }
        }
    }
}
DynamicTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-dynamic-tab',
                template: "<div class=\"{{tabCreation.option.customClass ? tabCreation.option.customClass:'dynamicTab'}}\">\r\n  <div *ngFor=\"let i of objKeys(tabCreation.tabList)\" (click)=\"processCallBack({tabNum:i,tabName:tabCreation.tabList[i]})\" class=\"tabComponent {{currentTab == i ? 'active':'inactive'}}\" id=\"dynamic_tab_{{tabCreation.tabList[i]}}\">\r\n    {{tabCreation.tabList[i]}}\r\n  </div>\r\n</div>"
            },] }
];
DynamicTabComponent.ctorParameters = () => [];
DynamicTabComponent.propDecorators = {
    tabCreation: [{ type: Input }],
    lockTab: [{ type: Input }],
    callBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLXRhYi9keW5hbWljLXRhYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFNL0MsTUFBTSxPQUFPLG1CQUFtQjtJQVEvQjtRQU5TLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QixlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBSWYsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUk7UUFDbkIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDRixDQUFDO0lBQ0QsYUFBYSxDQUFDLFFBQVE7UUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDckQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxX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QUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnQGFuZ3VsYXItcGFja2FnZS90eXBlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtdGFiJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy10YWIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSB0YWJDcmVhdGlvbjtcclxuXHRASW5wdXQoKSBsb2NrVGFiID0gZmFsc2U7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRjdXJyZW50VGFiID0gMDtcclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0fVxyXG5cclxuXHRwcm9jZXNzQ2FsbEJhY2soZGF0YSkge1xyXG5cdFx0aWYgKHRoaXMuZ2V0RGlzYWJsZVRhYihwYXJzZUludChkYXRhLnRhYk51bSkpKSB7XHJcblx0XHRcdHRoaXMuY3VycmVudFRhYiA9IHBhcnNlSW50KGRhdGEudGFiTnVtKTtcclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KGRhdGEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXREaXNhYmxlVGFiKHRhYkluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5sb2NrVGFiKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnRhYkNyZWF0aW9uLm9wdGlvbi5sb2NrQnlJbmRleCAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aWYgKHRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4W3BhcnNlSW50KHRhYkluZGV4KV0gIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0cmV0dXJuICF0aGlzLnRhYkNyZWF0aW9uLm9wdGlvbi5sb2NrQnlJbmRleFtwYXJzZUludCh0YWJJbmRleCldO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdGRpc2FibGVUYWIodGFiSW5kZXgpIHtcclxuXHRcdGlmICh0aGlzLnRhYkNyZWF0aW9uLm9wdGlvbi5sb2NrQnlJbmRleCA9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy50YWJDcmVhdGlvbi5vcHRpb24ubG9ja0J5SW5kZXggPSBbXTtcclxuXHRcdH1cclxuXHRcdHRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4W3RhYkluZGV4XSA9IHRydWU7XHJcblx0fVxyXG5cdGVuYWJsZVRhYih0YWJJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnRhYkNyZWF0aW9uLm9wdGlvbi5sb2NrQnlJbmRleCA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy50YWJDcmVhdGlvbi5vcHRpb24ubG9ja0J5SW5kZXhbdGFiSW5kZXhdID0gZmFsc2U7XHJcblx0fVxyXG5cdG5leHRUYWIoKSB7XHJcblx0XHRsZXQgbGFzdFRhYiA9IGZhbHNlO1xyXG5cdFx0aWYgKHRoaXMuY3VycmVudFRhYiA9PSB0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3QubGVuZ3RoLTIpIHtcclxuXHRcdFx0bGFzdFRhYiA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5jdXJyZW50VGFiIDwgdGhpcy50YWJDcmVhdGlvbi50YWJMaXN0Lmxlbmd0aC0xKXtcclxuXHRcdFx0dGhpcy5jdXJyZW50VGFiID0gdGhpcy5jdXJyZW50VGFiKzE7XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0YWN0aW9uOiBcIm5leHRUYWJcIixcclxuXHRcdFx0XHRmcm9tVGFiOiB7XHJcblx0XHRcdFx0XHRuYW1lOiB0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3RbdGhpcy5jdXJyZW50VGFiIC0gMV0sXHJcblx0XHRcdFx0XHRpbmRleDogdGhpcy5jdXJyZW50VGFiIC0gMVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dG9UYWI6IHtcclxuXHRcdFx0XHRcdG5hbWU6IHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdFt0aGlzLmN1cnJlbnRUYWJdLFxyXG5cdFx0XHRcdFx0aW5kZXg6IHRoaXMuY3VycmVudFRhYlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bGFzdDogbGFzdFRhYlxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdFx0YWN0aW9uOiBcIm5leHRUYWJcIixcclxuXHRcdFx0XHRmcm9tVGFiOiB7XHJcblx0XHRcdFx0XHRuYW1lOiB0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3RbdGhpcy5jdXJyZW50VGFiXSxcclxuXHRcdFx0XHRcdGluZGV4OiB0aGlzLmN1cnJlbnRUYWJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHRvVGFiOiB7XHJcblx0XHRcdFx0XHRuYW1lOiB0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3RbdGhpcy5jdXJyZW50VGFiXSxcclxuXHRcdFx0XHRcdGluZGV4OiB0aGlzLmN1cnJlbnRUYWJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGxhc3Q6IHRydWVcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRvZ2dsZUxvY2tUYWIoKSB7XHJcblx0XHRpZiAodGhpcy5sb2NrVGFiKSB7XHJcblx0XHRcdHRoaXMubG9ja1RhYiA9IGZhbHNlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sb2NrVGFiID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Z2V0Q3NzU3RhdHVzKHRhYk51bWJlcikge1xyXG5cdFx0aWYgKCFpc05hTihwYXJzZUZsb2F0KHRhYk51bWJlcikpICYmIGlzRmluaXRlKHRhYk51bWJlcikpIHtcclxuXHRcdFx0aWYgKHRhYk51bWJlciA9PSB0aGlzLmN1cnJlbnRUYWIpIHtcclxuXHRcdFx0XHRyZXR1cm4gXCJwMkRTaG93VGFiXCJcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gXCJwMkRIaWRlVGFiXCJcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3QuaW5kZXhPZih0YWJOdW1iZXIpID09IHRoaXMuY3VycmVudFRhYikge1xyXG5cdFx0XHRcdHJldHVybiBcInAyRFNob3dUYWJcIlxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBcInAyREhpZGVUYWJcIjtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdGdvdG9UYWIodGFiSW5kZXgpIHtcclxuXHRcdGlmIChpc1N0cmluZyh0YWJJbmRleCkpIHtcclxuXHRcdFx0bGV0IGluZGV4ID0gdGhpcy50YWJDcmVhdGlvbi50YWJMaXN0LmluZGV4T2YodGFiSW5kZXgpO1xyXG5cdFx0XHRpZiAoaW5kZXggPT0gLTEpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVGFiIG5hbWUgbm90IGZvdW5kLlwiKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudFRhYiA9IGluZGV4XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICh0YWJJbmRleCA+ICh0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3QubGVuZ3RoIC0gMSkpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiVGFiIGluZGV4IG5vdCBmb3VuZC5cIilcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmN1cnJlbnRUYWIgPSB0YWJJbmRleFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==