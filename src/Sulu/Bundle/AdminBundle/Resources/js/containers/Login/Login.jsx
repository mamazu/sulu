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
const index_1 = __importDefault(require("../../components/Icon/index"));
const index_2 = require("../../utils/index");
const Loader_1 = __importDefault(require("../../components/Loader/Loader"));
const userStore_1 = __importDefault(require("../../stores/userStore"));
const ForgotPasswordForm_1 = __importDefault(require("./ForgotPasswordForm"));
const LoginForm_1 = __importDefault(require("./LoginForm"));
const ResetPasswordForm_1 = __importDefault(require("./ResetPasswordForm"));
const login_scss_1 = __importDefault(require("./login.scss"));
const TwoFactorForm_1 = __importDefault(require("./TwoFactorForm"));
const BACK_LINK_ARROW_LEFT_ICON = 'su-angle-left';
let Login = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _visibleForm_decorators;
    let _visibleForm_initializers = [];
    let _visibleForm_extraInitializers = [];
    let _get_loginFormVisible_decorators;
    let _get_forgotPasswordFormVisible_decorators;
    let _get_resetPasswordFormVisible_decorators;
    let _get_twoFactorVisible_decorators;
    let _clearState_decorators;
    let _clearState_initializers = [];
    let _clearState_extraInitializers = [];
    let _handleChangeToLoginForm_decorators;
    let _handleChangeToLoginForm_initializers = [];
    let _handleChangeToLoginForm_extraInitializers = [];
    let _handleChangeToForgotPasswordForm_decorators;
    let _handleChangeToForgotPasswordForm_initializers = [];
    let _handleChangeToForgotPasswordForm_extraInitializers = [];
    var Login = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.redirectDisposer = __runInitializers(this, _instanceExtraInitializers);
            this.visibleForm = __runInitializers(this, _visibleForm_initializers, this.props.router.attributes.forgotPasswordToken ? 'reset-password' : 'login');
            this.clearState = (__runInitializers(this, _visibleForm_extraInitializers), __runInitializers(this, _clearState_initializers, () => {
                if (this.loginFormVisible) {
                    userStore_1.default.setLoginError(false);
                }
                else if (this.forgotPasswordFormVisible) {
                    userStore_1.default.setForgotPasswordSuccess(false);
                }
                else if (this.twoFactorVisible) {
                    userStore_1.default.setTwoFactorMethods([]);
                    userStore_1.default.setTwoFactorError(false);
                }
            }));
            this.handleChangeToLoginForm = (__runInitializers(this, _clearState_extraInitializers), __runInitializers(this, _handleChangeToLoginForm_initializers, () => {
                this.props.router.reset();
                this.visibleForm = 'login';
            }));
            this.handleChangeToForgotPasswordForm = (__runInitializers(this, _handleChangeToLoginForm_extraInitializers), __runInitializers(this, _handleChangeToForgotPasswordForm_initializers, () => {
                this.visibleForm = 'forgot-password';
            }));
            this.handleLoginFormSubmit = (__runInitializers(this, _handleChangeToForgotPasswordForm_extraInitializers), (data) => {
                userStore_1.default.login(data).then(() => {
                    if (userStore_1.default.loginMethod === 'json_login') {
                        return;
                    }
                    if (userStore_1.default.twoFactorMethods && userStore_1.default.twoFactorMethods.length > 0) {
                        (0, mobx_1.action)(() => {
                            this.visibleForm = 'two-factor';
                        })();
                        return;
                    }
                    this.props.onLoginSuccess();
                });
            });
            this.handleForgotPasswordFormSubmit = (data) => {
                userStore_1.default.forgotPassword(data).then(() => {
                    this.props.onLoginSuccess();
                });
            };
            this.handleTwoFactorFormSubmit = (data) => {
                userStore_1.default.twoFactorLogin(data).then(() => {
                    this.props.onLoginSuccess();
                });
            };
            this.handleResetPasswordFormSubmit = (data) => {
                const { onLoginSuccess, router, } = this.props;
                const { forgotPasswordToken } = router.attributes;
                if (typeof forgotPasswordToken !== 'string') {
                    throw new Error('The "forgotPasswordToken" router attribute must be a string!');
                }
                userStore_1.default.resetPassword(Object.assign(Object.assign({}, data), { token: forgotPasswordToken }))
                    .then(() => {
                    router.reset();
                    onLoginSuccess();
                });
            };
            this.redirectDisposer = (0, mobx_1.autorun)(() => {
                if (userStore_1.default.redirectUrl !== '') {
                    window.location.href = userStore_1.default.redirectUrl;
                }
            });
        }
        componentWillUnmount() {
            this.redirectDisposer();
        }
        get loginFormVisible() {
            return this.visibleForm === 'login';
        }
        get forgotPasswordFormVisible() {
            return this.visibleForm === 'forgot-password';
        }
        get resetPasswordFormVisible() {
            return this.visibleForm === 'reset-password';
        }
        get twoFactorVisible() {
            return this.visibleForm === 'two-factor';
        }
        render() {
            const { backLink, initialized } = this.props;
            return (<div className={login_scss_1.default.login}>
                <div className={login_scss_1.default.loginContainer}>
                    <div className={login_scss_1.default.formContainer}>
                        <div className={login_scss_1.default.logoContainer}>
                            <index_1.default name="su-sulu"/>
                        </div>
                        {!initialized &&
                    <div className={login_scss_1.default.loaderContainer}>
                                <Loader_1.default size={20}/>
                            </div>}
                        {initialized && this.loginFormVisible &&
                    <LoginForm_1.default error={userStore_1.default.loginError} loading={userStore_1.default.loading} mode={userStore_1.default.hasSingleSignOn() ? (userStore_1.default.loginMethod === 'json_login' ? 'password_only' : 'username_only') : 'username_password'} onChangeForm={this.handleChangeToForgotPasswordForm} onSubmit={this.handleLoginFormSubmit}/>}
                        {initialized && this.forgotPasswordFormVisible &&
                    <ForgotPasswordForm_1.default loading={userStore_1.default.loading} onChangeForm={this.handleChangeToLoginForm} onSubmit={this.handleForgotPasswordFormSubmit} success={userStore_1.default.forgotPasswordSuccess}/>}
                        {initialized && this.resetPasswordFormVisible &&
                    <ResetPasswordForm_1.default loading={userStore_1.default.loading} onChangeForm={this.handleChangeToLoginForm} onSubmit={this.handleResetPasswordFormSubmit}/>}
                        {initialized && this.twoFactorVisible &&
                    <TwoFactorForm_1.default error={userStore_1.default.twoFactorError} loading={userStore_1.default.loading} methods={userStore_1.default.twoFactorMethods} onChangeForm={this.handleChangeToLoginForm} onSubmit={this.handleTwoFactorFormSubmit}/>}
                    </div>
                    <div className={login_scss_1.default.backLinkContainer}>
                        {initialized &&
                    <a className={login_scss_1.default.backLink} href={backLink}>
                                <index_1.default className={login_scss_1.default.backLinkIcon} name={BACK_LINK_ARROW_LEFT_ICON}/>
                                {(0, index_2.translate)('sulu_admin.back_to_website')}
                            </a>}
                    </div>
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "Login");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _visibleForm_decorators = [mobx_1.observable];
        _get_loginFormVisible_decorators = [mobx_1.computed];
        _get_forgotPasswordFormVisible_decorators = [mobx_1.computed];
        _get_resetPasswordFormVisible_decorators = [mobx_1.computed];
        _get_twoFactorVisible_decorators = [mobx_1.computed];
        _clearState_decorators = [mobx_1.action];
        _handleChangeToLoginForm_decorators = [mobx_1.action];
        _handleChangeToForgotPasswordForm_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_loginFormVisible_decorators, { kind: "getter", name: "loginFormVisible", static: false, private: false, access: { has: obj => "loginFormVisible" in obj, get: obj => obj.loginFormVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_forgotPasswordFormVisible_decorators, { kind: "getter", name: "forgotPasswordFormVisible", static: false, private: false, access: { has: obj => "forgotPasswordFormVisible" in obj, get: obj => obj.forgotPasswordFormVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resetPasswordFormVisible_decorators, { kind: "getter", name: "resetPasswordFormVisible", static: false, private: false, access: { has: obj => "resetPasswordFormVisible" in obj, get: obj => obj.resetPasswordFormVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_twoFactorVisible_decorators, { kind: "getter", name: "twoFactorVisible", static: false, private: false, access: { has: obj => "twoFactorVisible" in obj, get: obj => obj.twoFactorVisible }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _visibleForm_decorators, { kind: "field", name: "visibleForm", static: false, private: false, access: { has: obj => "visibleForm" in obj, get: obj => obj.visibleForm, set: (obj, value) => { obj.visibleForm = value; } }, metadata: _metadata }, _visibleForm_initializers, _visibleForm_extraInitializers);
        __esDecorate(null, null, _clearState_decorators, { kind: "field", name: "clearState", static: false, private: false, access: { has: obj => "clearState" in obj, get: obj => obj.clearState, set: (obj, value) => { obj.clearState = value; } }, metadata: _metadata }, _clearState_initializers, _clearState_extraInitializers);
        __esDecorate(null, null, _handleChangeToLoginForm_decorators, { kind: "field", name: "handleChangeToLoginForm", static: false, private: false, access: { has: obj => "handleChangeToLoginForm" in obj, get: obj => obj.handleChangeToLoginForm, set: (obj, value) => { obj.handleChangeToLoginForm = value; } }, metadata: _metadata }, _handleChangeToLoginForm_initializers, _handleChangeToLoginForm_extraInitializers);
        __esDecorate(null, null, _handleChangeToForgotPasswordForm_decorators, { kind: "field", name: "handleChangeToForgotPasswordForm", static: false, private: false, access: { has: obj => "handleChangeToForgotPasswordForm" in obj, get: obj => obj.handleChangeToForgotPasswordForm, set: (obj, value) => { obj.handleChangeToForgotPasswordForm = value; } }, metadata: _metadata }, _handleChangeToForgotPasswordForm_initializers, _handleChangeToForgotPasswordForm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Login = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        backLink: '/',
        initialized: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Login = _classThis;
})();
exports.default = Login;
