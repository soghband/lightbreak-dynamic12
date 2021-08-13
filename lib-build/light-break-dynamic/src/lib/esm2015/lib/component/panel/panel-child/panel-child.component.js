import { Component, Input } from '@angular/core';
export class PanelChildComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
        this.margin = true;
    }
    ngOnInit() {
    }
}
PanelChildComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-panel-child',
                template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px #0000001a}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:hand;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:solid 1px #DDD;border-top:0px;padding:10px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:linear-gradient(#FFF,#EEE)}.panelMargin{margin:5px;width:calc(100% - 10px)}\n"]
            },] }
];
PanelChildComponent.ctorParameters = () => [];
PanelChildComponent.propDecorators = {
    id: [{ type: Input }],
    showCloseBtn: [{ type: Input }],
    header: [{ type: Input }],
    margin: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtY2hpbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9wYW5lbC9wYW5lbC1jaGlsZC9wYW5lbC1jaGlsZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFPdkQsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QjtRQUpTLE9BQUUsR0FBRyxZQUFZLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLFlBQVksQ0FBQztRQUN0QixXQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ1AsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHliQUEyQzs7YUFFNUM7Ozs7aUJBRUUsS0FBSzsyQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGI5LXBhbmVsLWNoaWxkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcGFuZWwtY2hpbGQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3BhbmVsLWNoaWxkLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhbmVsQ2hpbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGlkID0gJ25vdC1hc3NpZ24nO1xyXG4gIEBJbnB1dCgpIHNob3dDbG9zZUJ0biA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhlYWRlciA9ICdub3QtYXNzaWduJztcclxuICBASW5wdXQoKSBtYXJnaW4gPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19