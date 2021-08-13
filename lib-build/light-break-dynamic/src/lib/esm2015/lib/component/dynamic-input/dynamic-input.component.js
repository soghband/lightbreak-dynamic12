import { Component, ComponentFactoryResolver, Input, ViewChild, EventEmitter, Output } from '@angular/core';
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
export class DynamicInputComponent {
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
}
DynamicInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-dynamic-input',
                template: "<lb9-input></lb9-input>\r\n\r\n"
            },] }
];
DynamicInputComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: AnimationService }
];
DynamicInputComponent.propDecorators = {
    inputComp: [{ type: ViewChild, args: [InputComponent, { static: true },] }],
    data: [{ type: Input }],
    type: [{ type: Input }],
    option: [{ type: Input }],
    fieldCreation: [{ type: Input }],
    inputIndex: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2R5bmFtaWMtaW5wdXQvZHluYW1pYy1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FB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QUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsS0FBSztZQUNyRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDakMsVUFBVSxFQUFFLFVBQVU7YUFDekIsQ0FBQyxDQUFBO1lBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSTtRQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsMkNBQTZDO2FBQ2hEOzs7WUF2QmtCLHdCQUF3QjtZQWlCbkMsZ0JBQWdCOzs7d0JBUW5CLFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO21CQUMxQyxLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxNQUFNOzRCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEV2ZW50RW1pdHRlciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtJbnB1dENvbXBvbmVudH0gZnJvbSAnLi4vaW5wdXRDb21wb25lbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHtUZXh0Qm94Q29tcG9uZW50fSBmcm9tICcuL3RleHRib3gvdGV4dGJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge0xhYmVsQ29tcG9uZW50fSBmcm9tICcuL2xhYmVsL2xhYmVsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Q2hlY2tCb3hDb21wb25lbnR9IGZyb20gJy4vY2hlY2stYm94L2NoZWNrLWJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQge1RleHRBcmVhQ29tcG9uZW50fSBmcm9tICcuL3RleHQtYXJlYS90ZXh0LWFyZWEuY29tcG9uZW50JztcclxuaW1wb3J0IHtTZWxlY3RCb3hDb21wb25lbnR9IGZyb20gJy4vc2VsZWN0LWJveC9zZWxlY3QtYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SGlkZGVuQ29tcG9uZW50fSBmcm9tICcuL2hpZGRlbi9oaWRkZW4uY29tcG9uZW50JztcclxuaW1wb3J0IHtGaWxlVXBsb2FkQ29tcG9uZW50fSBmcm9tICcuL2ZpbGUtdXBsb2FkL2ZpbGUtdXBsb2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7SW1hZ2VDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UvaW1hZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHtBdXRvQ29tcGxldGVDb21wb25lbnR9IGZyb20gJy4vYXV0by1jb21wbGV0ZS9hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHtTd2FwcGluZ0JveENvbXBvbmVudH0gZnJvbSAnLi9zd2FwcGluZy1ib3gvc3dhcHBpbmctYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TWFwVmFsdWVDb21wb25lbnR9IGZyb20gJy4vbWFwLXZhbHVlL21hcC12YWx1ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge1JhZGlvQ29tcG9uZW50fSBmcm9tICcuL3JhZGlvL3JhZGlvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RGF0ZUNvbXBvbmVudH0gZnJvbSAnLi9kYXRlL2RhdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtCdXR0b25JY29uQ29tcG9uZW50fSBmcm9tICcuL2J1dHRvbi1pY29uL2J1dHRvbi1pY29uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7QW5pbWF0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZS9hbmltYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7Q29sb3JTZWxlY3RDb21wb25lbnR9IGZyb20gJy4vY29sb3Itc2VsZWN0L2NvbG9yLXNlbGVjdC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2xiOS1keW5hbWljLWlucHV0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9keW5hbWljLWlucHV0LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0lucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBWaWV3Q2hpbGQoSW5wdXRDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pIGlucHV0Q29tcDogSW5wdXRDb21wb25lbnQ7XHJcbiAgICBASW5wdXQoKSBkYXRhOiBPYmplY3Q7XHJcbiAgICBASW5wdXQoKSB0eXBlO1xyXG4gICAgQElucHV0KCkgb3B0aW9uO1xyXG4gICAgQElucHV0KCkgZmllbGRDcmVhdGlvbjtcclxuICAgIEBJbnB1dCgpIGlucHV0SW5kZXg7XHJcbiAgICBASW5wdXQoKSByb3dJbmRleDtcclxuICAgIEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKSBwYW5lbENhbGxCYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgaW5zdGFudElucHV0OiBJbnB1dENvbXBvbmVudDtcclxuICAgIGNvbXBvbmVudFR5cGVzID0ge1xyXG4gICAgICAgICd0ZXh0Qm94JzogVGV4dEJveENvbXBvbmVudCxcclxuICAgICAgICAndGV4dEFyZWEnOiBUZXh0QXJlYUNvbXBvbmVudCxcclxuICAgICAgICAnbGFiZWwnOiBMYWJlbENvbXBvbmVudCxcclxuICAgICAgICAnY2hlY2tCb3gnOiBDaGVja0JveENvbXBvbmVudCxcclxuICAgICAgICAnY29sb3JTZWxlY3QnOiBDb2xvclNlbGVjdENvbXBvbmVudCxcclxuICAgICAgICAnc2VsZWN0Qm94JzogU2VsZWN0Qm94Q29tcG9uZW50LFxyXG4gICAgICAgICdoaWRkZW4nOiBIaWRkZW5Db21wb25lbnQsXHJcbiAgICAgICAgJ2ZpbGVVcGxvYWQnOiBGaWxlVXBsb2FkQ29tcG9uZW50LFxyXG4gICAgICAgICdpbWFnZSc6IEltYWdlQ29tcG9uZW50LFxyXG4gICAgICAgICdhdXRvQ29tcGxldGUnOiBBdXRvQ29tcGxldGVDb21wb25lbnQsXHJcbiAgICAgICAgJ2J1dHRvbic6IEJ1dHRvbkNvbXBvbmVudCxcclxuICAgICAgICAnYnV0dG9uSWNvbic6IEJ1dHRvbkljb25Db21wb25lbnQsXHJcbiAgICAgICAgJ3N3YXBwaW5nQm94JzogU3dhcHBpbmdCb3hDb21wb25lbnQsXHJcbiAgICAgICAgJ21hcFZhbHVlJzogTWFwVmFsdWVDb21wb25lbnQsXHJcbiAgICAgICAgJ3JhZGlvJzogUmFkaW9Db21wb25lbnQsXHJcbiAgICAgICAgJ2RhdGUnOiBEYXRlQ29tcG9uZW50LFxyXG4gICAgICAgICdudW1iZXInOiBUZXh0Qm94Q29tcG9uZW50LFxyXG4gICAgICAgICdwYXNzd29yZCc6IFRleHRCb3hDb21wb25lbnQsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIscHJpdmF0ZSBhbmltYXRpb25TZXJ2aWNlOiBBbmltYXRpb25TZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDb21wb25lbnQoKSB7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudDtcclxuICAgICAgICBpZiAodHlwZW9mKHRoaXMudHlwZSkgPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mKHRoaXMuY29tcG9uZW50VHlwZXNbdGhpcy50eXBlXSkgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gTGFiZWxDb21wb25lbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRUeXBlc1t0aGlzLnR5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudFJlZiA9IHRoaXMuaW5wdXRDb21wLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0ID0gPElucHV0Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgICAgICB0aGlzLmluc3RhbnRJbnB1dC5kYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LnR5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQucm93SW5kZXggPSB0aGlzLnJvd0luZGV4O1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0Lm9wdGlvbiA9IHRoaXMub3B0aW9uO1xyXG4gICAgICAgIHRoaXMuaW5zdGFudElucHV0LmZpZWxkQ3JlYXRpb24gPSB0aGlzLmZpZWxkQ3JlYXRpb247XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBjYWxsQmFjayA9IHRoaXMuY2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQuY2FsbEJhY2suc3Vic2NyaWJlKGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgICAgICBjYWxsQmFjay5lbWl0KGlucHV0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHBhbmVsQ2FsbEJhY2sgPSB0aGlzLnBhbmVsQ2FsbEJhY2s7XHJcbiAgICAgICAgbGV0IGlucHV0SW5kZXggPSB0aGlzLmlucHV0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQucGFuZWxDYWxsQmFjay5zdWJzY3JpYmUoZnVuY3Rpb24gKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGxldCBldmVudERhdGEgPSBPYmplY3QuYXNzaWduKGlucHV0LCB7XHJcbiAgICAgICAgICAgICAgICBmaWVsZEluZGV4OiBpbnB1dEluZGV4XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHBhbmVsQ2FsbEJhY2suZW1pdChldmVudERhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzQ2FsbChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50SW5wdXQucHJvY2Vzc0NhbGwoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuIl19