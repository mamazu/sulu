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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const plugin_1 = __importDefault(require("@ckeditor/ckeditor5-core/src/plugin"));
const buttonview_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/button/buttonview"));
const contextualballoon_1 = __importDefault(require("@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon"));
const clickobserver_1 = __importDefault(require("@ckeditor/ckeditor5-engine/src/view/observer/clickobserver"));
const react_dom_1 = require("react-dom");
const utils_1 = require("../../../../utils");
const utils_2 = require("../../utils");
const LinkBalloonView_1 = __importDefault(require("../../LinkBalloonView"));
const LinkCommand_1 = __importDefault(require("../../LinkCommand"));
const UnlinkCommand_1 = __importDefault(require("../../UnlinkCommand"));
const Link_1 = require("../../../Link");
const link_svg_1 = __importDefault(require("!!raw-loader!./link.svg")); // eslint-disable-line import/no-webpack-loader-syntax
const DEFAULT_TARGET = '_self';
const LINK_EVENT_TARGET = 'target';
const LINK_EVENT_TITLE = 'title';
const LINK_EVENT_URL = 'url';
const LINK_EVENT_REL = 'rel';
const LINK_HREF_ATTRIBUTE = 'externalLinkHref';
const LINK_TARGET_ATTRIBUTE = 'externalLinkTarget';
const LINK_TITLE_ATTRIBUTE = 'externalLinkTitle';
const LINK_REL_ATTRIBUTE = 'externalLinkRel';
const LINK_TAG = 'a';
let ExternalLinkPlugin = (() => {
    var _a;
    let _classSuper = plugin_1.default;
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _target_decorators;
    let _target_initializers = [];
    let _target_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _rel_decorators;
    let _rel_initializers = [];
    let _rel_extraInitializers = [];
    let _url_decorators;
    let _url_initializers = [];
    let _url_extraInitializers = [];
    let _handleOverlayConfirm_decorators;
    let _handleOverlayConfirm_initializers = [];
    let _handleOverlayConfirm_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    let _handleTargetChange_decorators;
    let _handleTargetChange_initializers = [];
    let _handleTargetChange_extraInitializers = [];
    let _handleTitleChange_decorators;
    let _handleTitleChange_initializers = [];
    let _handleTitleChange_extraInitializers = [];
    let _handleRelChange_decorators;
    let _handleRelChange_initializers = [];
    let _handleRelChange_extraInitializers = [];
    let _handleHrefChange_decorators;
    let _handleHrefChange_initializers = [];
    let _handleHrefChange_extraInitializers = [];
    return _a = class ExternalLinkPlugin extends _classSuper {
            init() {
                this.externalLinkOverlayElement = document.createElement('div');
                this.editor.sourceElement.appendChild(this.externalLinkOverlayElement);
                this.balloon = this.editor.plugins.get(contextualballoon_1.default);
                this.balloonView = new LinkBalloonView_1.default(this.editor.locale, true);
                this.balloonView.bind('href').to(this, 'href');
                this.listenTo(this.balloonView, 'unlink', () => {
                    this.editor.execute('externalUnlink');
                    this.hideBalloon();
                });
                this.listenTo(this.balloonView, 'link', (0, mobx_1.action)(() => {
                    this.selection = this.editor.model.document.selection;
                    const node = (0, utils_2.findModelItemInSelection)(this.editor);
                    this.target = node.getAttribute(LINK_TARGET_ATTRIBUTE);
                    this.title = node.getAttribute(LINK_TITLE_ATTRIBUTE);
                    this.url = node.getAttribute(LINK_HREF_ATTRIBUTE);
                    this.rel = node.getAttribute(LINK_REL_ATTRIBUTE);
                    this.open = true;
                    this.hideBalloon();
                }));
                const locale = this.editor.config.get('sulu.locale');
                (0, react_dom_1.render)((<mobx_react_1.Observer>
                    {() => (<Link_1.ExternalLinkTypeOverlay href={this.url} locale={locale} onCancel={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} onHrefChange={this.handleHrefChange} onRelChange={this.handleRelChange} onTargetChange={this.handleTargetChange} onTitleChange={this.handleTitleChange} open={this.open} options={undefined} rel={this.rel} target={this.target} title={this.title}/>)}
                </mobx_react_1.Observer>), this.externalLinkOverlayElement);
                this.editor.commands.add('externalLink', new LinkCommand_1.default(this.editor, {
                    [LINK_HREF_ATTRIBUTE]: LINK_EVENT_URL,
                    [LINK_TARGET_ATTRIBUTE]: LINK_EVENT_TARGET,
                    [LINK_TITLE_ATTRIBUTE]: LINK_EVENT_TITLE,
                    [LINK_REL_ATTRIBUTE]: LINK_EVENT_REL,
                }, LINK_EVENT_URL));
                this.editor.commands.add('externalUnlink', new UnlinkCommand_1.default(this.editor, [LINK_HREF_ATTRIBUTE, LINK_TARGET_ATTRIBUTE, LINK_TITLE_ATTRIBUTE, LINK_REL_ATTRIBUTE]));
                this.editor.ui.componentFactory.add('externalLink', (locale) => {
                    const button = new buttonview_1.default(locale);
                    button.bind('isEnabled').to(this.editor.commands.get('internalLink'), 'buttonEnabled', this.editor.commands.get('externalLink'), 'buttonEnabled', (internalLinkEnabled, externalLinkEnabled) => internalLinkEnabled && externalLinkEnabled);
                    button.set({
                        icon: link_svg_1.default,
                        label: (0, utils_1.translate)('sulu_admin.external_link'),
                        tooltip: true,
                    });
                    button.on('execute', (0, mobx_1.action)(() => {
                        this.selection = this.editor.model.document.selection;
                        this.open = true;
                        this.target = DEFAULT_TARGET;
                        this.title = undefined;
                        this.url = undefined;
                        this.rel = undefined;
                    }));
                    return button;
                });
                (0, utils_2.addLinkConversion)(this.editor, LINK_TAG, LINK_TARGET_ATTRIBUTE, 'target');
                (0, utils_2.addLinkConversion)(this.editor, LINK_TAG, LINK_HREF_ATTRIBUTE, 'href');
                (0, utils_2.addLinkConversion)(this.editor, LINK_TAG, LINK_TITLE_ATTRIBUTE, 'title');
                (0, utils_2.addLinkConversion)(this.editor, LINK_TAG, LINK_REL_ATTRIBUTE, 'rel');
                const view = this.editor.editing.view;
                view.addObserver(clickobserver_1.default);
                this.listenTo(view.document, 'click', () => {
                    const externalLink = (0, utils_2.findViewLinkItemInSelection)(this.editor, LINK_TAG);
                    this.hideBalloon();
                    if (externalLink) {
                        this.set('href', externalLink.getAttribute('href'));
                        this.balloon.add({
                            position: {
                                target: view.domConverter.mapViewToDom(externalLink),
                            },
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
                (0, react_dom_1.unmountComponentAtNode)(this.externalLinkOverlayElement);
                this.externalLinkOverlayElement.remove();
                this.externalLinkOverlayElement = undefined;
            }
            constructor() {
                super(...arguments);
                this.open = __runInitializers(this, _open_initializers, false);
                this.target = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _target_initializers, DEFAULT_TARGET));
                this.title = (__runInitializers(this, _target_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.rel = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _rel_initializers, void 0));
                this.url = (__runInitializers(this, _rel_extraInitializers), __runInitializers(this, _url_initializers, void 0));
                this.balloon = __runInitializers(this, _url_extraInitializers);
                this.handleOverlayConfirm = __runInitializers(this, _handleOverlayConfirm_initializers, () => {
                    this.editor.execute('externalLink', {
                        selection: this.selection,
                        [LINK_EVENT_TARGET]: this.target,
                        [LINK_EVENT_TITLE]: this.title,
                        [LINK_EVENT_URL]: this.url,
                        [LINK_EVENT_REL]: this.rel,
                    });
                    this.open = false;
                });
                this.handleOverlayClose = (__runInitializers(this, _handleOverlayConfirm_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                    this.open = false;
                }));
                this.handleTargetChange = (__runInitializers(this, _handleOverlayClose_extraInitializers), __runInitializers(this, _handleTargetChange_initializers, (target) => {
                    this.target = target;
                }));
                this.handleTitleChange = (__runInitializers(this, _handleTargetChange_extraInitializers), __runInitializers(this, _handleTitleChange_initializers, (title) => {
                    this.title = title;
                }));
                this.handleRelChange = (__runInitializers(this, _handleTitleChange_extraInitializers), __runInitializers(this, _handleRelChange_initializers, (rel) => {
                    this.rel = rel;
                }));
                this.handleHrefChange = (__runInitializers(this, _handleRelChange_extraInitializers), __runInitializers(this, _handleHrefChange_initializers, (href) => {
                    this.url = String(href);
                }));
                __runInitializers(this, _handleHrefChange_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _open_decorators = [mobx_1.observable];
            _target_decorators = [mobx_1.observable];
            _title_decorators = [mobx_1.observable];
            _rel_decorators = [mobx_1.observable];
            _url_decorators = [mobx_1.observable];
            _handleOverlayConfirm_decorators = [mobx_1.action];
            _handleOverlayClose_decorators = [mobx_1.action];
            _handleTargetChange_decorators = [mobx_1.action];
            _handleTitleChange_decorators = [mobx_1.action];
            _handleRelChange_decorators = [mobx_1.action];
            _handleHrefChange_decorators = [mobx_1.action];
            __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
            __esDecorate(null, null, _target_decorators, { kind: "field", name: "target", static: false, private: false, access: { has: obj => "target" in obj, get: obj => obj.target, set: (obj, value) => { obj.target = value; } }, metadata: _metadata }, _target_initializers, _target_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _rel_decorators, { kind: "field", name: "rel", static: false, private: false, access: { has: obj => "rel" in obj, get: obj => obj.rel, set: (obj, value) => { obj.rel = value; } }, metadata: _metadata }, _rel_initializers, _rel_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url, set: (obj, value) => { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _handleOverlayConfirm_decorators, { kind: "field", name: "handleOverlayConfirm", static: false, private: false, access: { has: obj => "handleOverlayConfirm" in obj, get: obj => obj.handleOverlayConfirm, set: (obj, value) => { obj.handleOverlayConfirm = value; } }, metadata: _metadata }, _handleOverlayConfirm_initializers, _handleOverlayConfirm_extraInitializers);
            __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
            __esDecorate(null, null, _handleTargetChange_decorators, { kind: "field", name: "handleTargetChange", static: false, private: false, access: { has: obj => "handleTargetChange" in obj, get: obj => obj.handleTargetChange, set: (obj, value) => { obj.handleTargetChange = value; } }, metadata: _metadata }, _handleTargetChange_initializers, _handleTargetChange_extraInitializers);
            __esDecorate(null, null, _handleTitleChange_decorators, { kind: "field", name: "handleTitleChange", static: false, private: false, access: { has: obj => "handleTitleChange" in obj, get: obj => obj.handleTitleChange, set: (obj, value) => { obj.handleTitleChange = value; } }, metadata: _metadata }, _handleTitleChange_initializers, _handleTitleChange_extraInitializers);
            __esDecorate(null, null, _handleRelChange_decorators, { kind: "field", name: "handleRelChange", static: false, private: false, access: { has: obj => "handleRelChange" in obj, get: obj => obj.handleRelChange, set: (obj, value) => { obj.handleRelChange = value; } }, metadata: _metadata }, _handleRelChange_initializers, _handleRelChange_extraInitializers);
            __esDecorate(null, null, _handleHrefChange_decorators, { kind: "field", name: "handleHrefChange", static: false, private: false, access: { has: obj => "handleHrefChange" in obj, get: obj => obj.handleHrefChange, set: (obj, value) => { obj.handleHrefChange = value; } }, metadata: _metadata }, _handleHrefChange_initializers, _handleHrefChange_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ExternalLinkPlugin;
