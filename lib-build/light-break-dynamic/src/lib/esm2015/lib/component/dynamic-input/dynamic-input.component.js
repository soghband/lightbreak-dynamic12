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
let DynamicInputComponent = class DynamicInputComponent {
    constructor(componentFactoryResolver, animationService) {
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
    ngOnInit() {
        this.createComponent();
    }
    createComponent() {
        let component;
        if (typeof (this.type) == 'undefined' || typeof (this.componentTypes[this.type]) == 'undefined') {
            component = LabelComponent;
        }
        else {
            component = this.componentTypes[this.type];
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let componentRef = this.inputComp.viewContainerRef.createComponent(componentFactory);
        this.instantInput = componentRef.instance;
        this.instantInput.data = this.data;
        this.instantInput.type = this.type;
        this.instantInput.rowIndex = this.rowIndex;
        this.instantInput.option = this.option;
        this.instantInput.fieldCreation = this.fieldCreation;
        let callBack = this.callBack;
        this.instantInput.callBack.subscribe(function (input) {
            callBack.emit(input);
        });
        let panelCallBack = this.panelCallBack;
        let inputIndex = this.inputIndex;
        this.instantInput.panelCallBack.subscribe(function (input) {
            let eventData = Object.assign(input, {
                fieldIndex: inputIndex
            });
            panelCallBack.emit(eventData);
        });
    }
    processCall(data) {
        this.instantInput.processCall(data);
    }
};
DynamicInputComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: AnimationService }
];
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
export { DynamicInputComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L2R5bmFtaWMtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0s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ZXNvbHZlciwgSW5wdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7SW5wdXRDb21wb25lbnR9IGZyb20gJy4uL2lucHV0Q29tcG9uZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7VGV4dEJveENvbXBvbmVudH0gZnJvbSAnLi90ZXh0Ym94L3RleHRib3guY29tcG9uZW50JztcclxuaW1wb3J0IHtMYWJlbENvbXBvbmVudH0gZnJvbSAnLi9sYWJlbC9sYWJlbC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NoZWNrQm94Q29tcG9uZW50fSBmcm9tICcuL2NoZWNrLWJveC9jaGVjay1ib3guY29tcG9uZW50JztcclxuaW1wb3J0IHtUZXh0QXJlYUNvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWFyZWEvdGV4dC1hcmVhLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7U2VsZWN0Qm94Q29tcG9uZW50fSBmcm9tICcuL3NlbGVjdC1ib3gvc2VsZWN0LWJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0hpZGRlbkNvbXBvbmVudH0gZnJvbSAnLi9oaWRkZW4vaGlkZGVuLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RmlsZVVwbG9hZENvbXBvbmVudH0gZnJvbSAnLi9maWxlLXVwbG9hZC9maWxlLXVwbG9hZC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0ltYWdlQ29tcG9uZW50fSBmcm9tICcuL2ltYWdlL2ltYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QXV0b0NvbXBsZXRlQ29tcG9uZW50fSBmcm9tICcuL2F1dG8tY29tcGxldGUvYXV0by1jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0J1dHRvbkNvbXBvbmVudH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7U3dhcHBpbmdCb3hDb21wb25lbnR9IGZyb20gJy4vc3dhcHBpbmctYm94L3N3YXBwaW5nLWJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge01hcFZhbHVlQ29tcG9uZW50fSBmcm9tICcuL21hcC12YWx1ZS9tYXAtdmFsdWUuY29tcG9uZW50JztcclxuaW1wb3J0IHtSYWRpb0NvbXBvbmVudH0gZnJvbSAnLi9yYWRpby9yYWRpby5jb21wb25lbnQnO1xyXG5pbXBvcnQge0RhdGVDb21wb25lbnR9IGZyb20gJy4vZGF0ZS9kYXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QnV0dG9uSWNvbkNvbXBvbmVudH0gZnJvbSAnLi9idXR0b24taWNvbi9idXR0b24taWNvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge0NvbG9yU2VsZWN0Q29tcG9uZW50fSBmcm9tICcuL2NvbG9yLXNlbGVjdC9jb2xvci1zZWxlY3QuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdsYjktZHluYW1pYy1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZHluYW1pYy1pbnB1dC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBAVmlld0NoaWxkKElucHV0Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dENvbXA6IElucHV0Q29tcG9uZW50O1xyXG4gICAgQElucHV0KCkgZGF0YTogT2JqZWN0O1xyXG4gICAgQElucHV0KCkgdHlwZTtcclxuICAgIEBJbnB1dCgpIG9wdGlvbjtcclxuICAgIEBJbnB1dCgpIGZpZWxkQ3JlYXRpb247XHJcbiAgICBASW5wdXQoKSBpbnB1dEluZGV4O1xyXG4gICAgQElucHV0KCkgcm93SW5kZXg7XHJcbiAgICBAT3V0cHV0KCkgY2FsbEJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIGluc3RhbnRJbnB1dDogSW5wdXRDb21wb25lbnQ7XHJcbiAgICBjb21wb25lbnRUeXBlcyA9IHtcclxuICAgICAgICAndGV4dEJveCc6IFRleHRCb3hDb21wb25lbnQsXHJcbiAgICAgICAgJ3RleHRBcmVhJzogVGV4dEFyZWFDb21wb25lbnQsXHJcbiAgICAgICAgJ2xhYmVsJzogTGFiZWxDb21wb25lbnQsXHJcbiAgICAgICAgJ2NoZWNrQm94JzogQ2hlY2tCb3hDb21wb25lbnQsXHJcbiAgICAgICAgJ2NvbG9yU2VsZWN0JzogQ29sb3JTZWxlY3RDb21wb25lbnQsXHJcbiAgICAgICAgJ3NlbGVjdEJveCc6IFNlbGVjdEJveENvbXBvbmVudCxcclxuICAgICAgICAnaGlkZGVuJzogSGlkZGVuQ29tcG9uZW50LFxyXG4gICAgICAgICdmaWxlVXBsb2FkJzogRmlsZVVwbG9hZENvbXBvbmVudCxcclxuICAgICAgICAnaW1hZ2UnOiBJbWFnZUNvbXBvbmVudCxcclxuICAgICAgICAnYXV0b0NvbXBsZXRlJzogQXV0b0NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgICAgICdidXR0b24nOiBCdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgJ2J1dHRvbkljb24nOiBCdXR0b25JY29uQ29tcG9uZW50LFxyXG4gICAgICAgICdzd2FwcGluZ0JveCc6IFN3YXBwaW5nQm94Q29tcG9uZW50LFxyXG4gICAgICAgICdtYXBWYWx1ZSc6IE1hcFZhbHVlQ29tcG9uZW50LFxyXG4gICAgICAgICdyYWRpbyc6IFJhZGlvQ29tcG9uZW50LFxyXG4gICAgICAgICdkYXRlJzogRGF0ZUNvbXBvbmVudCxcclxuICAgICAgICAnbnVtYmVyJzogVGV4dEJveENvbXBvbmVudCxcclxuICAgICAgICAncGFzc3dvcmQnOiBUZXh0Qm94Q29tcG9uZW50LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLHByaXZhdGUgYW5pbWF0aW9uU2VydmljZTogQW5pbWF0aW9uU2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9uZW50KCkge1xyXG4gICAgICAgIGxldCBjb21wb25lbnQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZih0aGlzLnR5cGUpID09ICd1bmRlZmluZWQnIHx8IHR5cGVvZih0aGlzLmNvbXBvbmVudFR5cGVzW3RoaXMudHlwZV0pID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IExhYmVsQ29tcG9uZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50VHlwZXNbdGhpcy50eXBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRSZWYgPSB0aGlzLmlucHV0Q29tcC52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuICAgICAgICB0aGlzLmluc3RhbnRJbnB1dCA9IDxJbnB1dENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQuZGF0YSA9IHRoaXMuZGF0YTtcclxuICAgICAgICB0aGlzLmluc3RhbnRJbnB1dC50eXBlID0gdGhpcy50eXBlO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LnJvd0luZGV4ID0gdGhpcy5yb3dJbmRleDtcclxuICAgICAgICB0aGlzLmluc3RhbnRJbnB1dC5vcHRpb24gPSB0aGlzLm9wdGlvbjtcclxuICAgICAgICB0aGlzLmluc3RhbnRJbnB1dC5maWVsZENyZWF0aW9uID0gdGhpcy5maWVsZENyZWF0aW9uO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgY2FsbEJhY2sgPSB0aGlzLmNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LmNhbGxCYWNrLnN1YnNjcmliZShmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICAgICAgY2FsbEJhY2suZW1pdChpbnB1dCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwYW5lbENhbGxCYWNrID0gdGhpcy5wYW5lbENhbGxCYWNrO1xyXG4gICAgICAgIGxldCBpbnB1dEluZGV4ID0gdGhpcy5pbnB1dEluZGV4O1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LnBhbmVsQ2FsbEJhY2suc3Vic2NyaWJlKGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnREYXRhID0gT2JqZWN0LmFzc2lnbihpbnB1dCwge1xyXG4gICAgICAgICAgICAgICAgZmllbGRJbmRleDogaW5wdXRJbmRleFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBwYW5lbENhbGxCYWNrLmVtaXQoZXZlbnREYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0NhbGwoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LnByb2Nlc3NDYWxsKGRhdGEpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==