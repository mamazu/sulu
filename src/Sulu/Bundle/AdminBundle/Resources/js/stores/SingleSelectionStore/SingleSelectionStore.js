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
const services_1 = require("../../services");
let SingleSelectionStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _item_decorators;
    let _item_initializers = [];
    let _item_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _set_decorators;
    let _clear_decorators;
    let _setLoading_decorators;
    let _loadItem_decorators;
    return _a = class SingleSelectionStore {
            constructor(resourceKey, selectedItemId, locale, options = {}) {
                this.item = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _item_initializers, void 0));
                this.loading = (__runInitializers(this, _item_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.resourceKey = __runInitializers(this, _loading_extraInitializers);
                this.resourceKey = resourceKey;
                this.locale = locale;
                this.options = options;
                if (selectedItemId) {
                    this.loadItem(selectedItemId);
                }
            }
            set(item) {
                this.item = item;
            }
            clear() {
                this.item = undefined;
            }
            setLoading(loading) {
                this.loading = loading;
            }
            loadItem(itemId) {
                if (!itemId) {
                    this.item = undefined;
                    return;
                }
                this.setLoading(true);
                return services_1.ResourceRequester
                    .get(this.resourceKey, Object.assign(Object.assign({}, this.options), { id: itemId, locale: this.locale ? this.locale.get() : undefined }))
                    .then((0, mobx_1.action)((data) => {
                    this.item = data;
                    this.setLoading(false);
                }))
                    .catch((0, mobx_1.action)((error) => {
                    if (error.status !== 404) {
                        return Promise.reject(error);
                    }
                    this.item = null;
                    this.setLoading(false);
                }));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _item_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _set_decorators = [mobx_1.action];
            _clear_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            _loadItem_decorators = [mobx_1.action];
            __esDecorate(_a, null, _set_decorators, { kind: "method", name: "set", static: false, private: false, access: { has: obj => "set" in obj, get: obj => obj.set }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clear_decorators, { kind: "method", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _loadItem_decorators, { kind: "method", name: "loadItem", static: false, private: false, access: { has: obj => "loadItem" in obj, get: obj => obj.loadItem }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _item_decorators, { kind: "field", name: "item", static: false, private: false, access: { has: obj => "item" in obj, get: obj => obj.item, set: (obj, value) => { obj.item = value; } }, metadata: _metadata }, _item_initializers, _item_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SingleSelectionStore;
