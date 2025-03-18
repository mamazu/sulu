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
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const stores_1 = require("sulu-page-bundle/stores");
const RolePermissions_1 = __importDefault(require("../../RolePermissions"));
let RolePermissions = (() => {
    var _a;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_webspace_decorators;
    let _get_webspaceKey_decorators;
    let _get_webspaceSecurity_decorators;
    let _get_permissionCheck_decorators;
    let _get_system_decorators;
    return _a = class RolePermissions extends _classSuper {
            constructor() {
                super(...arguments);
                this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (value) => {
                    const { onChange, onFinish } = this.props;
                    onChange(value);
                    onFinish();
                });
            }
            get webspace() {
                const { formInspector: { options: { webspace, }, }, } = this.props;
                if (!webspace || !stores_1.webspaceStore.hasWebspace(webspace)) {
                    return undefined;
                }
                return stores_1.webspaceStore.getWebspace(webspace);
            }
            get webspaceKey() {
                const { webspace: { key, } = {}, } = this;
                return key;
            }
            get webspaceSecurity() {
                const { webspace: { security = {}, } = {}, } = this;
                return security;
            }
            get permissionCheck() {
                const { permissionCheck } = this.webspaceSecurity;
                return permissionCheck;
            }
            get system() {
                const { system } = this.webspaceSecurity;
                return system;
            }
            render() {
                const { disabled, formInspector, value } = this.props;
                if (!formInspector.options.resourceKey) {
                    throw new Error('The "resourceKey" must be available in order to load the available permissions!');
                }
                return (<RolePermissions_1.default disabled={disabled || undefined} onChange={this.handleChange} permissionCheck={this.permissionCheck} resourceKey={formInspector.options.resourceKey} system={this.system} value={value ? value : {}} webspaceKey={this.webspaceKey}/>);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_webspace_decorators = [mobx_1.computed];
            _get_webspaceKey_decorators = [mobx_1.computed];
            _get_webspaceSecurity_decorators = [mobx_1.computed];
            _get_permissionCheck_decorators = [mobx_1.computed];
            _get_system_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_webspace_decorators, { kind: "getter", name: "webspace", static: false, private: false, access: { has: obj => "webspace" in obj, get: obj => obj.webspace }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_webspaceKey_decorators, { kind: "getter", name: "webspaceKey", static: false, private: false, access: { has: obj => "webspaceKey" in obj, get: obj => obj.webspaceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_webspaceSecurity_decorators, { kind: "getter", name: "webspaceSecurity", static: false, private: false, access: { has: obj => "webspaceSecurity" in obj, get: obj => obj.webspaceSecurity }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_permissionCheck_decorators, { kind: "getter", name: "permissionCheck", static: false, private: false, access: { has: obj => "permissionCheck" in obj, get: obj => obj.permissionCheck }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_system_decorators, { kind: "getter", name: "system", static: false, private: false, access: { has: obj => "system" in obj, get: obj => obj.system }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = RolePermissions;
