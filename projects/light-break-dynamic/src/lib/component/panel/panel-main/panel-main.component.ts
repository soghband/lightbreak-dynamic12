import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lb9-panel-main',
  templateUrl: './panel-main.component.html',
  styleUrls: ['./panel-main.component.scss']
})
export class PanelMainComponent implements OnInit {
  @Input() id = 'not-assign';
  @Input() showCloseBtn = false;
  @Input() header = 'not-assign';
  @Input() margin = false;
  constructor() { }

  ngOnInit() {
  }

}
