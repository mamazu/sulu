"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const SelectionHandle_1 = __importDefault(require("../SelectionHandle"));
test('Render selection handle unchecked', () => {
    expect((0, enzyme_1.render)(<SelectionHandle_1.default checked={false} onChange={jest.fn()}/>)).toMatchSnapshot();
});
test('Render selection handle checked', () => {
    expect((0, enzyme_1.render)(<SelectionHandle_1.default checked={true} onChange={jest.fn()}/>)).toMatchSnapshot();
});
test('Change checkbox should trigger onChange', () => {
    const changeSpy = jest.fn();
    const component = (0, enzyme_1.shallow)(<SelectionHandle_1.default checked={true} onChange={changeSpy}/>);
    expect(component.find('Checkbox').length).toBe(1);
    component.find('Checkbox').simulate('change');
    expect(changeSpy).toBeCalled();
});
test('Click on container should trigger onChange', () => {
    const changeSpy = jest.fn();
    const component = (0, enzyme_1.mount)(<SelectionHandle_1.default checked={true} onChange={changeSpy}/>);
    component.simulate('click', { stopPropagation: jest.fn() });
    expect(changeSpy).toBeCalled();
});
