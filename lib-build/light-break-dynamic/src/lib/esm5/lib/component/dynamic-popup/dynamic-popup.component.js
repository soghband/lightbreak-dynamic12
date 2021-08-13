import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
var DynamicPopupComponent = /** @class */ (function () {
    function DynamicPopupComponent() {
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
    DynamicPopupComponent.prototype.ngOnInit = function () {
    };
    DynamicPopupComponent.prototype.set = function (type, message, eventCode, data) {
        if (eventCode === void 0) { eventCode = '000'; }
        if (data === void 0) { data = {}; }
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
    };
    DynamicPopupComponent.prototype.showModel = function () {
        var _this = this;
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
            interval(500).pipe(takeWhile(function () {
                return _this.queue == true;
            }))
                .subscribe(function () {
                if (_this.showStatus == false) {
                    // $('#dynamicPopup').modal('show');
                    _this.popupProperties = _this.tempData;
                    _this.statusPopup = 'showPopup';
                    _this.showStatus = true;
                    _this.queue = false;
                }
            });
        }
    };
    DynamicPopupComponent.prototype.hideModal = function () {
        var _this = this;
        this.statusPopup = 'hidePopup';
        interval(500).pipe(takeWhile(function () {
            return _this.showStatus == true;
        }))
            .subscribe(function () {
            if (_this.showStatus == true) {
                _this.showStatus = false;
            }
        });
    };
    DynamicPopupComponent.prototype.checkModalOpening = function () {
        var _this = this;
        interval(500)
            .pipe(takeWhile(function () {
            return _this.showStatus == true;
        }))
            .subscribe(function () {
            // if (this.showStatus == true && $('#dynamicPopup').css("display") == "none") {
            if (_this.showStatus == true && _this.statusPopup == '') {
                _this.showStatus = false;
            }
        });
    };
    DynamicPopupComponent.prototype.confirm = function () {
        this.confirmStatus = true;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
            data: this.popupProperties.data
        });
        this.hideModal();
    };
    DynamicPopupComponent.prototype.close = function () {
        this.confirmStatus = false;
        this.callback.emit({
            type: this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
        });
        this.hideModal();
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
    return DynamicPopupComponent;
}());
export { DynamicPopupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1wb3B1cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLXBvcHVwL2R5bmFtaWMtcG9wdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBUSxNQUFNLE1BQU0sQ0FBQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRM0M7SUFTSTtRQVJVLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUNkLGdCQUFXLEdBQUcsV0FBVyxDQUFDO1FBS3RCLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDbkIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxjQUFjO1NBQzFCLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxjQUFjO1NBQzFCLENBQUM7SUFDTixDQUFDO0lBRUQsd0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxtQ0FBRyxHQUFI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QUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUztZQUN6QyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJO1NBQ2xDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QscUNBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUztTQUM1QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQWxLUztRQUFULE1BQU0sRUFBRTs7MkRBQStCO0lBRC9CLHFCQUFxQjtRQUpqQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLHl1Q0FBNkM7U0FDaEQsQ0FBQzs7T0FDVyxxQkFBcUIsQ0FvS2pDO0lBQUQsNEJBQUM7Q0FBQSxBQXBLRCxJQW9LQztTQXBLWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7aW50ZXJ2YWwsIHRpbWVyfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZGVjbGFyZSBsZXQgJDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktZHluYW1pYy1wb3B1cCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1wb3B1cC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBAT3V0cHV0KCkgY2FsbGJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBjb25maXJtU3RhdHVzID0gZmFsc2U7XHJcbiAgICBzaG93U3RhdHVzID0gZmFsc2U7XHJcbiAgICBxdWV1ZSA9IGZhbHNlO1xyXG4gICAgc3RhdHVzUG9wdXAgPSAnaGlkZVBvcHVwJztcclxuICAgIHBvcHVwUHJvcGVydGllcztcclxuICAgIHRlbXBEYXRhO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMucG9wdXBQcm9wZXJ0aWVzID0ge1xyXG4gICAgICAgICAgICBoZWFkZXI6ICdwb3B1cEhlYWRlcicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgaWNvbjogJ2dseXBoaWNvbi1pbmZvLXNpZ24nLFxyXG4gICAgICAgICAgICBjb2xvckNsYXNzOiAnJyxcclxuICAgICAgICAgICAgZXZlbnRDb2RlOiAnJyxcclxuICAgICAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdJbmZvcm1hdGlvbnMnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRlbXBEYXRhID0ge1xyXG4gICAgICAgICAgICBoZWFkZXI6ICdwb3B1cEhlYWRlcicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgaWNvbjogJ2dseXBoaWNvbi1pbmZvLXNpZ24nLFxyXG4gICAgICAgICAgICBjb2xvckNsYXNzOiAnJyxcclxuICAgICAgICAgICAgZXZlbnRDb2RlOiAnJyxcclxuICAgICAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdJbmZvcm1hdGlvbnMnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXQodHlwZSwgbWVzc2FnZSwgZXZlbnRDb2RlID0gJzAwMCcsIGRhdGEgPSB7fSkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdlcnJvcicgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZ2x5cGhpY29uLXJlbW92ZS1zaWduJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvckNsYXNzOiAnY0Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBldmVudENvZGU6IGV2ZW50Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnd2FybmluZycgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdXYXJuaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2dseXBoaWNvbi1hbGVydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JDbGFzczogJ2NXYXJuaW5nJyxcclxuICAgICAgICAgICAgICAgICAgICBldmVudENvZGU6IGV2ZW50Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3VjY2VzcycgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdTdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2dseXBoaWNvbi1vay1zaWduJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvckNsYXNzOiAnY1N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Q29kZTogZXZlbnRDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjb25maXJtJyA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1TdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGVtcERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiAnQ29uZmlybScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NvbmZpcm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdnbHlwaGljb24tcXVlc3Rpb24tc2lnbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JDbGFzczogJ2NDb25maXJtJyxcclxuICAgICAgICAgICAgICAgICAgICBldmVudENvZGU6IGV2ZW50Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaW5mbycgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50ZW1wRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6ICdJbmZvcm1hdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZ2x5cGhpY29uLWluZm8tc2lnbicsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JDbGFzczogJ2NJbmZvJyxcclxuICAgICAgICAgICAgICAgICAgICBldmVudENvZGU6IGV2ZW50Q29kZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd01vZGVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01vZGVsKCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tNb2RhbE9wZW5pbmcoKTtcclxuICAgICAgICBpZiAodGhpcy5zaG93U3RhdHVzID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vICQoJyNkeW5hbWljUG9wdXAnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwUHJvcGVydGllcyA9IHRoaXMudGVtcERhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzUG9wdXAgPSAnc2hvd1BvcHVwJztcclxuICAgICAgICAgICAgdGhpcy5zaG93U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5xdWV1ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlTW9kYWwoKTtcclxuICAgICAgICAgICAgaW50ZXJ2YWwoNTAwKS5waXBlKHRha2VXaGlsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVldWUgPT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1N0YXR1cyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAkKCcjZHluYW1pY1BvcHVwJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1cFByb3BlcnRpZXMgPSB0aGlzLnRlbXBEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c1BvcHVwID0gJ3Nob3dQb3B1cCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZU1vZGFsKCkge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzUG9wdXAgPSAnaGlkZVBvcHVwJztcclxuICAgICAgICBpbnRlcnZhbCg1MDApLnBpcGUoXHJcbiAgICAgICAgICAgIHRha2VXaGlsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93U3RhdHVzID09IHRydWU7XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dTdGF0dXMgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja01vZGFsT3BlbmluZygpIHtcclxuICAgICAgICBpbnRlcnZhbCg1MDApXHJcbiAgICAgICAgICAgIC5waXBlKHRha2VXaGlsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93U3RhdHVzID09IHRydWU7XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLnNob3dTdGF0dXMgPT0gdHJ1ZSAmJiAkKCcjZHluYW1pY1BvcHVwJykuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1N0YXR1cyA9PSB0cnVlICYmIHRoaXMuc3RhdHVzUG9wdXAgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlybSgpIHtcclxuICAgICAgICB0aGlzLmNvbmZpcm1TdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6dGhpcy5wb3B1cFByb3BlcnRpZXMudHlwZSxcclxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLmNvbmZpcm1TdGF0dXMsXHJcbiAgICAgICAgICAgIGV2ZW50Q29kZTogdGhpcy5wb3B1cFByb3BlcnRpZXMuZXZlbnRDb2RlLFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnBvcHVwUHJvcGVydGllcy5kYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5oaWRlTW9kYWwoKTtcclxuICAgIH1cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29uZmlybVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIHR5cGU6dGhpcy5wb3B1cFByb3BlcnRpZXMudHlwZSxcclxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLmNvbmZpcm1TdGF0dXMsXHJcbiAgICAgICAgICAgIGV2ZW50Q29kZTogdGhpcy5wb3B1cFByb3BlcnRpZXMuZXZlbnRDb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XHJcbiAgICB9XHJcbn1cclxuIl19