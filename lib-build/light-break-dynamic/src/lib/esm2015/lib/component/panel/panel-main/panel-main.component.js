import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let PanelMainComponent = class PanelMainComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
        this.margin = false;
    }
    ngOnInit() {
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "id", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "showCloseBtn", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "header", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], PanelMainComponent.prototype, "margin", void 0);
PanelMainComponent = __decorate([
    Component({
        selector: 'lb9-panel-main',
        template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
        styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px rgba(0,0,0,.1)}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:1px solid #ddd;border-top:0;padding:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:linear-gradient(#fff,#eee)}.panelMargin{margin:15px;width:calc(100% - 30px)}"]
    }),
    __metadata("design:paramtypes", [])
], PanelMainComponent);
export { PanelMainComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtbWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9wYW5lbC9wYW5lbC1tYWluL3BhbmVsLW1haW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU92RCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUs3QjtRQUpTLE9BQUUsR0FBRyxZQUFZLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLFlBQVksQ0FBQztRQUN0QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1IsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQztDQUVGLENBQUE7QUFUVTtJQUFSLEtBQUssRUFBRTs7OENBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFOzt3REFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7O2tEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7a0RBQWdCO0FBSmIsa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIseWJBQTBDOztLQUUzQyxDQUFDOztHQUNXLGtCQUFrQixDQVU5QjtTQVZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGI5LXBhbmVsLW1haW4nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYW5lbC1tYWluLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wYW5lbC1tYWluLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhbmVsTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaWQgPSAnbm90LWFzc2lnbic7XHJcbiAgQElucHV0KCkgc2hvd0Nsb3NlQnRuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGVhZGVyID0gJ25vdC1hc3NpZ24nO1xyXG4gIEBJbnB1dCgpIG1hcmdpbiA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19