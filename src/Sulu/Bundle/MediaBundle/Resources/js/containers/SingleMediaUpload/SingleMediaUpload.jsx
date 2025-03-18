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
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const SingleMediaDropzone_1 = __importDefault(require("../../components/SingleMediaDropzone"));
const singleMediaUpload_scss_1 = __importDefault(require("./singleMediaUpload.scss"));
let SingleMediaUpload = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _showDeleteDialog_decorators;
    let _showDeleteDialog_initializers = [];
    let _showDeleteDialog_extraInitializers = [];
    let _deleting_decorators;
    let _deleting_initializers = [];
    let _deleting_extraInitializers = [];
    let _get_errorMessage_decorators;
    let _handleDownloadMediaClick_decorators;
    let _handleDownloadMediaClick_initializers = [];
    let _handleDownloadMediaClick_extraInitializers = [];
    let _handleDeleteMediaClick_decorators;
    let _handleDeleteMediaClick_initializers = [];
    let _handleDeleteMediaClick_extraInitializers = [];
    let _handleDeleteDialogCancelClick_decorators;
    let _handleDeleteDialogCancelClick_initializers = [];
    let _handleDeleteDialogCancelClick_extraInitializers = [];
    let _handleDeleteDialogConfirmClick_decorators;
    let _handleDeleteDialogConfirmClick_initializers = [];
    let _handleDeleteDialogConfirmClick_extraInitializers = [];
    var SingleMediaUpload = _classThis = class extends _classSuper {
        get errorMessage() {
            const error = this.props.mediaUploadStore.error;
            if (!error) {
                return undefined;
            }
            return error.detail || error.title || (0, utils_1.translate)('sulu_media.upload_server_error');
        }
        constructor(props) {
            super(props);
            this.showDeleteDialog = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _showDeleteDialog_initializers, false));
            this.deleting = (__runInitializers(this, _showDeleteDialog_extraInitializers), __runInitializers(this, _deleting_initializers, false));
            this.handleMediaDrop = (__runInitializers(this, _deleting_extraInitializers), (file) => {
                const { collectionId, mediaUploadStore, } = this.props;
                if (mediaUploadStore.id) {
                    mediaUploadStore.update(file)
                        .then(this.callUploadComplete);
                }
                else if (collectionId) {
                    mediaUploadStore.create(collectionId, file)
                        .then(this.callUploadComplete);
                }
            });
            this.handleDownloadMediaClick = __runInitializers(this, _handleDownloadMediaClick_initializers, () => {
                window.location.assign(this.props.mediaUploadStore.downloadUrl);
            });
            this.handleDeleteMediaClick = (__runInitializers(this, _handleDownloadMediaClick_extraInitializers), __runInitializers(this, _handleDeleteMediaClick_initializers, () => {
                this.showDeleteDialog = true;
            }));
            this.handleDeleteDialogCancelClick = (__runInitializers(this, _handleDeleteMediaClick_extraInitializers), __runInitializers(this, _handleDeleteDialogCancelClick_initializers, () => {
                this.showDeleteDialog = false;
            }));
            this.handleDeleteDialogConfirmClick = (__runInitializers(this, _handleDeleteDialogCancelClick_extraInitializers), __runInitializers(this, _handleDeleteDialogConfirmClick_initializers, () => {
                this.deleting = true;
                this.props.mediaUploadStore.delete()
                    .then((0, mobx_1.action)((media) => {
                    this.callUploadComplete(media);
                    this.deleting = false;
                    this.showDeleteDialog = false;
                }));
            }));
            this.callUploadComplete = (__runInitializers(this, _handleDeleteDialogConfirmClick_extraInitializers), (media) => {
                const { onUploadComplete } = this.props;
                if (onUploadComplete) {
                    onUploadComplete(media);
                }
            });
            const { collectionId, mediaUploadStore, } = this.props;
            if (!mediaUploadStore.media && !collectionId) {
                throw new Error('If a new item is supposed to be uploaded a "collectionId" is required!');
            }
        }
        render() {
            const { deletable, disabled, downloadable, emptyIcon, mediaUploadStore, imageSize, skin, uploadText, } = this.props;
            const { mimeType, progress, uploading, } = mediaUploadStore;
            return (<react_1.Fragment>
                <SingleMediaDropzone_1.default disabled={disabled} emptyIcon={emptyIcon} errorText={this.errorMessage} image={mediaUploadStore.getThumbnail(imageSize)} mimeType={mimeType} onDrop={this.handleMediaDrop} progress={progress} skin={skin} uploading={uploading} uploadText={uploadText}/>
                {mediaUploadStore.id && !disabled &&
                    <div className={singleMediaUpload_scss_1.default.buttons}>
                        {downloadable &&
                            <components_1.Button icon="su-download" onClick={this.handleDownloadMediaClick} skin="link">
                                {(0, utils_1.translate)('sulu_media.download_media')}
                            </components_1.Button>}
                        {deletable &&
                            <components_1.Button icon="su-trash-alt" onClick={this.handleDeleteMediaClick} skin="link">
                                {(0, utils_1.translate)('sulu_media.delete_media')}
                            </components_1.Button>}
                    </div>}
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.deleting} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleDeleteDialogCancelClick} onConfirm={this.handleDeleteDialogConfirmClick} open={this.showDeleteDialog} title={(0, utils_1.translate)('sulu_media.delete_media_warning_title')}>
                    {(0, utils_1.translate)('sulu_media.delete_media_warning_text')}
                </components_1.Dialog>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "SingleMediaUpload");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showDeleteDialog_decorators = [mobx_1.observable];
        _deleting_decorators = [mobx_1.observable];
        _get_errorMessage_decorators = [mobx_1.computed];
        _handleDownloadMediaClick_decorators = [mobx_1.action];
        _handleDeleteMediaClick_decorators = [mobx_1.action];
        _handleDeleteDialogCancelClick_decorators = [mobx_1.action];
        _handleDeleteDialogConfirmClick_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_errorMessage_decorators, { kind: "getter", name: "errorMessage", static: false, private: false, access: { has: obj => "errorMessage" in obj, get: obj => obj.errorMessage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _showDeleteDialog_decorators, { kind: "field", name: "showDeleteDialog", static: false, private: false, access: { has: obj => "showDeleteDialog" in obj, get: obj => obj.showDeleteDialog, set: (obj, value) => { obj.showDeleteDialog = value; } }, metadata: _metadata }, _showDeleteDialog_initializers, _showDeleteDialog_extraInitializers);
        __esDecorate(null, null, _deleting_decorators, { kind: "field", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting, set: (obj, value) => { obj.deleting = value; } }, metadata: _metadata }, _deleting_initializers, _deleting_extraInitializers);
        __esDecorate(null, null, _handleDownloadMediaClick_decorators, { kind: "field", name: "handleDownloadMediaClick", static: false, private: false, access: { has: obj => "handleDownloadMediaClick" in obj, get: obj => obj.handleDownloadMediaClick, set: (obj, value) => { obj.handleDownloadMediaClick = value; } }, metadata: _metadata }, _handleDownloadMediaClick_initializers, _handleDownloadMediaClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteMediaClick_decorators, { kind: "field", name: "handleDeleteMediaClick", static: false, private: false, access: { has: obj => "handleDeleteMediaClick" in obj, get: obj => obj.handleDeleteMediaClick, set: (obj, value) => { obj.handleDeleteMediaClick = value; } }, metadata: _metadata }, _handleDeleteMediaClick_initializers, _handleDeleteMediaClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteDialogCancelClick_decorators, { kind: "field", name: "handleDeleteDialogCancelClick", static: false, private: false, access: { has: obj => "handleDeleteDialogCancelClick" in obj, get: obj => obj.handleDeleteDialogCancelClick, set: (obj, value) => { obj.handleDeleteDialogCancelClick = value; } }, metadata: _metadata }, _handleDeleteDialogCancelClick_initializers, _handleDeleteDialogCancelClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteDialogConfirmClick_decorators, { kind: "field", name: "handleDeleteDialogConfirmClick", static: false, private: false, access: { has: obj => "handleDeleteDialogConfirmClick" in obj, get: obj => obj.handleDeleteDialogConfirmClick, set: (obj, value) => { obj.handleDeleteDialogConfirmClick = value; } }, metadata: _metadata }, _handleDeleteDialogConfirmClick_initializers, _handleDeleteDialogConfirmClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SingleMediaUpload = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        deletable: true,
        disabled: false,
        downloadable: true,
        imageSize: 'sulu-400x400',
        skin: 'default',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SingleMediaUpload = _classThis;
})();
exports.default = SingleMediaUpload;
