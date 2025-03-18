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
const mobx_1 = require("mobx");
const jexl_1 = __importDefault(require("jexl"));
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let CopyToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _showCopyDialog_decorators;
    let _showCopyDialog_initializers = [];
    let _showCopyDialog_extraInitializers = [];
    let _copying_decorators;
    let _copying_initializers = [];
    let _copying_extraInitializers = [];
    let _handleCopyDialogConfirm_decorators;
    let _handleCopyDialogConfirm_initializers = [];
    let _handleCopyDialogConfirm_extraInitializers = [];
    let _handleCopyDialogClose_decorators;
    let _handleCopyDialogClose_initializers = [];
    let _handleCopyDialogClose_extraInitializers = [];
    return _a = class CopyToolbarAction extends _classSuper {
            getNode() {
                return (<Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmLoading={this.copying} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} key="sulu_admin.copy" onCancel={this.handleCopyDialogClose} onConfirm={this.handleCopyDialogConfirm} open={this.showCopyDialog} title={(0, Translator_1.translate)('sulu_admin.create_copy')}>
                {(0, Translator_1.translate)('sulu_admin.copy_dialog_description')}
            </Dialog_1.default>);
            }
            getToolbarItemConfig() {
                const { visible_condition: visibleCondition, } = this.options;
                const { id } = this.resourceFormStore;
                const visibleConditionFulfilled = !visibleCondition || jexl_1.default.evalSync(visibleCondition, this.conditionData);
                if (visibleConditionFulfilled) {
                    return {
                        disabled: !id,
                        icon: 'su-copy',
                        label: (0, Translator_1.translate)('sulu_admin.create_copy'),
                        onClick: (0, mobx_1.action)(() => {
                            this.showCopyDialog = true;
                        }),
                        type: 'button',
                    };
                }
            }
            constructor() {
                super(...arguments);
                this.showCopyDialog = __runInitializers(this, _showCopyDialog_initializers, false);
                this.copying = (__runInitializers(this, _showCopyDialog_extraInitializers), __runInitializers(this, _copying_initializers, false));
                this.handleCopyDialogConfirm = (__runInitializers(this, _copying_extraInitializers), __runInitializers(this, _handleCopyDialogConfirm_initializers, () => {
                    const { id, options: { webspace, }, resourceKey, } = this.resourceFormStore;
                    this.copying = true;
                    ResourceRequester_1.default.post(resourceKey, undefined, {
                        action: 'copy',
                        id,
                        webspace,
                    }).then((0, mobx_1.action)((response) => {
                        this.copying = false;
                        this.showCopyDialog = false;
                        this.form.showSuccessSnackbar();
                        const { id, webspace } = response;
                        this.router.navigate(this.router.route.name, { id, webspace });
                    }));
                }));
                this.handleCopyDialogClose = (__runInitializers(this, _handleCopyDialogConfirm_extraInitializers), __runInitializers(this, _handleCopyDialogClose_initializers, () => {
                    this.showCopyDialog = false;
                }));
                __runInitializers(this, _handleCopyDialogClose_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showCopyDialog_decorators = [mobx_1.observable];
            _copying_decorators = [mobx_1.observable];
            _handleCopyDialogConfirm_decorators = [mobx_1.action];
            _handleCopyDialogClose_decorators = [mobx_1.action];
            __esDecorate(null, null, _showCopyDialog_decorators, { kind: "field", name: "showCopyDialog", static: false, private: false, access: { has: obj => "showCopyDialog" in obj, get: obj => obj.showCopyDialog, set: (obj, value) => { obj.showCopyDialog = value; } }, metadata: _metadata }, _showCopyDialog_initializers, _showCopyDialog_extraInitializers);
            __esDecorate(null, null, _copying_decorators, { kind: "field", name: "copying", static: false, private: false, access: { has: obj => "copying" in obj, get: obj => obj.copying, set: (obj, value) => { obj.copying = value; } }, metadata: _metadata }, _copying_initializers, _copying_extraInitializers);
            __esDecorate(null, null, _handleCopyDialogConfirm_decorators, { kind: "field", name: "handleCopyDialogConfirm", static: false, private: false, access: { has: obj => "handleCopyDialogConfirm" in obj, get: obj => obj.handleCopyDialogConfirm, set: (obj, value) => { obj.handleCopyDialogConfirm = value; } }, metadata: _metadata }, _handleCopyDialogConfirm_initializers, _handleCopyDialogConfirm_extraInitializers);
            __esDecorate(null, null, _handleCopyDialogClose_decorators, { kind: "field", name: "handleCopyDialogClose", static: false, private: false, access: { has: obj => "handleCopyDialogClose" in obj, get: obj => obj.handleCopyDialogClose, set: (obj, value) => { obj.handleCopyDialogClose = value; } }, metadata: _metadata }, _handleCopyDialogClose_initializers, _handleCopyDialogClose_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = CopyToolbarAction;
