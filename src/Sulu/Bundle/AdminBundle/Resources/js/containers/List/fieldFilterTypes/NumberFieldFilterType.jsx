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
const Input_1 = __importDefault(require("../../../components/Input"));
const SingleSelect_1 = __importDefault(require("../../../components/SingleSelect"));
const AbstractFieldFilterType_1 = __importDefault(require("./AbstractFieldFilterType"));
const numberFieldFilterType_scss_1 = __importDefault(require("./numberFieldFilterType.scss"));
const operatorMapping = {
    lt: '<',
    eq: '=',
    gt: '>',
};
function getOperatorFromValue(value) {
    const valueKeys = value ? Object.keys(value) : [];
    if (valueKeys.length > 1) {
        throw new Error('The "NumberFilterFieldType" only accepts an array with exactly one key!');
    }
    return valueKeys[0];
}
function getNumberFromValue(value) {
    if (!value) {
        return undefined;
    }
    return value[getOperatorFromValue(value)];
}
let NumberFieldFilterType = (() => {
    var _a;
    let _classSuper = AbstractFieldFilterType_1.default;
    let _instanceExtraInitializers = [];
    let _get_operator_decorators;
    let _get_number_decorators;
    return _a = class NumberFieldFilterType extends _classSuper {
            constructor(onChange, parameters, value) {
                super(onChange, parameters, value);
                this.handleOperatorChange = (__runInitializers(this, _instanceExtraInitializers), (operatorValue) => {
                    if (!operatorValue) {
                        throw new Error('The operator cannot be changed to undefined! This should not happen and is likely a bug.');
                    }
                    const { onChange } = this;
                    onChange({ [operatorValue]: this.number });
                });
                this.handleInputChange = (inputValue) => {
                    const { onChange } = this;
                    onChange({ [this.operator]: inputValue });
                };
                if (value === undefined) {
                    onChange({ eq: undefined });
                }
            }
            get operator() {
                return getOperatorFromValue(this.value);
            }
            get number() {
                return getNumberFromValue(this.value);
            }
            setInputRef(ref) {
                if (ref) {
                    ref.focus();
                }
            }
            getFormNode() {
                return (<div className={numberFieldFilterType_scss_1.default.numberFieldFilterType}>
                <SingleSelect_1.default onChange={this.handleOperatorChange} value={this.operator}>
                    <SingleSelect_1.default.Option value="lt">{operatorMapping.lt}</SingleSelect_1.default.Option>
                    <SingleSelect_1.default.Option value="eq">{operatorMapping.eq}</SingleSelect_1.default.Option>
                    <SingleSelect_1.default.Option value="gt">{operatorMapping.gt}</SingleSelect_1.default.Option>
                </SingleSelect_1.default>
                <Input_1.default inputRef={this.setInputRef} onChange={this.handleInputChange} type="number" value={this.number}/>
            </div>);
            }
            getValueNode(value) {
                return Promise.resolve((operatorMapping[getOperatorFromValue(value)] || '') + ' ' + (getNumberFromValue(value) || ''));
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_operator_decorators = [mobx_1.computed];
            _get_number_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_operator_decorators, { kind: "getter", name: "operator", static: false, private: false, access: { has: obj => "operator" in obj, get: obj => obj.operator }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_number_decorators, { kind: "getter", name: "number", static: false, private: false, access: { has: obj => "number" in obj, get: obj => obj.number }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = NumberFieldFilterType;
