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
const mobx_react_1 = require("mobx-react");
const debounce_1 = __importDefault(require("debounce"));
const mobx_1 = require("mobx");
const components_1 = require("../../components");
const services_1 = require("../../services");
const translator_scss_1 = __importDefault(require("./translator.scss"));
const Input_1 = __importDefault(require("./Input"));
let Translator = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _snackbarMessage_decorators;
    let _snackbarMessage_initializers = [];
    let _snackbarMessage_extraInitializers = [];
    let _loading_decorators;
    let _loading_initializers = [];
    let _loading_extraInitializers = [];
    let _sourceText_decorators;
    let _sourceText_initializers = [];
    let _sourceText_extraInitializers = [];
    let _targetText_decorators;
    let _targetText_initializers = [];
    let _targetText_extraInitializers = [];
    let _sourceLanguage_decorators;
    let _sourceLanguage_initializers = [];
    let _sourceLanguage_extraInitializers = [];
    let _sourceSelectedOnce_decorators;
    let _sourceSelectedOnce_initializers = [];
    let _sourceSelectedOnce_extraInitializers = [];
    let _targetLanguage_decorators;
    let _targetLanguage_initializers = [];
    let _targetLanguage_extraInitializers = [];
    let _lastResponse_decorators;
    let _lastResponse_initializers = [];
    let _lastResponse_extraInitializers = [];
    let _handleClose_decorators;
    let _handleClose_initializers = [];
    let _handleClose_extraInitializers = [];
    let _handleConfirm_decorators;
    let _handleConfirm_initializers = [];
    let _handleConfirm_extraInitializers = [];
    let _handleSnackbarCloseClick_decorators;
    let _handleSnackbarCloseClick_initializers = [];
    let _handleSnackbarCloseClick_extraInitializers = [];
    let _componentDidMount_decorators;
    let _handleSourceTextChanged_decorators;
    let _handleSourceTextChanged_initializers = [];
    let _handleSourceTextChanged_extraInitializers = [];
    let _handleSourceLanguageChanged_decorators;
    let _handleSourceLanguageChanged_initializers = [];
    let _handleSourceLanguageChanged_extraInitializers = [];
    let _handleTargetLanguageChanged_decorators;
    let _handleTargetLanguageChanged_initializers = [];
    let _handleTargetLanguageChanged_extraInitializers = [];
    var Translator = _classThis = class extends _classSuper {
        componentDidMount() {
            this.targetLanguage = this.props.locale;
            this.sourceText = this.props.value;
            this.translateText(this.sourceText);
        }
        render() {
            var _a, _b;
            const { type, sourceLanguages, targetLanguages, action: Action, messages: { title: titleMessage, insert: insertMessage, detected: detectedMessage, }, } = this.props;
            const actionNode = Action ? (<Action {...(this.props.actionProps || {})} context={(0, mobx_1.toJS)(this.lastResponse)} source="translator"/>) : <react_1.default.Fragment />;
            return (<components_1.Overlay confirmDisabled={this.targetText === ''} confirmLoading={this.loading} confirmText={insertMessage} onClose={this.handleClose} onConfirm={this.handleConfirm} onSnackbarCloseClick={this.handleSnackbarCloseClick} open={true} size="small" snackbarMessage={(_a = this.snackbarMessage) === null || _a === void 0 ? void 0 : _a.message} snackbarType={(_b = this.snackbarMessage) === null || _b === void 0 ? void 0 : _b.type} title={titleMessage}>
                {actionNode}

                <div className={translator_scss_1.default.translator}>
                    <div className={translator_scss_1.default.column}>
                        <div className={translator_scss_1.default.select}>
                            <components_1.SingleSelect onChange={this.handleSourceLanguageChanged} skin="flat" value={this.sourceLanguage}>
                                {sourceLanguages.map((option) => {
                    const isDetected = option.locale.toLowerCase() === this.sourceLanguage
                        && !this.sourceSelectedOnce;
                    return (<components_1.SingleSelect.Option key={option.locale} value={option.locale.toLowerCase()}>
                                            {option.label}
                                            {isDetected && ' (' + detectedMessage + ')'}
                                        </components_1.SingleSelect.Option>);
                })}
                            </components_1.SingleSelect>
                        </div>
                        <Input_1.default onChange={this.handleSourceTextChanged} text={this.sourceText || ''} type={type}/>
                    </div>
                    <div className={translator_scss_1.default.column}>
                        <div className={translator_scss_1.default.select}>
                            <components_1.SingleSelect onChange={this.handleTargetLanguageChanged} skin="flat" value={this.targetLanguage}>
                                {targetLanguages.map((option) => (<components_1.SingleSelect.Option key={option.locale} value={option.locale.toLowerCase()}>
                                        {option.label}
                                    </components_1.SingleSelect.Option>))}
                            </components_1.SingleSelect>
                        </div>
                        <Input_1.default text={this.targetText} type={type}/>
                    </div>
                </div>
            </components_1.Overlay>);
        }
        constructor() {
            super(...arguments);
            this.snackbarMessage = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _snackbarMessage_initializers, undefined));
            this.loading = (__runInitializers(this, _snackbarMessage_extraInitializers), __runInitializers(this, _loading_initializers, false));
            this.sourceText = (__runInitializers(this, _loading_extraInitializers), __runInitializers(this, _sourceText_initializers, ''));
            this.targetText = (__runInitializers(this, _sourceText_extraInitializers), __runInitializers(this, _targetText_initializers, ''));
            this.sourceLanguage = (__runInitializers(this, _targetText_extraInitializers), __runInitializers(this, _sourceLanguage_initializers, undefined));
            this.sourceSelectedOnce = (__runInitializers(this, _sourceLanguage_extraInitializers), __runInitializers(this, _sourceSelectedOnce_initializers, false));
            this.targetLanguage = (__runInitializers(this, _sourceSelectedOnce_extraInitializers), __runInitializers(this, _targetLanguage_initializers, undefined));
            this.lastResponse = (__runInitializers(this, _targetLanguage_extraInitializers), __runInitializers(this, _lastResponse_initializers, undefined));
            this.handleClose = (__runInitializers(this, _lastResponse_extraInitializers), __runInitializers(this, _handleClose_initializers, () => {
                const { onDialogClose } = this.props;
                onDialogClose();
            }));
            this.handleConfirm = (__runInitializers(this, _handleClose_extraInitializers), __runInitializers(this, _handleConfirm_initializers, () => {
                const { onConfirm, } = this.props;
                // We have to stop the propagation of the event to prevent the focus lose of the input / editor field
                event.stopPropagation();
                onConfirm(this.targetText);
            }));
            this.handleSnackbarCloseClick = (__runInitializers(this, _handleConfirm_extraInitializers), __runInitializers(this, _handleSnackbarCloseClick_initializers, () => {
                this.snackbarMessage = undefined;
            }));
            this.handleSourceTextChanged = (__runInitializers(this, _handleSnackbarCloseClick_extraInitializers), __runInitializers(this, _handleSourceTextChanged_initializers, (text) => {
                this.sourceText = text;
                this.translateText(text);
            }));
            this.translateText = (__runInitializers(this, _handleSourceTextChanged_extraInitializers), (0, debounce_1.default)((0, mobx_1.action)(() => {
                const { url, messages: { errorTranslatingText: errorTranslatingTextMessage, }, } = this.props;
                this.loading = true;
                this.lastResponse = undefined;
                return services_1.Requester.post(url, {
                    text: this.sourceText,
                    sourceLanguage: this.sourceLanguage,
                    targetLanguage: this.targetLanguage,
                }).then((0, mobx_1.action)((data) => {
                    this.loading = false;
                    this.targetText = data.response.text;
                    this.lastResponse = data;
                    this.targetLanguage = data.response.targetLanguage.toLowerCase();
                    this.sourceLanguage = data.response.sourceLanguage.toLowerCase();
                    return data;
                })).catch((0, mobx_1.action)((error) => {
                    this.loading = false;
                    this.lastResponse = { error };
                    this.snackbarMessage = {
                        message: errorTranslatingTextMessage,
                        type: 'error',
                    };
                }));
            }), 500));
            this.handleSourceLanguageChanged = __runInitializers(this, _handleSourceLanguageChanged_initializers, (locale) => {
                this.sourceLanguage = locale;
                this.sourceSelectedOnce = true;
                this.translateText(this.sourceText);
            });
            this.handleTargetLanguageChanged = (__runInitializers(this, _handleSourceLanguageChanged_extraInitializers), __runInitializers(this, _handleTargetLanguageChanged_initializers, (locale) => {
                this.targetLanguage = locale;
                this.translateText(this.sourceText);
            }));
            __runInitializers(this, _handleTargetLanguageChanged_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Translator");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _snackbarMessage_decorators = [mobx_1.observable];
        _loading_decorators = [mobx_1.observable];
        _sourceText_decorators = [mobx_1.observable];
        _targetText_decorators = [mobx_1.observable];
        _sourceLanguage_decorators = [mobx_1.observable];
        _sourceSelectedOnce_decorators = [mobx_1.observable];
        _targetLanguage_decorators = [mobx_1.observable];
        _lastResponse_decorators = [mobx_1.observable];
        _handleClose_decorators = [mobx_1.action];
        _handleConfirm_decorators = [mobx_1.action];
        _handleSnackbarCloseClick_decorators = [mobx_1.action];
        _componentDidMount_decorators = [mobx_1.action];
        _handleSourceTextChanged_decorators = [mobx_1.action];
        _handleSourceLanguageChanged_decorators = [mobx_1.action];
        _handleTargetLanguageChanged_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _componentDidMount_decorators, { kind: "method", name: "componentDidMount", static: false, private: false, access: { has: obj => "componentDidMount" in obj, get: obj => obj.componentDidMount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _snackbarMessage_decorators, { kind: "field", name: "snackbarMessage", static: false, private: false, access: { has: obj => "snackbarMessage" in obj, get: obj => obj.snackbarMessage, set: (obj, value) => { obj.snackbarMessage = value; } }, metadata: _metadata }, _snackbarMessage_initializers, _snackbarMessage_extraInitializers);
        __esDecorate(null, null, _loading_decorators, { kind: "field", name: "loading", static: false, private: false, access: { has: obj => "loading" in obj, get: obj => obj.loading, set: (obj, value) => { obj.loading = value; } }, metadata: _metadata }, _loading_initializers, _loading_extraInitializers);
        __esDecorate(null, null, _sourceText_decorators, { kind: "field", name: "sourceText", static: false, private: false, access: { has: obj => "sourceText" in obj, get: obj => obj.sourceText, set: (obj, value) => { obj.sourceText = value; } }, metadata: _metadata }, _sourceText_initializers, _sourceText_extraInitializers);
        __esDecorate(null, null, _targetText_decorators, { kind: "field", name: "targetText", static: false, private: false, access: { has: obj => "targetText" in obj, get: obj => obj.targetText, set: (obj, value) => { obj.targetText = value; } }, metadata: _metadata }, _targetText_initializers, _targetText_extraInitializers);
        __esDecorate(null, null, _sourceLanguage_decorators, { kind: "field", name: "sourceLanguage", static: false, private: false, access: { has: obj => "sourceLanguage" in obj, get: obj => obj.sourceLanguage, set: (obj, value) => { obj.sourceLanguage = value; } }, metadata: _metadata }, _sourceLanguage_initializers, _sourceLanguage_extraInitializers);
        __esDecorate(null, null, _sourceSelectedOnce_decorators, { kind: "field", name: "sourceSelectedOnce", static: false, private: false, access: { has: obj => "sourceSelectedOnce" in obj, get: obj => obj.sourceSelectedOnce, set: (obj, value) => { obj.sourceSelectedOnce = value; } }, metadata: _metadata }, _sourceSelectedOnce_initializers, _sourceSelectedOnce_extraInitializers);
        __esDecorate(null, null, _targetLanguage_decorators, { kind: "field", name: "targetLanguage", static: false, private: false, access: { has: obj => "targetLanguage" in obj, get: obj => obj.targetLanguage, set: (obj, value) => { obj.targetLanguage = value; } }, metadata: _metadata }, _targetLanguage_initializers, _targetLanguage_extraInitializers);
        __esDecorate(null, null, _lastResponse_decorators, { kind: "field", name: "lastResponse", static: false, private: false, access: { has: obj => "lastResponse" in obj, get: obj => obj.lastResponse, set: (obj, value) => { obj.lastResponse = value; } }, metadata: _metadata }, _lastResponse_initializers, _lastResponse_extraInitializers);
        __esDecorate(null, null, _handleClose_decorators, { kind: "field", name: "handleClose", static: false, private: false, access: { has: obj => "handleClose" in obj, get: obj => obj.handleClose, set: (obj, value) => { obj.handleClose = value; } }, metadata: _metadata }, _handleClose_initializers, _handleClose_extraInitializers);
        __esDecorate(null, null, _handleConfirm_decorators, { kind: "field", name: "handleConfirm", static: false, private: false, access: { has: obj => "handleConfirm" in obj, get: obj => obj.handleConfirm, set: (obj, value) => { obj.handleConfirm = value; } }, metadata: _metadata }, _handleConfirm_initializers, _handleConfirm_extraInitializers);
        __esDecorate(null, null, _handleSnackbarCloseClick_decorators, { kind: "field", name: "handleSnackbarCloseClick", static: false, private: false, access: { has: obj => "handleSnackbarCloseClick" in obj, get: obj => obj.handleSnackbarCloseClick, set: (obj, value) => { obj.handleSnackbarCloseClick = value; } }, metadata: _metadata }, _handleSnackbarCloseClick_initializers, _handleSnackbarCloseClick_extraInitializers);
        __esDecorate(null, null, _handleSourceTextChanged_decorators, { kind: "field", name: "handleSourceTextChanged", static: false, private: false, access: { has: obj => "handleSourceTextChanged" in obj, get: obj => obj.handleSourceTextChanged, set: (obj, value) => { obj.handleSourceTextChanged = value; } }, metadata: _metadata }, _handleSourceTextChanged_initializers, _handleSourceTextChanged_extraInitializers);
        __esDecorate(null, null, _handleSourceLanguageChanged_decorators, { kind: "field", name: "handleSourceLanguageChanged", static: false, private: false, access: { has: obj => "handleSourceLanguageChanged" in obj, get: obj => obj.handleSourceLanguageChanged, set: (obj, value) => { obj.handleSourceLanguageChanged = value; } }, metadata: _metadata }, _handleSourceLanguageChanged_initializers, _handleSourceLanguageChanged_extraInitializers);
        __esDecorate(null, null, _handleTargetLanguageChanged_decorators, { kind: "field", name: "handleTargetLanguageChanged", static: false, private: false, access: { has: obj => "handleTargetLanguageChanged" in obj, get: obj => obj.handleTargetLanguageChanged, set: (obj, value) => { obj.handleTargetLanguageChanged = value; } }, metadata: _metadata }, _handleTargetLanguageChanged_initializers, _handleTargetLanguageChanged_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Translator = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Translator = _classThis;
})();
exports.default = Translator;
