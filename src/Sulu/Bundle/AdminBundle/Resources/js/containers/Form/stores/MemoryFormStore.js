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
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const json_pointer_1 = __importDefault(require("json-pointer"));
const Ajv_1 = require("../../../utils/Ajv");
const AbstractFormStore_1 = __importDefault(require("./AbstractFormStore"));
const ajv = (0, Ajv_1.createAjv)();
let MemoryFormStore = (() => {
    var _a;
    let _classSuper = AbstractFormStore_1.default;
    let _instanceExtraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _dirty_decorators;
    let _dirty_initializers = [];
    let _dirty_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _types_decorators;
    let _types_initializers = [];
    let _types_extraInitializers = [];
    let _change_decorators;
    let _changeMultiple_decorators;
    let _setMultiple_decorators;
    return _a = class MemoryFormStore extends _classSuper {
            constructor(data, schema, jsonSchema, locale, metadataOptions) {
                super();
                this.id = (__runInitializers(this, _instanceExtraInitializers), undefined);
                this.options = {};
                this.resourceKey = undefined;
                this.data = __runInitializers(this, _data_initializers, void 0);
                this.dirty = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _dirty_initializers, false));
                this.loading = (__runInitializers(this, _dirty_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.types = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _types_initializers, {}));
                __runInitializers(this, _types_extraInitializers);
                this.data = data;
                this.schema = schema;
                this.locale = locale;
                this.addMissingSchemaProperties();
                this.validator = jsonSchema ? ajv.compile(jsonSchema) : undefined;
                this.metadataOptions = metadataOptions;
            }
            change(dataPath, value, context) {
                const sanitizedDataPath = !dataPath.startsWith('/') ? '/' + dataPath : dataPath;
                json_pointer_1.default.set(this.data, sanitizedDataPath, value);
                if (!(context === null || context === void 0 ? void 0 : context.isDefaultValue) && !(context === null || context === void 0 ? void 0 : context.isServerValue)) {
                    this.dirty = true;
                }
            }
            changeMultiple(values, context) {
                Object.keys(values).forEach((path) => {
                    this.change(path, values[path], context);
                });
                (0, mobx_1.set)(this.data, this.data);
            }
            get hasInvalidType() {
                return false;
            }
            /**
             * @deprecated
             */
            setMultiple(data) {
                loglevel_1.default.warn('The "setMultiple" method is deprecated and will be removed. ' +
                    'Use the "changeMultiple" method instead.');
                this.data = Object.assign(Object.assign({}, this.data), data);
            }
            changeType() {
                throw new Error('The MemoryFormStore cannot handle types');
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _data_decorators = [mobx_1.observable];
            _dirty_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _types_decorators = [mobx_1.observable];
            _change_decorators = [mobx_1.action];
            _changeMultiple_decorators = [mobx_1.action];
            _setMultiple_decorators = [mobx_1.action];
            __esDecorate(_a, null, _change_decorators, { kind: "method", name: "change", static: false, private: false, access: { has: obj => "change" in obj, get: obj => obj.change }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _changeMultiple_decorators, { kind: "method", name: "changeMultiple", static: false, private: false, access: { has: obj => "changeMultiple" in obj, get: obj => obj.changeMultiple }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setMultiple_decorators, { kind: "method", name: "setMultiple", static: false, private: false, access: { has: obj => "setMultiple" in obj, get: obj => obj.setMultiple }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _dirty_decorators, { kind: "field", name: "dirty", static: false, private: false, access: { has: obj => "dirty" in obj, get: obj => obj.dirty, set: (obj, value) => { obj.dirty = value; } }, metadata: _metadata }, _dirty_initializers, _dirty_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _types_decorators, { kind: "field", name: "types", static: false, private: false, access: { has: obj => "types" in obj, get: obj => obj.types, set: (obj, value) => { obj.types = value; } }, metadata: _metadata }, _types_initializers, _types_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = MemoryFormStore;
