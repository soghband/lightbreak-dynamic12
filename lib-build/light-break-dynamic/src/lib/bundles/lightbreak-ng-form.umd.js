(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@angular/forms'), require('ngx-scrollbar'), require('@angular-package/type'), require('rxjs/operators'), require('@angular/animations'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@lightbreak/ng-form', ['exports', '@angular/core', 'rxjs', '@angular/common', '@angular/forms', 'ngx-scrollbar', '@angular-package/type', 'rxjs/operators', '@angular/animations', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.lightbreak = global.lightbreak || {}, global.lightbreak['ng-form'] = {}), global.ng.core, global.rxjs, global.ng.common, global.ng.forms, global.ngxScrollbar, global.type, global.rxjs.operators, global.ng.animations, global.ng.common.http));
}(this, (function (exports, i0, rxjs, common, forms, ngxScrollbar, type, operators, animations, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var LockScreenService = /** @class */ (function () {
        function LockScreenService() {
            this.color1 = "rgba(217,217,217,0.8)";
            this.color2 = "rgba(90,90,90,0.8)";
            this.createStyleTag();
        }
        LockScreenService.prototype.createStyleTag = function () {
            var styleTag = document.createElement("style");
            var lockScreenAnime = document.getElementById("lockScreenCss");
            var styleData = ".loader { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color1 + ";  border-radius: 50%; width: 60px; height: 60px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -30px 0 0 -30px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite;} \n" +
                ".loader2 { border: 8px solid rgba(166,166,166,0.2); border-top: 8px solid " + this.color2 + ";  border-radius: 50%; width: 90px; height: 90px; position: absolute; left: 50%; top: 50%; z-index: 1; margin: -45px 0 0 -45px; -webkit-animation: spin 1.2s linear infinite; animation: spin 1.2s linear infinite;} \n" +
                "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}";
            if (lockScreenAnime == null) {
                styleTag.innerText = styleData;
                styleTag.id = "lockScreenCss";
                document.head.appendChild(styleTag);
            }
            else {
                lockScreenAnime.innerText = styleData;
            }
        };
        LockScreenService.prototype.setColor1 = function (color) {
            this.color1 = color;
            this.createStyleTag();
        };
        LockScreenService.prototype.setColor2 = function (color) {
            this.color2 = color;
            this.createStyleTag();
        };
        LockScreenService.prototype.lockScreen = function (timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 20000; }
            var lockScreenElement = document.getElementById("lockScreenLoading");
            if (lockScreenElement == null) {
                var lockScreenDiv = document.createElement("div");
                lockScreenDiv.id = "lockScreenLoading";
                lockScreenDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
                lockScreenDiv.style.width = "100vw";
                lockScreenDiv.style.height = "100vh";
                lockScreenDiv.style.position = "fixed";
                lockScreenDiv.style.top = "0px";
                lockScreenDiv.style.left = "0px";
                lockScreenDiv.style.zIndex = "1051";
                var loading = document.createElement("div");
                var loading2 = document.createElement("div");
                loading.className = "loader";
                loading2.className = "loader2";
                lockScreenDiv.appendChild(loading);
                lockScreenDiv.appendChild(loading2);
                document.body.appendChild(lockScreenDiv);
                this.subscribeProcess = rxjs.timer(timeout)
                    .subscribe(function () {
                    _this.unLockScreen();
                });
            }
            else {
                if (typeof (this.subscribeProcess) != "undefined") {
                    this.subscribeProcess.unsubscribe();
                    this.subscribeProcess = rxjs.timer(timeout)
                        .subscribe(function () {
                        _this.unLockScreen();
                    });
                }
            }
        };
        LockScreenService.prototype.unLockScreen = function () {
            var _this = this;
            rxjs.timer(500)
                .subscribe(function () {
                var lockScreenElement = document.getElementById("lockScreenLoading");
                if (lockScreenElement != null) {
                    document.body.removeChild(lockScreenElement);
                    if (typeof (_this.subscribeProcess) != "undefined") {
                        _this.subscribeProcess.unsubscribe();
                    }
                }
            });
        };
        return LockScreenService;
    }());
    LockScreenService.decorators = [
        { type: i0.Injectable }
    ];
    LockScreenService.ctorParameters = function () { return []; };

    var AnimationService = /** @class */ (function () {
        function AnimationService() {
            this.animationEmitter = new i0.EventEmitter();
            this.animationRegister = [];
            this.animationState = 'initial';
            this.initStateTimer = rxjs.timer(100);
            this.animateQueueInterval = rxjs.timer(100);
            this.reRendering = false;
            this.enableAnimation = false;
            this.count = 0;
        }
        AnimationService.prototype.registerAnimation = function (elementName) {
            var _this = this;
            if (!this.reRendering && this.enableAnimation) {
                var registerName = elementName + '_' + this.animationRegister.length;
                this.animationRegister.push(registerName);
                if (this.animationState === 'initial') {
                    this.initStateTimer.subscribe(function () {
                        _this.animateProcess();
                    });
                    this.animationState = 'initialed';
                }
                return registerName;
            }
        };
        AnimationService.prototype.animateProcess = function () {
            var _this = this;
            if (this.enableAnimation) {
                if (this.animationRegister.length > 0) {
                    this.animateQueueInterval.subscribe(function () {
                        _this.count++;
                        var queueName = _this.animationRegister.shift();
                        _this.animationEmitter.emit(queueName);
                        _this.animateProcess();
                    });
                }
                else {
                    this.animationState = 'initial';
                    this.count = 0;
                }
            }
        };
        AnimationService.prototype.setOnReRender = function (rerenderStatus) {
            this.reRendering = rerenderStatus;
        };
        AnimationService.prototype.setEnableAnimation = function (enable) {
            this.enableAnimation = (enable === 'true' || enable === true);
        };
        return AnimationService;
    }());
    AnimationService.??prov = i0__namespace.????defineInjectable({ factory: function AnimationService_Factory() { return new AnimationService(); }, token: AnimationService, providedIn: "root" });
    AnimationService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    AnimationService.ctorParameters = function () { return []; };

    var InputComponent = /** @class */ (function () {
        function InputComponent(viewContainerRef, animationService) {
            this.viewContainerRef = viewContainerRef;
            this.animationService = animationService;
        }
        InputComponent.prototype.processCall = function (data) {
            // console.log(1,data);
        };
        ;
        return InputComponent;
    }());
    InputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-input',
                    template: ''
                },] }
    ];
    InputComponent.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: AnimationService }
    ]; };
    InputComponent.propDecorators = {
        data: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var DynamicBehaviorComponent = /** @class */ (function () {
        function DynamicBehaviorComponent(animationService) {
            this.animationService = animationService;
            this.callBack = new i0.EventEmitter();
            this.panelCallBack = new i0.EventEmitter();
            this.animateTimer = rxjs.timer(60);
            this.animationServiceInit = false;
            this.animateState = false;
            this.animateName = '';
        }
        DynamicBehaviorComponent.prototype.animateProcess = function () {
            var _this = this;
            if (!this.animationServiceInit) {
                this.animateTimer.subscribe(function () {
                    if (_this.animateName == '') {
                        _this.animateName = _this.animationService.registerAnimation(_this.fieldCreation.fieldName);
                    }
                });
            }
            this.animationServiceInit = true;
            this.animationService.animationEmitter.subscribe(function (event) {
                if (_this.animateName === event) {
                    _this.animateState = true;
                }
            });
        };
        DynamicBehaviorComponent.prototype.getLabelWidth = function () {
            var width = '';
            if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
                width = this.fieldCreation.labelWidth + 'px';
            }
            return width;
        };
        DynamicBehaviorComponent.prototype.getInputWidth = function () {
            var width = '';
            if (this.fieldCreation.labelWidth != undefined && this.option.labelAlign != "top") {
                width = 'calc(100% - ' + (parseInt(this.fieldCreation.labelWidth) + 6) + 'px)';
            }
            return width;
        };
        DynamicBehaviorComponent.prototype.processCallBack = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        DynamicBehaviorComponent.prototype.getCustomClass = function () {
            if (typeof (this.fieldCreation.customClass) != 'undefined') {
                return this.fieldCreation.customClass;
            }
            else {
                return '';
            }
        };
        DynamicBehaviorComponent.prototype.checkRequire = function (index) {
            if (typeof (this.data[this.fieldCreation.fieldName][index]) != 'undefined' && this.fieldCreation.require == true && this.data[this.fieldCreation.fieldName][index] == '') {
                return 'require';
            }
            return '';
        };
        DynamicBehaviorComponent.prototype.getDisable = function () {
            var check = false;
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
        };
        DynamicBehaviorComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit({
                feildName: this.fieldCreation.fieldName
            });
        };
        return DynamicBehaviorComponent;
    }());
    DynamicBehaviorComponent.decorators = [
        { type: i0.Component, args: [{
                    template: ''
                },] }
    ];
    DynamicBehaviorComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    DynamicBehaviorComponent.propDecorators = {
        fieldCreation: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        data: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var TextBoxComponent = /** @class */ (function (_super) {
        __extends(TextBoxComponent, _super);
        function TextBoxComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.columnCalculate = "";
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        TextBoxComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                if (typeof (this.fieldCreation.default) != "undefined") {
                    if (Array.isArray(this.fieldCreation.default)) {
                        this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                    }
                    else if (typeof (this.fieldCreation.default) == "string") {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                    }
                }
                else {
                    this.data[this.fieldCreation.fieldName] = [""];
                }
            }
        };
        TextBoxComponent.prototype.addMultiVal = function () {
            this.data[this.fieldCreation.fieldName].push("");
        };
        TextBoxComponent.prototype.deleteMultiVal = function (dataIndex) {
            if (this.data[this.fieldCreation.fieldName].length > 1) {
                this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            }
        };
        TextBoxComponent.prototype.processKeyUp = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            this.allowTempData = true;
            if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                var regexpValue = this.fieldCreation.valuePattern;
                if (typeof (this.fieldCreation.valuePattern) == "string") {
                    regexpValue = new RegExp(this.fieldCreation.valuePattern);
                }
                if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
                    && String(event.target.value).match(regexpValue)) {
                    return true;
                }
                else {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                    return false;
                }
            }
        };
        TextBoxComponent.prototype.processKeyDown = function (event, action, dataIndex) {
            if (this.allowTempData == true) {
                this.allowTempData = false;
                this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        TextBoxComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
                var key = event.key;
                var combineValue = this.tempValue + key;
                var check = true;
                var regexpInput = this.fieldCreation.inputPattern;
                if (typeof (this.fieldCreation.inputPattern) == "string") {
                    regexpInput = new RegExp(this.fieldCreation.inputPattern);
                }
                if (typeof (this.fieldCreation.inputPattern) != "undefined") {
                    if (!String(key).match(regexpInput)) {
                        check = false;
                    }
                }
                if (typeof (this.fieldCreation.validateWhileKeyPress) != "undefined"
                    && typeof (this.fieldCreation.valuePattern) != "undefined"
                    && this.fieldCreation.validateWhileKeyPress) {
                    var regexpValue = this.fieldCreation.valuePattern;
                    if (typeof (this.fieldCreation.valuePattern) == "string") {
                        regexpValue = new RegExp(this.fieldCreation.valuePattern);
                    }
                    if (!String(combineValue).match(regexpValue)) {
                        check = false;
                    }
                }
                if (check == false) {
                    return false;
                }
            }
            return true;
        };
        TextBoxComponent.prototype.processBlur = function (event, action, dataIndex) {
            var validate = true;
            var regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (!String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)
                && this.getDisable() == false) {
                var inputField = event.currentTarget;
                inputField && inputField.focus();
                validate = false;
            }
            if (this.fieldCreation.type == "number") {
                if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] < parseFloat(this.fieldCreation.min)) {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.min;
                }
                if (this.fieldCreation.min != undefined && this.data[this.fieldCreation.fieldName][dataIndex] > parseFloat(this.fieldCreation.max)) {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.fieldCreation.max;
                }
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                validateStatus: validate,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            return validate;
        };
        TextBoxComponent.prototype.getType = function () {
            if (this.fieldCreation.type == "number") {
                return "number";
            }
            else if (this.fieldCreation.type == "password") {
                return "password";
            }
            else {
                return "textbox";
            }
        };
        return TextBoxComponent;
    }(DynamicBehaviorComponent));
    TextBoxComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n                <input type=\"{{getType()}}\" class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                       [readonly]=\"getDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       max=\"{{fieldCreation.max}}\"\r\n                       min=\"{{fieldCreation.min}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    TextBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    TextBoxComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var LabelComponent = /** @class */ (function (_super) {
        __extends(LabelComponent, _super);
        function LabelComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.modeDisplay = "";
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        LabelComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                this.modeDisplay = "dp2hide";
            }
            else {
                this.modeDisplay = "";
            }
        };
        LabelComponent.prototype.processCall = function (data) {
        };
        LabelComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit({
                feildName: this.fieldCreation.fieldName
            });
        };
        return LabelComponent;
    }(DynamicBehaviorComponent));
    LabelComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{modeDisplay}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"labelDetail\">\r\n                <div id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\">{{data[fieldCreation.fieldName][dataIndex]}}</div>\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    LabelComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    LabelComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var CheckBoxComponent = /** @class */ (function (_super) {
        __extends(CheckBoxComponent, _super);
        function CheckBoxComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKey = Object.keys;
            _this.showSelectAll = "dp2hide";
            _this.selectAll = false;
            _this.singleLine = "";
            _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
            _this.checkboxDisplay = "checkboxHide";
            _this.animateProcess();
            return _this;
        }
        CheckBoxComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                if (typeof (this.fieldCreation.default) == "object") {
                    this.data[this.fieldCreation.fieldName] = Object.assign({}, this.fieldCreation.default);
                }
                else {
                    var defaultVal = {};
                    for (var valueIndex in this.fieldCreation.valueList) {
                        defaultVal[this.fieldCreation.valueList[valueIndex].value] = false;
                    }
                    this.data[this.fieldCreation.fieldName] = defaultVal;
                }
            }
            if (this.fieldCreation.showSelectAll == true) {
                this.showSelectAll = "";
            }
            if (this.fieldCreation.displaySingleLine == true || this.option.displayMode == "table") {
                this.singleLine = "singlePerLine";
            }
            else {
                this.singleLine = "multiplePerLine";
            }
            if (this.option.displayMode != 'table') {
                this.checkboxDisplay = "checkboxShow";
            }
        };
        CheckBoxComponent.prototype.toggleSelectAll = function () {
            if (this.selectAll == true) {
                for (var dataIndex in this.fieldCreation.valueList) {
                    this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = true;
                }
            }
            else {
                for (var dataIndex in this.fieldCreation.valueList) {
                    this.data[this.fieldCreation.fieldName][this.fieldCreation.valueList[dataIndex].value] = false;
                }
            }
            this.callBack.emit({
                action: 'selectAll',
                value: this.selectAll,
                fieldName: this.fieldCreation.fieldName
            });
        };
        CheckBoxComponent.prototype.processCall = function (data) {
        };
        CheckBoxComponent.prototype.processChange = function (event, s, valueList) {
            this.callBack.emit({
                action: 'change',
                displayValue: valueList,
                currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
                fieldName: this.fieldCreation.fieldName
            });
        };
        CheckBoxComponent.prototype.toggleShowCheckBox = function () {
            if (!this.getDisable()) {
                if (this.checkboxDisplay == "checkboxHide") {
                    this.checkboxDisplay = "checkboxShow";
                }
                else {
                    this.checkboxDisplay = "checkboxHide";
                }
            }
        };
        CheckBoxComponent.prototype.haveChecked = function () {
            var haveChecked = false;
            for (var valueName in this.data[this.fieldCreation.fieldName]) {
                if (this.data[this.fieldCreation.fieldName][valueName] == true) {
                    haveChecked = true;
                    break;
                }
            }
            return haveChecked;
        };
        return CheckBoxComponent;
    }(DynamicBehaviorComponent));
    CheckBoxComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative\">\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"checkBoxTableDisplay\">\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div *ngIf=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value] && haveChecked()\" class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"checkbox\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}_checked\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label>{{fieldCreation.valueList[listIndex].display}}</label>\r\n                    </div>\r\n                </ng-container>\r\n                <div *ngIf=\"!haveChecked()\">\r\n                    Not Selected\r\n                </div>\r\n            </div>\r\n            <div *ngIf=\"option.displayMode == 'table'\" class=\"arrowToggle\" (click)=\"toggleShowCheckBox()\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{option.formId}}_{{rowIndex}}_arrowDown\">\r\n                <div class=\"arrowDown\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"{{(option.displayMode == 'table' ? 'checkboxList' : '')}} {{checkboxDisplay}}\">\r\n                <div class=\"{{(option.displayMode == 'table' ? 'checkboxListBox' : '')}}\">\r\n                    <div class=\"{{showSelectAll}}\">\r\n                        <input type=\"checkbox\" id=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\" (change)=\"toggleSelectAll()\"\r\n                               [disabled]=\"getDisable()\"\r\n                               [(ngModel)]=\"selectAll\"> <label for=\"id_{{fieldCreation.fieldName}}_selectAll_{{option.formId}}_{{rowIndex}}\">Select All</label>\r\n                    </div>\r\n                    <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                        <div class=\"checkBoxIndent {{singleLine}}\">\r\n                            <input type=\"checkbox\"\r\n                                   id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}_{{listIndex}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][fieldCreation.valueList[listIndex].value]\"\r\n                                   [disabled]=\"getDisable()\"\r\n                                   (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                            <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{listIndex}}_{{option.formId}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n                        </div>\r\n                    </ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    CheckBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    CheckBoxComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var TextAreaComponent = /** @class */ (function (_super) {
        __extends(TextAreaComponent, _super);
        function TextAreaComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        TextAreaComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                if (typeof (this.fieldCreation.default) != "undefined") {
                    if (Array.isArray(this.fieldCreation.default)) {
                        this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                    }
                    else if (typeof (this.fieldCreation.default) == "string") {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                    }
                }
                else {
                    this.data[this.fieldCreation.fieldName] = [""];
                }
            }
        };
        TextAreaComponent.prototype.processCall = function (data) {
        };
        return TextAreaComponent;
    }(DynamicBehaviorComponent));
    TextAreaComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n      <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\r\n        <textarea id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                  [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                  [readonly]=\"getDisable()\"\r\n                  (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                  (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                  (keyup)=\"processCallBack($event,'keyup',dataIndex)\"\r\n                  (keypress)=\"processCallBack($event,'keypress',dataIndex)\"\r\n                  (keydown)=\"processCallBack($event,'keydown',dataIndex)\"\r\n                  (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                  (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                  placeholder=\"{{fieldCreation.placeholder}}\"\r\n                  maxlength=\"{{fieldCreation.maxLength}}\"></textarea>\r\n      </div>\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
                },] }
    ];
    TextAreaComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    TextAreaComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var SelectBoxComponent = /** @class */ (function (_super) {
        __extends(SelectBoxComponent, _super);
        function SelectBoxComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        SelectBoxComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                if (typeof (this.fieldCreation.default) != "undefined") {
                    if (Array.isArray(this.fieldCreation.default)) {
                        this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                    }
                    else if (typeof (this.fieldCreation.default) == "string") {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                    }
                }
                else {
                    if (typeof (this.fieldCreation.valueList[0]) != "undefined") {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.valueList[0].value];
                    }
                }
            }
        };
        SelectBoxComponent.prototype.processCall = function (data) {
        };
        SelectBoxComponent.prototype.processChange = function (event, action, dataIndex) {
            var e_1, _a;
            var valueObj = [];
            for (var dataIndexRaw in this.data[this.fieldCreation.fieldName]) {
                var value = this.data[this.fieldCreation.fieldName][dataIndexRaw];
                try {
                    for (var _b = (e_1 = void 0, __values(this.fieldCreation.valueList)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var valueListRow = _c.value;
                        if (valueListRow.value == value) {
                            valueObj.push(valueListRow);
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
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                valueObj: valueObj,
                fieldName: this.fieldCreation.fieldName
            });
        };
        SelectBoxComponent.prototype.checkValueList = function (valueList) {
            if (valueList != undefined) {
                return true;
            }
            return false;
        };
        return SelectBoxComponent;
    }(DynamicBehaviorComponent));
    SelectBoxComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{checkRequire(dataIndex)}}\">\r\n                <ng-container *ngIf=\"checkValueList(fieldCreation.valueList)\">\r\n                    <select class=\"select-style-custom {{fieldCreation.widthType == 'full' ?  'fullWidth' : ''}}\"  id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                            [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                            [disabled]=\"getDisable()\"\r\n                            (change)=\"processChange($event,'change',dataIndex)\">\r\n                        <option *ngFor=\"let selectRow of fieldCreation.valueList\" value=\"{{selectRow.value}}\">{{selectRow.display}}</option>\r\n                    </select>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    SelectBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    SelectBoxComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var HiddenComponent = /** @class */ (function (_super) {
        __extends(HiddenComponent, _super);
        function HiddenComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKeys = Object.keys;
            return _this;
        }
        HiddenComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
        };
        HiddenComponent.prototype.processCall = function (data) {
        };
        return HiddenComponent;
    }(DynamicBehaviorComponent));
    HiddenComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n    <input type=\"hidden\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\" name=\"{{fieldCreation.fieldName}}\" [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\" [readonly]=\"option.mode == 'view'\"/>\r\n</ng-container>\r\n"
                },] }
    ];
    HiddenComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    HiddenComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var FileUploadComponent = /** @class */ (function (_super) {
        __extends(FileUploadComponent, _super);
        function FileUploadComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.acceptExt = ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf";
            _this.animateProcess();
            return _this;
        }
        FileUploadComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            this.data[this.fieldCreation.fieldName] = Object.assign({}, {
                currentFile: [],
                selectFile: {},
            });
            if (this.fieldCreation.accept) {
                this.acceptExt = this.fieldCreation.accept;
            }
        };
        FileUploadComponent.prototype.handleFileSelect = function (evt) {
            if (typeof (evt.target) != "undefined") {
                this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
            }
            this.callBack.emit({
                event: evt,
                action: "fileSelect",
                fieldName: this.fieldCreation.fieldName
            });
        };
        FileUploadComponent.prototype.processCall = function (data) {
        };
        return FileUploadComponent;
    }(DynamicBehaviorComponent));
    FileUploadComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"posRelative {{fieldCreation.require && (!data[fieldCreation.fieldName].selectFile || !data[fieldCreation.fieldName].selectFile.length || data[fieldCreation.fieldName].selectFile.length == 0) ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\"\r\n                       class=\"fullWidth\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\" name=\"{{fieldCreation.fieldName}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    FileUploadComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    FileUploadComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var ImageComponent = /** @class */ (function (_super) {
        __extends(ImageComponent, _super);
        function ImageComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.base64textString = [];
            _this.objKeys = Object.keys;
            _this.modeDisplay = "";
            _this.errorMsg = "";
            _this.acceptExt = "image/*";
            _this.fileTypeList = {
                "jpeg": "image/jpeg",
                "jpg": "image/jpeg",
                "png": "image/png",
                "svg": "image/svg+xml"
            };
            _this.animateProcess();
            return _this;
        }
        ImageComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                this.modeDisplay = "dp2hide";
            }
            else {
                this.modeDisplay = "";
            }
            this.data[this.fieldCreation.fieldName] = Object.assign({}, {
                currentFile: [],
                selectFile: {},
            });
            if (this.fieldCreation.accept) {
                this.acceptExt = this.fieldCreation.accept;
            }
        };
        ImageComponent.prototype.handleFileSelect = function (evt) {
            this.base64textString = [];
            if (typeof (evt.target) != "undefined") {
                this.data[this.fieldCreation.fieldName].selectFile = evt.target.files;
                var files = evt.target.files;
                var validate = this.validateFileExtension();
                if (validate == true) {
                    for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                        var file = files[fileIndex];
                        if (files && file) {
                            var reader = new FileReader();
                            reader.onload = this._handleReaderLoaded.bind(this);
                            reader.readAsBinaryString(file);
                        }
                    }
                }
            }
            this.callBack.emit({
                event: evt,
                action: "fileSelect",
                fieldName: this.fieldCreation.fieldName
            });
        };
        ImageComponent.prototype._handleReaderLoaded = function (readerEvt) {
            var filenameSplit = String(this.data[this.fieldCreation.fieldName].selectFile[this.base64textString.length].name).split('.');
            var ext = filenameSplit.pop().toLowerCase();
            if (this.fileTypeList[ext]) {
                var binaryString = readerEvt.target.result;
                // console.log("url(data:image/jpg;base64," + btoa(binaryString) + ")");
                this.base64textString.push("url('data:" + this.fileTypeList[ext] + ";base64," + btoa(binaryString) + "')");
            }
        };
        ImageComponent.prototype.getNasImageUrl = function (file) {
            if (file != null && file.length > 0) {
                return "url('" + file + "')";
            }
            return "";
        };
        ImageComponent.prototype.processCall = function (data) {
        };
        ImageComponent.prototype.getType = function (data) {
            return typeof (data);
        };
        ImageComponent.prototype.validateFileExtension = function () {
            this.errorMsg = "";
            if (typeof (this.fieldCreation.fileType) != "undefined") {
                var fileData = this.data[this.fieldCreation.fieldName].selectFile;
                var validateExtensionString = this.fieldCreation.fileType.replace([","], ["|"]);
                var validatePattern = new RegExp(validateExtensionString, "i");
                for (var fileDataIndex = 0; fileDataIndex < fileData.length; fileDataIndex++) {
                    var fileName = fileData[fileDataIndex].name;
                    var fileNameSplit = fileName.split(".");
                    var extension = fileNameSplit.pop();
                    if (!validatePattern.test(extension)) {
                        this.errorMsg = "File type mismatch.";
                        return false;
                    }
                }
                return true;
            }
            else {
                return true;
            }
        };
        ImageComponent.prototype.checkFileRequire = function () {
            if ((!this.data[this.fieldCreation.fieldName].selectFile
                || !this.data[this.fieldCreation.fieldName].selectFile.length
                || this.data[this.fieldCreation.fieldName].selectFile.length == 0)
                && (!this.data[this.fieldCreation.fieldName].currentFile
                    || !this.data[this.fieldCreation.fieldName].currentFile.length
                    || this.data[this.fieldCreation.fieldName].currentFile.length == 0)) {
                return true;
            }
            return false;
        };
        ImageComponent.prototype.clickImage = function (index) {
            this.callBack.emit({
                fileIndex: index,
                base64: this.base64textString[index],
                fileData: this.data[this.fieldCreation.fieldName].selectFile[index],
                action: "click",
                fieldName: this.fieldCreation.fieldName
            });
        };
        ImageComponent.prototype.clickCurrentImage = function (index) {
            this.callBack.emit({
                fileIndex: index,
                fileData: this.data[this.fieldCreation.fieldName].currentFile[index],
                action: "click",
                fieldName: this.fieldCreation.fieldName
            });
        };
        ImageComponent.prototype.deleteCurrentImage = function (index) {
            this.data[this.fieldCreation.fieldName].currentFile.splice(index, 1);
            this.callBack.emit({
                fileIndex: index,
                action: "delete",
                fieldName: this.fieldCreation.fieldName
            });
        };
        ImageComponent.prototype.deleteImage = function (index) {
            this.base64textString.splice(index, 1);
            var fileCurrent = this.imageInputVC.nativeElement.files;
            var dt = new DataTransfer();
            for (var fileIndex = 0; fileIndex < fileCurrent.length; fileIndex++) {
                if (fileIndex != index) {
                    var file = fileCurrent[fileIndex];
                    dt.items.add(file);
                }
            }
            this.imageInputVC.nativeElement.value = '';
            this.imageInputVC.nativeElement.files = dt.files;
            this.data[this.fieldCreation.fieldName].selectFile = dt.files;
            this.callBack.emit({
                fileIndex: index,
                action: "delete",
                fieldName: this.fieldCreation.fieldName
            });
        };
        return ImageComponent;
    }(DynamicBehaviorComponent));
    ImageComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"\r\n     [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container\r\n                *ngIf=\"base64textString != null && base64textString.length == 0 && getType(data[fieldCreation.fieldName].currentFile) != 'undefined'\">\r\n            <div class=\"imageItem\" *ngFor=\"let fileIndex of objKeys(data[fieldCreation.fieldName].currentFile)\">\r\n                <div class=\"image\"\r\n                     [ngStyle]=\"{'background-image':getNasImageUrl(data[fieldCreation.fieldName].currentFile[fileIndex])}\"  (click)=\"clickCurrentImage(fileIndex)\"></div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteCurrentImage(fileIndex)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"base64textString != null && base64textString.length > 0\">\r\n            <div class=\"imageItem\" *ngFor=\"let indexB64 of objKeys(base64textString)\">\r\n                <div class=\"image\" [ngStyle]=\"{'background-image':base64textString[indexB64]}\" (click)=\"clickImage(indexB64)\">\r\n\r\n                </div>\r\n                <div *ngIf=\"fieldCreation.showDelete\" class=\"deleteImage\" (click)=\"deleteImage(indexB64)\">\r\n                    <span class=\"glyphicon glyphicon-remove\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"posRelative {{fieldCreation.require && checkFileRequire() ? 'require' : ''}}\">\r\n            <div *ngIf=\"option.mode != 'view'\" class=\"upload\">\r\n                <input type=\"file\" class=\"fullWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{'_'+rowIndex}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       accept=\"{{acceptExt}}\"\r\n                       #imageInput\r\n                       [disabled]=\"getDisable()\"\r\n                       (change)=\"handleFileSelect($event)\"\r\n                       [multiple]=\"fieldCreation.multiValue\"/>\r\n            </div>\r\n            <div class=\"dp2Note\"\r\n                 id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div class=\"dp2Error\">\r\n                {{errorMsg}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    ImageComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    ImageComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }],
        imageInputVC: [{ type: i0.ViewChild, args: ['imageInput',] }]
    };

    var AutoCompleteComponent = /** @class */ (function (_super) {
        __extends(AutoCompleteComponent, _super);
        function AutoCompleteComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.columnCalculate = '';
            _this.objKeys = Object.keys;
            _this.autoCompleteFilterList = [];
            _this.displayAutoComplete = [];
            _this.setOnList = [];
            _this.maxShowData = 20;
            _this.selectIndex = 0;
            _this.tempValue = [];
            _this.tempValueValidate = {};
            _this.tempFilter = [];
            _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
            _this.displayIndex = [];
            _this.btnHover = false;
            _this.assignByEnter = false;
            _this.animateProcess();
            return _this;
        }
        AutoCompleteComponent.prototype.ngOnInit = function () {
            var e_1, _a;
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = 'dp2Col1';
                    break;
                case 2:
                    this.columnCalculate = 'dp2Col2';
                    break;
                case 3:
                    this.columnCalculate = 'dp2Col3';
                    break;
                case 4:
                    this.columnCalculate = 'dp2Col4';
                    break;
                default:
                    this.columnCalculate = '';
            }
            if (this.option.mode == 'add') {
                if (typeof (this.fieldCreation.default) != 'undefined') {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], [{
                            display: '',
                            value: ''
                        }]);
                    if (Array.isArray(this.fieldCreation.default) && this.checkDefault()) {
                        var newDefault = [];
                        try {
                            for (var _b = __values(this.fieldCreation.default), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var defaultDataRow = _c.value;
                                newDefault.push(Object.assign({}, defaultDataRow));
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        this.data[this.fieldCreation.fieldName] = newDefault;
                    }
                    else if (typeof (this.fieldCreation.default) == 'object' && this.checkDefault()) {
                        this.data[this.fieldCreation.fieldName] = [Object.assign({}, this.fieldCreation.default)];
                    }
                }
                else {
                    this.data[this.fieldCreation.fieldName] = Object.assign([], [{
                            display: '',
                            value: ''
                        }]);
                }
            }
            if (typeof (this.fieldCreation.maxShowData) != 'undefined' && parseInt(this.fieldCreation.maxShowData) > 0) {
                this.maxShowData = parseInt(this.fieldCreation.maxShowData);
            }
            for (var dataIndex in this.data[this.fieldCreation.fieldName]) {
                this.autoCompleteFilterList[dataIndex] = [];
                this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
                this.setOnList[dataIndex] = false;
                this.tempValue[dataIndex] = Object.assign({}, this.data[this.fieldCreation.fieldName][dataIndex]);
            }
            // for (let dataIndex in this.data[this.fieldCreation.fieldName]) {
            // 	this.tempValue[dataIndex] = Object.assign({},this.data[this.fieldCreation.fieldName][dataIndex]);
            // }
        };
        AutoCompleteComponent.prototype.getDataFromValue = function (value) {
            var e_2, _a;
            try {
                for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var i = _c.value;
                    if (i.value === value) {
                        return i;
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
            return null;
        };
        AutoCompleteComponent.prototype.addMultiVal = function () {
            var dataLastIndex = this.data[this.fieldCreation.fieldName].length;
            this.autoCompleteFilterList[dataLastIndex] = [];
            this.displayAutoComplete[dataLastIndex] = 'autoCompleteHide';
            this.setOnList[dataLastIndex] = false;
            this.data[this.fieldCreation.fieldName].push({
                display: '',
                value: ''
            });
        };
        AutoCompleteComponent.prototype.deleteMultiVal = function (dataIndex) {
            if (this.data[this.fieldCreation.fieldName].length > 1) {
                this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            }
        };
        AutoCompleteComponent.prototype.processClick = function (event, action, dataIndex) {
            if (this.fieldCreation.showAllOnClick) {
                this.selectIndex = 0;
                this.filterAutoComplete(dataIndex, true);
                this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
                if (this.aNgScrollBar.toArray()[dataIndex]) {
                    this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
                }
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        AutoCompleteComponent.prototype.processFocus = function (event, action, dataIndex) {
            if (!this.fieldCreation.showButton || (this.fieldCreation.showButton && action === 'clickBtn')) {
                if ((this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && !this.getDisable() && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == undefined || this.option.enableRowIndex[this.rowIndex] == true)))) {
                    this.selectIndex = 0;
                    this.filterAutoComplete(dataIndex);
                    this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
                }
                this.callBack.emit({
                    event: event,
                    action: action,
                    dataIndex: dataIndex,
                    fieldName: this.fieldCreation.fieldName,
                    value: this.data[this.fieldCreation.fieldName][dataIndex]
                });
                if (this.aNgScrollBar.toArray()[dataIndex]) {
                    this.fixScrollBar = this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
                }
            }
        };
        AutoCompleteComponent.prototype.hideList = function (dataIndex) {
            if (this.setOnList[dataIndex] == false) {
                this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
            }
        };
        AutoCompleteComponent.prototype.setOverList = function (dataIndex) {
            this.setOnList[dataIndex] = true;
        };
        AutoCompleteComponent.prototype.setOutList = function (dataIndex) {
            this.setOnList[dataIndex] = false;
        };
        AutoCompleteComponent.prototype.processKeyUp = function (event, action, dataIndex) {
            var e_3, _a;
            var _this = this;
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            if (!this.fieldCreation.showButton && event.which !== 38 && event.which !== 40) {
                this.allowTempData = true;
                if (this.checkReadonly()) {
                    if (this.fieldCreation.valueList.length > 0 || this.fieldCreation.showAllOnClick == true) {
                        if (typeof (this.data[this.fieldCreation.fieldName][dataIndex]) == 'undefined' || typeof (this.data[this.fieldCreation.fieldName][dataIndex].display) == 'undefined') {
                            this.data[this.fieldCreation.fieldName][dataIndex] = {
                                display: '',
                                value: ''
                            };
                        }
                        if (this.displayAutoComplete[dataIndex] != 'autoCompleteShow') {
                            this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
                        }
                        var force = false;
                        if (this.fieldCreation.showAllOnClick == true) {
                            force = true;
                        }
                        this.filterAutoComplete(dataIndex, force);
                    }
                    if (event.which == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != 'undefined') {
                        this.assignByEnter = true;
                        this.hideList(dataIndex);
                    }
                    else if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                        var regexpValue = this.fieldCreation.valuePattern;
                        if (typeof (this.fieldCreation.valuePattern) == "string") {
                            regexpValue = new RegExp(this.fieldCreation.valuePattern);
                        }
                        if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexpValue)) {
                            return true;
                        }
                        else {
                            this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                            return false;
                        }
                    }
                    if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                        try {
                            for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var valueListRow = _c.value;
                                if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueListRow.display) {
                                    this.data[this.fieldCreation.fieldName][dataIndex].value = valueListRow.value;
                                    break;
                                }
                                else {
                                    this.data[this.fieldCreation.fieldName][dataIndex].value = '';
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                var timerSb_1 = rxjs.timer(100)
                    .subscribe(function () {
                    if (_this.aNgScrollBar.toArray()[dataIndex]) {
                        _this.fixScrollBar = _this.aNgScrollBar.toArray()[dataIndex].state.isVerticallyScrollable;
                        timerSb_1.unsubscribe();
                    }
                });
            }
        };
        AutoCompleteComponent.prototype.processKeyDown = function (event, action, dataIndex) {
            if (this.fieldCreation.showButton) {
                this.hideList(dataIndex);
            }
            if (this.allowTempData == true) {
                this.tempValueValidate = this.data[this.fieldCreation.fieldName][dataIndex].display;
            }
            if (event.which == 38 && this.selectIndex > 0) {
                this.selectIndex--;
            }
            else if (event.which == 40 && this.selectIndex < (this.autoCompleteFilterList[dataIndex].length - 1)) {
                this.selectIndex++;
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        AutoCompleteComponent.prototype.processCall = function (data) {
            var e_4, _a;
            if (this.checkReadonly()) {
                if (data.process == 'processList') {
                    var dataIndex = data.param.dataIndex;
                    this.autoCompleteFilterList[dataIndex] = [];
                    if (this.fieldCreation.valueList.length > 0) {
                        if (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0) {
                            var pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
                            try {
                                for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var i = _c.value;
                                    if (String(i.display).match(pattern)) {
                                        if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                                            this.autoCompleteFilterList[dataIndex].push(i);
                                        }
                                        else {
                                            break;
                                        }
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        }
                    }
                    this.displayAutoComplete[dataIndex] = 'autoCompleteShow';
                }
                else if (data.process == 'clearFilter') {
                    var dataIndex = data.param.dataIndex;
                    this.autoCompleteFilterList[dataIndex] = [];
                }
            }
        };
        AutoCompleteComponent.prototype.checkReadonly = function () {
            return (this.fieldCreation.readonly == undefined || (this.fieldCreation.readonly == false)) && this.option.mode != 'view' && (this.option.enableRowIndex == undefined || ((this.option.enableRowIndex[this.rowIndex] == true || this.option.enableRowIndex[this.rowIndex] == undefined)));
        };
        AutoCompleteComponent.prototype.assignData = function (event, dataIndex, data) {
            this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, data);
            this.tempValue[dataIndex] = Object.assign({}, data);
            this.displayAutoComplete[dataIndex] = 'autoCompleteHide';
            this.setOnList[dataIndex] = false;
            this.callBack.emit({
                event: event,
                action: 'assignData',
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                assignData: data
            });
        };
        AutoCompleteComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            if (event.which == 32 || event.which > 46) {
                var key = event.key;
                var regexpInput = this.fieldCreation.inputPattern;
                if (typeof (this.fieldCreation.inputPattern) == "string") {
                    regexpInput = new RegExp(this.fieldCreation.inputPattern);
                }
                if (!String(key).match(regexpInput)) {
                    return false;
                }
            }
            if (event.which == 13 && typeof (this.autoCompleteFilterList[dataIndex][this.selectIndex]) != 'undefined') {
                this.assignByEnter = true;
                this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
                var data = Object.assign({}, this.autoCompleteFilterList[dataIndex][this.selectIndex]);
                this.selectIndex = 0;
                this.callBack.emit({
                    event: event,
                    action: 'assignData',
                    dataIndex: dataIndex,
                    fieldName: this.fieldCreation.fieldName,
                    assignData: data
                });
            }
            if (event.which != 46 && event.which != 8 && event.ctrlKey != true && event.altKey != true) {
                var key = event.key;
                var combineValue = void 0;
                if (typeof (this.tempValueValidate) != 'undefined') {
                    combineValue = this.tempValueValidate + key;
                }
                else {
                    combineValue = key;
                }
                var regexpInput = this.fieldCreation.inputPattern;
                if (typeof (this.fieldCreation.inputPattern) == "string") {
                    regexpInput = new RegExp(this.fieldCreation.inputPattern);
                }
                if (String(key).match(regexpInput)) {
                    return true;
                }
                return false;
            }
            return true;
        };
        AutoCompleteComponent.prototype.processBlur = function (event, action, dataIndex) {
            var e_5, _a;
            var validate = true;
            var regexpValue = this.fieldCreation.valuePattern;
            if (typeof (this.fieldCreation.valuePattern) == "string") {
                regexpValue = new RegExp(this.fieldCreation.valuePattern);
            }
            if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)
                && this.getDisable() == false) {
                var inputField = event.currentTarget;
                inputField && inputField.focus();
                validate = false;
            }
            if (typeof (this.fieldCreation.fixedValue) != 'undefined' && this.fieldCreation.fixedValue == true && this.btnHover == false) {
                if (this.data[this.fieldCreation.fieldName][dataIndex] && this.tempValue[dataIndex] && this.data[this.fieldCreation.fieldName][dataIndex].display != this.tempValue[dataIndex].display) {
                    try {
                        for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var valueList = _c.value;
                            if (this.data[this.fieldCreation.fieldName][dataIndex].display == valueList.display) {
                                this.tempValue[dataIndex] = Object.assign({}, valueList);
                                break;
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
                this.data[this.fieldCreation.fieldName][dataIndex] = Object.assign({}, this.tempValue[dataIndex]);
            }
            if (this.btnHover) {
                var timerSb_2 = rxjs.timer(100).subscribe(function () {
                    event.target.focus();
                    timerSb_2.unsubscribe();
                });
            }
            if (!this.fieldCreation.fixedValue && this.btnHover == false && !this.assignByEnter) {
                this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display;
            }
            this.hideList(dataIndex);
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                validateStatus: validate,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        AutoCompleteComponent.prototype.mouseOverChangeIndex = function (filterIndex) {
            // console.log(this.aNgScrollBar);
            this.selectIndex = filterIndex;
        };
        AutoCompleteComponent.prototype.filterAutoComplete = function (dataIndex, force) {
            var e_6, _a;
            if (force === void 0) { force = false; }
            this.assignByEnter = false;
            this.refineValueList();
            if (((this.data[this.fieldCreation.fieldName][dataIndex].display
                && (this.data[this.fieldCreation.fieldName][dataIndex].display.length > 0 || this.fieldCreation.showAllOnClick)
                && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display)
                || this.fieldCreation.showAllData)
                && this.tempFilter[dataIndex] != this.data[this.fieldCreation.fieldName][dataIndex].display || force) {
                var resetSelectIndex = false;
                if (this.data[this.fieldCreation.fieldName][dataIndex].display.length == 0 && this.fieldCreation.showAllOnClick) {
                    this.autoCompleteFilterList[dataIndex] = [];
                    this.autoCompleteFilterList[dataIndex] = Object.assign(this.fieldCreation.valueList);
                    resetSelectIndex = true;
                }
                else {
                    this.autoCompleteFilterList[dataIndex] = [];
                    // let filterList = this.autoCompleteFilterList[dataIndex];
                    this.tempFilter[dataIndex] = this.data[this.fieldCreation.fieldName][dataIndex].display;
                    // let pattern = new RegExp(this.data[this.fieldCreation.fieldName][dataIndex].display, 'gi');
                    var pattern = this.data[this.fieldCreation.fieldName][dataIndex].display;
                    try {
                        for (var _b = __values(this.fieldCreation.valueList), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var i = _c.value;
                            // if (String(i.display).match(pattern) > -1) {
                            if (String(i.display).indexOf(pattern) > -1) {
                                if (this.autoCompleteFilterList[dataIndex].length < this.maxShowData || this.fieldCreation.showAllData) {
                                    this.autoCompleteFilterList[dataIndex].push(i);
                                    resetSelectIndex = true;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
                if (resetSelectIndex == true) {
                    this.selectIndex = 0;
                }
            }
        };
        AutoCompleteComponent.prototype.refineValueList = function () {
            var newValueList = [];
            for (var listIndex in this.fieldCreation.valueList) {
                if (this.fieldCreation.disableRefined == undefined || this.fieldCreation.disableRefined == false) {
                    if (this.fieldCreation.valueList[listIndex].display != '' && this.fieldCreation.valueList[listIndex].value != '') {
                        newValueList.push({
                            display: this.fieldCreation.valueList[listIndex].display,
                            value: this.fieldCreation.valueList[listIndex].value
                        });
                    }
                    if (this.fieldCreation.valueList[listIndex].display == '' && this.fieldCreation.valueList[listIndex].value != '') {
                        newValueList.push({
                            display: this.fieldCreation.valueList[listIndex].value,
                            value: this.fieldCreation.valueList[listIndex].value
                        });
                    }
                    if (this.fieldCreation.valueList[listIndex].value == '' && this.fieldCreation.valueList[listIndex].display != '') {
                        newValueList.push({
                            display: this.fieldCreation.valueList[listIndex].display,
                            value: this.fieldCreation.valueList[listIndex].display
                        });
                    }
                }
                else {
                    newValueList.push({
                        display: this.fieldCreation.valueList[listIndex].display,
                        value: this.fieldCreation.valueList[listIndex].value
                    });
                }
            }
            this.fieldCreation.valueList = newValueList;
        };
        AutoCompleteComponent.prototype.checkDefault = function () {
            var e_7, _a;
            var check = true;
            if (Array.isArray(this.fieldCreation.default)) {
                try {
                    for (var _b = __values(this.fieldCreation.default), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var dataRow = _c.value;
                        if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
                            check = false;
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
            else {
                var dataRow = Object.assign({}, this.fieldCreation.default);
                if (typeof (dataRow.display) == 'undefined' || dataRow.value == 'undefined') {
                    check = false;
                }
            }
            return check;
        };
        AutoCompleteComponent.prototype.setBtnHover = function (status) {
            this.btnHover = status;
        };
        return AutoCompleteComponent;
    }(DynamicBehaviorComponent));
    AutoCompleteComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n        [fieldCreation]=\"fieldCreation\"\r\n        [option]=\"option\"\r\n        [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && (!data[fieldCreation.fieldName][dataIndex].value || data[fieldCreation.fieldName][dataIndex].value == '') ? 'require' : ''}}\">\r\n                <input type=\"textbox\" class=\"{{fieldCreation.showButton ? 'autoCompleteWidth':'fullWidth'}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\" [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                       [autocomplete]=\"'off'\"\r\n                       [readonly]=\"getDisable()\"\r\n                       (focus)=\"processFocus($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processClick($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"{{fieldCreation.showButton ? 'deleteBtnWithAutoComplete': 'deleteBtn'}}\" (click)=\"deleteMultiVal(dataIndex)\"><span\r\n                        class=\"glyphicon glyphicon-minus\"></span></div>\r\n                <div *ngIf=\"autoCompleteFilterList[dataIndex].length > 0\"\r\n                     class=\"autoCompleteList {{displayAutoComplete[dataIndex]}}\"\r\n                     (mouseenter)=\"setOverList(dataIndex)\"\r\n                     (mouseleave)=\"setOutList(dataIndex)\">\r\n                    <ng-scrollbar #a_ngScrollbar class=\"autoCompleteScrollBox\">\r\n                        <div class=\"autoCompleteListBox {{fixScrollBar ? 'fix-ng-scrollbar' : ''}}\">\r\n                            <div *ngFor=\"let filterIndex of objKeys(autoCompleteFilterList[dataIndex])\" class=\"autoCompleteData  {{(selectIndex == filterIndex ? 'selectedIndex' : '')}}\"\r\n                                 (mouseenter)=\"mouseOverChangeIndex(filterIndex)\"\r\n                                 (click)=\"assignData($event,dataIndex,autoCompleteFilterList[dataIndex][filterIndex])\">\r\n                                {{autoCompleteFilterList[dataIndex][filterIndex].display}}\r\n                            </div>\r\n                        </div>\r\n                    </ng-scrollbar>\r\n                </div>\r\n                <div *ngIf=\"fieldCreation.showButton\" class=\"autoCompleteButtonPanel{{getDisable() ? ' disable': ' enable'}}\"\r\n                    (click)=\"!getDisable() ? processFocus($event, 'clickBtn', dataIndex) : null\"\r\n                    (mouseenter)=\"setBtnHover(true)\"\r\n                    (mouseleave)=\"setBtnHover(false)\">\r\n                    <span class=\"glyphicon glyphicon-search\"></span>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    AutoCompleteComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    AutoCompleteComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }],
        aNgScrollBar: [{ type: i0.ViewChildren, args: [ngxScrollbar.NgScrollbar,] }]
    };

    var ButtonComponent = /** @class */ (function (_super) {
        __extends(ButtonComponent, _super);
        function ButtonComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        ButtonComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
        };
        ButtonComponent.prototype.processClick = function (event, action, dataIndex, valueList) {
            if (!this.getDisable() && !this.disableList(valueList.value)) {
                if (typeof (this.data[this.fieldCreation.fieldName]) != "undefined" && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != "undefined") {
                    this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
                }
                this.callBack.emit({
                    event: event,
                    action: action,
                    dataIndex: dataIndex,
                    valueList: valueList,
                    fieldName: this.fieldCreation.fieldName
                });
            }
        };
        ButtonComponent.prototype.disableList = function (value) {
            if (this.fieldCreation.disableList && this.fieldCreation.disableList.indexOf(value) > -1) {
                return true;
            }
            return false;
        };
        return ButtonComponent;
    }(DynamicBehaviorComponent));
    ButtonComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n\r\n      <div class=\"posRelative\">\r\n        <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n          <div class=\"btn-style-dynamic {{(fieldCreation.smallButton ? 'btn-small' : '')}}{{(getDisable() ? ' btn-disable' : '')}}{{(disableList(fieldCreation.valueList[valueListIndex].value) ? ' btn-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n               (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n               (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n        </ng-container>\r\n      </div>\r\n\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
                },] }
    ];
    ButtonComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    ButtonComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var SwappingBoxComponent = /** @class */ (function (_super) {
        __extends(SwappingBoxComponent, _super);
        function SwappingBoxComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.modeDisplay = "";
            _this.objKeys = Object.keys;
            _this.optionText = "Option";
            _this.selectedText = "Selected";
            _this.selectAllText = "Select All";
            _this.removeAllText = "Remove All";
            _this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
            _this.filter = "";
            _this.filterToggle = "filterInvisible";
            _this.animateProcess();
            return _this;
        }
        SwappingBoxComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                this.modeDisplay = "dp2hide";
            }
            else {
                this.modeDisplay = "";
            }
            if (this.fieldCreation.optionText) {
                this.optionText = this.fieldCreation.optionText;
            }
            if (this.fieldCreation.selectedText) {
                this.selectedText = this.fieldCreation.selectedText;
            }
            if (this.fieldCreation.selectAllText) {
                this.selectAllText = this.fieldCreation.selectAllText;
            }
            if (this.fieldCreation.removeAllText) {
                this.removeAllText = this.fieldCreation.removeAllText;
            }
        };
        SwappingBoxComponent.prototype.processCall = function (data) {
        };
        SwappingBoxComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit({
                feildName: this.fieldCreation.fieldName
            });
        };
        SwappingBoxComponent.prototype.checkDestData = function (valueList) {
            var e_1, _a;
            var checkValue = valueList.value;
            var checkDisplay = valueList.display.toLowerCase();
            var foundFlag = false;
            try {
                for (var _b = __values(this.data[this.fieldCreation.fieldName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var dataRow = _c.value;
                    if (dataRow.value == checkValue) {
                        foundFlag = true;
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
            if (foundFlag == true) {
                return false;
            }
            if (this.filter.length > 0 && checkDisplay.indexOf(this.filter.toLowerCase()) == -1) {
                return false;
            }
            return true;
        };
        SwappingBoxComponent.prototype.transferData = function (valueIndex) {
            var e_2, _a;
            if (!this.getDisable()) {
                var value = this.fieldCreation.valueList[valueIndex].value;
                var foundFlag = false;
                try {
                    for (var _b = __values(this.data[this.fieldCreation.fieldName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var dataRow = _c.value;
                        if (dataRow.value == value) {
                            foundFlag = true;
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
                if (foundFlag == false) {
                    if (typeof (this.data[this.fieldCreation.fieldName]) == "undefined") {
                        this.data[this.fieldCreation.fieldName] = [];
                    }
                    this.data[this.fieldCreation.fieldName].push(this.fieldCreation.valueList[valueIndex]);
                }
                var valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
                this.callBack.emit({
                    action: "add",
                    valueObj: valueObj,
                    fieldName: this.fieldCreation.fieldName
                });
            }
        };
        SwappingBoxComponent.prototype.removeData = function (dataIndex) {
            if (!this.getDisable()) {
                this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
                var valueObj = Object.assign([], this.data[this.fieldCreation.fieldName]);
                this.callBack.emit({
                    action: "remove",
                    valueObj: valueObj,
                    fieldName: this.fieldCreation.fieldName
                });
            }
        };
        SwappingBoxComponent.prototype.removeAll = function () {
            this.data[this.fieldCreation.fieldName] = [];
        };
        SwappingBoxComponent.prototype.selectAll = function () {
            this.data[this.fieldCreation.fieldName] = this.fieldCreation.valueList;
        };
        SwappingBoxComponent.prototype.toggleFilter = function () {
            if (this.filterToggle === "filterInvisible") {
                this.filterToggle = "filterVisible";
            }
            else {
                this.filter = "";
                this.filterToggle = "filterInvisible";
            }
        };
        return SwappingBoxComponent;
    }(DynamicBehaviorComponent));
    SwappingBoxComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div *ngIf=\"data[fieldCreation.fieldName]\" class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\"  [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n            <div class=\"posRelative\">\r\n                <div class=\"dp2Table\">\r\n                    <div class=\"dp2Row\">\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"optionText\"></div>\r\n                                <div class=\"filterEnable\" (click)=\"toggleFilter()\"><span class=\"glyphicon glyphicon-search\"></span></div>\r\n                                <input type=\"text\" class=\"filter {{filterToggle}}\"\r\n                                       [readOnly]=\"filterToggle == 'filterInvisible'\"\r\n                                       [(ngModel)]=\"filter\" placeholder=\"Filter\"/>\r\n                            </div>\r\n                            <div class=\"source\">\r\n                                <ng-container *ngFor=\"let valueIndex of objKeys(fieldCreation.valueList)\">\r\n                                    <div class=\"source_select\" *ngIf=\"checkDestData(fieldCreation.valueList[valueIndex])\" (click)=\"transferData(valueIndex)\" [innerHTML]=\"fieldCreation.valueList[valueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"dp2Cell iconBox\">\r\n                            <abbr title=\"{{selectAllText}}\">\r\n                                <div class=\"selectAll\" (click)=\"selectAll()\"><span class=\"glyphicon glyphicon-forward\"></span></div>\r\n                            </abbr>\r\n                            <abbr title=\"{{removeAllText}}\">\r\n                                <div class=\"removeAll\" (click)=\"removeAll()\"><span class=\"glyphicon glyphicon-backward\"></span></div>\r\n                            </abbr>\r\n                        </div>\r\n                        <div class=\"dp2Cell sourceBox {{getDisable() ? 'readonly' : ''}}\">\r\n                            <div class=\"headerPanel\">\r\n                                <div class=\"headText\" [innerHTML]=\"selectedText\"></div>\r\n                            </div>\r\n                            <div class=\"destination\">\r\n                                <ng-container *ngFor=\"let dataValueIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                                    <div class=\"source_select\" (click)=\"removeData(dataValueIndex)\" [innerHTML]=\"data[fieldCreation.fieldName][dataValueIndex].display\">\r\n\r\n                                    </div>\r\n                                </ng-container>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        <div class=\"dp2Note\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n<div *ngIf=\"!data[fieldCreation.fieldName]\">Data undefined: {{fieldCreation.fieldName}}</div>\r\n"
                },] }
    ];
    SwappingBoxComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    SwappingBoxComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var MapValueComponent = /** @class */ (function (_super) {
        __extends(MapValueComponent, _super);
        function MapValueComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.columnCalculate = "";
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        MapValueComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
        };
        MapValueComponent.prototype.addMultiVal = function () {
            this.data[this.fieldCreation.fieldName].push({
                display: "",
                value: ""
            });
        };
        MapValueComponent.prototype.deleteMultiVal = function (dataIndex) {
            if (this.data[this.fieldCreation.fieldName].length > 1) {
                this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            }
        };
        MapValueComponent.prototype.processKeyUp = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName
            });
            if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(this.fieldCreation.valuePattern)) {
                    return true;
                }
                else {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                    return false;
                }
            }
        };
        MapValueComponent.prototype.processKeyDown = function (event, action, dataIndex) {
            this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName
            });
        };
        MapValueComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName
            });
            if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
                var key = event.key;
                if (String(key).match(this.fieldCreation.inputPattern)) {
                    return true;
                }
                return false;
            }
            return true;
        };
        return MapValueComponent;
    }(DynamicBehaviorComponent));
    MapValueComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <div class=\"dp2Table fullWidth dp2TableSpace\">\r\n            <div class=\"dp2Row posRelative\">\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"displayPanel\">\r\n                        Display\r\n                    </div>\r\n                </div>\r\n                <div class=\"dp2Cell\">\r\n                    <div class=\"valuePanel\">\r\n                        Value\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n                <div class=\"dp2Row\">\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} displayPanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_display_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"dp2Cell\">\r\n                        <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}} valuePanel\">\r\n                            <input type=\"textbox\" class=\"fullWidth\"\r\n                                   id=\"id_value_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                                   name=\"{{fieldCreation.fieldName}}\"\r\n                                   [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].value\"\r\n                                   [readonly]=\"getDisable()\"\r\n                                   (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                                   (blur)=\"processCallBack($event,'blur',dataIndex)\"\r\n                                   (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                                   (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                                   (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                                   (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                                   (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                                   maxlength=\"{{fieldCreation.maxLength}}\"/>\r\n                            <div *ngIf=\"option.mode != 'view'\" class=\"deleteBtn\"\r\n                                 (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </ng-container>\r\n            <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n                {{fieldCreation.note}}\r\n            </div>\r\n            <div *ngIf=\"!(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\r\n                    class=\"glyphicon glyphicon-plus\"></span></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    MapValueComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    MapValueComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicBehaviorComponentimplements = /** @class */ (function () {
        function DynamicBehaviorComponentimplements() {
        }
        return DynamicBehaviorComponentimplements;
    }());
    var RadioComponent = /** @class */ (function (_super) {
        __extends(RadioComponent, _super);
        function RadioComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKey = Object.keys;
            _this.selectAll = false;
            _this.singleLine = "";
            _this.animateProcess();
            return _this;
        }
        RadioComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.fieldCreation.displaySingleLine == true) {
                this.singleLine = "singleLine";
            }
        };
        RadioComponent.prototype.processCall = function (data) {
        };
        RadioComponent.prototype.processChange = function ($event, s, valueList) {
            this.callBack.emit({
                action: 'change',
                displayValue: valueList,
                currentValue: this.data[this.fieldCreation.fieldName][valueList.value],
                fieldName: this.fieldCreation.fieldName
            });
        };
        return RadioComponent;
    }(DynamicBehaviorComponent));
    RadioComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKey(data[fieldCreation.fieldName])\">\r\n            <div>\r\n                <ng-container *ngFor=\"let listIndex of objKey(fieldCreation.valueList)\">\r\n                    <div class=\"checkBoxIndent {{singleLine}}\">\r\n                        <input type=\"radio\"\r\n                               id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\"\r\n                               name=\"{{fieldCreation.fieldName}}_{{dataIndex}}_{{rowIndex}}\"\r\n                               value=\"{{fieldCreation.valueList[listIndex].value}}\"\r\n                               [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex]\"\r\n                               [disabled]=\"getDisable()\"\r\n                               (change)=\"processChange($event,'change',fieldCreation.valueList[listIndex])\">\r\n                        <label for=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}_{{dataIndex}}_{{listIndex}}_{{rowIndex}}\">{{fieldCreation.valueList[listIndex].display}}</label>\r\n\r\n                    </div>\r\n                </ng-container>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    RadioComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    RadioComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DateComponent = /** @class */ (function (_super) {
        __extends(DateComponent, _super);
        function DateComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.defaultMonthListLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            _this.defaultMonthListShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            _this.defaultWeekDay = ["Sun", "Mon", "Thu", "Wed", "Tue", "Fri", "Sat"];
            _this.columnCalculate = '';
            _this.objKeys = Object.keys;
            _this.calendarIndex = 0;
            _this.haveChange = false;
            _this.animateProcess();
            return _this;
        }
        DateComponent.prototype.ngOnInit = function () {
            if (this.fieldCreation.monthListLong === undefined) {
                this.fieldCreation.monthListLong = this.defaultMonthListLong;
            }
            if (this.fieldCreation.monthListShort === undefined) {
                this.fieldCreation.monthListShort = this.defaultMonthListShort;
            }
            if (this.fieldCreation.weekDay === undefined) {
                this.fieldCreation.weekDay = this.defaultWeekDay;
            }
            if (this.fieldCreation.yearOffset === undefined) {
                this.fieldCreation.yearOffset = 0;
            }
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = 'dp2Col1';
                    break;
                case 2:
                    this.columnCalculate = 'dp2Col2';
                    break;
                case 3:
                    this.columnCalculate = 'dp2Col3';
                    break;
                case 4:
                    this.columnCalculate = 'dp2Col4';
                    break;
                default:
                    this.columnCalculate = '';
            }
            if (this.option.mode == 'add') {
                if (typeof (this.fieldCreation.default) != 'undefined') {
                    if (Array.isArray(this.fieldCreation.default)) {
                        this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                    }
                    else if (typeof (this.fieldCreation.default) == 'string') {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                    }
                }
                else {
                    this.data[this.fieldCreation.fieldName] = [{
                            display: "",
                            value: ""
                        }];
                }
            }
            for (var dataIndex in this.data[this.fieldCreation.fieldName]) {
                if (String(this.data[this.fieldCreation.fieldName][dataIndex].value).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
                    this.setDisplay(dataIndex);
                }
            }
        };
        DateComponent.prototype.addMultiVal = function () {
            this.data[this.fieldCreation.fieldName].push({
                display: "",
                value: ""
            });
        };
        DateComponent.prototype.deleteMultiVal = function (dataIndex) {
            if (this.data[this.fieldCreation.fieldName].length > 1) {
                this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            }
        };
        DateComponent.prototype.processKeyUp = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            if (event.ctrlKey == true && (event.charCode == 86 || event.which == 86)) {
                var regexp = this.fieldCreation.valuePattern;
                if (typeof (this.fieldCreation.valuePattern) == "string") {
                    regexp = new RegExp(this.fieldCreation.valuePattern);
                }
                if (String(this.data[this.fieldCreation.fieldName][dataIndex]).match(regexp)) {
                    return true;
                }
                else {
                    this.data[this.fieldCreation.fieldName][dataIndex] = this.tempValue;
                    return false;
                }
            }
        };
        DateComponent.prototype.processKeyDown = function (event, action, dataIndex) {
            this.tempValue = this.data[this.fieldCreation.fieldName][dataIndex];
            this.haveChange = true;
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        DateComponent.prototype.processCallBackKeyPress = function (event, action, dataIndex) {
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
            if (event.keyCode != 46 && event.keyCode != 8 && event.ctrlKey != true && event.altKey != true) {
                var key = event.key;
                var combineValue = this.tempValue + key;
                var regexpInput = this.fieldCreation.inputPattern;
                if (typeof (this.fieldCreation.inputPattern) == "string") {
                    regexpInput = new RegExp(this.fieldCreation.inputPattern);
                }
                if (String(key).match(regexpInput)) {
                    return true;
                }
                return false;
            }
            return true;
        };
        DateComponent.prototype.processBlur = function (event, action, dataIndex) {
            var validate = true;
            var calendarRef = this.calendarVC.toArray();
            calendarRef[this.calendarIndex].closeCalendar();
            if (this.haveChange) {
                var regexpValue = this.fieldCreation.valuePattern;
                if (typeof (this.fieldCreation.valuePattern) == "string") {
                    regexpValue = new RegExp(this.fieldCreation.valuePattern);
                }
                if (!String(this.data[this.fieldCreation.fieldName][dataIndex].display).match(regexpValue)) {
                    event.target.focus();
                    validate = false;
                }
                else {
                    if (this.fieldCreation.inputDatePattern) {
                        var dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].display.split(/(-|\s|\/)/);
                        var patternSplit = this.fieldCreation.inputDatePattern.toLowerCase().split(/(-|\s|\/)/);
                        var year = 0;
                        var month = 0;
                        var day = 0;
                        for (var dataTypeIndex in patternSplit) {
                            if (patternSplit[dataTypeIndex].substr(0, 1) === "y") {
                                if (this.fieldCreation.inputYearOffset) {
                                    year = parseInt(dataSplit[dataTypeIndex]) + parseInt(this.fieldCreation.inputYearOffset);
                                }
                                else {
                                    year = parseInt(dataSplit[dataTypeIndex]);
                                }
                            }
                            if (patternSplit[dataTypeIndex].substr(0, 1) === "m") {
                                month = parseInt(dataSplit[dataTypeIndex]) - 1;
                            }
                            if (patternSplit[dataTypeIndex].substr(0, 1) === "d") {
                                day = parseInt(dataSplit[dataTypeIndex]);
                            }
                        }
                        var dateCheck = new Date(year, month, day);
                        var dateString = dateCheck.getFullYear() + "-" + (dateCheck.getMonth() + 1) + "-" + dateCheck.getDate();
                        this.data[this.fieldCreation.fieldName][dataIndex].value = dateString;
                    }
                    else {
                        this.data[this.fieldCreation.fieldName][dataIndex].value = this.data[this.fieldCreation.fieldName][dataIndex].display;
                    }
                    this.setDisplay(dataIndex);
                    this.haveChange = false;
                }
            }
            this.callBack.emit({
                event: event,
                action: action,
                dataIndex: dataIndex,
                validateStatus: validate,
                fieldName: this.fieldCreation.fieldName,
                value: this.data[this.fieldCreation.fieldName][dataIndex]
            });
        };
        DateComponent.prototype.processCall = function (data) {
        };
        DateComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit({
                feildName: this.fieldCreation.fieldName
            });
        };
        DateComponent.prototype.setDate = function (event, dataIndex) {
            var dateString = event.year + '-' + this.pad((event.month + 1), 2) + '-' + this.pad(event.day, 2);
            this.data[this.fieldCreation.fieldName][dataIndex] = {
                display: dateString,
                value: dateString
            };
            if (this.fieldCreation.displayFormat) {
                this.setDisplay(dataIndex);
            }
        };
        DateComponent.prototype.setDisplay = function (dataIndex) {
            var dataSplit = this.data[this.fieldCreation.fieldName][dataIndex].value.split("-");
            var dateSet = {
                year: parseInt(dataSplit[0]),
                month: (parseInt(dataSplit[1]) - 1),
                day: parseInt(dataSplit[2]),
            };
            var dateString = this.fieldCreation.displayFormat;
            var valueString = dateSet.year + '-' + this.pad((dateSet.month + 1), 2) + '-' + this.pad(dateSet.day, 2);
            if (dateString.indexOf("DD") > -1) {
                var stringDD = this.pad(dateSet.day, 2);
                dateString = dateString.replace("DD", stringDD);
            }
            else if (dateString.indexOf("D") > -1) {
                var stringD = String(dateSet.day);
                dateString = dateString.replace("D", stringD);
            }
            if (dateString.indexOf("MMMM") > -1) {
                var stringMMMM = this.fieldCreation.monthListLong[dateSet.month];
                dateString = dateString.replace("MMMM", stringMMMM);
            }
            else if (dateString.indexOf("MMM") > -1) {
                var stringMMM = this.fieldCreation.monthListShort[dateSet.month];
                dateString = dateString.replace("MMM", stringMMM);
            }
            else if (dateString.indexOf("MM") > -1) {
                var stringMM = this.pad((dateSet.month + 1), 2);
                dateString = dateString.replace("MM", stringMM);
            }
            else if (dateString.indexOf("M") > -1) {
                var stringM = String(dateSet.month + 1);
                dateString = dateString.replace("M", stringM);
            }
            if (dateString.indexOf("YYYY") > -1) {
                var stringYYYY = String(dateSet.year + this.fieldCreation.yearOffset);
                dateString = dateString.replace("YYYY", stringYYYY);
            }
            else if (dateString.indexOf("YY") > -1) {
                var stringYY = String(dateSet.year + this.fieldCreation.yearOffset).substr(2, 2);
                dateString = dateString.replace("YY", stringYY);
            }
            this.data[this.fieldCreation.fieldName][dataIndex] = {
                display: dateString,
                value: valueString
            };
        };
        DateComponent.prototype.pad = function (n, width, z) {
            if (z === void 0) { z = '0'; }
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };
        DateComponent.prototype.getDateDisable = function () {
            if (this.getDisable() ||
                (((this.fieldCreation.yearOffset && this.fieldCreation.yearOffset != 0) ||
                    (this.fieldCreation.displayFormat && this.fieldCreation.displayFormat != "YYYY-MM-DD")) &&
                    (!this.fieldCreation.valuePattern || !this.fieldCreation.inputDatePattern))) {
                return true;
            }
            return false;
        };
        DateComponent.prototype.setFocus = function (data) {
            var inputRef = this.dateInputVC.toArray();
            inputRef[this.calendarIndex].nativeElement.focus();
        };
        DateComponent.prototype.openCalendar = function (data, index) {
            this.calendarIndex = index;
            var calendarRef = this.calendarVC.toArray();
            var inputRef = this.dateInputVC.toArray();
            calendarRef[index].open(data);
            inputRef[index].nativeElement.focus();
        };
        return DateComponent;
    }(DynamicBehaviorComponent));
    DateComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n    <lb9-dynamic-form-label-panel\r\n            [fieldCreation]=\"fieldCreation\"\r\n            [option]=\"option\"\r\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\r\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex].value == '' ? 'require' : ''}}\">\r\n                <input type=\"textbox\" #dateInput\r\n                       class=\"dateWidth\"\r\n                       id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(dataIndex > 0 ? '_'+dataIndex:'')}}\"\r\n                       name=\"{{fieldCreation.fieldName}}\"\r\n                       [(ngModel)]=\"data[fieldCreation.fieldName][dataIndex].display\"\r\n                       [readonly]=\"getDateDisable()\"\r\n                       (focus)=\"processCallBack($event,'focus',dataIndex)\"\r\n                       (blur)=\"processBlur($event,'blur',dataIndex)\"\r\n                       (keyup)=\"processKeyUp($event,'keyup',dataIndex)\"\r\n                       (keypress)=\"processCallBackKeyPress($event,'keypress',dataIndex)\"\r\n                       (keydown)=\"processKeyDown($event,'keydown',dataIndex)\"\r\n                       (click)=\"processCallBack($event,'click',dataIndex)\"\r\n                       (change)=\"processCallBack($event,'change',dataIndex)\"\r\n                       maxlength=\"{{fieldCreation.maxLength}}\"\r\n                       placeholder=\"{{fieldCreation.placeholder}}\"/>\r\n                <div class=\"dateToggle{{getDisable() ? ' disable' : ' enable'}}\"\r\n                     (click)=\"!getDisable() ? openCalendar(data[fieldCreation.fieldName][dataIndex].value, dataIndex) : null\"><span class=\"glyphicon glyphicon-calendar\"></span></div>\r\n                <lb9-date-picker #datePicker\r\n                                 (setDate)=\"setDate($event,dataIndex)\"\r\n                                 (inputFocus)=\"setFocus($event,dataIndex)\"\r\n                                 [monthListLong]=\"fieldCreation.monthListLong\"\r\n                                 [monthListShort]=\"fieldCreation.monthListShort\"\r\n                                 [weekDay]=\"fieldCreation.weekDay\"\r\n                                 [showToday]=\"fieldCreation.showToday\"\r\n                                 [todayText]=\"fieldCreation.todayText\"\r\n                                 [closeOnDateSelect]=\"fieldCreation.closeOnDateSelect\"\r\n                                 [yearOffset]=\"fieldCreation.yearOffset\"></lb9-date-picker>\r\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\"\r\n                     class=\"deleteBtnWithDate\"\r\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\r\n            </div>\r\n        </ng-container>\r\n        <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n            {{fieldCreation.note}}\r\n        </div>\r\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\"\r\n             (click)=\"addMultiVal()\"><span\r\n                class=\"glyphicon glyphicon-plus\"></span></div>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    DateComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    DateComponent.propDecorators = {
        dateInputVC: [{ type: i0.ViewChildren, args: ['dateInput',] }],
        calendarVC: [{ type: i0.ViewChildren, args: ['datePicker',] }],
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var ButtonIconComponent = /** @class */ (function (_super) {
        __extends(ButtonIconComponent, _super);
        function ButtonIconComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        ButtonIconComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = 'dp2Col1';
                    break;
                case 2:
                    this.columnCalculate = 'dp2Col2';
                    break;
                case 3:
                    this.columnCalculate = 'dp2Col3';
                    break;
                case 4:
                    this.columnCalculate = 'dp2Col4';
                    break;
                default:
                    this.columnCalculate = '';
            }
        };
        ButtonIconComponent.prototype.processClick = function (event, action, dataIndex, valueList) {
            if (!this.getDisable()) {
                if (typeof (this.data[this.fieldCreation.fieldName]) != 'undefined' && typeof (this.data[this.fieldCreation.fieldName][dataIndex]) != 'undefined') {
                    this.data[this.fieldCreation.fieldName][dataIndex] = valueList.value;
                }
                this.callBack.emit({
                    event: event,
                    action: action,
                    dataIndex: dataIndex,
                    valueList: valueList,
                    fieldName: this.fieldCreation.fieldName
                });
            }
        };
        return ButtonIconComponent;
    }(DynamicBehaviorComponent));
    ButtonIconComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\r\n  <lb9-dynamic-form-label-panel\r\n          [fieldCreation]=\"fieldCreation\"\r\n          [option]=\"option\"\r\n          [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\r\n  <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\r\n    <ng-container *ngFor=\"let valueListIndex of objKeys(fieldCreation.valueList)\">\r\n\r\n        <div class=\"icon {{(getDisable() ? 'icon-disable' : '')}}\" id=\"id_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}{{(valueListIndex > 0 ? '_'+valueListIndex:'')}}\" (click)=\"processClick($event,'click',valueListIndex,fieldCreation.valueList[valueListIndex])\"\r\n             (mouseenter)=\"processCallBack($event,'mouseEnter',valueListIndex)\"\r\n             (mouseleave)=\"processCallBack($event,'mouseLeave',valueListIndex)\" [innerHTML]=\"fieldCreation.valueList[valueListIndex].display\"></div>\r\n\r\n    </ng-container>\r\n    <div class=\"dp2Note\" id=\"id_note_{{(option.namePrefix ? option.namePrefix+'_':'')}}{{fieldCreation.fieldName}}\">\r\n      {{fieldCreation.note}}\r\n    </div>\r\n  </div>\r\n</div>\r\n"
                },] }
    ];
    ButtonIconComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    ButtonIconComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var ColorSelectComponent = /** @class */ (function (_super) {
        __extends(ColorSelectComponent, _super);
        function ColorSelectComponent(animationService) {
            var _this = _super.call(this, animationService) || this;
            _this.callBack = new i0.EventEmitter();
            _this.panelCallBack = new i0.EventEmitter();
            _this.objKeys = Object.keys;
            _this.animateProcess();
            return _this;
        }
        ColorSelectComponent.prototype.ngOnInit = function () {
            switch (this.fieldCreation.columnPerLine) {
                case 1:
                    this.columnCalculate = "dp2Col1";
                    break;
                case 2:
                    this.columnCalculate = "dp2Col2";
                    break;
                case 3:
                    this.columnCalculate = "dp2Col3";
                    break;
                case 4:
                    this.columnCalculate = "dp2Col4";
                    break;
                default:
                    this.columnCalculate = "";
            }
            if (this.option.mode == "add") {
                if (typeof (this.fieldCreation.default) != "undefined") {
                    if (Array.isArray(this.fieldCreation.default)) {
                        this.data[this.fieldCreation.fieldName] = Object.assign([], this.fieldCreation.default);
                    }
                    else if (typeof (this.fieldCreation.default) == "string") {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.default];
                    }
                }
                else {
                    if (this.fieldCreation.fieldName.valueList) {
                        this.data[this.fieldCreation.fieldName] = [this.fieldCreation.fieldName.valueList[0].value];
                    }
                    else {
                        this.data[this.fieldCreation.fieldName] = [null];
                    }
                }
            }
        };
        ColorSelectComponent.prototype.assignColor = function (color, dataIndex) {
            this.data[this.fieldCreation.fieldName][dataIndex] = color;
        };
        ColorSelectComponent.prototype.addMultiVal = function () {
            this.data[this.fieldCreation.fieldName].push("");
        };
        ColorSelectComponent.prototype.deleteMultiVal = function (dataIndex) {
            if (this.data[this.fieldCreation.fieldName].length > 1) {
                this.data[this.fieldCreation.fieldName].splice(dataIndex, 1);
            }
        };
        return ColorSelectComponent;
    }(DynamicBehaviorComponent));
    ColorSelectComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-color-select',
                    template: "<div class=\"dp2FieldPanel {{columnCalculate}} {{getCustomClass()}} {{animateState || !option.enableAnimation || option.enableAnimation === 'false' ? 'dp2FieldPanelAnimateEnd':'dp2FieldPanelAnimateStart'}}\" [style.width]=\"fieldCreation.width\" (click)=\"processPanelCallBack($event)\">\n    <lb9-dynamic-form-label-panel\n            [fieldCreation]=\"fieldCreation\"\n            [option]=\"option\"\n            [width]=\"getLabelWidth()\"></lb9-dynamic-form-label-panel>\n    <div class=\"dp2InputBox {{option.labelAlign == 'left' ? 'singleLine' : ''}}\" [style.width]=\"getInputWidth()\">\n        <ng-container *ngFor=\"let dataIndex of objKeys(data[fieldCreation.fieldName])\">\n            <div class=\"posRelative {{fieldCreation.require && data[fieldCreation.fieldName][dataIndex] == '' ? 'require' : ''}}\">\n                <div *ngFor=\"let colorList of fieldCreation.valueList\" class=\"colorSelect {{data[fieldCreation.fieldName][dataIndex] === colorList.value ? ' colorSelected': ''}}\" [style]=\"{background:colorList.value}\" (click)=\"assignColor(colorList.value, dataIndex)\">\n\n                </div>\n                <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"deleteBtn\"\n                     (click)=\"deleteMultiVal(dataIndex)\"><span class=\"glyphicon glyphicon-minus\"></span></div>\n            </div>\n        </ng-container>\n        <div class=\"dp2Note\">\n            {{fieldCreation.note}}\n        </div>\n        <div *ngIf=\"fieldCreation.multiValue && !(getDisable())\" class=\"addBtn\" (click)=\"addMultiVal()\"><span\n                class=\"glyphicon glyphicon-plus\"></span></div>\n    </div>\n</div>\n"
                },] }
    ];
    ColorSelectComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    ColorSelectComponent.propDecorators = {
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicInputComponent = /** @class */ (function () {
        function DynamicInputComponent(componentFactoryResolver, animationService) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.animationService = animationService;
            this.callBack = new i0.EventEmitter();
            this.panelCallBack = new i0.EventEmitter();
            this.componentTypes = {
                'textBox': TextBoxComponent,
                'textArea': TextAreaComponent,
                'label': LabelComponent,
                'checkBox': CheckBoxComponent,
                'colorSelect': ColorSelectComponent,
                'selectBox': SelectBoxComponent,
                'hidden': HiddenComponent,
                'fileUpload': FileUploadComponent,
                'image': ImageComponent,
                'autoComplete': AutoCompleteComponent,
                'button': ButtonComponent,
                'buttonIcon': ButtonIconComponent,
                'swappingBox': SwappingBoxComponent,
                'mapValue': MapValueComponent,
                'radio': RadioComponent,
                'date': DateComponent,
                'number': TextBoxComponent,
                'password': TextBoxComponent,
            };
        }
        DynamicInputComponent.prototype.ngOnInit = function () {
            this.createComponent();
        };
        DynamicInputComponent.prototype.createComponent = function () {
            var component;
            if (typeof (this.type) == 'undefined' || typeof (this.componentTypes[this.type]) == 'undefined') {
                component = LabelComponent;
            }
            else {
                component = this.componentTypes[this.type];
            }
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            var componentRef = this.inputComp.viewContainerRef.createComponent(componentFactory);
            this.instantInput = componentRef.instance;
            this.instantInput.data = this.data;
            this.instantInput.type = this.type;
            this.instantInput.rowIndex = this.rowIndex;
            this.instantInput.option = this.option;
            this.instantInput.fieldCreation = this.fieldCreation;
            var callBack = this.callBack;
            this.instantInput.callBack.subscribe(function (input) {
                callBack.emit(input);
            });
            var panelCallBack = this.panelCallBack;
            var inputIndex = this.inputIndex;
            this.instantInput.panelCallBack.subscribe(function (input) {
                var eventData = Object.assign(input, {
                    fieldIndex: inputIndex
                });
                panelCallBack.emit(eventData);
            });
        };
        DynamicInputComponent.prototype.processCall = function (data) {
            this.instantInput.processCall(data);
        };
        return DynamicInputComponent;
    }());
    DynamicInputComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-input',
                    template: "<lb9-input></lb9-input>\r\n\r\n"
                },] }
    ];
    DynamicInputComponent.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: AnimationService }
    ]; };
    DynamicInputComponent.propDecorators = {
        inputComp: [{ type: i0.ViewChild, args: [InputComponent, { static: true },] }],
        data: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        fieldCreation: [{ type: i0.Input }],
        inputIndex: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicContainerComponent = /** @class */ (function () {
        function DynamicContainerComponent() {
            this.reRenderField = [];
            this.callBack = new i0.EventEmitter();
            this.panelCallBack = new i0.EventEmitter();
            this.emitFieldSelect = false;
            this.objKey = Object.keys;
        }
        DynamicContainerComponent.prototype.ngOnInit = function () {
            if (typeof (this.containerCreation.columnSpan) != "undefined") {
                var calculateString = this.containerCreation.columnSpan.split("/");
                var size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
                if (calculateString[1] == 1) {
                    this.widthCalculator = size + "%";
                }
                else {
                    this.widthCalculator = "calc(" + size + "% - 2px)";
                }
            }
            else {
                this.widthCalculator = "100%";
            }
        };
        DynamicContainerComponent.prototype.processCallBack = function (event) {
            event.rowIndex = this.actionDataIndex;
            this.callBack.emit(event);
        };
        DynamicContainerComponent.prototype.processPanelCallBack = function (event) {
            var _this = this;
            this.emitFieldSelect = true;
            var dataEvent = Object.assign(event, {
                containerIndex: this.containerIndex
            });
            this.panelCallBack.emit(dataEvent);
            rxjs.timer(200).subscribe(function () {
                _this.emitFieldSelect = false;
            });
        };
        DynamicContainerComponent.prototype.callPanelCallBack = function (event) {
            if (!this.emitFieldSelect) {
                this.panelCallBack.emit({
                    fieldName: null,
                    fieldIndex: null,
                    containerIndex: this.containerIndex
                });
            }
        };
        DynamicContainerComponent.prototype.getDynamicInput = function (inputIndex) {
            var inputComponent = this.inputChild.find(function (instantInput) { return instantInput.inputIndex == inputIndex; });
            return inputComponent;
        };
        DynamicContainerComponent.prototype.checkReRender = function (fieldName) {
            if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
                return false;
            }
            return true;
        };
        return DynamicContainerComponent;
    }());
    DynamicContainerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-container',
                    template: "<div class=\"fieldContainer {{containerCreation.customClass ? containerCreation.customClass : ''}}\" [style.width]=\"widthCalculator\" id=\"{{containerCreation.containerName}}\" (click)=\"callPanelCallBack($event)\">\r\n    <ng-container *ngIf=\"containerCreation.fieldList\">\r\n        <ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n            <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n                <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                                   [data]=\"data[actionDataIndex]\"\r\n                                   [rowIndex]=\"actionDataIndex\"\r\n                                   [inputIndex]=\"inputData\"\r\n                                   [option]=\"option\"\r\n                                   [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                                   (callBack)=\"processCallBack($event)\"\r\n                                   (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n            </ng-container>\r\n        </ng-container>\r\n    </ng-container>\r\n</div>\r\n"
                },] }
    ];
    DynamicContainerComponent.ctorParameters = function () { return []; };
    DynamicContainerComponent.propDecorators = {
        inputChild: [{ type: i0.ViewChildren, args: [DynamicInputComponent,] }],
        containerCreation: [{ type: i0.Input }],
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        actionDataIndex: [{ type: i0.Input }],
        containerIndex: [{ type: i0.Input }],
        reRenderField: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicFormRowComponent = /** @class */ (function () {
        function DynamicFormRowComponent() {
            this.callBack = new i0.EventEmitter();
            this.panelCallBack = new i0.EventEmitter();
            this.objKey = Object.keys;
        }
        DynamicFormRowComponent.prototype.ngOnInit = function () {
        };
        DynamicFormRowComponent.prototype.processCallBack = function (event) {
            this.callBack.emit(event);
        };
        DynamicFormRowComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit(event);
        };
        return DynamicFormRowComponent;
    }());
    DynamicFormRowComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-form-row',
                    template: "<ng-container *ngIf=\"containerList\">\r\n  <ng-container *ngFor=\"let containerIndex of objKey(containerList)\">\r\n    <lb9-dynamic-container\r\n            [containerCreation]=\"containerList[containerIndex]\"\r\n            [data]=\"data\"\r\n            [actionDataIndex]=\"rowIndex\"\r\n            [containerIndex]=\"containerIndex\"\r\n            [option]=\"option\"\r\n            [reRenderField]=\"_reRenderFieldList\"\r\n            (callBack)=\"processCallBack($event)\"\r\n            (panelCallBack)=\"processPanelCallBack($event)\">\r\n\r\n    </lb9-dynamic-container>\r\n  </ng-container>\r\n</ng-container>\r\n"
                },] }
    ];
    DynamicFormRowComponent.ctorParameters = function () { return []; };
    DynamicFormRowComponent.propDecorators = {
        containerListRef: [{ type: i0.ViewChildren, args: [DynamicContainerComponent,] }],
        containerList: [{ type: i0.Input }],
        _reRenderFieldList: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        data: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicContainerTableComponent = /** @class */ (function () {
        function DynamicContainerTableComponent() {
            this.reRenderField = [];
            this.callBack = new i0.EventEmitter();
            this.panelCallBack = new i0.EventEmitter();
            this.objKey = Object.keys;
        }
        DynamicContainerTableComponent.prototype.ngOnInit = function () {
            if (typeof (this.containerCreation.columnSpan) != "undefined") {
                var calculateString = this.containerCreation.columnSpan.split("/");
                var size = Math.floor((parseFloat(calculateString[0]) / parseFloat(calculateString[1])) * 100);
                if (calculateString[1] == 1) {
                    this.widthCalculator = size + "%";
                }
                else {
                    this.widthCalculator = "calc(" + size + "% - 2px)";
                }
            }
            else {
                this.widthCalculator = "100%";
            }
        };
        DynamicContainerTableComponent.prototype.processCallBack = function (event) {
            event.rowIndex = this.actionDataIndex;
            this.callBack.emit(event);
        };
        DynamicContainerTableComponent.prototype.processPanelCallBack = function (event) {
            var dataEvent = Object.assign(event, {
                containerIndex: this.containerIndex
            });
            this.panelCallBack.emit(dataEvent);
        };
        DynamicContainerTableComponent.prototype.getDynamicInput = function (inputIndex) {
            var inputComponent = this.inputChild.find(function (instantInput) { return instantInput.inputIndex == inputIndex; });
            return inputComponent;
        };
        DynamicContainerTableComponent.prototype.checkReRender = function (fieldName) {
            if (this.reRenderField.length != 0 && this.reRenderField.indexOf(fieldName) > -1) {
                return false;
            }
            return true;
        };
        DynamicContainerTableComponent.prototype.deleteRow = function (actionDataIndex) {
            this.callBack.emit({
                action: "deleteRow",
                rowIndex: actionDataIndex
            });
        };
        return DynamicContainerTableComponent;
    }());
    DynamicContainerTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: '[lb9-dynamic-container-table]',
                    template: "<ng-container *ngFor=\"let inputData of objKey(containerCreation.fieldList)\">\r\n    <td *ngIf=\"containerCreation.fieldList[inputData].type != 'hidden'\">\r\n        <ng-container *ngIf=\"checkReRender(containerCreation.fieldList[inputData].fieldName)\">\r\n            <lb9-dynamic-input [type]=\"containerCreation.fieldList[inputData].type\"\r\n                               [data]=\"data[actionDataIndex]\"\r\n                               [rowIndex]=\"actionDataIndex\"\r\n                               [inputIndex]=\"inputData\"\r\n                               [option]=\"option\"\r\n                               [fieldCreation]=\"containerCreation.fieldList[inputData]\"\r\n                               (callBack)=\"processCallBack($event)\"\r\n                               (panelCallBack)=\"processPanelCallBack($event)\"></lb9-dynamic-input>\r\n        </ng-container>\r\n    </td>\r\n</ng-container>\r\n\r\n<td *ngIf=\"option.deleteRow\">\r\n     <span *ngIf=\"!option.disableDelete || (option.disableDelete && !option.disableDelete[actionDataIndex])\"\r\n           class=\"btn-action delete\" id=\"delete_{{actionDataIndex}}\"\r\n           (click)=\"deleteRow(actionDataIndex)\"><abbr title=\"{{option.deleteRowText}}\"><span\r\n             class=\"glyphicon glyphicon-remove-circle\"></span></abbr></span>\r\n</td>\r\n"
                },] }
    ];
    DynamicContainerTableComponent.ctorParameters = function () { return []; };
    DynamicContainerTableComponent.propDecorators = {
        inputChild: [{ type: i0.ViewChildren, args: [DynamicInputComponent,] }],
        containerCreation: [{ type: i0.Input }],
        data: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        actionDataIndex: [{ type: i0.Input }],
        containerIndex: [{ type: i0.Input }],
        reRenderField: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicFormComponent = /** @class */ (function () {
        function DynamicFormComponent(animationService) {
            this.animationService = animationService;
            this.actionDataIndex = 0;
            this.defaultData = {};
            this.showForm = false;
            this.option = {};
            this.callBack = new i0.EventEmitter();
            this.panelCallBack = new i0.EventEmitter();
            this.frameHeader = [];
            this.objKey = Object.keys;
            this.fieldLabelList = [];
            this._reRenderFieldList = [];
            this.refinedContainerTableMode = [];
            this.tempDeleteData = [];
            this.onDeleteProcess = false;
            this.tempAddData = [];
            this.onAddProcess = false;
            this.setDataQueue = [];
            this.duplicateQueue = [];
            this.savePoint = {};
            this.startMilliseconds = null;
        }
        DynamicFormComponent.prototype.ngOnInit = function () {
            this.verifyField();
            // console.log("form>>",this.formCreation);
            this.formCreation.form.option = Object.assign(this.option, this.formCreation.form.option);
            this.getDefault();
            this.compareModel();
            if (this.formCreation.form.option.frame == true) {
                this.generateFrameHeader();
            }
            this.getFieldLabel();
            if (this.formCreation.form.option.displayMode == 'table') {
                this.refineContainerTableMode();
            }
            this.animationService.setEnableAnimation(this.formCreation.form.option.enableAnimation);
        };
        DynamicFormComponent.prototype.compareModel = function () {
            if (this.model) {
                for (var containerIndex in this.formCreation.form.containerList) {
                    var containerData = this.formCreation.form.containerList[containerIndex];
                    for (var fieldIndex in containerData.fieldList) {
                        if (containerData.fieldList[fieldIndex].modelName && this.model[containerData.fieldList[fieldIndex].modelName]) {
                            var modelData = this.model[containerData.fieldList[fieldIndex].modelName];
                            for (var attribute in modelData) {
                                if (containerData.fieldList[fieldIndex][attribute] == undefined || containerData.fieldList[fieldIndex][attribute] == null) {
                                    containerData.fieldList[fieldIndex][attribute] = modelData[attribute];
                                }
                            }
                        }
                    }
                }
            }
        };
        DynamicFormComponent.prototype.verifyField = function () {
            var e_1, _a;
            var fieldList = this.getFieldList();
            var check = true;
            try {
                for (var fieldList_1 = __values(fieldList), fieldList_1_1 = fieldList_1.next(); !fieldList_1_1.done; fieldList_1_1 = fieldList_1.next()) {
                    var fieldName = fieldList_1_1.value;
                    for (var dataIndex in this.formCreation.data) {
                        if (this.formCreation.data[dataIndex][fieldName] == undefined) {
                            check = false;
                            console.error('Dynamic form error field data not exists: \'' + fieldName + '\' data row: ' + dataIndex);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fieldList_1_1 && !fieldList_1_1.done && (_a = fieldList_1.return)) _a.call(fieldList_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (check == true) {
                this.showForm = true;
            }
        };
        DynamicFormComponent.prototype.generateFrameHeader = function () {
            this.frameHeader = [];
            if (this.formCreation.form.option.frameName != undefined
                && this.formCreation.form.option.frameName != ''
                && Array.isArray(this.formCreation.form.option.frameName)
                && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
                this.frameHeader = this.formCreation.form.option.frameName;
            }
            else if (this.formCreation.form.option.frameName != undefined
                && this.formCreation.form.option.frameName != ''
                && !Array.isArray(this.formCreation.form.option.frameName)
                && this.formCreation.data.length == 1) {
                this.frameHeader[0] = this.formCreation.form.option.frameName;
            }
            else if (this.formCreation.form.option.frameName != undefined
                && this.formCreation.form.option.frameName != ''
                && !Array.isArray(this.formCreation.form.option.frameName)
                && this.formCreation.data.length > 1) {
                var count = 0;
                for (var dataKey in this.formCreation.data) {
                    count++;
                    this.frameHeader[dataKey] = String(this.formCreation.form.option.frameName) + String(count);
                }
                //return this.formCreation.form.option.frameName + (parseInt(rowIndex)+1);
            }
            else {
                var count = 0;
                for (var dataKey in this.formCreation.data) {
                    count++;
                    this.frameHeader[dataKey] = 'Form ' + String(count);
                }
                //return "Form " +(parseInt(rowIndex)+1);
            }
        };
        DynamicFormComponent.prototype.processCallBack = function (event) {
            var _this = this;
            if (event.action == 'deleteRow') {
                this.deleteRow(event.rowIndex);
            }
            else {
                rxjs.timer(100).subscribe(function () {
                    _this.callBack.emit(event);
                });
            }
        };
        DynamicFormComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit(event);
        };
        DynamicFormComponent.prototype.getDefault = function () {
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
            var setValueType = [
                'autoComplete',
                'swappingBox',
                'mapValue'
            ];
            if (typeof (this.formCreation.form.containerList) != 'undefined') {
                try {
                    for (var _e = __values(this.formCreation.form.containerList), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var container = _f.value;
                        try {
                            for (var _g = (e_3 = void 0, __values(container.fieldList)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var fieldCreation = _h.value;
                                if (fieldCreation.type != 'checkBox') {
                                    if (typeof (fieldCreation.default) != 'undefined') {
                                        if (Array.isArray(fieldCreation.default)) {
                                            if (setValueType.indexOf(fieldCreation.type) == -1) {
                                                this.defaultData[fieldCreation.fieldName] = Object.assign([], fieldCreation.default);
                                            }
                                            else {
                                                var defaultSet = [];
                                                try {
                                                    for (var _j = (e_4 = void 0, __values(fieldCreation.default)), _k = _j.next(); !_k.done; _k = _j.next()) {
                                                        var checkValue = _k.value;
                                                        if (!checkValue.display || !checkValue.value) {
                                                            defaultSet.push({
                                                                display: checkValue,
                                                                value: checkValue
                                                            });
                                                        }
                                                        else {
                                                            defaultSet.push(checkValue);
                                                        }
                                                    }
                                                }
                                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                                finally {
                                                    try {
                                                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                                                    }
                                                    finally { if (e_4) throw e_4.error; }
                                                }
                                                this.defaultData[fieldCreation.fieldName] = Object.assign([], defaultSet);
                                            }
                                        }
                                        else if (typeof (fieldCreation.default) == 'string') {
                                            if (setValueType.indexOf(fieldCreation.type) == -1) {
                                                this.defaultData[fieldCreation.fieldName] = Object.assign([], [fieldCreation.default]);
                                            }
                                            else {
                                                if (!fieldCreation.default.display || !fieldCreation.default.value) {
                                                    this.defaultData[fieldCreation.fieldName] = Object.assign([], [{
                                                            display: fieldCreation.default,
                                                            value: fieldCreation.default
                                                        }]);
                                                }
                                                else {
                                                    this.defaultData[fieldCreation.fieldName] = Object.assign([], [fieldCreation.default]);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (setValueType.indexOf(fieldCreation.type) > -1) {
                                            this.defaultData[fieldCreation.fieldName] = Object.assign([], [{
                                                    display: '',
                                                    value: ''
                                                }]);
                                        }
                                        else {
                                            this.defaultData[fieldCreation.fieldName] = Object.assign([], ['']);
                                        }
                                    }
                                }
                                else {
                                    if (typeof (fieldCreation.default) == 'object') {
                                        this.defaultData[fieldCreation.fieldName] = Object.assign({}, fieldCreation.default);
                                    }
                                    else {
                                        var defaultVal = {};
                                        try {
                                            for (var _l = (e_5 = void 0, __values(fieldCreation.valueList)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                                var valueListData = _m.value;
                                                defaultVal[valueListData.value] = false;
                                            }
                                        }
                                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                        finally {
                                            try {
                                                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                            }
                                            finally { if (e_5) throw e_5.error; }
                                        }
                                        this.defaultData[fieldCreation.fieldName] = Object.assign({}, defaultVal);
                                    }
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return this.defaultData;
        };
        DynamicFormComponent.prototype.reRenderForm = function () {
            var _this = this;
            this.getDefault();
            this.compareModel();
            this.refineContainerTableMode();
            if (this.formCreation.form.option.frame == true) {
                this.generateFrameHeader();
            }
            ;
            this.getFieldLabel();
            if (this.formCreation.form.option.displayMode == 'table') {
                this.refineContainerTableMode();
            }
            ;
            this.showForm = false;
            this.animationService.setOnReRender(true);
            rxjs.interval(100).pipe(operators.takeWhile(function () { return !_this.showForm; }))
                .subscribe(function () {
                _this.showForm = true;
                _this.animationService.setOnReRender(false);
                // console.log(this.formCreation);
            });
        };
        DynamicFormComponent.prototype.reRenderField = function (fieldArray, rowIndex) {
            var _this = this;
            if (rowIndex === void 0) { rowIndex = 0; }
            if (!Array.isArray(fieldArray)) {
                this._reRenderFieldList = Object.assign(this._reRenderFieldList, [fieldArray]);
            }
            else {
                this._reRenderFieldList = Object.assign(this._reRenderFieldList, fieldArray);
            }
            rxjs.interval(100).pipe(operators.takeWhile(function () { return _this._reRenderFieldList != null; }))
                .subscribe(function () {
                var e_6, _a;
                // console.log("check");
                var checkFlag = true;
                try {
                    for (var _b = __values(_this._reRenderFieldList), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var fieldName = _c.value;
                        var getFieldElement = _this.getDynamicInput(fieldName, rowIndex);
                        if (getFieldElement != null) {
                            // console.log("Still Found: "+fieldName,getFieldElement);
                            checkFlag = false;
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                if (checkFlag) {
                    _this._reRenderFieldList = [];
                }
                // console.log(this.formCreation);
            });
        };
        DynamicFormComponent.prototype.setFieldAttribute = function (fieldName, attributeName, attributeValue) {
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                        this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName] = attributeValue;
                    }
                }
            }
        };
        DynamicFormComponent.prototype.setContainerAttribute = function (containerName, attributeName, attributeValue) {
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                if (containerData.containerName == containerName) {
                    this.formCreation.form.containerList[containerIndex][attributeName] = attributeValue;
                }
            }
        };
        DynamicFormComponent.prototype.getFieldAttribute = function (fieldName, attributeName) {
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                        return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex][attributeName];
                    }
                }
            }
        };
        DynamicFormComponent.prototype.setDataValue = function (fieldName, rowIndex, value, multi) {
            var _this = this;
            if (multi === void 0) { multi = false; }
            if (this.formCreation.data[rowIndex] != undefined) {
                this.setDataProcess(fieldName, rowIndex, value, multi);
            }
            else {
                this.setDataQueue.push({
                    fieldName: fieldName,
                    rowIndex: rowIndex,
                    value: value,
                    multi: multi
                });
                this.onFormReady(rowIndex + 1).subscribe(function (data) {
                    if (data.status == 'ready') {
                        while (_this.setDataQueue.length > 0) {
                            var setDataSet = _this.setDataQueue.shift();
                            _this.setDataProcess(setDataSet.fieldName, setDataSet.rowIndex, setDataSet.value, setDataSet.multi);
                        }
                    }
                    else {
                        console.error('Dynamic form row number ' + rowIndex + ' didn\'t create. Can\'t set data.');
                    }
                });
            }
        };
        DynamicFormComponent.prototype.setDataProcess = function (fieldName, rowIndex, value, multi) {
            if (multi === void 0) { multi = false; }
            var fieldType = this.getFieldType(fieldName);
            if (multi == false && fieldType != 'checkBox' && fieldType != 'fileUpload' && fieldType != 'image') {
                if (Array.isArray(value)) {
                    this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
                }
                else {
                    this.formCreation.data[rowIndex][fieldName] = Object.assign([], [value]);
                }
            }
            else {
                if (Array.isArray(value)) {
                    this.formCreation.data[rowIndex][fieldName] = Object.assign([], value);
                }
                else {
                    this.formCreation.data[rowIndex][fieldName] = Object.assign({}, value);
                }
            }
        };
        DynamicFormComponent.prototype.getFieldType = function (fieldName) {
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                        return this.formCreation.form.containerList[containerIndex].fieldList[fieldIndex].type;
                    }
                }
            }
        };
        DynamicFormComponent.prototype.getDataValue = function (fieldName, rowIndex, dataIndex) {
            if (dataIndex === void 0) { dataIndex = null; }
            if (typeof (this.formCreation) != 'undefined') {
                if (typeof (this.formCreation.data[rowIndex]) == 'undefined') {
                    return 'Row index not exits.';
                }
                if (typeof (this.formCreation.data[rowIndex][fieldName]) == 'undefined') {
                    return 'Field name not exits: ' + fieldName;
                }
                if (dataIndex == null) {
                    var dataType = void 0;
                    if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                        dataType = [];
                    }
                    else {
                        dataType = {};
                    }
                    var dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                    return dataClone;
                }
                else if (this.formCreation.data[rowIndex][fieldName]) {
                    if (typeof (this.formCreation.data[rowIndex][fieldName][dataIndex]) == 'undefined') {
                        return 'Date index not exits in field ' + fieldName + ': ' + dataIndex;
                    }
                    else {
                        var dataType = void 0;
                        if (Array.isArray(this.formCreation.data[rowIndex][fieldName])) {
                            dataType = [];
                        }
                        else {
                            dataType = {};
                        }
                        var dataClone = Object.assign(dataType, this.formCreation.data[rowIndex][fieldName]);
                        return dataClone[dataIndex];
                    }
                }
            }
        };
        DynamicFormComponent.prototype.getDynamicInput = function (fieldName, rowIndex) {
            if (rowIndex === void 0) { rowIndex = 0; }
            var formRowRef = null;
            var containerListRef = null;
            if (this.formCreation.form.option.displayMode == 'table') {
                formRowRef = this.formTableRow.toArray();
                containerListRef = formRowRef[rowIndex];
            }
            else {
                formRowRef = this.formRow.toArray();
                if (formRowRef[rowIndex]) {
                    containerListRef = formRowRef[rowIndex].containerListRef;
                }
            }
            if (containerListRef) {
                var _loop_1 = function (containerIndex) {
                    var containerData = this_1.formCreation.form.containerList[containerIndex];
                    for (var fieldIndex in containerData.fieldList) {
                        if (containerData.fieldList[fieldIndex].fieldName == fieldName) {
                            var fieldType = containerData.fieldList[fieldIndex].type;
                            var container = null;
                            if (this_1.formCreation.form.option.displayMode == 'table') {
                                container = containerListRef;
                            }
                            else {
                                container = containerListRef.find(function (instantContainer) { return instantContainer.containerIndex == containerIndex; });
                            }
                            if (container != undefined) {
                                var input = container.getDynamicInput(fieldIndex);
                                if (fieldType == 'hidden' && this_1.formCreation.form.option.displayMode == 'table' && input == undefined) {
                                    return { value: {
                                            type: 'hidden'
                                        } };
                                }
                                else {
                                    return { value: input };
                                }
                            }
                            return { value: null };
                        }
                    }
                };
                var this_1 = this;
                for (var containerIndex in this.formCreation.form.containerList) {
                    var state_1 = _loop_1(containerIndex);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
        };
        DynamicFormComponent.prototype.mapSetAttribute = function (attributeObject) {
            for (var fieldName in attributeObject) {
                for (var attribute in attributeObject[fieldName]) {
                    this.setFieldAttribute(fieldName, attribute, attributeObject[fieldName][attribute]);
                }
            }
        };
        DynamicFormComponent.prototype.mapSetValue = function (valueObject, rowIndex) {
            var e_7, _a;
            for (var fieldName in valueObject) {
                var type$1 = this.getFieldAttribute(fieldName, "type");
                var valueData = (valueObject[fieldName] == null || (valueObject[fieldName] == '' && typeof (valueObject[fieldName]) != "object") ? '' : valueObject[fieldName]);
                if (type$1 === "autoComplete") {
                    var valueSetObject = [];
                    if (type.isString(valueData) || type.isNumber(valueData)) {
                        var input = this.getDynamicInput(fieldName);
                        var getExistsData = input.instantInput.getDataFromValue(valueData);
                        if (getExistsData) {
                            valueSetObject.push(getExistsData);
                        }
                        else {
                            valueSetObject.push({
                                display: valueData,
                                value: valueData
                            });
                        }
                    }
                    else {
                        if (type.isArray(valueData)) {
                            var check = true;
                            try {
                                for (var valueData_1 = (e_7 = void 0, __values(valueData)), valueData_1_1 = valueData_1.next(); !valueData_1_1.done; valueData_1_1 = valueData_1.next()) {
                                    var valueRow = valueData_1_1.value;
                                    if (!valueRow.display || !valueRow.value) {
                                        check = false;
                                        break;
                                    }
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (valueData_1_1 && !valueData_1_1.done && (_a = valueData_1.return)) _a.call(valueData_1);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                            if (check) {
                                valueSetObject = valueData;
                            }
                            else {
                                console.error("Set Pattern Incorrect");
                                valueSetObject = [
                                    {
                                        display: '',
                                        value: ''
                                    }
                                ];
                            }
                        }
                        else {
                            if (valueData.display && valueData.value) {
                                valueSetObject.push(valueData);
                            }
                            else {
                                console.error("Set Pattern Incorrect");
                                valueSetObject = [
                                    {
                                        display: '',
                                        value: ''
                                    }
                                ];
                            }
                        }
                    }
                    this.setDataValue(fieldName, rowIndex, valueSetObject);
                }
                else {
                    this.setDataValue(fieldName, rowIndex, valueData);
                }
            }
        };
        DynamicFormComponent.prototype.mapGetValue = function (valueObject, rowIndex) {
            var e_8, _a, e_9, _b, e_10, _c, e_11, _d, e_12, _e, e_13, _f;
            var mapValue = Object.assign({}, valueObject);
            for (var mapFieldName in mapValue) {
                if (typeof (mapValue[mapFieldName]) == 'string') {
                    var dataTypeSplit = mapValue[mapFieldName].split(':');
                    var dataType = (typeof (dataTypeSplit[1]) != 'undefined' ? dataTypeSplit[1] : '');
                    var dataFieldDetail = dataTypeSplit[0].split('.');
                    var fieldName = dataFieldDetail.shift();
                    var type = this.getFieldAttribute(fieldName, 'type');
                    var normalType = [
                        'colorSelect',
                        'textBox',
                        'textArea',
                        'label',
                        'hidden',
                        'number'
                    ];
                    var dropDownType = [
                        'selectBox',
                        'radio'
                    ];
                    var setValueType = [
                        'autoComplete',
                        'swappingBox',
                        'mapValue'
                    ];
                    var fileValueType = [
                        'fileUpload',
                        'image'
                    ];
                    var checkBoxValueType = [
                        'checkBox'
                    ];
                    var dateValueType = [
                        'date'
                    ];
                    if (normalType.indexOf(type) > -1) {
                        var data = this.getDataValue(fieldName, rowIndex);
                        if (data.length == 1) {
                            mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                        }
                        else if (data.length > 1) {
                            mapValue[mapFieldName] = data;
                        }
                        else {
                            mapValue[mapFieldName] = null;
                        }
                    }
                    else if (dropDownType.indexOf(type) > -1) {
                        var data = this.getDataValue(fieldName, rowIndex);
                        var setType = dataFieldDetail.pop();
                        if (data.length == 1) {
                            if (setType != 'display') {
                                mapValue[mapFieldName] = this.convertDataType(dataType, data.shift());
                            }
                            else {
                                var value = data.shift();
                                var valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                                try {
                                    for (var valueListAttribute_1 = (e_8 = void 0, __values(valueListAttribute)), valueListAttribute_1_1 = valueListAttribute_1.next(); !valueListAttribute_1_1.done; valueListAttribute_1_1 = valueListAttribute_1.next()) {
                                        var valueListRow = valueListAttribute_1_1.value;
                                        if (valueListRow.value == value) {
                                            mapValue[mapFieldName] = valueListRow.display;
                                            break;
                                        }
                                    }
                                }
                                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                                finally {
                                    try {
                                        if (valueListAttribute_1_1 && !valueListAttribute_1_1.done && (_a = valueListAttribute_1.return)) _a.call(valueListAttribute_1);
                                    }
                                    finally { if (e_8) throw e_8.error; }
                                }
                            }
                        }
                        else if (data.length > 1) {
                            if (setType != 'display') {
                                mapValue[mapFieldName] = data;
                            }
                            else {
                                var displayList = [];
                                var valueListAttribute = this.getFieldAttribute(fieldName, 'valueList');
                                try {
                                    for (var data_1 = (e_9 = void 0, __values(data)), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                                        var dataRow = data_1_1.value;
                                        var value = dataRow;
                                        try {
                                            for (var valueListAttribute_2 = (e_10 = void 0, __values(valueListAttribute)), valueListAttribute_2_1 = valueListAttribute_2.next(); !valueListAttribute_2_1.done; valueListAttribute_2_1 = valueListAttribute_2.next()) {
                                                var valueListRow = valueListAttribute_2_1.value;
                                                if (valueListRow.value == value) {
                                                    displayList.push(valueListRow.display);
                                                    break;
                                                }
                                            }
                                        }
                                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                                        finally {
                                            try {
                                                if (valueListAttribute_2_1 && !valueListAttribute_2_1.done && (_c = valueListAttribute_2.return)) _c.call(valueListAttribute_2);
                                            }
                                            finally { if (e_10) throw e_10.error; }
                                        }
                                    }
                                }
                                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                finally {
                                    try {
                                        if (data_1_1 && !data_1_1.done && (_b = data_1.return)) _b.call(data_1);
                                    }
                                    finally { if (e_9) throw e_9.error; }
                                }
                                mapValue[mapFieldName] = displayList;
                            }
                        }
                        else {
                            mapValue[mapFieldName] = null;
                        }
                    }
                    else if (setValueType.indexOf(type) > -1) {
                        var data = this.getDataValue(fieldName, rowIndex);
                        var setType = dataFieldDetail.pop();
                        if (setType != 'value' && setType != 'display' && setType != 'all') {
                            setType = 'value';
                        }
                        if (data.length == 1) {
                            var dataShift = data.shift();
                            if (setType != 'all') {
                                mapValue[mapFieldName] = this.convertDataType(dataType, dataShift[setType]);
                            }
                            else {
                                mapValue[mapFieldName] = {
                                    display: dataShift['display'],
                                    value: dataShift['value']
                                };
                            }
                        }
                        else if (data.length > 1) {
                            var dataArray = [];
                            for (var dataIndex in data) {
                                if (setType != 'all') {
                                    dataArray.push(data[dataIndex][setType]);
                                }
                                else {
                                    dataArray.push({
                                        display: data[dataIndex]['display'],
                                        value: data[dataIndex]['value'],
                                    });
                                }
                            }
                            mapValue[mapFieldName] = dataArray;
                        }
                        else {
                            mapValue[mapFieldName] = null;
                        }
                    }
                    else if (fileValueType.indexOf(type) > -1) {
                        var data = this.getDataValue(fieldName, rowIndex);
                        var fileArray = [];
                        for (var i = 0; i < data["selectFile"].length; i++) {
                            fileArray.push(data["selectFile"][i]);
                        }
                        if (fileArray.length == 1) {
                            mapValue[mapFieldName] = this.convertDataType(dataType, fileArray[0]);
                        }
                        else if (fileArray.length > 1) {
                            mapValue[mapFieldName] = fileArray;
                        }
                        else {
                            mapValue[mapFieldName] = null;
                        }
                    }
                    else if (checkBoxValueType.indexOf(type) > -1) {
                        var data = this.getDataValue(fieldName, rowIndex);
                        var valueList = this.getFieldAttribute(fieldName, 'valueList');
                        var setType = dataFieldDetail.pop();
                        if (Object.keys(data).length > 0) {
                            if (setType != 'value' && setType != 'display' && setType != 'all') {
                                mapValue[mapFieldName] = data;
                            }
                            else if (setType == 'display') {
                                var returnValue = [];
                                try {
                                    for (var valueList_1 = (e_11 = void 0, __values(valueList)), valueList_1_1 = valueList_1.next(); !valueList_1_1.done; valueList_1_1 = valueList_1.next()) {
                                        var valueListRow = valueList_1_1.value;
                                        if (data[valueListRow.value] == true) {
                                            returnValue.push(valueListRow.display);
                                        }
                                    }
                                }
                                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                                finally {
                                    try {
                                        if (valueList_1_1 && !valueList_1_1.done && (_d = valueList_1.return)) _d.call(valueList_1);
                                    }
                                    finally { if (e_11) throw e_11.error; }
                                }
                                if (returnValue.length == 1) {
                                    mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                                }
                                else {
                                    mapValue[mapFieldName] = returnValue;
                                }
                            }
                            else if (setType == 'value') {
                                var returnValue = [];
                                try {
                                    for (var valueList_2 = (e_12 = void 0, __values(valueList)), valueList_2_1 = valueList_2.next(); !valueList_2_1.done; valueList_2_1 = valueList_2.next()) {
                                        var valueListRow = valueList_2_1.value;
                                        if (data[valueListRow.value] == true) {
                                            returnValue.push(valueListRow.value);
                                        }
                                    }
                                }
                                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                finally {
                                    try {
                                        if (valueList_2_1 && !valueList_2_1.done && (_e = valueList_2.return)) _e.call(valueList_2);
                                    }
                                    finally { if (e_12) throw e_12.error; }
                                }
                                if (returnValue.length == 1) {
                                    mapValue[mapFieldName] = this.convertDataType(dataType, returnValue.join(''));
                                }
                                else {
                                    mapValue[mapFieldName] = returnValue;
                                }
                            }
                            else if (setType == 'all') {
                                var returnValue = [];
                                try {
                                    for (var valueList_3 = (e_13 = void 0, __values(valueList)), valueList_3_1 = valueList_3.next(); !valueList_3_1.done; valueList_3_1 = valueList_3.next()) {
                                        var valueListRow = valueList_3_1.value;
                                        if (data[valueListRow.value] == true) {
                                            returnValue.push({
                                                display: valueListRow.display,
                                                value: valueListRow.value,
                                                checked: true
                                            });
                                        }
                                        else {
                                            returnValue.push({
                                                display: valueListRow.display,
                                                value: valueListRow.value,
                                                checked: false
                                            });
                                        }
                                    }
                                }
                                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                                finally {
                                    try {
                                        if (valueList_3_1 && !valueList_3_1.done && (_f = valueList_3.return)) _f.call(valueList_3);
                                    }
                                    finally { if (e_13) throw e_13.error; }
                                }
                                mapValue[mapFieldName] = returnValue;
                            }
                        }
                        else {
                            mapValue[mapFieldName] = null;
                        }
                    }
                    else if (dateValueType.indexOf(type) > -1) {
                        var data = this.getDataValue(fieldName, rowIndex);
                        if (data.length == 1) {
                            mapValue[mapFieldName] = data.shift().value;
                        }
                        else if (data.length > 1) {
                            var dateList = [];
                            for (var dataRow in data) {
                                dateList.push(data[dataRow].value);
                            }
                            mapValue[mapFieldName] = dateList;
                        }
                        else {
                            mapValue[mapFieldName] = null;
                        }
                    }
                }
            }
            return mapValue;
        };
        DynamicFormComponent.prototype.convertDataType = function (dataType, data) {
            if (dataType == 'string' && !type.isString(data)) {
                return data.toString();
            }
            else if (dataType == 'int' && !type.isNumber(data)) {
                var returnData = parseInt(data);
                return (isNaN(returnData) ? 0 : returnData);
            }
            else if (dataType == 'float' && !type.isNumber(data)) {
                var returnData = parseFloat(data);
                return (isNaN(returnData) ? 0 : returnData);
            }
            else if (dataType == 'bool' && type.isString(data) && (data.toLowerCase() == 'true' || data.toLowerCase() == 'false')) {
                var returnData = (data == 'true');
                return returnData;
            }
            else {
                return data;
            }
        };
        DynamicFormComponent.prototype.checkRequireField = function (rowIndex) {
            var e_14, _a;
            var setValueType = [
                'autoComplete',
                'swappingBox',
                'mapValue'
            ];
            var fileValueType = [
                'fileUpload',
                'image'
            ];
            var fieldList = this.getFieldList();
            var requireStatus = true;
            try {
                for (var fieldList_2 = __values(fieldList), fieldList_2_1 = fieldList_2.next(); !fieldList_2_1.done; fieldList_2_1 = fieldList_2.next()) {
                    var fieldName = fieldList_2_1.value;
                    var fieldRequireAttribute = this.getFieldAttribute(fieldName, 'require');
                    var fieldType = this.getFieldAttribute(fieldName, 'type');
                    if (typeof (fieldRequireAttribute) != 'undefined' && fieldRequireAttribute == true) {
                        var fieldData = this.getDataValue(fieldName, rowIndex);
                        if (type.isArray(fieldData)) {
                            if (setValueType.indexOf(fieldType) > -1) {
                                for (var fieldDataRow in fieldData) {
                                    if ((fieldData[fieldDataRow]["value"] == null || fieldData[fieldDataRow]["value"] == '')
                                        && (fieldData[fieldDataRow]["display"] == null || fieldData[fieldDataRow]["display"] == '')) {
                                        requireStatus = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                for (var fieldDataRow in fieldData) {
                                    if (fieldData[fieldDataRow] == null || fieldData[fieldDataRow] == '') {
                                        requireStatus = false;
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            if (setValueType.indexOf(fieldType) > -1) {
                                if ((fieldData["value"] == null || fieldData["value"] == '')
                                    && (fieldData["display"] == null || fieldData["display"] == '')) {
                                    requireStatus = false;
                                }
                            }
                            else if (fileValueType.indexOf(fieldType) > -1) {
                                ;
                                if (!fieldData["selectFile"].length || fieldData["selectFile"].length === 0) {
                                    requireStatus = false;
                                }
                            }
                            else if (fieldType == 'checkBox') {
                                var haveChecked = false;
                                for (var dataKey in fieldData) {
                                    if (fieldData[dataKey] == true) {
                                        haveChecked = true;
                                        break;
                                    }
                                }
                                if (haveChecked == false) {
                                    requireStatus = false;
                                }
                            }
                            else {
                                if (fieldData == null || fieldData == '') {
                                    requireStatus = false;
                                }
                            }
                        }
                        if (requireStatus == false) {
                            break;
                        }
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (fieldList_2_1 && !fieldList_2_1.done && (_a = fieldList_2.return)) _a.call(fieldList_2);
                }
                finally { if (e_14) throw e_14.error; }
            }
            return requireStatus;
        };
        DynamicFormComponent.prototype.checkValidateField = function (roleIndex) {
            var e_15, _a;
            var fieldList = this.getFieldList();
            var checkPatternStatus = true;
            try {
                for (var fieldList_3 = __values(fieldList), fieldList_3_1 = fieldList_3.next(); !fieldList_3_1.done; fieldList_3_1 = fieldList_3.next()) {
                    var fieldName = fieldList_3_1.value;
                    var fieldValuePattern = this.getFieldAttribute(fieldName, 'valuePattern');
                    var fieldType = this.getFieldAttribute(fieldName, 'type');
                    if (typeof (fieldValuePattern) != 'undefined') {
                        var fieldData = this.getDataValue(fieldName, roleIndex);
                        if (type.isArray(fieldData)) {
                            if (fieldType == 'autoComplete') {
                                for (var fieldDataRow in fieldData) {
                                    if (!String(fieldData[fieldDataRow]["display"]).match(fieldValuePattern)) {
                                        checkPatternStatus = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                for (var fieldDataRow in fieldData) {
                                    if (!String(fieldData[fieldDataRow]).match(fieldValuePattern)) {
                                        checkPatternStatus = false;
                                        break;
                                    }
                                }
                            }
                        }
                        else {
                            if (fieldType == 'autoComplete') {
                                if (!String(fieldData["value"]).match(fieldValuePattern)) {
                                    checkPatternStatus = false;
                                }
                            }
                            else {
                                if (!String(fieldData).match(fieldValuePattern)) {
                                    checkPatternStatus = false;
                                }
                            }
                        }
                        if (checkPatternStatus == false) {
                            break;
                        }
                    }
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (fieldList_3_1 && !fieldList_3_1.done && (_a = fieldList_3.return)) _a.call(fieldList_3);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return checkPatternStatus;
        };
        DynamicFormComponent.prototype.getFieldList = function () {
            var fieldList = [];
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    fieldList.push(containerData.fieldList[fieldIndex].fieldName);
                }
            }
            return fieldList;
        };
        DynamicFormComponent.prototype.getFieldLabel = function () {
            var fieldLabel = [];
            for (var containerIndex in this.formCreation.form.containerList) {
                var containerData = this.formCreation.form.containerList[containerIndex];
                for (var fieldIndex in containerData.fieldList) {
                    if (containerData.fieldList[fieldIndex].type != 'hidden') {
                        fieldLabel.push(containerData.fieldList[fieldIndex].label);
                    }
                }
            }
            this.fieldLabelList = fieldLabel;
        };
        DynamicFormComponent.prototype.getFrameHeader = function (rowIndex) {
            if (typeof (this.formCreation.form.option.frameName) != 'undefined' && Array.isArray(this.formCreation.form.option.frameName) && this.formCreation.form.option.frameName.length == this.formCreation.data.length) {
                return this.formCreation.form.option.frameName[rowIndex];
            }
            else if (typeof (this.formCreation.form.option.frameName) != 'undefined' && typeof (this.formCreation.form.option.frameName) != 'undefined' && !Array.isArray(this.formCreation.form.option.frameName)) {
                return this.formCreation.form.option.frameName + (parseInt(rowIndex) + 1);
            }
            else {
                return 'Form ' + (parseInt(rowIndex) + 1);
            }
        };
        DynamicFormComponent.prototype.getFormRow = function () {
            if (this.onAddProcess) {
                return this.tempAddData.length;
            }
            else if (this.onDeleteProcess) {
                return this.tempDeleteData.length;
            }
            return this.formCreation.data.length;
        };
        DynamicFormComponent.prototype.setRowNum = function (rowNum) {
            var currentRowNum = this.getFormRow();
            if (currentRowNum < rowNum) {
                while (currentRowNum < rowNum) {
                    var defaultValue = Object.assign({}, this.getDefault());
                    this.formCreation.data.push(defaultValue);
                    currentRowNum = this.getFormRow();
                }
            }
            else {
                while (currentRowNum > rowNum) {
                    this.formCreation.data.pop();
                    currentRowNum = this.getFormRow();
                }
            }
            // this.reRenderForm();
            return this.onFormReady(rowNum);
        };
        DynamicFormComponent.prototype.addRow = function (rowIndex, sourceAction) {
            var _this = this;
            if (rowIndex === void 0) { rowIndex = null; }
            if (sourceAction === void 0) { sourceAction = null; }
            var rowCount = this.getFormRow();
            var _rowIndex = rowIndex;
            if (rowIndex == null) {
                _rowIndex = this.formCreation.data.length;
            }
            var defaultValue = Object.assign({}, this.getDefault());
            if (!this.onAddProcess) {
                this.tempAddData = this.formCreation.data;
                this.onAddProcess = true;
                this.animationService.setOnReRender(true);
            }
            this.tempAddData.splice(_rowIndex, 0, defaultValue);
            var tempData = [];
            for (var dataRowIndex in this.tempAddData) {
                if (dataRowIndex < _rowIndex) {
                    tempData[dataRowIndex] = this.tempAddData[dataRowIndex];
                }
                else if (dataRowIndex >= _rowIndex) {
                    tempData[dataRowIndex + rowCount] = this.tempAddData[dataRowIndex];
                }
            }
            this.formCreation.data = tempData;
            if (this.addDataTimer != null) {
                this.addDataTimer.unsubscribe();
            }
            this.addDataTimer = rxjs.timer(200).subscribe(function () {
                _this.formCreation.data = Object.assign([], _this.tempAddData);
                _this.onAddProcess = false;
                _this.animationService.setOnReRender(false);
                _this.generateFrameHeader();
            });
            this.callBack.emit({
                action: 'addRow',
                sourceAction: sourceAction,
                rowIndex: _rowIndex
            });
        };
        // deleteRowTest(rowIndex, sourceAction = null) {
        //     let check = true;
        //     if (isArray(rowIndex)) {
        //         for (let rowIndexNum of rowIndex) {
        //             if (this.formCreation.data[rowIndexNum] == undefined) {
        //                 check = false;
        //                 break;
        //             }
        //         }
        //     } else {
        //         if (this.formCreation.data[rowIndex] == undefined) {
        //             check = false;
        //         }
        //     }
        //     if (check) {
        //         if (isArray(rowIndex)) {
        //             rowIndex.sort();
        //             rowIndex.reverse();
        //             for (let rowIndexNum of rowIndex) {
        //                 this.formCreation.data.splice(rowIndexNum, 1);
        //             }
        //         } else {
        //             this.formCreation.data.splice(rowIndex, 1);
        //         }
        //     }
        // }
        DynamicFormComponent.prototype.deleteRow = function (rowIndex, sourceAction) {
            var e_16, _a, e_17, _b;
            var _this = this;
            if (sourceAction === void 0) { sourceAction = null; }
            var check = true;
            if (type.isArray(rowIndex)) {
                try {
                    for (var rowIndex_1 = __values(rowIndex), rowIndex_1_1 = rowIndex_1.next(); !rowIndex_1_1.done; rowIndex_1_1 = rowIndex_1.next()) {
                        var rowIndexNum = rowIndex_1_1.value;
                        if (this.formCreation.data[rowIndexNum] == undefined) {
                            check = false;
                            break;
                        }
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (rowIndex_1_1 && !rowIndex_1_1.done && (_a = rowIndex_1.return)) _a.call(rowIndex_1);
                    }
                    finally { if (e_16) throw e_16.error; }
                }
            }
            else {
                if (this.formCreation.data[rowIndex] == undefined) {
                    check = false;
                }
            }
            if (check) {
                var rowCount = this.getFormRow();
                var tempRowList = [];
                var tempEnableRow = [];
                var tempDisableDelete = [];
                var tempDisableList = [];
                var tempDeleteData_1;
                var tempEnableRowData_1;
                var tempDisableDeleteData_1;
                var tempDisableListData_1;
                for (var dataRowIndex in this.formCreation.data) {
                    tempRowList[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.data[dataRowIndex];
                    if (this.formCreation.form.option.enableRowIndex != undefined) {
                        tempEnableRow[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.form.option.enableRowIndex[dataRowIndex];
                    }
                    if (this.formCreation.form.option.disableDelete != undefined) {
                        tempDisableDelete[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.form.option.disableDelete[dataRowIndex];
                    }
                    if (this.formCreation.form.option.disableList != undefined) {
                        tempDisableList[parseInt(dataRowIndex) + parseInt(rowCount)] = this.formCreation.form.option.disableList[dataRowIndex];
                    }
                }
                if (!this.onDeleteProcess) {
                    tempDeleteData_1 = Object.assign([], this.formCreation.data);
                    if (this.formCreation.form.option.enableRowIndex != undefined) {
                        tempEnableRowData_1 = Object.assign([], this.formCreation.form.option.enableRowIndex);
                    }
                    if (this.formCreation.form.option.disableDelete != undefined) {
                        tempDisableDeleteData_1 = Object.assign([], this.formCreation.form.option.disableDelete);
                    }
                    if (this.formCreation.form.option.disableList != undefined) {
                        tempDisableListData_1 = Object.assign([], this.formCreation.form.option.disableList);
                    }
                    this.onDeleteProcess = true;
                    this.animationService.setOnReRender(true);
                }
                if (type.isArray(rowIndex)) {
                    rowIndex.sort();
                    rowIndex.reverse();
                    try {
                        for (var rowIndex_2 = __values(rowIndex), rowIndex_2_1 = rowIndex_2.next(); !rowIndex_2_1.done; rowIndex_2_1 = rowIndex_2.next()) {
                            var rowIndexNum = rowIndex_2_1.value;
                            tempDeleteData_1.splice(rowIndexNum, 1);
                            if (this.formCreation.form.option.enableRowIndex != undefined) {
                                tempEnableRowData_1.splice(rowIndexNum, 1);
                            }
                            if (this.formCreation.form.option.disableDelete != undefined) {
                                tempDisableDeleteData_1.splice(rowIndexNum, 1);
                            }
                            if (this.formCreation.form.option.disableList != undefined) {
                                tempDisableListData_1.splice(rowIndexNum, 1);
                            }
                        }
                    }
                    catch (e_17_1) { e_17 = { error: e_17_1 }; }
                    finally {
                        try {
                            if (rowIndex_2_1 && !rowIndex_2_1.done && (_b = rowIndex_2.return)) _b.call(rowIndex_2);
                        }
                        finally { if (e_17) throw e_17.error; }
                    }
                }
                else {
                    tempDeleteData_1.splice(rowIndex, 1);
                    if (this.formCreation.form.option.enableRowIndex != undefined) {
                        tempEnableRowData_1.splice(rowIndex, 1);
                    }
                    if (this.formCreation.form.option.disableDelete != undefined) {
                        tempDisableDeleteData_1.splice(rowIndex, 1);
                    }
                    if (this.formCreation.form.option.disableList != undefined) {
                        tempDisableListData_1.splice(rowIndex, 1);
                    }
                }
                this.formCreation.data = tempRowList;
                this.formCreation.form.option.enableRowIndex = tempEnableRow;
                this.formCreation.form.option.disableDelete = tempDisableDelete;
                this.formCreation.form.option.disableList = tempDisableList;
                if (this.deleteDataTimer != null) {
                    this.deleteDataTimer = null;
                }
                this.deleteDataTimer = rxjs.timer(200).subscribe(function () {
                    _this.formCreation.data = Object.assign([], tempDeleteData_1);
                    _this.formCreation.form.option.enableRowIndex = Object.assign([], tempEnableRowData_1);
                    _this.formCreation.form.option.disableDelete = Object.assign([], tempDisableDeleteData_1);
                    _this.formCreation.form.option.disableList = Object.assign([], tempDisableListData_1);
                    _this.onDeleteProcess = false;
                    _this.animationService.setOnReRender(false);
                    _this.generateFrameHeader();
                });
            }
            this.generateFrameHeader();
            // this.reRenderForm();
            // Observable.timer(400).subscribe(() => {
            //     let fieldList = this.getFieldList();
            //     for (let fieldName of fieldList) {
            //         let tempData = Object.assign([],this.formCreation.data[rowIndex][fieldName]);
            //         console.log(tempData);
            //         this.formCreation.data[rowIndex][fieldName] = Object.assign([],this.defaultData[fieldName]);
            //         this.formCreation.data[rowIndex][fieldName] = Object.assign([],tempData);
            //     }
            // });
            this.callBack.emit({
                action: 'deleteRow',
                sourceAction: sourceAction,
                rowIndex: rowIndex
            });
        };
        DynamicFormComponent.prototype.callBackFrame = function (event) {
            if (event.action == 'deleteRow') {
                this.deleteRow(event.rowIndex);
            }
        };
        DynamicFormComponent.prototype.enableRow = function (rowIndex) {
            if (this.formCreation.form.option.enableRowIndex == undefined) {
                this.formCreation.form.option.enableRowIndex = [];
            }
            this.formCreation.form.option.enableRowIndex[rowIndex] = true;
        };
        DynamicFormComponent.prototype.disableRow = function (rowIndex) {
            if (this.formCreation.form.option.enableRowIndex == undefined) {
                this.formCreation.form.option.enableRowIndex = [];
            }
            this.formCreation.form.option.enableRowIndex[rowIndex] = false;
        };
        DynamicFormComponent.prototype.disableField = function (rowIndex, fieldName) {
            if (this.formCreation.form.option.disableList == undefined) {
                this.formCreation.form.option.disableList = [];
            }
            if (this.formCreation.form.option.disableList[rowIndex] == undefined) {
                this.formCreation.form.option.disableList[rowIndex] = {};
            }
            this.formCreation.form.option.disableList[rowIndex][fieldName] = true;
        };
        DynamicFormComponent.prototype.enableField = function (rowIndex, fieldName) {
            if (this.formCreation.form.option.disableList == undefined) {
                this.formCreation.form.option.disableList = [];
            }
            if (this.formCreation.form.option.disableList[rowIndex] == undefined) {
                this.formCreation.form.option.disableList[rowIndex] = {};
            }
            this.formCreation.form.option.disableList[rowIndex][fieldName] = false;
        };
        DynamicFormComponent.prototype.enableDeleteRow = function (rowIndex) {
            if (this.formCreation.form.option.disableDelete == undefined) {
                this.formCreation.form.option.disableDelete = [];
            }
            this.formCreation.form.option.disableDelete[rowIndex] = false;
        };
        DynamicFormComponent.prototype.disableDeleteRow = function (rowIndex) {
            if (this.formCreation.form.option.disableDelete == undefined) {
                this.formCreation.form.option.disableDelete = [];
            }
            this.formCreation.form.option.disableDelete[rowIndex] = true;
        };
        DynamicFormComponent.prototype.reFilter = function (rowIndex) {
            var e_18, _a;
            var fieldList = this.getFieldList();
            try {
                for (var fieldList_4 = __values(fieldList), fieldList_4_1 = fieldList_4.next(); !fieldList_4_1.done; fieldList_4_1 = fieldList_4.next()) {
                    var fieldName = fieldList_4_1.value;
                    var fieldType = this.getFieldAttribute(fieldName, 'type');
                    var value = this.getDataValue(fieldName, rowIndex);
                    if (type.isArray(value)) {
                        if (fieldType == 'autoComplete') {
                            for (var valueRow in value) {
                                var dynamicInput = this.getDynamicInput(fieldName, rowIndex);
                                dynamicInput.instantInput.filterAutoComplete(valueRow, true);
                            }
                        }
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (fieldList_4_1 && !fieldList_4_1.done && (_a = fieldList_4.return)) _a.call(fieldList_4);
                }
                finally { if (e_18) throw e_18.error; }
            }
        };
        DynamicFormComponent.prototype.reFilterField = function (fieldName, rowIndex, dataIndex) {
            var dynamicInput = this.getDynamicInput(fieldName, rowIndex);
            dynamicInput.instantInput.filterAutoComplete(dataIndex, true);
        };
        DynamicFormComponent.prototype.onFormReady = function (rowNum, data, timeout, debug) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (timeout === void 0) { timeout = 15000; }
            if (debug === void 0) { debug = false; }
            if (this.startMilliseconds == null) {
                var dateStart = new Date();
                this.startMilliseconds = dateStart.getTime();
            }
            var readyStatus = null;
            var response = new rxjs.Observable(function (observable) {
                rxjs.interval(200).pipe(operators.takeWhile(function () {
                    return readyStatus != true && _this.startMilliseconds != null;
                }))
                    .subscribe(function () {
                    var e_19, _a;
                    var dateCurrent = new Date();
                    var currentMilliseconds = dateCurrent.getTime();
                    var diffTime = currentMilliseconds - _this.startMilliseconds;
                    var fieldList = _this.getFieldList();
                    var checkField = [];
                    for (var rowIndex = 0; rowIndex < rowNum; rowIndex++) {
                        try {
                            for (var fieldList_5 = (e_19 = void 0, __values(fieldList)), fieldList_5_1 = fieldList_5.next(); !fieldList_5_1.done; fieldList_5_1 = fieldList_5.next()) {
                                var fieldName = fieldList_5_1.value;
                                var dynamicInput = _this.getDynamicInput(fieldName, rowIndex);
                                checkField.push(dynamicInput);
                            }
                        }
                        catch (e_19_1) { e_19 = { error: e_19_1 }; }
                        finally {
                            try {
                                if (fieldList_5_1 && !fieldList_5_1.done && (_a = fieldList_5.return)) _a.call(fieldList_5);
                            }
                            finally { if (e_19) throw e_19.error; }
                        }
                    }
                    if (debug) {
                        console.log(checkField);
                    }
                    if (checkField.indexOf(null) > -1 || checkField.indexOf(undefined) > -1) {
                        readyStatus = false;
                    }
                    else {
                        readyStatus = true;
                    }
                    if (readyStatus == true || diffTime > timeout) {
                        _this.startMilliseconds = null;
                        if (readyStatus == true) {
                            observable.next({
                                status: 'ready',
                                data: data
                            });
                        }
                        else {
                            observable.next({
                                status: 'timeout',
                                data: data
                            });
                        }
                        observable.complete();
                    }
                });
            });
            return response;
        };
        DynamicFormComponent.prototype.refineContainerTableMode = function () {
            var e_20, _a, e_21, _b;
            if (typeof (this.formCreation.form.containerList) != 'undefined') {
                var fieldList = [];
                try {
                    for (var _c = __values(this.formCreation.form.containerList), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var container = _d.value;
                        try {
                            for (var _e = (e_21 = void 0, __values(container.fieldList)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var fieldCreation = _f.value;
                                fieldList.push(fieldCreation);
                            }
                        }
                        catch (e_21_1) { e_21 = { error: e_21_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_21) throw e_21.error; }
                        }
                    }
                }
                catch (e_20_1) { e_20 = { error: e_20_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_20) throw e_20.error; }
                }
                this.refinedContainerTableMode = [];
                this.refinedContainerTableMode.push({
                    fieldList: fieldList
                });
            }
        };
        DynamicFormComponent.prototype.duplicateDataRow = function (sourceRow, destinationRow, actionOnFromReady) {
            var _this = this;
            if (actionOnFromReady === void 0) { actionOnFromReady = true; }
            if (this.formCreation.data[sourceRow] != undefined && this.formCreation.data[destinationRow] != undefined) {
                this.duplicateRowProcess(sourceRow, destinationRow);
            }
            else if (actionOnFromReady) {
                this.duplicateQueue.push({
                    sourceRow: sourceRow,
                    destinationRow: destinationRow
                });
                this.onFormReady(destinationRow + 1).subscribe(function (readyStatus) {
                    if (readyStatus.status == 'ready') {
                        while (_this.duplicateQueue.length > 0) {
                            var duplicateData = _this.duplicateQueue.shift();
                            _this.duplicateRowProcess(duplicateData.sourceRow, duplicateData.destinationRow);
                        }
                    }
                    else {
                        console.error('Dynamic form row number ' + destinationRow + ' didn\'t create. Can\'t duplicate data');
                    }
                });
            }
            else {
                console.error('Data index incorrect. Can\'t duplicate data.');
            }
        };
        DynamicFormComponent.prototype.duplicateToNewRow = function (sourceRow, sourceAction) {
            var e_22, _a;
            if (sourceRow === void 0) { sourceRow = 0; }
            if (sourceAction === void 0) { sourceAction = null; }
            var dataNewRow = {};
            var haveData = false;
            if (this.formCreation.data[sourceRow] != undefined) {
                dataNewRow = Object.assign({}, this.formCreation.data[sourceRow]);
                haveData = true;
            }
            else if (this.formCreation.data.length > 0) {
                dataNewRow = Object.assign({}, this.formCreation.data[0]);
                haveData = true;
            }
            else {
                console.error('duplicate new row fail not found any data');
            }
            if (haveData) {
                var defaultValue = Object.assign({}, this.getDefault());
                for (var fieldName in defaultValue) {
                    if (dataNewRow[fieldName] != undefined) {
                        var value = Object.assign([], dataNewRow[fieldName]);
                        var newValue = [];
                        try {
                            for (var value_1 = (e_22 = void 0, __values(value)), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                                var valueRow = value_1_1.value;
                                if (type.isObject(valueRow)) {
                                    newValue.push(Object.assign({}, valueRow));
                                }
                                else {
                                    newValue.push(valueRow);
                                }
                            }
                        }
                        catch (e_22_1) { e_22 = { error: e_22_1 }; }
                        finally {
                            try {
                                if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                            }
                            finally { if (e_22) throw e_22.error; }
                        }
                        defaultValue[fieldName] = newValue;
                    }
                }
                this.formCreation.data.push(defaultValue);
            }
            this.callBack.emit({
                action: 'duplicateToNewRow',
                sourceAction: sourceAction,
                sourceIndex: sourceRow
            });
        };
        DynamicFormComponent.prototype.duplicateRowProcess = function (sourceRow, destinationRow) {
            var e_23, _a, e_24, _b;
            var fieldList = this.getFieldList();
            var objGet = {};
            try {
                for (var fieldList_6 = __values(fieldList), fieldList_6_1 = fieldList_6.next(); !fieldList_6_1.done; fieldList_6_1 = fieldList_6.next()) {
                    var fieldName = fieldList_6_1.value;
                    objGet[fieldName] = fieldName + '.all';
                }
            }
            catch (e_23_1) { e_23 = { error: e_23_1 }; }
            finally {
                try {
                    if (fieldList_6_1 && !fieldList_6_1.done && (_a = fieldList_6.return)) _a.call(fieldList_6);
                }
                finally { if (e_23) throw e_23.error; }
            }
            var sourceData = this.mapGetValue(objGet, sourceRow);
            for (var fieldName in sourceData) {
                var type = this.getFieldAttribute(fieldName, 'type');
                if (type == 'checkBox') {
                    var value = {};
                    try {
                        for (var _c = (e_24 = void 0, __values(sourceData[fieldName])), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var valueData = _d.value;
                            value[valueData.value] = valueData.checked;
                        }
                    }
                    catch (e_24_1) { e_24 = { error: e_24_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_24) throw e_24.error; }
                    }
                    sourceData[fieldName] = value;
                }
            }
            this.mapSetValue(sourceData, destinationRow);
        };
        DynamicFormComponent.prototype.checkDuplicate = function (fieldArray, regEx, regExIndex) {
            var e_25, _a;
            if (regEx === void 0) { regEx = /(.*)/; }
            if (regExIndex === void 0) { regExIndex = 0; }
            var tempDataCheck = [];
            var mapGet = {};
            var check = true;
            try {
                for (var fieldArray_1 = __values(fieldArray), fieldArray_1_1 = fieldArray_1.next(); !fieldArray_1_1.done; fieldArray_1_1 = fieldArray_1.next()) {
                    var fieldList = fieldArray_1_1.value;
                    mapGet[fieldList] = fieldList;
                }
            }
            catch (e_25_1) { e_25 = { error: e_25_1 }; }
            finally {
                try {
                    if (fieldArray_1_1 && !fieldArray_1_1.done && (_a = fieldArray_1.return)) _a.call(fieldArray_1);
                }
                finally { if (e_25) throw e_25.error; }
            }
            var formRow = this.getFormRow();
            for (var i = 0; i < formRow; i++) {
                var data = this.mapGetValue(mapGet, i);
                for (var dataKey in data) {
                    var regTest = new RegExp(regEx);
                    var match = regTest.exec(data[dataKey]);
                    if (match != null) {
                        if (tempDataCheck.indexOf(match[regExIndex]) > -1) {
                            check = false;
                            break;
                        }
                        else {
                            tempDataCheck.push(match[regExIndex]);
                        }
                    }
                }
                if (check == false) {
                    break;
                }
            }
            return check;
        };
        DynamicFormComponent.prototype.checkRequireAll = function () {
            var check = true;
            var formRow = this.getFormRow();
            for (var i = 0; i < formRow; i++) {
                if (!this.checkRequireField(i)) {
                    check = false;
                    break;
                }
            }
            return check;
        };
        DynamicFormComponent.prototype.checkValidateAll = function () {
            var check = true;
            var formRow = this.getFormRow();
            for (var i = 0; i < formRow; i++) {
                if (!this.checkValidateField(i)) {
                    check = false;
                    break;
                }
            }
            return check;
        };
        DynamicFormComponent.prototype.setMode = function (mode) {
            this.formCreation.form.option.mode = mode;
        };
        DynamicFormComponent.prototype.enableAdd = function () {
            if (this.formCreation.form.option.addRow == undefined) {
                this.formCreation.form.option.addRow = true;
            }
            this.formCreation.form.option.addRow = true;
        };
        DynamicFormComponent.prototype.disableAdd = function () {
            if (this.formCreation.form.option.addRow == undefined) {
                this.formCreation.form.option.addRow = false;
            }
            this.formCreation.form.option.addRow = false;
        };
        DynamicFormComponent.prototype.enableDelete = function () {
            if (this.formCreation.form.option.deleteRow == undefined) {
                this.formCreation.form.option.deleteRow = true;
            }
            this.formCreation.form.option.deleteRow = true;
        };
        DynamicFormComponent.prototype.disableDelete = function () {
            if (this.formCreation.form.option.deleteRow == undefined) {
                this.formCreation.form.option.deleteRow = true;
            }
            this.formCreation.form.option.deleteRow = true;
        };
        DynamicFormComponent.prototype.setDefault = function (rowIndex) {
            if (rowIndex === void 0) { rowIndex = 0; }
            if (this.formCreation.data[0]) {
                this.getDefault();
                for (var fieldName in this.defaultData) {
                    this.setDataValue(fieldName, 0, this.defaultData[fieldName]);
                }
            }
        };
        DynamicFormComponent.prototype.setSavePoint = function (savePointName) {
            var e_26, _a;
            if (savePointName === void 0) { savePointName = "default"; }
            var savePointData = [];
            var rowNum = this.getFormRow();
            var fieldList = this.getFieldList();
            var mapGet = {};
            try {
                for (var fieldList_7 = __values(fieldList), fieldList_7_1 = fieldList_7.next(); !fieldList_7_1.done; fieldList_7_1 = fieldList_7.next()) {
                    var fieldName = fieldList_7_1.value;
                    mapGet[fieldName] = fieldName;
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (fieldList_7_1 && !fieldList_7_1.done && (_a = fieldList_7.return)) _a.call(fieldList_7);
                }
                finally { if (e_26) throw e_26.error; }
            }
            for (var i = 0; i < rowNum; i++) {
                var data = this.mapGetValue(mapGet, i);
                savePointData.push(data);
            }
            this.savePoint[savePointName] = savePointData;
        };
        DynamicFormComponent.prototype.getSavePoint = function (savePointName) {
            if (savePointName === void 0) { savePointName = "default"; }
            if (this.savePoint[savePointName]) {
                var savePointData = this.savePoint[savePointName];
                for (var savePointIndex in savePointData) {
                    this.mapSetValue(savePointData[savePointIndex], savePointIndex);
                }
            }
        };
        DynamicFormComponent.prototype.getParam = function (rowIndex) {
            var e_27, _a;
            if (rowIndex === void 0) { rowIndex = 0; }
            var fieldList = this.getFieldList();
            var param = {};
            try {
                for (var fieldList_8 = __values(fieldList), fieldList_8_1 = fieldList_8.next(); !fieldList_8_1.done; fieldList_8_1 = fieldList_8.next()) {
                    var fieldName = fieldList_8_1.value;
                    param[fieldName] = fieldName;
                }
            }
            catch (e_27_1) { e_27 = { error: e_27_1 }; }
            finally {
                try {
                    if (fieldList_8_1 && !fieldList_8_1.done && (_a = fieldList_8.return)) _a.call(fieldList_8);
                }
                finally { if (e_27) throw e_27.error; }
            }
            param = this.mapGetValue(param, rowIndex);
            return param;
        };
        return DynamicFormComponent;
    }());
    DynamicFormComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-form',
                    template: "<div class=\"formPanel defaultDynamicForm {{formCreation.form.option.customClass ? formCreation.form.option.customClass : ''}}\">\r\n    <form *ngIf=\"showForm\" action=\"\" method=\"post\">\r\n        <ng-container *ngIf=\"!formCreation.form.option.displayMode || formCreation.form.option.displayMode != 'table'\">\r\n            <ng-container *ngFor=\"let rowIndex of objKey(formCreation.data)\">\r\n                <ng-container *ngIf=\"formCreation.form.option.frame == true\">\r\n                    <lb9-dynamic-form-frame [header]=\"frameHeader\"\r\n                                            [rowIndex]=\"rowIndex\"\r\n                                            [showDeleteRow]=\"formCreation.form.option.deleteRow\"\r\n                                            (callback)=\"callBackFrame($event)\">\r\n                        <lb9-dynamic-form-row [_reRenderFieldList]=\"_reRenderFieldList\"\r\n                                              [containerList]=\"formCreation.form.containerList\"\r\n                                              [option]=\"formCreation.form.option\"\r\n                                              [data]=\"formCreation.data\"\r\n                                              [rowIndex]=\"rowIndex\"\r\n                                              (callBack)=\"processCallBack($event)\"\r\n                                              (panelCallBack)=\"processPanelCallBack($event)\">\r\n\r\n                        </lb9-dynamic-form-row>\r\n\r\n                    </lb9-dynamic-form-frame>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"formCreation.form.option.frame == false || !formCreation.form.option.frame\">\r\n                    <lb9-dynamic-form-row [_reRenderFieldList]=\"_reRenderFieldList\"\r\n                                          [containerList]=\"formCreation.form.containerList\"\r\n                                          [option]=\"formCreation.form.option\"\r\n                                          [data]=\"formCreation.data\"\r\n                                          [rowIndex]=\"rowIndex\"\r\n                                          (callBack)=\"processCallBack($event)\"\r\n                                          (panelCallBack)=\"processPanelCallBack($event)\">\r\n                    </lb9-dynamic-form-row>\r\n                </ng-container>\r\n            </ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"formCreation.form.option.displayMode == 'table'\">\r\n            <div class=\"table-form-default-dynamic\">\r\n                <div class=\"header\"></div>\r\n                <div class=\"scroll\">\r\n                    <table>\r\n                        <tr>\r\n                            <th *ngFor=\"let fieldLabel of fieldLabelList\" [innerHTML]=\"fieldLabel\">\r\n                            </th>\r\n                            <th *ngIf=\"formCreation.form.option.deleteRow\">\r\n\r\n                            </th>\r\n                        </tr>\r\n                        <ng-container *ngFor=\"let rowIndex of objKey(formCreation.data)\">\r\n                            <ng-container *ngIf=\"formCreation.form.containerList\">\r\n                                <ng-container *ngFor=\"let containerIndex of objKey(refinedContainerTableMode)\">\r\n                                    <tr lb9-dynamic-container-table\r\n                                        [containerCreation]=\"refinedContainerTableMode[containerIndex]\"\r\n                                        [data]=\"formCreation.data\"\r\n                                        [actionDataIndex]=\"rowIndex\"\r\n                                        [containerIndex]=\"containerIndex\"\r\n                                        [option]=\"formCreation.form.option\"\r\n                                        [reRenderField]=\"_reRenderFieldList\"\r\n                                        (callBack)=\"processCallBack($event)\"\r\n                                        (panelCallBack)=\"processPanelCallBack($event)\">\r\n                                    </tr>\r\n                                </ng-container>\r\n                            </ng-container>\r\n                        </ng-container>\r\n                        <tr *ngIf=\"formCreation.form.option.addRow && formCreation.form.option.displayMode == 'table'\">\r\n                            <td [colSpan]=\"fieldLabelList.length+1\">\r\n                                <div class=\"dp2AddNewBtnTbl\" id=\"add_row_data_table_footer\" (click)=\"addRow()\">\r\n                                    <span class=\"glyphicon glyphicon-plus-sign\"></span>\r\n                                    <div *ngIf=\"formCreation.form.option.addRowText\">{{formCreation.form.option.addRowText}}</div>\r\n                                </div>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </ng-container>\r\n        <div *ngIf=\"formCreation.form.option.addRow && formCreation.form.option.displayMode != 'table'\" class=\"dp2AddNew\">\r\n            <div class=\"dp2AddNewBtn\" id=\"add_row_data\" (click)=\"addRow()\">\r\n                <span class=\"glyphicon glyphicon-plus-sign\"></span>\r\n                <div *ngIf=\"formCreation.form.option.addRowText\">{{formCreation.form.option.addRowText}}</div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n",
                    entryComponents: [
                        LabelComponent,
                        TextBoxComponent,
                        TextAreaComponent,
                        CheckBoxComponent,
                        ColorSelectComponent,
                        SelectBoxComponent,
                        HiddenComponent,
                        FileUploadComponent,
                        ImageComponent,
                        AutoCompleteComponent,
                        ButtonComponent,
                        ButtonIconComponent,
                        SwappingBoxComponent,
                        MapValueComponent,
                        RadioComponent,
                        DateComponent
                    ],
                    providers: [AnimationService]
                },] }
    ];
    DynamicFormComponent.ctorParameters = function () { return [
        { type: AnimationService }
    ]; };
    DynamicFormComponent.propDecorators = {
        formRow: [{ type: i0.ViewChildren, args: [DynamicFormRowComponent,] }],
        formTableRow: [{ type: i0.ViewChildren, args: [DynamicContainerTableComponent,] }],
        formCreation: [{ type: i0.Input }],
        model: [{ type: i0.Input }],
        actionDataIndex: [{ type: i0.Input }],
        defaultData: [{ type: i0.Input }],
        showForm: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }],
        panelCallBack: [{ type: i0.Output }]
    };

    var DynamicTableComponent = /** @class */ (function () {
        function DynamicTableComponent() {
            this.callBack = new i0.EventEmitter();
            this.currentPage = 1;
            this.sortData = "";
        }
        DynamicTableComponent.prototype.ngOnInit = function () {
        };
        DynamicTableComponent.prototype.processCallBack = function (data) {
            this.callBack.emit(data);
            this.sortData = data.sortValue;
        };
        DynamicTableComponent.prototype.getTotalPage = function () {
            var totalPage = null;
            if (this.tableCreation.data.totalRecord) {
                totalPage = Math.ceil(this.tableCreation.data.totalRecord / this.tableCreation.data.pageRowNum);
            }
            else if (this.tableCreation.pagination && this.tableCreation.pagination.totalRowNum) {
                totalPage = Math.ceil(this.tableCreation.pagination.totalRowNum / this.tableCreation.rowLimit);
            }
            return totalPage;
        };
        DynamicTableComponent.prototype.getPageRank = function () {
            var beginRecord = null;
            var endRecode = null;
            if (this.tableCreation.data.pageRowNum) {
                beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + 1);
                endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.data.pageRowNum)) + this.tableCreation.data.data.length);
            }
            else {
                beginRecord = (((this.currentPage - 1) * parseInt(this.tableCreation.rowLimit)) + 1);
                endRecode = (((this.currentPage - 1) * parseInt(this.tableCreation.rowLimit)) + this.tableCreation.data.length);
            }
            return {
                begin: beginRecord,
                end: endRecode
            };
        };
        DynamicTableComponent.prototype.processPagingCallBack = function (data) {
            this.currentPage = data;
            this.callBack.emit({
                action: "page",
                pageNumber: data,
                limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
            });
        };
        DynamicTableComponent.prototype.processRowLimitCallBack = function (data) {
            this.tableCreation.rowLimit = data;
            this.callBack.emit({
                action: "page",
                pageNumber: 1,
                limit: (this.tableCreation.rowLimit ? this.tableCreation.rowLimit : this.tableCreation.data.pageRowNum)
            });
        };
        DynamicTableComponent.prototype.getCheckedList = function () {
            return this.tableRef.getCheckedList();
        };
        DynamicTableComponent.prototype.clearCheckedList = function () {
            this.tableRef.clearCheckList();
        };
        return DynamicTableComponent;
    }());
    DynamicTableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-table',
                    template: "<ng-container *ngIf=\"tableCreation.data\">\r\n    <lb9-table [tableCreation]=\"tableCreation\"\r\n                [pageNumber]=\"currentPage\" \r\n                [sortData]=\"sortData\" #tableID \r\n                (callBack)=\"processCallBack($event)\"></lb9-table>\r\n                \r\n    <lb9-paging *ngIf=\"tableCreation.showPaging\" [currentPage]=\"currentPage\"\r\n                [totalPage]=\"getTotalPage()\"\r\n                [dataRank]=\"getPageRank()\"\r\n                [totalRecord]=\"(tableCreation.data.totalRecord ? tableCreation.data.totalRecord : tableCreation.pagination.totalRowNum)\"\r\n                [customClass]=\"tableCreation.customClassPaging\"\r\n                [pageControlType]=\"tableCreation.pageControlType\"\r\n                [rowLimit]=\"tableCreation.rowLimit\"\r\n                [rowLimitOption]=\"tableCreation.rowLimitOption\"\r\n                (pagingProcess)=\"processPagingCallBack($event)\"\r\n                (rowLimitCallback)=\"processRowLimitCallBack($event)\"></lb9-paging>\r\n</ng-container>\r\n<ng-container *ngIf=\"!tableCreation.data\">\r\n    <div class=\"listDataNotFound\" [innerHTML]=\"tableCreation.dataNotFoundString ? tableCreation.dataNotFoundString:'Data Not Found.'\">\r\n\r\n    </div>\r\n</ng-container>\r\n"
                },] }
    ];
    DynamicTableComponent.ctorParameters = function () { return []; };
    DynamicTableComponent.propDecorators = {
        tableRef: [{ type: i0.ViewChild, args: ["tableID", { static: false },] }],
        tableCreation: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var TableComponent = /** @class */ (function () {
        function TableComponent() {
            this.callBack = new i0.EventEmitter();
            this.objKeys = Object.keys;
            this.sortField = "";
            this.sortType = "ASC";
            this.checkData = [];
            this.checkDataTemp = [];
            this.radioData = "";
            this.checkSelectAll = false;
        }
        Object.defineProperty(TableComponent.prototype, "pageNumber", {
            get: function () {
                return this._pageNumber;
            },
            set: function (val) {
                this._pageNumber = val;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(TableComponent.prototype, "sortData", {
            get: function () {
                return this._sortData;
            },
            set: function (val) {
                this._sortData = val;
            },
            enumerable: false,
            configurable: true
        });
        ;
        TableComponent.prototype.ngOnInit = function () {
            this.sortField = this.tableCreation.fieldList[0].fieldName;
        };
        TableComponent.prototype.ngOnChanges = function (changes) {
            this.processCheckSelectAll();
        };
        TableComponent.prototype.processCheckSelectAll = function () {
            var checkStatusSelectAll = true;
            var data = (this.tableCreation.data.data ? this.tableCreation.data.data : this.tableCreation.data);
            for (var rowIndex in data) {
                var primaryKey = this.getPrimary(rowIndex);
                if ((typeof (this.checkData[primaryKey]) == "undefined" || this.checkData[primaryKey] == false) && !this.checkIgnore(rowIndex)) {
                    checkStatusSelectAll = false;
                    break;
                }
            }
            if (checkStatusSelectAll == true) {
                this.checkSelectAll = true;
            }
            else {
                this.checkSelectAll = false;
            }
        };
        TableComponent.prototype.getData = function (fieldData, row) {
            var e_1, _a, e_2, _b, e_3, _c;
            var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
            var strData = "";
            if (fieldData.fieldName.length > 1) {
                if (fieldData.multiType == "join") {
                    var dataAll = [];
                    try {
                        for (var _d = __values(fieldData.fieldName), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var fieldName = _e.value;
                            if (dataRow[fieldName] != null && dataRow[fieldName] != "") {
                                dataAll.push(dataRow[fieldName]);
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    strData = dataAll.join(fieldData.joinChar);
                }
                else if (fieldData.multiType == "oneFromLast") {
                    var dataAll = [];
                    try {
                        for (var _f = __values(fieldData.fieldName), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var fieldName = _g.value;
                            dataAll.push(dataRow[fieldName]);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    while (dataAll.length > 0 && (strData == null || strData == "")) {
                        strData = dataAll.pop();
                    }
                }
                else if (fieldData.multiType == "oneFromFirst") {
                    var dataAll = [];
                    try {
                        for (var _h = __values(fieldData.fieldName), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var fieldName = _j.value;
                            dataAll.push(dataRow[fieldName]);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    while (dataAll.length > 0 && (strData == null || strData == "")) {
                        strData = dataAll.shift();
                    }
                }
            }
            else {
                strData = dataRow[fieldData.fieldName];
            }
            return strData;
        };
        TableComponent.prototype.getFieldId = function (fieldData) {
            var e_4, _a;
            var fieldArray = [];
            try {
                for (var fieldData_1 = __values(fieldData), fieldData_1_1 = fieldData_1.next(); !fieldData_1_1.done; fieldData_1_1 = fieldData_1.next()) {
                    var fieldName = fieldData_1_1.value;
                    fieldArray.push(fieldName);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (fieldData_1_1 && !fieldData_1_1.done && (_a = fieldData_1.return)) _a.call(fieldData_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            var fieldId = fieldArray.join("_");
            return fieldId;
        };
        TableComponent.prototype.editRow = function (row) {
            var e_5, _a;
            var primaryKeyList = {};
            var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
            try {
                for (var _b = __values(this.tableCreation.primaryField), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var primaryItem = _c.value;
                    if (dataRow[primaryItem]) {
                        primaryKeyList[primaryItem] = dataRow[primaryItem];
                    }
                    else {
                        console.log("Primary key data not found: " + primaryItem);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            this.callBack.emit({
                action: 'edit',
                rowIndex: row,
                rowData: dataRow,
                primaryKey: primaryKeyList
            });
        };
        TableComponent.prototype.deleteRow = function (row) {
            var e_6, _a;
            var primaryKeyList = {};
            var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[row] : this.tableCreation.data[row]);
            try {
                for (var _b = __values(this.tableCreation.primaryField), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var primaryItem = _c.value;
                    if (dataRow[primaryItem]) {
                        primaryKeyList[primaryItem] = dataRow[primaryItem];
                    }
                    else {
                        console.log("Primary key data not found: " + primaryItem);
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
            this.callBack.emit({
                action: 'delete',
                rowIndex: row,
                rowData: dataRow,
                primaryKey: primaryKeyList
            });
        };
        TableComponent.prototype.sortBy = function (dataIndex) {
            if (this.tableCreation.sorting == true && this.tableCreation.fieldList[dataIndex].sorting != false) {
                var sortField = void 0;
                if (typeof (this.tableCreation.fieldList[dataIndex].fieldNameDb) != "undefined") {
                    sortField = this.tableCreation.fieldList[dataIndex].fieldNameDb;
                }
                else {
                    sortField = this.tableCreation.fieldList[dataIndex].fieldName;
                }
                var fieldName = sortField.join(",");
                if (this.sortField == fieldName) {
                    if (this.sortType == "DESC") {
                        this.sortType = "ASC";
                    }
                    else {
                        this.sortType = "DESC";
                    }
                }
                else {
                    this.sortField = fieldName;
                    this.sortType = "ASC";
                }
                // console.log('function sortBy sortType = ',this.sortType)
                var sort = this.sortField + " " + this.sortType;
                this.callBack.emit({
                    action: "sort",
                    sortValue: sort,
                    fieldName: sortField,
                    order: this.sortType
                });
            }
        };
        TableComponent.prototype.dataAction = function (rowNum, fieldName) {
            this.callBack.emit({
                action: "click_data",
                fieldName: fieldName.join(','),
                data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowNum] : this.tableCreation.data[rowNum])
            });
        };
        TableComponent.prototype.checkAction = function (rowIndex) {
            var checkStatus = "";
            var primaryKey = this.getPrimary(rowIndex);
            if (this.checkData[primaryKey] == true) {
                checkStatus = "check";
                this.checkDataTemp[primaryKey] = Object.assign({}, (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex]));
            }
            else {
                checkStatus = "unCheck";
                delete this.checkDataTemp[primaryKey];
            }
            this.processCheckSelectAll();
            this.callBack.emit({
                type: "checkBox",
                action: checkStatus,
                primaryKey: primaryKey,
                data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex])
            });
        };
        TableComponent.prototype.radioAction = function (rowIndex) {
            this.callBack.emit({
                type: "radio",
                action: "change",
                primaryKey: this.getPrimary(rowIndex),
                data: (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex])
            });
        };
        TableComponent.prototype.getPrimary = function (rowIndex) {
            var e_7, _a;
            var primaryField = this.tableCreation.primaryField;
            var dataRow = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex] : this.tableCreation.data[rowIndex]);
            var primaryKey = [];
            if (Array.isArray(primaryField)) {
                try {
                    for (var primaryField_1 = __values(primaryField), primaryField_1_1 = primaryField_1.next(); !primaryField_1_1.done; primaryField_1_1 = primaryField_1.next()) {
                        var primaryListRow = primaryField_1_1.value;
                        if (typeof (dataRow[primaryListRow]) != "undefined") {
                            primaryKey.push(dataRow[primaryListRow]);
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (primaryField_1_1 && !primaryField_1_1.done && (_a = primaryField_1.return)) _a.call(primaryField_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
            else {
                if (typeof (dataRow[primaryField]) != "undefined") {
                    primaryKey.push(dataRow[primaryField]);
                }
            }
            return primaryKey.join("_");
        };
        TableComponent.prototype.getCheckedList = function () {
            var checkList = [];
            for (var checkedRowIndex in this.checkDataTemp) {
                checkList.push(this.checkDataTemp[checkedRowIndex]);
            }
            return checkList;
        };
        TableComponent.prototype.clearCheckList = function () {
            this.checkData = [];
            this.checkDataTemp = [];
            this.checkSelectAll = false;
        };
        TableComponent.prototype.checkActionAll = function () {
            var data = (this.tableCreation.data.data ? this.tableCreation.data.data : this.tableCreation.data);
            if (this.checkSelectAll == true) {
                for (var rowIndex in data) {
                    if (!this.checkIgnore(rowIndex)) {
                        var primaryKey = this.getPrimary(rowIndex);
                        this.checkData[primaryKey] = true;
                        this.checkDataTemp[primaryKey] = Object.assign({}, data[rowIndex]);
                    }
                }
            }
            else {
                for (var rowIndex in data) {
                    var primaryKey = this.getPrimary(rowIndex);
                    this.checkData[primaryKey] = false;
                    delete this.checkDataTemp[primaryKey];
                }
            }
        };
        TableComponent.prototype.checkIgnore = function (rowIndex) {
            if (typeof (this.tableCreation.ignoreSelect) != "undefined") {
                var dataSplitCheck = this.tableCreation.ignoreSelect.split(":");
                var dataField = (this.tableCreation.data.data ? this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] : this.tableCreation.data[rowIndex][dataSplitCheck[0]]);
                if (typeof (dataField) != "undefined") {
                    if (type.isBoolean(dataField)) {
                        return dataField;
                    }
                    else if (dataSplitCheck.length == 2) {
                        if (this.tableCreation.data.data) {
                            if (this.tableCreation.data.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
                                return true;
                            }
                        }
                        else {
                            if (this.tableCreation.data[rowIndex][dataSplitCheck[0]] == dataSplitCheck[1]) {
                                return true;
                            }
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            return false;
        };
        return TableComponent;
    }());
    TableComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-table',
                    template: "<div id=\"dynamicTable\" class=\"{{tableCreation.customClass ? tableCreation.customClass : ''}}\">\r\n    <div class=\"header\" id=\"head_brand_list\">{{tableCreation.header}}</div>\r\n    <div class=\"scroll\">\r\n        <table>\r\n            <tr>\r\n                <ng-container *ngIf=\"tableCreation.primaryField && tableCreation.showSelect && tableCreation.showSelect != 'none'\">\r\n                    <th>\r\n                        <input *ngIf=\"tableCreation.showSelect == 'checkBox'\" type=\"checkbox\"  id=\"checkBox_select_all\"\r\n                               [(ngModel)]=\"checkSelectAll\"\r\n                               (change)=\"checkActionAll()\" name=\"checkBox_all\" >\r\n                    </th>\r\n                </ng-container>\r\n                <ng-container *ngFor=\"let dataIndex of objKeys(tableCreation.fieldList)\">\r\n                    <th *ngIf=\"tableCreation.fieldList[dataIndex].hideHeader != true\"\r\n                        id=\"id_{{getFieldId(tableCreation.fieldList[dataIndex].fieldName)}}_header\"\r\n                        [colSpan]=\"tableCreation.fieldList[dataIndex].headerSpan ? tableCreation.fieldList[dataIndex].headerSpan : '1'\"\r\n                        class=\"{{(tableCreation.sorting == true && tableCreation.fieldList[dataIndex].sorting != false? 'actionClick' : '')}}{{tableCreation.fieldList[dataIndex].thCustomClass ? ' '+tableCreation.fieldList[dataIndex].thCustomClass : ''}}\"\r\n                        (click)=\"sortBy(dataIndex)\">\r\n                        {{tableCreation.fieldList[dataIndex].displayHeader}}\r\n                        <span *ngIf=\"(sortField == tableCreation.fieldList[dataIndex].fieldNameDb || sortField == tableCreation.fieldList[dataIndex].fieldName) && tableCreation.sorting == true && tableCreation.fieldList[dataIndex].sorting != false\"\r\n                             class=\"{{sortType == 'DESC' ? 'glyphicon glyphicon-sort-by-attributes-alt' : 'glyphicon glyphicon-sort-by-attributes'}}\"></span>\r\n                    </th>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"tableCreation.showDelete || tableCreation.showEdit\">\r\n                    <th id=\"action\" class=\"actionTh\" [innerHTML]=\"tableCreation.actionHeader ? tableCreation.actionHeader: 'Action'\">\r\n                    </th>\r\n                </ng-container>\r\n            </tr>\r\n            <tr *ngFor=\"let rowIndex of objKeys((tableCreation.data.data ? tableCreation.data.data :tableCreation.data))\" class=\"table_class\" id=\"id_row_{{tableCreation.tableId}}_{{rowIndex}}\">\r\n                <ng-container *ngIf=\"tableCreation.primaryField && tableCreation.showSelect && tableCreation.showSelect != 'none'\">\r\n                    <td id=\"select_{{rowIndex}}\">\r\n                        <div *ngIf=\"!checkIgnore(rowIndex)\">\r\n                            <input *ngIf=\"tableCreation.showSelect == 'checkBox'\" type=\"checkbox\" id=\"checkBox_{{rowIndex}}\"\r\n                                   [(ngModel)]=\"checkData[getPrimary(rowIndex)]\"\r\n                                   (change)=\"checkAction(rowIndex)\" name=\"checkBox_{{rowIndex}}\" >\r\n                            <input *ngIf=\"tableCreation.showSelect == 'radioBox'\" type=\"radio\"\r\n                                   value=\"{{getPrimary(rowIndex)}}\"\r\n                                   name=\"tableRadio_{{tableCreation.tableId}}\" id=\"radioBox_{{rowIndex}}\"\r\n                                   [(ngModel)]=\"radioData\"\r\n                                   (change)=\"radioAction(rowIndex)\" >\r\n                        </div>\r\n                    </td>\r\n                </ng-container>\r\n                <ng-container *ngFor=\"let dataIndex of objKeys(tableCreation.fieldList)\">\r\n                    <td id=\"id_{{getFieldId(tableCreation.fieldList[dataIndex].fieldName)}}_{{rowIndex}}_{{tableCreation.tableId}}\"\r\n                        class=\"{{tableCreation.fieldList[dataIndex].align}} {{tableCreation.fieldList[dataIndex].tdCustomClass ? tableCreation.fieldList[dataIndex].tdCustomClass : ''}}\">\r\n                        <div class=\"{{tableCreation.fieldList[dataIndex].dataStyle}}\">\r\n                            <ng-container *ngIf=\"tableCreation.fieldList[dataIndex].action == false\">\r\n                                <div [innerHTML]=\"getData(tableCreation.fieldList[dataIndex],rowIndex)\"></div>\r\n                            </ng-container>\r\n                            <ng-container *ngIf=\"tableCreation.fieldList[dataIndex].action == true\">\r\n                                <div class=\"dataAction\" (click)=\"dataAction(rowIndex,tableCreation.fieldList[dataIndex].fieldName)\" [innerHTML]=\"getData(tableCreation.fieldList[dataIndex],rowIndex)\"></div>\r\n                            </ng-container>\r\n                        </div>\r\n                    </td>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"tableCreation.showDelete || tableCreation.showEdit\">\r\n                    <td id=\"action_{{rowIndex}}\" class=\"actionTd\">\r\n                        <span *ngIf=\"tableCreation.showEdit\" class=\"btn-action edit\" id=\"edit_{{rowIndex}}\"\r\n                              (click)=\"editRow(rowIndex)\"><span\r\n                                class=\"glyphicon glyphicon-edit\"></span></span>\r\n                        <span *ngIf=\"tableCreation.showDelete\" class=\"btn-action delete\" id=\"delete_{{rowIndex}}\"\r\n                              (click)=\"deleteRow(rowIndex)\"><span\r\n                                class=\"glyphicon glyphicon-trash\"></span></span>\r\n                    </td>\r\n                </ng-container>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>\r\n"
                },] }
    ];
    TableComponent.ctorParameters = function () { return []; };
    TableComponent.propDecorators = {
        pageNumber: [{ type: i0.Input }],
        sortData: [{ type: i0.Input }],
        tableCreation: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var PagingComponent = /** @class */ (function () {
        function PagingComponent() {
            this.currentPage = 1;
            this.totalPage = 1;
            this.totalRecord = 1;
            this.pageControlType = "auto";
            this.rowLimit = null;
            this.rowLimitOption = null;
            this.pagingProcess = new i0.EventEmitter();
            this.rowLimitCallback = new i0.EventEmitter();
            this.tempTotalPage = 0;
            this.totalPageCal = 0;
            this.pageList = [];
            this.rowLimitOptionValue = 10;
        }
        PagingComponent.prototype.ngOnInit = function () {
            this.inputWidth = ((String(this.totalPage).length * 15) + 27) + "px";
            this.rowLimitOptionValue = this.rowLimit;
            // console.log(this.rowLimitOptionValue)
        };
        PagingComponent.prototype.checkInput = function (event) {
            var modValue = parseInt(String(event.target.value) + event.key);
            if ((event.key.match(/^([0-9])$/)
                || (event.ctrlKey == true && (event.code == "KeyV" || event.code == "KeyC"))
                || event.code == "Backspace"
                || event.code == "ArrowUp"
                || event.code == "ArrowDown"
                || event.code == "ArrowLeft"
                || event.code == "ArrowRight"
                || event.code == "Tab") && modValue <= this.totalPage) {
                return true;
            }
            if (event.code == "NumpadEnter" || event.key == "Enter" || event.code == "Enter") {
                this.checkValue();
            }
            return false;
        };
        PagingComponent.prototype.goFirst = function () {
            if (this.currentPage != 1) {
                this.currentPage = 1;
                this.processPaging();
            }
        };
        PagingComponent.prototype.goLast = function () {
            if (this.currentPage != this.totalPage) {
                this.currentPage = this.totalPage;
                this.processPaging();
            }
        };
        PagingComponent.prototype.goPrev = function () {
            if (this.currentPage != 1) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
                this.processPaging();
            }
        };
        PagingComponent.prototype.goNext = function () {
            if (this.currentPage != this.totalPage) {
                if (this.currentPage < this.totalPage) {
                    this.currentPage++;
                }
                this.processPaging();
            }
        };
        PagingComponent.prototype.keepValue = function () {
            this.tempValue = this.currentPage;
        };
        PagingComponent.prototype.checkValue = function () {
            if (this.currentPage == 0 || this.currentPage == null) {
                this.currentPage = this.tempValue;
            }
            if (this.currentPage != this.tempValue) {
                this.processPaging();
            }
        };
        PagingComponent.prototype.getTotalRecordStr = function () {
            var str = "";
            if (typeof (this.dataRank) != "undefined") {
                str = "Showing " + this.dataRank.begin + " to " + this.dataRank.end + " of " + this.totalRecord;
            }
            return str;
        };
        PagingComponent.prototype.processPagingBtn = function (page) {
            if (page != this.currentPage) {
                this.currentPage = page;
                this.processPaging();
            }
        };
        PagingComponent.prototype.processPaging = function () {
            this.pagingProcess.emit(this.currentPage);
        };
        PagingComponent.prototype.genPageArray = function () {
            if (this.tempTotalPage == 0 || this.tempTotalPage != this.totalPage) {
                this.pageList = [];
                for (var i = 1; i <= this.totalPage; i++) {
                    this.pageList.push(i);
                }
                this.tempTotalPage = this.totalPage;
            }
            return this.pageList;
        };
        PagingComponent.prototype.changeRowLimit = function () {
            this.rowLimitCallback.emit(this.rowLimitOptionValue);
        };
        return PagingComponent;
    }());
    PagingComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-paging',
                    template: "<div id=\"pagingPanel\" class=\"{{customClass ? customClass: ''}}\">\r\n    <div class=\"totalRecord\">{{getTotalRecordStr()}}</div>\r\n\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage > 5) || pageControlType=='input'\">\r\n        <div class=\"first\" id=\"arrowLeftFirst\" (click)=\"goFirst()\">\r\n            <span class=\"glyphicon glyphicon-fast-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n            <!--<div class=\"arrowLeft innerLeftArrow\"></div>-->\r\n        </div>\r\n        <div class=\"previous\" id=\"arrowLeft\" (click)=\"goPrev()\">\r\n            <span class=\"glyphicon glyphicon-backward\"></span>\r\n            <!--<div class=\"arrowLeft\"></div>-->\r\n        </div>\r\n        <input class=\"currentPage\" id=\"inputRow\" type=\"text\" [(ngModel)]=\"currentPage\" max=\"{{totalPage}}\" min=\"1\"\r\n               [style.width]=\"inputWidth\"\r\n               (keydown)=\"checkInput($event)\" (focus)=\"keepValue()\" (blur)=\"checkValue()\"/>\r\n        <div class=\"totalRow\">\r\n            / {{totalPage}}\r\n        </div>\r\n        <div class=\"next\" id=\"arrowNext\" (click)=\"goNext()\">\r\n            <span class=\"glyphicon glyphicon-forward\"></span>\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n        <div class=\"last\" id=\"arrowNextLast\" (click)=\"goLast()\">\r\n            <span class=\"glyphicon glyphicon-fast-forward\"></span>\r\n            <!--<div class=\"arrowRight innerRightArrow\"></div>-->\r\n            <!--<div class=\"arrowRight\"></div>-->\r\n        </div>\r\n    </div>\r\n    <div class=\"pageControl\" *ngIf=\"((!pageControlType || pageControlType == 'auto') && totalPage <= 5) || pageControlType=='button'\">\r\n        <div class=\"pageBtn{{pageNum == currentPage ? ' pageBtnActive': ''}}\" *ngFor=\"let pageNum of genPageArray()\" (click)=\"processPagingBtn(pageNum)\">{{pageNum}}</div>\r\n    </div>\r\n    <div class=\"pageLimitOption\" *ngIf=\"rowLimitOption\">\r\n        <select [(ngModel)]=\"rowLimitOptionValue\" (change)=\"changeRowLimit()\">\r\n            <option *ngFor=\"let value of rowLimitOption\" [value]=\"value\">{{value}}</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n\r\n"
                },] }
    ];
    PagingComponent.ctorParameters = function () { return []; };
    PagingComponent.propDecorators = {
        currentPage: [{ type: i0.Input }],
        totalPage: [{ type: i0.Input }],
        totalRecord: [{ type: i0.Input }],
        dataRank: [{ type: i0.Input }],
        customClass: [{ type: i0.Input }],
        pageControlType: [{ type: i0.Input }],
        rowLimit: [{ type: i0.Input }],
        rowLimitOption: [{ type: i0.Input }],
        pagingProcess: [{ type: i0.Output }],
        rowLimitCallback: [{ type: i0.Output }]
    };

    var ErrorMsgBubbleComponent = /** @class */ (function () {
        function ErrorMsgBubbleComponent() {
            this.maxShow = 5;
            this.data = [];
            this.objKeys = Object.keys;
        }
        ErrorMsgBubbleComponent.prototype.ngOnInit = function () {
        };
        ErrorMsgBubbleComponent.prototype.clearError = function () {
            this.data = [];
        };
        ErrorMsgBubbleComponent.prototype.addError = function (key, msg) {
            var exitsData = false;
            for (var errorIndex in this.data) {
                if (this.data[errorIndex].key == key) {
                    exitsData = true;
                }
            }
            if (exitsData == false) {
                var error = {
                    key: key,
                    msg: msg
                };
                this.data.push(error);
            }
        };
        ErrorMsgBubbleComponent.prototype.removeError = function (key) {
            var removeIndex = "";
            for (var errorIndex in this.data) {
                if (this.data[errorIndex].key == key) {
                    removeIndex = errorIndex;
                    break;
                }
            }
            this.data.splice(parseInt(removeIndex), 1);
        };
        return ErrorMsgBubbleComponent;
    }());
    ErrorMsgBubbleComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-error-msg-bubble',
                    template: "<div id=\"errorBubble\">\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgPanel\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRow\">\r\n                {{data[i].msg}}\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n    <div *ngIf=\"data.length > 0\" class=\"errorMsgSpace\">\r\n        <ng-container *ngFor=\"let i of objKeys(data)\">\r\n            <div *ngIf=\"i < maxShow\" class=\"errorRowSpace\">\r\n\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n</div>\r\n\r\n",
                    styles: ["#errorBubble .errorMsgPanel{position:fixed;bottom:0px;left:0px;width:calc(100% - 30px);margin:15px;border:#ff4356 1px solid;border-radius:10px;box-shadow:3px 3px 3px #00000080;background:#ffe1d9;z-index:1060}#errorBubble .errorMsgPanel .errorRow{color:#ff4356;border-top:1px dotted #ff988a;padding:0 10px;line-height:30px}#errorBubble .errorMsgPanel .errorRow:first-child{border-top:0px}#errorBubble .errorMsgSpace{margin:15px}#errorBubble .errorMsgSpace .errorRowSpace{height:30px}\n"]
                },] }
    ];
    ErrorMsgBubbleComponent.ctorParameters = function () { return []; };
    ErrorMsgBubbleComponent.propDecorators = {
        maxShow: [{ type: i0.Input }]
    };

    var DynamicTabComponent = /** @class */ (function () {
        function DynamicTabComponent() {
            this.lockTab = false;
            this.callBack = new i0.EventEmitter();
            this.objKeys = Object.keys;
            this.currentTab = 0;
        }
        DynamicTabComponent.prototype.ngOnInit = function () {
        };
        DynamicTabComponent.prototype.processCallBack = function (data) {
            if (this.getDisableTab(parseInt(data.tabNum))) {
                this.currentTab = parseInt(data.tabNum);
                this.callBack.emit(data);
            }
        };
        DynamicTabComponent.prototype.getDisableTab = function (tabIndex) {
            if (this.lockTab) {
                return false;
            }
            if (this.tabCreation.option.lockByIndex != undefined) {
                if (this.tabCreation.option.lockByIndex[parseInt(tabIndex)] != undefined) {
                    return !this.tabCreation.option.lockByIndex[parseInt(tabIndex)];
                }
                return true;
            }
            return true;
        };
        DynamicTabComponent.prototype.disableTab = function (tabIndex) {
            if (this.tabCreation.option.lockByIndex == undefined) {
                this.tabCreation.option.lockByIndex = [];
            }
            this.tabCreation.option.lockByIndex[tabIndex] = true;
        };
        DynamicTabComponent.prototype.enableTab = function (tabIndex) {
            if (this.tabCreation.option.lockByIndex == undefined) {
                this.tabCreation.option.lockByIndex = [];
            }
            this.tabCreation.option.lockByIndex[tabIndex] = false;
        };
        DynamicTabComponent.prototype.nextTab = function () {
            var lastTab = false;
            if (this.currentTab == this.tabCreation.tabList.length - 2) {
                lastTab = true;
            }
            if (this.currentTab < this.tabCreation.tabList.length - 1) {
                this.currentTab = this.currentTab + 1;
                this.callBack.emit({
                    action: "nextTab",
                    fromTab: {
                        name: this.tabCreation.tabList[this.currentTab - 1],
                        index: this.currentTab - 1
                    },
                    toTab: {
                        name: this.tabCreation.tabList[this.currentTab],
                        index: this.currentTab
                    },
                    last: lastTab
                });
            }
            else {
                this.callBack.emit({
                    action: "nextTab",
                    fromTab: {
                        name: this.tabCreation.tabList[this.currentTab],
                        index: this.currentTab
                    },
                    toTab: {
                        name: this.tabCreation.tabList[this.currentTab],
                        index: this.currentTab
                    },
                    last: true
                });
            }
        };
        DynamicTabComponent.prototype.toggleLockTab = function () {
            if (this.lockTab) {
                this.lockTab = false;
            }
            else {
                this.lockTab = true;
            }
        };
        DynamicTabComponent.prototype.getCssStatus = function (tabNumber) {
            if (!isNaN(parseFloat(tabNumber)) && isFinite(tabNumber)) {
                if (tabNumber == this.currentTab) {
                    return "p2DShowTab";
                }
                return "p2DHideTab";
            }
            else {
                if (this.tabCreation.tabList.indexOf(tabNumber) == this.currentTab) {
                    return "p2DShowTab";
                }
                return "p2DHideTab";
            }
        };
        DynamicTabComponent.prototype.gotoTab = function (tabIndex) {
            if (type.isString(tabIndex)) {
                var index = this.tabCreation.tabList.indexOf(tabIndex);
                if (index == -1) {
                    console.error("Tab name not found.");
                }
                else {
                    this.currentTab = index;
                }
            }
            else {
                if (tabIndex > (this.tabCreation.tabList.length - 1)) {
                    console.error("Tab index not found.");
                }
                else {
                    this.currentTab = tabIndex;
                }
            }
        };
        return DynamicTabComponent;
    }());
    DynamicTabComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-tab',
                    template: "<div class=\"{{tabCreation.option.customClass ? tabCreation.option.customClass:'dynamicTab'}}\">\r\n  <div *ngFor=\"let i of objKeys(tabCreation.tabList)\" (click)=\"processCallBack({tabNum:i,tabName:tabCreation.tabList[i]})\" class=\"tabComponent {{currentTab == i ? 'active':'inactive'}}\" id=\"dynamic_tab_{{tabCreation.tabList[i]}}\">\r\n    {{tabCreation.tabList[i]}}\r\n  </div>\r\n</div>"
                },] }
    ];
    DynamicTabComponent.ctorParameters = function () { return []; };
    DynamicTabComponent.propDecorators = {
        tabCreation: [{ type: i0.Input }],
        lockTab: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var DynamicPopupComponent = /** @class */ (function () {
        function DynamicPopupComponent() {
            this.callback = new i0.EventEmitter();
            this.confirmStatus = false;
            this.showStatus = false;
            this.queue = false;
            this.statusPopup = 'hidePopup';
            this.popupProperties = {
                header: 'popupHeader',
                type: 'info',
                icon: 'glyphicon-info-sign',
                colorClass: '',
                eventCode: '',
                data: {},
                message: 'Informations'
            };
            this.tempData = {
                header: 'popupHeader',
                type: 'info',
                icon: 'glyphicon-info-sign',
                colorClass: '',
                eventCode: '',
                data: {},
                message: 'Informations'
            };
        }
        DynamicPopupComponent.prototype.ngOnInit = function () {
        };
        DynamicPopupComponent.prototype.set = function (type, message, eventCode, data) {
            if (eventCode === void 0) { eventCode = '000'; }
            if (data === void 0) { data = {}; }
            switch (type) {
                case 'error':
                    this.tempData = {
                        header: 'Error',
                        type: 'error',
                        icon: 'glyphicon-remove-sign',
                        colorClass: 'cError',
                        eventCode: eventCode,
                        data: data,
                        message: message
                    };
                    break;
                case 'warning':
                    this.tempData = {
                        header: 'Warning',
                        type: 'warning',
                        icon: 'glyphicon-alert',
                        colorClass: 'cWarning',
                        eventCode: eventCode,
                        data: data,
                        message: message
                    };
                    break;
                case 'success':
                    this.tempData = {
                        header: 'Success',
                        type: 'success',
                        icon: 'glyphicon-ok-sign',
                        colorClass: 'cSuccess',
                        eventCode: eventCode,
                        data: data,
                        message: message
                    };
                    break;
                case 'confirm':
                    this.confirmStatus = false;
                    this.tempData = {
                        header: 'Confirm',
                        type: 'confirm',
                        icon: 'glyphicon-question-sign',
                        colorClass: 'cConfirm',
                        eventCode: eventCode,
                        data: data,
                        message: message
                    };
                    break;
                case 'info':
                    this.tempData = {
                        header: 'Informations',
                        type: 'info',
                        icon: 'glyphicon-info-sign',
                        colorClass: 'cInfo',
                        eventCode: eventCode,
                        data: data,
                        message: message
                    };
            }
            this.showModel();
        };
        DynamicPopupComponent.prototype.showModel = function () {
            var _this = this;
            this.checkModalOpening();
            if (this.showStatus == false) {
                // $('#dynamicPopup').modal('show');
                this.popupProperties = this.tempData;
                this.statusPopup = 'showPopup';
                this.showStatus = true;
                this.queue = true;
            }
            else {
                this.hideModal();
                rxjs.interval(500).pipe(operators.takeWhile(function () {
                    return _this.queue == true;
                }))
                    .subscribe(function () {
                    if (_this.showStatus == false) {
                        // $('#dynamicPopup').modal('show');
                        _this.popupProperties = _this.tempData;
                        _this.statusPopup = 'showPopup';
                        _this.showStatus = true;
                        _this.queue = false;
                    }
                });
            }
        };
        DynamicPopupComponent.prototype.hideModal = function () {
            var _this = this;
            this.statusPopup = 'hidePopup';
            rxjs.interval(500).pipe(operators.takeWhile(function () {
                return _this.showStatus == true;
            }))
                .subscribe(function () {
                if (_this.showStatus == true) {
                    _this.showStatus = false;
                }
            });
        };
        DynamicPopupComponent.prototype.checkModalOpening = function () {
            var _this = this;
            rxjs.interval(500)
                .pipe(operators.takeWhile(function () {
                return _this.showStatus == true;
            }))
                .subscribe(function () {
                // if (this.showStatus == true && $('#dynamicPopup').css("display") == "none") {
                if (_this.showStatus == true && _this.statusPopup == '') {
                    _this.showStatus = false;
                }
            });
        };
        DynamicPopupComponent.prototype.confirm = function () {
            this.confirmStatus = true;
            this.callback.emit({
                type: this.popupProperties.type,
                status: this.confirmStatus,
                eventCode: this.popupProperties.eventCode,
                data: this.popupProperties.data
            });
            this.hideModal();
        };
        DynamicPopupComponent.prototype.close = function () {
            this.confirmStatus = false;
            this.callback.emit({
                type: this.popupProperties.type,
                status: this.confirmStatus,
                eventCode: this.popupProperties.eventCode,
            });
            this.hideModal();
        };
        return DynamicPopupComponent;
    }());
    DynamicPopupComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-popup',
                    template: "<div class=\"dynamic-popup {{statusPopup}}\" id=\"dynamicPopup\">\r\n  <div class=\"foreground-close\" (click)=\"close()\"></div>\r\n  <div class=\"dynamic-popup-inside\">\r\n    <div class=\"dynamic-popup-container\">\r\n      <div class=\"dynamic-popup-header\">\r\n        <p class=\"dynamic-popup-title\">{{popupProperties.header}}</p>\r\n      </div>\r\n      <div class=\"dynamic-popup-body text-center\">\r\n        <span class=\"glyphicon {{popupProperties.icon}} {{popupProperties.colorClass}}\"></span>\r\n        <p id=\"messageLabel\" class=\"data-msg\" [innerHTML]=\"popupProperties.message\"></p>\r\n      </div>\r\n      <div class=\"dynamic-popup-footer text-right\">\r\n        <div *ngIf=\"popupProperties.type == 'confirm'\" id=\"btnDynamicPopupConfirm\" class=\"btn-style-dynamic btn-small\"\r\n             (click)=\"confirm()\"><span class=\"glyphicon glyphicon-ok\"></span>\r\n          <span>OK</span></div>\r\n        <div id=\"btnDynamicPopupClose\" class=\"btn-style-dynamic btn-small\" data-dismiss=\"modal\" aria-label=\"Close\"\r\n             (click)=\"close()\"><span\r\n          class=\"glyphicon glyphicon-remove-circle\"></span> <span>Close</span></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"
                },] }
    ];
    DynamicPopupComponent.ctorParameters = function () { return []; };
    DynamicPopupComponent.propDecorators = {
        callback: [{ type: i0.Output }]
    };

    var P2PanelComponent = /** @class */ (function () {
        function P2PanelComponent() {
            this.id = 'not-assign';
            this.showCloseBtn = false;
            this.header = 'not-assign';
        }
        P2PanelComponent.prototype.ngOnInit = function () {
        };
        return P2PanelComponent;
    }());
    P2PanelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-p2-panel',
                    template: "<div id=\"{{id}}\" class=\"mainPanel\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [".mainPanel{width:calc(100% - 30px);margin:15px;position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px #0000001a}.mainPanel .panelAlign .header{color:#fff;font-size:22px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:hand;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:solid 1px #DDD;border-top:0px;padding:15px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:linear-gradient(#FFF,#EEE)}\n"]
                },] }
    ];
    P2PanelComponent.ctorParameters = function () { return []; };
    P2PanelComponent.propDecorators = {
        id: [{ type: i0.Input }],
        showCloseBtn: [{ type: i0.Input }],
        header: [{ type: i0.Input }]
    };

    var DynamicFormFrameComponent = /** @class */ (function () {
        function DynamicFormFrameComponent() {
            this.showDeleteRow = false;
            this.callback = new i0.EventEmitter();
        }
        DynamicFormFrameComponent.prototype.ngOnInit = function () {
        };
        DynamicFormFrameComponent.prototype.deleteRowProcess = function () {
            this.callback.emit({
                action: "deleteRow",
                rowIndex: this.rowIndex
            });
        };
        return DynamicFormFrameComponent;
    }());
    DynamicFormFrameComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-form-frame',
                    template: "<div class=\"mainPanelDF\">\r\n    <div class=\"panelAlign\">\r\n        <div class=\"header\">\r\n            <div>{{header[rowIndex]}}</div>\r\n            <div class=\"closeBtn {{showDeleteRow ? 'show':'hide'}}\" id=\"delete_row_frame_{{rowIndex}}\" (click)=\"deleteRowProcess()\">\r\n                <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n            </div>\r\n        </div>\r\n        <div class=\"contentPanel\">\r\n            <ng-content></ng-content>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"
                },] }
    ];
    DynamicFormFrameComponent.ctorParameters = function () { return []; };
    DynamicFormFrameComponent.propDecorators = {
        header: [{ type: i0.Input }],
        showDeleteRow: [{ type: i0.Input }],
        rowIndex: [{ type: i0.Input }],
        callback: [{ type: i0.Output }]
    };

    var FadeInOutAnimation = [
        animations.trigger('fadeInOut', [
            animations.state('in', animations.style({
                'opacity': '1',
                'visibility': 'visible'
            })),
            animations.state('out', animations.style({
                'opacity': '0',
                'visibility': 'hidden'
            })),
            animations.transition('in => out', [animations.group([
                    animations.animate('150ms ease-in-out', animations.style({
                        'opacity': '0'
                    })),
                    animations.animate('300ms ease-in-out', animations.style({
                        'visibility': 'hidden'
                    }))
                ])]),
            animations.transition('out => in', [animations.group([
                    animations.animate('200ms ease-in-out', animations.style({
                        'visibility': 'visible'
                    })),
                    animations.animate('200ms ease-in-out', animations.style({
                        'opacity': '1'
                    }))
                ])])
        ]),
    ];

    var DatePickerComponent = /** @class */ (function () {
        function DatePickerComponent() {
            this.showToday = false;
            this.todayText = "Today";
            this.closeOnDateSelect = false;
            this.setDate = new i0.EventEmitter();
            this.inputFocus = new i0.EventEmitter();
            this.onfocus = false;
            this.showPanel = false;
            this.objKeys = Object.keys;
            this.month = 0;
            this.year = 1999;
            this.yearListGen = 0;
            this.dateList = [];
            this.yearList = [];
            this.currentDate = {
                year: 0,
                month: 0,
                day: 0
            };
            this.selectedDate = {
                year: 0,
                month: 0,
                day: 0
            };
            this.showDate = true;
            this.showYear = false;
            this.showMonth = false;
            this.animationState = 'out';
        }
        DatePickerComponent.prototype.ngOnInit = function () {
            var currentDateVal = new Date();
            this.currentDate.day = currentDateVal.getDate();
            this.currentDate.month = currentDateVal.getMonth();
            this.currentDate.year = currentDateVal.getFullYear();
            this.selectedDate = this.currentDate;
            this.month = this.currentDate.month;
            this.year = this.currentDate.year;
            this.generateDateList();
            this.generateYearList();
        };
        DatePickerComponent.prototype.generateDateList = function () {
            this.dateList = [];
            var firstDateOfMonth = new Date(this.year, this.month, 1);
            var lastDateOfMonth = new Date(this.year, this.month + 1, 0);
            var dayOfWeek = firstDateOfMonth.getDay();
            var startDate = firstDateOfMonth.getDate();
            var endDate = lastDateOfMonth.getDate();
            var dateRow = [];
            var dayCount = dayOfWeek;
            for (var i = startDate; i <= endDate; i++) {
                var dateForCal = new Date(this.year, this.month, i);
                dateRow.push({
                    day: i,
                    month: this.month,
                    year: this.year,
                    weekDay: dateForCal.getDay()
                });
                if (dayCount == 6 || i == endDate || (this.dateList.length < 5 && i == endDate && dateRow.length == 7)) {
                    if (this.dateList.length < 5 && i == endDate && dateRow.length == 7) {
                        this.dateList.push(dateRow);
                        dateRow = [];
                    }
                    if (i == endDate && dateRow.length < 7) {
                        var nextMonthDate = new Date(this.year, this.month, endDate + 1);
                        var nextDate = nextMonthDate.getDate();
                        var nextMonth = nextMonthDate.getMonth();
                        var nextYear = nextMonthDate.getFullYear();
                        while (dateRow.length < 7) {
                            dateRow.push({
                                day: nextDate,
                                month: nextMonth,
                                year: nextYear
                            });
                            if (dateRow.length == 7 && this.dateList.length < 5) {
                                this.dateList.push(dateRow);
                                dateRow = [];
                            }
                            nextDate++;
                        }
                    }
                    if (this.dateList.length == 0 && dateRow.length < 7) {
                        var prevMonthDate = new Date(this.year, this.month, 0);
                        var prevDate = prevMonthDate.getDate();
                        var prevMonth = prevMonthDate.getMonth();
                        var prevYear = prevMonthDate.getFullYear();
                        while (dateRow.length < 7) {
                            dateRow.unshift({
                                day: prevDate,
                                month: prevMonth,
                                year: prevYear
                            });
                            prevDate--;
                        }
                    }
                    this.dateList.push(dateRow);
                    dateRow = [];
                    dayCount = 0;
                }
                else {
                    dayCount++;
                }
            }
        };
        DatePickerComponent.prototype.actionPrev = function () {
            if (this.month == 0) {
                this.year--;
                this.month = 11;
            }
            else {
                this.month--;
            }
            this.generateDateList();
        };
        DatePickerComponent.prototype.actionNext = function () {
            if (this.month == 11) {
                this.year++;
                this.month = 0;
            }
            else {
                this.month++;
            }
            this.generateDateList();
        };
        DatePickerComponent.prototype.generateYearList = function () {
            if (this.yearListGen == 0) {
                this.yearListGen = this.year;
            }
            var startYear = this.yearListGen - 10;
            var endYear = this.yearListGen + 10;
            this.yearList = [];
            for (var i = startYear; i <= endYear; i++) {
                this.yearList.push(i);
            }
        };
        DatePickerComponent.prototype.actionPrevYear = function () {
            this.yearListGen = this.yearListGen - 20;
            this.generateYearList();
        };
        DatePickerComponent.prototype.actionNextYear = function () {
            this.yearListGen = this.yearListGen + 20;
            this.generateYearList();
        };
        DatePickerComponent.prototype.actionYearSelect = function () {
            this.showDate = false;
            this.showMonth = false;
            this.showYear = true;
        };
        DatePickerComponent.prototype.selectYear = function (year) {
            this.year = parseInt(year);
            this.showYear = false;
            this.showMonth = true;
        };
        DatePickerComponent.prototype.selectMonth = function (month) {
            this.month = parseInt(month);
            this.generateDateList();
            this.showMonth = false;
            this.showDate = true;
        };
        DatePickerComponent.prototype.selectDate = function (date) {
            this.selectedDate = date;
            this.setDate.emit(this.selectedDate);
            if (this.closeOnDateSelect) {
                this.open(date);
            }
        };
        DatePickerComponent.prototype.open = function (dateSelected) {
            if (dateSelected === void 0) { dateSelected = null; }
            if (String(dateSelected).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
                var dateSplit = String(dateSelected).split("-");
                var dateObj = {
                    day: parseInt(dateSplit[2]),
                    month: parseInt(dateSplit[1]) - 1,
                    year: parseInt(dateSplit[0])
                };
                this.selectedDate = dateObj;
                this.month = parseInt(dateSplit[1]) - 1;
                this.year = parseInt(dateSplit[0]);
                this.generateDateList();
            }
            if (this.showPanel) {
                this.showPanel = false;
                this.animationState = 'out';
            }
            else {
                this.showPanel = true;
                this.animationState = 'in';
            }
        };
        DatePickerComponent.prototype.selectToday = function () {
            // const today = this.currentDate.year+"-"+this.currentDate.month+"-"+this.currentDate.day;
            this.selectDate(this.currentDate);
        };
        DatePickerComponent.prototype.closeCalendar = function () {
            if (this.showPanel && this.onfocus == false) {
                this.showPanel = false;
                this.animationState = 'out';
            }
        };
        DatePickerComponent.prototype.setInputFocus = function () {
            this.onfocus = false;
            this.inputFocus.emit();
        };
        DatePickerComponent.prototype.setCalendarFocus = function () {
            this.onfocus = true;
        };
        return DatePickerComponent;
    }());
    DatePickerComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-date-picker',
                    template: "<div class=\"datePickerPanel\" [@fadeInOut]=\"animationState\" (mouseleave)=\"setInputFocus()\" (mouseenter)=\"setCalendarFocus()\">\r\n  <div class=\"datePickerAlign\">\r\n    <div class=\"monthYearPanel\">\r\n      <div class=\"monthYearDisplay\">\r\n        <div class=\"monthYearAction\" (click)=\"actionYearSelect()\">{{monthListLong[month]}} {{(year + yearOffset)}} <span class=\"glyphicon glyphicon-collapse-down\"></span></div>\r\n        <div class=\"prev\" (click)=\"actionPrev()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n        <div class=\"next\" (click)=\"actionNext()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n      </div>\r\n    </div>\r\n    <div class=\"dateTablePanel {{showDate ? 'showPanel':'hidePanel'}}\">\r\n      <table class=\"dateTable\">\r\n        <tr>\r\n          <th *ngFor=\"let day of weekDay\">\r\n            {{day}}\r\n          </th>\r\n        </tr>\r\n        <ng-container *ngFor=\"let dateRow of dateList\">\r\n          <tr>\r\n            <td *ngFor=\"let date of dateRow\">\r\n              <div class=\"dateBtn{{month != date.month? ' otherMonth' : ''}} {{date.day == currentDate.day && date.year == currentDate.year && date.month == currentDate.month ? 'dateCurrent':'dateNormal'}}{{date.weekDay == '0' ? ' dateSun':''}}{{date.weekDay == '6' ? ' dateSat':''}}\" (click)=\"selectDate(date)\">\r\n                <div class=\"{{date.day == selectedDate.day && date.year == selectedDate.year && date.month == selectedDate.month ? 'selected':''}}\" [innerHTML]=\"date.day\"></div>\r\n              </div>\r\n            </td>\r\n          </tr>\r\n        </ng-container>\r\n      </table>\r\n    </div>\r\n    <div class=\"monthTablePanel {{showMonth ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let monthNameIndex of objKeys(monthListLong)\" class=\"monthBtn\" (click)=\"selectMonth(monthNameIndex)\">{{monthListLong[monthNameIndex]}}</div>\r\n    </div>\r\n    <div class=\"yearTablePanel {{showYear ? 'showPanel':'hidePanel'}}\">\r\n      <div *ngFor=\"let year of yearList\" class=\"yearBtn\" (click)=\"selectYear(year)\">{{year + yearOffset}}</div>\r\n      <div class=\"prevYear\" (click)=\"actionPrevYear()\"><span class=\"glyphicon glyphicon-chevron-left\"></span></div>\r\n      <div class=\"nextYear\" (click)=\"actionNextYear()\"><span class=\"glyphicon glyphicon-chevron-right\"></span></div>\r\n    </div>\r\n    <div *ngIf=\"showToday\" class=\"todayPanel\">\r\n      <div class=\"todayBtn\" [innerHTML]=\"todayText\" (click)=\"selectToday()\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    animations: [FadeInOutAnimation]
                },] }
    ];
    DatePickerComponent.ctorParameters = function () { return []; };
    DatePickerComponent.propDecorators = {
        monthListLong: [{ type: i0.Input }],
        monthListShort: [{ type: i0.Input }],
        weekDay: [{ type: i0.Input }],
        yearOffset: [{ type: i0.Input }],
        showToday: [{ type: i0.Input }],
        todayText: [{ type: i0.Input }],
        closeOnDateSelect: [{ type: i0.Input }],
        setDate: [{ type: i0.Output }],
        inputFocus: [{ type: i0.Output }]
    };

    var DynamicFormLabelPanelComponent = /** @class */ (function () {
        function DynamicFormLabelPanelComponent() {
            this.panelCallBack = new i0.EventEmitter();
        }
        DynamicFormLabelPanelComponent.prototype.ngOnInit = function () {
        };
        DynamicFormLabelPanelComponent.prototype.getLabelDisplay = function () {
            if (typeof (this.fieldCreation.label) == "undefined" || this.fieldCreation.label == "" || this.option.displayMode == "table") {
                return "dp2hide";
            }
            else if (this.option.labelAlign == "left") {
                return "singleLine";
            }
            else {
                return "";
            }
        };
        DynamicFormLabelPanelComponent.prototype.processPanelCallBack = function (event) {
            this.panelCallBack.emit(event);
        };
        return DynamicFormLabelPanelComponent;
    }());
    DynamicFormLabelPanelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-dynamic-form-label-panel',
                    template: "<div *ngIf=\"fieldCreation.label != ''\" class=\"dp2Label {{getLabelDisplay()}} {{option.labelAlign == 'left' ? 'vAlignTop alignRight' : ''}}\"\r\n     [style.width]=\"width\" (click)=\"processPanelCallBack($event)\">\r\n  <div class=\"{{fieldCreation.require ? 'requireLabel':''}}\" [innerHTML]=\"fieldCreation.label\"></div>\r\n</div>\r\n"
                },] }
    ];
    DynamicFormLabelPanelComponent.ctorParameters = function () { return []; };
    DynamicFormLabelPanelComponent.propDecorators = {
        fieldCreation: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        width: [{ type: i0.Input }],
        panelCallBack: [{ type: i0.Output }]
    };

    var PanelMainComponent = /** @class */ (function () {
        function PanelMainComponent() {
            this.id = 'not-assign';
            this.showCloseBtn = false;
            this.header = 'not-assign';
            this.margin = false;
        }
        PanelMainComponent.prototype.ngOnInit = function () {
        };
        return PanelMainComponent;
    }());
    PanelMainComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-panel-main',
                    template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px #0000001a}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:hand;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:solid 1px #DDD;border-top:0px;padding:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:linear-gradient(#FFF,#EEE)}.panelMargin{margin:15px;width:calc(100% - 30px)}\n"]
                },] }
    ];
    PanelMainComponent.ctorParameters = function () { return []; };
    PanelMainComponent.propDecorators = {
        id: [{ type: i0.Input }],
        showCloseBtn: [{ type: i0.Input }],
        header: [{ type: i0.Input }],
        margin: [{ type: i0.Input }]
    };

    var PanelChildComponent = /** @class */ (function () {
        function PanelChildComponent() {
            this.id = 'not-assign';
            this.showCloseBtn = false;
            this.header = 'not-assign';
            this.margin = true;
        }
        PanelChildComponent.prototype.ngOnInit = function () {
        };
        return PanelChildComponent;
    }());
    PanelChildComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-panel-child',
                    template: "<div id=\"{{id}}\" class=\"mainPanel{{(margin ? ' panelMargin':'')}}\">\r\n  <div class=\"panelAlign\">\r\n    <div class=\"header\">\r\n      <div>{{header}}</div>\r\n      <div *ngIf=\"showCloseBtn\">\r\n        <span class=\"glyphicon glyphicon-remove-circle\"></span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentPanel contentPanelGray\">\r\n      <ng-content></ng-content>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [".mainPanel{position:relative}.mainPanel .panelAlign960{max-width:960px;margin:0 auto}.mainPanel .panelAlign{margin:0 auto;position:relative;border-radius:5px;box-shadow:2px 2px 2px #0000001a}.mainPanel .panelAlign .header{color:#fff;line-height:30px;padding:0 10px;background:#8ac33e;border-top-left-radius:5px;border-top-right-radius:5px;position:relative}.mainPanel .panelAlign .header .closeBtn{position:absolute;top:4px;right:4px;cursor:hand;cursor:pointer}.mainPanel .panelAlign .contentPanel{border:solid 1px #DDD;border-top:0px;padding:10px;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.mainPanel .panelAlign .contentPanelGray{background:linear-gradient(#FFF,#EEE)}.panelMargin{margin:5px;width:calc(100% - 10px)}\n"]
                },] }
    ];
    PanelChildComponent.ctorParameters = function () { return []; };
    PanelChildComponent.propDecorators = {
        id: [{ type: i0.Input }],
        showCloseBtn: [{ type: i0.Input }],
        header: [{ type: i0.Input }],
        margin: [{ type: i0.Input }]
    };

    var LightBreakDynamicComponent = /** @class */ (function () {
        function LightBreakDynamicComponent() {
        }
        LightBreakDynamicComponent.prototype.ngOnInit = function () {
        };
        return LightBreakDynamicComponent;
    }());
    LightBreakDynamicComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-LightBreakDynamic',
                    template: "\n    <p>\n      light-break-dynamic works!\n    </p>\n  "
                },] }
    ];
    LightBreakDynamicComponent.ctorParameters = function () { return []; };

    var ContentPopupComponent = /** @class */ (function () {
        function ContentPopupComponent() {
            this.header = "header";
            this.footer = "";
            this.elementName = 'default';
            this.closeByButtonOnly = false;
            this.customClass = null;
            this.noScroll = false;
            this.callBack = new i0.EventEmitter();
            this.display = false;
            this.overContent = false;
            this.animationState = 'out';
            this.onAnimation = false;
            this.closeDelay = rxjs.timer(400);
        }
        ContentPopupComponent.prototype.ngOnInit = function () {
        };
        ContentPopupComponent.prototype.closePopup = function (forceClose) {
            if (forceClose === void 0) { forceClose = false; }
            if (((!this.overContent && !this.closeByButtonOnly) || forceClose) && !this.onAnimation) {
                this.animationState = 'out';
                this.display = false;
                this.callbackProcess('close');
            }
        };
        ContentPopupComponent.prototype.showPopup = function () {
            var _this = this;
            this.animationState = 'in';
            this.display = true;
            this.callbackProcess('open');
            this.onAnimation = true;
            this.closeDelay.subscribe(function () {
                _this.onAnimation = false;
            });
        };
        ContentPopupComponent.prototype.releaseContent = function () {
            this.overContent = true;
        };
        ContentPopupComponent.prototype.lockContent = function () {
            this.overContent = false;
        };
        ContentPopupComponent.prototype.callbackProcess = function (action) {
            this.callBack.emit({
                element: "popUp",
                name: this.elementName,
                action: action,
            });
        };
        return ContentPopupComponent;
    }());
    ContentPopupComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-content-popup',
                    template: "<div class=\"lb9-dim\" [@fadeInOut]=\"animationState\" (click)=\"closePopup()\">\n    <div class=\"popupPanel\">\n        <div class=\"popupAlign\">\n            <div class=\"popupContentTable\">\n                <div class=\"popupContentRow\">\n                    <div class=\"popupContentCell\">\n                        <div class=\"popupContent{{customClass ? ' '+customClass: ''}}\" (mouseover)=\"releaseContent()\" (mouseout)=\"lockContent()\">\n                            <div class=\"closeBtn\">\n                                <abbr title=\"Close\">\n                                    <span class=\"glyphicon glyphicon-remove\" (click)=\"closePopup(true)\"></span>\n                                </abbr>\n                            </div>\n                            <div *ngIf=\"header.length > 0\" class=\"popupHeader\" [innerHTML]=\"header\">\n                            </div>\n                            <div class=\"popupContentDetail{{noScroll ? ' noScroll':' scroll'}}\">\n                                <ng-content>\n                                </ng-content>\n                            </div>\n                            <div *ngIf=\"footer.length > 0\" class=\"popupFooter\" [innerHTML]=\"footer\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                    animations: [FadeInOutAnimation],
                    styles: [".lb9-dim{width:100vw;height:100vh;position:fixed;top:0px;left:0px;background:rgba(0,0,0,.2);z-index:99}.show{display:block}.hide{display:none}.popupPanel{max-width:95vw;max-height:95vh;margin:2.5vh auto;height:95vh}.popupPanel .popupAlign .popupContentTable{display:table;margin:0 auto}.popupPanel .popupAlign .popupContentTable .popupContentRow{display:table-row}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell{display:table-cell;vertical-align:middle;height:95vh;max-height:95vh}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent{position:relative}.popupPanel .popupAlign .popupContentTable .popupContentRow .popupContentCell .popupContent .closeBtn{cursor:pointer}\n"]
                },] }
    ];
    ContentPopupComponent.ctorParameters = function () { return []; };
    ContentPopupComponent.propDecorators = {
        header: [{ type: i0.Input }],
        footer: [{ type: i0.Input }],
        elementName: [{ type: i0.Input }],
        closeByButtonOnly: [{ type: i0.Input }],
        customClass: [{ type: i0.Input }],
        noScroll: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var SlideInOutAnimation = [
        animations.trigger('slideInOut', [
            animations.state('in', animations.style({
                'max-height': '70vh', 'opacity': '1', 'visibility': 'visible'
            })),
            animations.state('out', animations.style({
                'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
            })),
            animations.transition('in => out', [animations.group([
                    animations.animate('400ms ease-in-out', animations.style({
                        'opacity': '0'
                    })),
                    animations.animate('600ms ease-in-out', animations.style({
                        'max-height': '0px'
                    })),
                    animations.animate('700ms ease-in-out', animations.style({
                        'visibility': 'hidden'
                    }))
                ])]),
            animations.transition('out => in', [animations.group([
                    animations.animate('1ms ease-in-out', animations.style({
                        'visibility': 'visible'
                    })),
                    animations.animate('600ms ease-in-out', animations.style({
                        'max-height': '70vh'
                    })),
                    animations.animate('800ms ease-in-out', animations.style({
                        'opacity': '1'
                    }))
                ])])
        ]),
    ];

    var CollapseComponent = /** @class */ (function () {
        function CollapseComponent() {
            this.header = 'Collapse';
            this.callBack = new i0.EventEmitter();
            this.animationState = 'out';
            this.active = false;
            this.onAction = false;
            this.timeDelay = rxjs.timer(1000);
        }
        CollapseComponent.prototype.ngOnInit = function () {
        };
        CollapseComponent.prototype.toggleShowDiv = function () {
            var _this = this;
            if (this.onAction === false) {
                if (this.animationState === 'out') {
                    this.animationState = 'in';
                    this.active = true;
                }
                else {
                    this.animationState = 'out';
                    this.active = false;
                }
                this.onAction = true;
                this.timeDelay.subscribe(function () {
                    _this.onAction = false;
                });
            }
        };
        return CollapseComponent;
    }());
    CollapseComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-collapse',
                    template: "<div class=\"lbCollapse\">\n    <div class=\"collapseHeaderPanel{{active ? ' active':''}}\" (click)=\"toggleShowDiv()\">\n        <div class=\"collapseHeader\" [innerHTML]=\"header\">\n\n        </div>\n        <div class=\"collapseArrow\"></div>\n    </div>\n    <div class=\"collapseContent\" [@slideInOut]=\"animationState\">\n        <ng-content>\n\n        </ng-content>\n    </div>\n</div>\n",
                    animations: [SlideInOutAnimation],
                    styles: [".lbCollapse{margin-top:10px}.lbCollapse .collapseHeaderPanel{position:relative}.lbCollapse .collapseHeaderPanel .collapseArrow{position:absolute;right:0px;top:0px;width:10px;height:10px;border-top:4px solid #666;border-right:4px solid #666;transform:rotate(135deg);transition:all .5s}.lbCollapse .active .collapseArrow{transform:rotate(-45deg);transition:all .5s}.lbCollapse .collapseContent{width:100%;overflow:auto}\n"]
                },] }
    ];
    CollapseComponent.ctorParameters = function () { return []; };
    CollapseComponent.propDecorators = {
        header: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var StepTabComponent = /** @class */ (function () {
        function StepTabComponent() {
            this.tabList = [];
            this.stepClick = false;
            this.callBack = new i0.EventEmitter();
            this.calculateCss = '';
            this.objKeys = Object.keys;
            this.activeStep = 0;
        }
        StepTabComponent.prototype.ngOnInit = function () {
            this.lastTab = this.tabList.length - 1;
            var percentWidth = Math.floor(100 / this.tabList.length);
            this.calculateCss = 'calc(' + String(percentWidth) + '% - 2px)';
        };
        StepTabComponent.prototype.getActive = function (tabNumber) {
            if (tabNumber == this.activeStep) {
                return "stepShow";
            }
            else {
                return "stepHide";
            }
        };
        StepTabComponent.prototype.prevStep = function () {
            if (this.activeStep > 0) {
                this.activeStep--;
                this.callBack.emit({
                    action: 'stepChange',
                    step: this.activeStep
                });
            }
        };
        StepTabComponent.prototype.nextStep = function () {
            if (this.activeStep < (this.tabList.length - 1)) {
                this.activeStep++;
                this.callBack.emit({
                    action: 'stepChange',
                    step: this.activeStep
                });
            }
        };
        StepTabComponent.prototype.gotoStep = function (stepIndex) {
            if (this.tabList[stepIndex]) {
                this.activeStep = stepIndex;
                this.callBack.emit({
                    action: 'stepChange',
                    step: this.activeStep
                });
            }
        };
        StepTabComponent.prototype.gotoStepClick = function (stepIndex) {
            if (this.tabList[stepIndex] && this.stepClick) {
                this.activeStep = stepIndex;
                this.callBack.emit({
                    action: 'stepChange',
                    step: this.activeStep
                });
            }
        };
        return StepTabComponent;
    }());
    StepTabComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-step-tab',
                    template: "<div class=\"tabStepPanel\">\r\n    <div *ngFor=\"let tabIndex of objKeys(tabList)\" class=\"tabStep{{tabIndex == activeStep ? ' active': tabIndex < activeStep ? ' pass': tabIndex > activeStep ? ' inactive':''}}\" [style.width]=\"tabIndex == lastTab ? '' : calculateCss\" (click)=\"gotoStepClick(tabIndex)\">\r\n        <div [innerHTML]=\"(tabIndex == activeStep ? tabList[tabIndex].header: tabIndex <= activeStep ? tabList[tabIndex].pass ? tabList[tabIndex].pass: tabList[tabIndex].header: tabList[tabIndex].header)\" class=\"header\" id=\"clickStepTab_{{tabIndex}}\"></div>\r\n        <div *ngIf=\"tabIndex != lastTab\" class=\"line\"></div>\r\n        <div class=\"tabLabel{{tabIndex <= activeStep ? ' active':''}}\" id=\"clickStepTab_label_{{tabIndex}}\" [innerHTML]=\"tabList[tabIndex].label\"></div>\r\n    </div>\r\n</div>\r\n",
                    styles: [""]
                },] }
    ];
    StepTabComponent.ctorParameters = function () { return []; };
    StepTabComponent.propDecorators = {
        tabList: [{ type: i0.Input }],
        stepClick: [{ type: i0.Input }],
        callBack: [{ type: i0.Output }]
    };

    var SideBarComponent = /** @class */ (function () {
        function SideBarComponent() {
            this.sideBarWidth = 200;
            this.componentWidth = "100vw";
            this.sideBarWidthCal = "200px";
            this.contentWidthCal = "calc(100vw - 200px)";
            this.leftOffset = "0px";
            this.active = true;
            this.scrollbarOptions = { axis: 'y', theme: 'minimal-dark' };
        }
        SideBarComponent.prototype.ngOnInit = function () {
            this.sideBarWidthCal = this.sideBarWidth + "px";
            this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
        };
        SideBarComponent.prototype.toggleSideBar = function () {
            if (this.active == true) {
                this.active = false;
                this.componentWidth = "calc(100vw + " + this.sideBarWidth + "px)";
                this.contentWidthCal = "calc(100vw - 0px)";
                this.leftOffset = "-" + this.sideBarWidth + "px";
            }
            else {
                this.active = true;
                this.componentWidth = "calc(100vw + 0px)";
                this.contentWidthCal = "calc(100vw - " + this.sideBarWidth + "px)";
                this.leftOffset = "0px";
            }
        };
        SideBarComponent.prototype.reProcessScrollBar = function () {
            var _this = this;
            rxjs.timer(150).subscribe(function () {
                _this.aNgScrollBar.update();
                rxjs.timer(10).subscribe(function () {
                    _this.fixScrollBar = _this.aNgScrollBar.state.isVerticallyScrollable;
                });
            });
        };
        return SideBarComponent;
    }());
    SideBarComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-side-bar',
                    template: "<div class=\"sbPanel\">\n    <div class=\"sbAlign\">\n        <div class=\"sbContent\">\n            <div class=\"topBar\">\n                <div class=\"expandIcon\" (click)=\"toggleSideBar()\"><span class=\"glyphicon glyphicon-menu-hamburger\"></span>\n                </div>\n                <div class=\"detailBar\">\n                    <ng-content select=\"[topBar]\"></ng-content>\n                </div>\n            </div>\n            <div class=\"contentBody\">\n                <div class=\"contentOffset\" [ngStyle]=\"{width: componentWidth, left: leftOffset}\">\n                    <div class=\"contentPanel\">\n                        <div class=\"leftSide\" [ngStyle]=\"{width: sideBarWidthCal}\">\n                            <ng-scrollbar class=\"fixHeight\">\n                                <div class=\"scrollHeight {{fixScrollBar ? 'fix-ng-scrollbar' : ''}}\" (click)=\"reProcessScrollBar()\">\n                                    <ng-content select=\"[sideBar]\"></ng-content>\n                                </div>\n                            </ng-scrollbar>\n                        </div>\n                        <div class=\"contentAll\" [ngStyle]=\"{width: contentWidthCal}\">\n                            <div class=\"contentBody\">\n                                <div class=\"blockContentSize\" [ngStyle]=\"{width: contentWidthCal}\">\n                                    <ng-content select=\"[contentBody]\"></ng-content>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n",
                    styles: [".sbPanel{display:block;max-height:100vh;overflow:hidden}.sbPanel .sbAlign{position:relative;height:100vh;transition:all .5s}.sbPanel .sbAlign .sbContent{width:100vw;transition:all .5s}.sbPanel .sbAlign .sbContent .topBar{position:relative;height:40px;display:table;width:100%}.sbPanel .sbAlign .sbContent .topBar .expandIcon{color:#3a3a3a;line-height:40px;font-size:22px;padding:0 10px;display:table-cell;vertical-align:top;width:40px;text-align:center}.sbPanel .sbAlign .sbContent .topBar .detailBar{display:table-cell}.sbPanel .sbAlign .sbContent .contentBody{position:relative}.sbPanel .sbAlign .sbContent .contentBody .contentOffset{position:absolute;transition:all .5s;max-height:calc(100vh - 40px);overflow:hidden}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel{display:table-row}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide{display:table-cell;vertical-align:top}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide .fixHeight{position:relative;max-height:calc(100vh - 40px);overflow:auto}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .leftSide .fixHeight .scrollHeight{min-height:calc(100vh - 40px);transition:all .5s}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .contentAll{display:table-cell;overflow:hidden;transition:all .5s}.sbPanel .sbAlign .sbContent .contentBody .contentOffset .contentPanel .contentAll .blockContentSize{transition:all .5s;height:calc(100vh - 40px);overflow:auto}\n"]
                },] }
    ];
    SideBarComponent.ctorParameters = function () { return []; };
    SideBarComponent.propDecorators = {
        sideBarWidth: [{ type: i0.Input }],
        aNgScrollBar: [{ type: i0.ViewChild, args: [ngxScrollbar.NgScrollbar,] }]
    };

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
            this.callback = new i0.EventEmitter();
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
        return CollapseMenuComponent;
    }());
    CollapseMenuComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-collapse-menu',
                    template: "<div *ngFor=\"let menuItem of menuObject.menuList;let i = index\" class=\"menuList\">\r\n    <div (click)=\"activeItem(i)\" *ngIf=\"checkRole(i)\"\r\n         class=\"menuItem{{activeLinkCode && activeLinkCode == menuItem.code && activeLinkCode != '' ? ' menuItemActive':''}}\r\n        {{menuItem.customClass ? ' '+menuItem.customClass:''}}\"\r\n         [ngStyle]=\"{paddingLeft:padding, lineHeight:lineHeight}\">\r\n        <div class=\"menuName\" [innerHTML]=\"menuItem.name\"></div>\r\n        <div [innerHTML]=\"menuItem.numberOfData\" *ngIf=\"menuItem.numberOfData\"></div>\r\n        <div class=\"menuArrow{{menuItem.active ? ' menuArrowExpand':''}}\" *ngIf=\"menuItem.children\"></div>\r\n    </div>\r\n    <div *ngIf=\"menuItem.children\" class=\"menuChild\" [ngStyle]=\"{height:getHeight(i)}\">\r\n        <lb9-collapse-menu [menuObject]=\"menuItem.children\"\r\n                           [activeLinkCode]=\"activeLinkCode\"\r\n                           [level]=\"level+1\"\r\n                           [option]=\"option\"\r\n                           [role]=\"role\"\r\n                           (callback)=\"childCallback($event)\"></lb9-collapse-menu>\r\n    </div>\r\n</div>\r\n",
                    styles: [""]
                },] }
    ];
    CollapseMenuComponent.ctorParameters = function () { return []; };
    CollapseMenuComponent.propDecorators = {
        menuObject: [{ type: i0.Input }],
        role: [{ type: i0.Input }],
        activeLinkCode: [{ type: i0.Input }],
        level: [{ type: i0.Input }],
        option: [{ type: i0.Input }],
        callback: [{ type: i0.Output }]
    };

    var FormHttpRequestService = /** @class */ (function () {
        function FormHttpRequestService(http) {
            this.http = http;
            this.apiUrl = "";
            this.formConfigUrl = "";
            this.checkHash = null;
            this.httpOption = {
                headers: new i1.HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            };
        }
        FormHttpRequestService.prototype.processCheckHash = function () {
            var _this = this;
            this.getCheckHash().subscribe(function (resp) {
                _this.checkHash = resp;
            });
        };
        FormHttpRequestService.prototype.getHash = function (formName) {
            if (this.checkHash && this.checkHash[formName]) {
                return this.checkHash[formName];
            }
            return null;
        };
        FormHttpRequestService.prototype.getCheckHash = function () {
            var url = this.formConfigUrl + "_check-hash";
            return this.http.post(url, null, this.httpOption);
        };
        FormHttpRequestService.prototype.setToken = function (token) {
            this.httpOption.headers = new i1.HttpHeaders({
                'Content-Type': 'application/json',
                'Token': token
            });
        };
        FormHttpRequestService.prototype.setApiUrl = function (url) {
            this.apiUrl = url;
        };
        FormHttpRequestService.prototype.setFormConfigUrl = function (url) {
            if (!String(url).match(/\/$/)) {
                url = url + "/";
            }
            this.formConfigUrl = url;
            this.processCheckHash();
        };
        FormHttpRequestService.prototype.post = function (payload) {
            var url = this.apiUrl;
            return this.http.post(url, payload, this.httpOption);
        };
        FormHttpRequestService.prototype.getConfig = function (module) {
            var url = this.formConfigUrl + module;
            return this.http.post(url, null, this.httpOption);
        };
        return FormHttpRequestService;
    }());
    FormHttpRequestService.??prov = i0__namespace.????defineInjectable({ factory: function FormHttpRequestService_Factory() { return new FormHttpRequestService(i0__namespace.????inject(i1__namespace.HttpClient)); }, token: FormHttpRequestService, providedIn: "root" });
    FormHttpRequestService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    FormHttpRequestService.ctorParameters = function () { return [
        { type: i1.HttpClient }
    ]; };

    var AutoFormMasterFunctionComponent = /** @class */ (function () {
        function AutoFormMasterFunctionComponent(httpRequest, lockScreen) {
            this.httpRequest = httpRequest;
            this.lockScreen = lockScreen;
            this.saveControlFunction = function (mode, formName, param) {
                return true;
            };
            this.refinedListData = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.refinedSaveData = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.refinedDeleteData = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.refinedMasterData = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.refinedListPayload = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.refinedError = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.refinedMasterDataPayload = function (data, formName, provideData) {
                if (formName === void 0) { formName = ""; }
                if (provideData === void 0) { provideData = null; }
                return data;
            };
            this.provideData = {};
            this.formName = 'test';
            this.button = {
                add: "Add",
                save: "Save",
                clear: "Clear",
                reset: "Reset",
                search: "Search",
                confirm: "Confirm",
                cancel: "Cancel"
            };
            this.callback = new i0.EventEmitter();
            this.subscription = new rxjs.Subscription();
            this.order = [];
            this.mode = "add";
            this.form = {
                form: {},
                data: []
            };
            this.filterMode = "single";
            this.filter = {
                form: {
                    option: {
                        mode: "add",
                        customClass: "",
                        labelAlign: "left",
                        enableAnimation: false
                    },
                    containerList: [
                        {
                            containerName: "singleFilter",
                            customClass: "",
                            columnSpan: "1/1",
                            fieldList: [
                                {
                                    fieldName: "filter",
                                    label: "Filter:",
                                    columnPerLine: 1,
                                    type: "textBox",
                                    default: [
                                        ""
                                    ],
                                    inputPattern: ".*",
                                    valuePattern: ".*",
                                    validateWhileKeyPress: false,
                                    multiValue: false,
                                    note: "",
                                    readonly: false,
                                    require: false,
                                    maxLength: 255,
                                    labelWidth: 45
                                },
                            ]
                        }
                    ]
                },
                data: []
            };
            this.model = {};
            this.dataList = {};
            this.config = {};
            this.page = 0;
            this.limit = 0;
            this.tempDelete = null;
            this.masterData = {};
            this.errorContent = "";
            this.tempFilter = null;
        }
        AutoFormMasterFunctionComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subscription.add(rxjs.timer(100).subscribe(function () {
                _this.getConfig();
            }));
        };
        AutoFormMasterFunctionComponent.prototype.getConfig = function () {
            var _this = this;
            var savedConfigRaw = localStorage.getItem("masterFormData");
            var savedConfig = null;
            var parseConfig = null;
            if (savedConfigRaw !== null) {
                parseConfig = JSON.parse(savedConfigRaw);
            }
            if (parseConfig && parseConfig[this.formName]) {
                savedConfig = parseConfig[this.formName];
            }
            var checkHash = this.httpRequest.getHash(this.formName);
            this.lockScreen.lockScreen();
            if (checkHash === null || savedConfig == null || (savedConfig && checkHash !== savedConfig.hash)) {
                this.subscription.add(this.httpRequest.getConfig(this.formName).subscribe(function (resp) {
                    _this.lockScreen.unLockScreen();
                    if (resp.status && resp.status == true) {
                        _this.config = resp.config;
                        var saveConfig = {
                            hash: checkHash,
                            config: _this.config
                        };
                        if (!parseConfig) {
                            parseConfig = {};
                        }
                        parseConfig[_this.formName] = saveConfig;
                        localStorage.setItem("masterFormData", JSON.stringify(parseConfig));
                        _this.processConfig();
                    }
                }));
            }
            else {
                this.config = savedConfig.config;
                this.processConfig();
            }
        };
        AutoFormMasterFunctionComponent.prototype.processConfig = function () {
            var _this = this;
            if (this.config.list) {
                this.dataList = this.config.list;
            }
            if (this.config.model) {
                this.model = this.config.model;
            }
            if (this.config.form) {
                this.form.form = this.config.form;
                this.subscription.add(rxjs.timer(250).subscribe(function () {
                    if (_this.form.data.length == 0) {
                        _this.dynamicForm.addRow();
                    }
                }));
            }
            if (this.config.filterAdvance) {
                this.subscription.add(rxjs.timer(250).subscribe(function () {
                    var advanceFilter = {
                        containerName: "advanceFilter",
                        customClass: "hideFilter",
                        columnSpan: "1/1",
                        fieldList: _this.config.filterAdvance.fieldList
                    };
                    _this.filter.form.containerList.push(advanceFilter);
                    _this.filterForm.reRenderForm();
                    _this.filterForm.addRow();
                    _this.processLoadMasterData();
                }));
            }
            else {
                this.subscription.add(rxjs.timer(500).subscribe(function () {
                    _this.filterForm.addRow();
                    _this.processLoadMasterData();
                }));
            }
            if (this.config.button) {
                this.button = this.config.button;
            }
        };
        AutoFormMasterFunctionComponent.prototype.processLoadMasterData = function () {
            var _this = this;
            if (this.config.masterData) {
                var payload = {
                    dataList: []
                };
                for (var fieldName in this.config.masterData) {
                    payload.dataList.push({
                        moduleName: this.config.masterData[fieldName]
                    });
                }
                payload = this.refinedMasterDataPayload(payload, this.formName, this.provideData);
                this.lockScreen.lockScreen();
                this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                    _this.lockScreen.unLockScreen();
                    if (resp && resp.status == true) {
                        for (var fieldName in _this.config.masterData) {
                            _this.masterData[fieldName] = resp.data[_this.config.masterData[fieldName]];
                        }
                        _this.masterData = _this.refinedMasterData(_this.masterData, _this.formName, _this.provideData);
                        _this.processAssignMasterData();
                    }
                    else {
                        alert("Error loading master data.");
                    }
                }));
            }
        };
        AutoFormMasterFunctionComponent.prototype.processAssignMasterData = function () {
            var mapSetAttr = {};
            for (var fieldName in this.masterData) {
                mapSetAttr[fieldName] = {
                    valueList: this.masterData[fieldName]
                };
            }
            this.dynamicForm.mapSetAttribute(mapSetAttr);
            this.filterForm.mapSetAttribute(mapSetAttr);
            this.processLoadList(1, (this.dataList.rowLimit ? this.dataList.rowLimit : 10), false);
        };
        AutoFormMasterFunctionComponent.prototype.processLoadList = function (page, limit, filter) {
            var e_1, _a;
            var _this = this;
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 10; }
            if (filter === void 0) { filter = true; }
            this.page = page;
            this.limit = limit;
            var filterParam = this.filterForm.getParam();
            if (this.config.module && this.config.module.list) {
                var payload = {
                    moduleName: this.config.module.list,
                    limit: limit,
                    page: page
                };
                if (filter && this.filterMode == "single" && filterParam.filter && filterParam.filter.length > 0) {
                    var param = {};
                    try {
                        for (var _b = __values(this.config.filter.paramList), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var paramName = _c.value;
                            param[paramName] = filterParam.filter;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    payload["param"] = param;
                    payload["condition"] = this.config.filter.condition;
                }
                else if (filter && this.filterMode == "multiple") {
                    payload["param"] = filterParam;
                    payload["condition"] = this.config.filterAdvance.condition;
                }
                if (this.order.length > 0) {
                    payload["sort"] = this.order;
                }
                payload = this.refinedListPayload(payload, this.formName, this.provideData);
                this.lockScreen.lockScreen();
                this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                    _this.lockScreen.unLockScreen();
                    if (resp.status == true) {
                        if (resp.data[_this.config.module.list] && resp.data[_this.config.module.list].length > 0) {
                            _this.dataList.data = _this.refinedListData(resp.data[_this.config.module.list], _this.formName, _this.provideData);
                            _this.dataList.pagination = resp.data[_this.config.module.list + "Pagination"];
                        }
                        else {
                            if (_this.page > 1) {
                                _this.page--;
                                _this.dynamicTable.currentPage = _this.page;
                                _this.processLoadList(_this.page, _this.limit);
                            }
                            else {
                                _this.dataList.data = null;
                                _this.dataList.pagination = resp.data[_this.config.module.list + "Pagination"];
                            }
                        }
                    }
                }));
            }
        };
        AutoFormMasterFunctionComponent.prototype.processListCallback = function (e) {
            if (e.action == 'page') {
                this.processLoadList(e.pageNumber, e.limit);
            }
            else if (e.action == 'edit') {
                this.loadEditData(e.primaryKey);
            }
            else if (e.action == 'delete') {
                this.tempDelete = e.primaryKey;
                this.confirmPopUp.showPopup();
            }
            else if (e.action == "sort") {
                this.order = [];
                this.order.push({
                    fieldName: e.fieldName,
                    order: e.order
                });
                this.processLoadList(this.page, this.limit);
            }
            this.callback.emit({
                event: "listEvent",
                formName: this.formName,
                data: e
            });
        };
        AutoFormMasterFunctionComponent.prototype.confirmDelete = function () {
            this.processDeleteData(this.tempDelete);
            this.confirmPopUp.closePopup(true);
        };
        AutoFormMasterFunctionComponent.prototype.processDeleteData = function (primaryKey) {
            var _this = this;
            if (this.config.module && this.config.module.delete) {
                var refinedData = this.refinedDeleteData(primaryKey, this.formName, this.provideData);
                var payload = {
                    moduleName: this.config.module.delete,
                    param: refinedData
                };
                this.lockScreen.lockScreen();
                this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                    _this.lockScreen.unLockScreen();
                    if (resp.status == true) {
                        _this.processLoadList(_this.page, _this.limit);
                        _this.callback.emit({
                            event: "deleteSuccess",
                            formName: _this.formName,
                            data: primaryKey
                        });
                    }
                    else {
                        alert("Can't load delete data.");
                    }
                }));
            }
        };
        AutoFormMasterFunctionComponent.prototype.openAddForm = function () {
            this.mode = 'add';
            this.dynamicForm.setMode('add');
            this.dynamicForm.setDefault();
            this.formPopUp.showPopup();
            this.callback.emit({
                event: "addOpen",
                formName: this.formName,
                data: null
            });
        };
        AutoFormMasterFunctionComponent.prototype.loadEditData = function (primaryKey) {
            var _this = this;
            if (this.config.module && this.config.module.list) {
                var payload = {
                    moduleName: this.config.module.list,
                    param: primaryKey
                };
                this.lockScreen.lockScreen();
                this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                    _this.lockScreen.unLockScreen();
                    if (resp.status == true) {
                        var mapSet = resp.data[_this.config.module.list][0];
                        _this.mode = 'edit';
                        _this.dynamicForm.setMode('edit');
                        _this.dynamicForm.mapSetValue(mapSet, 0);
                        _this.dynamicForm.setSavePoint();
                        _this.formPopUp.showPopup();
                        _this.callback.emit({
                            event: "editOpen",
                            formName: _this.formName,
                            data: null
                        });
                    }
                    else {
                        alert("Can't load edit data.");
                    }
                }));
            }
        };
        AutoFormMasterFunctionComponent.prototype.clearForm = function () {
            this.dynamicForm.setDefault();
        };
        AutoFormMasterFunctionComponent.prototype.resetForm = function () {
            this.dynamicForm.getSavePoint();
        };
        AutoFormMasterFunctionComponent.prototype.save = function () {
            var _this = this;
            var param = this.refinedSaveData(this.dynamicForm.getParam(), this.formName, this.provideData);
            if (this.dynamicForm.checkRequireAll() && this.dynamicForm.checkValidateAll() && this.saveControlFunction(this.mode, this.formName, param)) {
                var payload = {};
                if (this.mode == 'add' && this.config.module.add) {
                    payload = {
                        moduleName: this.config.module.add,
                        param: param
                    };
                }
                else if (this.mode == 'edit' && this.config.module.edit) {
                    payload = {
                        moduleName: this.config.module.edit,
                        param: param
                    };
                }
                this.lockScreen.lockScreen();
                this.subscription.add(this.httpRequest.post(payload).subscribe(function (resp) {
                    _this.lockScreen.unLockScreen();
                    if (resp && resp.status == true) {
                        _this.clearFilter();
                        _this.processLoadList(_this.page, _this.limit);
                        _this.formPopUp.closePopup(true);
                        _this.callback.emit({
                            event: "saveSuccess",
                            formName: _this.formName,
                            data: null
                        });
                    }
                    else {
                        alert("Error can't save data.");
                    }
                }, function (error) {
                    _this.lockScreen.unLockScreen();
                    _this.processError(error);
                }));
            }
        };
        AutoFormMasterFunctionComponent.prototype.switchFilterMode = function () {
            if (this.filterMode === "single") {
                this.filterMode = "multiple";
                if (this.config.filterAdvance.option && this.config.filterAdvance.option.labelAlign) {
                    this.filter.form.option.labelAlign = this.config.filterAdvance.option.labelAlign;
                }
                this.filterForm.setContainerAttribute("singleFilter", "customClass", "hideFilter");
                this.filterForm.setContainerAttribute("advanceFilter", "customClass", "");
            }
            else {
                this.filter.form.option.labelAlign = "left";
                this.filterMode = "single";
                this.filterForm.setContainerAttribute("singleFilter", "customClass", "");
                this.filterForm.setContainerAttribute("advanceFilter", "customClass", "hideFilter");
            }
        };
        AutoFormMasterFunctionComponent.prototype.processFilter = function () {
            var param = this.filterForm.getParam();
            if (JSON.stringify(this.tempFilter) !== JSON.stringify(param)) {
                this.tempFilter = param;
                this.page = 1;
                this.dynamicTable.currentPage = 1;
            }
            this.processLoadList(this.page, this.limit);
        };
        AutoFormMasterFunctionComponent.prototype.clearFilter = function () {
            this.filterForm.setDefault();
            this.processFilter();
        };
        AutoFormMasterFunctionComponent.prototype.actKnownError = function () {
            this.errorPopUp.closePopup(true);
        };
        AutoFormMasterFunctionComponent.prototype.processError = function (error) {
            var e_2, _a;
            error = this.refinedError(error, this.formName, this.provideData);
            var errorMsg = "";
            if (error.error.message) {
                if (typeof (error.error.message) === "object" && error.error.message.length > 0) {
                    var errorArray = [];
                    try {
                        for (var _b = __values(error.error.message), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var errorDataRow = _c.value;
                            if (typeof (errorDataRow) === "object") {
                                errorArray.push(JSON.stringify(errorDataRow));
                            }
                            else if (typeof (errorDataRow) === "string") {
                                errorArray.push(errorDataRow);
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
                    errorMsg = errorArray.join("<br>");
                }
                else {
                    errorMsg = error.error.message;
                }
            }
            else {
                errorMsg = error.message;
            }
            this.errorContent = errorMsg;
            this.errorPopUp.showPopup();
        };
        AutoFormMasterFunctionComponent.prototype.check = function () {
            console.log(this.form);
        };
        AutoFormMasterFunctionComponent.prototype.ngOnDestroy = function () {
            this.subscription.unsubscribe();
        };
        return AutoFormMasterFunctionComponent;
    }());
    AutoFormMasterFunctionComponent.decorators = [
        { type: i0.Component, args: [{
                    template: ''
                },] }
    ];
    AutoFormMasterFunctionComponent.ctorParameters = function () { return [
        { type: FormHttpRequestService },
        { type: LockScreenService }
    ]; };
    AutoFormMasterFunctionComponent.propDecorators = {
        formPopUp: [{ type: i0.ViewChild, args: ["formPopUp",] }],
        confirmPopUp: [{ type: i0.ViewChild, args: ["confirmPopUp",] }],
        errorPopUp: [{ type: i0.ViewChild, args: ["errorPopUp",] }],
        dynamicForm: [{ type: i0.ViewChild, args: ["dynamicForm",] }],
        filterForm: [{ type: i0.ViewChild, args: ["filterForm",] }],
        dynamicTable: [{ type: i0.ViewChild, args: ["dynamicTable",] }],
        saveControlFunction: [{ type: i0.Input }],
        refinedListData: [{ type: i0.Input }],
        refinedSaveData: [{ type: i0.Input }],
        refinedDeleteData: [{ type: i0.Input }],
        refinedMasterData: [{ type: i0.Input }],
        refinedListPayload: [{ type: i0.Input }],
        refinedError: [{ type: i0.Input }],
        refinedMasterDataPayload: [{ type: i0.Input }],
        provideData: [{ type: i0.Input }],
        formName: [{ type: i0.Input }],
        button: [{ type: i0.Input }],
        callback: [{ type: i0.Output }]
    };

    var AutoFormComponent = /** @class */ (function (_super) {
        __extends(AutoFormComponent, _super);
        function AutoFormComponent(http, lockScr) {
            var _this = _super.call(this, http, lockScr) || this;
            _this.http = http;
            _this.lockScr = lockScr;
            return _this;
        }
        return AutoFormComponent;
    }(AutoFormMasterFunctionComponent));
    AutoFormComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-auto-form',
                    template: "<div class=\"autoForm\">\n    <div class=\"searchPanel\">\n        <div class=\"searchPanelRow{{(config.module && config.module.list && config.filter && config.filter.paramList && config.filter.paramList.length > 0 ? '': ' hide')}}\">\n            <div class=\"searchInput\">\n                <ng-container *ngIf=\"filter.form && filter.form.containerList\">\n                    <lb9-dynamic-form #filterForm [formCreation]=\"filter\" [model]=\"model\"></lb9-dynamic-form>\n                </ng-container>\n            </div>\n            <div class=\"searchAdvBtn\" *ngIf=\"config.filterAdvance\">\n                <div class=\"more\" (click)=\"switchFilterMode()\">\n                    <span class=\"glyphicon glyphicon-list\"></span>\n                </div>\n            </div>\n            <div class=\"searchButton\">\n                <div class=\"btn-style-dynamic\" [innerHTML]=\"button.search\" (click)=\"processFilter()\"></div>\n                <div class=\"btn-style-dynamic clearBtn\" [innerHTML]=\"button.clear\" (click)=\"clearFilter()\"></div>\n            </div>\n\n        </div>\n    </div>\n    <div *ngIf=\"config.module && config.module.add\" class=\"btn-style-dynamic\" (click)=\"openAddForm()\" [innerHTML]=\"button.add\"></div>\n    <div class=\"{{config.module && config.module.list ? '': ' hide'}}\">\n        <lb9-dynamic-table #dynamicTable [tableCreation]=\"dataList\" (callBack)=\"processListCallback($event)\"></lb9-dynamic-table>\n    </div>\n</div>\n<lb9-content-popup #formPopUp [header]=\"(mode == 'add' ? (config.content ? config.content.addHeader : '') : (config.content ? config.content.editHeader : ''))\"\n                   [closeByButtonOnly]=\"true\"\n                   [noScroll]=\"true\">\n    <ng-container *ngIf=\"form.form && form.form.containerList\">\n        <lb9-dynamic-form  #dynamicForm [formCreation]=\"form\" [model]=\"model\"></lb9-dynamic-form>\n        <div class=\"btnPanel\">\n            <div class=\"btn-style-dynamic\" (click)=\"save()\" [innerHTML]=\"button.save\"></div>\n            <div *ngIf=\"mode == 'add'\" class=\"btn-style-dynamic clearBtn\" (click)=\"clearForm()\" [innerHTML]=\"button.clear\"></div>\n            <div *ngIf=\"mode == 'edit'\" class=\"btn-style-dynamic clearBtn\" (click)=\"resetForm()\" [innerHTML]=\"button.reset\"></div>\n        </div>\n    </ng-container>\n</lb9-content-popup>\n<lb9-content-popup #confirmPopUp [header]=\"config.content ? config.content.confirmDeleteHeader : ''\">\n    <div class=\"btn-style-dynamic\" (click)=\"confirmDelete()\" [innerHTML]=\"button.confirm\"></div>\n    <div class=\"btn-style-dynamic clearBtn\" (click)=\"confirmPopUp.closePopup(true)\" [innerHTML]=\"button.cancel\"></div>\n</lb9-content-popup>\n<lb9-content-popup #errorPopUp [header]=\"'Error'\">\n    <div>{{errorContent}}</div>\n    <div class=\"btnPanel\">\n        <div class=\"btn-style-dynamic text-center\" (click)=\"actKnownError()\" [innerHTML]=\"button.confirm\"></div>\n    </div>\n</lb9-content-popup>\n",
                    styles: [""]
                },] }
    ];
    AutoFormComponent.ctorParameters = function () { return [
        { type: FormHttpRequestService },
        { type: LockScreenService }
    ]; };

    var ContentPanelComponent = /** @class */ (function () {
        function ContentPanelComponent() {
            this.panelData = null;
        }
        ContentPanelComponent.prototype.ngOnInit = function () {
            // let htmlHead = document.getElementsByTagName("header")/
            var styleTag = document.createElement("style");
            styleTag.id = "style_" + this.panelData.id;
            styleTag.innerText = this.panelData.css;
            document.head.appendChild(styleTag);
        };
        ContentPanelComponent.prototype.ngOnDestroy = function () {
            var destroyId = document.getElementById("style_" + this.panelData.id);
            destroyId.remove();
        };
        return ContentPanelComponent;
    }());
    ContentPanelComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lb9-content-panel',
                    template: "<div id=\"{{panelData.id}}\">\n    <div [innerHTML]=\"panelData.html\">\n    </div>\n</div>\n",
                    styles: [""]
                },] }
    ];
    ContentPanelComponent.ctorParameters = function () { return []; };
    ContentPanelComponent.propDecorators = {
        panelData: [{ type: i0.Input }]
    };

    var LightBreakDynamicModule = /** @class */ (function () {
        function LightBreakDynamicModule() {
        }
        return LightBreakDynamicModule;
    }());
    LightBreakDynamicModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        ngxScrollbar.NgScrollbarModule,
                        i1.HttpClientModule
                    ],
                    declarations: [
                        DynamicInputComponent,
                        LabelComponent,
                        TextBoxComponent,
                        InputComponent,
                        DynamicFormComponent,
                        CheckBoxComponent,
                        TextAreaComponent,
                        SelectBoxComponent,
                        DynamicContainerComponent,
                        HiddenComponent,
                        FileUploadComponent,
                        ImageComponent,
                        AutoCompleteComponent,
                        DynamicTableComponent,
                        TableComponent,
                        PagingComponent,
                        DynamicBehaviorComponent,
                        ErrorMsgBubbleComponent,
                        ButtonComponent,
                        ButtonIconComponent,
                        DynamicTabComponent,
                        DynamicPopupComponent,
                        SwappingBoxComponent,
                        MapValueComponent,
                        RadioComponent,
                        P2PanelComponent,
                        DynamicFormFrameComponent,
                        DateComponent,
                        DatePickerComponent,
                        DynamicContainerTableComponent,
                        DynamicFormLabelPanelComponent,
                        DynamicFormRowComponent,
                        PanelMainComponent,
                        PanelChildComponent,
                        ButtonIconComponent,
                        LightBreakDynamicComponent,
                        ContentPopupComponent,
                        CollapseComponent,
                        StepTabComponent,
                        SideBarComponent,
                        CollapseMenuComponent,
                        AutoFormMasterFunctionComponent,
                        AutoFormComponent,
                        ColorSelectComponent,
                        ContentPanelComponent
                    ],
                    exports: [
                        DynamicInputComponent,
                        LabelComponent,
                        TextBoxComponent,
                        InputComponent,
                        DynamicFormComponent,
                        CheckBoxComponent,
                        TextAreaComponent,
                        SelectBoxComponent,
                        DynamicContainerComponent,
                        HiddenComponent,
                        FileUploadComponent,
                        ImageComponent,
                        AutoCompleteComponent,
                        DynamicTableComponent,
                        TableComponent,
                        PagingComponent,
                        DynamicBehaviorComponent,
                        ErrorMsgBubbleComponent,
                        ButtonComponent,
                        ButtonIconComponent,
                        DynamicTabComponent,
                        DynamicPopupComponent,
                        SwappingBoxComponent,
                        MapValueComponent,
                        RadioComponent,
                        P2PanelComponent,
                        DynamicFormFrameComponent,
                        DateComponent,
                        DatePickerComponent,
                        DynamicContainerTableComponent,
                        DynamicFormLabelPanelComponent,
                        DynamicFormRowComponent,
                        PanelMainComponent,
                        PanelChildComponent,
                        ngxScrollbar.NgScrollbarModule,
                        LightBreakDynamicComponent,
                        ContentPopupComponent,
                        CollapseComponent,
                        StepTabComponent,
                        SideBarComponent,
                        CollapseMenuComponent,
                        AutoFormComponent,
                        ContentPanelComponent
                    ],
                    schemas: [
                        i0.CUSTOM_ELEMENTS_SCHEMA,
                        i0.NO_ERRORS_SCHEMA
                    ],
                    providers: []
                },] }
    ];

    var MenuService = /** @class */ (function () {
        function MenuService() {
            this.emitMenu = new i0.EventEmitter();
            this.menuData = "";
        }
        MenuService.prototype.setMenu = function (menu) {
            this.menuData = menu;
            this.emitMenu.emit(this.menuData);
        };
        MenuService.prototype.getMenu = function () {
            return this.menuData;
        };
        return MenuService;
    }());
    MenuService.??prov = i0__namespace.????defineInjectable({ factory: function MenuService_Factory() { return new MenuService(); }, token: MenuService, providedIn: "root" });
    MenuService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    MenuService.ctorParameters = function () { return []; };

    /*
     * Public API Surface of light-break-dynamic
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AutoCompleteComponent = AutoCompleteComponent;
    exports.AutoFormComponent = AutoFormComponent;
    exports.AutoFormMasterFunctionComponent = AutoFormMasterFunctionComponent;
    exports.ButtonComponent = ButtonComponent;
    exports.ButtonIconComponent = ButtonIconComponent;
    exports.CheckBoxComponent = CheckBoxComponent;
    exports.CollapseComponent = CollapseComponent;
    exports.ContentPopupComponent = ContentPopupComponent;
    exports.DateComponent = DateComponent;
    exports.DatePickerComponent = DatePickerComponent;
    exports.DynamicBehaviorComponent = DynamicBehaviorComponent;
    exports.DynamicContainerComponent = DynamicContainerComponent;
    exports.DynamicContainerTableComponent = DynamicContainerTableComponent;
    exports.DynamicFormComponent = DynamicFormComponent;
    exports.DynamicFormFrameComponent = DynamicFormFrameComponent;
    exports.DynamicFormLabelPanelComponent = DynamicFormLabelPanelComponent;
    exports.DynamicFormRowComponent = DynamicFormRowComponent;
    exports.DynamicInputComponent = DynamicInputComponent;
    exports.DynamicPopupComponent = DynamicPopupComponent;
    exports.DynamicTabComponent = DynamicTabComponent;
    exports.DynamicTableComponent = DynamicTableComponent;
    exports.ErrorMsgBubbleComponent = ErrorMsgBubbleComponent;
    exports.FileUploadComponent = FileUploadComponent;
    exports.FormHttpRequestService = FormHttpRequestService;
    exports.HiddenComponent = HiddenComponent;
    exports.ImageComponent = ImageComponent;
    exports.InputComponent = InputComponent;
    exports.LabelComponent = LabelComponent;
    exports.LightBreakDynamicComponent = LightBreakDynamicComponent;
    exports.LightBreakDynamicModule = LightBreakDynamicModule;
    exports.LockScreenService = LockScreenService;
    exports.MapValueComponent = MapValueComponent;
    exports.MenuService = MenuService;
    exports.P2PanelComponent = P2PanelComponent;
    exports.PagingComponent = PagingComponent;
    exports.PanelChildComponent = PanelChildComponent;
    exports.PanelMainComponent = PanelMainComponent;
    exports.RadioComponent = RadioComponent;
    exports.SelectBoxComponent = SelectBoxComponent;
    exports.StepTabComponent = StepTabComponent;
    exports.SwappingBoxComponent = SwappingBoxComponent;
    exports.TableComponent = TableComponent;
    exports.TextAreaComponent = TextAreaComponent;
    exports.TextBoxComponent = TextBoxComponent;
    exports.??a = AnimationService;
    exports.??b = ColorSelectComponent;
    exports.??c = FadeInOutAnimation;
    exports.??d = SlideInOutAnimation;
    exports.??e = SideBarComponent;
    exports.??f = CollapseMenuComponent;
    exports.??g = ContentPanelComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lightbreak-ng-form.umd.js.map
