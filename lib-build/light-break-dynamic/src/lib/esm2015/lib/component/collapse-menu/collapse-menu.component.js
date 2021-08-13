import { __decorate, __metadata } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let CollapseMenuComponent = class CollapseMenuComponent {
    constructor() {
        this.menuObject = {
            option: null,
            menuList: []
        };
        this.role = [];
        this.activeLinkCode = "";
        this.level = 0;
        this.option = {
            rootPadding: 10,
            childPadding: 10,
            itemHeight: 30
        };
        this.callback = new EventEmitter();
        this.padding = "0px";
        this.lineHeight = "30px";
    }
    ngOnInit() {
        if (this.menuObject.option) {
            this.option = Object.assign(this.option, this.menuObject.option);
            // console.log(this.option);
        }
        this.padding = String(this.option.childPadding + (this.level * this.option.childPadding)) + "px";
        this.lineHeight = this.option.itemHeight + "px";
    }
    activeItem(index) {
        if (this.menuObject.menuList[index].children) {
            if (!this.menuObject.menuList[index].active) {
                this.menuObject.menuList[index].active = true;
            }
            else {
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
                let childItem = menuChild.menuList[childItemIndex];
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
        }
        else {
            let allow = true;
            for (let roleItem of this.menuObject.menuList[index].role) {
                if (this.role != null && this.role.indexOf(roleItem) < 0) {
                    allow = false;
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
            return true;
        }
        else {
            let allow = true;
            for (let roleItem of child.role) {
                if (this.role != null && this.role.indexOf(roleItem) < 0) {
                    allow = false;
                }
                if (allow == false) {
                    break;
                }
            }
            return allow;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "menuObject", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "role", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "activeLinkCode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "level", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "option", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CollapseMenuComponent.prototype, "callback", void 0);
CollapseMenuComponent = __decorate([
    Component({
        selector: 'lb9-collapse-menu',
        template: "<div *ngFor=\"let menuItem of menuObject.menuList;let i = index\" class=\"menuList\">\r\n    <div (click)=\"activeItem(i)\" *ngIf=\"checkRole(i)\"\r\n         class=\"menuItem{{activeLinkCode && activeLinkCode == menuItem.code && activeLinkCode != '' ? ' menuItemActive':''}}\r\n        {{menuItem.customClass ? ' '+menuItem.customClass:''}}\"\r\n         [ngStyle]=\"{paddingLeft:padding, lineHeight:lineHeight}\">\r\n        <div class=\"menuName\" [innerHTML]=\"menuItem.name\"></div>\r\n        <div [innerHTML]=\"menuItem.numberOfData\" *ngIf=\"menuItem.numberOfData\"></div>\r\n        <div class=\"menuArrow{{menuItem.active ? ' menuArrowExpand':''}}\" *ngIf=\"menuItem.children\"></div>\r\n    </div>\r\n    <div *ngIf=\"menuItem.children\" class=\"menuChild\" [ngStyle]=\"{height:getHeight(i)}\">\r\n        <lb9-collapse-menu [menuObject]=\"menuItem.children\"\r\n                           [activeLinkCode]=\"activeLinkCode\"\r\n                           [level]=\"level+1\"\r\n                           [option]=\"option\"\r\n                           [role]=\"role\"\r\n                           (callback)=\"childCallback($event)\"></lb9-collapse-menu>\r\n    </div>\r\n</div>\r\n",
        styles: [""]
    }),
    __metadata("design:paramtypes", [])
], CollapseMenuComponent);
export { CollapseMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9jb2xsYXBzZS1tZW51L2NvbGxhcHNlLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTzdFLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBZ0JoQztRQWZTLGVBQVUsR0FBRztZQUNwQixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUNPLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsV0FBTSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ1EsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsTUFBTSxDQUFBO0lBQ0gsQ0FBQztJQUVqQixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLDRCQUE0QjtTQUM3QjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENB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QUNULFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsMHJDQUE2Qzs7S0FFOUMsQ0FBQzs7R0FDVyxxQkFBcUIsQ0FtR2pDO1NBbkdZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xiOS1jb2xsYXBzZS1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbGxhcHNlLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb2xsYXBzZS1tZW51LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb2xsYXBzZU1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBtZW51T2JqZWN0ID0ge1xuICAgIG9wdGlvbjogbnVsbCxcbiAgICBtZW51TGlzdDogW11cbiAgfTtcbiAgQElucHV0KCkgcm9sZSA9IFtdO1xuICBASW5wdXQoKSBhY3RpdmVMaW5rQ29kZSA9IFwiXCI7XG4gIEBJbnB1dCgpIGxldmVsID0gMDtcbiAgQElucHV0KCkgb3B0aW9uID0ge1xuICAgIHJvb3RQYWRkaW5nOiAxMCxcbiAgICBjaGlsZFBhZGRpbmc6IDEwLFxuICAgIGl0ZW1IZWlnaHQ6IDMwXG4gIH07XG4gIEBPdXRwdXQoKSBjYWxsYmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcGFkZGluZyA9IFwiMHB4XCI7XG4gIGxpbmVIZWlnaHQgPSBcIjMwcHhcIlxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1lbnVPYmplY3Qub3B0aW9uKSB7XG4gICAgICB0aGlzLm9wdGlvbiA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb24sIHRoaXMubWVudU9iamVjdC5vcHRpb24pO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vcHRpb24pO1xuICAgIH1cbiAgICB0aGlzLnBhZGRpbmcgPSBTdHJpbmcodGhpcy5vcHRpb24uY2hpbGRQYWRkaW5nICsgKHRoaXMubGV2ZWwgKiB0aGlzLm9wdGlvbi5jaGlsZFBhZGRpbmcpKSArIFwicHhcIjtcbiAgICB0aGlzLmxpbmVIZWlnaHQgPSB0aGlzLm9wdGlvbi5pdGVtSGVpZ2h0K1wicHhcIjtcbiAgfVxuICBhY3RpdmVJdGVtKGluZGV4KSB7XG4gICAgaWYgKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uY2hpbGRyZW4pIHtcbiAgICAgIGlmICghdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5hY3RpdmUpIHtcbiAgICAgICAgdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5hY3RpdmUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jYWxsYmFjay5lbWl0KHtcbiAgICAgIHJvdXRlOiB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLnJvdXRlLFxuICAgICAgY29kZTogdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5jb2RlLFxuICAgICAgY2hpbGRyZW46ICh0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmNoaWxkcmVuID8gdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5jaGlsZHJlbi5sZW5ndGggOiAwKVxuICAgIH0pO1xuICB9XG4gIGdldEhlaWdodChpbmRleCkge1xuICAgIGxldCBoZWlnaHQgPSBcIjBweFwiO1xuICAgIGlmICh0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSkge1xuICAgICAgbGV0IGNoaWxkQWN0aXZlID0gdGhpcy5nZXRDaGlsZEFjdGl2ZUxlbmd0aCh0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmNoaWxkcmVuKTtcbiAgICAgIGhlaWdodCA9IChjaGlsZEFjdGl2ZSAqIHRoaXMub3B0aW9uLml0ZW1IZWlnaHQpICsgXCJweFwiO1xuICAgIH1cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG4gIGdldENoaWxkQWN0aXZlTGVuZ3RoKG1lbnVDaGlsZCkge1xuICAgIGxldCBpdGVtQWN0aXZlID0gMDtcbiAgICBpZiAobWVudUNoaWxkKSB7XG4gICAgICAvLyBpdGVtQWN0aXZlID0gbWVudUNoaWxkLm1lbnVMaXN0Lmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGNoaWxkSXRlbUluZGV4IGluIG1lbnVDaGlsZC5tZW51TGlzdCkge1xuICAgICAgICBsZXQgY2hpbGRJdGVtID0gbWVudUNoaWxkLm1lbnVMaXN0W2NoaWxkSXRlbUluZGV4XVxuICAgICAgICBpZiAodGhpcy5jaGVja0NoaWxkUm9sZShjaGlsZEl0ZW0pKSB7XG4gICAgICAgICAgaXRlbUFjdGl2ZSsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGlsZEl0ZW0uYWN0aXZlICYmIHRoaXMuY2hlY2tSb2xlKGNoaWxkSXRlbUluZGV4KSkge1xuICAgICAgICAgIGl0ZW1BY3RpdmUgKz0gdGhpcy5nZXRDaGlsZEFjdGl2ZUxlbmd0aChjaGlsZEl0ZW0uY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtQWN0aXZlO1xuICB9XG4gIGNoaWxkQ2FsbGJhY2soZGF0YSkge1xuICAgIHRoaXMuY2FsbGJhY2suZW1pdChkYXRhKTtcbiAgfVxuICBjaGVja1JvbGUoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0ucm9sZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBhbGxvdyA9IHRydWU7XG4gICAgICBmb3IgKGxldCByb2xlSXRlbSBvZiB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLnJvbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucm9sZSAhPSBudWxsICYmIHRoaXMucm9sZS5pbmRleE9mKHJvbGVJdGVtKSA8IDApIHtcbiAgICAgICAgICBhbGxvdyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93ID09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxvdztcbiAgICB9XG4gIH1cbiAgY2hlY2tDaGlsZFJvbGUoY2hpbGQpIHtcbiAgICBpZiAoIWNoaWxkLnJvbGUpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBhbGxvdyA9IHRydWU7XG4gICAgICBmb3IgKGxldCByb2xlSXRlbSBvZiBjaGlsZC5yb2xlKSB7XG4gICAgICAgIGlmICh0aGlzLnJvbGUgIT0gbnVsbCAmJiB0aGlzLnJvbGUuaW5kZXhPZihyb2xlSXRlbSkgPCAwKSB7XG4gICAgICAgICAgYWxsb3cgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmIChhbGxvdyA9PSBmYWxzZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYWxsb3c7XG4gICAgfVxuICB9XG59XG4iXX0=