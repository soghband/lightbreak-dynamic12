import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
let DynamicPopupComponent = class DynamicPopupComponent {
    constructor() {
        this.callback = new EventEmitter();
        this.confirmStatus = false;
        this.showStatus = false;
        this.queue = false;
        this.statusPopup = 'hidePopup';
        this.popupProperties = {
            header: 'popupHeader',
            type: 'info',
            icon: 'glyphicon-info-sign',
            colorClass: '',
            eventCode: '',
            data: {},
            message: 'Informations'
        };
        this.tempData = {
            header: 'popupHeader',
            type: 'info',
            icon: 'glyphicon-info-sign',
            colorClass: '',
            eventCode: '',
            data: {},
            message: 'Informations'
        };
    }
    ngOnInit() {
    }
    set(type, message, eventCode = '000', data = {}) {
        switch (type) {
            case 'error':
                this.tempData = {
                    header: 'Error',
                    type: 'error',
                    icon: 'glyphicon-remove-sign',
                    colorClass: 'cError',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'warning':
                this.tempData = {
                    header: 'Warning',
                    type: 'warning',
                    icon: 'glyphicon-alert',
                    colorClass: 'cWarning',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'success':
                this.tempData = {
                    header: 'Success',
                    type: 'success',
                    icon: 'glyphicon-ok-sign',
                    colorClass: 'cSuccess',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'confirm':
                this.confirmStatus = false;
                this.tempData = {
                    header: 'Confirm',
                    type: 'confirm',
                    icon: 'glyphicon-question-sign',
                    colorClass: 'cConfirm',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
                break;
            case 'info':
                this.tempData = {
                    header: 'Informations',
                    type: 'info',
                    icon: 'glyphicon-info-sign',
                    colorClass: 'cInfo',
                    eventCode: eventCode,
                    data: data,
                    message: message
                };
        }
        this.showModel();
    }
    showModel() {
        this.checkModalOpening();
        if (this.showStatus == false) {
            // $('#dynamicPopup').modal('show');
            this.popupProperties = this.tempData;
            this.statusPopup = 'showPopup';
            this.showStatus = true;
            this.queue = true;
        }
        else {
            this.hideModal();
            interval(500).pipe(takeWhile(() => {
                return this.queue == true;
            }))
                .subscribe(() => {
                if (this.showStatus == false) {
                    // $('#dynamicPopup').modal('show');
                    this.popupProperties = this.tempData;
                    this.statusPopup = 'showPopup';
                    this.showStatus = true;
                    this.queue = false;
                }
            });
        }
    }
    hideModal() {
        this.statusPopup = 'hidePopup';
        interval(500).pipe(takeWhile(() => {
            return this.showStatus == true;
        }))
            .subscribe(() => {
            if (this.showStatus == true) {
                this.showStatus = false;
            }
        });
    }
    checkModalOpening() {
        interval(500)
            .pipe(takeWhile(() => {
            return this.showStatus == true;
        }))
            .subscribe(() => {
            // if (this.showStatus == true && $('#dynamicPopup').css("display") == "none") {
            if (this.showStatus == true && this.statusPopup == '') {
                this.showStatus = false;
            }
        });
    }
    confirm() {
        this.confirmStatus = true;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
            data: this.popupProperties.data
        });
        this.hideModal();
    }
    close() {
        this.confirmStatus = false;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
        });
        this.hideModal();
    }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], DynamicPopupComponent.prototype, "callback", void 0);
