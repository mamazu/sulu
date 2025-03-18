"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ruleRegistry_1 = __importDefault(require("../registries/ruleRegistry"));
const ruleTypeRegistry_1 = __importDefault(require("../registries/ruleTypeRegistry"));
const Condition_1 = __importDefault(require("../Condition"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../registries/ruleRegistry', () => {
    const getAllMock = jest.fn();
    return {
        getAll: getAllMock,
        get: (key) => getAllMock()[key],
    };
});
jest.mock('../registries/ruleTypeRegistry', () => ({
    get: jest.fn(),
}));
test('Render a condition', () => {
    ruleRegistry_1.default.getAll.mockReturnValue({
        browser: {
            name: 'Browser',
            type: {
                name: 'select',
                options: {},
            },
        },
    });
    const value = { condition: {}, type: 'browser' };
    expect((0, enzyme_1.render)(<Condition_1.default index={1} onChange={jest.fn()} onRemove={jest.fn()} value={value}/>)).toMatchSnapshot();
});
test('Call onRemove callback if remove icon is clicked', () => {
    const removeSpy = jest.fn();
    const value = { condition: {}, type: undefined };
    const condition = (0, enzyme_1.shallow)(<Condition_1.default index={5} onChange={jest.fn()} onRemove={removeSpy} value={value}/>);
    condition.find('Button[icon="su-trash-alt"]').prop('onClick')();
    expect(removeSpy).toBeCalledWith(5);
});
test('Call onChange callback if rule type changes', () => {
    const changeSpy = jest.fn();
    const value = { condition: { test: 'value' }, type: undefined };
    const condition = (0, enzyme_1.shallow)(<Condition_1.default index={5} onChange={changeSpy} onRemove={jest.fn()} value={value}/>);
    condition.find('SingleSelect').prop('onChange')('browser');
    expect(changeSpy).toBeCalledWith({ condition: { test: 'value' }, type: 'browser' }, 5);
});
test('Call onChange callback if condition changes', () => {
    ruleRegistry_1.default.getAll.mockReturnValue({
        browser: {
            name: 'Browser',
            type: {
                name: 'select',
                options: {},
            },
        },
    });
    const RuleType = () => null;
    ruleTypeRegistry_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'select':
                return RuleType;
        }
    });
    const changeSpy = jest.fn();
    const value = { condition: {}, type: 'browser' };
    const condition = (0, enzyme_1.shallow)(<Condition_1.default index={5} onChange={changeSpy} onRemove={jest.fn()} value={value}/>);
    condition.find(RuleType).prop('onChange')({ test: 'value' });
    expect(changeSpy).toBeCalledWith({ condition: { test: 'value' }, type: 'browser' }, 5);
});
