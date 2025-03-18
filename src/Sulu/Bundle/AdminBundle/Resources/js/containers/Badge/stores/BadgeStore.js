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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const json_pointer_1 = __importDefault(require("json-pointer"));
const debounce_1 = __importDefault(require("debounce"));
const router_1 = __importDefault(require("fos-jsrouting/router"));
const Requester_1 = __importDefault(require("../../../services/Requester"));
let BadgeStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _value_extraInitializers = [];
    let _get_evaluatedRequestParameters_decorators;
    let _get_url_decorators;
    let _setData_decorators;
    let _get_isChildOrSameRoute_decorators;
    return _a = class BadgeStore {
            constructor(router, routeName, dataPath, requestParameters, routerAttributesToRequest, tabViewRoute) {
                this.router = __runInitializers(this, _instanceExtraInitializers);
                this.value = __runInitializers(this, _value_initializers, null);
                this.routeChangeDisposer = __runInitializers(this, _value_extraInitializers);
                this.load = (0, debounce_1.default)(() => {
                    if (!this.isChildOrSameRoute) {
                        return;
                    }
                    Requester_1.default.get(this.url).then((response) => {
                        this.setData(response);
                    });
                }, 3000, true);
                this.responseHook = (response, options) => {
                    if (!options || typeof options.method === 'undefined') {
                        return;
                    }
                    if (response.url.includes(this.url)) {
                        return;
                    }
                    if (response.url.includes('/admin/api/collaborations')) {
                        return;
                    }
                    if (response.url.includes('/admin/preview/')) {
                        return;
                    }
                    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
                        this.load();
                    }
                };
                this.destroy = () => {
                    this.routeChangeDisposer();
                    if (Requester_1.default.handleResponseHooks.includes(this.responseHook)) {
                        Requester_1.default.handleResponseHooks.splice(Requester_1.default.handleResponseHooks.indexOf(this.responseHook), 1);
                    }
                };
                this.router = router;
                this.routeName = routeName;
                this.dataPath = dataPath;
                this.requestParameters = requestParameters;
                this.routerAttributesToRequest = routerAttributesToRequest;
                this.tabViewRoute = tabViewRoute;
                this.load();
                // Needed to tell autorun to listen on route changes
                this.routeChangeDisposer = (0, mobx_1.reaction)(() => this.router.route, () => {
                    this.load();
                });
                if (!Requester_1.default.handleResponseHooks.includes(this.responseHook)) {
                    Requester_1.default.handleResponseHooks.push(this.responseHook);
                }
            }
            get evaluatedRequestParameters() {
                const { router: { attributes: routerAttributes, }, requestParameters: attributesToRequest, routerAttributesToRequest, } = this;
                const requestParameters = {};
                Object.keys(routerAttributesToRequest)
                    .forEach((routerAttributeKey) => {
                    const requestAttributeKey = routerAttributesToRequest[routerAttributeKey];
                    const attributeName = isNaN(routerAttributeKey)
                        ? routerAttributeKey
                        : requestAttributeKey;
                    requestParameters[requestAttributeKey] = routerAttributes[attributeName];
                });
                return Object.assign(Object.assign({}, requestParameters), attributesToRequest);
            }
            get url() {
                const { routeName } = this;
                return router_1.default.generate(routeName, this.evaluatedRequestParameters);
            }
            setData(data) {
                const { dataPath } = this;
                let enhancedData = data;
                if (dataPath) {
                    enhancedData = json_pointer_1.default.get(data, dataPath);
                }
                this.value = String(enhancedData);
            }
            get isChildOrSameRoute() {
                let route = this.router.route;
                while (route !== this.tabViewRoute) {
                    if (!route) {
                        return false;
                    }
                    route = route.parent;
                }
                return true;
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _value_decorators = [mobx_1.observable];
            _get_evaluatedRequestParameters_decorators = [mobx_1.computed];
            _get_url_decorators = [mobx_1.computed];
            _setData_decorators = [mobx_1.action];
            _get_isChildOrSameRoute_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_evaluatedRequestParameters_decorators, { kind: "getter", name: "evaluatedRequestParameters", static: false, private: false, access: { has: obj => "evaluatedRequestParameters" in obj, get: obj => obj.evaluatedRequestParameters }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_url_decorators, { kind: "getter", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _setData_decorators, { kind: "method", name: "setData", static: false, private: false, access: { has: obj => "setData" in obj, get: obj => obj.setData }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_isChildOrSameRoute_decorators, { kind: "getter", name: "isChildOrSameRoute", static: false, private: false, access: { has: obj => "isChildOrSameRoute" in obj, get: obj => obj.isChildOrSameRoute }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = BadgeStore;
