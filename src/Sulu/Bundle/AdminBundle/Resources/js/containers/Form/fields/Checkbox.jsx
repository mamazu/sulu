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
const Checkbox_1 = __importDefault(require("../../../components/Checkbox"));
const Toggler_1 = __importDefault(require("../../../components/Toggler"));
const Heading_1 = __importDefault(require("./Heading"));
let Checkbox = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_schemaOptions_decorators;
    let _get_label_decorators;
    let _get_skin_decorators;
    let _get_type_decorators;
    var Checkbox = _classThis = class extends _classSuper {
        get schemaOptions() {
            return this.props.schemaOptions;
        }
        get label() {
            var _a;
            return (_a = this.schemaOptions.label) === null || _a === void 0 ? void 0 : _a.title;
        }
        get skin() {
            var _a;
            return (_a = this.schemaOptions.skin) === null || _a === void 0 ? void 0 : _a.value;
        }
        get type() {
            var _a;
            return (_a = this.schemaOptions.type) === null || _a === void 0 ? void 0 : _a.value;
        }
        constructor(props) {
            super(props);
            this.handleChange = (__runInitializers(this, _instanceExtraInitializers), (checked) => {
                const { onChange, onFinish } = this.props;
                onChange(checked);
                onFinish();
            });
            this.handleHeadingChange = () => { };
            const { onChange, schemaOptions, value } = this.props;
            const { default_value: { value: defaultValue, } = {}, } = schemaOptions;
            if (defaultValue === undefined || defaultValue === null) {
                return;
            }
            if (typeof defaultValue !== 'boolean') {
                throw new Error('The "default_value" schema option must be a boolean if given!');
            }
            if (value === undefined) {
                onChange(defaultValue, { isDefaultValue: true });
            }
        }
        render() {
            const { disabled, value, } = this.props;
            const field = this.type === 'toggler'
                ? (<Toggler_1.default checked={!!value} disabled={!!disabled} onChange={this.handleChange}>
                    {this.skin !== 'heading' && this.label}
                </Toggler_1.default>)
                : (<Checkbox_1.default checked={!!value} disabled={!!disabled} onChange={this.handleChange}>
                    {this.skin !== 'heading' && this.label}
                </Checkbox_1.default>);
            if (this.skin === 'heading') {
                return (<Heading_1.default {...this.props} onChange={this.handleHeadingChange} value={undefined}>
                    {field}
                </Heading_1.default>);
            }
            return field;
        }
    };
    __setFunctionName(_classThis, "Checkbox");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_schemaOptions_decorators = [mobx_1.computed];
        _get_label_decorators = [mobx_1.computed];
        _get_skin_decorators = [mobx_1.computed];
        _get_type_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_schemaOptions_decorators, { kind: "getter", name: "schemaOptions", static: false, private: false, access: { has: obj => "schemaOptions" in obj, get: obj => obj.schemaOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_label_decorators, { kind: "getter", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_skin_decorators, { kind: "getter", name: "skin", static: false, private: false, access: { has: obj => "skin" in obj, get: obj => obj.skin }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_type_decorators, { kind: "getter", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Checkbox = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Checkbox = _classThis;
})();
exports.default = Checkbox;
