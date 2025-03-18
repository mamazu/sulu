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
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const Form_1 = __importDefault(require("../../../components/Form"));
const Input_1 = __importDefault(require("../../../components/Input"));
const SingleSelect_1 = __importDefault(require("../../../components/SingleSelect"));
const Toggler_1 = __importDefault(require("../../../components/Toggler"));
const TextArea_1 = __importDefault(require("../../../components/TextArea"));
const Url_1 = __importDefault(require("../../../components/Url"));
const utils_1 = require("../../../utils");
let ExternalLinkTypeOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _protocol_decorators;
    let _protocol_initializers = [];
    let _protocol_extraInitializers = [];
    let _href_decorators;
    let _href_initializers = [];
    let _href_extraInitializers = [];
    let _mailSubject_decorators;
    let _mailSubject_initializers = [];
    let _mailSubject_extraInitializers = [];
    let _mailBody_decorators;
    let _mailBody_initializers = [];
    let _mailBody_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _handleHrefChange_decorators;
    let _handleHrefChange_initializers = [];
    let _handleHrefChange_extraInitializers = [];
    let _handleProtocolChange_decorators;
    let _handleProtocolChange_initializers = [];
    let _handleProtocolChange_extraInitializers = [];
    let _handleMailSubjectChange_decorators;
    let _handleMailSubjectChange_initializers = [];
    let _handleMailSubjectChange_extraInitializers = [];
    let _handleMailBodyChange_decorators;
    let _handleMailBodyChange_initializers = [];
    let _handleMailBodyChange_extraInitializers = [];
    let _get_isRelNoFollow_decorators;
    var ExternalLinkTypeOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.protocol = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _protocol_initializers, undefined));
            this.href = (__runInitializers(this, _protocol_extraInitializers), __runInitializers(this, _href_initializers, undefined));
            this.mailSubject = (__runInitializers(this, _href_extraInitializers), __runInitializers(this, _mailSubject_initializers, undefined));
            this.mailBody = (__runInitializers(this, _mailSubject_extraInitializers), __runInitializers(this, _mailBody_initializers, undefined));
            this.callUrlChange = (__runInitializers(this, _mailBody_extraInitializers), () => {
                const { onTargetChange, onHrefChange, } = this.props;
                const { mailBody, mailSubject, href, } = this;
                if (!href) {
                    onHrefChange(undefined);
                    return;
                }
                const urlParameters = new URLSearchParams();
                if (href.startsWith('mailto:')) {
                    if (onTargetChange) {
                        onTargetChange('_self');
                    }
                    if (mailSubject) {
                        urlParameters.set('subject', mailSubject);
                    }
                    if (mailBody) {
                        urlParameters.set('body', mailBody);
                    }
                }
                onHrefChange(href + (Array.from(urlParameters).length > 0
                    // Replacing value is required, because Apple Mail does not seem to understand it otherwise
                    ? '?' + urlParameters.toString().replace(/\+/g, '%20')
                    : ''));
            });
            this.handleUrlBlur = this.callUrlChange;
            this.handleHrefChange = __runInitializers(this, _handleHrefChange_initializers, (href) => {
                this.href = href;
            });
            this.handleMailSubjectBlur = (__runInitializers(this, _handleHrefChange_extraInitializers), this.callUrlChange);
            this.handleProtocolChange = __runInitializers(this, _handleProtocolChange_initializers, (protocol) => {
                this.protocol = protocol;
            });
            this.handleMailSubjectChange = (__runInitializers(this, _handleProtocolChange_extraInitializers), __runInitializers(this, _handleMailSubjectChange_initializers, (mailSubject) => {
                this.mailSubject = mailSubject;
            }));
            this.handleMailBodyBlur = (__runInitializers(this, _handleMailSubjectChange_extraInitializers), this.callUrlChange);
            this.handleMailBodyChange = __runInitializers(this, _handleMailBodyChange_initializers, (mailBody) => {
                this.mailBody = mailBody;
            });
            this.handleRelNoFollowChange = (__runInitializers(this, _handleMailBodyChange_extraInitializers), (noFollow) => {
                const { onRelChange, rel, } = this.props;
                if (!onRelChange) {
                    return;
                }
                let rels = (rel || '').toLowerCase().trim().split(' ').map((v) => v.trim()).filter((v) => !!v);
                if (noFollow && !rels.includes('nofollow')) {
                    rels = [...rels, 'nofollow'];
                }
                else if (!noFollow && rels.includes('nofollow')) {
                    rels = rels.filter((v) => v !== 'nofollow');
                }
                const newRel = rels.join(' ') || undefined;
                if (rel !== newRel) {
                    onRelChange(newRel);
                }
            });
            this.updateUrl();
        }
        componentDidUpdate(prevProps) {
            if (prevProps.open === false && this.props.open === true) {
                this.updateUrl();
            }
        }
        updateUrl() {
            const { href, } = this.props;
            if (!href) {
                this.href = undefined;
                return;
            }
            if (typeof href === 'string' && href.startsWith('mailto:')) {
                const urlParts = href.split('?');
                const urlParameters = new URLSearchParams(urlParts[1]);
                const mailSubject = urlParameters.get('subject');
                const mailBody = urlParameters.get('body');
                this.href = urlParts[0];
                this.mailSubject = mailSubject ? mailSubject : undefined;
                this.mailBody = mailBody ? mailBody : undefined;
                return;
            }
            this.href = String(href);
            this.mailSubject = undefined;
            this.mailBody = undefined;
        }
        get isRelNoFollow() {
            const { rel, } = this.props;
            if (!rel) {
                return false;
            }
            return rel.toLowerCase().includes('nofollow');
        }
        render() {
            const { onCancel, onConfirm, onTargetChange, onTitleChange, onRelChange, open, target, title, href, } = this.props;
            return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmDisabled={!href} confirmText={(0, utils_1.translate)('sulu_admin.confirm')} onCancel={onCancel} onConfirm={onConfirm} open={open} title={(0, utils_1.translate)('sulu_admin.link')}>
                <Form_1.default>
                    <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_url')} required={true}>
                        <Url_1.default defaultProtocol="https://" onBlur={this.handleUrlBlur} onChange={this.handleHrefChange} onProtocolChange={this.handleProtocolChange} valid={true} value={this.href}/>
                    </Form_1.default.Field>

                    {this.protocol && this.protocol !== 'mailto:' && onTargetChange
                    && <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_target')} required={true}>
                            <SingleSelect_1.default onChange={onTargetChange} value={target}>
                                <SingleSelect_1.default.Option value="_blank">_blank</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_self">_self</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_parent">_parent</SingleSelect_1.default.Option>
                                <SingleSelect_1.default.Option value="_top">_top</SingleSelect_1.default.Option>
                            </SingleSelect_1.default>
                        </Form_1.default.Field>}

                    {this.protocol && this.protocol === 'mailto:'
                    && <react_1.Fragment>
                            <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.mail_subject')}>
                                <Input_1.default onBlur={this.handleMailSubjectBlur} onChange={this.handleMailSubjectChange} value={this.mailSubject}/>
                            </Form_1.default.Field>
                            <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.mail_body')}>
                                <TextArea_1.default onBlur={this.handleMailBodyBlur} onChange={this.handleMailBodyChange} value={this.mailBody}/>
                            </Form_1.default.Field>
                        </react_1.Fragment>}

                    {onTitleChange
                    && <Form_1.default.Field label={(0, utils_1.translate)('sulu_admin.link_title')}>
                            <Input_1.default onChange={onTitleChange} value={title}/>
                        </Form_1.default.Field>}

                    {onRelChange
                    && <Form_1.default.Field>
                            <Toggler_1.default checked={this.isRelNoFollow} onChange={this.handleRelNoFollowChange}>
                                {(0, utils_1.translate)('sulu_admin.no_follow')}
                            </Toggler_1.default>
                        </Form_1.default.Field>}
                </Form_1.default>
            </Dialog_1.default>);
        }
    };
    __setFunctionName(_classThis, "ExternalLinkTypeOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _protocol_decorators = [mobx_1.observable];
        _href_decorators = [mobx_1.observable];
        _mailSubject_decorators = [mobx_1.observable];
        _mailBody_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleHrefChange_decorators = [mobx_1.action];
        _handleProtocolChange_decorators = [mobx_1.action];
        _handleMailSubjectChange_decorators = [mobx_1.action];
        _handleMailBodyChange_decorators = [mobx_1.action];
        _get_isRelNoFollow_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isRelNoFollow_decorators, { kind: "getter", name: "isRelNoFollow", static: false, private: false, access: { has: obj => "isRelNoFollow" in obj, get: obj => obj.isRelNoFollow }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _protocol_decorators, { kind: "field", name: "protocol", static: false, private: false, access: { has: obj => "protocol" in obj, get: obj => obj.protocol, set: (obj, value) => { obj.protocol = value; } }, metadata: _metadata }, _protocol_initializers, _protocol_extraInitializers);
        __esDecorate(null, null, _href_decorators, { kind: "field", name: "href", static: false, private: false, access: { has: obj => "href" in obj, get: obj => obj.href, set: (obj, value) => { obj.href = value; } }, metadata: _metadata }, _href_initializers, _href_extraInitializers);
        __esDecorate(null, null, _mailSubject_decorators, { kind: "field", name: "mailSubject", static: false, private: false, access: { has: obj => "mailSubject" in obj, get: obj => obj.mailSubject, set: (obj, value) => { obj.mailSubject = value; } }, metadata: _metadata }, _mailSubject_initializers, _mailSubject_extraInitializers);
        __esDecorate(null, null, _mailBody_decorators, { kind: "field", name: "mailBody", static: false, private: false, access: { has: obj => "mailBody" in obj, get: obj => obj.mailBody, set: (obj, value) => { obj.mailBody = value; } }, metadata: _metadata }, _mailBody_initializers, _mailBody_extraInitializers);
        __esDecorate(null, null, _handleHrefChange_decorators, { kind: "field", name: "handleHrefChange", static: false, private: false, access: { has: obj => "handleHrefChange" in obj, get: obj => obj.handleHrefChange, set: (obj, value) => { obj.handleHrefChange = value; } }, metadata: _metadata }, _handleHrefChange_initializers, _handleHrefChange_extraInitializers);
        __esDecorate(null, null, _handleProtocolChange_decorators, { kind: "field", name: "handleProtocolChange", static: false, private: false, access: { has: obj => "handleProtocolChange" in obj, get: obj => obj.handleProtocolChange, set: (obj, value) => { obj.handleProtocolChange = value; } }, metadata: _metadata }, _handleProtocolChange_initializers, _handleProtocolChange_extraInitializers);
        __esDecorate(null, null, _handleMailSubjectChange_decorators, { kind: "field", name: "handleMailSubjectChange", static: false, private: false, access: { has: obj => "handleMailSubjectChange" in obj, get: obj => obj.handleMailSubjectChange, set: (obj, value) => { obj.handleMailSubjectChange = value; } }, metadata: _metadata }, _handleMailSubjectChange_initializers, _handleMailSubjectChange_extraInitializers);
        __esDecorate(null, null, _handleMailBodyChange_decorators, { kind: "field", name: "handleMailBodyChange", static: false, private: false, access: { has: obj => "handleMailBodyChange" in obj, get: obj => obj.handleMailBodyChange, set: (obj, value) => { obj.handleMailBodyChange = value; } }, metadata: _metadata }, _handleMailBodyChange_initializers, _handleMailBodyChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExternalLinkTypeOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExternalLinkTypeOverlay = _classThis;
})();
exports.default = ExternalLinkTypeOverlay;
