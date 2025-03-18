"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const EditLine_1 = __importDefault(require("../EditLine"));
test('Render an EditLine', () => {
    expect((0, enzyme_1.render)(<EditLine_1.default id="1" onChange={jest.fn()} onRemove={jest.fn()} value="Test"/>)).toMatchSnapshot();
});
test('Call onChange callback if input changes', () => {
    const changeSpy = jest.fn();
    const editLine = (0, enzyme_1.shallow)(<EditLine_1.default id={3} onChange={changeSpy} onRemove={jest.fn()} value="old"/>);
    editLine.find('Input').simulate('change', 'new');
    expect(changeSpy).toBeCalledWith(3, 'new');
});
test('Call onRemove callback if line is removed', () => {
    const removeSpy = jest.fn();
    const editLine = (0, enzyme_1.shallow)(<EditLine_1.default id={3} onChange={jest.fn()} onRemove={removeSpy} value="old"/>);
    editLine.find('Button').simulate('click');
    expect(removeSpy).toBeCalledWith(3);
});
