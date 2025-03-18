"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ConditionList_1 = __importDefault(require("../ConditionList"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render an empty ConditionList', () => {
    const value = [];
    expect((0, enzyme_1.render)(<ConditionList_1.default onChange={jest.fn()} value={value}/>)).toMatchSnapshot();
});
test('Add a new Condition', () => {
    const value = [
        { condition: {}, type: 'browser' },
    ];
    const changeSpy = jest.fn();
    const conditionList = (0, enzyme_1.shallow)(<ConditionList_1.default onChange={changeSpy} value={value}/>);
    conditionList.find('Button[icon="su-plus"]').prop('onClick')();
    expect(changeSpy).toBeCalledWith([{ condition: {}, type: 'browser' }, { condition: {}, type: undefined }]);
});
test('Edit an existing Condition', () => {
    const value = [
        { condition: {}, type: 'browser' },
        { condition: {}, type: undefined },
    ];
    const changeSpy = jest.fn();
    const conditionList = (0, enzyme_1.shallow)(<ConditionList_1.default onChange={changeSpy} value={value}/>);
    conditionList.find('Condition').at(1).prop('onChange')({ condition: { test: 'value' }, type: 'test' }, 1);
    expect(changeSpy).toBeCalledWith([{ condition: {}, type: 'browser' }, { condition: { test: 'value' }, type: 'test' }]);
});
test('Remove an existing Condition', () => {
    const value = [
        { condition: {}, type: 'browser' },
        { condition: {}, type: undefined },
    ];
    const changeSpy = jest.fn();
    const conditionList = (0, enzyme_1.shallow)(<ConditionList_1.default onChange={changeSpy} value={value}/>);
    conditionList.find('Condition').at(1).prop('onRemove')(1);
    expect(changeSpy).toBeCalledWith([{ condition: {}, type: 'browser' }]);
});
