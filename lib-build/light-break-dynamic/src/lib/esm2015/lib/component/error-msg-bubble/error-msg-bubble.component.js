import { Component, Input } from '@angular/core';
export class ErrorMsgBubbleComponent {
    constructor() {
        this.maxShow = 5;
        this.data = [];
        this.objKeys = Object.keys;
    }
    ngOnInit() {
    }
    clearError() {
        this.data = [];
    }
    addError(key, msg) {
        let exitsData = false;
        for (let errorIndex in this.data) {
            if (this.data[errorIndex].key == key) {
                exitsData = true;
            }
        }
        if (exitsData == false) {
            let error = {
                key: key,
                msg: msg
            };
            this.data.push(error);
        }
    }
    removeError(key) {
        let removeIndex = "";
        for (let errorIndex in this.data) {
            if (this.data[errorIndex].key == key) {
                removeIndex = errorIndex;
                break;
            }
        }
        this.data.splice(parseInt(removeIndex), 1);
    }
}
ErrorMsgBubbleComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-error-msg-bubble',
                template: "<div id=\"errorBubble\">\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgPanel\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRow\">\r\n                {{data[i].msg}}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgSpace\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRowSpace\">\r\n\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n",
                styles: ["#errorBubble .errorMsgPanel{position:fixed;bottom:0px;left:0px;width:calc(100% - 30px);margin:15px;border:#ff4356 1px solid;border-radius:10px;box-shadow:3px 3px 3px #00000080;background:#ffe1d9;z-index:1060}#errorBubble .errorMsgPanel .errorRow{color:#ff4356;border-top:1px dotted #ff988a;padding:0 10px;line-height:30px}#errorBubble .errorMsgPanel .errorRow:first-child{border-top:0px}#errorBubble .errorMsgSpace{margin:15px}#errorBubble .errorMsgSpace .errorRowSpace{height:30px}\n"]
            },] }
];
ErrorMsgBubbleComponent.ctorParameters = () => [];
ErrorMsgBubbleComponent.propDecorators = {
    maxShow: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2Vycm9yLW1zZy1idWJibGUvZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFPdkQsTUFBTSxPQUFPLHVCQUF1QjtJQUluQztRQUhTLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDckIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRXRCLENBQUM7SUFFRCxRQUFRO0lBRVIsQ0FBQztJQUNFLFVBQVU7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFDRCxRQUFRLENBQUMsR0FBRyxFQUFDLEdBQUc7UUFDbEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLEtBQUssSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRTtnQkFDckMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNqQjtTQUNEO1FBQ0QsSUFBSSxTQUFTLElBQUksS0FBSyxFQUFDO1lBQ3RCLElBQUksS0FBSyxHQUFHO2dCQUNYLEdBQUcsRUFBRyxHQUFHO2dCQUNULEdBQUcsRUFBRyxHQUFHO2FBQ1QsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO0lBQ0MsQ0FBQztJQUNELFdBQVcsQ0FBQyxHQUFHO1FBQ2pCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUU7Z0JBQ3JDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQ3pCLE1BQU07YUFDTjtTQUNEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7OztZQTFDSixTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsa2xCQUFnRDs7YUFFaEQ7Ozs7c0JBRUMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbGI5LWVycm9yLW1zZy1idWJibGUnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9lcnJvci1tc2ctYnViYmxlLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9lcnJvci1tc2ctYnViYmxlLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRXJyb3JNc2dCdWJibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIG1heFNob3cgPSA1O1xyXG5cdGRhdGEgPSBbXTtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHJcblx0fVxyXG4gICAgY2xlYXJFcnJvcigpIHtcclxuXHRcdHRoaXMuZGF0YSA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRXJyb3Ioa2V5LG1zZykge1xyXG5cdFx0bGV0IGV4aXRzRGF0YSA9IGZhbHNlO1xyXG5cdFx0Zm9yIChsZXQgZXJyb3JJbmRleCBpbiB0aGlzLmRhdGEpIHtcclxuXHRcdFx0aWYgKHRoaXMuZGF0YVtlcnJvckluZGV4XS5rZXkgPT0ga2V5KSB7XHJcblx0XHRcdFx0ZXhpdHNEYXRhID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGV4aXRzRGF0YSA9PSBmYWxzZSl7XHJcblx0XHRcdGxldCBlcnJvciA9IHtcclxuXHRcdFx0XHRrZXkgOiBrZXksXHJcblx0XHRcdFx0bXNnIDogbXNnXHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuZGF0YS5wdXNoKGVycm9yKTtcclxuXHRcdH1cclxuICAgIH1cclxuICAgIHJlbW92ZUVycm9yKGtleSkge1xyXG5cdFx0bGV0IHJlbW92ZUluZGV4ID0gXCJcIjtcclxuXHQgICAgZm9yIChsZXQgZXJyb3JJbmRleCBpbiB0aGlzLmRhdGEpIHtcclxuXHRcdCAgICBpZiAodGhpcy5kYXRhW2Vycm9ySW5kZXhdLmtleSA9PSBrZXkpIHtcclxuXHRcdFx0ICAgIHJlbW92ZUluZGV4ID0gZXJyb3JJbmRleDtcclxuXHRcdFx0ICAgIGJyZWFrO1xyXG5cdFx0ICAgIH1cclxuXHQgICAgfVxyXG5cdCAgICB0aGlzLmRhdGEuc3BsaWNlKHBhcnNlSW50KHJlbW92ZUluZGV4KSwxKTtcclxuICAgIH1cclxufVxyXG4iXX0=