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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const Checkbox_1 = __importStar(require("../../../components/Checkbox"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFieldFilterType_1 = __importDefault(require("./AbstractFieldFilterType"));
let SelectFieldFilterType = (() => {
    var _a;
    let _classSuper = AbstractFieldFilterType_1.default;
    let _instanceExtraInitializers = [];
    let _get_parameterOptions_decorators;
    return _a = class SelectFieldFilterType extends _classSuper {
            constructor() {
                super(...arguments);
                this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (values) => {
                    this.onChange(values.length > 0 ? values : undefined);
                });
            }
            get parameterOptions() {
                const { parameters } = this;
                if (!parameters) {
                    throw new Error('The "SelectFieldFilterType" needs some parameters to work!');
                }
                const { options } = parameters;
                if (typeof options !== 'object' || options === null) {
                    throw new Error('The "options" parameter must be an object!');
                }
                return options;
            }
            getFormNode() {
                const { value } = this;
                return (<Checkbox_1.CheckboxGroup onChange={this.handleChange} values={value || []}>
                {Object.keys(this.parameterOptions).map((optionKey) => (<Checkbox_1.default key={optionKey} value={optionKey}>
                        {(0, Translator_1.translate)(this.parameterOptions[optionKey])}
                    </Checkbox_1.default>))}
            </Checkbox_1.CheckboxGroup>);
            }
            getValueNode(values) {
                if (!values) {
                    return Promise.resolve(null);
                }
                return Promise.resolve(values.map((value) => (0, Translator_1.translate)(this.parameterOptions[value])).join(', '));
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _get_parameterOptions_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_parameterOptions_decorators, { kind: "getter", name: "parameterOptions", static: false, private: false, access: { has: obj => "parameterOptions" in obj, get: obj => obj.parameterOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SelectFieldFilterType;
