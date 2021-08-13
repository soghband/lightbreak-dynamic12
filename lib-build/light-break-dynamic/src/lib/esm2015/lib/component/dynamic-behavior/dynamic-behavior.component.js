import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timer } from 'rxjs';
import { AnimationService } from '../../service/animation.service';
export class DynamicBehaviorComponent {
    constructor(animationService) {
        this.animationService = animationService;
        this.callBack = new EventEmitter();
        this.panelCallBack = new EventEmitter();
        this.animateTimer = timer(60);
        this.animationServiceInit = false;
        this.animateState = false;
        this.animateName = '';
    }
    animateProcess() {
        if (!this.animationServiceInit) {
            this.animateTimer.subscribe(() => {
                if (this.animateName == '') {
                    this.animateName = this.animationService.registerAnimation(this.fieldCreation.fieldName);
                }
            });
        }
        this.animationServiceInit = true;
        this.animationService.animationEmitter.subscribe((event) => {
            if (this.animateName === event) {
                this.animateState = true;
            }
        });
    }
    getLabelWidth() {
        let width = '';
        if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
            width = this.fieldCreation.labelWidth + 'px';
        }
        return width;
    }
    getInputWidth() {
        let width = '';
        if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
            width = 'calc(100% - ' + (parseInt(this.fieldCreation.labelWidth) + 6) + 'px)';
        }
        return width;
    }
    processCallBack(event, action, dataIndex) {
        this.callBack.emit({
            event: event,
            action: action,
            dataIndex: dataIndex,
            fieldName: this.fieldCreation.fieldName,
            value: this.data[this.fieldCreation.fieldName][dataIndex]
        });
    }
    getCustomClass() {
        if (typeof (this.fieldCreation.customClass) != 'undefined') {
            return this.fieldCreation.customClass;
        }
        else {
            return '';
        }
    }
    checkRequire(index) {
        if (typeof (this.data[this.fieldCreation.fieldName][index]) != 'undefined' && this.fieldCreation.require == true && this.data[this.fieldCreation.fieldName][index] == '') {
            return 'require';
        }
        return '';
    }
    getDisable() {
        let check = false;
        if (this.option.mode == 'view' || this.fieldCreation.readonly || (this.option.enableRowIndex && this.option.enableRowIndex[this.rowIndex] == false)) {
            check = true;
        }
        if (this.option.mode == 'edit' && this.fieldCreation.editAble != undefined && this.fieldCreation.editAble == false) {
            check = true;
        }
        if (this.option.disableList != undefined && this.option.disableList[this.rowIndex] != undefined
            && this.option.disableList[this.rowIndex][this.fieldCreation.fieldName] != undefined) {
            check = this.option.disableList[this.rowIndex][this.fieldCreation.fieldName];
        }
        return check;
    }
    processPanelCallBack(event) {
        this.panelCallBack.emit({
            feildName: this.fieldCreation.fieldName
        });
    }
}
DynamicBehaviorComponent.decorators = [
    { type: Component, args: [{
                template: ''
            },] }
];
DynamicBehaviorComponent.ctorParameters = () => [
    { type: AnimationService }
];
DynamicBehaviorComponent.propDecorators = {
    fieldCreation: [{ type: Input }],
    option: [{ type: Input }],
    data: [{ type: Input }],
    rowIndex: [{ type: Input }],
    callBack: [{ type: Output }],
    panelCallBack: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9saWdodC1icmVhay1keW5hbWljL3NyYy9saWIvY29tcG9uZW50L2R5bmFtaWMtYmVoYXZpb3IvZHluYW1pYy1iZWhhdmlvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzNCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBS2pFLE1BQU0sT0FBTyx3QkFBd0I7SUFZcEMsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFQNUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdDLGlCQUFZLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQUlqQixDQUFDO0lBRUQsY0FBYztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO29CQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUN6RjtZ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LGFBQWEsQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNuSCxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUztlQUMzRixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDdEYsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBRTdFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBSztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO1NBQ3ZDLENBQUMsQ0FBQztJQUNKLENBQUM7OztZQWhHRCxTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLEVBQUU7YUFDWjs7O1lBSk8sZ0JBQWdCOzs7NEJBTXRCLEtBQUs7cUJBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0FuaW1hdGlvblNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2UvYW5pbWF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0dGVtcGxhdGU6ICcnLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0JlaGF2aW9yQ29tcG9uZW50IHtcclxuXHRASW5wdXQoKSBmaWVsZENyZWF0aW9uO1xyXG5cdEBJbnB1dCgpIG9wdGlvbjtcclxuXHRASW5wdXQoKSBkYXRhO1xyXG5cdEBJbnB1dCgpIHJvd0luZGV4O1xyXG5cdEBPdXRwdXQoKSBjYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRAT3V0cHV0KCkgcGFuZWxDYWxsQmFjayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHRhbmltYXRlVGltZXIgPSB0aW1lcig2MCk7XHJcblx0YW5pbWF0aW9uU2VydmljZUluaXQgPSBmYWxzZTtcclxuXHRhbmltYXRlU3RhdGUgPSBmYWxzZTtcclxuXHRhbmltYXRlTmFtZSA9ICcnO1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYW5pbWF0aW9uU2VydmljZTogQW5pbWF0aW9uU2VydmljZSkge1xyXG5cclxuXHR9XHJcblx0XHJcblx0YW5pbWF0ZVByb2Nlc3MoKSB7XHJcblx0XHRpZiAoIXRoaXMuYW5pbWF0aW9uU2VydmljZUluaXQpIHtcclxuXHRcdFx0dGhpcy5hbmltYXRlVGltZXIuc3Vic2NyaWJlKCgpID0+IHtcclxuXHRcdFx0XHRpZiAodGhpcy5hbmltYXRlTmFtZSA9PSAnJykge1xyXG5cdFx0XHRcdFx0dGhpcy5hbmltYXRlTmFtZSA9IHRoaXMuYW5pbWF0aW9uU2VydmljZS5yZWdpc3RlckFuaW1hdGlvbih0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5hbmltYXRpb25TZXJ2aWNlSW5pdCA9IHRydWU7XHJcblx0XHR0aGlzLmFuaW1hdGlvblNlcnZpY2UuYW5pbWF0aW9uRW1pdHRlci5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmFuaW1hdGVOYW1lID09PSBldmVudCkge1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVN0YXRlID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0Z2V0TGFiZWxXaWR0aCgpIHtcclxuXHRcdGxldCB3aWR0aCA9ICcnO1xyXG5cdFx0aWYgKHRoaXMuZmllbGRDcmVhdGlvbi5sYWJlbFdpZHRoICE9IHVuZGVmaW5lZCAmJiB0aGlzLm9wdGlvbi5sYWJlbEFsaWduICE9IFwidG9wXCIpIHtcclxuXHRcdFx0d2lkdGggPSB0aGlzLmZpZWxkQ3JlYXRpb24ubGFiZWxXaWR0aCArICdweCc7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gd2lkdGg7XHJcblx0fVxyXG5cdFxyXG5cdGdldElucHV0V2lkdGgoKSB7XHJcblx0XHRsZXQgd2lkdGggPSAnJztcclxuXHRcdGlmICh0aGlzLmZpZWxkQ3JlYXRpb24ubGFiZWxXaWR0aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb24ubGFiZWxBbGlnbiAhPSBcInRvcFwiKSB7XHJcblx0XHRcdHdpZHRoID0gJ2NhbGMoMTAwJSAtICcgKyAocGFyc2VJbnQodGhpcy5maWVsZENyZWF0aW9uLmxhYmVsV2lkdGgpICsgNikgKyAncHgpJ1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHdpZHRoO1xyXG5cdH1cclxuXHRcclxuXHRwcm9jZXNzQ2FsbEJhY2soZXZlbnQsIGFjdGlvbiwgZGF0YUluZGV4KSB7XHJcblx0XHR0aGlzLmNhbGxCYWNrLmVtaXQoe1xyXG5cdFx0XHRldmVudDogZXZlbnQsXHJcblx0XHRcdGFjdGlvbjogYWN0aW9uLFxyXG5cdFx0XHRkYXRhSW5kZXg6IGRhdGFJbmRleCxcclxuXHRcdFx0ZmllbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2RhdGFJbmRleF1cclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdGdldEN1c3RvbUNsYXNzKCkge1xyXG5cdFx0aWYgKHR5cGVvZiAodGhpcy5maWVsZENyZWF0aW9uLmN1c3RvbUNsYXNzKSAhPSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5maWVsZENyZWF0aW9uLmN1c3RvbUNsYXNzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRjaGVja1JlcXVpcmUoaW5kZXgpIHtcclxuXHRcdGlmICh0eXBlb2YgKHRoaXMuZGF0YVt0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtpbmRleF0pICE9ICd1bmRlZmluZWQnICYmIHRoaXMuZmllbGRDcmVhdGlvbi5yZXF1aXJlID09IHRydWUgJiYgdGhpcy5kYXRhW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdW2luZGV4XSA9PSAnJykge1xyXG5cdFx0XHRyZXR1cm4gJ3JlcXVpcmUnO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICcnO1xyXG5cdH1cclxuXHRcclxuXHRnZXREaXNhYmxlKCkge1xyXG5cdFx0bGV0IGNoZWNrID0gZmFsc2U7XHJcblx0XHRpZiAodGhpcy5vcHRpb24ubW9kZSA9PSAndmlldycgfHwgdGhpcy5maWVsZENyZWF0aW9uLnJlYWRvbmx5IHx8ICh0aGlzLm9wdGlvbi5lbmFibGVSb3dJbmRleCAmJiB0aGlzLm9wdGlvbi5lbmFibGVSb3dJbmRleFt0aGlzLnJvd0luZGV4XSA9PSBmYWxzZSkpIHtcclxuXHRcdFx0Y2hlY2sgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9uLm1vZGUgPT0gJ2VkaXQnICYmIHRoaXMuZmllbGRDcmVhdGlvbi5lZGl0QWJsZSAhPSB1bmRlZmluZWQgJiYgdGhpcy5maWVsZENyZWF0aW9uLmVkaXRBYmxlID09IGZhbHNlKSB7XHJcblx0XHRcdGNoZWNrID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbi5kaXNhYmxlTGlzdCAhPSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb24uZGlzYWJsZUxpc3RbdGhpcy5yb3dJbmRleF0gIT0gdW5kZWZpbmVkXHJcblx0XHRcdCYmIHRoaXMub3B0aW9uLmRpc2FibGVMaXN0W3RoaXMucm93SW5kZXhdW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRjaGVjayA9IHRoaXMub3B0aW9uLmRpc2FibGVMaXN0W3RoaXMucm93SW5kZXhdW3RoaXMuZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdHJldHVybiBjaGVjaztcclxuXHR9XHJcblx0XHJcblx0cHJvY2Vzc1BhbmVsQ2FsbEJhY2soZXZlbnQpIHtcclxuXHRcdHRoaXMucGFuZWxDYWxsQmFjay5lbWl0KHtcclxuXHRcdFx0ZmVpbGROYW1lOiB0aGlzLmZpZWxkQ3JlYXRpb24uZmllbGROYW1lXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIl19