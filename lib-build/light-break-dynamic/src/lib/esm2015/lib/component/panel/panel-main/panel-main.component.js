import { Component, Input } from '@angular/core';
export class PanelMainComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
        this.margin = false;
    }
    ngOnInit() {
    }
}
PanelMainComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-panel-main',
                template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px #0000001a}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:hand;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:solid 1px #DDD;border-top:0px;padding:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:linear-gradient(#FFF,#EEE)}.panelMargin{margin:15px;width:calc(100% - 30px)}\n"]
            },] }
];
PanelMainComponent.ctorParameters = () => [];
PanelMainComponent.propDecorators = {
    id: [{ type: Input }],
    showCloseBtn: [{ type: Input }],
    header: [{ type: Input }],
    margin: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtbWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L3BhbmVsL3BhbmVsLW1haW4vcGFuZWwtbWFpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFPdkQsTUFBTSxPQUFPLGtCQUFrQjtJQUs3QjtRQUpTLE9BQUUsR0FBRyxZQUFZLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLFlBQVksQ0FBQztRQUN0QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ1IsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLHliQUEwQzs7YUFFM0M7Ozs7aUJBRUUsS0FBSzsyQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGI5LXBhbmVsLW1haW4nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYW5lbC1tYWluLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wYW5lbC1tYWluLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhbmVsTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaWQgPSAnbm90LWFzc2lnbic7XHJcbiAgQElucHV0KCkgc2hvd0Nsb3NlQnRuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGVhZGVyID0gJ25vdC1hc3NpZ24nO1xyXG4gIEBJbnB1dCgpIG1hcmdpbiA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19