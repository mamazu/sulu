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
const MediaFormatStore_1 = __importDefault(require("../../stores/MediaFormatStore"));
const formatStore_1 = __importDefault(require("../../stores/formatStore"));
const cropOverlay_scss_1 = __importDefault(require("./cropOverlay.scss"));
let CropOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _rawFormats_decorators;
    let _rawFormats_initializers = [];
    let _rawFormats_extraInitializers = [];
    let _formatKey_decorators;
    let _formatKey_initializers = [];
    let _formatKey_extraInitializers = [];
    let _changedFormatCroppings_decorators;
    let _changedFormatCroppings_initializers = [];
    let _changedFormatCroppings_extraInitializers = [];
    let _dirty_decorators;
    let _dirty_initializers = [];
    let _dirty_extraInitializers = [];
    let _get_currentSelection_decorators;
    let _get_availableFormats_decorators;
    let _get_selectedFormat_decorators;
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _handleFormatChange_decorators;
    let _handleFormatChange_initializers = [];
    let _handleFormatChange_extraInitializers = [];
    let _handleSelectionChange_decorators;
    let _handleSelectionChange_initializers = [];
    let _handleSelectionChange_extraInitializers = [];
    var CropOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.rawFormats = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _rawFormats_initializers, void 0));
            this.formatKey = (__runInitializers(this, _rawFormats_extraInitializers), __runInitializers(this, _formatKey_initializers, void 0));
            this.changedFormatCroppings = (__runInitializers(this, _formatKey_extraInitializers), __runInitializers(this, _changedFormatCroppings_initializers, new Map()));
            this.dirty = (__runInitializers(this, _changedFormatCroppings_extraInitializers), __runInitializers(this, _dirty_initializers, void 0));
            this.mediaFormatStore = __runInitializers(this, _dirty_extraInitializers);
            this.handleClose = __runInitializers(this, _handleClose_initializers, () => {
                this.props.onClose();
                this.changedFormatCroppings.clear();
            });
            this.handleConfirm = (__runInitializers(this, _handleClose_extraInitializers), () => {
                const { onConfirm } = this.props;
                const formatOptions = {};
                this.changedFormatCroppings.forEach((formatOption, formatKey) => {
                    formatOptions[formatKey] = this.convertSelectionToFormatOptions(formatOption);
                });
                this.mediaFormatStore.updateFormatOptions(formatOptions).then((0, mobx_1.action)(() => {
                    onConfirm();
                    this.changedFormatCroppings.clear();
                }));
            });
            this.handleFormatChange = __runInitializers(this, _handleFormatChange_initializers, (formatKey) => {
                this.formatKey = formatKey;
            });
            this.handleSelectionChange = (__runInitializers(this, _handleFormatChange_extraInitializers), __runInitializers(this, _handleSelectionChange_initializers, (currentSelection) => {
                const { formatKey } = this;
                if (!formatKey) {
                    throw new Error('It is not possible to change the selection without a selected format. '
                        + 'This should not happen and is likely a bug.');
                }
                this.changedFormatCroppings.set(formatKey, currentSelection);
            }));
            __runInitializers(this, _handleSelectionChange_extraInitializers);
            const { id, locale } = this.props;
            this.mediaFormatStore = new MediaFormatStore_1.default(id, locale);
        }
        get currentSelection() {
            const { formatKey } = this;
            if (!formatKey) {
                return undefined;
            }
            if (this.changedFormatCroppings.has(formatKey)) {
                return this.changedFormatCroppings.get(formatKey);
            }
            return this.convertFormatOptionsToSelection(this.mediaFormatStore.getFormatOptions(formatKey));
        }
        get availableFormats() {
            if (!this.rawFormats) {
                return [];
            }
            return this.rawFormats.filter((format) => !format.internal);
        }
        get selectedFormat() {
            if (!this.availableFormats) {
                throw new Error('Cannot access format as long as formats have not finished loading!');
            }
            const format = this.availableFormats.find((format) => format.key === this.formatKey);
            if (!format) {
                return undefined;
            }
            return format;
        }
        componentDidMount() {
            formatStore_1.default.loadFormats().then((0, mobx_1.action)((formats) => {
                this.rawFormats = formats;
                this.formatKey = this.availableFormats.length > 0 ? this.availableFormats[0].key : undefined;
            }));
        }
        convertSelectionToFormatOptions(selection) {
            if (!selection) {
                return {};
            }
            return {
                cropX: selection.left,
                cropY: selection.top,
                cropWidth: selection.width,
                cropHeight: selection.height,
            };
        }
        convertFormatOptionsToSelection(formatOption) {
            if (!formatOption) {
                return undefined;
            }
            return {
                left: formatOption.cropX,
                top: formatOption.cropY,
                width: formatOption.cropWidth,
                height: formatOption.cropHeight,
            };
        }
        render() {
            const { availableFormats, mediaFormatStore, selectedFormat } = this;
            const { image, open } = this.props;
            return (<components_1.Overlay confirmDisabled={this.changedFormatCroppings.size <= 0} confirmLoading={this.mediaFormatStore.saving} confirmText={(0, utils_1.translate)('sulu_admin.save')} onClose={this.handleClose} onConfirm={this.handleConfirm} open={open} size="large" title={(0, utils_1.translate)('sulu_media.define_crops')}>
                {availableFormats
                    ? <div className={cropOverlay_scss_1.default.cropOverlayContainer}>
                        <div className={cropOverlay_scss_1.default.formatSelect}>
                            <components_1.SingleSelect onChange={this.handleFormatChange} value={this.formatKey}>
                                {availableFormats.map((format) => (<components_1.SingleSelect.Option key={format.key} value={format.key}>
                                        {format.title +
                                (mediaFormatStore.getFormatOptions(format.key)
                                    ? ' (' + (0, utils_1.translate)('sulu_media.cropped') + ')'
                                    : '')}
                                    </components_1.SingleSelect.Option>))}
                            </components_1.SingleSelect>
                        </div>
                        {selectedFormat && !mediaFormatStore.loading &&
                            <react_1.Fragment>
                                <components_1.ImageRectangleSelection image={image} minHeight={selectedFormat.scale.y} minWidth={selectedFormat.scale.x} onChange={this.handleSelectionChange} value={this.currentSelection}/>
                                <p>({(0, utils_1.translate)('sulu_media.double_click_crop_and_maximize')})</p>
                            </react_1.Fragment>}
                    </div>
                    : <components_1.Loader />}
            </components_1.Overlay>);
        }
    };
    __setFunctionName(_classThis, "CropOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _rawFormats_decorators = [mobx_1.observable];
        _formatKey_decorators = [mobx_1.observable];
        _changedFormatCroppings_decorators = [mobx_1.observable];
        _dirty_decorators = [mobx_1.observable];
        _get_currentSelection_decorators = [mobx_1.computed];
        _get_availableFormats_decorators = [mobx_1.computed];
        _get_selectedFormat_decorators = [mobx_1.computed];
        _handleClose_decorators = [mobx_1.action];
        _handleFormatChange_decorators = [mobx_1.action];
        _handleSelectionChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_currentSelection_decorators, { kind: "getter", name: "currentSelection", static: false, private: false, access: { has: obj => "currentSelection" in obj, get: obj => obj.currentSelection }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_availableFormats_decorators, { kind: "getter", name: "availableFormats", static: false, private: false, access: { has: obj => "availableFormats" in obj, get: obj => obj.availableFormats }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_selectedFormat_decorators, { kind: "getter", name: "selectedFormat", static: false, private: false, access: { has: obj => "selectedFormat" in obj, get: obj => obj.selectedFormat }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _rawFormats_decorators, { kind: "field", name: "rawFormats", static: false, private: false, access: { has: obj => "rawFormats" in obj, get: obj => obj.rawFormats, set: (obj, value) => { obj.rawFormats = value; } }, metadata: _metadata }, _rawFormats_initializers, _rawFormats_extraInitializers);
        __esDecorate(null, null, _formatKey_decorators, { kind: "field", name: "formatKey", static: false, private: false, access: { has: obj => "formatKey" in obj, get: obj => obj.formatKey, set: (obj, value) => { obj.formatKey = value; } }, metadata: _metadata }, _formatKey_initializers, _formatKey_extraInitializers);
        __esDecorate(null, null, _changedFormatCroppings_decorators, { kind: "field", name: "changedFormatCroppings", static: false, private: false, access: { has: obj => "changedFormatCroppings" in obj, get: obj => obj.changedFormatCroppings, set: (obj, value) => { obj.changedFormatCroppings = value; } }, metadata: _metadata }, _changedFormatCroppings_initializers, _changedFormatCroppings_extraInitializers);
        __esDecorate(null, null, _dirty_decorators, { kind: "field", name: "dirty", static: false, private: false, access: { has: obj => "dirty" in obj, get: obj => obj.dirty, set: (obj, value) => { obj.dirty = value; } }, metadata: _metadata }, _dirty_initializers, _dirty_extraInitializers);
        __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
        __esDecorate(null, null, _handleFormatChange_decorators, { kind: "field", name: "handleFormatChange", static: false, private: false, access: { has: obj => "handleFormatChange" in obj, get: obj => obj.handleFormatChange, set: (obj, value) => { obj.handleFormatChange = value; } }, metadata: _metadata }, _handleFormatChange_initializers, _handleFormatChange_extraInitializers);
        __esDecorate(null, null, _handleSelectionChange_decorators, { kind: "field", name: "handleSelectionChange", static: false, private: false, access: { has: obj => "handleSelectionChange" in obj, get: obj => obj.handleSelectionChange, set: (obj, value) => { obj.handleSelectionChange = value; } }, metadata: _metadata }, _handleSelectionChange_initializers, _handleSelectionChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CropOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CropOverlay = _classThis;
})();
exports.default = CropOverlay;
