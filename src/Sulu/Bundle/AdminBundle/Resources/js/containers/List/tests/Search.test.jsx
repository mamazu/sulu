"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const Search_1 = __importDefault(require("../Search"));
jest.mock('../../../utils/Translator', () => ({
    translate(key) {
        return key;
    },
}));
test('The component should render collapsed', () => {
    const search = (0, enzyme_1.render)(<Search_1.default onSearch={jest.fn()} value={null}/>);
    expect(search).toMatchSnapshot();
});
test('The component should render not collapsed when value is given', () => {
    const search = (0, enzyme_1.shallow)(<Search_1.default onSearch={jest.fn()} value="search-string"/>);
    expect(search.render()).toMatchSnapshot();
});
test('The component should update the value if a new one is provided', () => {
    const search = (0, enzyme_1.shallow)(<Search_1.default onSearch={jest.fn()} value="search-string"/>);
    expect(search.find('Input').prop('value')).toBe('search-string');
    search.setProps({ value: 'new-search-string' });
    expect(search.find('Input').prop('value')).toBe('new-search-string');
});
test('The component should expand the input when clicking on icon', () => {
    const search = (0, enzyme_1.shallow)(<Search_1.default onSearch={jest.fn()} value={null}/>);
    search.find('Input').simulate('iconClick');
    expect(search.render()).toMatchSnapshot();
});
test('The component should trigger the onSearch callback correctly if Input calls onBlur', () => {
    const onSearch = jest.fn();
    const search = (0, enzyme_1.shallow)(<Search_1.default onSearch={onSearch} value={null}/>);
    const input = search.find('Input');
    input.simulate('iconClick');
    input.simulate('change', 'test-search-value');
    expect(search.instance().value).toBe('test-search-value');
    input.simulate('blur');
    expect(onSearch).toBeCalledWith('test-search-value');
});
test('The component should trigger the onSearch callback correctly if Input calls onKeyPress with enter', () => {
    const onSearch = jest.fn();
    const search = (0, enzyme_1.shallow)(<Search_1.default onSearch={onSearch} value={null}/>);
    const input = search.find('Input');
    input.simulate('iconClick');
    input.simulate('change', 'test-search-value');
    expect(search.instance().value).toBe('test-search-value');
    input.simulate('keyPress', 'Enter');
    expect(onSearch).toBeCalledWith('test-search-value');
});
test('The component should clear the current value if Input calls onClearClick', () => {
    const onSearch = jest.fn();
    const search = (0, enzyme_1.shallow)(<Search_1.default onSearch={onSearch} value={null}/>);
    const input = search.find('Input');
    input.simulate('iconClick');
    input.simulate('change', 'test-search-value');
    expect(search.instance().value).toBe('test-search-value');
    input.simulate('clearClick');
    expect(search.instance().value).toBe(undefined);
    expect(search.instance().collapsed).toBe(true);
    expect(onSearch).toHaveBeenCalledWith(undefined);
});
