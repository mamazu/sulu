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
const utils_1 = require("sulu-admin-bundle/utils");
const MediaCollection_1 = __importDefault(require("../../containers/MediaCollection"));
const CollectionStore_1 = __importDefault(require("../../stores/CollectionStore"));
const mediaOverview_scss_1 = __importDefault(require("./mediaOverview.scss"));
const COLLECTION_ROUTE = 'sulu_media.overview';
const MEDIA_ROUTE = 'sulu_media.form.details';
const COLLECTIONS_RESOURCE_KEY = 'collections';
const MEDIA_RESOURCE_KEY = 'media';
const USER_SETTINGS_KEY = 'media_overview';
let MediaOverview = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _errors_decorators;
    let _errors_initializers = [];
    let _errors_extraInitializers = [];
    let _mediaListStore_decorators;
    let _mediaListStore_initializers = [];
    let _mediaListStore_extraInitializers = [];
    let _collectionListStore_decorators;
    let _collectionListStore_initializers = [];
    let _collectionListStore_extraInitializers = [];
    let _collectionStore_decorators;
    let _collectionStore_initializers = [];
    let _collectionStore_extraInitializers = [];
    let _showMediaMoveOverlay_decorators;
    let _showMediaMoveOverlay_initializers = [];
    let _showMediaMoveOverlay_extraInitializers = [];
    let _showMediaUploadOverlay_decorators;
    let _showMediaUploadOverlay_initializers = [];
    let _showMediaUploadOverlay_extraInitializers = [];
    let _mediaMoving_decorators;
    let _mediaMoving_initializers = [];
    let _mediaMoving_extraInitializers = [];
    let _setCollectionStore_decorators;
    let _handleCollectionNavigate_decorators;
    let _handleCollectionNavigate_initializers = [];
    let _handleCollectionNavigate_extraInitializers = [];
    let _handleUploadError_decorators;
    let _handleUploadError_initializers = [];
    let _handleUploadError_extraInitializers = [];
    let _handleUploadOverlayOpen_decorators;
    let _handleUploadOverlayOpen_initializers = [];
    let _handleUploadOverlayOpen_extraInitializers = [];
    let _handleUploadOverlayClose_decorators;
    let _handleUploadOverlayClose_initializers = [];
    let _handleUploadOverlayClose_extraInitializers = [];
    let _handleMoveMediaOverlayClose_decorators;
    let _handleMoveMediaOverlayClose_initializers = [];
    let _handleMoveMediaOverlayClose_extraInitializers = [];
    let _handleMoveMediaOverlayConfirm_decorators;
    let _handleMoveMediaOverlayConfirm_initializers = [];
    let _handleMoveMediaOverlayConfirm_extraInitializers = [];
    let _handleDeleteError_decorators;
    let _handleDeleteError_initializers = [];
    let _handleDeleteError_extraInitializers = [];
    var MediaOverview = _classThis = class extends _classSuper {
        static getDerivedRouteAttributes() {
            return {
                collectionLimit: containers_1.ListStore.getLimitSetting(COLLECTIONS_RESOURCE_KEY, USER_SETTINGS_KEY),
                mediaFilter: containers_1.ListStore.getFilterSetting(MEDIA_RESOURCE_KEY, USER_SETTINGS_KEY),
                mediaLimit: containers_1.ListStore.getLimitSetting(MEDIA_RESOURCE_KEY, USER_SETTINGS_KEY),
                mediaSortColumn: containers_1.ListStore.getSortColumnSetting(MEDIA_RESOURCE_KEY, USER_SETTINGS_KEY),
                mediaSortOrder: containers_1.ListStore.getSortOrderSetting(MEDIA_RESOURCE_KEY, USER_SETTINGS_KEY),
            };
        }
        constructor(props) {
            super(props);
            this.collectionPage = (__runInitializers(this, _instanceExtraInitializers), mobx_1.observable.box());
            this.mediaPage = mobx_1.observable.box();
            this.locale = mobx_1.observable.box();
            this.collectionId = mobx_1.observable.box();
            this.errors = __runInitializers(this, _errors_initializers, []);
            this.mediaListStore = (__runInitializers(this, _errors_extraInitializers), __runInitializers(this, _mediaListStore_initializers, void 0));
            this.collectionListStore = (__runInitializers(this, _mediaListStore_extraInitializers), __runInitializers(this, _collectionListStore_initializers, void 0));
            this.collectionStore = (__runInitializers(this, _collectionListStore_extraInitializers), __runInitializers(this, _collectionStore_initializers, void 0));
            this.mediaList = __runInitializers(this, _collectionStore_extraInitializers);
            this.showMediaMoveOverlay = __runInitializers(this, _showMediaMoveOverlay_initializers, false);
            this.showMediaUploadOverlay = (__runInitializers(this, _showMediaMoveOverlay_extraInitializers), __runInitializers(this, _showMediaUploadOverlay_initializers, false));
            this.mediaMoving = (__runInitializers(this, _showMediaUploadOverlay_extraInitializers), __runInitializers(this, _mediaMoving_initializers, false));
            this.disposer = __runInitializers(this, _mediaMoving_extraInitializers);
            this.createCollectionStore = () => {
                this.setCollectionStore(new CollectionStore_1.default(this.collectionId.get(), this.locale));
            };
            this.createCollectionListStore = () => {
                this.collectionListStore = new containers_1.ListStore(COLLECTIONS_RESOURCE_KEY, COLLECTIONS_RESOURCE_KEY, USER_SETTINGS_KEY, {
                    page: this.collectionPage,
                    locale: this.locale,
                    parentId: this.collectionId,
                });
                this.collectionListStore.sort('title', 'asc');
            };
            this.handleCollectionNavigate = __runInitializers(this, _handleCollectionNavigate_initializers, (collectionId) => {
                this.clearLists();
                this.mediaPage.set(1);
                this.collectionPage.set(1);
                this.collectionId.set(collectionId);
            });
            this.handleUploadError = (__runInitializers(this, _handleCollectionNavigate_extraInitializers), __runInitializers(this, _handleUploadError_initializers, (errors) => {
                if (errors.length === 1) {
                    this.errors.push(errors[0].detail || errors[0].title || (0, utils_1.translate)('sulu_media.upload_server_error'));
                }
                else {
                    this.errors.push((0, utils_1.translate)('sulu_media.upload_server_error'));
                }
            }));
            this.handleUploadOverlayOpen = (__runInitializers(this, _handleUploadError_extraInitializers), __runInitializers(this, _handleUploadOverlayOpen_initializers, () => {
                this.showMediaUploadOverlay = true;
            }));
            this.handleUploadOverlayClose = (__runInitializers(this, _handleUploadOverlayOpen_extraInitializers), __runInitializers(this, _handleUploadOverlayClose_initializers, () => {
                this.showMediaUploadOverlay = false;
            }));
            this.handleMediaNavigate = (__runInitializers(this, _handleUploadOverlayClose_extraInitializers), (mediaId) => {
                const { router } = this.props;
                router.navigate(MEDIA_ROUTE, {
                    id: mediaId,
                    locale: this.locale.get(),
                });
            });
            this.setMediaListRef = (mediaList) => {
                this.mediaList = mediaList;
            };
            this.handleMoveMediaOverlayClose = __runInitializers(this, _handleMoveMediaOverlayClose_initializers, () => {
                this.showMediaMoveOverlay = false;
            });
            this.handleMoveMediaOverlayConfirm = (__runInitializers(this, _handleMoveMediaOverlayClose_extraInitializers), __runInitializers(this, _handleMoveMediaOverlayConfirm_initializers, (collection) => {
                this.mediaMoving = true;
                this.mediaListStore.moveSelection(collection.id).then((0, mobx_1.action)(() => {
                    this.collectionListStore.reload();
                    this.showMediaMoveOverlay = false;
                    this.mediaMoving = false;
                }));
            }));
            this.handleDeleteError = (__runInitializers(this, _handleMoveMediaOverlayConfirm_extraInitializers), __runInitializers(this, _handleDeleteError_initializers, (error) => {
                const message = (error === null || error === void 0 ? void 0 : error.detail) || (error === null || error === void 0 ? void 0 : error.title) || (0, utils_1.translate)('sulu_admin.unexpected_delete_server_error');
                this.errors.push(message);
            }));
            __runInitializers(this, _handleDeleteError_extraInitializers);
            const { router } = this.props;
            this.mediaPage.set(1);
            router.bind('collectionPage', this.collectionPage, 1);
            router.bind('mediaPage', this.mediaPage, 1);
            router.bind('locale', this.locale);
            router.bind('id', this.collectionId);
            this.disposer = (0, mobx_1.autorun)(this.createCollectionStore);
            this.createCollectionListStore();
            this.createMediaListStore();
            router.bind('search', this.mediaListStore.searchTerm);
            router.bind('collectionLimit', this.collectionListStore.limit, 10);
            router.bind('mediaFilter', this.mediaListStore.filterOptions, {});
            router.bind('mediaLimit', this.mediaListStore.limit, 10);
            router.bind('mediaSortColumn', this.mediaListStore.sortColumn);
            router.bind('mediaSortOrder', this.mediaListStore.sortOrder);
        }
        componentWillUnmount() {
            this.mediaListStore.destroy();
            this.collectionListStore.destroy();
            this.collectionStore.destroy();
            this.disposer();
        }
        setCollectionStore(collectionStore) {
            if (this.collectionStore) {
                this.collectionStore.destroy();
            }
            this.collectionStore = collectionStore;
        }
        createMediaListStore() {
            const options = {};
            options.fields = [
                'id',
                'type',
                'name',
                'size',
                'title',
                'mimeType',
                'subVersion',
                'thumbnails',
            ].join(',');
            this.mediaListStore = new containers_1.ListStore(MEDIA_RESOURCE_KEY, MEDIA_RESOURCE_KEY, USER_SETTINGS_KEY, {
                page: this.mediaPage,
                locale: this.locale,
                collection: this.collectionId,
            }, options);
        }
        clearLists() {
            this.mediaListStore.clear();
            this.mediaListStore.clearSelection();
            this.collectionListStore.clear();
            this.collectionListStore.clearSelection();
        }
        render() {
            return (<>
                <MediaCollection_1.default className={mediaOverview_scss_1.default.mediaCollection} collectionListStore={this.collectionListStore} collectionStore={this.collectionStore} hideUploadAction={true} locale={this.locale} mediaListAdapters={['media_card_overview', 'table']} mediaListRef={this.setMediaListRef} mediaListStore={this.mediaListStore} onCollectionNavigate={this.handleCollectionNavigate} onDeleteError={this.handleDeleteError} onMediaNavigate={this.handleMediaNavigate} onUploadError={this.handleUploadError} onUploadOverlayClose={this.handleUploadOverlayClose} onUploadOverlayOpen={this.handleUploadOverlayOpen} uploadOverlayOpen={this.showMediaUploadOverlay}/>
                <containers_1.SingleListOverlay adapter="column_list" clearSelectionOnClose={true} confirmLoading={this.mediaMoving} disabledIds={this.collectionStore.id ? [this.collectionStore.id] : []} itemDisabledCondition="!!locked" listKey={COLLECTIONS_RESOURCE_KEY} locale={this.locale} onClose={this.handleMoveMediaOverlayClose} onConfirm={this.handleMoveMediaOverlayConfirm} open={this.showMediaMoveOverlay} resourceKey={COLLECTIONS_RESOURCE_KEY} title={(0, utils_1.translate)('sulu_media.move_media')}/>
            </>);
        }
    };
    __setFunctionName(_classThis, "MediaOverview");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _errors_decorators = [mobx_1.observable];
        _mediaListStore_decorators = [mobx_1.observable];
        _collectionListStore_decorators = [mobx_1.observable];
        _collectionStore_decorators = [mobx_1.observable];
        _showMediaMoveOverlay_decorators = [mobx_1.observable];
        _showMediaUploadOverlay_decorators = [mobx_1.observable];
        _mediaMoving_decorators = [mobx_1.observable];
        _setCollectionStore_decorators = [mobx_1.action];
        _handleCollectionNavigate_decorators = [mobx_1.action];
        _handleUploadError_decorators = [mobx_1.action];
        _handleUploadOverlayOpen_decorators = [mobx_1.action];
        _handleUploadOverlayClose_decorators = [mobx_1.action];
        _handleMoveMediaOverlayClose_decorators = [mobx_1.action];
        _handleMoveMediaOverlayConfirm_decorators = [mobx_1.action];
        _handleDeleteError_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setCollectionStore_decorators, { kind: "method", name: "setCollectionStore", static: false, private: false, access: { has: obj => "setCollectionStore" in obj, get: obj => obj.setCollectionStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: obj => "errors" in obj, get: obj => obj.errors, set: (obj, value) => { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
        __esDecorate(null, null, _mediaListStore_decorators, { kind: "field", name: "mediaListStore", static: false, private: false, access: { has: obj => "mediaListStore" in obj, get: obj => obj.mediaListStore, set: (obj, value) => { obj.mediaListStore = value; } }, metadata: _metadata }, _mediaListStore_initializers, _mediaListStore_extraInitializers);
        __esDecorate(null, null, _collectionListStore_decorators, { kind: "field", name: "collectionListStore", static: false, private: false, access: { has: obj => "collectionListStore" in obj, get: obj => obj.collectionListStore, set: (obj, value) => { obj.collectionListStore = value; } }, metadata: _metadata }, _collectionListStore_initializers, _collectionListStore_extraInitializers);
        __esDecorate(null, null, _collectionStore_decorators, { kind: "field", name: "collectionStore", static: false, private: false, access: { has: obj => "collectionStore" in obj, get: obj => obj.collectionStore, set: (obj, value) => { obj.collectionStore = value; } }, metadata: _metadata }, _collectionStore_initializers, _collectionStore_extraInitializers);
        __esDecorate(null, null, _showMediaMoveOverlay_decorators, { kind: "field", name: "showMediaMoveOverlay", static: false, private: false, access: { has: obj => "showMediaMoveOverlay" in obj, get: obj => obj.showMediaMoveOverlay, set: (obj, value) => { obj.showMediaMoveOverlay = value; } }, metadata: _metadata }, _showMediaMoveOverlay_initializers, _showMediaMoveOverlay_extraInitializers);
        __esDecorate(null, null, _showMediaUploadOverlay_decorators, { kind: "field", name: "showMediaUploadOverlay", static: false, private: false, access: { has: obj => "showMediaUploadOverlay" in obj, get: obj => obj.showMediaUploadOverlay, set: (obj, value) => { obj.showMediaUploadOverlay = value; } }, metadata: _metadata }, _showMediaUploadOverlay_initializers, _showMediaUploadOverlay_extraInitializers);
        __esDecorate(null, null, _mediaMoving_decorators, { kind: "field", name: "mediaMoving", static: false, private: false, access: { has: obj => "mediaMoving" in obj, get: obj => obj.mediaMoving, set: (obj, value) => { obj.mediaMoving = value; } }, metadata: _metadata }, _mediaMoving_initializers, _mediaMoving_extraInitializers);
        __esDecorate(null, null, _handleCollectionNavigate_decorators, { kind: "field", name: "handleCollectionNavigate", static: false, private: false, access: { has: obj => "handleCollectionNavigate" in obj, get: obj => obj.handleCollectionNavigate, set: (obj, value) => { obj.handleCollectionNavigate = value; } }, metadata: _metadata }, _handleCollectionNavigate_initializers, _handleCollectionNavigate_extraInitializers);
        __esDecorate(null, null, _handleUploadError_decorators, { kind: "field", name: "handleUploadError", static: false, private: false, access: { has: obj => "handleUploadError" in obj, get: obj => obj.handleUploadError, set: (obj, value) => { obj.handleUploadError = value; } }, metadata: _metadata }, _handleUploadError_initializers, _handleUploadError_extraInitializers);
        __esDecorate(null, null, _handleUploadOverlayOpen_decorators, { kind: "field", name: "handleUploadOverlayOpen", static: false, private: false, access: { has: obj => "handleUploadOverlayOpen" in obj, get: obj => obj.handleUploadOverlayOpen, set: (obj, value) => { obj.handleUploadOverlayOpen = value; } }, metadata: _metadata }, _handleUploadOverlayOpen_initializers, _handleUploadOverlayOpen_extraInitializers);
        __esDecorate(null, null, _handleUploadOverlayClose_decorators, { kind: "field", name: "handleUploadOverlayClose", static: false, private: false, access: { has: obj => "handleUploadOverlayClose" in obj, get: obj => obj.handleUploadOverlayClose, set: (obj, value) => { obj.handleUploadOverlayClose = value; } }, metadata: _metadata }, _handleUploadOverlayClose_initializers, _handleUploadOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleMoveMediaOverlayClose_decorators, { kind: "field", name: "handleMoveMediaOverlayClose", static: false, private: false, access: { has: obj => "handleMoveMediaOverlayClose" in obj, get: obj => obj.handleMoveMediaOverlayClose, set: (obj, value) => { obj.handleMoveMediaOverlayClose = value; } }, metadata: _metadata }, _handleMoveMediaOverlayClose_initializers, _handleMoveMediaOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleMoveMediaOverlayConfirm_decorators, { kind: "field", name: "handleMoveMediaOverlayConfirm", static: false, private: false, access: { has: obj => "handleMoveMediaOverlayConfirm" in obj, get: obj => obj.handleMoveMediaOverlayConfirm, set: (obj, value) => { obj.handleMoveMediaOverlayConfirm = value; } }, metadata: _metadata }, _handleMoveMediaOverlayConfirm_initializers, _handleMoveMediaOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleDeleteError_decorators, { kind: "field", name: "handleDeleteError", static: false, private: false, access: { has: obj => "handleDeleteError" in obj, get: obj => obj.handleDeleteError, set: (obj, value) => { obj.handleDeleteError = value; } }, metadata: _metadata }, _handleDeleteError_initializers, _handleDeleteError_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaOverview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.remountViewOnLogin = true;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaOverview = _classThis;
})();
exports.default = (0, containers_1.withToolbar)(MediaOverview, function () {
    const errors = this.errors;
    const router = this.props.router;
    const loading = this.collectionListStore.loading || this.mediaListStore.loading;
    const { route: { options: { locales, permissions: { add: routeAddPermission, delete: routeDeletePermission, edit: routeEditPermission, }, }, }, } = this.props.router;
    const locale = locales
        ? {
            value: this.locale.get(),
            onChange: (0, mobx_1.action)((locale) => {
                this.locale.set(locale);
            }),
            options: locales.map((locale) => ({
                value: locale,
                label: locale,
            })),
        }
        : undefined;
    const items = [];
    const { permissions: collectionPermissions = {}, loading: collectionLoading, locked: collectionLocked, } = this.collectionStore;
    const addPermission = collectionPermissions.add !== undefined ? collectionPermissions.add : routeAddPermission;
    const deletePermission = collectionPermissions.delete !== undefined
        ? collectionPermissions.delete
        : routeDeletePermission;
    const editPermission = collectionPermissions.edit !== undefined ? collectionPermissions.edit : routeEditPermission;
    if (!collectionLocked && addPermission) {
        items.push({
            disabled: collectionLoading,
            icon: 'su-upload',
            label: (0, utils_1.translate)('sulu_media.upload_file'),
            onClick: (0, mobx_1.action)(() => {
                this.showMediaUploadOverlay = true;
            }),
            type: 'button',
        });
    }
    if (deletePermission) {
        items.push({
            disabled: this.mediaListStore.selectionIds.length === 0,
            icon: 'su-trash-alt',
            label: (0, utils_1.translate)('sulu_admin.delete_selected'),
            loading: this.mediaListStore.deletingSelection,
            onClick: this.mediaList.requestSelectionDelete,
            type: 'button',
        });
    }
    if (!collectionLocked && editPermission) {
        items.push({
            disabled: this.mediaListStore.selectionIds.length === 0,
            icon: 'su-arrows-alt',
            label: (0, utils_1.translate)('sulu_admin.move_selected'),
            onClick: (0, mobx_1.action)(() => {
                this.showMediaMoveOverlay = true;
            }),
            type: 'button',
        });
    }
    return {
        locale,
        disableAll: loading,
        backButton: this.collectionId.get()
            ? {
                onClick: () => {
                    this.clearLists();
                    router.restore(COLLECTION_ROUTE, {
                        id: this.collectionStore.parentId,
                        locale: this.locale.get(),
                        collectionPage: '1',
                    });
                },
            }
            : undefined,
        items,
        errors,
    };
});
