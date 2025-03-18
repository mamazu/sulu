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
const mobx_react_1 = require("mobx-react");
const react_1 = __importDefault(require("react"));
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const MediaCard_1 = __importDefault(require("../../../components/MediaCard"));
const THUMBNAIL_SIZE = 'sulu-240x';
let MediaCardAdapter = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    var MediaCardAdapter = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleDownload = (downloadURL) => {
                window.location.href = downloadURL;
            };
        }
        static formatFileSize(size) {
            const megaByteThreshold = 1000000;
            const kiloByteThreshold = 1000;
            if (size > 1000000) {
                return `${(size / megaByteThreshold).toFixed(2)} MB`;
            }
            else {
                return `${(size / kiloByteThreshold).toFixed(2)} KB`;
            }
        }
        getDownloadDropdownProps(item) {
            const baseURL = window.location.origin;
            const { thumbnails } = item;
            const imageSizes = [];
            const adminUrl = item.adminUrl || item.url;
            imageSizes.push({
                url: baseURL + adminUrl,
                label: (0, utils_1.translate)('sulu_media.copy_masterfile_url'),
            });
            imageSizes.push({
                url: baseURL + item.url,
                label: (0, utils_1.translate)('sulu_media.copy_masterfile_url_website'),
            });
            if (thumbnails) {
                imageSizes.push(...Object.keys(thumbnails).map((itemKey) => {
                    return {
                        url: baseURL + item.thumbnails[itemKey],
                        label: itemKey,
                    };
                }));
            }
            return {
                imageSizes,
                onDownload: this.handleDownload,
                downloadCopyText: (0, utils_1.translate)('sulu_media.copy_url'),
                downloadUrl: baseURL + adminUrl,
                downloadText: (0, utils_1.translate)('sulu_media.download_masterfile'),
            };
        }
        render() {
            const { data, icon, loading, onItemClick, onItemSelectionChange, onPageChange, page, pageCount, selections, showCoverWhenSelected, } = this.props;
            return (<components_1.InfiniteScroller currentPage={page} loading={loading} onPageChange={onPageChange} totalPages={pageCount}>
                <components_1.Masonry>
                    {data.map((item) => {
                    const meta = `${item.mimeType} ${MediaCardAdapter.formatFileSize(item.size)}`;
                    const downloadDropdownProps = this.getDownloadDropdownProps(item);
                    const selected = selections.includes(item.id);
                    const thumbnail = item.thumbnails ? item.thumbnails[THUMBNAIL_SIZE] : null;
                    return (
                    // TODO: Don't access properties like "title" or "ghostLocale" directly.
                    <MediaCard_1.default {...downloadDropdownProps} ghostLocale={item.ghostLocale} icon={icon} id={item.id} image={thumbnail} key={item.id} meta={meta} mimeType={item.mimeType} onClick={onItemClick} onSelectionChange={onItemSelectionChange} selected={selected} showCover={showCoverWhenSelected && selected} title={item.title}/>);
                })}
                </components_1.Masonry>
            </components_1.InfiniteScroller>);
        }
    };
    __setFunctionName(_classThis, "MediaCardAdapter");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaCardAdapter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaCardAdapter = _classThis;
})();
exports.default = MediaCardAdapter;
