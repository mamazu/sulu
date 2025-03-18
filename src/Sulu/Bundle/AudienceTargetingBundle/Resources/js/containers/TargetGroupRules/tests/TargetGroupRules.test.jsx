"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const TargetGroupRules_1 = __importDefault(require("../TargetGroupRules"));
const ruleRegistry_1 = __importDefault(require("../registries/ruleRegistry"));
const ruleTypeRegistry_1 = __importDefault(require("../registries/ruleTypeRegistry"));
const KeyValue_1 = __importDefault(require("../ruleTypes/KeyValue"));
const SingleSelect_1 = __importDefault(require("../ruleTypes/SingleSelect"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../registries/ruleTypeRegistry', () => ({
    get: jest.fn(),
}));
jest.mock('../registries/ruleRegistry', () => ({
    getAll: jest.fn(),
    get: jest.fn(),
}));
test('Render an empty list of rules', () => {
    expect((0, enzyme_1.render)(<TargetGroupRules_1.default onChange={jest.fn()} value={[]}/>)).toMatchSnapshot();
});
test('Render a list of rules', () => {
    ruleRegistry_1.default.get.mockImplementation((key) => {
        switch (key) {
            case 'browser':
                return {
                    name: 'Browser',
                    type: {
                        name: 'select',
                        options: {
                            name: 'browser',
                            options: [
                                { id: 'firefox', name: 'Firefox' },
                                { id: 'chrome', name: 'Chrome' },
                            ],
                        },
                    },
                };
            case 'query_string':
                return {
                    name: 'Query String',
                    type: {
                        name: 'key_value',
                        options: {
                            keyName: 'parameter',
                            valueName: 'value',
                        },
                    },
                };
        }
    });
    const value = [
        {
            conditions: [
                {
                    condition: { browser: 'Opera' },
                    type: 'browser',
                },
            ],
            frequency: 1,
            title: 'Rule 1',
        },
        {
            conditions: [
                {
                    condition: { browser: 'Opera' },
                    type: 'browser',
                },
                {
                    condition: { parameter: 'test', value: 'value' },
                    type: 'query_string',
                },
            ],
            frequency: 2,
            title: 'Rule 2',
        },
        {
            conditions: [],
            frequency: 3,
            title: 'Rule 3',
        },
    ];
    expect((0, enzyme_1.render)(<TargetGroupRules_1.default onChange={jest.fn()} value={value}/>)).toMatchSnapshot();
});
test('Add a new rule', () => {
    const changeSpy = jest.fn();
    const value = [
        {
            conditions: [],
            frequency: 1,
            title: 'Rule 1',
        },
    ];
    const targetGroupRules = (0, enzyme_1.mount)(<TargetGroupRules_1.default onChange={changeSpy} value={value}/>);
    targetGroupRules.find('Button[icon="su-plus"]').prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('RuleOverlay Input').prop('onChange')('Rule 2');
    targetGroupRules.find('RuleOverlay SingleSelect').prop('onChange')(2);
    targetGroupRules.find('RuleOverlay Button[skin="primary"]').prop('onClick')();
    expect(changeSpy).toBeCalledWith([
        {
            conditions: [],
            frequency: 1,
            title: 'Rule 1',
        },
        {
            conditions: [],
            frequency: 2,
            title: 'Rule 2',
        },
    ]);
});
test('Edit an existing rule', () => {
    ruleRegistry_1.default.getAll.mockReturnValue({
        browser: {
            name: 'Browser',
            type: {
                name: 'select',
                options: {
                    name: 'browser',
                    options: [
                        { id: 'firefox', name: 'Firefox' },
                        { id: 'chrome', name: 'Chrome' },
                    ],
                },
            },
        },
        query_string: {
            name: 'Query String',
            type: {
                name: 'key_value',
                options: {
                    keyName: 'parameter',
                    valueName: 'value',
                },
            },
        },
    });
    ruleRegistry_1.default.get.mockImplementation((key) => ruleRegistry_1.default.getAll()[key]);
    ruleTypeRegistry_1.default.get.mockImplementation((type) => {
        switch (type) {
            case 'select':
                return SingleSelect_1.default;
            case 'key_value':
                return KeyValue_1.default;
        }
    });
    const changeSpy = jest.fn();
    const value = [
        {
            conditions: [],
            frequency: 1,
            title: 'Rule 1',
        },
        {
            conditions: [],
            frequency: 2,
            title: 'Rule 2',
        },
    ];
    const targetGroupRules = (0, enzyme_1.mount)(<TargetGroupRules_1.default onChange={changeSpy} value={value}/>);
    targetGroupRules.find('ButtonCell[rowIndex=0] button').prop('onClick')();
    targetGroupRules.update();
    expect((targetGroupRules.find('RuleOverlay Input').prop('value'))).toEqual('Rule 1');
    expect((targetGroupRules.find('RuleOverlay SingleSelect').prop('value'))).toEqual(1);
    targetGroupRules.find('RuleOverlay Input').prop('onChange')('Rule 1 edited');
    targetGroupRules.find('RuleOverlay SingleSelect').prop('onChange')(3);
    targetGroupRules.find('ConditionList Button[icon="su-plus"]').prop('onClick')();
    targetGroupRules.find('ConditionList Button[icon="su-plus"]').prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('ConditionList Condition').at(0).find('SingleSelect DisplayValue').prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('ConditionList Condition').at(0).find('SingleSelect Option button').at(0).prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('ConditionList Condition').at(0).find('SingleSelect DisplayValue').at(1).prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('ConditionList Condition').at(0).find('SingleSelect Option button').at(0).prop('onClick')();
    targetGroupRules.find('ConditionList Condition').at(1).find('SingleSelect DisplayValue').prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('ConditionList Condition').at(1).find('SingleSelect Option button').at(1).prop('onClick')();
    targetGroupRules.update();
    targetGroupRules.find('ConditionList Condition').at(1).find('KeyValue Input').at(0).prop('onChange')('parameter');
    targetGroupRules.find('ConditionList Condition').at(1).find('KeyValue Input').at(1).prop('onChange')('value');
    targetGroupRules.find('RuleOverlay Button[skin="primary"]').prop('onClick')();
    expect(changeSpy).toBeCalledWith([
        {
            conditions: [
                {
                    condition: {
                        browser: 'firefox',
                    },
                    type: 'browser',
                },
                {
                    condition: {
                        parameter: 'parameter',
                        value: 'value',
                    },
                    type: 'query_string',
                },
            ],
            frequency: 3,
            title: 'Rule 1 edited',
        },
        {
            conditions: [],
            frequency: 2,
            title: 'Rule 2',
        },
    ]);
});
test('Close without adding a new rule', () => {
    const changeSpy = jest.fn();
    const value = [
        {
            conditions: [],
            frequency: 1,
            title: 'Rule 1',
        },
    ];
    const targetGroupRules = (0, enzyme_1.mount)(<TargetGroupRules_1.default onChange={changeSpy} value={value}/>);
    expect(targetGroupRules.find('RuleOverlay').prop('open')).toEqual(false);
    targetGroupRules.find('Button[icon="su-plus"]').prop('onClick')();
    targetGroupRules.update();
    expect(targetGroupRules.find('RuleOverlay').prop('open')).toEqual(true);
    targetGroupRules.find('RuleOverlay span.su-times').simulate('click');
    expect(targetGroupRules.find('RuleOverlay').prop('open')).toEqual(false);
    expect(changeSpy).not.toBeCalled();
});
test('Remove rules', () => {
    const changeSpy = jest.fn();
    const value = [
        {
            conditions: [],
            frequency: 1,
            title: 'Rule 1',
        },
        {
            conditions: [],
            frequency: 2,
            title: 'Rule 2',
        },
        {
            conditions: [],
            frequency: 3,
            title: 'Rule 3',
        },
    ];
    const targetGroupRules = (0, enzyme_1.mount)(<TargetGroupRules_1.default onChange={changeSpy} value={value}/>);
    expect(targetGroupRules.find('Button[icon="su-trash-alt"]').prop('disabled')).toEqual(true);
    targetGroupRules.find('Row[rowIndex=1] input[type="checkbox"]').getDOMNode().checked = true;
    targetGroupRules.find('Row[rowIndex=2] input[type="checkbox"]').getDOMNode().checked = true;
    targetGroupRules.find('Row[rowIndex=1] input[type="checkbox"]')
        .simulate('change', { currentTarget: { checked: true } });
    targetGroupRules.find('Row[rowIndex=2] input[type="checkbox"]')
        .simulate('change', { currentTarget: { checked: true } });
    targetGroupRules.update();
    expect(targetGroupRules.find('Button[icon="su-trash-alt"]').prop('disabled')).toEqual(false);
    targetGroupRules.find('Button[icon="su-trash-alt"]').prop('onClick')();
    expect(changeSpy).toBeCalledWith([
        {
            conditions: [],
            frequency: 1,
            title: 'Rule 1',
        },
    ]);
});
