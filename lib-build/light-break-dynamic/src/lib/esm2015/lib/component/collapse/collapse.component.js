import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SlideInOutAnimation } from './animetion';
import { timer } from 'rxjs';
export class CollapseComponent {
    constructor() {
        this.header = 'Collapse';
        this.callBack = new EventEmitter();
        this.animationState = 'out';
        this.active = false;
        this.onAction = false;
        this.timeDelay = timer(1000);
    }
    ngOnInit() {
    }
    toggleShowDiv() {
        if (this.onAction === false) {
            if (this.animationState === 'out') {
                this.animationState = 'in';
                this.active = true;
            }
            else {
                this.animationState = 'out';
                this.active = false;
            }
            this.onAction = true;
            this.timeDelay.subscribe(() => {
                this.onAction = false;
            });
        }
    }
}
CollapseComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-collapse',
                template: "<div class=\"lbCollapse\">\n    <div class=\"collapseHeaderPanel{{active ? ' active':''}}\" (click)=\"toggleShowDiv()\">\n        <div class=\"collapseHeader\" [innerHTML]=\"header\">\n\n        </div>\n        <div class=\"collapseArrow\"></div>\n    </div>\n    <div class=\"collapseContent\" [@slideInOut]=\"animationState\">\n        <ng-content>\n\n        </ng-content>\n    </div>\n</div>\n",
                animations: [SlideInOutAnimation],
                styles: [".lbCollapse{margin-top:10px}.lbCollapse .collapseHeaderPanel{position:relative}.lbCollapse .collapseHeaderPanel .collapseArrow{position:absolute;right:0px;top:0px;width:10px;height:10px;border-top:4px solid #666;border-right:4px solid #666;transform:rotate(135deg);transition:all .5s}.lbCollapse .active .collapseArrow{transform:rotate(-45deg);transition:all .5s}.lbCollapse .collapseContent{width:100%;overflow:auto}\n"]
            },] }
];
CollapseComponent.ctorParameters = () => [];
CollapseComponent.propDecorators = {
    header: [{ type: Input }],
    callBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9jb2xsYXBzZS9jb2xsYXBzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQVEzQixNQUFNLE9BQU8saUJBQWlCO0lBVTdCO1FBVFMsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQUNuQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixjQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBR3hCLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNuQjtpQkFBTTtnQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDcEI7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1NBQ0Y7SUFDRixDQUFDOzs7WUFwQ0QsU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxjQUFjO2dCQUN4Qix5WkFBd0M7Z0JBRXhDLFVBQVUsRUFBRSxDQUFDLG1CQUFtQixDQUFDOzthQUNqQzs7OztxQkFFQyxLQUFLO3VCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTbGlkZUluT3V0QW5pbWF0aW9ufSBmcm9tICcuL2FuaW1ldGlvbic7XG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbGI5LWNvbGxhcHNlJyxcblx0dGVtcGxhdGVVcmw6ICcuL2NvbGxhcHNlLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vY29sbGFwc2UuY29tcG9uZW50LnNjc3MnXSxcblx0YW5pbWF0aW9uczogW1NsaWRlSW5PdXRBbmltYXRpb25dXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QElucHV0KCkgaGVhZGVyID0gJ0NvbGxhcHNlJztcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXHRcblx0YW5pbWF0aW9uU3RhdGUgPSAnb3V0Jztcblx0YWN0aXZlID0gZmFsc2U7XG5cdG9uQWN0aW9uID0gZmFsc2U7XG5cdFxuXHR0aW1lRGVsYXkgPSB0aW1lcigxMDAwKTtcblx0XG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cdFxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXHRcblx0dG9nZ2xlU2hvd0RpdigpIHtcblx0XHRpZiAodGhpcy5vbkFjdGlvbiA9PT0gZmFsc2UpIHtcblx0XHRcdGlmICh0aGlzLmFuaW1hdGlvblN0YXRlID09PSAnb3V0Jykge1xuXHRcdFx0XHR0aGlzLmFuaW1hdGlvblN0YXRlID0gJ2luJztcblx0XHRcdFx0dGhpcy5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xuXHRcdFx0XHR0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5vbkFjdGlvbiA9IHRydWU7XG5cdFx0XHR0aGlzLnRpbWVEZWxheS5zdWJzY3JpYmUoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9uQWN0aW9uID0gZmFsc2U7XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxufVxuIl19