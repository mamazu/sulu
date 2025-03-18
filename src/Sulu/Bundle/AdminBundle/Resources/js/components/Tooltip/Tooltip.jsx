"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Popover_1 = __importDefault(require("../Popover"));
const tooltip_scss_1 = __importDefault(require("./tooltip.scss"));
let Tooltip = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _tooltipOpen_decorators;
    let _tooltipOpen_initializers = [];
    let _tooltipOpen_extraInitializers = [];
    let _tooltipRef_decorators;
    let _tooltipRef_initializers = [];
    let _tooltipRef_extraInitializers = [];
    let _setTooltipRef_decorators;
    let _setTooltipRef_initializers = [];
    let _setTooltipRef_extraInitializers = [];
    let _handleEnter_decorators;
    let _handleEnter_initializers = [];
    let _handleEnter_extraInitializers = [];
    let _handleLeave_decorators;
    let _handleLeave_initializers = [];
    let _handleLeave_extraInitializers = [];
    var Tooltip = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.tooltipOpen = __runInitializers(this, _tooltipOpen_initializers, false);
            this.tooltipRef = (__runInitializers(this, _tooltipOpen_extraInitializers), __runInitializers(this, _tooltipRef_initializers, void 0));
            this.setTooltipRef = (__runInitializers(this, _tooltipRef_extraInitializers), __runInitializers(this, _setTooltipRef_initializers, (ref) => {
                this.tooltipRef = ref;
            }));
            this.handleEnter = (__runInitializers(this, _setTooltipRef_extraInitializers), __runInitializers(this, _handleEnter_initializers, () => {
                this.tooltipOpen = true;
            }));
            this.handleLeave = (__runInitializers(this, _handleEnter_extraInitializers), __runInitializers(this, _handleLeave_initializers, () => {
                this.tooltipOpen = false;
            }));
            __runInitializers(this, _handleLeave_extraInitializers);
        }
        render() {
            const { children, label, } = this.props;
            return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <span className={tooltip_scss_1.default.tooltipContainer} onBlur={this.handleLeave} onFocus={this.handleEnter} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} ref={this.setTooltipRef}>
                {this.tooltipRef
                    && <Popover_1.default anchorElement={this.tooltipRef} backdrop={false} horizontalAnchorMode="center" open={this.tooltipOpen} verticalOffset={10}>
                            {(setPopoverRef, styles, verticalPosition) => (<span aria-hidden={true} className={(0, classnames_1.default)(tooltip_scss_1.default.tooltip, tooltip_scss_1.default[verticalPosition])} ref={setPopoverRef} style={styles}>
                                        {label}
                                    </span>)}
                        </Popover_1.default>}

                {children}
            </span>);
        }
    };
    __setFunctionName(_classThis, "Tooltip");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _tooltipOpen_decorators = [mobx_1.observable];
        _tooltipRef_decorators = [mobx_1.observable];
        _setTooltipRef_decorators = [mobx_1.action];
        _handleEnter_decorators = [mobx_1.action];
        _handleLeave_decorators = [mobx_1.action];
        __esDecorate(null, null, _tooltipOpen_decorators, { kind: "field", name: "tooltipOpen", static: false, private: false, access: { has: obj => "tooltipOpen" in obj, get: obj => obj.tooltipOpen, set: (obj, value) => { obj.tooltipOpen = value; } }, metadata: _metadata }, _tooltipOpen_initializers, _tooltipOpen_extraInitializers);
        __esDecorate(null, null, _tooltipRef_decorators, { kind: "field", name: "tooltipRef", static: false, private: false, access: { has: obj => "tooltipRef" in obj, get: obj => obj.tooltipRef, set: (obj, value) => { obj.tooltipRef = value; } }, metadata: _metadata }, _tooltipRef_initializers, _tooltipRef_extraInitializers);
        __esDecorate(null, null, _setTooltipRef_decorators, { kind: "field", name: "setTooltipRef", static: false, private: false, access: { has: obj => "setTooltipRef" in obj, get: obj => obj.setTooltipRef, set: (obj, value) => { obj.setTooltipRef = value; } }, metadata: _metadata }, _setTooltipRef_initializers, _setTooltipRef_extraInitializers);
        __esDecorate(null, null, _handleEnter_decorators, { kind: "field", name: "handleEnter", static: false, private: false, access: { has: obj => "handleEnter" in obj, get: obj => obj.handleEnter, set: (obj, value) => { obj.handleEnter = value; } }, metadata: _metadata }, _handleEnter_initializers, _handleEnter_extraInitializers);
        __esDecorate(null, null, _handleLeave_decorators, { kind: "field", name: "handleLeave", static: false, private: false, access: { has: obj => "handleLeave" in obj, get: obj => obj.handleLeave, set: (obj, value) => { obj.handleLeave = value; } }, metadata: _metadata }, _handleLeave_initializers, _handleLeave_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tooltip = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tooltip = _classThis;
})();
exports.default = Tooltip;
