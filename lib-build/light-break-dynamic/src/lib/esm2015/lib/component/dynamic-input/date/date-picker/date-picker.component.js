import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeInOutAnimation } from '../../../content-popup/animetion';
let DatePickerComponent = class DatePickerComponent {
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
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "monthListLong", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "monthListShort", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "weekDay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "yearOffset", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "showToday", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "todayText", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "closeOnDateSelect", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "setDate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], DatePickerComponent.prototype, "inputFocus", void 0);
DatePickerComponent = __decorate([
    Component({
        selector: 'lb9-date-picker',
        template: "<div class=\"datePickerPanel\" [@fadeInOut]=\"animationState\" (mouseleave)=\"setInputFocus()\" (mouseenter)=\"setCalendarFocus()\">\r\n  <div class=\"datePickerAlign\">\r\n    <div class=\"monthYearPanel\">\r\n      <div class=\"monthYearDisplay\">\r\n        <div class=\"monthYearAction\" (click)=\"actionYearSelect()\">{{monthListLong[month]}} {{(year + yearOffset)}} <span class=\"glyphicon glyphicon-collapse-down\"></span></div>\r\n        <div class=\"prev\" (click)=\"actionPrev()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n        <div class=\"next\" (click)=\"actionNext()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dateTablePanel {{showDate ? 'showPanel':'hidePanel'}}\">\r\n      <table class=\"dateTable\">\r\n        <tr>\r\n          <th *ngFor=\"let day of weekDay\">\r\n            {{day}}\r\n          </th>\r\n        </tr>\r\n        <ng-container *ngFor=\"let dateRow of dateList\">\r\n          <tr>\r\n            <td *ngFor=\"let date of dateRow\">\r\n              <div class=\"dateBtn{{month != date.month? ' otherMonth' : ''}} {{date.day == currentDate.day && date.year == currentDate.year && date.month == currentDate.month ? 'dateCurrent':'dateNormal'}}{{date.weekDay == '0' ? ' dateSun':''}}{{date.weekDay == '6' ? ' dateSat':''}}\" (click)=\"selectDate(date)\">\r\n                <div class=\"{{date.day == selectedDate.day && date.year == selectedDate.year && date.month == selectedDate.month ? 'selected':''}}\" [innerHTML]=\"date.day\"></div>\r\n              </div>\r\n            </td>\r\n          </tr>\r\n        </ng-container>\r\n      </table>\r\n    </div>\r\n    <div class=\"monthTablePanel {{showMonth ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let monthNameIndex of objKeys(monthListLong)\" class=\"monthBtn\" (click)=\"selectMonth(monthNameIndex)\">{{monthListLong[monthNameIndex]}}</div>\r\n    </div>\r\n    <div class=\"yearTablePanel {{showYear ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let year of yearList\" class=\"yearBtn\" (click)=\"selectYear(year)\">{{year + yearOffset}}</div>\r\n      <div class=\"prevYear\" (click)=\"actionPrevYear()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n      <div class=\"nextYear\" (click)=\"actionNextYear()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n    </div>\r\n    <div *ngIf=\"showToday\" class=\"todayPanel\">\r\n      <div class=\"todayBtn\" [innerHTML]=\"todayText\" (click)=\"selectToday()\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
        animations: [FadeInOutAnimation]
    }),
    __metadata("design:paramtypes", [])
], DatePickerComponent);
export { DatePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9kYXRlL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQU9wRSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWdDL0I7UUEzQlMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3BCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUN6QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsWUFBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFNBQUksR0FBRyxJQUFJLENBQUM7UUFDWixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGdCQUFXLEdBQUc7WUFDYixJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxDQUFDO1lBQ1IsR0FBRyxFQUFFLENBQUM7U0FDTixDQUFDO1FBQ0YsaUJBQVksR0FBRztZQUNkLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixHQUFHLEVBQUUsQ0FBQztTQUNOLENB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bnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0ZhZGVJbk91dEFuaW1hdGlvbn0gZnJvbSAnLi4vLi4vLi4vY29udGVudC1wb3B1cC9hbmltZXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdsYjktZGF0ZS1waWNrZXInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcblx0YW5pbWF0aW9uczogW0ZhZGVJbk91dEFuaW1hdGlvbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBJbnB1dCgpIG1vbnRoTGlzdExvbmc7XHJcblx0QElucHV0KCkgbW9udGhMaXN0U2hvcnQ7XHJcblx0QElucHV0KCkgd2Vla0RheTtcclxuXHRASW5wdXQoKSB5ZWFyT2Zmc2V0O1xyXG5cdEBJbnB1dCgpIHNob3dUb2RheSA9IGZhbHNlO1xyXG5cdEBJbnB1dCgpIHRvZGF5VGV4dCA9IFwiVG9kYXlcIjtcclxuXHRASW5wdXQoKSBjbG9zZU9uRGF0ZVNlbGVjdCA9IGZhbHNlO1xyXG5cdEBPdXRwdXQoKSBzZXREYXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdEBPdXRwdXQoKSBpbnB1dEZvY3VzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cdG9uZm9jdXMgPSBmYWxzZTtcclxuXHRzaG93UGFuZWwgPSBmYWxzZTtcclxuXHRvYmpLZXlzID0gT2JqZWN0LmtleXM7XHJcblx0bW9udGggPSAwO1xyXG5cdHllYXIgPSAxOTk5O1xyXG5cdHllYXJMaXN0R2VuID0gMDtcclxuXHRkYXRlTGlzdCA9IFtdO1xyXG5cdHllYXJMaXN0ID0gW107XHJcblx0Y3VycmVudERhdGUgPSB7XHJcblx0XHR5ZWFyOiAwLFxyXG5cdFx0bW9udGg6IDAsXHJcblx0XHRkYXk6IDBcclxuXHR9O1xyXG5cdHNlbGVjdGVkRGF0ZSA9IHtcclxuXHRcdHllYXI6IDAsXHJcblx0XHRtb250aDogMCxcclxuXHRcdGRheTogMFxyXG5cdH07XHJcblx0c2hvd0RhdGUgPSB0cnVlO1xyXG5cdHNob3dZZWFyID0gZmFsc2U7XHJcblx0c2hvd01vbnRoID0gZmFsc2U7XHJcblx0YW5pbWF0aW9uU3RhdGUgPSAnb3V0JztcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHR9XHJcblx0XHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRsZXQgY3VycmVudERhdGVWYWwgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0dGhpcy5jdXJyZW50RGF0ZS5kYXkgPSBjdXJyZW50RGF0ZVZhbC5nZXREYXRlKCk7XHJcblx0XHR0aGlzLmN1cnJlbnREYXRlLm1vbnRoID0gY3VycmVudERhdGVWYWwuZ2V0TW9udGgoKTtcclxuXHRcdHRoaXMuY3VycmVudERhdGUueWVhciA9IGN1cnJlbnREYXRlVmFsLmdldEZ1bGxZZWFyKCk7XHJcblx0XHR0aGlzLnNlbGVjdGVkRGF0ZSA9IHRoaXMuY3VycmVudERhdGU7XHJcblx0XHR0aGlzLm1vbnRoID0gdGhpcy5jdXJyZW50RGF0ZS5tb250aDtcclxuXHRcdHRoaXMueWVhciA9IHRoaXMuY3VycmVudERhdGUueWVhcjtcclxuXHRcdHRoaXMuZ2VuZXJhdGVEYXRlTGlzdCgpO1xyXG5cdFx0dGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XHJcblx0fVxyXG5cdFxyXG5cdGdlbmVyYXRlRGF0ZUxpc3QoKSB7XHJcblx0XHR0aGlzLmRhdGVMaXN0ID0gW107XHJcblx0XHRsZXQgZmlyc3REYXRlT2ZNb250aCA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgMSk7XHJcblx0XHRsZXQgbGFzdERhdGVPZk1vbnRoID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoICsgMSwgMCk7XHJcblx0XHRsZXQgZGF5T2ZXZWVrID0gZmlyc3REYXRlT2ZNb250aC5nZXREYXkoKTtcclxuXHRcdGxldCBzdGFydERhdGUgPSBmaXJzdERhdGVPZk1vbnRoLmdldERhdGUoKTtcclxuXHRcdGxldCBlbmREYXRlID0gbGFzdERhdGVPZk1vbnRoLmdldERhdGUoKTtcclxuXHRcdGxldCBkYXRlUm93ID0gW107XHJcblx0XHRsZXQgZGF5Q291bnQgPSBkYXlPZldlZWs7XHJcblx0XHRmb3IgKGxldCBpID0gc3RhcnREYXRlOyBpIDw9IGVuZERhdGU7IGkrKykge1xyXG5cdFx0XHRsZXQgZGF0ZUZvckNhbCA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgaSk7XHJcblx0XHRcdGRhdGVSb3cucHVzaCh7XHJcblx0XHRcdFx0ZGF5OiBpLFxyXG5cdFx0XHRcdG1vbnRoOiB0aGlzLm1vbnRoLFxyXG5cdFx0XHRcdHllYXI6IHRoaXMueWVhcixcclxuXHRcdFx0XHR3ZWVrRGF5OiBkYXRlRm9yQ2FsLmdldERheSgpXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoZGF5Q291bnQgPT0gNiB8fCBpID09IGVuZERhdGUgfHwgKHRoaXMuZGF0ZUxpc3QubGVuZ3RoIDwgNSAmJiBpID09IGVuZERhdGUgJiYgZGF0ZVJvdy5sZW5ndGggPT0gNykpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5kYXRlTGlzdC5sZW5ndGggPCA1ICYmIGkgPT0gZW5kRGF0ZSAmJiBkYXRlUm93Lmxlbmd0aCA9PSA3KSB7XHJcblx0XHRcdFx0XHR0aGlzLmRhdGVMaXN0LnB1c2goZGF0ZVJvdyk7XHJcblx0XHRcdFx0XHRkYXRlUm93ID0gW107XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChpID09IGVuZERhdGUgJiYgZGF0ZVJvdy5sZW5ndGggPCA3KSB7XHJcblx0XHRcdFx0XHRsZXQgbmV4dE1vbnRoRGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgZW5kRGF0ZSArIDEpO1xyXG5cdFx0XHRcdFx0bGV0IG5leHREYXRlID0gbmV4dE1vbnRoRGF0ZS5nZXREYXRlKCk7XHJcblx0XHRcdFx0XHRsZXQgbmV4dE1vbnRoID0gbmV4dE1vbnRoRGF0ZS5nZXRNb250aCgpO1xyXG5cdFx0XHRcdFx0bGV0IG5leHRZZWFyID0gbmV4dE1vbnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0XHRcdFx0d2hpbGUgKGRhdGVSb3cubGVuZ3RoIDwgNykge1xyXG5cdFx0XHRcdFx0XHRkYXRlUm93LnB1c2goe1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGF5OiBuZXh0RGF0ZSxcclxuXHRcdFx0XHRcdFx0XHRcdG1vbnRoOiBuZXh0TW9udGgsXHJcblx0XHRcdFx0XHRcdFx0XHR5ZWFyOiBuZXh0WWVhclxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0aWYgKGRhdGVSb3cubGVuZ3RoID09IDcgJiYgdGhpcy5kYXRlTGlzdC5sZW5ndGggPCA1KSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kYXRlTGlzdC5wdXNoKGRhdGVSb3cpO1xyXG5cdFx0XHRcdFx0XHRcdGRhdGVSb3cgPSBbXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRuZXh0RGF0ZSsrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5kYXRlTGlzdC5sZW5ndGggPT0gMCAmJiBkYXRlUm93Lmxlbmd0aCA8IDcpIHtcclxuXHRcdFx0XHRcdGxldCBwcmV2TW9udGhEYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAwKTtcclxuXHRcdFx0XHRcdGxldCBwcmV2RGF0ZSA9IHByZXZNb250aERhdGUuZ2V0RGF0ZSgpO1xyXG5cdFx0XHRcdFx0bGV0IHByZXZNb250aCA9IHByZXZNb250aERhdGUuZ2V0TW9udGgoKTtcclxuXHRcdFx0XHRcdGxldCBwcmV2WWVhciA9IHByZXZNb250aERhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHRcdFx0XHRcdHdoaWxlIChkYXRlUm93Lmxlbmd0aCA8IDcpIHtcclxuXHRcdFx0XHRcdFx0ZGF0ZVJvdy51bnNoaWZ0KHtcclxuXHRcdFx0XHRcdFx0XHRkYXk6IHByZXZEYXRlLFxyXG5cdFx0XHRcdFx0XHRcdG1vbnRoOiBwcmV2TW9udGgsXHJcblx0XHRcdFx0XHRcdFx0eWVhcjogcHJldlllYXJcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHByZXZEYXRlLS07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuZGF0ZUxpc3QucHVzaChkYXRlUm93KTtcclxuXHRcdFx0XHRkYXRlUm93ID0gW107XHJcblx0XHRcdFx0ZGF5Q291bnQgPSAwO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGRheUNvdW50Kys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0YWN0aW9uUHJldigpIHtcclxuXHRcdGlmICh0aGlzLm1vbnRoID09IDApIHtcclxuXHRcdFx0dGhpcy55ZWFyLS07XHJcblx0XHRcdHRoaXMubW9udGggPSAxMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubW9udGgtLTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZ2VuZXJhdGVEYXRlTGlzdCgpO1xyXG5cdH1cclxuXHRcclxuXHRhY3Rpb25OZXh0KCkge1xyXG5cdFx0aWYgKHRoaXMubW9udGggPT0gMTEpIHtcclxuXHRcdFx0dGhpcy55ZWFyKys7XHJcblx0XHRcdHRoaXMubW9udGggPSAwO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tb250aCsrO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5nZW5lcmF0ZURhdGVMaXN0KCk7XHJcblx0fVxyXG5cdFxyXG5cdGdlbmVyYXRlWWVhckxpc3QoKSB7XHJcblx0XHRpZiAodGhpcy55ZWFyTGlzdEdlbiA9PSAwKSB7XHJcblx0XHRcdHRoaXMueWVhckxpc3RHZW4gPSB0aGlzLnllYXI7XHJcblx0XHR9XHJcblx0XHRsZXQgc3RhcnRZZWFyID0gdGhpcy55ZWFyTGlzdEdlbiAtIDEwO1xyXG5cdFx0bGV0IGVuZFllYXIgPSB0aGlzLnllYXJMaXN0R2VuICsgMTA7XHJcblx0XHR0aGlzLnllYXJMaXN0ID0gW107XHJcblx0XHRmb3IgKGxldCBpID0gc3RhcnRZZWFyOyBpIDw9IGVuZFllYXI7IGkrKykge1xyXG5cdFx0XHR0aGlzLnllYXJMaXN0LnB1c2goaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGFjdGlvblByZXZZZWFyKCkge1xyXG5cdFx0dGhpcy55ZWFyTGlzdEdlbiA9IHRoaXMueWVhckxpc3RHZW4gLSAyMDtcclxuXHRcdHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG5cdH1cclxuXHRcclxuXHRhY3Rpb25OZXh0WWVhcigpIHtcclxuXHRcdHRoaXMueWVhckxpc3RHZW4gPSB0aGlzLnllYXJMaXN0R2VuICsgMjA7XHJcblx0XHR0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuXHR9XHJcblx0XHJcblx0YWN0aW9uWWVhclNlbGVjdCgpIHtcclxuXHRcdHRoaXMuc2hvd0RhdGUgPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd01vbnRoID0gZmFsc2U7XHJcblx0XHR0aGlzLnNob3dZZWFyID0gdHJ1ZTtcclxuXHR9XHJcblx0XHJcblx0c2VsZWN0WWVhcih5ZWFyKSB7XHJcblx0XHR0aGlzLnllYXIgPSBwYXJzZUludCh5ZWFyKTtcclxuXHRcdHRoaXMuc2hvd1llYXIgPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd01vbnRoID0gdHJ1ZTtcclxuXHR9XHJcblx0XHJcblx0c2VsZWN0TW9udGgobW9udGgpIHtcclxuXHRcdHRoaXMubW9udGggPSBwYXJzZUludChtb250aCk7XHJcblx0XHR0aGlzLmdlbmVyYXRlRGF0ZUxpc3QoKTtcclxuXHRcdHRoaXMuc2hvd01vbnRoID0gZmFsc2U7XHJcblx0XHR0aGlzLnNob3dEYXRlID0gdHJ1ZTtcclxuXHR9XHJcblx0XHJcblx0c2VsZWN0RGF0ZShkYXRlKSB7XHJcblx0XHR0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVcclxuXHRcdHRoaXMuc2V0RGF0ZS5lbWl0KHRoaXMuc2VsZWN0ZWREYXRlKTtcclxuXHRcdGlmICh0aGlzLmNsb3NlT25EYXRlU2VsZWN0KSB7XHJcblx0XHRcdHRoaXMub3BlbihkYXRlKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0b3BlbihkYXRlU2VsZWN0ZWQgPSBudWxsKSB7XHJcblx0XHRpZiAoU3RyaW5nKGRhdGVTZWxlY3RlZCkubWF0Y2goLyhbMTJdXFxkezN9LSgwWzEtOV18MVswLTJdKS0oMFsxLTldfFsxMl1cXGR8M1swMV0pKS8pKSB7XHJcblx0XHRcdGxldCBkYXRlU3BsaXQgPSBTdHJpbmcoZGF0ZVNlbGVjdGVkKS5zcGxpdChcIi1cIik7XHJcblx0XHRcdGxldCBkYXRlT2JqID0ge1xyXG5cdFx0XHRcdGRheTogcGFyc2VJbnQoZGF0ZVNwbGl0WzJdKSxcclxuXHRcdFx0XHRtb250aDogcGFyc2VJbnQoZGF0ZVNwbGl0WzFdKSAtIDEsXHJcblx0XHRcdFx0eWVhcjogcGFyc2VJbnQoZGF0ZVNwbGl0WzBdKVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZU9iajtcclxuXHRcdFx0dGhpcy5tb250aCA9IHBhcnNlSW50KGRhdGVTcGxpdFsxXSkgLSAxO1xyXG5cdFx0XHR0aGlzLnllYXIgPSBwYXJzZUludChkYXRlU3BsaXRbMF0pO1xyXG5cdFx0XHR0aGlzLmdlbmVyYXRlRGF0ZUxpc3QoKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnNob3dQYW5lbCkge1xyXG5cdFx0XHR0aGlzLnNob3dQYW5lbCA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmFuaW1hdGlvblN0YXRlID0gJ291dCc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNob3dQYW5lbCA9IHRydWU7XHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnaW4nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUb2RheSgpIHtcclxuXHRcdC8vIGNvbnN0IHRvZGF5ID0gdGhpcy5jdXJyZW50RGF0ZS55ZWFyK1wiLVwiK3RoaXMuY3VycmVudERhdGUubW9udGgrXCItXCIrdGhpcy5jdXJyZW50RGF0ZS5kYXk7XHJcblx0XHR0aGlzLnNlbGVjdERhdGUodGhpcy5jdXJyZW50RGF0ZSk7XHJcblx0fVxyXG5cdGNsb3NlQ2FsZW5kYXIoKSB7XHJcblx0XHRpZiAodGhpcy5zaG93UGFuZWwgJiYgdGhpcy5vbmZvY3VzID09IGZhbHNlKSB7XHJcblx0XHRcdHRoaXMuc2hvd1BhbmVsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnb3V0JztcclxuXHRcdH1cclxuXHR9XHJcblx0c2V0SW5wdXRGb2N1cygpIHtcclxuXHRcdHRoaXMub25mb2N1cyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5pbnB1dEZvY3VzLmVtaXQoKVxyXG5cdH1cclxuXHRzZXRDYWxlbmRhckZvY3VzKCkge1xyXG5cdFx0dGhpcy5vbmZvY3VzID0gdHJ1ZTtcclxuXHR9XHJcbn1cclxuIl19