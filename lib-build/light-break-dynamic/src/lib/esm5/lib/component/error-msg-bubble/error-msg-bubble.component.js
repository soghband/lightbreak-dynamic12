import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
var ErrorMsgBubbleComponent = /** @class */ (function () {
    function ErrorMsgBubbleComponent() {
        this.maxShow = 5;
        this.data = [];
        this.objKeys = Object.keys;
    }
    ErrorMsgBubbleComponent.prototype.ngOnInit = function () {
    };
    ErrorMsgBubbleComponent.prototype.clearError = function () {
        this.data = [];
    };
    ErrorMsgBubbleComponent.prototype.addError = function (key, msg) {
        var exitsData = false;
        for (var errorIndex in this.data) {
            if (this.data[errorIndex].key == key) {
                exitsData = true;
            }
        }
        if (exitsData == false) {
            var error = {
                key: key,
                msg: msg
            };
            this.data.push(error);
        }
    };
    ErrorMsgBubbleComponent.prototype.removeError = function (key) {
        var removeIndex = "";
        for (var errorIndex in this.data) {
            if (this.data[errorIndex].key == key) {
                removeIndex = errorIndex;
                break;
            }
        }
        this.data.splice(parseInt(removeIndex), 1);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ErrorMsgBubbleComponent.prototype, "maxShow", void 0);
    ErrorMsgBubbleComponent = __decorate([
        Component({
            selector: 'lb9-error-msg-bubble',
            template: "<div id=\"errorBubble\">\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgPanel\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRow\">\r\n                {{data[i].msg}}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgSpace\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRowSpace\">\r\n\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n",
            styles: ["#errorBubble .errorMsgPanel{position:fixed;bottom:0;left:0;width:calc(100% - 30px);margin:15px;border:1px solid #ff4356;border-radius:10px;box-shadow:3px 3px 3px rgba(0,0,0,.5);background:#ffe1d9;z-index:1060}#errorBubble .errorMsgPanel .errorRow{color:#ff4356;border-top:1px dotted #ff988a;padding:0 10px;line-height:30px}#errorBubble .errorMsgPanel .errorRow:first-child{border-top:0}#errorBubble .errorMsgSpace{margin:15px}#errorBubble .errorMsgSpace .errorRowSpace{height:30px}"]
        }),
        __metadata("design:paramtypes", [])
    ], ErrorMsgBubbleComponent);
    return ErrorMsgBubbleComponent;
}());
export { ErrorMsgBubbleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9lcnJvci1tc2ctYnViYmxlL2Vycm9yLW1zZy1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU92RDtJQUlDO1FBSFMsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNyQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFdEIsQ0FBQztJQUVELDBDQUFRLEdBQVI7SUFFQSxDQUFDO0lBQ0UsNENBQVUsR0FBVjtRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUNELDBDQUFRLEdBQVIsVUFBUyxHQUFHLEVBQUMsR0FBRztRQUNsQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsS0FBSyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFO2dCQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ2pCO1NBQ0Q7UUFDRCxJQUFJLFNBQVMsSUFBSSxLQUFLLEVBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQUc7Z0JBQ1gsR0FBRyxFQUFHLEdBQUc7Z0JBQ1QsR0FBRyxFQUFHLEdBQUc7YUFDVCxDQUFDO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDQyxDQUFDO0lBQ0QsNkNBQVcsR0FBWCxVQUFZLEdBQUc7UUFDakIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUssSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRTtnQkFDckMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDekIsTUFBTTthQUNOO1NBQ0Q7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQXBDSztRQUFSLEtBQUssRUFBRTs7NERBQWE7SUFEVCx1QkFBdUI7UUFMbkMsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxrbEJBQWdEOztTQUVoRCxDQUFDOztPQUNXLHVCQUF1QixDQXNDbkM7SUFBRCw4QkFBQztDQUFBLEFBdENELElBc0NDO1NBdENZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LWVycm9yLW1zZy1idWJibGUnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9lcnJvci1tc2ctYnViYmxlLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9lcnJvci1tc2ctYnViYmxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JNc2dCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIG1heFNob3cgPSA1O1xyXG5cdGRhdGEgPSBbXTtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHJcblx0fVxyXG4gICAgY2xlYXJFcnJvcigpIHtcclxuXHRcdHRoaXMuZGF0YSA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRXJyb3Ioa2V5LG1zZykge1xyXG5cdFx0bGV0IGV4aXRzRGF0YSA9IGZhbHNlO1xyXG5cdFx0Zm9yIChsZXQgZXJyb3JJbmRleCBpbiB0aGlzLmRhdGEpIHtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YVtlcnJvckluZGV4XS5rZXkgPT0ga2V5KSB7XHJcblx0XHRcdFx0ZXhpdHNEYXRhID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGV4aXRzRGF0YSA9PSBmYWxzZSl7XHJcblx0XHRcdGxldCBlcnJvciA9IHtcclxuXHRcdFx0XHRrZXkgOiBrZXksXHJcblx0XHRcdFx0bXNnIDogbXNnXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuZGF0YS5wdXNoKGVycm9yKTtcclxuXHRcdH1cclxuICAgIH1cclxuICAgIHJlbW92ZUVycm9yKGtleSkge1xyXG5cdFx0bGV0IHJlbW92ZUluZGV4ID0gXCJcIjtcclxuXHQgICAgZm9yIChsZXQgZXJyb3JJbmRleCBpbiB0aGlzLmRhdGEpIHtcclxuXHRcdCAgICBpZiAodGhpcy5kYXRhW2Vycm9ySW5kZXhdLmtleSA9PSBrZXkpIHtcclxuXHRcdFx0ICAgIHJlbW92ZUluZGV4ID0gZXJyb3JJbmRleDtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0ICAgIH1cclxuXHQgICAgfVxyXG5cdCAgICB0aGlzLmRhdGEuc3BsaWNlKHBhcnNlSW50KHJlbW92ZUluZGV4KSwxKTtcclxuICAgIH1cclxufVxyXG4iXX0=