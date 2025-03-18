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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const plugin_1 = __importDefault(require("@ckeditor/ckeditor5-core/src/plugin"));
const buttonview_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/button/buttonview"));
const listview_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/list/listview"));
const listitemview_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/list/listitemview"));
const utils_1 = require("@ckeditor/ckeditor5-ui/src/dropdown/utils");
const contextualballoon_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon"));
const clickobserver_1 = __importDefault(require("@ckeditor/ckeditor5-engine/src/view/observer/clickobserver"));
const utils_2 = require("../../../../utils");
const LinkBalloonView_1 = __importDefault(require("../../LinkBalloonView"));
const LinkCommand_1 = __importDefault(require("../../LinkCommand"));
const utils_3 = require("../../utils");
const UnlinkCommand_1 = __importDefault(require("../../UnlinkCommand"));
const linkTypeRegistry_1 = __importDefault(require("../../../Link/registries/linkTypeRegistry"));
const link_svg_1 = __importDefault(require("!!raw-loader!./link.svg")); // eslint-disable-line import/no-webpack-loader-syntax
const DEFAULT_TARGET = '_self';
const LINK_EVENT_TARGET = 'target';
const LINK_EVENT_HREF = 'href';
const LINK_EVENT_PROVIDER = 'provider';
const LINK_EVENT_TITLE = 'title';
const LINK_DEFAULT_TEXT = 'defaultText';
const LINK_HREF_ATTRIBUTE = 'internalLinkHref';
const LINK_TARGET_ATTRIBUTE = 'internalLinkTarget';
const LINK_PROVIDER_ATTRIBUTE = 'internalLinkProvider';
const LINK_TITLE_ATTRIBUTE = 'internalLinkTitle';
const LINK_VALIDATION_STATE_ATTRIBUTE = 'validationState';
const LINK_TAG = 'sulu-link';
let InternalLinkPlugin = (() => {
    var _a;
    let _classSuper = plugin_1.default;
    let _instanceExtraInitializers = [];
    let _openOverlay_decorators;
    let _openOverlay_initializers = [];
    let _openOverlay_extraInitializers = [];
    let _target_decorators;
    let _target_initializers = [];
    let _target_extraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _query_decorators;
    let _query_initializers = [];
    let _query_extraInitializers = [];
    let _anchor_decorators;
    let _anchor_initializers = [];
    let _anchor_extraInitializers = [];
    let _get_internalLinkTypes_decorators;
    let _get_href_decorators;
    let _handleOverlayConfirm_decorators;
    let _handleOverlayConfirm_initializers = [];
    let _handleOverlayConfirm_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    let _handleQueryChange_decorators;
    let _handleQueryChange_initializers = [];
    let _handleQueryChange_extraInitializers = [];
    let _handleAnchorChange_decorators;
    let _handleAnchorChange_initializers = [];
    let _handleAnchorChange_extraInitializers = [];
    let _handleTargetChange_decorators;
    let _handleTargetChange_initializers = [];
    let _handleTargetChange_extraInitializers = [];
    let _handleTitleChange_decorators;
    let _handleTitleChange_initializers = [];
    let _handleTitleChange_extraInitializers = [];
    let _handleHrefChange_decorators;
    let _handleHrefChange_initializers = [];
    let _handleHrefChange_extraInitializers = [];
    return _a = class InternalLinkPlugin extends _classSuper {
            get internalLinkTypes() {
                return linkTypeRegistry_1.default.getKeys().filter((type) => type !== 'external');
            }
            get href() {
                const { id, query, anchor } = this;
                if (!id) {
                    return null;
                }
                let suffix = '';
                if (query) {
                    suffix += '?' + query.replace(/^\?+/g, '');
                }
                if (anchor) {
                    suffix += '#' + anchor.replace(/^#+/g, '');
                }
                return id + suffix;
            }
            init() {
                this.internalLinkElement = document.createElement('div');
                this.editor.sourceElement.appendChild(this.internalLinkElement);
                this.balloon = this.editor.plugins.get(contextualballoon_1.default);
                this.balloonView = new LinkBalloonView_1.default(this.editor.locale);
                this.listenTo(this.balloonView, 'unlink', () => {
                    this.editor.execute('internalUnlink');
                    this.hideBalloon();
                });
                this.listenTo(this.balloonView, 'link', (0, mobx_1.action)(() => {
                    var _b;
                    this.selection = this.editor.model.document.selection;
                    const node = (0, utils_3.findModelItemInSelection)(this.editor);
                    const href = node.getAttribute(LINK_HREF_ATTRIBUTE);
                    let hrefParts = href.split('#', 2);
                    const anchor = hrefParts[1] || null;
                    hrefParts = (_b = hrefParts[0]) === null || _b === void 0 ? void 0 : _b.split('?', 2);
                    const id = hrefParts[0] || null;
                    const query = hrefParts[1] || null;
                    this.id = !isNaN(id) ? parseInt(id) : id;
                    this.anchor = anchor;
                    this.query = query;
                    this.target = node.getAttribute(LINK_TARGET_ATTRIBUTE);
                    this.title = node.getAttribute(LINK_TITLE_ATTRIBUTE);
                    this.openOverlay = node.getAttribute(LINK_PROVIDER_ATTRIBUTE);
                    this.hideBalloon();
                }));
                const locale = this.editor.config.get('sulu.locale');
                (0, react_dom_1.render)((<mobx_react_1.Observer>
                    {() => (<react_1.Fragment>
                            {this.internalLinkTypes.map((key) => {
                            const LinkOverlay = linkTypeRegistry_1.default.getOverlay(key);
                            return (<LinkOverlay anchor={this.anchor} href={this.openOverlay === key ? this.id : undefined} key={key} locale={mobx_1.observable.box(locale)} onAnchorChange={this.handleAnchorChange} onCancel={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} onHrefChange={this.handleHrefChange} onQueryChange={this.handleQueryChange} onTargetChange={this.handleTargetChange} onTitleChange={this.handleTitleChange} open={this.openOverlay === key} options={linkTypeRegistry_1.default.getOptions(key)} query={this.query} target={this.target} title={this.title}/>);
                        })}
                        </react_1.Fragment>)}
                </mobx_react_1.Observer>), this.internalLinkElement);
                this.editor.commands.add('internalLink', new LinkCommand_1.default(this.editor, {
                    [LINK_HREF_ATTRIBUTE]: LINK_EVENT_HREF,
                    [LINK_TARGET_ATTRIBUTE]: LINK_EVENT_TARGET,
                    [LINK_TITLE_ATTRIBUTE]: LINK_EVENT_TITLE,
                    [LINK_PROVIDER_ATTRIBUTE]: LINK_EVENT_PROVIDER,
                }, LINK_DEFAULT_TEXT));
                this.editor.commands.add('internalUnlink', new UnlinkCommand_1.default(this.editor, [
                    LINK_TARGET_ATTRIBUTE,
                    LINK_TITLE_ATTRIBUTE,
                    LINK_HREF_ATTRIBUTE,
                    LINK_VALIDATION_STATE_ATTRIBUTE,
                    LINK_PROVIDER_ATTRIBUTE,
                ]));
                this.editor.ui.componentFactory.add('internalLink', (locale) => {
                    const dropdownButton = (0, utils_1.createDropdown)(locale);
                    const list = new listview_1.default(locale);
                    dropdownButton.bind('isEnabled').to(this.editor.commands.get('internalLink'), 'buttonEnabled', this.editor.commands.get('externalLink'), 'buttonEnabled', (internalLinkEnabled, externalLinkEnabled) => internalLinkEnabled && externalLinkEnabled);
                    dropdownButton.buttonView.set({
                        icon: link_svg_1.default,
                        label: (0, utils_2.translate)('sulu_admin.internal_link'),
                        tooltip: true,
                    });
                    this.internalLinkTypes.forEach((key) => {
                        const button = new buttonview_1.default(locale);
                        button.set({
                            class: 'ck-link-button',
                            label: linkTypeRegistry_1.default.getTitle(key),
                            withText: true,
                        });
                        const listItem = new listitemview_1.default(locale);
                        listItem.children.add(button);
                        button.delegate('execute').to(listItem);
                        button.on('execute', (0, mobx_1.action)(() => {
                            this.selection = this.editor.model.document.selection;
                            this.openOverlay = key;
                            this.target = DEFAULT_TARGET;
                            this.title = undefined;
                            this.id = undefined;
                            this.query = undefined;
                            this.anchor = undefined;
                        }));
                        list.items.add(listItem);
                    });
                    list.items.delegate('execute').to(dropdownButton);
                    dropdownButton.panelView.children.add(list);
                    return dropdownButton;
                });
                (0, utils_3.addLinkConversion)(this.editor, LINK_TAG, LINK_VALIDATION_STATE_ATTRIBUTE, 'sulu-validation-state');
                (0, utils_3.addLinkConversion)(this.editor, LINK_TAG, LINK_PROVIDER_ATTRIBUTE, 'provider');
                (0, utils_3.addLinkConversion)(this.editor, LINK_TAG, LINK_TARGET_ATTRIBUTE, 'target');
                (0, utils_3.addLinkConversion)(this.editor, LINK_TAG, LINK_TITLE_ATTRIBUTE, 'title');
                (0, utils_3.addLinkConversion)(this.editor, LINK_TAG, LINK_HREF_ATTRIBUTE, 'href');
                const view = this.editor.editing.view;
                view.addObserver(clickobserver_1.default);
                this.listenTo(view.document, 'click', () => {
                    const externalLink = (0, utils_3.findViewLinkItemInSelection)(this.editor, LINK_TAG);
                    this.hideBalloon();
                    if (externalLink) {
                        this.balloon.add({
                            position: { target: view.domConverter.mapViewToDom(externalLink) },
                            view: this.balloonView,
                        });
                    }
                });
            }
            hideBalloon() {
                if (this.balloon.hasView(this.balloonView)) {
                    this.balloon.remove(this.balloonView);
                }
            }
            destroy() {
                (0, react_dom_1.unmountComponentAtNode)(this.internalLinkElement);
                this.internalLinkElement.remove();
                this.internalLinkElement = undefined;
            }
            constructor() {
                super(...arguments);
                this.openOverlay = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _openOverlay_initializers, undefined));
                this.target = (__runInitializers(this, _openOverlay_extraInitializers), __runInitializers(this, _target_initializers, DEFAULT_TARGET));
                this.id = (__runInitializers(this, _target_extraInitializers), __runInitializers(this, _id_initializers, undefined));
                this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.query = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _query_initializers, void 0));
                this.anchor = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _anchor_initializers, void 0));
                this.defaultText = __runInitializers(this, _anchor_extraInitializers);
                this.handleOverlayConfirm = __runInitializers(this, _handleOverlayConfirm_initializers, () => {
                    this.editor.execute('internalLink', {
                        [LINK_EVENT_HREF]: this.href,
                        [LINK_EVENT_PROVIDER]: this.openOverlay,
                        selection: this.selection,
                        [LINK_EVENT_TARGET]: this.target,
                        [LINK_EVENT_TITLE]: this.title,
                        [LINK_DEFAULT_TEXT]: this.defaultText,
                    });
                    this.openOverlay = undefined;
                });
                this.handleOverlayClose = (__runInitializers(this, _handleOverlayConfirm_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                    this.openOverlay = undefined;
                }));
                this.handleQueryChange = (__runInitializers(this, _handleOverlayClose_extraInitializers), __runInitializers(this, _handleQueryChange_initializers, (query) => {
                    this.query = query;
                }));
                this.handleAnchorChange = (__runInitializers(this, _handleQueryChange_extraInitializers), __runInitializers(this, _handleAnchorChange_initializers, (anchor) => {
                    this.anchor = anchor;
                }));
                this.handleTargetChange = (__runInitializers(this, _handleAnchorChange_extraInitializers), __runInitializers(this, _handleTargetChange_initializers, (target) => {
                    this.target = target;
                }));
                this.handleTitleChange = (__runInitializers(this, _handleTargetChange_extraInitializers), __runInitializers(this, _handleTitleChange_initializers, (title) => {
                    this.title = title;
                }));
                this.handleHrefChange = (__runInitializers(this, _handleTitleChange_extraInitializers), __runInitializers(this, _handleHrefChange_initializers, (id, item) => {
                    this.id = id;
                    this.defaultText = item ? item.title : undefined;
                }));
                __runInitializers(this, _handleHrefChange_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _openOverlay_decorators = [mobx_1.observable];
            _target_decorators = [mobx_1.observable];
            _id_decorators = [mobx_1.observable];
            _title_decorators = [mobx_1.observable];
            _query_decorators = [mobx_1.observable];
            _anchor_decorators = [mobx_1.observable];
            _get_internalLinkTypes_decorators = [mobx_1.computed];
            _get_href_decorators = [mobx_1.computed];
            _handleOverlayConfirm_decorators = [mobx_1.action];
            _handleOverlayClose_decorators = [mobx_1.action];
            _handleQueryChange_decorators = [mobx_1.action];
            _handleAnchorChange_decorators = [mobx_1.action];
            _handleTargetChange_decorators = [mobx_1.action];
            _handleTitleChange_decorators = [mobx_1.action];
            _handleHrefChange_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_internalLinkTypes_decorators, { kind: "getter", name: "internalLinkTypes", static: false, private: false, access: { has: obj => "internalLinkTypes" in obj, get: obj => obj.internalLinkTypes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_href_decorators, { kind: "getter", name: "href", static: false, private: false, access: { has: obj => "href" in obj, get: obj => obj.href }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _openOverlay_decorators, { kind: "field", name: "openOverlay", static: false, private: false, access: { has: obj => "openOverlay" in obj, get: obj => obj.openOverlay, set: (obj, value) => { obj.openOverlay = value; } }, metadata: _metadata }, _openOverlay_initializers, _openOverlay_extraInitializers);
            __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
            __esDecorate(null, null, _anchor_decorators, { kind: "field", name: "anchor", static: false, private: false, access: { has: obj => "anchor" in obj, get: obj => obj.anchor, set: (obj, value) => { obj.anchor = value; } }, metadata: _metadata }, _anchor_initializers, _anchor_extraInitializers);
            __esDecorate(null, null, _handleOverlayConfirm_decorators, { kind: "field", name: "handleOverlayConfirm", static: false, private: false, access: { has: obj => "handleOverlayConfirm" in obj, get: obj => obj.handleOverlayConfirm, set: (obj, value) => { obj.handleOverlayConfirm = value; } }, metadata: _metadata }, _handleOverlayConfirm_initializers, _handleOverlayConfirm_extraInitializers);
            __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
            __esDecorate(null, null, _handleQueryChange_decorators, { kind: "field", name: "handleQueryChange", static: false, private: false, access: { has: obj => "handleQueryChange" in obj, get: obj => obj.handleQueryChange, set: (obj, value) => { obj.handleQueryChange = value; } }, metadata: _metadata }, _handleQueryChange_initializers, _handleQueryChange_extraInitializers);
            __esDecorate(null, null, _handleAnchorChange_decorators, { kind: "field", name: "handleAnchorChange", static: false, private: false, access: { has: obj => "handleAnchorChange" in obj, get: obj => obj.handleAnchorChange, set: (obj, value) => { obj.handleAnchorChange = value; } }, metadata: _metadata }, _handleAnchorChange_initializers, _handleAnchorChange_extraInitializers);
            __esDecorate(null, null, _handleTargetChange_decorators, { kind: "field", name: "handleTargetChange", static: false, private: false, access: { has: obj => "handleTargetChange" in obj, get: obj => obj.handleTargetChange, set: (obj, value) => { obj.handleTargetChange = value; } }, metadata: _metadata }, _handleTargetChange_initializers, _handleTargetChange_extraInitializers);
            __esDecorate(null, null, _handleTitleChange_decorators, { kind: "field", name: "handleTitleChange", static: false, private: false, access: { has: obj => "handleTitleChange" in obj, get: obj => obj.handleTitleChange, set: (obj, value) => { obj.handleTitleChange = value; } }, metadata: _metadata }, _handleTitleChange_initializers, _handleTitleChange_extraInitializers);
            __esDecorate(null, null, _handleHrefChange_decorators, { kind: "field", name: "handleHrefChange", static: false, private: false, access: { has: obj => "handleHrefChange" in obj, get: obj => obj.handleHrefChange, set: (obj, value) => { obj.handleHrefChange = value; } }, metadata: _metadata }, _handleHrefChange_initializers, _handleHrefChange_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = InternalLinkPlugin;
