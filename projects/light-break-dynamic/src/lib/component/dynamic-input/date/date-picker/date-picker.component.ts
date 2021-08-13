import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {FadeInOutAnimation} from '../../../content-popup/animetion';

@Component({
	selector: 'lb9-date-picker',
	templateUrl: './date-picker.component.html',
	animations: [FadeInOutAnimation]
})
export class DatePickerComponent implements OnInit {
	@Input() monthListLong;
	@Input() monthListShort;
	@Input() weekDay;
	@Input() yearOffset;
	@Input() showToday = false;
	@Input() todayText = "Today";
	@Input() closeOnDateSelect = false;
	@Output() setDate = new EventEmitter();
	@Output() inputFocus = new EventEmitter();
	onfocus = false;
	showPanel = false;
	objKeys = Object.keys;
	month = 0;
	year = 1999;
	yearListGen = 0;
	dateList = [];
	yearList = [];
	currentDate = {
		year: 0,
		month: 0,
		day: 0
	};
	selectedDate = {
		year: 0,
		month: 0,
		day: 0
	};
	showDate = true;
	showYear = false;
	showMonth = false;
	animationState = 'out';
	constructor() {
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
							}
						);
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
			} else {
				dayCount++;
			}
		}
	}
	
	actionPrev() {
		if (this.month == 0) {
			this.year--;
			this.month = 11;
		} else {
			this.month--;
		}
		this.generateDateList();
	}
	
	actionNext() {
		if (this.month == 11) {
			this.year++;
			this.month = 0;
		} else {
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
		this.selectedDate = date
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
			}
			this.selectedDate = dateObj;
			this.month = parseInt(dateSplit[1]) - 1;
			this.year = parseInt(dateSplit[0]);
			this.generateDateList();
		}
		if (this.showPanel) {
			this.showPanel = false;
			this.animationState = 'out';
		} else {
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
		this.inputFocus.emit()
	}
	setCalendarFocus() {
		this.onfocus = true;
	}
}
