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
const Phone_1 = __importDefault(require("../Phone"));
const bindValueToOnChange_1 = __importDefault(require("../../../utils/TestHelper/bindValueToOnChange"));
test('Phone should render', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Phone_1.default onChange={onChange} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Phone should render with placeholder', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Phone_1.default onChange={onChange} placeholder="My placeholder" value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Phone should render with value', () => {
    const onChange = jest.fn();
    const value = 'test@test.com';
    const { container } = (0, react_2.render)(<Phone_1.default onChange={onChange} value={value}/>);
    expect(container).toMatchSnapshot();
});
test('Phone should render null value as empty string', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Phone_1.default onChange={onChange} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Phone should render error', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Phone_1.default onChange={onChange} valid={false} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Phone should render when disabled', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Phone_1.default disabled={true} onChange={onChange} valid={false} value="‚+43245"/>);
    expect(container).toMatchSnapshot();
});
test('Phone should trigger callbacks correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<Phone_1.default onBlur={onBlur} onChange={onChange} value={null}/>));
    const input = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.type(input, '+123');
    expect(onChange).toHaveBeenLastCalledWith('+123', expect.anything());
    yield user_event_1.default.tab();
    expect(onBlur).toBeCalled();
    expect(onBlur).toHaveBeenCalledTimes(1);
}));
test('Phone should not set onIconClick when value is not set', () => __awaiter(void 0, void 0, void 0, function* () {
    const redirectSpy = jest.fn();
    delete window.location;
    window.location = { assign: redirectSpy };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)(<Phone_1.default onBlur={onBlur} onChange={onChange} value={null}/>);
    const icon = react_2.screen.queryByLabelText('su-phone');
    yield user_event_1.default.click(icon);
    expect(redirectSpy).not.toHaveBeenCalled();
}));
test('Phone should set onIconClick when value is set', () => __awaiter(void 0, void 0, void 0, function* () {
    const redirectSpy = jest.fn();
    delete window.location;
    window.location = { assign: redirectSpy };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)(<Phone_1.default onBlur={onBlur} onChange={onChange} value="+123"/>);
    const icon = react_2.screen.queryByLabelText('su-phone');
    yield user_event_1.default.click(icon);
    expect(redirectSpy).toHaveBeenCalled();
}));
test('Phone should set onIconClick when value is valid and window should be opened', () => __awaiter(void 0, void 0, void 0, function* () {
    const redirectSpy = jest.fn();
    delete window.location;
    window.location = { assign: redirectSpy };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)(<Phone_1.default onBlur={onBlur} onChange={onChange} value="+123"/>);
    const icon = react_2.screen.queryByLabelText('su-phone');
    yield user_event_1.default.click(icon);
    expect(redirectSpy).toHaveBeenLastCalledWith('tel:+123');
}));
