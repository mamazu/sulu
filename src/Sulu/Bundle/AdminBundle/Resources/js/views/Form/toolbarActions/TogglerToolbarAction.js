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
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let TogglerToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _instanceExtraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _get_property_decorators;
    let _get_label_decorators;
    let _get_activateAction_decorators;
    let _get_deactivateAction_decorators;
    let _get_isActive_decorators;
    let _handleTogglerClick_decorators;
    let _handleTogglerClick_initializers = [];
    let _handleTogglerClick_extraInitializers = [];
    return _a = class TogglerToolbarAction extends _classSuper {
            get property() {
                const { property, } = this.options;
                if (typeof property !== 'string') {
                    throw new Error('The "property" option must be a string value!');
                }
                return property;
            }
            get label() {
                const { label, } = this.options;
                if (typeof label !== 'string') {
                    throw new Error('The "label" option must be a string value!');
                }
                return label;
            }
            get activateAction() {
                const { activate, } = this.options;
                if (typeof activate !== 'string') {
                    throw new Error('The "activate" option must be a string value!');
                }
                return activate;
            }
            get deactivateAction() {
                const { deactivate, } = this.options;
                if (typeof deactivate !== 'string') {
                    throw new Error('The "deactivate" option must be a string value!');
                }
                return deactivate;
            }
            get isActive() {
                return this.resourceFormStore.data[this.property];
            }
            getToolbarItemConfig() {
                if (this.resourceFormStore.loading || !this.resourceFormStore.data.id) {
                    return null;
                }
                return {
                    type: 'toggler',
                    onClick: this.handleTogglerClick,
                    label: this.label,
                    loading: this.loading,
                    value: this.isActive,
                };
            }
            constructor() {
                super(...arguments);
                this.loading = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _loading_initializers, false));
                this.handleTogglerClick = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _handleTogglerClick_initializers, () => {
                    const { resourceKey, locale, data: { id, }, } = this.resourceFormStore;
                    this.loading = true;
                    ResourceRequester_1.default.post(resourceKey, undefined, {
                        action: this.isActive ? this.deactivateAction : this.activateAction,
                        locale,
                        id,
                    }).then((0, mobx_1.action)((response) => {
                        this.resourceFormStore.change(this.property, response[this.property], { isServerValue: true });
                        this.loading = false;
                        this.form.showSuccessSnackbar();
                    })).catch((0, mobx_1.action)((error) => {
                        this.form.errors.push(error);
                        this.loading = false;
                    }));
                }));
                __runInitializers(this, _handleTogglerClick_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _loading_decorators = [mobx_1.observable];
            _get_property_decorators = [mobx_1.computed];
            _get_label_decorators = [mobx_1.computed];
            _get_activateAction_decorators = [mobx_1.computed];
            _get_deactivateAction_decorators = [mobx_1.computed];
            _get_isActive_decorators = [mobx_1.computed];
            _handleTogglerClick_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_property_decorators, { kind: "getter", name: "property", static: false, private: false, access: { has: obj => "property" in obj, get: obj => obj.property }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_label_decorators, { kind: "getter", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_activateAction_decorators, { kind: "getter", name: "activateAction", static: false, private: false, access: { has: obj => "activateAction" in obj, get: obj => obj.activateAction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_deactivateAction_decorators, { kind: "getter", name: "deactivateAction", static: false, private: false, access: { has: obj => "deactivateAction" in obj, get: obj => obj.deactivateAction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_isActive_decorators, { kind: "getter", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _handleTogglerClick_decorators, { kind: "field", name: "handleTogglerClick", static: false, private: false, access: { has: obj => "handleTogglerClick" in obj, get: obj => obj.handleTogglerClick, set: (obj, value) => { obj.handleTogglerClick = value; } }, metadata: _metadata }, _handleTogglerClick_initializers, _handleTogglerClick_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = TogglerToolbarAction;
