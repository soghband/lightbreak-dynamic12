import { __decorate, __metadata } from "tslib";
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../inputComponent.component';
import { TextBoxComponent } from './textbox/textbox.component';
import { LabelComponent } from './label/label.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { HiddenComponent } from './hidden/hidden.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageComponent } from './image/image.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ButtonComponent } from './button/button.component';
import { SwappingBoxComponent } from './swapping-box/swapping-box.component';
import { MapValueComponent } from './map-value/map-value.component';
import { RadioComponent } from './radio/radio.component';
import { DateComponent } from './date/date.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { AnimationService } from '../../service/animation.service';
import { ColorSelectComponent } from './color-select/color-select.component';
var DynamicInputComponent = /** @class */ (function () {
    function DynamicInputComponent(componentFactoryResolver, animationService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.animationService = animationService;
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.componentTypes = {
            'textBox': TextBoxComponent,
            'textArea': TextAreaComponent,
            'label': LabelComponent,
            'checkBox': CheckBoxComponent,
            'colorSelect': ColorSelectComponent,
            'selectBox': SelectBoxComponent,
            'hidden': HiddenComponent,
            'fileUpload': FileUploadComponent,
            'image': ImageComponent,
            'autoComplete': AutoCompleteComponent,
            'button': ButtonComponent,
            'buttonIcon': ButtonIconComponent,
            'swappingBox': SwappingBoxComponent,
            'mapValue': MapValueComponent,
            'radio': RadioComponent,
            'date': DateComponent,
            'number': TextBoxComponent,
            'password': TextBoxComponent,
        };
    }
    DynamicInputComponent.prototype.ngOnInit = function () {
        this.createComponent();
    };
    DynamicInputComponent.prototype.createComponent = function () {
        var component;
        if (typeof (this.type) == 'undefined' || typeof (this.componentTypes[this.type]) == 'undefined') {
            component = LabelComponent;
        }
        else {
            component = this.componentTypes[this.type];
        }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var componentRef = this.inputComp.viewContainerRef.createComponent(componentFactory);
        this.instantInput = componentRef.instance;
        this.instantInput.data = this.data;
        this.instantInput.type = this.type;
        this.instantInput.rowIndex = this.rowIndex;
        this.instantInput.option = this.option;
        this.instantInput.fieldCreation = this.fieldCreation;
        var callBack = this.callBack;
        this.instantInput.callBack.subscribe(function (input) {
            callBack.emit(input);
        });
        var panelCallBack = this.panelCallBack;
        var inputIndex = this.inputIndex;
        this.instantInput.panelCallBack.subscribe(function (input) {
            var eventData = Object.assign(input, {
                fieldIndex: inputIndex
            });
            panelCallBack.emit(eventData);
        });
    };
    DynamicInputComponent.prototype.processCall = function (data) {
        this.instantInput.processCall(data);
    };
    DynamicInputComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: AnimationService }
    ]; };
    __decorate([
        ViewChild(InputComponent, { static: true }),
        __metadata("design:type", InputComponent)
    ], DynamicInputComponent.prototype, "inputComp", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "type", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "option", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "fieldCreation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "inputIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "rowIndex", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "callBack", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DynamicInputComponent.prototype, "panelCallBack", void 0);
    DynamicInputComponent = __decorate([
        Component({
            selector: 'lb9-dynamic-input',
            template: "<lb9-input></lb9-input>\r\n\r\n"
        }),
        __metadata("design:paramtypes", [ComponentFactoryResolver, AnimationService])
    ], DynamicInputComponent);
    return DynamicInputComponent;
}());
export { DynamicInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2R5bmFtaWMtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0s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RmFjdG9yeVJlc29sdmVyLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXRDb21wb25lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHtUZXh0Qm94Q29tcG9uZW50fSBmcm9tICcuL3RleHRib3gvdGV4dGJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0xhYmVsQ29tcG9uZW50fSBmcm9tICcuL2xhYmVsL2xhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Q2hlY2tCb3hDb21wb25lbnR9IGZyb20gJy4vY2hlY2stYm94L2NoZWNrLWJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1RleHRBcmVhQ29tcG9uZW50fSBmcm9tICcuL3RleHQtYXJlYS90ZXh0LWFyZWEuY29tcG9uZW50JztcclxuaW1wb3J0IHtTZWxlY3RCb3hDb21wb25lbnR9IGZyb20gJy4vc2VsZWN0LWJveC9zZWxlY3QtYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SGlkZGVuQ29tcG9uZW50fSBmcm9tICcuL2hpZGRlbi9oaWRkZW4uY29tcG9uZW50JztcclxuaW1wb3J0IHtGaWxlVXBsb2FkQ29tcG9uZW50fSBmcm9tICcuL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SW1hZ2VDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtBdXRvQ29tcGxldGVDb21wb25lbnR9IGZyb20gJy4vYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHtTd2FwcGluZ0JveENvbXBvbmVudH0gZnJvbSAnLi9zd2FwcGluZy1ib3gvc3dhcHBpbmctYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TWFwVmFsdWVDb21wb25lbnR9IGZyb20gJy4vbWFwLXZhbHVlL21hcC12YWx1ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1JhZGlvQ29tcG9uZW50fSBmcm9tICcuL3JhZGlvL3JhZGlvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RGF0ZUNvbXBvbmVudH0gZnJvbSAnLi9kYXRlL2RhdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtCdXR0b25JY29uQ29tcG9uZW50fSBmcm9tICcuL2J1dHRvbi1pY29uL2J1dHRvbi1pY29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7Q29sb3JTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vY29sb3Itc2VsZWN0L2NvbG9yLXNlbGVjdC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xiOS1keW5hbWljLWlucHV0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWlucHV0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0lucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBWaWV3Q2hpbGQoSW5wdXRDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pIGlucHV0Q29tcDogSW5wdXRDb21wb25lbnQ7XHJcbiAgICBASW5wdXQoKSBkYXRhOiBPYmplY3Q7XHJcbiAgICBASW5wdXQoKSB0eXBlO1xyXG4gICAgQElucHV0KCkgb3B0aW9uO1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgaW5zdGFudElucHV0OiBJbnB1dENvbXBvbmVudDtcclxuICAgIGNvbXBvbmVudFR5cGVzID0ge1xyXG4gICAgICAgICd0ZXh0Qm94JzogVGV4dEJveENvbXBvbmVudCxcclxuICAgICAgICAndGV4dEFyZWEnOiBUZXh0QXJlYUNvbXBvbmVudCxcclxuICAgICAgICAnbGFiZWwnOiBMYWJlbENvbXBvbmVudCxcclxuICAgICAgICAnY2hlY2tCb3gnOiBDaGVja0JveENvbXBvbmVudCxcclxuICAgICAgICAnY29sb3JTZWxlY3QnOiBDb2xvclNlbGVjdENvbXBvbmVudCxcclxuICAgICAgICAnc2VsZWN0Qm94JzogU2VsZWN0Qm94Q29tcG9uZW50LFxyXG4gICAgICAgICdoaWRkZW4nOiBIaWRkZW5Db21wb25lbnQsXHJcbiAgICAgICAgJ2ZpbGVVcGxvYWQnOiBGaWxlVXBsb2FkQ29tcG9uZW50LFxyXG4gICAgICAgICdpbWFnZSc6IEltYWdlQ29tcG9uZW50LFxyXG4gICAgICAgICdhdXRvQ29tcGxldGUnOiBBdXRvQ29tcGxldGVDb21wb25lbnQsXHJcbiAgICAgICAgJ2J1dHRvbic6IEJ1dHRvbkNvbXBvbmVudCxcclxuICAgICAgICAnYnV0dG9uSWNvbic6IEJ1dHRvbkljb25Db21wb25lbnQsXHJcbiAgICAgICAgJ3N3YXBwaW5nQm94JzogU3dhcHBpbmdCb3hDb21wb25lbnQsXHJcbiAgICAgICAgJ21hcFZhbHVlJzogTWFwVmFsdWVDb21wb25lbnQsXHJcbiAgICAgICAgJ3JhZGlvJzogUmFkaW9Db21wb25lbnQsXHJcbiAgICAgICAgJ2RhdGUnOiBEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgICdudW1iZXInOiBUZXh0Qm94Q29tcG9uZW50LFxyXG4gICAgICAgICdwYXNzd29yZCc6IFRleHRCb3hDb21wb25lbnQsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIscHJpdmF0ZSBhbmltYXRpb25TZXJ2aWNlOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDtcclxuICAgICAgICBpZiAodHlwZW9mKHRoaXMudHlwZSkgPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mKHRoaXMuY29tcG9uZW50VHlwZXNbdGhpcy50eXBlXSkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gTGFiZWxDb21wb25lbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRUeXBlc1t0aGlzLnR5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHRoaXMuaW5wdXRDb21wLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0ID0gPElucHV0Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmluc3RhbnRJbnB1dC5kYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQucm93SW5kZXggPSB0aGlzLnJvd0luZGV4O1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0Lm9wdGlvbiA9IHRoaXMub3B0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LmZpZWxkQ3JlYXRpb24gPSB0aGlzLmZpZWxkQ3JlYXRpb247XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBjYWxsQmFjayA9IHRoaXMuY2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQuY2FsbEJhY2suc3Vic2NyaWJlKGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgICAgICBjYWxsQmFjay5lbWl0KGlucHV0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHBhbmVsQ2FsbEJhY2sgPSB0aGlzLnBhbmVsQ2FsbEJhY2s7XHJcbiAgICAgICAgbGV0IGlucHV0SW5kZXggPSB0aGlzLmlucHV0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQucGFuZWxDYWxsQmFjay5zdWJzY3JpYmUoZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudERhdGEgPSBPYmplY3QuYXNzaWduKGlucHV0LCB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZEluZGV4OiBpbnB1dEluZGV4XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhbmVsQ2FsbEJhY2suZW1pdChldmVudERhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzQ2FsbChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQucHJvY2Vzc0NhbGwoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19