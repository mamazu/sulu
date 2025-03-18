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
const mobx_1 = require("mobx");
const services_1 = require("sulu-admin-bundle/services");
const RESOURCE_KEY = 'media_formats';
let MediaFormatStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _mediaFormats_decorators;
    let _mediaFormats_initializers = [];
    let _mediaFormats_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _saving_decorators;
    let _saving_initializers = [];
    let _saving_extraInitializers = [];
    let _updateFormatOptions_decorators;
    return _a = class MediaFormatStore {
            constructor(id, locale) {
                this.id = __runInitializers(this, _instanceExtraInitializers);
                this.mediaFormats = __runInitializers(this, _mediaFormats_initializers, void 0);
                this.loading = (__runInitializers(this, _mediaFormats_extraInitializers), __runInitializers(this, _loading_initializers, void 0));
                this.saving = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _saving_initializers, void 0));
                __runInitializers(this, _saving_extraInitializers);
                this.id = id;
                this.locale = locale;
                this.loading = true;
                services_1.ResourceRequester.getList(RESOURCE_KEY, { id, locale }).then((0, mobx_1.action)((response) => {
                    this.loading = false;
                    this.mediaFormats = response;
                }));
            }
            getFormatOptions(formatKey) {
                if (!this.mediaFormats) {
                    return undefined;
                }
                return this.mediaFormats[formatKey];
            }
            updateFormatOptions(options) {
                this.saving = true;
                return services_1.ResourceRequester
                    .patch(RESOURCE_KEY, options, { id: this.id, locale: this.locale })
                    .then((0, mobx_1.action)((response) => {
                    this.saving = false;
                    const mediaFormats = Object.assign(Object.assign({}, this.mediaFormats), response);
                    this.mediaFormats = Object.keys(mediaFormats).reduce((newMediaFormats, mediaFormatKey) => {
                        const mediaFormat = mediaFormats[mediaFormatKey];
                        if (Object.keys(mediaFormat).length === 0) {
                            return newMediaFormats;
                        }
                        newMediaFormats[mediaFormatKey] = mediaFormat;
                        return newMediaFormats;
                    }, {});
                }));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _mediaFormats_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _saving_decorators = [mobx_1.observable];
            _updateFormatOptions_decorators = [mobx_1.action];
            __esDecorate(_a, null, _updateFormatOptions_decorators, { kind: "method", name: "updateFormatOptions", static: false, private: false, access: { has: obj => "updateFormatOptions" in obj, get: obj => obj.updateFormatOptions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _mediaFormats_decorators, { kind: "field", name: "mediaFormats", static: false, private: false, access: { has: obj => "mediaFormats" in obj, get: obj => obj.mediaFormats, set: (obj, value) => { obj.mediaFormats = value; } }, metadata: _metadata }, _mediaFormats_initializers, _mediaFormats_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _saving_decorators, { kind: "field", name: "saving", static: false, private: false, access: { has: obj => "saving" in obj, get: obj => obj.saving, set: (obj, value) => { obj.saving = value; } }, metadata: _metadata }, _saving_initializers, _saving_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = MediaFormatStore;
