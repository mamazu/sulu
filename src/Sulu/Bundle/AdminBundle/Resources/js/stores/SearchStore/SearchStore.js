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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ResourceRequester_1 = __importDefault(require("../../services/ResourceRequester"));
let SearchStore = (() => {
    var _a;
    let _searchResults_decorators;
    let _searchResults_initializers = [];
    let _searchResults_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _clearSearchResults_decorators;
    let _clearSearchResults_initializers = [];
    let _clearSearchResults_extraInitializers = [];
    let _search_decorators;
    let _search_initializers = [];
    let _search_extraInitializers = [];
    return _a = class SearchStore {
            constructor(resourceKey, searchProperties, options = {}, locale) {
                this.searchResults = __runInitializers(this, _searchResults_initializers, []);
                this.loading = (__runInitializers(this, _searchResults_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.clearSearchResults = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _clearSearchResults_initializers, () => {
                    this.searchResults.splice(0, this.searchResults.length);
                }));
                this.search = (__runInitializers(this, _clearSearchResults_extraInitializers), __runInitializers(this, _search_initializers, (query, excludedIds = undefined) => {
                    const { resourceKey, searchProperties } = this;
                    this.loading = true;
                    return ResourceRequester_1.default.getList(resourceKey, Object.assign(Object.assign({}, this.options), { excludedIds, locale: this.locale ? this.locale.get() : undefined, limit: 10, page: 1, searchFields: searchProperties, search: query })).then((0, mobx_1.action)((response) => {
                        this.clearSearchResults();
                        this.searchResults.push(...response._embedded[resourceKey]);
                        this.loading = false;
                        return this.searchResults;
                    })).catch((0, mobx_1.action)(() => {
                        this.loading = false;
                    })).then(() => {
                        return [];
                    });
                }));
                __runInitializers(this, _search_extraInitializers);
                this.resourceKey = resourceKey;
                this.searchProperties = searchProperties;
                this.options = options;
                this.locale = locale;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _searchResults_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _clearSearchResults_decorators = [mobx_1.action];
            _search_decorators = [mobx_1.action];
            __esDecorate(null, null, _searchResults_decorators, { kind: "field", name: "searchResults", static: false, private: false, access: { has: obj => "searchResults" in obj, get: obj => obj.searchResults, set: (obj, value) => { obj.searchResults = value; } }, metadata: _metadata }, _searchResults_initializers, _searchResults_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _clearSearchResults_decorators, { kind: "field", name: "clearSearchResults", static: false, private: false, access: { has: obj => "clearSearchResults" in obj, get: obj => obj.clearSearchResults, set: (obj, value) => { obj.clearSearchResults = value; } }, metadata: _metadata }, _clearSearchResults_initializers, _clearSearchResults_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search, set: (obj, value) => { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SearchStore;
