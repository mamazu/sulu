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
const services_1 = require("../../services");
const index_1 = require("../../utils/index");
const index_2 = __importDefault(require("../../components/Button/index"));
const index_3 = __importDefault(require("../../components/Input/index"));
const field_scss_1 = __importDefault(require("../../components/Form/field.scss"));
const stores_1 = require("../../stores");
const form_scss_1 = __importDefault(require("./form.scss"));
const Header_1 = __importDefault(require("./Header"));
let ResetPasswordForm = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _inputRef_decorators;
    let _inputRef_initializers = [];
    let _inputRef_extraInitializers = [];
    let _errorMessage_decorators;
    let _errorMessage_initializers = [];
    let _errorMessage_extraInitializers = [];
    let _password1_decorators;
    let _password1_initializers = [];
    let _password1_extraInitializers = [];
    let _password2_decorators;
    let _password2_initializers = [];
    let _password2_extraInitializers = [];
    let _get_submitButtonDisabled_decorators;
    let _setInputRef_decorators;
    let _setInputRef_initializers = [];
    let _setInputRef_extraInitializers = [];
    let _handlePassword1Change_decorators;
    let _handlePassword1Change_initializers = [];
    let _handlePassword1Change_extraInitializers = [];
    let _handlePassword2Change_decorators;
    let _handlePassword2Change_initializers = [];
    let _handlePassword2Change_extraInitializers = [];
    let _handleSubmit_decorators;
    let _handleSubmit_initializers = [];
    let _handleSubmit_extraInitializers = [];
    var ResetPasswordForm = _classThis = class extends _classSuper {
        get submitButtonDisabled() {
            return !(this.password1 && this.password2);
        }
        componentDidMount() {
            if (this.inputRef) {
                this.inputRef.focus();
            }
        }
        render() {
            const inputFieldClass = (0, classnames_1.default)(form_scss_1.default.inputField, {
                [form_scss_1.default.error]: this.errorMessage !== null,
            });
            return (<react_1.Fragment>
                <Header_1.default small={this.errorMessage !== null}>
                    {(0, index_1.translate)(this.errorMessage || 'sulu_admin.reset_password')}
                </Header_1.default>
                <form className={form_scss_1.default.form} onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label className={inputFieldClass}>
                            <div className={form_scss_1.default.labelText}>
                                {(0, index_1.translate)('sulu_admin.password')}
                            </div>
                            <index_3.default autocomplete="new-password" icon="su-lock" inputRef={this.setInputRef} onChange={this.handlePassword1Change} type="password" valid={!this.errorMessage} value={this.password1}/>
                        </label>
                        <label className={inputFieldClass}>
                            <div className={form_scss_1.default.labelText}>
                                {(0, index_1.translate)('sulu_admin.repeat_password')}
                            </div>
                            <index_3.default autocomplete="new-password" icon="su-lock" onChange={this.handlePassword2Change} type="password" valid={!this.errorMessage} value={this.password2}/>
                        </label>
                        {services_1.Config.passwordInfoTranslationKey &&
                    <label className={field_scss_1.default.descriptionLabel}>
                                {(0, index_1.translate)(services_1.Config.passwordInfoTranslationKey)}
                            </label>}
                        <div className={form_scss_1.default.buttons}>
                            <index_2.default onClick={this.props.onChangeForm} skin="link">
                                {(0, index_1.translate)('sulu_admin.back_to_login')}
                            </index_2.default>
                            <index_2.default disabled={this.submitButtonDisabled} loading={this.props.loading} skin="primary" type="submit">
                                {(0, index_1.translate)('sulu_admin.reset_password')}
                            </index_2.default>
                        </div>
                    </fieldset>
                </form>
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.inputRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputRef_initializers, void 0));
            this.errorMessage = (__runInitializers(this, _inputRef_extraInitializers), __runInitializers(this, _errorMessage_initializers, null));
            this.password1 = (__runInitializers(this, _errorMessage_extraInitializers), __runInitializers(this, _password1_initializers, void 0));
            this.password2 = (__runInitializers(this, _password1_extraInitializers), __runInitializers(this, _password2_initializers, void 0));
            this.setInputRef = (__runInitializers(this, _password2_extraInitializers), __runInitializers(this, _setInputRef_initializers, (ref) => {
                this.inputRef = ref;
            }));
            this.handlePassword1Change = (__runInitializers(this, _setInputRef_extraInitializers), __runInitializers(this, _handlePassword1Change_initializers, (password1) => {
                this.password1 = password1;
                this.errorMessage = null;
            }));
            this.handlePassword2Change = (__runInitializers(this, _handlePassword1Change_extraInitializers), __runInitializers(this, _handlePassword2Change_initializers, (password2) => {
                this.password2 = password2;
                this.errorMessage = null;
            }));
            this.handleSubmit = (__runInitializers(this, _handlePassword2Change_extraInitializers), __runInitializers(this, _handleSubmit_initializers, (event) => {
                event.preventDefault();
                if (!this.password1 || !this.password2 || this.password1 !== this.password2) {
                    this.errorMessage = 'sulu_admin.reset_password_error';
                    return;
                }
                if (!stores_1.userStore.validatePassword(this.password1 || '')) {
                    this.errorMessage = 'sulu_admin.reset_password_pattern_error';
                    return;
                }
                this.errorMessage = null;
                const { onSubmit } = this.props;
                onSubmit({ password: this.password1 || '' });
            }));
            __runInitializers(this, _handleSubmit_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ResetPasswordForm");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _inputRef_decorators = [mobx_1.observable];
        _errorMessage_decorators = [mobx_1.observable];
        _password1_decorators = [mobx_1.observable];
        _password2_decorators = [mobx_1.observable];
        _get_submitButtonDisabled_decorators = [mobx_1.computed];
        _setInputRef_decorators = [mobx_1.action];
        _handlePassword1Change_decorators = [mobx_1.action];
        _handlePassword2Change_decorators = [mobx_1.action];
        _handleSubmit_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_submitButtonDisabled_decorators, { kind: "getter", name: "submitButtonDisabled", static: false, private: false, access: { has: obj => "submitButtonDisabled" in obj, get: obj => obj.submitButtonDisabled }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _inputRef_decorators, { kind: "field", name: "inputRef", static: false, private: false, access: { has: obj => "inputRef" in obj, get: obj => obj.inputRef, set: (obj, value) => { obj.inputRef = value; } }, metadata: _metadata }, _inputRef_initializers, _inputRef_extraInitializers);
        __esDecorate(null, null, _errorMessage_decorators, { kind: "field", name: "errorMessage", static: false, private: false, access: { has: obj => "errorMessage" in obj, get: obj => obj.errorMessage, set: (obj, value) => { obj.errorMessage = value; } }, metadata: _metadata }, _errorMessage_initializers, _errorMessage_extraInitializers);
        __esDecorate(null, null, _password1_decorators, { kind: "field", name: "password1", static: false, private: false, access: { has: obj => "password1" in obj, get: obj => obj.password1, set: (obj, value) => { obj.password1 = value; } }, metadata: _metadata }, _password1_initializers, _password1_extraInitializers);
        __esDecorate(null, null, _password2_decorators, { kind: "field", name: "password2", static: false, private: false, access: { has: obj => "password2" in obj, get: obj => obj.password2, set: (obj, value) => { obj.password2 = value; } }, metadata: _metadata }, _password2_initializers, _password2_extraInitializers);
        __esDecorate(null, null, _setInputRef_decorators, { kind: "field", name: "setInputRef", static: false, private: false, access: { has: obj => "setInputRef" in obj, get: obj => obj.setInputRef, set: (obj, value) => { obj.setInputRef = value; } }, metadata: _metadata }, _setInputRef_initializers, _setInputRef_extraInitializers);
        __esDecorate(null, null, _handlePassword1Change_decorators, { kind: "field", name: "handlePassword1Change", static: false, private: false, access: { has: obj => "handlePassword1Change" in obj, get: obj => obj.handlePassword1Change, set: (obj, value) => { obj.handlePassword1Change = value; } }, metadata: _metadata }, _handlePassword1Change_initializers, _handlePassword1Change_extraInitializers);
        __esDecorate(null, null, _handlePassword2Change_decorators, { kind: "field", name: "handlePassword2Change", static: false, private: false, access: { has: obj => "handlePassword2Change" in obj, get: obj => obj.handlePassword2Change, set: (obj, value) => { obj.handlePassword2Change = value; } }, metadata: _metadata }, _handlePassword2Change_initializers, _handlePassword2Change_extraInitializers);
        __esDecorate(null, null, _handleSubmit_decorators, { kind: "field", name: "handleSubmit", static: false, private: false, access: { has: obj => "handleSubmit" in obj, get: obj => obj.handleSubmit, set: (obj, value) => { obj.handleSubmit = value; } }, metadata: _metadata }, _handleSubmit_initializers, _handleSubmit_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResetPasswordForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        loading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResetPasswordForm = _classThis;
})();
exports.default = ResetPasswordForm;
