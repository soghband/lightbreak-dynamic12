import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  emitMenu = new EventEmitter()
  menuData = "";
  constructor() { }
  
  setMenu(menu) {
    this.menuData = menu;
    this.emitMenu.emit(this.menuData)
  }
  
  getMenu() {
    return this.menuData
  }
}
