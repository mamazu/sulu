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
const containers_1 = require("sulu-admin-bundle/containers");
const components_1 = require("sulu-admin-bundle/components");
const stores_1 = require("sulu-admin-bundle/stores");
const utils_1 = require("sulu-admin-bundle/utils");
const permissionFormOverlay_scss_1 = __importDefault(require("./permissionFormOverlay.scss"));
const API_OPTIONS = { resourceKey: 'media' };
let PermissionFormOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _showInheritDialog_decorators;
    let _showInheritDialog_initializers = [];
    let _showInheritDialog_extraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _componentDidUpdate_decorators;
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleConfirmInherit_decorators;
    let _handleConfirmInherit_initializers = [];
    let _handleConfirmInherit_extraInitializers = [];
    let _handleSubmitInherit_decorators;
    let _handleSubmitInherit_initializers = [];
    let _handleSubmitInherit_extraInitializers = [];
    let _handleCancelInherit_decorators;
    let _handleCancelInherit_initializers = [];
    let _handleCancelInherit_extraInitializers = [];
    let _handleSnackbarCloseClick_decorators;
    let _handleSnackbarCloseClick_initializers = [];
    let _handleSnackbarCloseClick_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    var PermissionFormOverlay = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.showInheritDialog = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _showInheritDialog_initializers, false));
            this.error = (__runInitializers(this, _showInheritDialog_extraInitializers), __runInitializers(this, _error_initializers, undefined));
            this.permissionFormRef = __runInitializers(this, _error_extraInitializers);
            this.setPermissionFormRef = (permissionFormRef) => {
                this.permissionFormRef = permissionFormRef;
            };
            this.setInheritDialogFormRef = (inheritDialogFormRef) => {
                this.inheritDialogFormRef = inheritDialogFormRef;
            };
            this.handleConfirm = __runInitializers(this, _handleConfirm_initializers, () => {
                const { hasChildren } = this.props;
                if (hasChildren) {
                    this.showInheritDialog = true;
                }
                else if (this.permissionFormRef) {
                    this.permissionFormRef.submit();
                }
            });
            this.handleConfirmInherit = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _handleConfirmInherit_initializers, () => {
                this.showInheritDialog = false;
                if (this.inheritDialogFormRef) {
                    this.inheritDialogFormRef.submit();
                }
            }));
            this.handleSubmitInherit = (__runInitializers(this, _handleConfirmInherit_extraInitializers), __runInitializers(this, _handleSubmitInherit_initializers, () => {
                if (this.permissionFormRef) {
                    this.permissionFormRef.submit(this.inheritDialogFormStore.data);
                }
            }));
            this.handleCancelInherit = (__runInitializers(this, _handleSubmitInherit_extraInitializers), __runInitializers(this, _handleCancelInherit_initializers, () => {
                this.showInheritDialog = false;
            }));
            this.handleSubmitPermission = (__runInitializers(this, _handleCancelInherit_extraInitializers), (options) => {
                const { onConfirm } = this.props;
                if (typeof options === 'string') {
                    throw new Error('The passed options should not be a string. This should not happen and is likely a bug.');
                }
                this.resourceStore.save(Object.assign(Object.assign({}, options), API_OPTIONS))
                    .then(() => onConfirm())
                    .catch((response) => {
                    response.json().then((0, mobx_1.action)((data) => {
                        const message = data.detail || data.title || (0, utils_1.translate)('sulu_admin.form_save_server_error');
                        if (!message) {
                            return;
                        }
                        this.error = message;
                    }));
                });
            });
            this.handleSnackbarCloseClick = __runInitializers(this, _handleSnackbarCloseClick_initializers, () => {
                this.error = undefined;
            });
            this.handleClose = (__runInitializers(this, _handleSnackbarCloseClick_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                const { onClose } = this.props;
                this.error = undefined;
                onClose();
            }));
            __runInitializers(this, _handleClose_extraInitializers);
            this.createFormStores();
        }
        componentDidUpdate(prevProps) {
            const { collectionId } = this.props;
            if (collectionId !== prevProps.collectionId) {
                this.error = undefined;
                this.destroyFormStores();
                this.createFormStores();
            }
        }
        componentWillUnmount() {
            this.destroyFormStores();
        }
        createFormStores() {
            const { collectionId } = this.props;
            this.resourceStore = new stores_1.ResourceStore('permissions', collectionId, {}, API_OPTIONS);
            this.formStore = containers_1.resourceFormStoreFactory.createFromResourceStore(this.resourceStore, 'permission_details', API_OPTIONS);
            this.inheritDialogFormStore = containers_1.memoryFormStoreFactory.createFromFormKey('permission_inheritance');
        }
        destroyFormStores() {
            this.resourceStore.destroy();
            this.formStore.destroy();
            this.inheritDialogFormStore.destroy();
        }
        render() {
            const { open } = this.props;
            return (<react_1.Fragment>
                <components_1.Overlay cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.resourceStore && this.resourceStore.saving} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onClose={this.handleClose} onConfirm={this.handleConfirm} onSnackbarCloseClick={this.handleSnackbarCloseClick} open={open} size="small" snackbarMessage={this.error || undefined} snackbarType="error" title={(0, utils_1.translate)('sulu_security.permissions')}>
                    <div className={permissionFormOverlay_scss_1.default.overlay}>
                        <containers_1.Form onSubmit={this.handleSubmitPermission} ref={this.setPermissionFormRef} store={this.formStore}/>
                    </div>
                </components_1.Overlay>
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleCancelInherit} onConfirm={this.handleConfirmInherit} open={this.showInheritDialog} title={(0, utils_1.translate)('sulu_security.inherit_permissions_title')}>
                    <containers_1.Form onSubmit={this.handleSubmitInherit} ref={this.setInheritDialogFormRef} store={this.inheritDialogFormStore}/>
                </components_1.Dialog>
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "PermissionFormOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showInheritDialog_decorators = [mobx_1.observable];
        _error_decorators = [mobx_1.observable];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        _handleConfirmInherit_decorators = [mobx_1.action];
        _handleSubmitInherit_decorators = [mobx_1.action];
        _handleCancelInherit_decorators = [mobx_1.action];
        _handleSnackbarCloseClick_decorators = [mobx_1.action];
        _handleClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _showInheritDialog_decorators, { kind: "field", name: "showInheritDialog", static: false, private: false, access: { has: obj => "showInheritDialog" in obj, get: obj => obj.showInheritDialog, set: (obj, value) => { obj.showInheritDialog = value; } }, metadata: _metadata }, _showInheritDialog_initializers, _showInheritDialog_extraInitializers);
        __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, null, _handleConfirmInherit_decorators, { kind: "field", name: "handleConfirmInherit", static: false, private: false, access: { has: obj => "handleConfirmInherit" in obj, get: obj => obj.handleConfirmInherit, set: (obj, value) => { obj.handleConfirmInherit = value; } }, metadata: _metadata }, _handleConfirmInherit_initializers, _handleConfirmInherit_extraInitializers);
        __esDecorate(null, null, _handleSubmitInherit_decorators, { kind: "field", name: "handleSubmitInherit", static: false, private: false, access: { has: obj => "handleSubmitInherit" in obj, get: obj => obj.handleSubmitInherit, set: (obj, value) => { obj.handleSubmitInherit = value; } }, metadata: _metadata }, _handleSubmitInherit_initializers, _handleSubmitInherit_extraInitializers);
        __esDecorate(null, null, _handleCancelInherit_decorators, { kind: "field", name: "handleCancelInherit", static: false, private: false, access: { has: obj => "handleCancelInherit" in obj, get: obj => obj.handleCancelInherit, set: (obj, value) => { obj.handleCancelInherit = value; } }, metadata: _metadata }, _handleCancelInherit_initializers, _handleCancelInherit_extraInitializers);
        __esDecorate(null, null, _handleSnackbarCloseClick_decorators, { kind: "field", name: "handleSnackbarCloseClick", static: false, private: false, access: { has: obj => "handleSnackbarCloseClick" in obj, get: obj => obj.handleSnackbarCloseClick, set: (obj, value) => { obj.handleSnackbarCloseClick = value; } }, metadata: _metadata }, _handleSnackbarCloseClick_initializers, _handleSnackbarCloseClick_extraInitializers);
        __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionFormOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionFormOverlay = _classThis;
})();
exports.default = PermissionFormOverlay;
