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
const loglevel_1 = __importDefault(require("loglevel"));
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const utils_1 = require("../../../utils");
const Form_1 = __importStar(require("../../../containers/Form"));
const copyLocaleAction_scss_1 = __importDefault(require("./copyLocaleAction.scss"));
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let CopyLocaleToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _showCopyLocaleDialog_decorators;
    let _showCopyLocaleDialog_initializers = [];
    let _showCopyLocaleDialog_extraInitializers = [];
    let _selectedLocales_decorators;
    let _selectedLocales_initializers = [];
    let _selectedLocales_extraInitializers = [];
    let _copying_decorators;
    let _copying_initializers = [];
    let _copying_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _handleCheckboxChange_decorators;
    let _handleCheckboxChange_initializers = [];
    let _handleCheckboxChange_extraInitializers = [];
    let _destroyFormStore_decorators;
    let _destroyFormStore_initializers = [];
    let _destroyFormStore_extraInitializers = [];
    return _a = class CopyLocaleToolbarAction extends _classSuper {
            constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
                const { display_condition: displayCondition, visible_condition: visibleCondition, } = options;
                if (displayCondition) {
                    // @deprecated
                    loglevel_1.default.warn('The "display_condition" option is deprecated since version 2.0 and will be removed. ' +
                        'Use the "visible_condition" option instead.');
                    if (!visibleCondition) {
                        options.visible_condition = displayCondition;
                    }
                }
                super(resourceFormStore, form, router, locales, options, parentResourceStore);
                this.showCopyLocaleDialog = __runInitializers(this, _showCopyLocaleDialog_initializers, false);
                this.selectedLocales = (__runInitializers(this, _showCopyLocaleDialog_extraInitializers), __runInitializers(this, _selectedLocales_initializers, []));
                this.copying = (__runInitializers(this, _selectedLocales_extraInitializers), __runInitializers(this, _copying_initializers, false));
                this.formStore = __runInitializers(this, _copying_extraInitializers);
                this.handleConfirm = __runInitializers(this, _handleConfirm_initializers, () => {
                    this.copying = true;
                    const { resourceFormStore: { id, locale, options: { webspace, }, resourceKey, }, } = this;
                    const data = this.formStore.data;
                    const options = Object.keys(data).reduce((acc, key) => {
                        const value = data[key];
                        if (key === 'locales') {
                            key = 'dest';
                        }
                        acc[key] = value;
                        return acc;
                    }, {});
                    ResourceRequester_1.default.post(resourceKey, undefined, Object.assign({ id,
                        locale, action: 'copy-locale', webspace }, options)).then((0, mobx_1.action)(() => {
                        this.copying = false;
                        this.showCopyLocaleDialog = false;
                        this.form.showSuccessSnackbar();
                        this.destroyFormStore();
                    }));
                });
                this.handleClose = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                    this.showCopyLocaleDialog = false;
                    this.destroyFormStore();
                }));
                this.handleCheckboxChange = (__runInitializers(this, _handleClose_extraInitializers), __runInitializers(this, _handleCheckboxChange_initializers, (checked, value) => {
                    if (checked && typeof value === 'string' && !this.selectedLocales.includes(value)) {
                        this.selectedLocales.push(value);
                    }
                    else {
                        this.selectedLocales.splice(this.selectedLocales.findIndex((locale) => locale === value), 1);
                    }
                }));
                this.destroyFormStore = (__runInitializers(this, _handleCheckboxChange_extraInitializers), __runInitializers(this, _destroyFormStore_initializers, () => {
                    var _b;
                    this.formStore.destroy();
                    this.formStore = Form_1.memoryFormStoreFactory.createFromFormKey('copy_locale', undefined, undefined, undefined, {
                        locales: (_b = this.locales) === null || _b === void 0 ? void 0 : _b.filter((locale) => { var _b; return locale !== ((_b = this.resourceFormStore.locale) === null || _b === void 0 ? void 0 : _b.get()); }),
                    });
                }));
                __runInitializers(this, _destroyFormStore_extraInitializers);
                if (locales) {
                    this.formStore = Form_1.memoryFormStoreFactory.createFromFormKey('copy_locale', undefined, undefined, undefined, {
                        locales: locales.filter((locale) => { var _b; return locale !== ((_b = this.resourceFormStore.locale) === null || _b === void 0 ? void 0 : _b.get()); }),
                    });
                }
            }
            getNode() {
                var _b, _c;
                const { resourceFormStore: { id, locale: currentLocale, }, locales, } = this;
                if (!id) {
                    return null;
                }
                if (!locales || !currentLocale) {
                    throw new Error('The CopyLocaleToolbarAction for pages only works with locales!');
                }
                return (<Dialog_1.default cancelText={(0, utils_1.translate)('sulu_admin.cancel')} confirmDisabled={((_c = (_b = this.formStore.data.locales) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) === 0} confirmLoading={this.copying} confirmText={(0, utils_1.translate)('sulu_admin.ok')} key="sulu_admin.copy_locale" onCancel={this.handleClose} onConfirm={this.handleConfirm} open={this.showCopyLocaleDialog} title={(0, utils_1.translate)('sulu_admin.copy_locale')}>
                <div className={copyLocaleAction_scss_1.default.dialog}>
                    <Form_1.default onSubmit={this.handleConfirm} store={this.formStore}/>
                </div>
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
                        label: (0, utils_1.translate)('sulu_admin.copy_locale'),
                        onClick: (0, mobx_1.action)(() => {
                            this.showCopyLocaleDialog = true;
                        }),
                        type: 'button',
                    };
                }
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _showCopyLocaleDialog_decorators = [mobx_1.observable];
            _selectedLocales_decorators = [mobx_1.observable];
            _copying_decorators = [mobx_1.observable];
            _handleConfirm_decorators = [mobx_1.action];
            _handleClose_decorators = [mobx_1.action];
            _handleCheckboxChange_decorators = [mobx_1.action];
            _destroyFormStore_decorators = [mobx_1.action];
            __esDecorate(null, null, _showCopyLocaleDialog_decorators, { kind: "field", name: "showCopyLocaleDialog", static: false, private: false, access: { has: obj => "showCopyLocaleDialog" in obj, get: obj => obj.showCopyLocaleDialog, set: (obj, value) => { obj.showCopyLocaleDialog = value; } }, metadata: _metadata }, _showCopyLocaleDialog_initializers, _showCopyLocaleDialog_extraInitializers);
            __esDecorate(null, null, _selectedLocales_decorators, { kind: "field", name: "selectedLocales", static: false, private: false, access: { has: obj => "selectedLocales" in obj, get: obj => obj.selectedLocales, set: (obj, value) => { obj.selectedLocales = value; } }, metadata: _metadata }, _selectedLocales_initializers, _selectedLocales_extraInitializers);
            __esDecorate(null, null, _copying_decorators, { kind: "field", name: "copying", static: false, private: false, access: { has: obj => "copying" in obj, get: obj => obj.copying, set: (obj, value) => { obj.copying = value; } }, metadata: _metadata }, _copying_initializers, _copying_extraInitializers);
            __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
            __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
            __esDecorate(null, null, _handleCheckboxChange_decorators, { kind: "field", name: "handleCheckboxChange", static: false, private: false, access: { has: obj => "handleCheckboxChange" in obj, get: obj => obj.handleCheckboxChange, set: (obj, value) => { obj.handleCheckboxChange = value; } }, metadata: _metadata }, _handleCheckboxChange_initializers, _handleCheckboxChange_extraInitializers);
            __esDecorate(null, null, _destroyFormStore_decorators, { kind: "field", name: "destroyFormStore", static: false, private: false, access: { has: obj => "destroyFormStore" in obj, get: obj => obj.destroyFormStore, set: (obj, value) => { obj.destroyFormStore = value; } }, metadata: _metadata }, _destroyFormStore_initializers, _destroyFormStore_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = CopyLocaleToolbarAction;
