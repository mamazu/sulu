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
const stores_1 = require("sulu-admin-bundle/stores");
const COLLECTIONS_RESOURCE_KEY = 'collections';
let CollectionStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _get_loading_decorators;
    let _get_id_decorators;
    let _get_locked_decorators;
    let _get_permissions_decorators;
    let _get_parentId_decorators;
    return _a = class CollectionStore {
            constructor(collectionId, locale) {
                this.collectionId = __runInitializers(this, _instanceExtraInitializers);
                this.collectionId = collectionId;
                this.locale = locale;
                this.resourceStore = new stores_1.ResourceStore(COLLECTIONS_RESOURCE_KEY, collectionId, {
                    locale,
                }, {
                    depth: 1,
                    breadcrumb: true,
                    parent: true,
                });
            }
            destroy() {
                this.resourceStore.destroy();
            }
            get loading() {
                return this.resourceStore ? this.resourceStore.loading : false;
            }
            get id() {
                return this.resourceStore.id;
            }
            get locked() {
                if (this.loading) {
                    return false;
                }
                return this.resourceStore.data.locked;
            }
            get permissions() {
                if (this.resourceStore.loading || !this.resourceStore.id) {
                    return {};
                }
                return this.resourceStore.data._permissions || {};
            }
            get parentId() {
                const { data } = this.resourceStore;
                if (!data._embedded) {
                    return null;
                }
                const { _embedded: { parent, }, } = data;
                return parent ? parent.id : null;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _get_loading_decorators = [mobx_1.computed];
            _get_id_decorators = [mobx_1.computed];
            _get_locked_decorators = [mobx_1.computed];
            _get_permissions_decorators = [mobx_1.computed];
            _get_parentId_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_loading_decorators, { kind: "getter", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_locked_decorators, { kind: "getter", name: "locked", static: false, private: false, access: { has: obj => "locked" in obj, get: obj => obj.locked }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_permissions_decorators, { kind: "getter", name: "permissions", static: false, private: false, access: { has: obj => "permissions" in obj, get: obj => obj.permissions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_parentId_decorators, { kind: "getter", name: "parentId", static: false, private: false, access: { has: obj => "parentId" in obj, get: obj => obj.parentId }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = CollectionStore;
