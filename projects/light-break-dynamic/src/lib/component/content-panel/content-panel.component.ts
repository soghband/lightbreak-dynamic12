import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PanelData} from './panel-data';

@Component({
  selector: 'lb12-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.css']
})
export class ContentPanelComponent implements OnInit, OnDestroy {

  @Input() panelData: PanelData = null;
  constructor() { }

  ngOnInit(): void {
    // let htmlHead = document.getElementsByTagName("header")/
    let styleTag = document.createElement("style");
    styleTag.id = "style_"+this.panelData.id
    styleTag.innerText = this.panelData.css
    document.head.appendChild(styleTag)
  }
  ngOnDestroy(): void {
    let destroyId = document.getElementById("style_"+this.panelData.id)
    destroyId.remove()
  }
}
