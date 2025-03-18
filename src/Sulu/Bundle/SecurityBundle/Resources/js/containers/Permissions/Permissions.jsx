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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const stores_1 = require("sulu-page-bundle/stores");
const securityContextStore_1 = __importDefault(require("../../stores/securityContextStore"));
const permissions_scss_1 = __importDefault(require("./permissions.scss"));
const PermissionMatrix_1 = __importDefault(require("./PermissionMatrix"));
let Permissions = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _securityContextGroups_decorators;
    let _securityContextGroups_initializers = [];
    let _securityContextGroups_extraInitializers = [];
    let _componentDidMount_decorators;
    let _setSecurityContextGroups_decorators;
    let _get_system_decorators;
    let _get_webspaceContextPermissionPrefix_decorators;
    let _get_webspaceSecurityContextGroupKey_decorators;
    let _get_selectedWebspaces_decorators;
    let _handleWebspaceChange_decorators;
    let _handleWebspaceChange_initializers = [];
    let _handleWebspaceChange_extraInitializers = [];
    var Permissions = _classThis = class extends _classSuper {
        componentDidMount() {
            this.systemDisposer = (0, mobx_1.autorun)(() => this.setSecurityContextGroups(securityContextStore_1.default.getSecurityContextGroups(this.system)));
        }
        setSecurityContextGroups(securityContextGroups) {
            this.securityContextGroups = securityContextGroups;
        }
        componentWillUnmount() {
            this.systemDisposer();
        }
        get system() {
            return this.props.system;
        }
        get webspaceContextPermissionPrefix() {
            if (this.webspaceSecurityContextGroupKey) {
                const securityContextGroup = this.securityContextGroups[this.webspaceSecurityContextGroupKey];
                for (const securityContextKey of Object.keys(securityContextGroup)) {
                    if (securityContextKey.includes(Permissions.webspacePlaceholder)) {
                        return securityContextKey.substring(0, securityContextKey.indexOf('#'));
                    }
                }
            }
            throw new Error('Webspace context permission prefix not found');
        }
        get webspaceSecurityContextGroupKey() {
            for (const securityContextGroupKey of Object.keys(this.securityContextGroups)) {
                const securityContextGroup = this.securityContextGroups[securityContextGroupKey];
                for (const securityContextKey of Object.keys(securityContextGroup)) {
                    if (securityContextKey.includes(Permissions.webspacePlaceholder)) {
                        return securityContextGroupKey;
                    }
                }
            }
            return null;
        }
        get selectedWebspaces() {
            const selectedWebspaces = [];
            for (const contextPermission of this.props.value) {
                if (contextPermission.context.startsWith(this.webspaceContextPermissionPrefix)) {
                    const webspaceKey = contextPermission.context.replace(this.webspaceContextPermissionPrefix, '');
                    if (webspaceKey.includes('.')) {
                        continue;
                    }
                    selectedWebspaces.push(webspaceKey);
                }
            }
            return selectedWebspaces.sort();
        }
        getWebspaceSecurityContexts(webspace) {
            if (!this.webspaceSecurityContextGroupKey) {
                return {};
            }
            const webspaceSecurityContextGroup = this.securityContextGroups[this.webspaceSecurityContextGroupKey];
            const securityContexts = {};
            Object.keys(webspaceSecurityContextGroup).sort().map((securityContextKey) => {
                securityContexts[securityContextKey.replace(Permissions.webspacePlaceholder, webspace)]
                    = webspaceSecurityContextGroup[securityContextKey];
            });
            return securityContexts;
        }
        renderWebspaceMatrixes() {
            const { disabled, value } = this.props;
            if (!this.webspaceSecurityContextGroupKey) {
                return null;
            }
            return (<react_1.Fragment>
                <h2>{this.webspaceSecurityContextGroupKey}</h2>
                <div className={permissions_scss_1.default.selectContainer}>
                    <components_1.MultiSelect disabled={disabled} onChange={this.handleWebspaceChange} values={this.selectedWebspaces}>
                        {stores_1.webspaceStore.allWebspaces.map((webspace) => (<components_1.MultiSelect.Option key={webspace.key} value={webspace.key}>
                                {webspace.name}
                            </components_1.MultiSelect.Option>))}
                    </components_1.MultiSelect>
                </div>
                <div className={permissions_scss_1.default.matrixContainer}>
                    {this.selectedWebspaces.map((webspace, matrixIndex) => {
                    return (<PermissionMatrix_1.default contextPermissions={value} disabled={disabled} key={matrixIndex} onChange={this.handleChange} securityContexts={this.getWebspaceSecurityContexts(webspace)} subTitle={webspace}/>);
                })}
                </div>
            </react_1.Fragment>);
        }
        renderMatrixes() {
            const { disabled, value } = this.props;
            return Object.keys(this.securityContextGroups).sort().map((securityContextGroupKey, matrixIndex) => {
                // ignore webspace group here
                if (this.webspaceSecurityContextGroupKey
                    && this.webspaceSecurityContextGroupKey === securityContextGroupKey) {
                    return null;
                }
                const securityContexts = this.securityContextGroups[securityContextGroupKey];
                return (<PermissionMatrix_1.default contextPermissions={value} disabled={disabled} key={matrixIndex} onChange={this.handleChange} securityContexts={securityContexts} title={securityContextGroupKey}/>);
            });
        }
        render() {
            if (!this.securityContextGroups) {
                return <components_1.Loader />;
            }
            return (<react_1.Fragment>
                {this.renderWebspaceMatrixes()}
                {this.renderMatrixes()}
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.systemDisposer = __runInitializers(this, _instanceExtraInitializers);
            this.securityContextGroups = __runInitializers(this, _securityContextGroups_initializers, void 0);
            this.handleChange = (__runInitializers(this, _securityContextGroups_extraInitializers), (value) => {
                const { onChange } = this.props;
                onChange(value);
            });
            this.handleWebspaceChange = __runInitializers(this, _handleWebspaceChange_initializers, (newSelectedWebspaces) => {
                const newContextPermissions = [];
                for (const contextPermission of this.props.value) {
                    if (contextPermission.context.startsWith(this.webspaceContextPermissionPrefix)) {
                        const suffix = contextPermission.context.replace(this.webspaceContextPermissionPrefix, '');
                        const webspaceKey = !suffix.includes('.') ? suffix : suffix.substring(0, suffix.indexOf('.'));
                        if (!newSelectedWebspaces.includes(webspaceKey)) {
                            continue;
                        }
                    }
                    newContextPermissions.push(contextPermission);
                }
                const webspacesToAdd = newSelectedWebspaces.filter((newSelectedWebspace) => {
                    return !this.selectedWebspaces.includes(newSelectedWebspace);
                });
                for (const webspaceToAdd of webspacesToAdd) {
                    const securityContexts = this.getWebspaceSecurityContexts(webspaceToAdd.toString());
                    Object.keys(securityContexts).map((securityContextKey) => {
                        const permissions = {};
                        const actions = securityContexts[securityContextKey];
                        for (const action of actions) {
                            permissions[action] = false;
                        }
                        const newContextPermission = {
                            'id': undefined,
                            'context': securityContextKey,
                            permissions,
                        };
                        newContextPermissions.push(newContextPermission);
                    });
                }
                this.handleChange(newContextPermissions);
            });
            __runInitializers(this, _handleWebspaceChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Permissions");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _securityContextGroups_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        _setSecurityContextGroups_decorators = [mobx_1.action];
        _get_system_decorators = [mobx_1.computed];
        _get_webspaceContextPermissionPrefix_decorators = [mobx_1.computed];
        _get_webspaceSecurityContextGroupKey_decorators = [mobx_1.computed];
        _get_selectedWebspaces_decorators = [mobx_1.computed];
        _handleWebspaceChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setSecurityContextGroups_decorators, { kind: "method", name: "setSecurityContextGroups", static: false, private: false, access: { has: obj => "setSecurityContextGroups" in obj, get: obj => obj.setSecurityContextGroups }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_system_decorators, { kind: "getter", name: "system", static: false, private: false, access: { has: obj => "system" in obj, get: obj => obj.system }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_webspaceContextPermissionPrefix_decorators, { kind: "getter", name: "webspaceContextPermissionPrefix", static: false, private: false, access: { has: obj => "webspaceContextPermissionPrefix" in obj, get: obj => obj.webspaceContextPermissionPrefix }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_webspaceSecurityContextGroupKey_decorators, { kind: "getter", name: "webspaceSecurityContextGroupKey", static: false, private: false, access: { has: obj => "webspaceSecurityContextGroupKey" in obj, get: obj => obj.webspaceSecurityContextGroupKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_selectedWebspaces_decorators, { kind: "getter", name: "selectedWebspaces", static: false, private: false, access: { has: obj => "selectedWebspaces" in obj, get: obj => obj.selectedWebspaces }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _securityContextGroups_decorators, { kind: "field", name: "securityContextGroups", static: false, private: false, access: { has: obj => "securityContextGroups" in obj, get: obj => obj.securityContextGroups, set: (obj, value) => { obj.securityContextGroups = value; } }, metadata: _metadata }, _securityContextGroups_initializers, _securityContextGroups_extraInitializers);
        __esDecorate(null, null, _handleWebspaceChange_decorators, { kind: "field", name: "handleWebspaceChange", static: false, private: false, access: { has: obj => "handleWebspaceChange" in obj, get: obj => obj.handleWebspaceChange, set: (obj, value) => { obj.handleWebspaceChange = value; } }, metadata: _metadata }, _handleWebspaceChange_initializers, _handleWebspaceChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Permissions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
    };
    _classThis.webspacePlaceholder = '#webspace#';
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Permissions = _classThis;
})();
exports.default = Permissions;
