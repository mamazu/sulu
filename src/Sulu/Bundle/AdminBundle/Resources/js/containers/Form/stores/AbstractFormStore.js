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
exports.SECTION_TYPE = void 0;
const mobx_1 = require("mobx");
const json_pointer_1 = __importDefault(require("json-pointer"));
const loglevel_1 = __importDefault(require("loglevel"));
exports.SECTION_TYPE = 'section';
function addSchemaProperties(data, key, schema) {
    const type = schema[key].type;
    if (type !== exports.SECTION_TYPE) {
        json_pointer_1.default.set(data, '/' + key, undefined);
    }
    const items = schema[key].items;
    if (type === exports.SECTION_TYPE && items) {
        Object.keys(items)
            .reduce((object, childKey) => addSchemaProperties(data, childKey, items), data);
    }
    return data;
}
function sortObjectByPriority(a, b) {
    if (a.priority > b.priority) {
        return -1;
    }
    if (a.priority < b.priority) {
        return 1;
    }
    return 0;
}
function collectTagPathsWithPriority(tagName, data, schema, parentPath = ['']) {
    const pathsWithPriority = [];
    for (const key in schema) {
        const { items, tags, type, types } = schema[key];
        if (type === exports.SECTION_TYPE && items) {
            pathsWithPriority.push(...collectTagPathsWithPriority(tagName, data, items, parentPath));
            continue;
        }
        if (types
            && Object.keys(types).length > 0
            && data[key]
            && ((0, mobx_1.isArrayLike)(data[key]))) {
            for (const childKey of data[key].keys()) {
                const childData = data[key][childKey];
                if (childData.type in types) {
                    pathsWithPriority.push(...collectTagPathsWithPriority(tagName, childData, types[childData.type].form, parentPath.concat([key, childKey])));
                }
            }
            continue;
        }
        if (tags) {
            const filteredTags = tags.filter((tag) => tag.name === tagName);
            if (filteredTags.length === 0) {
                continue;
            }
            pathsWithPriority.push({
                path: parentPath.concat([key]).join('/'),
                priority: Math.max(...filteredTags.map((tag) => tag.priority || 0)),
            });
            continue;
        }
    }
    return pathsWithPriority.sort(sortObjectByPriority);
}
function collectTagPaths(tagName, data, schema, parentPath = ['']) {
    return collectTagPathsWithPriority(tagName, data, schema, parentPath)
        .map((pathWithPriority) => pathWithPriority.path);
}
let AbstractFormStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _schema_decorators;
    let _schema_initializers = [];
    let _schema_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _validate_decorators;
    let _get_hasErrors_decorators;
    let _addMissingSchemaProperties_decorators;
    return _a = class AbstractFormStore {
            constructor() {
                this.data = __runInitializers(this, _instanceExtraInitializers);
                this.schema = __runInitializers(this, _schema_initializers, void 0);
                this.modifiedFields = (__runInitializers(this, _schema_extraInitializers), []);
                this.errors = __runInitializers(this, _errors_initializers, {});
                this.validator = __runInitializers(this, _errors_extraInitializers);
                this.pathsByTag = {};
                this.getValueByPath = (dataPath) => {
                    return json_pointer_1.default.has(this.data, dataPath) ? json_pointer_1.default.get(this.data, dataPath) : undefined;
                };
            }
            get forbidden() {
                return false;
            }
            get notFound() {
                return false;
            }
            get unexpectedError() {
                return false;
            }
            isFieldModified(dataPath) {
                return this.modifiedFields.includes(dataPath);
            }
            finishField(dataPath) {
                if (!this.modifiedFields.includes(dataPath)) {
                    this.modifiedFields.push(dataPath);
                }
            }
            validate() {
                const { validator } = this;
                const errors = {};
                if (validator && !validator((0, mobx_1.toJS)(this.data))) {
                    for (const error of validator.errors) {
                        switch (error.keyword) {
                            case 'type':
                            case 'if':
                            case 'then':
                            case 'else':
                            case 'oneOf':
                            case 'anyOf':
                            case 'allOf':
                                // these errors are not shown in the leaf field, e.g. in blocks and similar constructs
                                // these errors also have child errors, which will be shown on the correct leaf field
                                break;
                            case 'required':
                                json_pointer_1.default.set(errors, error.instancePath + '/' + error.params.missingProperty, { keyword: error.keyword, parameters: error.params });
                                break;
                            default:
                                json_pointer_1.default.set(errors, error.instancePath, { keyword: error.keyword, parameters: error.params });
                        }
                    }
                }
                this.errors = errors;
                if (this.hasErrors) {
                    loglevel_1.default.info('Form validation detected the following errors: ', (0, mobx_1.toJS)(this.errors));
                    return false;
                }
                return true;
            }
            get hasErrors() {
                return Object.keys(this.errors).length > 0;
            }
            getValuesByTag(tagName) {
                return this.getPathsByTag(tagName).map(this.getValueByPath);
            }
            getPathsByTag(tagName) {
                const { data, schema } = this;
                if (!(tagName in this.pathsByTag)) {
                    this.pathsByTag[tagName] = collectTagPaths(tagName, data, schema);
                }
                return this.pathsByTag[tagName];
            }
            getSchemaEntryByPath(schemaPath) {
                return json_pointer_1.default.get(this.schema, schemaPath);
            }
            addMissingSchemaProperties() {
                const schemaFields = Object.keys(this.schema)
                    .reduce((data, key) => addSchemaProperties(data, key, this.schema), {});
                (0, mobx_1.set)(this.data, Object.assign(Object.assign({}, schemaFields), this.data));
            }
            destroy() { }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _schema_decorators = [mobx_1.observable];
            _errors_decorators = [mobx_1.observable];
            _validate_decorators = [mobx_1.action];
            _get_hasErrors_decorators = [mobx_1.computed];
            _addMissingSchemaProperties_decorators = [mobx_1.action];
            __esDecorate(_a, null, _validate_decorators, { kind: "method", name: "validate", static: false, private: false, access: { has: obj => "validate" in obj, get: obj => obj.validate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_hasErrors_decorators, { kind: "getter", name: "hasErrors", static: false, private: false, access: { has: obj => "hasErrors" in obj, get: obj => obj.hasErrors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _addMissingSchemaProperties_decorators, { kind: "method", name: "addMissingSchemaProperties", static: false, private: false, access: { has: obj => "addMissingSchemaProperties" in obj, get: obj => obj.addMissingSchemaProperties }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _schema_decorators, { kind: "field", name: "schema", static: false, private: false, access: { has: obj => "schema" in obj, get: obj => obj.schema, set: (obj, value) => { obj.schema = value; } }, metadata: _metadata }, _schema_initializers, _schema_extraInitializers);
            __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = AbstractFormStore;
