import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var ContentPanelComponent = /** @class */ (function () {
    function ContentPanelComponent() {
        this.panelData = null;
    }
    ContentPanelComponent.prototype.ngOnInit = function () {
        // let htmlHead = document.getElementsByTagName("header")/
        var styleTag = document.createElement("style");
        styleTag.id = "style_" + this.panelData.id;
        styleTag.innerText = this.panelData.css;
        document.head.appendChild(styleTag);
    };
    ContentPanelComponent.prototype.ngOnDestroy = function () {
        var destroyId = document.getElementById("style_" + this.panelData.id);
        destroyId.remove();
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
    return ContentPanelComponent;
}());
export { ContentPanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9jb250ZW50LXBhbmVsL2NvbnRlbnQtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFRbEU7SUFHRTtRQURTLGNBQVMsR0FBYyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVqQix3Q0FBUSxHQUFSO1FBQ0UsMERBQTBEO1FBQzFELElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLEVBQUUsR0FBRyxRQUFRLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUE7UUFDeEMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQTtRQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ0QsMkNBQVcsR0FBWDtRQUNFLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkUsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFiUTtRQUFSLEtBQUssRUFBRTs7NERBQTZCO0lBRjFCLHFCQUFxQjtRQUxqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLHlHQUE2Qzs7U0FFOUMsQ0FBQzs7T0FDVyxxQkFBcUIsQ0FnQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQWhCRCxJQWdCQztTQWhCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGFuZWxEYXRhfSBmcm9tICcuL3BhbmVsLWRhdGEnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsYjktY29udGVudC1wYW5lbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZW50LXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udGVudC1wYW5lbC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudFBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHBhbmVsRGF0YTogUGFuZWxEYXRhID0gbnVsbDtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAvLyBsZXQgaHRtbEhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRlclwiKS9cbiAgICBsZXQgc3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgc3R5bGVUYWcuaWQgPSBcInN0eWxlX1wiK3RoaXMucGFuZWxEYXRhLmlkXG4gICAgc3R5bGVUYWcuaW5uZXJUZXh0ID0gdGhpcy5wYW5lbERhdGEuY3NzXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVRhZylcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBsZXQgZGVzdHJveUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHlsZV9cIit0aGlzLnBhbmVsRGF0YS5pZClcbiAgICBkZXN0cm95SWQucmVtb3ZlKClcbiAgfVxufVxuIl19