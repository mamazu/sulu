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
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const MediaCollection_1 = __importDefault(require("../MediaCollection"));
const CollectionStore_1 = __importDefault(require("../../stores/CollectionStore"));
const mediaSelectionOverlay_scss_1 = __importDefault(require("./mediaSelectionOverlay.scss"));
const MEDIA_RESOURCE_KEY = 'media';
const COLLECTIONS_RESOURCE_KEY = 'collections';
const USER_SETTINGS_KEY = 'media_selection_overlay';
let MediaSelectionOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _collectionStore_decorators;
    let _collectionStore_initializers = [];
    let _collectionStore_extraInitializers = [];
    let _showMediaUploadOverlay_decorators;
    let _showMediaUploadOverlay_initializers = [];
    let _showMediaUploadOverlay_extraInitializers = [];
    let _updateCollectionStore_decorators;
    let _handleCollectionNavigate_decorators;
    let _handleCollectionNavigate_initializers = [];
    let _handleCollectionNavigate_extraInitializers = [];
    let _handleUploadOverlayOpen_decorators;
    let _handleUploadOverlayOpen_initializers = [];
    let _handleUploadOverlayOpen_extraInitializers = [];
    let _handleUploadOverlayClose_decorators;
    let _handleUploadOverlayClose_initializers = [];
    let _handleUploadOverlayClose_extraInitializers = [];
    var MediaSelectionOverlay = _classThis = class extends _classSuper {
        static createCollectionListStore(collectionId, locale) {
            return new containers_1.ListStore(COLLECTIONS_RESOURCE_KEY, COLLECTIONS_RESOURCE_KEY, USER_SETTINGS_KEY, {
                page: mobx_1.observable.box(1),
                locale,
                parentId: collectionId,
            });
        }
        static createMediaListStore(collectionId, excludedIds, locale, types) {
            const options = {};
            options.limit = 50;
            options.fields = [
                'id',
                'type',
                'name',
                'size',
                'title',
                'mimeType',
                'subVersion',
                'thumbnails',
            ];
            if ((0, mobx_1.isArrayLike)(types) && types.length > 0) {
                options.types = types.join(',');
            }
            return new containers_1.ListStore(MEDIA_RESOURCE_KEY, MEDIA_RESOURCE_KEY, USER_SETTINGS_KEY, {
                page: mobx_1.observable.box(1),
                collection: collectionId,
                excludedIds,
                locale,
            }, options);
        }
        constructor(props) {
            super(props);
            this.collectionStore = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _collectionStore_initializers, void 0));
            this.showMediaUploadOverlay = (__runInitializers(this, _collectionStore_extraInitializers), __runInitializers(this, _showMediaUploadOverlay_initializers, false));
            this.updateCollectionStoreDisposer = __runInitializers(this, _showMediaUploadOverlay_extraInitializers);
            this.handleCollectionNavigate = __runInitializers(this, _handleCollectionNavigate_initializers, (collectionId) => {
                this.props.collectionId.set(collectionId);
                this.props.collectionListStore.clear();
                this.props.collectionListStore.setPage(1);
                this.props.mediaListStore.clear();
                this.props.mediaListStore.setPage(1);
            });
            this.handleUploadOverlayOpen = (__runInitializers(this, _handleCollectionNavigate_extraInitializers), __runInitializers(this, _handleUploadOverlayOpen_initializers, () => {
                this.showMediaUploadOverlay = true;
            }));
            this.handleUploadOverlayClose = (__runInitializers(this, _handleUploadOverlayOpen_extraInitializers), __runInitializers(this, _handleUploadOverlayClose_initializers, () => {
                this.showMediaUploadOverlay = false;
            }));
            this.handleClose = (__runInitializers(this, _handleUploadOverlayClose_extraInitializers), () => {
                this.props.onClose();
            });
            this.handleSelectionReset = () => {
                this.props.mediaListStore.clearSelection();
            };
            this.handleConfirm = () => {
                this.props.onConfirm(this.props.mediaListStore.selections);
            };
            this.updateCollectionStoreDisposer = (0, mobx_1.autorun)(() => this.updateCollectionStore(this.props.collectionId.get()));
        }
        componentDidUpdate(prevProps) {
            const { mediaListStore, open } = this.props;
            if (prevProps.open === true && open === false) {
                mediaListStore.clearSelection();
            }
        }
        componentWillUnmount() {
            if (this.collectionStore) {
                this.collectionStore.destroy();
            }
            if (this.updateCollectionStoreDisposer) {
                this.updateCollectionStoreDisposer();
            }
        }
        updateCollectionStore(collectionId) {
            if (this.collectionStore) {
                this.collectionStore.destroy();
            }
            this.collectionStore = new CollectionStore_1.default(collectionId, this.props.locale);
        }
        render() {
            const { collectionListStore, confirmLoading, mediaListStore, open, locale, } = this.props;
            const overlayActions = [{
                    title: (0, utils_1.translate)('sulu_media.reset_selection'),
                    onClick: this.handleSelectionReset,
                }];
            return (<components_1.Overlay actions={overlayActions} confirmDisabled={!mediaListStore.selections.length} confirmLoading={confirmLoading} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onClose={this.handleClose} onConfirm={this.handleConfirm} open={open} title={(0, utils_1.translate)('sulu_media.select_media_plural')}>
                <div className={mediaSelectionOverlay_scss_1.default.overlay}>
                    <MediaCollection_1.default collectionListStore={collectionListStore} collectionStore={this.collectionStore} locale={locale} mediaListAdapters={['media_card_selection', 'table']} mediaListStore={mediaListStore} onCollectionNavigate={this.handleCollectionNavigate} onUploadOverlayClose={this.handleUploadOverlayClose} onUploadOverlayOpen={this.handleUploadOverlayOpen} overlayType="dialog" uploadOverlayOpen={this.showMediaUploadOverlay}/>
                </div>
            </components_1.Overlay>);
        }
    };
    __setFunctionName(_classThis, "MediaSelectionOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _collectionStore_decorators = [mobx_1.observable];
        _showMediaUploadOverlay_decorators = [mobx_1.observable];
        _updateCollectionStore_decorators = [mobx_1.action];
        _handleCollectionNavigate_decorators = [mobx_1.action];
        _handleUploadOverlayOpen_decorators = [mobx_1.action];
        _handleUploadOverlayClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _updateCollectionStore_decorators, { kind: "method", name: "updateCollectionStore", static: false, private: false, access: { has: obj => "updateCollectionStore" in obj, get: obj => obj.updateCollectionStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _collectionStore_decorators, { kind: "field", name: "collectionStore", static: false, private: false, access: { has: obj => "collectionStore" in obj, get: obj => obj.collectionStore, set: (obj, value) => { obj.collectionStore = value; } }, metadata: _metadata }, _collectionStore_initializers, _collectionStore_extraInitializers);
        __esDecorate(null, null, _showMediaUploadOverlay_decorators, { kind: "field", name: "showMediaUploadOverlay", static: false, private: false, access: { has: obj => "showMediaUploadOverlay" in obj, get: obj => obj.showMediaUploadOverlay, set: (obj, value) => { obj.showMediaUploadOverlay = value; } }, metadata: _metadata }, _showMediaUploadOverlay_initializers, _showMediaUploadOverlay_extraInitializers);
        __esDecorate(null, null, _handleCollectionNavigate_decorators, { kind: "field", name: "handleCollectionNavigate", static: false, private: false, access: { has: obj => "handleCollectionNavigate" in obj, get: obj => obj.handleCollectionNavigate, set: (obj, value) => { obj.handleCollectionNavigate = value; } }, metadata: _metadata }, _handleCollectionNavigate_initializers, _handleCollectionNavigate_extraInitializers);
        __esDecorate(null, null, _handleUploadOverlayOpen_decorators, { kind: "field", name: "handleUploadOverlayOpen", static: false, private: false, access: { has: obj => "handleUploadOverlayOpen" in obj, get: obj => obj.handleUploadOverlayOpen, set: (obj, value) => { obj.handleUploadOverlayOpen = value; } }, metadata: _metadata }, _handleUploadOverlayOpen_initializers, _handleUploadOverlayOpen_extraInitializers);
        __esDecorate(null, null, _handleUploadOverlayClose_decorators, { kind: "field", name: "handleUploadOverlayClose", static: false, private: false, access: { has: obj => "handleUploadOverlayClose" in obj, get: obj => obj.handleUploadOverlayClose, set: (obj, value) => { obj.handleUploadOverlayClose = value; } }, metadata: _metadata }, _handleUploadOverlayClose_initializers, _handleUploadOverlayClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaSelectionOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        confirmLoading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaSelectionOverlay = _classThis;
})();
exports.default = MediaSelectionOverlay;
