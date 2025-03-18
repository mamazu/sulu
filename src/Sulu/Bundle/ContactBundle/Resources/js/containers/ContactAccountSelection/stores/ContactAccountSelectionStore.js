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
const utils_1 = require("sulu-admin-bundle/utils");
let ContactAccountSelectionStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _items_decorators;
    let _items_initializers = [];
    let _items_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _get_contactItems_decorators;
    let _get_accountItems_decorators;
    let _remove_decorators;
    let _move_decorators;
    let _setLoading_decorators;
    return _a = class ContactAccountSelectionStore {
            get contactItems() {
                return this.items
                    .filter((item) => item.id.startsWith(_a.contactPrefix))
                    .map((item) => (Object.assign(Object.assign({}, item), { id: parseInt(item.id.substring(_a.contactPrefix.length)) })));
            }
            get accountItems() {
                return this.items
                    .filter((item) => item.id.startsWith(_a.accountPrefix))
                    .map((item) => (Object.assign(Object.assign({}, item), { id: parseInt(item.id.substring(_a.contactPrefix.length)) })));
            }
            loadItems(itemIds) {
                this.setLoading(true);
                const accountIds = [];
                const contactIds = [];
                itemIds.forEach((id) => {
                    if (id.startsWith(_a.contactPrefix)) {
                        contactIds.push(id.substring(_a.contactPrefix.length));
                    }
                    if (id.startsWith(_a.accountPrefix)) {
                        accountIds.push(id.substring(_a.accountPrefix.length));
                    }
                });
                const contactsPromise = contactIds.length > 0
                    ? services_1.ResourceRequester.getList('contacts', {
                        ids: contactIds.join(','),
                        limit: undefined,
                        page: 1,
                    })
                    : Promise.resolve({ _embedded: { contacts: [] } });
                const accountsPromise = accountIds.length > 0
                    ? services_1.ResourceRequester.getList('accounts', {
                        ids: accountIds.join(','),
                        limit: undefined,
                        page: 1,
                    })
                    : Promise.resolve({ _embedded: { accounts: [] } });
                Promise.all([contactsPromise, accountsPromise]).then((0, mobx_1.action)(([contactsResponse, accountsResponse]) => {
                    const contacts = contactsResponse._embedded.contacts;
                    const accounts = accountsResponse._embedded.accounts;
                    this.items = itemIds.reduce((items, id) => {
                        if (id.startsWith(_a.contactPrefix)) {
                            const contact = contacts.find((contact) => contact.id == id.substring(_a.contactPrefix.length));
                            if (contact) {
                                items.push(Object.assign(Object.assign({}, contact), { id: _a.contactPrefix + contact.id }));
                            }
                        }
                        if (id.startsWith(_a.accountPrefix)) {
                            const account = accounts.find((acount) => acount.id == id.substring(_a.accountPrefix.length));
                            if (account) {
                                items.push(Object.assign(Object.assign({}, account), { id: _a.accountPrefix + account.id }));
                            }
                        }
                        return items;
                    }, []);
                    this.setLoading(false);
                }));
            }
            remove(id) {
                this.items = this.items.filter((item) => item.id !== id);
            }
            move(oldItemIndex, newItemIndex) {
                this.items = (0, utils_1.arrayMove)(this.items, oldItemIndex, newItemIndex);
            }
            setLoading(loading) {
                this.loading = loading;
            }
            constructor() {
                this.items = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _items_initializers, []));
                this.loading = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _loading_initializers, false));
                __runInitializers(this, _loading_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [mobx_1.observable];
            _loading_decorators = [mobx_1.observable];
            _get_contactItems_decorators = [mobx_1.computed];
            _get_accountItems_decorators = [mobx_1.computed];
            _remove_decorators = [mobx_1.action];
            _move_decorators = [mobx_1.action];
            _setLoading_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_contactItems_decorators, { kind: "getter", name: "contactItems", static: false, private: false, access: { has: obj => "contactItems" in obj, get: obj => obj.contactItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_accountItems_decorators, { kind: "getter", name: "accountItems", static: false, private: false, access: { has: obj => "accountItems" in obj, get: obj => obj.accountItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _move_decorators, { kind: "method", name: "move", static: false, private: false, access: { has: obj => "move" in obj, get: obj => obj.move }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setLoading_decorators, { kind: "method", name: "setLoading", static: false, private: false, access: { has: obj => "setLoading" in obj, get: obj => obj.setLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: obj => "items" in obj, get: obj => obj.items, set: (obj, value) => { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.contactPrefix = 'c',
        _a.accountPrefix = 'a',
        _a;
})();
exports.default = ContactAccountSelectionStore;
