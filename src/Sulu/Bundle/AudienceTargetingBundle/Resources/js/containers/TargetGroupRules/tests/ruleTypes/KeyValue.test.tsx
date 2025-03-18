import React from 'react';
import {render, shallow} from 'enzyme';
import KeyValue from '../../ruleTypes/KeyValue';

test('Render a KeyValue RuleType', () => {
    const options = {
        keyPlaceholder: 'key',
        valuePlaceholder: 'value',
    } as const;

    expect(render(<KeyValue onChange={jest.fn()} options={options} value={{}} />)).toMatchSnapshot();
});

test.each([
    ['test1', 'value1', {}, {test1: 'value1'}],
    ['test2', 'value2', {test2: 'value1'}, {test2: 'value2'}],
    ['test2', 'value2', {test1: 'value1'}, {test1: 'value1', test2: 'value2'}],
])('Call onChange handler when value is changed for "%s" to "%s"', (valueName: any, value: any, oldValue: any, result: any) => {
    const changeSpy = jest.fn();

    const options = {
        valueName,
    } as const;

    const keyValue = shallow(<KeyValue onChange={changeSpy} options={options} value={oldValue} />);
    keyValue.find('Input').at(1).prop('onChange')(value);

    expect(changeSpy).toBeCalledWith(result);
});

test.each([
    ['test1', 'key1', {}, {test1: 'key1'}],
    ['test2', 'key2', {test2: 'key1'}, {test2: 'key2'}],
    ['test2', 'key2', {test1: 'key1'}, {test1: 'key1', test2: 'key2'}],
])('Call onChange handler when key is changed for "%s" to "%s"', (keyName: any, key: any, oldValue: any, result: any) => {
    const changeSpy = jest.fn();

    const options = {
        keyName,
    } as const;

    const keyValue = shallow(<KeyValue onChange={changeSpy} options={options} value={oldValue} />);
    keyValue.find('Input').at(0).prop('onChange')(key);

    expect(changeSpy).toBeCalledWith(result);
});
