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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const jexl_1 = __importDefault(require("jexl"));
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const Form_1 = __importStar(require("../../../containers/Form"));
const Translator_1 = require("../../../utils/Translator");
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let SaveWithFormDialogToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _showDialog_decorators;
    let _showDialog_initializers = [];
    let _showDialog_extraInitializers = [];
    let _handleCancel_decorators;
    let _handleCancel_initializers = [];
    let _handleCancel_extraInitializers = [];
    let _handleSubmit_decorators;
    let _handleSubmit_initializers = [];
    let _handleSubmit_extraInitializers = [];
    return _a = class SaveWithFormDialogToolbarAction extends _classSuper {
            constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
                super(resourceFormStore, form, router, locales, options, parentResourceStore);
                this.showDialog = __runInitializers(this, _showDialog_initializers, false);
                this.dialogForm = __runInitializers(this, _showDialog_extraInitializers);
                this.handleConfirm = () => {
                    if (!this.dialogForm) {
                        throw new Error('The dialog form was not initialized. This should not happen and is likely a bug.');
                    }
                    this.dialogForm.submit();
                };
                this.handleCancel = __runInitializers(this, _handleCancel_initializers, () => {
                    this.showDialog = false;
                });
                this.handleSubmit = (__runInitializers(this, _handleCancel_extraInitializers), __runInitializers(this, _handleSubmit_initializers, () => {
                    this.form.submit(this.dialogFormStore.data);
                    this.showDialog = false;
                }));
                this.setDialogFormRef = (__runInitializers(this, _handleSubmit_extraInitializers), (dialogForm) => {
                    this.dialogForm = dialogForm;
                });
                const { formKey } = options;
                if (typeof formKey !== 'string') {
                    throw new Error('The "formKey" option of the SaveWithFormDialogToolbarAction must be a string!');
                }
                this.dialogFormStore = Form_1.memoryFormStoreFactory.createFromFormKey(formKey);
            }
            getNode() {
                const { title } = this.options;
                if (typeof title !== 'string') {
                    throw new Error('The "title" option of the SaveWithFormDialogToolbarAction must be a string!');
                }
                return (<Dialog_1.default cancelText={(0, Translator_1.translate)('sulu_admin.cancel')} confirmText={(0, Translator_1.translate)('sulu_admin.ok')} key="sulu_admin.save_with_form_dialog" onCancel={this.handleCancel} onConfirm={this.handleConfirm} open={this.showDialog} title={title}>
                <Form_1.default onSubmit={this.handleSubmit} ref={this.setDialogFormRef} store={this.dialogFormStore}/>
            </Dialog_1.default>);
            }
            getToolbarItemConfig() {
                return {
                    disabled: !this.resourceFormStore.dirty,
                    icon: 'su-save',
                    label: (0, Translator_1.translate)('sulu_admin.save'),
                    loading: this.resourceFormStore.saving,
                    onClick: (0, mobx_1.action)(() => {
                        if (jexl_1.default.evalSync(this.options.condition, Object.assign(Object.assign({}, this.conditionData), { __parent: this.parentResourceStore.data }))) {
                            this.showDialog = true;
                        }
                        else {
                            this.form.submit();
                        }
                    }),
                    type: 'button',
                };
            }
            destroy() {
                this.dialogFormStore.destroy();
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showDialog_decorators = [mobx_1.observable];
            _handleCancel_decorators = [mobx_1.action];
            _handleSubmit_decorators = [mobx_1.action];
            __esDecorate(null, null, _showDialog_decorators, { kind: "field", name: "showDialog", static: false, private: false, access: { has: obj => "showDialog" in obj, get: obj => obj.showDialog, set: (obj, value) => { obj.showDialog = value; } }, metadata: _metadata }, _showDialog_initializers, _showDialog_extraInitializers);
            __esDecorate(null, null, _handleCancel_decorators, { kind: "field", name: "handleCancel", static: false, private: false, access: { has: obj => "handleCancel" in obj, get: obj => obj.handleCancel, set: (obj, value) => { obj.handleCancel = value; } }, metadata: _metadata }, _handleCancel_initializers, _handleCancel_extraInitializers);
            __esDecorate(null, null, _handleSubmit_decorators, { kind: "field", name: "handleSubmit", static: false, private: false, access: { has: obj => "handleSubmit" in obj, get: obj => obj.handleSubmit, set: (obj, value) => { obj.handleSubmit = value; } }, metadata: _metadata }, _handleSubmit_initializers, _handleSubmit_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = SaveWithFormDialogToolbarAction;
