import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeInOutAnimation } from '../../../content-popup/animetion';
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent() {
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
    DatePickerComponent.prototype.ngOnInit = function () {
        var currentDateVal = new Date();
        this.currentDate.day = currentDateVal.getDate();
        this.currentDate.month = currentDateVal.getMonth();
        this.currentDate.year = currentDateVal.getFullYear();
        this.selectedDate = this.currentDate;
        this.month = this.currentDate.month;
        this.year = this.currentDate.year;
        this.generateDateList();
        this.generateYearList();
    };
    DatePickerComponent.prototype.generateDateList = function () {
        this.dateList = [];
        var firstDateOfMonth = new Date(this.year, this.month, 1);
        var lastDateOfMonth = new Date(this.year, this.month + 1, 0);
        var dayOfWeek = firstDateOfMonth.getDay();
        var startDate = firstDateOfMonth.getDate();
        var endDate = lastDateOfMonth.getDate();
        var dateRow = [];
        var dayCount = dayOfWeek;
        for (var i = startDate; i <= endDate; i++) {
            var dateForCal = new Date(this.year, this.month, i);
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
                    var nextMonthDate = new Date(this.year, this.month, endDate + 1);
                    var nextDate = nextMonthDate.getDate();
                    var nextMonth = nextMonthDate.getMonth();
                    var nextYear = nextMonthDate.getFullYear();
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
                    var prevMonthDate = new Date(this.year, this.month, 0);
                    var prevDate = prevMonthDate.getDate();
                    var prevMonth = prevMonthDate.getMonth();
                    var prevYear = prevMonthDate.getFullYear();
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
    };
    DatePickerComponent.prototype.actionPrev = function () {
        if (this.month == 0) {
            this.year--;
            this.month = 11;
        }
        else {
            this.month--;
        }
        this.generateDateList();
    };
    DatePickerComponent.prototype.actionNext = function () {
        if (this.month == 11) {
            this.year++;
            this.month = 0;
        }
        else {
            this.month++;
        }
        this.generateDateList();
    };
    DatePickerComponent.prototype.generateYearList = function () {
        if (this.yearListGen == 0) {
            this.yearListGen = this.year;
        }
        var startYear = this.yearListGen - 10;
        var endYear = this.yearListGen + 10;
        this.yearList = [];
        for (var i = startYear; i <= endYear; i++) {
            this.yearList.push(i);
        }
    };
    DatePickerComponent.prototype.actionPrevYear = function () {
        this.yearListGen = this.yearListGen - 20;
        this.generateYearList();
    };
    DatePickerComponent.prototype.actionNextYear = function () {
        this.yearListGen = this.yearListGen + 20;
        this.generateYearList();
    };
    DatePickerComponent.prototype.actionYearSelect = function () {
        this.showDate = false;
        this.showMonth = false;
        this.showYear = true;
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        this.year = parseInt(year);
        this.showYear = false;
        this.showMonth = true;
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        this.month = parseInt(month);
        this.generateDateList();
        this.showMonth = false;
        this.showDate = true;
    };
    DatePickerComponent.prototype.selectDate = function (date) {
        this.selectedDate = date;
        this.setDate.emit(this.selectedDate);
        if (this.closeOnDateSelect) {
            this.open(date);
        }
    };
    DatePickerComponent.prototype.open = function (dateSelected) {
        if (dateSelected === void 0) { dateSelected = null; }
        if (String(dateSelected).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
            var dateSplit = String(dateSelected).split("-");
            var dateObj = {
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
    };
    DatePickerComponent.prototype.selectToday = function () {
        // const today = this.currentDate.year+"-"+this.currentDate.month+"-"+this.currentDate.day;
        this.selectDate(this.currentDate);
    };
    DatePickerComponent.prototype.closeCalendar = function () {
        if (this.showPanel && this.onfocus == false) {
            this.showPanel = false;
            this.animationState = 'out';
        }
    };
    DatePickerComponent.prototype.setInputFocus = function () {
        this.onfocus = false;
        this.inputFocus.emit();
    };
    DatePickerComponent.prototype.setCalendarFocus = function () {
        this.onfocus = true;
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
    return DatePickerComponent;
}());
export { DatePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9kYXRlL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQU9wRTtJQWdDQztRQTNCUyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxPQUFPLENBQUM7UUFDcEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixZQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZ0JBQVcsR0FBRztZQUNiLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLENBQUM7WUFDUixHQUFHLEVBQUUsQ0FBQztTQUNOLENBQUM7UUFDRixpQkFBWSxHQUFHO1lBQ2QsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLEdBQUcsRUFBRSxDQUFDO1NBQ04sQ0FBQztRQUNGLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO0lBRXZCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO1FBQ0MsSUFBSSxjQUFjLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4Q0FBZ0IsR0FBaEI7UUFDQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLGdCQUFnQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLGVBQWUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFDLElBQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNDLElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ1osR0FBRyxFQUFFLENBQUM7Z0JBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUU7YUFDNUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN2RyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxHQUFHLEVBQUUsQ0FBQztpQkFDYjtnQkFDRCxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3ZDLElBQUksYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDdkMsSUFBSSxTQUFTLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN6QyxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzNDLE9BQU8sT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUM7NEJBQ1gsR0FBRyxFQUFFLFFBQVE7NEJBQ2IsS0FBSyxFQUFFLFNBQVM7NEJBQ2hCLElBQUksRUFBRSxRQUFRO3lCQUNkLENBQ0QsQ0FBQzt3QkFDRixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzVCLE9BQU8sR0FBRyxFQUFFLENBQUM7eUJBQ2I7d0JBQ0QsUUFBUSxFQUFFLENBQUM7cUJBQ1g7aUJBQ0Q7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BELElBQUksYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN2QyxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3pDLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDM0MsT0FBTyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQzs0QkFDZixHQUFHLEVBQUUsUUFBUTs0QkFDYixLQUFLLEVBQUUsU0FBUzs0QkFDaEIsSUFBSSxFQUFFLFFBQVE7eUJBQ2QsQ0FBQyxDQUFDO3dCQUNILFFBQVEsRUFBRSxDQUFDO3FCQUNYO2lCQUNEO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QixPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNiLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDYjtpQkFBTTtnQkFDTixRQUFRLEVBQUUsQ0FBQzthQUNYO1NBQ0Q7SUFDRixDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUNDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDaEI7YUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELHdDQUFVLEdBQVY7UUFDQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2Y7YUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUFnQixHQUFoQjtRQUNDLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtJQUNGLENBQUM7SUFFRCw0Q0FBYyxHQUFkO1FBQ0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUFnQixHQUFoQjtRQUNDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksS0FBSztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsd0NBQVUsR0FBVixVQUFXLElBQUk7UUFDZCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQjtJQUNGLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssWUFBbUI7UUFBbkIsNkJBQUEsRUFBQSxtQkFBbUI7UUFDdkIsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLEVBQUU7WUFDcEYsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoRCxJQUFJLE9BQU8sR0FBRztnQkFDYixHQUFHLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUNqQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QixDQUFBO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQzVCO2FBQU07WUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNGLENBQUM7SUFDRCx5Q0FBVyxHQUFYO1FBQ0MsMkZBQTJGO1FBQzNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCwyQ0FBYSxHQUFiO1FBQ0MsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFO1lBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0YsQ0FBQztJQUNELDJDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFDRCw4Q0FBZ0IsR0FBaEI7UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBeE5RO1FBQVIsS0FBSyxFQUFFOzs4REFBZTtJQUNkO1FBQVIsS0FBSyxFQUFFOzsrREFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTs7d0RBQVM7SUFDUjtRQUFSLEtBQUssRUFBRTs7MkRBQVk7SUFDWDtRQUFSLEtBQUssRUFBRTs7MERBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFOzswREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7O2tFQUEyQjtJQUN6QjtRQUFULE1BQU0sRUFBRTs7d0RBQThCO0lBQzdCO1FBQVQsTUFBTSxFQUFFOzsyREFBaUM7SUFUOUIsbUJBQW1CO1FBTC9CLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0Isd2tGQUEyQztZQUMzQyxVQUFVLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUNoQyxDQUFDOztPQUNXLG1CQUFtQixDQTBOL0I7SUFBRCwwQkFBQztDQUFBLEFBMU5ELElBME5DO1NBMU5ZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RmFkZUluT3V0QW5pbWF0aW9ufSBmcm9tICcuLi8uLi8uLi9jb250ZW50LXBvcHVwL2FuaW1ldGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2xiOS1kYXRlLXBpY2tlcicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2RhdGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuXHRhbmltYXRpb25zOiBbRmFkZUluT3V0QW5pbWF0aW9uXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgbW9udGhMaXN0TG9uZztcclxuXHRASW5wdXQoKSBtb250aExpc3RTaG9ydDtcclxuXHRASW5wdXQoKSB3ZWVrRGF5O1xyXG5cdEBJbnB1dCgpIHllYXJPZmZzZXQ7XHJcblx0QElucHV0KCkgc2hvd1RvZGF5ID0gZmFsc2U7XHJcblx0QElucHV0KCkgdG9kYXlUZXh0ID0gXCJUb2RheVwiO1xyXG5cdEBJbnB1dCgpIGNsb3NlT25EYXRlU2VsZWN0ID0gZmFsc2U7XHJcblx0QE91dHB1dCgpIHNldERhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0QE91dHB1dCgpIGlucHV0Rm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblx0b25mb2N1cyA9IGZhbHNlO1xyXG5cdHNob3dQYW5lbCA9IGZhbHNlO1xyXG5cdG9iaktleXMgPSBPYmplY3Qua2V5cztcclxuXHRtb250aCA9IDA7XHJcblx0eWVhciA9IDE5OTk7XHJcblx0eWVhckxpc3RHZW4gPSAwO1xyXG5cdGRhdGVMaXN0ID0gW107XHJcblx0eWVhckxpc3QgPSBbXTtcclxuXHRjdXJyZW50RGF0ZSA9IHtcclxuXHRcdHllYXI6IDAsXHJcblx0XHRtb250aDogMCxcclxuXHRcdGRheTogMFxyXG5cdH07XHJcblx0c2VsZWN0ZWREYXRlID0ge1xyXG5cdFx0eWVhcjogMCxcclxuXHRcdG1vbnRoOiAwLFxyXG5cdFx0ZGF5OiAwXHJcblx0fTtcclxuXHRzaG93RGF0ZSA9IHRydWU7XHJcblx0c2hvd1llYXIgPSBmYWxzZTtcclxuXHRzaG93TW9udGggPSBmYWxzZTtcclxuXHRhbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdH1cclxuXHRcclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdGxldCBjdXJyZW50RGF0ZVZhbCA9IG5ldyBEYXRlKCk7XHJcblx0XHR0aGlzLmN1cnJlbnREYXRlLmRheSA9IGN1cnJlbnREYXRlVmFsLmdldERhdGUoKTtcclxuXHRcdHRoaXMuY3VycmVudERhdGUubW9udGggPSBjdXJyZW50RGF0ZVZhbC5nZXRNb250aCgpO1xyXG5cdFx0dGhpcy5jdXJyZW50RGF0ZS55ZWFyID0gY3VycmVudERhdGVWYWwuZ2V0RnVsbFllYXIoKTtcclxuXHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5jdXJyZW50RGF0ZTtcclxuXHRcdHRoaXMubW9udGggPSB0aGlzLmN1cnJlbnREYXRlLm1vbnRoO1xyXG5cdFx0dGhpcy55ZWFyID0gdGhpcy5jdXJyZW50RGF0ZS55ZWFyO1xyXG5cdFx0dGhpcy5nZW5lcmF0ZURhdGVMaXN0KCk7XHJcblx0XHR0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuXHR9XHJcblx0XHJcblx0Z2VuZXJhdGVEYXRlTGlzdCgpIHtcclxuXHRcdHRoaXMuZGF0ZUxpc3QgPSBbXTtcclxuXHRcdGxldCBmaXJzdERhdGVPZk1vbnRoID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAxKTtcclxuXHRcdGxldCBsYXN0RGF0ZU9mTW9udGggPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggKyAxLCAwKTtcclxuXHRcdGxldCBkYXlPZldlZWsgPSBmaXJzdERhdGVPZk1vbnRoLmdldERheSgpO1xyXG5cdFx0bGV0IHN0YXJ0RGF0ZSA9IGZpcnN0RGF0ZU9mTW9udGguZ2V0RGF0ZSgpO1xyXG5cdFx0bGV0IGVuZERhdGUgPSBsYXN0RGF0ZU9mTW9udGguZ2V0RGF0ZSgpO1xyXG5cdFx0bGV0IGRhdGVSb3cgPSBbXTtcclxuXHRcdGxldCBkYXlDb3VudCA9IGRheU9mV2VlaztcclxuXHRcdGZvciAobGV0IGkgPSBzdGFydERhdGU7IGkgPD0gZW5kRGF0ZTsgaSsrKSB7XHJcblx0XHRcdGxldCBkYXRlRm9yQ2FsID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCBpKTtcclxuXHRcdFx0ZGF0ZVJvdy5wdXNoKHtcclxuXHRcdFx0XHRkYXk6IGksXHJcblx0XHRcdFx0bW9udGg6IHRoaXMubW9udGgsXHJcblx0XHRcdFx0eWVhcjogdGhpcy55ZWFyLFxyXG5cdFx0XHRcdHdlZWtEYXk6IGRhdGVGb3JDYWwuZ2V0RGF5KClcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChkYXlDb3VudCA9PSA2IHx8IGkgPT0gZW5kRGF0ZSB8fCAodGhpcy5kYXRlTGlzdC5sZW5ndGggPCA1ICYmIGkgPT0gZW5kRGF0ZSAmJiBkYXRlUm93Lmxlbmd0aCA9PSA3KSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGVMaXN0Lmxlbmd0aCA8IDUgJiYgaSA9PSBlbmREYXRlICYmIGRhdGVSb3cubGVuZ3RoID09IDcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZGF0ZUxpc3QucHVzaChkYXRlUm93KTtcclxuXHRcdFx0XHRcdGRhdGVSb3cgPSBbXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGkgPT0gZW5kRGF0ZSAmJiBkYXRlUm93Lmxlbmd0aCA8IDcpIHtcclxuXHRcdFx0XHRcdGxldCBuZXh0TW9udGhEYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCBlbmREYXRlICsgMSk7XHJcblx0XHRcdFx0XHRsZXQgbmV4dERhdGUgPSBuZXh0TW9udGhEYXRlLmdldERhdGUoKTtcclxuXHRcdFx0XHRcdGxldCBuZXh0TW9udGggPSBuZXh0TW9udGhEYXRlLmdldE1vbnRoKCk7XHJcblx0XHRcdFx0XHRsZXQgbmV4dFllYXIgPSBuZXh0TW9udGhEYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRcdFx0XHR3aGlsZSAoZGF0ZVJvdy5sZW5ndGggPCA3KSB7XHJcblx0XHRcdFx0XHRcdGRhdGVSb3cucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0XHRkYXk6IG5leHREYXRlLFxyXG5cdFx0XHRcdFx0XHRcdFx0bW9udGg6IG5leHRNb250aCxcclxuXHRcdFx0XHRcdFx0XHRcdHllYXI6IG5leHRZZWFyXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRpZiAoZGF0ZVJvdy5sZW5ndGggPT0gNyAmJiB0aGlzLmRhdGVMaXN0Lmxlbmd0aCA8IDUpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhdGVMaXN0LnB1c2goZGF0ZVJvdyk7XHJcblx0XHRcdFx0XHRcdFx0ZGF0ZVJvdyA9IFtdO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdG5leHREYXRlKys7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLmRhdGVMaXN0Lmxlbmd0aCA9PSAwICYmIGRhdGVSb3cubGVuZ3RoIDwgNykge1xyXG5cdFx0XHRcdFx0bGV0IHByZXZNb250aERhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIDApO1xyXG5cdFx0XHRcdFx0bGV0IHByZXZEYXRlID0gcHJldk1vbnRoRGF0ZS5nZXREYXRlKCk7XHJcblx0XHRcdFx0XHRsZXQgcHJldk1vbnRoID0gcHJldk1vbnRoRGF0ZS5nZXRNb250aCgpO1xyXG5cdFx0XHRcdFx0bGV0IHByZXZZZWFyID0gcHJldk1vbnRoRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cdFx0XHRcdFx0d2hpbGUgKGRhdGVSb3cubGVuZ3RoIDwgNykge1xyXG5cdFx0XHRcdFx0XHRkYXRlUm93LnVuc2hpZnQoe1xyXG5cdFx0XHRcdFx0XHRcdGRheTogcHJldkRhdGUsXHJcblx0XHRcdFx0XHRcdFx0bW9udGg6IHByZXZNb250aCxcclxuXHRcdFx0XHRcdFx0XHR5ZWFyOiBwcmV2WWVhclxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0cHJldkRhdGUtLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5kYXRlTGlzdC5wdXNoKGRhdGVSb3cpO1xyXG5cdFx0XHRcdGRhdGVSb3cgPSBbXTtcclxuXHRcdFx0XHRkYXlDb3VudCA9IDA7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGF5Q291bnQrKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRhY3Rpb25QcmV2KCkge1xyXG5cdFx0aWYgKHRoaXMubW9udGggPT0gMCkge1xyXG5cdFx0XHR0aGlzLnllYXItLTtcclxuXHRcdFx0dGhpcy5tb250aCA9IDExO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tb250aC0tO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5nZW5lcmF0ZURhdGVMaXN0KCk7XHJcblx0fVxyXG5cdFxyXG5cdGFjdGlvbk5leHQoKSB7XHJcblx0XHRpZiAodGhpcy5tb250aCA9PSAxMSkge1xyXG5cdFx0XHR0aGlzLnllYXIrKztcclxuXHRcdFx0dGhpcy5tb250aCA9IDA7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm1vbnRoKys7XHJcblx0XHR9XHJcblx0XHR0aGlzLmdlbmVyYXRlRGF0ZUxpc3QoKTtcclxuXHR9XHJcblx0XHJcblx0Z2VuZXJhdGVZZWFyTGlzdCgpIHtcclxuXHRcdGlmICh0aGlzLnllYXJMaXN0R2VuID09IDApIHtcclxuXHRcdFx0dGhpcy55ZWFyTGlzdEdlbiA9IHRoaXMueWVhcjtcclxuXHRcdH1cclxuXHRcdGxldCBzdGFydFllYXIgPSB0aGlzLnllYXJMaXN0R2VuIC0gMTA7XHJcblx0XHRsZXQgZW5kWWVhciA9IHRoaXMueWVhckxpc3RHZW4gKyAxMDtcclxuXHRcdHRoaXMueWVhckxpc3QgPSBbXTtcclxuXHRcdGZvciAobGV0IGkgPSBzdGFydFllYXI7IGkgPD0gZW5kWWVhcjsgaSsrKSB7XHJcblx0XHRcdHRoaXMueWVhckxpc3QucHVzaChpKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0YWN0aW9uUHJldlllYXIoKSB7XHJcblx0XHR0aGlzLnllYXJMaXN0R2VuID0gdGhpcy55ZWFyTGlzdEdlbiAtIDIwO1xyXG5cdFx0dGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XHJcblx0fVxyXG5cdFxyXG5cdGFjdGlvbk5leHRZZWFyKCkge1xyXG5cdFx0dGhpcy55ZWFyTGlzdEdlbiA9IHRoaXMueWVhckxpc3RHZW4gKyAyMDtcclxuXHRcdHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG5cdH1cclxuXHRcclxuXHRhY3Rpb25ZZWFyU2VsZWN0KCkge1xyXG5cdFx0dGhpcy5zaG93RGF0ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zaG93TW9udGggPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd1llYXIgPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZWxlY3RZZWFyKHllYXIpIHtcclxuXHRcdHRoaXMueWVhciA9IHBhcnNlSW50KHllYXIpO1xyXG5cdFx0dGhpcy5zaG93WWVhciA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zaG93TW9udGggPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZWxlY3RNb250aChtb250aCkge1xyXG5cdFx0dGhpcy5tb250aCA9IHBhcnNlSW50KG1vbnRoKTtcclxuXHRcdHRoaXMuZ2VuZXJhdGVEYXRlTGlzdCgpO1xyXG5cdFx0dGhpcy5zaG93TW9udGggPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd0RhdGUgPSB0cnVlO1xyXG5cdH1cclxuXHRcclxuXHRzZWxlY3REYXRlKGRhdGUpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZVxyXG5cdFx0dGhpcy5zZXREYXRlLmVtaXQodGhpcy5zZWxlY3RlZERhdGUpO1xyXG5cdFx0aWYgKHRoaXMuY2xvc2VPbkRhdGVTZWxlY3QpIHtcclxuXHRcdFx0dGhpcy5vcGVuKGRhdGUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRvcGVuKGRhdGVTZWxlY3RlZCA9IG51bGwpIHtcclxuXHRcdGlmIChTdHJpbmcoZGF0ZVNlbGVjdGVkKS5tYXRjaCgvKFsxMl1cXGR7M30tKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18WzEyXVxcZHwzWzAxXSkpLykpIHtcclxuXHRcdFx0bGV0IGRhdGVTcGxpdCA9IFN0cmluZyhkYXRlU2VsZWN0ZWQpLnNwbGl0KFwiLVwiKTtcclxuXHRcdFx0bGV0IGRhdGVPYmogPSB7XHJcblx0XHRcdFx0ZGF5OiBwYXJzZUludChkYXRlU3BsaXRbMl0pLFxyXG5cdFx0XHRcdG1vbnRoOiBwYXJzZUludChkYXRlU3BsaXRbMV0pIC0gMSxcclxuXHRcdFx0XHR5ZWFyOiBwYXJzZUludChkYXRlU3BsaXRbMF0pXHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlT2JqO1xyXG5cdFx0XHR0aGlzLm1vbnRoID0gcGFyc2VJbnQoZGF0ZVNwbGl0WzFdKSAtIDE7XHJcblx0XHRcdHRoaXMueWVhciA9IHBhcnNlSW50KGRhdGVTcGxpdFswXSk7XHJcblx0XHRcdHRoaXMuZ2VuZXJhdGVEYXRlTGlzdCgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2hvd1BhbmVsKSB7XHJcblx0XHRcdHRoaXMuc2hvd1BhbmVsID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAnb3V0JztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2hvd1BhbmVsID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdpbic7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRvZGF5KCkge1xyXG5cdFx0Ly8gY29uc3QgdG9kYXkgPSB0aGlzLmN1cnJlbnREYXRlLnllYXIrXCItXCIrdGhpcy5jdXJyZW50RGF0ZS5tb250aCtcIi1cIit0aGlzLmN1cnJlbnREYXRlLmRheTtcclxuXHRcdHRoaXMuc2VsZWN0RGF0ZSh0aGlzLmN1cnJlbnREYXRlKTtcclxuXHR9XHJcblx0Y2xvc2VDYWxlbmRhcigpIHtcclxuXHRcdGlmICh0aGlzLnNob3dQYW5lbCAmJiB0aGlzLm9uZm9jdXMgPT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5zaG93UGFuZWwgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5hbmltYXRpb25TdGF0ZSA9ICdvdXQnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZXRJbnB1dEZvY3VzKCkge1xyXG5cdFx0dGhpcy5vbmZvY3VzID0gZmFsc2U7XHJcblx0XHR0aGlzLmlucHV0Rm9jdXMuZW1pdCgpXHJcblx0fVxyXG5cdHNldENhbGVuZGFyRm9jdXMoKSB7XHJcblx0XHR0aGlzLm9uZm9jdXMgPSB0cnVlO1xyXG5cdH1cclxufVxyXG4iXX0=