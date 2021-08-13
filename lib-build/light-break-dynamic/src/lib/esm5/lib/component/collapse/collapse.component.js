import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SlideInOutAnimation } from './animetion';
import { timer } from 'rxjs';
var CollapseComponent = /** @class */ (function () {
    function CollapseComponent() {
        this.header = 'Collapse';
        this.callBack = new EventEmitter();
        this.animationState = 'out';
        this.active = false;
        this.onAction = false;
        this.timeDelay = timer(1000);
    }
    CollapseComponent.prototype.ngOnInit = function () {
    };
    CollapseComponent.prototype.toggleShowDiv = function () {
        var _this = this;
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
            this.timeDelay.subscribe(function () {
                _this.onAction = false;
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CollapseComponent.prototype, "header", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CollapseComponent.prototype, "callBack", void 0);
    CollapseComponent = __decorate([
        Component({
            selector: 'lb9-collapse',
            template: "<div class=\"lbCollapse\">\n    <div class=\"collapseHeaderPanel{{active ? ' active':''}}\" (click)=\"toggleShowDiv()\">\n        <div class=\"collapseHeader\" [innerHTML]=\"header\">\n\n        </div>\n        <div class=\"collapseArrow\"></div>\n    </div>\n    <div class=\"collapseContent\" [@slideInOut]=\"animationState\">\n        <ng-content>\n\n        </ng-content>\n    </div>\n</div>\n",
            animations: [SlideInOutAnimation],
            styles: [".lbCollapse{margin-top:10px}.lbCollapse .collapseHeaderPanel{position:relative}.lbCollapse .collapseHeaderPanel .collapseArrow{position:absolute;right:0;top:0;width:10px;height:10px;border-top:4px solid #666;border-right:4px solid #666;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-transition:.5s;transition:.5s}.lbCollapse .active .collapseArrow{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition:.5s;transition:.5s}.lbCollapse .collapseContent{width:100%;overflow:auto}"]
        }),
        __metadata("design:paramtypes", [])
    ], CollapseComponent);
    return CollapseComponent;
}());
export { CollapseComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvY29sbGFwc2UvY29sbGFwc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBUTNCO0lBVUM7UUFUUyxXQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ25CLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFHeEIsQ0FBQztJQUVELG9DQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUFBLGlCQWNDO1FBYkEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssS0FBSyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDbkI7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFBO1NBQ0Y7SUFDRixDQUFDO0lBN0JRO1FBQVIsS0FBSyxFQUFFOztxREFBcUI7SUFDbkI7UUFBVCxNQUFNLEVBQUU7O3VEQUErQjtJQUY1QixpQkFBaUI7UUFON0IsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGNBQWM7WUFDeEIseVpBQXdDO1lBRXhDLFVBQVUsRUFBRSxDQUFDLG1CQUFtQixDQUFDOztTQUNqQyxDQUFDOztPQUNXLGlCQUFpQixDQStCN0I7SUFBRCx3QkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NsaWRlSW5PdXRBbmltYXRpb259IGZyb20gJy4vYW5pbWV0aW9uJztcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdsYjktY29sbGFwc2UnLFxuXHR0ZW1wbGF0ZVVybDogJy4vY29sbGFwc2UuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9jb2xsYXBzZS5jb21wb25lbnQuc2NzcyddLFxuXHRhbmltYXRpb25zOiBbU2xpZGVJbk91dEFuaW1hdGlvbl1cbn0pXG5leHBvcnQgY2xhc3MgQ29sbGFwc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRASW5wdXQoKSBoZWFkZXIgPSAnQ29sbGFwc2UnO1xuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cdFxuXHRhbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xuXHRhY3RpdmUgPSBmYWxzZTtcblx0b25BY3Rpb24gPSBmYWxzZTtcblx0XG5cdHRpbWVEZWxheSA9IHRpbWVyKDEwMDApO1xuXHRcblx0Y29uc3RydWN0b3IoKSB7XG5cdH1cblx0XG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHR9XG5cdFxuXHR0b2dnbGVTaG93RGl2KCkge1xuXHRcdGlmICh0aGlzLm9uQWN0aW9uID09PSBmYWxzZSkge1xuXHRcdFx0aWYgKHRoaXMuYW5pbWF0aW9uU3RhdGUgPT09ICdvdXQnKSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnaW4nO1xuXHRcdFx0XHR0aGlzLmFjdGl2ZSA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFuaW1hdGlvblN0YXRlID0gJ291dCc7XG5cdFx0XHRcdHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLm9uQWN0aW9uID0gdHJ1ZTtcblx0XHRcdHRoaXMudGltZURlbGF5LnN1YnNjcmliZSgoKSA9PiB7XG5cdFx0XHRcdHRoaXMub25BY3Rpb24gPSBmYWxzZTtcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG59XG4iXX0=