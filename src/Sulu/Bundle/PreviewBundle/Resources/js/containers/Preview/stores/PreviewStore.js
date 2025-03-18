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
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
const generateRoute = (name, options) => {
    return PreviewStore.endpoints[name] + (0, utils_1.buildQueryString)(options);
};
let PreviewStore = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _locale_decorators;
    let _locale_initializers = [];
    let _locale_extraInitializers = [];
    let _webspace_decorators;
    let _webspace_initializers = [];
    let _webspace_extraInitializers = [];
    let _segment_decorators;
    let _segment_initializers = [];
    let _segment_extraInitializers = [];
    let _targetGroup_decorators;
    let _targetGroup_initializers = [];
    let _targetGroup_extraInitializers = [];
    let _dateTime_decorators;
    let _dateTime_initializers = [];
    let _dateTime_extraInitializers = [];
    let _token_decorators;
    let _token_initializers = [];
    let _token_extraInitializers = [];
    let _get_starting_decorators;
    let _get_renderRoute_decorators;
    let _setToken_decorators;
    let _setToken_initializers = [];
    let _setToken_extraInitializers = [];
    let _setWebspace_decorators;
    let _setWebspace_initializers = [];
    let _setWebspace_extraInitializers = [];
    let _setTargetGroup_decorators;
    let _setTargetGroup_initializers = [];
    let _setTargetGroup_extraInitializers = [];
    let _setSegment_decorators;
    let _setSegment_initializers = [];
    let _setSegment_extraInitializers = [];
    let _setDateTime_decorators;
    let _setDateTime_initializers = [];
    let _setDateTime_extraInitializers = [];
    let _restart_decorators;
    return _a = class PreviewStore {
            constructor(resourceKey, id, locale, webspace, segment) {
                this.resourceKey = __runInitializers(this, _instanceExtraInitializers);
                this.locale = __runInitializers(this, _locale_initializers, void 0);
                this.webspace = (__runInitializers(this, _locale_extraInitializers), __runInitializers(this, _webspace_initializers, void 0));
                this.segment = (__runInitializers(this, _webspace_extraInitializers), __runInitializers(this, _segment_initializers, void 0));
                this.targetGroup = (__runInitializers(this, _segment_extraInitializers), __runInitializers(this, _targetGroup_initializers, -1));
                this.dateTime = (__runInitializers(this, _targetGroup_extraInitializers), __runInitializers(this, _dateTime_initializers, undefined));
                this.token = (__runInitializers(this, _dateTime_extraInitializers), __runInitializers(this, _token_initializers, void 0));
                this.setToken = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _setToken_initializers, (token) => {
                    this.token = token;
                }));
                this.setWebspace = (__runInitializers(this, _setToken_extraInitializers), __runInitializers(this, _setWebspace_initializers, (webspace) => {
                    this.webspace = webspace;
                }));
                this.setTargetGroup = (__runInitializers(this, _setWebspace_extraInitializers), __runInitializers(this, _setTargetGroup_initializers, (targetGroup) => {
                    this.targetGroup = targetGroup;
                }));
                this.setSegment = (__runInitializers(this, _setTargetGroup_extraInitializers), __runInitializers(this, _setSegment_initializers, (segment) => {
                    this.segment = segment;
                }));
                this.setDateTime = (__runInitializers(this, _setSegment_extraInitializers), __runInitializers(this, _setDateTime_initializers, (dateTime) => {
                    this.dateTime = dateTime;
                }));
                __runInitializers(this, _setDateTime_extraInitializers);
                // keep backwards compatibility to previous versions where locale was passed as string
                if (typeof locale !== 'string') {
                    locale = (0, mobx_1.toJS)(locale);
                }
                this.resourceKey = resourceKey;
                this.id = id;
                this.locale = locale;
                this.webspace = webspace;
                this.segment = segment;
            }
            get starting() {
                return !this.token;
            }
            get renderRoute() {
                return generateRoute('render', {
                    webspaceKey: this.webspace,
                    segmentKey: this.segment,
                    provider: this.resourceKey,
                    id: this.id,
                    locale: this.locale,
                    token: this.token,
                    targetGroupId: this.targetGroup,
                    dateTime: this.dateTime && (0, utils_1.transformDateForUrl)(this.dateTime),
                });
            }
            start() {
                const route = generateRoute('start', {
                    provider: this.resourceKey,
                    id: this.id,
                    locale: this.locale,
                });
                return services_1.Requester.post(route).then((response) => {
                    this.setToken(response.token);
                });
            }
            restart(locale) {
                return this.stop().then(() => {
                    if (locale) {
                        this.locale = locale;
                    }
                    return this.start();
                });
            }
            update(data) {
                const route = generateRoute('update', {
                    locale: this.locale,
                    webspaceKey: this.webspace,
                    segmentKey: this.segment,
                    token: this.token,
                    provider: this.resourceKey,
                    id: this.id,
                    targetGroupId: this.targetGroup,
                    dateTime: this.dateTime && (0, utils_1.transformDateForUrl)(this.dateTime),
                });
                return services_1.Requester.post(route, { data }).then((response) => {
                    return response.content;
                });
            }
            updateContext(type, data) {
                const route = generateRoute('update-context', {
                    webspaceKey: this.webspace,
                    segmentKey: this.segment,
                    token: this.token,
                    locale: this.locale,
                    provider: this.resourceKey,
                    id: this.id,
                    targetGroupId: this.targetGroup,
                    dateTime: this.dateTime && (0, utils_1.transformDateForUrl)(this.dateTime),
                });
                return services_1.Requester.post(route, { data, context: { template: type } }).then((response) => {
                    return response.content;
                });
            }
            stop() {
                const route = generateRoute('stop', { token: this.token });
                return services_1.Requester.post(route).then(() => this.setToken(null));
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _locale_decorators = [mobx_1.observable];
            _webspace_decorators = [mobx_1.observable];
            _segment_decorators = [mobx_1.observable];
            _targetGroup_decorators = [mobx_1.observable];
            _dateTime_decorators = [mobx_1.observable];
            _token_decorators = [mobx_1.observable];
            _get_starting_decorators = [mobx_1.computed];
            _get_renderRoute_decorators = [mobx_1.computed];
            _setToken_decorators = [mobx_1.action];
            _setWebspace_decorators = [mobx_1.action];
            _setTargetGroup_decorators = [mobx_1.action];
            _setSegment_decorators = [mobx_1.action];
            _setDateTime_decorators = [mobx_1.action];
            _restart_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_starting_decorators, { kind: "getter", name: "starting", static: false, private: false, access: { has: obj => "starting" in obj, get: obj => obj.starting }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_renderRoute_decorators, { kind: "getter", name: "renderRoute", static: false, private: false, access: { has: obj => "renderRoute" in obj, get: obj => obj.renderRoute }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _restart_decorators, { kind: "method", name: "restart", static: false, private: false, access: { has: obj => "restart" in obj, get: obj => obj.restart }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _locale_decorators, { kind: "field", name: "locale", static: false, private: false, access: { has: obj => "locale" in obj, get: obj => obj.locale, set: (obj, value) => { obj.locale = value; } }, metadata: _metadata }, _locale_initializers, _locale_extraInitializers);
            __esDecorate(null, null, _webspace_decorators, { kind: "field", name: "webspace", static: false, private: false, access: { has: obj => "webspace" in obj, get: obj => obj.webspace, set: (obj, value) => { obj.webspace = value; } }, metadata: _metadata }, _webspace_initializers, _webspace_extraInitializers);
            __esDecorate(null, null, _segment_decorators, { kind: "field", name: "segment", static: false, private: false, access: { has: obj => "segment" in obj, get: obj => obj.segment, set: (obj, value) => { obj.segment = value; } }, metadata: _metadata }, _segment_initializers, _segment_extraInitializers);
            __esDecorate(null, null, _targetGroup_decorators, { kind: "field", name: "targetGroup", static: false, private: false, access: { has: obj => "targetGroup" in obj, get: obj => obj.targetGroup, set: (obj, value) => { obj.targetGroup = value; } }, metadata: _metadata }, _targetGroup_initializers, _targetGroup_extraInitializers);
            __esDecorate(null, null, _dateTime_decorators, { kind: "field", name: "dateTime", static: false, private: false, access: { has: obj => "dateTime" in obj, get: obj => obj.dateTime, set: (obj, value) => { obj.dateTime = value; } }, metadata: _metadata }, _dateTime_initializers, _dateTime_extraInitializers);
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: obj => "token" in obj, get: obj => obj.token, set: (obj, value) => { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
            __esDecorate(null, null, _setToken_decorators, { kind: "field", name: "setToken", static: false, private: false, access: { has: obj => "setToken" in obj, get: obj => obj.setToken, set: (obj, value) => { obj.setToken = value; } }, metadata: _metadata }, _setToken_initializers, _setToken_extraInitializers);
            __esDecorate(null, null, _setWebspace_decorators, { kind: "field", name: "setWebspace", static: false, private: false, access: { has: obj => "setWebspace" in obj, get: obj => obj.setWebspace, set: (obj, value) => { obj.setWebspace = value; } }, metadata: _metadata }, _setWebspace_initializers, _setWebspace_extraInitializers);
            __esDecorate(null, null, _setTargetGroup_decorators, { kind: "field", name: "setTargetGroup", static: false, private: false, access: { has: obj => "setTargetGroup" in obj, get: obj => obj.setTargetGroup, set: (obj, value) => { obj.setTargetGroup = value; } }, metadata: _metadata }, _setTargetGroup_initializers, _setTargetGroup_extraInitializers);
            __esDecorate(null, null, _setSegment_decorators, { kind: "field", name: "setSegment", static: false, private: false, access: { has: obj => "setSegment" in obj, get: obj => obj.setSegment, set: (obj, value) => { obj.setSegment = value; } }, metadata: _metadata }, _setSegment_initializers, _setSegment_extraInitializers);
            __esDecorate(null, null, _setDateTime_decorators, { kind: "field", name: "setDateTime", static: false, private: false, access: { has: obj => "setDateTime" in obj, get: obj => obj.setDateTime, set: (obj, value) => { obj.setDateTime = value; } }, metadata: _metadata }, _setDateTime_initializers, _setDateTime_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.endpoints = {},
        _a;
})();
exports.default = PreviewStore;
