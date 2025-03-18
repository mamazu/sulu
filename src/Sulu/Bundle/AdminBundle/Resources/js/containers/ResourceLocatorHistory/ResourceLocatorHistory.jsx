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
const Translator_1 = require("../../utils/Translator");
const Button_1 = __importDefault(require("../../components/Button"));
const Dialog_1 = __importDefault(require("../../components/Dialog"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const Overlay_1 = __importDefault(require("../../components/Overlay"));
const Table_1 = __importDefault(require("../../components/Table"));
const ResourceListStore_1 = __importDefault(require("../../stores/ResourceListStore"));
const resourceLocatorHistory_scss_1 = __importDefault(require("./resourceLocatorHistory.scss"));
let ResourceLocatorHistory = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _open_decorators;
    let _open_initializers = [];
    let _open_extraInitializers = [];
    let _showDeleteWarning_decorators;
    let _showDeleteWarning_initializers = [];
    let _showDeleteWarning_extraInitializers = [];
    let _handleButtonClick_decorators;
    let _handleButtonClick_initializers = [];
    let _handleButtonClick_extraInitializers = [];
    let _handleOverlayConfirm_decorators;
    let _handleOverlayConfirm_initializers = [];
    let _handleOverlayConfirm_extraInitializers = [];
    let _handleOverlayClose_decorators;
    let _handleOverlayClose_initializers = [];
    let _handleOverlayClose_extraInitializers = [];
    let _handleDeleteClick_decorators;
    let _handleDeleteClick_initializers = [];
    let _handleDeleteClick_extraInitializers = [];
    let _handleDeleteCancel_decorators;
    let _handleDeleteCancel_initializers = [];
    let _handleDeleteCancel_extraInitializers = [];
    let _handleDeleteConfirm_decorators;
    let _handleDeleteConfirm_initializers = [];
    let _handleDeleteConfirm_extraInitializers = [];
    var ResourceLocatorHistory = _classThis = class extends _classSuper {
        render() {
            const { resourceListStore, props } = this;
            const { id } = props;
            const historyRoutes = resourceListStore ? resourceListStore.data : [];
            return (<react_1.Fragment>
                <Button_1.default disabled={!id} icon="su-process" onClick={this.handleButtonClick} skin="link">
                    {(0, Translator_1.translate)('sulu_admin.show_history')}
                </Button_1.default>
                <Overlay_1.default confirmText={(0, Translator_1.translate)('sulu_admin.ok')} onClose={this.handleOverlayClose} onConfirm={this.handleOverlayConfirm} open={this.open} size="small" title={(0, Translator_1.translate)('sulu_admin.history')}>
                    {!this.resourceListStore || this.resourceListStore.loading
                    ? <div className={resourceLocatorHistory_scss_1.default.loader}>
                            <Loader_1.default />
                        </div>
                    : <div className={resourceLocatorHistory_scss_1.default.resourceLocatorHistoryOverlay}>
                            <Table_1.default buttons={[{ icon: 'su-trash-alt', onClick: this.handleDeleteClick }]}>
                                <Table_1.default.Header>
                                    <Table_1.default.HeaderCell>{(0, Translator_1.translate)('sulu_admin.url')}</Table_1.default.HeaderCell>
                                    <Table_1.default.HeaderCell>{(0, Translator_1.translate)('sulu_admin.created')}</Table_1.default.HeaderCell>
                                </Table_1.default.Header>
                                <Table_1.default.Body>
                                    {historyRoutes.map((historyRoute) => (<Table_1.default.Row id={historyRoute.id} key={historyRoute.id}>
                                            <Table_1.default.Cell>{historyRoute.resourcelocator}</Table_1.default.Cell>
                                            <Table_1.default.Cell>{(new Date(historyRoute.created)).toLocaleString()}</Table_1.default.Cell>
                                        </Table_1.default.Row>))}
                                </Table_1.default.Body>
                            </Table_1.default>
                        </div>}
                </Overlay_1.default>
                <Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmLoading={resourceListStore ? resourceListStore.deleting : false} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} onCancel={this.handleDeleteCancel} onConfirm={this.handleDeleteConfirm} open={this.showDeleteWarning} title={(0, Translator_1.translate)('sulu_admin.delete')}>
                    {(0, Translator_1.translate)('sulu_admin.resource_locator_history_delete_warning')}
                </Dialog_1.default>
            </react_1.Fragment>);
        }
        constructor() {
            super(...arguments);
            this.open = __runInitializers(this, _open_initializers, false);
            this.showDeleteWarning = (__runInitializers(this, _open_extraInitializers), __runInitializers(this, _showDeleteWarning_initializers, false));
            this.deleteId = __runInitializers(this, _showDeleteWarning_extraInitializers);
            this.handleButtonClick = __runInitializers(this, _handleButtonClick_initializers, () => {
                const { id, options, resourceKey } = this.props;
                this.resourceListStore = new ResourceListStore_1.default(resourceKey, Object.assign(Object.assign({}, options), { id }));
                this.open = true;
            });
            this.handleOverlayConfirm = (__runInitializers(this, _handleButtonClick_extraInitializers), __runInitializers(this, _handleOverlayConfirm_initializers, () => {
                this.open = false;
            }));
            this.handleOverlayClose = (__runInitializers(this, _handleOverlayConfirm_extraInitializers), __runInitializers(this, _handleOverlayClose_initializers, () => {
                this.open = false;
            }));
            this.handleDeleteClick = (__runInitializers(this, _handleOverlayClose_extraInitializers), __runInitializers(this, _handleDeleteClick_initializers, (id) => {
                this.showDeleteWarning = true;
                this.deleteId = id;
            }));
            this.handleDeleteCancel = (__runInitializers(this, _handleDeleteClick_extraInitializers), __runInitializers(this, _handleDeleteCancel_initializers, () => {
                this.showDeleteWarning = false;
                this.deleteId = undefined;
            }));
            this.handleDeleteConfirm = (__runInitializers(this, _handleDeleteCancel_extraInitializers), __runInitializers(this, _handleDeleteConfirm_initializers, () => {
                if (!this.deleteId) {
                    throw new Error('The "deleteId" has not been set! This should not happen and is likely a bug!');
                }
                if (!this.resourceListStore) {
                    throw new Error('The ResourceListStore has not been initialized yet! This should not happen and is likely a bug.');
                }
                this.resourceListStore.deleteList([this.deleteId]).then((0, mobx_1.action)(() => {
                    this.showDeleteWarning = false;
                    this.deleteId = undefined;
                }));
            }));
            __runInitializers(this, _handleDeleteConfirm_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "ResourceLocatorHistory");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _open_decorators = [mobx_1.observable];
        _showDeleteWarning_decorators = [mobx_1.observable];
        _handleButtonClick_decorators = [mobx_1.action];
        _handleOverlayConfirm_decorators = [mobx_1.action];
        _handleOverlayClose_decorators = [mobx_1.action];
        _handleDeleteClick_decorators = [mobx_1.action];
        _handleDeleteCancel_decorators = [mobx_1.action];
        _handleDeleteConfirm_decorators = [mobx_1.action];
        __esDecorate(null, null, _open_decorators, { kind: "field", name: "open", static: false, private: false, access: { has: obj => "open" in obj, get: obj => obj.open, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, _open_initializers, _open_extraInitializers);
        __esDecorate(null, null, _showDeleteWarning_decorators, { kind: "field", name: "showDeleteWarning", static: false, private: false, access: { has: obj => "showDeleteWarning" in obj, get: obj => obj.showDeleteWarning, set: (obj, value) => { obj.showDeleteWarning = value; } }, metadata: _metadata }, _showDeleteWarning_initializers, _showDeleteWarning_extraInitializers);
        __esDecorate(null, null, _handleButtonClick_decorators, { kind: "field", name: "handleButtonClick", static: false, private: false, access: { has: obj => "handleButtonClick" in obj, get: obj => obj.handleButtonClick, set: (obj, value) => { obj.handleButtonClick = value; } }, metadata: _metadata }, _handleButtonClick_initializers, _handleButtonClick_extraInitializers);
        __esDecorate(null, null, _handleOverlayConfirm_decorators, { kind: "field", name: "handleOverlayConfirm", static: false, private: false, access: { has: obj => "handleOverlayConfirm" in obj, get: obj => obj.handleOverlayConfirm, set: (obj, value) => { obj.handleOverlayConfirm = value; } }, metadata: _metadata }, _handleOverlayConfirm_initializers, _handleOverlayConfirm_extraInitializers);
        __esDecorate(null, null, _handleOverlayClose_decorators, { kind: "field", name: "handleOverlayClose", static: false, private: false, access: { has: obj => "handleOverlayClose" in obj, get: obj => obj.handleOverlayClose, set: (obj, value) => { obj.handleOverlayClose = value; } }, metadata: _metadata }, _handleOverlayClose_initializers, _handleOverlayClose_extraInitializers);
        __esDecorate(null, null, _handleDeleteClick_decorators, { kind: "field", name: "handleDeleteClick", static: false, private: false, access: { has: obj => "handleDeleteClick" in obj, get: obj => obj.handleDeleteClick, set: (obj, value) => { obj.handleDeleteClick = value; } }, metadata: _metadata }, _handleDeleteClick_initializers, _handleDeleteClick_extraInitializers);
        __esDecorate(null, null, _handleDeleteCancel_decorators, { kind: "field", name: "handleDeleteCancel", static: false, private: false, access: { has: obj => "handleDeleteCancel" in obj, get: obj => obj.handleDeleteCancel, set: (obj, value) => { obj.handleDeleteCancel = value; } }, metadata: _metadata }, _handleDeleteCancel_initializers, _handleDeleteCancel_extraInitializers);
        __esDecorate(null, null, _handleDeleteConfirm_decorators, { kind: "field", name: "handleDeleteConfirm", static: false, private: false, access: { has: obj => "handleDeleteConfirm" in obj, get: obj => obj.handleDeleteConfirm, set: (obj, value) => { obj.handleDeleteConfirm = value; } }, metadata: _metadata }, _handleDeleteConfirm_initializers, _handleDeleteConfirm_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceLocatorHistory = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceLocatorHistory = _classThis;
})();
exports.default = ResourceLocatorHistory;
