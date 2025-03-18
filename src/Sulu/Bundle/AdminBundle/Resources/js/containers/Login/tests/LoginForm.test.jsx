"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const LoginForm_1 = __importDefault(require("../LoginForm"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn(function (key) {
        return key;
    }),
}));
test('Should render the component', () => {
    expect((0, enzyme_1.render)(<LoginForm_1.default onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should render the component loading', () => {
    expect((0, enzyme_1.render)(<LoginForm_1.default loading={true} onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should render the component with error', () => {
    expect((0, enzyme_1.render)(<LoginForm_1.default error={true} onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should trigger onChangeForm correctly', () => {
    const onChangeForm = jest.fn();
    const loginForm = (0, enzyme_1.shallow)(<LoginForm_1.default onChangeForm={onChangeForm} onSubmit={jest.fn()}/>);
    loginForm.find('Button').at(0).simulate('click');
    expect(onChangeForm).toBeCalled();
});
test('Should not trigger onSubmit if password or user is missing', () => {
    const onSubmit = jest.fn();
    const loginForm = (0, enzyme_1.shallow)(<LoginForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    loginForm.find('Input[icon="su-user"]').prop('onChange')('Max');
    loginForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    expect(onSubmit).not.toBeCalled();
});
test('Should trigger onSubmit correctly', () => {
    const onSubmit = jest.fn();
    const loginForm = (0, enzyme_1.shallow)(<LoginForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    loginForm.find('Input[icon="su-user"]').prop('onChange')('Max');
    loginForm.find('Input[icon="su-lock"]').prop('onChange')('max');
    loginForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    expect(onSubmit).toBeCalledWith({ username: 'Max', password: 'max' });
});
