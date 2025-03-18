"use strict";
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
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom/extend-expect");
const services_1 = require("../../../services");
const WritingAssistant_1 = __importDefault(require("../WritingAssistant"));
// Mock the Requester and translate functions
jest.mock('../../../services', () => ({
    Requester: {
        post: jest.fn().mockResolvedValue({ response: { text: 'Optimized text' } }),
    },
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
const writeText = jest.fn();
Object.assign(navigator, {
    // $FlowFixMe
    clipboard: {
        writeText,
    },
});
describe('WritingAssistant Component', () => {
    const defaultProps = {
        configuration: {
            experts: {
                '1': { uuid: '1', name: 'Expert 1', options: { predefinedPrompts: [] } },
                '2': { uuid: '2', name: 'Expert 2', options: { predefinedPrompts: [] } },
            },
        },
        locale: 'en',
        messages: {
            addMessage: 'Add Message',
            copiedToClipboard: 'Copied to Clipboard',
            initialMessage: 'Initial Message',
            predefinedPrompts: 'Predefined Prompts',
            send: 'Send',
            writingAssistant: 'Writing Assistant',
        },
        onConfirm: jest.fn(),
        onDialogClose: jest.fn(),
        type: 'text_line',
        url: 'https://example.com/api',
        value: 'Initial value',
    };
    test('renders the WritingAssistant component with initial message', () => {
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps}/>);
        expect(react_2.screen.getByText(defaultProps.messages.writingAssistant)).toBeInTheDocument();
        expect(react_2.screen.getByText(defaultProps.messages.initialMessage)).toBeInTheDocument();
    });
    test('renders the expert select dropdown when multiple experts are available', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByText('Expert 1'));
        expect(react_2.screen.getAllByText('Expert 1')[1]).toBeInTheDocument();
        expect(react_2.screen.getAllByText('Expert 2')[0]).toBeInTheDocument();
    }));
    test('renders the predefined prompts dropdown when predefinedPrompts are available', () => __awaiter(void 0, void 0, void 0, function* () {
        const predefinedPrompts = [
            { id: 1, name: 'Prompt 1', prompt: 'Prompt 1 text' },
            { id: 2, name: 'Prompt 2', prompt: 'Prompt 2 text' },
        ];
        const configuration = Object.assign(Object.assign({}, defaultProps.configuration), { experts: {
                '1': Object.assign(Object.assign({}, defaultProps.configuration.experts['1']), { options: { predefinedPrompts } }),
            } });
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps} configuration={configuration}/>);
        yield user_event_1.default.click(react_2.screen.getByText(defaultProps.messages.predefinedPrompts));
        expect(react_2.screen.getByText('Prompt 1')).toBeInTheDocument();
        expect(react_2.screen.getByText('Prompt 2')).toBeInTheDocument();
    }));
    test('calls onAddMessage when a message is added', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps}/>);
        const input = react_2.screen.getByPlaceholderText(defaultProps.messages.addMessage);
        yield user_event_1.default.type(input, 'Test message{enter}');
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('Optimized text')).toBeInTheDocument();
        });
        expect(services_1.Requester.post).toHaveBeenCalledWith('https://example.com/api', {
            expertUuid: '1',
            locale: 'en',
            message: 'Test message',
            text: 'Initial value',
        });
    }));
    test('calls onConfirm when the insert button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps}/>);
        const input = react_2.screen.getByPlaceholderText(defaultProps.messages.addMessage);
        yield user_event_1.default.type(input, 'Test message{enter}');
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('Optimized text')).toBeInTheDocument();
        });
        const insertButton = react_2.screen.getByText('sulu_admin.insert');
        yield user_event_1.default.click(insertButton);
        expect(defaultProps.onConfirm).toHaveBeenCalledWith('Optimized text');
    }));
    test('calls onDialogClose when the close button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps}/>);
        const closeButton = react_2.screen.getAllByRole('button', { name: /su-times/i })[0];
        yield user_event_1.default.click(closeButton);
        expect(defaultProps.onDialogClose).toHaveBeenCalled();
    }));
    test('navigator clipboard writeText should be called when text is copied to clipboard', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<WritingAssistant_1.default {...defaultProps}/>);
        const input = react_2.screen.getByPlaceholderText(defaultProps.messages.addMessage);
        yield user_event_1.default.type(input, 'Test message{enter}');
        yield (0, react_2.waitFor)(() => {
            expect(react_2.screen.getByText('Optimized text')).toBeInTheDocument();
        });
        const copyButton = react_2.screen.getAllByRole('button', { name: /su-copy/i })[1];
        yield user_event_1.default.click(copyButton);
        expect(writeText).toHaveBeenCalledWith('Optimized text');
    }));
});
