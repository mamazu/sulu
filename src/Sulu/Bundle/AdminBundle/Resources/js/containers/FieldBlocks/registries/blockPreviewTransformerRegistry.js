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
let BlockPreviewTransformerRegistry = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _blockPreviewTransformers_decorators;
    let _blockPreviewTransformers_initializers = [];
    let _blockPreviewTransformers_extraInitializers = [];
    let _priority_decorators;
    let _priority_initializers = [];
    let _priority_extraInitializers = [];
    let _get_blockPreviewTransformerKeysByPriority_decorators;
    return _a = class BlockPreviewTransformerRegistry {
            constructor() {
                this.blockPreviewTransformers = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _blockPreviewTransformers_initializers, void 0));
                this.priority = (__runInitializers(this, _blockPreviewTransformers_extraInitializers), __runInitializers(this, _priority_initializers, void 0));
                __runInitializers(this, _priority_extraInitializers);
                this.clear();
            }
            clear() {
                this.blockPreviewTransformers = {};
                this.priority = {};
            }
            has(name) {
                return !!this.blockPreviewTransformers[name];
            }
            add(name, blockPreviewTransformer, priority = 0) {
                if (name in this.blockPreviewTransformers) {
                    throw new Error('The key "' + name + '" has already been used for another BlockPreviewTransformer');
                }
                this.blockPreviewTransformers[name] = blockPreviewTransformer;
                this.priority[name] = priority;
            }
            get(name) {
                if (!(name in this.blockPreviewTransformers)) {
                    throw new Error('The BlockPreviewTransformer with the key "' + name + '" is not defined. ' +
                        'You probably forgot to add it to the registry using the "add" method.' +
                        '\n\nRegistered keys: ' + Object.keys(this.blockPreviewTransformers).sort().join(', '));
                }
                return this.blockPreviewTransformers[name];
            }
            get blockPreviewTransformerKeysByPriority() {
                return Object.keys(this.priority)
                    .sort((blockPreviewTransformerKey1, blockPreviewTransformerKey2) => {
                    return this.priority[blockPreviewTransformerKey2] - this.priority[blockPreviewTransformerKey1];
                });
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _blockPreviewTransformers_decorators = [mobx_1.observable];
            _priority_decorators = [mobx_1.observable];
            _get_blockPreviewTransformerKeysByPriority_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_blockPreviewTransformerKeysByPriority_decorators, { kind: "getter", name: "blockPreviewTransformerKeysByPriority", static: false, private: false, access: { has: obj => "blockPreviewTransformerKeysByPriority" in obj, get: obj => obj.blockPreviewTransformerKeysByPriority }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _blockPreviewTransformers_decorators, { kind: "field", name: "blockPreviewTransformers", static: false, private: false, access: { has: obj => "blockPreviewTransformers" in obj, get: obj => obj.blockPreviewTransformers, set: (obj, value) => { obj.blockPreviewTransformers = value; } }, metadata: _metadata }, _blockPreviewTransformers_initializers, _blockPreviewTransformers_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: obj => "priority" in obj, get: obj => obj.priority, set: (obj, value) => { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = new BlockPreviewTransformerRegistry();
