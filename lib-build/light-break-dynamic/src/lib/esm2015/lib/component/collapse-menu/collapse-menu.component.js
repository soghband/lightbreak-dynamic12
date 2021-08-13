import { Component, Input, EventEmitter, Output } from '@angular/core';
export class CollapseMenuComponent {
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
}
CollapseMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-collapse-menu',
                template: "<div *ngFor=\"let menuItem of menuObject.menuList;let i = index\" class=\"menuList\">\r\n    <div (click)=\"activeItem(i)\" *ngIf=\"checkRole(i)\"\r\n         class=\"menuItem{{activeLinkCode && activeLinkCode == menuItem.code && activeLinkCode != '' ? ' menuItemActive':''}}\r\n        {{menuItem.customClass ? ' '+menuItem.customClass:''}}\"\r\n         [ngStyle]=\"{paddingLeft:padding, lineHeight:lineHeight}\">\r\n        <div class=\"menuName\" [innerHTML]=\"menuItem.name\"></div>\r\n        <div [innerHTML]=\"menuItem.numberOfData\" *ngIf=\"menuItem.numberOfData\"></div>\r\n        <div class=\"menuArrow{{menuItem.active ? ' menuArrowExpand':''}}\" *ngIf=\"menuItem.children\"></div>\r\n    </div>\r\n    <div *ngIf=\"menuItem.children\" class=\"menuChild\" [ngStyle]=\"{height:getHeight(i)}\">\r\n        <lb9-collapse-menu [menuObject]=\"menuItem.children\"\r\n                           [activeLinkCode]=\"activeLinkCode\"\r\n                           [level]=\"level+1\"\r\n                           [option]=\"option\"\r\n                           [role]=\"role\"\r\n                           (callback)=\"childCallback($event)\"></lb9-collapse-menu>\r\n    </div>\r\n</div>\r\n",
                styles: [""]
            },] }
];
CollapseMenuComponent.ctorParameters = () => [];
CollapseMenuComponent.propDecorators = {
    menuObject: [{ type: Input }],
    role: [{ type: Input }],
    activeLinkCode: [{ type: Input }],
    level: [{ type: Input }],
    option: [{ type: Input }],
    callback: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2NvbGxhcHNlLW1lbnUvY29sbGFwc2UtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU83RSxNQUFNLE9BQU8scUJBQXFCO0lBZ0JoQztRQWZTLGVBQVUsR0FBRztZQUNwQixNQUFNLEVBQUUsSUFBSTtZQUNaLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUNPLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsV0FBTSxHQUFHO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBQ1EsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsTUFBTSxDQUFBO0lBQ0gsQ0FBQztJQUVqQixRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLDRCQUE0QjtTQUM3QjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FB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ciwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGI5LWNvbGxhcHNlLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sbGFwc2UtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbGxhcHNlLW1lbnUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1lbnVPYmplY3QgPSB7XG4gICAgb3B0aW9uOiBudWxsLFxuICAgIG1lbnVMaXN0OiBbXVxuICB9O1xuICBASW5wdXQoKSByb2xlID0gW107XG4gIEBJbnB1dCgpIGFjdGl2ZUxpbmtDb2RlID0gXCJcIjtcbiAgQElucHV0KCkgbGV2ZWwgPSAwO1xuICBASW5wdXQoKSBvcHRpb24gPSB7XG4gICAgcm9vdFBhZGRpbmc6IDEwLFxuICAgIGNoaWxkUGFkZGluZzogMTAsXG4gICAgaXRlbUhlaWdodDogMzBcbiAgfTtcbiAgQE91dHB1dCgpIGNhbGxiYWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwYWRkaW5nID0gXCIwcHhcIjtcbiAgbGluZUhlaWdodCA9IFwiMzBweFwiXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWVudU9iamVjdC5vcHRpb24pIHtcbiAgICAgIHRoaXMub3B0aW9uID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbiwgdGhpcy5tZW51T2JqZWN0Lm9wdGlvbik7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9wdGlvbik7XG4gICAgfVxuICAgIHRoaXMucGFkZGluZyA9IFN0cmluZyh0aGlzLm9wdGlvbi5jaGlsZFBhZGRpbmcgKyAodGhpcy5sZXZlbCAqIHRoaXMub3B0aW9uLmNoaWxkUGFkZGluZykpICsgXCJweFwiO1xuICAgIHRoaXMubGluZUhlaWdodCA9IHRoaXMub3B0aW9uLml0ZW1IZWlnaHQrXCJweFwiO1xuICB9XG4gIGFjdGl2ZUl0ZW0oaW5kZXgpIHtcbiAgICBpZiAodGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5jaGlsZHJlbikge1xuICAgICAgaWYgKCF0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNhbGxiYWNrLmVtaXQoe1xuICAgICAgcm91dGU6IHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0ucm91dGUsXG4gICAgICBjb2RlOiB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmNvZGUsXG4gICAgICBjaGlsZHJlbjogKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uY2hpbGRyZW4gPyB0aGlzLm1lbnVPYmplY3QubWVudUxpc3RbaW5kZXhdLmNoaWxkcmVuLmxlbmd0aCA6IDApXG4gICAgfSk7XG4gIH1cbiAgZ2V0SGVpZ2h0KGluZGV4KSB7XG4gICAgbGV0IGhlaWdodCA9IFwiMHB4XCI7XG4gICAgaWYgKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uYWN0aXZlKSB7XG4gICAgICBsZXQgY2hpbGRBY3RpdmUgPSB0aGlzLmdldENoaWxkQWN0aXZlTGVuZ3RoKHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0uY2hpbGRyZW4pO1xuICAgICAgaGVpZ2h0ID0gKGNoaWxkQWN0aXZlICogdGhpcy5vcHRpb24uaXRlbUhlaWdodCkgKyBcInB4XCI7XG4gICAgfVxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cbiAgZ2V0Q2hpbGRBY3RpdmVMZW5ndGgobWVudUNoaWxkKSB7XG4gICAgbGV0IGl0ZW1BY3RpdmUgPSAwO1xuICAgIGlmIChtZW51Q2hpbGQpIHtcbiAgICAgIC8vIGl0ZW1BY3RpdmUgPSBtZW51Q2hpbGQubWVudUxpc3QubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgY2hpbGRJdGVtSW5kZXggaW4gbWVudUNoaWxkLm1lbnVMaXN0KSB7XG4gICAgICAgIGxldCBjaGlsZEl0ZW0gPSBtZW51Q2hpbGQubWVudUxpc3RbY2hpbGRJdGVtSW5kZXhdXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ2hpbGRSb2xlKGNoaWxkSXRlbSkpIHtcbiAgICAgICAgICBpdGVtQWN0aXZlKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkSXRlbS5hY3RpdmUgJiYgdGhpcy5jaGVja1JvbGUoY2hpbGRJdGVtSW5kZXgpKSB7XG4gICAgICAgICAgaXRlbUFjdGl2ZSArPSB0aGlzLmdldENoaWxkQWN0aXZlTGVuZ3RoKGNoaWxkSXRlbS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1BY3RpdmU7XG4gIH1cbiAgY2hpbGRDYWxsYmFjayhkYXRhKSB7XG4gICAgdGhpcy5jYWxsYmFjay5lbWl0KGRhdGEpO1xuICB9XG4gIGNoZWNrUm9sZShpbmRleCkge1xuICAgIGlmICghdGhpcy5tZW51T2JqZWN0Lm1lbnVMaXN0W2luZGV4XS5yb2xlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGFsbG93ID0gdHJ1ZTtcbiAgICAgIGZvciAobGV0IHJvbGVJdGVtIG9mIHRoaXMubWVudU9iamVjdC5tZW51TGlzdFtpbmRleF0ucm9sZSkge1xuICAgICAgICBpZiAodGhpcy5yb2xlICE9IG51bGwgJiYgdGhpcy5yb2xlLmluZGV4T2Yocm9sZUl0ZW0pIDwgMCkge1xuICAgICAgICAgIGFsbG93ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3cgPT0gZmFsc2UpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGFsbG93O1xuICAgIH1cbiAgfVxuICBjaGVja0NoaWxkUm9sZShjaGlsZCkge1xuICAgIGlmICghY2hpbGQucm9sZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGFsbG93ID0gdHJ1ZTtcbiAgICAgIGZvciAobGV0IHJvbGVJdGVtIG9mIGNoaWxkLnJvbGUpIHtcbiAgICAgICAgaWYgKHRoaXMucm9sZSAhPSBudWxsICYmIHRoaXMucm9sZS5pbmRleE9mKHJvbGVJdGVtKSA8IDApIHtcbiAgICAgICAgICBhbGxvdyA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93ID09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBhbGxvdztcbiAgICB9XG4gIH1cbn1cbiJdfQ==