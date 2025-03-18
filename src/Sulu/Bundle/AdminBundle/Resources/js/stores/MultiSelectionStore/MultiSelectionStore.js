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
const utils_1 = require("../../utils");
const services_1 = require("../../services");
let MultiSelectionStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _items_decorators;
    let _items_initializers = [];
    let _items_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _get_ids_decorators;
    let _set_decorators;
    let _removeById_decorators;
    let _move_decorators;
    let _setLoading_decorators;
    return _a = class MultiSelectionStore {
            constructor(resourceKey, selectedItemIds, locale, idFilterParameter = 'ids', requestParameters = {}) {
                this.items = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _items_initializers, []));
                this.loading = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _loading_initializers, false));
                this.resourceKey = __runInitializers(this, _loading_extraInitializers);
                this.resourceKey = resourceKey;
                this.locale = locale;
                this.idFilterParameter = idFilterParameter;
                this.requestParameters = requestParameters;
                this.loadItems(selectedItemIds);
            }
            get ids() {
                // TODO use metadata instead of hardcoded id
                return this.items.map((item) => item.id);
            }
            set(items) {
                this.items = items;
            }
            getById(id) {
                // TODO use metadata instead of hardcoded id
                return this.items.find((item) => item.id === id);
            }
            removeById(id) {
                // TODO use metadata instead of hardcoded id
                this.items.splice(this.items.findIndex((item) => item.id === id), 1);
            }
            move(oldItemIndex, newItemIndex) {
                this.items = (0, utils_1.arrayMove)(this.items, oldItemIndex, newItemIndex);
            }
            setLoading(loading) {
                this.loading = loading;
            }
            setRequestParameters(requestParameters) {
                this.requestParameters = requestParameters;
            }
            loadItems(itemIds) {
                if (!itemIds || itemIds.length === 0) {
                    this.set([]);
                    return;
                }
                this.setLoading(true);
                return services_1.ResourceRequester.getList(this.resourceKey, Object.assign(Object.assign({}, this.requestParameters), { locale: this.locale ? this.locale.get() : undefined, [this.idFilterParameter]: itemIds.join(','), limit: undefined, page: 1 })).then((0, mobx_1.action)((data) => {
                    const items = data._embedded[this.resourceKey];
                    // TODO use metadata instead of hardcoded id
                    items.sort((item1, item2) => itemIds.indexOf(item1.id) - itemIds.indexOf(item2.id));
                    this.set(items);
                    this.setLoading(false);
                }));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _get_ids_decorators = [mobx_1.computed];
            _set_decorators = [mobx_1.action];
            _removeById_decorators = [mobx_1.action];
            _move_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_ids_decorators, { kind: "getter", name: "ids", static: false, private: false, access: { has: obj => "ids" in obj, get: obj => obj.ids }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _set_decorators, { kind: "method", name: "set", static: false, private: false, access: { has: obj => "set" in obj, get: obj => obj.set }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _removeById_decorators, { kind: "method", name: "removeById", static: false, private: false, access: { has: obj => "removeById" in obj, get: obj => obj.removeById }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _move_decorators, { kind: "method", name: "move", static: false, private: false, access: { has: obj => "move" in obj, get: obj => obj.move }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: obj => "items" in obj, get: obj => obj.items, set: (obj, value) => { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = MultiSelectionStore;
