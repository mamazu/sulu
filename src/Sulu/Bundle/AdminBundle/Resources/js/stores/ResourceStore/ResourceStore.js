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
const ResourceRequester_1 = __importDefault(require("../../services/ResourceRequester"));
let ResourceStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _initialized_decorators;
    let _initialized_initializers = [];
    let _initialized_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _saving_decorators;
    let _saving_initializers = [];
    let _saving_extraInitializers = [];
    let _deleting_decorators;
    let _deleting_initializers = [];
    let _deleting_extraInitializers = [];
    let _moving_decorators;
    let _moving_initializers = [];
    let _moving_extraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _dirty_decorators;
    let _dirty_initializers = [];
    let _dirty_extraInitializers = [];
    let _forbidden_decorators;
    let _forbidden_initializers = [];
    let _forbidden_extraInitializers = [];
    let _notFound_decorators;
    let _notFound_initializers = [];
    let _notFound_extraInitializers = [];
    let _unexpectedError_decorators;
    let _unexpectedError_initializers = [];
    let _unexpectedError_extraInitializers = [];
    let _reload_decorators;
    let _reload_initializers = [];
    let _reload_extraInitializers = [];
    let _setLoading_decorators;
    let _setForbidden_decorators;
    let _setNotFound_decorators;
    let _setUnexpectedError_decorators;
    let _save_decorators;
    let _create_decorators;
    let _update_decorators;
    let _delete_decorators;
    let _move_decorators;
    let _move_initializers = [];
    let _move_extraInitializers = [];
    let _set_decorators;
    let _setMultiple_decorators;
    let _change_decorators;
    let _changeMultiple_decorators;
    let _clone_decorators;
    let _handleIdQueryParameterResponse_decorators;
    return _a = class ResourceStore {
            constructor(resourceKey, id, observableOptions = {}, loadOptions = {}, idQueryParameter, preventLoadingOnce = false) {
                this.resourceKey = __runInitializers(this, _instanceExtraInitializers);
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.observableOptions = __runInitializers(this, _id_extraInitializers);
                this.initialized = __runInitializers(this, _initialized_initializers, false);
                this.loading = (__runInitializers(this, _initialized_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.saving = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _saving_initializers, false));
                this.deleting = (__runInitializers(this, _saving_extraInitializers), __runInitializers(this, _deleting_initializers, false));
                this.moving = (__runInitializers(this, _deleting_extraInitializers), __runInitializers(this, _moving_initializers, false));
                this.data = (__runInitializers(this, _moving_extraInitializers), __runInitializers(this, _data_initializers, {}));
                this.dirty = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _dirty_initializers, false));
                this.forbidden = (__runInitializers(this, _dirty_extraInitializers), __runInitializers(this, _forbidden_initializers, void 0));
                this.notFound = (__runInitializers(this, _forbidden_extraInitializers), __runInitializers(this, _notFound_initializers, void 0));
                this.unexpectedError = (__runInitializers(this, _notFound_extraInitializers), __runInitializers(this, _unexpectedError_initializers, void 0));
                this.loadOptions = (__runInitializers(this, _unexpectedError_extraInitializers), {});
                this.load = () => {
                    const { id, observableOptions: { locale, }, } = this;
                    if (locale && !locale.get()) {
                        return;
                    }
                    if (this.preventLoadingOnce) {
                        this.preventLoadingOnce = false;
                        return;
                    }
                    if (!id) {
                        this.initialized = true;
                        return;
                    }
                    loglevel_1.default.info('ResourceStore loads "' + this.resourceKey + '" data with the ID "' + id + '"');
                    this.setLoading(true);
                    this.setForbidden(false);
                    this.setNotFound(false);
                    this.setUnexpectedError(false);
                    this.requestRemoteData()
                        .then((0, mobx_1.action)((response) => {
                        if (this.idQueryParameter) {
                            this.handleIdQueryParameterResponse(response);
                            this.setMultiple(response);
                        }
                        else {
                            this.setMultiple(response);
                        }
                        this.initialized = true;
                        this.setLoading(false);
                        this.dirty = false;
                    }))
                        .catch((0, mobx_1.action)((response) => {
                        this.initialized = true;
                        this.setLoading(false);
                        if (response.status === 403) {
                            this.setForbidden(true);
                        }
                        else if (response.status === 404) {
                            this.setNotFound(true);
                        }
                        else {
                            loglevel_1.default.error('ResourceStore load "' + this.resourceKey
                                + '" with id "' + id + '" failed with Status code "' + response.status + '"');
                            this.setUnexpectedError(true);
                        }
                    }));
                };
                this.requestRemoteData = (options = {}) => {
                    const { id, observableOptions: { locale, }, } = this;
                    if (locale) {
                        options.locale = locale.get();
                    }
                    return this.idQueryParameter
                        ? ResourceRequester_1.default.get(this.resourceKey, Object.assign(Object.assign(Object.assign({}, options), this.loadOptions), { [this.idQueryParameter]: id }))
                        : ResourceRequester_1.default.get(this.resourceKey, Object.assign(Object.assign(Object.assign({}, options), this.loadOptions), { id }));
                };
                this.reload = __runInitializers(this, _reload_initializers, () => {
                    this.load();
                });
                this.move = (__runInitializers(this, _reload_extraInitializers), __runInitializers(this, _move_initializers, (parentId) => {
                    if (!this.id) {
                        throw new Error('Moving does not work for new objects!');
                    }
                    this.moving = true;
                    const { locale } = this.observableOptions;
                    const queryOptions = {
                        action: 'move',
                        destination: parentId,
                        locale: locale ? locale.get() : undefined,
                    };
                    return ResourceRequester_1.default.post(this.resourceKey, undefined, Object.assign(Object.assign({}, queryOptions), { id: this.id }))
                        .then((0, mobx_1.action)(() => {
                        this.moving = false;
                    }))
                        .catch((0, mobx_1.action)((error) => {
                        this.moving = false;
                        throw error;
                    }));
                }));
                __runInitializers(this, _move_extraInitializers);
                this.resourceKey = resourceKey;
                this.id = id;
                this.observableOptions = observableOptions;
                this.loadOptions = loadOptions;
                this.idQueryParameter = idQueryParameter;
                this.preventLoadingOnce = preventLoadingOnce;
                this.disposer = (0, mobx_1.autorun)(this.load);
            }
            setLoading(loading) {
                this.loading = loading;
            }
            setForbidden(forbidden) {
                this.forbidden = forbidden;
            }
            setNotFound(notFound) {
                this.notFound = notFound;
            }
            setUnexpectedError(unexpectedError) {
                this.unexpectedError = unexpectedError;
            }
            save(options = {}) {
                const { locale } = this.observableOptions;
                if (locale) {
                    options.locale = locale.get();
                }
                if (this.idQueryParameter || !this.id) {
                    return this.create(options);
                }
                return this.update(options);
            }
            create(options) {
                this.saving = true;
                const requestOptions = options;
                if (this.idQueryParameter) {
                    requestOptions[this.idQueryParameter] = this.id;
                }
                return ResourceRequester_1.default.post(this.resourceKey, this.data, requestOptions)
                    .then((0, mobx_1.action)((response) => {
                    this.handleIdQueryParameterResponse(response);
                    this.setMultiple(response);
                    this.saving = false;
                    this.dirty = false;
                    return response;
                }))
                    .catch((0, mobx_1.action)((error) => {
                    this.saving = false;
                    throw error;
                }));
            }
            update(options) {
                if (!this.id) {
                    throw new Error('Can not save resource with an undefined "id"');
                }
                this.saving = true;
                return ResourceRequester_1.default.put(this.resourceKey, this.data, Object.assign(Object.assign({}, options), { id: this.id }))
                    .then((0, mobx_1.action)((response) => {
                    this.setMultiple(response);
                    this.saving = false;
                    this.dirty = false;
                    return response;
                }))
                    .catch((0, mobx_1.action)((error) => {
                    this.saving = false;
                    throw error;
                }));
            }
            delete(options = {}) {
                if (!this.data.id) {
                    throw new Error('Cannot delete resource with an undefined "id"');
                }
                const { locale } = this.observableOptions;
                if (options.deleteLocale && !locale) {
                    throw new Error('Cannot delete a localized resource with an undefined "locale"');
                }
                this.deleting = true;
                const requestOptions = options;
                if (locale) {
                    requestOptions.locale = locale.get();
                }
                return ResourceRequester_1.default.delete(this.resourceKey, Object.assign(Object.assign({}, requestOptions), { id: this.data.id }))
                    .then((0, mobx_1.action)((response) => {
                    this.id = undefined;
                    this.setMultiple(response);
                    this.deleting = false;
                    this.dirty = false;
                    this.destroy();
                }))
                    .catch((0, mobx_1.action)((error) => {
                    this.deleting = false;
                    throw error;
                }));
            }
            copyFromLocale(sourceLocale, options = {}) {
                if (!this.id) {
                    throw new Error('Copying from another locale does not work for new objects!');
                }
                if (!this.locale) {
                    throw new Error('Copying from another locale does only work for objects with locales!');
                }
                const locale = this.locale.get();
                return ResourceRequester_1.default
                    .post(this.resourceKey, {}, Object.assign(Object.assign({}, options), { action: 'copy-locale', dest: locale, id: this.id, locale, src: sourceLocale })).then((0, mobx_1.action)((response) => {
                    this.setMultiple(response);
                    return response;
                }));
            }
            set(path, value) {
                const strippedPath = path.startsWith('/') ? path.substring(1) : path;
                if (strippedPath === 'id' && (typeof value === 'string' || typeof value === 'number')) {
                    this.id = value;
                }
                json_pointer_1.default.set(this.data, '/' + strippedPath, value);
            }
            setMultiple(data) {
                if (data.id) {
                    this.id = data.id;
                }
                Object.keys(data).forEach((path) => {
                    this.set(path, data[path]);
                });
                (0, mobx_1.set)(this.data, this.data);
                loglevel_1.default.info('ResourceStore changed "' + this.resourceKey + '" data with the ID "' + (this.id || 'undefined') + '"', this.data);
            }
            change(path, value) {
                this.set(path, value);
                this.dirty = true;
            }
            changeMultiple(data) {
                this.setMultiple(data);
                this.dirty = true;
            }
            clone() {
                const clonedResourceStore = new _a(this.resourceKey, this.id, this.observableOptions, this.loadOptions, undefined, true);
                clonedResourceStore.loading = this.loading;
                (0, mobx_1.when)(() => !this.loading, () => {
                    clonedResourceStore.data = (0, mobx_1.toJS)(this.data);
                    clonedResourceStore.loading = false;
                });
                return clonedResourceStore;
            }
            get locale() {
                return this.observableOptions.locale;
            }
            destroy() {
                this.disposer();
            }
            handleIdQueryParameterResponse(response) {
                if (response.id) {
                    this.idQueryParameter = undefined;
                    this.id = response.id;
                    this.preventLoadingOnce = true;
                }
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [mobx_1.observable];
            _initialized_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _saving_decorators = [mobx_1.observable];
            _deleting_decorators = [mobx_1.observable];
            _moving_decorators = [mobx_1.observable];
            _data_decorators = [mobx_1.observable];
            _dirty_decorators = [mobx_1.observable];
            _forbidden_decorators = [mobx_1.observable];
            _notFound_decorators = [mobx_1.observable];
            _unexpectedError_decorators = [mobx_1.observable];
            _reload_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            _setForbidden_decorators = [mobx_1.action];
            _setNotFound_decorators = [mobx_1.action];
            _setUnexpectedError_decorators = [mobx_1.action];
            _save_decorators = [mobx_1.action];
            _create_decorators = [mobx_1.action];
            _update_decorators = [mobx_1.action];
            _delete_decorators = [mobx_1.action];
            _move_decorators = [mobx_1.action];
            _set_decorators = [mobx_1.action];
            _setMultiple_decorators = [mobx_1.action];
            _change_decorators = [mobx_1.action];
            _changeMultiple_decorators = [mobx_1.action];
            _clone_decorators = [mobx_1.action];
            _handleIdQueryParameterResponse_decorators = [mobx_1.action];
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setForbidden_decorators, { kind: "method", name: "setForbidden", static: false, private: false, access: { has: obj => "setForbidden" in obj, get: obj => obj.setForbidden }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setNotFound_decorators, { kind: "method", name: "setNotFound", static: false, private: false, access: { has: obj => "setNotFound" in obj, get: obj => obj.setNotFound }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setUnexpectedError_decorators, { kind: "method", name: "setUnexpectedError", static: false, private: false, access: { has: obj => "setUnexpectedError" in obj, get: obj => obj.setUnexpectedError }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_decorators, { kind: "method", name: "set", static: false, private: false, access: { has: obj => "set" in obj, get: obj => obj.set }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setMultiple_decorators, { kind: "method", name: "setMultiple", static: false, private: false, access: { has: obj => "setMultiple" in obj, get: obj => obj.setMultiple }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _change_decorators, { kind: "method", name: "change", static: false, private: false, access: { has: obj => "change" in obj, get: obj => obj.change }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _changeMultiple_decorators, { kind: "method", name: "changeMultiple", static: false, private: false, access: { has: obj => "changeMultiple" in obj, get: obj => obj.changeMultiple }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clone_decorators, { kind: "method", name: "clone", static: false, private: false, access: { has: obj => "clone" in obj, get: obj => obj.clone }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _handleIdQueryParameterResponse_decorators, { kind: "method", name: "handleIdQueryParameterResponse", static: false, private: false, access: { has: obj => "handleIdQueryParameterResponse" in obj, get: obj => obj.handleIdQueryParameterResponse }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _initialized_decorators, { kind: "field", name: "initialized", static: false, private: false, access: { has: obj => "initialized" in obj, get: obj => obj.initialized, set: (obj, value) => { obj.initialized = value; } }, metadata: _metadata }, _initialized_initializers, _initialized_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _saving_decorators, { kind: "field", name: "saving", static: false, private: false, access: { has: obj => "saving" in obj, get: obj => obj.saving, set: (obj, value) => { obj.saving = value; } }, metadata: _metadata }, _saving_initializers, _saving_extraInitializers);
            __esDecorate(null, null, _deleting_decorators, { kind: "field", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting, set: (obj, value) => { obj.deleting = value; } }, metadata: _metadata }, _deleting_initializers, _deleting_extraInitializers);
            __esDecorate(null, null, _moving_decorators, { kind: "field", name: "moving", static: false, private: false, access: { has: obj => "moving" in obj, get: obj => obj.moving, set: (obj, value) => { obj.moving = value; } }, metadata: _metadata }, _moving_initializers, _moving_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _dirty_decorators, { kind: "field", name: "dirty", static: false, private: false, access: { has: obj => "dirty" in obj, get: obj => obj.dirty, set: (obj, value) => { obj.dirty = value; } }, metadata: _metadata }, _dirty_initializers, _dirty_extraInitializers);
            __esDecorate(null, null, _forbidden_decorators, { kind: "field", name: "forbidden", static: false, private: false, access: { has: obj => "forbidden" in obj, get: obj => obj.forbidden, set: (obj, value) => { obj.forbidden = value; } }, metadata: _metadata }, _forbidden_initializers, _forbidden_extraInitializers);
            __esDecorate(null, null, _notFound_decorators, { kind: "field", name: "notFound", static: false, private: false, access: { has: obj => "notFound" in obj, get: obj => obj.notFound, set: (obj, value) => { obj.notFound = value; } }, metadata: _metadata }, _notFound_initializers, _notFound_extraInitializers);
            __esDecorate(null, null, _unexpectedError_decorators, { kind: "field", name: "unexpectedError", static: false, private: false, access: { has: obj => "unexpectedError" in obj, get: obj => obj.unexpectedError, set: (obj, value) => { obj.unexpectedError = value; } }, metadata: _metadata }, _unexpectedError_initializers, _unexpectedError_extraInitializers);
            __esDecorate(null, null, _reload_decorators, { kind: "field", name: "reload", static: false, private: false, access: { has: obj => "reload" in obj, get: obj => obj.reload, set: (obj, value) => { obj.reload = value; } }, metadata: _metadata }, _reload_initializers, _reload_extraInitializers);
            __esDecorate(null, null, _move_decorators, { kind: "field", name: "move", static: false, private: false, access: { has: obj => "move" in obj, get: obj => obj.move, set: (obj, value) => { obj.move = value; } }, metadata: _metadata }, _move_initializers, _move_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ResourceStore;
