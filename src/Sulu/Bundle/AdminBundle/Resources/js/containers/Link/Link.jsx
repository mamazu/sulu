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
const classnames_1 = __importDefault(require("classnames"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const SingleSelect_1 = __importDefault(require("../../components/SingleSelect/SingleSelect"));
const Icon_1 = __importDefault(require("../../components/Icon"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const link_scss_1 = __importDefault(require("../Form/fields/link.scss"));
const services_1 = require("../../services");
const linkTypeRegistry_1 = __importDefault(require("./registries/linkTypeRegistry"));
const DEFAULT_TARGET = '_self';
let Link = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.Component;
    let _openedOverlayProvider_decorators;
    let _openedOverlayProvider_initializers = [];
    let _openedOverlayProvider_extraInitializers = [];
    let _overlayHref_decorators;
    let _overlayHref_initializers = [];
    let _overlayHref_extraInitializers = [];
    let _overlayTitle_decorators;
    let _overlayTitle_initializers = [];
    let _overlayTitle_extraInitializers = [];
    let _overlayRel_decorators;
    let _overlayRel_initializers = [];
    let _overlayRel_extraInitializers = [];
    let _overlayTarget_decorators;
    let _overlayTarget_initializers = [];
    let _overlayTarget_extraInitializers = [];
    let _overlayAnchor_decorators;
    let _overlayAnchor_initializers = [];
    let _overlayAnchor_extraInitializers = [];
    let _overlayQuery_decorators;
    let _overlayQuery_initializers = [];
    let _overlayQuery_extraInitializers = [];
    let _titleParts_decorators;
    let _titleParts_initializers = [];
    let _titleParts_extraInitializers = [];
    let _titleLoading_decorators;
    let _titleLoading_initializers = [];
    let _titleLoading_extraInitializers = [];
    let _load_decorators;
    let _load_initializers = [];
    let _load_extraInitializers = [];
    let _handleRemoveClick_decorators;
    let _handleRemoveClick_initializers = [];
    let _handleRemoveClick_extraInitializers = [];
    let _handleTitleClick_decorators;
    let _handleTitleClick_initializers = [];
    let _handleTitleClick_extraInitializers = [];
    let _handleOverlayConfirm_decorators;
    let _handleOverlayConfirm_initializers = [];
    let _handleOverlayConfirm_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    let _handleProviderChange_decorators;
    let _handleProviderChange_initializers = [];
    let _handleProviderChange_extraInitializers = [];
    let _handleOverlayAnchorChange_decorators;
    let _handleOverlayAnchorChange_initializers = [];
    let _handleOverlayAnchorChange_extraInitializers = [];
    let _handleOverlayQueryChange_decorators;
    let _handleOverlayQueryChange_initializers = [];
    let _handleOverlayQueryChange_extraInitializers = [];
    let _handleOverlayTargetChange_decorators;
    let _handleOverlayTargetChange_initializers = [];
    let _handleOverlayTargetChange_extraInitializers = [];
    let _handleOverlayTitleChange_decorators;
    let _handleOverlayTitleChange_initializers = [];
    let _handleOverlayTitleChange_extraInitializers = [];
    let _handleOverlayRelChange_decorators;
    let _handleOverlayRelChange_initializers = [];
    let _handleOverlayRelChange_extraInitializers = [];
    let _handleOverlayHrefChange_decorators;
    let _handleOverlayHrefChange_initializers = [];
    let _handleOverlayHrefChange_extraInitializers = [];
    var Link = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.openedOverlayProvider = __runInitializers(this, _openedOverlayProvider_initializers, void 0);
            this.overlayHref = (__runInitializers(this, _openedOverlayProvider_extraInitializers), __runInitializers(this, _overlayHref_initializers, void 0));
            this.overlayTitle = (__runInitializers(this, _overlayHref_extraInitializers), __runInitializers(this, _overlayTitle_initializers, void 0));
            this.overlayRel = (__runInitializers(this, _overlayTitle_extraInitializers), __runInitializers(this, _overlayRel_initializers, void 0));
            this.overlayTarget = (__runInitializers(this, _overlayRel_extraInitializers), __runInitializers(this, _overlayTarget_initializers, DEFAULT_TARGET));
            this.overlayAnchor = (__runInitializers(this, _overlayTarget_extraInitializers), __runInitializers(this, _overlayAnchor_initializers, void 0));
            this.overlayQuery = (__runInitializers(this, _overlayAnchor_extraInitializers), __runInitializers(this, _overlayQuery_initializers, void 0));
            this.titleParts = (__runInitializers(this, _overlayQuery_extraInitializers), __runInitializers(this, _titleParts_initializers, []));
            this.titleLoading = (__runInitializers(this, _titleParts_extraInitializers), __runInitializers(this, _titleLoading_initializers, false));
            this.load = (__runInitializers(this, _titleLoading_extraInitializers), __runInitializers(this, _load_initializers, (value) => {
                var _a;
                if (!value) {
                    this.titleParts = [];
                    return;
                }
                const { href, provider } = value;
                if (!provider) {
                    this.titleParts = href ? [href] : [];
                    return;
                }
                const options = linkTypeRegistry_1.default.getOptions(provider);
                if (!((_a = options === null || options === void 0 ? void 0 : options.displayProperties) === null || _a === void 0 ? void 0 : _a.length)) {
                    this.titleParts = href ? [href] : [];
                    return;
                }
                this.titleParts = [];
                this.titleLoading = true;
                services_1.ResourceRequester.get(options.resourceKey, {
                    id: value.href,
                    locale: this.props.locale,
                }).then((0, mobx_1.action)((data) => {
                    this.titleParts = Object.keys(data)
                        .filter((key) => (options.displayProperties || []).includes(key))
                        .reduce((titleParts, key) => {
                        titleParts.unshift(data[key]);
                        return titleParts;
                    }, []);
                    this.titleLoading = false;
                })).catch((0, mobx_1.action)((error) => {
                    if (error.status !== 404) {
                        return Promise.reject(error);
                    }
                    this.titleParts = [];
                    this.titleLoading = false;
                }));
            }));
            this.handleRemoveClick = (__runInitializers(this, _load_extraInitializers), __runInitializers(this, _handleRemoveClick_initializers, () => {
                this.changeValue(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
            }));
            this.handleTitleClick = (__runInitializers(this, _handleRemoveClick_extraInitializers), __runInitializers(this, _handleTitleClick_initializers, () => {
                const { value, } = this.props;
                const { provider, } = value || {};
                this.openOverlay(provider);
            }));
            this.handleOverlayConfirm = (__runInitializers(this, _handleTitleClick_extraInitializers), __runInitializers(this, _handleOverlayConfirm_initializers, () => {
                if (!this.overlayHref) {
                    return;
                }
                this.changeValue(this.openedOverlayProvider, this.overlayHref, this.overlayTitle, this.overlayTarget, this.overlayAnchor, this.overlayQuery, this.overlayRel);
                this.closeOverlay();
            }));
            this.handleOverlayClose = (__runInitializers(this, _handleOverlayConfirm_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                this.closeOverlay();
            }));
            this.handleProviderChange = (__runInitializers(this, _handleOverlayClose_extraInitializers), __runInitializers(this, _handleProviderChange_initializers, (provider) => {
                this.openOverlay(provider);
            }));
            this.handleOverlayAnchorChange = (__runInitializers(this, _handleProviderChange_extraInitializers), __runInitializers(this, _handleOverlayAnchorChange_initializers, (anchor) => {
                this.overlayAnchor = anchor;
            }));
            this.handleOverlayQueryChange = (__runInitializers(this, _handleOverlayAnchorChange_extraInitializers), __runInitializers(this, _handleOverlayQueryChange_initializers, (query) => {
                this.overlayQuery = query;
            }));
            this.handleOverlayTargetChange = (__runInitializers(this, _handleOverlayQueryChange_extraInitializers), __runInitializers(this, _handleOverlayTargetChange_initializers, (target) => {
                this.overlayTarget = target;
            }));
            this.handleOverlayTitleChange = (__runInitializers(this, _handleOverlayTargetChange_extraInitializers), __runInitializers(this, _handleOverlayTitleChange_initializers, (title) => {
                this.overlayTitle = title;
            }));
            this.handleOverlayRelChange = (__runInitializers(this, _handleOverlayTitleChange_extraInitializers), __runInitializers(this, _handleOverlayRelChange_initializers, (rel) => {
                this.overlayRel = rel;
            }));
            this.handleOverlayHrefChange = (__runInitializers(this, _handleOverlayRelChange_extraInitializers), __runInitializers(this, _handleOverlayHrefChange_initializers, (href) => {
                this.overlayHref = href;
            }));
            this.closeOverlay = (__runInitializers(this, _handleOverlayHrefChange_extraInitializers), () => {
                this.openedOverlayProvider = undefined;
            });
            this.openOverlay = (provider) => {
                const { value, } = this.props;
                const { provider: currentProvider, title, href, target = DEFAULT_TARGET, anchor, query, rel, } = value || {};
                this.overlayHref = currentProvider === provider ? href : undefined;
                this.overlayTarget = target;
                this.overlayTitle = title;
                this.overlayAnchor = anchor;
                this.overlayQuery = query;
                this.overlayRel = rel;
                this.openedOverlayProvider = provider;
            };
            this.changeValue = (provider, href, title, target, anchor, query, rel) => {
                const { onChange, onFinish, enableTarget, enableTitle, enableAnchor, enableQuery, enableRel, locale, } = this.props;
                onChange({
                    provider,
                    target: enableTarget ? target : undefined,
                    anchor: enableAnchor ? anchor : undefined,
                    query: enableQuery ? query : undefined,
                    href,
                    title: enableTitle ? title : undefined,
                    rel: enableRel ? rel : undefined,
                    locale: (0, mobx_1.toJS)(locale),
                });
                onFinish();
            };
            this.load(this.props.value);
        }
        componentDidUpdate(prevProps) {
            const prevValue = (0, mobx_1.toJS)(prevProps.value);
            const newValue = (0, mobx_1.toJS)(this.props.value);
            if (!(0, fast_deep_equal_1.default)(prevValue, newValue)) {
                this.load(this.props.value);
            }
        }
        render() {
            const { disabled, locale, enableAnchor, enableQuery, enableTarget, enableTitle, enableRel, types, excludedTypes, value, } = this.props;
            const { href, provider, } = value || {};
            const itemClass = (0, classnames_1.default)(link_scss_1.default.item, {
                [link_scss_1.default.clickable]: !disabled || !href,
                [link_scss_1.default.disabled]: disabled,
            });
            let allowedTypes = linkTypeRegistry_1.default.getKeys().filter((key) => !excludedTypes.includes(key));
            if (types !== undefined && types.length > 0) {
                allowedTypes = allowedTypes.filter((key) => types.length > 0 && types.includes(key));
            }
            return (<react_1.Fragment>
                <div className={link_scss_1.default.link}>
                    <div className={link_scss_1.default.provider}>
                        <SingleSelect_1.default disabled={!!disabled} onChange={this.handleProviderChange} skin="flat" value={provider}>
                            {allowedTypes.map((key) => (<SingleSelect_1.default.Option key={key} value={key}>
                                    {linkTypeRegistry_1.default.getTitle(key)}
                                </SingleSelect_1.default.Option>))}
                        </SingleSelect_1.default>
                    </div>
                    <div className={link_scss_1.default.itemContainer}>
                        <div className={itemClass} onClick={disabled || this.handleTitleClick} role="button">
                            {this.titleLoading && '…'}
                            {!this.titleLoading && value && this.titleParts.length > 0 && (<div className={link_scss_1.default.columnList}>
                                    {this.titleParts.map((titlePart, index) => (<span className={link_scss_1.default.itemColumn} key={index} style={{
                            width: 100 / this.titleParts.length + '%',
                        }}>
                                            {titlePart}
                                        </span>))}
                                </div>)}
                        </div>
                        {!this.titleLoading && !disabled
                    && <button className={link_scss_1.default.removeButton} onClick={this.handleRemoveClick} type="button">
                                <Icon_1.default name="su-trash-alt"/>
                            </button>}
                        {this.titleLoading
                    && <Loader_1.default className={link_scss_1.default.loader} size={14}/>}
                    </div>
                </div>
                {linkTypeRegistry_1.default.getKeys().map((key) => {
                    const LinkOverlay = linkTypeRegistry_1.default.getOverlay(key);
                    return (<LinkOverlay anchor={this.overlayAnchor} href={this.openedOverlayProvider === key ? this.overlayHref : undefined} key={key} locale={locale} onAnchorChange={enableAnchor ? this.handleOverlayAnchorChange : undefined} onCancel={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} onHrefChange={this.handleOverlayHrefChange} onQueryChange={enableQuery ? this.handleOverlayQueryChange : undefined} onRelChange={enableRel ? this.handleOverlayRelChange : undefined} onTargetChange={enableTarget ? this.handleOverlayTargetChange : undefined} onTitleChange={enableTitle ? this.handleOverlayTitleChange : undefined} open={this.openedOverlayProvider === key} options={linkTypeRegistry_1.default.getOptions(key)} query={this.overlayQuery} rel={this.overlayRel} target={this.overlayTarget} title={this.overlayTitle}/>);
                })}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Link");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _openedOverlayProvider_decorators = [mobx_1.observable];
        _overlayHref_decorators = [mobx_1.observable];
        _overlayTitle_decorators = [mobx_1.observable];
        _overlayRel_decorators = [mobx_1.observable];
        _overlayTarget_decorators = [mobx_1.observable];
        _overlayAnchor_decorators = [mobx_1.observable];
        _overlayQuery_decorators = [mobx_1.observable];
        _titleParts_decorators = [mobx_1.observable];
        _titleLoading_decorators = [mobx_1.observable];
        _load_decorators = [mobx_1.action];
        _handleRemoveClick_decorators = [mobx_1.action];
        _handleTitleClick_decorators = [mobx_1.action];
        _handleOverlayConfirm_decorators = [mobx_1.action];
        _handleOverlayClose_decorators = [mobx_1.action];
        _handleProviderChange_decorators = [mobx_1.action];
        _handleOverlayAnchorChange_decorators = [mobx_1.action];
        _handleOverlayQueryChange_decorators = [mobx_1.action];
        _handleOverlayTargetChange_decorators = [mobx_1.action];
        _handleOverlayTitleChange_decorators = [mobx_1.action];
        _handleOverlayRelChange_decorators = [mobx_1.action];
        _handleOverlayHrefChange_decorators = [mobx_1.action];
        __esDecorate(null, null, _openedOverlayProvider_decorators, { kind: "field", name: "openedOverlayProvider", static: false, private: false, access: { has: obj => "openedOverlayProvider" in obj, get: obj => obj.openedOverlayProvider, set: (obj, value) => { obj.openedOverlayProvider = value; } }, metadata: _metadata }, _openedOverlayProvider_initializers, _openedOverlayProvider_extraInitializers);
        __esDecorate(null, null, _overlayHref_decorators, { kind: "field", name: "overlayHref", static: false, private: false, access: { has: obj => "overlayHref" in obj, get: obj => obj.overlayHref, set: (obj, value) => { obj.overlayHref = value; } }, metadata: _metadata }, _overlayHref_initializers, _overlayHref_extraInitializers);
        __esDecorate(null, null, _overlayTitle_decorators, { kind: "field", name: "overlayTitle", static: false, private: false, access: { has: obj => "overlayTitle" in obj, get: obj => obj.overlayTitle, set: (obj, value) => { obj.overlayTitle = value; } }, metadata: _metadata }, _overlayTitle_initializers, _overlayTitle_extraInitializers);
        __esDecorate(null, null, _overlayRel_decorators, { kind: "field", name: "overlayRel", static: false, private: false, access: { has: obj => "overlayRel" in obj, get: obj => obj.overlayRel, set: (obj, value) => { obj.overlayRel = value; } }, metadata: _metadata }, _overlayRel_initializers, _overlayRel_extraInitializers);
        __esDecorate(null, null, _overlayTarget_decorators, { kind: "field", name: "overlayTarget", static: false, private: false, access: { has: obj => "overlayTarget" in obj, get: obj => obj.overlayTarget, set: (obj, value) => { obj.overlayTarget = value; } }, metadata: _metadata }, _overlayTarget_initializers, _overlayTarget_extraInitializers);
        __esDecorate(null, null, _overlayAnchor_decorators, { kind: "field", name: "overlayAnchor", static: false, private: false, access: { has: obj => "overlayAnchor" in obj, get: obj => obj.overlayAnchor, set: (obj, value) => { obj.overlayAnchor = value; } }, metadata: _metadata }, _overlayAnchor_initializers, _overlayAnchor_extraInitializers);
        __esDecorate(null, null, _overlayQuery_decorators, { kind: "field", name: "overlayQuery", static: false, private: false, access: { has: obj => "overlayQuery" in obj, get: obj => obj.overlayQuery, set: (obj, value) => { obj.overlayQuery = value; } }, metadata: _metadata }, _overlayQuery_initializers, _overlayQuery_extraInitializers);
        __esDecorate(null, null, _titleParts_decorators, { kind: "field", name: "titleParts", static: false, private: false, access: { has: obj => "titleParts" in obj, get: obj => obj.titleParts, set: (obj, value) => { obj.titleParts = value; } }, metadata: _metadata }, _titleParts_initializers, _titleParts_extraInitializers);
        __esDecorate(null, null, _titleLoading_decorators, { kind: "field", name: "titleLoading", static: false, private: false, access: { has: obj => "titleLoading" in obj, get: obj => obj.titleLoading, set: (obj, value) => { obj.titleLoading = value; } }, metadata: _metadata }, _titleLoading_initializers, _titleLoading_extraInitializers);
        __esDecorate(null, null, _load_decorators, { kind: "field", name: "load", static: false, private: false, access: { has: obj => "load" in obj, get: obj => obj.load, set: (obj, value) => { obj.load = value; } }, metadata: _metadata }, _load_initializers, _load_extraInitializers);
        __esDecorate(null, null, _handleRemoveClick_decorators, { kind: "field", name: "handleRemoveClick", static: false, private: false, access: { has: obj => "handleRemoveClick" in obj, get: obj => obj.handleRemoveClick, set: (obj, value) => { obj.handleRemoveClick = value; } }, metadata: _metadata }, _handleRemoveClick_initializers, _handleRemoveClick_extraInitializers);
        __esDecorate(null, null, _handleTitleClick_decorators, { kind: "field", name: "handleTitleClick", static: false, private: false, access: { has: obj => "handleTitleClick" in obj, get: obj => obj.handleTitleClick, set: (obj, value) => { obj.handleTitleClick = value; } }, metadata: _metadata }, _handleTitleClick_initializers, _handleTitleClick_extraInitializers);
        __esDecorate(null, null, _handleOverlayConfirm_decorators, { kind: "field", name: "handleOverlayConfirm", static: false, private: false, access: { has: obj => "handleOverlayConfirm" in obj, get: obj => obj.handleOverlayConfirm, set: (obj, value) => { obj.handleOverlayConfirm = value; } }, metadata: _metadata }, _handleOverlayConfirm_initializers, _handleOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleProviderChange_decorators, { kind: "field", name: "handleProviderChange", static: false, private: false, access: { has: obj => "handleProviderChange" in obj, get: obj => obj.handleProviderChange, set: (obj, value) => { obj.handleProviderChange = value; } }, metadata: _metadata }, _handleProviderChange_initializers, _handleProviderChange_extraInitializers);
        __esDecorate(null, null, _handleOverlayAnchorChange_decorators, { kind: "field", name: "handleOverlayAnchorChange", static: false, private: false, access: { has: obj => "handleOverlayAnchorChange" in obj, get: obj => obj.handleOverlayAnchorChange, set: (obj, value) => { obj.handleOverlayAnchorChange = value; } }, metadata: _metadata }, _handleOverlayAnchorChange_initializers, _handleOverlayAnchorChange_extraInitializers);
        __esDecorate(null, null, _handleOverlayQueryChange_decorators, { kind: "field", name: "handleOverlayQueryChange", static: false, private: false, access: { has: obj => "handleOverlayQueryChange" in obj, get: obj => obj.handleOverlayQueryChange, set: (obj, value) => { obj.handleOverlayQueryChange = value; } }, metadata: _metadata }, _handleOverlayQueryChange_initializers, _handleOverlayQueryChange_extraInitializers);
        __esDecorate(null, null, _handleOverlayTargetChange_decorators, { kind: "field", name: "handleOverlayTargetChange", static: false, private: false, access: { has: obj => "handleOverlayTargetChange" in obj, get: obj => obj.handleOverlayTargetChange, set: (obj, value) => { obj.handleOverlayTargetChange = value; } }, metadata: _metadata }, _handleOverlayTargetChange_initializers, _handleOverlayTargetChange_extraInitializers);
        __esDecorate(null, null, _handleOverlayTitleChange_decorators, { kind: "field", name: "handleOverlayTitleChange", static: false, private: false, access: { has: obj => "handleOverlayTitleChange" in obj, get: obj => obj.handleOverlayTitleChange, set: (obj, value) => { obj.handleOverlayTitleChange = value; } }, metadata: _metadata }, _handleOverlayTitleChange_initializers, _handleOverlayTitleChange_extraInitializers);
        __esDecorate(null, null, _handleOverlayRelChange_decorators, { kind: "field", name: "handleOverlayRelChange", static: false, private: false, access: { has: obj => "handleOverlayRelChange" in obj, get: obj => obj.handleOverlayRelChange, set: (obj, value) => { obj.handleOverlayRelChange = value; } }, metadata: _metadata }, _handleOverlayRelChange_initializers, _handleOverlayRelChange_extraInitializers);
        __esDecorate(null, null, _handleOverlayHrefChange_decorators, { kind: "field", name: "handleOverlayHrefChange", static: false, private: false, access: { has: obj => "handleOverlayHrefChange" in obj, get: obj => obj.handleOverlayHrefChange, set: (obj, value) => { obj.handleOverlayHrefChange = value; } }, metadata: _metadata }, _handleOverlayHrefChange_initializers, _handleOverlayHrefChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Link = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        enableAnchor: false,
        enableQuery: false,
        enableRel: false,
        enableTarget: false,
        enableTitle: false,
        excludedTypes: [],
        types: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Link = _classThis;
})();
exports.default = Link;
