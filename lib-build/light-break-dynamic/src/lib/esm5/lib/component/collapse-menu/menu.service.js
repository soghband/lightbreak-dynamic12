import { __decorate, __metadata } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var MenuService = /** @class */ (function () {
    function MenuService() {
        this.emitMenu = new EventEmitter();
        this.menuData = "";
    }
    MenuService.prototype.setMenu = function (menu) {
        this.menuData = menu;
        this.emitMenu.emit(this.menuData);
    };
    MenuService.prototype.getMenu = function () {
        return this.menuData;
    };
    MenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MenuService_Factory() { return new MenuService(); }, token: MenuService, providedIn: "root" });
    MenuService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], MenuService);
    return MenuService;
}());
export { MenuService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvY29sbGFwc2UtbWVudS9tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUt2RDtJQUdFO1FBRkEsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7UUFDN0IsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNFLENBQUM7SUFFakIsNkJBQU8sR0FBUCxVQUFRLElBQUk7UUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQzs7SUFaVSxXQUFXO1FBSHZCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7O09BQ1csV0FBVyxDQWF2QjtzQkFsQkQ7Q0FrQkMsQUFiRCxJQWFDO1NBYlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTWVudVNlcnZpY2Uge1xuICBlbWl0TWVudSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBtZW51RGF0YSA9IFwiXCI7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIFxuICBzZXRNZW51KG1lbnUpIHtcbiAgICB0aGlzLm1lbnVEYXRhID0gbWVudTtcbiAgICB0aGlzLmVtaXRNZW51LmVtaXQodGhpcy5tZW51RGF0YSlcbiAgfVxuICBcbiAgZ2V0TWVudSgpIHtcbiAgICByZXR1cm4gdGhpcy5tZW51RGF0YVxuICB9XG59XG4iXX0=