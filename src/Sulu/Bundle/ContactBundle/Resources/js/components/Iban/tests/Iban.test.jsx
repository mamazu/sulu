"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Iban_1 = __importDefault(require("../Iban"));
test('Iban should render', () => {
    const onChange = jest.fn();
    expect((0, enzyme_1.render)(<Iban_1.default onChange={onChange} value={null}/>)).toMatchSnapshot();
});
test('Iban should render with placeholder', () => {
    expect((0, enzyme_1.render)(<Iban_1.default onChange={jest.fn()} placeholder="My placeholder" value={null}/>)).toMatchSnapshot();
});
test('Iban should render with value', () => {
    const iban = (0, enzyme_1.mount)(<Iban_1.default onChange={jest.fn()} value="AT61 1904 3002 3457 3201"/>);
    expect(iban.render()).toMatchSnapshot();
});
test('Iban should render when disabled', () => {
    expect((0, enzyme_1.render)(<Iban_1.default disabled={true} onChange={jest.fn()} value="AT61 1904 3002 3457 3201"/>)).toMatchSnapshot();
});
test('Iban should render error', () => {
    expect((0, enzyme_1.render)(<Iban_1.default onChange={jest.fn()} valid={false} value={null}/>)).toMatchSnapshot();
});
test('Iban should trigger callbacks correctly', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const iban = (0, enzyme_1.mount)(<Iban_1.default onBlur={onBlur} onChange={onChange} value={null}/>);
    // provide invalid value
    iban.find('Input').instance().props.onChange('xxx', { target: { value: 'xxx' } });
    iban.find('Input').instance().props.onBlur();
    iban.update();
    expect(onChange).toBeCalledWith('xxx');
    expect(onBlur).toBeCalled();
    // provide one more invalid value
    iban.find('Input').instance().props.onChange('abc', { target: { value: 'abc' } });
    iban.find('Input').instance().props.onBlur();
    iban.update();
    expect(onChange).toBeCalledWith('abc');
    expect(onBlur).toBeCalled();
    // now add a valid value
    iban.find('Input').instance().props.onChange('AT611904300234573201', { target: { value: 'AT611904300234573201' } });
    iban.find('Input').instance().props.onBlur();
    iban.update();
    expect(onChange).toBeCalledWith('AT611904300234573201');
    expect(onBlur).toBeCalled();
    expect(onBlur).toHaveBeenCalledTimes(3);
});
