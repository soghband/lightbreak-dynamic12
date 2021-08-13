import { Component, Input } from '@angular/core';
export class ContentPanelComponent {
    constructor() {
        this.panelData = null;
    }
    ngOnInit() {
        // let htmlHead = document.getElementsByTagName("header")/
        let styleTag = document.createElement("style");
        styleTag.id = "style_" + this.panelData.id;
        styleTag.innerText = this.panelData.css;
        document.head.appendChild(styleTag);
    }
    ngOnDestroy() {
        let destroyId = document.getElementById("style_" + this.panelData.id);
        destroyId.remove();
    }
}
ContentPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'lb9-content-panel',
                template: "<div id=\"{{panelData.id}}\">\n    <div [innerHTML]=\"panelData.html\">\n    </div>\n</div>\n",
                styles: [""]
            },] }
];
ContentPanelComponent.ctorParameters = () => [];
ContentPanelComponent.propDecorators = {
    panelData: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2NvbnRlbnQtcGFuZWwvY29udGVudC1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBUWxFLE1BQU0sT0FBTyxxQkFBcUI7SUFHaEM7UUFEUyxjQUFTLEdBQWMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFakIsUUFBUTtRQUNOLDBEQUEwRDtRQUMxRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxFQUFFLEdBQUcsUUFBUSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFBO1FBQ3hDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUE7UUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNwQixDQUFDOzs7WUFwQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHlHQUE2Qzs7YUFFOUM7Ozs7d0JBR0UsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYW5lbERhdGF9IGZyb20gJy4vcGFuZWwtZGF0YSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xiOS1jb250ZW50LXBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRlbnQtcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb250ZW50LXBhbmVsLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb250ZW50UGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgcGFuZWxEYXRhOiBQYW5lbERhdGEgPSBudWxsO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIGxldCBodG1sSGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZGVyXCIpL1xuICAgIGxldCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICBzdHlsZVRhZy5pZCA9IFwic3R5bGVfXCIrdGhpcy5wYW5lbERhdGEuaWRcbiAgICBzdHlsZVRhZy5pbm5lclRleHQgPSB0aGlzLnBhbmVsRGF0YS5jc3NcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKVxuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGxldCBkZXN0cm95SWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0eWxlX1wiK3RoaXMucGFuZWxEYXRhLmlkKVxuICAgIGRlc3Ryb3lJZC5yZW1vdmUoKVxuICB9XG59XG4iXX0=