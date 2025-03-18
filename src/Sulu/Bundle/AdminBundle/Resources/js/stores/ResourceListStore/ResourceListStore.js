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
const ResourceRequester_1 = __importDefault(require("../../services/ResourceRequester"));
let ResourceListStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _initialLoading_decorators;
    let _initialLoading_initializers = [];
    let _initialLoading_extraInitializers = [];
    let _deleting_decorators;
    let _deleting_initializers = [];
    let _deleting_extraInitializers = [];
    let _patching_decorators;
    let _patching_initializers = [];
    let _patching_extraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _get_loading_decorators;
    let _deleteList_decorators;
    let _patchList_decorators;
    return _a = class ResourceListStore {
            get loading() {
                return this.initialLoading || this.deleting || this.patching;
            }
            constructor(resourceKey, requestParameters = {}, idProperty = 'id') {
                this.requestParameters = __runInitializers(this, _instanceExtraInitializers);
                this.initialLoading = __runInitializers(this, _initialLoading_initializers, false);
                this.deleting = (__runInitializers(this, _initialLoading_extraInitializers), __runInitializers(this, _deleting_initializers, false));
                this.patching = (__runInitializers(this, _deleting_extraInitializers), __runInitializers(this, _patching_initializers, false));
                this.data = (__runInitializers(this, _patching_extraInitializers), __runInitializers(this, _data_initializers, void 0));
                __runInitializers(this, _data_extraInitializers);
                this.resourceKey = resourceKey;
                this.requestParameters = requestParameters;
                this.idProperty = idProperty;
                this.initialLoading = true;
                ResourceRequester_1.default.getList(resourceKey, requestParameters).then((0, mobx_1.action)((response) => {
                    this.data = response._embedded[resourceKey];
                    this.initialLoading = false;
                })).catch((0, mobx_1.action)(() => {
                    this.initialLoading = false;
                }));
            }
            deleteList(ids) {
                this.deleting = true;
                return ResourceRequester_1.default.deleteList(this.resourceKey, Object.assign(Object.assign({}, this.requestParameters), { ids })).then((0, mobx_1.action)(() => {
                    for (const id of ids) {
                        this.data.splice(this.data.findIndex((object) => object[this.idProperty] === id), 1);
                    }
                    this.deleting = false;
                }));
            }
            patchList(data) {
                this.patching = true;
                return ResourceRequester_1.default.patchList(this.resourceKey, data).then((0, mobx_1.action)((response) => {
                    for (const object of response) {
                        const index = this.data
                            .findIndex((oldObject) => oldObject[this.idProperty] === object[this.idProperty]);
                        if (index === -1) {
                            this.data.push(object);
                        }
                        else {
                            this.data[index] = object;
                        }
                    }
                    this.patching = false;
                }));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _initialLoading_decorators = [mobx_1.observable];
            _deleting_decorators = [mobx_1.observable];
            _patching_decorators = [mobx_1.observable];
            _data_decorators = [mobx_1.observable];
            _get_loading_decorators = [mobx_1.computed];
            _deleteList_decorators = [mobx_1.action];
            _patchList_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_loading_decorators, { kind: "getter", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deleteList_decorators, { kind: "method", name: "deleteList", static: false, private: false, access: { has: obj => "deleteList" in obj, get: obj => obj.deleteList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _patchList_decorators, { kind: "method", name: "patchList", static: false, private: false, access: { has: obj => "patchList" in obj, get: obj => obj.patchList }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _initialLoading_decorators, { kind: "field", name: "initialLoading", static: false, private: false, access: { has: obj => "initialLoading" in obj, get: obj => obj.initialLoading, set: (obj, value) => { obj.initialLoading = value; } }, metadata: _metadata }, _initialLoading_initializers, _initialLoading_extraInitializers);
            __esDecorate(null, null, _deleting_decorators, { kind: "field", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting, set: (obj, value) => { obj.deleting = value; } }, metadata: _metadata }, _deleting_initializers, _deleting_extraInitializers);
            __esDecorate(null, null, _patching_decorators, { kind: "field", name: "patching", static: false, private: false, access: { has: obj => "patching" in obj, get: obj => obj.patching, set: (obj, value) => { obj.patching = value; } }, metadata: _metadata }, _patching_initializers, _patching_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ResourceListStore;
