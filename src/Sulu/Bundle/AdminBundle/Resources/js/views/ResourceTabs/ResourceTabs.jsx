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
const jexl_1 = __importDefault(require("jexl"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const Tabs_1 = __importDefault(require("../../views/Tabs"));
const ResourceStore_1 = __importDefault(require("../../stores/ResourceStore"));
const resourceTabs_scss_1 = __importDefault(require("./resourceTabs.scss"));
let ResourceTabs = (() => {
    var _a;
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_router_decorators;
    let _get_route_decorators;
    let _get_id_decorators;
    let _get_resourceKey_decorators;
    let _get_locales_decorators;
    let _get_title_decorators;
    let _get_sortedTabRoutes_decorators;
    let _get_visibleTabRoutes_decorators;
    var ResourceTabs = _classThis = class extends _classSuper {
        get router() {
            return this.props.router;
        }
        get route() {
            return this.props.route;
        }
        get id() {
            const { router: { attributes: { id, }, }, } = this.props;
            if (id !== undefined && typeof id !== 'string' && typeof id !== 'number') {
                throw new Error('The "id" router attribute must be a string or a number if given!');
            }
            return id;
        }
        get resourceKey() {
            const { route: { options: { resourceKey, }, }, } = this.props;
            if (!resourceKey) {
                throw new Error('The route does not define the mandatory "resourceKey" option');
            }
            return resourceKey;
        }
        constructor(props) {
            super(props);
            this.resourceStore = __runInitializers(this, _instanceExtraInitializers);
            this.createResourceStore = () => {
                const options = {};
                if (this.locales) {
                    options.locale = mobx_1.observable.box();
                    this.router.bind('locale', options.locale);
                }
                if (this.resourceStore) {
                    this.resourceStore.destroy();
                }
                this.resourceStore = new ResourceStore_1.default(this.resourceKey, this.id, options);
            };
            this.disposeCreateResourceStoreOnRouteChange = (route) => {
                // This only works for the first level of childs
                if (!this.route.children.includes(route) && this.route !== route) {
                    // Avoid loading data for the old resourceKey with the new ID when switching to a different form
                    this.createResourceStoreDisposer();
                }
                return true;
            };
            this.reloadResourceStoreOnRouteChange = (route, attributes) => {
                if (attributes && this.id !== attributes.id) {
                    // No reload necessary, because if the ID changes the resourceStore itself will reload
                    return true;
                }
                if (this.router.route === this.route || this.router.route === route) {
                    return true;
                }
                // This only works for the first level of childs
                if (this.route.children.includes(route) || this.route === route) {
                    this.resourceStore.reload();
                }
                return true;
            };
            this.createResourceStoreDisposer = (0, mobx_1.autorun)(this.createResourceStore);
            this.disposeCreateResourceStoreOnRouteChangeDisposer = this.router.addUpdateRouteHook(this.disposeCreateResourceStoreOnRouteChange);
            this.reloadResourceStoreOnRouteChangeDisposer = this.router.addUpdateRouteHook(this.reloadResourceStoreOnRouteChange);
        }
        componentWillUnmount() {
            this.resourceStore.destroy();
            this.reloadResourceStoreOnRouteChangeDisposer();
            this.createResourceStoreDisposer();
            this.disposeCreateResourceStoreOnRouteChangeDisposer();
        }
        get locales() {
            const { locales: propsLocales, route: { options: { locales: routeLocales, }, }, } = this.props;
            return routeLocales ? routeLocales : propsLocales;
        }
        get title() {
            const { route: { options: { titleProperty: routeTitleProperty, }, }, titleProperty, } = this.props;
            if (!this.resourceStore.initialized && this.resourceStore.loading) {
                return undefined;
            }
            return this.resourceStore.data[titleProperty || routeTitleProperty];
        }
        get sortedTabRoutes() {
            const { route } = this.props;
            return route.children.concat()
                .sort((childRoute1, childRoute2) => {
                const { tabOrder: tabOrder1 = 0 } = childRoute1.options;
                const { tabOrder: tabOrder2 = 0 } = childRoute2.options;
                return tabOrder1 - tabOrder2;
            });
        }
        get visibleTabRoutes() {
            const data = (0, mobx_1.toJS)(this.resourceStore.data);
            return this.sortedTabRoutes
                .filter((childRoute) => {
                const { options: { tabCondition, }, } = childRoute;
                return !tabCondition || jexl_1.default.evalSync(tabCondition, data);
            });
        }
        render() {
            const { children } = this.props;
            const childComponent = children
                ? children({ locales: this.locales, resourceStore: this.resourceStore, title: this.title })
                : null;
            const selectedRouteIndex = childComponent
                ? this.visibleTabRoutes.findIndex((childRoute) => childRoute === childComponent.props.route)
                : undefined;
            return this.resourceStore.initialized
                ? (<Tabs_1.default {...this.props} routeChildren={this.visibleTabRoutes} selectedIndex={selectedRouteIndex}>
                    {() => childComponent}
                </Tabs_1.default>)
                : (<div className={resourceTabs_scss_1.default.loader}>
                    <Loader_1.default />
                </div>);
        }
    };
    __setFunctionName(_classThis, "ResourceTabs");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_router_decorators = [mobx_1.computed];
        _get_route_decorators = [mobx_1.computed];
        _get_id_decorators = [mobx_1.computed];
        _get_resourceKey_decorators = [mobx_1.computed];
        _get_locales_decorators = [(_a = mobx_1.computed).struct.bind(_a)];
        _get_title_decorators = [mobx_1.computed];
        _get_sortedTabRoutes_decorators = [mobx_1.computed];
        _get_visibleTabRoutes_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_router_decorators, { kind: "getter", name: "router", static: false, private: false, access: { has: obj => "router" in obj, get: obj => obj.router }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_route_decorators, { kind: "getter", name: "route", static: false, private: false, access: { has: obj => "route" in obj, get: obj => obj.route }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_id_decorators, { kind: "getter", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_locales_decorators, { kind: "getter", name: "locales", static: false, private: false, access: { has: obj => "locales" in obj, get: obj => obj.locales }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_title_decorators, { kind: "getter", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_sortedTabRoutes_decorators, { kind: "getter", name: "sortedTabRoutes", static: false, private: false, access: { has: obj => "sortedTabRoutes" in obj, get: obj => obj.sortedTabRoutes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_visibleTabRoutes_decorators, { kind: "getter", name: "visibleTabRoutes", static: false, private: false, access: { has: obj => "visibleTabRoutes" in obj, get: obj => obj.visibleTabRoutes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceTabs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceTabs = _classThis;
})();
exports.default = ResourceTabs;
