import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeInOutAnimation } from '../../../content-popup/animetion';
export class DatePickerComponent {
    constructor() {
        this.showToday = false;
        this.todayText = "Today";
        this.closeOnDateSelect = false;
        this.setDate = new EventEmitter();
        this.inputFocus = new EventEmitter();
        this.onfocus = false;
        this.showPanel = false;
        this.objKeys = Object.keys;
        this.month = 0;
        this.year = 1999;
        this.yearListGen = 0;
        this.dateList = [];
        this.yearList = [];
        this.currentDate = {
            year: 0,
            month: 0,
            day: 0
        };
        this.selectedDate = {
            year: 0,
            month: 0,
            day: 0
        };
        this.showDate = true;
        this.showYear = false;
        this.showMonth = false;
        this.animationState = 'out';
    }
    ngOnInit() {
        let currentDateVal = new Date();
        this.currentDate.day = currentDateVal.getDate();
        this.currentDate.month = currentDateVal.getMonth();
        this.currentDate.year = currentDateVal.getFullYear();
        this.selectedDate = this.currentDate;
        this.month = this.currentDate.month;
        this.year = this.currentDate.year;
        this.generateDateList();
        this.generateYearList();
    }
    generateDateList() {
        this.dateList = [];
        let firstDateOfMonth = new Date(this.year, this.month, 1);
        let lastDateOfMonth = new Date(this.year, this.month + 1, 0);
        let dayOfWeek = firstDateOfMonth.getDay();
        let startDate = firstDateOfMonth.getDate();
        let endDate = lastDateOfMonth.getDate();
        let dateRow = [];
        let dayCount = dayOfWeek;
        for (let i = startDate; i <= endDate; i++) {
            let dateForCal = new Date(this.year, this.month, i);
            dateRow.push({
                day: i,
                month: this.month,
                year: this.year,
                weekDay: dateForCal.getDay()
            });
            if (dayCount == 6 || i == endDate || (this.dateList.length < 5 && i == endDate && dateRow.length == 7)) {
                if (this.dateList.length < 5 && i == endDate && dateRow.length == 7) {
                    this.dateList.push(dateRow);
                    dateRow = [];
                }
                if (i == endDate && dateRow.length < 7) {
                    let nextMonthDate = new Date(this.year, this.month, endDate + 1);
                    let nextDate = nextMonthDate.getDate();
                    let nextMonth = nextMonthDate.getMonth();
                    let nextYear = nextMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.push({
                            day: nextDate,
                            month: nextMonth,
                            year: nextYear
                        });
                        if (dateRow.length == 7 && this.dateList.length < 5) {
                            this.dateList.push(dateRow);
                            dateRow = [];
                        }
                        nextDate++;
                    }
                }
                if (this.dateList.length == 0 && dateRow.length < 7) {
                    let prevMonthDate = new Date(this.year, this.month, 0);
                    let prevDate = prevMonthDate.getDate();
                    let prevMonth = prevMonthDate.getMonth();
                    let prevYear = prevMonthDate.getFullYear();
                    while (dateRow.length < 7) {
                        dateRow.unshift({
                            day: prevDate,
                            month: prevMonth,
                            year: prevYear
                        });
                        prevDate--;
                    }
                }
                this.dateList.push(dateRow);
                dateRow = [];
                dayCount = 0;
            }
            else {
                dayCount++;
            }
        }
    }
    actionPrev() {
        if (this.month == 0) {
            this.year--;
            this.month = 11;
        }
        else {
            this.month--;
        }
        this.generateDateList();
    }
    actionNext() {
        if (this.month == 11) {
            this.year++;
            this.month = 0;
        }
        else {
            this.month++;
        }
        this.generateDateList();
    }
    generateYearList() {
        if (this.yearListGen == 0) {
            this.yearListGen = this.year;
        }
        let startYear = this.yearListGen - 10;
        let endYear = this.yearListGen + 10;
        this.yearList = [];
        for (let i = startYear; i <= endYear; i++) {
            this.yearList.push(i);
        }
    }
    actionPrevYear() {
        this.yearListGen = this.yearListGen - 20;
        this.generateYearList();
    }
    actionNextYear() {
        this.yearListGen = this.yearListGen + 20;
        this.generateYearList();
    }
    actionYearSelect() {
        this.showDate = false;
        this.showMonth = false;
        this.showYear = true;
    }
    selectYear(year) {
        this.year = parseInt(year);
        this.showYear = false;
        this.showMonth = true;
    }
    selectMonth(month) {
        this.month = parseInt(month);
        this.generateDateList();
        this.showMonth = false;
        this.showDate = true;
    }
    selectDate(date) {
        this.selectedDate = date;
        this.setDate.emit(this.selectedDate);
        if (this.closeOnDateSelect) {
            this.open(date);
        }
    }
    open(dateSelected = null) {
        if (String(dateSelected).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
            let dateSplit = String(dateSelected).split("-");
            let dateObj = {
                day: parseInt(dateSplit[2]),
                month: parseInt(dateSplit[1]) - 1,
                year: parseInt(dateSplit[0])
            };
            this.selectedDate = dateObj;
            this.month = parseInt(dateSplit[1]) - 1;
            this.year = parseInt(dateSplit[0]);
            this.generateDateList();
        }
        if (this.showPanel) {
            this.showPanel = false;
            this.animationState = 'out';
        }
        else {
            this.showPanel = true;
            this.animationState = 'in';
        }
    }
    selectToday() {
        // const today = this.currentDate.year+"-"+this.currentDate.month+"-"+this.currentDate.day;
        this.selectDate(this.currentDate);
    }
    closeCalendar() {
        if (this.showPanel && this.onfocus == false) {
            this.showPanel = false;
            this.animationState = 'out';
        }
    }
    setInputFocus() {
        this.onfocus = false;
        this.inputFocus.emit();
    }
    setCalendarFocus() {
        this.onfocus = true;
    }
}
DatePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-date-picker',
                template: "<div class=\"datePickerPanel\" [@fadeInOut]=\"animationState\" (mouseleave)=\"setInputFocus()\" (mouseenter)=\"setCalendarFocus()\">\r\n  <div class=\"datePickerAlign\">\r\n    <div class=\"monthYearPanel\">\r\n      <div class=\"monthYearDisplay\">\r\n        <div class=\"monthYearAction\" (click)=\"actionYearSelect()\">{{monthListLong[month]}} {{(year + yearOffset)}} <span class=\"glyphicon glyphicon-collapse-down\"></span></div>\r\n        <div class=\"prev\" (click)=\"actionPrev()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n        <div class=\"next\" (click)=\"actionNext()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dateTablePanel {{showDate ? 'showPanel':'hidePanel'}}\">\r\n      <table class=\"dateTable\">\r\n        <tr>\r\n          <th *ngFor=\"let day of weekDay\">\r\n            {{day}}\r\n          </th>\r\n        </tr>\r\n        <ng-container *ngFor=\"let dateRow of dateList\">\r\n          <tr>\r\n            <td *ngFor=\"let date of dateRow\">\r\n              <div class=\"dateBtn{{month != date.month? ' otherMonth' : ''}} {{date.day == currentDate.day && date.year == currentDate.year && date.month == currentDate.month ? 'dateCurrent':'dateNormal'}}{{date.weekDay == '0' ? ' dateSun':''}}{{date.weekDay == '6' ? ' dateSat':''}}\" (click)=\"selectDate(date)\">\r\n                <div class=\"{{date.day == selectedDate.day && date.year == selectedDate.year && date.month == selectedDate.month ? 'selected':''}}\" [innerHTML]=\"date.day\"></div>\r\n              </div>\r\n            </td>\r\n          </tr>\r\n        </ng-container>\r\n      </table>\r\n    </div>\r\n    <div class=\"monthTablePanel {{showMonth ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let monthNameIndex of objKeys(monthListLong)\" class=\"monthBtn\" (click)=\"selectMonth(monthNameIndex)\">{{monthListLong[monthNameIndex]}}</div>\r\n    </div>\r\n    <div class=\"yearTablePanel {{showYear ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let year of yearList\" class=\"yearBtn\" (click)=\"selectYear(year)\">{{year + yearOffset}}</div>\r\n      <div class=\"prevYear\" (click)=\"actionPrevYear()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n      <div class=\"nextYear\" (click)=\"actionNextYear()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n    </div>\r\n    <div *ngIf=\"showToday\" class=\"todayPanel\">\r\n      <div class=\"todayBtn\" [innerHTML]=\"todayText\" (click)=\"selectToday()\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                animations: [FadeInOutAnimation]
            },] }
];
DatePickerComponent.ctorParameters = () => [];
DatePickerComponent.propDecorators = {
    monthListLong: [{ type: Input }],
    monthListShort: [{ type: Input }],
    weekDay: [{ type: Input }],
    yearOffset: [{ type: Input }],
    showToday: [{ type: Input }],
    todayText: [{ type: Input }],
    closeOnDateSelect: [{ type: Input }],
    setDate: [{ type: Output }],
    inputFocus: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2RhdGUvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFPcEUsTUFBTSxPQUFPLG1CQUFtQjtJQWdDL0I7UUEzQlMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUN6QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGdCQUFXLEdBQUc7WUFDYixJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsR0FBRyxFQUFFLENBQUM7U0FDTixDQUFDO1FBQ0YsaUJBQVksR0FBRztZQUNkLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixHQUFHLEVB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QVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDRixDQUFDO0lBQ0QsV0FBVztRQUNWLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsYUFBYTtRQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssRUFBRTtZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNGLENBQUM7SUFDRCxhQUFhO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7O1lBOU5ELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix3a0ZBQTJDO2dCQUMzQyxVQUFVLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQzthQUNoQzs7Ozs0QkFFQyxLQUFLOzZCQUNMLEtBQUs7c0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztnQ0FDTCxLQUFLO3NCQUNMLE1BQU07eUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RmFkZUluT3V0QW5pbWF0aW9ufSBmcm9tICcuLi8uLi8uLi9jb250ZW50LXBvcHVwL2FuaW1ldGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS1kYXRlLXBpY2tlcicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuXHRhbmltYXRpb25zOiBbRmFkZUluT3V0QW5pbWF0aW9uXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgbW9udGhMaXN0TG9uZztcclxuXHRASW5wdXQoKSBtb250aExpc3RTaG9ydDtcclxuXHRASW5wdXQoKSB3ZWVrRGF5O1xyXG5cdEBJbnB1dCgpIHllYXJPZmZzZXQ7XHJcblx0QElucHV0KCkgc2hvd1RvZGF5ID0gZmFsc2U7XHJcblx0QElucHV0KCkgdG9kYXlUZXh0ID0gXCJUb2RheVwiO1xyXG5cdEBJbnB1dCgpIGNsb3NlT25EYXRlU2VsZWN0ID0gZmFsc2U7XHJcblx0QE91dHB1dCgpIHNldERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIGlucHV0Rm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0b25mb2N1cyA9IGZhbHNlO1xyXG5cdHNob3dQYW5lbCA9IGZhbHNlO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRtb250aCA9IDA7XHJcblx0eWVhciA9IDE5OTk7XHJcblx0eWVhckxpc3RHZW4gPSAwO1xyXG5cdGRhdGVMaXN0ID0gW107XHJcblx0eWVhckxpc3QgPSBbXTtcclxuXHRjdXJyZW50RGF0ZSA9IHtcclxuXHRcdHllYXI6IDAsXHJcblx0XHRtb250aDogMCxcclxuXHRcdGRheTogMFxyXG5cdH07XHJcblx0c2VsZWN0ZWREYXRlID0ge1xyXG5cdFx0eWVhcjogMCxcclxuXHRcdG1vbnRoOiAwLFxyXG5cdFx0ZGF5OiAwXHJcblx0fTtcclxuXHRzaG93RGF0ZSA9IHRydWU7XHJcblx0c2hvd1llYXIgPSBmYWxzZTtcclxuXHRzaG93TW9udGggPSBmYWxzZTtcclxuXHRhbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdH1cclxuXHRcclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdGxldCBjdXJyZW50RGF0ZVZhbCA9IG5ldyBEYXRlKCk7XHJcblx0XHR0aGlzLmN1cnJlbnREYXRlLmRheSA9IGN1cnJlbnREYXRlVmFsLmdldERhdGUoKTtcclxuXHRcdHRoaXMuY3VycmVudERhdGUubW9udGggPSBjdXJyZW50RGF0ZVZhbC5nZXRNb250aCgpO1xyXG5cdFx0dGhpcy5jdXJyZW50RGF0ZS55ZWFyID0gY3VycmVudERhdGVWYWwuZ2V0RnVsbFllYXIoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5jdXJyZW50RGF0ZTtcclxuXHRcdHRoaXMubW9udGggPSB0aGlzLmN1cnJlbnREYXRlLm1vbnRoO1xyXG5cdFx0dGhpcy55ZWFyID0gdGhpcy5jdXJyZW50RGF0ZS55ZWFyO1xyXG5cdFx0dGhpcy5nZW5lcmF0ZURhdGVMaXN0KCk7XHJcblx0XHR0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuXHR9XHJcblx0XHJcblx0Z2VuZXJhdGVEYXRlTGlzdCgpIHtcclxuXHRcdHRoaXMuZGF0ZUxpc3QgPSBbXTtcclxuXHRcdGxldCBmaXJzdERhdGVPZk1vbnRoID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAxKTtcclxuXHRcdGxldCBsYXN0RGF0ZU9mTW9udGggPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggKyAxLCAwKTtcclxuXHRcdGxldCBkYXlPZldlZWsgPSBmaXJzdERhdGVPZk1vbnRoLmdldERheSgpO1xyXG5cdFx0bGV0IHN0YXJ0RGF0ZSA9IGZpcnN0RGF0ZU9mTW9udGguZ2V0RGF0ZSgpO1xyXG5cdFx0bGV0IGVuZERhdGUgPSBsYXN0RGF0ZU9mTW9udGguZ2V0RGF0ZSgpO1xyXG5cdFx0bGV0IGRhdGVSb3cgPSBbXTtcclxuXHRcdGxldCBkYXlDb3VudCA9IGRheU9mV2VlaztcclxuXHRcdGZvciAobGV0IGkgPSBzdGFydERhdGU7IGkgPD0gZW5kRGF0ZTsgaSsrKSB7XHJcblx0XHRcdGxldCBkYXRlRm9yQ2FsID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCBpKTtcclxuXHRcdFx0ZGF0ZVJvdy5wdXNoKHtcclxuXHRcdFx0XHRkYXk6IGksXHJcblx0XHRcdFx0bW9udGg6IHRoaXMubW9udGgsXHJcblx0XHRcdFx0eWVhcjogdGhpcy55ZWFyLFxyXG5cdFx0XHRcdHdlZWtEYXk6IGRhdGVGb3JDYWwuZ2V0RGF5KClcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChkYXlDb3VudCA9PSA2IHx8IGkgPT0gZW5kRGF0ZSB8fCAodGhpcy5kYXRlTGlzdC5sZW5ndGggPCA1ICYmIGkgPT0gZW5kRGF0ZSAmJiBkYXRlUm93Lmxlbmd0aCA9PSA3KSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGVMaXN0Lmxlbmd0aCA8IDUgJiYgaSA9PSBlbmREYXRlICYmIGRhdGVSb3cubGVuZ3RoID09IDcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGF0ZUxpc3QucHVzaChkYXRlUm93KTtcclxuXHRcdFx0XHRcdGRhdGVSb3cgPSBbXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGkgPT0gZW5kRGF0ZSAmJiBkYXRlUm93Lmxlbmd0aCA8IDcpIHtcclxuXHRcdFx0XHRcdGxldCBuZXh0TW9udGhEYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCBlbmREYXRlICsgMSk7XHJcblx0XHRcdFx0XHRsZXQgbmV4dERhdGUgPSBuZXh0TW9udGhEYXRlLmdldERhdGUoKTtcclxuXHRcdFx0XHRcdGxldCBuZXh0TW9udGggPSBuZXh0TW9udGhEYXRlLmdldE1vbnRoKCk7XHJcblx0XHRcdFx0XHRsZXQgbmV4dFllYXIgPSBuZXh0TW9udGhEYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRcdFx0XHR3aGlsZSAoZGF0ZVJvdy5sZW5ndGggPCA3KSB7XHJcblx0XHRcdFx0XHRcdGRhdGVSb3cucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0XHRkYXk6IG5leHREYXRlLFxyXG5cdFx0XHRcdFx0XHRcdFx0bW9udGg6IG5leHRNb250aCxcclxuXHRcdFx0XHRcdFx0XHRcdHllYXI6IG5leHRZZWFyXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRpZiAoZGF0ZVJvdy5sZW5ndGggPT0gNyAmJiB0aGlzLmRhdGVMaXN0Lmxlbmd0aCA8IDUpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhdGVMaXN0LnB1c2goZGF0ZVJvdyk7XHJcblx0XHRcdFx0XHRcdFx0ZGF0ZVJvdyA9IFtdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG5leHREYXRlKys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGVMaXN0Lmxlbmd0aCA9PSAwICYmIGRhdGVSb3cubGVuZ3RoIDwgNykge1xyXG5cdFx0XHRcdFx0bGV0IHByZXZNb250aERhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIDApO1xyXG5cdFx0XHRcdFx0bGV0IHByZXZEYXRlID0gcHJldk1vbnRoRGF0ZS5nZXREYXRlKCk7XHJcblx0XHRcdFx0XHRsZXQgcHJldk1vbnRoID0gcHJldk1vbnRoRGF0ZS5nZXRNb250aCgpO1xyXG5cdFx0XHRcdFx0bGV0IHByZXZZZWFyID0gcHJldk1vbnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0XHRcdFx0d2hpbGUgKGRhdGVSb3cubGVuZ3RoIDwgNykge1xyXG5cdFx0XHRcdFx0XHRkYXRlUm93LnVuc2hpZnQoe1xyXG5cdFx0XHRcdFx0XHRcdGRheTogcHJldkRhdGUsXHJcblx0XHRcdFx0XHRcdFx0bW9udGg6IHByZXZNb250aCxcclxuXHRcdFx0XHRcdFx0XHR5ZWFyOiBwcmV2WWVhclxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0cHJldkRhdGUtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5kYXRlTGlzdC5wdXNoKGRhdGVSb3cpO1xyXG5cdFx0XHRcdGRhdGVSb3cgPSBbXTtcclxuXHRcdFx0XHRkYXlDb3VudCA9IDA7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGF5Q291bnQrKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRhY3Rpb25QcmV2KCkge1xyXG5cdFx0aWYgKHRoaXMubW9udGggPT0gMCkge1xyXG5cdFx0XHR0aGlzLnllYXItLTtcclxuXHRcdFx0dGhpcy5tb250aCA9IDExO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tb250aC0tO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5nZW5lcmF0ZURhdGVMaXN0KCk7XHJcblx0fVxyXG5cdFxyXG5cdGFjdGlvbk5leHQoKSB7XHJcblx0XHRpZiAodGhpcy5tb250aCA9PSAxMSkge1xyXG5cdFx0XHR0aGlzLnllYXIrKztcclxuXHRcdFx0dGhpcy5tb250aCA9IDA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1vbnRoKys7XHJcblx0XHR9XHJcblx0XHR0aGlzLmdlbmVyYXRlRGF0ZUxpc3QoKTtcclxuXHR9XHJcblx0XHJcblx0Z2VuZXJhdGVZZWFyTGlzdCgpIHtcclxuXHRcdGlmICh0aGlzLnllYXJMaXN0R2VuID09IDApIHtcclxuXHRcdFx0dGhpcy55ZWFyTGlzdEdlbiA9IHRoaXMueWVhcjtcclxuXHRcdH1cclxuXHRcdGxldCBzdGFydFllYXIgPSB0aGlzLnllYXJMaXN0R2VuIC0gMTA7XHJcblx0XHRsZXQgZW5kWWVhciA9IHRoaXMueWVhckxpc3RHZW4gKyAxMDtcclxuXHRcdHRoaXMueWVhckxpc3QgPSBbXTtcclxuXHRcdGZvciAobGV0IGkgPSBzdGFydFllYXI7IGkgPD0gZW5kWWVhcjsgaSsrKSB7XHJcblx0XHRcdHRoaXMueWVhckxpc3QucHVzaChpKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0YWN0aW9uUHJldlllYXIoKSB7XHJcblx0XHR0aGlzLnllYXJMaXN0R2VuID0gdGhpcy55ZWFyTGlzdEdlbiAtIDIwO1xyXG5cdFx0dGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XHJcblx0fVxyXG5cdFxyXG5cdGFjdGlvbk5leHRZZWFyKCkge1xyXG5cdFx0dGhpcy55ZWFyTGlzdEdlbiA9IHRoaXMueWVhckxpc3RHZW4gKyAyMDtcclxuXHRcdHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG5cdH1cclxuXHRcclxuXHRhY3Rpb25ZZWFyU2VsZWN0KCkge1xyXG5cdFx0dGhpcy5zaG93RGF0ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zaG93TW9udGggPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd1llYXIgPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZWxlY3RZZWFyKHllYXIpIHtcclxuXHRcdHRoaXMueWVhciA9IHBhcnNlSW50KHllYXIpO1xyXG5cdFx0dGhpcy5zaG93WWVhciA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zaG93TW9udGggPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZWxlY3RNb250aChtb250aCkge1xyXG5cdFx0dGhpcy5tb250aCA9IHBhcnNlSW50KG1vbnRoKTtcclxuXHRcdHRoaXMuZ2VuZXJhdGVEYXRlTGlzdCgpO1xyXG5cdFx0dGhpcy5zaG93TW9udGggPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd0RhdGUgPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZWxlY3REYXRlKGRhdGUpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZVxyXG5cdFx0dGhpcy5zZXREYXRlLmVtaXQodGhpcy5zZWxlY3RlZERhdGUpO1xyXG5cdFx0aWYgKHRoaXMuY2xvc2VPbkRhdGVTZWxlY3QpIHtcclxuXHRcdFx0dGhpcy5vcGVuKGRhdGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRvcGVuKGRhdGVTZWxlY3RlZCA9IG51bGwpIHtcclxuXHRcdGlmIChTdHJpbmcoZGF0ZVNlbGVjdGVkKS5tYXRjaCgvKFsxMl1cXGR7M30tKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18WzEyXVxcZHwzWzAxXSkpLykpIHtcclxuXHRcdFx0bGV0IGRhdGVTcGxpdCA9IFN0cmluZyhkYXRlU2VsZWN0ZWQpLnNwbGl0KFwiLVwiKTtcclxuXHRcdFx0bGV0IGRhdGVPYmogPSB7XHJcblx0XHRcdFx0ZGF5OiBwYXJzZUludChkYXRlU3BsaXRbMl0pLFxyXG5cdFx0XHRcdG1vbnRoOiBwYXJzZUludChkYXRlU3BsaXRbMV0pIC0gMSxcclxuXHRcdFx0XHR5ZWFyOiBwYXJzZUludChkYXRlU3BsaXRbMF0pXHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlT2JqO1xyXG5cdFx0XHR0aGlzLm1vbnRoID0gcGFyc2VJbnQoZGF0ZVNwbGl0WzFdKSAtIDE7XHJcblx0XHRcdHRoaXMueWVhciA9IHBhcnNlSW50KGRhdGVTcGxpdFswXSk7XHJcblx0XHRcdHRoaXMuZ2VuZXJhdGVEYXRlTGlzdCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2hvd1BhbmVsKSB7XHJcblx0XHRcdHRoaXMuc2hvd1BhbmVsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnb3V0JztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2hvd1BhbmVsID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdpbic7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRvZGF5KCkge1xyXG5cdFx0Ly8gY29uc3QgdG9kYXkgPSB0aGlzLmN1cnJlbnREYXRlLnllYXIrXCItXCIrdGhpcy5jdXJyZW50RGF0ZS5tb250aCtcIi1cIit0aGlzLmN1cnJlbnREYXRlLmRheTtcclxuXHRcdHRoaXMuc2VsZWN0RGF0ZSh0aGlzLmN1cnJlbnREYXRlKTtcclxuXHR9XHJcblx0Y2xvc2VDYWxlbmRhcigpIHtcclxuXHRcdGlmICh0aGlzLnNob3dQYW5lbCAmJiB0aGlzLm9uZm9jdXMgPT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5zaG93UGFuZWwgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZXRJbnB1dEZvY3VzKCkge1xyXG5cdFx0dGhpcy5vbmZvY3VzID0gZmFsc2U7XHJcblx0XHR0aGlzLmlucHV0Rm9jdXMuZW1pdCgpXHJcblx0fVxyXG5cdHNldENhbGVuZGFyRm9jdXMoKSB7XHJcblx0XHR0aGlzLm9uZm9jdXMgPSB0cnVlO1xyXG5cdH1cclxufVxyXG4iXX0=