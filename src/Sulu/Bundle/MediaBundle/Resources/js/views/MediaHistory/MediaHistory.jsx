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
const mediaHistory_scss_1 = __importDefault(require("./mediaHistory.scss"));
const COLLECTION_ROUTE = 'sulu_media.overview';
let MediaHistory = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _deleteId_decorators;
    let _deleteId_initializers = [];
    let _deleteId_extraInitializers = [];
    let _deleting_decorators;
    let _deleting_initializers = [];
    let _deleting_extraInitializers = [];
    let _get_versions_decorators;
    let _handleDeleteClick_decorators;
    let _handleDeleteClick_initializers = [];
    let _handleDeleteClick_extraInitializers = [];
    let _handleDeleteCancel_decorators;
    let _handleDeleteCancel_initializers = [];
    let _handleDeleteCancel_extraInitializers = [];
    let _handleDeleteConfirm_decorators;
    let _handleDeleteConfirm_initializers = [];
    let _handleDeleteConfirm_extraInitializers = [];
    var MediaHistory = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.deleteId = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _deleteId_initializers, undefined));
            this.deleting = (__runInitializers(this, _deleteId_extraInitializers), __runInitializers(this, _deleting_initializers, false));
            this.showSuccess = (__runInitializers(this, _deleting_extraInitializers), mobx_1.observable.box(false));
            this.handleShowClick = (id) => {
                const version = this.versions.find((version) => version.version === id);
                if (!version) {
                    throw new Error('Version "' + id + '" was not found. This should not happen and is likely a bug.');
                }
                window.open((version.adminUrl ? version.adminUrl : version.url) + '&inline=1');
            };
            this.handleDeleteClick = __runInitializers(this, _handleDeleteClick_initializers, (version) => {
                this.deleteId = version;
            });
            this.handleDeleteCancel = (__runInitializers(this, _handleDeleteClick_extraInitializers), __runInitializers(this, _handleDeleteCancel_initializers, () => {
                this.deleteId = undefined;
            }));
            this.handleDeleteConfirm = (__runInitializers(this, _handleDeleteCancel_extraInitializers), __runInitializers(this, _handleDeleteConfirm_initializers, () => {
                if (!this.deleteId) {
                    throw new Error('The "deleteId" is not set. This should not happen and is likely a bug.');
                }
                const { resourceStore } = this.props;
                const { id, locale } = resourceStore;
                this.deleting = true;
                services_1.ResourceRequester.delete('media_versions', { id, locale, version: this.deleteId })
                    .then((0, mobx_1.action)(() => {
                    this.deleting = false;
                    this.deleteId = undefined;
                    this.showSuccess.set(true);
                    resourceStore.reload();
                }));
            }));
            __runInitializers(this, _handleDeleteConfirm_extraInitializers);
            const { router, resourceStore, } = this.props;
            const locale = resourceStore.locale;
            if (!locale) {
                throw new Error('The resourceStore for the MediaHistory must have a locale');
            }
            router.bind('locale', locale);
        }
        get versions() {
            return Object.values(this.props.resourceStore.data.versions);
        }
        render() {
            const { resourceStore, title } = this.props;
            const viewButton = {
                icon: 'su-eye',
                onClick: this.handleShowClick,
            };
            const deleteButton = {
                icon: 'su-trash-alt',
                onClick: this.handleDeleteClick,
            };
            return (<react_1.Fragment>
                <div className={mediaHistory_scss_1.default.mediaHistory}>
                    {title && <h1>{title}</h1>}
                    {resourceStore.loading
                    ? <components_1.Loader />
                    : <components_1.Table>
                            <components_1.Table.Header buttons={[viewButton, deleteButton]}>
                                <components_1.Table.HeaderCell>{(0, utils_1.translate)('sulu_media.version')}</components_1.Table.HeaderCell>
                                <components_1.Table.HeaderCell>{(0, utils_1.translate)('sulu_admin.created')}</components_1.Table.HeaderCell>
                            </components_1.Table.Header>
                            <components_1.Table.Body>
                                {this.versions.reverse().map((version) => (<components_1.Table.Row buttons={[
                                viewButton,
                                version.version === resourceStore.data.version
                                    ? Object.assign(Object.assign({}, deleteButton), { icon: 'su-lock', disabled: true }) : deleteButton,
                            ]} id={version.version} key={version.version}>
                                        <components_1.Table.Cell>{(0, utils_1.translate)('sulu_media.version')} {version.version}</components_1.Table.Cell>
                                        <components_1.Table.Cell>{(new Date(version.created)).toLocaleString()}</components_1.Table.Cell>
                                    </components_1.Table.Row>))}
                            </components_1.Table.Body>
                        </components_1.Table>}
                </div>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.deleting} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleDeleteCancel} onConfirm={this.handleDeleteConfirm} open={!!this.deleteId} title={(0, utils_1.translate)('sulu_admin.delete_warning_title')}>
                    {(0, utils_1.translate)('sulu_admin.delete_warning_text')}
                </components_1.Dialog>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "MediaHistory");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _deleteId_decorators = [mobx_1.observable];
        _deleting_decorators = [mobx_1.observable];
        _get_versions_decorators = [mobx_1.computed];
        _handleDeleteClick_decorators = [mobx_1.action];
        _handleDeleteCancel_decorators = [mobx_1.action];
        _handleDeleteConfirm_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_versions_decorators, { kind: "getter", name: "versions", static: false, private: false, access: { has: obj => "versions" in obj, get: obj => obj.versions }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _deleteId_decorators, { kind: "field", name: "deleteId", static: false, private: false, access: { has: obj => "deleteId" in obj, get: obj => obj.deleteId, set: (obj, value) => { obj.deleteId = value; } }, metadata: _metadata }, _deleteId_initializers, _deleteId_extraInitializers);
        __esDecorate(null, null, _deleting_decorators, { kind: "field", name: "deleting", static: false, private: false, access: { has: obj => "deleting" in obj, get: obj => obj.deleting, set: (obj, value) => { obj.deleting = value; } }, metadata: _metadata }, _deleting_initializers, _deleting_extraInitializers);
        __esDecorate(null, null, _handleDeleteClick_decorators, { kind: "field", name: "handleDeleteClick", static: false, private: false, access: { has: obj => "handleDeleteClick" in obj, get: obj => obj.handleDeleteClick, set: (obj, value) => { obj.handleDeleteClick = value; } }, metadata: _metadata }, _handleDeleteClick_initializers, _handleDeleteClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteCancel_decorators, { kind: "field", name: "handleDeleteCancel", static: false, private: false, access: { has: obj => "handleDeleteCancel" in obj, get: obj => obj.handleDeleteCancel, set: (obj, value) => { obj.handleDeleteCancel = value; } }, metadata: _metadata }, _handleDeleteCancel_initializers, _handleDeleteCancel_extraInitializers);
        __esDecorate(null, null, _handleDeleteConfirm_decorators, { kind: "field", name: "handleDeleteConfirm", static: false, private: false, access: { has: obj => "handleDeleteConfirm" in obj, get: obj => obj.handleDeleteConfirm, set: (obj, value) => { obj.handleDeleteConfirm = value; } }, metadata: _metadata }, _handleDeleteConfirm_initializers, _handleDeleteConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MediaHistory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MediaHistory = _classThis;
})();
exports.default = (0, containers_1.withToolbar)(MediaHistory, function () {
    const { resourceStore, router } = this.props;
    const { locales } = router.route.options;
    const locale = locales
        ? {
            value: resourceStore.locale.get(),
            onChange: (locale) => {
                router.navigate(router.route.name, Object.assign(Object.assign({}, router.attributes), { locale }));
            },
            options: locales.map((locale) => ({
                value: locale,
                label: locale,
            })),
        }
        : undefined;
    return {
        locale,
        backButton: {
            onClick: () => {
                router.restore(COLLECTION_ROUTE, { locale: resourceStore.locale.get() });
            },
        },
        showSuccess: this.showSuccess,
    };
});
