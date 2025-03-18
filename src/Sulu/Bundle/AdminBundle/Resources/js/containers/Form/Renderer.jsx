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
const json_pointer_1 = __importDefault(require("json-pointer"));
const Form_1 = __importDefault(require("../../components/Form"));
const Field_1 = __importDefault(require("./Field"));
const Section_1 = __importDefault(require("./Section"));
let Renderer = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _handleFieldFinish_decorators;
    let _handleFieldFinish_initializers = [];
    let _handleFieldFinish_extraInitializers = [];
    var Renderer = _classThis = class extends _classSuper {
        renderSection(schemaField, schemaKey, schemaPath) {
            const { data, formInspector } = this.props;
            const { items } = schemaField;
            return (<Section_1.default data={data} formInspector={formInspector} key={schemaKey} name={schemaKey} schema={schemaField}>
                {!!items &&
                    Object.keys(items).map((key) => this.renderItem(items[key], key, schemaPath + '/items/' + key))}
            </Section_1.default>);
        }
        renderField(schemaField, schemaKey, schemaPath) {
            const { data, dataPath, errors, formInspector, onChange, onSuccess, router, showAllErrors, value } = this.props;
            const itemDataPath = dataPath + '/' + schemaKey;
            const error = (showAllErrors || formInspector.isFieldModified(itemDataPath)) && errors && errors[schemaKey]
                ? errors[schemaKey]
                : undefined;
            return (<Field_1.default data={data} dataPath={itemDataPath} error={error} formInspector={formInspector} key={schemaKey + '_' + schemaField.type} name={schemaKey} onChange={onChange} onFinish={this.handleFieldFinish} onSuccess={onSuccess} router={router} schema={schemaField} schemaPath={schemaPath} showAllErrors={showAllErrors} value={json_pointer_1.default.has(value, '/' + schemaKey) ? json_pointer_1.default.get(value, '/' + schemaKey) : undefined}/>);
        }
        renderItem(schemaField, schemaKey, schemaPath) {
            if (schemaField.type === 'section') {
                return this.renderSection(schemaField, schemaKey, schemaPath);
            }
            return this.renderField(schemaField, schemaKey, schemaPath);
        }
        render() {
            const { schema, schemaPath, } = this.props;
            const schemaKeys = Object.keys(schema);
            return (<Form_1.default>
                {schemaKeys.map((schemaKey) => this.renderItem(schema[schemaKey], schemaKey, schemaPath + '/' + schemaKey))}
            </Form_1.default>);
        }
        constructor() {
            super(...arguments);
            this.handleFieldFinish = __runInitializers(this, _handleFieldFinish_initializers, (dataPath, schemaPath) => {
                const { onFieldFinish } = this.props;
                if (onFieldFinish) {
                    onFieldFinish(dataPath, schemaPath);
                }
            });
            __runInitializers(this, _handleFieldFinish_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Renderer");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _handleFieldFinish_decorators = [mobx_1.action];
        __esDecorate(null, null, _handleFieldFinish_decorators, { kind: "field", name: "handleFieldFinish", static: false, private: false, access: { has: obj => "handleFieldFinish" in obj, get: obj => obj.handleFieldFinish, set: (obj, value) => { obj.handleFieldFinish = value; } }, metadata: _metadata }, _handleFieldFinish_initializers, _handleFieldFinish_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Renderer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        showAllErrors: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Renderer = _classThis;
})();
exports.default = Renderer;
