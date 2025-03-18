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
const ArrowMenu_1 = __importDefault(require("../ArrowMenu"));
const Icon_1 = __importDefault(require("../Icon"));
const button_scss_1 = __importDefault(require("./button.scss"));
let Button = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _handleClick_decorators;
    let _handleClick_initializers = [];
    let _handleClick_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    var Button = _classThis = class extends _classSuper {
        render() {
            const { disabled, icon, label, location, options, } = this.props;
            const buttonClass = (0, classnames_1.default)(button_scss_1.default.button, button_scss_1.default[location], {
                [button_scss_1.default.hasLabel]: label,
                [button_scss_1.default.hasOptions]: options,
            });
            const button = (<button className={buttonClass} disabled={disabled} onClick={this.handleClick} type="button">
                {icon && <Icon_1.default className={button_scss_1.default.icon} name={icon}/>}
                {label && <span className={button_scss_1.default.label}>{label}</span>}
                {options && <Icon_1.default name="su-angle-down"/>}
            </button>);
            if (!options) {
                return button;
            }
            return (<ArrowMenu_1.default anchorElement={button} onClose={this.handleClose} open={this.open}>
                <ArrowMenu_1.default.Section>
                    {options.map((option) => (<ArrowMenu_1.default.Action icon={option.icon} key={option.value} onClick={this.handleOptionClick} value={option.value}>
                            {option.label}
                        </ArrowMenu_1.default.Action>))}
                </ArrowMenu_1.default.Section>
            </ArrowMenu_1.default>);
        }
        constructor() {
            super(...arguments);
            this.open = __runInitializers(this, _open_initializers, false);
            this.handleOptionClick = (__runInitializers(this, _open_extraInitializers), (option) => {
                const { onClick } = this.props;
                onClick(option);
            });
            this.handleClick = __runInitializers(this, _handleClick_initializers, () => {
                const { onClick, options } = this.props;
                if (options) {
                    this.open = true;
                    return;
                }
                onClick();
            });
            this.handleClose = (__runInitializers(this, _handleClick_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                this.open = false;
            }));
            __runInitializers(this, _handleClose_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Button");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _handleClick_decorators = [mobx_1.action];
        _handleClose_decorators = [mobx_1.action];
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
        __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Button = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Button = _classThis;
})();
exports.default = Button;
