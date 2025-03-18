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
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const loglevel_1 = __importDefault(require("loglevel"));
const path_to_regexp_1 = require("path-to-regexp");
const history_1 = require("history");
const Date_1 = require("../../utils/Date");
const routeRegistry_1 = __importDefault(require("./registries/routeRegistry"));
const resourceViewRegistry_1 = __importDefault(require("./registries/resourceViewRegistry"));
const OBJECT_DELIMITER = '.';
function tryParse(value) {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    if (value === 'undefined') {
        return undefined;
    }
    if (value && value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
        const date = new Date(value + ' 00:00'); // The time is necessary to avoid timezone issues
        if (date.toString() !== 'Invalid Date') {
            return date;
        }
    }
    if (value && value.match(/^\d\d\d\d-\d\d-\d\d \d\d:\d\d$/)) {
        const date = new Date(value);
        if (date.toString() !== 'Invalid Date') {
            return date;
        }
    }
    if (isNaN(value)) {
        return value;
    }
    if (value && value.match(/0[^.].*/)) {
        return value; // do not parse as number if string starts with 0 and does not contain a dot
    }
    return parseFloat(value);
}
function equalBindings(value1, value2) {
    if (typeof (value1) !== 'object' || typeof (value2) !== 'object') {
        // Type unsafe comparison to not trigger a new navigation when only data type changes
        return value1 == value2;
    }
    if (value1 instanceof Date && value2 instanceof Date) {
        return value1.getTime() === value2.getTime();
    }
    const objectKeys = Object.keys(value1);
    if (!(0, fast_deep_equal_1.default)(objectKeys, Object.keys(value2))) {
        return false;
    }
    return objectKeys.every((key) => equalBindings(value1[key], value2[key]));
}
function addValueToSearchParameters(searchParameters, value, path) {
    if ((0, mobx_1.isArrayLike)(value)) {
        addArrayToSearchParameters(searchParameters, value, path);
    }
    else if (value instanceof Date) {
        addDateToSearchParameters(searchParameters, value, path);
    }
    else if (typeof value === 'object') {
        addObjectToSearchParameters(searchParameters, value, path);
    }
    else {
        searchParameters.set(path, value);
    }
}
function addArrayToSearchParameters(searchParameters, values, path) {
    values.forEach((value, index) => {
        addValueToSearchParameters(searchParameters, value, path + '[' + index + ']');
    });
}
function addDateToSearchParameters(searchParameters, value, path) {
    searchParameters.set(path, (0, Date_1.transformDateForUrl)(value));
}
function addObjectToSearchParameters(searchParameters, value, path) {
    for (const key in value) {
        const childPath = path + OBJECT_DELIMITER + key;
        addValueToSearchParameters(searchParameters, value[key], childPath);
    }
}
function addAttributesFromSearchParameters(attributes, value, key) {
    if (key.includes(OBJECT_DELIMITER)) {
        const keyParts = key.split(OBJECT_DELIMITER);
        if (!attributes[keyParts[0]]) {
            attributes[keyParts[0]] = {};
        }
        addAttributesFromSearchParameters(attributes[keyParts[0]], value, keyParts.slice(1).join(OBJECT_DELIMITER));
    }
    else if (key.includes('[') && key.includes(']')) {
        const arrayKey = key.slice(0, key.indexOf('['));
        if (!attributes[arrayKey]) {
            attributes[arrayKey] = [];
        }
        attributes[arrayKey].push(tryParse(value));
    }
    else {
        attributes[key] = tryParse(value);
    }
}
let Router = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _route_decorators;
    let _route_initializers = [];
    let _route_extraInitializers = [];
    let _attributes_decorators;
    let _attributes_initializers = [];
    let _attributes_extraInitializers = [];
    let _bindings_decorators;
    let _bindings_initializers = [];
    let _bindings_extraInitializers = [];
    let _get_sortedUpdateRouteHooks_decorators;
    let _bind_decorators;
    let _clearBindings_decorators;
    let _match_decorators;
    let _navigate_decorators;
    let _navigate_initializers = [];
    let _navigate_extraInitializers = [];
    let _navigateToResourceView_decorators;
    let _navigateToResourceView_initializers = [];
    let _navigateToResourceView_extraInitializers = [];
    let _hasResourceView_decorators;
    let _hasResourceView_initializers = [];
    let _hasResourceView_extraInitializers = [];
    let _redirect_decorators;
    let _redirect_initializers = [];
    let _redirect_extraInitializers = [];
    let _update_decorators;
    let _get_url_decorators;
    return _a = class Router {
            constructor(history) {
                this.history = __runInitializers(this, _instanceExtraInitializers);
                this.route = __runInitializers(this, _route_initializers, void 0);
                this.attributes = (__runInitializers(this, _route_extraInitializers), __runInitializers(this, _attributes_initializers, {}));
                this.bindings = (__runInitializers(this, _attributes_extraInitializers), __runInitializers(this, _bindings_initializers, new Map()));
                this.bindingDefaults = (__runInitializers(this, _bindings_extraInitializers), new Map());
                this.attributesHistory = {};
                this.updateRouteHooks = {};
                this.updateAttributesHooks = [];
                this.redirectFlag = false;
                this.reload = () => {
                    this.match(this.history.location.pathname, this.history.location.search);
                };
                this.reset = () => {
                    this.history.replace(Object.assign({ search: '' }, (0, history_1.parsePath)('/')));
                };
                this.navigate = __runInitializers(this, _navigate_initializers, (name, attributes = {}) => {
                    this.handleNavigation(name, attributes, this.navigate);
                });
                this.navigateToResourceView = (__runInitializers(this, _navigate_extraInitializers), __runInitializers(this, _navigateToResourceView_initializers, (view, resourceKey, attributes = {}) => {
                    const route = resourceViewRegistry_1.default.get(view, resourceKey);
                    this.navigate(route, attributes);
                }));
                this.hasResourceView = (__runInitializers(this, _navigateToResourceView_extraInitializers), __runInitializers(this, _hasResourceView_initializers, (view, resourceKey) => {
                    return resourceViewRegistry_1.default.has(view, resourceKey);
                }));
                this.redirect = (__runInitializers(this, _hasResourceView_extraInitializers), __runInitializers(this, _redirect_initializers, (name, attributes = {}) => {
                    this.redirectFlag = true;
                    this.handleNavigation(name, attributes, this.redirect);
                }));
                this.restore = (__runInitializers(this, _redirect_extraInitializers), (name, attributes = {}) => {
                    if (!this.attributesHistory[name] || this.attributesHistory[name].length === 0) {
                        this.update(name, attributes, this.restore);
                        return;
                    }
                    if (!this.isRouteChanging(name, attributes)) {
                        return;
                    }
                    const attributesHistory = this.attributesHistory[name].pop();
                    this.update(name, Object.assign(Object.assign({}, attributesHistory), attributes), this.restore);
                });
                this.history = history;
                this.history.listen(({ location }) => {
                    loglevel_1.default.info('URL was changed to "' + location.pathname + location.search + '"');
                    this.match(location.pathname, location.search);
                });
                (0, mobx_1.autorun)(() => {
                    const { pathname, search } = this.history.location;
                    const currentUrl = this.url;
                    const historyUrl = pathname + search;
                    if (currentUrl !== historyUrl) {
                        // have to use the historyUrl as a fallback, because currentUrl could be undefined and break the routing
                        const url = currentUrl || historyUrl;
                        loglevel_1.default.info('Router changes URL to "' + url + '"' + (this.redirectFlag ? ' replacing history' : ''));
                        const newLocation = Object.assign({ search: '' }, (0, history_1.parsePath)(url));
                        this.redirectFlag ? this.history.replace(newLocation) : this.history.push(newLocation);
                        this.redirectFlag = false;
                    }
                });
                window.addEventListener('beforeunload', (event) => {
                    if (this.sortedUpdateRouteHooks.some((updateRouteHook) => updateRouteHook() === false)) {
                        event.preventDefault();
                        event.returnValue = true;
                    }
                });
            }
            get sortedUpdateRouteHooks() {
                return Object.keys(this.updateRouteHooks)
                    .sort((a, b) => b - a)
                    .reduce((sortedUpdateRouteHooks, priority) => {
                    sortedUpdateRouteHooks = [
                        ...sortedUpdateRouteHooks,
                        ...this.updateRouteHooks[priority],
                    ];
                    return sortedUpdateRouteHooks;
                }, []);
            }
            addUpdateRouteHook(hook, priority = 0) {
                if (!this.updateRouteHooks[priority]) {
                    this.updateRouteHooks[priority] = [];
                }
                this.updateRouteHooks[priority].push(hook);
                return () => {
                    const updateRouteHooksForPriority = this.updateRouteHooks[priority];
                    const hookIndex = updateRouteHooksForPriority.indexOf(hook);
                    if (hookIndex === -1) {
                        return;
                    }
                    updateRouteHooksForPriority.splice(hookIndex, 1);
                };
            }
            addUpdateAttributesHook(hook) {
                this.updateAttributesHooks.push(hook);
            }
            bind(key, value, defaultValue = undefined) {
                this.bindings.set(key, value);
                this.bindingDefaults.set(key, defaultValue);
                if (this.attributes[key] === undefined && value.get() === defaultValue) {
                    // when the bound parameter already has the default value set, and the passed attribute has a value of
                    // undefined, then we should not set it to undefined to set it back to the default value afterwards
                    // if we would to that, registered intercepts would be called, although nothing changed
                    return;
                }
                if (key in this.attributes && value.get() !== this.attributes[key]) {
                    // when the bound parameter is bound set the state of the passed observable to the current value once
                    // required because otherwise the parameter will be overridden on the initial start of the application
                    value.set(this.attributes[key]);
                }
                if (value.get() === undefined) {
                    // when the observable value is not set we want it to be the default value
                    value.set(defaultValue);
                }
            }
            clearBindings() {
                this.bindings.clear();
                this.bindingDefaults.clear();
            }
            match(path, queryString) {
                for (const name in routeRegistry_1.default.getAll()) {
                    const route = routeRegistry_1.default.get(name);
                    const match = route.regexp.exec(path);
                    if (!match) {
                        continue;
                    }
                    const { availableAttributes } = route;
                    const attributes = {};
                    for (let i = 1; i < match.length; i++) {
                        attributes[availableAttributes[i - 1]] = tryParse(match[i]);
                    }
                    const search = new URLSearchParams(queryString);
                    search.forEach((value, key) => {
                        addAttributesFromSearchParameters(attributes, value, key);
                    });
                    this.handleNavigation(name, attributes, this.navigate);
                    return;
                }
                const attributes = {};
                const search = new URLSearchParams(queryString);
                search.forEach((value, key) => {
                    attributes[key] = tryParse(value);
                });
                this.attributes = attributes;
            }
            handleNavigation(name, attributes, updateRouteMethod) {
                if (!this.isRouteChanging(name, attributes)) {
                    return;
                }
                this.createAttributesHistory();
                this.update(name, attributes, updateRouteMethod);
            }
            update(name, attributes, updateRouteMethod) {
                const route = routeRegistry_1.default.get(name);
                const updatedAttributes = Object.assign(Object.assign({}, this.updateAttributesHooks.reduce((hookAttributes, updateAttributeHook) => (Object.assign(Object.assign({}, updateAttributeHook(route, attributes)), hookAttributes)), {})), attributes);
                const attributeDefaults = route.attributeDefaults;
                Object.keys(attributeDefaults).forEach((key) => {
                    // set default attributes if not passed, to automatically set important omitted attributes everywhere
                    // e.g. allows to always pass the default locale if nothing is passed
                    if (updatedAttributes[key] !== undefined) {
                        return;
                    }
                    updatedAttributes[key] = attributeDefaults[key];
                });
                for (const updateRouteHook of this.sortedUpdateRouteHooks) {
                    if (!updateRouteHook(route, updatedAttributes, updateRouteMethod)) {
                        return;
                    }
                }
                this.route = route;
                this.attributes = updatedAttributes;
                for (const [key, observableValue] of this.bindings.entries()) {
                    const value = this.attributes[key] !== undefined
                        ? this.attributes[key]
                        : this.bindingDefaults.get(key);
                    if (!equalBindings((0, mobx_1.toJS)(value), (0, mobx_1.toJS)(observableValue.get()))) {
                        observableValue.set(value);
                    }
                }
            }
            get url() {
                if (!this.route) {
                    return '';
                }
                const attributes = (0, mobx_1.toJS)(this.attributes);
                for (const [key, observableValue] of this.bindings.entries()) {
                    const value = observableValue.get();
                    attributes[key] = value;
                }
                const url = (0, path_to_regexp_1.compile)(this.route.path)(attributes);
                const searchParameters = new URLSearchParams();
                const { availableAttributes } = this.route;
                Object.keys(attributes).forEach((key) => {
                    const value = (0, mobx_1.toJS)(attributes[key]);
                    if (availableAttributes.includes(key) || value == this.bindingDefaults.get(key)) {
                        return;
                    }
                    addValueToSearchParameters(searchParameters, value, key);
                });
                const queryString = searchParameters.toString();
                return url + (queryString ? '?' + queryString : '');
            }
            createAttributesHistory() {
                if (!this.route) {
                    return;
                }
                if (!(this.route.name in this.attributesHistory)) {
                    this.attributesHistory[this.route.name] = [];
                }
                this.attributesHistory[this.route.name].push((0, mobx_1.toJS)(this.attributes));
            }
            isRouteChanging(name, attributes) {
                const route = routeRegistry_1.default.get(name);
                return !(this.route
                    && this.route.name === route.name
                    && (0, fast_deep_equal_1.default)(this.attributes, attributes));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _route_decorators = [mobx_1.observable];
            _attributes_decorators = [mobx_1.observable];
            _bindings_decorators = [mobx_1.observable];
            _get_sortedUpdateRouteHooks_decorators = [mobx_1.computed];
            _bind_decorators = [mobx_1.action];
            _clearBindings_decorators = [mobx_1.action];
            _match_decorators = [mobx_1.action];
            _navigate_decorators = [mobx_1.action];
            _navigateToResourceView_decorators = [mobx_1.action];
            _hasResourceView_decorators = [mobx_1.action];
            _redirect_decorators = [mobx_1.action];
            _update_decorators = [mobx_1.action];
            _get_url_decorators = [mobx_1.computed];
            __esDecorate(_a, null, _get_sortedUpdateRouteHooks_decorators, { kind: "getter", name: "sortedUpdateRouteHooks", static: false, private: false, access: { has: obj => "sortedUpdateRouteHooks" in obj, get: obj => obj.sortedUpdateRouteHooks }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _bind_decorators, { kind: "method", name: "bind", static: false, private: false, access: { has: obj => "bind" in obj, get: obj => obj.bind }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _clearBindings_decorators, { kind: "method", name: "clearBindings", static: false, private: false, access: { has: obj => "clearBindings" in obj, get: obj => obj.clearBindings }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _match_decorators, { kind: "method", name: "match", static: false, private: false, access: { has: obj => "match" in obj, get: obj => obj.match }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_url_decorators, { kind: "getter", name: "url", static: false, private: false, access: { has: obj => "url" in obj, get: obj => obj.url }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _route_decorators, { kind: "field", name: "route", static: false, private: false, access: { has: obj => "route" in obj, get: obj => obj.route, set: (obj, value) => { obj.route = value; } }, metadata: _metadata }, _route_initializers, _route_extraInitializers);
            __esDecorate(null, null, _attributes_decorators, { kind: "field", name: "attributes", static: false, private: false, access: { has: obj => "attributes" in obj, get: obj => obj.attributes, set: (obj, value) => { obj.attributes = value; } }, metadata: _metadata }, _attributes_initializers, _attributes_extraInitializers);
            __esDecorate(null, null, _bindings_decorators, { kind: "field", name: "bindings", static: false, private: false, access: { has: obj => "bindings" in obj, get: obj => obj.bindings, set: (obj, value) => { obj.bindings = value; } }, metadata: _metadata }, _bindings_initializers, _bindings_extraInitializers);
            __esDecorate(null, null, _navigate_decorators, { kind: "field", name: "navigate", static: false, private: false, access: { has: obj => "navigate" in obj, get: obj => obj.navigate, set: (obj, value) => { obj.navigate = value; } }, metadata: _metadata }, _navigate_initializers, _navigate_extraInitializers);
            __esDecorate(null, null, _navigateToResourceView_decorators, { kind: "field", name: "navigateToResourceView", static: false, private: false, access: { has: obj => "navigateToResourceView" in obj, get: obj => obj.navigateToResourceView, set: (obj, value) => { obj.navigateToResourceView = value; } }, metadata: _metadata }, _navigateToResourceView_initializers, _navigateToResourceView_extraInitializers);
            __esDecorate(null, null, _hasResourceView_decorators, { kind: "field", name: "hasResourceView", static: false, private: false, access: { has: obj => "hasResourceView" in obj, get: obj => obj.hasResourceView, set: (obj, value) => { obj.hasResourceView = value; } }, metadata: _metadata }, _hasResourceView_initializers, _hasResourceView_extraInitializers);
            __esDecorate(null, null, _redirect_decorators, { kind: "field", name: "redirect", static: false, private: false, access: { has: obj => "redirect" in obj, get: obj => obj.redirect, set: (obj, value) => { obj.redirect = value; } }, metadata: _metadata }, _redirect_initializers, _redirect_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = Router;
