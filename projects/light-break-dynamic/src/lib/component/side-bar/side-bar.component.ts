import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgScrollbar} from 'ngx-scrollbar';
import {timer} from 'rxjs';

@Component({
  selector: 'lb12-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() sideBarWidth:number = 200;
  @ViewChild(NgScrollbar) aNgScrollBar: NgScrollbar;
  componentWidth: string = "100vw";
  sideBarWidthCal: string = "200px";
  contentWidthCal: string = "calc(100vw - 200px)";
  leftOffset: string = "0px";
  active = true;
  fixScrollBar: boolean;
  public scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  
  constructor() { }

  ngOnInit(): void {
    this.sideBarWidthCal = this.sideBarWidth+"px";
    this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
  }
  
  toggleSideBar() {
    if (this.active == true) {
      this.active = false;
      this.componentWidth = "calc(100vw + " + this.sideBarWidth +"px)";
      this.contentWidthCal = "calc(100vw - 0px)";
      this.leftOffset = "-"+this.sideBarWidth+"px";
    } else {
      this.active = true;
      this.componentWidth = "calc(100vw + 0px)"
      this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
      this.leftOffset = "0px";
    }
  }
  reProcessScrollBar() {
    timer(150).subscribe(() => {
      this.aNgScrollBar.update()
      timer(10).subscribe(() => {
        this.fixScrollBar = this.aNgScrollBar.state.isVerticallyScrollable;
      });
    });
  }
}
