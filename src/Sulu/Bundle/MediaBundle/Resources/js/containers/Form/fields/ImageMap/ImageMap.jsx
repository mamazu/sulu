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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const stores_1 = require("sulu-admin-bundle/stores");
const ImageMap_1 = __importDefault(require("../../../ImageMap"));
const FieldRenderer_1 = __importDefault(require("./FieldRenderer"));
const MISSING_TYPE_ERROR_MESSAGE = 'The "image_map" field type needs at least one type to be configured!';
let ImageMap = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _setValue_decorators;
    let _setValue_initializers = [];
    let _setValue_extraInitializers = [];
    var ImageMap = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.value = __runInitializers(this, _value_initializers, void 0);
            this.setValue = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _setValue_initializers, (value) => {
                this.value = value;
            }));
            this.handleChange = (__runInitializers(this, _setValue_extraInitializers), (value) => {
                const { onChange } = this.props;
                this.setValue(value);
                onChange(value);
            });
            this.getHotspotFormSchemaType = (type) => {
                const { defaultType, schemaPath, types } = this.props;
                if (!type) {
                    throw new Error('It is impossible that a hotspot has no formType. This should not happen and is likely a bug.');
                }
                if (!types) {
                    throw new Error(MISSING_TYPE_ERROR_MESSAGE);
                }
                if (types[type]) {
                    return types[type];
                }
                if (!defaultType) {
                    throw new Error('It is impossible that a image_map has no defaultType. This should not happen and is likely a bug.');
                }
                if (!types[defaultType]) {
                    throw new Error('The default type should exist in image_map "' + schemaPath + '". ' +
                        'This should not happen and is likely a bug.');
                }
                return types[defaultType];
            };
            this.handleHotspotFormChange = (index, name, value) => {
                const { onChange } = this.props;
                const oldValues = this.value;
                if (!oldValues) {
                    throw new Error('It is impossible that this ImageMap has no value. This should not happen and is likely a bug.');
                }
                const newValues = (0, mobx_1.toJS)(oldValues);
                json_pointer_1.default.set(newValues.hotspots[index], '/' + name, value);
                this.setValue(newValues);
                onChange(newValues);
            };
            this.renderHotspotForm = (value, type, index) => {
                const { data, dataPath, error, formInspector, onFinish, onSuccess, router, schemaPath, showAllErrors, } = this.props;
                const hotspotFormSchemaType = this.getHotspotFormSchemaType(type);
                const errors = (0, mobx_1.toJS)(error);
                return (<FieldRenderer_1.default data={data} dataPath={dataPath + '/hotspots/' + index} errors={errors && errors.length > index && errors[index] ? errors[index] : undefined} formInspector={formInspector} index={index} onChange={this.handleHotspotFormChange} onFieldFinish={onFinish} onSuccess={onSuccess} router={router} schema={hotspotFormSchemaType.form} schemaPath={schemaPath + '/types/' + type + '/form'} showAllErrors={showAllErrors} value={value}/>);
            };
            this.setValue(this.props.value);
        }
        componentDidUpdate(prevProps) {
            const { value } = this.props;
            if (!(0, fast_deep_equal_1.default)(prevProps.value, value)) {
                this.setValue(value);
            }
        }
        render() {
            const { defaultType, disabled, error, formInspector, onFinish, types, } = this.props;
            const locale = formInspector.locale
                ? formInspector.locale
                : mobx_1.observable.box(stores_1.userStore.contentLocale);
            if (!defaultType) {
                throw new Error('The "image_map" field type needs a defaultType!');
            }
            if (!types) {
                throw new Error(MISSING_TYPE_ERROR_MESSAGE);
            }
            const formTypes = Object.keys(types).reduce((formTypes, current) => {
                formTypes[current] = types[current].title;
                return formTypes;
            }, {});
            return (<ImageMap_1.default defaultFormType={defaultType} disabled={!!disabled} locale={locale} onChange={this.handleChange} onFinish={onFinish} renderHotspotForm={this.renderHotspotForm} types={formTypes} valid={!error} value={this.value || undefined}/>);
        }
    };
    __setFunctionName(_classThis, "ImageMap");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _value_decorators = [mobx_1.observable];
        _setValue_decorators = [mobx_1.action];
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
        __esDecorate(null, null, _setValue_decorators, { kind: "field", name: "setValue", static: false, private: false, access: { has: obj => "setValue" in obj, get: obj => obj.setValue, set: (obj, value) => { obj.setValue = value; } }, metadata: _metadata }, _setValue_initializers, _setValue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ImageMap = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ImageMap = _classThis;
})();
exports.default = ImageMap;
