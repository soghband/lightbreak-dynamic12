import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FadeInOutAnimation } from './animetion';
import { timer } from 'rxjs';
export class ContentPopupComponent {
    constructor() {
        this.header = "header";
        this.footer = "";
        this.elementName = 'default';
        this.closeByButtonOnly = false;
        this.customClass = null;
        this.noScroll = false;
        this.callBack = new EventEmitter();
        this.display = false;
        this.overContent = false;
        this.animationState = 'out';
        this.onAnimation = false;
        this.closeDelay = timer(400);
    }
    ngOnInit() {
    }
    closePopup(forceClose = false) {
        if (((!this.overContent && !this.closeByButtonOnly) || forceClose) && !this.onAnimation) {
            this.animationState = 'out';
            this.display = false;
            this.callbackProcess('close');
        }
    }
    showPopup() {
        this.animationState = 'in';
        this.display = true;
        this.callbackProcess('open');
        this.onAnimation = true;
        this.closeDelay.subscribe(() => {
            this.onAnimation = false;
        });
    }
    releaseContent() {
        this.overContent = true;
    }
    lockContent() {
        this.overContent = false;
    }
    callbackProcess(action) {
        this.callBack.emit({
            element: "popUp",
            name: this.elementName,
            action: action,
        });
    }
}
ContentPopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-content-popup',
                template: "<div class=\"lb9-dim\" [@fadeInOut]=\"animationState\" (click)=\"closePopup()\">\n    <div class=\"popupPanel\">\n        <div class=\"popupAlign\">\n            <div class=\"popupContentTable\">\n                <div class=\"popupContentRow\">\n                    <div class=\"popupContentCell\">\n                        <div class=\"popupContent{{customClass ? ' '+customClass: ''}}\" (mouseover)=\"releaseContent()\" (mouseout)=\"lockContent()\">\n                            <div class=\"closeBtn\">\n                                <abbr title=\"Close\">\n                                    <span class=\"glyphicon glyphicon-remove\" (click)=\"closePopup(true)\"></span>\n                                </abbr>\n                            </div>\n                            <div *ngIf=\"header.length > 0\" class=\"popupHeader\" [innerHTML]=\"header\">\n                            </div>\n                            <div class=\"popupContentDetail{{noScroll ? ' noScroll':' scroll'}}\">\n                                <ng-content>\n                                </ng-content>\n                            </div>\n                            <div *ngIf=\"footer.length > 0\" class=\"popupFooter\" [innerHTML]=\"footer\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                animations: [FadeInOutAnimation],
                styles: [".lb9-dim{width:100vw;height:100vh;position:fixed;top:0px;left:0px;background:rgba(0,0,0,.2);z-index:99}.show{display:block}.hide{display:none}.popupPanel{max-width:95vw;max-height:95vh;margin:2.5vh auto;height:95vh}.popupPanel .popupAlign .popupContentTable{display:table;margin:0 auto}.popupPanel .popupAlign .popupContentTable .popupContentRow{display:table-row}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell{display:table-cell;vertical-align:middle;height:95vh;max-height:95vh}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent{position:relative}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent .closeBtn{cursor:pointer}\n"]
            },] }
];
ContentPopupComponent.ctorParameters = () => [];
ContentPopupComponent.propDecorators = {
    header: [{ type: Input }],
    footer: [{ type: Input }],
    elementName: [{ type: Input }],
    closeByButtonOnly: [{ type: Input }],
    customClass: [{ type: Input }],
    noScroll: [{ type: Input }],
    callBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wb3B1cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2NvbnRlbnQtcG9wdXAvY29udGVudC1wb3B1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDL0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVM3QixNQUFNLE9BQU8scUJBQXFCO0lBYWhDO1FBWlMsV0FBTSxHQUFDLFFBQVEsQ0FBQztRQUNoQixXQUFNLEdBQUMsRUFBRSxDQUFDO1FBQ1YsZ0JBQVcsR0FBRyxTQUFTLENBQUM7UUFDeEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDaEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixlQUFVLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQztJQUVELFVBQVUsQ0FBQyxVQUFVLEdBQUcsS0FBSztRQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkYsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFDRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNELGVBQWUsQ0FBQyxNQUFNO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztZQUN0QixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXJERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsazVDQUE2QztnQkFFN0MsVUFBVSxFQUFFLENBQUMsa0JBQWtCLENBQUM7O2FBQ2pDOzs7O3FCQUVFLEtBQUs7cUJBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGYWRlSW5PdXRBbmltYXRpb259IGZyb20gJy4vYW5pbWV0aW9uJztcbmltcG9ydCB7IHRpbWVyIH0gZnJvbSAncnhqcyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGI5LWNvbnRlbnQtcG9wdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGVudC1wb3B1cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbnRlbnQtcG9wdXAuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW0ZhZGVJbk91dEFuaW1hdGlvbl1cbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaGVhZGVyPVwiaGVhZGVyXCI7XG4gIEBJbnB1dCgpIGZvb3Rlcj1cIlwiO1xuICBASW5wdXQoKSBlbGVtZW50TmFtZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgY2xvc2VCeUJ1dHRvbk9ubHkgPSBmYWxzZTtcbiAgQElucHV0KCkgY3VzdG9tQ2xhc3MgPSBudWxsO1xuICBASW5wdXQoKSBub1Njcm9sbCA9IGZhbHNlO1xuICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGRpc3BsYXkgPSBmYWxzZTtcbiAgb3ZlckNvbnRlbnQgPSBmYWxzZTtcbiAgYW5pbWF0aW9uU3RhdGUgPSAnb3V0JztcbiAgb25BbmltYXRpb24gPSBmYWxzZTtcbiAgY2xvc2VEZWxheSA9IHRpbWVyKDQwMCk7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cbiAgXG4gIGNsb3NlUG9wdXAoZm9yY2VDbG9zZSA9IGZhbHNlKSB7XG4gICAgaWYgKCgoIXRoaXMub3ZlckNvbnRlbnQgJiYgIXRoaXMuY2xvc2VCeUJ1dHRvbk9ubHkpIHx8IGZvcmNlQ2xvc2UpICYmICF0aGlzLm9uQW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ291dCc7XG4gICAgICB0aGlzLmRpc3BsYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2FsbGJhY2tQcm9jZXNzKCdjbG9zZScpO1xuICAgIH1cbiAgfVxuICBzaG93UG9wdXAoKSB7XG4gICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdpbic7XG4gICAgdGhpcy5kaXNwbGF5ID0gdHJ1ZTtcbiAgICB0aGlzLmNhbGxiYWNrUHJvY2Vzcygnb3BlbicpO1xuICAgIHRoaXMub25BbmltYXRpb24gPSB0cnVlO1xuICAgIHRoaXMuY2xvc2VEZWxheS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5vbkFuaW1hdGlvbiA9IGZhbHNlO1xuICAgIH0pXG4gIH1cbiAgXG4gIHJlbGVhc2VDb250ZW50KCkge1xuICAgIHRoaXMub3ZlckNvbnRlbnQgPSB0cnVlO1xuICB9XG4gIGxvY2tDb250ZW50KCkge1xuICAgIHRoaXMub3ZlckNvbnRlbnQgPSBmYWxzZTtcbiAgfVxuICBjYWxsYmFja1Byb2Nlc3MoYWN0aW9uKSB7XG4gICAgdGhpcy5jYWxsQmFjay5lbWl0KHtcbiAgICAgIGVsZW1lbnQ6IFwicG9wVXBcIixcbiAgICAgIG5hbWU6IHRoaXMuZWxlbWVudE5hbWUsXG4gICAgICBhY3Rpb246IGFjdGlvbixcbiAgICB9KTtcbiAgfVxufVxuIl19