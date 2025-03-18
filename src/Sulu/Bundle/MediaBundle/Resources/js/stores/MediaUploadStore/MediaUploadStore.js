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
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const services_1 = require("sulu-admin-bundle/services");
const RESOURCE_KEY = 'media';
const PREVIEW_RESOURCE_KEY = 'media_preview';
const MEDIA_FORM_NAME = 'fileVersion';
const PREVIEW_MEDIA_FORM_NAME = 'previewImage';
let MediaUploadStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _uploading_decorators;
    let _uploading_initializers = [];
    let _uploading_extraInitializers = [];
    let _progress_decorators;
    let _progress_initializers = [];
    let _progress_extraInitializers = [];
    let _media_decorators;
    let _media_initializers = [];
    let _media_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _get_id_decorators;
    let _get_downloadUrl_decorators;
    let _get_mimeType_decorators;
    let _setUploading_decorators;
    let _setProgress_decorators;
    let _delete_decorators;
    let _handleResponse_decorators;
    let _handleResponse_initializers = [];
    let _handleResponse_extraInitializers = [];
    let _handleError_decorators;
    let _handleError_initializers = [];
    let _handleError_extraInitializers = [];
    return _a = class MediaUploadStore {
            constructor(media, locale) {
                this.uploading = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _uploading_initializers, void 0));
                this.progress = (__runInitializers(this, _uploading_extraInitializers), __runInitializers(this, _progress_initializers, void 0));
                this.media = (__runInitializers(this, _progress_extraInitializers), __runInitializers(this, _media_initializers, void 0));
                this.error = (__runInitializers(this, _media_extraInitializers), __runInitializers(this, _error_initializers, void 0));
                this.locale = __runInitializers(this, _error_extraInitializers);
                this.handleResponse = __runInitializers(this, _handleResponse_initializers, (media) => {
                    this.setUploading(false);
                    this.setProgress(0);
                    this.media = Object.assign(this.media || {}, media);
                    this.error = undefined;
                    return media;
                });
                this.handleError = (__runInitializers(this, _handleResponse_extraInitializers), __runInitializers(this, _handleError_initializers, (error) => {
                    this.setUploading(false);
                    this.setProgress(0);
                    this.error = error;
                    throw error;
                }));
                __runInitializers(this, _handleError_extraInitializers);
                this.media = media;
                this.locale = locale;
            }
            get id() {
                const { media } = this;
                if (!media) {
                    return undefined;
                }
                return media.id;
            }
            get downloadUrl() {
                const { media } = this;
                if (!media) {
                    return undefined;
                }
                if (!media.adminUrl) {
                    return media.url;
                }
                return media.adminUrl;
            }
            getThumbnail(size) {
                const { media } = this;
                if (!media) {
                    return;
                }
                const { thumbnails, } = media;
                if (!thumbnails || !thumbnails[size]) {
                    return;
                }
                return thumbnails[size];
            }
            get mimeType() {
                const { media } = this;
                if (!media) {
                    return undefined;
                }
                return media.mimeType;
            }
            setUploading(uploading) {
                this.uploading = uploading;
            }
            setProgress(progress) {
                this.progress = Math.ceil(progress);
            }
            delete() {
                if (!this.id) {
                    throw new Error('The "id" property must be available for deleting a media');
                }
                return services_1.ResourceRequester.delete(RESOURCE_KEY, { id: this.id })
                    .then((0, mobx_1.action)(() => {
                    this.media = undefined;
                    this.error = undefined;
                }))
                    .catch(this.handleError);
            }
            update(file) {
                const id = this.media ? this.media.id : undefined;
                if (!id) {
                    throw new Error('The "id" property must be available for updating a media');
                }
                const url = services_1.resourceRouteRegistry.getUrl('detail', RESOURCE_KEY, {
                    action: 'new-version',
                    id,
                    locale: this.locale.get(),
                });
                this.setUploading(true);
                return this.upload(file, url, MEDIA_FORM_NAME)
                    .then(this.handleResponse)
                    .catch(this.handleError);
            }
            create(collectionId, file) {
                const url = services_1.resourceRouteRegistry.getUrl('detail', RESOURCE_KEY, {
                    collection: collectionId,
                    locale: this.locale.get(),
                });
                this.setUploading(true);
                return this.upload(file, url, MEDIA_FORM_NAME)
                    .then(this.handleResponse)
                    .catch(this.handleError);
            }
            updatePreviewImage(file) {
                const id = this.media ? this.media.id : undefined;
                if (!id) {
                    throw new Error('The "id" property must be available for updating a media');
                }
                const url = services_1.resourceRouteRegistry.getUrl('detail', PREVIEW_RESOURCE_KEY, {
                    id,
                    locale: this.locale.get(),
                });
                this.setUploading(true);
                return this.upload(file, url, PREVIEW_MEDIA_FORM_NAME)
                    .then(this.handleResponse)
                    .catch(this.handleError);
            }
            deletePreviewImage() {
                if (!this.id) {
                    throw new Error('The "id" property must be available for deleting a preview media');
                }
                return services_1.ResourceRequester.delete(PREVIEW_RESOURCE_KEY, { id: this.id })
                    .then((0, mobx_1.action)((media) => {
                    Object.assign(this.media, media);
                    this.error = undefined;
                }))
                    .catch(this.handleError);
            }
            upload(file, url, formName) {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    const form = new FormData();
                    xhr.open('POST', url);
                    xhr.onload = (event) => {
                        // mimic ok property of fetch response: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
                        if (event.target.status >= 200 && event.target.status <= 299) {
                            resolve(JSON.parse(event.target.response));
                        }
                        else {
                            try {
                                reject(JSON.parse(event.target.response));
                            }
                            catch (e) {
                                reject(event.target);
                            }
                        }
                    };
                    xhr.onerror = (event) => reject(event.target);
                    if (xhr.upload) {
                        xhr.upload.onprogress = (event) => this.setProgress(event.loaded / event.total * 100);
                    }
                    form.append(formName, file);
                    xhr.send(form);
                });
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _uploading_decorators = [mobx_1.observable];
            _progress_decorators = [mobx_1.observable];
            _media_decorators = [mobx_1.observable];
            _error_decorators = [mobx_1.observable];
            _get_id_decorators = [mobx_1.computed];
            _get_downloadUrl_decorators = [mobx_1.computed];
            _get_mimeType_decorators = [mobx_1.computed];
            _setUploading_decorators = [mobx_1.action];
            _setProgress_decorators = [mobx_1.action];
            _delete_decorators = [mobx_1.action];
            _handleResponse_decorators = [mobx_1.action];
            _handleError_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_downloadUrl_decorators, { kind: "getter", name: "downloadUrl", static: false, private: false, access: { has: obj => "downloadUrl" in obj, get: obj => obj.downloadUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_mimeType_decorators, { kind: "getter", name: "mimeType", static: false, private: false, access: { has: obj => "mimeType" in obj, get: obj => obj.mimeType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setUploading_decorators, { kind: "method", name: "setUploading", static: false, private: false, access: { has: obj => "setUploading" in obj, get: obj => obj.setUploading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setProgress_decorators, { kind: "method", name: "setProgress", static: false, private: false, access: { has: obj => "setProgress" in obj, get: obj => obj.setProgress }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _uploading_decorators, { kind: "field", name: "uploading", static: false, private: false, access: { has: obj => "uploading" in obj, get: obj => obj.uploading, set: (obj, value) => { obj.uploading = value; } }, metadata: _metadata }, _uploading_initializers, _uploading_extraInitializers);
            __esDecorate(null, null, _progress_decorators, { kind: "field", name: "progress", static: false, private: false, access: { has: obj => "progress" in obj, get: obj => obj.progress, set: (obj, value) => { obj.progress = value; } }, metadata: _metadata }, _progress_initializers, _progress_extraInitializers);
            __esDecorate(null, null, _media_decorators, { kind: "field", name: "media", static: false, private: false, access: { has: obj => "media" in obj, get: obj => obj.media, set: (obj, value) => { obj.media = value; } }, metadata: _metadata }, _media_initializers, _media_extraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _handleResponse_decorators, { kind: "field", name: "handleResponse", static: false, private: false, access: { has: obj => "handleResponse" in obj, get: obj => obj.handleResponse, set: (obj, value) => { obj.handleResponse = value; } }, metadata: _metadata }, _handleResponse_initializers, _handleResponse_extraInitializers);
            __esDecorate(null, null, _handleError_decorators, { kind: "field", name: "handleError", static: false, private: false, access: { has: obj => "handleError" in obj, get: obj => obj.handleError, set: (obj, value) => { obj.handleError = value; } }, metadata: _metadata }, _handleError_initializers, _handleError_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = MediaUploadStore;
