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
const stores_1 = require("sulu-admin-bundle/stores");
const views_1 = require("sulu-admin-bundle/views");
const WebspaceSelect_1 = __importDefault(require("../../components/WebspaceSelect"));
const webspaceStore_1 = __importDefault(require("../../stores/webspaceStore"));
const webspaceTabs_scss_1 = __importDefault(require("./webspaceTabs.scss"));
const USER_SETTING_PREFIX = 'sulu_page.webspace_tabs';
const USER_SETTING_WEBSPACE = [USER_SETTING_PREFIX, 'webspace'].join('.');
let WebspaceTabs = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _get_webspace_decorators;
    let _handleWebspaceChange_decorators;
    let _handleWebspaceChange_initializers = [];
    let _handleWebspaceChange_extraInitializers = [];
    var WebspaceTabs = _classThis = class extends _classSuper {
        static getDerivedRouteAttributes(route, attributes) {
            const webspace = attributes.webspace
                ? attributes.webspace
                : stores_1.userStore.getPersistentSetting(USER_SETTING_WEBSPACE);
            return { webspace };
        }
        get webspace() {
            return webspaceStore_1.default.getWebspace(this.webspaceKey.get());
        }
        constructor(props) {
            super(props);
            this.webspaceKey = (__runInitializers(this, _instanceExtraInitializers), mobx_1.observable.box());
            this.bindWebspaceToRouter = () => {
                const { router } = this.props;
                router.bind('webspace', this.webspaceKey);
                return true;
            };
            this.handleWebspaceChange = __runInitializers(this, _handleWebspaceChange_initializers, (value) => {
                this.webspaceKey.set(value);
            });
            __runInitializers(this, _handleWebspaceChange_extraInitializers);
            const { router } = this.props;
            this.bindWebspaceToRouter();
            this.webspaceDisposer = (0, mobx_1.intercept)(this.webspaceKey, '', (change) => {
                if (!change.newValue) {
                    return change;
                }
                stores_1.userStore.setPersistentSetting(USER_SETTING_WEBSPACE, change.newValue);
                return change;
            });
            this.bindWebspaceToRouterDisposer = router.addUpdateRouteHook(this.bindWebspaceToRouter);
        }
        componentWillUnmount() {
            this.bindWebspaceToRouterDisposer();
            this.webspaceDisposer();
        }
        render() {
            return (<views_1.Tabs {...this.props} childrenProps={{ webspace: this.webspace, webspaceKey: this.webspaceKey }} header={<div className={webspaceTabs_scss_1.default.webspaceSelect}>
                        <WebspaceSelect_1.default onChange={this.handleWebspaceChange} value={this.webspaceKey.get()}>
                            {webspaceStore_1.default.grantedWebspaces.map((webspace) => (<WebspaceSelect_1.default.Item key={webspace.key} value={webspace.key}>
                                    {webspace.name}
                                </WebspaceSelect_1.default.Item>))}
                        </WebspaceSelect_1.default>
                    </div>}/>);
        }
    };
    __setFunctionName(_classThis, "WebspaceTabs");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_webspace_decorators = [mobx_1.computed];
        _handleWebspaceChange_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_webspace_decorators, { kind: "getter", name: "webspace", static: false, private: false, access: { has: obj => "webspace" in obj, get: obj => obj.webspace }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _handleWebspaceChange_decorators, { kind: "field", name: "handleWebspaceChange", static: false, private: false, access: { has: obj => "handleWebspaceChange" in obj, get: obj => obj.handleWebspaceChange, set: (obj, value) => { obj.handleWebspaceChange = value; } }, metadata: _metadata }, _handleWebspaceChange_initializers, _handleWebspaceChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebspaceTabs = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebspaceTabs = _classThis;
})();
exports.default = WebspaceTabs;
