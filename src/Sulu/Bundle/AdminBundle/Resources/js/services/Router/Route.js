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
const path_to_regexp_1 = require("path-to-regexp");
const mobx_1 = require("mobx");
let Route = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _get_availableAttributes_decorators;
    let _get_regexp_decorators;
    return _a = class Route {
            constructor(config) {
                this.attributeDefaults = (__runInitializers(this, _instanceExtraInitializers), {});
                this.children = [];
                this.options = {};
                this.parent = undefined;
                this.rerenderAttributes = [];
                this.path = config.path;
                this.name = config.name;
                this.type = config.type;
                if (config.attributeDefaults) {
                    this.attributeDefaults = config.attributeDefaults;
                }
                if (config.options) {
                    this.options = config.options;
                }
                if (config.rerenderAttributes) {
                    this.rerenderAttributes = config.rerenderAttributes;
                }
            }
            get availableAttributes() {
                const attributes = [];
                (0, path_to_regexp_1.pathToRegexp)(this.path, attributes);
                return attributes.map((attribute) => attribute.name);
            }
            get regexp() {
                return (0, path_to_regexp_1.pathToRegexp)(this.path);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _get_availableAttributes_decorators = [mobx_1.computed];
            _get_regexp_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_availableAttributes_decorators, { kind: "getter", name: "availableAttributes", static: false, private: false, access: { has: obj => "availableAttributes" in obj, get: obj => obj.availableAttributes }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_regexp_decorators, { kind: "getter", name: "regexp", static: false, private: false, access: { has: obj => "regexp" in obj, get: obj => obj.regexp }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = Route;
