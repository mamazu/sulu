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
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const loglevel_1 = __importDefault(require("loglevel"));
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const PublishIndicator_1 = __importDefault(require("../../components/PublishIndicator"));
const Form_1 = __importStar(require("../../containers/Form"));
const Toolbar_1 = require("../../containers/Toolbar");
const ResourceStore_1 = __importDefault(require("../../stores/ResourceStore"));
const CollaborationStore_1 = __importDefault(require("../../stores/CollaborationStore"));
const Translator_1 = require("../../utils/Translator");
const formToolbarActionRegistry_1 = __importDefault(require("./registries/formToolbarActionRegistry"));
const form_scss_1 = __importDefault(require("./form.scss"));
const FORM_STORE_UPDATE_ROUTE_HOOK_PRIORITY = 2048;
const HAS_CHANGED_ERROR_CODE = 1102;
let Form = (() => {
    var _a;
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _toolbarActions_decorators;
    let _toolbarActions_initializers = [];
    let _toolbarActions_extraInitializers = [];
    let _showDirtyWarning_decorators;
    let _showDirtyWarning_initializers = [];
    let _showDirtyWarning_extraInitializers = [];
    let _showHasChangedWarning_decorators;
    let _showHasChangedWarning_initializers = [];
    let _showHasChangedWarning_extraInitializers = [];
    let _get_hasOwnResourceStore_decorators;
    let _get_locales_decorators;
    let _get_id_decorators;
    let _get_resourceKey_decorators;
    let _get_formKey_decorators;
    let _get_formStoreOptions_decorators;
    let _get_metadataOptions_decorators;
    let _checkFormStoreDirtyStateBeforeNavigation_decorators;
    let _checkFormStoreDirtyStateBeforeNavigation_initializers = [];
    let _checkFormStoreDirtyStateBeforeNavigation_extraInitializers = [];
    let _componentDidMount_decorators;
    let _showSuccessSnackbar_decorators;
    let _showSuccessSnackbar_initializers = [];
    let _showSuccessSnackbar_extraInitializers = [];
    let _submit_decorators;
    let _submit_initializers = [];
    let _submit_extraInitializers = [];
    let _clearErrors_decorators;
    let _clearErrors_initializers = [];
    let _clearErrors_extraInitializers = [];
    let _handleDirtyWarningCancelClick_decorators;
    let _handleDirtyWarningCancelClick_initializers = [];
    let _handleDirtyWarningCancelClick_extraInitializers = [];
    let _handleDirtyWarningConfirmClick_decorators;
    let _handleDirtyWarningConfirmClick_initializers = [];
    let _handleDirtyWarningConfirmClick_extraInitializers = [];
    let _handleHasChangedWarningCancelClick_decorators;
    let _handleHasChangedWarningCancelClick_initializers = [];
    let _handleHasChangedWarningCancelClick_extraInitializers = [];
    let _handleHasChangedWarningConfirmClick_decorators;
    let _handleHasChangedWarningConfirmClick_initializers = [];
    let _handleHasChangedWarningConfirmClick_extraInitializers = [];
    var Form = _classThis = class extends _classSuper {
        get hasOwnResourceStore() {
            const { resourceStore } = this.props;
            return this.resourceKey && resourceStore.resourceKey !== this.resourceKey;
        }
        get locales() {
            const { locales: propsLocales, route: { options: { locales: routeLocales, }, }, } = this.props;
            return routeLocales ? routeLocales : propsLocales;
        }
        get id() {
            const { router: { attributes: { id, }, }, } = this.props;
            if (id !== undefined && typeof id !== 'string' && typeof id !== 'number') {
                throw new Error('The "id" router attribute must be a string or a number if given!');
            }
            return id;
        }
        get resourceKey() {
            const { route: { options: { resourceKey, }, }, } = this.props;
            return resourceKey;
        }
        get formKey() {
            const { route: { options: { formKey, }, }, } = this.props;
            if (!formKey) {
                throw new Error('The route does not define the mandatory "formKey" option');
            }
            return formKey;
        }
        get formStoreOptions() {
            const { attributes, route: { options: { requestParameters = {}, routerAttributesToFormRequest = {}, }, }, } = this.props.router;
            const formStoreOptions = requestParameters ? requestParameters : {};
            Object.keys((0, mobx_1.toJS)(routerAttributesToFormRequest)).forEach((key) => {
                const formOptionKey = routerAttributesToFormRequest[key];
                const attributeName = isNaN(key) ? key : (0, mobx_1.toJS)(routerAttributesToFormRequest[key]);
                formStoreOptions[formOptionKey] = attributes[attributeName];
            });
            return formStoreOptions;
        }
        get metadataOptions() {
            const { attributes, route: { options: { routerAttributesToFormMetadata = {}, metadataRequestParameters = {}, }, }, } = this.props.router;
            const metadataOptions = Object.assign({}, metadataRequestParameters);
            Object.keys((0, mobx_1.toJS)(routerAttributesToFormMetadata)).forEach((key) => {
                const listOptionKey = routerAttributesToFormMetadata[key];
                const attributeName = isNaN(key) ? key : (0, mobx_1.toJS)(routerAttributesToFormMetadata[key]);
                metadataOptions[listOptionKey] = attributes[attributeName];
            });
            return metadataOptions;
        }
        constructor(props) {
            super(props);
            this.resourceStore = __runInitializers(this, _instanceExtraInitializers);
            this.errors = __runInitializers(this, _errors_initializers, []);
            this.showSuccess = (__runInitializers(this, _errors_extraInitializers), mobx_1.observable.box(false));
            this.toolbarActions = __runInitializers(this, _toolbarActions_initializers, []);
            this.showDirtyWarning = (__runInitializers(this, _toolbarActions_extraInitializers), __runInitializers(this, _showDirtyWarning_initializers, false));
            this.showHasChangedWarning = (__runInitializers(this, _showDirtyWarning_extraInitializers), __runInitializers(this, _showHasChangedWarning_initializers, false));
            this.postponedSaveOptions = __runInitializers(this, _showHasChangedWarning_extraInitializers);
            this.createResourceFormStore = () => {
                const { resourceStore, router } = this.props;
                const { route: { options: { idQueryParameter, }, }, } = router;
                if (!resourceStore) {
                    throw new Error('The view "Form" needs a resourceStore to work properly.'
                        + 'Did you maybe forget to make this view a child of a "ResourceTabs" view?');
                }
                if (this.hasOwnResourceStore) {
                    let locale = resourceStore.locale;
                    if (!locale && this.locales) {
                        locale = mobx_1.observable.box();
                    }
                    if (idQueryParameter) {
                        this.resourceStore = new ResourceStore_1.default(this.resourceKey, this.id, { locale }, this.formStoreOptions, idQueryParameter);
                    }
                    else {
                        this.resourceStore = new ResourceStore_1.default(this.resourceKey, this.id, { locale }, this.formStoreOptions);
                    }
                }
                else {
                    this.resourceStore = resourceStore;
                }
                this.resourceFormStore = Form_1.resourceFormStoreFactory.createFromResourceStore(this.resourceStore, this.formKey, this.formStoreOptions, this.metadataOptions);
                if (this.resourceStore.locale) {
                    router.bind('locale', this.resourceStore.locale);
                }
            };
            this.createCollaborationStore = () => {
                if (this.resourceKey && this.id) {
                    this.collaborationStore = new CollaborationStore_1.default(this.resourceKey, this.id);
                }
            };
            this.checkFormStoreDirtyStateBeforeNavigation = __runInitializers(this, _checkFormStoreDirtyStateBeforeNavigation_initializers, (route, attributes, updateRouteMethod) => {
                if (!this.resourceFormStore.dirty) {
                    return true;
                }
                const { route: viewRoute, router } = this.props;
                if (router.route !== viewRoute) {
                    // If the route of this view does not match the currently active route anymore, then another view has
                    // already been loaded, and the warning does not need to be shown anymore. This happens e.g. when this view
                    // navigates to a Tab view, which will in turn do a redirect.
                    return true;
                }
                if (this.showDirtyWarning === true
                    && this.postponedRoute === route
                    && (0, fast_deep_equal_1.default)(this.postponedRouteAttributes, attributes)
                    && this.postponedUpdateRouteMethod === updateRouteMethod) {
                    // If the warning has already been displayed for the exact same route and attributes we can assume that the
                    // confirm button in the warning has been clicked, since it calls the same routing action again.
                    return true;
                }
                if (!route && !attributes && !updateRouteMethod) {
                    // If none of these attributes are set the call comes because the user wants to close the window
                    return false;
                }
                this.showDirtyWarning = true;
                this.postponedUpdateRouteMethod = updateRouteMethod;
                this.postponedRoute = route;
                this.postponedRouteAttributes = attributes;
                return false;
            });
            this.showSuccessSnackbar = (__runInitializers(this, _checkFormStoreDirtyStateBeforeNavigation_extraInitializers), __runInitializers(this, _showSuccessSnackbar_initializers, () => {
                this.showSuccess.set(true);
            }));
            this.submit = (__runInitializers(this, _showSuccessSnackbar_extraInitializers), __runInitializers(this, _submit_initializers, (options) => {
                if (typeof options === 'string') {
                    loglevel_1.default.warn('Passing a string to the "submit" method is deprecated since 2.2 and will be removed. ' +
                        'Pass an object with an "action" property instead.');
                }
                if (!this.form) {
                    throw new Error('The form ref has not been set! This should not happen and is likely a bug.');
                }
                this.form.submit(options);
            }));
            this.handleSubmit = (__runInitializers(this, _submit_extraInitializers), (options) => {
                if (typeof options === 'string') {
                    loglevel_1.default.warn('Passing a string to the "submit" method is deprecated since 2.2 and will be removed. ' +
                        'Pass an object with an "action" property instead.');
                    options = { action: options };
                }
                return this.save(options);
            });
            this.handleSuccess = () => {
                this.showSuccessSnackbar();
            };
            this.save = (options) => {
                const { resourceStore, router } = this.props;
                const { attributes, route: { options: { editView, routerAttributesToEditView, }, }, } = router;
                if (editView) {
                    resourceStore.destroy();
                }
                const saveOptions = Object.assign({}, options);
                const editViewParameters = {};
                if (routerAttributesToEditView) {
                    Object.keys((0, mobx_1.toJS)(routerAttributesToEditView)).forEach((key) => {
                        const formOptionKey = routerAttributesToEditView[key];
                        const attributeName = isNaN(key) ? key : routerAttributesToEditView[key];
                        editViewParameters[formOptionKey] = attributes[attributeName];
                    });
                }
                return this.resourceFormStore.save(saveOptions)
                    .then((response) => {
                    this.showSuccessSnackbar();
                    this.clearErrors();
                    if (editView) {
                        router.navigate(editView, Object.assign({ id: resourceStore.id, locale: resourceStore.locale }, editViewParameters));
                    }
                    return response;
                })
                    .catch((0, mobx_1.action)((error) => {
                    if (error.code === HAS_CHANGED_ERROR_CODE) {
                        this.showHasChangedWarning = true;
                        this.postponedSaveOptions = options;
                        return;
                    }
                    this.errors.push(error.detail || error.title || (0, Translator_1.translate)('sulu_admin.form_save_server_error'));
                }));
            };
            this.navigateBack = () => {
                const { router } = this.props;
                const { attributes, route: { options: { backView, routerAttributesToBackView, }, }, } = router;
                if (!backView) {
                    return;
                }
                const backViewParameters = {};
                if (routerAttributesToBackView) {
                    Object.keys((0, mobx_1.toJS)(routerAttributesToBackView)).forEach((key) => {
                        const formOptionKey = routerAttributesToBackView[key];
                        const attributeName = isNaN(key) ? key : routerAttributesToBackView[key];
                        backViewParameters[formOptionKey] = attributes[attributeName];
                    });
                }
                if (this.resourceStore.locale) {
                    backViewParameters.locale = this.resourceStore.locale.get();
                }
                router.restore(backView, backViewParameters);
            };
            this.handleError = () => {
                this.errors.push((0, Translator_1.translate)('sulu_admin.form_contains_invalid_values'));
            };
            this.clearErrors = __runInitializers(this, _clearErrors_initializers, () => {
                this.errors.splice(0, this.errors.length);
            });
            this.handleMissingTypeCancel = (__runInitializers(this, _clearErrors_extraInitializers), () => {
                this.navigateBack();
            });
            this.handleDirtyWarningCancelClick = __runInitializers(this, _handleDirtyWarningCancelClick_initializers, () => {
                this.showDirtyWarning = false;
                this.postponedUpdateRouteMethod = undefined;
                this.postponedRoute = undefined;
                this.postponedRouteAttributes = undefined;
            });
            this.handleDirtyWarningConfirmClick = (__runInitializers(this, _handleDirtyWarningCancelClick_extraInitializers), __runInitializers(this, _handleDirtyWarningConfirmClick_initializers, () => {
                if (!this.postponedUpdateRouteMethod || !this.postponedRoute || !this.postponedRouteAttributes) {
                    throw new Error('Some routing information is missing. This should not happen and is likely a bug.');
                }
                this.postponedUpdateRouteMethod(this.postponedRoute.name, this.postponedRouteAttributes);
                this.postponedUpdateRouteMethod = undefined;
                this.postponedRoute = undefined;
                this.postponedRouteAttributes = undefined;
                this.showDirtyWarning = false;
            }));
            this.handleHasChangedWarningCancelClick = (__runInitializers(this, _handleDirtyWarningConfirmClick_extraInitializers), __runInitializers(this, _handleHasChangedWarningCancelClick_initializers, () => {
                this.showHasChangedWarning = false;
                this.postponedSaveOptions = undefined;
            }));
            this.handleHasChangedWarningConfirmClick = (__runInitializers(this, _handleHasChangedWarningCancelClick_extraInitializers), __runInitializers(this, _handleHasChangedWarningConfirmClick_initializers, () => {
                this.save(Object.assign(Object.assign({}, this.postponedSaveOptions), { force: true }));
                this.showHasChangedWarning = false;
                this.postponedSaveOptions = undefined;
            }));
            this.setFormRef = (__runInitializers(this, _handleHasChangedWarningConfirmClick_extraInitializers), (form) => {
                this.form = form;
            });
            const { router } = this.props;
            this.createResourceFormStore();
            this.createCollaborationStore();
            this.checkFormStoreDirtyStateBeforeNavigationDisposer = router.addUpdateRouteHook(this.checkFormStoreDirtyStateBeforeNavigation, FORM_STORE_UPDATE_ROUTE_HOOK_PRIORITY);
        }
        componentDidMount() {
            const { resourceStore: parentResourceStore, router } = this.props;
            const { route: { options: { toolbarActions: rawToolbarActions, }, }, } = router;
            if (!(0, mobx_1.isArrayLike)(rawToolbarActions)) {
                throw new Error('The view "Form" needs some defined toolbarActions to work properly!');
            }
            const toolbarActions = (0, mobx_1.toJS)(rawToolbarActions);
            toolbarActions.forEach((toolbarAction) => {
                if (typeof toolbarAction !== 'object') {
                    throw new Error('The value of a toolbarAction entry must be an object, but ' + typeof toolbarAction + ' was given!');
                }
            });
            this.toolbarActions = toolbarActions
                .map((toolbarAction) => new (formToolbarActionRegistry_1.default.get(toolbarAction.type))(this.resourceFormStore, this, router, this.locales, toolbarAction.options, parentResourceStore));
        }
        componentDidUpdate(prevProps) {
            if (!(0, fast_deep_equal_1.default)(this.props.locales, prevProps.locales)) {
                this.toolbarActions.forEach((toolbarAction) => {
                    toolbarAction.setLocales(this.locales);
                });
            }
        }
        componentWillUnmount() {
            this.checkFormStoreDirtyStateBeforeNavigationDisposer();
            this.resourceFormStore.destroy();
            if (this.collaborationStore) {
                this.collaborationStore.destroy();
            }
            if (this.hasOwnResourceStore) {
                this.resourceStore.destroy();
            }
            this.toolbarActions.forEach((toolbarAction) => toolbarAction.destroy());
        }
        render() {
            const { route: { options: { titleVisible = false, }, }, router, title, } = this.props;
            return (<div className={form_scss_1.default.form}>
                {titleVisible && title && <h1>{title}</h1>}
                <Form_1.default onError={this.handleError} onMissingTypeCancel={this.handleMissingTypeCancel} onSubmit={this.handleSubmit} onSuccess={this.handleSuccess} ref={this.setFormRef} router={router} store={this.resourceFormStore}/>
                {this.toolbarActions.map((toolbarAction, index) => toolbarAction.getNode(index))}
                <Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmText={(0, Translator_1.translate)('sulu_admin.confirm')} onCancel={this.handleDirtyWarningCancelClick} onConfirm={this.handleDirtyWarningConfirmClick} open={this.showDirtyWarning} title={(0, Translator_1.translate)('sulu_admin.dirty_warning_dialog_title')}>
                    {(0, Translator_1.translate)('sulu_admin.dirty_warning_dialog_text')}
                </Dialog_1.default>
                <Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmText={(0, Translator_1.translate)('sulu_admin.confirm')} onCancel={this.handleHasChangedWarningCancelClick} onConfirm={this.handleHasChangedWarningConfirmClick} open={this.showHasChangedWarning} title={(0, Translator_1.translate)('sulu_admin.has_changed_warning_dialog_title')}>
                    {(0, Translator_1.translate)('sulu_admin.has_changed_warning_dialog_text')}
                </Dialog_1.default>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Form");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _errors_decorators = [mobx_1.observable];
        _toolbarActions_decorators = [mobx_1.observable];
        _showDirtyWarning_decorators = [mobx_1.observable];
        _showHasChangedWarning_decorators = [mobx_1.observable];
        _get_hasOwnResourceStore_decorators = [mobx_1.computed];
        _get_locales_decorators = [(_a = mobx_1.computed).struct.bind(_a)];
        _get_id_decorators = [mobx_1.computed];
        _get_resourceKey_decorators = [mobx_1.computed];
        _get_formKey_decorators = [mobx_1.computed];
        _get_formStoreOptions_decorators = [mobx_1.computed];
        _get_metadataOptions_decorators = [mobx_1.computed];
        _checkFormStoreDirtyStateBeforeNavigation_decorators = [mobx_1.action];
        _componentDidMount_decorators = [mobx_1.action];
        _showSuccessSnackbar_decorators = [mobx_1.action];
        _submit_decorators = [mobx_1.action];
        _clearErrors_decorators = [mobx_1.action];
        _handleDirtyWarningCancelClick_decorators = [mobx_1.action];
        _handleDirtyWarningConfirmClick_decorators = [mobx_1.action];
        _handleHasChangedWarningCancelClick_decorators = [mobx_1.action];
        _handleHasChangedWarningConfirmClick_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_hasOwnResourceStore_decorators, { kind: "getter", name: "hasOwnResourceStore", static: false, private: false, access: { has: obj => "hasOwnResourceStore" in obj, get: obj => obj.hasOwnResourceStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_locales_decorators, { kind: "getter", name: "locales", static: false, private: false, access: { has: obj => "locales" in obj, get: obj => obj.locales }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_formKey_decorators, { kind: "getter", name: "formKey", static: false, private: false, access: { has: obj => "formKey" in obj, get: obj => obj.formKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_formStoreOptions_decorators, { kind: "getter", name: "formStoreOptions", static: false, private: false, access: { has: obj => "formStoreOptions" in obj, get: obj => obj.formStoreOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_metadataOptions_decorators, { kind: "getter", name: "metadataOptions", static: false, private: false, access: { has: obj => "metadataOptions" in obj, get: obj => obj.metadataOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
        __esDecorate(null, null, _toolbarActions_decorators, { kind: "field", name: "toolbarActions", static: false, private: false, access: { has: obj => "toolbarActions" in obj, get: obj => obj.toolbarActions, set: (obj, value) => { obj.toolbarActions = value; } }, metadata: _metadata }, _toolbarActions_initializers, _toolbarActions_extraInitializers);
        __esDecorate(null, null, _showDirtyWarning_decorators, { kind: "field", name: "showDirtyWarning", static: false, private: false, access: { has: obj => "showDirtyWarning" in obj, get: obj => obj.showDirtyWarning, set: (obj, value) => { obj.showDirtyWarning = value; } }, metadata: _metadata }, _showDirtyWarning_initializers, _showDirtyWarning_extraInitializers);
        __esDecorate(null, null, _showHasChangedWarning_decorators, { kind: "field", name: "showHasChangedWarning", static: false, private: false, access: { has: obj => "showHasChangedWarning" in obj, get: obj => obj.showHasChangedWarning, set: (obj, value) => { obj.showHasChangedWarning = value; } }, metadata: _metadata }, _showHasChangedWarning_initializers, _showHasChangedWarning_extraInitializers);
        __esDecorate(null, null, _checkFormStoreDirtyStateBeforeNavigation_decorators, { kind: "field", name: "checkFormStoreDirtyStateBeforeNavigation", static: false, private: false, access: { has: obj => "checkFormStoreDirtyStateBeforeNavigation" in obj, get: obj => obj.checkFormStoreDirtyStateBeforeNavigation, set: (obj, value) => { obj.checkFormStoreDirtyStateBeforeNavigation = value; } }, metadata: _metadata }, _checkFormStoreDirtyStateBeforeNavigation_initializers, _checkFormStoreDirtyStateBeforeNavigation_extraInitializers);
        __esDecorate(null, null, _showSuccessSnackbar_decorators, { kind: "field", name: "showSuccessSnackbar", static: false, private: false, access: { has: obj => "showSuccessSnackbar" in obj, get: obj => obj.showSuccessSnackbar, set: (obj, value) => { obj.showSuccessSnackbar = value; } }, metadata: _metadata }, _showSuccessSnackbar_initializers, _showSuccessSnackbar_extraInitializers);
        __esDecorate(null, null, _submit_decorators, { kind: "field", name: "submit", static: false, private: false, access: { has: obj => "submit" in obj, get: obj => obj.submit, set: (obj, value) => { obj.submit = value; } }, metadata: _metadata }, _submit_initializers, _submit_extraInitializers);
        __esDecorate(null, null, _clearErrors_decorators, { kind: "field", name: "clearErrors", static: false, private: false, access: { has: obj => "clearErrors" in obj, get: obj => obj.clearErrors, set: (obj, value) => { obj.clearErrors = value; } }, metadata: _metadata }, _clearErrors_initializers, _clearErrors_extraInitializers);
        __esDecorate(null, null, _handleDirtyWarningCancelClick_decorators, { kind: "field", name: "handleDirtyWarningCancelClick", static: false, private: false, access: { has: obj => "handleDirtyWarningCancelClick" in obj, get: obj => obj.handleDirtyWarningCancelClick, set: (obj, value) => { obj.handleDirtyWarningCancelClick = value; } }, metadata: _metadata }, _handleDirtyWarningCancelClick_initializers, _handleDirtyWarningCancelClick_extraInitializers);
        __esDecorate(null, null, _handleDirtyWarningConfirmClick_decorators, { kind: "field", name: "handleDirtyWarningConfirmClick", static: false, private: false, access: { has: obj => "handleDirtyWarningConfirmClick" in obj, get: obj => obj.handleDirtyWarningConfirmClick, set: (obj, value) => { obj.handleDirtyWarningConfirmClick = value; } }, metadata: _metadata }, _handleDirtyWarningConfirmClick_initializers, _handleDirtyWarningConfirmClick_extraInitializers);
        __esDecorate(null, null, _handleHasChangedWarningCancelClick_decorators, { kind: "field", name: "handleHasChangedWarningCancelClick", static: false, private: false, access: { has: obj => "handleHasChangedWarningCancelClick" in obj, get: obj => obj.handleHasChangedWarningCancelClick, set: (obj, value) => { obj.handleHasChangedWarningCancelClick = value; } }, metadata: _metadata }, _handleHasChangedWarningCancelClick_initializers, _handleHasChangedWarningCancelClick_extraInitializers);
        __esDecorate(null, null, _handleHasChangedWarningConfirmClick_decorators, { kind: "field", name: "handleHasChangedWarningConfirmClick", static: false, private: false, access: { has: obj => "handleHasChangedWarningConfirmClick" in obj, get: obj => obj.handleHasChangedWarningConfirmClick, set: (obj, value) => { obj.handleHasChangedWarningConfirmClick = value; } }, metadata: _metadata }, _handleHasChangedWarningConfirmClick_initializers, _handleHasChangedWarningConfirmClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Form = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Form = _classThis;
})();
exports.default = (0, Toolbar_1.withToolbar)(Form, function () {
    const { router } = this.props;
    const { route: { options: { backView, }, }, } = router;
    const { errors, resourceStore, showSuccess } = this;
    const backButton = backView
        ? {
            onClick: this.navigateBack,
        }
        : undefined;
    const locale = this.locales
        ? {
            value: resourceStore.locale.get(),
            onChange: (locale) => {
                router.navigate(router.route.name, Object.assign(Object.assign({}, router.attributes), { locale }));
            },
            options: this.locales.map((locale) => ({
                value: locale,
                label: locale,
            })),
        }
        : undefined;
    const items = this.toolbarActions
        .map((toolbarAction) => toolbarAction.getToolbarItemConfig())
        .filter((item) => item != null);
    const icons = [];
    const formData = this.resourceFormStore.data;
    if (formData.hasOwnProperty('publishedState') || formData.hasOwnProperty('published')) {
        const { publishedState, published } = formData;
        icons.push(<PublishIndicator_1.default draft={publishedState === undefined ? false : !publishedState} key="publish" published={published === undefined ? false : !!published}/>);
    }
    const warnings = [];
    if (this.collaborationStore && this.collaborationStore.collaborations.length > 0) {
        warnings.push([
            (0, Translator_1.translate)('sulu_admin.form_used_by'),
            this.collaborationStore.collaborations.map((collaboration) => collaboration.fullName).join(', '),
        ].join(' '));
    }
    return {
        backButton,
        errors,
        locale,
        items,
        icons,
        showSuccess,
        warnings,
    };
});
