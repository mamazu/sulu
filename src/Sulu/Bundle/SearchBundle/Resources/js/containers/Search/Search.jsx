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
const components_1 = require("sulu-admin-bundle/components");
const Pagination_1 = __importDefault(require("sulu-admin-bundle/components/Pagination"));
const utils_1 = require("sulu-admin-bundle/utils");
const json_pointer_1 = __importDefault(require("json-pointer"));
const searchStore_1 = __importDefault(require("./stores/searchStore"));
const indexStore_1 = __importDefault(require("./stores/indexStore"));
const SearchField_1 = __importDefault(require("./SearchField"));
const SearchResult_1 = __importDefault(require("./SearchResult"));
const search_scss_1 = __importDefault(require("./search.scss"));
const searchResult_scss_1 = __importDefault(require("./searchResult.scss"));
let Search = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    let _indexes_decorators;
    let _indexes_initializers = [];
    let _indexes_extraInitializers = [];
    let _indexName_decorators;
    let _indexName_initializers = [];
    let _indexName_extraInitializers = [];
    let _componentDidMount_decorators;
    let _handleIndexChange_decorators;
    let _handleIndexChange_initializers = [];
    let _handleIndexChange_extraInitializers = [];
    let _handleQueryChange_decorators;
    let _handleQueryChange_initializers = [];
    let _handleQueryChange_extraInitializers = [];
    var Search = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.query = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _query_initializers, undefined));
            this.indexes = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _indexes_initializers, undefined));
            this.indexName = (__runInitializers(this, _indexes_extraInitializers), __runInitializers(this, _indexName_initializers, undefined));
            this.handleIndexChange = (__runInitializers(this, _indexName_extraInitializers), __runInitializers(this, _handleIndexChange_initializers, (indexName) => {
                this.indexName = indexName;
            }));
            this.handleQueryChange = (__runInitializers(this, _handleIndexChange_extraInitializers), __runInitializers(this, _handleQueryChange_initializers, (query) => {
                this.query = query;
            }));
            this.handleLimitChange = (__runInitializers(this, _handleQueryChange_extraInitializers), (limit) => {
                searchStore_1.default.setLimit(limit);
            });
            this.handlePageChange = (page) => {
                searchStore_1.default.setPage(page);
            };
            this.handleSearch = () => {
                searchStore_1.default.search(this.query, this.indexName);
            };
            this.handleResultClick = (index) => {
                if (!this.indexes) {
                    throw new Error('The indexes must be available to route to a search result! This should not happen and is likely a bug.');
                }
                const result = searchStore_1.default.result[index];
                const { route: { name: routeName, resultToRoute, }, } = this.indexes[result.document.index];
                const { router } = this.props;
                router.navigate(routeName, Object.keys(resultToRoute).reduce((parameters, resultPath) => {
                    parameters[resultToRoute[resultPath]] = json_pointer_1.default.get(result.document, '/' + resultPath);
                    return parameters;
                }, {}));
            };
        }
        componentDidMount() {
            this.query = searchStore_1.default.query;
            this.indexName = searchStore_1.default.indexName;
            indexStore_1.default.loadIndexes().then((0, mobx_1.action)((indexes) => {
                this.indexes = indexes.reduce((indexesObject, index) => {
                    indexesObject[index.indexName] = index;
                    return indexesObject;
                }, {});
            }));
        }
        render() {
            const { indexes } = this;
            if (!indexes) {
                return <components_1.Loader />;
            }
            const results = searchStore_1.default.result.map((result, index) => (<SearchResult_1.default description={result.document.description} icon={indexes[result.document.index].icon} image={result.document.imageUrl} index={index} key={result.document.index + '_' + result.document.id + '_' + result.document.locale} locale={result.document.locale} onClick={this.handleResultClick} resource={indexes[result.document.index]
                    ? indexes[result.document.index].name
                    : ''} title={result.document.title}/>));
            return (<div className={search_scss_1.default.search}>
                <SearchField_1.default indexes={indexes} indexName={this.indexName} onIndexChange={this.handleIndexChange} onQueryChange={this.handleQueryChange} onSearch={this.handleSearch} query={this.query || undefined}/>
                {searchStore_1.default.loading &&
                    <components_1.Loader />}
                {!searchStore_1.default.loading && searchStore_1.default.query && searchStore_1.default.result.length === 0 &&
                    <div className={search_scss_1.default.nothingHint}>
                        <div className={search_scss_1.default.nothingIcon}>
                            <components_1.Icon name="su-battery-low"/>
                        </div>
                        {(0, utils_1.translate)('sulu_search.nothing_found')}
                    </div>}
                {!searchStore_1.default.loading && searchStore_1.default.result.length > 0 &&
                    <div className={searchResult_scss_1.default.searchResultsOuterContainer}>
                        <Pagination_1.default currentLimit={searchStore_1.default.limit} currentPage={searchStore_1.default.page} loading={searchStore_1.default.loading} onLimitChange={this.handleLimitChange} onPageChange={this.handlePageChange} totalPages={searchStore_1.default.pages}>
                            {results}
                        </Pagination_1.default>
                    </div>}
            </div>);
        }
    };
    __setFunctionName(_classThis, "Search");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _query_decorators = [mobx_1.observable];
        _indexes_decorators = [mobx_1.observable];
        _indexName_decorators = [mobx_1.observable];
        _componentDidMount_decorators = [mobx_1.action];
        _handleIndexChange_decorators = [mobx_1.action];
        _handleQueryChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
        __esDecorate(null, null, _indexes_decorators, { kind: "field", name: "indexes", static: false, private: false, access: { has: obj => "indexes" in obj, get: obj => obj.indexes, set: (obj, value) => { obj.indexes = value; } }, metadata: _metadata }, _indexes_initializers, _indexes_extraInitializers);
        __esDecorate(null, null, _indexName_decorators, { kind: "field", name: "indexName", static: false, private: false, access: { has: obj => "indexName" in obj, get: obj => obj.indexName, set: (obj, value) => { obj.indexName = value; } }, metadata: _metadata }, _indexName_initializers, _indexName_extraInitializers);
        __esDecorate(null, null, _handleIndexChange_decorators, { kind: "field", name: "handleIndexChange", static: false, private: false, access: { has: obj => "handleIndexChange" in obj, get: obj => obj.handleIndexChange, set: (obj, value) => { obj.handleIndexChange = value; } }, metadata: _metadata }, _handleIndexChange_initializers, _handleIndexChange_extraInitializers);
        __esDecorate(null, null, _handleQueryChange_decorators, { kind: "field", name: "handleQueryChange", static: false, private: false, access: { has: obj => "handleQueryChange" in obj, get: obj => obj.handleQueryChange, set: (obj, value) => { obj.handleQueryChange = value; } }, metadata: _metadata }, _handleQueryChange_initializers, _handleQueryChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Search = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Search = _classThis;
})();
exports.default = Search;
