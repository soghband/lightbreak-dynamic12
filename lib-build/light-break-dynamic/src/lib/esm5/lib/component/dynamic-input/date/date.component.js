import { __decorate, __extends, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
var DateComponent = /** @class */ (function (_super) {
    __extends(DateComponent, _super);
    function DateComponent(animationService) {
        var _this = _super.call(this, animationService) || this;
        _this.callBack = new EventEmitter();
        _this.panelCallBack = new EventEmitter();
        _this.defaultMonthListLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        _this.defaultMonthListShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        _this.defaultWeekDay = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
        _this.columnCalculate = '';
        _this.objKeys = Object.keys;
        _this.calendarIndex = 0;
        _this.haveChange = false;
        _this.animateProcess();
        return _this;
    }
    DateComponent.prototype.ngOnInit = function () {
        if (this.fieldCreation.monthListLong === undefined) {
            this.fieldCreation.monthListLong = this.defaultMonthListLong;
        }
        if (this.fieldCreation.monthListShort === undefined) {
            this.fieldCreation.monthListShort = this.defaultMonthListShort;
        }
        if (this.fieldCreation.weekDay === undefined) {
            this.fieldCreation.weekDay = this.defaultWeekDay;
        }
        if (this.fieldCreation.yearOffset === undefined) {
            this.fieldCreation.yearOffset = 0;
        }
        switch (this.fieldCreation.columnPerLine) {
            case 1:
                this.columnCalculate = 'dp2Col1';
                break;
            case 2:
                this.columnCalculate = 'dp2Col2';
                break;
            case 3:
                this.columnCalculate = 'dp2Col3';
                break;
            case 4:
                this.columnCalculate = 'dp2Col4';
                break;
            default:
                this.columnCalculate = '';
        }
        if (this.option.mode == 'add') {
            if (typeof (this.fieldCreation.default) != 'undefined') {
                if (Array.isArray(this.fieldCreation.default)) {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                }
                else if (typeof (this.fieldCreation.default) == 'string') {
                    this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                }
            }
            else {
                this.data[this.fieldCreation.fieldName] = [{
                        display: "",
                        value: ""
                    }];
            }
        }
        for (var dataIndex in this.data[this.fieldCreation.fieldName]) {
            if (String(this.data[this.fieldCreation.fieldName][dataIndex].value).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
                this.setDisplay(dataIndex);
            }
        }
    };
    DateComponent.prototype.addMultiVal = function () {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    };
    DateComponent.prototype.deleteMultiVal = function (dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    };
    DateComponent.prototype.processKeyUp = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            var regexp = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexp = new RegExp(this.fieldCreation.valuePattern);
            }
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexp)) {
                return true;
            }
            else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }
    };
    DateComponent.prototype.processKeyDown = function (event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.haveChange = true;
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    };
    DateComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            var key = event.key;
            var combineValue = this.tempValue + key;
            var regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (String(key).match(regexpInput)) {
                return true;
            }
            return false;
        }
        return true;
    };
    DateComponent.prototype.processBlur = function (event, action, dataIndex) {
        var validate = true;
        var calendarRef = this.calendarVC.toArray();
        calendarRef[this.calendarIndex].closeCalendar();
        if (this.haveChange) {
            var regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)) {
                event.target.focus();
                validate = false;
            }
            else {
                if (this.fieldCreation.inputDatePattern) {
                    var dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].display.split(/(-|\s|\/)/);
                    var patternSplit = this.fieldCreation.inputDatePattern.toLowerCase().split(/(-|\s|\/)/);
                    var year = 0;
                    var month = 0;
                    var day = 0;
                    for (var dataTypeIndex in patternSplit) {
                        if (patternSplit[dataTypeIndex].substr(0, 1) === "y") {
                            if (this.fieldCreation.inputYearOffset) {
                                year = parseInt(dataSplit[dataTypeIndex]) + parseInt(this.fieldCreation.inputYearOffset);
                            }
                            else {
                                year = parseInt(dataSplit[dataTypeIndex]);
                            }
                        }
                        if (patternSplit[dataTypeIndex].substr(0, 1) === "m") {
                            month = parseInt(dataSplit[dataTypeIndex]) - 1;
                        }
                        if (patternSplit[dataTypeIndex].substr(0, 1) === "d") {
                            day = parseInt(dataSplit[dataTypeIndex]);
                        }
                    }
                    var dateCheck = new Date(year, month, day);
                    var dateString = dateCheck.getFullYear() + "-" + (dateCheck.getMonth() + 1) + "-" + dateCheck.getDate();
                    this.data[this.fieldCreation.fieldName][dataIndex].value = dateString;
                }
                else {
                    this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display;
                }
                this.setDisplay(dataIndex);
                this.haveChange = false;
            }
        }
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            validateStatus: validate,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    };
    DateComponent.prototype.processCall = function (data) {
    };
    DateComponent.prototype.processPanelCallBack = function (event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    };
    DateComponent.prototype.setDate = function (event, dataIndex) {
        var dateString = event.year + '-' + this.pad((event.month + 1), 2) + '-' + this.pad(event.day, 2);
        this.data[this.fieldCreation.fieldName][dataIndex] = {
            display: dateString,
            value: dateString
        };
        if (this.fieldCreation.displayFormat) {
            this.setDisplay(dataIndex);
        }
    };
    DateComponent.prototype.setDisplay = function (dataIndex) {
        var dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].value.split("-");
        var dateSet = {
            year: parseInt(dataSplit[0]),
            month: (parseInt(dataSplit[1]) - 1),
            day: parseInt(dataSplit[2]),
        };
        var dateString = this.fieldCreation.displayFormat;
        var valueString = dateSet.year + '-' + this.pad((dateSet.month + 1), 2) + '-' + this.pad(dateSet.day, 2);
        if (dateString.indexOf("DD") > -1) {
            var stringDD = this.pad(dateSet.day, 2);
            dateString = dateString.replace("DD", stringDD);
        }
        else if (dateString.indexOf("D") > -1) {
            var stringD = String(dateSet.day);
            dateString = dateString.replace("D", stringD);
        }
        if (dateString.indexOf("MMMM") > -1) {
            var stringMMMM = this.fieldCreation.monthListLong[dateSet.month];
            dateString = dateString.replace("MMMM", stringMMMM);
        }
        else if (dateString.indexOf("MMM") > -1) {
            var stringMMM = this.fieldCreation.monthListShort[dateSet.month];
            dateString = dateString.replace("MMM", stringMMM);
        }
        else if (dateString.indexOf("MM") > -1) {
            var stringMM = this.pad((dateSet.month + 1), 2);
            dateString = dateString.replace("MM", stringMM);
        }
        else if (dateString.indexOf("M") > -1) {
            var stringM = String(dateSet.month + 1);
            dateString = dateString.replace("M", stringM);
        }
        if (dateString.indexOf("YYYY") > -1) {
            var stringYYYY = String(dateSet.year + this.fieldCreation.yearOffset);
            dateString = dateString.replace("YYYY", stringYYYY);
        }
        else if (dateString.indexOf("YY") > -1) {
            var stringYY = String(dateSet.year + this.fieldCreation.yearOffset).substr(2, 2);
            dateString = dateString.replace("YY", stringYY);
        }
        this.data[this.fieldCreation.fieldName][dataIndex] = {
            display: dateString,
            value: valueString
        };
    };
    DateComponent.prototype.pad = function (n, width, z) {
        if (z === void 0) { z = '0'; }
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };
    DateComponent.prototype.getDateDisable = function () {
        if (this.getDisable() ||
            (((this.fieldCreation.yearOffset && this.fieldCreation.yearOffset != 0) ||
                (this.fieldCreation.displayFormat && this.fieldCreation.displayFormat != "YYYY-MM-DD")) &&
                (!this.fieldCreation.valuePattern || !this.fieldCreation.inputDatePattern))) {
            return true;
        }
        return false;
    };
    DateComponent.prototype.setFocus = function (data) {
        var inputRef = this.dateInputVC.toArray();
        inputRef[this.calendarIndex].nativeElement.focus();
    };
    DateComponent.prototype.openCalendar = function (data, index) {
        this.calendarIndex = index;
        var calendarRef = this.calendarVC.toArray();
        var inputRef = this.dateInputVC.toArray();
        calendarRef[index].open(data);
        inputRef[index].nativeElement.focus();
    };
    DateComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    __decorate([
        ViewChildren('dateInput'),
        __metadata("design:type", QueryList)
    ], DateComponent.prototype, "dateInputVC", void 0);
    __decorate([
        ViewChildren('datePicker'),
        __metadata("design:type", QueryList)
    ], DateComponent.prototype, "calendarVC", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DateComponent.prototype, "panelCallBack", void 0);
    DateComponent = __decorate([
        Component({
            template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex].value == '' ? 'require' : ''}}\">\r\n                <input type=\"textbox\" #dateInput\r\n                       class=\"dateWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                       [readonly]=\"getDateDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div class=\"dateToggle{{getDisable() ? ' disable' : ' enable'}}\"\r\n                     (click)=\"!getDisable() ? openCalendar(data[fieldCreation.fieldName][dataIndex].value, dataIndex) : null\"><span class=\"glyphicon glyphicon-calendar\"></span></div>\r\n                <lb9-date-picker #datePicker\r\n                                 (setDate)=\"setDate($event,dataIndex)\"\r\n                                 (inputFocus)=\"setFocus($event,dataIndex)\"\r\n                                 [monthListLong]=\"fieldCreation.monthListLong\"\r\n                                 [monthListShort]=\"fieldCreation.monthListShort\"\r\n                                 [weekDay]=\"fieldCreation.weekDay\"\r\n                                 [showToday]=\"fieldCreation.showToday\"\r\n                                 [todayText]=\"fieldCreation.todayText\"\r\n                                 [closeOnDateSelect]=\"fieldCreation.closeOnDateSelect\"\r\n                                 [yearOffset]=\"fieldCreation.yearOffset\"></lb9-date-picker>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\"\r\n                     class=\"deleteBtnWithDate\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\"\r\n             (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
        }),
        __metadata("design:paramtypes", [AnimationService])
    ], DateComponent);
    return DateComponent;
}(DynamicBehaviorComponent));
export { DateComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2RhdGUvZGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFhLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQU9wRTtJQUFtQyxpQ0FBd0I7SUFtQjFELHVCQUFZLGdCQUFtQztRQUEvQyxZQUNDLGtCQUFNLGdCQUFnQixDQUFDLFNBRXZCO1FBZFMsY0FBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsbUJBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLDBCQUFvQixHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsSiwyQkFBcUIsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0csb0JBQWMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FB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QUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDdEMsQ0FBQzs7Z0JBMVE4QixnQkFBZ0I7O0lBbEJwQjtRQUExQixZQUFZLENBQUMsV0FBVyxDQUFDO2tDQUFlLFNBQVM7c0RBQWE7SUFDbkM7UUFBM0IsWUFBWSxDQUFDLFlBQVksQ0FBQztrQ0FBYyxTQUFTO3FEQUFzQjtJQUMvRDtRQUFSLEtBQUssRUFBRTs7K0NBQU07SUFDTDtRQUFSLEtBQUssRUFBRTs7aURBQVE7SUFDUDtRQUFSLEtBQUssRUFBRTs7d0RBQWU7SUFDZDtRQUFSLEtBQUssRUFBRTs7cURBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTs7bURBQVU7SUFDUjtRQUFULE1BQU0sRUFBRTs7bURBQStCO0lBQzlCO1FBQVQsTUFBTSxFQUFFOzt3REFBb0M7SUFUakMsYUFBYTtRQUh6QixTQUFTLENBQUM7WUFDViwwdEhBQW9DO1NBQ3BDLENBQUM7eUNBb0I4QixnQkFBZ0I7T0FuQm5DLGFBQWEsQ0E4UnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTlSRCxDQUFtQyx3QkFBd0IsR0E4UjFEO1NBOVJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0R5bmFtaWNCZWhhdmlvckNvbXBvbmVudH0gZnJvbSAnLi4vLi4vZHluYW1pYy1iZWhhdmlvci9keW5hbWljLWJlaGF2aW9yLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7RGF0ZVBpY2tlckNvbXBvbmVudH0gZnJvbSAnLi9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHRlbXBsYXRlVXJsOiAnLi9kYXRlLmNvbXBvbmVudC5odG1sJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVDb21wb25lbnQgZXh0ZW5kcyBEeW5hbWljQmVoYXZpb3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBWaWV3Q2hpbGRyZW4oJ2RhdGVJbnB1dCcpIGRhdGVJbnB1dFZDIDogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG5cdEBWaWV3Q2hpbGRyZW4oJ2RhdGVQaWNrZXInKSBjYWxlbmRhclZDIDogUXVlcnlMaXN0PERhdGVQaWNrZXJDb21wb25lbnQ+O1xyXG5cdEBJbnB1dCgpIGRhdGE7XHJcblx0QElucHV0KCkgb3B0aW9uO1xyXG5cdEBJbnB1dCgpIGZpZWxkQ3JlYXRpb247XHJcblx0QElucHV0KCkgaW5wdXRJbmRleDtcclxuXHRASW5wdXQoKSByb3dJbmRleDtcclxuXHRAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIHBhbmVsQ2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0ZGVmYXVsdE1vbnRoTGlzdExvbmcgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXTtcclxuXHRkZWZhdWx0TW9udGhMaXN0U2hvcnQgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XHJcblx0ZGVmYXVsdFdlZWtEYXkgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUaHVcIiwgXCJXZWRcIiwgXCJUdWVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XHJcblx0Y29sdW1uQ2FsY3VsYXRlID0gJyc7XHJcblx0b2JqS2V5cyA9IE9iamVjdC5rZXlzO1xyXG5cdGNhbGVuZGFySW5kZXggPSAwO1xyXG5cdHRlbXBWYWx1ZTtcclxuXHRoYXZlQ2hhbmdlID0gZmFsc2U7XHJcblx0XHJcblx0Y29uc3RydWN0b3IoYW5pbWF0aW9uU2VydmljZSA6IEFuaW1hdGlvblNlcnZpY2UpIHtcclxuXHRcdHN1cGVyKGFuaW1hdGlvblNlcnZpY2UpO1xyXG5cdFx0dGhpcy5hbmltYXRlUHJvY2VzcygpO1xyXG5cdH1cclxuXHRcclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24ubW9udGhMaXN0TG9uZyA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuZmllbGRDcmVhdGlvbi5tb250aExpc3RMb25nID0gdGhpcy5kZWZhdWx0TW9udGhMaXN0TG9uZ1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5tb250aExpc3RTaG9ydCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuZmllbGRDcmVhdGlvbi5tb250aExpc3RTaG9ydCA9IHRoaXMuZGVmYXVsdE1vbnRoTGlzdFNob3J0XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLndlZWtEYXkgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLmZpZWxkQ3JlYXRpb24ud2Vla0RheSA9IHRoaXMuZGVmYXVsdFdlZWtEYXlcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24ueWVhck9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuZmllbGRDcmVhdGlvbi55ZWFyT2Zmc2V0ID0gMFxyXG5cdFx0fVxyXG5cdFx0c3dpdGNoICh0aGlzLmZpZWxkQ3JlYXRpb24uY29sdW1uUGVyTGluZSkge1xyXG5cdFx0XHRjYXNlIDEgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDEnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDIgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDInO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDMgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDMnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDQgOlxyXG5cdFx0XHRcdHRoaXMuY29sdW1uQ2FsY3VsYXRlID0gJ2RwMkNvbDQnO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICcnO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gJ2FkZCcpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiAodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpICE9ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0gPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgKHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW3RoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0XTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gW3tcclxuXHRcdFx0XHRcdGRpc3BsYXk6XCJcIixcclxuXHRcdFx0XHRcdHZhbHVlOlwiXCJcclxuXHRcdFx0XHR9XTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Zm9yIChsZXQgZGF0YUluZGV4IGluIHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSkge1xyXG5cdFx0XHRpZiAoU3RyaW5nKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLnZhbHVlKS5tYXRjaCgvKFsxMl1cXGR7M30tKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18WzEyXVxcZHwzWzAxXSkpLykpIHtcclxuXHRcdFx0XHR0aGlzLnNldERpc3BsYXkoZGF0YUluZGV4KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRhZGRNdWx0aVZhbCgpIHtcclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5wdXNoKHtcclxuXHRcdFx0ZGlzcGxheTpcIlwiLFxyXG5cdFx0XHR2YWx1ZTpcIlwiXHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0ZGVsZXRlTXVsdGlWYWwoZGF0YUluZGV4KSB7XHJcblx0XHRpZiAodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdLnNwbGljZShkYXRhSW5kZXgsIDEpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzS2V5VXAoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdFx0aWYgKGV2ZW50LmN0cmxLZXkgPT0gdHJ1ZSAmJiAoZXZlbnQuY2hhckNvZGUgPT0gODYgfHwgZXZlbnQud2hpY2ggPT0gODYpKSB7XHJcblx0XHRcdGxldCByZWdleHAgPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHJlZ2V4cCA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKFN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSkubWF0Y2gocmVnZXhwKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0gdGhpcy50ZW1wVmFsdWU7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0tleURvd24oZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHR0aGlzLnRlbXBWYWx1ZSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdO1xyXG5cdFx0dGhpcy5oYXZlQ2hhbmdlID0gdHJ1ZTtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NDYWxsQmFja0tleVByZXNzKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KTtcclxuXHRcdGlmIChldmVudC5rZXlDb2RlICE9IDQ2ICYmIGV2ZW50LmtleUNvZGUgIT0gOCAmJiBldmVudC5jdHJsS2V5ICE9IHRydWUgJiYgZXZlbnQuYWx0S2V5ICE9IHRydWUpIHtcclxuXHRcdFx0bGV0IGtleSA9IGV2ZW50LmtleTtcclxuXHRcdFx0bGV0IGNvbWJpbmVWYWx1ZSA9IHRoaXMudGVtcFZhbHVlICsga2V5O1xyXG5cdFx0XHRsZXQgcmVnZXhwSW5wdXQgPSB0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybikgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHJlZ2V4cElucHV0ID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRQYXR0ZXJuKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoU3RyaW5nKGtleSkubWF0Y2gocmVnZXhwSW5wdXQpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0JsdXIoZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHRsZXQgdmFsaWRhdGUgPSB0cnVlO1xyXG5cdFx0bGV0IGNhbGVuZGFyUmVmID0gdGhpcy5jYWxlbmRhclZDLnRvQXJyYXkoKTtcclxuXHRcdGNhbGVuZGFyUmVmW3RoaXMuY2FsZW5kYXJJbmRleF0uY2xvc2VDYWxlbmRhcigpO1xyXG5cdFx0aWYgKHRoaXMuaGF2ZUNoYW5nZSkge1xyXG5cdFx0XHRsZXQgcmVnZXhwVmFsdWUgPSB0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuXHJcblx0XHRcdGlmICh0eXBlb2YodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybikgPT0gXCJzdHJpbmdcIikge1xyXG5cdFx0XHRcdHJlZ2V4cFZhbHVlID0gbmV3IFJlZ0V4cCh0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIVN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5KS5tYXRjaChyZWdleHBWYWx1ZSkpIHtcclxuXHRcdFx0XHRldmVudC50YXJnZXQuZm9jdXMoKTtcclxuXHRcdFx0XHR2YWxpZGF0ZSA9IGZhbHNlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXREYXRlUGF0dGVybikge1xyXG5cdFx0XHRcdFx0bGV0IGRhdGFTcGxpdCA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXkuc3BsaXQoLygtfFxcc3xcXC8pLylcclxuXHRcdFx0XHRcdGxldCBwYXR0ZXJuU3BsaXQgPSB0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXREYXRlUGF0dGVybi50b0xvd2VyQ2FzZSgpLnNwbGl0KC8oLXxcXHN8XFwvKS8pXHJcblx0XHRcdFx0XHRsZXQgeWVhciA9IDA7XHJcblx0XHRcdFx0XHRsZXQgbW9udGggPSAwO1xyXG5cdFx0XHRcdFx0bGV0IGRheSA9IDA7XHJcblx0XHRcdFx0XHRmb3IgKGxldCBkYXRhVHlwZUluZGV4IGluIHBhdHRlcm5TcGxpdCkge1xyXG5cdFx0XHRcdFx0XHRpZiAocGF0dGVyblNwbGl0W2RhdGFUeXBlSW5kZXhdLnN1YnN0cigwLDEpID09PSBcInlcIikge1xyXG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRZZWFyT2Zmc2V0KSB7XHJcblx0XHRcdFx0XHRcdFx0XHR5ZWFyID0gcGFyc2VJbnQoZGF0YVNwbGl0W2RhdGFUeXBlSW5kZXhdKSArIHBhcnNlSW50KHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFllYXJPZmZzZXQpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHR5ZWFyID0gcGFyc2VJbnQoZGF0YVNwbGl0W2RhdGFUeXBlSW5kZXhdKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAocGF0dGVyblNwbGl0W2RhdGFUeXBlSW5kZXhdLnN1YnN0cigwLDEpID09PSBcIm1cIikge1xyXG5cdFx0XHRcdFx0XHRcdG1vbnRoID0gcGFyc2VJbnQoZGF0YVNwbGl0W2RhdGFUeXBlSW5kZXhdKSAtIDE7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKHBhdHRlcm5TcGxpdFtkYXRhVHlwZUluZGV4XS5zdWJzdHIoMCwxKSA9PT0gXCJkXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRkYXkgPSBwYXJzZUludChkYXRhU3BsaXRbZGF0YVR5cGVJbmRleF0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRsZXQgZGF0ZUNoZWNrID0gbmV3IERhdGUoeWVhcixtb250aCxkYXkpO1xyXG5cdFx0XHRcdFx0bGV0IGRhdGVTdHJpbmcgPSBkYXRlQ2hlY2suZ2V0RnVsbFllYXIoKStcIi1cIisoZGF0ZUNoZWNrLmdldE1vbnRoKCkrMSkrXCItXCIrZGF0ZUNoZWNrLmdldERhdGUoKVxyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0udmFsdWUgPSBkYXRlU3RyaW5nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS52YWx1ZSA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLmRpc3BsYXlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5zZXREaXNwbGF5KGRhdGFJbmRleClcclxuXHRcdFx0XHR0aGlzLmhhdmVDaGFuZ2UgPSBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0dmFsaWRhdGVTdGF0dXM6IHZhbGlkYXRlLFxyXG5cdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NDYWxsKGRhdGEpIHtcclxuXHRcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuXHRcdHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZmVpbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHR9KTtcclxuXHR9XHJcblx0XHJcblx0c2V0RGF0ZShldmVudCxkYXRhSW5kZXgpIHtcclxuXHRcdGxldCBkYXRlU3RyaW5nID0gZXZlbnQueWVhciArICctJyArIHRoaXMucGFkKChldmVudC5tb250aCArIDEpLDIpICsgJy0nICsgdGhpcy5wYWQoZXZlbnQuZGF5LDIpO1xyXG5cdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0gPSB7XHJcblx0XHRcdGRpc3BsYXk6IGRhdGVTdHJpbmcsXHJcblx0XHRcdHZhbHVlOiBkYXRlU3RyaW5nXHJcblx0XHR9O1xyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5kaXNwbGF5Rm9ybWF0KSB7XHJcblx0XHRcdHRoaXMuc2V0RGlzcGxheShkYXRhSW5kZXgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZXREaXNwbGF5KGRhdGFJbmRleCkge1xyXG5cdFx0bGV0IGRhdGFTcGxpdCA9IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLnZhbHVlLnNwbGl0KFwiLVwiKTtcclxuXHRcdGxldCBkYXRlU2V0ID0ge1xyXG5cdFx0XHR5ZWFyOiBwYXJzZUludChkYXRhU3BsaXRbMF0pLFxyXG5cdFx0XHRtb250aDogKHBhcnNlSW50KGRhdGFTcGxpdFsxXSktMSksXHJcblx0XHRcdGRheTogcGFyc2VJbnQoZGF0YVNwbGl0WzJdKSxcclxuXHRcdH1cclxuXHRcdGxldCBkYXRlU3RyaW5nID0gdGhpcy5maWVsZENyZWF0aW9uLmRpc3BsYXlGb3JtYXQ7XHJcblx0XHRsZXQgdmFsdWVTdHJpbmcgPSBkYXRlU2V0LnllYXIgKyAnLScgKyB0aGlzLnBhZCgoZGF0ZVNldC5tb250aCArIDEpLDIpICsgJy0nICsgdGhpcy5wYWQoZGF0ZVNldC5kYXksMik7XHJcblx0XHRpZiAoZGF0ZVN0cmluZy5pbmRleE9mKFwiRERcIikgPiAtMSkge1xyXG5cdFx0XHRsZXQgc3RyaW5nREQgPSB0aGlzLnBhZChkYXRlU2V0LmRheSwyKTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIkREXCIsIHN0cmluZ0REKTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0ZVN0cmluZy5pbmRleE9mKFwiRFwiKSA+IC0xKSB7XHJcblx0XHRcdGxldCBzdHJpbmdEID0gU3RyaW5nKGRhdGVTZXQuZGF5KTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIkRcIiwgc3RyaW5nRCk7XHJcblx0XHR9XHJcblx0XHRpZiAoZGF0ZVN0cmluZy5pbmRleE9mKFwiTU1NTVwiKSA+IC0xKSB7XHJcblx0XHRcdGxldCBzdHJpbmdNTU1NID0gdGhpcy5maWVsZENyZWF0aW9uLm1vbnRoTGlzdExvbmdbZGF0ZVNldC5tb250aF07XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJNTU1NXCIsIHN0cmluZ01NTU0pO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRlU3RyaW5nLmluZGV4T2YoXCJNTU1cIikgPiAtMSkge1xyXG5cdFx0XHRsZXQgc3RyaW5nTU1NID0gdGhpcy5maWVsZENyZWF0aW9uLm1vbnRoTGlzdFNob3J0W2RhdGVTZXQubW9udGhdO1xyXG5cdFx0XHRkYXRlU3RyaW5nID0gZGF0ZVN0cmluZy5yZXBsYWNlKFwiTU1NXCIsIHN0cmluZ01NTSk7XHJcblx0XHR9IGVsc2UgaWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIk1NXCIpID4gLTEpIHtcclxuXHRcdFx0bGV0IHN0cmluZ01NID0gdGhpcy5wYWQoKGRhdGVTZXQubW9udGggKyAxKSwyKTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIk1NXCIsIHN0cmluZ01NKTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0ZVN0cmluZy5pbmRleE9mKFwiTVwiKSA+IC0xKSB7XHJcblx0XHRcdGxldCBzdHJpbmdNID0gU3RyaW5nKGRhdGVTZXQubW9udGggKyAxKTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIk1cIiwgc3RyaW5nTSk7XHJcblx0XHR9XHJcblx0XHRpZiAoZGF0ZVN0cmluZy5pbmRleE9mKFwiWVlZWVwiKSA+IC0xKSB7XHJcblx0XHRcdGxldCBzdHJpbmdZWVlZID0gU3RyaW5nKGRhdGVTZXQueWVhciArIHRoaXMuZmllbGRDcmVhdGlvbi55ZWFyT2Zmc2V0KTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIllZWVlcIiwgc3RyaW5nWVlZWSk7XHJcblx0XHR9IGVsc2UgaWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIllZXCIpID4gLTEpIHtcclxuXHRcdFx0bGV0IHN0cmluZ1lZID0gU3RyaW5nKGRhdGVTZXQueWVhciArIHRoaXMuZmllbGRDcmVhdGlvbi55ZWFyT2Zmc2V0KS5zdWJzdHIoMiwyKTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIllZXCIsIHN0cmluZ1lZKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0ge1xyXG5cdFx0XHRkaXNwbGF5OiBkYXRlU3RyaW5nLFxyXG5cdFx0XHR2YWx1ZTogdmFsdWVTdHJpbmdcclxuXHRcdH07XHJcblx0fVxyXG5cdHBhZChuLCB3aWR0aCwgej0nMCcpIHtcclxuXHRcdG4gPSBuICsgJyc7XHJcblx0XHRyZXR1cm4gbi5sZW5ndGggPj0gd2lkdGggPyBuIDogbmV3IEFycmF5KHdpZHRoIC0gbi5sZW5ndGggKyAxKS5qb2luKHopICsgbjtcclxuXHR9XHJcblx0Z2V0RGF0ZURpc2FibGUoKSB7XHJcblx0XHRpZiAodGhpcy5nZXREaXNhYmxlKCkgfHxcclxuXHRcdFx0KCgodGhpcy5maWVsZENyZWF0aW9uLnllYXJPZmZzZXQgJiYgdGhpcy5maWVsZENyZWF0aW9uLnllYXJPZmZzZXQgIT0gMCkgfHxcclxuXHRcdFx0KHRoaXMuZmllbGRDcmVhdGlvbi5kaXNwbGF5Rm9ybWF0ICYmIHRoaXMuZmllbGRDcmVhdGlvbi5kaXNwbGF5Rm9ybWF0ICE9IFwiWVlZWS1NTS1ERFwiKSkgJiZcclxuXHRcdFx0XHQoIXRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4gfHwgIXRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dERhdGVQYXR0ZXJuKSkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdFxyXG5cdHNldEZvY3VzKGRhdGEpIHtcclxuXHRcdGxldCBpbnB1dFJlZiA9IHRoaXMuZGF0ZUlucHV0VkMudG9BcnJheSgpO1xyXG5cdFx0aW5wdXRSZWZbdGhpcy5jYWxlbmRhckluZGV4XS5uYXRpdmVFbGVtZW50LmZvY3VzKClcclxuXHR9XHJcblx0b3BlbkNhbGVuZGFyKGRhdGEsaW5kZXgpIHtcclxuXHRcdHRoaXMuY2FsZW5kYXJJbmRleCA9IGluZGV4XHJcblx0XHRsZXQgY2FsZW5kYXJSZWYgPSB0aGlzLmNhbGVuZGFyVkMudG9BcnJheSgpO1xyXG5cdFx0bGV0IGlucHV0UmVmID0gdGhpcy5kYXRlSW5wdXRWQy50b0FycmF5KCk7XHJcblx0XHRjYWxlbmRhclJlZltpbmRleF0ub3BlbihkYXRhKTtcclxuXHRcdGlucHV0UmVmW2luZGV4XS5uYXRpdmVFbGVtZW50LmZvY3VzKClcclxuXHR9XHJcbn1cclxuIl19