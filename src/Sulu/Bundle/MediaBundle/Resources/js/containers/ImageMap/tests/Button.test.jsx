"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Button_1 = __importDefault(require("../Button"));
test('Should render with icon and disabled', () => {
    expect((0, enzyme_1.render)(<Button_1.default disabled={true} icon="su-plus-circle" onClick={jest.fn()}/>)).toMatchSnapshot();
});
test('Should call the callback on click', () => {
    const preventDefaultSpy = jest.fn();
    const onClick = jest.fn();
    const button = (0, enzyme_1.shallow)(<Button_1.default icon="su-plus-circle" onClick={onClick}/>);
    button.find('button').simulate('click', { preventDefault: preventDefaultSpy });
    expect(preventDefaultSpy).toBeCalled();
    expect(onClick).toBeCalled();
});
