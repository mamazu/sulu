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
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const views_1 = require("sulu-admin-bundle/views");
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
let EnableUserToolbarAction = (() => {
    var _a;
    let _classSuper = views_1.AbstractFormToolbarAction;
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _handleEnableUserButtonClick_decorators;
    let _handleEnableUserButtonClick_initializers = [];
    let _handleEnableUserButtonClick_extraInitializers = [];
    return _a = class EnableUserToolbarAction extends _classSuper {
            getToolbarItemConfig() {
                if (this.resourceFormStore.loading || !this.resourceFormStore.data.id || this.resourceFormStore.data.enabled) {
                    return null;
                }
                return {
                    type: 'button',
                    icon: 'su-enter',
                    onClick: this.handleEnableUserButtonClick,
                    label: (0, utils_1.translate)('sulu_security.enable_user'),
                    loading: this.loading,
                };
            }
            constructor() {
                super(...arguments);
                this.loading = __runInitializers(this, _loading_initializers, false);
                this.handleEnableUserButtonClick = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _handleEnableUserButtonClick_initializers, () => {
                    const { locale, data: { id, }, } = this.resourceFormStore;
                    this.loading = true;
                    services_1.ResourceRequester.post('users', undefined, {
                        action: 'enable',
                        locale,
                        id,
                    }).then((0, mobx_1.action)((response) => {
                        this.resourceFormStore.change('enabled', response.enabled, { isServerValue: true });
                        this.loading = false;
                        this.form.showSuccessSnackbar();
                    })).catch((0, mobx_1.action)((error) => {
                        this.form.errors.push(error);
                        this.loading = false;
                    }));
                }));
                __runInitializers(this, _handleEnableUserButtonClick_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _loading_decorators = [mobx_1.observable];
            _handleEnableUserButtonClick_decorators = [mobx_1.action];
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _handleEnableUserButtonClick_decorators, { kind: "field", name: "handleEnableUserButtonClick", static: false, private: false, access: { has: obj => "handleEnableUserButtonClick" in obj, get: obj => obj.handleEnableUserButtonClick, set: (obj, value) => { obj.handleEnableUserButtonClick = value; } }, metadata: _metadata }, _handleEnableUserButtonClick_initializers, _handleEnableUserButtonClick_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = EnableUserToolbarAction;
