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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const containers_1 = require("sulu-admin-bundle/containers");
const Translator_1 = require("sulu-admin-bundle/utils/Translator");
const classnames_1 = __importDefault(require("classnames"));
const MediaUploadStore_1 = __importDefault(require("../../stores/MediaUploadStore"));
const MediaItem_1 = __importDefault(require("./MediaItem"));
const DropzoneOverlay_1 = __importDefault(require("./DropzoneOverlay"));
const dropzone_scss_1 = __importDefault(require("./dropzone.scss"));
const COLLECTIONS_RESOURCE_KEY = 'collections';
let MultiMediaDropzone = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _filesScheduledForUpload_decorators;
    let _filesScheduledForUpload_initializers = [];
    let _filesScheduledForUpload_extraInitializers = [];
    let _mediaUploadStores_decorators;
    let _mediaUploadStores_initializers = [];
    let _mediaUploadStores_extraInitializers = [];
    let _addMediaUploadStore_decorators;
    let _destroyMediaUploadStores_decorators;
    let _handleDrop_decorators;
    let _handleDrop_initializers = [];
    let _handleDrop_extraInitializers = [];
    let _handleSelectCollectionOverlayClose_decorators;
    let _handleSelectCollectionOverlayClose_initializers = [];
    let _handleSelectCollectionOverlayClose_extraInitializers = [];
    let _handleSelectCollectionOverlayConfirm_decorators;
    let _handleSelectCollectionOverlayConfirm_initializers = [];
    let _handleSelectCollectionOverlayConfirm_extraInitializers = [];
    var MultiMediaDropzone = _classThis = class extends _classSuper {
        addMediaUploadStore(mediaUploadStore) {
            this.mediaUploadStores.push(mediaUploadStore);
        }
        destroyMediaUploadStores() {
            this.mediaUploadStores = [];
        }
        createMediaItems() {
            return this.mediaUploadStores.map((mediaUploadStore, index) => (<MediaItem_1.default key={index} store={mediaUploadStore}/>));
        }
        render() {
            const { accept, children, className, disabled, locale, open } = this.props;
            const dropzoneClass = (0, classnames_1.default)(dropzone_scss_1.default.dropzone, className);
            return (<>
                <react_dropzone_1.default accept={accept ? { [accept]: [] } : undefined} disabled={disabled} noClick={true} onDragEnter={this.handleDragEnter} onDrop={this.handleDrop} ref={this.setDropzoneRef} style={{}} // to disable default style
            >
                    {({ getInputProps, getRootProps }) => (<mobx_react_1.Observer>
                            {() => (<div {...getRootProps({ className: dropzoneClass })}>
                                    {children}
                                    <input {...getInputProps()}/>
                                    <DropzoneOverlay_1.default onClick={this.handleDropzoneOverlayClick} onClose={this.handleDropzoneOverlayClose} onDragLeave={this.handleDragLeave} open={open}>
                                        {this.createMediaItems()}
                                    </DropzoneOverlay_1.default>
                                </div>)}
                        </mobx_react_1.Observer>)}
                </react_dropzone_1.default>
                <containers_1.SingleListOverlay adapter="column_list" clearSelectionOnClose={true} itemDisabledCondition="!!locked || (_permissions && !_permissions.add)" listKey={COLLECTIONS_RESOURCE_KEY} locale={locale} onClose={this.handleSelectCollectionOverlayClose} onConfirm={this.handleSelectCollectionOverlayConfirm} open={this.filesScheduledForUpload.length > 0} resourceKey={COLLECTIONS_RESOURCE_KEY} title={(0, Translator_1.translate)('sulu_media.select_collection_for_upload')}/>
            </>);
        }
        constructor() {
            super(...arguments);
            this.dropzoneRef = __runInitializers(this, _instanceExtraInitializers);
            this.filesScheduledForUpload = __runInitializers(this, _filesScheduledForUpload_initializers, []);
            this.mediaUploadStores = (__runInitializers(this, _filesScheduledForUpload_extraInitializers), __runInitializers(this, _mediaUploadStores_initializers, []));
            this.setDropzoneRef = (__runInitializers(this, _mediaUploadStores_extraInitializers), (ref) => {
                this.dropzoneRef = ref;
            });
            this.uploadFiles = (files, collectionId) => {
                const { locale, onClose, onUpload, onUploadError, } = this.props;
                const uploadPromises = [];
                files.forEach((file) => {
                    const mediaUploadStore = new MediaUploadStore_1.default(undefined, locale);
                    const uploadPromise = mediaUploadStore.create(collectionId, file);
                    uploadPromises.push(uploadPromise);
                    this.addMediaUploadStore(mediaUploadStore);
                });
                return Promise.allSettled(uploadPromises).then((results) => {
                    const uploadedMedias = [];
                    const errorResponses = [];
                    results.forEach((result) => {
                        if (result.status === 'fulfilled') {
                            uploadedMedias.push(result.value);
                        }
                        else {
                            errorResponses.push(result.reason);
                        }
                    });
                    if (errorResponses.length === 0) {
                        onUpload(uploadedMedias);
                    }
                    else {
                        onUploadError(errorResponses);
                    }
                    setTimeout(() => {
                        onClose();
                        this.destroyMediaUploadStores();
                    }, 1000);
                });
            };
            this.handleDragEnter = () => {
                this.props.onOpen();
            };
            this.handleDragLeave = () => {
                this.props.onClose();
            };
            this.handleDropzoneOverlayClose = () => {
                this.props.onClose();
            };
            this.handleDrop = __runInitializers(this, _handleDrop_initializers, (files) => {
                const { collectionId } = this.props;
                if (collectionId) {
                    this.uploadFiles(files, collectionId);
                }
                else {
                    this.filesScheduledForUpload = files;
                }
            });
            this.handleDropzoneOverlayClick = (__runInitializers(this, _handleDrop_extraInitializers), () => {
                this.dropzoneRef.open();
            });
            this.handleSelectCollectionOverlayClose = __runInitializers(this, _handleSelectCollectionOverlayClose_initializers, () => {
                this.filesScheduledForUpload = [];
                this.props.onClose();
            });
            this.handleSelectCollectionOverlayConfirm = (__runInitializers(this, _handleSelectCollectionOverlayClose_extraInitializers), __runInitializers(this, _handleSelectCollectionOverlayConfirm_initializers, (collection) => {
                this.uploadFiles(this.filesScheduledForUpload, collection.id);
                this.filesScheduledForUpload = [];
            }));
            __runInitializers(this, _handleSelectCollectionOverlayConfirm_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MultiMediaDropzone");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _filesScheduledForUpload_decorators = [mobx_1.observable];
        _mediaUploadStores_decorators = [mobx_1.observable];
        _addMediaUploadStore_decorators = [mobx_1.action];
        _destroyMediaUploadStores_decorators = [mobx_1.action];
        _handleDrop_decorators = [mobx_1.action];
        _handleSelectCollectionOverlayClose_decorators = [mobx_1.action];
        _handleSelectCollectionOverlayConfirm_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _addMediaUploadStore_decorators, { kind: "method", name: "addMediaUploadStore", static: false, private: false, access: { has: obj => "addMediaUploadStore" in obj, get: obj => obj.addMediaUploadStore }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _destroyMediaUploadStores_decorators, { kind: "method", name: "destroyMediaUploadStores", static: false, private: false, access: { has: obj => "destroyMediaUploadStores" in obj, get: obj => obj.destroyMediaUploadStores }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _filesScheduledForUpload_decorators, { kind: "field", name: "filesScheduledForUpload", static: false, private: false, access: { has: obj => "filesScheduledForUpload" in obj, get: obj => obj.filesScheduledForUpload, set: (obj, value) => { obj.filesScheduledForUpload = value; } }, metadata: _metadata }, _filesScheduledForUpload_initializers, _filesScheduledForUpload_extraInitializers);
        __esDecorate(null, null, _mediaUploadStores_decorators, { kind: "field", name: "mediaUploadStores", static: false, private: false, access: { has: obj => "mediaUploadStores" in obj, get: obj => obj.mediaUploadStores, set: (obj, value) => { obj.mediaUploadStores = value; } }, metadata: _metadata }, _mediaUploadStores_initializers, _mediaUploadStores_extraInitializers);
        __esDecorate(null, null, _handleDrop_decorators, { kind: "field", name: "handleDrop", static: false, private: false, access: { has: obj => "handleDrop" in obj, get: obj => obj.handleDrop, set: (obj, value) => { obj.handleDrop = value; } }, metadata: _metadata }, _handleDrop_initializers, _handleDrop_extraInitializers);
        __esDecorate(null, null, _handleSelectCollectionOverlayClose_decorators, { kind: "field", name: "handleSelectCollectionOverlayClose", static: false, private: false, access: { has: obj => "handleSelectCollectionOverlayClose" in obj, get: obj => obj.handleSelectCollectionOverlayClose, set: (obj, value) => { obj.handleSelectCollectionOverlayClose = value; } }, metadata: _metadata }, _handleSelectCollectionOverlayClose_initializers, _handleSelectCollectionOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleSelectCollectionOverlayConfirm_decorators, { kind: "field", name: "handleSelectCollectionOverlayConfirm", static: false, private: false, access: { has: obj => "handleSelectCollectionOverlayConfirm" in obj, get: obj => obj.handleSelectCollectionOverlayConfirm, set: (obj, value) => { obj.handleSelectCollectionOverlayConfirm = value; } }, metadata: _metadata }, _handleSelectCollectionOverlayConfirm_initializers, _handleSelectCollectionOverlayConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiMediaDropzone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        accept: undefined,
        disabled: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiMediaDropzone = _classThis;
})();
exports.default = MultiMediaDropzone;
