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
const components_1 = require("sulu-admin-bundle/components");
const services_1 = require("sulu-admin-bundle/services");
const securityContextStore_1 = __importDefault(require("../../stores/securityContextStore"));
const SystemRolePermissions_1 = __importDefault(require("./SystemRolePermissions"));
let RolePermissions = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _roles_decorators;
    let _roles_initializers = [];
    let _roles_extraInitializers = [];
    let _componentDidMount_decorators;
    var RolePermissions = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.roles = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _roles_initializers, void 0));
            this.handleChange = (__runInitializers(this, _roles_extraInitializers), (newSystemValue, system) => {
                const { roles } = this;
                if (!roles) {
                    return;
                }
                const { onChange, value } = this.props;
                const systemRoles = roles.filter((role) => role.system === system);
                onChange(Object.assign(Object.assign({}, Object.keys(value).reduce((values, roleId) => {
                    if (systemRoles.some((systemRole) => systemRole.id.toString() == roleId)) {
                        return values;
                    }
                    values[roleId] = value[roleId];
                    return values;
                }, {})), newSystemValue));
            });
        }
        componentDidMount() {
            services_1.ResourceRequester.get('roles', { 'include-anonymous': true }).then((0, mobx_1.action)((response) => {
                this.roles = response._embedded.roles;
            }));
        }
        render() {
            const { roles } = this;
            const { disabled, permissionCheck, resourceKey, system, value, webspaceKey } = this.props;
            if (!roles) {
                return <components_1.Loader />;
            }
            const systems = permissionCheck && system
                ? [RolePermissions.suluSecuritySystem, system]
                : !permissionCheck && system
                    ? [RolePermissions.suluSecuritySystem]
                    : securityContextStore_1.default.getSystems();
            return systems.reduce((systemMatrices, system) => {
                const actions = securityContextStore_1.default.getAvailableActions(resourceKey, system);
                const systemRoles = roles.filter((role) => role.system === system);
                if (systemRoles.length === 0 || actions.length === 0) {
                    return systemMatrices;
                }
                const systemValues = Object.keys(value).reduce((systemValues, roleId) => {
                    if (!systemRoles.some((systemRole) => systemRole.id.toString() == roleId)) {
                        return systemValues;
                    }
                    systemValues[roleId] = value[roleId];
                    return systemValues;
                }, {});
                systemMatrices.push(<SystemRolePermissions_1.default actions={actions} disabled={disabled} key={system} onChange={this.handleChange} resourceKey={resourceKey} roles={systemRoles} system={system} values={systemValues} webspaceKey={webspaceKey}/>);
                return systemMatrices;
            }, []);
        }
    };
    __setFunctionName(_classThis, "RolePermissions");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _roles_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: obj => "roles" in obj, get: obj => obj.roles, set: (obj, value) => { obj.roles = value; } }, metadata: _metadata }, _roles_initializers, _roles_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RolePermissions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RolePermissions = _classThis;
})();
exports.default = RolePermissions;
