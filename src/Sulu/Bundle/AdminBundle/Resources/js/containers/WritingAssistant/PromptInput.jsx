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
const components_1 = require("../../components");
const prompt_input_scss_1 = __importDefault(require("./prompt-input.scss"));
/**
 * @internal
 */
let PromptInput = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.Component;
    let _messageInput_decorators;
    let _messageInput_initializers = [];
    let _messageInput_extraInitializers = [];
    let _handleInputChange_decorators;
    let _handleInputChange_initializers = [];
    let _handleInputChange_extraInitializers = [];
    let _handleSendMessage_decorators;
    let _handleSendMessage_initializers = [];
    let _handleSendMessage_extraInitializers = [];
    var PromptInput = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.messageInput = __runInitializers(this, _messageInput_initializers, '');
            this.handleInputChange = (__runInitializers(this, _messageInput_extraInitializers), __runInitializers(this, _handleInputChange_initializers, (message) => {
                this.messageInput = message || '';
            }));
            this.handleSendMessage = (__runInitializers(this, _handleInputChange_extraInitializers), __runInitializers(this, _handleSendMessage_initializers, () => {
                const { onAddMessage } = this.props;
                const messageInput = this.messageInput.trim();
                this.messageInput = '';
                if (messageInput !== '') {
                    void onAddMessage(messageInput);
                }
            }));
            this.handleKeyPress = (__runInitializers(this, _handleSendMessage_extraInitializers), (key) => {
                if (key === 'Enter') {
                    this.handleSendMessage();
                }
            });
            this.renderPredefinedPrompts = () => {
                const { predefinedPrompts, isLoading } = this.props;
                if (!predefinedPrompts) {
                    return null;
                }
                return (<div className={prompt_input_scss_1.default.predefinedPromptsDropdown}>
                <components_1.DropdownButton icon="fa-terminal" label={predefinedPrompts.label} skin="secondary">
                    {predefinedPrompts.options.map((option) => (<components_1.DropdownButton.Item disabled={isLoading} key={option.id} onClick={predefinedPrompts.handleClick} value={option.id}>
                            {option.name}
                        </components_1.DropdownButton.Item>))}
                </components_1.DropdownButton>
            </div>);
            };
        }
        render() {
            var _a, _b;
            const { experts, predefinedPrompts, messages: { addMessage: addMessageMessage, send: sendMessage, }, } = this.props;
            return (<div className={prompt_input_scss_1.default.inputContainer}>
                <div className={prompt_input_scss_1.default.predefinedPrompts}>
                    {predefinedPrompts !== undefined && (<div>
                            {experts.type === 'select' ? (<div className={prompt_input_scss_1.default.expertSelect}>
                                    <components_1.SingleSelect onChange={experts.handleClick} value={experts.selected}>
                                        {experts.options.map((option) => (<components_1.SingleSelect.Option key={option.id} value={option.id}>
                                                {option.name}
                                            </components_1.SingleSelect.Option>))}
                                    </components_1.SingleSelect>
                                </div>) : (<span className={prompt_input_scss_1.default.singleExpert}>{experts.text}</span>)}
                        </div>)}
                    {this.renderPredefinedPrompts()}
                </div>
                <div className={prompt_input_scss_1.default.input}>
                    {predefinedPrompts === undefined && (<div className={prompt_input_scss_1.default.singleExpertContainer}>
                            {experts.type === 'select' ? (<div className={prompt_input_scss_1.default.expertSelect}>
                                    <components_1.SingleSelect onChange={experts.handleClick} value={experts.selected}>
                                        {experts.options.map((option) => (<components_1.SingleSelect.Option key={option.id} value={option.id}>
                                                {option.name}
                                            </components_1.SingleSelect.Option>))}
                                    </components_1.SingleSelect>
                                </div>) : (<span className={prompt_input_scss_1.default.singleExpert}>{experts.text}</span>)}
                        </div>)}
                    <components_1.Input onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} placeholder={addMessageMessage} type="text" value={this.messageInput}/>
                    <components_1.Button disabled={((_b = (_a = this.messageInput) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '') === ''} onClick={this.handleSendMessage} skin="primary">{sendMessage}</components_1.Button>
                </div>
            </div>);
        }
    };
    __setFunctionName(_classThis, "PromptInput");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _messageInput_decorators = [mobx_1.observable];
        _handleInputChange_decorators = [mobx_1.action];
        _handleSendMessage_decorators = [mobx_1.action];
        __esDecorate(null, null, _messageInput_decorators, { kind: "field", name: "messageInput", static: false, private: false, access: { has: obj => "messageInput" in obj, get: obj => obj.messageInput, set: (obj, value) => { obj.messageInput = value; } }, metadata: _metadata }, _messageInput_initializers, _messageInput_extraInitializers);
        __esDecorate(null, null, _handleInputChange_decorators, { kind: "field", name: "handleInputChange", static: false, private: false, access: { has: obj => "handleInputChange" in obj, get: obj => obj.handleInputChange, set: (obj, value) => { obj.handleInputChange = value; } }, metadata: _metadata }, _handleInputChange_initializers, _handleInputChange_extraInitializers);
        __esDecorate(null, null, _handleSendMessage_decorators, { kind: "field", name: "handleSendMessage", static: false, private: false, access: { has: obj => "handleSendMessage" in obj, get: obj => obj.handleSendMessage, set: (obj, value) => { obj.handleSendMessage = value; } }, metadata: _metadata }, _handleSendMessage_initializers, _handleSendMessage_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PromptInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PromptInput = _classThis;
})();
exports.default = PromptInput;
