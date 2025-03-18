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
const react_1 = __importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const MediaUploadStore_1 = __importDefault(require("../../stores/MediaUploadStore"));
const SingleMediaUpload_1 = __importDefault(require("../SingleMediaUpload"));
const CropOverlay_1 = __importDefault(require("./CropOverlay"));
const FocusPointOverlay_1 = __importDefault(require("./FocusPointOverlay"));
const mediaVersionUpload_scss_1 = __importDefault(require("./mediaVersionUpload.scss"));
let MediaVersionUpload = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _showFocusPointOverlay_decorators;
    let _showFocusPointOverlay_initializers = [];
    let _showFocusPointOverlay_extraInitializers = [];
    let _showCropOverlay_decorators;
    let _showCropOverlay_initializers = [];
    let _showCropOverlay_extraInitializers = [];
    let _showDeletePreviewDialog_decorators;
    let _showDeletePreviewDialog_initializers = [];
    let _showDeletePreviewDialog_extraInitializers = [];
    let _deletingPreview_decorators;
    let _deletingPreview_initializers = [];
    let _deletingPreview_extraInitializers = [];
    let _handleDeletePreviewClick_decorators;
    let _handleDeletePreviewClick_initializers = [];
    let _handleDeletePreviewClick_extraInitializers = [];
    let _handleDeletePreviewConfirm_decorators;
    let _handleDeletePreviewConfirm_initializers = [];
    let _handleDeletePreviewConfirm_extraInitializers = [];
    let _handleDeletePreviewCancel_decorators;
    let _handleDeletePreviewCancel_initializers = [];
    let _handleDeletePreviewCancel_extraInitializers = [];
    let _handleCropButtonClick_decorators;
    let _handleCropButtonClick_initializers = [];
    let _handleCropButtonClick_extraInitializers = [];
    let _handleCropOverlayClose_decorators;
    let _handleCropOverlayClose_initializers = [];
    let _handleCropOverlayClose_extraInitializers = [];
    let _handleCropOverlayConfirm_decorators;
    let _handleCropOverlayConfirm_initializers = [];
    let _handleCropOverlayConfirm_extraInitializers = [];
    let _handleFocusPointButtonClick_decorators;
    let _handleFocusPointButtonClick_initializers = [];
    let _handleFocusPointButtonClick_extraInitializers = [];
    let _handleFocusPointOverlayClose_decorators;
    let _handleFocusPointOverlayClose_initializers = [];
    let _handleFocusPointOverlayClose_extraInitializers = [];
    let _handleFocusPointOverlayConfirm_decorators;
    let _handleFocusPointOverlayConfirm_initializers = [];
    let _handleFocusPointOverlayConfirm_extraInitializers = [];
    var MediaVersionUpload = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.showFocusPointOverlay = __runInitializers(this, _showFocusPointOverlay_initializers, false);
            this.showCropOverlay = (__runInitializers(this, _showFocusPointOverlay_extraInitializers), __runInitializers(this, _showCropOverlay_initializers, false));
            this.showDeletePreviewDialog = (__runInitializers(this, _showCropOverlay_extraInitializers), __runInitializers(this, _showDeletePreviewDialog_initializers, false));
            this.deletingPreview = (__runInitializers(this, _showDeletePreviewDialog_extraInitializers), __runInitializers(this, _deletingPreview_initializers, false));
            this.handleUploadComplete = (__runInitializers(this, _deletingPreview_extraInitializers), (media) => {
                this.props.resourceStore.setMultiple(media);
                this.callSuccess();
            });
            this.handlePreviewUploadClick = (file) => {
                this.mediaUploadStore.updatePreviewImage(file).then(this.callSuccess);
            };
            this.handleDeletePreviewClick = __runInitializers(this, _handleDeletePreviewClick_initializers, () => {
                this.showDeletePreviewDialog = true;
            });
            this.handleDeletePreviewConfirm = (__runInitializers(this, _handleDeletePreviewClick_extraInitializers), __runInitializers(this, _handleDeletePreviewConfirm_initializers, () => {
                this.deletingPreview = true;
                this.mediaUploadStore.deletePreviewImage().then((0, mobx_1.action)(() => {
                    this.deletingPreview = false;
                    this.showDeletePreviewDialog = false;
                    this.callSuccess();
                }));
            }));
            this.handleDeletePreviewCancel = (__runInitializers(this, _handleDeletePreviewConfirm_extraInitializers), __runInitializers(this, _handleDeletePreviewCancel_initializers, () => {
                this.showDeletePreviewDialog = false;
            }));
            this.callSuccess = (__runInitializers(this, _handleDeletePreviewCancel_extraInitializers), () => {
                const { onSuccess } = this.props;
                if (onSuccess) {
                    onSuccess();
                }
            });
            this.handleCropButtonClick = __runInitializers(this, _handleCropButtonClick_initializers, () => {
                this.showCropOverlay = true;
            });
            this.handleCropOverlayClose = (__runInitializers(this, _handleCropButtonClick_extraInitializers), __runInitializers(this, _handleCropOverlayClose_initializers, () => {
                this.showCropOverlay = false;
            }));
            this.handleCropOverlayConfirm = (__runInitializers(this, _handleCropOverlayClose_extraInitializers), __runInitializers(this, _handleCropOverlayConfirm_initializers, () => {
                this.showCropOverlay = false;
                this.callSuccess();
            }));
            this.handleFocusPointButtonClick = (__runInitializers(this, _handleCropOverlayConfirm_extraInitializers), __runInitializers(this, _handleFocusPointButtonClick_initializers, () => {
                this.showFocusPointOverlay = true;
            }));
            this.handleFocusPointOverlayClose = (__runInitializers(this, _handleFocusPointButtonClick_extraInitializers), __runInitializers(this, _handleFocusPointOverlayClose_initializers, () => {
                this.showFocusPointOverlay = false;
            }));
            this.handleFocusPointOverlayConfirm = (__runInitializers(this, _handleFocusPointOverlayClose_extraInitializers), __runInitializers(this, _handleFocusPointOverlayConfirm_initializers, () => {
                this.showFocusPointOverlay = false;
                this.callSuccess();
            }));
            __runInitializers(this, _handleFocusPointOverlayConfirm_extraInitializers);
            const { resourceStore } = this.props;
            const locale = resourceStore.locale;
            if (!locale) {
                throw new Error('The resourceStore for the MediaVersionUpload must have a locale');
            }
            (0, mobx_1.when)(() => !resourceStore.loading, () => {
                this.mediaUploadStore = new MediaUploadStore_1.default(resourceStore.data, locale);
            });
        }
        render() {
            if (!this.mediaUploadStore) {
                return null;
            }
            const { resourceStore } = this.props;
            const { data: { adminUrl, previewImageId, isImage, url, }, id, locale, } = resourceStore;
            if (!id) {
                return null;
            }
            if (!locale) {
                throw new Error('The "MediaVersionUpload" field type only works with a locale!');
            }
            return (<react_1.Fragment>
                <SingleMediaUpload_1.default deletable={false} downloadable={false} imageSize="sulu-400x400-inset" mediaUploadStore={this.mediaUploadStore} onUploadComplete={this.handleUploadComplete} uploadText={(0, utils_1.translate)('sulu_media.upload_new_version')}/>
                <div className={mediaVersionUpload_scss_1.default.buttons}>
                    {isImage &&
                    <react_1.Fragment>
                            <components_1.Button icon="su-focus" onClick={this.handleFocusPointButtonClick} skin="link">
                                {(0, utils_1.translate)('sulu_media.set_focus_point')}
                            </components_1.Button>
                            <components_1.Button icon="su-cut" onClick={this.handleCropButtonClick} skin="link">
                                {(0, utils_1.translate)('sulu_media.define_crops')}
                            </components_1.Button>
                        </react_1.Fragment>}
                    {!isImage &&
                    <react_1.Fragment>
                            <components_1.FileUploadButton icon="su-image" onUpload={this.handlePreviewUploadClick} skin="link">
                                {(0, utils_1.translate)('sulu_media.upload_preview_image')}
                            </components_1.FileUploadButton>
                            <components_1.Button disabled={!previewImageId} icon="su-trash-alt" onClick={this.handleDeletePreviewClick} skin="link">
                                {(0, utils_1.translate)('sulu_media.delete_preview_image')}
                            </components_1.Button>
                        </react_1.Fragment>}
                </div>
                <FocusPointOverlay_1.default onClose={this.handleFocusPointOverlayClose} onConfirm={this.handleFocusPointOverlayConfirm} open={this.showFocusPointOverlay} resourceStore={resourceStore}/>
                <CropOverlay_1.default id={id} image={adminUrl ? adminUrl : url} locale={locale.get()} onClose={this.handleCropOverlayClose} onConfirm={this.handleCropOverlayConfirm} open={this.showCropOverlay}/>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.deletingPreview} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleDeletePreviewCancel} onConfirm={this.handleDeletePreviewConfirm} open={this.showDeletePreviewDialog} title={(0, utils_1.translate)('sulu_media.delete_preview_image_warning_title')}>
                    {(0, utils_1.translate)('sulu_media.delete_preview_image_warning_text')}
                </components_1.Dialog>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "MediaVersionUpload");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showFocusPointOverlay_decorators = [mobx_1.observable];
        _showCropOverlay_decorators = [mobx_1.observable];
        _showDeletePreviewDialog_decorators = [mobx_1.observable];
        _deletingPreview_decorators = [mobx_1.observable];
        _handleDeletePreviewClick_decorators = [mobx_1.action];
        _handleDeletePreviewConfirm_decorators = [mobx_1.action];
        _handleDeletePreviewCancel_decorators = [mobx_1.action];
        _handleCropButtonClick_decorators = [mobx_1.action];
        _handleCropOverlayClose_decorators = [mobx_1.action];
        _handleCropOverlayConfirm_decorators = [mobx_1.action];
        _handleFocusPointButtonClick_decorators = [mobx_1.action];
        _handleFocusPointOverlayClose_decorators = [mobx_1.action];
        _handleFocusPointOverlayConfirm_decorators = [mobx_1.action];
        __esDecorate(null, null, _showFocusPointOverlay_decorators, { kind: "field", name: "showFocusPointOverlay", static: false, private: false, access: { has: obj => "showFocusPointOverlay" in obj, get: obj => obj.showFocusPointOverlay, set: (obj, value) => { obj.showFocusPointOverlay = value; } }, metadata: _metadata }, _showFocusPointOverlay_initializers, _showFocusPointOverlay_extraInitializers);
        __esDecorate(null, null, _showCropOverlay_decorators, { kind: "field", name: "showCropOverlay", static: false, private: false, access: { has: obj => "showCropOverlay" in obj, get: obj => obj.showCropOverlay, set: (obj, value) => { obj.showCropOverlay = value; } }, metadata: _metadata }, _showCropOverlay_initializers, _showCropOverlay_extraInitializers);
        __esDecorate(null, null, _showDeletePreviewDialog_decorators, { kind: "field", name: "showDeletePreviewDialog", static: false, private: false, access: { has: obj => "showDeletePreviewDialog" in obj, get: obj => obj.showDeletePreviewDialog, set: (obj, value) => { obj.showDeletePreviewDialog = value; } }, metadata: _metadata }, _showDeletePreviewDialog_initializers, _showDeletePreviewDialog_extraInitializers);
        __esDecorate(null, null, _deletingPreview_decorators, { kind: "field", name: "deletingPreview", static: false, private: false, access: { has: obj => "deletingPreview" in obj, get: obj => obj.deletingPreview, set: (obj, value) => { obj.deletingPreview = value; } }, metadata: _metadata }, _deletingPreview_initializers, _deletingPreview_extraInitializers);
        __esDecorate(null, null, _handleDeletePreviewClick_decorators, { kind: "field", name: "handleDeletePreviewClick", static: false, private: false, access: { has: obj => "handleDeletePreviewClick" in obj, get: obj => obj.handleDeletePreviewClick, set: (obj, value) => { obj.handleDeletePreviewClick = value; } }, metadata: _metadata }, _handleDeletePreviewClick_initializers, _handleDeletePreviewClick_extraInitializers);
        __esDecorate(null, null, _handleDeletePreviewConfirm_decorators, { kind: "field", name: "handleDeletePreviewConfirm", static: false, private: false, access: { has: obj => "handleDeletePreviewConfirm" in obj, get: obj => obj.handleDeletePreviewConfirm, set: (obj, value) => { obj.handleDeletePreviewConfirm = value; } }, metadata: _metadata }, _handleDeletePreviewConfirm_initializers, _handleDeletePreviewConfirm_extraInitializers);
        __esDecorate(null, null, _handleDeletePreviewCancel_decorators, { kind: "field", name: "handleDeletePreviewCancel", static: false, private: false, access: { has: obj => "handleDeletePreviewCancel" in obj, get: obj => obj.handleDeletePreviewCancel, set: (obj, value) => { obj.handleDeletePreviewCancel = value; } }, metadata: _metadata }, _handleDeletePreviewCancel_initializers, _handleDeletePreviewCancel_extraInitializers);
        __esDecorate(null, null, _handleCropButtonClick_decorators, { kind: "field", name: "handleCropButtonClick", static: false, private: false, access: { has: obj => "handleCropButtonClick" in obj, get: obj => obj.handleCropButtonClick, set: (obj, value) => { obj.handleCropButtonClick = value; } }, metadata: _metadata }, _handleCropButtonClick_initializers, _handleCropButtonClick_extraInitializers);
        __esDecorate(null, null, _handleCropOverlayClose_decorators, { kind: "field", name: "handleCropOverlayClose", static: false, private: false, access: { has: obj => "handleCropOverlayClose" in obj, get: obj => obj.handleCropOverlayClose, set: (obj, value) => { obj.handleCropOverlayClose = value; } }, metadata: _metadata }, _handleCropOverlayClose_initializers, _handleCropOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleCropOverlayConfirm_decorators, { kind: "field", name: "handleCropOverlayConfirm", static: false, private: false, access: { has: obj => "handleCropOverlayConfirm" in obj, get: obj => obj.handleCropOverlayConfirm, set: (obj, value) => { obj.handleCropOverlayConfirm = value; } }, metadata: _metadata }, _handleCropOverlayConfirm_initializers, _handleCropOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleFocusPointButtonClick_decorators, { kind: "field", name: "handleFocusPointButtonClick", static: false, private: false, access: { has: obj => "handleFocusPointButtonClick" in obj, get: obj => obj.handleFocusPointButtonClick, set: (obj, value) => { obj.handleFocusPointButtonClick = value; } }, metadata: _metadata }, _handleFocusPointButtonClick_initializers, _handleFocusPointButtonClick_extraInitializers);
        __esDecorate(null, null, _handleFocusPointOverlayClose_decorators, { kind: "field", name: "handleFocusPointOverlayClose", static: false, private: false, access: { has: obj => "handleFocusPointOverlayClose" in obj, get: obj => obj.handleFocusPointOverlayClose, set: (obj, value) => { obj.handleFocusPointOverlayClose = value; } }, metadata: _metadata }, _handleFocusPointOverlayClose_initializers, _handleFocusPointOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleFocusPointOverlayConfirm_decorators, { kind: "field", name: "handleFocusPointOverlayConfirm", static: false, private: false, access: { has: obj => "handleFocusPointOverlayConfirm" in obj, get: obj => obj.handleFocusPointOverlayConfirm, set: (obj, value) => { obj.handleFocusPointOverlayConfirm = value; } }, metadata: _metadata }, _handleFocusPointOverlayConfirm_initializers, _handleFocusPointOverlayConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaVersionUpload = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaVersionUpload = _classThis;
})();
exports.default = MediaVersionUpload;
