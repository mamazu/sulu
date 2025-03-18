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
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const classnames_1 = __importDefault(require("classnames"));
const loglevel_1 = __importDefault(require("loglevel"));
const SingleSelect_1 = __importDefault(require("../SingleSelect"));
const validateEmail_1 = __importDefault(require("../../utils/Email/validateEmail"));
const url_scss_1 = __importDefault(require("./url.scss"));
const DEFAULT_PROTOCOLS = ['http://', 'https://', 'ftp://', 'ftps://', 'mailto:', 'tel:'];
let Url = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _selectedProtocol_decorators;
    let _selectedProtocol_initializers = [];
    let _selectedProtocol_extraInitializers = [];
    let _path_decorators;
    let _path_initializers = [];
    let _path_extraInitializers = [];
    let _validUrl_decorators;
    let _validUrl_initializers = [];
    let _validUrl_extraInitializers = [];
    let _setUrl_decorators;
    let _get_url_decorators;
    let _handleProtocolChange_decorators;
    let _handleProtocolChange_initializers = [];
    let _handleProtocolChange_extraInitializers = [];
    let _handlePathChange_decorators;
    let _handlePathChange_initializers = [];
    let _handlePathChange_extraInitializers = [];
    let _handlePathBlur_decorators;
    let _handlePathBlur_initializers = [];
    let _handlePathBlur_extraInitializers = [];
    var Url = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.selectedProtocol = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _selectedProtocol_initializers, void 0));
            this.path = (__runInitializers(this, _selectedProtocol_extraInitializers), __runInitializers(this, _path_initializers, undefined));
            this.validUrl = (__runInitializers(this, _path_extraInitializers), __runInitializers(this, _validUrl_initializers, true));
            this.callChangeCallback = (__runInitializers(this, _validUrl_extraInitializers), () => {
                const { onChange, value } = this.props;
                if (this.url === value) {
                    return;
                }
                onChange(this.isValidUrl(this.url) ? this.url : undefined);
            });
            this.handleProtocolChange = __runInitializers(this, _handleProtocolChange_initializers, (protocol) => {
                const { onBlur, onProtocolChange, protocols } = this.props;
                if (typeof protocol !== 'string' || !protocols.includes(protocol)) {
                    throw new Error('The protocol "' + protocol + '" is not in listed as available protocol (' + protocols.join(',') + ').'
                        + ' This should not happen and is likely a bug.');
                }
                this.selectedProtocol = protocol;
                this.callChangeCallback();
                if (onProtocolChange) {
                    onProtocolChange(protocol);
                }
                if (onBlur) {
                    onBlur();
                }
            });
            this.handlePathChange = (__runInitializers(this, _handleProtocolChange_extraInitializers), __runInitializers(this, _handlePathChange_initializers, (event) => {
                const { protocols } = this.props;
                this.path = event.currentTarget.value;
                const path = this.path;
                const protocol = protocols.find((protocol) => path.startsWith(protocol));
                if (protocol) {
                    this.selectedProtocol = protocol;
                    this.path = path.substring(this.selectedProtocol.length);
                }
                this.callChangeCallback();
            }));
            this.handlePathBlur = (__runInitializers(this, _handlePathChange_extraInitializers), __runInitializers(this, _handlePathBlur_initializers, () => {
                const { onBlur, value } = this.props;
                this.validUrl = this.isValidUrl(this.url);
                if (this.url !== value) {
                    this.callChangeCallback();
                }
                if (onBlur) {
                    onBlur();
                }
            }));
            __runInitializers(this, _handlePathBlur_extraInitializers);
            this.selectedProtocol = props.defaultProtocol || props.protocols[0];
        }
        componentDidMount() {
            const { value } = this.props;
            this.setUrl(value);
        }
        componentDidUpdate(prevProps) {
            const { value } = this.props;
            if (prevProps.value !== value && !((this.selectedProtocol || this.path) && !value)) {
                this.setUrl(value);
            }
        }
        isValidUrl(url) {
            if (!url) {
                return true;
            }
            if (this.selectedProtocol === 'mailto:') {
                return (0, validateEmail_1.default)(url.substring(7));
            }
            return true;
        }
        setUrl(url) {
            if (!url) {
                this.path = undefined;
                const { defaultProtocol, onProtocolChange, protocols } = this.props;
                this.selectedProtocol = defaultProtocol || protocols[0];
                if (onProtocolChange) {
                    onProtocolChange(this.selectedProtocol);
                }
                return;
            }
            const { onProtocolChange, protocols, value } = this.props;
            if (value === this.url) {
                return;
            }
            const protocol = protocols.find((protocol) => url && url.startsWith(protocol));
            if (!protocol) {
                loglevel_1.default.warn('The URL "' + url + '" has a protocol type not supported by this instance.');
            }
            this.selectedProtocol = protocol || this.selectedProtocol;
            this.path = url.substring(protocol ? protocol.length : 0);
            this.validUrl = this.isValidUrl(this.url);
            if (onProtocolChange) {
                onProtocolChange(protocol);
            }
        }
        get url() {
            if (!this.path) {
                return undefined;
            }
            return this.selectedProtocol + this.path;
        }
        render() {
            const { disabled, id, protocols, valid } = this.props;
            const urlClass = (0, classnames_1.default)(url_scss_1.default.url, {
                [url_scss_1.default.error]: !valid || !this.validUrl,
            });
            return (<div className={urlClass}>
                <div className={url_scss_1.default.protocols}>
                    <SingleSelect_1.default disabled={disabled} onChange={this.handleProtocolChange} skin="flat" value={this.selectedProtocol}>
                        {protocols.map((protocol) => (<SingleSelect_1.default.Option key={protocol} value={protocol}>{protocol}</SingleSelect_1.default.Option>))}
                    </SingleSelect_1.default>
                </div>
                <input disabled={disabled} id={id} onBlur={this.handlePathBlur} onChange={this.handlePathChange} type="text" value={this.path || ''}/>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Url");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _selectedProtocol_decorators = [mobx_1.observable];
        _path_decorators = [mobx_1.observable];
        _validUrl_decorators = [mobx_1.observable];
        _setUrl_decorators = [mobx_1.action];
        _get_url_decorators = [mobx_1.computed];
        _handleProtocolChange_decorators = [mobx_1.action];
        _handlePathChange_decorators = [mobx_1.action];
        _handlePathBlur_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _setUrl_decorators, { kind: "method", name: "setUrl", static: false, private: false, access: { has: obj => "setUrl" in obj, get: obj => obj.setUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_url_decorators, { kind: "getter", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _selectedProtocol_decorators, { kind: "field", name: "selectedProtocol", static: false, private: false, access: { has: obj => "selectedProtocol" in obj, get: obj => obj.selectedProtocol, set: (obj, value) => { obj.selectedProtocol = value; } }, metadata: _metadata }, _selectedProtocol_initializers, _selectedProtocol_extraInitializers);
        __esDecorate(null, null, _path_decorators, { kind: "field", name: "path", static: false, private: false, access: { has: obj => "path" in obj, get: obj => obj.path, set: (obj, value) => { obj.path = value; } }, metadata: _metadata }, _path_initializers, _path_extraInitializers);
        __esDecorate(null, null, _validUrl_decorators, { kind: "field", name: "validUrl", static: false, private: false, access: { has: obj => "validUrl" in obj, get: obj => obj.validUrl, set: (obj, value) => { obj.validUrl = value; } }, metadata: _metadata }, _validUrl_initializers, _validUrl_extraInitializers);
        __esDecorate(null, null, _handleProtocolChange_decorators, { kind: "field", name: "handleProtocolChange", static: false, private: false, access: { has: obj => "handleProtocolChange" in obj, get: obj => obj.handleProtocolChange, set: (obj, value) => { obj.handleProtocolChange = value; } }, metadata: _metadata }, _handleProtocolChange_initializers, _handleProtocolChange_extraInitializers);
        __esDecorate(null, null, _handlePathChange_decorators, { kind: "field", name: "handlePathChange", static: false, private: false, access: { has: obj => "handlePathChange" in obj, get: obj => obj.handlePathChange, set: (obj, value) => { obj.handlePathChange = value; } }, metadata: _metadata }, _handlePathChange_initializers, _handlePathChange_extraInitializers);
        __esDecorate(null, null, _handlePathBlur_decorators, { kind: "field", name: "handlePathBlur", static: false, private: false, access: { has: obj => "handlePathBlur" in obj, get: obj => obj.handlePathBlur, set: (obj, value) => { obj.handlePathBlur = value; } }, metadata: _metadata }, _handlePathBlur_initializers, _handlePathBlur_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Url = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        disabled: false,
        protocols: DEFAULT_PROTOCOLS,
        valid: true,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Url = _classThis;
})();
exports.default = Url;
