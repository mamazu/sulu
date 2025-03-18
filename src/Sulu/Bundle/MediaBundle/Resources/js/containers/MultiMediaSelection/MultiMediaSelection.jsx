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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const stores_1 = require("sulu-admin-bundle/stores");
const MediaSelectionHelper_1 = require("../../utils/MediaSelectionHelper");
const MultiMediaSelectionOverlay_1 = __importDefault(require("../MultiMediaSelectionOverlay"));
const MimeTypeIndicator_1 = __importDefault(require("../../components/MimeTypeIndicator"));
const multiMediaSelection_scss_1 = __importDefault(require("./multiMediaSelection.scss"));
const MEDIA_RESOURCE_KEY = 'media';
const THUMBNAIL_SIZE = 'sulu-25x25';
let MultiMediaSelection = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _overlayOpen_decorators;
    let _overlayOpen_initializers = [];
    let _overlayOpen_extraInitializers = [];
    let _openMediaOverlay_decorators;
    let _closeMediaOverlay_decorators;
    var MultiMediaSelection = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.mediaSelectionStore = __runInitializers(this, _instanceExtraInitializers);
            this.overlayOpen = __runInitializers(this, _overlayOpen_initializers, false);
            this.handleRemove = (__runInitializers(this, _overlayOpen_extraInitializers), (mediaId) => {
                this.mediaSelectionStore.removeById(mediaId);
            });
            this.handleSorted = (oldItemIndex, newItemIndex) => {
                this.mediaSelectionStore.move(oldItemIndex, newItemIndex);
            };
            this.handleOverlayOpen = () => {
                this.openMediaOverlay();
            };
            this.handleOverlayClose = () => {
                this.closeMediaOverlay();
            };
            this.handleOverlayConfirm = (selectedMedia) => {
                this.mediaSelectionStore.set([...this.mediaSelectionStore.items, ...selectedMedia]);
                this.closeMediaOverlay();
            };
            this.handleDisplayOptionClick = (displayOption) => {
                const { onChange, value } = this.props;
                onChange(Object.assign(Object.assign({}, value), { displayOption }));
            };
            this.handleItemClick = (itemId, item) => {
                const { onItemClick } = this.props;
                if (!onItemClick) {
                    return;
                }
                onItemClick(itemId, item);
            };
            const { locale, value } = this.props;
            this.mediaSelectionStore = new stores_1.MultiSelectionStore(MEDIA_RESOURCE_KEY, value.ids, locale);
            this.changeDisposer = (0, mobx_1.reaction)(() => (this.mediaSelectionStore.items.map((item) => item.id)), (loadedMediaIds) => {
                const { onChange, value } = this.props;
                if (!(0, fast_deep_equal_1.default)((0, mobx_1.toJS)(value.ids), (0, mobx_1.toJS)(loadedMediaIds))) {
                    onChange(Object.assign(Object.assign({}, value), { ids: loadedMediaIds }));
                }
            });
        }
        componentDidUpdate() {
            const newSelectedIds = (0, mobx_1.toJS)(this.props.value.ids);
            const loadedSelectedIds = (0, mobx_1.toJS)(this.mediaSelectionStore.items.map((item) => item.id));
            newSelectedIds.sort();
            loadedSelectedIds.sort();
            if (!(0, fast_deep_equal_1.default)(newSelectedIds, loadedSelectedIds)) {
                this.mediaSelectionStore.loadItems(newSelectedIds);
            }
        }
        componentWillUnmount() {
            this.changeDisposer();
        }
        openMediaOverlay() {
            this.overlayOpen = true;
        }
        closeMediaOverlay() {
            this.overlayOpen = false;
        }
        getLabel(itemCount) {
            if (itemCount === 1) {
                return `1 ${(0, utils_1.translate)('sulu_media.media_selected_singular')}`;
            }
            else if (itemCount > 1) {
                return `${itemCount} ${(0, utils_1.translate)('sulu_media.media_selected_plural')}`;
            }
            return (0, utils_1.translate)('sulu_media.select_media_plural');
        }
        render() {
            const { locale, disabled, displayOptions, sortable, types, value } = this.props;
            const { loading, items: medias } = this.mediaSelectionStore;
            const label = (loading) ? '' : this.getLabel(medias.length);
            const rightButton = displayOptions.length > 0
                ? {
                    icon: (0, MediaSelectionHelper_1.getIconForDisplayOption)(value.displayOption),
                    onClick: this.handleDisplayOptionClick,
                    options: displayOptions.map((displayOption) => ({
                        icon: (0, MediaSelectionHelper_1.getIconForDisplayOption)(displayOption),
                        label: (0, MediaSelectionHelper_1.getTranslationForDisplayOption)(displayOption),
                        value: displayOption,
                    })),
                }
                : undefined;
            return (<react_1.Fragment>
                <components_1.MultiItemSelection disabled={!!disabled} label={label} leftButton={{
                    icon: 'su-image',
                    onClick: this.handleOverlayOpen,
                }} loading={loading} onItemClick={this.handleItemClick} onItemRemove={this.handleRemove} onItemsSorted={this.handleSorted} rightButton={rightButton} sortable={sortable}>
                    {medias.map((media, index) => {
                    return (<components_1.MultiItemSelection.Item id={media.id} index={index + 1} key={media.id} value={media}>
                                <div className={multiMediaSelection_scss_1.default.mediaItem}>
                                    {media.thumbnails && media.thumbnails[THUMBNAIL_SIZE]
                            ? <img alt={media.title} className={multiMediaSelection_scss_1.default.thumbnailImage} src={media.thumbnails[THUMBNAIL_SIZE]}/>
                            : <MimeTypeIndicator_1.default height={25} iconSize={16} mimeType={media.mimeType} width={25}/>}
                                    <div className={multiMediaSelection_scss_1.default.mediaTitle}>
                                        <components_1.CroppedText>{media.title}</components_1.CroppedText>
                                    </div>
                                </div>
                            </components_1.MultiItemSelection.Item>);
                })}
                </components_1.MultiItemSelection>
                <MultiMediaSelectionOverlay_1.default excludedIds={medias.map((media) => media.id)} locale={locale} onClose={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} open={this.overlayOpen} types={types}/>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "MultiMediaSelection");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _overlayOpen_decorators = [mobx_1.observable];
        _openMediaOverlay_decorators = [mobx_1.action];
        _closeMediaOverlay_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _openMediaOverlay_decorators, { kind: "method", name: "openMediaOverlay", static: false, private: false, access: { has: obj => "openMediaOverlay" in obj, get: obj => obj.openMediaOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _closeMediaOverlay_decorators, { kind: "method", name: "closeMediaOverlay", static: false, private: false, access: { has: obj => "closeMediaOverlay" in obj, get: obj => obj.closeMediaOverlay }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _overlayOpen_decorators, { kind: "field", name: "overlayOpen", static: false, private: false, access: { has: obj => "overlayOpen" in obj, get: obj => obj.overlayOpen, set: (obj, value) => { obj.overlayOpen = value; } }, metadata: _metadata }, _overlayOpen_initializers, _overlayOpen_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MultiMediaSelection = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        displayOptions: [],
        sortable: true,
        types: [],
        value: { displayOption: undefined, ids: [] },
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MultiMediaSelection = _classThis;
})();
exports.default = MultiMediaSelection;
