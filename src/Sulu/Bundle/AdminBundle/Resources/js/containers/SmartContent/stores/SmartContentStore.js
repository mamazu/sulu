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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const Requester_1 = __importDefault(require("../../../services/Requester"));
const Config_1 = __importDefault(require("../../../services/Config"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const Request_1 = require("../../../utils/Request");
let SmartContentStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _items_decorators;
    let _items_initializers = [];
    let _items_extraInitializers = [];
    let _itemsLoading_decorators;
    let _itemsLoading_initializers = [];
    let _itemsLoading_extraInitializers = [];
    let _categoriesLoading_decorators;
    let _categoriesLoading_initializers = [];
    let _categoriesLoading_extraInitializers = [];
    let _dataSourceLoading_decorators;
    let _dataSourceLoading_initializers = [];
    let _dataSourceLoading_extraInitializers = [];
    let _dataSource_decorators;
    let _dataSource_initializers = [];
    let _dataSource_extraInitializers = [];
    let _includeSubElements_decorators;
    let _includeSubElements_initializers = [];
    let _includeSubElements_extraInitializers = [];
    let _categories_decorators;
    let _categories_initializers = [];
    let _categories_extraInitializers = [];
    let _categoryOperator_decorators;
    let _categoryOperator_initializers = [];
    let _categoryOperator_extraInitializers = [];
    let _tags_decorators;
    let _tags_initializers = [];
    let _tags_extraInitializers = [];
    let _tagOperator_decorators;
    let _tagOperator_initializers = [];
    let _tagOperator_extraInitializers = [];
    let _types_decorators;
    let _types_initializers = [];
    let _types_extraInitializers = [];
    let _audienceTargeting_decorators;
    let _audienceTargeting_initializers = [];
    let _audienceTargeting_extraInitializers = [];
    let _sortBy_decorators;
    let _sortBy_initializers = [];
    let _sortBy_extraInitializers = [];
    let _sortOrder_decorators;
    let _sortOrder_initializers = [];
    let _sortOrder_extraInitializers = [];
    let _presentation_decorators;
    let _presentation_initializers = [];
    let _presentation_extraInitializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limit_extraInitializers = [];
    let _excludedIds_decorators;
    let _excludedIds_initializers = [];
    let _excludedIds_extraInitializers = [];
    let _setItems_decorators;
    let _setItemsLoading_decorators;
    let _setExcludedIds_decorators;
    let _get_loading_decorators;
    let _get_filterCriteria_decorators;
    return _a = class SmartContentStore {
            constructor(provider, filterCriteria, locale, dataSourceResourceKey, id, params, webspaceKey) {
                this.provider = __runInitializers(this, _instanceExtraInitializers);
                this.items = __runInitializers(this, _items_initializers, []);
                this.itemsLoading = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _itemsLoading_initializers, true));
                this.categoriesLoading = (__runInitializers(this, _itemsLoading_extraInitializers), __runInitializers(this, _categoriesLoading_initializers, void 0));
                this.dataSourceLoading = (__runInitializers(this, _categoriesLoading_extraInitializers), __runInitializers(this, _dataSourceLoading_initializers, void 0));
                this.dataSource = (__runInitializers(this, _dataSourceLoading_extraInitializers), __runInitializers(this, _dataSource_initializers, void 0));
                this.includeSubElements = (__runInitializers(this, _dataSource_extraInitializers), __runInitializers(this, _includeSubElements_initializers, void 0));
                this.categories = (__runInitializers(this, _includeSubElements_extraInitializers), __runInitializers(this, _categories_initializers, void 0));
                this.categoryOperator = (__runInitializers(this, _categories_extraInitializers), __runInitializers(this, _categoryOperator_initializers, void 0));
                this.tags = (__runInitializers(this, _categoryOperator_extraInitializers), __runInitializers(this, _tags_initializers, void 0));
                this.tagOperator = (__runInitializers(this, _tags_extraInitializers), __runInitializers(this, _tagOperator_initializers, void 0));
                this.types = (__runInitializers(this, _tagOperator_extraInitializers), __runInitializers(this, _types_initializers, void 0));
                this.audienceTargeting = (__runInitializers(this, _types_extraInitializers), __runInitializers(this, _audienceTargeting_initializers, void 0));
                this.sortBy = (__runInitializers(this, _audienceTargeting_extraInitializers), __runInitializers(this, _sortBy_initializers, void 0));
                this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
                this.presentation = (__runInitializers(this, _sortOrder_extraInitializers), __runInitializers(this, _presentation_initializers, void 0));
                this.limit = (__runInitializers(this, _presentation_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                this.excludedIds = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _excludedIds_initializers, []));
                this.itemDisposer = __runInitializers(this, _excludedIds_extraInitializers);
                this.loadItems = () => {
                    if (this.loading) {
                        this.setItems([]);
                        return;
                    }
                    this.setItemsLoading(true);
                    return Requester_1.default.get(Config_1.default.endpoints.items + (0, Request_1.buildQueryString)(Object.assign({ provider: this.provider, excluded: [this.id, ...this.excludedIds], locale: this.locale, params: JSON.stringify(this.params), webspace: this.webspaceKey }, this.filterCriteria))).then((0, mobx_1.action)((response) => {
                        this.setItems(response._embedded.items);
                        this.setItemsLoading(false);
                    }));
                };
                this.provider = provider;
                this.locale = locale;
                this.dataSourceResourceKey = dataSourceResourceKey;
                this.id = id;
                this.params = params;
                this.webspaceKey = webspaceKey;
                if (filterCriteria) {
                    this.audienceTargeting = filterCriteria.audienceTargeting;
                    this.categoryOperator = filterCriteria.categoryOperator;
                    this.includeSubElements = filterCriteria.includeSubFolders;
                    this.limit = filterCriteria.limitResult;
                    this.sortBy = filterCriteria.sortBy;
                    this.sortOrder = filterCriteria.sortMethod;
                    this.tagOperator = filterCriteria.tagOperator;
                    this.tags = filterCriteria.tags;
                    this.types = filterCriteria.types;
                    this.presentation = filterCriteria.presentAs;
                    if (filterCriteria.categories) {
                        this.categoriesLoading = true;
                        // TODO extract 'categories' into some kind of variable?
                        ResourceRequester_1.default.get('categories', {
                            ids: filterCriteria.categories,
                            locale: this.locale ? this.locale.get() : undefined,
                        }).then((0, mobx_1.action)((response) => {
                            this.categoriesLoading = false;
                            this.categories = response._embedded.categories;
                        }));
                    }
                    if (filterCriteria.dataSource && this.dataSourceResourceKey) {
                        this.dataSourceLoading = true;
                        ResourceRequester_1.default.get(this.dataSourceResourceKey, { id: filterCriteria.dataSource, locale: this.locale ? this.locale.get() : undefined }).then((0, mobx_1.action)((response) => {
                            this.dataSource = response;
                            this.dataSourceLoading = false;
                        })).catch((0, mobx_1.action)(() => {
                            this.dataSourceLoading = false;
                        }));
                    }
                }
            }
            start() {
                this.itemDisposer = (0, mobx_1.autorun)(this.loadItems);
            }
            destroy() {
                if (this.itemDisposer) {
                    this.itemDisposer();
                }
            }
            setItems(items) {
                this.items = items;
            }
            setItemsLoading(itemsLoading) {
                this.itemsLoading = itemsLoading;
            }
            setExcludedIds(excludedIds) {
                if ((0, fast_deep_equal_1.default)((0, mobx_1.toJS)(this.excludedIds), excludedIds)) {
                    return;
                }
                this.excludedIds = excludedIds;
            }
            get loading() {
                return !!this.dataSourceLoading || !!this.categoriesLoading;
            }
            get filterCriteria() {
                return {
                    audienceTargeting: this.audienceTargeting,
                    categories: this.categories && this.categories.length > 0
                        ? this.categories.map((category) => category.id)
                        : undefined,
                    categoryOperator: this.categoryOperator,
                    dataSource: this.dataSource ? this.dataSource.id : undefined,
                    includeSubFolders: this.includeSubElements,
                    limitResult: this.limit,
                    sortBy: this.sortBy,
                    sortMethod: this.sortOrder,
                    tagOperator: this.tagOperator,
                    tags: this.tags && this.tags.length > 0 ? (0, mobx_1.toJS)(this.tags) : undefined,
                    types: this.types && this.types.length > 0 ? (0, mobx_1.toJS)(this.types) : undefined,
                    presentAs: this.presentation,
                };
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [mobx_1.observable];
            _itemsLoading_decorators = [mobx_1.observable];
            _categoriesLoading_decorators = [mobx_1.observable];
            _dataSourceLoading_decorators = [mobx_1.observable];
            _dataSource_decorators = [mobx_1.observable];
            _includeSubElements_decorators = [mobx_1.observable];
            _categories_decorators = [mobx_1.observable];
            _categoryOperator_decorators = [mobx_1.observable];
            _tags_decorators = [mobx_1.observable];
            _tagOperator_decorators = [mobx_1.observable];
            _types_decorators = [mobx_1.observable];
            _audienceTargeting_decorators = [mobx_1.observable];
            _sortBy_decorators = [mobx_1.observable];
            _sortOrder_decorators = [mobx_1.observable];
            _presentation_decorators = [mobx_1.observable];
            _limit_decorators = [mobx_1.observable];
            _excludedIds_decorators = [mobx_1.observable];
            _setItems_decorators = [mobx_1.action];
            _setItemsLoading_decorators = [mobx_1.action];
            _setExcludedIds_decorators = [mobx_1.action];
            _get_loading_decorators = [mobx_1.computed];
            _get_filterCriteria_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _setItems_decorators, { kind: "method", name: "setItems", static: false, private: false, access: { has: obj => "setItems" in obj, get: obj => obj.setItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setItemsLoading_decorators, { kind: "method", name: "setItemsLoading", static: false, private: false, access: { has: obj => "setItemsLoading" in obj, get: obj => obj.setItemsLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setExcludedIds_decorators, { kind: "method", name: "setExcludedIds", static: false, private: false, access: { has: obj => "setExcludedIds" in obj, get: obj => obj.setExcludedIds }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_loading_decorators, { kind: "getter", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_filterCriteria_decorators, { kind: "getter", name: "filterCriteria", static: false, private: false, access: { has: obj => "filterCriteria" in obj, get: obj => obj.filterCriteria }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: obj => "items" in obj, get: obj => obj.items, set: (obj, value) => { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _itemsLoading_decorators, { kind: "field", name: "itemsLoading", static: false, private: false, access: { has: obj => "itemsLoading" in obj, get: obj => obj.itemsLoading, set: (obj, value) => { obj.itemsLoading = value; } }, metadata: _metadata }, _itemsLoading_initializers, _itemsLoading_extraInitializers);
            __esDecorate(null, null, _categoriesLoading_decorators, { kind: "field", name: "categoriesLoading", static: false, private: false, access: { has: obj => "categoriesLoading" in obj, get: obj => obj.categoriesLoading, set: (obj, value) => { obj.categoriesLoading = value; } }, metadata: _metadata }, _categoriesLoading_initializers, _categoriesLoading_extraInitializers);
            __esDecorate(null, null, _dataSourceLoading_decorators, { kind: "field", name: "dataSourceLoading", static: false, private: false, access: { has: obj => "dataSourceLoading" in obj, get: obj => obj.dataSourceLoading, set: (obj, value) => { obj.dataSourceLoading = value; } }, metadata: _metadata }, _dataSourceLoading_initializers, _dataSourceLoading_extraInitializers);
            __esDecorate(null, null, _dataSource_decorators, { kind: "field", name: "dataSource", static: false, private: false, access: { has: obj => "dataSource" in obj, get: obj => obj.dataSource, set: (obj, value) => { obj.dataSource = value; } }, metadata: _metadata }, _dataSource_initializers, _dataSource_extraInitializers);
            __esDecorate(null, null, _includeSubElements_decorators, { kind: "field", name: "includeSubElements", static: false, private: false, access: { has: obj => "includeSubElements" in obj, get: obj => obj.includeSubElements, set: (obj, value) => { obj.includeSubElements = value; } }, metadata: _metadata }, _includeSubElements_initializers, _includeSubElements_extraInitializers);
            __esDecorate(null, null, _categories_decorators, { kind: "field", name: "categories", static: false, private: false, access: { has: obj => "categories" in obj, get: obj => obj.categories, set: (obj, value) => { obj.categories = value; } }, metadata: _metadata }, _categories_initializers, _categories_extraInitializers);
            __esDecorate(null, null, _categoryOperator_decorators, { kind: "field", name: "categoryOperator", static: false, private: false, access: { has: obj => "categoryOperator" in obj, get: obj => obj.categoryOperator, set: (obj, value) => { obj.categoryOperator = value; } }, metadata: _metadata }, _categoryOperator_initializers, _categoryOperator_extraInitializers);
            __esDecorate(null, null, _tags_decorators, { kind: "field", name: "tags", static: false, private: false, access: { has: obj => "tags" in obj, get: obj => obj.tags, set: (obj, value) => { obj.tags = value; } }, metadata: _metadata }, _tags_initializers, _tags_extraInitializers);
            __esDecorate(null, null, _tagOperator_decorators, { kind: "field", name: "tagOperator", static: false, private: false, access: { has: obj => "tagOperator" in obj, get: obj => obj.tagOperator, set: (obj, value) => { obj.tagOperator = value; } }, metadata: _metadata }, _tagOperator_initializers, _tagOperator_extraInitializers);
            __esDecorate(null, null, _types_decorators, { kind: "field", name: "types", static: false, private: false, access: { has: obj => "types" in obj, get: obj => obj.types, set: (obj, value) => { obj.types = value; } }, metadata: _metadata }, _types_initializers, _types_extraInitializers);
            __esDecorate(null, null, _audienceTargeting_decorators, { kind: "field", name: "audienceTargeting", static: false, private: false, access: { has: obj => "audienceTargeting" in obj, get: obj => obj.audienceTargeting, set: (obj, value) => { obj.audienceTargeting = value; } }, metadata: _metadata }, _audienceTargeting_initializers, _audienceTargeting_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: obj => "sortBy" in obj, get: obj => obj.sortBy, set: (obj, value) => { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: obj => "sortOrder" in obj, get: obj => obj.sortOrder, set: (obj, value) => { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            __esDecorate(null, null, _presentation_decorators, { kind: "field", name: "presentation", static: false, private: false, access: { has: obj => "presentation" in obj, get: obj => obj.presentation, set: (obj, value) => { obj.presentation = value; } }, metadata: _metadata }, _presentation_initializers, _presentation_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _excludedIds_decorators, { kind: "field", name: "excludedIds", static: false, private: false, access: { has: obj => "excludedIds" in obj, get: obj => obj.excludedIds, set: (obj, value) => { obj.excludedIds = value; } }, metadata: _metadata }, _excludedIds_initializers, _excludedIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SmartContentStore;
