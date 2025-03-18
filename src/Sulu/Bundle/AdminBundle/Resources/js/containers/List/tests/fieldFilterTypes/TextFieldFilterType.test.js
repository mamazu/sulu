"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const TextFieldFilterType_1 = __importDefault(require("../../fieldFilterTypes/TextFieldFilterType"));
test('Render with value of undefined', () => {
    const textFieldFilterType = new TextFieldFilterType_1.default(jest.fn(), {}, undefined);
    expect((0, enzyme_1.render)(textFieldFilterType.getFormNode())).toMatchSnapshot();
});
test('Render with value', () => {
    const textFieldFilterType = new TextFieldFilterType_1.default(jest.fn(), {}, { eq: 'Filter' });
    expect((0, enzyme_1.render)(textFieldFilterType.getFormNode())).toMatchSnapshot();
});
test('Render with value set by setValue', () => {
    const textFieldFilterType = new TextFieldFilterType_1.default(jest.fn(), {}, undefined);
    textFieldFilterType.setValue({ eq: 'New value' });
    expect((0, enzyme_1.render)(textFieldFilterType.getFormNode())).toMatchSnapshot();
});
test('Call onChange handler with new value', () => {
    const changeSpy = jest.fn();
    const textFieldFilterType = new TextFieldFilterType_1.default(changeSpy, {}, undefined);
    const textFieldFilterTypeForm = (0, enzyme_1.mount)(textFieldFilterType.getFormNode());
    textFieldFilterTypeForm.find('Input').prop('onChange')('value');
    expect(changeSpy).toBeCalledWith({ eq: 'value' });
});
test.each([
    ['Test1'],
    ['Test2'],
])('Return value node with value "%s"', (value) => {
    const textFieldFilterType = new TextFieldFilterType_1.default(jest.fn(), {}, undefined);
    const valueNodePromise = textFieldFilterType.getValueNode({ eq: value });
    if (!valueNodePromise) {
        throw new Error('The getValueNode function must return a promise!');
    }
    return valueNodePromise.then((valueNode) => {
        expect(valueNode).toEqual(value);
    });
});
test('Return value node for null', () => {
    const textFieldFilterType = new TextFieldFilterType_1.default(jest.fn(), {}, undefined);
    const valueNodePromise = textFieldFilterType.getValueNode(null);
    if (!valueNodePromise) {
        throw new Error('The getValueNode function must return a promise!');
    }
    return valueNodePromise.then((valueNode) => {
        expect(valueNode).toEqual(null);
    });
});
