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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const mobx_1 = require("mobx");
const services_1 = require("../../services");
const components_1 = require("../../components");
const writingAssistant_scss_1 = __importDefault(require("./writingAssistant.scss"));
const Messages_1 = __importDefault(require("./Messages"));
const PromptInput_1 = __importDefault(require("./PromptInput"));
let WritingAssistant = (() => {
    let _classDecorators = [mobx_react_1.observer];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = react_1.default.Component;
    let _instanceExtraInitializers = [];
    let _messages_decorators;
    let _messages_initializers = [];
    let _messages_extraInitializers = [];
    let _loader_decorators;
    let _loader_initializers = [];
    let _loader_extraInitializers = [];
    let _selectedExpert_decorators;
    let _selectedExpert_initializers = [];
    let _selectedExpert_extraInitializers = [];
    let _snackbarMessage_decorators;
    let _snackbarMessage_initializers = [];
    let _snackbarMessage_extraInitializers = [];
    let _lastResponse_decorators;
    let _lastResponse_initializers = [];
    let _lastResponse_extraInitializers = [];
    let _currentValue_decorators;
    let _currentValue_initializers = [];
    let _currentValue_extraInitializers = [];
    let _handleAddMessage_decorators;
    let _handleAddMessage_initializers = [];
    let _handleAddMessage_extraInitializers = [];
    let _addMessage_decorators;
    let _addMessage_initializers = [];
    let _addMessage_extraInitializers = [];
    let _optimizeText_decorators;
    let _optimizeText_initializers = [];
    let _optimizeText_extraInitializers = [];
    let _handleExpertSelect_decorators;
    let _handleExpertSelect_initializers = [];
    let _handleExpertSelect_extraInitializers = [];
    let _handleOnRetry_decorators;
    let _handleOnRetry_initializers = [];
    let _handleOnRetry_extraInitializers = [];
    let _handleOnMessageClicked_decorators;
    let _handleOnMessageClicked_initializers = [];
    let _handleOnMessageClicked_extraInitializers = [];
    let _get_experts_decorators;
    let _get_expertsButton_decorators;
    let _get_predefinedPrompts_decorators;
    let _handleDialogClose_decorators;
    let _handleDialogClose_initializers = [];
    let _handleDialogClose_extraInitializers = [];
    let _handleOnInsert_decorators;
    let _handleOnInsert_initializers = [];
    let _handleOnInsert_extraInitializers = [];
    let _handleOnCopy_decorators;
    let _handleOnCopy_initializers = [];
    let _handleOnCopy_extraInitializers = [];
    let _handleSnackbarCloseClick_decorators;
    let _handleSnackbarCloseClick_initializers = [];
    let _handleSnackbarCloseClick_extraInitializers = [];
    var WritingAssistant = _classThis = class extends _classSuper {
        constructor(props) {
            super(props);
            this.messages = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _messages_initializers, []));
            this.loader = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _loader_initializers, undefined));
            this.selectedExpert = (__runInitializers(this, _loader_extraInitializers), __runInitializers(this, _selectedExpert_initializers, void 0));
            this.snackbarMessage = (__runInitializers(this, _selectedExpert_extraInitializers), __runInitializers(this, _snackbarMessage_initializers, undefined));
            this.lastResponse = (__runInitializers(this, _snackbarMessage_extraInitializers), __runInitializers(this, _lastResponse_initializers, undefined));
            this.currentValue = (__runInitializers(this, _lastResponse_extraInitializers), __runInitializers(this, _currentValue_initializers, void 0));
            this.handleAddMessage = (__runInitializers(this, _currentValue_extraInitializers), __runInitializers(this, _handleAddMessage_initializers, (prompt, title) => __awaiter(this, void 0, void 0, function* () {
                const { type } = this.props;
                const result = yield this.optimizeText(prompt, title);
                this.currentValue = result.text;
                this.addMessage({
                    command: prompt,
                    title: title || prompt,
                    expert: this.props.configuration.experts[this.selectedExpert].name,
                    text: result.text,
                    type,
                    collapsed: false,
                    displayActions: true,
                });
            })));
            this.addMessage = (__runInitializers(this, _handleAddMessage_extraInitializers), __runInitializers(this, _addMessage_initializers, (message) => {
                this.messages = [this.messages[0], message, ...this.messages.slice(1)];
                if (this.messages.length >= 3) {
                    this.messages[2].collapsed = true;
                }
            }));
            this.optimizeText = (__runInitializers(this, _addMessage_extraInitializers), __runInitializers(this, _optimizeText_initializers, (prompt, title) => __awaiter(this, void 0, void 0, function* () {
                const { locale, url, } = this.props;
                this.loader = {
                    commandTitle: title !== null && title !== void 0 ? title : prompt,
                    expert: this.props.configuration.experts[this.selectedExpert].name,
                };
                return services_1.Requester.post(url, {
                    text: this.currentValue,
                    message: prompt,
                    expertUuid: this.selectedExpert,
                    locale,
                }).then((0, mobx_1.action)((data) => {
                    this.loader = undefined;
                    this.lastResponse = data;
                    return data.response;
                })).catch((0, mobx_1.action)((error) => {
                    this.loader = undefined;
                    this.lastResponse = { error };
                }));
            })));
            this.handlePredefinedPromptButtonClick = (__runInitializers(this, _optimizeText_extraInitializers), (action) => {
                void this.handleAddMessage(action.prompt, action.name);
            });
            this.handlePredefinedPromptSelectClick = (index) => {
                const { configuration } = this.props;
                const predefinedPrompts = configuration.experts[this.selectedExpert].options.predefinedPrompts || [];
                this.handlePredefinedPromptButtonClick({
                    name: predefinedPrompts[index].name,
                    prompt: predefinedPrompts[index].prompt,
                });
            };
            this.handleExpertSelect = __runInitializers(this, _handleExpertSelect_initializers, (expert) => {
                this.selectedExpert = expert;
            });
            this.handleOnRetry = (__runInitializers(this, _handleExpertSelect_extraInitializers), __runInitializers(this, _handleOnRetry_initializers, (prompt, title) => {
                void this.handleAddMessage(prompt, title);
            }));
            this.handleOnMessageClicked = (__runInitializers(this, _handleOnRetry_extraInitializers), __runInitializers(this, _handleOnMessageClicked_initializers, (index) => {
                this.messages[index].collapsed = !this.messages[index].collapsed;
            }));
            this.handleDialogClose = (__runInitializers(this, _handleOnMessageClicked_extraInitializers), __runInitializers(this, _handleDialogClose_initializers, () => {
                const { onDialogClose } = this.props;
                onDialogClose();
            }));
            this.handleOnInsert = (__runInitializers(this, _handleDialogClose_extraInitializers), __runInitializers(this, _handleOnInsert_initializers, (text) => {
                const { onConfirm, } = this.props;
                // We have to stop the propagation of the event to prevent the focus lose of the input / editor field
                event.stopPropagation();
                onConfirm(text);
            }));
            this.handleOnCopy = (__runInitializers(this, _handleOnInsert_extraInitializers), __runInitializers(this, _handleOnCopy_initializers, (text) => {
                const { messages: { copiedToClipboard: copiedToClipboardMessage, }, } = this.props;
                void navigator.clipboard.writeText(text);
                this.snackbarMessage = copiedToClipboardMessage;
            }));
            this.handleSnackbarCloseClick = (__runInitializers(this, _handleOnCopy_extraInitializers), __runInitializers(this, _handleSnackbarCloseClick_initializers, () => {
                this.snackbarMessage = undefined;
            }));
            __runInitializers(this, _handleSnackbarCloseClick_extraInitializers);
            this.selectedExpert = this.experts[0].uuid;
            // push initial message
            this.messages.push({
                title: this.props.messages.initialMessage,
                text: props.value || '',
                type: props.type,
                collapsed: true,
                displayActions: false,
            });
            this.currentValue = props.value || '';
        }
        get experts() {
            return Object.values(this.props.configuration.experts) || [];
        }
        get expertsButton() {
            if (this.experts === 1) {
                return {
                    name: 'experts',
                    type: 'text',
                    text: this.experts[0].name,
                };
            }
            return {
                name: 'experts',
                type: 'select',
                selected: this.selectedExpert,
                options: this.experts.map((expert) => {
                    return {
                        id: expert.uuid,
                        name: expert.name,
                    };
                }),
                handleClick: this.handleExpertSelect,
            };
        }
        get predefinedPrompts() {
            var _a;
            const { configuration, messages: { predefinedPrompts: predefinedPromptsMessage, }, } = this.props;
            const predefinedPrompts = configuration.experts[this.selectedExpert].options.predefinedPrompts || [];
            return predefinedPrompts.length > 1 ? {
                label: predefinedPromptsMessage,
                options: (_a = predefinedPrompts.map((predefinedPrompt, index) => ({
                    id: index,
                    name: predefinedPrompt.name,
                }))) !== null && _a !== void 0 ? _a : [],
                handleClick: this.handlePredefinedPromptSelectClick,
            } : undefined;
        }
        render() {
            const { action: Action, locale, messages: { writingAssistant: writingAssistantMessage, addMessage: addMessageMessage, send: sendMessage, }, } = this.props;
            const actionNode = Action ? (<Action {...(this.props.actionProps || {})} context={(0, mobx_1.toJS)(this.lastResponse)} source="writing_assistant"/>) : <react_1.default.Fragment />;
            return (<components_1.Overlay onClose={this.handleDialogClose} onSnackbarCloseClick={this.handleSnackbarCloseClick} open={true} size="small" snackbarMessage={this.snackbarMessage} snackbarType="success" title={writingAssistantMessage}>
                {actionNode}

                <div className={writingAssistant_scss_1.default.content}>
                    <div className={writingAssistant_scss_1.default.chat}>
                        <Messages_1.default isLoading={!!this.loader} loader={this.loader} locale={locale} messages={(0, mobx_1.toJS)(this.messages)} onCopy={this.handleOnCopy} onInsert={this.handleOnInsert} onMessageClicked={this.handleOnMessageClicked} onRetry={this.handleOnRetry}/>
                        <PromptInput_1.default experts={this.expertsButton} isLoading={!!this.loader} messages={{
                    addMessage: addMessageMessage,
                    send: sendMessage,
                }} onAddMessage={this.handleAddMessage} predefinedPrompts={this.predefinedPrompts}/>
                    </div>
                </div>
            </components_1.Overlay>);
        }
    };
    __setFunctionName(_classThis, "WritingAssistant");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _messages_decorators = [mobx_1.observable];
        _loader_decorators = [mobx_1.observable];
        _selectedExpert_decorators = [mobx_1.observable];
        _snackbarMessage_decorators = [mobx_1.observable];
        _lastResponse_decorators = [mobx_1.observable];
        _currentValue_decorators = [mobx_1.observable];
        _handleAddMessage_decorators = [mobx_1.action];
        _addMessage_decorators = [mobx_1.action];
        _optimizeText_decorators = [mobx_1.action];
        _handleExpertSelect_decorators = [mobx_1.action];
        _handleOnRetry_decorators = [mobx_1.action];
        _handleOnMessageClicked_decorators = [mobx_1.action];
        _get_experts_decorators = [mobx_1.computed];
        _get_expertsButton_decorators = [mobx_1.computed];
        _get_predefinedPrompts_decorators = [mobx_1.computed];
        _handleDialogClose_decorators = [mobx_1.action];
        _handleOnInsert_decorators = [mobx_1.action];
        _handleOnCopy_decorators = [mobx_1.action];
        _handleSnackbarCloseClick_decorators = [mobx_1.action];
        __esDecorate(_classThis, null, _get_experts_decorators, { kind: "getter", name: "experts", static: false, private: false, access: { has: obj => "experts" in obj, get: obj => obj.experts }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_expertsButton_decorators, { kind: "getter", name: "expertsButton", static: false, private: false, access: { has: obj => "expertsButton" in obj, get: obj => obj.expertsButton }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_predefinedPrompts_decorators, { kind: "getter", name: "predefinedPrompts", static: false, private: false, access: { has: obj => "predefinedPrompts" in obj, get: obj => obj.predefinedPrompts }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: obj => "messages" in obj, get: obj => obj.messages, set: (obj, value) => { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
        __esDecorate(null, null, _loader_decorators, { kind: "field", name: "loader", static: false, private: false, access: { has: obj => "loader" in obj, get: obj => obj.loader, set: (obj, value) => { obj.loader = value; } }, metadata: _metadata }, _loader_initializers, _loader_extraInitializers);
        __esDecorate(null, null, _selectedExpert_decorators, { kind: "field", name: "selectedExpert", static: false, private: false, access: { has: obj => "selectedExpert" in obj, get: obj => obj.selectedExpert, set: (obj, value) => { obj.selectedExpert = value; } }, metadata: _metadata }, _selectedExpert_initializers, _selectedExpert_extraInitializers);
        __esDecorate(null, null, _snackbarMessage_decorators, { kind: "field", name: "snackbarMessage", static: false, private: false, access: { has: obj => "snackbarMessage" in obj, get: obj => obj.snackbarMessage, set: (obj, value) => { obj.snackbarMessage = value; } }, metadata: _metadata }, _snackbarMessage_initializers, _snackbarMessage_extraInitializers);
        __esDecorate(null, null, _lastResponse_decorators, { kind: "field", name: "lastResponse", static: false, private: false, access: { has: obj => "lastResponse" in obj, get: obj => obj.lastResponse, set: (obj, value) => { obj.lastResponse = value; } }, metadata: _metadata }, _lastResponse_initializers, _lastResponse_extraInitializers);
        __esDecorate(null, null, _currentValue_decorators, { kind: "field", name: "currentValue", static: false, private: false, access: { has: obj => "currentValue" in obj, get: obj => obj.currentValue, set: (obj, value) => { obj.currentValue = value; } }, metadata: _metadata }, _currentValue_initializers, _currentValue_extraInitializers);
        __esDecorate(null, null, _handleAddMessage_decorators, { kind: "field", name: "handleAddMessage", static: false, private: false, access: { has: obj => "handleAddMessage" in obj, get: obj => obj.handleAddMessage, set: (obj, value) => { obj.handleAddMessage = value; } }, metadata: _metadata }, _handleAddMessage_initializers, _handleAddMessage_extraInitializers);
        __esDecorate(null, null, _addMessage_decorators, { kind: "field", name: "addMessage", static: false, private: false, access: { has: obj => "addMessage" in obj, get: obj => obj.addMessage, set: (obj, value) => { obj.addMessage = value; } }, metadata: _metadata }, _addMessage_initializers, _addMessage_extraInitializers);
        __esDecorate(null, null, _optimizeText_decorators, { kind: "field", name: "optimizeText", static: false, private: false, access: { has: obj => "optimizeText" in obj, get: obj => obj.optimizeText, set: (obj, value) => { obj.optimizeText = value; } }, metadata: _metadata }, _optimizeText_initializers, _optimizeText_extraInitializers);
        __esDecorate(null, null, _handleExpertSelect_decorators, { kind: "field", name: "handleExpertSelect", static: false, private: false, access: { has: obj => "handleExpertSelect" in obj, get: obj => obj.handleExpertSelect, set: (obj, value) => { obj.handleExpertSelect = value; } }, metadata: _metadata }, _handleExpertSelect_initializers, _handleExpertSelect_extraInitializers);
        __esDecorate(null, null, _handleOnRetry_decorators, { kind: "field", name: "handleOnRetry", static: false, private: false, access: { has: obj => "handleOnRetry" in obj, get: obj => obj.handleOnRetry, set: (obj, value) => { obj.handleOnRetry = value; } }, metadata: _metadata }, _handleOnRetry_initializers, _handleOnRetry_extraInitializers);
        __esDecorate(null, null, _handleOnMessageClicked_decorators, { kind: "field", name: "handleOnMessageClicked", static: false, private: false, access: { has: obj => "handleOnMessageClicked" in obj, get: obj => obj.handleOnMessageClicked, set: (obj, value) => { obj.handleOnMessageClicked = value; } }, metadata: _metadata }, _handleOnMessageClicked_initializers, _handleOnMessageClicked_extraInitializers);
        __esDecorate(null, null, _handleDialogClose_decorators, { kind: "field", name: "handleDialogClose", static: false, private: false, access: { has: obj => "handleDialogClose" in obj, get: obj => obj.handleDialogClose, set: (obj, value) => { obj.handleDialogClose = value; } }, metadata: _metadata }, _handleDialogClose_initializers, _handleDialogClose_extraInitializers);
        __esDecorate(null, null, _handleOnInsert_decorators, { kind: "field", name: "handleOnInsert", static: false, private: false, access: { has: obj => "handleOnInsert" in obj, get: obj => obj.handleOnInsert, set: (obj, value) => { obj.handleOnInsert = value; } }, metadata: _metadata }, _handleOnInsert_initializers, _handleOnInsert_extraInitializers);
        __esDecorate(null, null, _handleOnCopy_decorators, { kind: "field", name: "handleOnCopy", static: false, private: false, access: { has: obj => "handleOnCopy" in obj, get: obj => obj.handleOnCopy, set: (obj, value) => { obj.handleOnCopy = value; } }, metadata: _metadata }, _handleOnCopy_initializers, _handleOnCopy_extraInitializers);
        __esDecorate(null, null, _handleSnackbarCloseClick_decorators, { kind: "field", name: "handleSnackbarCloseClick", static: false, private: false, access: { has: obj => "handleSnackbarCloseClick" in obj, get: obj => obj.handleSnackbarCloseClick, set: (obj, value) => { obj.handleSnackbarCloseClick = value; } }, metadata: _metadata }, _handleSnackbarCloseClick_initializers, _handleSnackbarCloseClick_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WritingAssistant = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WritingAssistant = _classThis;
})();
exports.default = WritingAssistant;
