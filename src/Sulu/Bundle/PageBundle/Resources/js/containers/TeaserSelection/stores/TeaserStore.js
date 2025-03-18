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
const ResourceRequester_1 = __importDefault(require("sulu-admin-bundle/services/ResourceRequester"));
let TeaserStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _teaserItemIds_decorators;
    let _teaserItemIds_initializers = [];
    let _teaserItemIds_extraInitializers = [];
    let _teaserItems_decorators;
    let _teaserItems_initializers = [];
    let _teaserItems_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _setLoading_decorators;
    return _a = class TeaserStore {
            constructor(locale) {
                this.locale = __runInitializers(this, _instanceExtraInitializers);
                this.teaserItemIds = __runInitializers(this, _teaserItemIds_initializers, []);
                this.teaserItems = (__runInitializers(this, _teaserItemIds_extraInitializers), __runInitializers(this, _teaserItems_initializers, []));
                this.loading = (__runInitializers(this, _teaserItems_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.teaserDisposer = __runInitializers(this, _loading_extraInitializers);
                this.loadTeasers = () => {
                    this.setLoading(true);
                    ResourceRequester_1.default.getList('teasers', {
                        ids: this.teaserItemIds.map((teaserItemId) => teaserItemId.type + ';' + teaserItemId.id),
                        locale: this.locale.get(),
                    }).then((0, mobx_1.action)((response) => {
                        this.teaserItems.splice(0, this.teaserItems.length, ...response._embedded.teasers);
                        this.setLoading(false);
                    }));
                };
                this.locale = locale;
                this.teaserDisposer = (0, mobx_1.autorun)(this.loadTeasers);
            }
            destroy() {
                this.teaserDisposer();
            }
            add(type, id) {
                if (this.teaserItemIds.find((teaserItemId) => teaserItemId.type === type && teaserItemId.id === id)) {
                    return;
                }
                this.teaserItemIds.push({ type, id });
            }
            findById(type, id) {
                return this.teaserItems.find((teaserItem) => teaserItem.type === type && teaserItem.id === id);
            }
            setLoading(loading) {
                this.loading = loading;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _teaserItemIds_decorators = [mobx_1.observable];
            _teaserItems_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _setLoading_decorators = [mobx_1.action];
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _teaserItemIds_decorators, { kind: "field", name: "teaserItemIds", static: false, private: false, access: { has: obj => "teaserItemIds" in obj, get: obj => obj.teaserItemIds, set: (obj, value) => { obj.teaserItemIds = value; } }, metadata: _metadata }, _teaserItemIds_initializers, _teaserItemIds_extraInitializers);
            __esDecorate(null, null, _teaserItems_decorators, { kind: "field", name: "teaserItems", static: false, private: false, access: { has: obj => "teaserItems" in obj, get: obj => obj.teaserItems, set: (obj, value) => { obj.teaserItems = value; } }, metadata: _metadata }, _teaserItems_initializers, _teaserItems_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = TeaserStore;
