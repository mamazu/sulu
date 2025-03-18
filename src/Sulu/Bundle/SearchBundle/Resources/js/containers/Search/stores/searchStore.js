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
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const services_1 = require("sulu-admin-bundle/services");
let SearchStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    let _indexName_decorators;
    let _indexName_initializers = [];
    let _indexName_extraInitializers = [];
    let _result_decorators;
    let _result_initializers = [];
    let _result_extraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _search_decorators;
    let _resetResults_decorators;
    let _setLoading_decorators;
    let _setPage_decorators;
    let _setLimit_decorators;
    return _a = class SearchStore {
            constructor() {
                this.query = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _query_initializers, undefined));
                this.indexName = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _indexName_initializers, undefined));
                this.result = (__runInitializers(this, _indexName_extraInitializers), __runInitializers(this, _result_initializers, []));
                this.page = (__runInitializers(this, _result_extraInitializers), __runInitializers(this, _page_initializers, 1));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, 10));
                this.loading = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.pages = (__runInitializers(this, _loading_extraInitializers), undefined);
                this.total = undefined;
                (0, mobx_1.autorun)(() => {
                    if (!this.query) {
                        this.resetResults();
                        return;
                    }
                    this.setLoading(true);
                    services_1.ResourceRequester.getList('search', {
                        q: this.query,
                        index: this.indexName,
                        page: this.page, limit: this.limit,
                    }).then((0, mobx_1.action)((response) => {
                        this.setLoading(false);
                        this.total = response.total;
                        this.page = response.page;
                        this.pages = response.pages;
                        this.limit = response.limit;
                        this.result = response._embedded.result;
                    }));
                });
            }
            search(query, index) {
                this.resetResults();
                this.query = query;
                this.indexName = index;
            }
            resetResults() {
                this.result.splice(0, this.result.length);
                this.page = 1;
                this.pages = undefined;
                this.total = undefined;
            }
            setLoading(loading) {
                this.loading = loading;
            }
            setPage(page) {
                this.page = page;
            }
            setLimit(limit) {
                this.page = 1;
                this.limit = limit;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _query_decorators = [mobx_1.observable];
            _indexName_decorators = [mobx_1.observable];
            _result_decorators = [mobx_1.observable];
            _page_decorators = [mobx_1.observable];
            _limit_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _search_decorators = [mobx_1.action];
            _resetResults_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            _setPage_decorators = [mobx_1.action];
            _setLimit_decorators = [mobx_1.action];
            __esDecorate(_a, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _resetResults_decorators, { kind: "method", name: "resetResults", static: false, private: false, access: { has: obj => "resetResults" in obj, get: obj => obj.resetResults }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setPage_decorators, { kind: "method", name: "setPage", static: false, private: false, access: { has: obj => "setPage" in obj, get: obj => obj.setPage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLimit_decorators, { kind: "method", name: "setLimit", static: false, private: false, access: { has: obj => "setLimit" in obj, get: obj => obj.setLimit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
            __esDecorate(null, null, _indexName_decorators, { kind: "field", name: "indexName", static: false, private: false, access: { has: obj => "indexName" in obj, get: obj => obj.indexName, set: (obj, value) => { obj.indexName = value; } }, metadata: _metadata }, _indexName_initializers, _indexName_extraInitializers);
            __esDecorate(null, null, _result_decorators, { kind: "field", name: "result", static: false, private: false, access: { has: obj => "result" in obj, get: obj => obj.result, set: (obj, value) => { obj.result = value; } }, metadata: _metadata }, _result_initializers, _result_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new SearchStore();
