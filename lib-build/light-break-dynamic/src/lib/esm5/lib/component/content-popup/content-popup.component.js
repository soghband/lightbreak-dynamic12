import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FadeInOutAnimation } from './animetion';
import { timer } from 'rxjs';
var ContentPopupComponent = /** @class */ (function () {
    function ContentPopupComponent() {
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
    ContentPopupComponent.prototype.ngOnInit = function () {
    };
    ContentPopupComponent.prototype.closePopup = function (forceClose) {
        if (forceClose === void 0) { forceClose = false; }
        if (((!this.overContent && !this.closeByButtonOnly) || forceClose) && !this.onAnimation) {
            this.animationState = 'out';
            this.display = false;
            this.callbackProcess('close');
        }
    };
    ContentPopupComponent.prototype.showPopup = function () {
        var _this = this;
        this.animationState = 'in';
        this.display = true;
        this.callbackProcess('open');
        this.onAnimation = true;
        this.closeDelay.subscribe(function () {
            _this.onAnimation = false;
        });
    };
    ContentPopupComponent.prototype.releaseContent = function () {
        this.overContent = true;
    };
    ContentPopupComponent.prototype.lockContent = function () {
        this.overContent = false;
    };
    ContentPopupComponent.prototype.callbackProcess = function (action) {
        this.callBack.emit({
            element: "popUp",
            name: this.elementName,
            action: action,
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "footer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "elementName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "closeByButtonOnly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "customClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "noScroll", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ContentPopupComponent.prototype, "callBack", void 0);
    ContentPopupComponent = __decorate([
        Component({
            selector: 'lb9-content-popup',
            template: "<div class=\"lb9-dim\" [@fadeInOut]=\"animationState\" (click)=\"closePopup()\">\n    <div class=\"popupPanel\">\n        <div class=\"popupAlign\">\n            <div class=\"popupContentTable\">\n                <div class=\"popupContentRow\">\n                    <div class=\"popupContentCell\">\n                        <div class=\"popupContent{{customClass ? ' '+customClass: ''}}\" (mouseover)=\"releaseContent()\" (mouseout)=\"lockContent()\">\n                            <div class=\"closeBtn\">\n                                <abbr title=\"Close\">\n                                    <span class=\"glyphicon glyphicon-remove\" (click)=\"closePopup(true)\"></span>\n                                </abbr>\n                            </div>\n                            <div *ngIf=\"header.length > 0\" class=\"popupHeader\" [innerHTML]=\"header\">\n                            </div>\n                            <div class=\"popupContentDetail{{noScroll ? ' noScroll':' scroll'}}\">\n                                <ng-content>\n                                </ng-content>\n                            </div>\n                            <div *ngIf=\"footer.length > 0\" class=\"popupFooter\" [innerHTML]=\"footer\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
            animations: [FadeInOutAnimation],
            styles: [".lb9-dim{width:100vw;height:100vh;position:fixed;top:0;left:0;background:rgba(0,0,0,.2);z-index:99}.show{display:block}.hide{display:none}.popupPanel{max-width:95vw;max-height:95vh;margin:2.5vh auto;height:95vh}.popupPanel .popupAlign .popupContentTable{display:table;margin:0 auto}.popupPanel .popupAlign .popupContentTable .popupContentRow{display:table-row}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell{display:table-cell;vertical-align:middle;height:95vh;max-height:95vh}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent{position:relative}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent .closeBtn{cursor:pointer}"]
        }),
        __metadata("design:paramtypes", [])
    ], ContentPopupComponent);
    return ContentPopupComponent;
}());
export { ContentPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wb3B1cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9jb250ZW50LXBvcHVwL2NvbnRlbnQtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUMvQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBUzdCO0lBYUU7UUFaUyxXQUFNLEdBQUMsUUFBUSxDQUFDO1FBQ2hCLFdBQU0sR0FBQyxFQUFFLENBQUM7UUFDVixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRWpCLHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLFVBQWtCO1FBQWxCLDJCQUFBLEVBQUEsa0JBQWtCO1FBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2RixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUNELHlDQUFTLEdBQVQ7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDeEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsOENBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNELCtDQUFlLEdBQWYsVUFBZ0IsTUFBTTtRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDdEIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBOUNRO1FBQVIsS0FBSyxFQUFFOzt5REFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7O3lEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7OzhEQUF5QjtJQUN4QjtRQUFSLEtBQUssRUFBRTs7b0VBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFOzs4REFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7OzJEQUFrQjtJQUNoQjtRQUFULE1BQU0sRUFBRTs7MkRBQStCO0lBUDdCLHFCQUFxQjtRQU5qQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGs1Q0FBNkM7WUFFN0MsVUFBVSxFQUFFLENBQUMsa0JBQWtCLENBQUM7O1NBQ2pDLENBQUM7O09BQ1cscUJBQXFCLENBZ0RqQztJQUFELDRCQUFDO0NBQUEsQUFoREQsSUFnREM7U0FoRFkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RmFkZUluT3V0QW5pbWF0aW9ufSBmcm9tICcuL2FuaW1ldGlvbic7XG5pbXBvcnQgeyB0aW1lciB9IGZyb20gJ3J4anMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xiOS1jb250ZW50LXBvcHVwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRlbnQtcG9wdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb250ZW50LXBvcHVwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtGYWRlSW5PdXRBbmltYXRpb25dXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGhlYWRlcj1cImhlYWRlclwiO1xuICBASW5wdXQoKSBmb290ZXI9XCJcIjtcbiAgQElucHV0KCkgZWxlbWVudE5hbWUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIGNsb3NlQnlCdXR0b25Pbmx5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbUNsYXNzID0gbnVsbDtcbiAgQElucHV0KCkgbm9TY3JvbGwgPSBmYWxzZTtcbiAgQE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBkaXNwbGF5ID0gZmFsc2U7XG4gIG92ZXJDb250ZW50ID0gZmFsc2U7XG4gIGFuaW1hdGlvblN0YXRlID0gJ291dCc7XG4gIG9uQW5pbWF0aW9uID0gZmFsc2U7XG4gIGNsb3NlRGVsYXkgPSB0aW1lcig0MDApO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG4gIFxuICBjbG9zZVBvcHVwKGZvcmNlQ2xvc2UgPSBmYWxzZSkge1xuICAgIGlmICgoKCF0aGlzLm92ZXJDb250ZW50ICYmICF0aGlzLmNsb3NlQnlCdXR0b25Pbmx5KSB8fCBmb3JjZUNsb3NlKSAmJiAhdGhpcy5vbkFuaW1hdGlvbikge1xuICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xuICAgICAgdGhpcy5kaXNwbGF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmNhbGxiYWNrUHJvY2VzcygnY2xvc2UnKTtcbiAgICB9XG4gIH1cbiAgc2hvd1BvcHVwKCkge1xuICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnaW4nO1xuICAgIHRoaXMuZGlzcGxheSA9IHRydWU7XG4gICAgdGhpcy5jYWxsYmFja1Byb2Nlc3MoJ29wZW4nKTtcbiAgICB0aGlzLm9uQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICB0aGlzLmNsb3NlRGVsYXkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMub25BbmltYXRpb24gPSBmYWxzZTtcbiAgICB9KVxuICB9XG4gIFxuICByZWxlYXNlQ29udGVudCgpIHtcbiAgICB0aGlzLm92ZXJDb250ZW50ID0gdHJ1ZTtcbiAgfVxuICBsb2NrQ29udGVudCgpIHtcbiAgICB0aGlzLm92ZXJDb250ZW50ID0gZmFsc2U7XG4gIH1cbiAgY2FsbGJhY2tQcm9jZXNzKGFjdGlvbikge1xuICAgIHRoaXMuY2FsbEJhY2suZW1pdCh7XG4gICAgICBlbGVtZW50OiBcInBvcFVwXCIsXG4gICAgICBuYW1lOiB0aGlzLmVsZW1lbnROYW1lLFxuICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==