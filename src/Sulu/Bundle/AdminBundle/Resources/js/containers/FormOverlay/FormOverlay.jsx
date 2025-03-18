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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Overlay_1 = __importDefault(require("../../components/Overlay"));
const utils_1 = require("../../utils");
const Form_1 = __importDefault(require("../Form"));
const formOverlay_scss_1 = __importDefault(require("./formOverlay.scss"));
let FormOverlay = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _formErrors_decorators;
    let _formErrors_initializers = [];
    let _formErrors_extraInitializers = [];
    let _get_confirmLoading_decorators;
    let _componentDidUpdate_decorators;
    let _handleErrorSnackbarClose_decorators;
    let _handleErrorSnackbarClose_initializers = [];
    let _handleErrorSnackbarClose_extraInitializers = [];
    var FormOverlay = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.formRef = __runInitializers(this, _instanceExtraInitializers);
            this.formErrors = __runInitializers(this, _formErrors_initializers, []);
            this.handleOverlayConfirm = (__runInitializers(this, _formErrors_extraInitializers), () => {
                if (!this.formRef) {
                    throw new Error('The Form ref has not been set! This should not happen and is likely a bug.');
                }
                // calling formRef.submit() will trigger either handleFormSubmit() or handleFormError()
                this.formRef.submit();
            });
            this.handleFormSubmit = () => {
                const { formStore, onConfirm, } = this.props;
                // save data before calling onConfirm callback if formstore is instance of ResourceFormStore
                if (typeof formStore.save === 'function') {
                    formStore.save()
                        .then(() => {
                        onConfirm();
                    })
                        .catch((0, mobx_1.action)((error) => {
                        this.formErrors.push(error.detail || error.title || (0, utils_1.translate)('sulu_admin.form_save_server_error'));
                    }));
                }
                else {
                    onConfirm();
                }
            };
            this.handleFormError = () => {
                this.formErrors.push((0, utils_1.translate)('sulu_admin.form_contains_invalid_values'));
            };
            this.handleErrorSnackbarClose = __runInitializers(this, _handleErrorSnackbarClose_initializers, () => {
                this.formErrors.pop();
            });
            this.handleFieldFinish = (__runInitializers(this, _handleErrorSnackbarClose_extraInitializers), (dataPath, schemaPath) => {
                const { onFieldFinish } = this.props;
                if (onFieldFinish) {
                    onFieldFinish(dataPath, schemaPath);
                }
            });
            this.setFormRef = (formRef) => {
                this.formRef = formRef;
            };
        }
        get confirmLoading() {
            const { confirmLoading, formStore } = this.props;
            // disable confirm button while saving if formstore is instance of ResourceFormStore
            const formStoreSaving = (typeof formStore.saving === 'boolean') && formStore.saving;
            return confirmLoading || formStoreSaving;
        }
        componentDidUpdate(prevProps) {
            const { open } = this.props;
            if (prevProps.open === false && open === true) {
                this.formErrors = [];
            }
        }
        render() {
            const { confirmDisabled, confirmText, formStore, onClose, open, size, title, } = this.props;
            return (<Overlay_1.default confirmDisabled={confirmDisabled} confirmLoading={this.confirmLoading} confirmText={confirmText} onClose={onClose} onConfirm={this.handleOverlayConfirm} onSnackbarCloseClick={this.handleErrorSnackbarClose} open={open} size={size} snackbarMessage={this.formErrors[this.formErrors.length - 1]} snackbarType="error" title={title}>
                <div className={formOverlay_scss_1.default.form}>
                    <Form_1.default onError={this.handleFormError} onFieldFinish={this.handleFieldFinish} onSubmit={this.handleFormSubmit} ref={this.setFormRef} store={formStore}/>
                </div>
            </Overlay_1.default>);
        }
    };
    __setFunctionName(_classThis, "FormOverlay");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _formErrors_decorators = [mobx_1.observable];
        _get_confirmLoading_decorators = [mobx_1.computed];
        _componentDidUpdate_decorators = [mobx_1.action];
        _handleErrorSnackbarClose_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_confirmLoading_decorators, { kind: "getter", name: "confirmLoading", static: false, private: false, access: { has: obj => "confirmLoading" in obj, get: obj => obj.confirmLoading }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _componentDidUpdate_decorators, { kind: "method", name: "componentDidUpdate", static: false, private: false, access: { has: obj => "componentDidUpdate" in obj, get: obj => obj.componentDidUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _formErrors_decorators, { kind: "field", name: "formErrors", static: false, private: false, access: { has: obj => "formErrors" in obj, get: obj => obj.formErrors, set: (obj, value) => { obj.formErrors = value; } }, metadata: _metadata }, _formErrors_initializers, _formErrors_extraInitializers);
        __esDecorate(null, null, _handleErrorSnackbarClose_decorators, { kind: "field", name: "handleErrorSnackbarClose", static: false, private: false, access: { has: obj => "handleErrorSnackbarClose" in obj, get: obj => obj.handleErrorSnackbarClose, set: (obj, value) => { obj.handleErrorSnackbarClose = value; } }, metadata: _metadata }, _handleErrorSnackbarClose_initializers, _handleErrorSnackbarClose_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormOverlay = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.defaultProps = {
        confirmDisabled: false,
        confirmLoading: false,
    };
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormOverlay = _classThis;
})();
exports.default = FormOverlay;
