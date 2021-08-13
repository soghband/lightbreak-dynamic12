import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { timer } from 'rxjs';
let SideBarComponent = class SideBarComponent {
    constructor() {
        this.sideBarWidth = 200;
        this.componentWidth = "100vw";
        this.sideBarWidthCal = "200px";
        this.contentWidthCal = "calc(100vw - 200px)";
        this.leftOffset = "0px";
        this.active = true;
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
    }
    ngOnInit() {
        this.sideBarWidthCal = this.sideBarWidth + "px";
        this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
    }
    toggleSideBar() {
        if (this.active == true) {
            this.active = false;
            this.componentWidth = "calc(100vw + " + this.sideBarWidth + "px)";
            this.contentWidthCal = "calc(100vw - 0px)";
            this.leftOffset = "-" + this.sideBarWidth + "px";
        }
        else {
            this.active = true;
            this.componentWidth = "calc(100vw + 0px)";
            this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
            this.leftOffset = "0px";
        }
    }
    reProcessScrollBar() {
        timer(150).subscribe(() => {
            this.aNgScrollBar.update();
            timer(10).subscribe(() => {
                this.fixScrollBar = this.aNgScrollBar.state.isVerticallyScrollable;
            });
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], SideBarComponent.prototype, "sideBarWidth", void 0);
__decorate([
    ViewChild(NgScrollbar),
    __metadata("design:type", NgScrollbar)
], SideBarComponent.prototype, "aNgScrollBar", void 0);
SideBarComponent = __decorate([
    Component({
        selector: 'lb9-side-bar',
        template: "<div class=\"sbPanel\">\n    <div class=\"sbAlign\">\n        <div class=\"sbContent\">\n            <div class=\"topBar\">\n                <div class=\"expandIcon\" (click)=\"toggleSideBar()\"><span class=\"glyphicon glyphicon-menu-hamburger\"></span>\n                </div>\n                <div class=\"detailBar\">\n                    <ng-content select=\"[topBar]\"></ng-content>\n                </div>\n            </div>\n            <div class=\"contentBody\">\n                <div class=\"contentOffset\" [ngStyle]=\"{width: componentWidth, left: leftOffset}\">\n                    <div class=\"contentPanel\">\n                        <div class=\"leftSide\" [ngStyle]=\"{width: sideBarWidthCal}\">\n                            <ng-scrollbar class=\"fixHeight\">\n                                <div class=\"scrollHeight {{fixScrollBar ? 'fix-ng-scrollbar' : ''}}\" (click)=\"reProcessScrollBar()\">\n                                    <ng-content select=\"[sideBar]\"></ng-content>\n                                </div>\n                            </ng-scrollbar>\n                        </div>\n                        <div class=\"contentAll\" [ngStyle]=\"{width: contentWidthCal}\">\n                            <div class=\"contentBody\">\n                                <div class=\"blockContentSize\" [ngStyle]=\"{width: contentWidthCal}\">\n                                    <ng-content select=\"[contentBody]\"></ng-content>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n",
        styles: [".sbPanel{display:block;max-height:100vh;overflow:hidden}.sbPanel .sbAlign{position:relative;height:100vh;-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent{width:100vw;-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent .topBar{position:relative;height:40px;display:table;width:100%}.sbPanel .sbAlign .sbContent .topBar .expandIcon{color:#3a3a3a;line-height:40px;font-size:22px;padding:0 10px;display:table-cell;vertical-align:top;width:40px;text-align:center}.sbPanel .sbAlign .sbContent .topBar .detailBar{display:table-cell}.sbPanel .sbAlign .sbContent .contentBody{position:relative}.sbPanel .sbAlign .sbContent .contentBody .contentOffset{position:absolute;-webkit-transition:.5s;transition:.5s;max-height:calc(100vh - 40px);overflow:hidden}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel{display:table-row}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide{display:table-cell;vertical-align:top}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide .fixHeight{position:relative;max-height:calc(100vh - 40px);overflow:auto}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide .fixHeight .scrollHeight{min-height:calc(100vh - 40px);-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .contentAll{display:table-cell;overflow:hidden;-webkit-transition:.5s;transition:.5s}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .contentAll .blockContentSize{-webkit-transition:.5s;transition:.5s;height:calc(100vh - 40px);overflow:auto}"]
    }),
    __metadata("design:paramtypes", [])
], SideBarComponent);
export { SideBarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc2lkZS1iYXIvc2lkZS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU8zQixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQVczQjtRQVZTLGlCQUFZLEdBQVUsR0FBRyxDQUFDO1FBRW5DLG1CQUFjLEdBQVcsT0FBTyxDQUFDO1FBQ2pDLG9CQUFlLEdBQVcsT0FBTyxDQUFDO1FBQ2xDLG9CQUFlLEdBQVcscUJBQXFCLENBQUM7UUFDaEQsZUFBVSxHQUFXLEtBQUssQ0FBQztRQUMzQixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBRVAscUJBQWdCLEdBQUcsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUMsQ0FBQztJQUU3QyxDQUFDO0lBRWpCLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1FBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFFLEtBQUssQ0FBQztZQUNqRSxJQUFJLENBQUMsZUFBZSxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFDLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFBO1lBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ25FLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFBO1lBQzFCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXRDVTtJQUFSLEtBQUssRUFBRTs7c0RBQTJCO0FBQ1g7SUFBdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQzs4QkFBZSxXQUFXO3NEQUFDO0FBRnZDLGdCQUFnQjtJQUw1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QiwwcERBQXdDOztLQUV6QyxDQUFDOztHQUNXLGdCQUFnQixDQXVDNUI7U0F2Q1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ1Njcm9sbGJhcn0gZnJvbSAnbmd4LXNjcm9sbGJhcic7XG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGI5LXNpZGUtYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpZGUtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lkZS1iYXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlQmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc2lkZUJhcldpZHRoOm51bWJlciA9IDIwMDtcbiAgQFZpZXdDaGlsZChOZ1Njcm9sbGJhcikgYU5nU2Nyb2xsQmFyOiBOZ1Njcm9sbGJhcjtcbiAgY29tcG9uZW50V2lkdGg6IHN0cmluZyA9IFwiMTAwdndcIjtcbiAgc2lkZUJhcldpZHRoQ2FsOiBzdHJpbmcgPSBcIjIwMHB4XCI7XG4gIGNvbnRlbnRXaWR0aENhbDogc3RyaW5nID0gXCJjYWxjKDEwMHZ3IC0gMjAwcHgpXCI7XG4gIGxlZnRPZmZzZXQ6IHN0cmluZyA9IFwiMHB4XCI7XG4gIGFjdGl2ZSA9IHRydWU7XG4gIGZpeFNjcm9sbEJhcjogYm9vbGVhbjtcbiAgcHVibGljIHNjcm9sbGJhck9wdGlvbnMgPSB7YXhpczogJ3knLCB0aGVtZTogJ21pbmltYWwtZGFyayd9O1xuICBcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNpZGVCYXJXaWR0aENhbCA9IHRoaXMuc2lkZUJhcldpZHRoK1wicHhcIjtcbiAgICB0aGlzLmNvbnRlbnRXaWR0aENhbCA9IFwiY2FsYygxMDB2dyAtIFwiICsgdGhpcy5zaWRlQmFyV2lkdGggKyBcInB4KVwiO1xuICB9XG4gIFxuICB0b2dnbGVTaWRlQmFyKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZSA9PSB0cnVlKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5jb21wb25lbnRXaWR0aCA9IFwiY2FsYygxMDB2dyArIFwiICsgdGhpcy5zaWRlQmFyV2lkdGggK1wicHgpXCI7XG4gICAgICB0aGlzLmNvbnRlbnRXaWR0aENhbCA9IFwiY2FsYygxMDB2dyAtIDBweClcIjtcbiAgICAgIHRoaXMubGVmdE9mZnNldCA9IFwiLVwiK3RoaXMuc2lkZUJhcldpZHRoK1wicHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5jb21wb25lbnRXaWR0aCA9IFwiY2FsYygxMDB2dyArIDBweClcIlxuICAgICAgdGhpcy5jb250ZW50V2lkdGhDYWwgPSBcImNhbGMoMTAwdncgLSBcIiArIHRoaXMuc2lkZUJhcldpZHRoICsgXCJweClcIjtcbiAgICAgIHRoaXMubGVmdE9mZnNldCA9IFwiMHB4XCI7XG4gICAgfVxuICB9XG4gIHJlUHJvY2Vzc1Njcm9sbEJhcigpIHtcbiAgICB0aW1lcigxNTApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmFOZ1Njcm9sbEJhci51cGRhdGUoKVxuICAgICAgdGltZXIoMTApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZml4U2Nyb2xsQmFyID0gdGhpcy5hTmdTY3JvbGxCYXIuc3RhdGUuaXNWZXJ0aWNhbGx5U2Nyb2xsYWJsZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=