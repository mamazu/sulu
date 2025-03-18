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
const PromptInput_1 = __importDefault(require("../PromptInput"));
jest.mock('../../../containers', () => ({
    TextEditor: jest.fn(({ value, }) => <div data-testid="text-editor">{value}</div>),
}));
jest.mock('../../../utils', () => ({
    translate: (key) => key,
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
describe('PromptInput Component', () => {
    const defaultProps = {
        experts: {
            name: 'Expert Name',
            text: 'Expert Text',
            type: 'text',
        },
        isLoading: false,
        onAddMessage: jest.fn().mockResolvedValue(undefined),
        predefinedPrompts: null,
        messages: {
            send: 'Send',
            addMessage: 'Add Message',
        },
    };
    test('renders the expert text when type is text', () => {
        (0, react_2.render)(<PromptInput_1.default {...defaultProps}/>);
        expect(react_2.screen.getAllByText(defaultProps.experts.text)[0]).toBeInTheDocument();
    });
    test('renders the SingleSelect when type is select', () => __awaiter(void 0, void 0, void 0, function* () {
        const selectExperts = {
            name: 'Expert Name',
            options: [
                { id: '1', name: 'Option 1' },
                { id: '2', name: 'Option 2' },
            ],
            selected: '1',
            type: 'select',
            handleClick: jest.fn(),
        };
        (0, react_2.render)(<PromptInput_1.default {...defaultProps} experts={selectExperts}/>);
        yield user_event_1.default.click(react_2.screen.getAllByText('Option 1')[0]);
        expect(react_2.screen.getAllByText('Option 1')[0]).toBeInTheDocument();
        expect(react_2.screen.getAllByText('Option 2')[0]).toBeInTheDocument();
    }));
    test('renders the predefined prompts dropdown when predefinedPrompts is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const predefinedPrompts = {
            handleClick: jest.fn(),
            label: 'Predefined Prompts',
            options: [
                { id: 1, name: 'Prompt 1' },
                { id: 2, name: 'Prompt 2' },
            ],
        };
        (0, react_2.render)(<PromptInput_1.default {...defaultProps} predefinedPrompts={predefinedPrompts}/>);
        expect(react_2.screen.getByText(predefinedPrompts.label)).toBeInTheDocument();
        yield user_event_1.default.click(react_2.screen.getByText(predefinedPrompts.label));
        expect(react_2.screen.getByText('Prompt 1')).toBeInTheDocument();
        expect(react_2.screen.getByText('Prompt 2')).toBeInTheDocument();
    }));
    test('calls onAddMessage when the send button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<PromptInput_1.default {...defaultProps}/>);
        const input = react_2.screen.getByPlaceholderText('Add Message');
        yield user_event_1.default.type(input, 'Test message');
        yield user_event_1.default.click(react_2.screen.getByText('Send'));
        expect(defaultProps.onAddMessage).toHaveBeenCalledWith('Test message');
    }));
    test('calls onAddMessage when Enter key is pressed', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<PromptInput_1.default {...defaultProps}/>);
        const input = react_2.screen.getByPlaceholderText('Add Message');
        yield user_event_1.default.type(input, 'Test message{enter}');
        expect(defaultProps.onAddMessage).toHaveBeenCalledWith('Test message');
    }));
    test('does not call onAddMessage when input is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<PromptInput_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByRole('button', 'Send'));
        expect(defaultProps.onAddMessage).not.toHaveBeenCalled();
    }));
    test('disables the send button when input is empty', () => {
        (0, react_2.render)(<PromptInput_1.default {...defaultProps}/>);
        const button = react_2.screen.getByRole('button', 'Send');
        expect(button).toBeDisabled();
    });
    test('enables the send button when input is not empty', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<PromptInput_1.default {...defaultProps}/>);
        const input = react_2.screen.getByPlaceholderText('Add Message');
        yield user_event_1.default.type(input, 'Test message');
        const button = react_2.screen.getByText('Send');
        expect(button).toBeEnabled();
    }));
});
