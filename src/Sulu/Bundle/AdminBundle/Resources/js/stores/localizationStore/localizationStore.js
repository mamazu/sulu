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
let LocalizationStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _localizations_decorators;
    let _localizations_initializers = [];
    let _localizations_extraInitializers = [];
    let _setLocalizations_decorators;
    return _a = class LocalizationStore {
            setLocalizations(localizations) {
                this.localizations = localizations;
            }
            // @deprecated
            loadLocalizations() {
                loglevel_1.default.warn('The "loadLocalizations" method is deprecated since 2.1 and will be removed. ' +
                    'Use the "localizations" property instead.');
                return Promise.resolve(this.localizations);
            }
            constructor() {
                this.localizations = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _localizations_initializers, []));
                __runInitializers(this, _localizations_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _localizations_decorators = [mobx_1.observable];
            _setLocalizations_decorators = [mobx_1.action];
            __esDecorate(_a, null, _setLocalizations_decorators, { kind: "method", name: "setLocalizations", static: false, private: false, access: { has: obj => "setLocalizations" in obj, get: obj => obj.setLocalizations }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _localizations_decorators, { kind: "field", name: "localizations", static: false, private: false, access: { has: obj => "localizations" in obj, get: obj => obj.localizations, set: (obj, value) => { obj.localizations = value; } }, metadata: _metadata }, _localizations_initializers, _localizations_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new LocalizationStore();
