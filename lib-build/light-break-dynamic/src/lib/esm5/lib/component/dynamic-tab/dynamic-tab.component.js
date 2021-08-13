import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isString } from 'util';
var DynamicTabComponent = /** @class */ (function () {
    function DynamicTabComponent() {
        this.lockTab = false;
        this.callBack = new EventEmitter();
        this.objKeys = Object.keys;
        this.currentTab = 0;
    }
    DynamicTabComponent.prototype.ngOnInit = function () {
    };
    DynamicTabComponent.prototype.processCallBack = function (data) {
        if (this.getDisableTab(parseInt(data.tabNum))) {
            this.currentTab = parseInt(data.tabNum);
            this.callBack.emit(data);
        }
    };
    DynamicTabComponent.prototype.getDisableTab = function (tabIndex) {
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
    };
    DynamicTabComponent.prototype.disableTab = function (tabIndex) {
        if (this.tabCreation.option.lockByIndex == undefined) {
            this.tabCreation.option.lockByIndex = [];
        }
        this.tabCreation.option.lockByIndex[tabIndex] = true;
    };
    DynamicTabComponent.prototype.enableTab = function (tabIndex) {
        if (this.tabCreation.option.lockByIndex == undefined) {
            this.tabCreation.option.lockByIndex = [];
        }
        this.tabCreation.option.lockByIndex[tabIndex] = false;
    };
    DynamicTabComponent.prototype.nextTab = function () {
        var lastTab = false;
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
    };
    DynamicTabComponent.prototype.toggleLockTab = function () {
        if (this.lockTab) {
            this.lockTab = false;
        }
        else {
            this.lockTab = true;
        }
    };
    DynamicTabComponent.prototype.getCssStatus = function (tabNumber) {
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
    };
    DynamicTabComponent.prototype.gotoTab = function (tabIndex) {
        if (isString(tabIndex)) {
            var index = this.tabCreation.tabList.indexOf(tabIndex);
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
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicTabComponent.prototype, "tabCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicTabComponent.prototype, "lockTab", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicTabComponent.prototype, "callBack", void 0);
    DynamicTabComponent = __decorate([
        Component({
            selector: 'lb9-dynamic-tab',
            template: "<div class=\"{{tabCreation.option.customClass ? tabCreation.option.customClass:'dynamicTab'}}\">\r\n  <div *ngFor=\"let i of objKeys(tabCreation.tabList)\" (click)=\"processCallBack({tabNum:i,tabName:tabCreation.tabList[i]})\" class=\"tabComponent {{currentTab == i ? 'active':'inactive'}}\" id=\"dynamic_tab_{{tabCreation.tabList[i]}}\">\r\n    {{tabCreation.tabList[i]}}\r\n  </div>\r\n</div>"
        }),
        __metadata("design:paramtypes", [])
    ], DynamicTabComponent);
    return DynamicTabComponent;
}());
export { DynamicTabComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy10YWIvZHluYW1pYy10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFNOUI7SUFRQztRQU5TLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QixlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBSWYsQ0FBQztJQUVELHNDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNkNBQWUsR0FBZixVQUFnQixJQUFJO1FBQ25CLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO0lBQ0YsQ0FBQztJQUNELDJDQUFhLEdBQWIsVUFBYyxRQUFRO1FBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFO1lBQ3JELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFR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QStCO0lBSDVCLG1CQUFtQjtRQUovQixTQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLHNaQUEyQztTQUMzQyxDQUFDOztPQUNXLG1CQUFtQixDQW1IL0I7SUFBRCwwQkFBQztDQUFBLEFBbkhELElBbUhDO1NBbkhZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJ3V0aWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdsYjktZHluYW1pYy10YWInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLXRhYi5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIHRhYkNyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGxvY2tUYWIgPSBmYWxzZTtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdGN1cnJlbnRUYWIgPSAwO1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHR9XHJcblxyXG5cdHByb2Nlc3NDYWxsQmFjayhkYXRhKSB7XHJcblx0XHRpZiAodGhpcy5nZXREaXNhYmxlVGFiKHBhcnNlSW50KGRhdGEudGFiTnVtKSkpIHtcclxuXHRcdFx0dGhpcy5jdXJyZW50VGFiID0gcGFyc2VJbnQoZGF0YS50YWJOdW0pO1xyXG5cdFx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoZGF0YSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGdldERpc2FibGVUYWIodGFiSW5kZXgpIHtcclxuXHRcdGlmICh0aGlzLmxvY2tUYWIpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAodGhpcy50YWJDcmVhdGlvbi5vcHRpb24ubG9ja0J5SW5kZXhbcGFyc2VJbnQodGFiSW5kZXgpXSAhPSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gIXRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4W3BhcnNlSW50KHRhYkluZGV4KV07XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0ZGlzYWJsZVRhYih0YWJJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4ID09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnRhYkNyZWF0aW9uLm9wdGlvbi5sb2NrQnlJbmRleCA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy50YWJDcmVhdGlvbi5vcHRpb24ubG9ja0J5SW5kZXhbdGFiSW5kZXhdID0gdHJ1ZTtcclxuXHR9XHJcblx0ZW5hYmxlVGFiKHRhYkluZGV4KSB7XHJcblx0XHRpZiAodGhpcy50YWJDcmVhdGlvbi5vcHRpb24ubG9ja0J5SW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMudGFiQ3JlYXRpb24ub3B0aW9uLmxvY2tCeUluZGV4ID0gW107XHJcblx0XHR9XHJcblx0XHR0aGlzLnRhYkNyZWF0aW9uLm9wdGlvbi5sb2NrQnlJbmRleFt0YWJJbmRleF0gPSBmYWxzZTtcclxuXHR9XHJcblx0bmV4dFRhYigpIHtcclxuXHRcdGxldCBsYXN0VGFiID0gZmFsc2U7XHJcblx0XHRpZiAodGhpcy5jdXJyZW50VGFiID09IHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdC5sZW5ndGgtMikge1xyXG5cdFx0XHRsYXN0VGFiID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmN1cnJlbnRUYWIgPCB0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3QubGVuZ3RoLTEpe1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRUYWIgPSB0aGlzLmN1cnJlbnRUYWIrMTtcclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRhY3Rpb246IFwibmV4dFRhYlwiLFxyXG5cdFx0XHRcdGZyb21UYWI6IHtcclxuXHRcdFx0XHRcdG5hbWU6IHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdFt0aGlzLmN1cnJlbnRUYWIgLSAxXSxcclxuXHRcdFx0XHRcdGluZGV4OiB0aGlzLmN1cnJlbnRUYWIgLSAxXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR0b1RhYjoge1xyXG5cdFx0XHRcdFx0bmFtZTogdGhpcy50YWJDcmVhdGlvbi50YWJMaXN0W3RoaXMuY3VycmVudFRhYl0sXHJcblx0XHRcdFx0XHRpbmRleDogdGhpcy5jdXJyZW50VGFiXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRsYXN0OiBsYXN0VGFiXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0XHRhY3Rpb246IFwibmV4dFRhYlwiLFxyXG5cdFx0XHRcdGZyb21UYWI6IHtcclxuXHRcdFx0XHRcdG5hbWU6IHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdFt0aGlzLmN1cnJlbnRUYWJdLFxyXG5cdFx0XHRcdFx0aW5kZXg6IHRoaXMuY3VycmVudFRhYlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0dG9UYWI6IHtcclxuXHRcdFx0XHRcdG5hbWU6IHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdFt0aGlzLmN1cnJlbnRUYWJdLFxyXG5cdFx0XHRcdFx0aW5kZXg6IHRoaXMuY3VycmVudFRhYlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bGFzdDogdHJ1ZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0dG9nZ2xlTG9ja1RhYigpIHtcclxuXHRcdGlmICh0aGlzLmxvY2tUYWIpIHtcclxuXHRcdFx0dGhpcy5sb2NrVGFiID0gZmFsc2U7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxvY2tUYWIgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRnZXRDc3NTdGF0dXModGFiTnVtYmVyKSB7XHJcblx0XHRpZiAoIWlzTmFOKHBhcnNlRmxvYXQodGFiTnVtYmVyKSkgJiYgaXNGaW5pdGUodGFiTnVtYmVyKSkge1xyXG5cdFx0XHRpZiAodGFiTnVtYmVyID09IHRoaXMuY3VycmVudFRhYikge1xyXG5cdFx0XHRcdHJldHVybiBcInAyRFNob3dUYWJcIlxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBcInAyREhpZGVUYWJcIlxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdC5pbmRleE9mKHRhYk51bWJlcikgPT0gdGhpcy5jdXJyZW50VGFiKSB7XHJcblx0XHRcdFx0cmV0dXJuIFwicDJEU2hvd1RhYlwiXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIFwicDJESGlkZVRhYlwiO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0Z290b1RhYih0YWJJbmRleCkge1xyXG5cdFx0aWYgKGlzU3RyaW5nKHRhYkluZGV4KSkge1xyXG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLnRhYkNyZWF0aW9uLnRhYkxpc3QuaW5kZXhPZih0YWJJbmRleCk7XHJcblx0XHRcdGlmIChpbmRleCA9PSAtMSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJUYWIgbmFtZSBub3QgZm91bmQuXCIpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50VGFiID0gaW5kZXhcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKHRhYkluZGV4ID4gKHRoaXMudGFiQ3JlYXRpb24udGFiTGlzdC5sZW5ndGggLSAxKSkge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJUYWIgaW5kZXggbm90IGZvdW5kLlwiKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY3VycmVudFRhYiA9IHRhYkluZGV4XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19