DynamicPopupComponent = __decorate([
    Component({
        selector: 'lb9-dynamic-popup',
        template: "<div class=\"dynamic-popup {{statusPopup}}\" id=\"dynamicPopup\">\r\n  <div class=\"foreground-close\" (click)=\"close()\"></div>\r\n  <div class=\"dynamic-popup-inside\">\r\n    <div class=\"dynamic-popup-container\">\r\n      <div class=\"dynamic-popup-header\">\r\n        <p class=\"dynamic-popup-title\">{{popupProperties.header}}</p>\r\n      </div>\r\n      <div class=\"dynamic-popup-body text-center\">\r\n        <span class=\"glyphicon {{popupProperties.icon}} {{popupProperties.colorClass}}\"></span>\r\n        <p id=\"messageLabel\" class=\"data-msg\" [innerHTML]=\"popupProperties.message\"></p>\r\n      </div>\r\n      <div class=\"dynamic-popup-footer text-right\">\r\n        <div *ngIf=\"popupProperties.type == 'confirm'\" id=\"btnDynamicPopupConfirm\" class=\"btn-style-dynamic btn-small\"\r\n             (click)=\"confirm()\"><span class=\"glyphicon glyphicon-ok\"></span>\r\n          <span>OK</span></div>\r\n        <div id=\"btnDynamicPopupClose\" class=\"btn-style-dynamic btn-small\" data-dismiss=\"modal\" aria-label=\"Close\"\r\n             (click)=\"close()\"><span\r\n          class=\"glyphicon glyphicon-remove-circle\"></span> <span>Close</span></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"
    }),
    __metadata("design:paramtypes", [])
], DynamicPopupComponent);
export { DynamicPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1wb3B1cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLXBvcHVwL2R5bmFtaWMtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBUSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRM0MsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFTOUI7UUFSVSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUt0QixJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ25CLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsY0FBYztTQUMxQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRztZQUNaLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxFQUFFO1lBQ2IsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsY0FBYztTQUMxQixDQUFDO0lBQ04sQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtRQUMzQyxRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsUUFBUSxHQUFHO29CQUNaLE1BQU0sRUFBRSxPQUFPO29CQUNmLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLFVBQVUsRUFBRSxRQUFRO29CQUNwQixTQUFTLEVBQUUsU0FBUztvQkFDcEIsSUFBSSxFQUFFLElBQUk7b0JBQ1YsT0FBTyxFQUFFLE9BQU87aUJBQ25CLENBQUM7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsUUFBUSxHQUFHO29CQUNaLE1BQU0sRUFBRSxTQUFTO29CQUNqQixJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixVQUFVLEVBQUUsVUFBVTtvQkFDdEIsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRSxPQUFPO2lCQUNuQixDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRztvQkFDWixNQUFNLEVBQUUsU0FBUztvQkFDakIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsVUFBVSxFQUFFLFVBQVU7b0JBQ3RCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDbkIsQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHO29CQUNaLE1BQU0sRUFBRSxTQUFTO29CQUNqQixJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUseUJBQXlCO29CQUMvQixVQUFVLEVBQUUsVUFBVTtvQkFDdEIsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLElBQUksRUFBRSxJQUFJO29CQUNWLE9BQU8sRUFBRSxPQUFPO2lCQUNuQixDQUFDO2dCQUNGLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRztvQkFDWixNQUFNLEVBQUUsY0FBYztvQkFDdEIsSUFBSSxFQUFFLE1BQU07b0JBQ1osSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsVUFBVSxFQUFFLE9BQU87b0JBQ25CLFNBQVMsRUFBRSxTQUFTO29CQUNwQixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsT0FBTztpQkFDbkIsQ0FBQztTQUNUO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssRUFBRTtZQUMxQixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO2lCQUNGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssRUFBRTtvQkFDMUIsb0NBQW9DO29CQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ3RCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDZCxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQzthQUNGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGlCQUFpQjtRQUNiLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO2FBQ0YsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLGdGQUFnRjtZQUNoRixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUk7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7WUFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSTtTQUNsQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELEtBQUs7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUk7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7U0FDNUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDSixDQUFBO0FBbkthO0lBQVQsTUFBTSxFQUFFOzt1REFBK0I7QUFEL0IscUJBQXFCO0lBSmpDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IseXVDQUE2QztLQUNoRCxDQUFDOztHQUNXLHFCQUFxQixDQW9LakM7U0FwS1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge2ludGVydmFsLCB0aW1lcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmRlY2xhcmUgbGV0ICQ7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbGI5LWR5bmFtaWMtcG9wdXAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2R5bmFtaWMtcG9wdXAuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEeW5hbWljUG9wdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQE91dHB1dCgpIGNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgY29uZmlybVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgc2hvd1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgcXVldWUgPSBmYWxzZTtcclxuICAgIHN0YXR1c1BvcHVwID0gJ2hpZGVQb3B1cCc7XHJcbiAgICBwb3B1cFByb3BlcnRpZXM7XHJcbiAgICB0ZW1wRGF0YTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnBvcHVwUHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgaGVhZGVyOiAncG9wdXBIZWFkZXInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgIGljb246ICdnbHlwaGljb24taW5mby1zaWduJyxcclxuICAgICAgICAgICAgY29sb3JDbGFzczogJycsXHJcbiAgICAgICAgICAgIGV2ZW50Q29kZTogJycsXHJcbiAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnSW5mb3JtYXRpb25zJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50ZW1wRGF0YSA9IHtcclxuICAgICAgICAgICAgaGVhZGVyOiAncG9wdXBIZWFkZXInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgIGljb246ICdnbHlwaGljb24taW5mby1zaWduJyxcclxuICAgICAgICAgICAgY29sb3JDbGFzczogJycsXHJcbiAgICAgICAgICAgIGV2ZW50Q29kZTogJycsXHJcbiAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnSW5mb3JtYXRpb25zJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0KHR5cGUsIG1lc3NhZ2UsIGV2ZW50Q29kZSA9ICcwMDAnLCBkYXRhID0ge30pIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZXJyb3InIDpcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiAnRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2dseXBoaWNvbi1yZW1vdmUtc2lnbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JDbGFzczogJ2NFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDb2RlOiBldmVudENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dhcm5pbmcnIDpcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiAnV2FybmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdnbHlwaGljb24tYWxlcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdjV2FybmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDb2RlOiBldmVudENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnIDpcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiAnU3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdnbHlwaGljb24tb2stc2lnbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JDbGFzczogJ2NTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICBldmVudENvZGU6IGV2ZW50Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY29uZmlybScgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlbXBEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjogJ0NvbmZpcm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb25maXJtJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZ2x5cGhpY29uLXF1ZXN0aW9uLXNpZ24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdjQ29uZmlybScsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDb2RlOiBldmVudENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luZm8nIDpcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiAnSW5mb3JtYXRpb25zJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2dseXBoaWNvbi1pbmZvLXNpZ24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yQ2xhc3M6ICdjSW5mbycsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRDb2RlOiBldmVudENvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dNb2RlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb2RlbCgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrTW9kYWxPcGVuaW5nKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd1N0YXR1cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvLyAkKCcjZHluYW1pY1BvcHVwJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgdGhpcy5wb3B1cFByb3BlcnRpZXMgPSB0aGlzLnRlbXBEYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXR1c1BvcHVwID0gJ3Nob3dQb3B1cCc7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucXVldWUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIGludGVydmFsKDUwMCkucGlwZSh0YWtlV2hpbGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnF1ZXVlID09IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dTdGF0dXMgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJCgnI2R5bmFtaWNQb3B1cCcpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdXBQcm9wZXJ0aWVzID0gdGhpcy50ZW1wRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNQb3B1cCA9ICdzaG93UG9wdXAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGVNb2RhbCgpIHtcclxuICAgICAgICB0aGlzLnN0YXR1c1BvcHVwID0gJ2hpZGVQb3B1cCc7XHJcbiAgICAgICAgaW50ZXJ2YWwoNTAwKS5waXBlKFxyXG4gICAgICAgICAgICB0YWtlV2hpbGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1N0YXR1cyA9PSB0cnVlO1xyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93U3RhdHVzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tNb2RhbE9wZW5pbmcoKSB7XHJcbiAgICAgICAgaW50ZXJ2YWwoNTAwKVxyXG4gICAgICAgICAgICAucGlwZSh0YWtlV2hpbGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1N0YXR1cyA9PSB0cnVlO1xyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5zaG93U3RhdHVzID09IHRydWUgJiYgJCgnI2R5bmFtaWNQb3B1cCcpLmNzcyhcImRpc3BsYXlcIikgPT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dTdGF0dXMgPT0gdHJ1ZSAmJiB0aGlzLnN0YXR1c1BvcHVwID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpcm0oKSB7XHJcbiAgICAgICAgdGhpcy5jb25maXJtU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICB0eXBlOnRoaXMucG9wdXBQcm9wZXJ0aWVzLnR5cGUsXHJcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5jb25maXJtU3RhdHVzLFxyXG4gICAgICAgICAgICBldmVudENvZGU6IHRoaXMucG9wdXBQcm9wZXJ0aWVzLmV2ZW50Q29kZSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5wb3B1cFByb3BlcnRpZXMuZGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XHJcbiAgICB9XHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1TdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrLmVtaXQoe1xyXG4gICAgICAgICAgICB0eXBlOnRoaXMucG9wdXBQcm9wZXJ0aWVzLnR5cGUsXHJcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5jb25maXJtU3RhdHVzLFxyXG4gICAgICAgICAgICBldmVudENvZGU6IHRoaXMucG9wdXBQcm9wZXJ0aWVzLmV2ZW50Q29kZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmhpZGVNb2RhbCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==