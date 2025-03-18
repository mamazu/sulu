"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const KeyValue_1 = __importDefault(require("../../ruleTypes/KeyValue"));
test('Render a KeyValue RuleType', () => {
    const options = {
        keyPlaceholder: 'key',
        valuePlaceholder: 'value',
    };
    expect((0, enzyme_1.render)(<KeyValue_1.default onChange={jest.fn()} options={options} value={{}}/>)).toMatchSnapshot();
});
test.each([
    ['test1', 'value1', {}, { test1: 'value1' }],
    ['test2', 'value2', { test2: 'value1' }, { test2: 'value2' }],
    ['test2', 'value2', { test1: 'value1' }, { test1: 'value1', test2: 'value2' }],
])('Call onChange handler when value is changed for "%s" to "%s"', (valueName, value, oldValue, result) => {
    const changeSpy = jest.fn();
    const options = {
        valueName,
    };
    const keyValue = (0, enzyme_1.shallow)(<KeyValue_1.default onChange={changeSpy} options={options} value={oldValue}/>);
    keyValue.find('Input').at(1).prop('onChange')(value);
    expect(changeSpy).toBeCalledWith(result);
});
test.each([
    ['test1', 'key1', {}, { test1: 'key1' }],
    ['test2', 'key2', { test2: 'key1' }, { test2: 'key2' }],
    ['test2', 'key2', { test1: 'key1' }, { test1: 'key1', test2: 'key2' }],
])('Call onChange handler when key is changed for "%s" to "%s"', (keyName, key, oldValue, result) => {
    const changeSpy = jest.fn();
    const options = {
        keyName,
    };
    const keyValue = (0, enzyme_1.shallow)(<KeyValue_1.default onChange={changeSpy} options={options} value={oldValue}/>);
    keyValue.find('Input').at(0).prop('onChange')(key);
    expect(changeSpy).toBeCalledWith(result);
});
