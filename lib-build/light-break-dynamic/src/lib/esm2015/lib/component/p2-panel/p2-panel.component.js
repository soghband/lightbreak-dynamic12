import { Component, Input } from '@angular/core';
export class P2PanelComponent {
    constructor() {
        this.id = 'not-assign';
        this.showCloseBtn = false;
        this.header = 'not-assign';
    }
    ngOnInit() {
    }
}
P2PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-p2-panel',
                template: "<div id=\"{{id}}\" class=\"mainPanel\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                styles: [".mainPanel{width:calc(100% - 30px);margin:15px;position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px #0000001a}.mainPanel .panelAlign .header{color:#fff;font-size:22px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:hand;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:solid 1px #DDD;border-top:0px;padding:15px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:linear-gradient(#FFF,#EEE)}\n"]
            },] }
];
P2PanelComponent.ctorParameters = () => [];
P2PanelComponent.propDecorators = {
    id: [{ type: Input }],
    showCloseBtn: [{ type: Input }],
    header: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicDItcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9wMi1wYW5lbC9wMi1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFPdkQsTUFBTSxPQUFPLGdCQUFnQjtJQUkzQjtRQUhTLE9BQUUsR0FBRyxZQUFZLENBQUM7UUFDbEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLFlBQVksQ0FBQztJQUNmLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIseVpBQXdDOzthQUV6Qzs7OztpQkFFRSxLQUFLOzJCQUNMLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGI5LXAyLXBhbmVsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcDItcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3AyLXBhbmVsLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUDJQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaWQgPSAnbm90LWFzc2lnbic7XHJcbiAgQElucHV0KCkgc2hvd0Nsb3NlQnRuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGVhZGVyID0gJ25vdC1hc3NpZ24nO1xyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIl19