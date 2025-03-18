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
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const Button_1 = __importDefault(require("sulu-admin-bundle/components/Button"));
const services_1 = require("sulu-admin-bundle/services");
const Date_1 = require("sulu-admin-bundle/utils/Date");
const utils_1 = require("sulu-admin-bundle/utils");
const PreviewStore_1 = __importDefault(require("./stores/PreviewStore"));
const preview_link_scss_1 = __importDefault(require("./preview-link.scss"));
let PreviewLinkPopover = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _previewLink_decorators;
    let _previewLink_initializers = [];
    let _previewLink_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _generating_decorators;
    let _generating_initializers = [];
    let _generating_extraInitializers = [];
    let _copying_decorators;
    let _copying_initializers = [];
    let _copying_extraInitializers = [];
    let _loadPreviewLink_decorators;
    let _handleGenerateClick_decorators;
    let _handleGenerateClick_initializers = [];
    let _handleGenerateClick_extraInitializers = [];
    let _handleCopyClick_decorators;
    let _handleCopyClick_initializers = [];
    let _handleCopyClick_extraInitializers = [];
    let _get_link_decorators;
    var PreviewLinkPopover = _classThis = class extends _classSuper {
        componentDidMount() {
            this.loadPreviewLink();
        }
        loadPreviewLink() {
            const { previewStore, } = this.props;
            this.loading = true;
            services_1.ResourceRequester.get('preview_links', {
                resourceKey: previewStore.resourceKey,
                resourceId: previewStore.id,
                locale: previewStore.locale,
            }).then((0, mobx_1.action)((previewLink) => {
                this.previewLink = previewLink;
                this.loading = false;
            })).catch((0, mobx_1.action)((error) => {
                if (error.status !== 404) {
                    return Promise.reject(error);
                }
                this.loading = false;
            }));
        }
        get link() {
            if (!this.previewLink) {
                return '';
            }
            return PreviewStore_1.default.endpoints['preview-link'].replace(':token', this.previewLink.token);
        }
        render() {
            if (this.loading) {
                return null;
            }
            return (<div className={preview_link_scss_1.default.container}>
                {this.previewLink && (<react_1.default.Fragment>
                        <div>
                            <label className={preview_link_scss_1.default.label}>
                                {(0, utils_1.translate)('sulu_preview.copy_preview_link')}
                            </label>
                            <div className={preview_link_scss_1.default.inputContainer}>
                                <input className={preview_link_scss_1.default.input} readOnly={true} value={this.link}/>

                                <Button_1.default className={preview_link_scss_1.default.copyButton} loading={this.copying} onClick={this.handleCopyClick} skin="primary">
                                    {(0, utils_1.translate)('sulu_preview.copy')}
                                </Button_1.default>
                            </div>
                        </div>
                        <div className={preview_link_scss_1.default.revoke}>
                            <button className={preview_link_scss_1.default.revokeButton} onClick={this.handleRevokeClick} type="button">
                                {(0, utils_1.translate)('sulu_preview.revoke')}
                            </button>
                        </div>
                    </react_1.default.Fragment>)}
                {!this.previewLink && (<react_1.default.Fragment>
                        <Button_1.default loading={this.generating} onClick={this.handleGenerateClick} skin="primary">
                            {(0, utils_1.translate)('sulu_preview.generate_link')}
                        </Button_1.default>
                    </react_1.default.Fragment>)}
            </div>);
        }
        constructor() {
            super(...arguments);
            this.previewLink = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _previewLink_initializers, void 0));
            this.loading = (__runInitializers(this, _previewLink_extraInitializers), __runInitializers(this, _loading_initializers, false));
            this.generating = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _generating_initializers, false));
            this.copying = (__runInitializers(this, _generating_extraInitializers), __runInitializers(this, _copying_initializers, false));
            this.handleGenerateClick = (__runInitializers(this, _copying_extraInitializers), __runInitializers(this, _handleGenerateClick_initializers, () => {
                const { previewStore, } = this.props;
                this.generating = true;
                services_1.ResourceRequester.post('preview_links', {}, {
                    action: 'generate',
                    resourceKey: previewStore.resourceKey,
                    resourceId: previewStore.id,
                    locale: previewStore.locale,
                    webspaceKey: previewStore.webspace,
                    segmentKey: previewStore.segment,
                    targetGroupId: previewStore.targetGroup,
                    dateTime: previewStore.dateTime && (0, Date_1.transformDateForUrl)(previewStore.dateTime),
                }).then((0, mobx_1.action)((previewLink) => {
                    this.previewLink = previewLink;
                })).finally((0, mobx_1.action)(() => this.generating = false));
            }));
            this.handleRevokeClick = (__runInitializers(this, _handleGenerateClick_extraInitializers), (event) => {
                event.preventDefault();
                const { previewStore, } = this.props;
                services_1.ResourceRequester.post('preview_links', {}, {
                    action: 'revoke',
                    resourceKey: previewStore.resourceKey,
                    resourceId: previewStore.id,
                    locale: previewStore.locale,
                }).then((0, mobx_1.action)(() => {
                    this.previewLink = null;
                }));
            });
            this.handleCopyClick = __runInitializers(this, _handleCopyClick_initializers, () => {
                this.copying = true;
                setTimeout((0, mobx_1.action)(() => this.copying = false), 125);
                (0, copy_to_clipboard_1.default)(this.link);
            });
            __runInitializers(this, _handleCopyClick_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "PreviewLinkPopover");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _previewLink_decorators = [mobx_1.observable];
        _loading_decorators = [mobx_1.observable];
        _generating_decorators = [mobx_1.observable];
        _copying_decorators = [mobx_1.observable];
        _loadPreviewLink_decorators = [mobx_1.action];
        _handleGenerateClick_decorators = [mobx_1.action];
        _handleCopyClick_decorators = [mobx_1.action];
        _get_link_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _loadPreviewLink_decorators, { kind: "method", name: "loadPreviewLink", static: false, private: false, access: { has: obj => "loadPreviewLink" in obj, get: obj => obj.loadPreviewLink }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_link_decorators, { kind: "getter", name: "link", static: false, private: false, access: { has: obj => "link" in obj, get: obj => obj.link }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _previewLink_decorators, { kind: "field", name: "previewLink", static: false, private: false, access: { has: obj => "previewLink" in obj, get: obj => obj.previewLink, set: (obj, value) => { obj.previewLink = value; } }, metadata: _metadata }, _previewLink_initializers, _previewLink_extraInitializers);
        __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
        __esDecorate(null, null, _generating_decorators, { kind: "field", name: "generating", static: false, private: false, access: { has: obj => "generating" in obj, get: obj => obj.generating, set: (obj, value) => { obj.generating = value; } }, metadata: _metadata }, _generating_initializers, _generating_extraInitializers);
        __esDecorate(null, null, _copying_decorators, { kind: "field", name: "copying", static: false, private: false, access: { has: obj => "copying" in obj, get: obj => obj.copying, set: (obj, value) => { obj.copying = value; } }, metadata: _metadata }, _copying_initializers, _copying_extraInitializers);
        __esDecorate(null, null, _handleGenerateClick_decorators, { kind: "field", name: "handleGenerateClick", static: false, private: false, access: { has: obj => "handleGenerateClick" in obj, get: obj => obj.handleGenerateClick, set: (obj, value) => { obj.handleGenerateClick = value; } }, metadata: _metadata }, _handleGenerateClick_initializers, _handleGenerateClick_extraInitializers);
        __esDecorate(null, null, _handleCopyClick_decorators, { kind: "field", name: "handleCopyClick", static: false, private: false, access: { has: obj => "handleCopyClick" in obj, get: obj => obj.handleCopyClick, set: (obj, value) => { obj.handleCopyClick = value; } }, metadata: _metadata }, _handleCopyClick_initializers, _handleCopyClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PreviewLinkPopover = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PreviewLinkPopover = _classThis;
})();
exports.default = PreviewLinkPopover;
