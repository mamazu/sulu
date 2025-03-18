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
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const utils_1 = require("sulu-admin-bundle/utils");
const components_1 = require("sulu-admin-bundle/components");
const DeleteDependantResourcesDialog_1 = __importDefault(require("sulu-admin-bundle/containers/DeleteDependantResourcesDialog"));
const constants_1 = require("sulu-admin-bundle/constants");
const CollectionFormOverlay_1 = __importDefault(require("./CollectionFormOverlay"));
const CollectionBreadcrumb_1 = __importDefault(require("./CollectionBreadcrumb"));
const PermissionFormOverlay_1 = __importDefault(require("./PermissionFormOverlay"));
const collectionSection_scss_1 = __importDefault(require("./collectionSection.scss"));
const COLLECTIONS_RESOURCE_KEY = 'collections';
let CollectionSection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _openedCollectionOperationOverlayType_decorators;
    let _openedCollectionOperationOverlayType_initializers = [];
    let _openedCollectionOperationOverlayType_extraInitializers = [];
    let _movingRestrictedTargetCollection_decorators;
    let _movingRestrictedTargetCollection_initializers = [];
    let _movingRestrictedTargetCollection_extraInitializers = [];
    let _dependantResourcesData_decorators;
    let _dependantResourcesData_initializers = [];
    let _dependantResourcesData_extraInitializers = [];
    let _openCollectionOperationOverlay_decorators;
    let _closeCollectionOperationOverlay_decorators;
    let _get_collectionId_decorators;
    let _get_hasChildren_decorators;
    let _get_resourceStoreByOperationType_decorators;
    let _handleMoveCollectionConfirm_decorators;
    let _handleMoveCollectionConfirm_initializers = [];
    let _handleMoveCollectionConfirm_extraInitializers = [];
    let _handleMovePermissionWarningConfirm_decorators;
    let _handleMovePermissionWarningConfirm_initializers = [];
    let _handleMovePermissionWarningConfirm_extraInitializers = [];
    let _handleMovePermissionWarningCancel_decorators;
    let _handleMovePermissionWarningCancel_initializers = [];
    let _handleMovePermissionWarningCancel_extraInitializers = [];
    let _closeDeleteDependantResourcesDialog_decorators;
    let _closeDeleteDependantResourcesDialog_initializers = [];
    let _closeDeleteDependantResourcesDialog_extraInitializers = [];
    let _get_deleteDependantResourcesDialogRequestOptions_decorators;
    var CollectionSection = _classThis = class extends _classSuper {
        openCollectionOperationOverlay(operationType) {
            this.openedCollectionOperationOverlayType = operationType;
        }
        closeCollectionOperationOverlay() {
            this.openedCollectionOperationOverlayType = null;
        }
        get collectionId() {
            const { resourceStore } = this.props;
            return resourceStore.id;
        }
        get hasChildren() {
            const { resourceStore } = this.props;
            return (0, mobx_1.get)(resourceStore.data, 'hasChildren');
        }
        get resourceStoreByOperationType() {
            const { resourceStore, locale } = this.props;
            const { data } = resourceStore;
            if (this.openedCollectionOperationOverlayType === 'update') {
                return resourceStore.clone();
            }
            const newResourceStore = new stores_1.ResourceStore(COLLECTIONS_RESOURCE_KEY, null, {
                locale,
            }, {
                depth: 1,
                breadcrumb: true,
                parent: data.parent,
            });
            if (this.collectionId && this.openedCollectionOperationOverlayType === 'create') {
                newResourceStore.set('parent', this.collectionId);
            }
            return newResourceStore;
        }
        get deleteDependantResourcesDialogRequestOptions() {
            const { locale } = this.props;
            if (locale) {
                return {
                    locale: locale.get(),
                };
            }
            return {};
        }
        renderDeleteDependantResourcesDialog() {
            if (!this.dependantResourcesData) {
                return null;
            }
            return (<DeleteDependantResourcesDialog_1.default dependantResourcesData={this.dependantResourcesData} onCancel={this.handleDeleteDependantResourcesDialogCancel} onFinish={this.handleDeleteDependantResourcesDialogFinish} requestOptions={this.deleteDependantResourcesDialogRequestOptions}/>);
        }
        render() {
            const { addable, deletable, editable, listStore, locale, overlayType, resourceStore, securable, } = this.props;
            const operationType = this.openedCollectionOperationOverlayType;
            return (<div>
                {!resourceStore.loading &&
                    <div className={collectionSection_scss_1.default.collectionSection}>
                        <div className={collectionSection_scss_1.default.left}>
                            <CollectionBreadcrumb_1.default onNavigate={this.handleBreadcrumbNavigate} resourceStore={resourceStore}/>
                        </div>

                        <div className={collectionSection_scss_1.default.right}>
                            <components_1.ButtonGroup>
                                {addable &&
                            <components_1.Button icon="su-plus" onClick={this.handleAddCollectionClick}>
                                        {(0, utils_1.translate)('sulu_media.add_collection')}
                                    </components_1.Button>}
                                {!!resourceStore.id && (editable || deletable || editable || securable) &&
                            <components_1.DropdownButton icon="su-cog">
                                        {editable &&
                                    <components_1.DropdownButton.Item onClick={this.handleEditCollectionClick}>
                                                {(0, utils_1.translate)('sulu_admin.edit')}
                                            </components_1.DropdownButton.Item>}
                                        {deletable &&
                                    <components_1.DropdownButton.Item onClick={this.handleRemoveCollectionClick}>
                                                {(0, utils_1.translate)('sulu_admin.delete')}
                                            </components_1.DropdownButton.Item>}
                                        {editable &&
                                    <components_1.DropdownButton.Item onClick={this.handleMoveCollectionClick}>
                                                {(0, utils_1.translate)('sulu_admin.move')}
                                            </components_1.DropdownButton.Item>}
                                        {securable &&
                                    <components_1.DropdownButton.Item onClick={this.handlePermissionCollectionClick}>
                                                {(0, utils_1.translate)('sulu_security.permissions')}
                                            </components_1.DropdownButton.Item>}
                                    </components_1.DropdownButton>}
                            </components_1.ButtonGroup>
                        </div>
                    </div>}
                <containers_1.List adapters={['folder']} onItemClick={this.handleCollectionClick} searchable={false} store={listStore}/>
                <CollectionFormOverlay_1.default onClose={this.handleCollectionOverlayClose} onConfirm={this.handleCollectionOverlayConfirm} operationType={operationType} overlayType={overlayType} resourceStore={this.resourceStoreByOperationType}/>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={resourceStore.deleting} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleRemoveCollectionCancel} onConfirm={this.handleRemoveCollectionConfirm} open={operationType === 'remove'} title={(0, utils_1.translate)('sulu_media.remove_collection')}>
                    {(0, utils_1.translate)('sulu_media.remove_collection_warning')}
                </components_1.Dialog>
                {this.renderDeleteDependantResourcesDialog()}
                <PermissionFormOverlay_1.default collectionId={this.collectionId} hasChildren={this.hasChildren} onClose={this.handlePermissionOverlayClose} onConfirm={this.handlePermissionOverlayConfirm} open={operationType === 'permissions'}/>
                <containers_1.SingleListOverlay adapter="column_list" allowActivateForDisabledItems={false} clearSelectionOnClose={true} confirmLoading={resourceStore.moving} disabledIds={resourceStore.id ? [resourceStore.id] : []} itemDisabledCondition="!!locked" listKey={COLLECTIONS_RESOURCE_KEY} locale={locale} onClose={this.handleMoveCollectionClose} onConfirm={this.handleMoveCollectionConfirm} open={operationType === 'move'} options={{ includeRoot: true }} reloadOnOpen={true} resourceKey={COLLECTIONS_RESOURCE_KEY} title={(0, utils_1.translate)('sulu_media.move_collection')}/>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onCancel={this.handleMovePermissionWarningCancel} onConfirm={this.handleMovePermissionWarningConfirm} open={!!this.movingRestrictedTargetCollection} title={(0, utils_1.translate)('sulu_security.move_permission_title')}>
                    {(0, utils_1.translate)('sulu_security.move_permission_warning')}
                </components_1.Dialog>
            </div>);
        }
        constructor() {
            super(...arguments);
            this.openedCollectionOperationOverlayType = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _openedCollectionOperationOverlayType_initializers, void 0));
            this.movingRestrictedTargetCollection = (__runInitializers(this, _openedCollectionOperationOverlayType_extraInitializers), __runInitializers(this, _movingRestrictedTargetCollection_initializers, undefined));
            this.dependantResourcesData = (__runInitializers(this, _movingRestrictedTargetCollection_extraInitializers), __runInitializers(this, _dependantResourcesData_initializers, undefined));
            this.handleCollectionClick = (__runInitializers(this, _dependantResourcesData_extraInitializers), (collectionId) => {
                this.props.onCollectionNavigate(collectionId);
            });
            this.handleBreadcrumbNavigate = (collectionId) => {
                this.props.onCollectionNavigate(collectionId);
            };
            this.handleAddCollectionClick = () => {
                this.openCollectionOperationOverlay('create');
            };
            this.handleEditCollectionClick = () => {
                this.openCollectionOperationOverlay('update');
            };
            this.handleRemoveCollectionClick = () => {
                this.openCollectionOperationOverlay('remove');
            };
            this.handleMoveCollectionClick = () => {
                this.openCollectionOperationOverlay('move');
            };
            this.handlePermissionCollectionClick = () => {
                this.openCollectionOperationOverlay('permissions');
            };
            this.handleCollectionOverlayConfirm = (resourceStore) => {
                const options = {
                    breadcrumb: true,
                };
                resourceStore.save(options)
                    .then(() => this.handleSaveResponse(resourceStore));
            };
            this.handleSaveResponse = (resourceStore) => {
                const openedCollectionOperationOverlayType = this.openedCollectionOperationOverlayType;
                this.closeCollectionOperationOverlay();
                if (openedCollectionOperationOverlayType === 'update') {
                    this.props.resourceStore.setMultiple(resourceStore.data);
                }
                else {
                    this.props.onCollectionNavigate(resourceStore.id);
                }
                resourceStore.destroy();
            };
            this.handleCollectionOverlayClose = () => {
                this.closeCollectionOperationOverlay();
            };
            this.handlePermissionOverlayClose = () => {
                this.closeCollectionOperationOverlay();
            };
            this.handlePermissionOverlayConfirm = () => {
                const { resourceStore } = this.props;
                resourceStore.reload();
                this.closeCollectionOperationOverlay();
            };
            this.handleRemoveCollectionConfirm = () => {
                this.delete();
            };
            this.delete = () => {
                const { onDeleteError, resourceStore } = this.props;
                const { data } = resourceStore;
                const parentCollectionId = data._embedded && data._embedded.parent && data._embedded.parent.id
                    ? data._embedded.parent.id
                    : undefined;
                resourceStore.delete()
                    .then(() => {
                    this.closeCollectionOperationOverlay();
                    this.closeDeleteDependantResourcesDialog();
                    this.props.onCollectionNavigate(parentCollectionId);
                })
                    .catch((response) => {
                    this.closeCollectionOperationOverlay();
                    response.json()
                        .then((0, mobx_1.action)((data) => {
                        if (response.status === 409 && data.code === constants_1.ERROR_CODE_DEPENDANT_RESOURCES_FOUND) {
                            this.dependantResourcesData = {
                                dependantResourceBatches: data.dependantResourceBatches,
                                dependantResourcesCount: data.dependantResourcesCount,
                                detail: data.detail,
                                title: data.title,
                            };
                            return;
                        }
                        if (onDeleteError) {
                            onDeleteError(data);
                        }
                    }));
                });
            };
            this.handleRemoveCollectionCancel = () => {
                this.closeCollectionOperationOverlay();
            };
            this.handleMoveCollectionConfirm = __runInitializers(this, _handleMoveCollectionConfirm_initializers, (collection) => {
                const { resourceStore } = this.props;
                if (!resourceStore.data._hasPermissions && !collection._hasPermissions) {
                    this.moveCollection(collection);
                }
                else {
                    this.movingRestrictedTargetCollection = collection;
                }
            });
            this.handleMovePermissionWarningConfirm = (__runInitializers(this, _handleMoveCollectionConfirm_extraInitializers), __runInitializers(this, _handleMovePermissionWarningConfirm_initializers, () => {
                this.moveCollection(this.movingRestrictedTargetCollection);
                this.movingRestrictedTargetCollection = undefined;
            }));
            this.handleMovePermissionWarningCancel = (__runInitializers(this, _handleMovePermissionWarningConfirm_extraInitializers), __runInitializers(this, _handleMovePermissionWarningCancel_initializers, () => {
                this.movingRestrictedTargetCollection = undefined;
            }));
            this.moveCollection = (__runInitializers(this, _handleMovePermissionWarningCancel_extraInitializers), (collection) => {
                const { resourceStore } = this.props;
                resourceStore.move(collection.id).then(() => {
                    resourceStore.reload();
                    this.closeCollectionOperationOverlay();
                });
            });
            this.handleMoveCollectionClose = () => {
                this.closeCollectionOperationOverlay();
            };
            this.handleDeleteDependantResourcesDialogFinish = () => {
                this.delete();
            };
            this.handleDeleteDependantResourcesDialogCancel = () => {
                this.closeDeleteDependantResourcesDialog();
            };
            this.closeDeleteDependantResourcesDialog = __runInitializers(this, _closeDeleteDependantResourcesDialog_initializers, () => {
                this.dependantResourcesData = undefined;
            });
            __runInitializers(this, _closeDeleteDependantResourcesDialog_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "CollectionSection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _openedCollectionOperationOverlayType_decorators = [mobx_1.observable];
        _movingRestrictedTargetCollection_decorators = [mobx_1.observable];
        _dependantResourcesData_decorators = [mobx_1.observable];
        _openCollectionOperationOverlay_decorators = [mobx_1.action];
        _closeCollectionOperationOverlay_decorators = [mobx_1.action];
        _get_collectionId_decorators = [mobx_1.computed];
        _get_hasChildren_decorators = [mobx_1.computed];
        _get_resourceStoreByOperationType_decorators = [mobx_1.computed];
        _handleMoveCollectionConfirm_decorators = [mobx_1.action];
        _handleMovePermissionWarningConfirm_decorators = [mobx_1.action];
        _handleMovePermissionWarningCancel_decorators = [mobx_1.action];
        _closeDeleteDependantResourcesDialog_decorators = [mobx_1.action];
        _get_deleteDependantResourcesDialogRequestOptions_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _openCollectionOperationOverlay_decorators, { kind: "method", name: "openCollectionOperationOverlay", static: false, private: false, access: { has: obj => "openCollectionOperationOverlay" in obj, get: obj => obj.openCollectionOperationOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _closeCollectionOperationOverlay_decorators, { kind: "method", name: "closeCollectionOperationOverlay", static: false, private: false, access: { has: obj => "closeCollectionOperationOverlay" in obj, get: obj => obj.closeCollectionOperationOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_collectionId_decorators, { kind: "getter", name: "collectionId", static: false, private: false, access: { has: obj => "collectionId" in obj, get: obj => obj.collectionId }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_hasChildren_decorators, { kind: "getter", name: "hasChildren", static: false, private: false, access: { has: obj => "hasChildren" in obj, get: obj => obj.hasChildren }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resourceStoreByOperationType_decorators, { kind: "getter", name: "resourceStoreByOperationType", static: false, private: false, access: { has: obj => "resourceStoreByOperationType" in obj, get: obj => obj.resourceStoreByOperationType }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_deleteDependantResourcesDialogRequestOptions_decorators, { kind: "getter", name: "deleteDependantResourcesDialogRequestOptions", static: false, private: false, access: { has: obj => "deleteDependantResourcesDialogRequestOptions" in obj, get: obj => obj.deleteDependantResourcesDialogRequestOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _openedCollectionOperationOverlayType_decorators, { kind: "field", name: "openedCollectionOperationOverlayType", static: false, private: false, access: { has: obj => "openedCollectionOperationOverlayType" in obj, get: obj => obj.openedCollectionOperationOverlayType, set: (obj, value) => { obj.openedCollectionOperationOverlayType = value; } }, metadata: _metadata }, _openedCollectionOperationOverlayType_initializers, _openedCollectionOperationOverlayType_extraInitializers);
        __esDecorate(null, null, _movingRestrictedTargetCollection_decorators, { kind: "field", name: "movingRestrictedTargetCollection", static: false, private: false, access: { has: obj => "movingRestrictedTargetCollection" in obj, get: obj => obj.movingRestrictedTargetCollection, set: (obj, value) => { obj.movingRestrictedTargetCollection = value; } }, metadata: _metadata }, _movingRestrictedTargetCollection_initializers, _movingRestrictedTargetCollection_extraInitializers);
        __esDecorate(null, null, _dependantResourcesData_decorators, { kind: "field", name: "dependantResourcesData", static: false, private: false, access: { has: obj => "dependantResourcesData" in obj, get: obj => obj.dependantResourcesData, set: (obj, value) => { obj.dependantResourcesData = value; } }, metadata: _metadata }, _dependantResourcesData_initializers, _dependantResourcesData_extraInitializers);
        __esDecorate(null, null, _handleMoveCollectionConfirm_decorators, { kind: "field", name: "handleMoveCollectionConfirm", static: false, private: false, access: { has: obj => "handleMoveCollectionConfirm" in obj, get: obj => obj.handleMoveCollectionConfirm, set: (obj, value) => { obj.handleMoveCollectionConfirm = value; } }, metadata: _metadata }, _handleMoveCollectionConfirm_initializers, _handleMoveCollectionConfirm_extraInitializers);
        __esDecorate(null, null, _handleMovePermissionWarningConfirm_decorators, { kind: "field", name: "handleMovePermissionWarningConfirm", static: false, private: false, access: { has: obj => "handleMovePermissionWarningConfirm" in obj, get: obj => obj.handleMovePermissionWarningConfirm, set: (obj, value) => { obj.handleMovePermissionWarningConfirm = value; } }, metadata: _metadata }, _handleMovePermissionWarningConfirm_initializers, _handleMovePermissionWarningConfirm_extraInitializers);
        __esDecorate(null, null, _handleMovePermissionWarningCancel_decorators, { kind: "field", name: "handleMovePermissionWarningCancel", static: false, private: false, access: { has: obj => "handleMovePermissionWarningCancel" in obj, get: obj => obj.handleMovePermissionWarningCancel, set: (obj, value) => { obj.handleMovePermissionWarningCancel = value; } }, metadata: _metadata }, _handleMovePermissionWarningCancel_initializers, _handleMovePermissionWarningCancel_extraInitializers);
        __esDecorate(null, null, _closeDeleteDependantResourcesDialog_decorators, { kind: "field", name: "closeDeleteDependantResourcesDialog", static: false, private: false, access: { has: obj => "closeDeleteDependantResourcesDialog" in obj, get: obj => obj.closeDeleteDependantResourcesDialog, set: (obj, value) => { obj.closeDeleteDependantResourcesDialog = value; } }, metadata: _metadata }, _closeDeleteDependantResourcesDialog_initializers, _closeDeleteDependantResourcesDialog_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CollectionSection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CollectionSection = _classThis;
})();
exports.default = CollectionSection;
