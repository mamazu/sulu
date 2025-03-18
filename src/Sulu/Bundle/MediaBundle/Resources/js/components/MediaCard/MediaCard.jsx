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
const classnames_1 = __importDefault(require("classnames"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
const MimeTypeIndicator_1 = __importDefault(require("../MimeTypeIndicator"));
const DownloadList_1 = __importDefault(require("./DownloadList"));
const mediaCard_scss_1 = __importDefault(require("./mediaCard.scss"));
const DOWNLOAD_ICON = 'su-download';
let MediaCard = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _downloadButtonRef_decorators;
    let _downloadButtonRef_initializers = [];
    let _downloadButtonRef_extraInitializers = [];
    let _downloadListOpen_decorators;
    let _downloadListOpen_initializers = [];
    let _downloadListOpen_extraInitializers = [];
    let _imageLoading_decorators;
    let _imageLoading_initializers = [];
    let _imageLoading_extraInitializers = [];
    let _imageError_decorators;
    let _imageError_initializers = [];
    let _imageError_extraInitializers = [];
    let _setDownloadButtonRef_decorators;
    let _setDownloadButtonRef_initializers = [];
    let _setDownloadButtonRef_extraInitializers = [];
    let _openDownloadList_decorators;
    let _closeDownloadList_decorators;
    let _handleImageLoad_decorators;
    let _handleImageLoad_initializers = [];
    let _handleImageLoad_extraInitializers = [];
    let _handleImageError_decorators;
    let _handleImageError_initializers = [];
    let _handleImageError_extraInitializers = [];
    var MediaCard = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.image = __runInitializers(this, _instanceExtraInitializers);
            this.downloadButtonRef = __runInitializers(this, _downloadButtonRef_initializers, void 0);
            this.downloadListOpen = (__runInitializers(this, _downloadButtonRef_extraInitializers), __runInitializers(this, _downloadListOpen_initializers, false));
            this.imageLoading = (__runInitializers(this, _downloadListOpen_extraInitializers), __runInitializers(this, _imageLoading_initializers, true));
            this.imageError = (__runInitializers(this, _imageLoading_extraInitializers), __runInitializers(this, _imageError_initializers, false));
            this.setDownloadButtonRef = (__runInitializers(this, _imageError_extraInitializers), __runInitializers(this, _setDownloadButtonRef_initializers, (ref) => {
                this.downloadButtonRef = ref;
            }));
            this.handleClick = (__runInitializers(this, _setDownloadButtonRef_extraInitializers), () => {
                const { id, onClick, selected, } = this.props;
                if (onClick) {
                    onClick(id, !selected);
                }
            });
            this.handleKeypress = (event) => {
                const { id, onClick, selected, } = this.props;
                if (!onClick) {
                    return;
                }
                if (event.key === 'Enter' || event.key === ' ') {
                    event.stopPropagation();
                    onClick(id, !selected);
                }
            };
            this.handleHeaderClick = () => {
                const { id, selected, onSelectionChange, } = this.props;
                if (onSelectionChange) {
                    onSelectionChange(id, !selected);
                }
            };
            this.handleHeaderKeypress = (event) => {
                const { id, selected, onSelectionChange, } = this.props;
                if (!onSelectionChange) {
                    return;
                }
                if (event.key === 'Enter' || event.key === ' ') {
                    event.stopPropagation();
                    onSelectionChange(id, !selected);
                }
            };
            this.handleDownloadButtonClick = () => {
                this.openDownloadList();
            };
            this.handleDownloadListClose = () => {
                this.closeDownloadList();
            };
            this.handleDownload = (url) => {
                const { onDownload } = this.props;
                if (onDownload) {
                    onDownload(url);
                    this.closeDownloadList();
                }
            };
            this.handleImageLoad = __runInitializers(this, _handleImageLoad_initializers, () => {
                this.imageLoading = false;
            });
            this.handleImageError = (__runInitializers(this, _handleImageLoad_extraInitializers), __runInitializers(this, _handleImageError_initializers, () => {
                this.imageError = true;
            }));
            __runInitializers(this, _handleImageError_extraInitializers);
            const { image: src } = this.props;
            if (src) {
                this.image = new Image();
                this.image.onload = this.handleImageLoad;
                this.image.onerror = this.handleImageError;
                this.image.src = src;
            }
            else {
                this.handleImageLoad();
            }
        }
        openDownloadList() {
            this.downloadListOpen = true;
        }
        closeDownloadList() {
            this.downloadListOpen = false;
        }
        render() {
            const { downloadCopyText, downloadText, downloadUrl, ghostLocale, icon, id, image, imageSizes, meta, mimeType, onSelectionChange, selected, title, showCover, } = this.props;
            const mediaCardClass = (0, classnames_1.default)(mediaCard_scss_1.default.mediaCard, {
                [mediaCard_scss_1.default.selected]: !!selected,
                [mediaCard_scss_1.default.showCover]: !!showCover,
                [mediaCard_scss_1.default.noDownloadList]: !imageSizes.length,
            });
            const downloadButtonClass = (0, classnames_1.default)(mediaCard_scss_1.default.downloadButton, {
                [mediaCard_scss_1.default.active]: !!this.downloadListOpen,
            });
            const mediaTitle = (<div className={mediaCard_scss_1.default.titleText}>
                {ghostLocale && <components_1.GhostIndicator className={mediaCard_scss_1.default.ghostIndicator} locale={ghostLocale}/>}
                <components_1.CroppedText>{title}</components_1.CroppedText>
            </div>);
            return (<div className={mediaCardClass}>
                <div className={mediaCard_scss_1.default.header}>
                    <div className={mediaCard_scss_1.default.description} onClick={this.handleHeaderClick} onKeyPress={this.handleHeaderKeypress} role="button" tabIndex="0">
                        <div className={mediaCard_scss_1.default.title}>
                            {onSelectionChange
                    ? <components_1.Checkbox checked={!!selected} className={mediaCard_scss_1.default.checkbox} value={id}>
                                    {mediaTitle}
                                </components_1.Checkbox>
                    : mediaTitle}
                        </div>
                        {meta &&
                    <div className={mediaCard_scss_1.default.meta}>
                                <components_1.CroppedText>{meta}</components_1.CroppedText>
                            </div>}
                    </div>
                    {(!!imageSizes.length && !!downloadUrl && !!downloadText) &&
                    <div>
                            <button className={downloadButtonClass} onClick={this.handleDownloadButtonClick} ref={this.setDownloadButtonRef} type="button">
                                <components_1.Icon name={DOWNLOAD_ICON}/>
                            </button>
                            <DownloadList_1.default buttonRef={this.downloadButtonRef} copyText={downloadCopyText} downloadText={downloadText} downloadUrl={downloadUrl} imageSizes={imageSizes} onClose={this.handleDownloadListClose} onDownload={this.handleDownload} open={this.downloadListOpen}/>
                        </div>}
                </div>
                <div className={mediaCard_scss_1.default.media} onClick={this.handleClick} onKeyPress={this.handleKeypress} role="button" tabIndex="0">
                    {image && !this.imageError
                    ? (<react_1.Fragment>
                                <img alt={title} src={this.image.src}/>
                                {this.imageLoading && <components_1.Loader />}
                            </react_1.Fragment>)
                    : <MimeTypeIndicator_1.default height={200} mimeType={mimeType}/>}
                    <div className={mediaCard_scss_1.default.cover}>
                        {!!icon &&
                    <components_1.Icon className={mediaCard_scss_1.default.mediaIcon} name={icon}/>}
                    </div>
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "MediaCard");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _downloadButtonRef_decorators = [mobx_1.observable];
        _downloadListOpen_decorators = [mobx_1.observable];
        _imageLoading_decorators = [mobx_1.observable];
        _imageError_decorators = [mobx_1.observable];
        _setDownloadButtonRef_decorators = [mobx_1.action];
        _openDownloadList_decorators = [mobx_1.action];
        _closeDownloadList_decorators = [mobx_1.action];
        _handleImageLoad_decorators = [mobx_1.action];
        _handleImageError_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _openDownloadList_decorators, { kind: "method", name: "openDownloadList", static: false, private: false, access: { has: obj => "openDownloadList" in obj, get: obj => obj.openDownloadList }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _closeDownloadList_decorators, { kind: "method", name: "closeDownloadList", static: false, private: false, access: { has: obj => "closeDownloadList" in obj, get: obj => obj.closeDownloadList }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _downloadButtonRef_decorators, { kind: "field", name: "downloadButtonRef", static: false, private: false, access: { has: obj => "downloadButtonRef" in obj, get: obj => obj.downloadButtonRef, set: (obj, value) => { obj.downloadButtonRef = value; } }, metadata: _metadata }, _downloadButtonRef_initializers, _downloadButtonRef_extraInitializers);
        __esDecorate(null, null, _downloadListOpen_decorators, { kind: "field", name: "downloadListOpen", static: false, private: false, access: { has: obj => "downloadListOpen" in obj, get: obj => obj.downloadListOpen, set: (obj, value) => { obj.downloadListOpen = value; } }, metadata: _metadata }, _downloadListOpen_initializers, _downloadListOpen_extraInitializers);
        __esDecorate(null, null, _imageLoading_decorators, { kind: "field", name: "imageLoading", static: false, private: false, access: { has: obj => "imageLoading" in obj, get: obj => obj.imageLoading, set: (obj, value) => { obj.imageLoading = value; } }, metadata: _metadata }, _imageLoading_initializers, _imageLoading_extraInitializers);
        __esDecorate(null, null, _imageError_decorators, { kind: "field", name: "imageError", static: false, private: false, access: { has: obj => "imageError" in obj, get: obj => obj.imageError, set: (obj, value) => { obj.imageError = value; } }, metadata: _metadata }, _imageError_initializers, _imageError_extraInitializers);
        __esDecorate(null, null, _setDownloadButtonRef_decorators, { kind: "field", name: "setDownloadButtonRef", static: false, private: false, access: { has: obj => "setDownloadButtonRef" in obj, get: obj => obj.setDownloadButtonRef, set: (obj, value) => { obj.setDownloadButtonRef = value; } }, metadata: _metadata }, _setDownloadButtonRef_initializers, _setDownloadButtonRef_extraInitializers);
        __esDecorate(null, null, _handleImageLoad_decorators, { kind: "field", name: "handleImageLoad", static: false, private: false, access: { has: obj => "handleImageLoad" in obj, get: obj => obj.handleImageLoad, set: (obj, value) => { obj.handleImageLoad = value; } }, metadata: _metadata }, _handleImageLoad_initializers, _handleImageLoad_extraInitializers);
        __esDecorate(null, null, _handleImageError_decorators, { kind: "field", name: "handleImageError", static: false, private: false, access: { has: obj => "handleImageError" in obj, get: obj => obj.handleImageError, set: (obj, value) => { obj.handleImageError = value; } }, metadata: _metadata }, _handleImageError_initializers, _handleImageError_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaCard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        downloadCopyText: '',
        imageSizes: [],
        selected: false,
        showCover: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaCard = _classThis;
})();
exports.default = MediaCard;
