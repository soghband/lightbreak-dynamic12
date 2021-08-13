/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "./error-msg-bubble.component.css.shim.ngstyle";
import * as i1 from "@angular/core";
import * as i2 from "@angular/common";
import * as i3 from "./error-msg-bubble.component";
var styles_ErrorMsgBubbleComponent = [i0.styles];
var RenderType_ErrorMsgBubbleComponent = i1.ɵcrt({ encapsulation: 0, styles: styles_ErrorMsgBubbleComponent, data: {} });
export { RenderType_ErrorMsgBubbleComponent as RenderType_ErrorMsgBubbleComponent };
function View_ErrorMsgBubbleComponent_3(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "div", [["class", "errorRow"]], null, null, null, null, null)), (_l()(), i1.ɵted(1, null, [" ", " "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.data[_v.parent.context.$implicit].msg; _ck(_v, 1, 0, currVal_0); }); }
function View_ErrorMsgBubbleComponent_2(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ErrorMsgBubbleComponent_3)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.context.$implicit < _co.maxShow); _ck(_v, 2, 0, currVal_0); }, null); }
function View_ErrorMsgBubbleComponent_1(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "errorMsgPanel"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ErrorMsgBubbleComponent_2)), i1.ɵdid(2, 278528, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.objKeys(_co.data); _ck(_v, 2, 0, currVal_0); }, null); }
function View_ErrorMsgBubbleComponent_6(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 0, "div", [["class", "errorRowSpace"]], null, null, null, null, null))], null, null); }
function View_ErrorMsgBubbleComponent_5(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ErrorMsgBubbleComponent_6)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_v.context.$implicit < _co.maxShow); _ck(_v, 2, 0, currVal_0); }, null); }
function View_ErrorMsgBubbleComponent_4(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 2, "div", [["class", "errorMsgSpace"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ErrorMsgBubbleComponent_5)), i1.ɵdid(2, 278528, null, 0, i2.NgForOf, [i1.ViewContainerRef, i1.TemplateRef, i1.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.objKeys(_co.data); _ck(_v, 2, 0, currVal_0); }, null); }
export function View_ErrorMsgBubbleComponent_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 4, "div", [["id", "errorBubble"]], null, null, null, null, null)), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ErrorMsgBubbleComponent_1)), i1.ɵdid(2, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_ErrorMsgBubbleComponent_4)), i1.ɵdid(4, 16384, null, 0, i2.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.data.length > 0); _ck(_v, 2, 0, currVal_0); var currVal_1 = (_co.data.length > 0); _ck(_v, 4, 0, currVal_1); }, null); }
export function View_ErrorMsgBubbleComponent_Host_0(_l) { return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "lb9-error-msg-bubble", [], null, null, null, View_ErrorMsgBubbleComponent_0, RenderType_ErrorMsgBubbleComponent)), i1.ɵdid(1, 114688, null, 0, i3.ErrorMsgBubbleComponent, [], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var ErrorMsgBubbleComponentNgFactory = i1.ɵccf("lb9-error-msg-bubble", i3.ErrorMsgBubbleComponent, View_ErrorMsgBubbleComponent_Host_0, { maxShow: "maxShow" }, {}, []);
export { ErrorMsgBubbleComponentNgFactory as ErrorMsgBubbleComponentNgFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQubmdmYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdvZGlnaXQvbGlnaHQtYnJlYWstZHluYW1pYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvZXJyb3ItbXNnLWJ1YmJsZS9lcnJvci1tc2ctYnViYmxlLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJsaWIvY29tcG9uZW50L2Vycm9yLW1zZy1idWJibGUvZXJyb3ItbXNnLWJ1YmJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O2tFQ0dZLGlHQUEwQyxLQUFBLDZLQUUxQztrRUFISiw2RUFBOEMsS0FDMUMsdUxBQTBDLHNGQUFyQywyQ0FBbUIsV0FBeEIsWUFBMEMsRUFBckMsU0FBbUI7a0VBRmhDLHNHQUFtRCxLQUMvQyxxTkFBOEMsaURBQWhDLCtCQUErQixRQUE3QyxZQUE4QyxFQUFoQyxTQUErQjtrRUFRekMsc0dBQStDO2tFQURuRCw2RUFBOEMsS0FDMUMsdUxBQStDLHNGQUExQywyQ0FBbUIsV0FBeEIsWUFBK0MsRUFBMUMsU0FBbUI7a0VBRmhDLHNHQUFtRCxLQUMvQyxxTkFBOEMsaURBQWhDLCtCQUErQixRQUE3QyxZQUE4QyxFQUFoQyxTQUErQjt5RUFUckQsaUdBQXNCLEtBQ2xCLHVMQUFtRCxJQU9uRCx1TEFBbUQsaURBUDlDLG9DQUF1QixHQUE1QixZQUFtRCxFQUE5QyxTQUF1QixHQU92QixvQ0FBdUIsR0FBNUIsWUFBbUQsRUFBOUMsU0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBpMCBmcm9tICdAYW5ndWxhci9jb3JlJztcbmkwLkNvbXBvbmVudEZhY3Rvcnk7XG4iLCI8ZGl2IGlkPVwiZXJyb3JCdWJibGVcIj5cclxuICAgIDxkaXYgKm5nSWY9XCJkYXRhLmxlbmd0aCA+IDBcIiBjbGFzcz1cImVycm9yTXNnUGFuZWxcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpIG9mIG9iaktleXMoZGF0YSlcIj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImkgPCBtYXhTaG93XCIgY2xhc3M9XCJlcnJvclJvd1wiPlxyXG4gICAgICAgICAgICAgICAge3tkYXRhW2ldLm1zZ319XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiZGF0YS5sZW5ndGggPiAwXCIgY2xhc3M9XCJlcnJvck1zZ1NwYWNlXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaSBvZiBvYmpLZXlzKGRhdGEpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpIDwgbWF4U2hvd1wiIGNsYXNzPVwiZXJyb3JSb3dTcGFjZVwiPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG4iXX0=