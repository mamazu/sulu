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
let FormInspector = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _get_resourceKey_decorators;
    let _get_locale_decorators;
    let _get_options_decorators;
    let _get_metadataOptions_decorators;
    let _get_errors_decorators;
    let _get_id_decorators;
    return _a = class FormInspector {
            constructor(formStore) {
                this.formStore = __runInitializers(this, _instanceExtraInitializers);
                this.saveHandlers = [];
                this.finishFieldHandlers = [];
                this.formStore = formStore;
            }
            get resourceKey() {
                return this.formStore.resourceKey;
            }
            get locale() {
                return this.formStore.locale;
            }
            get options() {
                return this.formStore.options;
            }
            get metadataOptions() {
                return this.formStore.metadataOptions;
            }
            get errors() {
                return this.formStore.errors;
            }
            get id() {
                return this.formStore.id;
            }
            getValueByPath(path) {
                return this.formStore.getValueByPath(path);
            }
            getValuesByTag(tagName) {
                return this.formStore.getValuesByTag(tagName);
            }
            getPathsByTag(tagName) {
                return this.formStore.getPathsByTag(tagName);
            }
            getSchemaEntryByPath(schemaPath) {
                return this.formStore.getSchemaEntryByPath(schemaPath);
            }
            addSaveHandler(saveHandler) {
                this.saveHandlers.push(saveHandler);
            }
            triggerSaveHandler(options) {
                if (typeof options === 'string') {
                    loglevel_1.default.warn('Passing a string to the "submit" method is deprecated since 2.2 and will be removed. ' +
                        'Pass an object with an "action" property instead.');
                }
                this.saveHandlers.forEach((saveHandler) => saveHandler(options));
            }
            addFinishFieldHandler(finishFieldHandler) {
                this.finishFieldHandlers.push(finishFieldHandler);
            }
            finishField(dataPath, schemaPath) {
                this.formStore.finishField(dataPath);
                this.finishFieldHandlers.forEach((finishFieldHandler) => finishFieldHandler(dataPath, schemaPath));
            }
            isFieldModified(dataPath) {
                return this.formStore.isFieldModified(dataPath);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _get_resourceKey_decorators = [mobx_1.computed];
            _get_locale_decorators = [mobx_1.computed];
            _get_options_decorators = [mobx_1.computed];
            _get_metadataOptions_decorators = [mobx_1.computed];
            _get_errors_decorators = [mobx_1.computed];
            _get_id_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_locale_decorators, { kind: "getter", name: "locale", static: false, private: false, access: { has: obj => "locale" in obj, get: obj => obj.locale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_options_decorators, { kind: "getter", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_metadataOptions_decorators, { kind: "getter", name: "metadataOptions", static: false, private: false, access: { has: obj => "metadataOptions" in obj, get: obj => obj.metadataOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_errors_decorators, { kind: "getter", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = FormInspector;
