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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const views_1 = require("sulu-admin-bundle/views");
const mobx_1 = require("mobx");
const components_1 = require("sulu-admin-bundle/components");
const Translator_1 = require("sulu-admin-bundle/utils/Translator");
const services_1 = require("sulu-admin-bundle/services");
let RestoreVersionItemAction = (() => {
    var _a;
    let _classSuper = views_1.AbstractListItemAction;
    let _versionIdToBeRestored_decorators;
    let _versionIdToBeRestored_initializers = [];
    let _versionIdToBeRestored_extraInitializers = [];
    let _restoring_decorators;
    let _restoring_initializers = [];
    let _restoring_extraInitializers = [];
    let _handleRestoreClick_decorators;
    let _handleRestoreClick_initializers = [];
    let _handleRestoreClick_extraInitializers = [];
    let _handleDialogCancel_decorators;
    let _handleDialogCancel_initializers = [];
    let _handleDialogCancel_extraInitializers = [];
    let _handleDialogConfirm_decorators;
    let _handleDialogConfirm_initializers = [];
    let _handleDialogConfirm_extraInitializers = [];
    return _a = class RestoreVersionItemAction extends _classSuper {
            getItemActionConfig(item) {
                return {
                    icon: 'su-process',
                    onClick: (item === null || item === void 0 ? void 0 : item.id) ? () => this.handleRestoreClick(item.id) : undefined,
                    disabled: !(item === null || item === void 0 ? void 0 : item.id),
                };
            }
            getNode() {
                return (<components_1.Dialog cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmLoading={this.restoring} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} key="restore_version" onCancel={this.handleDialogCancel} onConfirm={this.handleDialogConfirm} open={!!this.versionIdToBeRestored} title={(0, Translator_1.translate)('sulu_page.restore_version')}>
                {(0, Translator_1.translate)('sulu_page.restore_version_text')}
            </components_1.Dialog>);
            }
            constructor() {
                super(...arguments);
                this.versionIdToBeRestored = __runInitializers(this, _versionIdToBeRestored_initializers, undefined);
                this.restoring = (__runInitializers(this, _versionIdToBeRestored_extraInitializers), __runInitializers(this, _restoring_initializers, false));
                this.handleRestoreClick = (__runInitializers(this, _restoring_extraInitializers), __runInitializers(this, _handleRestoreClick_initializers, (versionId) => {
                    this.versionIdToBeRestored = versionId;
                }));
                this.handleDialogCancel = (__runInitializers(this, _handleRestoreClick_extraInitializers), __runInitializers(this, _handleDialogCancel_initializers, () => {
                    this.versionIdToBeRestored = undefined;
                }));
                this.handleDialogConfirm = (__runInitializers(this, _handleDialogCancel_extraInitializers), __runInitializers(this, _handleDialogConfirm_initializers, () => {
                    const { success_view: successView } = this.options;
                    const { id, locale, webspace } = this.router.attributes;
                    if (typeof successView !== 'string') {
                        throw new Error('The "success_view" option cannot be null and must contain a string value!');
                    }
                    this.restoring = true;
                    services_1.ResourceRequester
                        .post(this.listStore.resourceKey, {}, {
                        action: 'restore',
                        version: this.versionIdToBeRestored,
                        id,
                        locale,
                        webspace,
                    })
                        .then((0, mobx_1.action)(() => {
                        this.restoring = false;
                        this.versionIdToBeRestored = undefined;
                        this.router.navigate(successView, { id, locale, webspace });
                    }));
                }));
                __runInitializers(this, _handleDialogConfirm_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _versionIdToBeRestored_decorators = [mobx_1.observable];
            _restoring_decorators = [mobx_1.observable];
            _handleRestoreClick_decorators = [mobx_1.action];
            _handleDialogCancel_decorators = [mobx_1.action];
            _handleDialogConfirm_decorators = [mobx_1.action];
            __esDecorate(null, null, _versionIdToBeRestored_decorators, { kind: "field", name: "versionIdToBeRestored", static: false, private: false, access: { has: obj => "versionIdToBeRestored" in obj, get: obj => obj.versionIdToBeRestored, set: (obj, value) => { obj.versionIdToBeRestored = value; } }, metadata: _metadata }, _versionIdToBeRestored_initializers, _versionIdToBeRestored_extraInitializers);
            __esDecorate(null, null, _restoring_decorators, { kind: "field", name: "restoring", static: false, private: false, access: { has: obj => "restoring" in obj, get: obj => obj.restoring, set: (obj, value) => { obj.restoring = value; } }, metadata: _metadata }, _restoring_initializers, _restoring_extraInitializers);
            __esDecorate(null, null, _handleRestoreClick_decorators, { kind: "field", name: "handleRestoreClick", static: false, private: false, access: { has: obj => "handleRestoreClick" in obj, get: obj => obj.handleRestoreClick, set: (obj, value) => { obj.handleRestoreClick = value; } }, metadata: _metadata }, _handleRestoreClick_initializers, _handleRestoreClick_extraInitializers);
            __esDecorate(null, null, _handleDialogCancel_decorators, { kind: "field", name: "handleDialogCancel", static: false, private: false, access: { has: obj => "handleDialogCancel" in obj, get: obj => obj.handleDialogCancel, set: (obj, value) => { obj.handleDialogCancel = value; } }, metadata: _metadata }, _handleDialogCancel_initializers, _handleDialogCancel_extraInitializers);
            __esDecorate(null, null, _handleDialogConfirm_decorators, { kind: "field", name: "handleDialogConfirm", static: false, private: false, access: { has: obj => "handleDialogConfirm" in obj, get: obj => obj.handleDialogConfirm, set: (obj, value) => { obj.handleDialogConfirm = value; } }, metadata: _metadata }, _handleDialogConfirm_initializers, _handleDialogConfirm_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = RestoreVersionItemAction;
