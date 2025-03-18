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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const classnames_1 = __importDefault(require("classnames"));
const Popover_1 = __importDefault(require("../Popover"));
const Button_1 = __importDefault(require("./Button"));
const popover_scss_1 = __importDefault(require("./popover.scss"));
let Popover = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _buttonRef_decorators;
    let _buttonRef_initializers = [];
    let _buttonRef_extraInitializers = [];
    let _setButtonRef_decorators;
    let _setButtonRef_initializers = [];
    let _setButtonRef_extraInitializers = [];
    let _close_decorators;
    let _close_initializers = [];
    let _close_extraInitializers = [];
    let _toggle_decorators;
    let _toggle_initializers = [];
    let _toggle_extraInitializers = [];
    var Popover = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.open = __runInitializers(this, _open_initializers, false);
            this.buttonRef = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _buttonRef_initializers, void 0));
            this.setButtonRef = (__runInitializers(this, _buttonRef_extraInitializers), __runInitializers(this, _setButtonRef_initializers, (ref) => {
                if (ref) {
                    this.buttonRef = ref;
                }
            }));
            this.close = (__runInitializers(this, _setButtonRef_extraInitializers), __runInitializers(this, _close_initializers, () => {
                this.open = false;
            }));
            this.toggle = (__runInitializers(this, _close_extraInitializers), __runInitializers(this, _toggle_initializers, () => {
                this.open = !this.open;
            }));
            this.handleButtonClick = (__runInitializers(this, _toggle_extraInitializers), () => {
                this.toggle();
            });
            this.handlePopoverClose = () => {
                this.close();
            };
        }
        componentDidUpdate() {
            const { disabled } = this.props;
            if (disabled) {
                this.close();
            }
        }
        render() {
            const { children, className, icon, size, skin, label, disabled, loading, showText, } = this.props;
            const popoverClass = (0, classnames_1.default)(className, popover_scss_1.default.popover, {
                [popover_scss_1.default[size]]: size,
            });
            return (<div className={popoverClass}>
                <Button_1.default active={this.open} buttonRef={this.setButtonRef} disabled={disabled} hasOptions={true} icon={icon} label={showText ? label : undefined} loading={loading} onClick={this.handleButtonClick} size={size} skin={skin}/>
                <Popover_1.default anchorElement={this.buttonRef} onClose={this.handlePopoverClose} open={this.open}>
                    {(setPopoverElementRef, popoverStyle) => (<div className={popover_scss_1.default[skin]} ref={setPopoverElementRef} style={popoverStyle}>
                                <div className={popover_scss_1.default.contentContainer}>
                                    {children(this.close)}
                                </div>
                            </div>)}
                </Popover_1.default>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Popover");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _buttonRef_decorators = [mobx_1.observable];
        _setButtonRef_decorators = [mobx_1.action];
        _close_decorators = [mobx_1.action];
        _toggle_decorators = [mobx_1.action];
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _buttonRef_decorators, { kind: "field", name: "buttonRef", static: false, private: false, access: { has: obj => "buttonRef" in obj, get: obj => obj.buttonRef, set: (obj, value) => { obj.buttonRef = value; } }, metadata: _metadata }, _buttonRef_initializers, _buttonRef_extraInitializers);
        __esDecorate(null, null, _setButtonRef_decorators, { kind: "field", name: "setButtonRef", static: false, private: false, access: { has: obj => "setButtonRef" in obj, get: obj => obj.setButtonRef, set: (obj, value) => { obj.setButtonRef = value; } }, metadata: _metadata }, _setButtonRef_initializers, _setButtonRef_extraInitializers);
        __esDecorate(null, null, _close_decorators, { kind: "field", name: "close", static: false, private: false, access: { has: obj => "close" in obj, get: obj => obj.close, set: (obj, value) => { obj.close = value; } }, metadata: _metadata }, _close_initializers, _close_extraInitializers);
        __esDecorate(null, null, _toggle_decorators, { kind: "field", name: "toggle", static: false, private: false, access: { has: obj => "toggle" in obj, get: obj => obj.toggle, set: (obj, value) => { obj.toggle = value; } }, metadata: _metadata }, _toggle_initializers, _toggle_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Popover = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        showText: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Popover = _classThis;
})();
exports.default = Popover;
