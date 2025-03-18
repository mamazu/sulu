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
const metadataStore_1 = __importDefault(require("./metadataStore"));
let SchemaFormStoreDecorator = (() => {
    var _a;
    var _b;
    let _instanceExtraInitializers = [];
    let _innerFormStore_decorators;
    let _innerFormStore_initializers = [];
    let _innerFormStore_extraInitializers = [];
    let _get_data_decorators;
    let _get_dirty_decorators;
    let _get_errors_decorators;
    let _get_hasErrors_decorators;
    let _get_forbidden_decorators;
    let _get_notFound_decorators;
    let _get_unexpectedError_decorators;
    let _get_hasInvalidType_decorators;
    let _get_id_decorators;
    let _get_loading_decorators;
    let _get_locale_decorators;
    let _get_metadataOptions_decorators;
    let _get_options_decorators;
    let _get_resourceKey_decorators;
    let _get_schema_decorators;
    let _get_types_decorators;
    return _a = class SchemaFormStoreDecorator {
            constructor(initializer, formKey, type, metadataOptions) {
                this.innerFormStore = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _innerFormStore_initializers, void 0));
                __runInitializers(this, _innerFormStore_extraInitializers);
                Promise.all([
                    metadataStore_1.default.getSchema(formKey, type, metadataOptions),
                    metadataStore_1.default.getJsonSchema(formKey, type, metadataOptions),
                ]).then((0, mobx_1.action)(([schema, jsonSchema]) => {
                    this.innerFormStore = initializer(schema, jsonSchema);
                }));
            }
            change(dataPath, value, context) {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    var _b;
                    (_b = this.innerFormStore) === null || _b === void 0 ? void 0 : _b.change(dataPath, value, context);
                });
            }
            changeType(type, context) {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    var _b;
                    (_b = this.innerFormStore) === null || _b === void 0 ? void 0 : _b.changeType(type, context);
                });
            }
            changeMultiple(values, context) {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    var _b;
                    (_b = this.innerFormStore) === null || _b === void 0 ? void 0 : _b.changeMultiple(values, context);
                });
            }
            get data() {
                if (this.innerFormStore) {
                    return this.innerFormStore.data;
                }
                return {};
            }
            destroy() {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    var _b;
                    (_b = this.innerFormStore) === null || _b === void 0 ? void 0 : _b.destroy();
                });
            }
            get dirty() {
                if (this.innerFormStore) {
                    return this.innerFormStore.dirty;
                }
                return false;
            }
            set dirty(dirty) {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    this.innerFormStore.dirty = dirty;
                });
            }
            get errors() {
                if (this.innerFormStore) {
                    return this.innerFormStore.errors;
                }
                return [];
            }
            get hasErrors() {
                if (this.innerFormStore) {
                    return this.innerFormStore.hasErrors;
                }
                return false;
            }
            get forbidden() {
                if (this.innerFormStore) {
                    return this.innerFormStore.forbidden;
                }
                return false;
            }
            get notFound() {
                if (this.innerFormStore) {
                    return this.innerFormStore.notFound;
                }
                return false;
            }
            get unexpectedError() {
                if (this.innerFormStore) {
                    return this.innerFormStore.unexpectedError;
                }
                return false;
            }
            finishField(dataPath) {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    var _b;
                    (_b = this.innerFormStore) === null || _b === void 0 ? void 0 : _b.finishField(dataPath);
                });
            }
            getPathsByTag(tagName) {
                if (this.innerFormStore) {
                    return this.innerFormStore.getPathsByTag(tagName);
                }
                return [];
            }
            getSchemaEntryByPath(schemaPath) {
                if (this.innerFormStore) {
                    return this.innerFormStore.getSchemaEntryByPath(schemaPath);
                }
                return undefined;
            }
            getValueByPath(dataPath) {
                if (this.innerFormStore) {
                    return this.innerFormStore.getValueByPath(dataPath);
                }
                return false;
            }
            getValuesByTag(tagName) {
                if (this.innerFormStore) {
                    return this.innerFormStore.getValuesByTag(tagName);
                }
                return [];
            }
            get hasInvalidType() {
                if (this.innerFormStore) {
                    return this.innerFormStore.hasInvalidType;
                }
                return false;
            }
            get id() {
                if (this.innerFormStore) {
                    return this.innerFormStore.id;
                }
                return undefined;
            }
            isFieldModified(dataPath) {
                if (this.innerFormStore) {
                    return this.innerFormStore.isFieldModified(dataPath);
                }
                return false;
            }
            get loading() {
                if (this.innerFormStore) {
                    return this.innerFormStore.loading;
                }
                return true;
            }
            set loading(loading) {
                (0, mobx_1.when)(() => !!this.innerFormStore, () => {
                    this.innerFormStore.loading = loading;
                });
            }
            get locale() {
                if (this.innerFormStore) {
                    return this.innerFormStore.locale;
                }
                return undefined;
            }
            get metadataOptions() {
                if (this.innerFormStore) {
                    return this.innerFormStore.metadataOptions;
                }
                return undefined;
            }
            get options() {
                if (this.innerFormStore) {
                    return this.innerFormStore.options;
                }
                return {};
            }
            get resourceKey() {
                if (this.innerFormStore) {
                    return this.innerFormStore.resourceKey;
                }
                return undefined;
            }
            get schema() {
                if (this.innerFormStore) {
                    return this.innerFormStore.schema;
                }
                return {};
            }
            get types() {
                if (this.innerFormStore) {
                    return this.innerFormStore.types;
                }
                return {};
            }
            validate() {
                if (this.innerFormStore) {
                    return this.innerFormStore.validate();
                }
                return true;
            }
            /**
             * @deprecated
             */
            setType(type) {
                loglevel_1.default.warn('The "setType" method is deprecated and will be removed. ' +
                    'Use the "changeType" method instead.');
                // the setType method was removed from the FormStoreInterface
                // we still want to call it to keep backwards compatibility if it is defined
                if (this.innerFormStore && typeof this.innerFormStore.setType === 'function') {
                    return this.innerFormStore.setType(type);
                }
            }
            /**
             * @deprecated
             */
            setMultiple(data) {
                loglevel_1.default.warn('The "setMultiple" method is deprecated and will be removed. ' +
                    'Use the "changeMultiple" method instead.');
                // the setMultiple method was removed from the FormStoreInterface
                // we still want to call it to keep backwards compatibility if it is defined
                if (this.innerFormStore && typeof this.innerFormStore.setMultiple === 'function') {
                    this.innerFormStore.setMultiple(data);
                }
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _innerFormStore_decorators = [mobx_1.observable];
            _get_data_decorators = [mobx_1.computed];
            _get_dirty_decorators = [mobx_1.computed];
            _get_errors_decorators = [mobx_1.computed];
            _get_hasErrors_decorators = [mobx_1.computed];
            _get_forbidden_decorators = [mobx_1.computed];
            _get_notFound_decorators = [mobx_1.computed];
            _get_unexpectedError_decorators = [mobx_1.computed];
            _get_hasInvalidType_decorators = [mobx_1.computed];
            _get_id_decorators = [mobx_1.computed];
            _get_loading_decorators = [mobx_1.computed];
            _get_locale_decorators = [mobx_1.computed];
            _get_metadataOptions_decorators = [mobx_1.computed];
            _get_options_decorators = [mobx_1.computed];
            _get_resourceKey_decorators = [mobx_1.computed];
            _get_schema_decorators = [(_b = mobx_1.computed).struct.bind(_b)];
            _get_types_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_data_decorators, { kind: "getter", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dirty_decorators, { kind: "getter", name: "dirty", static: false, private: false, access: { has: obj => "dirty" in obj, get: obj => obj.dirty }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_errors_decorators, { kind: "getter", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_hasErrors_decorators, { kind: "getter", name: "hasErrors", static: false, private: false, access: { has: obj => "hasErrors" in obj, get: obj => obj.hasErrors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_forbidden_decorators, { kind: "getter", name: "forbidden", static: false, private: false, access: { has: obj => "forbidden" in obj, get: obj => obj.forbidden }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_notFound_decorators, { kind: "getter", name: "notFound", static: false, private: false, access: { has: obj => "notFound" in obj, get: obj => obj.notFound }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_unexpectedError_decorators, { kind: "getter", name: "unexpectedError", static: false, private: false, access: { has: obj => "unexpectedError" in obj, get: obj => obj.unexpectedError }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_hasInvalidType_decorators, { kind: "getter", name: "hasInvalidType", static: false, private: false, access: { has: obj => "hasInvalidType" in obj, get: obj => obj.hasInvalidType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_loading_decorators, { kind: "getter", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_locale_decorators, { kind: "getter", name: "locale", static: false, private: false, access: { has: obj => "locale" in obj, get: obj => obj.locale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_metadataOptions_decorators, { kind: "getter", name: "metadataOptions", static: false, private: false, access: { has: obj => "metadataOptions" in obj, get: obj => obj.metadataOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_options_decorators, { kind: "getter", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_schema_decorators, { kind: "getter", name: "schema", static: false, private: false, access: { has: obj => "schema" in obj, get: obj => obj.schema }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_types_decorators, { kind: "getter", name: "types", static: false, private: false, access: { has: obj => "types" in obj, get: obj => obj.types }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _innerFormStore_decorators, { kind: "field", name: "innerFormStore", static: false, private: false, access: { has: obj => "innerFormStore" in obj, get: obj => obj.innerFormStore, set: (obj, value) => { obj.innerFormStore = value; } }, metadata: _metadata }, _innerFormStore_initializers, _innerFormStore_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SchemaFormStoreDecorator;
