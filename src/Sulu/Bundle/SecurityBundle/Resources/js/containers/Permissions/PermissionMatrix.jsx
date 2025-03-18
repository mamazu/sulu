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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const Permission_1 = require("../../utils/Permission");
const permissions_scss_1 = __importDefault(require("./permissions.scss"));
let PermissionMatrix = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    var PermissionMatrix = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.getMatrixValueFromContextPermission = (securityContextKey) => {
                for (const contextPermission of this.props.contextPermissions) {
                    if (securityContextKey === contextPermission.context) {
                        return contextPermission.permissions;
                    }
                }
                return {};
            };
            this.handleMatrixChange = (matrixValues) => {
                const { onChange, contextPermissions } = this.props;
                const newContextPermissions = (0, mobx_1.toJS)(contextPermissions);
                Object.keys(matrixValues).map((matrixValuesKey) => {
                    const matrixValue = matrixValues[matrixValuesKey];
                    for (const contextPermission of newContextPermissions) {
                        if (matrixValuesKey === contextPermission.context) {
                            contextPermission.permissions = matrixValue;
                            return;
                        }
                    }
                    newContextPermissions.push({
                        'id': undefined,
                        'context': matrixValuesKey,
                        'permissions': matrixValue,
                    });
                });
                onChange(newContextPermissions);
            };
        }
        renderMatrixRow(rowIndex, securityContextKey, actions) {
            const secondPointPosition = securityContextKey.indexOf('.', securityContextKey.indexOf('.') + 1) + 1;
            const title = securityContextKey.substring(secondPointPosition);
            return (<components_1.Matrix.Row key={'row-' + rowIndex} name={securityContextKey} title={title}>
                {actions.map((action, itemIndex) => (<components_1.Matrix.Item icon={(0, Permission_1.getActionIcon)(action)} key={'item-' + itemIndex} name={action} title={(0, utils_1.translate)('sulu_security.' + action)}/>))}
            </components_1.Matrix.Row>);
        }
        render() {
            const { disabled, title, subTitle, securityContexts } = this.props;
            const matrixValues = {};
            const matrixRows = [];
            Object.keys(securityContexts).map((securityContextKey, rowIndex) => {
                const actions = securityContexts[securityContextKey];
                matrixValues[securityContextKey] = this.getMatrixValueFromContextPermission(securityContextKey);
                matrixRows.push(this.renderMatrixRow(rowIndex, securityContextKey, actions));
            });
            return (<div className={permissions_scss_1.default.matrixContainer}>
                {title &&
                    <h2>{title}</h2>}
                {subTitle &&
                    <h3>{subTitle}</h3>}
                <components_1.Matrix disabled={disabled} onChange={this.handleMatrixChange} values={matrixValues}>
                    {matrixRows}
                </components_1.Matrix>
            </div>);
        }
    };
    __setFunctionName(_classThis, "PermissionMatrix");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionMatrix = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionMatrix = _classThis;
})();
exports.default = PermissionMatrix;
