import { __decorate, __metadata } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
let MenuService = class MenuService {
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
};
MenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MenuService_Factory() { return new MenuService(); }, token: MenuService, providedIn: "root" });
MenuService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], MenuService);
export { MenuService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvY29sbGFwc2UtbWVudS9tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUt2RCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBR3RCO1FBRkEsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7UUFDN0IsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNFLENBQUM7SUFFakIsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztDQUNGLENBQUE7O0FBYlksV0FBVztJQUh2QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDOztHQUNXLFdBQVcsQ0FhdkI7U0FiWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNZW51U2VydmljZSB7XG4gIGVtaXRNZW51ID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gIG1lbnVEYXRhID0gXCJcIjtcbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgXG4gIHNldE1lbnUobWVudSkge1xuICAgIHRoaXMubWVudURhdGEgPSBtZW51O1xuICAgIHRoaXMuZW1pdE1lbnUuZW1pdCh0aGlzLm1lbnVEYXRhKVxuICB9XG4gIFxuICBnZXRNZW51KCkge1xuICAgIHJldHVybiB0aGlzLm1lbnVEYXRhXG4gIH1cbn1cbiJdfQ==