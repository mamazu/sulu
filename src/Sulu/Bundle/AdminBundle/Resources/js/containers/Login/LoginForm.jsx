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
const index_3 = __importDefault(require("../../components/Input/index"));
const form_scss_1 = __importDefault(require("./form.scss"));
const Header_1 = __importDefault(require("./Header"));
let LoginForm = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _inputRef_decorators;
    let _inputRef_initializers = [];
    let _inputRef_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _password_extraInitializers = [];
    let _get_submitButtonDisabled_decorators;
    let _setInputRef_decorators;
    let _setInputRef_initializers = [];
    let _setInputRef_extraInitializers = [];
    let _handleUserChange_decorators;
    let _handleUserChange_initializers = [];
    let _handleUserChange_extraInitializers = [];
    let _handlePasswordChange_decorators;
    let _handlePasswordChange_initializers = [];
    let _handlePasswordChange_extraInitializers = [];
    let _handleSubmit_decorators;
    let _handleSubmit_initializers = [];
    let _handleSubmit_extraInitializers = [];
    var LoginForm = _classThis = class extends _classSuper {
        get submitButtonDisabled() {
            return !(this.user && this.password)
                && !((this.user || this.password)
                    && this.props.mode !== 'username_password');
        }
        componentDidMount() {
            if (this.inputRef) {
                this.inputRef.focus();
            }
        }
        render() {
            const { error } = this.props;
            const inputFieldClass = (0, classnames_1.default)(form_scss_1.default.inputField, {
                [form_scss_1.default.error]: error,
            });
            return (<react_1.Fragment>
                <Header_1.default small={error}>
                    {(0, index_1.translate)(error ? 'sulu_admin.login_error' : 'sulu_admin.welcome')}
                </Header_1.default>
                <form className={form_scss_1.default.form} onSubmit={this.handleSubmit}>
                    <fieldset>
                        {(this.props.mode !== 'password_only') && (<label className={inputFieldClass}>
                                <div className={form_scss_1.default.labelText}>
                                    {(0, index_1.translate)('sulu_admin.username_or_email')}
                                </div>
                                <index_3.default autocomplete="username" autoFocus={this.props.mode === 'username_only'} icon="su-user" inputRef={this.setInputRef} onChange={this.handleUserChange} valid={!this.props.error} value={this.user}/>
                            </label>)}
                        {(this.props.mode !== 'username_only') && (<label className={inputFieldClass}>
                                <div className={form_scss_1.default.labelText}>
                                    {(0, index_1.translate)('sulu_admin.password')}
                                </div>
                                <index_3.default autocomplete="current-password" autoFocus={this.props.mode === 'password_only'} icon="su-lock" onChange={this.handlePasswordChange} type="password" valid={!this.props.error} value={this.password}/>
                            </label>)}
                        <div className={form_scss_1.default.buttons}>
                            <index_2.default onClick={this.props.onChangeForm} skin="link">
                                {(0, index_1.translate)('sulu_admin.forgot_password')}
                            </index_2.default>
                            <index_2.default disabled={this.submitButtonDisabled} loading={this.props.loading} skin="primary" type="submit">
                                {(0, index_1.translate)('sulu_admin.login')}
                            </index_2.default>
                        </div>
                    </fieldset>
                </form>
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.inputRef = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _inputRef_initializers, void 0));
            this.user = (__runInitializers(this, _inputRef_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.password = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.setInputRef = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _setInputRef_initializers, (ref) => {
                this.inputRef = ref;
            }));
            this.handleUserChange = (__runInitializers(this, _setInputRef_extraInitializers), __runInitializers(this, _handleUserChange_initializers, (user) => {
                this.user = user;
            }));
            this.handlePasswordChange = (__runInitializers(this, _handleUserChange_extraInitializers), __runInitializers(this, _handlePasswordChange_initializers, (password) => {
                this.password = password;
            }));
            this.handleSubmit = (__runInitializers(this, _handlePasswordChange_extraInitializers), __runInitializers(this, _handleSubmit_initializers, (event) => {
                var _a;
                event.preventDefault();
                if (this.user && this.props.mode !== 'username_password') {
                    const { onSubmit } = this.props;
                    onSubmit({
                        username: this.user,
                        password: (_a = this.password) !== null && _a !== void 0 ? _a : '',
                    });
                    if (this.user && this.password) {
                        this.user = undefined;
                        this.password = undefined;
                    }
                    return;
                }
                if (!this.user || !this.password) {
                    return;
                }
                const { onSubmit } = this.props;
                onSubmit({
                    username: this.user,
                    password: this.password,
                });
            }));
            __runInitializers(this, _handleSubmit_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "LoginForm");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _inputRef_decorators = [mobx_1.observable];
        _user_decorators = [mobx_1.observable];
        _password_decorators = [mobx_1.observable];
        _get_submitButtonDisabled_decorators = [mobx_1.computed];
        _setInputRef_decorators = [mobx_1.action];
        _handleUserChange_decorators = [mobx_1.action];
        _handlePasswordChange_decorators = [mobx_1.action];
        _handleSubmit_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_submitButtonDisabled_decorators, { kind: "getter", name: "submitButtonDisabled", static: false, private: false, access: { has: obj => "submitButtonDisabled" in obj, get: obj => obj.submitButtonDisabled }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _inputRef_decorators, { kind: "field", name: "inputRef", static: false, private: false, access: { has: obj => "inputRef" in obj, get: obj => obj.inputRef, set: (obj, value) => { obj.inputRef = value; } }, metadata: _metadata }, _inputRef_initializers, _inputRef_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _setInputRef_decorators, { kind: "field", name: "setInputRef", static: false, private: false, access: { has: obj => "setInputRef" in obj, get: obj => obj.setInputRef, set: (obj, value) => { obj.setInputRef = value; } }, metadata: _metadata }, _setInputRef_initializers, _setInputRef_extraInitializers);
        __esDecorate(null, null, _handleUserChange_decorators, { kind: "field", name: "handleUserChange", static: false, private: false, access: { has: obj => "handleUserChange" in obj, get: obj => obj.handleUserChange, set: (obj, value) => { obj.handleUserChange = value; } }, metadata: _metadata }, _handleUserChange_initializers, _handleUserChange_extraInitializers);
        __esDecorate(null, null, _handlePasswordChange_decorators, { kind: "field", name: "handlePasswordChange", static: false, private: false, access: { has: obj => "handlePasswordChange" in obj, get: obj => obj.handlePasswordChange, set: (obj, value) => { obj.handlePasswordChange = value; } }, metadata: _metadata }, _handlePasswordChange_initializers, _handlePasswordChange_extraInitializers);
        __esDecorate(null, null, _handleSubmit_decorators, { kind: "field", name: "handleSubmit", static: false, private: false, access: { has: obj => "handleSubmit" in obj, get: obj => obj.handleSubmit, set: (obj, value) => { obj.handleSubmit = value; } }, metadata: _metadata }, _handleSubmit_initializers, _handleSubmit_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginForm = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        error: false,
        loading: false,
        mode: 'username_password',
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginForm = _classThis;
})();
exports.default = LoginForm;
