import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'lb12-collapse-menu',
  templateUrl: './collapse-menu.component.html',
  styleUrls: ['./collapse-menu.component.css']
})
export class CollapseMenuComponent implements OnInit {
  @Input() menuObject = {
    option: null,
    menuList: []
  };
  @Input() role = [];
  @Input() activeLinkCode = "";
  @Input() level = 0;
  @Input() option = {
    rootPadding: 10,
    childPadding: 10,
    itemHeight: 30
  };
  @Output() callback = new EventEmitter();
  padding = "0px";
  lineHeight = "30px"
  constructor() { }

  ngOnInit(): void {
    if (this.menuObject.option) {
      this.option = Object.assign(this.option, this.menuObject.option);
      // console.log(this.option);
    }
    this.padding = String(this.option.childPadding + (this.level * this.option.childPadding)) + "px";
    this.lineHeight = this.option.itemHeight+"px";
  }
  activeItem(index) {
    if (this.menuObject.menuList[index].children) {
      if (!this.menuObject.menuList[index].active) {
        this.menuObject.menuList[index].active = true;
      } else {
        this.menuObject.menuList[index].active = false;
      }
    }
    this.callback.emit({
      route: this.menuObject.menuList[index].route,
      code: this.menuObject.menuList[index].code,
      children: (this.menuObject.menuList[index].children ? this.menuObject.menuList[index].children.length : 0)
    });
  }
  getHeight(index) {
    let height = "0px";
    if (this.menuObject.menuList[index].active) {
      let childActive = this.getChildActiveLength(this.menuObject.menuList[index].children);
      height = (childActive * this.option.itemHeight) + "px";
    }
    return height;
  }
  getChildActiveLength(menuChild) {
    let itemActive = 0;
    if (menuChild) {
      // itemActive = menuChild.menuList.length;
      for (let childItemIndex in menuChild.menuList) {
        let childItem = menuChild.menuList[childItemIndex]
        if (this.checkChildRole(childItem)) {
          itemActive++;
        }
        if (childItem.active && this.checkRole(childItemIndex)) {
          itemActive += this.getChildActiveLength(childItem.children);
        }
      }
    }
    return itemActive;
  }
  childCallback(data) {
    this.callback.emit(data);
  }
  checkRole(index) {
    if (!this.menuObject.menuList[index].role) {
      return true;
    } else {
      let allow = true;
      for (let roleItem of this.menuObject.menuList[index].role) {
        if (this.role != null && this.role.indexOf(roleItem) < 0) {
          allow = false
        }
        if (allow == false) {
          break;
        }
      }
      return allow;
    }
  }
  checkChildRole(child) {
    if (!child.role) {
      return true
    } else {
      let allow = true;
      for (let roleItem of child.role) {
        if (this.role != null && this.role.indexOf(roleItem) < 0) {
          allow = false
        }
        if (allow == false) {
          break;
        }
      }
      return allow;
    }
  }
}
