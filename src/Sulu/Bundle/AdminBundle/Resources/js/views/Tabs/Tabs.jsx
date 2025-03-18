"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const classnames_1 = __importDefault(require("classnames"));
const Tabs_1 = __importDefault(require("../../components/Tabs"));
const Translator_1 = require("../../utils/Translator");
const Badge_1 = __importDefault(require("../../containers/Badge"));
const View_1 = __importDefault(require("../../components/View"));
const tabs_scss_1 = __importDefault(require("./tabs.scss"));
let Tabs = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_tabRouteWithHighestPriority_decorators;
    let _get_routeChildren_decorators;
    let _get_sortedTabRoutes_decorators;
    var Tabs = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.redirectToRouteWithHighestPriorityDisposer = __runInitializers(this, _instanceExtraInitializers);
            this.redirectToRouteWithHighestPriority = () => {
                const { route, router } = this.props;
                if (!route.children.includes(router.route) && router.route !== route) {
                    return;
                }
                if (this.sortedTabRoutes.includes(router.route)) {
                    return;
                }
                if (!this.tabRouteWithHighestPriority) {
                    return;
                }
                router.redirect(this.tabRouteWithHighestPriority.name, router.attributes);
            };
            this.handleSelect = (index) => {
                const { route, router } = this.props;
                const { options: { routerAttributesToBlacklist, }, } = route;
                const filteredAttributes = routerAttributesToBlacklist
                    ? Object.keys(router.attributes)
                        .filter((key) => !routerAttributesToBlacklist.includes(key))
                        .reduce((attributes, key) => {
                        attributes[key] = router.attributes[key];
                        return attributes;
                    }, {})
                    : router.attributes;
                router.navigate(this.sortedTabRoutes[index].name, filteredAttributes);
            };
            this.redirectToRouteWithHighestPriorityDisposer = (0, mobx_1.autorun)(this.redirectToRouteWithHighestPriority);
        }
        componentWillUnmount() {
            this.redirectToRouteWithHighestPriorityDisposer();
        }
        get tabRouteWithHighestPriority() {
            return this.routeChildren.reduce((prioritizedRoute, route) => {
                if (!prioritizedRoute) {
                    return route;
                }
                const { options: { tabPriority: highestTabPriority = 0, }, } = prioritizedRoute;
                const { options: { tabPriority = 0, }, } = route;
                if (highestTabPriority >= tabPriority) {
                    return prioritizedRoute;
                }
                return route;
            }, undefined);
        }
        get routeChildren() {
            const { route, routeChildren } = this.props;
            return routeChildren || route.children;
        }
        get sortedTabRoutes() {
            return this.routeChildren.concat()
                .sort((childRoute1, childRoute2) => {
                const { tabOrder: tabOrder1 = 0 } = childRoute1.options;
                const { tabOrder: tabOrder2 = 0 } = childRoute2.options;
                return tabOrder1 - tabOrder2;
            });
        }
        render() {
            var _a, _b;
            const { children, childrenProps, header, router, route, selectedIndex, title, isRootView } = this.props;
            const childComponent = children ? children(childrenProps) : null;
            const selectedTabIndex = selectedIndex !== undefined
                ? selectedIndex
                : childComponent
                    ? this.sortedTabRoutes.findIndex((childRoute) => childRoute === childComponent.props.route)
                    : undefined;
            const disableGap = selectedTabIndex !== undefined
                ? (_b = (_a = this.sortedTabRoutes[selectedTabIndex]) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.disableTabGap
                : false;
            const showTabs = isRootView || this.sortedTabRoutes.length > 1;
            const type = isRootView ? 'root' : 'nested';
            const className = (0, classnames_1.default)(tabs_scss_1.default.tabsContainer, tabs_scss_1.default[type], {
                [tabs_scss_1.default.disableGap]: disableGap && !isRootView,
            });
            return (<react_1.Fragment>
                {title && <h1>{title}</h1>}
                <div className={className}>
                    {showTabs &&
                    <Tabs_1.default onSelect={this.handleSelect} selectedIndex={selectedTabIndex} type={type}>
                            {this.sortedTabRoutes.map((tabRoute) => {
                            const tabTitle = tabRoute.options.tabTitle;
                            const tabBadges = tabRoute.options.tabBadges || [];
                            const badges = Object.values(tabBadges).map((badge, index) => {
                                if (typeof badge !== 'object') {
                                    throw new Error(`The value of a badge entry must be an object,
                                            but ${typeof badge} was given!`);
                                }
                                return (<Badge_1.default dataPath={badge.dataPath} key={index} requestParameters={badge.requestParameters} routeName={badge.routeName} router={router} routerAttributesToRequest={badge.routerAttributesToRequest} tabViewRoute={route} visibleCondition={badge.visibleCondition}/>);
                            });
                            return (<Tabs_1.default.Tab badges={badges} key={tabRoute.name} type={type}>
                                        {tabTitle ? (0, Translator_1.translate)(tabTitle) : tabRoute.name}
                                    </Tabs_1.default.Tab>);
                        })}
                        </Tabs_1.default>}
                </div>

                {isRootView
                    ? <View_1.default>
                            {header}
                            {childComponent}
                        </View_1.default>
                    : <>
                            {header}
                            {childComponent}
                        </>}

            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Tabs");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_tabRouteWithHighestPriority_decorators = [mobx_1.computed];
        _get_routeChildren_decorators = [mobx_1.computed];
        _get_sortedTabRoutes_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_tabRouteWithHighestPriority_decorators, { kind: "getter", name: "tabRouteWithHighestPriority", static: false, private: false, access: { has: obj => "tabRouteWithHighestPriority" in obj, get: obj => obj.tabRouteWithHighestPriority }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_routeChildren_decorators, { kind: "getter", name: "routeChildren", static: false, private: false, access: { has: obj => "routeChildren" in obj, get: obj => obj.routeChildren }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_sortedTabRoutes_decorators, { kind: "getter", name: "sortedTabRoutes", static: false, private: false, access: { has: obj => "sortedTabRoutes" in obj, get: obj => obj.sortedTabRoutes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Tabs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        childrenProps: {},
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Tabs = _classThis;
})();
exports.default = Tabs;
