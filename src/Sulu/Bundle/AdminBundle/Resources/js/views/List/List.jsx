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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_1 = __importStar(require("react"));
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const List_1 = __importStar(require("../../containers/List"));
const Toolbar_1 = require("../../containers/Toolbar");
const Translator_1 = require("../../utils/Translator");
const listToolbarActionRegistry_1 = __importDefault(require("./registries/listToolbarActionRegistry"));
const listItemActionRegistry_1 = __importDefault(require("./registries/listItemActionRegistry"));
const list_scss_1 = __importDefault(require("./list.scss"));
const DEFAULT_USER_SETTINGS_KEY = 'list';
const DEFAULT_LIMIT = 10;
let List = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _toolbarActions_decorators;
    let _toolbarActions_initializers = [];
    let _toolbarActions_extraInitializers = [];
    let _itemActions_decorators;
    let _itemActions_initializers = [];
    let _itemActions_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _get_locales_decorators;
    let _componentDidMount_decorators;
    let _handleDeleteError_decorators;
    let _handleDeleteError_initializers = [];
    let _handleDeleteError_extraInitializers = [];
    var List = _classThis = class extends _classSuper {
        static getDerivedRouteAttributes(route) {
            const { options: { listKey, userSettingsKey = DEFAULT_USER_SETTINGS_KEY, }, } = route;
            const limit = List_1.ListStore.getLimitSetting(listKey, userSettingsKey);
            return {
                active: List_1.ListStore.getActiveSetting(listKey, userSettingsKey),
                filter: List_1.ListStore.getFilterSetting(listKey, userSettingsKey),
                sortColumn: List_1.ListStore.getSortColumnSetting(listKey, userSettingsKey),
                sortOrder: List_1.ListStore.getSortOrderSetting(listKey, userSettingsKey),
                limit: limit === DEFAULT_LIMIT ? undefined : limit,
            };
        }
        get locales() {
            const { locales: propsLocales, router: { route: { options: { locales: routeLocales, }, }, }, } = this.props;
            return routeLocales ? routeLocales : propsLocales;
        }
        constructor(props) {
            super(props);
            this.page = (__runInitializers(this, _instanceExtraInitializers), mobx_1.observable.box());
            this.toolbarActions = __runInitializers(this, _toolbarActions_initializers, []);
            this.itemActions = (__runInitializers(this, _toolbarActions_extraInitializers), __runInitializers(this, _itemActions_initializers, []));
            this.errors = (__runInitializers(this, _itemActions_extraInitializers), __runInitializers(this, _errors_initializers, []));
            this.addItem = (__runInitializers(this, _errors_extraInitializers), (parentId) => {
                const { onItemAdd, router } = this.props;
                const { route: { options: { addView, }, }, } = router;
                if (onItemAdd) {
                    onItemAdd(parentId);
                    return;
                }
                router.navigate(addView, { locale: this.locale.get(), parentId });
            });
            this.handleItemClick = (itemId) => {
                const { onItemClick, router } = this.props;
                const { route: { options: { editView, }, }, } = router;
                if (onItemClick) {
                    onItemClick(itemId);
                    return;
                }
                router.navigate(editView, { id: itemId, locale: this.locale.get() });
            };
            this.getItemActionConfigs = (item) => {
                return this.itemActions.map((itemAction) => itemAction.getItemActionConfig(item));
            };
            this.requestSelectionDelete = (allowConflictDelete = true) => {
                if (!this.list) {
                    throw new Error('List not created yet.');
                }
                this.list.requestSelectionDelete(allowConflictDelete);
            };
            this.reload = () => {
                this.listStore.reload();
            };
            this.setListRef = (list) => {
                this.list = list;
            };
            this.handleDeleteError = __runInitializers(this, _handleDeleteError_initializers, (error) => {
                const message = (error === null || error === void 0 ? void 0 : error.detail) || (error === null || error === void 0 ? void 0 : error.title) || (0, Translator_1.translate)('sulu_admin.unexpected_delete_server_error');
                this.errors.push(message);
            });
            __runInitializers(this, _handleDeleteError_extraInitializers);
            const { locale, router } = this.props;
            const { attributes, route: { options: { adapters, requestParameters = {}, listKey, resourceKey, routerAttributesToListRequest = {}, resourceStorePropertiesToListRequest = {}, userSettingsKey = DEFAULT_USER_SETTINGS_KEY, routerAttributesToListMetadata = {}, resourceStorePropertiesToListMetadata = {}, metadataRequestParameters = {}, }, }, } = router;
            if (!resourceKey) {
                throw new Error('The route does not define the mandatory "resourceKey" option');
            }
            if (!listKey) {
                throw new Error('The route does not define the mandatory "listKey" option');
            }
            if (!adapters) {
                throw new Error('The route does not define the mandatory "adapters" option');
            }
            this.locale = locale ? locale : mobx_1.observable.box();
            const observableOptions = {};
            router.bind('page', this.page, 1);
            observableOptions.page = this.page;
            if (this.locales) {
                router.bind('locale', this.locale);
                observableOptions.locale = this.locale;
            }
            const listStoreOptions = this.buildListStoreOptions(requestParameters, attributes, routerAttributesToListRequest, resourceStorePropertiesToListRequest, props.resourceStore);
            const metadataOptions = this.buildMetadataOptions(attributes, routerAttributesToListMetadata, resourceStorePropertiesToListMetadata, props.resourceStore, metadataRequestParameters);
            this.listStore = new List_1.ListStore(resourceKey, listKey, userSettingsKey, observableOptions, listStoreOptions, metadataOptions);
            router.bind('active', this.listStore.active);
            router.bind('sortColumn', this.listStore.sortColumn);
            router.bind('sortOrder', this.listStore.sortOrder);
            router.bind('search', this.listStore.searchTerm);
            router.bind('limit', this.listStore.limit, DEFAULT_LIMIT);
            router.bind('filter', this.listStore.filterOptions, {});
        }
        buildMetadataOptions(attributes, routerAttributesToListMetadata, resourceStorePropertiesToListMetadata, resourceStore, metadataRequestParameters) {
            const metadataOptions = Object.assign({}, metadataRequestParameters);
            routerAttributesToListMetadata = (0, mobx_1.toJS)(routerAttributesToListMetadata);
            Object.keys(routerAttributesToListMetadata).forEach((key) => {
                const listOptionKey = routerAttributesToListMetadata[key];
                const attributeName = isNaN(key) ? key : routerAttributesToListMetadata[key];
                metadataOptions[listOptionKey] = attributes[attributeName];
            });
            resourceStorePropertiesToListMetadata = (0, mobx_1.toJS)(resourceStorePropertiesToListMetadata);
            Object.keys(resourceStorePropertiesToListMetadata).forEach((key) => {
                const listMetadataKey = resourceStorePropertiesToListMetadata[key];
                const attributeName = isNaN(key) ? key : resourceStorePropertiesToListMetadata[key];
                if (!resourceStore || !resourceStore.data) {
                    return;
                }
                metadataOptions[listMetadataKey] = resourceStore.data[attributeName];
            });
            return metadataOptions;
        }
        buildListStoreOptions(requestParameters, attributes, routerAttributesToListRequest, resourceStorePropertiesToListRequest, resourceStore) {
            const listStoreOptions = requestParameters ? requestParameters : {};
            routerAttributesToListRequest = (0, mobx_1.toJS)(routerAttributesToListRequest);
            Object.keys(routerAttributesToListRequest).forEach((key) => {
                const listOptionKey = routerAttributesToListRequest[key];
                const attributeName = isNaN(key) ? key : routerAttributesToListRequest[key];
                listStoreOptions[listOptionKey] = attributes[attributeName];
            });
            resourceStorePropertiesToListRequest = (0, mobx_1.toJS)(resourceStorePropertiesToListRequest);
            Object.keys(resourceStorePropertiesToListRequest).forEach((key) => {
                const listOptionKey = resourceStorePropertiesToListRequest[key];
                const attributeName = isNaN(key) ? key : resourceStorePropertiesToListRequest[key];
                if (!resourceStore || !resourceStore.data) {
                    return;
                }
                listStoreOptions[listOptionKey] = resourceStore.data[attributeName];
            });
            return listStoreOptions;
        }
        componentDidMount() {
            const { resourceStore, router } = this.props;
            const { route: { options: { locales, toolbarActions = [], itemActions = [], }, }, } = router;
            toolbarActions.forEach((toolbarAction) => {
                if (typeof toolbarAction !== 'object') {
                    throw new Error('The value of a toolbarAction entry must be an object, but ' + typeof toolbarAction + ' was given!');
                }
                this.toolbarActions.push(new (listToolbarActionRegistry_1.default.get(toolbarAction.type))(this.listStore, this, router, locales, resourceStore, toolbarAction.options));
            });
            itemActions.forEach((itemAction) => {
                if (typeof itemAction !== 'object') {
                    throw new Error('The value of a itemAction entry must be an object, but ' + typeof itemAction + ' was given!');
                }
                this.itemActions.push(new (listItemActionRegistry_1.default.get(itemAction.type))(this.listStore, this, router, locales, resourceStore, itemAction.options));
            });
        }
        componentDidUpdate(prevProps) {
            const { route: { options: { locales, }, }, } = this.props.router;
            const { route: { options: { prevLocales, }, }, } = prevProps.router;
            if (!(0, fast_deep_equal_1.default)(locales, prevLocales)) {
                this.toolbarActions.forEach((toolbarAction) => {
                    toolbarAction.setLocales(locales);
                });
                this.itemActions.forEach((itemAction) => {
                    itemAction.setLocales(locales);
                });
            }
        }
        componentWillUnmount() {
            this.listStore.destroy();
            this.toolbarActions.forEach((toolbarAction) => toolbarAction.destroy());
        }
        render() {
            const { onItemAdd, onItemClick, router: { route: { options: { adapters, addView, editView, filterable, itemDisabledCondition, searchable, selectable, paginated, adapterOptions, hideColumnOptions, title: routeTitle, }, }, }, title: propTitle, } = this.props;
            const title = routeTitle ? (0, Translator_1.translate)(routeTitle) : propTitle;
            return (<react_1.Fragment>
                <div className={list_scss_1.default.listContainer}>
                    <List_1.default adapterOptions={adapterOptions} adapters={adapters} filterable={filterable} header={title && <h1>{title}</h1>} itemActionsProvider={this.getItemActionConfigs} itemDisabledCondition={itemDisabledCondition} onDeleteError={this.handleDeleteError} onItemAdd={onItemAdd || addView ? this.addItem : undefined} onItemClick={onItemClick || editView ? this.handleItemClick : undefined} paginated={paginated} ref={this.setListRef} searchable={searchable} selectable={selectable} showColumnOptions={!hideColumnOptions} store={this.listStore}/>
                    {this.toolbarActions.map((toolbarAction) => toolbarAction.getNode())}
                    {this.itemActions.map((itemAction) => itemAction.getNode())}
                </div>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "List");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _toolbarActions_decorators = [mobx_1.observable];
        _itemActions_decorators = [mobx_1.observable];
        _errors_decorators = [mobx_1.observable];
        _get_locales_decorators = [mobx_1.computed];
        _componentDidMount_decorators = [mobx_1.action];
        _handleDeleteError_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_locales_decorators, { kind: "getter", name: "locales", static: false, private: false, access: { has: obj => "locales" in obj, get: obj => obj.locales }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _toolbarActions_decorators, { kind: "field", name: "toolbarActions", static: false, private: false, access: { has: obj => "toolbarActions" in obj, get: obj => obj.toolbarActions, set: (obj, value) => { obj.toolbarActions = value; } }, metadata: _metadata }, _toolbarActions_initializers, _toolbarActions_extraInitializers);
        __esDecorate(null, null, _itemActions_decorators, { kind: "field", name: "itemActions", static: false, private: false, access: { has: obj => "itemActions" in obj, get: obj => obj.itemActions, set: (obj, value) => { obj.itemActions = value; } }, metadata: _metadata }, _itemActions_initializers, _itemActions_extraInitializers);
        __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
        __esDecorate(null, null, _handleDeleteError_decorators, { kind: "field", name: "handleDeleteError", static: false, private: false, access: { has: obj => "handleDeleteError" in obj, get: obj => obj.handleDeleteError, set: (obj, value) => { obj.handleDeleteError = value; } }, metadata: _metadata }, _handleDeleteError_initializers, _handleDeleteError_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        List = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.remountViewOnLogin = true;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return List = _classThis;
})();
exports.default = (0, Toolbar_1.withToolbar)(List, function () {
    const { errors } = this;
    const { router } = this.props;
    const { route: { options: { backView, }, }, } = router;
    const backButton = backView
        ? {
            onClick: () => {
                const options = {};
                if (this.locale) {
                    options.locale = this.locale.get();
                }
                router.restore(backView, options);
            },
        }
        : undefined;
    const locale = this.locales
        ? {
            value: this.locale.get(),
            onChange: (0, mobx_1.action)((locale) => {
                this.locale.set(locale);
            }),
            options: this.locales.map((locale) => ({
                value: locale,
                label: locale,
            })),
        }
        : undefined;
    const items = this.toolbarActions
        .map((toolbarAction) => toolbarAction.getToolbarItemConfig())
        .filter((item) => item != null);
    return {
        backButton,
        errors,
        locale,
        items,
    };
});
