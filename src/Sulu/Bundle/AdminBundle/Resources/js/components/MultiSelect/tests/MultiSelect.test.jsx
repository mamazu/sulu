"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const Select_1 = __importDefault(require("../../Select"));
const MultiSelect_1 = __importDefault(require("../../MultiSelect"));
const Option = MultiSelect_1.default.Option;
const Divider = MultiSelect_1.default.Divider;
jest.mock('../../Select');
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
test('The component should render a generic select', () => {
    const onChange = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChange}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    expect(select.getElement().type).toBe(Select_1.default);
});
test('The component should pass the disabled value to the select component', () => {
    const onChange = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" disabled={true} noneSelectedText="None selected" onChange={onChange}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
        </MultiSelect_1.default>);
    expect(select.find(Select_1.default).props().disabled).toBe(true);
});
test('The component should pass the correct display value if nothing is selected', () => {
    const onChange = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChange}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    const displayValue = select.find(Select_1.default).props().displayValue;
    expect(displayValue).toBe('None selected');
});
test('The component should pass the correct display value if everything is selected', () => {
    const onChange = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChange} values={['option-1', 'option-2', 'option-3']}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    const displayValue = select.find(Select_1.default).props().displayValue;
    expect(displayValue).toBe('All selected');
});
test('The component should pass the correct display value if some options are selected', () => {
    const onChange = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChange} values={['option-1', 'option-2']}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    const displayValue = select.find(Select_1.default).props().displayValue;
    expect(displayValue).toBe('Option 1, Option 2');
});
test('The component should select the correct option', () => {
    const onChange = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChange} values={['option-1', 'option-2']}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    const isOptionSelected = select.find(Select_1.default).props().isOptionSelected;
    expect(isOptionSelected({ props: { value: 'option-1' } })).toBe(true);
    expect(isOptionSelected({ props: { value: 'option-2' } })).toBe(true);
    expect(isOptionSelected({ props: { value: 'option-3' } })).toBe(false);
});
test('The component should trigger the change callback on select with an added value', () => {
    const onChangeSpy = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChangeSpy} values={['option-1', 'option-2']}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    select.find(Select_1.default).props().onSelect('option-3');
    expect(onChangeSpy).toHaveBeenCalledWith(['option-1', 'option-2', 'option-3']);
});
test('The component should trigger the change callback on select with a removed value', () => {
    const onChangeSpy = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default allSelectedText="All selected" noneSelectedText="None selected" onChange={onChangeSpy} values={['option-1', 'option-2']}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </MultiSelect_1.default>);
    select.find(Select_1.default).props().onSelect('option-2');
    expect(onChangeSpy).toHaveBeenCalledWith(['option-1']);
});
test('The component should trigger the close callback when the MultiSelect is closed', () => {
    const closeSpy = jest.fn();
    const select = (0, enzyme_1.shallow)(<MultiSelect_1.default onChange={jest.fn()} onClose={closeSpy}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
        </MultiSelect_1.default>);
    expect(closeSpy).not.toBeCalled();
    select.find(Select_1.default).prop('onClose')();
    expect(closeSpy).toBeCalled();
});
