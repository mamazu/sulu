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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const jexl_1 = __importDefault(require("jexl"));
const loglevel_1 = __importDefault(require("loglevel"));
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const DeleteDependantResourcesDialog_1 = __importDefault(require("../../../containers/DeleteDependantResourcesDialog"));
const DeleteReferencedResourceDialog_1 = __importDefault(require("../../../containers/DeleteReferencedResourceDialog"));
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let DeleteToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _instanceExtraInitializers = [];
    let _showDialog_decorators;
    let _showDialog_initializers = [];
    let _showDialog_extraInitializers = [];
    let _referencingResourcesData_decorators;
    let _referencingResourcesData_initializers = [];
    let _referencingResourcesData_extraInitializers = [];
    let _dependantResourcesData_decorators;
    let _dependantResourcesData_initializers = [];
    let _dependantResourcesData_extraInitializers = [];
    let _get_allowConflictDeletion_decorators;
    let _handleDeleteReferencedResourcesDialogConfirm_decorators;
    let _handleDeleteReferencedResourcesDialogConfirm_initializers = [];
    let _handleDeleteReferencedResourcesDialogConfirm_extraInitializers = [];
    let _closeDeleteReferencedResourceDialog_decorators;
    let _closeDeleteReferencedResourceDialog_initializers = [];
    let _closeDeleteReferencedResourceDialog_extraInitializers = [];
    let _closeDeleteDependantResourcesDialog_decorators;
    let _closeDeleteDependantResourcesDialog_initializers = [];
    let _closeDeleteDependantResourcesDialog_extraInitializers = [];
    let _get_deleteDependantResourcesDialogRequestOptions_decorators;
    let _closeDialog_decorators;
    let _closeDialog_initializers = [];
    let _closeDialog_extraInitializers = [];
    let _delete_decorators;
    let _delete_initializers = [];
    let _delete_extraInitializers = [];
    return _a = class DeleteToolbarAction extends _classSuper {
            get allowConflictDeletion() {
                const { allow_conflict_deletion: allowConflictDeletion = true } = this.options;
                return !!allowConflictDeletion;
            }
            constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
                const { display_condition: displayCondition, visible_condition: visibleCondition, delete_locale: deleteLocale = false, } = options;
                if (displayCondition) {
                    // @deprecated
                    loglevel_1.default.warn('The "display_condition" option is deprecated since version 2.0 and will be removed. ' +
                        'Use the "visible_condition" option instead.');
                    if (!visibleCondition) {
                        options.visible_condition = displayCondition;
                    }
                }
                if (typeof deleteLocale !== 'boolean') {
                    throw new Error('The "delete_locale" option must be a boolean, but received ' + typeof deleteLocale + '!');
                }
                super(resourceFormStore, form, router, locales, options, parentResourceStore);
                this.showDialog = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _showDialog_initializers, false));
                this.referencingResourcesData = (__runInitializers(this, _showDialog_extraInitializers), __runInitializers(this, _referencingResourcesData_initializers, undefined));
                this.dependantResourcesData = (__runInitializers(this, _referencingResourcesData_extraInitializers), __runInitializers(this, _dependantResourcesData_initializers, undefined));
                this.handleDeleteReferencedResourcesDialogCancel = (__runInitializers(this, _dependantResourcesData_extraInitializers), () => {
                    this.closeDeleteReferencedResourceDialog();
                });
                this.handleDeleteReferencedResourcesDialogConfirm = __runInitializers(this, _handleDeleteReferencedResourcesDialogConfirm_initializers, () => {
                    this.delete(true);
                });
                this.closeDeleteReferencedResourceDialog = (__runInitializers(this, _handleDeleteReferencedResourcesDialogConfirm_extraInitializers), __runInitializers(this, _closeDeleteReferencedResourceDialog_initializers, () => {
                    this.referencingResourcesData = undefined;
                }));
                this.handleDeleteDependantResourcesDialogFinish = (__runInitializers(this, _closeDeleteReferencedResourceDialog_extraInitializers), () => {
                    this.delete();
                });
                this.handleDeleteDependantResourcesDialogCancel = () => {
                    this.closeDeleteDependantResourcesDialog();
                };
                this.closeDeleteDependantResourcesDialog = __runInitializers(this, _closeDeleteDependantResourcesDialog_initializers, () => {
                    this.dependantResourcesData = undefined;
                });
                this.handleDialogCancel = (__runInitializers(this, _closeDeleteDependantResourcesDialog_extraInitializers), () => {
                    this.closeDialog();
                });
                this.handleDialogConfirm = () => {
                    this.delete();
                };
                this.closeDialog = __runInitializers(this, _closeDialog_initializers, () => {
                    this.showDialog = false;
                });
                this.navigateBack = (__runInitializers(this, _closeDialog_extraInitializers), () => {
                    const { attributes, route } = this.router;
                    const { backView } = route.options;
                    const { locale } = this.resourceFormStore;
                    const { router_attributes_to_back_view: routerAttributesToBackView, } = this.options;
                    const backViewAttributes = { locale: locale ? locale.get() : undefined };
                    if (routerAttributesToBackView) {
                        if (typeof routerAttributesToBackView !== 'object') {
                            throw new Error('The "router_attributes_to_back_view" option must be an object!');
                        }
                        Object.keys(routerAttributesToBackView).forEach((key) => {
                            const attributeKey = routerAttributesToBackView[key];
                            const attributeName = isNaN(key) ? key : routerAttributesToBackView[key];
                            if (typeof attributeKey !== 'string' || typeof attributeName !== 'string') {
                                throw new Error('The value of the "router_attributes_to_back_view" option must be a string!');
                            }
                            backViewAttributes[attributeKey] = attributes[attributeName];
                        });
                    }
                    this.router.restore(backView, backViewAttributes);
                });
                this.delete = __runInitializers(this, _delete_initializers, (force = false) => {
                    const { delete_locale: deleteLocale = false } = this.options;
                    const options = { deleteLocale };
                    if (force) {
                        options.force = true;
                    }
                    return this.resourceFormStore.delete(options)
                        .then(() => {
                        this.closeDialog();
                        this.closeDeleteDependantResourcesDialog();
                        this.closeDeleteReferencedResourceDialog();
                        this.navigateBack();
                    })
                        .catch((0, mobx_1.action)((response) => {
                        response.json().then((0, mobx_1.action)((data) => {
                            this.closeDialog();
                            this.closeDeleteDependantResourcesDialog();
                            this.closeDeleteReferencedResourceDialog();
                            if (response.status === 409 && data.code === constants_1.ERROR_CODE_DEPENDANT_RESOURCES_FOUND) {
                                this.dependantResourcesData = {
                                    dependantResourceBatches: data.dependantResourceBatches,
                                    dependantResourcesCount: data.dependantResourcesCount,
                                    detail: data.detail,
                                    title: data.title,
                                };
                                return;
                            }
                            if (response.status === 409 && data.code === constants_1.ERROR_CODE_REFERENCING_RESOURCES_FOUND) {
                                this.referencingResourcesData = {
                                    resource: data.resource,
                                    referencingResources: data.referencingResources,
                                    referencingResourcesCount: data.referencingResourcesCount,
                                };
                                return;
                            }
                            const error = data.detail || data.title || (0, utils_1.translate)('sulu_admin.unexpected_delete_server_error');
                            if (error) {
                                this.form.errors.push(error);
                            }
                        }));
                    }));
                });
                __runInitializers(this, _delete_extraInitializers);
            }
            renderDeleteReferencedResourceDialog() {
                if (!this.referencingResourcesData) {
                    return null;
                }
                return (<DeleteReferencedResourceDialog_1.default allowDeletion={this.allowConflictDeletion} confirmLoading={this.resourceFormStore.deleting} onCancel={this.handleDeleteReferencedResourcesDialogCancel} onConfirm={this.handleDeleteReferencedResourcesDialogConfirm} referencingResourcesData={this.referencingResourcesData}/>);
            }
            get deleteDependantResourcesDialogRequestOptions() {
                const { locale, options: resourceFormStoreOptions = {} } = this.resourceFormStore;
                const options = resourceFormStoreOptions;
                if (locale) {
                    options.locale = locale.get();
                }
                return options;
            }
            renderDeleteDependantResourcesDialog() {
                if (!this.dependantResourcesData) {
                    return null;
                }
                return (<DeleteDependantResourcesDialog_1.default dependantResourcesData={this.dependantResourcesData} onCancel={this.handleDeleteDependantResourcesDialogCancel} onFinish={this.handleDeleteDependantResourcesDialogFinish} requestOptions={this.deleteDependantResourcesDialogRequestOptions}/>);
            }
            renderDialog(postfix) {
                return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.resourceFormStore.deleting} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleDialogCancel} onConfirm={this.handleDialogConfirm} open={this.showDialog} title={(0, utils_1.translate)('sulu_admin.delete' + postfix + '_warning_title')}>
                {(0, utils_1.translate)('sulu_admin.delete' + postfix + '_warning_text')}
            </Dialog_1.default>);
            }
            getNode() {
                const { delete_locale: deleteLocale = false } = this.options;
                const postfix = deleteLocale ? '_locale' : '';
                return (<react_1.Fragment key={'sulu_admin.delete' + postfix}>
                {this.renderDialog(postfix)}
                {this.renderDeleteReferencedResourceDialog()}
                {this.renderDeleteDependantResourcesDialog()}
            </react_1.Fragment>);
            }
            getToolbarItemConfig() {
                const { visible_condition: visibleCondition, delete_locale: deleteLocale = false, } = this.options;
                const { id } = this.resourceFormStore;
                const visibleConditionFulfilled = !visibleCondition || jexl_1.default.evalSync(visibleCondition, this.conditionData);
                const isDisabled = !id || (deleteLocale && jexl_1.default.evalSync('contentLocales && contentLocales|length == 1', this.conditionData));
                if (visibleConditionFulfilled) {
                    return {
                        disabled: !!isDisabled,
                        icon: 'su-trash-alt',
                        label: (0, utils_1.translate)('sulu_admin.delete' + (deleteLocale ? '_locale' : '')),
                        onClick: (0, mobx_1.action)(() => {
                            this.showDialog = true;
                        }),
                        type: 'button',
                    };
                }
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showDialog_decorators = [mobx_1.observable];
            _referencingResourcesData_decorators = [mobx_1.observable];
            _dependantResourcesData_decorators = [mobx_1.observable];
            _get_allowConflictDeletion_decorators = [mobx_1.computed];
            _handleDeleteReferencedResourcesDialogConfirm_decorators = [mobx_1.action];
            _closeDeleteReferencedResourceDialog_decorators = [mobx_1.action];
            _closeDeleteDependantResourcesDialog_decorators = [mobx_1.action];
            _get_deleteDependantResourcesDialogRequestOptions_decorators = [mobx_1.computed];
            _closeDialog_decorators = [mobx_1.action];
            _delete_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_allowConflictDeletion_decorators, { kind: "getter", name: "allowConflictDeletion", static: false, private: false, access: { has: obj => "allowConflictDeletion" in obj, get: obj => obj.allowConflictDeletion }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_deleteDependantResourcesDialogRequestOptions_decorators, { kind: "getter", name: "deleteDependantResourcesDialogRequestOptions", static: false, private: false, access: { has: obj => "deleteDependantResourcesDialogRequestOptions" in obj, get: obj => obj.deleteDependantResourcesDialogRequestOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _showDialog_decorators, { kind: "field", name: "showDialog", static: false, private: false, access: { has: obj => "showDialog" in obj, get: obj => obj.showDialog, set: (obj, value) => { obj.showDialog = value; } }, metadata: _metadata }, _showDialog_initializers, _showDialog_extraInitializers);
            __esDecorate(null, null, _referencingResourcesData_decorators, { kind: "field", name: "referencingResourcesData", static: false, private: false, access: { has: obj => "referencingResourcesData" in obj, get: obj => obj.referencingResourcesData, set: (obj, value) => { obj.referencingResourcesData = value; } }, metadata: _metadata }, _referencingResourcesData_initializers, _referencingResourcesData_extraInitializers);
            __esDecorate(null, null, _dependantResourcesData_decorators, { kind: "field", name: "dependantResourcesData", static: false, private: false, access: { has: obj => "dependantResourcesData" in obj, get: obj => obj.dependantResourcesData, set: (obj, value) => { obj.dependantResourcesData = value; } }, metadata: _metadata }, _dependantResourcesData_initializers, _dependantResourcesData_extraInitializers);
            __esDecorate(null, null, _handleDeleteReferencedResourcesDialogConfirm_decorators, { kind: "field", name: "handleDeleteReferencedResourcesDialogConfirm", static: false, private: false, access: { has: obj => "handleDeleteReferencedResourcesDialogConfirm" in obj, get: obj => obj.handleDeleteReferencedResourcesDialogConfirm, set: (obj, value) => { obj.handleDeleteReferencedResourcesDialogConfirm = value; } }, metadata: _metadata }, _handleDeleteReferencedResourcesDialogConfirm_initializers, _handleDeleteReferencedResourcesDialogConfirm_extraInitializers);
            __esDecorate(null, null, _closeDeleteReferencedResourceDialog_decorators, { kind: "field", name: "closeDeleteReferencedResourceDialog", static: false, private: false, access: { has: obj => "closeDeleteReferencedResourceDialog" in obj, get: obj => obj.closeDeleteReferencedResourceDialog, set: (obj, value) => { obj.closeDeleteReferencedResourceDialog = value; } }, metadata: _metadata }, _closeDeleteReferencedResourceDialog_initializers, _closeDeleteReferencedResourceDialog_extraInitializers);
            __esDecorate(null, null, _closeDeleteDependantResourcesDialog_decorators, { kind: "field", name: "closeDeleteDependantResourcesDialog", static: false, private: false, access: { has: obj => "closeDeleteDependantResourcesDialog" in obj, get: obj => obj.closeDeleteDependantResourcesDialog, set: (obj, value) => { obj.closeDeleteDependantResourcesDialog = value; } }, metadata: _metadata }, _closeDeleteDependantResourcesDialog_initializers, _closeDeleteDependantResourcesDialog_extraInitializers);
            __esDecorate(null, null, _closeDialog_decorators, { kind: "field", name: "closeDialog", static: false, private: false, access: { has: obj => "closeDialog" in obj, get: obj => obj.closeDialog, set: (obj, value) => { obj.closeDialog = value; } }, metadata: _metadata }, _closeDialog_initializers, _closeDialog_extraInitializers);
            __esDecorate(null, null, _delete_decorators, { kind: "field", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete, set: (obj, value) => { obj.delete = value; } }, metadata: _metadata }, _delete_initializers, _delete_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = DeleteToolbarAction;
