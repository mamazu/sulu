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
const moment_1 = __importDefault(require("moment"));
const Config_1 = __importDefault(require("../Config"));
const Translator_1 = require("../../utils/Translator");
const Requester_1 = __importDefault(require("../Requester"));
const ResourceRequester_1 = require("../ResourceRequester");
function getBrowserLanguage() {
    // detect browser locale (ie, ff, chrome fallbacks)
    const language = window.navigator.languages ? window.navigator.languages[0] : null;
    return language || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
}
function getDefaultLocale() {
    const browserLanguage = getBrowserLanguage();
    // select only language
    const locale = browserLanguage.slice(0, 2).toLowerCase();
    if (Config_1.default.translations.indexOf(locale) === -1) {
        return Config_1.default.fallbackLocale;
    }
    return locale;
}
function setMomentLocale() {
    moment_1.default.locale(getBrowserLanguage());
}
let Initializer = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _config_decorators;
    let _config_initializers = [];
    let _config_extraInitializers = [];
    let _initialized_decorators;
    let _initialized_initializers = [];
    let _initialized_extraInitializers = [];
    let _initializedTranslationsLocale_decorators;
    let _initializedTranslationsLocale_initializers = [];
    let _initializedTranslationsLocale_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _get_bundles_decorators;
    let _clear_decorators;
    let _setInitialized_decorators;
    let _setInitializedTranslationsLocale_decorators;
    let _setLoading_decorators;
    return _a = class Initializer {
            constructor() {
                this.config = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _config_initializers, void 0));
                this.initialized = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _initialized_initializers, false));
                this.initializedTranslationsLocale = (__runInitializers(this, _initialized_extraInitializers), __runInitializers(this, _initializedTranslationsLocale_initializers, void 0));
                this.loading = (__runInitializers(this, _initializedTranslationsLocale_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.updateConfigHooks = (__runInitializers(this, _loading_extraInitializers), {});
            }
            get bundles() {
                if (!this.config) {
                    return [];
                }
                return Object.keys(this.config);
            }
            clear() {
                this.initialized = false;
                this.initializedTranslationsLocale = undefined;
                this.loading = false;
                this.config = undefined;
            }
            setInitialized() {
                this.initialized = true;
            }
            setInitializedTranslationsLocale(locale) {
                this.initializedTranslationsLocale = locale;
            }
            setLoading(loading) {
                this.loading = loading;
            }
            addUpdateConfigHook(bundle, hook) {
                if (!this.updateConfigHooks[bundle]) {
                    this.updateConfigHooks[bundle] = [];
                }
                this.updateConfigHooks[bundle].push(hook);
            }
            initializeSymfonyRouting() {
                return Requester_1.default.get(Config_1.default.endpoints.routing).then((data) => {
                    ResourceRequester_1.resourceRouteRegistry.setRoutingData(data);
                });
            }
            initializeTranslations(locale) {
                return this.initializedTranslationsLocale === locale
                    ? Promise.resolve()
                    : Requester_1.default.get(Config_1.default.endpoints.translations + '?locale=' + locale).then((translations) => {
                        (0, Translator_1.setTranslations)(translations, locale);
                        this.setInitializedTranslationsLocale(locale);
                    });
            }
            initialize(userIsLoggedIn) {
                this.setLoading(true);
                // the config and the routes are accessible only for authenticated users
                // if no user is logged in, we do not want to fetch this data to prevent unnecessary 401 responses
                // a 401 response will reset cached basic auth credentials and lead to a second authentication prompt
                if (!userIsLoggedIn) {
                    return this.initializeTranslations(getDefaultLocale())
                        .then(() => {
                        this.setLoading(false);
                    });
                }
                const configPromise = Requester_1.default.get(Config_1.default.endpoints.config);
                const routePromise = this.initializeSymfonyRouting();
                return Promise.all([configPromise, routePromise])
                    .then((0, mobx_1.action)(([config]) => {
                    var _b, _c;
                    const locale = ((_c = (_b = config === null || config === void 0 ? void 0 : config.sulu_admin) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.locale) || getDefaultLocale();
                    return this.initializeTranslations(locale).then(() => {
                        return config;
                    });
                }))
                    .then((0, mobx_1.action)((config) => {
                    this.config = config;
                    if (!this.initialized) {
                        setMomentLocale();
                    }
                    for (const bundle in this.updateConfigHooks) {
                        this.updateConfigHooks[bundle].forEach((hook) => {
                            hook(config[bundle], this.initialized);
                        });
                    }
                    this.setInitialized();
                    return Promise.resolve().then(() => {
                        this.setLoading(false);
                    });
                }))
                    .catch((error) => {
                    if (error.status !== 401) {
                        return Promise.reject(error);
                    }
                    return Promise.resolve().then(() => {
                        this.setLoading(false);
                    });
                });
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [mobx_1.observable];
            _initialized_decorators = [mobx_1.observable];
            _initializedTranslationsLocale_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _get_bundles_decorators = [mobx_1.computed];
            _clear_decorators = [mobx_1.action];
            _setInitialized_decorators = [mobx_1.action];
            _setInitializedTranslationsLocale_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_bundles_decorators, { kind: "getter", name: "bundles", static: false, private: false, access: { has: obj => "bundles" in obj, get: obj => obj.bundles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clear_decorators, { kind: "method", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setInitialized_decorators, { kind: "method", name: "setInitialized", static: false, private: false, access: { has: obj => "setInitialized" in obj, get: obj => obj.setInitialized }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setInitializedTranslationsLocale_decorators, { kind: "method", name: "setInitializedTranslationsLocale", static: false, private: false, access: { has: obj => "setInitializedTranslationsLocale" in obj, get: obj => obj.setInitializedTranslationsLocale }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _initialized_decorators, { kind: "field", name: "initialized", static: false, private: false, access: { has: obj => "initialized" in obj, get: obj => obj.initialized, set: (obj, value) => { obj.initialized = value; } }, metadata: _metadata }, _initialized_initializers, _initialized_extraInitializers);
            __esDecorate(null, null, _initializedTranslationsLocale_decorators, { kind: "field", name: "initializedTranslationsLocale", static: false, private: false, access: { has: obj => "initializedTranslationsLocale" in obj, get: obj => obj.initializedTranslationsLocale, set: (obj, value) => { obj.initializedTranslationsLocale = value; } }, metadata: _metadata }, _initializedTranslationsLocale_initializers, _initializedTranslationsLocale_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new Initializer();
