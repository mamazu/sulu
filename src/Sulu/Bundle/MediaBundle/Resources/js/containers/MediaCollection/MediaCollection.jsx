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
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const Translator_1 = require("sulu-admin-bundle/utils/Translator");
const MultiMediaDropzone_1 = __importDefault(require("../MultiMediaDropzone"));
const CollectionSection_1 = __importDefault(require("./CollectionSection"));
let MediaCollection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _handleUpload_decorators;
    let _handleUpload_initializers = [];
    let _handleUpload_extraInitializers = [];
    let _handleUploadError_decorators;
    let _handleUploadError_initializers = [];
    let _handleUploadError_extraInitializers = [];
    var MediaCollection = _classThis = class extends _classSuper {
        render() {
            const { onDeleteError, className, collectionListStore, collectionStore, hideUploadAction, locale, overlayType, mediaListAdapters, mediaListRef, mediaListStore, onMediaNavigate, onUploadOverlayClose, onUploadOverlayOpen, uploadOverlayOpen, } = this.props;
            const { locked, permissions } = collectionStore;
            const listActions = [];
            const addable = !locked && (permissions.add !== undefined ? permissions.add : MediaCollection.addable);
            const editable = !locked && (permissions.edit !== undefined ? permissions.edit : MediaCollection.editable);
            const deletable = !locked
                && (permissions.delete !== undefined ? permissions.delete : MediaCollection.deletable);
            const securable = !locked
                && (permissions.security !== undefined ? permissions.security : MediaCollection.securable);
            if (addable && !hideUploadAction) {
                listActions.push({
                    disabled: collectionStore.loading,
                    icon: 'su-upload',
                    label: (0, Translator_1.translate)('sulu_media.upload_file'),
                    onClick: onUploadOverlayOpen,
                });
            }
            return (<MultiMediaDropzone_1.default className={className} collectionId={collectionStore.id} disabled={collectionStore.loading || !addable} locale={locale} onClose={onUploadOverlayClose} onOpen={onUploadOverlayOpen} onUpload={this.handleUpload} onUploadError={this.handleUploadError} open={uploadOverlayOpen}>
                <CollectionSection_1.default addable={addable} deletable={deletable} editable={editable} listStore={collectionListStore} locale={locale} onCollectionNavigate={this.handleCollectionNavigate} onDeleteError={onDeleteError} overlayType={overlayType} resourceStore={collectionStore.resourceStore} securable={securable}/>
                <components_1.Divider />
                <containers_1.List actions={listActions} adapters={mediaListAdapters} onDeleteError={onDeleteError} onItemClick={onMediaNavigate} ref={mediaListRef} store={mediaListStore}/>
            </MultiMediaDropzone_1.default>);
        }
        constructor() {
            super(...arguments);
            this.handleCollectionNavigate = (collectionId) => {
                this.props.onCollectionNavigate(collectionId);
            };
            this.handleUpload = __runInitializers(this, _handleUpload_initializers, (media) => {
                const { mediaListStore } = this.props;
                mediaListStore.reload();
                (0, mobx_1.when)(() => !mediaListStore.loading, () => media.forEach((mediaItem) => mediaListStore.select(mediaItem)));
            });
            this.handleUploadError = (__runInitializers(this, _handleUpload_extraInitializers), __runInitializers(this, _handleUploadError_initializers, (errorResponses) => {
                const { mediaListStore, onUploadError } = this.props;
                if (onUploadError) {
                    onUploadError(errorResponses);
                }
                mediaListStore.reload();
            }));
            __runInitializers(this, _handleUploadError_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "MediaCollection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _handleUpload_decorators = [mobx_1.action];
        _handleUploadError_decorators = [mobx_1.action];
        __esDecorate(null, null, _handleUpload_decorators, { kind: "field", name: "handleUpload", static: false, private: false, access: { has: obj => "handleUpload" in obj, get: obj => obj.handleUpload, set: (obj, value) => { obj.handleUpload = value; } }, metadata: _metadata }, _handleUpload_initializers, _handleUpload_extraInitializers);
        __esDecorate(null, null, _handleUploadError_decorators, { kind: "field", name: "handleUploadError", static: false, private: false, access: { has: obj => "handleUploadError" in obj, get: obj => obj.handleUploadError, set: (obj, value) => { obj.handleUploadError = value; } }, metadata: _metadata }, _handleUploadError_initializers, _handleUploadError_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaCollection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        hideUploadAction: false,
        overlayType: 'overlay',
    };
    _classThis.addable = true;
    _classThis.deletable = true;
    _classThis.editable = true;
    _classThis.securable = true;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaCollection = _classThis;
})();
exports.default = MediaCollection;
