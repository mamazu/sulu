"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ForgotPasswordForm_1 = __importDefault(require("../ForgotPasswordForm"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn(function (key) {
        return key;
    }),
}));
test('Should render the component', () => {
    expect((0, enzyme_1.render)(<ForgotPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should render the component loading', () => {
    expect((0, enzyme_1.render)(<ForgotPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should render the component with success', () => {
    expect((0, enzyme_1.render)(<ForgotPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={jest.fn()} success={true}/>)).toMatchSnapshot();
});
test('Should trigger onChangeForm correctly', () => {
    const onChangeForm = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ForgotPasswordForm_1.default onChangeForm={onChangeForm} onSubmit={jest.fn()}/>);
    resetForm.find('Button').at(0).simulate('click');
    expect(onChangeForm).toBeCalled();
});
test('Should not trigger onSubmit if user is missing', () => {
    const onSubmit = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ForgotPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    resetForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    expect(onSubmit).not.toBeCalled();
});
test('Should trigger onSubmit correctly', () => {
    const onSubmit = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ForgotPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    resetForm.find('Input[icon="su-user"]').prop('onChange')('testusername');
    resetForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    expect(onSubmit).toBeCalledWith({ user: 'testusername' });
});
