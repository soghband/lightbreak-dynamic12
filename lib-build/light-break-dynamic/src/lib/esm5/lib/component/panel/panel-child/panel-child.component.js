import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var PanelChildComponent = /** @class */ (function () {
    function PanelChildComponent() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
        this.margin = true;
    }
    PanelChildComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PanelChildComponent.prototype, "id", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PanelChildComponent.prototype, "showCloseBtn", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PanelChildComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PanelChildComponent.prototype, "margin", void 0);
    PanelChildComponent = __decorate([
        Component({
            selector: 'lb9-panel-child',
            template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
            styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px rgba(0,0,0,.1)}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:1px solid #ddd;border-top:0;padding:10px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:linear-gradient(#fff,#eee)}.panelMargin{margin:5px;width:calc(100% - 10px)}"]
        }),
        __metadata("design:paramtypes", [])
    ], PanelChildComponent);
    return PanelChildComponent;
}());
export { PanelChildComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtY2hpbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvcGFuZWwvcGFuZWwtY2hpbGQvcGFuZWwtY2hpbGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU92RDtJQUtFO1FBSlMsT0FBRSxHQUFHLFlBQVksQ0FBQztRQUNsQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixXQUFNLEdBQUcsWUFBWSxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFDUCxDQUFDO0lBRWpCLHNDQUFRLEdBQVI7SUFDQSxDQUFDO0lBUFE7UUFBUixLQUFLLEVBQUU7O21EQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7NkRBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFOzt1REFBdUI7SUFDdEI7UUFBUixLQUFLLEVBQUU7O3VEQUFlO0lBSlosbUJBQW1CO1FBTC9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IseWJBQTJDOztTQUU1QyxDQUFDOztPQUNXLG1CQUFtQixDQVUvQjtJQUFELDBCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsYjktcGFuZWwtY2hpbGQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYW5lbC1jaGlsZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGFuZWwtY2hpbGQuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxDaGlsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaWQgPSAnbm90LWFzc2lnbic7XHJcbiAgQElucHV0KCkgc2hvd0Nsb3NlQnRuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGVhZGVyID0gJ25vdC1hc3NpZ24nO1xyXG4gIEBJbnB1dCgpIG1hcmdpbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=