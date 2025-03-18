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
const loglevel_1 = __importDefault(require("loglevel"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const metadataStore_1 = __importDefault(require("./metadataStore"));
const USER_SETTING_PREFIX = 'sulu_admin.list_store';
const USER_SETTING_ACTIVE = 'active';
const USER_SETTING_SORT_COLUMN = 'sort_column';
const USER_SETTING_SORT_ORDER = 'sort_order';
const USER_SETTING_FILTER = 'filter';
const USER_SETTING_LIMIT = 'limit';
const USER_SETTING_SCHEMA = 'schema';
let ListStore = (() => {
    var _a;
    var _b;
    let _instanceExtraInitializers = [];
    let _pageCount_decorators;
    let _pageCount_initializers = [];
    let _pageCount_extraInitializers = [];
    let _selections_decorators;
    let _selections_initializers = [];
    let _selections_extraInitializers = [];
    let _dataLoading_decorators;
    let _dataLoading_initializers = [];
    let _dataLoading_extraInitializers = [];
    let _deleting_decorators;
    let _deleting_initializers = [];
    let _deleting_extraInitializers = [];
    let _deletingSelection_decorators;
    let _deletingSelection_initializers = [];
    let _deletingSelection_extraInitializers = [];
    let _moving_decorators;
    let _moving_initializers = [];
    let _moving_extraInitializers = [];
    let _movingSelection_decorators;
    let _movingSelection_initializers = [];
    let _movingSelection_extraInitializers = [];
    let _copying_decorators;
    let _copying_initializers = [];
    let _copying_extraInitializers = [];
    let _ordering_decorators;
    let _ordering_initializers = [];
    let _ordering_extraInitializers = [];
    let _schemaLoading_decorators;
    let _schemaLoading_initializers = [];
    let _schemaLoading_extraInitializers = [];
    let _shouldReload_decorators;
    let _shouldReload_initializers = [];
    let _shouldReload_extraInitializers = [];
    let _loadingStrategy_decorators;
    let _loadingStrategy_initializers = [];
    let _loadingStrategy_extraInitializers = [];
    let _structureStrategy_decorators;
    let _structureStrategy_initializers = [];
    let _structureStrategy_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _schema_decorators;
    let _schema_initializers = [];
    let _schema_extraInitializers = [];
    let _forbidden_decorators;
    let _forbidden_initializers = [];
    let _forbidden_extraInitializers = [];
    let _get_initialized_decorators;
    let _get_loading_decorators;
    let _get_data_decorators;
    let _get_visibleItems_decorators;
    let _get_activeItems_decorators;
    let _get_queryOptions_decorators;
    let _get_filterQueryOption_decorators;
    let _get_userSchema_decorators;
    let _get_filterableFields_decorators;
    let _get_fields_decorators;
    let _updateLoadingStrategy_decorators;
    let _updateLoadingStrategy_initializers = [];
    let _updateLoadingStrategy_extraInitializers = [];
    let _updateStructureStrategy_decorators;
    let _updateStructureStrategy_initializers = [];
    let _updateStructureStrategy_extraInitializers = [];
    let _clear_decorators;
    let _clear_initializers = [];
    let _clear_extraInitializers = [];
    let _reset_decorators;
    let _reload_decorators;
    let _moveSelection_decorators;
    let _moveSelection_initializers = [];
    let _moveSelection_extraInitializers = [];
    let _deleteSelection_decorators;
    let _deleteSelection_initializers = [];
    let _deleteSelection_extraInitializers = [];
    let _setDataLoading_decorators;
    let _setForbidden_decorators;
    let _setShouldReload_decorators;
    let _setPage_decorators;
    let _setLimit_decorators;
    let _setActive_decorators;
    let _activate_decorators;
    let _deactivate_decorators;
    let _sort_decorators;
    let _order_decorators;
    let _search_decorators;
    let _filter_decorators;
    let _select_decorators;
    let _selectVisibleItems_decorators;
    let _deselect_decorators;
    let _deselectById_decorators;
    let _deselectVisibleItems_decorators;
    let _get_selectionIds_decorators;
    let _clearSelection_decorators;
    return _a = class ListStore {
            static getActiveSetting(listKey, userSettingsKey) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_ACTIVE].join('.');
                return userStore_1.default.getPersistentSetting(key);
            }
            static setActiveSetting(listKey, userSettingsKey, value) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_ACTIVE].join('.');
                userStore_1.default.setPersistentSetting(key, value);
            }
            static getFilterSetting(listKey, userSettingsKey) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_FILTER].join('.');
                return userStore_1.default.getPersistentSetting(key);
            }
            static setFilterSetting(listKey, userSettingsKey, value) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_FILTER].join('.');
                userStore_1.default.setPersistentSetting(key, value);
            }
            static getSortColumnSetting(listKey, userSettingsKey) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_SORT_COLUMN].join('.');
                return userStore_1.default.getPersistentSetting(key);
            }
            static setSortColumnSetting(listKey, userSettingsKey, value) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_SORT_COLUMN].join('.');
                userStore_1.default.setPersistentSetting(key, value);
            }
            static getSortOrderSetting(listKey, userSettingsKey) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_SORT_ORDER].join('.');
                return userStore_1.default.getPersistentSetting(key);
            }
            static setSortOrderSetting(listKey, userSettingsKey, value) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_SORT_ORDER].join('.');
                userStore_1.default.setPersistentSetting(key, value);
            }
            static getLimitSetting(listKey, userSettingsKey) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_LIMIT].join('.');
                return userStore_1.default.getPersistentSetting(key);
            }
            static setLimitSetting(listKey, userSettingsKey, value) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_LIMIT].join('.');
                userStore_1.default.setPersistentSetting(key, value);
            }
            static getSchemaSetting(listKey, userSettingsKey) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_SCHEMA].join('.');
                return userStore_1.default.getPersistentSetting(key);
            }
            static setSchemaSetting(listKey, userSettingsKey, value) {
                const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_SCHEMA].join('.');
                userStore_1.default.setPersistentSetting(key, value);
            }
            constructor(resourceKey, listKey, userSettingsKey, observableOptions, options = {}, metadataOptions, selectionIds) {
                this.pageCount = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _pageCount_initializers, 0));
                this.selections = (__runInitializers(this, _pageCount_extraInitializers), __runInitializers(this, _selections_initializers, []));
                this.dataLoading = (__runInitializers(this, _selections_extraInitializers), __runInitializers(this, _dataLoading_initializers, true));
                this.deleting = (__runInitializers(this, _dataLoading_extraInitializers), __runInitializers(this, _deleting_initializers, false));
                this.deletingSelection = (__runInitializers(this, _deleting_extraInitializers), __runInitializers(this, _deletingSelection_initializers, false));
                this.moving = (__runInitializers(this, _deletingSelection_extraInitializers), __runInitializers(this, _moving_initializers, false));
                this.movingSelection = (__runInitializers(this, _moving_extraInitializers), __runInitializers(this, _movingSelection_initializers, false));
                this.copying = (__runInitializers(this, _movingSelection_extraInitializers), __runInitializers(this, _copying_initializers, false));
                this.ordering = (__runInitializers(this, _copying_extraInitializers), __runInitializers(this, _ordering_initializers, false));
                this.schemaLoading = (__runInitializers(this, _ordering_extraInitializers), __runInitializers(this, _schemaLoading_initializers, true));
                this.shouldReload = (__runInitializers(this, _schemaLoading_extraInitializers), __runInitializers(this, _shouldReload_initializers, false));
                this.loadingStrategy = (__runInitializers(this, _shouldReload_extraInitializers), __runInitializers(this, _loadingStrategy_initializers, void 0));
                this.structureStrategy = (__runInitializers(this, _loadingStrategy_extraInitializers), __runInitializers(this, _structureStrategy_initializers, void 0));
                this.options = (__runInitializers(this, _structureStrategy_extraInitializers), __runInitializers(this, _options_initializers, void 0));
                this.schema = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _schema_initializers, void 0));
                this.forbidden = (__runInitializers(this, _schema_extraInitializers), __runInitializers(this, _forbidden_initializers, void 0));
                this.active = (__runInitializers(this, _forbidden_extraInitializers), mobx_1.observable.box());
                this.filterOptions = mobx_1.observable.box({});
                this.sortColumn = mobx_1.observable.box();
                this.sortOrder = mobx_1.observable.box();
                this.searchTerm = mobx_1.observable.box();
                this.limit = mobx_1.observable.box(10);
                this.changeUserSchema = (schema) => {
                    const schemaSettings = [];
                    Object.keys(schema).map((schemaKey) => {
                        const schemaEntry = schema[schemaKey];
                        schemaSettings.push({
                            schemaKey,
                            visibility: schemaEntry.visibility,
                        });
                    });
                    _a.setSchemaSetting(this.listKey, this.userSettingsKey, schemaSettings);
                };
                this.updateLoadingStrategy = __runInitializers(this, _updateLoadingStrategy_initializers, (loadingStrategy) => {
                    if (this.loadingStrategy && this.loadingStrategy === loadingStrategy) {
                        return;
                    }
                    if (this.loadingStrategy) {
                        this.reset();
                    }
                    if (this.structureStrategy) {
                        loadingStrategy.setStructureStrategy(this.structureStrategy);
                        this.structureStrategy.clear();
                    }
                    this.loadingStrategy = loadingStrategy;
                });
                this.updateStructureStrategy = (__runInitializers(this, _updateLoadingStrategy_extraInitializers), __runInitializers(this, _updateStructureStrategy_initializers, (structureStrategy) => {
                    if (this.structureStrategy === structureStrategy) {
                        return;
                    }
                    if (this.loadingStrategy) {
                        this.loadingStrategy.setStructureStrategy(structureStrategy);
                    }
                    const hadStructureStrategy = !!this.structureStrategy;
                    this.structureStrategy = structureStrategy;
                    if (hadStructureStrategy) {
                        // force a reload to match new structure
                        this.reload();
                    }
                }));
                this.clear = (__runInitializers(this, _updateStructureStrategy_extraInitializers), __runInitializers(this, _clear_initializers, () => {
                    if (this.structureStrategy) {
                        this.structureStrategy.clear();
                    }
                }));
                this.delete = (__runInitializers(this, _clear_extraInitializers), (id, options) => {
                    this.deleting = true;
                    return ResourceRequester_1.default.delete(this.resourceKey, Object.assign(Object.assign(Object.assign({}, this.queryOptions), options), { id }))
                        .then((0, mobx_1.action)(() => {
                        this.deleting = false;
                        this.deselectById(id);
                        this.remove(id);
                    }))
                        .catch((0, mobx_1.action)((error) => {
                        this.deleting = false;
                        throw error;
                    }));
                });
                this.move = (id, parentId) => {
                    this.moving = true;
                    return this.requestMove(id, parentId)
                        .then((0, mobx_1.action)(() => {
                        this.moving = false;
                        this.activate(id);
                        this.clear();
                    }));
                };
                this.moveSelection = __runInitializers(this, _moveSelection_initializers, (parentId) => {
                    const { selectionIds } = this;
                    this.movingSelection = true;
                    return Promise.all(selectionIds.map((selectionId) => this.requestMove(selectionId, parentId)))
                        .then((0, mobx_1.action)(() => {
                        this.movingSelection = false;
                        this.clear();
                        this.activate(parentId);
                    }));
                });
                this.copy = (__runInitializers(this, _moveSelection_extraInitializers), (id, parentId, callback) => {
                    const queryOptions = Object.assign(Object.assign({}, this.options), { action: 'copy', destination: parentId });
                    const { locale } = this.observableOptions;
                    if (locale) {
                        queryOptions.locale = locale.get();
                    }
                    this.copying = true;
                    return ResourceRequester_1.default.post(this.resourceKey, undefined, Object.assign(Object.assign({}, queryOptions), { id }))
                        .then((0, mobx_1.action)((response) => {
                        this.copying = false;
                        callback === null || callback === void 0 ? void 0 : callback(response);
                        // TODO do not hardcode "id", but use some metadata instead
                        this.activate(response.id);
                        this.clear();
                    }));
                });
                this.deleteSelection = __runInitializers(this, _deleteSelection_initializers, () => {
                    const deletePromises = [];
                    this.deletingSelection = true;
                    this.selectionIds.forEach((id) => {
                        deletePromises.push(ResourceRequester_1.default.delete(this.resourceKey, Object.assign(Object.assign({}, this.queryOptions), { id }))
                            .catch((error) => {
                            if (error.status !== 404) {
                                return Promise.reject(error);
                            }
                        }));
                    });
                    return Promise.all(deletePromises)
                        .then((0, mobx_1.action)(() => {
                        this.selectionIds.forEach(this.remove);
                        this.clearSelection();
                        this.reload();
                        this.deletingSelection = false;
                    }))
                        .catch((0, mobx_1.action)((error) => {
                        this.deletingSelection = false;
                        return Promise.reject(error);
                    }));
                });
                this.remove = (__runInitializers(this, _deleteSelection_extraInitializers), (identifier) => {
                    this.structureStrategy.remove(identifier);
                });
                this.sendRequest = () => {
                    if (!this.initialized) {
                        return;
                    }
                    const observableOptions = {};
                    for (const key in this.observableOptions) {
                        observableOptions[key] = this.observableOptions[key].get();
                    }
                    this.setDataLoading(true);
                    this.setForbidden(false);
                    const active = this.active.get();
                    const options = Object.assign(Object.assign({}, observableOptions), this.options);
                    if (this.initialSelectionIds) {
                        options.selectedIds = this.initialSelectionIds.join(',');
                    }
                    if (!options.selectedIds) {
                        if (active && (0, mobx_1.untracked)(() => !this.structureStrategy.findById(active))) {
                            this.structureStrategy.clear();
                            options.expandedIds = active;
                        }
                        if (!options.expandedIds && active) {
                            options.parentId = active;
                        }
                    }
                    options.sortBy = this.sortColumn.get();
                    options.sortOrder = this.sortOrder.get();
                    options.limit = this.limit.get();
                    options.fields = this.fields;
                    if (Object.keys(this.filterQueryOption).length > 0) {
                        options.filter = this.filterQueryOption;
                    }
                    if (this.searchTerm.get()) {
                        options.search = this.searchTerm.get();
                    }
                    loglevel_1.default.info('List loads "' + this.resourceKey + '" data with the following options:', options);
                    if (this.pendingRequest) {
                        this.pendingRequest.abort();
                    }
                    this.pendingRequest = this.loadingStrategy.load(this.resourceKey, options, (options.selectedIds || options.expandedIds) ? undefined : active).then((0, mobx_1.action)((response) => {
                        this.pendingRequest = undefined;
                        this.pageCount = response.pages;
                        this.setDataLoading(false);
                        if (this.initialSelectionIds) {
                            this.initialSelectionIds
                                .map((selectionId) => this.findById(selectionId))
                                .forEach((selectionRow) => {
                                if (!selectionRow) {
                                    return;
                                }
                                this.select(selectionRow);
                            });
                            this.initialSelectionIds = undefined;
                        }
                    })).catch((response) => {
                        if (response.name === 'AbortError') {
                            return;
                        }
                        this.pendingRequest = undefined;
                        if (this.active.get() && response.status === 404) {
                            // need to set the user setting to null manually, because the autorun runs too late
                            _a.setActiveSetting(this.listKey, this.userSettingsKey, undefined);
                            this.setActive(undefined);
                            return;
                        }
                        if (response.status === 403) {
                            this.setForbidden(true);
                        }
                        this.setDataLoading(false);
                    });
                };
                this.resourceKey = resourceKey;
                this.listKey = listKey;
                this.userSettingsKey = userSettingsKey;
                this.observableOptions = observableOptions;
                this.options = options;
                this.metadataOptions = metadataOptions;
                this.initialSelectionIds = selectionIds;
                this.sendRequestDisposer = (0, mobx_1.autorun)(() => {
                    if (this.shouldReload) {
                        // changing the value of the reload flag will retrigger this autorun and send the request
                        this.setShouldReload(false);
                    }
                    else {
                        this.sendRequest();
                    }
                });
                const callResetForChangedObservable = (change) => {
                    if (this.initialized && change.object.get() !== change.newValue) {
                        this.reset();
                    }
                };
                const { locale } = this.observableOptions;
                if (locale) {
                    this.localeDisposer = (0, mobx_1.intercept)(locale, '', (change) => {
                        callResetForChangedObservable(change);
                        return change;
                    });
                }
                this.searchDisposer = (0, mobx_1.intercept)(this.searchTerm, '', (change) => {
                    callResetForChangedObservable(change);
                    return change;
                });
                this.filterDisposer = (0, mobx_1.intercept)(this.filterOptions, '', (change) => {
                    const oldValue = change.object.get();
                    const oldFilteredValue = oldValue ?
                        Object.keys(oldValue).reduce((oldFilteredValue, currentKey) => {
                            if (oldValue[currentKey] !== undefined) {
                                oldFilteredValue[currentKey] = oldValue[currentKey];
                            }
                            return oldFilteredValue;
                        }, {})
                        : {};
                    const newValue = change.newValue;
                    const newFilteredValue = newValue ?
                        Object.keys(newValue).reduce((newFilteredValue, currentKey) => {
                            if (newValue[currentKey] !== undefined) {
                                newFilteredValue[currentKey] = newValue[currentKey];
                            }
                            return newFilteredValue;
                        }, {})
                        : {};
                    if (!(0, fast_deep_equal_1.default)(oldFilteredValue, newFilteredValue)) {
                        callResetForChangedObservable(change);
                    }
                    if (!(0, fast_deep_equal_1.default)(oldValue, newValue)) {
                        _a.setFilterSetting(this.listKey, this.userSettingsKey, change.newValue);
                    }
                    return change;
                });
                this.sortColumnDisposer = (0, mobx_1.intercept)(this.sortColumn, '', (change) => {
                    _a.setSortColumnSetting(this.listKey, this.userSettingsKey, change.newValue);
                    callResetForChangedObservable(change);
                    return change;
                });
                this.sortOrderDisposer = (0, mobx_1.intercept)(this.sortOrder, '', (change) => {
                    _a.setSortOrderSetting(this.listKey, this.userSettingsKey, change.newValue);
                    callResetForChangedObservable(change);
                    return change;
                });
                this.limitDisposer = (0, mobx_1.intercept)(this.limit, '', (change) => {
                    _a.setLimitSetting(this.listKey, this.userSettingsKey, change.newValue);
                    callResetForChangedObservable(change);
                    return change;
                });
                this.activeSettingDisposer = (0, mobx_1.intercept)(this.active, '', (change) => {
                    _a.setActiveSetting(this.listKey, this.userSettingsKey, change.newValue);
                    return change;
                });
                metadataStore_1.default.getSchema(this.listKey, this.metadataOptions)
                    .then((0, mobx_1.action)((schema) => {
                    this.schema = schema;
                    this.schemaLoading = false;
                }));
            }
            get initialized() {
                return !!this.loadingStrategy && !!this.structureStrategy && !!this.schema;
            }
            get loading() {
                return this.dataLoading || this.schemaLoading;
            }
            get data() {
                return this.structureStrategy.data;
            }
            get visibleItems() {
                return this.structureStrategy.visibleItems;
            }
            get activeItems() {
                return this.structureStrategy.activeItems;
            }
            get queryOptions() {
                const queryOptions = Object.assign({}, this.options);
                const { locale } = this.observableOptions;
                if (locale) {
                    queryOptions.locale = locale.get();
                }
                return queryOptions;
            }
            get filterQueryOption() {
                const filterOptions = this.filterOptions.get();
                return Object.keys(filterOptions).reduce((filterQueryOption, column) => {
                    if (filterOptions[column] !== undefined) {
                        filterQueryOption[column] = filterOptions[column];
                    }
                    return filterQueryOption;
                }, {});
            }
            get userSchema() {
                if (!this.initialized) {
                    return {};
                }
                const schemaSettings = _a.getSchemaSetting(this.listKey, this.userSettingsKey) || [];
                const userSchema = {};
                for (const schemaSettingsEntry of schemaSettings) {
                    if (!this.schema.hasOwnProperty(schemaSettingsEntry.schemaKey)) {
                        continue;
                    }
                    userSchema[schemaSettingsEntry.schemaKey] = Object.assign(Object.assign({}, this.schema[schemaSettingsEntry.schemaKey]), { visibility: schemaSettingsEntry.visibility });
                }
                for (const schemaKey of Object.keys(this.schema)) {
                    if (!userSchema.hasOwnProperty(schemaKey)) {
                        userSchema[schemaKey] = this.schema[schemaKey];
                    }
                }
                return userSchema;
            }
            get filterableFields() {
                if (!this.schema) {
                    return undefined;
                }
                return Object.keys(this.schema).reduce((filterableFields, schemaKey) => {
                    if (this.schema[schemaKey].filterType) {
                        filterableFields[schemaKey] = this.schema[schemaKey];
                    }
                    return filterableFields;
                }, {});
            }
            get fields() {
                const fields = [];
                Object.keys(this.userSchema).forEach((schemaKey) => {
                    const schemaEntry = this.userSchema[schemaKey];
                    if (schemaEntry.visibility === 'yes' || schemaEntry.visibility === 'always') {
                        fields.push(schemaKey);
                    }
                });
                // TODO do not hardcode id but use metdata instead
                if (!fields.includes('id')) {
                    fields.push('id');
                }
                return fields;
            }
            reset() {
                const page = this.getPage();
                this.clear();
                this.pageCount = 0;
                if (page && page > 1) {
                    this.setPage(1);
                }
            }
            reload() {
                this.setShouldReload(true);
            }
            findById(id) {
                return this.structureStrategy.findById(id);
            }
            requestMove(id, parentId) {
                const queryOptions = Object.assign(Object.assign({}, this.options), { action: 'move', destination: parentId });
                const { locale } = this.observableOptions;
                if (locale) {
                    queryOptions.locale = locale.get();
                }
                return ResourceRequester_1.default.post(this.resourceKey, undefined, Object.assign(Object.assign({}, queryOptions), { id }));
            }
            setDataLoading(dataLoading) {
                this.dataLoading = dataLoading;
            }
            setForbidden(forbidden) {
                this.forbidden = forbidden;
            }
            setShouldReload(shouldReload) {
                this.shouldReload = shouldReload;
            }
            getPage() {
                return this.observableOptions.page.get();
            }
            setPage(page) {
                this.observableOptions.page.set(page);
            }
            setLimit(limit) {
                this.limit.set(limit);
            }
            setActive(active) {
                this.active.set(active);
            }
            activate(id) {
                // force reload by changing the active item to undefined before actually setting it
                this.setActive(undefined);
                this.setActive(id);
                if (this.structureStrategy.activate) {
                    this.structureStrategy.activate(id);
                }
            }
            deactivate(id) {
                if (this.structureStrategy.deactivate) {
                    this.structureStrategy.deactivate(id);
                }
            }
            sort(column, order) {
                this.sortColumn.set(column);
                this.sortOrder.set(order);
            }
            order(id, order) {
                this.ordering = true;
                return ResourceRequester_1.default.post(this.resourceKey, { position: order }, Object.assign(Object.assign({}, this.queryOptions), { action: 'order', id })).then((0, mobx_1.action)(() => {
                    this.ordering = false;
                    this.structureStrategy.order(id, order);
                }));
            }
            search(searchTerm) {
                if (searchTerm === this.searchTerm.get()) {
                    return;
                }
                this.searchTerm.set(searchTerm);
            }
            filter(filter) {
                this.filterOptions.set(filter);
            }
            select(row) {
                // TODO do not hardcode id but use metdata instead
                if (this.selections.findIndex((item) => item.id === row.id) !== -1) {
                    return;
                }
                this.selections.push(row);
            }
            /**
             * @deprecated
             */
            selectVisibleItems() {
                loglevel_1.default.warn('The "selectVisibleItems" method will select disabled rows. ' +
                    'Therefore the method is deprecated since version 2.0. ' +
                    'Use the "visibleItems" property and the "select" method instead.');
                this.visibleItems.forEach((item) => {
                    this.select(item);
                });
            }
            deselect(row) {
                // TODO do not hardcode id but use metdata instead
                this.deselectById(row.id);
            }
            deselectById(id) {
                // TODO do not hardcode id but use metdata instead
                const index = this.selections.findIndex((item) => item.id === id);
                if (index === -1) {
                    return;
                }
                this.selections.splice(index, 1);
            }
            /**
             * @deprecated
             */
            deselectVisibleItems() {
                loglevel_1.default.warn('The "deselectVisibleItems" method will deselect disabled rows. ' +
                    'Therefore the method is deprecated since version 2.0. ' +
                    'Use the "visibleItems" property and the "deselect" method instead.');
                this.visibleItems.forEach((item) => {
                    this.deselect(item);
                });
            }
            get selectionIds() {
                // TODO do not hardcode id but use metdata instead
                return this.selections.map((item) => item.id);
            }
            clearSelection() {
                this.selections = [];
            }
            destroy() {
                this.sendRequestDisposer();
                this.searchDisposer();
                this.filterDisposer();
                this.sortColumnDisposer();
                this.sortOrderDisposer();
                this.limitDisposer();
                this.activeSettingDisposer();
                if (this.localeDisposer) {
                    this.localeDisposer();
                }
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _pageCount_decorators = [mobx_1.observable];
            _selections_decorators = [mobx_1.observable];
            _dataLoading_decorators = [mobx_1.observable];
            _deleting_decorators = [mobx_1.observable];
            _deletingSelection_decorators = [mobx_1.observable];
            _moving_decorators = [mobx_1.observable];
            _movingSelection_decorators = [mobx_1.observable];
            _copying_decorators = [mobx_1.observable];
            _ordering_decorators = [mobx_1.observable];
            _schemaLoading_decorators = [mobx_1.observable];
            _shouldReload_decorators = [mobx_1.observable];
            _loadingStrategy_decorators = [mobx_1.observable];
            _structureStrategy_decorators = [mobx_1.observable];
            _options_decorators = [mobx_1.observable];
            _schema_decorators = [mobx_1.observable];
            _forbidden_decorators = [mobx_1.observable];
            _get_initialized_decorators = [mobx_1.computed];
            _get_loading_decorators = [mobx_1.computed];
            _get_data_decorators = [mobx_1.computed];
            _get_visibleItems_decorators = [mobx_1.computed];
            _get_activeItems_decorators = [mobx_1.computed];
            _get_queryOptions_decorators = [mobx_1.computed];
            _get_filterQueryOption_decorators = [(_b = mobx_1.computed).struct.bind(_b)];
            _get_userSchema_decorators = [mobx_1.computed];
            _get_filterableFields_decorators = [mobx_1.computed];
            _get_fields_decorators = [mobx_1.computed];
            _updateLoadingStrategy_decorators = [mobx_1.action];
            _updateStructureStrategy_decorators = [mobx_1.action];
            _clear_decorators = [mobx_1.action];
            _reset_decorators = [mobx_1.action];
            _reload_decorators = [mobx_1.action];
            _moveSelection_decorators = [mobx_1.action];
            _deleteSelection_decorators = [mobx_1.action];
            _setDataLoading_decorators = [mobx_1.action];
            _setForbidden_decorators = [mobx_1.action];
            _setShouldReload_decorators = [mobx_1.action];
            _setPage_decorators = [mobx_1.action];
            _setLimit_decorators = [mobx_1.action];
            _setActive_decorators = [mobx_1.action];
            _activate_decorators = [mobx_1.action];
            _deactivate_decorators = [mobx_1.action];
            _sort_decorators = [mobx_1.action];
            _order_decorators = [mobx_1.action];
            _search_decorators = [mobx_1.action];
            _filter_decorators = [mobx_1.action];
            _select_decorators = [mobx_1.action];
            _selectVisibleItems_decorators = [mobx_1.action];
            _deselect_decorators = [mobx_1.action];
            _deselectById_decorators = [mobx_1.action];
            _deselectVisibleItems_decorators = [mobx_1.action];
            _get_selectionIds_decorators = [mobx_1.computed];
            _clearSelection_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_initialized_decorators, { kind: "getter", name: "initialized", static: false, private: false, access: { has: obj => "initialized" in obj, get: obj => obj.initialized }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_loading_decorators, { kind: "getter", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_data_decorators, { kind: "getter", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_visibleItems_decorators, { kind: "getter", name: "visibleItems", static: false, private: false, access: { has: obj => "visibleItems" in obj, get: obj => obj.visibleItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_activeItems_decorators, { kind: "getter", name: "activeItems", static: false, private: false, access: { has: obj => "activeItems" in obj, get: obj => obj.activeItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_queryOptions_decorators, { kind: "getter", name: "queryOptions", static: false, private: false, access: { has: obj => "queryOptions" in obj, get: obj => obj.queryOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_filterQueryOption_decorators, { kind: "getter", name: "filterQueryOption", static: false, private: false, access: { has: obj => "filterQueryOption" in obj, get: obj => obj.filterQueryOption }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_userSchema_decorators, { kind: "getter", name: "userSchema", static: false, private: false, access: { has: obj => "userSchema" in obj, get: obj => obj.userSchema }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_filterableFields_decorators, { kind: "getter", name: "filterableFields", static: false, private: false, access: { has: obj => "filterableFields" in obj, get: obj => obj.filterableFields }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_fields_decorators, { kind: "getter", name: "fields", static: false, private: false, access: { has: obj => "fields" in obj, get: obj => obj.fields }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _reset_decorators, { kind: "method", name: "reset", static: false, private: false, access: { has: obj => "reset" in obj, get: obj => obj.reset }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _reload_decorators, { kind: "method", name: "reload", static: false, private: false, access: { has: obj => "reload" in obj, get: obj => obj.reload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setDataLoading_decorators, { kind: "method", name: "setDataLoading", static: false, private: false, access: { has: obj => "setDataLoading" in obj, get: obj => obj.setDataLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setForbidden_decorators, { kind: "method", name: "setForbidden", static: false, private: false, access: { has: obj => "setForbidden" in obj, get: obj => obj.setForbidden }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setShouldReload_decorators, { kind: "method", name: "setShouldReload", static: false, private: false, access: { has: obj => "setShouldReload" in obj, get: obj => obj.setShouldReload }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setPage_decorators, { kind: "method", name: "setPage", static: false, private: false, access: { has: obj => "setPage" in obj, get: obj => obj.setPage }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLimit_decorators, { kind: "method", name: "setLimit", static: false, private: false, access: { has: obj => "setLimit" in obj, get: obj => obj.setLimit }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setActive_decorators, { kind: "method", name: "setActive", static: false, private: false, access: { has: obj => "setActive" in obj, get: obj => obj.setActive }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _activate_decorators, { kind: "method", name: "activate", static: false, private: false, access: { has: obj => "activate" in obj, get: obj => obj.activate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deactivate_decorators, { kind: "method", name: "deactivate", static: false, private: false, access: { has: obj => "deactivate" in obj, get: obj => obj.deactivate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _sort_decorators, { kind: "method", name: "sort", static: false, private: false, access: { has: obj => "sort" in obj, get: obj => obj.sort }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _order_decorators, { kind: "method", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _filter_decorators, { kind: "method", name: "filter", static: false, private: false, access: { has: obj => "filter" in obj, get: obj => obj.filter }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _select_decorators, { kind: "method", name: "select", static: false, private: false, access: { has: obj => "select" in obj, get: obj => obj.select }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _selectVisibleItems_decorators, { kind: "method", name: "selectVisibleItems", static: false, private: false, access: { has: obj => "selectVisibleItems" in obj, get: obj => obj.selectVisibleItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deselect_decorators, { kind: "method", name: "deselect", static: false, private: false, access: { has: obj => "deselect" in obj, get: obj => obj.deselect }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deselectById_decorators, { kind: "method", name: "deselectById", static: false, private: false, access: { has: obj => "deselectById" in obj, get: obj => obj.deselectById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _deselectVisibleItems_decorators, { kind: "method", name: "deselectVisibleItems", static: false, private: false, access: { has: obj => "deselectVisibleItems" in obj, get: obj => obj.deselectVisibleItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_selectionIds_decorators, { kind: "getter", name: "selectionIds", static: false, private: false, access: { has: obj => "selectionIds" in obj, get: obj => obj.selectionIds }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clearSelection_decorators, { kind: "method", name: "clearSelection", static: false, private: false, access: { has: obj => "clearSelection" in obj, get: obj => obj.clearSelection }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _pageCount_decorators, { kind: "field", name: "pageCount", static: false, private: false, access: { has: obj => "pageCount" in obj, get: obj => obj.pageCount, set: (obj, value) => { obj.pageCount = value; } }, metadata: _metadata }, _pageCount_initializers, _pageCount_extraInitializers);
            __esDecorate(null, null, _selections_decorators, { kind: "field", name: "selections", static: false, private: false, access: { has: obj => "selections" in obj, get: obj => obj.selections, set: (obj, value) => { obj.selections = value; } }, metadata: _metadata }, _selections_initializers, _selections_extraInitializers);
            __esDecorate(null, null, _dataLoading_decorators, { kind: "field", name: "dataLoading", static: false, private: false, access: { has: obj => "dataLoading" in obj, get: obj => obj.dataLoading, set: (obj, value) => { obj.dataLoading = value; } }, metadata: _metadata }, _dataLoading_initializers, _dataLoading_extraInitializers);
            __esDecorate(null, null, _deleting_decorators, { kind: "field", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting, set: (obj, value) => { obj.deleting = value; } }, metadata: _metadata }, _deleting_initializers, _deleting_extraInitializers);
            __esDecorate(null, null, _deletingSelection_decorators, { kind: "field", name: "deletingSelection", static: false, private: false, access: { has: obj => "deletingSelection" in obj, get: obj => obj.deletingSelection, set: (obj, value) => { obj.deletingSelection = value; } }, metadata: _metadata }, _deletingSelection_initializers, _deletingSelection_extraInitializers);
            __esDecorate(null, null, _moving_decorators, { kind: "field", name: "moving", static: false, private: false, access: { has: obj => "moving" in obj, get: obj => obj.moving, set: (obj, value) => { obj.moving = value; } }, metadata: _metadata }, _moving_initializers, _moving_extraInitializers);
            __esDecorate(null, null, _movingSelection_decorators, { kind: "field", name: "movingSelection", static: false, private: false, access: { has: obj => "movingSelection" in obj, get: obj => obj.movingSelection, set: (obj, value) => { obj.movingSelection = value; } }, metadata: _metadata }, _movingSelection_initializers, _movingSelection_extraInitializers);
            __esDecorate(null, null, _copying_decorators, { kind: "field", name: "copying", static: false, private: false, access: { has: obj => "copying" in obj, get: obj => obj.copying, set: (obj, value) => { obj.copying = value; } }, metadata: _metadata }, _copying_initializers, _copying_extraInitializers);
            __esDecorate(null, null, _ordering_decorators, { kind: "field", name: "ordering", static: false, private: false, access: { has: obj => "ordering" in obj, get: obj => obj.ordering, set: (obj, value) => { obj.ordering = value; } }, metadata: _metadata }, _ordering_initializers, _ordering_extraInitializers);
            __esDecorate(null, null, _schemaLoading_decorators, { kind: "field", name: "schemaLoading", static: false, private: false, access: { has: obj => "schemaLoading" in obj, get: obj => obj.schemaLoading, set: (obj, value) => { obj.schemaLoading = value; } }, metadata: _metadata }, _schemaLoading_initializers, _schemaLoading_extraInitializers);
            __esDecorate(null, null, _shouldReload_decorators, { kind: "field", name: "shouldReload", static: false, private: false, access: { has: obj => "shouldReload" in obj, get: obj => obj.shouldReload, set: (obj, value) => { obj.shouldReload = value; } }, metadata: _metadata }, _shouldReload_initializers, _shouldReload_extraInitializers);
            __esDecorate(null, null, _loadingStrategy_decorators, { kind: "field", name: "loadingStrategy", static: false, private: false, access: { has: obj => "loadingStrategy" in obj, get: obj => obj.loadingStrategy, set: (obj, value) => { obj.loadingStrategy = value; } }, metadata: _metadata }, _loadingStrategy_initializers, _loadingStrategy_extraInitializers);
            __esDecorate(null, null, _structureStrategy_decorators, { kind: "field", name: "structureStrategy", static: false, private: false, access: { has: obj => "structureStrategy" in obj, get: obj => obj.structureStrategy, set: (obj, value) => { obj.structureStrategy = value; } }, metadata: _metadata }, _structureStrategy_initializers, _structureStrategy_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _schema_decorators, { kind: "field", name: "schema", static: false, private: false, access: { has: obj => "schema" in obj, get: obj => obj.schema, set: (obj, value) => { obj.schema = value; } }, metadata: _metadata }, _schema_initializers, _schema_extraInitializers);
            __esDecorate(null, null, _forbidden_decorators, { kind: "field", name: "forbidden", static: false, private: false, access: { has: obj => "forbidden" in obj, get: obj => obj.forbidden, set: (obj, value) => { obj.forbidden = value; } }, metadata: _metadata }, _forbidden_initializers, _forbidden_extraInitializers);
            __esDecorate(null, null, _updateLoadingStrategy_decorators, { kind: "field", name: "updateLoadingStrategy", static: false, private: false, access: { has: obj => "updateLoadingStrategy" in obj, get: obj => obj.updateLoadingStrategy, set: (obj, value) => { obj.updateLoadingStrategy = value; } }, metadata: _metadata }, _updateLoadingStrategy_initializers, _updateLoadingStrategy_extraInitializers);
            __esDecorate(null, null, _updateStructureStrategy_decorators, { kind: "field", name: "updateStructureStrategy", static: false, private: false, access: { has: obj => "updateStructureStrategy" in obj, get: obj => obj.updateStructureStrategy, set: (obj, value) => { obj.updateStructureStrategy = value; } }, metadata: _metadata }, _updateStructureStrategy_initializers, _updateStructureStrategy_extraInitializers);
            __esDecorate(null, null, _clear_decorators, { kind: "field", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear, set: (obj, value) => { obj.clear = value; } }, metadata: _metadata }, _clear_initializers, _clear_extraInitializers);
            __esDecorate(null, null, _moveSelection_decorators, { kind: "field", name: "moveSelection", static: false, private: false, access: { has: obj => "moveSelection" in obj, get: obj => obj.moveSelection, set: (obj, value) => { obj.moveSelection = value; } }, metadata: _metadata }, _moveSelection_initializers, _moveSelection_extraInitializers);
            __esDecorate(null, null, _deleteSelection_decorators, { kind: "field", name: "deleteSelection", static: false, private: false, access: { has: obj => "deleteSelection" in obj, get: obj => obj.deleteSelection, set: (obj, value) => { obj.deleteSelection = value; } }, metadata: _metadata }, _deleteSelection_initializers, _deleteSelection_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ListStore;
