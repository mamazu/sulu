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
const router_1 = __importDefault(require("fos-jsrouting/router"));
const utils_1 = require("../../utils");
const WritingAssistant_1 = __importDefault(require("../WritingAssistant"));
const Translator_1 = __importDefault(require("../Translator"));
const FeatureBadge_1 = __importDefault(require("./FeatureBadge"));
const ActionOverlay_1 = __importDefault(require("./ActionOverlay"));
let AiApplication = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.Component;
    let _instanceExtraInitializers = [];
    let _selectedComponent_decorators;
    let _selectedComponent_initializers = [];
    let _selectedComponent_extraInitializers = [];
    let _selectedText_decorators;
    let _selectedText_initializers = [];
    let _selectedText_extraInitializers = [];
    let _selectedRect_decorators;
    let _selectedRect_initializers = [];
    let _selectedRect_extraInitializers = [];
    let _selectedElement_decorators;
    let _selectedElement_initializers = [];
    let _selectedElement_extraInitializers = [];
    let _writingAssistantOpen_decorators;
    let _writingAssistantOpen_initializers = [];
    let _writingAssistantOpen_extraInitializers = [];
    let _translateOpen_decorators;
    let _translateOpen_initializers = [];
    let _translateOpen_extraInitializers = [];
    let _hasFocus_decorators;
    let _hasFocus_initializers = [];
    let _hasFocus_extraInitializers = [];
    let _writingAssistantIdentifier_decorators;
    let _writingAssistantIdentifier_initializers = [];
    let _writingAssistantIdentifier_extraInitializers = [];
    let _translateIdentifier_decorators;
    let _translateIdentifier_initializers = [];
    let _translateIdentifier_extraInitializers = [];
    let _handleScrollResize_decorators;
    let _handleScrollResize_initializers = [];
    let _handleScrollResize_extraInitializers = [];
    let _handleSuluFocus_decorators;
    let _handleSuluFocus_initializers = [];
    let _handleSuluFocus_extraInitializers = [];
    let _handleGlobalClick_decorators;
    let _handleGlobalClick_initializers = [];
    let _handleGlobalClick_extraInitializers = [];
    let _setFocus_decorators;
    let _setFocus_initializers = [];
    let _setFocus_extraInitializers = [];
    let _handleWritingAssistantClose_decorators;
    let _handleWritingAssistantClose_initializers = [];
    let _handleWritingAssistantClose_extraInitializers = [];
    let _handleWritingAssistantConfirm_decorators;
    let _handleWritingAssistantConfirm_initializers = [];
    let _handleWritingAssistantConfirm_extraInitializers = [];
    let _handleTranslateClose_decorators;
    let _handleTranslateClose_initializers = [];
    let _handleTranslateClose_extraInitializers = [];
    let _handleTranslateConfirm_decorators;
    let _handleTranslateConfirm_initializers = [];
    let _handleTranslateConfirm_extraInitializers = [];
    let _get_position_decorators;
    let _get_delta_decorators;
    let _handleWritingAssistantOpen_decorators;
    let _handleWritingAssistantOpen_initializers = [];
    let _handleWritingAssistantOpen_extraInitializers = [];
    let _handleTranslateOpen_decorators;
    let _handleTranslateOpen_initializers = [];
    let _handleTranslateOpen_extraInitializers = [];
    let _get_writingAssistantUrl_decorators;
    let _get_translationUrl_decorators;
    let _get_actionUrl_decorators;
    var AiApplication = _classThis = class extends _classSuper {
        componentDidMount() {
            ['scroll', 'resize'].forEach((eventName) => {
                window.addEventListener(eventName, this.handleScrollResize, true);
            });
            document.addEventListener('sulu.focus', this.handleSuluFocus);
            document.addEventListener('click', this.handleGlobalClick);
        }
        componentWillUnmount() {
            ['scroll', 'resize'].forEach((eventName) => {
                window.removeEventListener(eventName, this.handleScrollResize, true);
            });
            document.removeEventListener('sulu.focus', this.handleSuluFocus);
            document.removeEventListener('click', this.handleGlobalClick);
        }
        isRelevantElement(element) {
            return element.matches('input, textarea, [contenteditable]')
                || element.closest('[contenteditable]');
        }
        isInsideBlock(formInspector, schemaPath) {
            if (schemaPath.startsWith('/ext')) {
                return false;
            }
            const parts = schemaPath.split('/');
            for (let i = 2; i < parts.length; i++) {
                const path = '/' + parts.slice(1, i).join('/');
                const schema = formInspector.getSchemaEntryByPath(path);
                if ((schema === null || schema === void 0 ? void 0 : schema.type) === 'block') {
                    return true;
                }
            }
            return false;
        }
        get position() {
            return {
                position: 'absolute',
                bottom: this.selectedRect ? (window.innerHeight - this.selectedRect.top + this.delta) + 'px' : 0,
                right: this.selectedRect ? (window.innerWidth - this.selectedRect.right) + 'px' : 0,
            };
        }
        get delta() {
            var _a, _b, _c;
            if (((_a = this.selectedComponent) === null || _a === void 0 ? void 0 : _a.schemaType) === 'text_line') {
                return 5;
            }
            if (((_b = this.selectedComponent) === null || _b === void 0 ? void 0 : _b.schemaType) === 'text_area') {
                return 5;
            }
            if (((_c = this.selectedComponent) === null || _c === void 0 ? void 0 : _c.schemaType) === 'text_editor') {
                return 50;
            }
            return 5;
        }
        get writingAssistantUrl() {
            return router_1.default.generate(this.props.writingAssistant.route, {
                chatId: this.writingAssistantIdentifier,
            });
        }
        get translationUrl() {
            return router_1.default.generate(this.props.translation.route, {
                translateId: this.translateIdentifier,
            });
        }
        get actionUrl() {
            if (!this.props.feedback) {
                return undefined;
            }
            return router_1.default.generate(this.props.feedback.route);
        }
        render() {
            var _a, _b, _c, _d, _e, _f;
            const { writingAssistant: { enabled: writingAssistantEnabled, }, translation: { enabled: translationEnabled, }, } = this.props;
            if (!this.hasFocus
                && !this.writingAssistantOpen
                && !this.translateOpen) {
                return null;
            }
            const locale = (_a = this.selectedComponent.formInspector.locale) === null || _a === void 0 ? void 0 : _a.get().toLowerCase();
            if (!locale) {
                return null;
            }
            const schemaType = ((_b = this.selectedComponent) === null || _b === void 0 ? void 0 : _b.schemaType) || 'text_line';
            if (schemaType !== 'text_line' && schemaType !== 'text_area' && schemaType !== 'text_editor') {
                return null;
            }
            return (<div style={this.position}>
                {!this.writingAssistantOpen && !this.translateOpen && (<FeatureBadge_1.default messages={{
                        translate: (0, utils_1.translate)('sulu_admin.translator'),
                        writingAssistant: (0, utils_1.translate)('sulu_admin.writing_assistant'),
                    }} onTranslateClick={translationEnabled ? this.handleTranslateOpen : undefined} onWritingAssistantClick={writingAssistantEnabled ? this.handleWritingAssistantOpen : undefined} skin={this.selectedComponent.isInsideBlock ? 'gray' : 'white'}/>)}
                {this.writingAssistantOpen && writingAssistantEnabled && (<WritingAssistant_1.default action={((_c = this.props.feedback) === null || _c === void 0 ? void 0 : _c.enabled) ? ActionOverlay_1.default : undefined} actionProps={{
                        formKey: (_d = this.props.feedback) === null || _d === void 0 ? void 0 : _d.formKey,
                        url: this.actionUrl,
                    }} configuration={this.props.writingAssistant} locale={locale} messages={{
                        addMessage: (0, utils_1.translate)('sulu_admin.writing_assistant_prompt_placeholder'),
                        copiedToClipboard: (0, utils_1.translate)('sulu_admin.sucessfully_copied_to_clipboard'),
                        initialMessage: (0, utils_1.translate)('sulu_admin.selected_text'),
                        predefinedPrompts: (0, utils_1.translate)('sulu_admin.predefined_prompts'),
                        send: (0, utils_1.translate)('sulu_admin.send'),
                        writingAssistant: (0, utils_1.translate)('sulu_admin.writing_assistant'),
                    }} onConfirm={this.handleWritingAssistantConfirm} onDialogClose={this.handleWritingAssistantClose} type={schemaType} url={this.writingAssistantUrl} value={this.selectedText}/>)}
                {this.translateOpen && translationEnabled && (<Translator_1.default action={((_e = this.props.feedback) === null || _e === void 0 ? void 0 : _e.enabled) ? ActionOverlay_1.default : undefined} actionProps={{
                        formKey: (_f = this.props.feedback) === null || _f === void 0 ? void 0 : _f.formKey,
                        url: this.actionUrl,
                    }} locale={locale} messages={{
                        title: (0, utils_1.translate)('sulu_admin.translator'),
                        insert: (0, utils_1.translate)('sulu_admin.insert'),
                        detected: (0, utils_1.translate)('sulu_admin.detected'),
                        errorTranslatingText: (0, utils_1.translate)('sulu_admin.translator_error'),
                    }} onConfirm={this.handleTranslateConfirm} onDialogClose={this.handleTranslateClose} sourceLanguages={this.props.translation.sourceLanguages} targetLanguages={this.props.translation.targetLanguages} type={schemaType} url={this.translationUrl} value={this.selectedText}/>)}
            </div>);
        }
        constructor() {
            super(...arguments);
            this.selectedComponent = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _selectedComponent_initializers, void 0));
            this.selectedText = (__runInitializers(this, _selectedComponent_extraInitializers), __runInitializers(this, _selectedText_initializers, void 0));
            this.selectedRect = (__runInitializers(this, _selectedText_extraInitializers), __runInitializers(this, _selectedRect_initializers, void 0));
            this.selectedElement = (__runInitializers(this, _selectedRect_extraInitializers), __runInitializers(this, _selectedElement_initializers, void 0));
            this.writingAssistantOpen = (__runInitializers(this, _selectedElement_extraInitializers), __runInitializers(this, _writingAssistantOpen_initializers, false));
            this.translateOpen = (__runInitializers(this, _writingAssistantOpen_extraInitializers), __runInitializers(this, _translateOpen_initializers, false));
            this.hasFocus = (__runInitializers(this, _translateOpen_extraInitializers), __runInitializers(this, _hasFocus_initializers, false));
            this.writingAssistantIdentifier = (__runInitializers(this, _hasFocus_extraInitializers), __runInitializers(this, _writingAssistantIdentifier_initializers, undefined));
            this.translateIdentifier = (__runInitializers(this, _writingAssistantIdentifier_extraInitializers), __runInitializers(this, _translateIdentifier_initializers, undefined));
            this.handleScrollResize = (__runInitializers(this, _translateIdentifier_extraInitializers), __runInitializers(this, _handleScrollResize_initializers, () => {
                if (this.selectedElement && this.selectedElement.parentElement) {
                    this.selectedRect = this.selectedElement.parentElement.getBoundingClientRect();
                }
            }));
            this.handleSuluFocus = (__runInitializers(this, _handleScrollResize_extraInitializers), __runInitializers(this, _handleSuluFocus_initializers, (event) => {
                if (this.translateOpen || this.writingAssistantOpen || !(event.target instanceof HTMLElement)) {
                    return;
                }
                this.selectedElement = event.target;
                if (this.selectedElement.parentElement) {
                    this.selectedRect = this.selectedElement.parentElement.getBoundingClientRect();
                }
                const detail = event.detail;
                if (!detail) {
                    return;
                }
                this.selectedComponent = {
                    formInspector: detail.formInspector,
                    getValue: detail.getValue,
                    isInsideBlock: this.isInsideBlock(detail.formInspector, detail.schemaPath),
                    name: detail.schemaPath.split('/').slice(0, -1)[0],
                    schemaType: detail.schemaType,
                    setValue: detail.setValue,
                };
                this.selectedText = this.selectedComponent.getValue();
                this.setFocus(true);
            }));
            this.handleGlobalClick = (__runInitializers(this, _handleSuluFocus_extraInitializers), __runInitializers(this, _handleGlobalClick_initializers, (event) => {
                if ((event.target instanceof HTMLElement) && !this.isRelevantElement(event.target)) {
                    this.hasFocus = false;
                }
            }));
            this.setFocus = (__runInitializers(this, _handleGlobalClick_extraInitializers), __runInitializers(this, _setFocus_initializers, (focused) => {
                this.hasFocus = focused;
            }));
            this.moveCursorToEnd = (__runInitializers(this, _setFocus_extraInitializers), (element) => {
                element.focus();
                if (typeof element.selectionStart === 'number') {
                    // For input and textarea elements
                    element.selectionStart = element.selectionEnd = element.value.length;
                }
                else if (window.getSelection && document.createRange) {
                    // For contenteditable elements
                    const range = document.createRange();
                    range.selectNodeContents(element);
                    range.collapse(false);
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            });
            this.handleWritingAssistantClose = __runInitializers(this, _handleWritingAssistantClose_initializers, () => {
                this.selectedText = this.selectedComponent.getValue();
                this.writingAssistantOpen = false;
                this.setFocus(false);
            });
            this.handleWritingAssistantConfirm = (__runInitializers(this, _handleWritingAssistantClose_extraInitializers), __runInitializers(this, _handleWritingAssistantConfirm_initializers, (optimizedText) => {
                this.selectedComponent.setValue(optimizedText);
                if (this.selectedElement instanceof HTMLInputElement) {
                    this.moveCursorToEnd(this.selectedElement);
                }
                this.writingAssistantOpen = false;
                this.setFocus(true);
            }));
            this.handleTranslateClose = (__runInitializers(this, _handleWritingAssistantConfirm_extraInitializers), __runInitializers(this, _handleTranslateClose_initializers, () => {
                this.selectedText = this.selectedComponent.getValue();
                this.translateOpen = false;
                this.setFocus(false);
            }));
            this.handleTranslateConfirm = (__runInitializers(this, _handleTranslateClose_extraInitializers), __runInitializers(this, _handleTranslateConfirm_initializers, (translatedText) => {
                this.selectedComponent.setValue(translatedText);
                if (this.selectedElement instanceof HTMLInputElement) {
                    this.moveCursorToEnd(this.selectedElement);
                }
                this.translateOpen = false;
                this.setFocus(true);
            }));
            this.handleWritingAssistantOpen = (__runInitializers(this, _handleTranslateConfirm_extraInitializers), __runInitializers(this, _handleWritingAssistantOpen_initializers, () => {
                this.selectedText = this.selectedComponent.getValue();
                this.writingAssistantOpen = true;
                this.writingAssistantIdentifier = Math.floor(Math.random() * 10000000);
            }));
            this.handleTranslateOpen = (__runInitializers(this, _handleWritingAssistantOpen_extraInitializers), __runInitializers(this, _handleTranslateOpen_initializers, () => {
                this.selectedText = this.selectedComponent.getValue();
                this.translateOpen = true;
                this.translateIdentifier = Math.floor(Math.random() * 10000000);
            }));
            __runInitializers(this, _handleTranslateOpen_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "AiApplication");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _selectedComponent_decorators = [mobx_1.observable];
        _selectedText_decorators = [mobx_1.observable];
        _selectedRect_decorators = [mobx_1.observable];
        _selectedElement_decorators = [mobx_1.observable];
        _writingAssistantOpen_decorators = [mobx_1.observable];
        _translateOpen_decorators = [mobx_1.observable];
        _hasFocus_decorators = [mobx_1.observable];
        _writingAssistantIdentifier_decorators = [mobx_1.observable];
        _translateIdentifier_decorators = [mobx_1.observable];
        _handleScrollResize_decorators = [mobx_1.action];
        _handleSuluFocus_decorators = [mobx_1.action];
        _handleGlobalClick_decorators = [mobx_1.action];
        _setFocus_decorators = [mobx_1.action];
        _handleWritingAssistantClose_decorators = [mobx_1.action];
        _handleWritingAssistantConfirm_decorators = [mobx_1.action];
        _handleTranslateClose_decorators = [mobx_1.action];
        _handleTranslateConfirm_decorators = [mobx_1.action];
        _get_position_decorators = [mobx_1.computed];
        _get_delta_decorators = [mobx_1.computed];
        _handleWritingAssistantOpen_decorators = [mobx_1.action];
        _handleTranslateOpen_decorators = [mobx_1.action];
        _get_writingAssistantUrl_decorators = [mobx_1.computed];
        _get_translationUrl_decorators = [mobx_1.computed];
        _get_actionUrl_decorators = [mobx_1.computed];
        __esDecorate(_classThis, null, _get_position_decorators, { kind: "getter", name: "position", static: false, private: false, access: { has: obj => "position" in obj, get: obj => obj.position }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_delta_decorators, { kind: "getter", name: "delta", static: false, private: false, access: { has: obj => "delta" in obj, get: obj => obj.delta }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_writingAssistantUrl_decorators, { kind: "getter", name: "writingAssistantUrl", static: false, private: false, access: { has: obj => "writingAssistantUrl" in obj, get: obj => obj.writingAssistantUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_translationUrl_decorators, { kind: "getter", name: "translationUrl", static: false, private: false, access: { has: obj => "translationUrl" in obj, get: obj => obj.translationUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_actionUrl_decorators, { kind: "getter", name: "actionUrl", static: false, private: false, access: { has: obj => "actionUrl" in obj, get: obj => obj.actionUrl }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _selectedComponent_decorators, { kind: "field", name: "selectedComponent", static: false, private: false, access: { has: obj => "selectedComponent" in obj, get: obj => obj.selectedComponent, set: (obj, value) => { obj.selectedComponent = value; } }, metadata: _metadata }, _selectedComponent_initializers, _selectedComponent_extraInitializers);
        __esDecorate(null, null, _selectedText_decorators, { kind: "field", name: "selectedText", static: false, private: false, access: { has: obj => "selectedText" in obj, get: obj => obj.selectedText, set: (obj, value) => { obj.selectedText = value; } }, metadata: _metadata }, _selectedText_initializers, _selectedText_extraInitializers);
        __esDecorate(null, null, _selectedRect_decorators, { kind: "field", name: "selectedRect", static: false, private: false, access: { has: obj => "selectedRect" in obj, get: obj => obj.selectedRect, set: (obj, value) => { obj.selectedRect = value; } }, metadata: _metadata }, _selectedRect_initializers, _selectedRect_extraInitializers);
        __esDecorate(null, null, _selectedElement_decorators, { kind: "field", name: "selectedElement", static: false, private: false, access: { has: obj => "selectedElement" in obj, get: obj => obj.selectedElement, set: (obj, value) => { obj.selectedElement = value; } }, metadata: _metadata }, _selectedElement_initializers, _selectedElement_extraInitializers);
        __esDecorate(null, null, _writingAssistantOpen_decorators, { kind: "field", name: "writingAssistantOpen", static: false, private: false, access: { has: obj => "writingAssistantOpen" in obj, get: obj => obj.writingAssistantOpen, set: (obj, value) => { obj.writingAssistantOpen = value; } }, metadata: _metadata }, _writingAssistantOpen_initializers, _writingAssistantOpen_extraInitializers);
        __esDecorate(null, null, _translateOpen_decorators, { kind: "field", name: "translateOpen", static: false, private: false, access: { has: obj => "translateOpen" in obj, get: obj => obj.translateOpen, set: (obj, value) => { obj.translateOpen = value; } }, metadata: _metadata }, _translateOpen_initializers, _translateOpen_extraInitializers);
        __esDecorate(null, null, _hasFocus_decorators, { kind: "field", name: "hasFocus", static: false, private: false, access: { has: obj => "hasFocus" in obj, get: obj => obj.hasFocus, set: (obj, value) => { obj.hasFocus = value; } }, metadata: _metadata }, _hasFocus_initializers, _hasFocus_extraInitializers);
        __esDecorate(null, null, _writingAssistantIdentifier_decorators, { kind: "field", name: "writingAssistantIdentifier", static: false, private: false, access: { has: obj => "writingAssistantIdentifier" in obj, get: obj => obj.writingAssistantIdentifier, set: (obj, value) => { obj.writingAssistantIdentifier = value; } }, metadata: _metadata }, _writingAssistantIdentifier_initializers, _writingAssistantIdentifier_extraInitializers);
        __esDecorate(null, null, _translateIdentifier_decorators, { kind: "field", name: "translateIdentifier", static: false, private: false, access: { has: obj => "translateIdentifier" in obj, get: obj => obj.translateIdentifier, set: (obj, value) => { obj.translateIdentifier = value; } }, metadata: _metadata }, _translateIdentifier_initializers, _translateIdentifier_extraInitializers);
        __esDecorate(null, null, _handleScrollResize_decorators, { kind: "field", name: "handleScrollResize", static: false, private: false, access: { has: obj => "handleScrollResize" in obj, get: obj => obj.handleScrollResize, set: (obj, value) => { obj.handleScrollResize = value; } }, metadata: _metadata }, _handleScrollResize_initializers, _handleScrollResize_extraInitializers);
        __esDecorate(null, null, _handleSuluFocus_decorators, { kind: "field", name: "handleSuluFocus", static: false, private: false, access: { has: obj => "handleSuluFocus" in obj, get: obj => obj.handleSuluFocus, set: (obj, value) => { obj.handleSuluFocus = value; } }, metadata: _metadata }, _handleSuluFocus_initializers, _handleSuluFocus_extraInitializers);
        __esDecorate(null, null, _handleGlobalClick_decorators, { kind: "field", name: "handleGlobalClick", static: false, private: false, access: { has: obj => "handleGlobalClick" in obj, get: obj => obj.handleGlobalClick, set: (obj, value) => { obj.handleGlobalClick = value; } }, metadata: _metadata }, _handleGlobalClick_initializers, _handleGlobalClick_extraInitializers);
        __esDecorate(null, null, _setFocus_decorators, { kind: "field", name: "setFocus", static: false, private: false, access: { has: obj => "setFocus" in obj, get: obj => obj.setFocus, set: (obj, value) => { obj.setFocus = value; } }, metadata: _metadata }, _setFocus_initializers, _setFocus_extraInitializers);
        __esDecorate(null, null, _handleWritingAssistantClose_decorators, { kind: "field", name: "handleWritingAssistantClose", static: false, private: false, access: { has: obj => "handleWritingAssistantClose" in obj, get: obj => obj.handleWritingAssistantClose, set: (obj, value) => { obj.handleWritingAssistantClose = value; } }, metadata: _metadata }, _handleWritingAssistantClose_initializers, _handleWritingAssistantClose_extraInitializers);
        __esDecorate(null, null, _handleWritingAssistantConfirm_decorators, { kind: "field", name: "handleWritingAssistantConfirm", static: false, private: false, access: { has: obj => "handleWritingAssistantConfirm" in obj, get: obj => obj.handleWritingAssistantConfirm, set: (obj, value) => { obj.handleWritingAssistantConfirm = value; } }, metadata: _metadata }, _handleWritingAssistantConfirm_initializers, _handleWritingAssistantConfirm_extraInitializers);
        __esDecorate(null, null, _handleTranslateClose_decorators, { kind: "field", name: "handleTranslateClose", static: false, private: false, access: { has: obj => "handleTranslateClose" in obj, get: obj => obj.handleTranslateClose, set: (obj, value) => { obj.handleTranslateClose = value; } }, metadata: _metadata }, _handleTranslateClose_initializers, _handleTranslateClose_extraInitializers);
        __esDecorate(null, null, _handleTranslateConfirm_decorators, { kind: "field", name: "handleTranslateConfirm", static: false, private: false, access: { has: obj => "handleTranslateConfirm" in obj, get: obj => obj.handleTranslateConfirm, set: (obj, value) => { obj.handleTranslateConfirm = value; } }, metadata: _metadata }, _handleTranslateConfirm_initializers, _handleTranslateConfirm_extraInitializers);
        __esDecorate(null, null, _handleWritingAssistantOpen_decorators, { kind: "field", name: "handleWritingAssistantOpen", static: false, private: false, access: { has: obj => "handleWritingAssistantOpen" in obj, get: obj => obj.handleWritingAssistantOpen, set: (obj, value) => { obj.handleWritingAssistantOpen = value; } }, metadata: _metadata }, _handleWritingAssistantOpen_initializers, _handleWritingAssistantOpen_extraInitializers);
        __esDecorate(null, null, _handleTranslateOpen_decorators, { kind: "field", name: "handleTranslateOpen", static: false, private: false, access: { has: obj => "handleTranslateOpen" in obj, get: obj => obj.handleTranslateOpen, set: (obj, value) => { obj.handleTranslateOpen = value; } }, metadata: _metadata }, _handleTranslateOpen_initializers, _handleTranslateOpen_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AiApplication = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AiApplication = _classThis;
})();
exports.default = AiApplication;
