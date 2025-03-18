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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const Router_1 = require("../../services/Router");
const userStore_1 = __importDefault(require("../../stores/userStore"));
const View_1 = __importDefault(require("../../components/View"));
const viewRegistry_1 = __importDefault(require("./registries/viewRegistry"));
const UPDATE_ROUTE_HOOK_PRIORITY = 1024;
let ViewRenderer = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _loginCount_decorators;
    let _loginCount_initializers = [];
    let _loginCount_extraInitializers = [];
    var ViewRenderer = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.loginCount = __runInitializers(this, _loginCount_initializers, 0);
            this.updateLoginCountDisposer = __runInitializers(this, _loginCount_extraInitializers);
        }
        componentDidMount() {
            const { router } = this.props;
            router.addUpdateRouteHook((newRoute, newAttributes) => {
                const { attributes: oldAttributes, route: oldRoute } = router;
                if ((0, Router_1.getViewKeyFromRoute)(newRoute, newAttributes) !== (0, Router_1.getViewKeyFromRoute)(oldRoute, oldAttributes)) {
                    router.clearBindings();
                }
                return true;
            }, UPDATE_ROUTE_HOOK_PRIORITY);
            this.updateLoginCountDisposer = (0, mobx_1.reaction)(() => (userStore_1.default.loggedIn), (newIsLoggedIn) => {
                if (newIsLoggedIn) {
                    this.loginCount = this.loginCount + 1;
                }
            });
        }
        componentWillUnmount() {
            if (this.updateLoginCountDisposer) {
                this.updateLoginCountDisposer();
            }
        }
        renderView(route, child = null) {
            const { router } = this.props;
            const CurrentView = viewRegistry_1.default.get(route.type);
            const viewConfig = viewRegistry_1.default.getConfig(route.type);
            let viewKey = (0, Router_1.getViewKeyFromRoute)(route, router.attributes) || '';
            if (CurrentView.remountViewOnLogin) {
                viewKey = viewKey + '__' + this.loginCount;
            }
            const element = (<CurrentView isRootView={!route.parent} key={viewKey} route={route} router={router}>
                {(props) => child ? react_1.default.cloneElement(child, props) : null}
            </CurrentView>);
            if (!route.parent) {
                if (!viewConfig.disableDefaultSpacing) {
                    return (<View_1.default>
                        {element}
                    </View_1.default>);
                }
                return element;
            }
            return this.renderView(route.parent, element);
        }
        render() {
            return this.renderView(this.props.router.route);
        }
    };
    __setFunctionName(_classThis, "ViewRenderer");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _loginCount_decorators = [mobx_1.observable];
        __esDecorate(null, null, _loginCount_decorators, { kind: "field", name: "loginCount", static: false, private: false, access: { has: obj => "loginCount" in obj, get: obj => obj.loginCount, set: (obj, value) => { obj.loginCount = value; } }, metadata: _metadata }, _loginCount_initializers, _loginCount_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewRenderer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewRenderer = _classThis;
})();
exports.default = ViewRenderer;
