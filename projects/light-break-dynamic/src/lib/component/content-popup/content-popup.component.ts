import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FadeInOutAnimation} from './animetion';
import { timer } from 'rxjs';


@Component({
  selector: 'lb12-content-popup',
  templateUrl: './content-popup.component.html',
  styleUrls: ['./content-popup.component.scss'],
  animations: [FadeInOutAnimation]
})
export class ContentPopupComponent implements OnInit {
  @Input() header="header";
  @Input() footer="";
  @Input() elementName = 'default';
  @Input() closeByButtonOnly = false;
  @Input() customClass = null;
  @Input() noScroll = false;
  @Output() callBack = new EventEmitter();
  display = false;
  overContent = false;
  animationState = 'out';
  onAnimation = false;
  closeDelay = timer(400);
  constructor() { }

  ngOnInit(): void {
  }
  
  closePopup(forceClose = false) {
    if (((!this.overContent && !this.closeByButtonOnly) || forceClose) && !this.onAnimation) {
      this.animationState = 'out';
      this.display = false;
      this.callbackProcess('close');
    }
  }
  showPopup() {
    this.animationState = 'in';
    this.display = true;
    this.callbackProcess('open');
    this.onAnimation = true;
    this.closeDelay.subscribe(() => {
      this.onAnimation = false;
    })
  }
  
  releaseContent() {
    this.overContent = true;
  }
  lockContent() {
    this.overContent = false;
  }
  callbackProcess(action) {
    this.callBack.emit({
      element: "popUp",
      name: this.elementName,
      action: action,
    });
  }
}
