"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ResetPasswordForm_1 = __importDefault(require("../ResetPasswordForm"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn(function (key) {
        return key;
    }),
}));
test('Should render the component', () => {
    expect((0, enzyme_1.render)(<ResetPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should render the component loading', () => {
    expect((0, enzyme_1.render)(<ResetPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={jest.fn()}/>)).toMatchSnapshot();
});
test('Should trigger onChangeForm correctly', () => {
    const onChangeForm = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ResetPasswordForm_1.default onChangeForm={onChangeForm} onSubmit={jest.fn()}/>);
    resetForm.find('Button').at(0).simulate('click');
    expect(onChangeForm).toBeCalled();
});
test('Should not trigger onSubmit if passwords are missing', () => {
    const onSubmit = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ResetPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    resetForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    expect(onSubmit).not.toBeCalled();
});
test('Should trigger onSubmit correctly', () => {
    const onSubmit = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ResetPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    resetForm.find('Input[icon="su-lock"]').at(0).prop('onChange')('testpassword');
    resetForm.find('Input[icon="su-lock"]').at(1).prop('onChange')('testpassword');
    resetForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    expect(onSubmit).toBeCalledWith({ password: 'testpassword' });
});
test('Should not trigger onSubmit if one password is missing', () => {
    const onSubmit = jest.fn();
    const resetForm = (0, enzyme_1.shallow)(<ResetPasswordForm_1.default onChangeForm={jest.fn()} onSubmit={onSubmit}/>);
    const event = {
        preventDefault: jest.fn(),
    };
    resetForm.find('Input[icon="su-lock"]').at(0).prop('onChange')('testpassword');
    resetForm.find('form').prop('onSubmit')(event);
    expect(event.preventDefault).toBeCalledWith();
    resetForm.update();
    expect(resetForm.find('Input[valid=false]')).toHaveLength(2);
});
