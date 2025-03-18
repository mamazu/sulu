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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const react_1 = __importStar(require("react"));
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const classnames_1 = __importDefault(require("classnames"));
const jexl_1 = __importDefault(require("jexl"));
const ArrowMenu_1 = __importDefault(require("../../components/ArrowMenu"));
const Button_1 = __importDefault(require("../../components/Button"));
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const PermissionHint_1 = __importDefault(require("../../components/PermissionHint"));
const userStore_1 = __importDefault(require("../../stores/userStore"));
const SingleListOverlay_1 = __importDefault(require("../SingleListOverlay"));
const utils_1 = require("../../utils");
const DeleteReferencedResourceDialog_1 = __importDefault(require("../DeleteReferencedResourceDialog"));
const DeleteDependantResourcesDialog_1 = __importDefault(require("../DeleteDependantResourcesDialog"));
const constants_1 = require("../../constants");
const listAdapterRegistry_1 = __importDefault(require("./registries/listAdapterRegistry"));
const AdapterSwitch_1 = __importDefault(require("./AdapterSwitch"));
const Search_1 = __importDefault(require("./Search"));
const list_scss_1 = __importDefault(require("./list.scss"));
const ColumnOptionsOverlay_1 = __importDefault(require("./ColumnOptionsOverlay"));
const FieldFilter_1 = __importDefault(require("./FieldFilter"));
const USER_SETTING_PREFIX = 'sulu_admin.list';
const USER_SETTING_ADAPTER = 'adapter';
let List = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _currentAdapterKey_decorators;
    let _currentAdapterKey_initializers = [];
    let _currentAdapterKey_extraInitializers = [];
    let _showCopyOverlay_decorators;
    let _showCopyOverlay_initializers = [];
    let _showCopyOverlay_extraInitializers = [];
    let _showDeleteDialog_decorators;
    let _showDeleteDialog_initializers = [];
    let _showDeleteDialog_extraInitializers = [];
    let _showMoveOverlay_decorators;
    let _showMoveOverlay_initializers = [];
    let _showMoveOverlay_extraInitializers = [];
    let _showDeleteSelectionDialog_decorators;
    let _showDeleteSelectionDialog_initializers = [];
    let _showDeleteSelectionDialog_extraInitializers = [];
    let _allowConflictDeletion_decorators;
    let _allowConflictDeletion_initializers = [];
    let _allowConflictDeletion_extraInitializers = [];
    let _showOrderDialog_decorators;
    let _showOrderDialog_initializers = [];
    let _showOrderDialog_extraInitializers = [];
    let _adapterOptionsOpen_decorators;
    let _adapterOptionsOpen_initializers = [];
    let _adapterOptionsOpen_extraInitializers = [];
    let _columnOptionsOpen_decorators;
    let _columnOptionsOpen_initializers = [];
    let _columnOptionsOpen_extraInitializers = [];
    let _referencingResourcesData_decorators;
    let _referencingResourcesData_initializers = [];
    let _referencingResourcesData_extraInitializers = [];
    let _dependantResourcesData_decorators;
    let _dependantResourcesData_initializers = [];
    let _dependantResourcesData_extraInitializers = [];
    let _movingRestrictedTarget_decorators;
    let _movingRestrictedTarget_initializers = [];
    let _movingRestrictedTarget_extraInitializers = [];
    let _get_currentAdapter_decorators;
    let _get_currentAdapterOptions_decorators;
    let _get_disabledIds_decorators;
    let _get_showColumnOptions_decorators;
    let _setCurrentAdapterKey_decorators;
    let _setCurrentAdapterKey_initializers = [];
    let _setCurrentAdapterKey_extraInitializers = [];
    let _requestSelectionDelete_decorators;
    let _requestSelectionDelete_initializers = [];
    let _requestSelectionDelete_extraInitializers = [];
    let _handleSelectionDeleteDialogConfirmClick_decorators;
    let _handleSelectionDeleteDialogConfirmClick_initializers = [];
    let _handleSelectionDeleteDialogConfirmClick_extraInitializers = [];
    let _handleSelectionDeleteDialogCancelClick_decorators;
    let _handleSelectionDeleteDialogCancelClick_initializers = [];
    let _handleSelectionDeleteDialogCancelClick_extraInitializers = [];
    let _handleRequestItemDelete_decorators;
    let _handleRequestItemDelete_initializers = [];
    let _handleRequestItemDelete_extraInitializers = [];
    let _closeAllDialogs_decorators;
    let _closeAllDialogs_initializers = [];
    let _closeAllDialogs_extraInitializers = [];
    let _handleDeleteResponseError_decorators;
    let _handleDeleteResponseError_initializers = [];
    let _handleDeleteResponseError_extraInitializers = [];
    let _handleDeleteDialogConfirmClick_decorators;
    let _handleDeleteDialogConfirmClick_initializers = [];
    let _handleDeleteDialogConfirmClick_extraInitializers = [];
    let _handleDeleteDialogCancelClick_decorators;
    let _handleDeleteDialogCancelClick_initializers = [];
    let _handleDeleteDialogCancelClick_extraInitializers = [];
    let _handleRequestItemMove_decorators;
    let _handleRequestItemMove_initializers = [];
    let _handleRequestItemMove_extraInitializers = [];
    let _handleMoveOverlayConfirmClick_decorators;
    let _handleMoveOverlayConfirmClick_initializers = [];
    let _handleMoveOverlayConfirmClick_extraInitializers = [];
    let _handleMoveOverlayClose_decorators;
    let _handleMoveOverlayClose_initializers = [];
    let _handleMoveOverlayClose_extraInitializers = [];
    let _handleMovePermissionWarningConfirm_decorators;
    let _handleMovePermissionWarningConfirm_initializers = [];
    let _handleMovePermissionWarningConfirm_extraInitializers = [];
    let _handleMovePermissionWarningCancel_decorators;
    let _handleMovePermissionWarningCancel_initializers = [];
    let _handleMovePermissionWarningCancel_extraInitializers = [];
    let _handleRequestItemCopy_decorators;
    let _handleRequestItemCopy_initializers = [];
    let _handleRequestItemCopy_extraInitializers = [];
    let _handleCopyOverlayConfirmClick_decorators;
    let _handleCopyOverlayConfirmClick_initializers = [];
    let _handleCopyOverlayConfirmClick_extraInitializers = [];
    let _handleCopyOverlayClose_decorators;
    let _handleCopyOverlayClose_initializers = [];
    let _handleCopyOverlayClose_extraInitializers = [];
    let _handleRequestItemOrder_decorators;
    let _handleRequestItemOrder_initializers = [];
    let _handleRequestItemOrder_extraInitializers = [];
    let _handleOrderDialogConfirmClick_decorators;
    let _handleOrderDialogConfirmClick_initializers = [];
    let _handleOrderDialogConfirmClick_extraInitializers = [];
    let _handleOrderDialogCancelClick_decorators;
    let _handleOrderDialogCancelClick_initializers = [];
    let _handleOrderDialogCancelClick_extraInitializers = [];
    let _handleAdapterOptionsButtonClick_decorators;
    let _handleAdapterOptionsButtonClick_initializers = [];
    let _handleAdapterOptionsButtonClick_extraInitializers = [];
    let _handleAdapterOptionsClose_decorators;
    let _handleAdapterOptionsClose_initializers = [];
    let _handleAdapterOptionsClose_extraInitializers = [];
    let _handleColumnOptionsOpen_decorators;
    let _handleColumnOptionsOpen_initializers = [];
    let _handleColumnOptionsOpen_extraInitializers = [];
    let _handleColumnOptionsClose_decorators;
    let _handleColumnOptionsClose_initializers = [];
    let _handleColumnOptionsClose_extraInitializers = [];
    let _handleColumnOptionsChange_decorators;
    let _handleColumnOptionsChange_initializers = [];
    let _handleColumnOptionsChange_extraInitializers = [];
    let _get_deleteDependantResourcesDialogRequestOptions_decorators;
    var List = _classThis = class extends _classSuper {
        static getAdapterSetting(listKey, userSettingsKey) {
            const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_ADAPTER].join('.');
            return userStore_1.default.getPersistentSetting(key);
        }
        static setAdapterSetting(listKey, userSettingsKey, value) {
            const key = [USER_SETTING_PREFIX, listKey, userSettingsKey, USER_SETTING_ADAPTER].join('.');
            userStore_1.default.setPersistentSetting(key, value);
        }
        get currentAdapter() {
            return listAdapterRegistry_1.default.get(this.currentAdapterKey);
        }
        get currentAdapterOptions() {
            return listAdapterRegistry_1.default.getOptions(this.currentAdapterKey);
        }
        get disabledIds() {
            const { disabledIds, itemDisabledCondition, store, } = this.props;
            const disabledItems = itemDisabledCondition
                ? store.visibleItems.filter((item) => jexl_1.default.evalSync(itemDisabledCondition, item))
                : [];
            // TODO do not hardcode "id", but use some kind of metadata instead
            return [...disabledIds, ...disabledItems.map((item) => item.id)];
        }
        get showColumnOptions() {
            return this.currentAdapter.hasColumnOptions && this.props.showColumnOptions;
        }
        constructor(props) {
            super(props);
            this.currentAdapterKey = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _currentAdapterKey_initializers, void 0));
            this.showCopyOverlay = (__runInitializers(this, _currentAdapterKey_extraInitializers), __runInitializers(this, _showCopyOverlay_initializers, false));
            this.showDeleteDialog = (__runInitializers(this, _showCopyOverlay_extraInitializers), __runInitializers(this, _showDeleteDialog_initializers, false));
            this.showMoveOverlay = (__runInitializers(this, _showDeleteDialog_extraInitializers), __runInitializers(this, _showMoveOverlay_initializers, false));
            this.showDeleteSelectionDialog = (__runInitializers(this, _showMoveOverlay_extraInitializers), __runInitializers(this, _showDeleteSelectionDialog_initializers, false));
            this.allowConflictDeletion = (__runInitializers(this, _showDeleteSelectionDialog_extraInitializers), __runInitializers(this, _allowConflictDeletion_initializers, true));
            this.showOrderDialog = (__runInitializers(this, _allowConflictDeletion_extraInitializers), __runInitializers(this, _showOrderDialog_initializers, false));
            this.adapterOptionsOpen = (__runInitializers(this, _showOrderDialog_extraInitializers), __runInitializers(this, _adapterOptionsOpen_initializers, false));
            this.columnOptionsOpen = (__runInitializers(this, _adapterOptionsOpen_extraInitializers), __runInitializers(this, _columnOptionsOpen_initializers, false));
            this.referencingResourcesData = (__runInitializers(this, _columnOptionsOpen_extraInitializers), __runInitializers(this, _referencingResourcesData_initializers, undefined));
            this.dependantResourcesData = (__runInitializers(this, _referencingResourcesData_extraInitializers), __runInitializers(this, _dependantResourcesData_initializers, undefined));
            this.movingRestrictedTarget = (__runInitializers(this, _dependantResourcesData_extraInitializers), __runInitializers(this, _movingRestrictedTarget_initializers, undefined));
            this.resolveCopy = __runInitializers(this, _movingRestrictedTarget_extraInitializers);
            this.setCurrentAdapterKey = __runInitializers(this, _setCurrentAdapterKey_initializers, (adapter) => {
                this.currentAdapterKey = adapter;
                if (!(this.props.store.loadingStrategy instanceof this.currentAdapter.LoadingStrategy)) {
                    this.props.store.updateLoadingStrategy(new this.currentAdapter.LoadingStrategy({
                        paginated: this.currentAdapter.paginatable && this.props.paginated,
                    }));
                }
                if (!(this.props.store.structureStrategy instanceof this.currentAdapter.StructureStrategy)) {
                    this.props.store.updateStructureStrategy(new this.currentAdapter.StructureStrategy());
                }
            });
            /** @public */
            this.requestSelectionDelete = (__runInitializers(this, _setCurrentAdapterKey_extraInitializers), __runInitializers(this, _requestSelectionDelete_initializers, (allowConflictDeletion = true) => {
                this.showDeleteSelectionDialog = true;
                this.allowConflictDeletion = allowConflictDeletion;
            }));
            this.handleSelectionDeleteDialogConfirmClick = (__runInitializers(this, _requestSelectionDelete_extraInitializers), __runInitializers(this, _handleSelectionDeleteDialogConfirmClick_initializers, () => {
                this.props.store.deleteSelection()
                    .then((0, mobx_1.action)(() => {
                    this.showDeleteSelectionDialog = false;
                }))
                    .catch(this.handleDeleteResponseError);
            }));
            this.handleSelectionDeleteDialogCancelClick = (__runInitializers(this, _handleSelectionDeleteDialogConfirmClick_extraInitializers), __runInitializers(this, _handleSelectionDeleteDialogCancelClick_initializers, () => {
                this.showDeleteSelectionDialog = false;
            }));
            this.handleRequestItemDelete = (__runInitializers(this, _handleSelectionDeleteDialogCancelClick_extraInitializers), __runInitializers(this, _handleRequestItemDelete_initializers, (id) => {
                this.showDeleteDialog = true;
                const deletePromise = new Promise((resolve) => this.resolveDelete = resolve);
                deletePromise.then((0, mobx_1.action)((response) => {
                    if (!response.deleted) {
                        this.showDeleteDialog = false;
                        return response;
                    }
                    this.props.store.delete(id)
                        .then((0, mobx_1.action)(() => {
                        this.showDeleteDialog = false;
                    }))
                        .catch(this.handleDeleteResponseError);
                    return response;
                }));
                return deletePromise;
            }));
            this.closeAllDialogs = (__runInitializers(this, _handleRequestItemDelete_extraInitializers), __runInitializers(this, _closeAllDialogs_initializers, () => {
                this.showDeleteDialog = false;
                this.showDeleteSelectionDialog = false;
                this.referencingResourcesData = undefined;
                this.dependantResourcesData = undefined;
            }));
            this.handleDeleteResponseError = (__runInitializers(this, _closeAllDialogs_extraInitializers), __runInitializers(this, _handleDeleteResponseError_initializers, (response) => {
                const { onDeleteError } = this.props;
                response.json().then((0, mobx_1.action)((data) => {
                    this.closeAllDialogs();
                    if (response.status === 409 && data.code === constants_1.ERROR_CODE_REFERENCING_RESOURCES_FOUND) {
                        this.referencingResourcesData = {
                            resource: data.resource,
                            referencingResources: data.referencingResources,
                            referencingResourcesCount: data.referencingResourcesCount,
                        };
                        const promise = new Promise((resolve) => this.resolveDelete = resolve);
                        promise.then((0, mobx_1.action)((response) => {
                            if (!response.deleted) {
                                this.closeAllDialogs();
                                return response;
                            }
                            this.props.store.delete(data.resource.id, { force: true })
                                .then(this.closeAllDialogs)
                                .catch(this.handleDeleteResponseError);
                        }));
                        return;
                    }
                    if (response.status === 409 && data.code === constants_1.ERROR_CODE_DEPENDANT_RESOURCES_FOUND) {
                        this.dependantResourcesData = {
                            dependantResourceBatches: data.dependantResourceBatches,
                            dependantResourcesCount: data.dependantResourcesCount,
                            detail: data.detail,
                            title: data.title,
                        };
                        const promise = new Promise((resolve) => this.resolveDelete = resolve);
                        promise.then((0, mobx_1.action)((response) => {
                            if (!response.deleted) {
                                this.closeAllDialogs();
                                return response;
                            }
                            this.props.store.delete(data.resource.id)
                                .then(this.closeAllDialogs)
                                .catch(this.handleDeleteResponseError);
                        }));
                        return;
                    }
                    if (onDeleteError) {
                        onDeleteError(data);
                    }
                }));
            }));
            this.handleDeleteDialogConfirmClick = (__runInitializers(this, _handleDeleteResponseError_extraInitializers), __runInitializers(this, _handleDeleteDialogConfirmClick_initializers, () => {
                if (!this.resolveDelete) {
                    throw new Error('The resolveDelete function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveDelete({ deleted: true });
            }));
            this.handleDeleteDialogCancelClick = (__runInitializers(this, _handleDeleteDialogConfirmClick_extraInitializers), __runInitializers(this, _handleDeleteDialogCancelClick_initializers, () => {
                if (!this.resolveDelete) {
                    throw new Error('The resolveDelete function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveDelete({ deleted: false });
            }));
            this.handleRequestItemMove = (__runInitializers(this, _handleDeleteDialogCancelClick_extraInitializers), __runInitializers(this, _handleRequestItemMove_initializers, (id) => {
                this.moveId = id;
                this.showMoveOverlay = true;
                const movePromise = new Promise((resolve) => this.resolveMove = resolve);
                movePromise.then((0, mobx_1.action)((response) => {
                    if (!response.moved || !response.parent) {
                        this.showMoveOverlay = false;
                        this.moveId = undefined;
                        return response;
                    }
                    if (!this.moveId) {
                        throw new Error('The moveId is not set. This should not happen and is likely a bug.');
                    }
                    // TODO do not hardcode "id", but use some kind of metadata instead
                    this.props.store.move(this.moveId, response.parent.id).then((0, mobx_1.action)(() => {
                        this.moveId = undefined;
                        this.showMoveOverlay = false;
                    }));
                    return response;
                }));
                return movePromise;
            }));
            this.handleMoveOverlayConfirmClick = (__runInitializers(this, _handleRequestItemMove_extraInitializers), __runInitializers(this, _handleMoveOverlayConfirmClick_initializers, (parent) => {
                if (!this.moveId) {
                    throw new Error('The moveId is not set. This should not happen and is likely a bug.');
                }
                const element = this.props.store.findById(this.moveId);
                if (!element) {
                    throw new Error('The moveId does not refer to an element. This should not happen and is likely a bug.');
                }
                if (!element._hasPermissions && !parent._hasPermissions) {
                    if (!this.resolveMove) {
                        throw new Error('The resolveMove function is not set. This should not happen, and is likely a bug.');
                    }
                    this.resolveMove({ moved: true, parent });
                }
                else {
                    this.movingRestrictedTarget = parent;
                }
            }));
            this.handleMoveOverlayClose = (__runInitializers(this, _handleMoveOverlayConfirmClick_extraInitializers), __runInitializers(this, _handleMoveOverlayClose_initializers, () => {
                if (!this.resolveMove) {
                    throw new Error('The resolveMove function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveMove({ moved: false });
            }));
            this.handleMovePermissionWarningConfirm = (__runInitializers(this, _handleMoveOverlayClose_extraInitializers), __runInitializers(this, _handleMovePermissionWarningConfirm_initializers, () => {
                if (!this.resolveMove) {
                    throw new Error('The resolveMove function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveMove({ moved: true, parent: this.movingRestrictedTarget });
                this.movingRestrictedTarget = undefined;
            }));
            this.handleMovePermissionWarningCancel = (__runInitializers(this, _handleMovePermissionWarningConfirm_extraInitializers), __runInitializers(this, _handleMovePermissionWarningCancel_initializers, () => {
                this.movingRestrictedTarget = undefined;
            }));
            this.handleRequestItemCopy = (__runInitializers(this, _handleMovePermissionWarningCancel_extraInitializers), __runInitializers(this, _handleRequestItemCopy_initializers, (id) => {
                this.showCopyOverlay = true;
                const copyPromise = new Promise((resolve) => this.resolveCopy = resolve);
                copyPromise.then((0, mobx_1.action)((response) => {
                    var _a;
                    if (!response.copied) {
                        this.showCopyOverlay = false;
                        return response;
                    }
                    // TODO do not hardcode "id", but use some kind of metadata instead
                    this.props.store.copy(id, response.parent.id, (_a = this.props) === null || _a === void 0 ? void 0 : _a.onCopyFinished).then((0, mobx_1.action)(() => {
                        this.showCopyOverlay = false;
                    }));
                    return response;
                }));
                return copyPromise;
            }));
            this.handleCopyOverlayConfirmClick = (__runInitializers(this, _handleRequestItemCopy_extraInitializers), __runInitializers(this, _handleCopyOverlayConfirmClick_initializers, (parent) => {
                if (!this.resolveCopy) {
                    throw new Error('The resolveCopy function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveCopy({ copied: true, parent });
            }));
            this.handleCopyOverlayClose = (__runInitializers(this, _handleCopyOverlayConfirmClick_extraInitializers), __runInitializers(this, _handleCopyOverlayClose_initializers, () => {
                if (!this.resolveCopy) {
                    throw new Error('The resolveCopy function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveCopy({ copied: false });
            }));
            this.handleRequestItemOrder = (__runInitializers(this, _handleCopyOverlayClose_extraInitializers), __runInitializers(this, _handleRequestItemOrder_initializers, (id, position) => {
                this.showOrderDialog = true;
                const orderPromise = new Promise((resolve) => this.resolveOrder = resolve);
                orderPromise.then((0, mobx_1.action)((response) => {
                    if (!response.ordered) {
                        this.showOrderDialog = false;
                        return response;
                    }
                    this.props.store.order(id, position).then((0, mobx_1.action)(() => {
                        this.showOrderDialog = false;
                    }));
                    return response;
                }));
                return orderPromise;
            }));
            this.handleOrderDialogConfirmClick = (__runInitializers(this, _handleRequestItemOrder_extraInitializers), __runInitializers(this, _handleOrderDialogConfirmClick_initializers, () => {
                if (!this.resolveOrder) {
                    throw new Error('The resolveOrder function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveOrder({ ordered: true });
            }));
            this.handleOrderDialogCancelClick = (__runInitializers(this, _handleOrderDialogConfirmClick_extraInitializers), __runInitializers(this, _handleOrderDialogCancelClick_initializers, () => {
                if (!this.resolveOrder) {
                    throw new Error('The resolveOrder function is not set. This should not happen, and is likely a bug.');
                }
                this.resolveOrder({ ordered: false });
            }));
            this.handlePageChange = (__runInitializers(this, _handleOrderDialogCancelClick_extraInitializers), (page) => {
                this.props.store.setPage(page);
            });
            this.handleLimitChange = (limit) => {
                this.props.store.setLimit(limit);
            };
            this.handleSort = (column, order) => {
                this.props.store.sort(column, order);
            };
            this.handleSearch = (search) => {
                this.props.store.search(search);
            };
            this.handleFilterChange = (filter) => {
                this.props.store.filter(filter);
            };
            this.handleItemSelectionChange = (id, selected) => {
                const { store } = this.props;
                const row = store.findById(id);
                if (!row) {
                    return;
                }
                selected ? store.select(row) : store.deselect(row);
            };
            this.handleAllSelectionChange = (selected) => {
                const { store } = this.props;
                store.visibleItems.forEach((item) => {
                    // TODO do not hardcode "id", but use some kind of metadata instead
                    if (!this.disabledIds.includes(item.id)) {
                        selected ? store.select(item) : store.deselect(item);
                    }
                });
            };
            this.handleAdapterChange = (adapter) => {
                this.setCurrentAdapterKey(adapter);
            };
            this.handleItemActivate = (id) => {
                const { allowActivateForDisabledItems, store } = this.props;
                if (!allowActivateForDisabledItems && this.disabledIds.includes(id)) {
                    return;
                }
                store.activate(id);
            };
            this.handleItemDeactivate = (id) => {
                this.props.store.deactivate(id);
            };
            this.handleAdapterOptionsButtonClick = __runInitializers(this, _handleAdapterOptionsButtonClick_initializers, () => {
                this.adapterOptionsOpen = !this.adapterOptionsOpen;
            });
            this.handleAdapterOptionsClose = (__runInitializers(this, _handleAdapterOptionsButtonClick_extraInitializers), __runInitializers(this, _handleAdapterOptionsClose_initializers, () => {
                this.adapterOptionsOpen = false;
            }));
            this.handleColumnOptionsOpen = (__runInitializers(this, _handleAdapterOptionsClose_extraInitializers), __runInitializers(this, _handleColumnOptionsOpen_initializers, () => {
                this.columnOptionsOpen = true;
            }));
            this.handleColumnOptionsClose = (__runInitializers(this, _handleColumnOptionsOpen_extraInitializers), __runInitializers(this, _handleColumnOptionsClose_initializers, () => {
                this.columnOptionsOpen = false;
            }));
            this.handleColumnOptionsChange = (__runInitializers(this, _handleColumnOptionsClose_extraInitializers), __runInitializers(this, _handleColumnOptionsChange_initializers, (schema) => {
                this.columnOptionsOpen = false;
                this.props.store.changeUserSchema(schema);
            }));
            __runInitializers(this, _handleColumnOptionsChange_extraInitializers);
            this.validateAdapters();
            const { store } = this.props;
            this.adapterDisposer = (0, mobx_1.intercept)(this, 'currentAdapterKey', (change) => {
                List.setAdapterSetting(store.listKey, store.userSettingsKey, change.newValue);
                return change;
            });
        }
        componentDidUpdate(prevProps) {
            const { adapters, store, paginated } = this.props;
            if (!(0, fast_deep_equal_1.default)(adapters, prevProps.adapters)) {
                this.validateAdapters();
            }
            if (store !== prevProps.store) {
                store.updateLoadingStrategy(new this.currentAdapter.LoadingStrategy({
                    paginated: this.currentAdapter.paginatable && paginated,
                }));
                store.updateStructureStrategy(new this.currentAdapter.StructureStrategy());
            }
        }
        validateAdapters() {
            const { adapters, store } = this.props;
            adapters.forEach((adapterName) => {
                if (!listAdapterRegistry_1.default.has(adapterName)) {
                    throw new Error('ListAdapter with the name "' + adapterName + '" does not exist.' +
                        'Did you forget to add it to the "listAdapterRegistry"?');
                }
            });
            if (!this.currentAdapterKey) {
                const adapterKey = List.getAdapterSetting(store.listKey, store.userSettingsKey);
                this.setCurrentAdapterKey(adapterKey || this.props.adapters[0]);
            }
        }
        renderDeleteReferencedResourceDialog() {
            if (!this.referencingResourcesData) {
                return null;
            }
            const { store } = this.props;
            return (<DeleteReferencedResourceDialog_1.default allowDeletion={this.allowConflictDeletion} confirmLoading={store.deleting} onCancel={this.handleDeleteDialogCancelClick} onConfirm={this.handleDeleteDialogConfirmClick} referencingResourcesData={this.referencingResourcesData}/>);
        }
        get deleteDependantResourcesDialogRequestOptions() {
            const { store } = this.props;
            return store.queryOptions;
        }
        renderDeleteDependantResourcesDialog() {
            if (!this.dependantResourcesData) {
                return null;
            }
            return (<DeleteDependantResourcesDialog_1.default dependantResourcesData={this.dependantResourcesData} onCancel={this.handleDeleteDialogCancelClick} onFinish={this.handleDeleteDialogConfirmClick} requestOptions={this.deleteDependantResourcesDialogRequestOptions}/>);
        }
        render() {
            const { actions, adapters, copyable, deletable, disabled, header, itemActionsProvider, movable, onItemClick, onItemAdd, paginated, orderable, adapterOptions, selectable, store, toolbarClassName, } = this.props;
            const { filterableFields, loading, schemaLoading, userSchema, } = store;
            const Adapter = this.currentAdapter;
            const listClass = (0, classnames_1.default)(list_scss_1.default.list, {
                [list_scss_1.default.disabled]: disabled,
            });
            const toolbarClass = (0, classnames_1.default)(list_scss_1.default.toolbar, toolbarClassName);
            const searchable = this.props.searchable && Adapter.searchable;
            const filterable = this.props.filterable && filterableFields && Object.keys(filterableFields).length > 0;
            const hasToolbar = searchable || filterable || actions.length || this.showColumnOptions || adapters.length > 1;
            if (store.forbidden) {
                return <PermissionHint_1.default />;
            }
            return (<div className={list_scss_1.default.listContainer}>
                {header}
                {!schemaLoading && hasToolbar &&
                    <div className={toolbarClass}>
                        <div className={list_scss_1.default.toolbarLeft}>
                            {searchable &&
                            <Search_1.default onSearch={this.handleSearch} value={store.searchTerm.get()}/>}
                            {filterable &&
                            <FieldFilter_1.default fields={filterableFields || {}} onChange={this.handleFilterChange} value={store.filterOptions.get()}/>}
                        </div>
                        <div className={list_scss_1.default.toolbarRight}>
                            {actions.map((action, index) => {
                            const handleClick = action.onClick;
                            return (<Button_1.default disabled={action.disabled} icon={action.icon} key={index} onClick={handleClick} skin="icon">
                                        {action.label}
                                    </Button_1.default>);
                        })}
                            {this.showColumnOptions &&
                            <react_1.Fragment>
                                    <ArrowMenu_1.default anchorElement={<div>
                                                <Button_1.default icon="su-sort" onClick={this.handleAdapterOptionsButtonClick} showDropdownIcon={true} skin="icon"/>
                                            </div>} onClose={this.handleAdapterOptionsClose} open={this.adapterOptionsOpen}>
                                        <ArrowMenu_1.default.Section>
                                            <ArrowMenu_1.default.Action onClick={this.handleColumnOptionsOpen}>
                                                {(0, utils_1.translate)('sulu_admin.column_options')}
                                            </ArrowMenu_1.default.Action>
                                        </ArrowMenu_1.default.Section>
                                    </ArrowMenu_1.default>
                                    <ColumnOptionsOverlay_1.default onClose={this.handleColumnOptionsClose} onConfirm={this.handleColumnOptionsChange} open={this.columnOptionsOpen} schema={userSchema}/>
                                </react_1.Fragment>}
                            <AdapterSwitch_1.default adapters={adapters} currentAdapter={this.currentAdapterKey} onAdapterChange={this.handleAdapterChange}/>
                        </div>
                    </div>}
                <div className={listClass}>
                    {loading && store.pageCount === 0
                    ? <Loader_1.default className={list_scss_1.default.loader}/>
                    : <Adapter active={store.active.get()} activeItems={store.activeItems} adapterOptions={adapterOptions ? adapterOptions[this.currentAdapterKey] : undefined} data={store.data} disabledIds={this.disabledIds} itemActionsProvider={itemActionsProvider} limit={store.limit.get()} loading={loading} onAllSelectionChange={selectable ? this.handleAllSelectionChange : undefined} onItemActivate={this.handleItemActivate} onItemAdd={onItemAdd} onItemClick={onItemClick} onItemDeactivate={this.handleItemDeactivate} onItemSelectionChange={selectable ? this.handleItemSelectionChange : undefined} onLimitChange={this.handleLimitChange} onPageChange={this.handlePageChange} onRequestItemCopy={copyable ? this.handleRequestItemCopy : undefined} onRequestItemDelete={deletable ? this.handleRequestItemDelete : undefined} onRequestItemMove={movable ? this.handleRequestItemMove : undefined} onRequestItemOrder={orderable ? this.handleRequestItemOrder : undefined} onSort={this.handleSort} options={this.currentAdapterOptions} page={store.getPage()} pageCount={store.pageCount} paginated={paginated} schema={store.userSchema} selections={store.selectionIds} sortColumn={store.sortColumn.get()} sortOrder={store.sortOrder.get()}/>}
                </div>
                <Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={store.deletingSelection} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleSelectionDeleteDialogCancelClick} onConfirm={this.handleSelectionDeleteDialogConfirmClick} open={this.showDeleteSelectionDialog} title={(0, utils_1.translate)('sulu_admin.delete_warning_title')}>
                    {(0, utils_1.translate)('sulu_admin.delete_selection_warning_text', { count: store.selections.length })}
                </Dialog_1.default>
                {deletable &&
                    <react_1.Fragment>
                        <Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={store.deleting} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleDeleteDialogCancelClick} onConfirm={this.handleDeleteDialogConfirmClick} open={this.showDeleteDialog} title={(0, utils_1.translate)('sulu_admin.delete_warning_title')}>
                            {(0, utils_1.translate)('sulu_admin.delete_warning_text')}
                        </Dialog_1.default>
                        {this.renderDeleteReferencedResourceDialog()}
                        {this.renderDeleteDependantResourcesDialog()}
                    </react_1.Fragment>}
                {movable &&
                    <react_1.Fragment>
                        <SingleListOverlay_1.default adapter={adapters[0]} allowActivateForDisabledItems={false} clearSelectionOnClose={true} confirmLoading={store.movingSelection || store.moving} disabledIds={this.moveId ? [this.moveId] : []} listKey={store.listKey} locale={store.observableOptions.locale} metadataOptions={store.metadataOptions} onClose={this.handleMoveOverlayClose} onConfirm={this.handleMoveOverlayConfirmClick} open={this.showMoveOverlay} options={store.options} reloadOnOpen={true} resourceKey={store.resourceKey} title={(0, utils_1.translate)('sulu_admin.move_copy_overlay_title')}/>
                        <Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onCancel={this.handleMovePermissionWarningCancel} onConfirm={this.handleMovePermissionWarningConfirm} open={!!this.movingRestrictedTarget} title={(0, utils_1.translate)('sulu_security.move_permission_title')}>
                            {(0, utils_1.translate)('sulu_security.move_permission_warning')}
                        </Dialog_1.default>
                    </react_1.Fragment>}
                {copyable &&
                    <SingleListOverlay_1.default adapter={adapters[0]} clearSelectionOnClose={true} confirmLoading={store.copying} listKey={store.listKey} locale={store.observableOptions.locale} metadataOptions={store.metadataOptions} onClose={this.handleCopyOverlayClose} onConfirm={this.handleCopyOverlayConfirmClick} open={this.showCopyOverlay} reloadOnOpen={true} resourceKey={store.resourceKey} title={(0, utils_1.translate)('sulu_admin.move_copy_overlay_title')}/>}
                {orderable &&
                    <Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={store.ordering} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleOrderDialogCancelClick} onConfirm={this.handleOrderDialogConfirmClick} open={this.showOrderDialog} title={(0, utils_1.translate)('sulu_admin.order_warning_title')}>
                        {(0, utils_1.translate)('sulu_admin.order_warning_text')}
                    </Dialog_1.default>}
            </div>);
        }
    };
    __setFunctionName(_classThis, "List");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _currentAdapterKey_decorators = [mobx_1.observable];
        _showCopyOverlay_decorators = [mobx_1.observable];
        _showDeleteDialog_decorators = [mobx_1.observable];
        _showMoveOverlay_decorators = [mobx_1.observable];
        _showDeleteSelectionDialog_decorators = [mobx_1.observable];
        _allowConflictDeletion_decorators = [mobx_1.observable];
        _showOrderDialog_decorators = [mobx_1.observable];
        _adapterOptionsOpen_decorators = [mobx_1.observable];
        _columnOptionsOpen_decorators = [mobx_1.observable];
        _referencingResourcesData_decorators = [mobx_1.observable];
        _dependantResourcesData_decorators = [mobx_1.observable];
        _movingRestrictedTarget_decorators = [mobx_1.observable];
        _get_currentAdapter_decorators = [mobx_1.computed];
        _get_currentAdapterOptions_decorators = [mobx_1.computed];
        _get_disabledIds_decorators = [mobx_1.computed];
        _get_showColumnOptions_decorators = [mobx_1.computed];
        _setCurrentAdapterKey_decorators = [mobx_1.action];
        _requestSelectionDelete_decorators = [mobx_1.action];
        _handleSelectionDeleteDialogConfirmClick_decorators = [mobx_1.action];
        _handleSelectionDeleteDialogCancelClick_decorators = [mobx_1.action];
        _handleRequestItemDelete_decorators = [mobx_1.action];
        _closeAllDialogs_decorators = [mobx_1.action];
        _handleDeleteResponseError_decorators = [mobx_1.action];
        _handleDeleteDialogConfirmClick_decorators = [mobx_1.action];
        _handleDeleteDialogCancelClick_decorators = [mobx_1.action];
        _handleRequestItemMove_decorators = [mobx_1.action];
        _handleMoveOverlayConfirmClick_decorators = [mobx_1.action];
        _handleMoveOverlayClose_decorators = [mobx_1.action];
        _handleMovePermissionWarningConfirm_decorators = [mobx_1.action];
        _handleMovePermissionWarningCancel_decorators = [mobx_1.action];
        _handleRequestItemCopy_decorators = [mobx_1.action];
        _handleCopyOverlayConfirmClick_decorators = [mobx_1.action];
        _handleCopyOverlayClose_decorators = [mobx_1.action];
        _handleRequestItemOrder_decorators = [mobx_1.action];
        _handleOrderDialogConfirmClick_decorators = [mobx_1.action];
        _handleOrderDialogCancelClick_decorators = [mobx_1.action];
        _handleAdapterOptionsButtonClick_decorators = [mobx_1.action];
        _handleAdapterOptionsClose_decorators = [mobx_1.action];
        _handleColumnOptionsOpen_decorators = [mobx_1.action];
        _handleColumnOptionsClose_decorators = [mobx_1.action];
        _handleColumnOptionsChange_decorators = [mobx_1.action];
        _get_deleteDependantResourcesDialogRequestOptions_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_currentAdapter_decorators, { kind: "getter", name: "currentAdapter", static: false, private: false, access: { has: obj => "currentAdapter" in obj, get: obj => obj.currentAdapter }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_currentAdapterOptions_decorators, { kind: "getter", name: "currentAdapterOptions", static: false, private: false, access: { has: obj => "currentAdapterOptions" in obj, get: obj => obj.currentAdapterOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_disabledIds_decorators, { kind: "getter", name: "disabledIds", static: false, private: false, access: { has: obj => "disabledIds" in obj, get: obj => obj.disabledIds }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_showColumnOptions_decorators, { kind: "getter", name: "showColumnOptions", static: false, private: false, access: { has: obj => "showColumnOptions" in obj, get: obj => obj.showColumnOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_deleteDependantResourcesDialogRequestOptions_decorators, { kind: "getter", name: "deleteDependantResourcesDialogRequestOptions", static: false, private: false, access: { has: obj => "deleteDependantResourcesDialogRequestOptions" in obj, get: obj => obj.deleteDependantResourcesDialogRequestOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _currentAdapterKey_decorators, { kind: "field", name: "currentAdapterKey", static: false, private: false, access: { has: obj => "currentAdapterKey" in obj, get: obj => obj.currentAdapterKey, set: (obj, value) => { obj.currentAdapterKey = value; } }, metadata: _metadata }, _currentAdapterKey_initializers, _currentAdapterKey_extraInitializers);
        __esDecorate(null, null, _showCopyOverlay_decorators, { kind: "field", name: "showCopyOverlay", static: false, private: false, access: { has: obj => "showCopyOverlay" in obj, get: obj => obj.showCopyOverlay, set: (obj, value) => { obj.showCopyOverlay = value; } }, metadata: _metadata }, _showCopyOverlay_initializers, _showCopyOverlay_extraInitializers);
        __esDecorate(null, null, _showDeleteDialog_decorators, { kind: "field", name: "showDeleteDialog", static: false, private: false, access: { has: obj => "showDeleteDialog" in obj, get: obj => obj.showDeleteDialog, set: (obj, value) => { obj.showDeleteDialog = value; } }, metadata: _metadata }, _showDeleteDialog_initializers, _showDeleteDialog_extraInitializers);
        __esDecorate(null, null, _showMoveOverlay_decorators, { kind: "field", name: "showMoveOverlay", static: false, private: false, access: { has: obj => "showMoveOverlay" in obj, get: obj => obj.showMoveOverlay, set: (obj, value) => { obj.showMoveOverlay = value; } }, metadata: _metadata }, _showMoveOverlay_initializers, _showMoveOverlay_extraInitializers);
        __esDecorate(null, null, _showDeleteSelectionDialog_decorators, { kind: "field", name: "showDeleteSelectionDialog", static: false, private: false, access: { has: obj => "showDeleteSelectionDialog" in obj, get: obj => obj.showDeleteSelectionDialog, set: (obj, value) => { obj.showDeleteSelectionDialog = value; } }, metadata: _metadata }, _showDeleteSelectionDialog_initializers, _showDeleteSelectionDialog_extraInitializers);
        __esDecorate(null, null, _allowConflictDeletion_decorators, { kind: "field", name: "allowConflictDeletion", static: false, private: false, access: { has: obj => "allowConflictDeletion" in obj, get: obj => obj.allowConflictDeletion, set: (obj, value) => { obj.allowConflictDeletion = value; } }, metadata: _metadata }, _allowConflictDeletion_initializers, _allowConflictDeletion_extraInitializers);
        __esDecorate(null, null, _showOrderDialog_decorators, { kind: "field", name: "showOrderDialog", static: false, private: false, access: { has: obj => "showOrderDialog" in obj, get: obj => obj.showOrderDialog, set: (obj, value) => { obj.showOrderDialog = value; } }, metadata: _metadata }, _showOrderDialog_initializers, _showOrderDialog_extraInitializers);
        __esDecorate(null, null, _adapterOptionsOpen_decorators, { kind: "field", name: "adapterOptionsOpen", static: false, private: false, access: { has: obj => "adapterOptionsOpen" in obj, get: obj => obj.adapterOptionsOpen, set: (obj, value) => { obj.adapterOptionsOpen = value; } }, metadata: _metadata }, _adapterOptionsOpen_initializers, _adapterOptionsOpen_extraInitializers);
        __esDecorate(null, null, _columnOptionsOpen_decorators, { kind: "field", name: "columnOptionsOpen", static: false, private: false, access: { has: obj => "columnOptionsOpen" in obj, get: obj => obj.columnOptionsOpen, set: (obj, value) => { obj.columnOptionsOpen = value; } }, metadata: _metadata }, _columnOptionsOpen_initializers, _columnOptionsOpen_extraInitializers);
        __esDecorate(null, null, _referencingResourcesData_decorators, { kind: "field", name: "referencingResourcesData", static: false, private: false, access: { has: obj => "referencingResourcesData" in obj, get: obj => obj.referencingResourcesData, set: (obj, value) => { obj.referencingResourcesData = value; } }, metadata: _metadata }, _referencingResourcesData_initializers, _referencingResourcesData_extraInitializers);
        __esDecorate(null, null, _dependantResourcesData_decorators, { kind: "field", name: "dependantResourcesData", static: false, private: false, access: { has: obj => "dependantResourcesData" in obj, get: obj => obj.dependantResourcesData, set: (obj, value) => { obj.dependantResourcesData = value; } }, metadata: _metadata }, _dependantResourcesData_initializers, _dependantResourcesData_extraInitializers);
        __esDecorate(null, null, _movingRestrictedTarget_decorators, { kind: "field", name: "movingRestrictedTarget", static: false, private: false, access: { has: obj => "movingRestrictedTarget" in obj, get: obj => obj.movingRestrictedTarget, set: (obj, value) => { obj.movingRestrictedTarget = value; } }, metadata: _metadata }, _movingRestrictedTarget_initializers, _movingRestrictedTarget_extraInitializers);
        __esDecorate(null, null, _setCurrentAdapterKey_decorators, { kind: "field", name: "setCurrentAdapterKey", static: false, private: false, access: { has: obj => "setCurrentAdapterKey" in obj, get: obj => obj.setCurrentAdapterKey, set: (obj, value) => { obj.setCurrentAdapterKey = value; } }, metadata: _metadata }, _setCurrentAdapterKey_initializers, _setCurrentAdapterKey_extraInitializers);
        __esDecorate(null, null, _requestSelectionDelete_decorators, { kind: "field", name: "requestSelectionDelete", static: false, private: false, access: { has: obj => "requestSelectionDelete" in obj, get: obj => obj.requestSelectionDelete, set: (obj, value) => { obj.requestSelectionDelete = value; } }, metadata: _metadata }, _requestSelectionDelete_initializers, _requestSelectionDelete_extraInitializers);
        __esDecorate(null, null, _handleSelectionDeleteDialogConfirmClick_decorators, { kind: "field", name: "handleSelectionDeleteDialogConfirmClick", static: false, private: false, access: { has: obj => "handleSelectionDeleteDialogConfirmClick" in obj, get: obj => obj.handleSelectionDeleteDialogConfirmClick, set: (obj, value) => { obj.handleSelectionDeleteDialogConfirmClick = value; } }, metadata: _metadata }, _handleSelectionDeleteDialogConfirmClick_initializers, _handleSelectionDeleteDialogConfirmClick_extraInitializers);
        __esDecorate(null, null, _handleSelectionDeleteDialogCancelClick_decorators, { kind: "field", name: "handleSelectionDeleteDialogCancelClick", static: false, private: false, access: { has: obj => "handleSelectionDeleteDialogCancelClick" in obj, get: obj => obj.handleSelectionDeleteDialogCancelClick, set: (obj, value) => { obj.handleSelectionDeleteDialogCancelClick = value; } }, metadata: _metadata }, _handleSelectionDeleteDialogCancelClick_initializers, _handleSelectionDeleteDialogCancelClick_extraInitializers);
        __esDecorate(null, null, _handleRequestItemDelete_decorators, { kind: "field", name: "handleRequestItemDelete", static: false, private: false, access: { has: obj => "handleRequestItemDelete" in obj, get: obj => obj.handleRequestItemDelete, set: (obj, value) => { obj.handleRequestItemDelete = value; } }, metadata: _metadata }, _handleRequestItemDelete_initializers, _handleRequestItemDelete_extraInitializers);
        __esDecorate(null, null, _closeAllDialogs_decorators, { kind: "field", name: "closeAllDialogs", static: false, private: false, access: { has: obj => "closeAllDialogs" in obj, get: obj => obj.closeAllDialogs, set: (obj, value) => { obj.closeAllDialogs = value; } }, metadata: _metadata }, _closeAllDialogs_initializers, _closeAllDialogs_extraInitializers);
        __esDecorate(null, null, _handleDeleteResponseError_decorators, { kind: "field", name: "handleDeleteResponseError", static: false, private: false, access: { has: obj => "handleDeleteResponseError" in obj, get: obj => obj.handleDeleteResponseError, set: (obj, value) => { obj.handleDeleteResponseError = value; } }, metadata: _metadata }, _handleDeleteResponseError_initializers, _handleDeleteResponseError_extraInitializers);
        __esDecorate(null, null, _handleDeleteDialogConfirmClick_decorators, { kind: "field", name: "handleDeleteDialogConfirmClick", static: false, private: false, access: { has: obj => "handleDeleteDialogConfirmClick" in obj, get: obj => obj.handleDeleteDialogConfirmClick, set: (obj, value) => { obj.handleDeleteDialogConfirmClick = value; } }, metadata: _metadata }, _handleDeleteDialogConfirmClick_initializers, _handleDeleteDialogConfirmClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteDialogCancelClick_decorators, { kind: "field", name: "handleDeleteDialogCancelClick", static: false, private: false, access: { has: obj => "handleDeleteDialogCancelClick" in obj, get: obj => obj.handleDeleteDialogCancelClick, set: (obj, value) => { obj.handleDeleteDialogCancelClick = value; } }, metadata: _metadata }, _handleDeleteDialogCancelClick_initializers, _handleDeleteDialogCancelClick_extraInitializers);
        __esDecorate(null, null, _handleRequestItemMove_decorators, { kind: "field", name: "handleRequestItemMove", static: false, private: false, access: { has: obj => "handleRequestItemMove" in obj, get: obj => obj.handleRequestItemMove, set: (obj, value) => { obj.handleRequestItemMove = value; } }, metadata: _metadata }, _handleRequestItemMove_initializers, _handleRequestItemMove_extraInitializers);
        __esDecorate(null, null, _handleMoveOverlayConfirmClick_decorators, { kind: "field", name: "handleMoveOverlayConfirmClick", static: false, private: false, access: { has: obj => "handleMoveOverlayConfirmClick" in obj, get: obj => obj.handleMoveOverlayConfirmClick, set: (obj, value) => { obj.handleMoveOverlayConfirmClick = value; } }, metadata: _metadata }, _handleMoveOverlayConfirmClick_initializers, _handleMoveOverlayConfirmClick_extraInitializers);
        __esDecorate(null, null, _handleMoveOverlayClose_decorators, { kind: "field", name: "handleMoveOverlayClose", static: false, private: false, access: { has: obj => "handleMoveOverlayClose" in obj, get: obj => obj.handleMoveOverlayClose, set: (obj, value) => { obj.handleMoveOverlayClose = value; } }, metadata: _metadata }, _handleMoveOverlayClose_initializers, _handleMoveOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleMovePermissionWarningConfirm_decorators, { kind: "field", name: "handleMovePermissionWarningConfirm", static: false, private: false, access: { has: obj => "handleMovePermissionWarningConfirm" in obj, get: obj => obj.handleMovePermissionWarningConfirm, set: (obj, value) => { obj.handleMovePermissionWarningConfirm = value; } }, metadata: _metadata }, _handleMovePermissionWarningConfirm_initializers, _handleMovePermissionWarningConfirm_extraInitializers);
        __esDecorate(null, null, _handleMovePermissionWarningCancel_decorators, { kind: "field", name: "handleMovePermissionWarningCancel", static: false, private: false, access: { has: obj => "handleMovePermissionWarningCancel" in obj, get: obj => obj.handleMovePermissionWarningCancel, set: (obj, value) => { obj.handleMovePermissionWarningCancel = value; } }, metadata: _metadata }, _handleMovePermissionWarningCancel_initializers, _handleMovePermissionWarningCancel_extraInitializers);
        __esDecorate(null, null, _handleRequestItemCopy_decorators, { kind: "field", name: "handleRequestItemCopy", static: false, private: false, access: { has: obj => "handleRequestItemCopy" in obj, get: obj => obj.handleRequestItemCopy, set: (obj, value) => { obj.handleRequestItemCopy = value; } }, metadata: _metadata }, _handleRequestItemCopy_initializers, _handleRequestItemCopy_extraInitializers);
        __esDecorate(null, null, _handleCopyOverlayConfirmClick_decorators, { kind: "field", name: "handleCopyOverlayConfirmClick", static: false, private: false, access: { has: obj => "handleCopyOverlayConfirmClick" in obj, get: obj => obj.handleCopyOverlayConfirmClick, set: (obj, value) => { obj.handleCopyOverlayConfirmClick = value; } }, metadata: _metadata }, _handleCopyOverlayConfirmClick_initializers, _handleCopyOverlayConfirmClick_extraInitializers);
        __esDecorate(null, null, _handleCopyOverlayClose_decorators, { kind: "field", name: "handleCopyOverlayClose", static: false, private: false, access: { has: obj => "handleCopyOverlayClose" in obj, get: obj => obj.handleCopyOverlayClose, set: (obj, value) => { obj.handleCopyOverlayClose = value; } }, metadata: _metadata }, _handleCopyOverlayClose_initializers, _handleCopyOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleRequestItemOrder_decorators, { kind: "field", name: "handleRequestItemOrder", static: false, private: false, access: { has: obj => "handleRequestItemOrder" in obj, get: obj => obj.handleRequestItemOrder, set: (obj, value) => { obj.handleRequestItemOrder = value; } }, metadata: _metadata }, _handleRequestItemOrder_initializers, _handleRequestItemOrder_extraInitializers);
        __esDecorate(null, null, _handleOrderDialogConfirmClick_decorators, { kind: "field", name: "handleOrderDialogConfirmClick", static: false, private: false, access: { has: obj => "handleOrderDialogConfirmClick" in obj, get: obj => obj.handleOrderDialogConfirmClick, set: (obj, value) => { obj.handleOrderDialogConfirmClick = value; } }, metadata: _metadata }, _handleOrderDialogConfirmClick_initializers, _handleOrderDialogConfirmClick_extraInitializers);
        __esDecorate(null, null, _handleOrderDialogCancelClick_decorators, { kind: "field", name: "handleOrderDialogCancelClick", static: false, private: false, access: { has: obj => "handleOrderDialogCancelClick" in obj, get: obj => obj.handleOrderDialogCancelClick, set: (obj, value) => { obj.handleOrderDialogCancelClick = value; } }, metadata: _metadata }, _handleOrderDialogCancelClick_initializers, _handleOrderDialogCancelClick_extraInitializers);
        __esDecorate(null, null, _handleAdapterOptionsButtonClick_decorators, { kind: "field", name: "handleAdapterOptionsButtonClick", static: false, private: false, access: { has: obj => "handleAdapterOptionsButtonClick" in obj, get: obj => obj.handleAdapterOptionsButtonClick, set: (obj, value) => { obj.handleAdapterOptionsButtonClick = value; } }, metadata: _metadata }, _handleAdapterOptionsButtonClick_initializers, _handleAdapterOptionsButtonClick_extraInitializers);
        __esDecorate(null, null, _handleAdapterOptionsClose_decorators, { kind: "field", name: "handleAdapterOptionsClose", static: false, private: false, access: { has: obj => "handleAdapterOptionsClose" in obj, get: obj => obj.handleAdapterOptionsClose, set: (obj, value) => { obj.handleAdapterOptionsClose = value; } }, metadata: _metadata }, _handleAdapterOptionsClose_initializers, _handleAdapterOptionsClose_extraInitializers);
        __esDecorate(null, null, _handleColumnOptionsOpen_decorators, { kind: "field", name: "handleColumnOptionsOpen", static: false, private: false, access: { has: obj => "handleColumnOptionsOpen" in obj, get: obj => obj.handleColumnOptionsOpen, set: (obj, value) => { obj.handleColumnOptionsOpen = value; } }, metadata: _metadata }, _handleColumnOptionsOpen_initializers, _handleColumnOptionsOpen_extraInitializers);
        __esDecorate(null, null, _handleColumnOptionsClose_decorators, { kind: "field", name: "handleColumnOptionsClose", static: false, private: false, access: { has: obj => "handleColumnOptionsClose" in obj, get: obj => obj.handleColumnOptionsClose, set: (obj, value) => { obj.handleColumnOptionsClose = value; } }, metadata: _metadata }, _handleColumnOptionsClose_initializers, _handleColumnOptionsClose_extraInitializers);
        __esDecorate(null, null, _handleColumnOptionsChange_decorators, { kind: "field", name: "handleColumnOptionsChange", static: false, private: false, access: { has: obj => "handleColumnOptionsChange" in obj, get: obj => obj.handleColumnOptionsChange, set: (obj, value) => { obj.handleColumnOptionsChange = value; } }, metadata: _metadata }, _handleColumnOptionsChange_initializers, _handleColumnOptionsChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        List = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        actions: [],
        allowActivateForDisabledItems: true,
        copyable: true,
        deletable: true,
        disabled: false,
        disabledIds: [],
        filterable: true,
        movable: true,
        orderable: true,
        paginated: true,
        searchable: true,
        selectable: true,
        showColumnOptions: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return List = _classThis;
})();
exports.default = List;
