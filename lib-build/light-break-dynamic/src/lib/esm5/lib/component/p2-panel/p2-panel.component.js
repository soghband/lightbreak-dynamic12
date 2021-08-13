import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var P2PanelComponent = /** @class */ (function () {
    function P2PanelComponent() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
    }
    P2PanelComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], P2PanelComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], P2PanelComponent.prototype, "showCloseBtn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], P2PanelComponent.prototype, "header", void 0);
    P2PanelComponent = __decorate([
        Component({
            selector: 'lb9-p2-panel',
            template: "<div id=\"{{id}}\" class=\"mainPanel\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
            styles: [".mainPanel{width:calc(100% - 30px);margin:15px;position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px rgba(0,0,0,.1)}.mainPanel .panelAlign .header{color:#fff;font-size:22px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:1px solid #ddd;border-top:0;padding:15px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:linear-gradient(#fff,#eee)}"]
        }),
        __metadata("design:paramtypes", [])
    ], P2PanelComponent);
    return P2PanelComponent;
}());
export { P2PanelComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicDItcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvcDItcGFuZWwvcDItcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU92RDtJQUlFO1FBSFMsT0FBRSxHQUFHLFlBQVksQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixXQUFNLEdBQUcsWUFBWSxDQUFDO0lBQ2YsQ0FBQztJQUVqQixtQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQU5RO1FBQVIsS0FBSyxFQUFFOztnREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OzBEQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTs7b0RBQXVCO0lBSHBCLGdCQUFnQjtRQUw1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4Qix5WkFBd0M7O1NBRXpDLENBQUM7O09BQ1csZ0JBQWdCLENBUzVCO0lBQUQsdUJBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xiOS1wMi1wYW5lbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3AyLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wMi1wYW5lbC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFAyUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGlkID0gJ25vdC1hc3NpZ24nO1xyXG4gIEBJbnB1dCgpIHNob3dDbG9zZUJ0biA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhlYWRlciA9ICdub3QtYXNzaWduJztcclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==