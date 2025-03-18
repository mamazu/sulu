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
const Email_1 = __importDefault(require("../Email"));
test('Email should render', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Email_1.default onChange={onChange} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Email should render with placeholder', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Email_1.default onChange={onChange} placeholder="My placeholder" value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Email should render with value', () => {
    const onChange = jest.fn();
    const value = 'test@test.com';
    const { container } = (0, react_2.render)(<Email_1.default onChange={onChange} value={value}/>);
    expect(container).toMatchSnapshot();
});
test('Email should render when disabled', () => {
    const onChange = jest.fn();
    const value = 'test@test.com';
    const { container } = (0, react_2.render)(<Email_1.default disabled={true} onChange={onChange} value={value}/>);
    expect(container).toMatchSnapshot();
});
test('Email should render null value as empty string', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Email_1.default onChange={onChange} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Email should render error', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<Email_1.default onChange={onChange} valid={false} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('Email should not set onIconClick when value is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
    delete window.location;
    window.location = { assign: jest.fn() };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)(<Email_1.default onBlur={onBlur} onChange={onChange} valid={false} value={null}/>);
    const icon = react_2.screen.queryByLabelText('su-envelope');
    yield user_event_1.default.click(icon);
    expect(window.location.assign).not.toBeCalled();
}));
test('Email should set onIconClick when value is valid and window should be opened', () => __awaiter(void 0, void 0, void 0, function* () {
    delete window.location;
    window.location = { assign: jest.fn() };
    const onChange = jest.fn();
    const onBlur = jest.fn();
    (0, react_2.render)(<Email_1.default onBlur={onBlur} onChange={onChange} valid={true} value="abc@abc.abc"/>);
    const icon = react_2.screen.queryByLabelText('su-envelope');
    yield user_event_1.default.click(icon);
    expect(window.location.assign).toBeCalledWith('mailto:abc@abc.abc');
}));
