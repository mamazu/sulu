"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const SHOW_SUCCESS_DURATION = 1500;
let ToolbarStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _setConfig_decorators;
    let _clearConfig_decorators;
    let _get_disableAll_decorators;
    let _get_errors_decorators;
    let _get_warnings_decorators;
    let _get_showSuccess_decorators;
    return _a = class ToolbarStore {
            constructor() {
                this.config = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _config_initializers, {}));
                this.showSuccessDisposer = __runInitializers(this, _config_extraInitializers);
                this.showSuccessDisposer = (0, mobx_1.autorun)(() => {
                    const { showSuccess } = this.config;
                    if (showSuccess && showSuccess.get()) {
                        setTimeout((0, mobx_1.action)(() => {
                            showSuccess.set(false);
                        }), SHOW_SUCCESS_DURATION);
                    }
                });
            }
            destroy() {
                this.clearConfig();
                this.showSuccessDisposer();
            }
            setConfig(config) {
                this.config = config;
            }
            clearConfig() {
                this.config = {};
            }
            get disableAll() {
                return !!this.config.disableAll;
            }
            get errors() {
                if (!this.config.errors) {
                    return [];
                }
                return this.config.errors;
            }
            get warnings() {
                if (!this.config.warnings) {
                    return [];
                }
                return this.config.warnings;
            }
            get showSuccess() {
                if (!this.config.showSuccess) {
                    return false;
                }
                return this.config.showSuccess.get();
            }
            // @deprecated
            hasBackButtonConfig() {
                loglevel_1.default.warn('The "hasBackButtonConfig" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "getBackButtonConfig" method instead.');
                return !!this.config.backButton;
            }
            getBackButtonConfig() {
                return this.config.backButton || null;
            }
            // @deprecated
            hasItemsConfig() {
                loglevel_1.default.warn('The "hasItemsConfig" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "getItemsConfig" method instead.');
                return !!this.config.items && !!this.config.items.length;
            }
            getItemsConfig() {
                return this.config.items || [];
            }
            // @deprecated
            hasIconsConfig() {
                loglevel_1.default.warn('The "hasIconsConfig" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "getIconsConfig" method instead.');
                return !!this.config.icons && !!this.config.icons.length;
            }
            getIconsConfig() {
                return this.config.icons || [];
            }
            // @deprecated
            hasLocaleConfig() {
                loglevel_1.default.warn('The "hasLocaleConfig" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "getLocaleConfig" method instead.');
                return !!this.config.locale;
            }
            getLocaleConfig() {
                return this.config.locale;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [mobx_1.observable];
            _setConfig_decorators = [mobx_1.action];
            _clearConfig_decorators = [mobx_1.action];
            _get_disableAll_decorators = [mobx_1.computed];
            _get_errors_decorators = [mobx_1.computed];
            _get_warnings_decorators = [mobx_1.computed];
            _get_showSuccess_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _setConfig_decorators, { kind: "method", name: "setConfig", static: false, private: false, access: { has: obj => "setConfig" in obj, get: obj => obj.setConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clearConfig_decorators, { kind: "method", name: "clearConfig", static: false, private: false, access: { has: obj => "clearConfig" in obj, get: obj => obj.clearConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_disableAll_decorators, { kind: "getter", name: "disableAll", static: false, private: false, access: { has: obj => "disableAll" in obj, get: obj => obj.disableAll }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_errors_decorators, { kind: "getter", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_warnings_decorators, { kind: "getter", name: "warnings", static: false, private: false, access: { has: obj => "warnings" in obj, get: obj => obj.warnings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_showSuccess_decorators, { kind: "getter", name: "showSuccess", static: false, private: false, access: { has: obj => "showSuccess" in obj, get: obj => obj.showSuccess }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ToolbarStore;
