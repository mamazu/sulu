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
const textversionjs_1 = __importDefault(require("textversionjs"));
const components_1 = require("sulu-media-bundle/components");
const containers_1 = require("sulu-media-bundle/containers");
const components_2 = require("sulu-admin-bundle/components");
const containers_2 = require("sulu-admin-bundle/containers");
const utils_1 = require("sulu-admin-bundle/utils");
const teaserProviderRegistry_1 = __importDefault(require("./registries/teaserProviderRegistry"));
const item_scss_1 = __importDefault(require("./item.scss"));
let Item = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _description_decorators;
    let _description_initializers = [];
    let _description_extraInitializers = [];
    let _mediaId_decorators;
    let _mediaId_initializers = [];
    let _mediaId_extraInitializers = [];
    let _mediaOverlayOpen_decorators;
    let _mediaOverlayOpen_initializers = [];
    let _mediaOverlayOpen_extraInitializers = [];
    let _setStateFromProps_decorators;
    let _handleMediaClick_decorators;
    let _handleMediaClick_initializers = [];
    let _handleMediaClick_extraInitializers = [];
    let _handleMediaConfirm_decorators;
    let _handleMediaConfirm_initializers = [];
    let _handleMediaConfirm_extraInitializers = [];
    let _handleMediaOverlayClose_decorators;
    let _handleMediaOverlayClose_initializers = [];
    let _handleMediaOverlayClose_extraInitializers = [];
    let _handleTitleChange_decorators;
    let _handleTitleChange_initializers = [];
    let _handleTitleChange_extraInitializers = [];
    let _handleDescriptionChange_decorators;
    let _handleDescriptionChange_initializers = [];
    let _handleDescriptionChange_extraInitializers = [];
    var Item = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.title = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _title_initializers, undefined));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, undefined));
            this.mediaId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _mediaId_initializers, undefined));
            this.mediaOverlayOpen = (__runInitializers(this, _mediaId_extraInitializers), __runInitializers(this, _mediaOverlayOpen_initializers, false));
            this.handleMediaClick = (__runInitializers(this, _mediaOverlayOpen_extraInitializers), __runInitializers(this, _handleMediaClick_initializers, () => {
                this.mediaOverlayOpen = true;
            }));
            this.handleMediaConfirm = (__runInitializers(this, _handleMediaClick_extraInitializers), __runInitializers(this, _handleMediaConfirm_initializers, (media) => {
                this.mediaId = media.id;
                this.mediaOverlayOpen = false;
            }));
            this.handleMediaOverlayClose = (__runInitializers(this, _handleMediaConfirm_extraInitializers), __runInitializers(this, _handleMediaOverlayClose_initializers, () => {
                this.mediaOverlayOpen = false;
            }));
            this.handleTitleChange = (__runInitializers(this, _handleMediaOverlayClose_extraInitializers), __runInitializers(this, _handleTitleChange_initializers, (title) => {
                this.title = title;
            }));
            this.handleDescriptionChange = (__runInitializers(this, _handleTitleChange_extraInitializers), __runInitializers(this, _handleDescriptionChange_initializers, (description) => {
                this.description = description;
            }));
            this.handleCancel = (__runInitializers(this, _handleDescriptionChange_extraInitializers), () => {
                const { id, onCancel, type } = this.props;
                onCancel(type, id);
            });
            this.handleReset = () => {
                const { id, onApply, type } = this.props;
                onApply({ id, type });
            };
            this.handleApply = () => {
                const { id, onApply, type } = this.props;
                onApply({ description: this.description, id, mediaId: this.mediaId, title: this.title, type });
            };
        }
        componentDidMount() {
            this.setStateFromProps();
        }
        componentDidUpdate(prevProps) {
            if (prevProps.title !== this.props.title
                || prevProps.description !== this.props.description
                || prevProps.mediaId !== this.props.mediaId) {
                this.setStateFromProps();
            }
            if (prevProps.editing === true && this.props.editing === false) {
                this.setStateFromProps();
            }
        }
        setStateFromProps() {
            const { description, mediaId, title } = this.props;
            this.title = title;
            this.description = description;
            this.mediaId = mediaId;
        }
        render() {
            const { edited, editing, locale, type } = this.props;
            const { mediaUrl } = Item;
            return (editing
                ? <react_1.Fragment>
                    <div className={item_scss_1.default.editForm}>
                        <div className={item_scss_1.default.form}>
                            <div className={item_scss_1.default.mediaColumn}>
                                {mediaUrl &&
                        <button className={item_scss_1.default.mediaButton} onClick={this.handleMediaClick} type="button">
                                        {this.mediaId
                                ? <img src={mediaUrl.replace(':id', this.mediaId.toString())}/>
                                : <components_1.MimeTypeIndicator iconSize={16} mimeType="image"/>}
                                        <components_2.Icon className={item_scss_1.default.mediaButtonIcon} name="su-pen"/>
                                    </button>}
                            </div>
                            <div className={item_scss_1.default.formColumn}>
                                <div className={item_scss_1.default.titleInput}>
                                    <components_2.Input onChange={this.handleTitleChange} value={this.title}/>
                                </div>
                                <div className={item_scss_1.default.descriptionTextArea}>
                                    <containers_2.TextEditor adapter="ckeditor5" locale={locale} onChange={this.handleDescriptionChange} value={this.description}/>
                                </div>
                            </div>
                        </div>
                        <div className={item_scss_1.default.buttons}>
                            <components_2.Button onClick={this.handleCancel}>{(0, utils_1.translate)('sulu_admin.cancel')}</components_2.Button>
                            <components_2.Button onClick={this.handleReset} skin="link">{(0, utils_1.translate)('sulu_admin.reset')}</components_2.Button>
                            <components_2.Button onClick={this.handleApply} skin="primary">{(0, utils_1.translate)('sulu_admin.apply')}</components_2.Button>
                        </div>
                    </div>
                    <containers_1.SingleMediaSelectionOverlay locale={locale} onClose={this.handleMediaOverlayClose} onConfirm={this.handleMediaConfirm} open={this.mediaOverlayOpen}/>
                </react_1.Fragment>
                : <div className={item_scss_1.default.item}>
                    <div className={item_scss_1.default.media}>
                        {mediaUrl && this.mediaId && <img src={mediaUrl.replace(':id', this.mediaId.toString())}/>}
                    </div>
                    <div className={item_scss_1.default.content}>
                        <p className={item_scss_1.default.title}>{this.title}</p>
                        <p className={item_scss_1.default.description}>
                            {this.description && (0, textversionjs_1.default)(this.description)}
                        </p>
                    </div>
                    <p className={item_scss_1.default.type}>
                        {teaserProviderRegistry_1.default.get(type).title}
                        {edited && ' (' + (0, utils_1.translate)('sulu_page.edited') + ')'}
                    </p>
                </div>);
        }
    };
    __setFunctionName(_classThis, "Item");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _title_decorators = [mobx_1.observable];
        _description_decorators = [mobx_1.observable];
        _mediaId_decorators = [mobx_1.observable];
        _mediaOverlayOpen_decorators = [mobx_1.observable];
        _setStateFromProps_decorators = [mobx_1.action];
        _handleMediaClick_decorators = [mobx_1.action];
        _handleMediaConfirm_decorators = [mobx_1.action];
        _handleMediaOverlayClose_decorators = [mobx_1.action];
        _handleTitleChange_decorators = [mobx_1.action];
        _handleDescriptionChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setStateFromProps_decorators, { kind: "method", name: "setStateFromProps", static: false, private: false, access: { has: obj => "setStateFromProps" in obj, get: obj => obj.setStateFromProps }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: obj => "description" in obj, get: obj => obj.description, set: (obj, value) => { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _mediaId_decorators, { kind: "field", name: "mediaId", static: false, private: false, access: { has: obj => "mediaId" in obj, get: obj => obj.mediaId, set: (obj, value) => { obj.mediaId = value; } }, metadata: _metadata }, _mediaId_initializers, _mediaId_extraInitializers);
        __esDecorate(null, null, _mediaOverlayOpen_decorators, { kind: "field", name: "mediaOverlayOpen", static: false, private: false, access: { has: obj => "mediaOverlayOpen" in obj, get: obj => obj.mediaOverlayOpen, set: (obj, value) => { obj.mediaOverlayOpen = value; } }, metadata: _metadata }, _mediaOverlayOpen_initializers, _mediaOverlayOpen_extraInitializers);
        __esDecorate(null, null, _handleMediaClick_decorators, { kind: "field", name: "handleMediaClick", static: false, private: false, access: { has: obj => "handleMediaClick" in obj, get: obj => obj.handleMediaClick, set: (obj, value) => { obj.handleMediaClick = value; } }, metadata: _metadata }, _handleMediaClick_initializers, _handleMediaClick_extraInitializers);
        __esDecorate(null, null, _handleMediaConfirm_decorators, { kind: "field", name: "handleMediaConfirm", static: false, private: false, access: { has: obj => "handleMediaConfirm" in obj, get: obj => obj.handleMediaConfirm, set: (obj, value) => { obj.handleMediaConfirm = value; } }, metadata: _metadata }, _handleMediaConfirm_initializers, _handleMediaConfirm_extraInitializers);
        __esDecorate(null, null, _handleMediaOverlayClose_decorators, { kind: "field", name: "handleMediaOverlayClose", static: false, private: false, access: { has: obj => "handleMediaOverlayClose" in obj, get: obj => obj.handleMediaOverlayClose, set: (obj, value) => { obj.handleMediaOverlayClose = value; } }, metadata: _metadata }, _handleMediaOverlayClose_initializers, _handleMediaOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleTitleChange_decorators, { kind: "field", name: "handleTitleChange", static: false, private: false, access: { has: obj => "handleTitleChange" in obj, get: obj => obj.handleTitleChange, set: (obj, value) => { obj.handleTitleChange = value; } }, metadata: _metadata }, _handleTitleChange_initializers, _handleTitleChange_extraInitializers);
        __esDecorate(null, null, _handleDescriptionChange_decorators, { kind: "field", name: "handleDescriptionChange", static: false, private: false, access: { has: obj => "handleDescriptionChange" in obj, get: obj => obj.handleDescriptionChange, set: (obj, value) => { obj.handleDescriptionChange = value; } }, metadata: _metadata }, _handleDescriptionChange_initializers, _handleDescriptionChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Item = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.mediaUrl = undefined;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Item = _classThis;
})();
exports.default = Item;
