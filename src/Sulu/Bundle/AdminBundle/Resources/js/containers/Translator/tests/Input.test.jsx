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
const mobx_1 = require("mobx");
const Input_1 = __importDefault(require("../Input"));
const containers_1 = require("../../../containers");
jest.mock('../../../containers', () => ({
    TextEditor: jest.fn(() => <div data-testid="text-editor"/>),
}));
jest.mock('../translator.scss', () => ({
    input: 'input-class',
    textarea: 'textarea-class',
    texteditor: 'texteditor-class',
}));
describe('Input', () => {
    test('renders textarea for text_line and text_area types', () => {
        (0, react_2.render)(<Input_1.default text="Test" type="text_line"/>);
        expect(react_2.screen.getByRole('textbox')).toBeInTheDocument();
    });
    test('renders TextEditor for text_editor type', () => {
        (0, react_2.render)(<Input_1.default text="Test" type="text_editor"/>);
        expect(react_2.screen.getByTestId('text-editor')).toBeInTheDocument();
    });
    test('calls onChange when textarea value changes', () => __awaiter(void 0, void 0, void 0, function* () {
        const text = mobx_1.observable.box('Initial');
        const onChange = (value) => text.set(value);
        // eslint-disable-next-line react/jsx-no-bind
        (0, react_2.render)(<Input_1.default onChange={onChange} text={text} type="text_area"/>);
        const textarea = react_2.screen.getByRole('textbox');
        yield user_event_1.default.type(textarea, ' Text');
        expect(text.get()).toBe('Initial Text');
    }));
    test('calls onChange when TextEditor value changes', () => {
        const onChange = jest.fn();
        (0, react_2.render)(<Input_1.default onChange={onChange} text="Initial" type="text_editor"/>);
        const textEditor = containers_1.TextEditor.mock.calls[0][0];
        textEditor.onChange('New Text');
        expect(onChange).toHaveBeenCalledWith('New Text');
    });
    test('applies correct CSS classes to textarea', () => {
        (0, react_2.render)(<Input_1.default text="Test" type="text_line"/>);
        const textarea = react_2.screen.getByRole('textbox');
        expect(textarea).toHaveClass('input-class', 'textarea-class');
    });
    test('applies correct CSS classes to TextEditor wrapper', () => {
        (0, react_2.render)(<Input_1.default text="Test" type="text_editor"/>);
        const wrapper = react_2.screen.getByTestId('text-editor').parentElement;
        expect(wrapper).toHaveClass('input-class', 'texteditor-class');
    });
    test('disables TextEditor when onChange is not provided', () => {
        (0, react_2.render)(<Input_1.default text="Test" type="text_editor"/>);
        const textEditor = containers_1.TextEditor.mock.calls[0][0];
        expect(textEditor.disabled).toBe(true);
    });
});
