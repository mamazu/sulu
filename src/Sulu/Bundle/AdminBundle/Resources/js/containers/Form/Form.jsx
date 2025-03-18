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
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const react_1 = __importStar(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const Loader_1 = __importDefault(require("../../components/Loader"));
const Hint_1 = __importDefault(require("../../components/Hint"));
const utils_1 = require("../../utils");
const Renderer_1 = __importDefault(require("./Renderer"));
const FormInspector_1 = __importDefault(require("./FormInspector"));
const GhostDialog_1 = __importDefault(require("./GhostDialog"));
const MissingTypeDialog_1 = __importDefault(require("./MissingTypeDialog"));
let Form = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _showAllErrors_decorators;
    let _showAllErrors_initializers = [];
    let _showAllErrors_extraInitializers = [];
    let _displayGhostDialog_decorators;
    let _displayGhostDialog_initializers = [];
    let _displayGhostDialog_extraInitializers = [];
    let _get_formInspector_decorators;
    let _submit_decorators;
    let _submit_initializers = [];
    let _submit_extraInitializers = [];
    let _showGhostDialog_decorators;
    let _hideGhostDialog_decorators;
    let _handleGhostDialogCancel_decorators;
    let _handleGhostDialogCancel_initializers = [];
    let _handleGhostDialogCancel_extraInitializers = [];
    let _handleGhostDialogConfirm_decorators;
    let _handleGhostDialogConfirm_initializers = [];
    let _handleGhostDialogConfirm_extraInitializers = [];
    let _handleMissingTypeDialogConfirm_decorators;
    let _handleMissingTypeDialogConfirm_initializers = [];
    let _handleMissingTypeDialogConfirm_extraInitializers = [];
    let _handleMissingTypeDialogCancel_decorators;
    let _handleMissingTypeDialogCancel_initializers = [];
    let _handleMissingTypeDialogCancel_extraInitializers = [];
    var Form = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.showAllErrors = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _showAllErrors_initializers, false));
            this.displayGhostDialog = (__runInitializers(this, _showAllErrors_extraInitializers), __runInitializers(this, _displayGhostDialog_initializers, false));
            this.displayGhostDialogDisposer = __runInitializers(this, _displayGhostDialog_extraInitializers);
            /** @public */
            this.submit = __runInitializers(this, _submit_initializers, (options) => {
                if (typeof options === 'string') {
                    loglevel_1.default.warn('Passing a string to the "submit" method is deprecated since 2.2 and will be removed. ' +
                        'Pass an object with an "action" property instead.');
                }
                const { onError, onSubmit, store } = this.props;
                this.showAllErrors = true;
                if (store.validate()) {
                    const submitPromise = onSubmit(options);
                    if (submitPromise) {
                        return submitPromise.then((response) => {
                            this.formInspector.triggerSaveHandler(options);
                            return response;
                        });
                    }
                    return submitPromise;
                }
                if (onError) {
                    return onError(store.errors);
                }
            });
            this.handleChange = (__runInitializers(this, _submit_extraInitializers), (name, value, context) => {
                this.props.store.change(name, value, context);
            });
            this.handleGhostDialogCancel = __runInitializers(this, _handleGhostDialogCancel_initializers, () => {
                this.hideGhostDialog();
            });
            this.handleGhostDialogConfirm = (__runInitializers(this, _handleGhostDialogCancel_extraInitializers), __runInitializers(this, _handleGhostDialogConfirm_initializers, (locale, options) => {
                const { store } = this.props;
                if (!store.copyFromLocale) {
                    return;
                }
                store.copyFromLocale(locale, options);
                this.hideGhostDialog();
            }));
            this.handleMissingTypeDialogConfirm = (__runInitializers(this, _handleGhostDialogConfirm_extraInitializers), __runInitializers(this, _handleMissingTypeDialogConfirm_initializers, (type) => {
                const { store } = this.props;
                store.changeType(type);
            }));
            this.handleMissingTypeDialogCancel = (__runInitializers(this, _handleMissingTypeDialogConfirm_extraInitializers), __runInitializers(this, _handleMissingTypeDialogCancel_initializers, () => {
                const { onMissingTypeCancel } = this.props;
                if (onMissingTypeCancel) {
                    onMissingTypeCancel();
                }
            }));
            this.handleFieldFinish = (__runInitializers(this, _handleMissingTypeDialogCancel_extraInitializers), (dataPath, schemaPath) => {
                loglevel_1.default.debug('Finished editing field with dataPath "' + dataPath + '" and schemaPath "' + schemaPath + '"', (0, mobx_1.toJS)(this.formInspector.getValueByPath(dataPath)));
                const { store, onFieldFinish } = this.props;
                store.validate();
                this.formInspector.finishField(dataPath, schemaPath);
                if (onFieldFinish) {
                    onFieldFinish(dataPath, schemaPath);
                }
            });
            this.displayGhostDialogDisposer = (0, mobx_1.autorun)(() => {
                const { store } = this.props;
                const { data: { availableLocales, }, loading, locale, } = store;
                if (loading) {
                    this.hideGhostDialog();
                    return;
                }
                if (availableLocales && locale && !availableLocales.includes(locale.get())) {
                    this.showGhostDialog();
                }
            });
        }
        componentWillUnmount() {
            this.displayGhostDialogDisposer();
        }
        get formInspector() {
            return new FormInspector_1.default(this.props.store);
        }
        showGhostDialog() {
            this.displayGhostDialog = true;
        }
        hideGhostDialog() {
            this.displayGhostDialog = false;
        }
        render() {
            const { onSuccess, router, store } = this.props;
            const { data: { availableLocales = null, } = { availableLocales: null }, } = store;
            if (store.forbidden) {
                return <Hint_1.default icon="su-lock" title={(0, utils_1.translate)('sulu_admin.no_permissions')}/>;
            }
            if (store.notFound) {
                return <Hint_1.default icon="su-battery-low" title={(0, utils_1.translate)('sulu_admin.not_found')}/>;
            }
            if (store.unexpectedError) {
                return <Hint_1.default icon="su-exclamation-triangle" title={(0, utils_1.translate)('sulu_admin.unexpected_error')}/>;
            }
            if (store.loading) {
                return <Loader_1.default />;
            }
            return (<react_1.Fragment>
                {store.id && availableLocales &&
                    <GhostDialog_1.default locales={availableLocales} onCancel={this.handleGhostDialogCancel} onConfirm={this.handleGhostDialogConfirm} open={this.displayGhostDialog}/>}
                <MissingTypeDialog_1.default onCancel={this.handleMissingTypeDialogCancel} onConfirm={this.handleMissingTypeDialogConfirm} open={store.hasInvalidType} types={store.types}/>
                {!store.hasInvalidType &&
                    <Renderer_1.default data={store.data} dataPath="" errors={store.errors} formInspector={this.formInspector} onChange={this.handleChange} onFieldFinish={this.handleFieldFinish} onSuccess={onSuccess} router={router} schema={store.schema} schemaPath="" showAllErrors={this.showAllErrors} value={store.data}/>}
            </react_1.Fragment>);
        }
    };
    __setFunctionName(_classThis, "Form");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _showAllErrors_decorators = [mobx_1.observable];
        _displayGhostDialog_decorators = [mobx_1.observable];
        _get_formInspector_decorators = [mobx_1.computed];
        _submit_decorators = [mobx_1.action];
        _showGhostDialog_decorators = [mobx_1.action];
        _hideGhostDialog_decorators = [mobx_1.action];
        _handleGhostDialogCancel_decorators = [mobx_1.action];
        _handleGhostDialogConfirm_decorators = [mobx_1.action];
        _handleMissingTypeDialogConfirm_decorators = [mobx_1.action];
        _handleMissingTypeDialogCancel_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_formInspector_decorators, { kind: "getter", name: "formInspector", static: false, private: false, access: { has: obj => "formInspector" in obj, get: obj => obj.formInspector }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _showGhostDialog_decorators, { kind: "method", name: "showGhostDialog", static: false, private: false, access: { has: obj => "showGhostDialog" in obj, get: obj => obj.showGhostDialog }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _hideGhostDialog_decorators, { kind: "method", name: "hideGhostDialog", static: false, private: false, access: { has: obj => "hideGhostDialog" in obj, get: obj => obj.hideGhostDialog }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _showAllErrors_decorators, { kind: "field", name: "showAllErrors", static: false, private: false, access: { has: obj => "showAllErrors" in obj, get: obj => obj.showAllErrors, set: (obj, value) => { obj.showAllErrors = value; } }, metadata: _metadata }, _showAllErrors_initializers, _showAllErrors_extraInitializers);
        __esDecorate(null, null, _displayGhostDialog_decorators, { kind: "field", name: "displayGhostDialog", static: false, private: false, access: { has: obj => "displayGhostDialog" in obj, get: obj => obj.displayGhostDialog, set: (obj, value) => { obj.displayGhostDialog = value; } }, metadata: _metadata }, _displayGhostDialog_initializers, _displayGhostDialog_extraInitializers);
        __esDecorate(null, null, _submit_decorators, { kind: "field", name: "submit", static: false, private: false, access: { has: obj => "submit" in obj, get: obj => obj.submit, set: (obj, value) => { obj.submit = value; } }, metadata: _metadata }, _submit_initializers, _submit_extraInitializers);
        __esDecorate(null, null, _handleGhostDialogCancel_decorators, { kind: "field", name: "handleGhostDialogCancel", static: false, private: false, access: { has: obj => "handleGhostDialogCancel" in obj, get: obj => obj.handleGhostDialogCancel, set: (obj, value) => { obj.handleGhostDialogCancel = value; } }, metadata: _metadata }, _handleGhostDialogCancel_initializers, _handleGhostDialogCancel_extraInitializers);
        __esDecorate(null, null, _handleGhostDialogConfirm_decorators, { kind: "field", name: "handleGhostDialogConfirm", static: false, private: false, access: { has: obj => "handleGhostDialogConfirm" in obj, get: obj => obj.handleGhostDialogConfirm, set: (obj, value) => { obj.handleGhostDialogConfirm = value; } }, metadata: _metadata }, _handleGhostDialogConfirm_initializers, _handleGhostDialogConfirm_extraInitializers);
        __esDecorate(null, null, _handleMissingTypeDialogConfirm_decorators, { kind: "field", name: "handleMissingTypeDialogConfirm", static: false, private: false, access: { has: obj => "handleMissingTypeDialogConfirm" in obj, get: obj => obj.handleMissingTypeDialogConfirm, set: (obj, value) => { obj.handleMissingTypeDialogConfirm = value; } }, metadata: _metadata }, _handleMissingTypeDialogConfirm_initializers, _handleMissingTypeDialogConfirm_extraInitializers);
        __esDecorate(null, null, _handleMissingTypeDialogCancel_decorators, { kind: "field", name: "handleMissingTypeDialogCancel", static: false, private: false, access: { has: obj => "handleMissingTypeDialogCancel" in obj, get: obj => obj.handleMissingTypeDialogCancel, set: (obj, value) => { obj.handleMissingTypeDialogCancel = value; } }, metadata: _metadata }, _handleMissingTypeDialogCancel_initializers, _handleMissingTypeDialogCancel_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Form = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Form = _classThis;
})();
exports.default = Form;
