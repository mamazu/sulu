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
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const userStore_1 = __importDefault(require("sulu-admin-bundle/stores/userStore/userStore"));
const utils_1 = require("sulu-admin-bundle/utils");
const containers_2 = require("sulu-website-bundle/containers");
const pageList_scss_1 = __importDefault(require("./pageList.scss"));
const USER_SETTINGS_KEY = 'page_list';
const PAGES_RESOURCE_KEY = 'pages';
function getUserSettingsKeyForWebspace(webspace) {
    return [USER_SETTINGS_KEY, webspace].join('_');
}
let PageList = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _availablePageTypes_decorators;
    let _availablePageTypes_initializers = [];
    let _availablePageTypes_extraInitializers = [];
    let _availablePageTypesLoading_decorators;
    let _availablePageTypesLoading_initializers = [];
    let _availablePageTypesLoading_extraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _redirectToWebspaceLocale_decorators;
    let _redirectToWebspaceLocale_initializers = [];
    let _redirectToWebspaceLocale_extraInitializers = [];
    let _handleDeleteError_decorators;
    let _handleDeleteError_initializers = [];
    let _handleDeleteError_extraInitializers = [];
    var PageList = _classThis = class extends _classSuper {
        static getDerivedRouteAttributes(route, attributes) {
            if (typeof attributes.webspace !== 'string') {
                throw new Error('The "webspace" router attribute must be a string!');
            }
            return {
                active: containers_1.ListStore.getActiveSetting(PAGES_RESOURCE_KEY, getUserSettingsKeyForWebspace(attributes.webspace)),
            };
        }
        constructor(props) {
            super(props);
            this.page = mobx_1.observable.box();
            this.locale = mobx_1.observable.box();
            this.excludeGhostsAndShadows = mobx_1.observable.box(false);
            this.availablePageTypes = __runInitializers(this, _availablePageTypes_initializers, []);
            this.availablePageTypesLoading = (__runInitializers(this, _availablePageTypes_extraInitializers), __runInitializers(this, _availablePageTypesLoading_initializers, true));
            this.errors = (__runInitializers(this, _availablePageTypesLoading_extraInitializers), __runInitializers(this, _errors_initializers, []));
            this.redirectToWebspaceLocale = (__runInitializers(this, _errors_extraInitializers), __runInitializers(this, _redirectToWebspaceLocale_initializers, () => {
                const { webspace, router } = this.props;
                if (!webspace || !webspace.localizations) {
                    return;
                }
                if (webspace.allLocalizations.find((localization) => localization.localization === this.locale.get())) {
                    return;
                }
                const locale = webspace.allLocalizations.find((localization) => localization.localization === userStore_1.default.contentLocale) ? userStore_1.default.contentLocale : this.findDefaultLocale(webspace.localizations);
                if (!locale) {
                    throw new Error('Default locale in webspace "' + webspace.key + '" not found');
                }
                if (locale === this.locale.get()) {
                    return;
                }
                router.redirect(router.route.name, Object.assign(Object.assign({}, router.attributes), { locale }));
            }));
            this.findDefaultLocale = (__runInitializers(this, _redirectToWebspaceLocale_extraInitializers), (localizations) => {
                for (const localization of localizations) {
                    if (localization.default) {
                        return localization.locale;
                    }
                    if (localization.children) {
                        const locale = this.findDefaultLocale(localization.children);
                        if (locale) {
                            return locale;
                        }
                    }
                }
            });
            this.handleEditClick = (id) => {
                const { router } = this.props;
                router.navigate('sulu_page.page_edit_form', {
                    id,
                    locale: this.locale.get(),
                    webspace: router.attributes.webspace,
                });
            };
            this.handleItemAdd = (id) => {
                const { router } = this.props;
                router.navigate('sulu_page.page_add_form', {
                    parentId: id,
                    locale: this.locale.get(),
                    webspace: router.attributes.webspace,
                });
            };
            this.handleCopyFinished = (response) => {
                const { webspaceKey } = this.props;
                if (webspaceKey.get() !== response.webspace) {
                    webspaceKey.set(response.webspace);
                }
            };
            this.getIndicators = (item) => {
                const indicators = [];
                if (!this.availablePageTypes.includes(item.template)) {
                    indicators.push(<components_1.Icon key="missing-template" name="su-exclamation-circle"/>);
                }
                return indicators;
            };
            this.handleDeleteError = __runInitializers(this, _handleDeleteError_initializers, (error) => {
                const message = (error === null || error === void 0 ? void 0 : error.detail) || (error === null || error === void 0 ? void 0 : error.title) || (0, utils_1.translate)('sulu_admin.unexpected_delete_server_error');
                this.errors.push(message);
            });
            __runInitializers(this, _handleDeleteError_extraInitializers);
            const { router, webspaceKey } = this.props;
            const { attributes: { webspace, }, } = router;
            if (typeof webspace !== 'string') {
                throw new Error('The "webspace" router attribute must be a string!');
            }
            const observableOptions = {};
            const requestParameters = { webspace };
            this.redirectToWebspaceLocale();
            router.bind('locale', this.locale);
            router.bind('page', this.page, 1);
            observableOptions.page = this.page;
            router.bind('excludeGhostsAndShadows', this.excludeGhostsAndShadows, false);
            observableOptions['exclude-ghosts'] = this.excludeGhostsAndShadows;
            observableOptions['exclude-shadows'] = this.excludeGhostsAndShadows;
            observableOptions.locale = this.locale;
            this.cacheClearToolbarAction = new containers_2.CacheClearToolbarAction(webspace);
            this.listStore = new containers_1.ListStore(PAGES_RESOURCE_KEY, PAGES_RESOURCE_KEY, getUserSettingsKeyForWebspace(webspace), observableOptions, requestParameters);
            router.bind('active', this.listStore.active);
            containers_1.formMetadataStore.getSchemaTypes('page', { webspace, onlyKeys: true }).then((0, mobx_1.action)((schemaTypes) => {
                this.availablePageTypes = Object.keys(schemaTypes.types);
                this.availablePageTypesLoading = false;
            }));
            this.excludeGhostsAndShadowsDisposer = (0, mobx_1.intercept)(this.excludeGhostsAndShadows, '', (change) => {
                this.listStore.clear();
                return change;
            });
            this.webspaceKeyDisposer = (0, mobx_1.intercept)(webspaceKey, '', (change) => {
                this.listStore.destroy();
                this.listStore.active.set(undefined);
                return change;
            });
        }
        componentWillUnmount() {
            this.webspaceKeyDisposer();
            this.listStore.destroy();
            this.excludeGhostsAndShadowsDisposer();
        }
        render() {
            const { getIndicators } = this;
            return (<div className={pageList_scss_1.default.pageList}>
                {this.availablePageTypesLoading
                    ? <components_1.Loader />
                    : <containers_1.List adapterOptions={{
                            column_list: {
                                display_root_level_toolbar: false,
                                get_indicators: getIndicators,
                            },
                        }} adapters={['column_list', 'tree_table']} onCopyFinished={this.handleCopyFinished} onDeleteError={this.handleDeleteError} onItemAdd={this.handleItemAdd} onItemClick={this.handleEditClick} searchable={false} selectable={false} store={this.listStore} toolbarClassName={pageList_scss_1.default.listToolbar}/>}
                {this.cacheClearToolbarAction.getNode()}
            </div>);
        }
    };
    __setFunctionName(_classThis, "PageList");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _availablePageTypes_decorators = [mobx_1.observable];
        _availablePageTypesLoading_decorators = [mobx_1.observable];
        _errors_decorators = [mobx_1.observable];
        _redirectToWebspaceLocale_decorators = [mobx_1.action];
        _handleDeleteError_decorators = [mobx_1.action];
        __esDecorate(null, null, _availablePageTypes_decorators, { kind: "field", name: "availablePageTypes", static: false, private: false, access: { has: obj => "availablePageTypes" in obj, get: obj => obj.availablePageTypes, set: (obj, value) => { obj.availablePageTypes = value; } }, metadata: _metadata }, _availablePageTypes_initializers, _availablePageTypes_extraInitializers);
        __esDecorate(null, null, _availablePageTypesLoading_decorators, { kind: "field", name: "availablePageTypesLoading", static: false, private: false, access: { has: obj => "availablePageTypesLoading" in obj, get: obj => obj.availablePageTypesLoading, set: (obj, value) => { obj.availablePageTypesLoading = value; } }, metadata: _metadata }, _availablePageTypesLoading_initializers, _availablePageTypesLoading_extraInitializers);
        __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
        __esDecorate(null, null, _redirectToWebspaceLocale_decorators, { kind: "field", name: "redirectToWebspaceLocale", static: false, private: false, access: { has: obj => "redirectToWebspaceLocale" in obj, get: obj => obj.redirectToWebspaceLocale, set: (obj, value) => { obj.redirectToWebspaceLocale = value; } }, metadata: _metadata }, _redirectToWebspaceLocale_initializers, _redirectToWebspaceLocale_extraInitializers);
        __esDecorate(null, null, _handleDeleteError_decorators, { kind: "field", name: "handleDeleteError", static: false, private: false, access: { has: obj => "handleDeleteError" in obj, get: obj => obj.handleDeleteError, set: (obj, value) => { obj.handleDeleteError = value; } }, metadata: _metadata }, _handleDeleteError_initializers, _handleDeleteError_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PageList = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PageList = _classThis;
})();
const PageListWithToolbar = (0, containers_1.withToolbar)(PageList, function () {
    const { webspace } = this.props;
    if (!webspace) {
        return {};
    }
    return {
        errors: this.errors,
        items: [
            {
                label: (0, utils_1.translate)('sulu_page.show_ghost_and_shadow'),
                onClick: (0, mobx_1.action)(() => {
                    this.excludeGhostsAndShadows.set(!this.excludeGhostsAndShadows.get());
                }),
                type: 'toggler',
                value: !this.excludeGhostsAndShadows.get(),
            },
            this.cacheClearToolbarAction.getToolbarItemConfig(),
        ],
        locale: {
            value: this.locale.get(),
            onChange: (0, mobx_1.action)((locale) => {
                this.locale.set(locale);
            }),
            options: webspace.allLocalizations.map((localization) => ({
                value: localization.localization,
                label: localization.name,
            })),
        },
    };
});
exports.default = PageListWithToolbar;
