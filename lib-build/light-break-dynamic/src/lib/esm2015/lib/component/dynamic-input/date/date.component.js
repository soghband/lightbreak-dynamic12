import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DynamicBehaviorComponent } from '../../dynamic-behavior/dynamic-behavior.component';
import { AnimationService } from '../../../service/animation.service';
let DateComponent = class DateComponent extends DynamicBehaviorComponent {
    constructor(animationService) {
        super(animationService);
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.defaultMonthListLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.defaultMonthListShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.defaultWeekDay = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
        this.columnCalculate = '';
        this.objKeys = Object.keys;
        this.calendarIndex = 0;
        this.haveChange = false;
        this.animateProcess();
    }
    ngOnInit() {
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
        for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
            if (String(this.data[this.fieldCreation.fieldName][dataIndex].value).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
                this.setDisplay(dataIndex);
            }
        }
    }
    addMultiVal() {
        this.data[this.fieldCreation.fieldName].push({
            display: "",
            value: ""
        });
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
            let regexp = this.fieldCreation.valuePattern;
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
    }
    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.haveChange = true;
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
            let key = event.key;
            let combineValue = this.tempValue + key;
            let regexpInput = this.fieldCreation.inputPattern;
            if (typeof (this.fieldCreation.inputPattern) == "string") {
                regexpInput = new RegExp(this.fieldCreation.inputPattern);
            }
            if (String(key).match(regexpInput)) {
                return true;
            }
            return false;
        }
        return true;
    }
    processBlur(event, action, dataIndex) {
        let validate = true;
        let calendarRef = this.calendarVC.toArray();
        calendarRef[this.calendarIndex].closeCalendar();
        if (this.haveChange) {
            let regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)) {
                event.target.focus();
                validate = false;
            }
            else {
                if (this.fieldCreation.inputDatePattern) {
                    let dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].display.split(/(-|\s|\/)/);
                    let patternSplit = this.fieldCreation.inputDatePattern.toLowerCase().split(/(-|\s|\/)/);
                    let year = 0;
                    let month = 0;
                    let day = 0;
                    for (let dataTypeIndex in patternSplit) {
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
                    let dateCheck = new Date(year, month, day);
                    let dateString = dateCheck.getFullYear() + "-" + (dateCheck.getMonth() + 1) + "-" + dateCheck.getDate();
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
    }
    processCall(data) {
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
    setDate(event, dataIndex) {
        let dateString = event.year + '-' + this.pad((event.month + 1), 2) + '-' + this.pad(event.day, 2);
        this.data[this.fieldCreation.fieldName][dataIndex] = {
            display: dateString,
            value: dateString
        };
        if (this.fieldCreation.displayFormat) {
            this.setDisplay(dataIndex);
        }
    }
    setDisplay(dataIndex) {
        let dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].value.split("-");
        let dateSet = {
            year: parseInt(dataSplit[0]),
            month: (parseInt(dataSplit[1]) - 1),
            day: parseInt(dataSplit[2]),
        };
        let dateString = this.fieldCreation.displayFormat;
        let valueString = dateSet.year + '-' + this.pad((dateSet.month + 1), 2) + '-' + this.pad(dateSet.day, 2);
        if (dateString.indexOf("DD") > -1) {
            let stringDD = this.pad(dateSet.day, 2);
            dateString = dateString.replace("DD", stringDD);
        }
        else if (dateString.indexOf("D") > -1) {
            let stringD = String(dateSet.day);
            dateString = dateString.replace("D", stringD);
        }
        if (dateString.indexOf("MMMM") > -1) {
            let stringMMMM = this.fieldCreation.monthListLong[dateSet.month];
            dateString = dateString.replace("MMMM", stringMMMM);
        }
        else if (dateString.indexOf("MMM") > -1) {
            let stringMMM = this.fieldCreation.monthListShort[dateSet.month];
            dateString = dateString.replace("MMM", stringMMM);
        }
        else if (dateString.indexOf("MM") > -1) {
            let stringMM = this.pad((dateSet.month + 1), 2);
            dateString = dateString.replace("MM", stringMM);
        }
        else if (dateString.indexOf("M") > -1) {
            let stringM = String(dateSet.month + 1);
            dateString = dateString.replace("M", stringM);
        }
        if (dateString.indexOf("YYYY") > -1) {
            let stringYYYY = String(dateSet.year + this.fieldCreation.yearOffset);
            dateString = dateString.replace("YYYY", stringYYYY);
        }
        else if (dateString.indexOf("YY") > -1) {
            let stringYY = String(dateSet.year + this.fieldCreation.yearOffset).substr(2, 2);
            dateString = dateString.replace("YY", stringYY);
        }
        this.data[this.fieldCreation.fieldName][dataIndex] = {
            display: dateString,
            value: valueString
        };
    }
    pad(n, width, z = '0') {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    getDateDisable() {
        if (this.getDisable() ||
            (((this.fieldCreation.yearOffset && this.fieldCreation.yearOffset != 0) ||
                (this.fieldCreation.displayFormat && this.fieldCreation.displayFormat != "YYYY-MM-DD")) &&
                (!this.fieldCreation.valuePattern || !this.fieldCreation.inputDatePattern))) {
            return true;
        }
        return false;
    }
    setFocus(data) {
        let inputRef = this.dateInputVC.toArray();
        inputRef[this.calendarIndex].nativeElement.focus();
    }
    openCalendar(data, index) {
        this.calendarIndex = index;
        let calendarRef = this.calendarVC.toArray();
        let inputRef = this.dateInputVC.toArray();
        calendarRef[index].open(data);
        inputRef[index].nativeElement.focus();
    }
};
DateComponent.ctorParameters = () => [
    { type: AnimationService }
];
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
export { DateComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2RhdGUvZGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFhLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3SCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxtREFBbUQsQ0FBQztBQUMzRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQU9wRSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsd0JBQXdCO0lBbUIxRCxZQUFZLGdCQUFtQztRQUM5QyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQVpmLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3Qyx5QkFBb0IsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbEosMEJBQXFCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdHLG1CQUFjLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUss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MUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3RDLENBQUM7Q0FDRCxDQUFBOztZQTNRK0IsZ0JBQWdCOztBQWxCcEI7SUFBMUIsWUFBWSxDQUFDLFdBQVcsQ0FBQzs4QkFBZSxTQUFTO2tEQUFhO0FBQ25DO0lBQTNCLFlBQVksQ0FBQyxZQUFZLENBQUM7OEJBQWMsU0FBUztpREFBc0I7QUFDL0Q7SUFBUixLQUFLLEVBQUU7OzJDQUFNO0FBQ0w7SUFBUixLQUFLLEVBQUU7OzZDQUFRO0FBQ1A7SUFBUixLQUFLLEVBQUU7O29EQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7O2lEQUFZO0FBQ1g7SUFBUixLQUFLLEVBQUU7OytDQUFVO0FBQ1I7SUFBVCxNQUFNLEVBQUU7OytDQUErQjtBQUM5QjtJQUFULE1BQU0sRUFBRTs7b0RBQW9DO0FBVGpDLGFBQWE7SUFIekIsU0FBUyxDQUFDO1FBQ1YsMHRIQUFvQztLQUNwQyxDQUFDO3FDQW9COEIsZ0JBQWdCO0dBbkJuQyxhQUFhLENBOFJ6QjtTQTlSWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEeW5hbWljQmVoYXZpb3JDb21wb25lbnR9IGZyb20gJy4uLy4uL2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnQnO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGVQaWNrZXJDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50JztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHR0ZW1wbGF0ZVVybDogJy4vZGF0ZS5jb21wb25lbnQuaHRtbCcsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRlQ29tcG9uZW50IGV4dGVuZHMgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRAVmlld0NoaWxkcmVuKCdkYXRlSW5wdXQnKSBkYXRlSW5wdXRWQyA6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHRAVmlld0NoaWxkcmVuKCdkYXRlUGlja2VyJykgY2FsZW5kYXJWQyA6IFF1ZXJ5TGlzdDxEYXRlUGlja2VyQ29tcG9uZW50PjtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcblx0QElucHV0KCkgcm93SW5kZXg7XHJcblx0QE91dHB1dCgpIGNhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdGRlZmF1bHRNb250aExpc3RMb25nID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XHJcblx0ZGVmYXVsdE1vbnRoTGlzdFNob3J0ID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xyXG5cdGRlZmF1bHRXZWVrRGF5ID0gW1wiU3VuXCIsIFwiTW9uXCIsIFwiVGh1XCIsIFwiV2VkXCIsIFwiVHVlXCIsIFwiRnJpXCIsIFwiU2F0XCJdO1xyXG5cdGNvbHVtbkNhbGN1bGF0ZSA9ICcnO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRjYWxlbmRhckluZGV4ID0gMDtcclxuXHR0ZW1wVmFsdWU7XHJcblx0aGF2ZUNoYW5nZSA9IGZhbHNlO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKGFuaW1hdGlvblNlcnZpY2UgOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcblx0XHRzdXBlcihhbmltYXRpb25TZXJ2aWNlKTtcclxuXHRcdHRoaXMuYW5pbWF0ZVByb2Nlc3MoKTtcclxuXHR9XHJcblx0XHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLm1vbnRoTGlzdExvbmcgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLmZpZWxkQ3JlYXRpb24ubW9udGhMaXN0TG9uZyA9IHRoaXMuZGVmYXVsdE1vbnRoTGlzdExvbmdcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24ubW9udGhMaXN0U2hvcnQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLmZpZWxkQ3JlYXRpb24ubW9udGhMaXN0U2hvcnQgPSB0aGlzLmRlZmF1bHRNb250aExpc3RTaG9ydFxyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi53ZWVrRGF5ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5maWVsZENyZWF0aW9uLndlZWtEYXkgPSB0aGlzLmRlZmF1bHRXZWVrRGF5XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLnllYXJPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLmZpZWxkQ3JlYXRpb24ueWVhck9mZnNldCA9IDBcclxuXHRcdH1cclxuXHRcdHN3aXRjaCAodGhpcy5maWVsZENyZWF0aW9uLmNvbHVtblBlckxpbmUpIHtcclxuXHRcdFx0Y2FzZSAxIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wxJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAyIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wyJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAzIDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2wzJztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSA0IDpcclxuXHRcdFx0XHR0aGlzLmNvbHVtbkNhbGN1bGF0ZSA9ICdkcDJDb2w0JztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdCA6XHJcblx0XHRcdFx0dGhpcy5jb2x1bW5DYWxjdWxhdGUgPSAnJztcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5tb2RlID09ICdhZGQnKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgKHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZmllbGRDcmVhdGlvbi5kZWZhdWx0KSkge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5maWVsZENyZWF0aW9uLmRlZmF1bHQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mICh0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdCkgPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFt0aGlzLmZpZWxkQ3JlYXRpb24uZGVmYXVsdF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXSA9IFt7XHJcblx0XHRcdFx0XHRkaXNwbGF5OlwiXCIsXHJcblx0XHRcdFx0XHR2YWx1ZTpcIlwiXHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvciAobGV0IGRhdGFJbmRleCBpbiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pIHtcclxuXHRcdFx0aWYgKFN0cmluZyh0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS52YWx1ZSkubWF0Y2goLyhbMTJdXFxkezN9LSgwWzEtOV18MVswLTJdKS0oMFsxLTldfFsxMl1cXGR8M1swMV0pKS8pKSB7XHJcblx0XHRcdFx0dGhpcy5zZXREaXNwbGF5KGRhdGFJbmRleCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0YWRkTXVsdGlWYWwoKSB7XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV0ucHVzaCh7XHJcblx0XHRcdGRpc3BsYXk6XCJcIixcclxuXHRcdFx0dmFsdWU6XCJcIlxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdGRlbGV0ZU11bHRpVmFsKGRhdGFJbmRleCkge1xyXG5cdFx0aWYgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXS5zcGxpY2UoZGF0YUluZGV4LCAxKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc0tleVVwKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdGZpZWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZSxcclxuXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdXHJcblx0XHR9KTtcclxuXHRcdGlmIChldmVudC5jdHJsS2V5ID09IHRydWUgJiYgKGV2ZW50LmNoYXJDb2RlID09IDg2IHx8IGV2ZW50LndoaWNoID09IDg2KSkge1xyXG5cdFx0XHRsZXQgcmVnZXhwID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVyblxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZWdleHAgPSBuZXcgUmVnRXhwKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChTdHJpbmcodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0pLm1hdGNoKHJlZ2V4cCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IHRoaXMudGVtcFZhbHVlO1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NLZXlEb3duKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0dGhpcy50ZW1wVmFsdWUgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XTtcclxuXHRcdHRoaXMuaGF2ZUNoYW5nZSA9IHRydWU7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzQ2FsbEJhY2tLZXlQcmVzcyhldmVudCwgYWN0aW9uLCBkYXRhSW5kZXgpIHtcclxuXHRcdHRoaXMuY2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGV2ZW50OiBldmVudCxcclxuXHRcdFx0YWN0aW9uOiBhY3Rpb24sXHJcblx0XHRcdGRhdGFJbmRleDogZGF0YUluZGV4LFxyXG5cdFx0XHRmaWVsZE5hbWU6IHRoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWUsXHJcblx0XHRcdHZhbHVlOiB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoZXZlbnQua2V5Q29kZSAhPSA0NiAmJiBldmVudC5rZXlDb2RlICE9IDggJiYgZXZlbnQuY3RybEtleSAhPSB0cnVlICYmIGV2ZW50LmFsdEtleSAhPSB0cnVlKSB7XHJcblx0XHRcdGxldCBrZXkgPSBldmVudC5rZXk7XHJcblx0XHRcdGxldCBjb21iaW5lVmFsdWUgPSB0aGlzLnRlbXBWYWx1ZSArIGtleTtcclxuXHRcdFx0bGV0IHJlZ2V4cElucHV0ID0gdGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVyblxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi5pbnB1dFBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZWdleHBJbnB1dCA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLmlucHV0UGF0dGVybik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKFN0cmluZyhrZXkpLm1hdGNoKHJlZ2V4cElucHV0KSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NCbHVyKGV2ZW50LCBhY3Rpb24sIGRhdGFJbmRleCkge1xyXG5cdFx0bGV0IHZhbGlkYXRlID0gdHJ1ZTtcclxuXHRcdGxldCBjYWxlbmRhclJlZiA9IHRoaXMuY2FsZW5kYXJWQy50b0FycmF5KCk7XHJcblx0XHRjYWxlbmRhclJlZlt0aGlzLmNhbGVuZGFySW5kZXhdLmNsb3NlQ2FsZW5kYXIoKTtcclxuXHRcdGlmICh0aGlzLmhhdmVDaGFuZ2UpIHtcclxuXHRcdFx0bGV0IHJlZ2V4cFZhbHVlID0gdGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVyblxyXG5cdFx0XHRpZiAodHlwZW9mKHRoaXMuZmllbGRDcmVhdGlvbi52YWx1ZVBhdHRlcm4pID09IFwic3RyaW5nXCIpIHtcclxuXHRcdFx0XHRyZWdleHBWYWx1ZSA9IG5ldyBSZWdFeHAodGhpcy5maWVsZENyZWF0aW9uLnZhbHVlUGF0dGVybik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFTdHJpbmcodGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0uZGlzcGxheSkubWF0Y2gocmVnZXhwVmFsdWUpKSB7XHJcblx0XHRcdFx0ZXZlbnQudGFyZ2V0LmZvY3VzKCk7XHJcblx0XHRcdFx0dmFsaWRhdGUgPSBmYWxzZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmlucHV0RGF0ZVBhdHRlcm4pIHtcclxuXHRcdFx0XHRcdGxldCBkYXRhU3BsaXQgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5LnNwbGl0KC8oLXxcXHN8XFwvKS8pXHJcblx0XHRcdFx0XHRsZXQgcGF0dGVyblNwbGl0ID0gdGhpcy5maWVsZENyZWF0aW9uLmlucHV0RGF0ZVBhdHRlcm4udG9Mb3dlckNhc2UoKS5zcGxpdCgvKC18XFxzfFxcLykvKVxyXG5cdFx0XHRcdFx0bGV0IHllYXIgPSAwO1xyXG5cdFx0XHRcdFx0bGV0IG1vbnRoID0gMDtcclxuXHRcdFx0XHRcdGxldCBkYXkgPSAwO1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgZGF0YVR5cGVJbmRleCBpbiBwYXR0ZXJuU3BsaXQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHBhdHRlcm5TcGxpdFtkYXRhVHlwZUluZGV4XS5zdWJzdHIoMCwxKSA9PT0gXCJ5XCIpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5maWVsZENyZWF0aW9uLmlucHV0WWVhck9mZnNldCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0eWVhciA9IHBhcnNlSW50KGRhdGFTcGxpdFtkYXRhVHlwZUluZGV4XSkgKyBwYXJzZUludCh0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXRZZWFyT2Zmc2V0KTtcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0eWVhciA9IHBhcnNlSW50KGRhdGFTcGxpdFtkYXRhVHlwZUluZGV4XSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKHBhdHRlcm5TcGxpdFtkYXRhVHlwZUluZGV4XS5zdWJzdHIoMCwxKSA9PT0gXCJtXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRtb250aCA9IHBhcnNlSW50KGRhdGFTcGxpdFtkYXRhVHlwZUluZGV4XSkgLSAxO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChwYXR0ZXJuU3BsaXRbZGF0YVR5cGVJbmRleF0uc3Vic3RyKDAsMSkgPT09IFwiZFwiKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGF5ID0gcGFyc2VJbnQoZGF0YVNwbGl0W2RhdGFUeXBlSW5kZXhdKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0bGV0IGRhdGVDaGVjayA9IG5ldyBEYXRlKHllYXIsbW9udGgsZGF5KTtcclxuXHRcdFx0XHRcdGxldCBkYXRlU3RyaW5nID0gZGF0ZUNoZWNrLmdldEZ1bGxZZWFyKCkrXCItXCIrKGRhdGVDaGVjay5nZXRNb250aCgpKzEpK1wiLVwiK2RhdGVDaGVjay5nZXREYXRlKClcclxuXHRcdFx0XHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdLnZhbHVlID0gZGF0ZVN0cmluZztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF0udmFsdWUgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS5kaXNwbGF5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuc2V0RGlzcGxheShkYXRhSW5kZXgpXHJcblx0XHRcdFx0dGhpcy5oYXZlQ2hhbmdlID0gZmFsc2VcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZXZlbnQ6IGV2ZW50LFxyXG5cdFx0XHRhY3Rpb246IGFjdGlvbixcclxuXHRcdFx0ZGF0YUluZGV4OiBkYXRhSW5kZXgsXHJcblx0XHRcdHZhbGlkYXRlU3RhdHVzOiB2YWxpZGF0ZSxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzQ2FsbChkYXRhKSB7XHJcblx0XHJcblx0fVxyXG5cdFxyXG5cdHByb2Nlc3NQYW5lbENhbGxCYWNrKGV2ZW50KSB7XHJcblx0XHR0aGlzLnBhbmVsQ2FsbEJhY2suZW1pdCh7XHJcblx0XHRcdGZlaWxkTmFtZTogdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cdFxyXG5cdHNldERhdGUoZXZlbnQsZGF0YUluZGV4KSB7XHJcblx0XHRsZXQgZGF0ZVN0cmluZyA9IGV2ZW50LnllYXIgKyAnLScgKyB0aGlzLnBhZCgoZXZlbnQubW9udGggKyAxKSwyKSArICctJyArIHRoaXMucGFkKGV2ZW50LmRheSwyKTtcclxuXHRcdHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhSW5kZXhdID0ge1xyXG5cdFx0XHRkaXNwbGF5OiBkYXRlU3RyaW5nLFxyXG5cdFx0XHR2YWx1ZTogZGF0ZVN0cmluZ1xyXG5cdFx0fTtcclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24uZGlzcGxheUZvcm1hdCkge1xyXG5cdFx0XHR0aGlzLnNldERpc3BsYXkoZGF0YUluZGV4KTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2V0RGlzcGxheShkYXRhSW5kZXgpIHtcclxuXHRcdGxldCBkYXRhU3BsaXQgPSB0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XS52YWx1ZS5zcGxpdChcIi1cIik7XHJcblx0XHRsZXQgZGF0ZVNldCA9IHtcclxuXHRcdFx0eWVhcjogcGFyc2VJbnQoZGF0YVNwbGl0WzBdKSxcclxuXHRcdFx0bW9udGg6IChwYXJzZUludChkYXRhU3BsaXRbMV0pLTEpLFxyXG5cdFx0XHRkYXk6IHBhcnNlSW50KGRhdGFTcGxpdFsyXSksXHJcblx0XHR9XHJcblx0XHRsZXQgZGF0ZVN0cmluZyA9IHRoaXMuZmllbGRDcmVhdGlvbi5kaXNwbGF5Rm9ybWF0O1xyXG5cdFx0bGV0IHZhbHVlU3RyaW5nID0gZGF0ZVNldC55ZWFyICsgJy0nICsgdGhpcy5wYWQoKGRhdGVTZXQubW9udGggKyAxKSwyKSArICctJyArIHRoaXMucGFkKGRhdGVTZXQuZGF5LDIpO1xyXG5cdFx0aWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIkREXCIpID4gLTEpIHtcclxuXHRcdFx0bGV0IHN0cmluZ0REID0gdGhpcy5wYWQoZGF0ZVNldC5kYXksMik7XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJERFwiLCBzdHJpbmdERCk7XHJcblx0XHR9IGVsc2UgaWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIkRcIikgPiAtMSkge1xyXG5cdFx0XHRsZXQgc3RyaW5nRCA9IFN0cmluZyhkYXRlU2V0LmRheSk7XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJEXCIsIHN0cmluZ0QpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIk1NTU1cIikgPiAtMSkge1xyXG5cdFx0XHRsZXQgc3RyaW5nTU1NTSA9IHRoaXMuZmllbGRDcmVhdGlvbi5tb250aExpc3RMb25nW2RhdGVTZXQubW9udGhdO1xyXG5cdFx0XHRkYXRlU3RyaW5nID0gZGF0ZVN0cmluZy5yZXBsYWNlKFwiTU1NTVwiLCBzdHJpbmdNTU1NKTtcclxuXHRcdH0gZWxzZSBpZiAoZGF0ZVN0cmluZy5pbmRleE9mKFwiTU1NXCIpID4gLTEpIHtcclxuXHRcdFx0bGV0IHN0cmluZ01NTSA9IHRoaXMuZmllbGRDcmVhdGlvbi5tb250aExpc3RTaG9ydFtkYXRlU2V0Lm1vbnRoXTtcclxuXHRcdFx0ZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcucmVwbGFjZShcIk1NTVwiLCBzdHJpbmdNTU0pO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRlU3RyaW5nLmluZGV4T2YoXCJNTVwiKSA+IC0xKSB7XHJcblx0XHRcdGxldCBzdHJpbmdNTSA9IHRoaXMucGFkKChkYXRlU2V0Lm1vbnRoICsgMSksMik7XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJNTVwiLCBzdHJpbmdNTSk7XHJcblx0XHR9IGVsc2UgaWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIk1cIikgPiAtMSkge1xyXG5cdFx0XHRsZXQgc3RyaW5nTSA9IFN0cmluZyhkYXRlU2V0Lm1vbnRoICsgMSk7XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJNXCIsIHN0cmluZ00pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGRhdGVTdHJpbmcuaW5kZXhPZihcIllZWVlcIikgPiAtMSkge1xyXG5cdFx0XHRsZXQgc3RyaW5nWVlZWSA9IFN0cmluZyhkYXRlU2V0LnllYXIgKyB0aGlzLmZpZWxkQ3JlYXRpb24ueWVhck9mZnNldCk7XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJZWVlZXCIsIHN0cmluZ1lZWVkpO1xyXG5cdFx0fSBlbHNlIGlmIChkYXRlU3RyaW5nLmluZGV4T2YoXCJZWVwiKSA+IC0xKSB7XHJcblx0XHRcdGxldCBzdHJpbmdZWSA9IFN0cmluZyhkYXRlU2V0LnllYXIgKyB0aGlzLmZpZWxkQ3JlYXRpb24ueWVhck9mZnNldCkuc3Vic3RyKDIsMik7XHJcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoXCJZWVwiLCBzdHJpbmdZWSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmRhdGFbdGhpcy5maWVsZENyZWF0aW9uLmZpZWxkTmFtZV1bZGF0YUluZGV4XSA9IHtcclxuXHRcdFx0ZGlzcGxheTogZGF0ZVN0cmluZyxcclxuXHRcdFx0dmFsdWU6IHZhbHVlU3RyaW5nXHJcblx0XHR9O1xyXG5cdH1cclxuXHRwYWQobiwgd2lkdGgsIHo9JzAnKSB7XHJcblx0XHRuID0gbiArICcnO1xyXG5cdFx0cmV0dXJuIG4ubGVuZ3RoID49IHdpZHRoID8gbiA6IG5ldyBBcnJheSh3aWR0aCAtIG4ubGVuZ3RoICsgMSkuam9pbih6KSArIG47XHJcblx0fVxyXG5cdGdldERhdGVEaXNhYmxlKCkge1xyXG5cdFx0aWYgKHRoaXMuZ2V0RGlzYWJsZSgpIHx8XHJcblx0XHRcdCgoKHRoaXMuZmllbGRDcmVhdGlvbi55ZWFyT2Zmc2V0ICYmIHRoaXMuZmllbGRDcmVhdGlvbi55ZWFyT2Zmc2V0ICE9IDApIHx8XHJcblx0XHRcdCh0aGlzLmZpZWxkQ3JlYXRpb24uZGlzcGxheUZvcm1hdCAmJiB0aGlzLmZpZWxkQ3JlYXRpb24uZGlzcGxheUZvcm1hdCAhPSBcIllZWVktTU0tRERcIikpICYmXHJcblx0XHRcdFx0KCF0aGlzLmZpZWxkQ3JlYXRpb24udmFsdWVQYXR0ZXJuIHx8ICF0aGlzLmZpZWxkQ3JlYXRpb24uaW5wdXREYXRlUGF0dGVybikpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRzZXRGb2N1cyhkYXRhKSB7XHJcblx0XHRsZXQgaW5wdXRSZWYgPSB0aGlzLmRhdGVJbnB1dFZDLnRvQXJyYXkoKTtcclxuXHRcdGlucHV0UmVmW3RoaXMuY2FsZW5kYXJJbmRleF0ubmF0aXZlRWxlbWVudC5mb2N1cygpXHJcblx0fVxyXG5cdG9wZW5DYWxlbmRhcihkYXRhLGluZGV4KSB7XHJcblx0XHR0aGlzLmNhbGVuZGFySW5kZXggPSBpbmRleFxyXG5cdFx0bGV0IGNhbGVuZGFyUmVmID0gdGhpcy5jYWxlbmRhclZDLnRvQXJyYXkoKTtcclxuXHRcdGxldCBpbnB1dFJlZiA9IHRoaXMuZGF0ZUlucHV0VkMudG9BcnJheSgpO1xyXG5cdFx0Y2FsZW5kYXJSZWZbaW5kZXhdLm9wZW4oZGF0YSk7XHJcblx0XHRpbnB1dFJlZltpbmRleF0ubmF0aXZlRWxlbWVudC5mb2N1cygpXHJcblx0fVxyXG59XHJcbiJdfQ==