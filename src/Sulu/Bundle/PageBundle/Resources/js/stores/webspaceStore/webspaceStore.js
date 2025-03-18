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
const loglevel_1 = __importDefault(require("loglevel"));
let WebspaceStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _allWebspaces_decorators;
    let _allWebspaces_initializers = [];
    let _allWebspaces_extraInitializers = [];
    let _setWebspaces_decorators;
    let _get_grantedWebspaces_decorators;
    return _a = class WebspaceStore {
            setWebspaces(webspaces) {
                this.allWebspaces = webspaces;
            }
            get grantedWebspaces() {
                return this.allWebspaces.filter((webspace) => {
                    return webspace._permissions.view === true;
                });
            }
            hasWebspace(webspaceKey) {
                return !!this.allWebspaces.find((webspace) => webspace.key === webspaceKey);
            }
            getWebspace(webspaceKey) {
                const webspace = this.allWebspaces.find((webspace) => webspace.key === webspaceKey);
                if (!webspace) {
                    throw new Error('Webspace "' + webspaceKey + '" not found');
                }
                return webspace;
            }
            // @deprecated
            loadWebspaces() {
                loglevel_1.default.warn('The "loadWebspaces" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "grantedWebspaces" property instead.');
                return Promise.resolve(this.grantedWebspaces);
            }
            // @deprecated
            loadWebspace(webspaceKey) {
                loglevel_1.default.warn('The "loadWebspace" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "getWebspace" method instead.');
                return Promise.resolve(this.getWebspace(webspaceKey));
            }
            constructor() {
                this.allWebspaces = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _allWebspaces_initializers, void 0));
                __runInitializers(this, _allWebspaces_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _allWebspaces_decorators = [mobx_1.observable];
            _setWebspaces_decorators = [mobx_1.action];
            _get_grantedWebspaces_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _setWebspaces_decorators, { kind: "method", name: "setWebspaces", static: false, private: false, access: { has: obj => "setWebspaces" in obj, get: obj => obj.setWebspaces }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_grantedWebspaces_decorators, { kind: "getter", name: "grantedWebspaces", static: false, private: false, access: { has: obj => "grantedWebspaces" in obj, get: obj => obj.grantedWebspaces }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _allWebspaces_decorators, { kind: "field", name: "allWebspaces", static: false, private: false, access: { has: obj => "allWebspaces" in obj, get: obj => obj.allWebspaces, set: (obj, value) => { obj.allWebspaces = value; } }, metadata: _metadata }, _allWebspaces_initializers, _allWebspaces_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new WebspaceStore();
