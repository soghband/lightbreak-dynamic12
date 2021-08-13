import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let ContentPanelComponent = class ContentPanelComponent {
    constructor() {
        this.panelData = null;
    }
    ngOnInit() {
        // let htmlHead = document.getElementsByTagName("header")/
        let styleTag = document.createElement("style");
        styleTag.id = "style_" + this.panelData.id;
        styleTag.innerText = this.panelData.css;
        document.head.appendChild(styleTag);
    }
    ngOnDestroy() {
        let destroyId = document.getElementById("style_" + this.panelData.id);
        destroyId.remove();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], ContentPanelComponent.prototype, "panelData", void 0);
ContentPanelComponent = __decorate([
    Component({
        selector: 'lb9-content-panel',
        template: "<div id=\"{{panelData.id}}\">\n    <div [innerHTML]=\"panelData.html\">\n    </div>\n</div>\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], ContentPanelComponent);
export { ContentPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9jb250ZW50LXBhbmVsL2NvbnRlbnQtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFRbEUsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFHaEM7UUFEUyxjQUFTLEdBQWMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFakIsUUFBUTtRQUNOLDBEQUEwRDtRQUMxRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO1FBQ3hDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUE7UUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0NBQ0YsQ0FBQTtBQWRVO0lBQVIsS0FBSyxFQUFFOzt3REFBNkI7QUFGMUIscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IseUdBQTZDOztLQUU5QyxDQUFDOztHQUNXLHFCQUFxQixDQWdCakM7U0FoQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BhbmVsRGF0YX0gZnJvbSAnLi9wYW5lbC1kYXRhJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGI5LWNvbnRlbnQtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGVudC1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbnRlbnQtcGFuZWwuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBwYW5lbERhdGE6IFBhbmVsRGF0YSA9IG51bGw7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gbGV0IGh0bWxIZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkZXJcIikvXG4gICAgbGV0IHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlVGFnLmlkID0gXCJzdHlsZV9cIit0aGlzLnBhbmVsRGF0YS5pZFxuICAgIHN0eWxlVGFnLmlubmVyVGV4dCA9IHRoaXMucGFuZWxEYXRhLmNzc1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpXG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgbGV0IGRlc3Ryb3lJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3R5bGVfXCIrdGhpcy5wYW5lbERhdGEuaWQpXG4gICAgZGVzdHJveUlkLnJlbW92ZSgpXG4gIH1cbn1cbiJdfQ==