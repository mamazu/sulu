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
const moment_1 = __importDefault(require("moment"));
const DatePicker_1 = __importDefault(require("../../../components/DatePicker"));
function createStringValue(value, format) {
    if (!value) {
        return undefined;
    }
    return (0, moment_1.default)(value).format(format);
}
function getValue(value, format) {
    if (!value) {
        return undefined;
    }
    const momentObject = (0, moment_1.default)(value, format);
    if (!momentObject.isValid()) {
        return undefined;
    }
    return momentObject.toDate();
}
let DatePicker = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_format_decorators;
    var DatePicker = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (value) => {
                const { onChange, onFinish } = this.props;
                const stringValue = createStringValue(value, this.format);
                onChange(stringValue);
                onFinish();
            });
        }
        get format() {
            const { fieldTypeOptions } = this.props;
            const { dateFormat, timeFormat } = fieldTypeOptions;
            if (dateFormat && timeFormat) {
                return 'YYYY-MM-DDTHH:mm:ss';
            }
            if (dateFormat) {
                return 'YYYY-MM-DD';
            }
            return 'HH:mm:ss';
        }
        render() {
            const { dataPath, disabled, error, fieldTypeOptions, value } = this.props;
            const { dateFormat, timeFormat } = fieldTypeOptions;
            if (dateFormat === undefined || timeFormat === undefined) {
                throw new Error('The "dateFormat" and "timeFormat" fieldTypeOption have to be set!');
            }
            const options = {};
            if (timeFormat) {
                options.timeFormat = timeFormat;
            }
            if (!dateFormat) {
                options.dateFormat = false;
            }
            return (<DatePicker_1.default disabled={!!disabled} id={dataPath} onChange={this.handleChange} options={options} valid={!error} value={getValue(value, this.format)}/>);
        }
    };
    __setFunctionName(_classThis, "DatePicker");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_format_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_format_decorators, { kind: "getter", name: "format", static: false, private: false, access: { has: obj => "format" in obj, get: obj => obj.format }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DatePicker = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DatePicker = _classThis;
})();
exports.default = DatePicker;
