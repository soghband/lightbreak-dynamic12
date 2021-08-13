import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {InputComponent} from '../inputComponent.component';
import {TextBoxComponent} from './textbox/textbox.component';
import {LabelComponent} from './label/label.component';
import {CheckBoxComponent} from './check-box/check-box.component';
import {TextAreaComponent} from './text-area/text-area.component';
import {SelectBoxComponent} from './select-box/select-box.component';
import {HiddenComponent} from './hidden/hidden.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {ImageComponent} from './image/image.component';
import {AutoCompleteComponent} from './auto-complete/auto-complete.component';
import {ButtonComponent} from './button/button.component';
import {SwappingBoxComponent} from './swapping-box/swapping-box.component';
import {MapValueComponent} from './map-value/map-value.component';
import {RadioComponent} from './radio/radio.component';
import {DateComponent} from './date/date.component';
import {ButtonIconComponent} from './button-icon/button-icon.component';
import {AnimationService} from '../../service/animation.service';
import {ColorSelectComponent} from './color-select/color-select.component';

@Component({
    selector: 'lb12-dynamic-input',
    templateUrl: './dynamic-input.component.html'
})
export class DynamicInputComponent implements OnInit {
    @ViewChild(InputComponent, { static: true }) inputComp: InputComponent;
    @Input() data: Object;
    @Input() type;
    @Input() option;
    @Input() fieldCreation;
    @Input() inputIndex;
    @Input() rowIndex;
    @Output() callBack = new EventEmitter();
    @Output() panelCallBack = new EventEmitter();
    instantInput: InputComponent;
    componentTypes = {
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

    constructor(private componentFactoryResolver: ComponentFactoryResolver,private animationService: AnimationService) {
    }

    ngOnInit() {
        this.createComponent();
    }

    createComponent() {
        let component;
        if (typeof(this.type) == 'undefined' || typeof(this.componentTypes[this.type]) == 'undefined') {
            component = LabelComponent;
        } else {
            component = this.componentTypes[this.type];
        }
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        let componentRef = this.inputComp.viewContainerRef.createComponent(componentFactory);
        this.instantInput = <InputComponent>componentRef.instance;
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
            })
            panelCallBack.emit(eventData);
        });

    }

    processCall(data) {
        this.instantInput.processCall(data);
    }
}
