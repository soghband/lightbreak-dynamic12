import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DynamicBehaviorComponent} from '../../dynamic-behavior/dynamic-behavior.component';
import {AnimationService} from '../../../service/animation.service';

@Component({
  selector: 'lb9-color-select',
  templateUrl: './color-select.component.html'
})
export class ColorSelectComponent extends DynamicBehaviorComponent implements OnInit {
  @Input() data;
  @Input() option;
  @Input() fieldCreation;
  @Input() inputIndex;
  @Input() rowIndex;
  @Output() callBack = new EventEmitter();
  @Output() panelCallBack = new EventEmitter();
  objKeys = Object.keys;
  columnCalculate;
  
  constructor(animationService : AnimationService) {
    super(animationService);
    this.animateProcess();
  }
  
  ngOnInit() {
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
    if (this.option.mode == "add") {
      if (typeof(this.fieldCreation.default) != "undefined") {
        if (Array.isArray(this.fieldCreation.default)) {
          this.data[this.fieldCreation.fieldName] = Object.assign([],this.fieldCreation.default);
        } else if(typeof( this.fieldCreation.default) == "string") {
          this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
        }
      } else {
        if (this.fieldCreation.fieldName.valueList) {
          this.data[this.fieldCreation.fieldName] = [this.fieldCreation.fieldName.valueList[0].value];
        } else {
          this.data[this.fieldCreation.fieldName] = [null]
        }
      }
    }
  }
  assignColor(color, dataIndex) {
    this.data[this.fieldCreation.fieldName][dataIndex] = color;
  }
  addMultiVal() {
    this.data[this.fieldCreation.fieldName].push("");
  }
  
  deleteMultiVal(dataIndex) {
    if (this.data[this.fieldCreation.fieldName].length > 1) {
      this.data[this.fieldCreation.fieldName].splice(dataIndex,1);
    }
  }
}
