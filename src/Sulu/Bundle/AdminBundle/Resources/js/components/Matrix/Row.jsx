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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const index_1 = require("../../utils/index");
const row_scss_1 = __importDefault(require("./row.scss"));
let Row = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_allItemsDeactivated_decorators;
    var Row = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (itemName, value) => {
                const { name, onChange, values, } = this.props;
                if (!onChange) {
                    return;
                }
                const newValues = Object.assign({}, values);
                newValues[itemName] = value;
                onChange(name, newValues);
            });
            this.cloneItems = (originalItems) => {
                const { disabled, values } = this.props;
                return react_1.default.Children.map(originalItems, (item, index) => react_1.default.cloneElement(item, Object.assign(Object.assign({}, item.props), { disabled, key: `matrix-item-${index}`, onChange: this.handleChange, value: values[item.props.name] })));
            };
            this.handleAllButtonClick = () => {
                const { children, name, onChange, } = this.props;
                if (!onChange) {
                    return;
                }
                const newValues = {};
                react_1.default.Children.map(children, (child) => {
                    newValues[child.props.name] = this.allItemsDeactivated;
                });
                onChange(name, newValues);
            };
        }
        get allItemsDeactivated() {
            const { values } = this.props;
            for (const value in values) {
                if (values[value] === true) {
                    return false;
                }
            }
            return true;
        }
        renderAllButton() {
            return (<button className={row_scss_1.default.rowButton} onClick={this.handleAllButtonClick} type="button">
                {(0, index_1.translate)(this.allItemsDeactivated ? 'sulu_admin.activate_all' : 'sulu_admin.deactivate_all')}
            </button>);
        }
        render() {
            const { disabled, children, name, title, } = this.props;
            return (<tr className={row_scss_1.default.row}>
                <td className={row_scss_1.default.name}>{title ? title : name}</td>
                <td className={row_scss_1.default.items}>
                    {this.cloneItems(children)}
                    {!disabled && this.renderAllButton()}
                </td>
            </tr>);
        }
    };
    __setFunctionName(_classThis, "Row");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_allItemsDeactivated_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_allItemsDeactivated_decorators, { kind: "getter", name: "allItemsDeactivated", static: false, private: false, access: { has: obj => "allItemsDeactivated" in obj, get: obj => obj.allItemsDeactivated }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Row = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        values: {},
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Row = _classThis;
})();
exports.default = Row;
