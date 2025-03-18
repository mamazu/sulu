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
const Input_1 = __importDefault(require("../Input"));
const bindValueToOnChange_1 = __importDefault(require("../../../utils/TestHelper/bindValueToOnChange"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Input should render', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with autoFocus', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default autoFocus={true} onBlur={jest.fn()} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with autocomplete off', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default autocomplete="off" disabled={true} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render as headline', () => {
    const { container } = (0, react_2.render)(<Input_1.default headline={true} onChange={jest.fn()} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with invalid value', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} valid={false} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render when disabled', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default disabled={true} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with icon', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default icon="su-pen" onBlur={jest.fn()} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with inputmode', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default inputMode="numeric" onBlur={jest.fn()} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with type', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} type="password" value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with placeholder', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} placeholder="My placeholder" value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with value', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} value="My value"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render undefined value as empty string', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with a character counter', () => {
    const { container } = (0, react_2.render)(<Input_1.default maxCharacters={2} onBlur={jest.fn()} onChange={jest.fn()} value="asdf"/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with a segment counter', () => {
    const { container } = (0, react_2.render)(<Input_1.default maxSegments={3} onBlur={jest.fn()} onChange={jest.fn()} segmentDelimiter="," value="keyword1, keyword2"/>);
    expect(container).toMatchSnapshot();
});
test('Input should call the callback when the input changes', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<Input_1.default onBlur={jest.fn()} onChange={onChange} value="My value"/>));
    const input = react_2.screen.queryByDisplayValue('My value');
    yield user_event_1.default.type(input, ' - changed');
    expect(onChange).toHaveBeenLastCalledWith('My value - changed', expect.anything());
}));
test('Input should call the callback with undefined if the input value is removed', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_2.render)(<Input_1.default onBlur={jest.fn()} onChange={onChange} value="My value"/>);
    const input = react_2.screen.queryByDisplayValue('My value');
    yield user_event_1.default.clear(input);
    expect(onChange).toHaveBeenCalledWith(undefined, expect.anything());
}));
test('Input should call the callback when icon was clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const handleIconClick = jest.fn();
    (0, react_2.render)(<Input_1.default icon="su-pen" onChange={onChange} onIconClick={handleIconClick} value="My value"/>);
    const icon = react_2.screen.queryByLabelText('su-pen');
    yield user_event_1.default.click(icon);
    expect(handleIconClick).toHaveBeenCalled();
}));
test('Input should call the given focus callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const onFocusSpy = jest.fn();
    (0, react_2.render)(<Input_1.default icon="su-pen" onChange={jest.fn()} onFocus={onFocusSpy} value="My value"/>);
    const input = react_2.screen.queryByDisplayValue('My value');
    expect(onFocusSpy).not.toHaveBeenCalled();
    yield user_event_1.default.click(input);
    expect(onFocusSpy).toHaveBeenCalled();
}));
test('Input should render with a loader', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Input_1.default loading={true} onBlur={jest.fn()} onChange={onChange} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Input should render collapsed', () => {
    const { container } = (0, react_2.render)(<Input_1.default collapsed={true} onChange={jest.fn()} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Input should render append container when onClearClick callback is provided', () => {
    const { container } = (0, react_2.render)(<Input_1.default onChange={jest.fn()} onClearClick={jest.fn()} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Input should render append container with icon when onClearClick callback is provided and value is set', () => {
    const { container } = (0, react_2.render)(<Input_1.default onChange={jest.fn()} onClearClick={jest.fn()} value="test"/>);
    expect(container).toMatchSnapshot();
});
test('Input should should call the callback when clear icon was clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClearClick = jest.fn();
    (0, react_2.render)(<Input_1.default onChange={jest.fn()} onClearClick={onClearClick} value="My value"/>);
    const icon = react_2.screen.queryByLabelText('su-times');
    yield user_event_1.default.click(icon);
    expect(onClearClick).toHaveBeenCalled();
}));
test('Input should render with dark skin', () => {
    const { container } = (0, react_2.render)(<Input_1.default icon="su-pen" onChange={jest.fn()} onClearClick={jest.fn()} skin="dark" value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Input should render with type number with attributes', () => {
    const { container } = (0, react_2.render)(<Input_1.default max={50} min={10} onBlur={jest.fn()} onChange={jest.fn()} step={5} type="number" value={25}/>);
    expect(container).toMatchSnapshot();
});
test('Input should call onFocus when the Input gets focus', () => __awaiter(void 0, void 0, void 0, function* () {
    const focusSpy = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<Input_1.default onChange={jest.fn()} onFocus={focusSpy} value="My value"/>));
    const input = react_2.screen.queryByDisplayValue('My value');
    input.focus();
    expect(focusSpy).toHaveBeenCalled();
}));
