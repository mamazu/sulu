"use strict";
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ResourceRequester_1 = __importDefault(require("../../services/ResourceRequester"));
let CollaborationStore = (() => {
    var _a;
    let _collaborations_decorators;
    let _collaborations_initializers = [];
    let _collaborations_extraInitializers = [];
    return _a = class CollaborationStore {
            constructor(resourceKey, id) {
                this.destroyed = false;
                this.collaborations = __runInitializers(this, _collaborations_initializers, []);
                __runInitializers(this, _collaborations_extraInitializers);
                this.resourceKey = resourceKey;
                this.id = id;
                this.sendRequest();
            }
            sendRequest() {
                if (!_a.enabled || this.destroyed) {
                    return;
                }
                ResourceRequester_1.default.put('collaborations', null, { id: this.id, resourceKey: this.resourceKey })
                    .then((0, mobx_1.action)((response) => {
                    this.collaborations.splice(0, this.collaborations.length);
                    this.collaborations.push(...response._embedded.collaborations);
                    setTimeout(() => this.sendRequest(), _a.interval);
                }));
            }
            destroy() {
                if (!_a.enabled || this.destroyed) {
                    return;
                }
                this.destroyed = true;
                ResourceRequester_1.default.delete('collaborations', { id: this.id, resourceKey: this.resourceKey });
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _collaborations_decorators = [mobx_1.observable];
            __esDecorate(null, null, _collaborations_decorators, { kind: "field", name: "collaborations", static: false, private: false, access: { has: obj => "collaborations" in obj, get: obj => obj.collaborations, set: (obj, value) => { obj.collaborations = value; } }, metadata: _metadata }, _collaborations_initializers, _collaborations_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.enabled = true,
        _a;
})();
exports.default = CollaborationStore;
