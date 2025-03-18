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
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const views_1 = require("sulu-admin-bundle/views");
const components_1 = require("sulu-admin-bundle/components");
const utils_1 = require("sulu-admin-bundle/utils");
const services_1 = require("sulu-admin-bundle/services");
const json_pointer_1 = __importDefault(require("json-pointer"));
const RestoreFormOverlay_1 = __importDefault(require("../../../containers/RestoreFormOverlay"));
let RestoreItemAction = (() => {
    var _a;
    let _classSuper = views_1.AbstractListItemAction;
    let _instanceExtraInitializers = [];
    let _idToBeRestored_decorators;
    let _idToBeRestored_initializers = [];
    let _idToBeRestored_extraInitializers = [];
    let _resourceKeyToBeRestored_decorators;
    let _resourceKeyToBeRestored_initializers = [];
    let _resourceKeyToBeRestored_extraInitializers = [];
    let _restoring_decorators;
    let _restoring_initializers = [];
    let _restoring_extraInitializers = [];
    let _get_restoreConfiguration_decorators;
    let _handleRestoreClick_decorators;
    let _handleRestoreClick_initializers = [];
    let _handleRestoreClick_extraInitializers = [];
    let _handleCancel_decorators;
    let _handleCancel_initializers = [];
    let _handleCancel_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    return _a = class RestoreItemAction extends _classSuper {
            get restoreConfiguration() {
                if (!this.resourceKeyToBeRestored) {
                    return undefined;
                }
                return _a.restoreConfigurationMapping[this.resourceKeyToBeRestored] || undefined;
            }
            getItemActionConfig(item) {
                return {
                    icon: 'su-process',
                    onClick: (item === null || item === void 0 ? void 0 : item.id) ? () => this.handleRestoreClick(item.id, item === null || item === void 0 ? void 0 : item.resourceKey) : undefined,
                    disabled: !(item === null || item === void 0 ? void 0 : item.id),
                };
            }
            getNode() {
                var _b, _c, _d;
                return (<react_1.default.Fragment key="restore">
                <components_1.Dialog cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmLoading={this.restoring} confirmText={(0, utils_1.translate)('sulu_admin.ok')} onCancel={this.handleCancel} onConfirm={this.handleConfirm} open={!!this.idToBeRestored && !((_b = this.restoreConfiguration) === null || _b === void 0 ? void 0 : _b.form)} title={(0, utils_1.translate)('sulu_trash.restore_element')}>
                    {(0, utils_1.translate)('sulu_trash.restore_element_dialog_text')}
                </components_1.Dialog>
                <RestoreFormOverlay_1.default confirmLoading={this.restoring} formKey={(_c = this.restoreConfiguration) === null || _c === void 0 ? void 0 : _c.form} onClose={this.handleCancel} onConfirm={this.handleConfirm} open={!!this.idToBeRestored && !!((_d = this.restoreConfiguration) === null || _d === void 0 ? void 0 : _d.form)} trashItemId={this.idToBeRestored}/>
            </react_1.default.Fragment>);
            }
            constructor() {
                super(...arguments);
                this.idToBeRestored = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _idToBeRestored_initializers, undefined));
                this.resourceKeyToBeRestored = (__runInitializers(this, _idToBeRestored_extraInitializers), __runInitializers(this, _resourceKeyToBeRestored_initializers, undefined));
                this.restoring = (__runInitializers(this, _resourceKeyToBeRestored_extraInitializers), __runInitializers(this, _restoring_initializers, false));
                this.handleRestoreClick = (__runInitializers(this, _restoring_extraInitializers), __runInitializers(this, _handleRestoreClick_initializers, (id, resourceKey) => {
                    this.idToBeRestored = id;
                    this.resourceKeyToBeRestored = resourceKey;
                }));
                this.handleCancel = (__runInitializers(this, _handleRestoreClick_extraInitializers), __runInitializers(this, _handleCancel_initializers, () => {
                    this.idToBeRestored = undefined;
                    this.resourceKeyToBeRestored = undefined;
                }));
                this.handleConfirm = (__runInitializers(this, _handleCancel_extraInitializers), __runInitializers(this, _handleConfirm_initializers, (data = {}) => {
                    this.restoring = true;
                    services_1.ResourceRequester.post(this.listStore.resourceKey, data, {
                        action: 'restore',
                        id: this.idToBeRestored,
                    })
                        .then((0, mobx_1.action)((response) => {
                        const { view, resultToView = {} } = this.restoreConfiguration || {};
                        this.restoring = false;
                        this.idToBeRestored = undefined;
                        this.resourceKeyToBeRestored = undefined;
                        if (view) {
                            this.router.navigate(view, Object.keys(resultToView).reduce((parameters, resultPath) => {
                                parameters[resultToView[resultPath]] = json_pointer_1.default.get(response, '/' + resultPath);
                                return parameters;
                            }, {}));
                        }
                        else {
                            this.listStore.reload();
                        }
                    }))
                        .catch((0, mobx_1.action)((response) => {
                        this.restoring = false;
                        this.idToBeRestored = undefined;
                        this.resourceKeyToBeRestored = undefined;
                        this.listStore.reload();
                        response.json().then((0, mobx_1.action)((error) => {
                            this.list.errors.push(error.detail || error.title || (0, utils_1.translate)('sulu_trash.restore_error'));
                        }));
                    }));
                }));
                __runInitializers(this, _handleConfirm_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _idToBeRestored_decorators = [mobx_1.observable];
            _resourceKeyToBeRestored_decorators = [mobx_1.observable];
            _restoring_decorators = [mobx_1.observable];
            _get_restoreConfiguration_decorators = [mobx_1.computed];
            _handleRestoreClick_decorators = [mobx_1.action];
            _handleCancel_decorators = [mobx_1.action];
            _handleConfirm_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_restoreConfiguration_decorators, { kind: "getter", name: "restoreConfiguration", static: false, private: false, access: { has: obj => "restoreConfiguration" in obj, get: obj => obj.restoreConfiguration }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _idToBeRestored_decorators, { kind: "field", name: "idToBeRestored", static: false, private: false, access: { has: obj => "idToBeRestored" in obj, get: obj => obj.idToBeRestored, set: (obj, value) => { obj.idToBeRestored = value; } }, metadata: _metadata }, _idToBeRestored_initializers, _idToBeRestored_extraInitializers);
            __esDecorate(null, null, _resourceKeyToBeRestored_decorators, { kind: "field", name: "resourceKeyToBeRestored", static: false, private: false, access: { has: obj => "resourceKeyToBeRestored" in obj, get: obj => obj.resourceKeyToBeRestored, set: (obj, value) => { obj.resourceKeyToBeRestored = value; } }, metadata: _metadata }, _resourceKeyToBeRestored_initializers, _resourceKeyToBeRestored_extraInitializers);
            __esDecorate(null, null, _restoring_decorators, { kind: "field", name: "restoring", static: false, private: false, access: { has: obj => "restoring" in obj, get: obj => obj.restoring, set: (obj, value) => { obj.restoring = value; } }, metadata: _metadata }, _restoring_initializers, _restoring_extraInitializers);
            __esDecorate(null, null, _handleRestoreClick_decorators, { kind: "field", name: "handleRestoreClick", static: false, private: false, access: { has: obj => "handleRestoreClick" in obj, get: obj => obj.handleRestoreClick, set: (obj, value) => { obj.handleRestoreClick = value; } }, metadata: _metadata }, _handleRestoreClick_initializers, _handleRestoreClick_extraInitializers);
            __esDecorate(null, null, _handleCancel_decorators, { kind: "field", name: "handleCancel", static: false, private: false, access: { has: obj => "handleCancel" in obj, get: obj => obj.handleCancel, set: (obj, value) => { obj.handleCancel = value; } }, metadata: _metadata }, _handleCancel_initializers, _handleCancel_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a.restoreConfigurationMapping = {},
        _a;
})();
exports.default = RestoreItemAction;
