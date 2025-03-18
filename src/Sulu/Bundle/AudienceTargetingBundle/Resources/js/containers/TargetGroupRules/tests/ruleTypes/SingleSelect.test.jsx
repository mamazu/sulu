"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const SingleSelect_1 = __importDefault(require("../../ruleTypes/SingleSelect"));
test.each([
    [[{ id: 'firefox', name: 'Firefox' }]],
    [[{ id: 'firefox', name: 'Firefox' }, { id: 'chrome', name: 'Chrome' }]],
    [[{ id: 'ie', name: 'Internet Explorer' }, { id: 'firefox', name: 'Firefox' }]],
])('Option should be listed in Select #%#', (options) => {
    const singleSelect = (0, enzyme_1.shallow)(<SingleSelect_1.default onChange={jest.fn()} options={{ options }} value={{}}/>);
    options.forEach((option, index) => {
        expect(singleSelect.find('Option').at(index).prop('value')).toEqual(option.id);
        expect(singleSelect.find('Option').at(index).prop('children')).toEqual(option.name);
    });
});
test.each([
    ['name1', 'value1'],
    ['name2', 'value2'],
])('Call onChange for "%s" with a value of "%s"', (name, value) => {
    const changeSpy = jest.fn();
    const singleSelect = (0, enzyme_1.shallow)(<SingleSelect_1.default onChange={changeSpy} options={{ name, options: [] }} value={{}}/>);
    singleSelect.find('SingleSelect').prop('onChange')(value);
    expect(changeSpy).toBeCalledWith({ [name]: value });
});
test.each([
    ['name1', 'value1'],
    ['name2', 'value2'],
])('Display correct value for "%s" with a value of "%s"', (name, value) => {
    const changeSpy = jest.fn();
    const singleSelect = (0, enzyme_1.shallow)(<SingleSelect_1.default onChange={changeSpy} options={{ name, options: [] }} value={{ [name]: value }}/>);
    expect(singleSelect.find('SingleSelect').prop('value')).toEqual(value);
});
