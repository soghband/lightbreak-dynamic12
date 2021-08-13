import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lb9-p2-panel',
  templateUrl: './p2-panel.component.html',
  styleUrls: ['./p2-panel.component.css']
})
export class P2PanelComponent implements OnInit {
  @Input() id = 'not-assign';
  @Input() showCloseBtn = false;
  @Input() header = 'not-assign';
  constructor() { }

  ngOnInit() {
  }

}
