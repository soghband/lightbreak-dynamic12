/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../dynamic-form-label-panel/dynamic-form-label-panel.component.ngfactory";
import * as i3 from "../../dynamic-form-label-panel/dynamic-form-label-panel.component";
import * as i4 from "@angular/forms";
import * as i5 from "./swapping-box.component";
import * as i6 from "../../../service/animation.service";
var styles_SwappingBoxComponent = [];
var RenderType_SwappingBoxComponent = i0.ɵcrt({ encapsulation: 2, styles: styles_SwappingBoxComponent, data: {} });
export { RenderType_SwappingBoxComponent as RenderType_SwappingBoxComponent };
function View_SwappingBoxComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "div", [["class", "source_select"]], [[8, "innerHTML", 1]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.transferData(_v.parent.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.fieldCreation.valueList[_v.parent.context.$implicit].display; _ck(_v, 0, 0, currVal_0); }); }
function View_SwappingBoxComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SwappingBoxComponent_3)), i0.ɵdid(2, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.checkDestData(_co.fieldCreation.valueList[_v.context.$implicit]); _ck(_v, 2, 0, currVal_0); }, null); }
function View_SwappingBoxComponent_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, null, null, null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 0, "div", [["class", "source_select"]], [[8, "innerHTML", 1]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeData(_v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.data[_co.fieldCreation.fieldName][_v.context.$implicit].display; _ck(_v, 1, 0, currVal_0); }); }
function View_SwappingBoxComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 35, "div", [], [[8, "className", 0], [4, "width", null]], [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.processPanelCallBack($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 1, "lb9-dynamic-form-label-panel", [], null, null, null, i2.View_DynamicFormLabelPanelComponent_0, i2.RenderType_DynamicFormLabelPanelComponent)), i0.ɵdid(2, 114688, null, 0, i3.DynamicFormLabelPanelComponent, [], { fieldCreation: [0, "fieldCreation"], option: [1, "option"], width: [2, "width"] }, null), (_l()(), i0.ɵeld(3, 0, null, null, 32, "div", [], [[8, "className", 0], [4, "width", null]], null, null, null, null)), (_l()(), i0.ɵeld(4, 0, null, null, 29, "div", [["class", "posRelative"]], null, null, null, null, null)), (_l()(), i0.ɵeld(5, 0, null, null, 28, "div", [["class", "dp2Table"]], null, null, null, null, null)), (_l()(), i0.ɵeld(6, 0, null, null, 27, "div", [["class", "dp2Row"]], null, null, null, null, null)), (_l()(), i0.ɵeld(7, 0, null, null, 13, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 9, "div", [["class", "headerPanel"]], null, null, null, null, null)), (_l()(), i0.ɵeld(9, 0, null, null, 0, "div", [["class", "headText"]], [[8, "innerHTML", 1]], null, null, null, null)), (_l()(), i0.ɵeld(10, 0, null, null, 1, "div", [["class", "filterEnable"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.toggleFilter() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(11, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-search"]], null, null, null, null, null)), (_l()(), i0.ɵeld(12, 0, null, null, 5, "input", [["placeholder", "Filter"], ["type", "text"]], [[8, "className", 0], [8, "readOnly", 0], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 13)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 13).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 13)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 13)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.filter = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, null, null)), i0.ɵdid(13, 16384, null, 0, i4.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i4.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i4.DefaultValueAccessor]), i0.ɵdid(15, 671744, null, 0, i4.NgModel, [[8, null], [8, null], [8, null], [6, i4.NG_VALUE_ACCESSOR]], { model: [0, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i4.NgControl, null, [i4.NgModel]), i0.ɵdid(17, 16384, null, 0, i4.NgControlStatus, [[4, i4.NgControl]], null, null), (_l()(), i0.ɵeld(18, 0, null, null, 2, "div", [["class", "source"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SwappingBoxComponent_2)), i0.ɵdid(20, 278528, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(21, 0, null, null, 6, "div", [["class", "dp2Cell iconBox"]], null, null, null, null, null)), (_l()(), i0.ɵeld(22, 0, null, null, 2, "abbr", [], [[8, "title", 0]], null, null, null, null)), (_l()(), i0.ɵeld(23, 0, null, null, 1, "div", [["class", "selectAll"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.selectAll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(24, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-forward"]], null, null, null, null, null)), (_l()(), i0.ɵeld(25, 0, null, null, 2, "abbr", [], [[8, "title", 0]], null, null, null, null)), (_l()(), i0.ɵeld(26, 0, null, null, 1, "div", [["class", "removeAll"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.removeAll() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(27, 0, null, null, 0, "span", [["class", "glyphicon glyphicon-backward"]], null, null, null, null, null)), (_l()(), i0.ɵeld(28, 0, null, null, 5, "div", [], [[8, "className", 0]], null, null, null, null)), (_l()(), i0.ɵeld(29, 0, null, null, 1, "div", [["class", "headerPanel"]], null, null, null, null, null)), (_l()(), i0.ɵeld(30, 0, null, null, 0, "div", [["class", "headText"]], [[8, "innerHTML", 1]], null, null, null, null)), (_l()(), i0.ɵeld(31, 0, null, null, 2, "div", [["class", "destination"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SwappingBoxComponent_4)), i0.ɵdid(33, 278528, null, 0, i1.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(34, 0, null, null, 1, "div", [["class", "dp2Note"]], null, null, null, null, null)), (_l()(), i0.ɵted(35, null, [" ", " "]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.fieldCreation; var currVal_3 = _co.option; var currVal_4 = _co.getLabelWidth(); _ck(_v, 2, 0, currVal_2, currVal_3, currVal_4); var currVal_18 = _co.filter; _ck(_v, 15, 0, currVal_18); var currVal_19 = _co.objKeys(_co.fieldCreation.valueList); _ck(_v, 20, 0, currVal_19); var currVal_24 = _co.objKeys(_co.data[_co.fieldCreation.fieldName]); _ck(_v, 33, 0, currVal_24); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵinlineInterpolate(3, "dp2FieldPanel ", _co.columnCalculate, " ", _co.getCustomClass(), " ", (((_co.animateState || !_co.option.enableAnimation) || (_co.option.enableAnimation === "false")) ? "dp2FieldPanelAnimateEnd" : "dp2FieldPanelAnimateStart"), ""); var currVal_1 = _co.fieldCreation.width; _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_5 = i0.ɵinlineInterpolate(1, "dp2InputBox ", ((_co.option.labelAlign == "left") ? "singleLine" : ""), ""); var currVal_6 = _co.getInputWidth(); _ck(_v, 3, 0, currVal_5, currVal_6); var currVal_7 = i0.ɵinlineInterpolate(1, "dp2Cell sourceBox ", (_co.getDisable() ? "readonly" : ""), ""); _ck(_v, 7, 0, currVal_7); var currVal_8 = _co.optionText; _ck(_v, 9, 0, currVal_8); var currVal_9 = i0.ɵinlineInterpolate(1, "filter ", _co.filterToggle, ""); var currVal_10 = (_co.filterToggle == "filterInvisible"); var currVal_11 = i0.ɵnov(_v, 17).ngClassUntouched; var currVal_12 = i0.ɵnov(_v, 17).ngClassTouched; var currVal_13 = i0.ɵnov(_v, 17).ngClassPristine; var currVal_14 = i0.ɵnov(_v, 17).ngClassDirty; var currVal_15 = i0.ɵnov(_v, 17).ngClassValid; var currVal_16 = i0.ɵnov(_v, 17).ngClassInvalid; var currVal_17 = i0.ɵnov(_v, 17).ngClassPending; _ck(_v, 12, 0, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14, currVal_15, currVal_16, currVal_17); var currVal_20 = i0.ɵinlineInterpolate(1, "", _co.selectAllText, ""); _ck(_v, 22, 0, currVal_20); var currVal_21 = i0.ɵinlineInterpolate(1, "", _co.removeAllText, ""); _ck(_v, 25, 0, currVal_21); var currVal_22 = i0.ɵinlineInterpolate(1, "dp2Cell sourceBox ", (_co.getDisable() ? "readonly" : ""), ""); _ck(_v, 28, 0, currVal_22); var currVal_23 = _co.selectedText; _ck(_v, 30, 0, currVal_23); var currVal_25 = _co.fieldCreation.note; _ck(_v, 35, 0, currVal_25); }); }
function View_SwappingBoxComponent_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "div", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["Data undefined: ", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.fieldCreation.fieldName; _ck(_v, 1, 0, currVal_0); }); }
export function View_SwappingBoxComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_SwappingBoxComponent_1)), i0.ɵdid(1, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_SwappingBoxComponent_5)), i0.ɵdid(3, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.data[_co.fieldCreation.fieldName]; _ck(_v, 1, 0, currVal_0); var currVal_1 = !_co.data[_co.fieldCreation.fieldName]; _ck(_v, 3, 0, currVal_1); }, null); }
export function View_SwappingBoxComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "ng-component", [], null, null, null, View_SwappingBoxComponent_0, RenderType_SwappingBoxComponent)), i0.ɵdid(1, 114688, null, 0, i5.SwappingBoxComponent, [i6.AnimationService], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var SwappingBoxComponentNgFactory = i0.ɵccf("ng-component", i5.SwappingBoxComponent, View_SwappingBoxComponent_Host_0, { fieldCreation: "fieldCreation", option: "option", data: "data", rowIndex: "rowIndex", inputIndex: "inputIndex" }, { callBack: "callBack", panelCallBack: "panelCallBack" }, []);
export { SwappingBoxComponentNgFactory as SwappingBoxComponentNgFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhcHBpbmctYm94LmNvbXBvbmVudC5uZ2ZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ29kaWdpdC9saWdodC1icmVhay1keW5hbWljLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudC9keW5hbWljLWlucHV0L3N3YXBwaW5nLWJveC9zd2FwcGluZy1ib3guY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsImxpYi9jb21wb25lbnQvZHluYW1pYy1pbnB1dC9zd2FwcGluZy1ib3gvc3dhcHBpbmctYm94LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7K0RDbUJvQywyS0FBbUwsWUFBN0Y7O3dCQUFrQztNQUF4SCx3QkFBbUwsd0RBQTFELDhDQUF5RCxvQ0FBbEwsWUFBbUwsRUFBMUQsU0FBeUQ7K0RBRHRMLDZFQUEwRSxLQUN0RSxvTEFBbUwsc0ZBQXhKLGdFQUEwRCxzQkFBckYsWUFBbUwsRUFBeEosU0FBMEQ7K0RBbUJ6Riw2RUFBb0YsS0FDaEYsMktBQW9JLFlBQXpHOzt3QkFBb0M7TUFBL0Qsd0JBQW9JLHdEQUFwRSx3REFBbUUsNkJBQW5JLFlBQW9JLEVBQXBFLFNBQW1FOytEQXZDdkssc0tBQWdVLFlBQXZDOzt3QkFBc0M7TUFBL1Qsd0JBQWdVLEtBQzVULGlWQUdrQyxJQUNsQyxrSEFBNkcsS0FDckcscUdBQXlCLEtBQ3JCLGtHQUFzQixLQUNsQixnR0FBb0IsS0FDaEIsOEZBQWtFLEtBQzlELG9HQUF5QixLQUNyQixrSEFBK0MsS0FDL0MsMEpBQW1ELFlBQXpCOzt3QkFBd0I7TUFBbEQsd0JBQW1ELEtBQUEscUhBQXlDLEtBQzVGOzs7Ozs7Ozs7Ozt3QkFFa0Q7TUFBM0M7O3dCQUFvQjtNQUYzQiw0aUJBRWtELElBRXRELGdHQUFvQixLQUNoQixtTkFBMEUsSUFPbEYseUdBQTZCLEtBQ3pCLDJGQUFnQyxLQUM1Qix1SkFBNkMsWUFBdEI7O3dCQUFxQjtNQUE1Qyx3QkFBNkMsS0FBQSxzSEFBMEMsS0FFM0YsMkZBQWdDLEtBQzVCLHVKQUE2QyxZQUF0Qjs7d0JBQXFCO01BQTVDLHdCQUE2QyxLQUFBLHVIQUEyQyxLQUdoRyw4RkFBa0UsS0FDOUQscUdBQXlCLEtBQ3JCLG1IQUFpRCxLQUVyRCxxR0FBeUIsS0FDckIsbU5BQW9GLElBVTVHLGlHQUFxQixLQUFBLG1DQUVyQixtREFoREksbUJBQStCLGdCQUMvQixtQkFBaUIsU0FDakIsbUJBQXlCLGtCQUhqQyxZQUdrQyxFQUYxQixTQUErQixFQUMvQixTQUFpQixFQUNqQixTQUF5QixHQVdFLG9CQUFvQixTQUYzQixhQUVrRCxFQUEzQyxVQUFvQixHQUdiLGdDQUEyRCwyQkFBekUsYUFBMEUsRUFBNUQsVUFBMkQsR0FvQjNELHlDQUFxRSw0QkFBbkYsYUFBb0YsRUFBdEUsVUFBcUUsbURBdEN4RSwrUUFBd00sR0FBRSxtQkFBbUMsc0JBQXhSLFlBQWdVLEVBQXJSLFNBQXdNLEVBQUUsU0FBbUMsR0FLL1Esb0hBQXVFLEdBQUMsbUJBQStCLGtCQUE1RyxZQUE2RyxFQUF4RyxTQUF1RSxFQUFDLFNBQStCLEdBSW5GLHVHQUE0RCxHQUFqRSxZQUFrRSxFQUE3RCxTQUE0RCxHQUVuQyxtQkFBd0IsYUFBOUMsWUFBK0MsRUFBekIsU0FBd0IsR0FFM0Isd0VBQStCLEdBQzNDLHVEQUE4QyxHQURyRCxtV0FFa0QsRUFGL0IsU0FBK0IsRUFDM0MsVUFBOEMsRUFEckQsa0ZBRWtELEdBV2hELG1FQUF5QixHQUEvQixhQUFnQyxFQUExQixVQUF5QixHQUd6QixtRUFBeUIsR0FBL0IsYUFBZ0MsRUFBMUIsVUFBeUIsR0FJOUIsd0dBQTRELEdBQWpFLGFBQWtFLEVBQTdELFVBQTRELEdBRW5DLG9CQUEwQixlQUFoRCxhQUFpRCxFQUEzQixVQUEwQixHQWFuRCxrRUFFckI7K0RBR1IsNEVBQTRDLEtBQUEsNktBQTJDO3NFQXJEdkYsb0xBQWdVLElBcURoVSxvTEFBNEMsaURBckR2Qyw0QkFBcUMsMkJBQTFDLFlBQWdVLEVBQTNULFNBQXFDLEdBcURyQyw2QkFBc0MsMkJBQTNDLFlBQTRDLEVBQXZDLFNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaTAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pMC5Db21wb25lbnRGYWN0b3J5O1xuIiwiPGRpdiAqbmdJZj1cImRhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdXCIgY2xhc3M9XCJkcDJGaWVsZFBhbmVsIHt7Y29sdW1uQ2FsY3VsYXRlfX0ge3tnZXRDdXN0b21DbGFzcygpfX0ge3thbmltYXRlU3RhdGUgfHwgIW9wdGlvbi5lbmFibGVBbmltYXRpb24gfHwgb3B0aW9uLmVuYWJsZUFuaW1hdGlvbiA9PT0gJ2ZhbHNlJyA/ICdkcDJGaWVsZFBhbmVsQW5pbWF0ZUVuZCc6J2RwMkZpZWxkUGFuZWxBbmltYXRlU3RhcnQnfX1cIiAgW3N0eWxlLndpZHRoXT1cImZpZWxkQ3JlYXRpb24ud2lkdGhcIiAoY2xpY2spPVwicHJvY2Vzc1BhbmVsQ2FsbEJhY2soJGV2ZW50KVwiPlxyXG4gICAgPGxiOS1keW5hbWljLWZvcm0tbGFiZWwtcGFuZWxcclxuICAgICAgICAgICAgW2ZpZWxkQ3JlYXRpb25dPVwiZmllbGRDcmVhdGlvblwiXHJcbiAgICAgICAgICAgIFtvcHRpb25dPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgW3dpZHRoXT1cImdldExhYmVsV2lkdGgoKVwiPjwvbGI5LWR5bmFtaWMtZm9ybS1sYWJlbC1wYW5lbD5cclxuICAgIDxkaXYgY2xhc3M9XCJkcDJJbnB1dEJveCB7e29wdGlvbi5sYWJlbEFsaWduID09ICdsZWZ0JyA/ICdzaW5nbGVMaW5lJyA6ICcnfX1cIiBbc3R5bGUud2lkdGhdPVwiZ2V0SW5wdXRXaWR0aCgpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb3NSZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRwMlRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRwMlJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHAyQ2VsbCBzb3VyY2VCb3gge3tnZXREaXNhYmxlKCkgPyAncmVhZG9ubHknIDogJyd9fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRUZXh0XCIgW2lubmVySFRNTF09XCJvcHRpb25UZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlckVuYWJsZVwiIChjbGljayk9XCJ0b2dnbGVGaWx0ZXIoKVwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1zZWFyY2hcIj48L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmaWx0ZXIge3tmaWx0ZXJUb2dnbGV9fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZWFkT25seV09XCJmaWx0ZXJUb2dnbGUgPT0gJ2ZpbHRlckludmlzaWJsZSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImZpbHRlclwiIHBsYWNlaG9sZGVyPVwiRmlsdGVyXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic291cmNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdmFsdWVJbmRleCBvZiBvYmpLZXlzKGZpZWxkQ3JlYXRpb24udmFsdWVMaXN0KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic291cmNlX3NlbGVjdFwiICpuZ0lmPVwiY2hlY2tEZXN0RGF0YShmaWVsZENyZWF0aW9uLnZhbHVlTGlzdFt2YWx1ZUluZGV4XSlcIiAoY2xpY2spPVwidHJhbnNmZXJEYXRhKHZhbHVlSW5kZXgpXCIgW2lubmVySFRNTF09XCJmaWVsZENyZWF0aW9uLnZhbHVlTGlzdFt2YWx1ZUluZGV4XS5kaXNwbGF5XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRwMkNlbGwgaWNvbkJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFiYnIgdGl0bGU9XCJ7e3NlbGVjdEFsbFRleHR9fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RBbGxcIiAoY2xpY2spPVwic2VsZWN0QWxsKClcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZm9yd2FyZFwiPjwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYWJicj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhYmJyIHRpdGxlPVwie3tyZW1vdmVBbGxUZXh0fX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVtb3ZlQWxsXCIgKGNsaWNrKT1cInJlbW92ZUFsbCgpXCI+PHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLWJhY2t3YXJkXCI+PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hYmJyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRwMkNlbGwgc291cmNlQm94IHt7Z2V0RGlzYWJsZSgpID8gJ3JlYWRvbmx5JyA6ICcnfX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJQYW5lbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkVGV4dFwiIFtpbm5lckhUTUxdPVwic2VsZWN0ZWRUZXh0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXN0aW5hdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGRhdGFWYWx1ZUluZGV4IG9mIG9iaktleXMoZGF0YVtmaWVsZENyZWF0aW9uLmZpZWxkTmFtZV0pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzb3VyY2Vfc2VsZWN0XCIgKGNsaWNrKT1cInJlbW92ZURhdGEoZGF0YVZhbHVlSW5kZXgpXCIgW2lubmVySFRNTF09XCJkYXRhW2ZpZWxkQ3JlYXRpb24uZmllbGROYW1lXVtkYXRhVmFsdWVJbmRleF0uZGlzcGxheVwiPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRwMk5vdGVcIj5cclxuICAgICAgICAgICAge3tmaWVsZENyZWF0aW9uLm5vdGV9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwiIWRhdGFbZmllbGRDcmVhdGlvbi5maWVsZE5hbWVdXCI+RGF0YSB1bmRlZmluZWQ6IHt7ZmllbGRDcmVhdGlvbi5maWVsZE5hbWV9fTwvZGl2PlxyXG4iXX0=