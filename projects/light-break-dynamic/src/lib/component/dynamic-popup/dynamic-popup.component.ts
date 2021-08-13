import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {interval, timer} from 'rxjs';
import { takeWhile } from 'rxjs/operators';

declare let $;

@Component({
    selector: 'lb9-dynamic-popup',
    templateUrl: './dynamic-popup.component.html'
})
export class DynamicPopupComponent implements OnInit {
    @Output() callback = new EventEmitter();
    confirmStatus = false;
    showStatus = false;
    queue = false;
    statusPopup = 'hidePopup';
    popupProperties;
    tempData;

    constructor() {
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
            case 'error' :
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
            case 'warning' :
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
            case 'success' :
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
            case 'confirm' :
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
            case 'info' :
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
        } else {
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
        interval(500).pipe(
            takeWhile(() => {
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
            type:this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
            data: this.popupProperties.data
        });
        this.hideModal();
    }
    close() {
        this.confirmStatus = false;
        this.callback.emit({
            type:this.popupProperties.type,
            status: this.confirmStatus,
            eventCode: this.popupProperties.eventCode,
        });
        this.hideModal();
    }
}
