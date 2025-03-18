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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const classnames_1 = __importDefault(require("classnames"));
const react_dropzone_1 = __importDefault(require("react-dropzone"));
const components_1 = require("sulu-admin-bundle/components");
const MimeTypeIndicator_1 = __importDefault(require("../MimeTypeIndicator"));
const singleMediaDropzone_scss_1 = __importDefault(require("./singleMediaDropzone.scss"));
const UPLOAD_ICON = 'su-upload';
let SingleMediaDropzone = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _uploadIndicatorVisibility_decorators;
    let _uploadIndicatorVisibility_initializers = [];
    let _uploadIndicatorVisibility_extraInitializers = [];
    let _imageLoading_decorators;
    let _imageLoading_initializers = [];
    let _imageLoading_extraInitializers = [];
    let _imageError_decorators;
    let _imageError_initializers = [];
    let _imageError_extraInitializers = [];
    let _preloadImage_decorators;
    let _handleImageLoad_decorators;
    let _handleImageLoad_initializers = [];
    let _handleImageLoad_extraInitializers = [];
    let _setUploadIndicatorVisibility_decorators;
    let _handleImageError_decorators;
    let _handleImageError_initializers = [];
    let _handleImageError_extraInitializers = [];
    var SingleMediaDropzone = _classThis = class extends _classSuper {
        componentDidMount() {
            this.preloadImage();
        }
        componentDidUpdate(prevProps) {
            if (this.props.image !== prevProps.image) {
                this.preloadImage();
            }
        }
        preloadImage() {
            const { image: src } = this.props;
            if (src) {
                this.imageLoading = true;
                this.image = new Image();
                this.image.onerror = this.handleImageError;
                this.image.onload = this.handleImageLoad;
                this.image.src = src;
            }
            else {
                this.handleImageLoad();
            }
        }
        setUploadIndicatorVisibility(visibility) {
            this.uploadIndicatorVisibility = visibility;
        }
        render() {
            const { accept, disabled, emptyIcon, errorText, image, mimeType, progress, skin, uploading, uploadText, } = this.props;
            const mediaContainerClass = (0, classnames_1.default)(singleMediaDropzone_scss_1.default.mediaContainer, singleMediaDropzone_scss_1.default[skin], {
                [singleMediaDropzone_scss_1.default.showUploadIndicator]: this.uploadIndicatorVisibility,
                [singleMediaDropzone_scss_1.default.disabled]: disabled,
            });
            return (<>
                <react_dropzone_1.default accept={accept ? { [accept]: [] } : undefined} disabled={disabled} multiple={false} noClick={uploading} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
                    {({ getInputProps, getRootProps }) => (<mobx_react_1.Observer>
                            {() => (<div {...getRootProps({ className: mediaContainerClass })}>
                                    {image && !this.imageError &&
                            <react_1.Fragment>
                                            <img className={singleMediaDropzone_scss_1.default.thumbnail} key={image} src={image}/>
                                            {this.imageLoading && <components_1.Loader />}
                                        </react_1.Fragment>}
                                    {(!image || this.imageError) && mimeType &&
                            <div className={singleMediaDropzone_scss_1.default.mimeTypeIndicator}>
                                            <MimeTypeIndicator_1.default iconSize={100} mimeType={mimeType}/>
                                        </div>}
                                    {!image && !mimeType &&
                            <div className={singleMediaDropzone_scss_1.default.emptyIndicator}>
                                            <components_1.Icon name={emptyIcon}/>
                                        </div>}

                                    {!uploading
                            ? <div className={singleMediaDropzone_scss_1.default.uploadIndicatorContainer}>
                                            <div className={singleMediaDropzone_scss_1.default.uploadIndicator}>
                                                <div>
                                                    <components_1.Icon className={singleMediaDropzone_scss_1.default.uploadIcon} name={UPLOAD_ICON}/>
                                                    {uploadText &&
                                    <div className={singleMediaDropzone_scss_1.default.uploadInfoText}>
                                                            {uploadText}
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                            : <div className={singleMediaDropzone_scss_1.default.progressbar}>
                                            <components_1.CircularProgressbar percentage={progress} size={200}/>
                                        </div>}
                                    <input {...getInputProps()}/>
                                </div>)}
                        </mobx_react_1.Observer>)}
                </react_dropzone_1.default>
                {errorText && (<div className={singleMediaDropzone_scss_1.default.errorText}>{errorText}</div>)}
            </>);
        }
        constructor() {
            super(...arguments);
            this.image = __runInitializers(this, _instanceExtraInitializers);
            this.uploadIndicatorVisibility = __runInitializers(this, _uploadIndicatorVisibility_initializers, void 0);
            this.imageLoading = (__runInitializers(this, _uploadIndicatorVisibility_extraInitializers), __runInitializers(this, _imageLoading_initializers, false));
            this.imageError = (__runInitializers(this, _imageLoading_extraInitializers), __runInitializers(this, _imageError_initializers, false));
            this.handleImageLoad = (__runInitializers(this, _imageError_extraInitializers), __runInitializers(this, _handleImageLoad_initializers, () => {
                this.imageLoading = false;
                this.imageError = false;
            }));
            this.handleDrop = (__runInitializers(this, _handleImageLoad_extraInitializers), (files) => {
                const file = files[0];
                this.props.onDrop(file);
                this.setUploadIndicatorVisibility(false);
            });
            this.handleDragEnter = () => {
                this.setUploadIndicatorVisibility(true);
            };
            this.handleDragLeave = () => {
                this.setUploadIndicatorVisibility(false);
            };
            this.handleImageError = __runInitializers(this, _handleImageError_initializers, () => {
                this.imageError = true;
            });
            __runInitializers(this, _handleImageError_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "SingleMediaDropzone");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _uploadIndicatorVisibility_decorators = [mobx_1.observable];
        _imageLoading_decorators = [mobx_1.observable];
        _imageError_decorators = [mobx_1.observable];
        _preloadImage_decorators = [mobx_1.action];
        _handleImageLoad_decorators = [mobx_1.action];
        _setUploadIndicatorVisibility_decorators = [mobx_1.action];
        _handleImageError_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _preloadImage_decorators, { kind: "method", name: "preloadImage", static: false, private: false, access: { has: obj => "preloadImage" in obj, get: obj => obj.preloadImage }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setUploadIndicatorVisibility_decorators, { kind: "method", name: "setUploadIndicatorVisibility", static: false, private: false, access: { has: obj => "setUploadIndicatorVisibility" in obj, get: obj => obj.setUploadIndicatorVisibility }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _uploadIndicatorVisibility_decorators, { kind: "field", name: "uploadIndicatorVisibility", static: false, private: false, access: { has: obj => "uploadIndicatorVisibility" in obj, get: obj => obj.uploadIndicatorVisibility, set: (obj, value) => { obj.uploadIndicatorVisibility = value; } }, metadata: _metadata }, _uploadIndicatorVisibility_initializers, _uploadIndicatorVisibility_extraInitializers);
        __esDecorate(null, null, _imageLoading_decorators, { kind: "field", name: "imageLoading", static: false, private: false, access: { has: obj => "imageLoading" in obj, get: obj => obj.imageLoading, set: (obj, value) => { obj.imageLoading = value; } }, metadata: _metadata }, _imageLoading_initializers, _imageLoading_extraInitializers);
        __esDecorate(null, null, _imageError_decorators, { kind: "field", name: "imageError", static: false, private: false, access: { has: obj => "imageError" in obj, get: obj => obj.imageError, set: (obj, value) => { obj.imageError = value; } }, metadata: _metadata }, _imageError_initializers, _imageError_extraInitializers);
        __esDecorate(null, null, _handleImageLoad_decorators, { kind: "field", name: "handleImageLoad", static: false, private: false, access: { has: obj => "handleImageLoad" in obj, get: obj => obj.handleImageLoad, set: (obj, value) => { obj.handleImageLoad = value; } }, metadata: _metadata }, _handleImageLoad_initializers, _handleImageLoad_extraInitializers);
        __esDecorate(null, null, _handleImageError_decorators, { kind: "field", name: "handleImageError", static: false, private: false, access: { has: obj => "handleImageError" in obj, get: obj => obj.handleImageError, set: (obj, value) => { obj.handleImageError = value; } }, metadata: _metadata }, _handleImageError_initializers, _handleImageError_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SingleMediaDropzone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        accept: undefined,
        disabled: false,
        emptyIcon: 'su-image',
        mimeType: '',
        progress: 0,
        skin: 'default',
        uploading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SingleMediaDropzone = _classThis;
})();
exports.default = SingleMediaDropzone;
