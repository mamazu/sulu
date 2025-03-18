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
function removeColumnsAfterIndex(parentIds, columnIndex, rawData) {
    parentIds.filter((parentId, index) => index > columnIndex).forEach((parentId) => rawData.delete(parentId));
}
let ColumnStructureStrategy = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _rawData_decorators;
    let _rawData_initializers = [];
    let _rawData_extraInitializers = [];
    let _get_visibleItems_decorators;
    let _get_activeItems_decorators;
    let _get_data_decorators;
    let _remove_decorators;
    let _order_decorators;
    let _clear_decorators;
    return _a = class ColumnStructureStrategy {
            get visibleItems() {
                return this.data.reduce((data, items) => data.concat(...items), []);
            }
            get activeItems() {
                return Array.from(this.rawData.keys());
            }
            get data() {
                return Array.from(this.rawData.values());
            }
            constructor() {
                this.rawData = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _rawData_initializers, new Map()));
                __runInitializers(this, _rawData_extraInitializers);
                this.rawData.set(undefined, []);
            }
            activate(id) {
                const columnIndex = this.data.findIndex((column) => column.findIndex((item) => item.id === id) !== -1);
                removeColumnsAfterIndex(this.activeItems, columnIndex, this.rawData);
                this.rawData.set(id, []);
            }
            remove(identifier) {
                for (const columnIndex of this.activeItems.keys()) {
                    const columnParentId = this.activeItems[columnIndex];
                    if (!columnParentId) {
                        continue;
                    }
                    const column = this.rawData.get(columnParentId);
                    if (!column) {
                        continue;
                    }
                    for (const index of column.keys()) {
                        // TODO do not hardcode id but use metadata instead
                        const id = column[index].id;
                        if (id === identifier) {
                            if (this.activeItems.includes(id)) {
                                removeColumnsAfterIndex(this.activeItems, columnIndex, this.rawData);
                            }
                            column.splice(index, 1);
                            if (column.length === 0) {
                                const columnParent = this.findById(columnParentId);
                                if (columnParent) {
                                    columnParent.hasChildren = false;
                                }
                            }
                        }
                    }
                }
            }
            findById(identifier) {
                for (const column of this.data) {
                    for (const item of column) {
                        // TODO do not hardcode id but use metadata instead
                        if (item.id === identifier) {
                            return item;
                        }
                    }
                }
            }
            order(id, position) {
                for (const parentId of this.rawData.keys()) {
                    const column = this.rawData.get(parentId);
                    if (!column) {
                        continue;
                    }
                    const oldIndex = column.findIndex((item) => item.id === id);
                    if (oldIndex === -1) {
                        continue;
                    }
                    this.rawData.set(parentId, (0, utils_1.arrayMove)(column, oldIndex, position - 1));
                    return;
                }
                throw new Error('The id "' + id + '" was tried to be ordered to a different position, but it does not exist!');
            }
            clear(parentId) {
                if (!parentId) {
                    this.rawData.clear();
                    this.rawData.set(parentId, []);
                }
                const parentIndex = this.activeItems.indexOf(parentId);
                if (parentIndex === -1) {
                    return;
                }
                removeColumnsAfterIndex(this.activeItems, parentIndex, this.rawData);
                const column = this.rawData.get(parentId);
                if (column && column.length > 0) {
                    column.splice(0, column.length);
                }
            }
            addItem(item, parentId) {
                let column = this.rawData.get(parentId);
                if (!column) {
                    column = [];
                    this.rawData.set(parentId, column);
                }
                column.push(item);
                if (!item._embedded) {
                    return;
                }
                const resourceKey = Object.keys(item._embedded)[0];
                const childItems = item._embedded[resourceKey];
                if ((0, mobx_1.isArrayLike)(childItems) && !this.rawData.has(item.id)) {
                    this.rawData.set(item.id, []);
                    childItems.forEach((childItem) => {
                        this.addItem(childItem, item.id);
                    });
                }
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _rawData_decorators = [mobx_1.observable];
            _get_visibleItems_decorators = [mobx_1.computed];
            _get_activeItems_decorators = [mobx_1.computed];
            _get_data_decorators = [mobx_1.computed];
            _remove_decorators = [mobx_1.action];
            _order_decorators = [mobx_1.action];
            _clear_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_visibleItems_decorators, { kind: "getter", name: "visibleItems", static: false, private: false, access: { has: obj => "visibleItems" in obj, get: obj => obj.visibleItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_activeItems_decorators, { kind: "getter", name: "activeItems", static: false, private: false, access: { has: obj => "activeItems" in obj, get: obj => obj.activeItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_data_decorators, { kind: "getter", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: obj => "remove" in obj, get: obj => obj.remove }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _order_decorators, { kind: "method", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clear_decorators, { kind: "method", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _rawData_decorators, { kind: "field", name: "rawData", static: false, private: false, access: { has: obj => "rawData" in obj, get: obj => obj.rawData, set: (obj, value) => { obj.rawData = value; } }, metadata: _metadata }, _rawData_initializers, _rawData_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = ColumnStructureStrategy;
