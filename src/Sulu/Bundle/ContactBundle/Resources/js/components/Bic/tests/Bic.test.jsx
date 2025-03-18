"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Bic_1 = __importDefault(require("../Bic"));
test('Bic should render', () => {
    const onChange = jest.fn();
    expect((0, enzyme_1.render)(<Bic_1.default onChange={onChange} value={null}/>)).toMatchSnapshot();
});
test('Bic should render with placeholder', () => {
    expect((0, enzyme_1.render)(<Bic_1.default onChange={jest.fn()} placeholder="My placeholder" value={null}/>)).toMatchSnapshot();
});
test('Bic should render with value', () => {
    const bic = (0, enzyme_1.mount)(<Bic_1.default onChange={jest.fn()} value="BBBBCCLLXXX"/>);
    expect(bic.render()).toMatchSnapshot();
});
test('Bic should render when disabled', () => {
    expect((0, enzyme_1.render)(<Bic_1.default disabled={true} onChange={jest.fn()} value="BBBBCCLLXXX"/>)).toMatchSnapshot();
});
test('Bic should render error', () => {
    expect((0, enzyme_1.render)(<Bic_1.default onChange={jest.fn()} valid={false} value={null}/>)).toMatchSnapshot();
});
test('Bic should trigger callbacks correctly', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const bic = (0, enzyme_1.mount)(<Bic_1.default onBlur={onBlur} onChange={onChange} value={null}/>);
    // provide invalid value
    bic.find('Input').instance().props.onChange('xxx', { target: { value: 'xxx' } });
    bic.find('Input').instance().props.onBlur();
    bic.update();
    expect(onChange).toHaveBeenLastCalledWith('xxx');
    expect(onBlur).toBeCalled();
    // provide one more invalid value
    bic.find('Input').instance().props.onChange('BBBBCCLLX', { target: { value: 'BBBCCLLX' } });
    bic.find('Input').instance().props.onBlur();
    bic.update();
    expect(onChange).toHaveBeenLastCalledWith('BBBBCCLLX');
    expect(onBlur).toBeCalled();
    // now add a valid value
    bic.find('Input').instance().props.onChange('BBBBCCLLXXX', { target: { value: 'BBBBCCLLXXX' } });
    bic.find('Input').instance().props.onBlur();
    bic.update();
    expect(onChange).toHaveBeenLastCalledWith('BBBBCCLLXXX');
    expect(onBlur).toBeCalled();
    // provide one more valid value
    bic.find('Input').instance().props.onChange('BBBBCCLL', { target: { value: 'BBBBCCLL' } });
    bic.find('Input').instance().props.onBlur();
    bic.update();
    expect(onChange).toHaveBeenLastCalledWith('BBBBCCLL');
    expect(onBlur).toBeCalled();
    expect(onBlur).toHaveBeenCalledTimes(4);
});
