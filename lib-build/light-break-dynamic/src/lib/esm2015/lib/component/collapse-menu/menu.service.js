import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class MenuService {
    constructor() {
        this.emitMenu = new EventEmitter();
        this.menuData = "";
    }
    setMenu(menu) {
        this.menuData = menu;
        this.emitMenu.emit(this.menuData);
    }
    getMenu() {
        return this.menuData;
    }
}
MenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MenuService_Factory() { return new MenuService(); }, token: MenuService, providedIn: "root" });
MenuService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
MenuService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbGlnaHQtYnJlYWstZHluYW1pYy9zcmMvbGliL2NvbXBvbmVudC9jb2xsYXBzZS1tZW51L21lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFLdkQsTUFBTSxPQUFPLFdBQVc7SUFHdEI7UUFGQSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUM3QixhQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ0UsQ0FBQztJQUVqQixPQUFPLENBQUMsSUFBSTtRQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN0QixDQUFDOzs7O1lBZkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNZW51U2VydmljZSB7XG4gIGVtaXRNZW51ID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIG1lbnVEYXRhID0gXCJcIjtcbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgXG4gIHNldE1lbnUobWVudSkge1xuICAgIHRoaXMubWVudURhdGEgPSBtZW51O1xuICAgIHRoaXMuZW1pdE1lbnUuZW1pdCh0aGlzLm1lbnVEYXRhKVxuICB9XG4gIFxuICBnZXRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLm1lbnVEYXRhXG4gIH1cbn1cbiJdfQ==