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
const Message_1 = __importDefault(require("../Message"));
jest.mock('../../../containers', () => ({
    TextEditor: jest.fn(({ value, }) => <div data-testid="text-editor">{value}</div>),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
describe('Message Component', () => {
    const defaultProps = {
        expert: 'Test Expert',
        collapsed: false,
        command: 'Test Command',
        displayActions: true,
        index: 0,
        isLoading: false,
        locale: 'en',
        onClick: jest.fn(),
        onCopy: jest.fn(),
        onInsert: jest.fn(),
        onRetry: jest.fn(),
        text: 'This is a test message.',
        type: 'text_line',
    };
    test('renders the commandTitle and text', () => {
        (0, react_2.render)(<Message_1.default {...defaultProps}/>);
        expect(react_2.screen.getByText(defaultProps.command)).toBeInTheDocument();
        expect(react_2.screen.getByText(defaultProps.text)).toBeInTheDocument();
    });
    test('renders the expert if provided', () => {
        (0, react_2.render)(<Message_1.default {...defaultProps} expert="Test Expert"/>);
        expect(react_2.screen.getByText('Test Expert')).toBeInTheDocument();
    });
    test('renders the actions buttons if displayActions is true', () => {
        (0, react_2.render)(<Message_1.default {...defaultProps}/>);
        expect(react_2.screen.getByText('sulu_admin.insert')).toBeInTheDocument();
        expect(react_2.screen.getAllByRole('button', { name: /su-sync/i })[0]).toBeInTheDocument();
        expect(react_2.screen.getAllByRole('button', { name: /su-copy/i })[0]).toBeInTheDocument();
    });
    test('does not render actions buttons if displayActions is false', () => {
        (0, react_2.render)(<Message_1.default {...defaultProps} displayActions={false}/>);
        expect(react_2.screen.queryByText('sulu_admin.insert')).not.toBeInTheDocument();
        expect(react_2.screen.queryAllByRole('button', { name: /su-sync/i })[0]).toBeUndefined();
        expect(react_2.screen.queryAllByRole('button', { name: /su-copy/i })[0]).toBeUndefined();
    });
    test('calls onClick when the message is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<Message_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByText(defaultProps.text));
        expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.index);
    }));
    test('calls onRetry when the retry button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<Message_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getAllByRole('button', { name: /su-sync/i })[1]);
        expect(defaultProps.onRetry).toHaveBeenCalledWith(defaultProps.index);
    }));
    test('calls onCopy when the copy button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<Message_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getAllByRole('button', { name: /su-copy/i })[1]);
        expect(defaultProps.onCopy).toHaveBeenCalledWith(defaultProps.text);
    }));
    test('calls onInsert when the insert button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_2.render)(<Message_1.default {...defaultProps}/>);
        yield user_event_1.default.click(react_2.screen.getByText('sulu_admin.insert'));
        expect(defaultProps.onInsert).toHaveBeenCalledWith(defaultProps.text);
    }));
    test('renders trimmed text when collapsed is true', () => {
        const longText = 'This is a very long text that should be trimmed when collapsed '
            + 'and only 70 characters should be shown followed by "...".';
        (0, react_2.render)(<Message_1.default {...defaultProps} collapsed={true} text={longText}/>);
        expect(react_2.screen.getByText(/This is a very long text that should be trimmed when collapsed and ... followed by "..."/)).toBeInTheDocument();
    });
    test('renders TextEditor when type is text_editor and not collapsed', () => {
        (0, react_2.render)(<Message_1.default {...defaultProps} type="text_editor"/>);
        expect(react_2.screen.getByText(defaultProps.text)).toBeInTheDocument();
    });
});
