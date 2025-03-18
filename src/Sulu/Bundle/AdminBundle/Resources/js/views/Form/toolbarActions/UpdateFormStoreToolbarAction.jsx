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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const react_1 = __importDefault(require("react"));
const router_1 = __importDefault(require("fos-jsrouting/router"));
const jexl_1 = __importDefault(require("jexl"));
const Dialog_1 = __importDefault(require("../../../components/Dialog"));
const services_1 = require("../../../services");
const utils_1 = require("../../../utils");
const Form_1 = __importStar(require("../../../containers/Form"));
const AbstractFormToolbarAction_1 = __importDefault(require("./AbstractFormToolbarAction"));
let UpdateFormStoreToolbarAction = (() => {
    var _a;
    let _classSuper = AbstractFormToolbarAction_1.default;
    let _instanceExtraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _showDialog_decorators;
    let _showDialog_initializers = [];
    let _showDialog_extraInitializers = [];
    let _get_label_decorators;
    let _get_icon_decorators;
    let _get_formKey_decorators;
    let _get_dialogCancelText_decorators;
    let _get_dialogKey_decorators;
    let _get_dialogOkText_decorators;
    let _get_dialogTitle_decorators;
    let _get_dialogDescription_decorators;
    let _get_contentExpressions_decorators;
    let _handleClick_decorators;
    let _handleClick_initializers = [];
    let _handleClick_extraInitializers = [];
    let _fetchData_decorators;
    let _fetchData_initializers = [];
    let _fetchData_extraInitializers = [];
    let _setError_decorators;
    let _setError_initializers = [];
    let _setError_extraInitializers = [];
    let _changeContent_decorators;
    let _changeContent_initializers = [];
    let _changeContent_extraInitializers = [];
    let _closeDialog_decorators;
    let _closeDialog_initializers = [];
    let _closeDialog_extraInitializers = [];
    let _openDialog_decorators;
    let _openDialog_initializers = [];
    let _openDialog_extraInitializers = [];
    return _a = class UpdateFormStoreToolbarAction extends _classSuper {
            constructor(resourceFormStore, form, router, locales, options, parentResourceStore) {
                super(resourceFormStore, form, router, locales, options, parentResourceStore);
                this.loading = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _loading_initializers, false));
                this.showDialog = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _showDialog_initializers, false));
                this.formStore = __runInitializers(this, _showDialog_extraInitializers);
                this.handleClick = __runInitializers(this, _handleClick_initializers, () => __awaiter(this, void 0, void 0, function* () {
                    const contentData = yield this.getCurrentContent();
                    if (this.hasExistingContent(contentData)) {
                        if (this.formKey) {
                            this.formStore = Form_1.memoryFormStoreFactory.createFromFormKey(this.formKey);
                        }
                        this.openDialog();
                    }
                    else {
                        this.fetchData();
                    }
                }));
                this.handleConfirm = (__runInitializers(this, _handleClick_extraInitializers), () => {
                    this.fetchData();
                });
                this.fetchData = __runInitializers(this, _fetchData_initializers, () => __awaiter(this, void 0, void 0, function* () {
                    var _b;
                    const { locale, data: { id, }, } = this.resourceFormStore;
                    this.loading = true;
                    const url = router_1.default.generate(this.options.route, Object.assign({ id, locale: locale === null || locale === void 0 ? void 0 : locale.get() }, (this.options.routeParams || {})));
                    const content = yield this.getCurrentContent();
                    services_1.Requester.post(url, {
                        content,
                        data: ((_b = this.formStore) === null || _b === void 0 ? void 0 : _b.data) || {},
                    }).then((0, mobx_1.action)((response) => {
                        this.form.showSuccessSnackbar();
                        void this.changeContent(response);
                        this.loading = false;
                        this.closeDialog();
                    })).catch((0, mobx_1.action)((error) => __awaiter(this, void 0, void 0, function* () {
                        this.closeDialog();
                        this.loading = false;
                        const data = yield error.json();
                        this.setError(data.messageKey);
                    })));
                }));
                this.setError = (__runInitializers(this, _fetchData_extraInitializers), __runInitializers(this, _setError_initializers, (messageKey) => {
                    this.form.errors = [...this.form.errors, (0, utils_1.translate)(messageKey)];
                }));
                this.changeContent = (__runInitializers(this, _setError_extraInitializers), __runInitializers(this, _changeContent_initializers, (response) => __awaiter(this, void 0, void 0, function* () {
                    for (const expr of this.contentExpressions) {
                        const value = response[expr.property];
                        if (expr.path) {
                            this.resourceFormStore.change(expr.path, value);
                        }
                    }
                })));
                this.handleDialogClose = (__runInitializers(this, _changeContent_extraInitializers), () => {
                    this.closeDialog();
                });
                this.closeDialog = __runInitializers(this, _closeDialog_initializers, () => {
                    this.showDialog = false;
                });
                this.openDialog = (__runInitializers(this, _closeDialog_extraInitializers), __runInitializers(this, _openDialog_initializers, () => {
                    this.showDialog = true;
                }));
                __runInitializers(this, _openDialog_extraInitializers);
                // Required options validation
                const requiredOptions = [
                    'icon',
                    'route',
                    'contentExpressions',
                    'dialogKey',
                    'dialogTitle',
                    'dialogDescription',
                ];
                const missingOptions = requiredOptions.filter((key) => !options[key]);
                if (missingOptions.length > 0) {
                    throw new Error(`Missing required options: ${missingOptions.join(', ')}`);
                }
                // Validate content expressions
                if (!Array.isArray(options.contentExpressions)) {
                    throw new Error('contentExpressions must be an array of objects with get and path properties');
                }
            }
            get label() {
                const { label, } = this.options;
                if (typeof label !== 'string') {
                    throw new Error('The "label" option must be a string value!');
                }
                return label;
            }
            get icon() {
                const { icon, } = this.options;
                if (typeof icon !== 'string') {
                    throw new Error('The "label" option must be a string value!');
                }
                return icon;
            }
            get formKey() {
                const { formKey, } = this.options;
                if (undefined === formKey) {
                    return undefined;
                }
                if (typeof formKey !== 'string') {
                    throw new Error('The "formKey" option must be a string value!');
                }
                return formKey;
            }
            get dialogCancelText() {
                const { dialogCancelText, } = this.options;
                if (typeof dialogCancelText !== 'string') {
                    throw new Error('The "dialogCancelText" option must be a string value!');
                }
                return dialogCancelText;
            }
            get dialogKey() {
                const { dialogKey, } = this.options;
                if (typeof dialogKey !== 'string') {
                    throw new Error('The "dialogKey" option must be a string value!');
                }
                return dialogKey;
            }
            get dialogOkText() {
                const { dialogOkText, } = this.options;
                if (typeof dialogOkText !== 'string') {
                    throw new Error('The "dialogOkText" option must be a string value!');
                }
                return dialogOkText;
            }
            get dialogTitle() {
                const { dialogTitle, } = this.options;
                if (typeof dialogTitle !== 'string') {
                    throw new Error('The "dialogTitle" option must be a string value!');
                }
                return dialogTitle;
            }
            get dialogDescription() {
                const { dialogDescription, } = this.options;
                if (typeof dialogDescription !== 'string') {
                    throw new Error('The "dialogDescription" option must be a string value!');
                }
                return dialogDescription;
            }
            get contentExpressions() {
                const { contentExpressions, } = this.options;
                if (!Array.isArray(contentExpressions)) {
                    throw new Error('The "contentExpressions" option must be an array value!');
                }
                // Use Flow's type casting syntax
                return contentExpressions;
            }
            getToolbarItemConfig() {
                return {
                    type: 'button',
                    label: this.label,
                    icon: this.icon,
                    onClick: this.handleClick,
                    loading: this.loading,
                };
            }
            evaluateJexl(expression, context) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield jexl_1.default.eval(expression, context);
                });
            }
            getCurrentContent() {
                return __awaiter(this, void 0, void 0, function* () {
                    const context = Object.assign({}, this.resourceFormStore.data);
                    const content = {};
                    for (const expr of this.contentExpressions) {
                        if (expr.get) {
                            content[expr.property] = yield this.evaluateJexl(expr.get, context);
                        }
                    }
                    return content;
                });
            }
            hasExistingContent(content) {
                return Object.values(content).some((value) => value);
            }
            getNode() {
                return (<Dialog_1.default cancelText={this.dialogCancelText || (0, utils_1.translate)('sulu_admin.cancel')} confirmDisabled={this.loading || (this.formStore && !this.formStore.validate())} confirmLoading={this.loading} confirmText={this.dialogOkText || (0, utils_1.translate)('sulu_admin.ok')} key={this.dialogKey} onCancel={this.handleDialogClose} onConfirm={this.handleConfirm} open={this.showDialog} title={this.dialogTitle}>
                {this.dialogDescription}

                {this.formStore && (<Form_1.default onSubmit={this.handleConfirm} store={this.formStore}/>)}
            </Dialog_1.default>);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _loading_decorators = [mobx_1.observable];
            _showDialog_decorators = [mobx_1.observable];
            _get_label_decorators = [mobx_1.computed];
            _get_icon_decorators = [mobx_1.computed];
            _get_formKey_decorators = [mobx_1.computed];
            _get_dialogCancelText_decorators = [mobx_1.computed];
            _get_dialogKey_decorators = [mobx_1.computed];
            _get_dialogOkText_decorators = [mobx_1.computed];
            _get_dialogTitle_decorators = [mobx_1.computed];
            _get_dialogDescription_decorators = [mobx_1.computed];
            _get_contentExpressions_decorators = [mobx_1.computed];
            _handleClick_decorators = [mobx_1.action];
            _fetchData_decorators = [mobx_1.action];
            _setError_decorators = [mobx_1.action];
            _changeContent_decorators = [mobx_1.action];
            _closeDialog_decorators = [mobx_1.action];
            _openDialog_decorators = [mobx_1.action];
            __esDecorate(_a, null, _get_label_decorators, { kind: "getter", name: "label", static: false, private: false, access: { has: obj => "label" in obj, get: obj => obj.label }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_icon_decorators, { kind: "getter", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, get: obj => obj.icon }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_formKey_decorators, { kind: "getter", name: "formKey", static: false, private: false, access: { has: obj => "formKey" in obj, get: obj => obj.formKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dialogCancelText_decorators, { kind: "getter", name: "dialogCancelText", static: false, private: false, access: { has: obj => "dialogCancelText" in obj, get: obj => obj.dialogCancelText }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dialogKey_decorators, { kind: "getter", name: "dialogKey", static: false, private: false, access: { has: obj => "dialogKey" in obj, get: obj => obj.dialogKey }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dialogOkText_decorators, { kind: "getter", name: "dialogOkText", static: false, private: false, access: { has: obj => "dialogOkText" in obj, get: obj => obj.dialogOkText }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dialogTitle_decorators, { kind: "getter", name: "dialogTitle", static: false, private: false, access: { has: obj => "dialogTitle" in obj, get: obj => obj.dialogTitle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_dialogDescription_decorators, { kind: "getter", name: "dialogDescription", static: false, private: false, access: { has: obj => "dialogDescription" in obj, get: obj => obj.dialogDescription }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_contentExpressions_decorators, { kind: "getter", name: "contentExpressions", static: false, private: false, access: { has: obj => "contentExpressions" in obj, get: obj => obj.contentExpressions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
            __esDecorate(null, null, _showDialog_decorators, { kind: "field", name: "showDialog", static: false, private: false, access: { has: obj => "showDialog" in obj, get: obj => obj.showDialog, set: (obj, value) => { obj.showDialog = value; } }, metadata: _metadata }, _showDialog_initializers, _showDialog_extraInitializers);
            __esDecorate(null, null, _handleClick_decorators, { kind: "field", name: "handleClick", static: false, private: false, access: { has: obj => "handleClick" in obj, get: obj => obj.handleClick, set: (obj, value) => { obj.handleClick = value; } }, metadata: _metadata }, _handleClick_initializers, _handleClick_extraInitializers);
            __esDecorate(null, null, _fetchData_decorators, { kind: "field", name: "fetchData", static: false, private: false, access: { has: obj => "fetchData" in obj, get: obj => obj.fetchData, set: (obj, value) => { obj.fetchData = value; } }, metadata: _metadata }, _fetchData_initializers, _fetchData_extraInitializers);
            __esDecorate(null, null, _setError_decorators, { kind: "field", name: "setError", static: false, private: false, access: { has: obj => "setError" in obj, get: obj => obj.setError, set: (obj, value) => { obj.setError = value; } }, metadata: _metadata }, _setError_initializers, _setError_extraInitializers);
            __esDecorate(null, null, _changeContent_decorators, { kind: "field", name: "changeContent", static: false, private: false, access: { has: obj => "changeContent" in obj, get: obj => obj.changeContent, set: (obj, value) => { obj.changeContent = value; } }, metadata: _metadata }, _changeContent_initializers, _changeContent_extraInitializers);
            __esDecorate(null, null, _closeDialog_decorators, { kind: "field", name: "closeDialog", static: false, private: false, access: { has: obj => "closeDialog" in obj, get: obj => obj.closeDialog, set: (obj, value) => { obj.closeDialog = value; } }, metadata: _metadata }, _closeDialog_initializers, _closeDialog_extraInitializers);
            __esDecorate(null, null, _openDialog_decorators, { kind: "field", name: "openDialog", static: false, private: false, access: { has: obj => "openDialog" in obj, get: obj => obj.openDialog, set: (obj, value) => { obj.openDialog = value; } }, metadata: _metadata }, _openDialog_initializers, _openDialog_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.default = UpdateFormStoreToolbarAction;
