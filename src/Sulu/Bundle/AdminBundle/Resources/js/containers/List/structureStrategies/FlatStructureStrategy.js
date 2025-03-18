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
let FlatStructureStrategy = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _data_decorators;
    let _data_initializers = [];
    let _data_extraInitializers = [];
    let _get_visibleItems_decorators;
    let _clear_decorators;
    let _order_decorators;
    return _a = class FlatStructureStrategy {
            get visibleItems() {
                return this.data;
            }
            constructor() {
                this.data = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _data_initializers, void 0));
                __runInitializers(this, _data_extraInitializers);
                this.data = [];
            }
            clear(parentId) {
                if (parentId !== undefined) {
                    throw new Error('This StructureStrategy does not support nesting, therefore the parentId should not be set');
                }
                this.data.splice(0, this.data.length);
            }
            order(id, position) {
                const oldIndex = this.data.findIndex((item) => item.id === id);
                if (oldIndex === -1) {
                    throw new Error('The id "' + id + '" was tried to be ordered to a different position, but it does not exist!');
                }
                this.data = (0, utils_1.arrayMove)(this.data, oldIndex, position - 1);
            }
            remove(identifier) {
                this.data.splice(this.data.findIndex((item) => item.id === identifier), 1);
            }
            findById(identifier) {
                // TODO do not hardcode id but use metdata instead
                return this.data.find((item) => item.id === identifier);
            }
            addItem(item, parentId) {
                if (parentId !== undefined) {
                    throw new Error('This StructureStrategy does not support nesting, therefore the parentId should not be set');
                }
                this.data.push(item);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _data_decorators = [mobx_1.observable];
            _get_visibleItems_decorators = [mobx_1.computed];
            _clear_decorators = [mobx_1.action];
            _order_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_visibleItems_decorators, { kind: "getter", name: "visibleItems", static: false, private: false, access: { has: obj => "visibleItems" in obj, get: obj => obj.visibleItems }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clear_decorators, { kind: "method", name: "clear", static: false, private: false, access: { has: obj => "clear" in obj, get: obj => obj.clear }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _order_decorators, { kind: "method", name: "order", static: false, private: false, access: { has: obj => "order" in obj, get: obj => obj.order }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: obj => "data" in obj, get: obj => obj.data, set: (obj, value) => { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = FlatStructureStrategy;
