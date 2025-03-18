"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const BooleanFieldFilterType_1 = __importDefault(require("../../fieldFilterTypes/BooleanFieldFilterType"));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test.each([
    [true],
    [false],
    [undefined],
])('Render with a value of "%s"', (value) => {
    const booleanFieldFilterType = new BooleanFieldFilterType_1.default(jest.fn(), {}, value);
    expect((0, enzyme_1.render)(booleanFieldFilterType.getFormNode())).toMatchSnapshot();
});
test('Render with value set by setValue', () => {
    const booleanFieldFilterType = new BooleanFieldFilterType_1.default(jest.fn(), {}, false);
    booleanFieldFilterType.setValue(true);
    expect((0, enzyme_1.render)(booleanFieldFilterType.getFormNode())).toMatchSnapshot();
});
test('Call onChange handler with false as a default value if undefined is given', () => {
    const changeSpy = jest.fn();
    new BooleanFieldFilterType_1.default(changeSpy, {}, undefined);
    expect(changeSpy).toBeCalledWith(false);
});
test('Call onChange handler with new value', () => {
    const changeSpy = jest.fn();
    const booleanFieldFilterType = new BooleanFieldFilterType_1.default(changeSpy, {}, false);
    const booleanFieldFilterTypeForm = (0, enzyme_1.mount)(booleanFieldFilterType.getFormNode());
    booleanFieldFilterTypeForm.find('Toggler').prop('onChange')(true);
    expect(changeSpy).toBeCalledWith(true);
});
test.each([
    [true, 'sulu_admin.yes'],
    [false, 'sulu_admin.no'],
    [undefined, null],
])('Return value node with value "%s"', (value, expectedValueNode) => {
    const booleanFieldFilterType = new BooleanFieldFilterType_1.default(jest.fn(), {}, undefined);
    const valueNodePromise = booleanFieldFilterType.getValueNode(value);
    if (!valueNodePromise) {
        throw new Error('The getValueNode function must return a promise!');
    }
    return valueNodePromise.then((valueNode) => {
        expect(valueNode).toEqual(expectedValueNode);
    });
});
