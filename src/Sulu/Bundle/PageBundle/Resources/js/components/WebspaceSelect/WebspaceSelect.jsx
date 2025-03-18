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
const utils_1 = require("sulu-admin-bundle/utils");
const components_1 = require("sulu-admin-bundle/components");
const webspaceSelect_scss_1 = __importDefault(require("./webspaceSelect.scss"));
let WebspaceSelect = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _openMenu_decorators;
    let _openMenu_initializers = [];
    let _openMenu_extraInitializers = [];
    let _closeMenu_decorators;
    let _closeMenu_initializers = [];
    let _closeMenu_extraInitializers = [];
    var WebspaceSelect = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.open = __runInitializers(this, _open_initializers, false);
            this.openMenu = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _openMenu_initializers, () => {
                this.open = true;
            }));
            this.closeMenu = (__runInitializers(this, _openMenu_extraInitializers), __runInitializers(this, _closeMenu_initializers, () => {
                this.open = false;
            }));
            this.handleButtonClick = (__runInitializers(this, _closeMenu_extraInitializers), this.openMenu);
            this.handleMenuClose = this.closeMenu;
            this.handleChange = (value) => {
                this.closeMenu();
                this.props.onChange(value);
            };
        }
        get displayValue() {
            const { children, value } = this.props;
            let displayValue = '';
            react_1.default.Children.forEach(children, (child) => {
                if (value === child.props.value) {
                    displayValue = child.props.children;
                }
            });
            return displayValue;
        }
        renderButton() {
            return (<div className={webspaceSelect_scss_1.default.webspaceSelect}>
                <button className={webspaceSelect_scss_1.default.button} onClick={this.handleButtonClick} type="button">
                    <components_1.Icon className={webspaceSelect_scss_1.default.buttonIcon} name="su-webspace"/>
                    <span className={webspaceSelect_scss_1.default.buttonValue}>{this.displayValue}</span>
                    <components_1.Icon className={webspaceSelect_scss_1.default.buttonIcon} name="su-angle-down"/>
                </button>
            </div>);
        }
        render() {
            const { value, children, } = this.props;
            return (<components_1.ArrowMenu anchorElement={this.renderButton()} onClose={this.handleMenuClose} open={this.open}>
                <components_1.ArrowMenu.SingleItemSection icon="su-webspace" onChange={this.handleChange} title={(0, utils_1.translate)('sulu_page.webspaces')} value={value}>
                    {children}
                </components_1.ArrowMenu.SingleItemSection>
            </components_1.ArrowMenu>);
        }
    };
    __setFunctionName(_classThis, "WebspaceSelect");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _openMenu_decorators = [mobx_1.action];
        _closeMenu_decorators = [mobx_1.action];
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _openMenu_decorators, { kind: "field", name: "openMenu", static: false, private: false, access: { has: obj => "openMenu" in obj, get: obj => obj.openMenu, set: (obj, value) => { obj.openMenu = value; } }, metadata: _metadata }, _openMenu_initializers, _openMenu_extraInitializers);
        __esDecorate(null, null, _closeMenu_decorators, { kind: "field", name: "closeMenu", static: false, private: false, access: { has: obj => "closeMenu" in obj, get: obj => obj.closeMenu, set: (obj, value) => { obj.closeMenu = value; } }, metadata: _metadata }, _closeMenu_initializers, _closeMenu_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebspaceSelect = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.Item = components_1.ArrowMenu.Item;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebspaceSelect = _classThis;
})();
exports.default = WebspaceSelect;
