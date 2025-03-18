"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_color_1 = require("react-color");
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const Input_1 = __importDefault(require("../Input"));
const Popover_1 = __importDefault(require("../Popover"));
const colorPicker_scss_1 = __importDefault(require("./colorPicker.scss"));
require("./colorPickerGlobal.scss");
let ColorPicker = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _showError_decorators;
    let _showError_initializers = [];
    let _showError_extraInitializers = [];
    let _popoverOpen_decorators;
    let _popoverOpen_initializers = [];
    let _popoverOpen_extraInitializers = [];
    let _popoverAnchorElement_decorators;
    let _popoverAnchorElement_initializers = [];
    let _popoverAnchorElement_extraInitializers = [];
    let _handlePopoverOpen_decorators;
    let _handlePopoverOpen_initializers = [];
    let _handlePopoverOpen_extraInitializers = [];
    let _handlePopoverClose_decorators;
    let _handlePopoverClose_initializers = [];
    let _handlePopoverClose_extraInitializers = [];
    let _setRef_decorators;
    let _setRef_initializers = [];
    let _setRef_extraInitializers = [];
    let _setValue_decorators;
    let _setShowError_decorators;
    let _get_isValidValue_decorators;
    var ColorPicker = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.value = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _value_initializers, void 0));
            this.showError = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _showError_initializers, false));
            this.popoverOpen = (__runInitializers(this, _showError_extraInitializers), __runInitializers(this, _popoverOpen_initializers, false));
            this.popoverAnchorElement = (__runInitializers(this, _popoverOpen_extraInitializers), __runInitializers(this, _popoverAnchorElement_initializers, void 0));
            this.handlePopoverOpen = (__runInitializers(this, _popoverAnchorElement_extraInitializers), __runInitializers(this, _handlePopoverOpen_initializers, () => {
                this.popoverOpen = true;
            }));
            this.handlePopoverClose = (__runInitializers(this, _handlePopoverOpen_extraInitializers), __runInitializers(this, _handlePopoverClose_initializers, () => {
                this.popoverOpen = false;
            }));
            this.setRef = (__runInitializers(this, _handlePopoverClose_extraInitializers), __runInitializers(this, _setRef_initializers, (ref) => {
                this.popoverAnchorElement = ref;
            }));
            this.handleBlur = (__runInitializers(this, _setRef_extraInitializers), () => {
                if (this.isValidValue) {
                    this.setShowError(false);
                }
                else {
                    this.props.onChange(undefined);
                    this.setShowError(true);
                }
                const { onBlur } = this.props;
                if (onBlur) {
                    onBlur();
                }
            });
            this.handleChange = (value) => {
                const { onBlur, onChange } = this.props;
                this.setShowError(false);
                onChange(value && value instanceof Object && value.hasOwnProperty('hex') ? value.hex : undefined);
                if (onBlur) {
                    onBlur();
                }
            };
            this.handleInputChange = (value) => {
                this.setValue(value);
                if (!this.isValidValue) {
                    this.props.onChange(undefined);
                    return;
                }
                this.setShowError(false);
                this.props.onChange(this.value);
            };
        }
        setValue(value) {
            this.value = value;
        }
        setShowError(showError) {
            this.showError = showError;
        }
        get isValidValue() {
            if (!this.value) {
                return true;
            }
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.value);
        }
        componentDidMount() {
            this.setValue(this.props.value);
        }
        componentDidUpdate() {
            if (this.value && !this.props.value) {
                return;
            }
            this.setValue(this.props.value);
        }
        render() {
            const { disabled, id, name, placeholder, valid, } = this.props;
            const iconStyle = {
                color: this.isValidValue ? this.value : 'transparent',
            };
            return (<react_1.Fragment>
                <Input_1.default disabled={disabled} icon="su-square" iconClassName={colorPicker_scss_1.default.icon} iconStyle={iconStyle} id={id} inputContainerRef={this.setRef} name={name} onBlur={this.handleBlur} onChange={this.handleInputChange} onIconClick={!disabled ? this.handlePopoverOpen : undefined} placeholder={placeholder} valid={valid && !this.showError} value={this.value}/>
                <Popover_1.default anchorElement={this.popoverAnchorElement} horizontalOffset={35} onClose={this.handlePopoverClose} open={this.popoverOpen} verticalOffset={-30}>
                    {(setPopoverElementRef, popoverStyle) => (<div ref={setPopoverElementRef} style={popoverStyle}>
                                <react_color_1.SketchPicker color={this.value ? this.value : undefined} disableAlpha={true} onChangeComplete={this.handleChange} presetColors={[]}/>
                            </div>)}
                </Popover_1.default>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "ColorPicker");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _value_decorators = [mobx_1.observable];
        _showError_decorators = [mobx_1.observable];
        _popoverOpen_decorators = [mobx_1.observable];
        _popoverAnchorElement_decorators = [mobx_1.observable];
        _handlePopoverOpen_decorators = [mobx_1.action];
        _handlePopoverClose_decorators = [mobx_1.action];
        _setRef_decorators = [mobx_1.action];
        _setValue_decorators = [mobx_1.action];
        _setShowError_decorators = [mobx_1.action];
        _get_isValidValue_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _setValue_decorators, { kind: "method", name: "setValue", static: false, private: false, access: { has: obj => "setValue" in obj, get: obj => obj.setValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setShowError_decorators, { kind: "method", name: "setShowError", static: false, private: false, access: { has: obj => "setShowError" in obj, get: obj => obj.setShowError }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isValidValue_decorators, { kind: "getter", name: "isValidValue", static: false, private: false, access: { has: obj => "isValidValue" in obj, get: obj => obj.isValidValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _showError_decorators, { kind: "field", name: "showError", static: false, private: false, access: { has: obj => "showError" in obj, get: obj => obj.showError, set: (obj, value) => { obj.showError = value; } }, metadata: _metadata }, _showError_initializers, _showError_extraInitializers);
        __esDecorate(null, null, _popoverOpen_decorators, { kind: "field", name: "popoverOpen", static: false, private: false, access: { has: obj => "popoverOpen" in obj, get: obj => obj.popoverOpen, set: (obj, value) => { obj.popoverOpen = value; } }, metadata: _metadata }, _popoverOpen_initializers, _popoverOpen_extraInitializers);
        __esDecorate(null, null, _popoverAnchorElement_decorators, { kind: "field", name: "popoverAnchorElement", static: false, private: false, access: { has: obj => "popoverAnchorElement" in obj, get: obj => obj.popoverAnchorElement, set: (obj, value) => { obj.popoverAnchorElement = value; } }, metadata: _metadata }, _popoverAnchorElement_initializers, _popoverAnchorElement_extraInitializers);
        __esDecorate(null, null, _handlePopoverOpen_decorators, { kind: "field", name: "handlePopoverOpen", static: false, private: false, access: { has: obj => "handlePopoverOpen" in obj, get: obj => obj.handlePopoverOpen, set: (obj, value) => { obj.handlePopoverOpen = value; } }, metadata: _metadata }, _handlePopoverOpen_initializers, _handlePopoverOpen_extraInitializers);
        __esDecorate(null, null, _handlePopoverClose_decorators, { kind: "field", name: "handlePopoverClose", static: false, private: false, access: { has: obj => "handlePopoverClose" in obj, get: obj => obj.handlePopoverClose, set: (obj, value) => { obj.handlePopoverClose = value; } }, metadata: _metadata }, _handlePopoverClose_initializers, _handlePopoverClose_extraInitializers);
        __esDecorate(null, null, _setRef_decorators, { kind: "field", name: "setRef", static: false, private: false, access: { has: obj => "setRef" in obj, get: obj => obj.setRef, set: (obj, value) => { obj.setRef = value; } }, metadata: _metadata }, _setRef_initializers, _setRef_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColorPicker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        valid: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColorPicker = _classThis;
})();
exports.default = ColorPicker;
