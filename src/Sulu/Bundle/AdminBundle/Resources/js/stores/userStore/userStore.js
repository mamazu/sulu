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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const debounce_1 = __importDefault(require("debounce"));
const services_1 = require("../../services");
const initializer_1 = __importDefault(require("../../services/initializer"));
const localizationStore_1 = __importDefault(require("../localizationStore"));
const UPDATE_PERSISTENT_SETTINGS_DELAY = 2500;
const CONTENT_LOCALE_SETTING_KEY = 'sulu_admin.content_locale';
let UserStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _persistentSettings_decorators;
    let _persistentSettings_initializers = [];
    let _persistentSettings_extraInitializers = [];
    let _user_decorators;
    let _user_initializers = [];
    let _user_extraInitializers = [];
    let _contact_decorators;
    let _contact_initializers = [];
    let _contact_extraInitializers = [];
    let _loggedIn_decorators;
    let _loggedIn_initializers = [];
    let _loggedIn_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _loginError_decorators;
    let _loginError_initializers = [];
    let _loginError_extraInitializers = [];
    let _loginMethod_decorators;
    let _loginMethod_initializers = [];
    let _loginMethod_extraInitializers = [];
    let _forgotPasswordSuccess_decorators;
    let _forgotPasswordSuccess_initializers = [];
    let _forgotPasswordSuccess_extraInitializers = [];
    let _twoFactorMethods_decorators;
    let _twoFactorMethods_initializers = [];
    let _twoFactorMethods_extraInitializers = [];
    let _twoFactorError_decorators;
    let _twoFactorError_initializers = [];
    let _twoFactorError_extraInitializers = [];
    let _redirectUrl_decorators;
    let _redirectUrl_initializers = [];
    let _redirectUrl_extraInitializers = [];
    let _clear_decorators;
    let _get_systemLocale_decorators;
    let _setLoggedIn_decorators;
    let _setLoading_decorators;
    let _setLoginError_decorators;
    let _setLoginMethod_decorators;
    let _setForgotPasswordSuccess_decorators;
    let _setTwoFactorMethods_decorators;
    let _setTwoFactorError_decorators;
    let _setRedirectUrl_decorators;
    let _get_contentLocale_decorators;
    let _setUser_decorators;
    let _updateContentLocale_decorators;
    let _setContact_decorators;
    let _setFullName_decorators;
    let _setPersistentSetting_decorators;
    return _a = class UserStore {
            constructor() {
                this.persistentSettings = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _persistentSettings_initializers, new Map()));
                this.dirtyPersistentSettings = (__runInitializers(this, _persistentSettings_extraInitializers), []);
                this.user = __runInitializers(this, _user_initializers, undefined);
                this.contact = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _contact_initializers, undefined));
                this.loggedIn = (__runInitializers(this, _contact_extraInitializers), __runInitializers(this, _loggedIn_initializers, false));
                this.loading = (__runInitializers(this, _loggedIn_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.loginError = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _loginError_initializers, false));
                this.loginMethod = (__runInitializers(this, _loginError_extraInitializers), __runInitializers(this, _loginMethod_initializers, ''));
                this.forgotPasswordSuccess = (__runInitializers(this, _loginMethod_extraInitializers), __runInitializers(this, _forgotPasswordSuccess_initializers, false));
                this.twoFactorMethods = (__runInitializers(this, _forgotPasswordSuccess_extraInitializers), __runInitializers(this, _twoFactorMethods_initializers, []));
                this.twoFactorError = (__runInitializers(this, _twoFactorMethods_extraInitializers), __runInitializers(this, _twoFactorError_initializers, false));
                this.redirectUrl = (__runInitializers(this, _twoFactorError_extraInitializers), __runInitializers(this, _redirectUrl_initializers, ''));
                this.handleLogin = (__runInitializers(this, _redirectUrl_extraInitializers), (data) => {
                    this.setTwoFactorMethods([]);
                    if (data.method === 'redirect' && data.url) {
                        this.setRedirectUrl(data.url);
                        return;
                    }
                    if (data.method === 'json_login') {
                        this.setLoginMethod(data.method);
                        this.setLoading(false);
                        return;
                    }
                    if (data.completed === false) {
                        this.setLoading(false);
                        if (data.twoFactorMethods && data.twoFactorMethods.length) {
                            this.setTwoFactorMethods(data.twoFactorMethods);
                        }
                        return;
                    }
                    if (this.user) {
                        // when the user was logged in already and comes again with the same user
                        // we don't need to initialize again
                        if (this.user.username && data.username === this.user.username) {
                            this.setLoggedIn(true);
                            this.setLoading(false);
                            return;
                        }
                        this.clear();
                    }
                    if (this.loginMethod === 'json_login') {
                        this.clear();
                    }
                    this.setLoading(true);
                    return initializer_1.default.initialize(true).then(() => {
                        this.setLoading(false);
                    });
                });
                this.login = (data) => {
                    this.setLoading(true);
                    return services_1.Requester.post(services_1.Config.endpoints.loginCheck, data)
                        .then((data) => this.handleLogin(data))
                        .catch((error) => {
                        this.setLoading(false);
                        if (error.status !== 401) {
                            return Promise.reject(error);
                        }
                        if (this.loginMethod === 'json_login') {
                            this.clear();
                        }
                        this.setLoginError(true);
                    });
                };
                this.twoFactorLogin = (data) => {
                    this.setLoading(true);
                    return services_1.Requester.post(services_1.Config.endpoints.twoFactorLoginCheck, data)
                        .then((data) => this.handleLogin(data))
                        .catch((error) => {
                        this.setLoading(false);
                        this.setTwoFactorError(true);
                        if (error.status !== 401) {
                            return Promise.reject(error);
                        }
                    });
                };
                this.updatePersistentSettings = (0, debounce_1.default)(() => {
                    const persistentSettings = this.dirtyPersistentSettings.reduce((persistentSettings, persistentSettingKey) => {
                        if (this.persistentSettings.has(persistentSettingKey)) {
                            persistentSettings[persistentSettingKey] = this.persistentSettings.get(persistentSettingKey);
                        }
                        return persistentSettings;
                    }, {});
                    services_1.Requester.patch(services_1.Config.endpoints.profileSettings, persistentSettings);
                    this.dirtyPersistentSettings.splice(0, this.dirtyPersistentSettings.length);
                }, UPDATE_PERSISTENT_SETTINGS_DELAY);
            }
            clear() {
                this.persistentSettings = new Map();
                this.loggedIn = false;
                this.loading = false;
                this.user = undefined;
                this.contact = undefined;
                this.loginError = false;
                this.loginMethod = '';
                this.forgotPasswordSuccess = false;
                this.twoFactorMethods = [];
                this.twoFactorError = false;
                this.redirectUrl = '';
            }
            get systemLocale() {
                return this.user ? this.user.locale : services_1.Config.fallbackLocale;
            }
            setLoggedIn(loggedIn) {
                this.loggedIn = loggedIn;
            }
            setLoading(loading) {
                this.loading = loading;
            }
            setLoginError(loginError) {
                this.loginError = loginError;
            }
            setLoginMethod(loginMethod) {
                this.loginMethod = loginMethod;
            }
            setForgotPasswordSuccess(forgotPasswordSuccess) {
                this.forgotPasswordSuccess = forgotPasswordSuccess;
            }
            setTwoFactorMethods(twoFactorMethods) {
                this.twoFactorMethods = twoFactorMethods;
            }
            setTwoFactorError(twoFactorError) {
                this.twoFactorError = twoFactorError;
            }
            setRedirectUrl(redirectUrl) {
                this.redirectUrl = redirectUrl;
            }
            get contentLocale() {
                const contentLocale = this.persistentSettings.get(CONTENT_LOCALE_SETTING_KEY);
                if (contentLocale) {
                    return contentLocale;
                }
                const { localizations } = localizationStore_1.default;
                const defaultLocalizations = localizations.filter((localization) => localization.default);
                const fallbackLocalization = defaultLocalizations.length
                    ? defaultLocalizations[0]
                    : localizations.length > 0 ? localizations[0] : undefined;
                return fallbackLocalization ? fallbackLocalization.locale : services_1.Config.fallbackLocale;
            }
            setUser(user) {
                this.user = user;
                const persistentSettings = this.user.settings;
                Object.keys(persistentSettings).forEach((key) => {
                    this.persistentSettings.set(key, persistentSettings[key]);
                });
            }
            updateContentLocale(contentLocale) {
                this.setPersistentSetting(CONTENT_LOCALE_SETTING_KEY, contentLocale);
            }
            setContact(contact) {
                this.contact = contact;
            }
            setFullName(fullName) {
                if (this.contact) {
                    this.contact.fullName = fullName;
                }
            }
            forgotPassword(data) {
                this.setLoading(true);
                return services_1.Requester.post(services_1.Config.endpoints.forgotPasswordReset, data)
                    .then((data) => {
                    if (data.method === 'redirect' && data.url) {
                        this.setRedirectUrl(data.url);
                        return;
                    }
                    this.setLoading(false);
                    this.setForgotPasswordSuccess(true);
                })
                    .catch((error) => {
                    this.setLoading(false);
                    this.setForgotPasswordSuccess(true);
                    if (error.status !== 400) {
                        return Promise.reject(error);
                    }
                });
            }
            resetPassword(data) {
                this.setLoading(true);
                return services_1.Requester.post(services_1.Config.endpoints.resetPassword, data)
                    .then(({ user }) => this.handleLogin({ username: user }))
                    .catch(() => {
                    this.setLoading(false);
                });
            }
            logout() {
                return services_1.Requester.get(services_1.Config.endpoints.logout).then(() => {
                    this.setLoggedIn(false);
                });
            }
            setPersistentSetting(key, value) {
                if (this.persistentSettings.get(key) === value) {
                    return;
                }
                this.persistentSettings.set(key, value);
                this.dirtyPersistentSettings.push(key);
                this.updatePersistentSettings();
            }
            getPersistentSetting(key) {
                return this.persistentSettings.get(key);
            }
            validatePassword(password) {
                const pattern = services_1.Config.passwordPattern;
                if (!pattern) {
                    return true;
                }
                return new RegExp(pattern).test(password);
            }
            hasSingleSignOn() {
                return services_1.Config.endpoints.has_single_sign_on;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _persistentSettings_decorators = [mobx_1.observable];
            _user_decorators = [mobx_1.observable];
            _contact_decorators = [mobx_1.observable];
            _loggedIn_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _loginError_decorators = [mobx_1.observable];
            _loginMethod_decorators = [mobx_1.observable];
            _forgotPasswordSuccess_decorators = [mobx_1.observable];
            _twoFactorMethods_decorators = [mobx_1.observable];
            _twoFactorError_decorators = [mobx_1.observable];
            _redirectUrl_decorators = [mobx_1.observable];
            _clear_decorators = [mobx_1.action];
            _get_systemLocale_decorators = [mobx_1.computed];
            _setLoggedIn_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            _setLoginError_decorators = [mobx_1.action];
            _setLoginMethod_decorators = [mobx_1.action];
            _setForgotPasswordSuccess_decorators = [mobx_1.action];
            _setTwoFactorMethods_decorators = [mobx_1.action];
            _setTwoFactorError_decorators = [mobx_1.action];
            _setRedirectUrl_decorators = [mobx_1.action];
            _get_contentLocale_decorators = [mobx_1.computed];
            _setUser_decorators = [mobx_1.action];
            _updateContentLocale_decorators = [mobx_1.action];
            _setContact_decorators = [mobx_1.action];
            _setFullName_decorators = [mobx_1.action];
            _setPersistentSetting_decorators = [mobx_1.action];
            __esDecorate(_a, null, _clear_decorators, { kind: "method", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_systemLocale_decorators, { kind: "getter", name: "systemLocale", static: false, private: false, access: { has: obj => "systemLocale" in obj, get: obj => obj.systemLocale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoggedIn_decorators, { kind: "method", name: "setLoggedIn", static: false, private: false, access: { has: obj => "setLoggedIn" in obj, get: obj => obj.setLoggedIn }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoginError_decorators, { kind: "method", name: "setLoginError", static: false, private: false, access: { has: obj => "setLoginError" in obj, get: obj => obj.setLoginError }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoginMethod_decorators, { kind: "method", name: "setLoginMethod", static: false, private: false, access: { has: obj => "setLoginMethod" in obj, get: obj => obj.setLoginMethod }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setForgotPasswordSuccess_decorators, { kind: "method", name: "setForgotPasswordSuccess", static: false, private: false, access: { has: obj => "setForgotPasswordSuccess" in obj, get: obj => obj.setForgotPasswordSuccess }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setTwoFactorMethods_decorators, { kind: "method", name: "setTwoFactorMethods", static: false, private: false, access: { has: obj => "setTwoFactorMethods" in obj, get: obj => obj.setTwoFactorMethods }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setTwoFactorError_decorators, { kind: "method", name: "setTwoFactorError", static: false, private: false, access: { has: obj => "setTwoFactorError" in obj, get: obj => obj.setTwoFactorError }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setRedirectUrl_decorators, { kind: "method", name: "setRedirectUrl", static: false, private: false, access: { has: obj => "setRedirectUrl" in obj, get: obj => obj.setRedirectUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_contentLocale_decorators, { kind: "getter", name: "contentLocale", static: false, private: false, access: { has: obj => "contentLocale" in obj, get: obj => obj.contentLocale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setUser_decorators, { kind: "method", name: "setUser", static: false, private: false, access: { has: obj => "setUser" in obj, get: obj => obj.setUser }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _updateContentLocale_decorators, { kind: "method", name: "updateContentLocale", static: false, private: false, access: { has: obj => "updateContentLocale" in obj, get: obj => obj.updateContentLocale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setContact_decorators, { kind: "method", name: "setContact", static: false, private: false, access: { has: obj => "setContact" in obj, get: obj => obj.setContact }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setFullName_decorators, { kind: "method", name: "setFullName", static: false, private: false, access: { has: obj => "setFullName" in obj, get: obj => obj.setFullName }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setPersistentSetting_decorators, { kind: "method", name: "setPersistentSetting", static: false, private: false, access: { has: obj => "setPersistentSetting" in obj, get: obj => obj.setPersistentSetting }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _persistentSettings_decorators, { kind: "field", name: "persistentSettings", static: false, private: false, access: { has: obj => "persistentSettings" in obj, get: obj => obj.persistentSettings, set: (obj, value) => { obj.persistentSettings = value; } }, metadata: _metadata }, _persistentSettings_initializers, _persistentSettings_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: obj => "user" in obj, get: obj => obj.user, set: (obj, value) => { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _contact_decorators, { kind: "field", name: "contact", static: false, private: false, access: { has: obj => "contact" in obj, get: obj => obj.contact, set: (obj, value) => { obj.contact = value; } }, metadata: _metadata }, _contact_initializers, _contact_extraInitializers);
            __esDecorate(null, null, _loggedIn_decorators, { kind: "field", name: "loggedIn", static: false, private: false, access: { has: obj => "loggedIn" in obj, get: obj => obj.loggedIn, set: (obj, value) => { obj.loggedIn = value; } }, metadata: _metadata }, _loggedIn_initializers, _loggedIn_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _loginError_decorators, { kind: "field", name: "loginError", static: false, private: false, access: { has: obj => "loginError" in obj, get: obj => obj.loginError, set: (obj, value) => { obj.loginError = value; } }, metadata: _metadata }, _loginError_initializers, _loginError_extraInitializers);
            __esDecorate(null, null, _loginMethod_decorators, { kind: "field", name: "loginMethod", static: false, private: false, access: { has: obj => "loginMethod" in obj, get: obj => obj.loginMethod, set: (obj, value) => { obj.loginMethod = value; } }, metadata: _metadata }, _loginMethod_initializers, _loginMethod_extraInitializers);
            __esDecorate(null, null, _forgotPasswordSuccess_decorators, { kind: "field", name: "forgotPasswordSuccess", static: false, private: false, access: { has: obj => "forgotPasswordSuccess" in obj, get: obj => obj.forgotPasswordSuccess, set: (obj, value) => { obj.forgotPasswordSuccess = value; } }, metadata: _metadata }, _forgotPasswordSuccess_initializers, _forgotPasswordSuccess_extraInitializers);
            __esDecorate(null, null, _twoFactorMethods_decorators, { kind: "field", name: "twoFactorMethods", static: false, private: false, access: { has: obj => "twoFactorMethods" in obj, get: obj => obj.twoFactorMethods, set: (obj, value) => { obj.twoFactorMethods = value; } }, metadata: _metadata }, _twoFactorMethods_initializers, _twoFactorMethods_extraInitializers);
            __esDecorate(null, null, _twoFactorError_decorators, { kind: "field", name: "twoFactorError", static: false, private: false, access: { has: obj => "twoFactorError" in obj, get: obj => obj.twoFactorError, set: (obj, value) => { obj.twoFactorError = value; } }, metadata: _metadata }, _twoFactorError_initializers, _twoFactorError_extraInitializers);
            __esDecorate(null, null, _redirectUrl_decorators, { kind: "field", name: "redirectUrl", static: false, private: false, access: { has: obj => "redirectUrl" in obj, get: obj => obj.redirectUrl, set: (obj, value) => { obj.redirectUrl = value; } }, metadata: _metadata }, _redirectUrl_initializers, _redirectUrl_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new UserStore();
