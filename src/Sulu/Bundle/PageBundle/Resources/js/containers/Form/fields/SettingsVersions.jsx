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
const components_1 = require("sulu-admin-bundle/components");
const containers_1 = require("sulu-admin-bundle/containers");
const services_1 = require("sulu-admin-bundle/services");
const utils_1 = require("sulu-admin-bundle/utils");
const loglevel_1 = __importDefault(require("loglevel"));
let SettingsVersions = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _page_decorators;
    let _page_initializers = [];
    let _page_extraInitializers = [];
    let _restoreId_decorators;
    let _restoreId_initializers = [];
    let _restoreId_extraInitializers = [];
    let _restoring_decorators;
    let _restoring_initializers = [];
    let _restoring_extraInitializers = [];
    let _get_resourceKey_decorators;
    let _get_listKey_decorators;
    let _get_userSettingsKey_decorators;
    let _get_parentRoute_decorators;
    let _handleRestoreClick_decorators;
    let _handleRestoreClick_initializers = [];
    let _handleRestoreClick_extraInitializers = [];
    let _handleCancel_decorators;
    let _handleCancel_initializers = [];
    let _handleCancel_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    var SettingsVersions = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.listStore = __runInitializers(this, _instanceExtraInitializers);
            this.page = __runInitializers(this, _page_initializers, mobx_1.observable.box(1));
            this.restoreId = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _restoreId_initializers, undefined));
            this.restoring = (__runInitializers(this, _restoreId_extraInitializers), __runInitializers(this, _restoring_initializers, false));
            this.handleRestoreClick = (__runInitializers(this, _restoring_extraInitializers), __runInitializers(this, _handleRestoreClick_initializers, (id) => {
                this.restoreId = id;
            }));
            this.handleCancel = (__runInitializers(this, _handleRestoreClick_extraInitializers), __runInitializers(this, _handleCancel_initializers, () => {
                this.restoreId = undefined;
            }));
            this.handleConfirm = (__runInitializers(this, _handleCancel_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                const { formInspector: { id, locale, options: { webspace, }, }, router, } = this.props;
                this.restoring = true;
                services_1.ResourceRequester
                    .post(this.resourceKey, {}, { action: 'restore', id, version: this.restoreId, locale, webspace })
                    .then((0, mobx_1.action)(() => {
                    this.restoring = false;
                    this.restoreId = undefined;
                    if (!router) {
                        throw new Error('A router is required for this field type to work properly!');
                    }
                    router.navigate(this.parentRoute, { id, locale, webspace });
                }));
            }));
            this.getListItemActions = (__runInitializers(this, _handleConfirm_extraInitializers), () => {
                return [
                    {
                        icon: 'su-process',
                        onClick: this.handleRestoreClick,
                    },
                ];
            });
            // @deprecated
            loglevel_1.default.warn('The "SettingsVersions" field-type is deprecated since 2.3 and will be removed. ' +
                'Use a list view with the the "RestoreVersionItemAction" to restore previous versions instead.');
            const { formInspector } = this.props;
            this.listStore = new containers_1.ListStore(this.resourceKey, this.listKey, this.userSettingsKey, { locale: formInspector.locale, page: this.page }, { id: formInspector.id, webspace: formInspector.options.webspace });
            formInspector.addSaveHandler((action) => {
                if (action !== 'publish') {
                    return;
                }
                this.listStore.reload();
            });
        }
        get resourceKey() {
            const { schemaOptions: { resource_key: { value: resourceKey, } = {}, }, } = this.props;
            if (resourceKey === undefined || typeof resourceKey !== 'string') {
                throw new Error('The "resource_key" schemaOption is mandatory and must be a string, but received ' +
                    typeof resourceKey + '!');
            }
            return resourceKey;
        }
        get listKey() {
            const { schemaOptions: { list_key: { value: listKey = this.resourceKey, } = {}, }, } = this.props;
            if (typeof listKey !== 'string') {
                throw new Error('The "list_key" schemaOption must be a string, but received ' +
                    typeof listKey + '!');
            }
            return listKey;
        }
        get userSettingsKey() {
            const { schemaOptions: { user_settings_key: { value: userSettingsKey = this.listKey, } = {}, }, } = this.props;
            if (typeof userSettingsKey !== 'string') {
                throw new Error('The "user_settings_key" schemaOption must be a string, but received ' +
                    typeof userSettingsKey + '!');
            }
            return userSettingsKey;
        }
        get parentRoute() {
            var _a, _b;
            const { router } = this.props;
            if (!((_b = (_a = router === null || router === void 0 ? void 0 : router.route) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.name)) {
                throw new Error('A route with a valid parent route is required for this field type to work properly!');
            }
            return router.route.parent.name;
        }
        render() {
            return (<react_1.Fragment>
                <containers_1.List adapters={['table']} filterable={false} itemActionsProvider={this.getListItemActions} searchable={false} selectable={false} showColumnOptions={false} store={this.listStore}/>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.restoring} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleCancel} onConfirm={this.handleConfirm} open={!!this.restoreId} title={(0, utils_1.translate)('sulu_page.restore_version')}>
                    {(0, utils_1.translate)('sulu_page.restore_version_text')}
                </components_1.Dialog>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "SettingsVersions");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _page_decorators = [mobx_1.observable];
        _restoreId_decorators = [mobx_1.observable];
        _restoring_decorators = [mobx_1.observable];
        _get_resourceKey_decorators = [mobx_1.computed];
        _get_listKey_decorators = [mobx_1.computed];
        _get_userSettingsKey_decorators = [mobx_1.computed];
        _get_parentRoute_decorators = [mobx_1.computed];
        _handleRestoreClick_decorators = [mobx_1.action];
        _handleCancel_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_resourceKey_decorators, { kind: "getter", name: "resourceKey", static: false, private: false, access: { has: obj => "resourceKey" in obj, get: obj => obj.resourceKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_listKey_decorators, { kind: "getter", name: "listKey", static: false, private: false, access: { has: obj => "listKey" in obj, get: obj => obj.listKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_userSettingsKey_decorators, { kind: "getter", name: "userSettingsKey", static: false, private: false, access: { has: obj => "userSettingsKey" in obj, get: obj => obj.userSettingsKey }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_parentRoute_decorators, { kind: "getter", name: "parentRoute", static: false, private: false, access: { has: obj => "parentRoute" in obj, get: obj => obj.parentRoute }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: obj => "page" in obj, get: obj => obj.page, set: (obj, value) => { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
        __esDecorate(null, null, _restoreId_decorators, { kind: "field", name: "restoreId", static: false, private: false, access: { has: obj => "restoreId" in obj, get: obj => obj.restoreId, set: (obj, value) => { obj.restoreId = value; } }, metadata: _metadata }, _restoreId_initializers, _restoreId_extraInitializers);
        __esDecorate(null, null, _restoring_decorators, { kind: "field", name: "restoring", static: false, private: false, access: { has: obj => "restoring" in obj, get: obj => obj.restoring, set: (obj, value) => { obj.restoring = value; } }, metadata: _metadata }, _restoring_initializers, _restoring_extraInitializers);
        __esDecorate(null, null, _handleRestoreClick_decorators, { kind: "field", name: "handleRestoreClick", static: false, private: false, access: { has: obj => "handleRestoreClick" in obj, get: obj => obj.handleRestoreClick, set: (obj, value) => { obj.handleRestoreClick = value; } }, metadata: _metadata }, _handleRestoreClick_initializers, _handleRestoreClick_extraInitializers);
        __esDecorate(null, null, _handleCancel_decorators, { kind: "field", name: "handleCancel", static: false, private: false, access: { has: obj => "handleCancel" in obj, get: obj => obj.handleCancel, set: (obj, value) => { obj.handleCancel = value; } }, metadata: _metadata }, _handleCancel_initializers, _handleCancel_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SettingsVersions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SettingsVersions = _classThis;
})();
exports.default = SettingsVersions;
