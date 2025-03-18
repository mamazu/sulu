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
const Number_1 = __importDefault(require("../../../components/Number"));
let Number = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_min_decorators;
    let _get_max_decorators;
    let _get_step_decorators;
    var Number = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleBlur = (__runInitializers(this, _instanceExtraInitializers), () => {
                this.props.onFinish();
            });
        }
        get min() {
            const { schemaOptions } = this.props;
            return schemaOptions.min ? parseFloat(schemaOptions.min.value) : undefined;
        }
        get max() {
            const { schemaOptions } = this.props;
            return schemaOptions.max ? parseFloat(schemaOptions.max.value) : undefined;
        }
        get step() {
            const { schemaOptions } = this.props;
            return schemaOptions.step ? parseFloat(schemaOptions.step.value) : undefined;
        }
        render() {
            const { dataPath, disabled, error, onChange, value } = this.props;
            return (<Number_1.default disabled={!!disabled} id={dataPath} max={this.max} min={this.min} onBlur={this.handleBlur} onChange={onChange} step={this.step} valid={!error} value={value}/>);
        }
    };
    __setFunctionName(_classThis, "Number");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_min_decorators = [mobx_1.computed];
        _get_max_decorators = [mobx_1.computed];
        _get_step_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_min_decorators, { kind: "getter", name: "min", static: false, private: false, access: { has: obj => "min" in obj, get: obj => obj.min }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_max_decorators, { kind: "getter", name: "max", static: false, private: false, access: { has: obj => "max" in obj, get: obj => obj.max }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_step_decorators, { kind: "getter", name: "step", static: false, private: false, access: { has: obj => "step" in obj, get: obj => obj.step }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Number = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Number = _classThis;
})();
exports.default = Number;
