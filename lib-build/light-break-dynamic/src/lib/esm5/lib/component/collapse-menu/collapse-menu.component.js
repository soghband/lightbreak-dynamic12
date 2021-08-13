import { __decorate, __metadata, __values } from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
var CollapseMenuComponent = /** @class */ (function () {
    function CollapseMenuComponent() {
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
    CollapseMenuComponent.prototype.ngOnInit = function () {
        if (this.menuObject.option) {
            this.option = Object.assign(this.option, this.menuObject.option);
            // console.log(this.option);
        }
        this.padding = String(this.option.childPadding + (this.level * this.option.childPadding)) + "px";
        this.lineHeight = this.option.itemHeight + "px";
    };
    CollapseMenuComponent.prototype.activeItem = function (index) {
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
    };
    CollapseMenuComponent.prototype.getHeight = function (index) {
        var height = "0px";
        if (this.menuObject.menuList[index].active) {
            var childActive = this.getChildActiveLength(this.menuObject.menuList[index].children);
            height = (childActive * this.option.itemHeight) + "px";
        }
        return height;
    };
    CollapseMenuComponent.prototype.getChildActiveLength = function (menuChild) {
        var itemActive = 0;
        if (menuChild) {
            // itemActive = menuChild.menuList.length;
            for (var childItemIndex in menuChild.menuList) {
                var childItem = menuChild.menuList[childItemIndex];
                if (this.checkChildRole(childItem)) {
                    itemActive++;
                }
                if (childItem.active && this.checkRole(childItemIndex)) {
                    itemActive += this.getChildActiveLength(childItem.children);
                }
            }
        }
        return itemActive;
    };
    CollapseMenuComponent.prototype.childCallback = function (data) {
        this.callback.emit(data);
    };
    CollapseMenuComponent.prototype.checkRole = function (index) {
        var e_1, _a;
        if (!this.menuObject.menuList[index].role) {
            return true;
        }
        else {
            var allow = true;
            try {
                for (var _b = __values(this.menuObject.menuList[index].role), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var roleItem = _c.value;
                    if (this.role != null && this.role.indexOf(roleItem) < 0) {
                        allow = false;
                    }
                    if (allow == false) {
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return allow;
        }
    };
    CollapseMenuComponent.prototype.checkChildRole = function (child) {
        var e_2, _a;
        if (!child.role) {
            return true;
        }
        else {
            var allow = true;
            try {
                for (var _b = __values(child.role), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var roleItem = _c.value;
                    if (this.role != null && this.role.indexOf(roleItem) < 0) {
                        allow = false;
                    }
                    if (allow == false) {
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return allow;
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
    return CollapseMenuComponent;
}());
export { CollapseMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9jb2xsYXBzZS1tZW51L2NvbGxhcHNlLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTzdFO0lBZ0JFO1FBZlMsZUFBVSxHQUFHO1lBQ3BCLE1BQU0sRUFBRSxJQUFJO1lBQ1osUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBQ08sU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixXQUFNLEdBQUc7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsRUFBRTtZQUNoQixVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDUSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGVBQVUsR0FBRyxNQUFNLENBQUE7SUFDSCxDQUFDO0lBRWpCLHdDQUFRLEdBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakUsNEJBQTRCO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENB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RTs7d0RBQVc7SUFDVjtRQUFSLEtBQUssRUFBRTs7eURBSU47SUFDUTtRQUFULE1BQU0sRUFBRTs7MkRBQStCO0lBYjdCLHFCQUFxQjtRQUxqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLDByQ0FBNkM7O1NBRTlDLENBQUM7O09BQ1cscUJBQXFCLENBbUdqQztJQUFELDRCQUFDO0NBQUEsQUFuR0QsSUFtR0M7U0FuR1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGI5LWNvbGxhcHNlLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sbGFwc2UtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbGxhcHNlLW1lbnUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lbnVPYmplY3QgPSB7XG4gICAgb3B0aW9uOiBudWxsLFxuICAgIG1lbnVMaXN0OiBbXVxuICB9O1xuICBASW5wdXQoKSByb2xlID0gW107XG4gIEBJbnB1dCgpIGFjdGl2ZUxpbmtDb2RlID0gXCJcIjtcbiAgQElucHV0KCkgbGV2ZWwgPSAwO1xuICBASW5wdXQoKSBvcHRpb24gPSB7XG4gICAgcm9vdFBhZGRpbmc6IDEwLFxuICAgIGNoaWxkUGFkZGluZzogMTAsXG4gICAgaXRlbUhlaWdodDogMzBcbiAgfTtcbiAgQE91dHB1dCgpIGNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwYWRkaW5nID0gXCIwcHhcIjtcbiAgbGluZUhlaWdodCA9IFwiMzBweFwiXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWVudU9iamVjdC5vcHRpb24pIHtcbiAgICAgIHRoaXMub3B0aW9uID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbiwgdGhpcy5tZW51T2JqZWN0Lm9wdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbik7XG4gICAgfVxuICAgIHRoaXMucGFkZGluZyA9IFN0cmluZyh0aGlzLm9wdGlvbi5jaGlsZFBhZGRpbmcgKyAodGhpcy5sZXZlbCAqIHRoaXMub3B0aW9uLmNoaWxkUGFkZGluZykpICsgXCJweFwiO1xuICAgIHRoaXMubGluZUhlaWdodCA9IHRoaXMub3B0aW9uLml0ZW1IZWlnaHQrXCJweFwiO1xuICB9XG4gIGFjdGl2ZUl0ZW0oaW5kZXgpIHtcbiAgICBpZiAodGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5jaGlsZHJlbikge1xuICAgICAgaWYgKCF0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNhbGxiYWNrLmVtaXQoe1xuICAgICAgcm91dGU6IHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0ucm91dGUsXG4gICAgICBjb2RlOiB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmNvZGUsXG4gICAgICBjaGlsZHJlbjogKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uY2hpbGRyZW4gPyB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmNoaWxkcmVuLmxlbmd0aCA6IDApXG4gICAgfSk7XG4gIH1cbiAgZ2V0SGVpZ2h0KGluZGV4KSB7XG4gICAgbGV0IGhlaWdodCA9IFwiMHB4XCI7XG4gICAgaWYgKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uYWN0aXZlKSB7XG4gICAgICBsZXQgY2hpbGRBY3RpdmUgPSB0aGlzLmdldENoaWxkQWN0aXZlTGVuZ3RoKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uY2hpbGRyZW4pO1xuICAgICAgaGVpZ2h0ID0gKGNoaWxkQWN0aXZlICogdGhpcy5vcHRpb24uaXRlbUhlaWdodCkgKyBcInB4XCI7XG4gICAgfVxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cbiAgZ2V0Q2hpbGRBY3RpdmVMZW5ndGgobWVudUNoaWxkKSB7XG4gICAgbGV0IGl0ZW1BY3RpdmUgPSAwO1xuICAgIGlmIChtZW51Q2hpbGQpIHtcbiAgICAgIC8vIGl0ZW1BY3RpdmUgPSBtZW51Q2hpbGQubWVudUxpc3QubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgY2hpbGRJdGVtSW5kZXggaW4gbWVudUNoaWxkLm1lbnVMaXN0KSB7XG4gICAgICAgIGxldCBjaGlsZEl0ZW0gPSBtZW51Q2hpbGQubWVudUxpc3RbY2hpbGRJdGVtSW5kZXhdXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ2hpbGRSb2xlKGNoaWxkSXRlbSkpIHtcbiAgICAgICAgICBpdGVtQWN0aXZlKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkSXRlbS5hY3RpdmUgJiYgdGhpcy5jaGVja1JvbGUoY2hpbGRJdGVtSW5kZXgpKSB7XG4gICAgICAgICAgaXRlbUFjdGl2ZSArPSB0aGlzLmdldENoaWxkQWN0aXZlTGVuZ3RoKGNoaWxkSXRlbS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1BY3RpdmU7XG4gIH1cbiAgY2hpbGRDYWxsYmFjayhkYXRhKSB7XG4gICAgdGhpcy5jYWxsYmFjay5lbWl0KGRhdGEpO1xuICB9XG4gIGNoZWNrUm9sZShpbmRleCkge1xuICAgIGlmICghdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5yb2xlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGFsbG93ID0gdHJ1ZTtcbiAgICAgIGZvciAobGV0IHJvbGVJdGVtIG9mIHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0ucm9sZSkge1xuICAgICAgICBpZiAodGhpcy5yb2xlICE9IG51bGwgJiYgdGhpcy5yb2xlLmluZGV4T2Yocm9sZUl0ZW0pIDwgMCkge1xuICAgICAgICAgIGFsbG93ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3cgPT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbG93O1xuICAgIH1cbiAgfVxuICBjaGVja0NoaWxkUm9sZShjaGlsZCkge1xuICAgIGlmICghY2hpbGQucm9sZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGFsbG93ID0gdHJ1ZTtcbiAgICAgIGZvciAobGV0IHJvbGVJdGVtIG9mIGNoaWxkLnJvbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucm9sZSAhPSBudWxsICYmIHRoaXMucm9sZS5pbmRleE9mKHJvbGVJdGVtKSA8IDApIHtcbiAgICAgICAgICBhbGxvdyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93ID09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxvdztcbiAgICB9XG4gIH1cbn1cbiJdfQ==