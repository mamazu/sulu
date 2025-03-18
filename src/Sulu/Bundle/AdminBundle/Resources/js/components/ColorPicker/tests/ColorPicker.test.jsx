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
const ColorPicker_1 = __importDefault(require("../ColorPicker"));
const bindValueToOnChange_1 = __importDefault(require("../../../utils/TestHelper/bindValueToOnChange"));
test('ColorPicker should render', () => __awaiter(void 0, void 0, void 0, function* () {
    const { baseElement } = (0, react_2.render)(<ColorPicker_1.default onChange={jest.fn()} placeholder="My placeholder" value="#abc"/>);
    const icon = react_2.screen.queryByLabelText('su-square');
    yield user_event_1.default.click(icon);
    expect(baseElement).toMatchSnapshot();
}));
test('ColorPicker should disable Input when disabled', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_2.render)(<ColorPicker_1.default disabled={true} onChange={jest.fn()} value="#abc"/>);
    const input = react_2.screen.queryByDisplayValue('#abc');
    const icon = react_2.screen.queryByLabelText('su-square');
    yield user_event_1.default.click(icon);
    expect(input).toBeDisabled();
}));
test('ColorPicker should render error', () => {
    const { container } = (0, react_2.render)(<ColorPicker_1.default onChange={jest.fn()} valid={false} value="#abc"/>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.error')).toBeInTheDocument();
});
test('ColorPicker should show error when invalid value is set', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_2.render)(<ColorPicker_1.default onChange={onChange} value="#abc"/>);
    const input = react_2.screen.queryByDisplayValue('#abc');
    yield user_event_1.default.type(input, 'xxx');
    expect(onChange).toHaveBeenCalledWith(undefined);
    yield user_event_1.default.type(input, '#ccc');
    expect(input).toBeValid();
}));
test('ColorPicker should trigger callbacks correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<ColorPicker_1.default onBlur={onBlur} onChange={onChange} value="#abc"/>));
    const input = react_2.screen.queryByDisplayValue('#abc');
    // provide invalid value
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, 'xxx');
    expect(onChange).toBeCalledWith(undefined);
    // provide one more invalid value
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, 'abc');
    expect(onChange).toBeCalledWith(undefined);
    // now add a valid value
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, '#abc');
    expect(onChange).toBeCalledWith('#abc');
    yield user_event_1.default.tab(); // tab away from input
    expect(onBlur).toBeCalled();
}));
test('ColorPicker should call the correct callbacks when value from overlay was selected', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)((<ColorPicker_1.default onBlur={onBlur} onChange={onChange} value="#abc"/>));
    const icon = react_2.screen.queryByLabelText('su-square');
    yield user_event_1.default.click(icon);
    const overlayInput = react_2.screen.queryByDisplayValue('AABBCC');
    yield user_event_1.default.clear(overlayInput);
    yield user_event_1.default.type(overlayInput, 'cccccc');
    // wait for "react-color" component to fire callback: https://github.com/casesandberg/react-color/issues/516
    yield new Promise((resolve) => setTimeout(resolve, 100));
    expect(overlayInput).toHaveValue('cccccc');
    expect(onChange).toBeCalledWith('#cccccc');
}));
