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
const TextArea_1 = __importDefault(require("../TextArea"));
const bindValueToOnChange_1 = __importDefault(require("../../../utils/TestHelper/bindValueToOnChange"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('TextArea should render', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default onChange={jest.fn()} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should render with error', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default onChange={jest.fn()} valid={false} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should render with placeholder', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default onChange={jest.fn()} placeholder="My placeholder" value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should render with value', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default onChange={jest.fn()} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should render when disabled', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default disabled={true} onChange={jest.fn()} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should render null value as empty string', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default onChange={jest.fn()} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should render with value and character counter', () => {
    const { container } = (0, react_2.render)(<TextArea_1.default maxCharacters={10} onChange={jest.fn()} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('TextArea should call onBlur when it loses focus', () => __awaiter(void 0, void 0, void 0, function* () {
    const blurSpy = jest.fn();
    (0, react_2.render)(<TextArea_1.default onBlur={blurSpy} onChange={jest.fn()} value=""/>);
    const textarea = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.click(textarea);
    expect(blurSpy).not.toBeCalledWith();
    yield user_event_1.default.tab();
    expect(blurSpy).toBeCalledWith();
}));
test('TextArea should call onChange when the TextArea changes', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<TextArea_1.default onChange={changeSpy} value="My value"/>));
    const textarea = react_2.screen.queryByDisplayValue('My value');
    yield user_event_1.default.type(textarea, ' - changed');
    expect(changeSpy).toHaveBeenLastCalledWith('My value - changed');
}));
test('TextArea should call onChange with undefined when the TextArea changes to empty', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<TextArea_1.default onChange={changeSpy} value="My value"/>);
    const textarea = react_2.screen.queryByDisplayValue('My value');
    yield user_event_1.default.clear(textarea);
    expect(changeSpy).toHaveBeenCalledWith(undefined);
}));
test('TextArea should call onFocus when the TextArea gets focus', () => __awaiter(void 0, void 0, void 0, function* () {
    const focusSpy = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<TextArea_1.default onChange={jest.fn()} onFocus={focusSpy} value="My value"/>));
    const textarea = react_2.screen.queryByDisplayValue('My value');
    textarea.focus();
    expect(focusSpy).toHaveBeenCalled();
}));
