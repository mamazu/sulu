"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const TargetGroupRules_1 = __importDefault(require("../../fields/TargetGroupRules"));
const TargetGroupRules_2 = __importDefault(require("../../../../containers/TargetGroupRules"));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn());
test('Pass a default value of an empty array to the component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const targetGroupRules = (0, enzyme_1.shallow)(<TargetGroupRules_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector}/>);
    expect(targetGroupRules.find(TargetGroupRules_2.default).prop('value')).toEqual([]);
});
test('Pass the given value to the component', () => {
    const value = [];
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const targetGroupRules = (0, enzyme_1.shallow)(<TargetGroupRules_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={value}/>);
    expect(targetGroupRules.find(TargetGroupRules_2.default).prop('value')).toBe(value);
});
test('Call onChange and onFinish if value of componetn changes', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const targetGroupRules = (0, enzyme_1.shallow)(<TargetGroupRules_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    targetGroupRules.find(TargetGroupRules_2.default).prop('onChange')([{}]);
    expect(changeSpy).toBeCalledWith([{}]);
    expect(finishSpy).toBeCalledWith();
});
