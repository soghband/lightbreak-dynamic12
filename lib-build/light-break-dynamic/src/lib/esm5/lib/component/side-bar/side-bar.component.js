import { __decorate, __metadata } from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { timer } from 'rxjs';
var SideBarComponent = /** @class */ (function () {
    function SideBarComponent() {
        this.sideBarWidth = 200;
        this.componentWidth = "100vw";
        this.sideBarWidthCal = "200px";
        this.contentWidthCal = "calc(100vw - 200px)";
        this.leftOffset = "0px";
        this.active = true;
        this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
    }
    SideBarComponent.prototype.ngOnInit = function () {
        this.sideBarWidthCal = this.sideBarWidth + "px";
        this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
    };
    SideBarComponent.prototype.toggleSideBar = function () {
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
    };
    SideBarComponent.prototype.reProcessScrollBar = function () {
        var _this = this;
        timer(150).subscribe(function () {
            _this.aNgScrollBar.update();
            timer(10).subscribe(function () {
                _this.fixScrollBar = _this.aNgScrollBar.state.isVerticallyScrollable;
            });
        });
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
    return SideBarComponent;
}());
export { SideBarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvc2lkZS1iYXIvc2lkZS1iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU8zQjtJQVdFO1FBVlMsaUJBQVksR0FBVSxHQUFHLENBQUM7UUFFbkMsbUJBQWMsR0FBVyxPQUFPLENBQUM7UUFDakMsb0JBQWUsR0FBVyxPQUFPLENBQUM7UUFDbEMsb0JBQWUsR0FBVyxxQkFBcUIsQ0FBQztRQUNoRCxlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFFUCxxQkFBZ0IsR0FBRyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBQyxDQUFDO0lBRTdDLENBQUM7SUFFakIsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDckUsQ0FBQztJQUVELHdDQUFhLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUUsS0FBSyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxlQUFlLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7U0FDOUM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsbUJBQW1CLENBQUE7WUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBQ0QsNkNBQWtCLEdBQWxCO1FBQUEsaUJBT0M7UUFOQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUE7WUFDMUIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXJDUTtRQUFSLEtBQUssRUFBRTs7MERBQTJCO0lBQ1g7UUFBdkIsU0FBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBZSxXQUFXOzBEQUFDO0lBRnZDLGdCQUFnQjtRQUw1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QiwwcERBQXdDOztTQUV6QyxDQUFDOztPQUNXLGdCQUFnQixDQXVDNUI7SUFBRCx1QkFBQztDQUFBLEFBdkNELElBdUNDO1NBdkNZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdTY3JvbGxiYXJ9IGZyb20gJ25neC1zY3JvbGxiYXInO1xuaW1wb3J0IHt0aW1lcn0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xiOS1zaWRlLWJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWRlLWJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZGUtYmFyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2lkZUJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNpZGVCYXJXaWR0aDpudW1iZXIgPSAyMDA7XG4gIEBWaWV3Q2hpbGQoTmdTY3JvbGxiYXIpIGFOZ1Njcm9sbEJhcjogTmdTY3JvbGxiYXI7XG4gIGNvbXBvbmVudFdpZHRoOiBzdHJpbmcgPSBcIjEwMHZ3XCI7XG4gIHNpZGVCYXJXaWR0aENhbDogc3RyaW5nID0gXCIyMDBweFwiO1xuICBjb250ZW50V2lkdGhDYWw6IHN0cmluZyA9IFwiY2FsYygxMDB2dyAtIDIwMHB4KVwiO1xuICBsZWZ0T2Zmc2V0OiBzdHJpbmcgPSBcIjBweFwiO1xuICBhY3RpdmUgPSB0cnVlO1xuICBmaXhTY3JvbGxCYXI6IGJvb2xlYW47XG4gIHB1YmxpYyBzY3JvbGxiYXJPcHRpb25zID0ge2F4aXM6ICd5JywgdGhlbWU6ICdtaW5pbWFsLWRhcmsnfTtcbiAgXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zaWRlQmFyV2lkdGhDYWwgPSB0aGlzLnNpZGVCYXJXaWR0aCtcInB4XCI7XG4gICAgdGhpcy5jb250ZW50V2lkdGhDYWwgPSBcImNhbGMoMTAwdncgLSBcIiArIHRoaXMuc2lkZUJhcldpZHRoICsgXCJweClcIjtcbiAgfVxuICBcbiAgdG9nZ2xlU2lkZUJhcigpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUgPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29tcG9uZW50V2lkdGggPSBcImNhbGMoMTAwdncgKyBcIiArIHRoaXMuc2lkZUJhcldpZHRoICtcInB4KVwiO1xuICAgICAgdGhpcy5jb250ZW50V2lkdGhDYWwgPSBcImNhbGMoMTAwdncgLSAwcHgpXCI7XG4gICAgICB0aGlzLmxlZnRPZmZzZXQgPSBcIi1cIit0aGlzLnNpZGVCYXJXaWR0aCtcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29tcG9uZW50V2lkdGggPSBcImNhbGMoMTAwdncgKyAwcHgpXCJcbiAgICAgIHRoaXMuY29udGVudFdpZHRoQ2FsID0gXCJjYWxjKDEwMHZ3IC0gXCIgKyB0aGlzLnNpZGVCYXJXaWR0aCArIFwicHgpXCI7XG4gICAgICB0aGlzLmxlZnRPZmZzZXQgPSBcIjBweFwiO1xuICAgIH1cbiAgfVxuICByZVByb2Nlc3NTY3JvbGxCYXIoKSB7XG4gICAgdGltZXIoMTUwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5hTmdTY3JvbGxCYXIudXBkYXRlKClcbiAgICAgIHRpbWVyKDEwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmZpeFNjcm9sbEJhciA9IHRoaXMuYU5nU2Nyb2xsQmFyLnN0YXRlLmlzVmVydGljYWxseVNjcm9sbGFibGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19