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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZES = exports.DEFAULT_SIZE = void 0;
const mobx_1 = require("mobx");
const DEFAULT_SIZE = 'medium';
exports.DEFAULT_SIZE = DEFAULT_SIZE;
const SIZES = ['small', 'medium', 'large'];
exports.SIZES = SIZES;
let SidebarStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _view_decorators;
    let _view_initializers = [];
    let _view_extraInitializers = [];
    let _props_decorators;
    let _props_initializers = [];
    let _props_extraInitializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _size_extraInitializers = [];
    let _setConfig_decorators;
    let _clearConfig_decorators;
    let _get_enabled_decorators;
    let _setSize_decorators;
    return _a = class SidebarStore {
            constructor() {
                this.view = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _view_initializers, void 0));
                this.props = (__runInitializers(this, _view_extraInitializers), __runInitializers(this, _props_initializers, void 0));
                this.sizes = __runInitializers(this, _props_extraInitializers);
                this.size = __runInitializers(this, _size_initializers, void 0);
                __runInitializers(this, _size_extraInitializers);
                this.clearConfig();
            }
            setConfig(config) {
                this.view = config.view;
                this.props = config.props || {};
                this.sizes = config.sizes || SIZES;
                if (!this.size || !this.sizes.includes(this.size)) {
                    this.setSize(config.defaultSize || DEFAULT_SIZE);
                }
            }
            clearConfig() {
                this.view = undefined;
                this.props = {};
                this.sizes = SIZES;
                this.size = null;
            }
            get enabled() {
                return !!this.view;
            }
            setSize(size) {
                if (!this.sizes.includes(size)) {
                    throw new Error('Size "' + size + '" is not supported by view. Supported: ["' + this.sizes.join('", "') + '"]');
                }
                this.size = size;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _view_decorators = [mobx_1.observable];
            _props_decorators = [mobx_1.observable];
            _size_decorators = [mobx_1.observable];
            _setConfig_decorators = [mobx_1.action];
            _clearConfig_decorators = [mobx_1.action];
            _get_enabled_decorators = [mobx_1.computed];
            _setSize_decorators = [mobx_1.action];
            __esDecorate(_a, null, _setConfig_decorators, { kind: "method", name: "setConfig", static: false, private: false, access: { has: obj => "setConfig" in obj, get: obj => obj.setConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clearConfig_decorators, { kind: "method", name: "clearConfig", static: false, private: false, access: { has: obj => "clearConfig" in obj, get: obj => obj.clearConfig }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_enabled_decorators, { kind: "getter", name: "enabled", static: false, private: false, access: { has: obj => "enabled" in obj, get: obj => obj.enabled }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setSize_decorators, { kind: "method", name: "setSize", static: false, private: false, access: { has: obj => "setSize" in obj, get: obj => obj.setSize }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _view_decorators, { kind: "field", name: "view", static: false, private: false, access: { has: obj => "view" in obj, get: obj => obj.view, set: (obj, value) => { obj.view = value; } }, metadata: _metadata }, _view_initializers, _view_extraInitializers);
            __esDecorate(null, null, _props_decorators, { kind: "field", name: "props", static: false, private: false, access: { has: obj => "props" in obj, get: obj => obj.props, set: (obj, value) => { obj.props = value; } }, metadata: _metadata }, _props_initializers, _props_extraInitializers);
            __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new SidebarStore();
