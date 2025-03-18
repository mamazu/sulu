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
const mobx_1 = require("mobx");
const json_pointer_1 = __importDefault(require("json-pointer"));
const loglevel_1 = __importDefault(require("loglevel"));
const Ajv_1 = require("../../../utils/Ajv");
const AbstractFormStore_1 = __importStar(require("./AbstractFormStore"));
const metadataStore_1 = __importDefault(require("./metadataStore"));
// TODO do not hardcode "template", use some kind of metadata instead
const TYPE_PROPERTY = 'template';
const ajv = (0, Ajv_1.createAjv)();
function mergeData(localSchema, remoteSchema, localData, remoteData) {
    var _a;
    let result = {};
    if (!localSchema || !remoteSchema) {
        return result;
    }
    for (const name in remoteSchema) {
        const { items: remoteItems, defaultType: remoteDefaultType, type: remoteType, types: remoteTypes, } = remoteSchema[name];
        const { items: localItems, defaultType: localDefaultType, type: localType, types: localTypes, } = localSchema[name] || {};
        if (remoteType === AbstractFormStore_1.SECTION_TYPE && remoteItems) {
            result = mergeData(localSchema, remoteItems, localData, remoteData);
            continue;
        }
        if (localType === AbstractFormStore_1.SECTION_TYPE && localItems) {
            result = mergeData(localItems, remoteSchema, localData, remoteData);
            continue;
        }
        if (remoteTypes && localTypes
            && Object.keys(remoteTypes).length > 0 && Object.keys(localTypes).length > 0
            && localData[name] && remoteData[name]
            && (0, mobx_1.isArrayLike)(localData[name]) && (0, mobx_1.isArrayLike)(remoteData[name])) {
            for (let key = 0; key < Math.max(remoteData[name].length, localData[name].length); ++key) {
                const remoteChildData = (0, mobx_1.toJS)(remoteData[name].length > key ? remoteData[name][key] || {} : {});
                const localChildData = (0, mobx_1.toJS)(localData[name].length > key ? localData[name][key] || {} : {});
                const localChildDataType = localChildData === null || localChildData === void 0 ? void 0 : localChildData.type;
                const resultType = localChildDataType && localChildDataType in remoteTypes
                    ? localChildDataType
                    : (remoteChildData === null || remoteChildData === void 0 ? void 0 : remoteChildData.type) || remoteDefaultType;
                const localChildSchema = 
                // $FlowFixMe
                ((_a = localTypes[localChildData.type]) === null || _a === void 0 ? void 0 : _a.form) || localTypes[localDefaultType].form;
                const remoteChildSchema = remoteTypes[resultType].form;
                const resultChildData = mergeData(localChildSchema, remoteChildSchema, localChildData, remoteChildData);
                if (!result[name]) {
                    result[name] = [];
                }
                if (Object.keys(resultChildData).length > 0) {
                    resultChildData.type = resultType;
                    resultChildData.settings = (localChildData === null || localChildData === void 0 ? void 0 : localChildData.settings) || remoteChildData.settings;
                    result[name].push(resultChildData);
                }
            }
            continue;
        }
        if (localData[name] && remoteType === localType) {
            result[name] = localData[name];
        }
        else {
            result[name] = remoteData[name];
        }
    }
    return result;
}
let ResourceFormStore = (() => {
    var _a;
    let _classSuper = AbstractFormStore_1.default;
    let _instanceExtraInitializers = [];
    let _types_decorators;
    let _types_initializers = [];
    let _types_extraInitializers = [];
    let _schemaLoading_decorators;
    let _schemaLoading_initializers = [];
    let _schemaLoading_extraInitializers = [];
    let _typesLoading_decorators;
    let _typesLoading_initializers = [];
    let _typesLoading_extraInitializers = [];
    let _handleSchemaTypeResponse_decorators;
    let _handleSchemaTypeResponse_initializers = [];
    let _handleSchemaTypeResponse_extraInitializers = [];
    let _get_hasTypes_decorators;
    let _get_hasInvalidType_decorators;
    let _get_loading_decorators;
    let _get_data_decorators;
    let _get_type_decorators;
    let _save_decorators;
    let _get_locale_decorators;
    let _get_resourceKey_decorators;
    let _get_id_decorators;
    let _get_saving_decorators;
    let _get_deleting_decorators;
    let _get_forbidden_decorators;
    let _get_notFound_decorators;
    let _get_unexpectedError_decorators;
    let _get_dirty_decorators;
    let _setSchemaLoading_decorators;
    let _setType_decorators;
    let _changeType_decorators;
    return _a = class ResourceFormStore extends _classSuper {
            constructor(resourceStore, formKey, options = {}, metadataOptions) {
                super();
                this.resourceStore = __runInitializers(this, _instanceExtraInitializers);
                this.types = __runInitializers(this, _types_initializers, {});
                this.schemaLoading = (__runInitializers(this, _types_extraInitializers), __runInitializers(this, _schemaLoading_initializers, true));
                this.typesLoading = (__runInitializers(this, _schemaLoading_extraInitializers), __runInitializers(this, _typesLoading_initializers, true));
                this.schemaDisposer = __runInitializers(this, _typesLoading_extraInitializers);
                this.handleSchemaTypeResponse = __runInitializers(this, _handleSchemaTypeResponse_initializers, (schemaTypes) => {
                    const { types = {}, defaultType, } = schemaTypes || {};
                    this.types = types;
                    this.typesLoading = false;
                    if (this.hasTypes) {
                        // set default type to the resource store if the loaded data does not contain a type
                        (0, mobx_1.when)(() => !this.resourceStore.loading, () => {
                            const type = this.resourceStore.data[TYPE_PROPERTY] || defaultType || Object.keys(this.types)[0];
                            (0, mobx_1.set)(this.data, { [TYPE_PROPERTY]: type });
                        });
                    }
                    this.schemaDisposer = (0, mobx_1.autorun)(() => {
                        if (this.hasTypes && !this.type) {
                            this.setSchemaLoading(false);
                            return;
                        }
                        if (this.hasTypes && this.type && !this.types[this.type]) {
                            this.setSchemaLoading(false);
                            return;
                        }
                        this.setSchemaLoading(true);
                        Promise.all([
                            metadataStore_1.default.getSchema(this.formKey, this.type, this.metadataOptions),
                            metadataStore_1.default.getJsonSchema(this.formKey, this.type, this.metadataOptions),
                        ]).then(this.handleSchemaResponse);
                    });
                });
                this.handleSchemaResponse = (__runInitializers(this, _handleSchemaTypeResponse_extraInitializers), ([schema, jsonSchema]) => {
                    this.validator = jsonSchema ? ajv.compile(jsonSchema) : undefined;
                    this.pathsByTag = {};
                    return this.loadAndMergeRemoteData(this.schema, schema).then((0, mobx_1.action)(() => {
                        this.schema = schema;
                        this.addMissingSchemaProperties();
                        this.validate();
                        this.setSchemaLoading(false);
                    }));
                });
                this.loadAndMergeRemoteData = (localSchema, remoteSchema) => {
                    // load data only after initial schema was set to prevent duplicate requests during initialization
                    if (localSchema) {
                        return this.resourceStore.requestRemoteData({ template: this.type }).then((data) => {
                            const result = mergeData(localSchema, remoteSchema, this.data, data);
                            this.setMultiple(result);
                        });
                    }
                    return Promise.resolve();
                };
                this.resourceStore = resourceStore;
                this.formKey = formKey;
                this.options = options;
                this.metadataOptions = metadataOptions;
                metadataStore_1.default.getSchemaTypes(this.formKey, this.metadataOptions)
                    .then(this.handleSchemaTypeResponse);
            }
            destroy() {
                if (this.schemaDisposer) {
                    this.schemaDisposer();
                }
            }
            get hasTypes() {
                return Object.keys(this.types).length > 0;
            }
            get hasInvalidType() {
                return !!this.types && !!this.type && !(0, mobx_1.get)(this.types, this.type);
            }
            get loading() {
                return this.resourceStore.loading || this.schemaLoading;
            }
            get data() {
                return this.resourceStore.data;
            }
            get type() {
                return this.hasTypes ? (0, mobx_1.get)(this.data, TYPE_PROPERTY) : undefined;
            }
            save(options = {}) {
                if (!this.validate()) {
                    return Promise.reject('Errors occured when trying to save the data from the FormStore');
                }
                return this.resourceStore.save(Object.assign(Object.assign({}, this.options), options)).then((response) => {
                    const { modifiedFields } = this;
                    modifiedFields.splice(0, modifiedFields.length);
                    return response;
                }).catch((errorResponse) => {
                    return errorResponse.json().then((0, mobx_1.action)((error) => {
                        return Promise.reject(error);
                    }));
                });
            }
            delete(options) {
                return this.resourceStore.delete(Object.assign(Object.assign({}, this.options), options));
            }
            copyFromLocale(sourceLocale, options) {
                return this.resourceStore.copyFromLocale(sourceLocale, Object.assign(Object.assign({}, options), this.options));
            }
            /**
             * @deprecated
             */
            set(name, value) {
                loglevel_1.default.warn('The "set" method is deprecated and will be removed. ' +
                    'Use the "change" method instead.');
                this.resourceStore.set(name, value);
            }
            /**
             * @deprecated
             */
            setMultiple(data) {
                loglevel_1.default.warn('The "setMultiple" method is deprecated and will be removed. ' +
                    'Use the "changeMultiple" method instead.');
                this.resourceStore.setMultiple(data);
            }
            change(dataPath, value, context) {
                if ((context === null || context === void 0 ? void 0 : context.isDefaultValue) || (context === null || context === void 0 ? void 0 : context.isServerValue)) {
                    // set method of resource store will not mark the store as dirty
                    this.resourceStore.set(dataPath, value);
                }
                else {
                    this.resourceStore.change(dataPath, value);
                }
            }
            changeMultiple(values, context) {
                if ((context === null || context === void 0 ? void 0 : context.isDefaultValue) || (context === null || context === void 0 ? void 0 : context.isServerValue)) {
                    // setMultiple method of resource store will not mark the store as dirty
                    this.resourceStore.setMultiple(values);
                }
                else {
                    this.resourceStore.changeMultiple(values);
                }
            }
            get locale() {
                return this.resourceStore.locale;
            }
            get resourceKey() {
                return this.resourceStore.resourceKey;
            }
            get id() {
                return this.resourceStore.id;
            }
            get saving() {
                return this.resourceStore.saving;
            }
            get deleting() {
                return this.resourceStore.deleting;
            }
            get forbidden() {
                return this.resourceStore.forbidden;
            }
            get notFound() {
                return this.resourceStore.notFound;
            }
            get unexpectedError() {
                return this.resourceStore.unexpectedError;
            }
            get dirty() {
                return this.resourceStore.dirty;
            }
            set dirty(dirty) {
                this.resourceStore.dirty = dirty;
            }
            setSchemaLoading(schemaLoading) {
                this.schemaLoading = schemaLoading;
            }
            /**
             * @deprecated
             */
            setType(type) {
                loglevel_1.default.warn('The "setType" method is deprecated and will be removed. ' +
                    'Use the "changeType" method instead.');
                if (!this.hasTypes) {
                    throw new Error('The form "' + this.formKey + '" handled by this ResourceFormStore cannot handle types');
                }
                this.set(TYPE_PROPERTY, type);
            }
            changeType(type, context) {
                if (!this.hasTypes) {
                    throw new Error('The form "' + this.formKey + '" handled by this ResourceFormStore cannot handle types');
                }
                this.change(TYPE_PROPERTY, type, context);
            }
            getSchemaEntryByPath(schemaPath) {
                return json_pointer_1.default.get(this.schema, schemaPath);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _types_decorators = [mobx_1.observable];
            _schemaLoading_decorators = [mobx_1.observable];
            _typesLoading_decorators = [mobx_1.observable];
            _handleSchemaTypeResponse_decorators = [mobx_1.action];
            _get_hasTypes_decorators = [mobx_1.computed];
            _get_hasInvalidType_decorators = [mobx_1.computed];
            _get_loading_decorators = [mobx_1.computed];
            _get_data_decorators = [mobx_1.computed];
            _get_type_decorators = [mobx_1.computed];
            _save_decorators = [mobx_1.action];
            _get_locale_decorators = [mobx_1.computed];
            _get_resourceKey_decorators = [mobx_1.computed];
            _get_id_decorators = [mobx_1.computed];
            _get_saving_decorators = [mobx_1.computed];
            _get_deleting_decorators = [mobx_1.computed];
            _get_forbidden_decorators = [mobx_1.computed];
            _get_notFound_decorators = [mobx_1.computed];
            _get_unexpectedError_decorators = [mobx_1.computed];
            _get_dirty_decorators = [mobx_1.computed];
            _setSchemaLoading_decorators = [mobx_1.action];
            _setType_decorators = [mobx_1.action];
            _changeType_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_hasTypes_decorators, { kind: "getter", name: "hasTypes", static: false, private: false, access: { has: obj => "hasTypes" in obj, get: obj => obj.hasTypes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_hasInvalidType_decorators, { kind: "getter", name: "hasInvalidType", static: false, private: false, access: { has: obj => "hasInvalidType" in obj, get: obj => obj.hasInvalidType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_loading_decorators, { kind: "getter", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_data_decorators, { kind: "getter", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_type_decorators, { kind: "getter", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_locale_decorators, { kind: "getter", name: "locale", static: false, private: false, access: { has: obj => "locale" in obj, get: obj => obj.locale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_saving_decorators, { kind: "getter", name: "saving", static: false, private: false, access: { has: obj => "saving" in obj, get: obj => obj.saving }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_deleting_decorators, { kind: "getter", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_forbidden_decorators, { kind: "getter", name: "forbidden", static: false, private: false, access: { has: obj => "forbidden" in obj, get: obj => obj.forbidden }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_notFound_decorators, { kind: "getter", name: "notFound", static: false, private: false, access: { has: obj => "notFound" in obj, get: obj => obj.notFound }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_unexpectedError_decorators, { kind: "getter", name: "unexpectedError", static: false, private: false, access: { has: obj => "unexpectedError" in obj, get: obj => obj.unexpectedError }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dirty_decorators, { kind: "getter", name: "dirty", static: false, private: false, access: { has: obj => "dirty" in obj, get: obj => obj.dirty }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setSchemaLoading_decorators, { kind: "method", name: "setSchemaLoading", static: false, private: false, access: { has: obj => "setSchemaLoading" in obj, get: obj => obj.setSchemaLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setType_decorators, { kind: "method", name: "setType", static: false, private: false, access: { has: obj => "setType" in obj, get: obj => obj.setType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _changeType_decorators, { kind: "method", name: "changeType", static: false, private: false, access: { has: obj => "changeType" in obj, get: obj => obj.changeType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _types_decorators, { kind: "field", name: "types", static: false, private: false, access: { has: obj => "types" in obj, get: obj => obj.types, set: (obj, value) => { obj.types = value; } }, metadata: _metadata }, _types_initializers, _types_extraInitializers);
            __esDecorate(null, null, _schemaLoading_decorators, { kind: "field", name: "schemaLoading", static: false, private: false, access: { has: obj => "schemaLoading" in obj, get: obj => obj.schemaLoading, set: (obj, value) => { obj.schemaLoading = value; } }, metadata: _metadata }, _schemaLoading_initializers, _schemaLoading_extraInitializers);
            __esDecorate(null, null, _typesLoading_decorators, { kind: "field", name: "typesLoading", static: false, private: false, access: { has: obj => "typesLoading" in obj, get: obj => obj.typesLoading, set: (obj, value) => { obj.typesLoading = value; } }, metadata: _metadata }, _typesLoading_initializers, _typesLoading_extraInitializers);
            __esDecorate(null, null, _handleSchemaTypeResponse_decorators, { kind: "field", name: "handleSchemaTypeResponse", static: false, private: false, access: { has: obj => "handleSchemaTypeResponse" in obj, get: obj => obj.handleSchemaTypeResponse, set: (obj, value) => { obj.handleSchemaTypeResponse = value; } }, metadata: _metadata }, _handleSchemaTypeResponse_initializers, _handleSchemaTypeResponse_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ResourceFormStore;
