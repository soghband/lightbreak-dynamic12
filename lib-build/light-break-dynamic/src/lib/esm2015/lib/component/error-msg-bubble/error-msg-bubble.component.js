import { __decorate, __metadata } from "tslib";
import { Component, Input } from '@angular/core';
let ErrorMsgBubbleComponent = class ErrorMsgBubbleComponent {
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
export { ErrorMsgBubbleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9lcnJvci1tc2ctYnViYmxlL2Vycm9yLW1zZy1idWJibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU92RCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQUluQztRQUhTLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDckIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRXRCLENBQUM7SUFFRCxRQUFRO0lBRVIsQ0FBQztJQUNFLFVBQVU7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFDRCxRQUFRLENBQUMsR0FBRyxFQUFDLEdBQUc7UUFDbEIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLEtBQUssSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRTtnQkFDckMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUNqQjtTQUNEO1FBQ0QsSUFBSSxTQUFTLElBQUksS0FBSyxFQUFDO1lBQ3RCLElBQUksS0FBSyxHQUFHO2dCQUNYLEdBQUcsRUFBRyxHQUFHO2dCQUNULEdBQUcsRUFBRyxHQUFHO2FBQ1QsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO0lBQ0MsQ0FBQztJQUNELFdBQVcsQ0FBQyxHQUFHO1FBQ2pCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUU7Z0JBQ3JDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQ3pCLE1BQU07YUFDTjtTQUNEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSixDQUFBO0FBckNTO0lBQVIsS0FBSyxFQUFFOzt3REFBYTtBQURULHVCQUF1QjtJQUxuQyxTQUFTLENBQUM7UUFDVixRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLGtsQkFBZ0Q7O0tBRWhELENBQUM7O0dBQ1csdUJBQXVCLENBc0NuQztTQXRDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS1lcnJvci1tc2ctYnViYmxlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEVycm9yTXNnQnViYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRASW5wdXQoKSBtYXhTaG93ID0gNTtcclxuXHRkYXRhID0gW107XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblxyXG5cdH1cclxuICAgIGNsZWFyRXJyb3IoKSB7XHJcblx0XHR0aGlzLmRhdGEgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZEVycm9yKGtleSxtc2cpIHtcclxuXHRcdGxldCBleGl0c0RhdGEgPSBmYWxzZTtcclxuXHRcdGZvciAobGV0IGVycm9ySW5kZXggaW4gdGhpcy5kYXRhKSB7XHJcblx0XHRcdGlmICh0aGlzLmRhdGFbZXJyb3JJbmRleF0ua2V5ID09IGtleSkge1xyXG5cdFx0XHRcdGV4aXRzRGF0YSA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChleGl0c0RhdGEgPT0gZmFsc2Upe1xyXG5cdFx0XHRsZXQgZXJyb3IgPSB7XHJcblx0XHRcdFx0a2V5IDoga2V5LFxyXG5cdFx0XHRcdG1zZyA6IG1zZ1xyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLmRhdGEucHVzaChlcnJvcik7XHJcblx0XHR9XHJcbiAgICB9XHJcbiAgICByZW1vdmVFcnJvcihrZXkpIHtcclxuXHRcdGxldCByZW1vdmVJbmRleCA9IFwiXCI7XHJcblx0ICAgIGZvciAobGV0IGVycm9ySW5kZXggaW4gdGhpcy5kYXRhKSB7XHJcblx0XHQgICAgaWYgKHRoaXMuZGF0YVtlcnJvckluZGV4XS5rZXkgPT0ga2V5KSB7XHJcblx0XHRcdCAgICByZW1vdmVJbmRleCA9IGVycm9ySW5kZXg7XHJcblx0XHRcdCAgICBicmVhaztcclxuXHRcdCAgICB9XHJcblx0ICAgIH1cclxuXHQgICAgdGhpcy5kYXRhLnNwbGljZShwYXJzZUludChyZW1vdmVJbmRleCksMSk7XHJcbiAgICB9XHJcbn1cclxuIl19