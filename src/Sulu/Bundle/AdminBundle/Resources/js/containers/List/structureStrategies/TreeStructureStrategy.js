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
const utils_1 = require("../../../utils");
function flattenData(items, data = []) {
    data.push(...items.map((item) => item.data));
    for (const item of items) {
        flattenData(item.children, data);
    }
    return data;
}
function findRecursive(items, id) {
    for (const item of items) {
        // TODO do not hardcode id but use metdata instead
        if (item.data.id === id) {
            return item.data;
        }
        const data = findRecursive(item.children, id);
        if (data) {
            return data;
        }
    }
}
function findSubTreeWithItemId(items, id) {
    // TODO do not hardcode id but use metdata instead
    if (items.some((item) => item.data.id === id)) {
        return items;
    }
    for (const item of items) {
        const data = findSubTreeWithItemId(item.children, id);
        if (data) {
            return data;
        }
    }
}
function removeRecursive(items, identifier) {
    for (const index of items.keys()) {
        const item = items[index];
        if (item.data.id === identifier) {
            items.splice(index, 1);
            return true;
        }
        const removed = removeRecursive(item.children, identifier);
        if (removed && item.children.length === 0) {
            item.hasChildren = false;
            return true;
        }
    }
    return false;
}
function findChildrenForParentId(tree, parentId) {
    if (parentId === undefined) {
        return tree;
    }
    for (let i = 0; i < tree.length; i++) {
        const item = tree[i];
        const { data, children } = item;
        if (parentId === data.id) {
            return children;
        }
        const childResult = findChildrenForParentId(children, parentId);
        if (childResult) {
            return childResult;
        }
    }
}
let TreeStructureStrategy = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _get_visibleItems_decorators;
    let _order_decorators;
    let _clear_decorators;
    return _a = class TreeStructureStrategy {
            get visibleItems() {
                return flattenData(this.data);
            }
            order(id, position) {
                const subTree = findSubTreeWithItemId(this.data, id);
                if (!subTree) {
                    throw new Error('The id "' + id + '" was tried to be ordered to a different position, but it does not exist!');
                }
                const oldIndex = subTree.findIndex((item) => item.data.id === id);
                subTree.splice(0, subTree.length, ...(0, utils_1.arrayMove)(subTree, oldIndex, position - 1));
            }
            remove(identifier) {
                removeRecursive(this.data, identifier);
            }
            findById(id) {
                return findRecursive(this.data, id);
            }
            deactivate(id) {
                const children = findChildrenForParentId(this.data, id);
                if (children) {
                    children.splice(0, children.length);
                }
            }
            addItem(item, parentId) {
                const children = findChildrenForParentId(this.data, parentId);
                if (!children) {
                    throw new Error('Cannot add items to non-existing parentId "' + (parentId ? parentId : 'undefined') + '"!');
                }
                children.push({
                    data: item,
                    // TODO do not hardcode hasChildren but use metadata instead
                    hasChildren: item.hasChildren,
                    children: [],
                });
                if (item._embedded && Object.keys(item._embedded).length > 0) {
                    const resourceKey = Object.keys(item._embedded)[0];
                    const childItems = item._embedded[resourceKey];
                    if (childItems) {
                        childItems.forEach((childItem) => this.addItem(childItem, item.id));
                    }
                }
            }
            clear(parentId) {
                const children = findChildrenForParentId(this.data, parentId);
                if (!children || children.length === 0) {
                    return;
                }
                children.splice(0, children.length);
            }
            constructor() {
                this.data = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _data_initializers, []));
                __runInitializers(this, _data_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _data_decorators = [mobx_1.observable];
            _get_visibleItems_decorators = [mobx_1.computed];
            _order_decorators = [mobx_1.action];
            _clear_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_visibleItems_decorators, { kind: "getter", name: "visibleItems", static: false, private: false, access: { has: obj => "visibleItems" in obj, get: obj => obj.visibleItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _order_decorators, { kind: "method", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clear_decorators, { kind: "method", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = TreeStructureStrategy;
