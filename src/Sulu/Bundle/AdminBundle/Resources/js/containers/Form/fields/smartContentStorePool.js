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
let SmartContentStorePool = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _entries_decorators;
    let _entries_initializers = [];
    let _entries_extraInitializers = [];
    let _get_stores_decorators;
    let _add_decorators;
    let _remove_decorators;
    return _a = class SmartContentStorePool {
            get stores() {
                return this.entries.map((entry) => entry.store);
            }
            constructor() {
                this.entries = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _entries_initializers, void 0));
                this.updateExcludedIds = (__runInitializers(this, _entries_extraInitializers), () => {
                    this.updateRecursiveExcludedIds(this.stores);
                });
                this.updateRecursiveExcludedIds = (stores) => {
                    if (stores.length === 0) {
                        return;
                    }
                    const store = stores[0];
                    const entry = this.findEntryByStore(store);
                    if (!entry) {
                        throw new Error('There was no entry found for the store! This should not happen and is likely a bug.');
                    }
                    if (!entry.excludeDuplicates) {
                        this.updateRecursiveExcludedIds(stores.slice(1));
                        return;
                    }
                    const previousStores = this.findPreviousStores(store);
                    if (previousStores.length === 0) {
                        this.updateRecursiveExcludedIds(stores.slice(1));
                        return;
                    }
                    (0, mobx_1.when)(() => previousStores.every((store) => !store.itemsLoading), () => {
                        const excludedIds = previousStores
                            .reduce((ids, smartContentStore) => {
                            ids.push(...smartContentStore.items.map((item) => item.id));
                            return ids;
                        }, []);
                        store.setExcludedIds(excludedIds);
                        this.updateRecursiveExcludedIds(stores.slice(1));
                    });
                };
                this.clear();
            }
            clear() {
                this.entries = [];
            }
            add(store, excludeDuplicates) {
                if (this.stores.includes(store)) {
                    throw new Error('Cannot add a SmartContentStore twice!');
                }
                this.entries.push({ store, excludeDuplicates });
            }
            remove(store) {
                this.entries.splice(this.stores.indexOf(store), 1);
            }
            findEntryByStore(store) {
                return this.entries.find((entry) => entry.store === store);
            }
            findPreviousStores(store) {
                const previousStores = [];
                for (const otherStore of this.stores) {
                    if (otherStore === store) {
                        break;
                    }
                    if (otherStore.provider !== store.provider) {
                        continue;
                    }
                    previousStores.push(otherStore);
                }
                return previousStores;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _entries_decorators = [mobx_1.observable];
            _get_stores_decorators = [mobx_1.computed];
            _add_decorators = [mobx_1.action];
            _remove_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_stores_decorators, { kind: "getter", name: "stores", static: false, private: false, access: { has: obj => "stores" in obj, get: obj => obj.stores }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _add_decorators, { kind: "method", name: "add", static: false, private: false, access: { has: obj => "add" in obj, get: obj => obj.add }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _entries_decorators, { kind: "field", name: "entries", static: false, private: false, access: { has: obj => "entries" in obj, get: obj => obj.entries, set: (obj, value) => { obj.entries = value; } }, metadata: _metadata }, _entries_initializers, _entries_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new SmartContentStorePool();
