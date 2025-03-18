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
const classnames_1 = __importDefault(require("classnames"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Icon_1 = __importDefault(require("../Icon"));
const ArrowMenu_1 = __importDefault(require("../ArrowMenu"));
const toolbar_scss_1 = __importDefault(require("./toolbar.scss"));
const toolbarDropdown_scss_1 = __importDefault(require("./toolbarDropdown.scss"));
let ToolbarDropdown = (() => {
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
    let _handleMenuClose_decorators;
    let _handleMenuClose_initializers = [];
    let _handleMenuClose_extraInitializers = [];
    var ToolbarDropdown = _classThis = class extends _classSuper {
        renderButton() {
            const { icon, skin } = this.props;
            const className = (0, classnames_1.default)(toolbar_scss_1.default.item, toolbar_scss_1.default[skin]);
            return (<button className={className} onClick={this.handleClick} type="button">
                <Icon_1.default name={icon}/>
                <Icon_1.default className={toolbarDropdown_scss_1.default.buttonArrowIcon} name="su-angle-down"/>
            </button>);
        }
        render() {
            return (<react_1.Fragment>
                <ArrowMenu_1.default anchorElement={this.renderButton()} onClose={this.handleMenuClose} open={this.open}>
                    <ArrowMenu_1.default.Section>
                        {this.props.options.map(({ disabled, label, onClick }, index) => (<ArrowMenu_1.default.Action disabled={disabled} key={index} onClick={onClick}>
                                    {label}
                                </ArrowMenu_1.default.Action>))}
                    </ArrowMenu_1.default.Section>
                </ArrowMenu_1.default>
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.open = __runInitializers(this, _open_initializers, false);
            this.handleClick = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _handleClick_initializers, () => {
                this.open = true;
            }));
            this.handleMenuClose = (__runInitializers(this, _handleClick_extraInitializers), __runInitializers(this, _handleMenuClose_initializers, () => {
                this.open = false;
            }));
            __runInitializers(this, _handleMenuClose_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ToolbarDropdown");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _handleClick_decorators = [mobx_1.action];
        _handleMenuClose_decorators = [mobx_1.action];
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
        __esDecorate(null, null, _handleMenuClose_decorators, { kind: "field", name: "handleMenuClose", static: false, private: false, access: { has: obj => "handleMenuClose" in obj, get: obj => obj.handleMenuClose, set: (obj, value) => { obj.handleMenuClose = value; } }, metadata: _metadata }, _handleMenuClose_initializers, _handleMenuClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ToolbarDropdown = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        skin: 'primary',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ToolbarDropdown = _classThis;
})();
exports.default = ToolbarDropdown;
