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
const utils_1 = require("sulu-admin-bundle/utils");
const securityContextStore_1 = __importDefault(require("../../stores/securityContextStore"));
const Permission_1 = require("../../utils/Permission");
const systemRolePermissions_scss_1 = __importDefault(require("./systemRolePermissions.scss"));
let SystemRolePermissions = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _active_decorators;
    let _active_initializers = [];
    let _active_extraInitializers = [];
    let _componentDidMount_decorators;
    let _handleActiveChange_decorators;
    let _handleActiveChange_initializers = [];
    let _handleActiveChange_extraInitializers = [];
    let _get_defaultValue_decorators;
    let _get_hasValues_decorators;
    var SystemRolePermissions = _classThis = class extends _classSuper {
        componentDidMount() {
            this.active = this.hasValues;
        }
        get defaultValue() {
            var _a;
            const { resourceKey, roles, webspaceKey } = this.props;
            if (!roles) {
                return {};
            }
            const securityContext = (_a = securityContextStore_1.default
                .getSecurityContextByResourceKey(resourceKey)) === null || _a === void 0 ? void 0 : _a.replace(SystemRolePermissions.webspacePlaceholder, webspaceKey || SystemRolePermissions.webspacePlaceholder);
            return roles.reduce((value, role) => {
                const rolePermission = role.permissions.find((permission) => permission.context === securityContext);
                value[role.id] = securityContextStore_1.default.getAvailableActions(resourceKey, role.system)
                    .reduce((actionValue, action) => {
                    actionValue[action] = rolePermission ? rolePermission.permissions[action] : false;
                    return actionValue;
                }, {});
                return value;
            }, {});
        }
        get hasValues() {
            const { values } = this.props;
            return Object.keys(values).length > 0;
        }
        render() {
            const { actions, disabled, roles, system, values } = this.props;
            return (<div className={systemRolePermissions_scss_1.default.systemRolePermissions}>
                <components_1.Heading label={(0, utils_1.translate)('sulu_security.system_permission_heading', { system })}>
                    <components_1.Toggler checked={this.active} onChange={this.handleActiveChange}/>
                </components_1.Heading>
                {this.active &&
                    <components_1.Matrix className={systemRolePermissions_scss_1.default.matrix} disabled={disabled} onChange={this.handleChange} values={this.hasValues ? values : this.defaultValue}>
                        {roles.map((role) => (<components_1.Matrix.Row key={role.id} name={role.id.toString()} title={role.name}>
                                {actions.map((action) => (<components_1.Matrix.Item icon={(0, Permission_1.getActionIcon)(action)} key={action} name={action}/>))}
                            </components_1.Matrix.Row>))}
                    </components_1.Matrix>}
            </div>);
        }
        constructor() {
            super(...arguments);
            this.active = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _active_initializers, false));
            this.handleChange = (__runInitializers(this, _active_extraInitializers), (values) => {
                const { onChange, system } = this.props;
                onChange(values, system);
            });
            this.handleActiveChange = __runInitializers(this, _handleActiveChange_initializers, (active) => {
                this.active = active;
                if (!this.active) {
                    const { onChange, system } = this.props;
                    onChange({}, system);
                }
            });
            __runInitializers(this, _handleActiveChange_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SystemRolePermissions");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _active_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        _handleActiveChange_decorators = [mobx_1.action];
        _get_defaultValue_decorators = [mobx_1.computed];
        _get_hasValues_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_defaultValue_decorators, { kind: "getter", name: "defaultValue", static: false, private: false, access: { has: obj => "defaultValue" in obj, get: obj => obj.defaultValue }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasValues_decorators, { kind: "getter", name: "hasValues", static: false, private: false, access: { has: obj => "hasValues" in obj, get: obj => obj.hasValues }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: obj => "active" in obj, get: obj => obj.active, set: (obj, value) => { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
        __esDecorate(null, null, _handleActiveChange_decorators, { kind: "field", name: "handleActiveChange", static: false, private: false, access: { has: obj => "handleActiveChange" in obj, get: obj => obj.handleActiveChange, set: (obj, value) => { obj.handleActiveChange = value; } }, metadata: _metadata }, _handleActiveChange_initializers, _handleActiveChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SystemRolePermissions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.webspacePlaceholder = '#webspace#';
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SystemRolePermissions = _classThis;
})();
exports.default = SystemRolePermissions;
