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
const classnames_1 = __importDefault(require("classnames"));
const index_1 = require("../../utils/index");
const index_2 = __importDefault(require("../../components/Button/index"));
const index_3 = __importDefault(require("../../components/Checkbox/index"));
const index_4 = __importDefault(require("../../components/Input/index"));
const Header_1 = __importDefault(require("./Header"));
const form_scss_1 = __importDefault(require("./form.scss"));
let TwoFactorForm = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _inputRef_decorators;
    let _inputRef_initializers = [];
    let _inputRef_extraInitializers = [];
    let _authCode_decorators;
    let _authCode_initializers = [];
    let _authCode_extraInitializers = [];
    let _trustedDevice_decorators;
    let _trustedDevice_initializers = [];
    let _trustedDevice_extraInitializers = [];
    let _get_submitButtonDisabled_decorators;
    let _setInputRef_decorators;
    let _setInputRef_initializers = [];
    let _setInputRef_extraInitializers = [];
    let _handleAuthCodeChange_decorators;
    let _handleAuthCodeChange_initializers = [];
    let _handleAuthCodeChange_extraInitializers = [];
    let _handleTrustedDeviceChange_decorators;
    let _handleTrustedDeviceChange_initializers = [];
    let _handleTrustedDeviceChange_extraInitializers = [];
    var TwoFactorForm = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.inputRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputRef_initializers, void 0));
            this.authCode = (__runInitializers(this, _inputRef_extraInitializers), __runInitializers(this, _authCode_initializers, void 0));
            this.trustedDevice = (__runInitializers(this, _authCode_extraInitializers), __runInitializers(this, _trustedDevice_initializers, false));
            this.setInputRef = (__runInitializers(this, _trustedDevice_extraInitializers), __runInitializers(this, _setInputRef_initializers, (ref) => {
                this.inputRef = ref;
            }));
            this.handleAuthCodeChange = (__runInitializers(this, _setInputRef_extraInitializers), __runInitializers(this, _handleAuthCodeChange_initializers, (authCode) => {
                this.authCode = authCode;
            }));
            this.handleTrustedDeviceChange = (__runInitializers(this, _handleAuthCodeChange_extraInitializers), __runInitializers(this, _handleTrustedDeviceChange_initializers, (trustedDevice) => {
                this.trustedDevice = trustedDevice;
            }));
            this.handleSubmit = (__runInitializers(this, _handleTrustedDeviceChange_extraInitializers), (event) => {
                event.preventDefault();
                if (!this.authCode) {
                    return;
                }
                const { onSubmit } = this.props;
                onSubmit({
                    _auth_code: this.authCode,
                    _trusted: this.trustedDevice,
                });
            });
        }
        get submitButtonDisabled() {
            return !this.authCode;
        }
        componentDidMount() {
            if (this.inputRef) {
                this.inputRef.focus();
            }
        }
        render() {
            const { error, methods } = this.props;
            const inputFieldClass = (0, classnames_1.default)(form_scss_1.default.inputField, {
                [form_scss_1.default.error]: error,
            });
            return (<react_1.Fragment>
                <Header_1.default small={error}>
                    {(0, index_1.translate)(error
                    ? 'sulu_admin.two_factor_authentication_failed'
                    : 'sulu_admin.two_factor_authentication')}
                </Header_1.default>

                <form className={form_scss_1.default.form} onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label className={inputFieldClass}>
                            <div className={form_scss_1.default.labelText}>
                                {(0, index_1.translate)('sulu_admin.two_factor_verification_code')}
                            </div>
                            <index_4.default autocomplete="one-time-code" icon="su-lock" inputRef={this.setInputRef} onChange={this.handleAuthCodeChange} valid={!error} value={this.authCode}/>
                        </label>
                        {methods.includes('trusted_devices') &&
                    <index_3.default checked={this.trustedDevice} onChange={this.handleTrustedDeviceChange} size="small">
                                {(0, index_1.translate)('sulu_admin.two_factor_trust_device')}
                            </index_3.default>}
                        <div className={form_scss_1.default.buttons}>
                            <index_2.default onClick={this.props.onChangeForm} skin="link">
                                {(0, index_1.translate)('sulu_admin.back_to_login')}
                            </index_2.default>
                            <index_2.default disabled={this.submitButtonDisabled} loading={this.props.loading} skin="primary" type="submit">
                                {(0, index_1.translate)('sulu_admin.verify')}
                            </index_2.default>
                        </div>
                    </fieldset>
                </form>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "TwoFactorForm");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _inputRef_decorators = [mobx_1.observable];
        _authCode_decorators = [mobx_1.observable];
        _trustedDevice_decorators = [mobx_1.observable];
        _get_submitButtonDisabled_decorators = [mobx_1.computed];
        _setInputRef_decorators = [mobx_1.action];
        _handleAuthCodeChange_decorators = [mobx_1.action];
        _handleTrustedDeviceChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_submitButtonDisabled_decorators, { kind: "getter", name: "submitButtonDisabled", static: false, private: false, access: { has: obj => "submitButtonDisabled" in obj, get: obj => obj.submitButtonDisabled }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _inputRef_decorators, { kind: "field", name: "inputRef", static: false, private: false, access: { has: obj => "inputRef" in obj, get: obj => obj.inputRef, set: (obj, value) => { obj.inputRef = value; } }, metadata: _metadata }, _inputRef_initializers, _inputRef_extraInitializers);
        __esDecorate(null, null, _authCode_decorators, { kind: "field", name: "authCode", static: false, private: false, access: { has: obj => "authCode" in obj, get: obj => obj.authCode, set: (obj, value) => { obj.authCode = value; } }, metadata: _metadata }, _authCode_initializers, _authCode_extraInitializers);
        __esDecorate(null, null, _trustedDevice_decorators, { kind: "field", name: "trustedDevice", static: false, private: false, access: { has: obj => "trustedDevice" in obj, get: obj => obj.trustedDevice, set: (obj, value) => { obj.trustedDevice = value; } }, metadata: _metadata }, _trustedDevice_initializers, _trustedDevice_extraInitializers);
        __esDecorate(null, null, _setInputRef_decorators, { kind: "field", name: "setInputRef", static: false, private: false, access: { has: obj => "setInputRef" in obj, get: obj => obj.setInputRef, set: (obj, value) => { obj.setInputRef = value; } }, metadata: _metadata }, _setInputRef_initializers, _setInputRef_extraInitializers);
        __esDecorate(null, null, _handleAuthCodeChange_decorators, { kind: "field", name: "handleAuthCodeChange", static: false, private: false, access: { has: obj => "handleAuthCodeChange" in obj, get: obj => obj.handleAuthCodeChange, set: (obj, value) => { obj.handleAuthCodeChange = value; } }, metadata: _metadata }, _handleAuthCodeChange_initializers, _handleAuthCodeChange_extraInitializers);
        __esDecorate(null, null, _handleTrustedDeviceChange_decorators, { kind: "field", name: "handleTrustedDeviceChange", static: false, private: false, access: { has: obj => "handleTrustedDeviceChange" in obj, get: obj => obj.handleTrustedDeviceChange, set: (obj, value) => { obj.handleTrustedDeviceChange = value; } }, metadata: _metadata }, _handleTrustedDeviceChange_initializers, _handleTrustedDeviceChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TwoFactorForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        error: false,
        loading: false,
        methods: [],
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TwoFactorForm = _classThis;
})();
exports.default = TwoFactorForm;
