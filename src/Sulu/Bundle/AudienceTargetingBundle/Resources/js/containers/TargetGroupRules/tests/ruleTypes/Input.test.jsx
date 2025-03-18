"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Input_1 = __importDefault(require("../../ruleTypes/Input"));
test.each([
    ['test1', 'value1'],
    ['test2', 'value2'],
])('Pass the change callback for "%s" with a value of "%s"', (name, value) => {
    const changeSpy = jest.fn();
    const input = (0, enzyme_1.shallow)(<Input_1.default onChange={changeSpy} options={{ name }} value={{}}/>);
    input.find('Input').prop('onChange')(value);
    expect(changeSpy).toBeCalledWith({ [name]: value });
});
test.each([
    ['test1', 'value1'],
    ['test2', 'value2'],
])('Pass value for "%s" with a value of "%s" correctly to Input', (name, value) => {
    const input = (0, enzyme_1.shallow)(<Input_1.default onChange={jest.fn()} options={{ name }} value={{ [name]: value }}/>);
    expect(input.find('Input').prop('value')).toEqual(value);
});
