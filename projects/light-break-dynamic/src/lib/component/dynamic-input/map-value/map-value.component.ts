import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {AnimationService} from '../../../service/animation.service';

@Component({
  templateUrl: './map-value.component.html'
})
export class MapValueComponent extends DynamicBehaviorComponent implements OnInit {
    @Input() data;
    @Input() option;
    @Input() fieldCreation;
    @Input() inputIndex;
    @Input() rowIndex;
    @Output() callBack = new EventEmitter();
    @Output() panelCallBack = new EventEmitter();
    columnCalculate = "";
    objKeys = Object.keys;
    tempValue;
    constructor(animationService : AnimationService) {
        super(animationService);
        this.animateProcess();
    }
    ngOnInit () {
        switch (this.fieldCreation.columnPerLine) {
            case 1 :
                this.columnCalculate = "dp2Col1";
                break;
            case 2 :
                this.columnCalculate = "dp2Col2";
                break;
            case 3 :
                this.columnCalculate = "dp2Col3";
                break;
            case 4 :
                this.columnCalculate = "dp2Col4";
                break;
            default :
                this.columnCalculate = "";
        }
    }
    addMultiVal() {
      this.data[this.fieldCreation.fieldName].push({
          display:"",
          value:""
      })
    }
    deleteMultiVal(dataIndex) {
        if (this.data[this.fieldCreation.fieldName].length > 1) {
            this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
        }
    }
    processKeyUp(event, action, dataIndex) {
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
        if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)){
            if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                return true;
            } else {
                this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                return false;
            }
        }

    }
    processKeyDown(event, action, dataIndex) {
        this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
    }
    processCallBackKeyPress(event, action, dataIndex) {
        this.callBack.emit({
            event:event,
            action:action,
            dataIndex:dataIndex,
            fieldName:this.fieldCreation.fieldName
        });
        if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true){
            let key = event.key;
            if (String(key).match(this.fieldCreation.inputPattern)) {
                return true;
            }
            return false;
        }

        return true;
    }
}
