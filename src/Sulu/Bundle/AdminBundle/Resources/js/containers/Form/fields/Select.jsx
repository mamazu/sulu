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
const MultiSelect_1 = __importDefault(require("../../../components/MultiSelect"));
let Select = (() => {
    var _a;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_values_decorators;
    return _a = class Select extends _classSuper {
            constructor(props) {
                super(props);
                this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (value) => {
                    const { onChange, onFinish } = this.props;
                    const allowedValues = this.values.map((value) => value.name);
                    const filteredValue = value.filter((v) => allowedValues.includes(v));
                    onChange(filteredValue.length > 0 ? filteredValue : undefined);
                    onFinish();
                });
                const { onChange, schemaOptions, value } = this.props;
                const { default_values: { value: defaultOptions, } = {}, } = schemaOptions;
                if (defaultOptions === undefined || defaultOptions === null) {
                    return;
                }
                if (!(0, mobx_1.isArrayLike)(defaultOptions)) {
                    throw new Error('The "default_values" schema option must be an array!');
                }
                const defaultValues = defaultOptions.map(({ name: defaultValue }) => {
                    if (typeof defaultValue !== 'number' && typeof defaultValue !== 'string') {
                        throw new Error('A single schema option of "default_values" must be a string or number');
                    }
                    return defaultValue;
                });
                if (value === undefined) {
                    onChange(defaultValues, { isDefaultValue: true });
                }
            }
            get values() {
                const { values } = this.props.schemaOptions;
                if (!values || !(0, mobx_1.isArrayLike)(values.value)) {
                    throw new Error('The "values" option has to be set for the Select FieldType');
                }
                return values.value;
            }
            render() {
                const { disabled, value } = this.props;
                return (<MultiSelect_1.default disabled={!!disabled} onChange={this.handleChange} values={value || []}>
                {this.values.map(({ name: value, title }) => {
                        if (typeof value !== 'string' && typeof value !== 'number') {
                            throw new Error('The children of "values" must only contain values of type string or number!');
                        }
                        return (<MultiSelect_1.default.Option key={value} value={value}>
                            {title}
                        </MultiSelect_1.default.Option>);
                    })}
            </MultiSelect_1.default>);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_values_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_values_decorators, { kind: "getter", name: "values", static: false, private: false, access: { has: obj => "values" in obj, get: obj => obj.values }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = Select;
