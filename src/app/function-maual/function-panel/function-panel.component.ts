import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-function-panel',
  templateUrl: './function-panel.component.html',
  styleUrls: ['./function-panel.component.css']
})
export class FunctionPanelComponent implements OnInit {
  @Input() id = 'not-assign';
  @Input() header = 'not-assign';
  @Input() margin = true;
  constructor() { }

  ngOnInit() {
  }

}
