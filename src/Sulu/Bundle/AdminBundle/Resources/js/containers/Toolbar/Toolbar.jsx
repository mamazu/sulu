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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const react_1 = __importStar(require("react"));
const Toolbar_1 = __importDefault(require("../../components/Toolbar"));
const Snackbar_1 = __importDefault(require("../../components/Snackbar"));
const toolbarStorePool_1 = __importStar(require("./stores/toolbarStorePool"));
const toolbar_scss_1 = __importDefault(require("./toolbar.scss"));
const LOCALE_SELECT_SIZE = 'small';
const SUCCESS_ICON = 'su-check';
const ToolbarItemTypes = {
    Button: 'button',
    Dropdown: 'dropdown',
    Select: 'select',
    Toggler: 'toggler',
};
function getItemComponentByType(itemConfig, key) {
    switch (itemConfig.type) {
        case ToolbarItemTypes.Select:
            const { type: selectType } = itemConfig, selectConfig = __rest(itemConfig, ["type"]);
            return <Toolbar_1.default.Select {...selectConfig} key={key}/>;
        case ToolbarItemTypes.Dropdown:
            const { type: dropdownType } = itemConfig, dropdownConfig = __rest(itemConfig, ["type"]);
            return <Toolbar_1.default.Dropdown {...dropdownConfig} key={key}/>;
        case ToolbarItemTypes.Toggler:
            const { type: togglerType } = itemConfig, togglerConfig = __rest(itemConfig, ["type"]);
            return <Toolbar_1.default.Toggler {...togglerConfig} key={key}/>;
        default:
            const { type: buttonType } = itemConfig, buttonConfig = __rest(itemConfig, ["type"]);
            return <Toolbar_1.default.Button {...buttonConfig} key={key}/>;
    }
}
let Toolbar = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _handleErrorSnackbarCloseClick_decorators;
    let _handleErrorSnackbarCloseClick_initializers = [];
    let _handleErrorSnackbarCloseClick_extraInitializers = [];
    let _get_disableAllButtons_decorators;
    let _get_backButtonConfig_decorators;
    let _get_itemsConfig_decorators;
    var Toolbar = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.toolbarStore = __runInitializers(this, _instanceExtraInitializers);
            this.setStore = (storeKey = toolbarStorePool_1.DEFAULT_STORE_KEY) => {
                if (toolbarStorePool_1.default.hasStore(storeKey)) {
                    this.toolbarStore = toolbarStorePool_1.default.getStore(storeKey);
                }
                else {
                    this.toolbarStore = toolbarStorePool_1.default.createStore(storeKey);
                }
            };
            this.handleErrorSnackbarCloseClick = __runInitializers(this, _handleErrorSnackbarCloseClick_initializers, () => {
                this.toolbarStore.errors.pop();
            });
            __runInitializers(this, _handleErrorSnackbarCloseClick_extraInitializers);
            this.setStore(this.props.storeKey);
        }
        componentDidUpdate(nextProps) {
            if (nextProps.storeKey) {
                this.setStore(nextProps.storeKey);
            }
        }
        get disableAllButtons() {
            const loadingItems = this.toolbarStore.getItemsConfig().filter((item) => item.loading);
            return this.toolbarStore.disableAll || loadingItems.length > 0;
        }
        get backButtonConfig() {
            const backButtonConfig = this.toolbarStore.getBackButtonConfig();
            if (!backButtonConfig) {
                return undefined;
            }
            if (this.disableAllButtons) {
                backButtonConfig.disabled = true;
            }
            return backButtonConfig;
        }
        get itemsConfig() {
            const itemsConfig = this.toolbarStore.getItemsConfig();
            if (this.disableAllButtons) {
                itemsConfig.forEach((item) => {
                    item.disabled = true;
                });
            }
            return itemsConfig;
        }
        render() {
            const { onNavigationButtonClick, navigationOpen } = this.props;
            const { errors, showSuccess, warnings } = this.toolbarStore;
            const iconsConfig = this.toolbarStore.getIconsConfig();
            const itemsConfig = this.toolbarStore.getItemsConfig();
            const localeConfig = this.toolbarStore.getLocaleConfig();
            return (<react_1.Fragment>
                <Snackbar_1.default message={errors[errors.length - 1]} onCloseClick={this.handleErrorSnackbarCloseClick} type="error" visible={errors.length > 0}/>
                <Snackbar_1.default message={warnings[warnings.length - 1]} type="warning" visible={warnings.length > 0}/>
                <Toolbar_1.default>
                    <Toolbar_1.default.Controls grow={true}>
                        {!!onNavigationButtonClick &&
                    <Toolbar_1.default.Button disabled={!onNavigationButtonClick} icon={showSuccess
                            ? SUCCESS_ICON
                            : navigationOpen
                                ? 'su-times'
                                : 'su-bars'} onClick={onNavigationButtonClick} primary={true} success={showSuccess}/>}
                        {!!this.backButtonConfig &&
                    <Toolbar_1.default.Button {...this.backButtonConfig} icon={!onNavigationButtonClick && showSuccess ? SUCCESS_ICON : 'su-angle-left'} success={!onNavigationButtonClick && showSuccess}/>}
                        {itemsConfig.length > 0 &&
                    <Toolbar_1.default.Items>
                                {this.itemsConfig.map((itemConfig, index) => getItemComponentByType(itemConfig, index))}
                            </Toolbar_1.default.Items>}
                    </Toolbar_1.default.Controls>
                    <Toolbar_1.default.Controls>
                        {iconsConfig.length > 0 &&
                    <Toolbar_1.default.Icons>
                                {iconsConfig.map((icon) => {
                            // TODO this creates a deep copy and has a performance impact.
                            // Would be better to return functional components in withToolbar.
                            return (0, mobx_1.toJS)(icon);
                        })}
                            </Toolbar_1.default.Icons>}
                        {!!localeConfig &&
                    <Toolbar_1.default.Select className={toolbar_scss_1.default.locale} size={LOCALE_SELECT_SIZE} {...localeConfig}/>}
                    </Toolbar_1.default.Controls>
                </Toolbar_1.default>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Toolbar");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _handleErrorSnackbarCloseClick_decorators = [mobx_1.action];
        _get_disableAllButtons_decorators = [mobx_1.computed];
        _get_backButtonConfig_decorators = [mobx_1.computed];
        _get_itemsConfig_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_disableAllButtons_decorators, { kind: "getter", name: "disableAllButtons", static: false, private: false, access: { has: obj => "disableAllButtons" in obj, get: obj => obj.disableAllButtons }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_backButtonConfig_decorators, { kind: "getter", name: "backButtonConfig", static: false, private: false, access: { has: obj => "backButtonConfig" in obj, get: obj => obj.backButtonConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_itemsConfig_decorators, { kind: "getter", name: "itemsConfig", static: false, private: false, access: { has: obj => "itemsConfig" in obj, get: obj => obj.itemsConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _handleErrorSnackbarCloseClick_decorators, { kind: "field", name: "handleErrorSnackbarCloseClick", static: false, private: false, access: { has: obj => "handleErrorSnackbarCloseClick" in obj, get: obj => obj.handleErrorSnackbarCloseClick, set: (obj, value) => { obj.handleErrorSnackbarCloseClick = value; } }, metadata: _metadata }, _handleErrorSnackbarCloseClick_initializers, _handleErrorSnackbarCloseClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Toolbar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        navigationOpen: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Toolbar = _classThis;
})();
exports.default = Toolbar;
