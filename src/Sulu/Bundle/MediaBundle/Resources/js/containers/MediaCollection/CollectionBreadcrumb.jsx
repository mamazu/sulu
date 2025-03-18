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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
let CollectionBreadcrumb = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_breadcrumb_decorators;
    var CollectionBreadcrumb = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.handleNavigate = (__runInitializers(this, _instanceExtraInitializers), (collectionId) => {
                this.props.onNavigate(collectionId);
            });
        }
        static getCurrentCollectionItem(data) {
            return {
                id: data.id,
                title: data.title,
            };
        }
        get breadcrumb() {
            const { resourceStore } = this.props;
            const { data } = resourceStore;
            if (!data._embedded) {
                return null;
            }
            const { _embedded: { breadcrumb, }, } = data;
            const currentCollection = CollectionBreadcrumb.getCurrentCollectionItem(data);
            return breadcrumb ? [...breadcrumb, currentCollection] : [currentCollection];
        }
        render() {
            const Item = components_1.Breadcrumb.Item;
            const breadcrumb = this.breadcrumb;
            const rootItemTitle = (0, utils_1.translate)('sulu_media.all_media');
            if (!breadcrumb || !breadcrumb.length) {
                return (<components_1.Breadcrumb>
                    <Item>{rootItemTitle}</Item>
                </components_1.Breadcrumb>);
            }
            else if (breadcrumb.length === 1) {
                const firstItem = breadcrumb[0];
                return (<components_1.Breadcrumb onItemClick={this.handleNavigate}>
                    <Item>{rootItemTitle}</Item>
                    <Item>{firstItem.title}</Item>
                </components_1.Breadcrumb>);
            }
            const lastItem = breadcrumb[breadcrumb.length - 1];
            const penultimateItem = breadcrumb[breadcrumb.length - 2];
            return (<components_1.Breadcrumb onItemClick={this.handleNavigate}>
                <Item>{rootItemTitle}</Item>
                <Item value={penultimateItem.id}>...</Item>
                <Item>{lastItem.title}</Item>
            </components_1.Breadcrumb>);
        }
    };
    __setFunctionName(_classThis, "CollectionBreadcrumb");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_breadcrumb_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_breadcrumb_decorators, { kind: "getter", name: "breadcrumb", static: false, private: false, access: { has: obj => "breadcrumb" in obj, get: obj => obj.breadcrumb }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CollectionBreadcrumb = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CollectionBreadcrumb = _classThis;
})();
exports.default = CollectionBreadcrumb;
