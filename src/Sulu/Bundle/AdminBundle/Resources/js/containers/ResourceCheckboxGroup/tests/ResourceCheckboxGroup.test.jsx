"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ResourceCheckboxGroup_1 = __importDefault(require("../ResourceCheckboxGroup"));
const ResourceListStore_1 = __importDefault(require("../../../stores/ResourceListStore"));
jest.mock('../../../stores/ResourceListStore', () => jest.fn());
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render with data', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
            {
                'id': 5,
                'name': 'Test DEF',
                'someOtherProperty': 'YES YES',
            },
            {
                'id': 99,
                'name': 'Test XYZ',
                'someOtherProperty': 'maybe maybe',
            },
        ];
    });
    const resourceCheckboxGroup = (0, enzyme_1.mount)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={jest.fn()} resourceKey="test" values={undefined}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', {});
    expect(resourceCheckboxGroup.render()).toMatchSnapshot();
});
test('Render in disabled state', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
            {
                'id': 5,
                'name': 'Test DEF',
                'someOtherProperty': 'YES YES',
            },
        ];
    });
    const resourceCheckboxGroup = (0, enzyme_1.shallow)(<ResourceCheckboxGroup_1.default disabled={true} displayProperty="name" onChange={jest.fn()} resourceKey="test" values={undefined}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', {});
    expect(resourceCheckboxGroup.find('CheckboxGroup').prop('disabled')).toEqual(true);
});
test('Render in loading state', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = true;
        this.data = undefined;
    });
    const resourceCheckboxGroup = (0, enzyme_1.shallow)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={jest.fn()} resourceKey="test" values={undefined}/>);
    expect(resourceCheckboxGroup.find('Loader')).toHaveLength(1);
});
test('Pass requestParameters', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
            {
                'id': 5,
                'name': 'Test DEF',
                'someOtherProperty': 'YES YES',
            },
            {
                'id': 99,
                'name': 'Test XYZ',
                'someOtherProperty': 'maybe maybe',
            },
        ];
    });
    const requestParameters = { 'testOption': 'testValue' };
    (0, enzyme_1.mount)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={jest.fn()} requestParameters={requestParameters} resourceKey="test" values={undefined}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', requestParameters);
});
test('Pass requestParameters when requestParameters props changed', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
        ];
    });
    const requestParameters1 = {};
    const requestParameters2 = { 'testOption': 'testValue' };
    const resourceCheckboxGroup = (0, enzyme_1.mount)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={jest.fn()} requestParameters={requestParameters1} resourceKey="test" values={undefined}/>);
    resourceCheckboxGroup.setProps({
        requestParameters: requestParameters2,
        displayProperty: 'name',
        onChange: jest.fn(),
        resourceKey: 'test',
        values: undefined,
    });
    expect(ResourceListStore_1.default.mock.calls).toEqual([
        ['test', requestParameters1],
        ['test', requestParameters2],
    ]);
});
test('Pass requestParameters when resourceKey props changed', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
        ];
    });
    const requestParameters = {};
    const resourceCheckboxGroup = (0, enzyme_1.mount)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={jest.fn()} requestParameters={requestParameters} resourceKey="test1" values={undefined}/>);
    resourceCheckboxGroup.setProps({
        requestParameters,
        displayProperty: 'name',
        onChange: jest.fn(),
        resourceKey: 'test2',
        values: undefined,
    });
    expect(ResourceListStore_1.default.mock.calls).toEqual([
        ['test1', requestParameters],
        ['test2', requestParameters],
    ]);
});
test('Render with values', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
            {
                'id': 5,
                'name': 'Test DEF',
                'someOtherProperty': 'YES YES',
            },
            {
                'id': 99,
                'name': 'Test XYZ',
                'someOtherProperty': 'maybe maybe',
            },
        ];
    });
    const resourceCheckboxGroup = (0, enzyme_1.mount)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={jest.fn()} resourceKey="test" values={[5, 99]}/>);
    expect(resourceCheckboxGroup.find('Checkbox').at(0).prop('checked')).toEqual(false);
    expect(resourceCheckboxGroup.find('Checkbox').at(1).prop('checked')).toEqual(true);
    expect(resourceCheckboxGroup.find('Checkbox').at(2).prop('checked')).toEqual(true);
});
test('The component should trigger the change callback', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
            {
                'id': 5,
                'name': 'Test DEF',
                'someOtherProperty': 'YES YES',
            },
            {
                'id': 99,
                'name': 'Test XYZ',
                'someOtherProperty': 'maybe maybe',
            },
        ];
    });
    const onChangeSpy = jest.fn();
    const resourceCheckboxGroup = (0, enzyme_1.shallow)(<ResourceCheckboxGroup_1.default displayProperty="name" onChange={onChangeSpy} resourceKey="test" values={[99]}/>);
    const expectedValues = [
        {
            'id': 5,
            'name': 'Test DEF',
            'someOtherProperty': 'YES YES',
        },
        {
            'id': 99,
            'name': 'Test XYZ',
            'someOtherProperty': 'maybe maybe',
        },
    ];
    resourceCheckboxGroup.find('CheckboxGroup').props().onChange([5, 99]);
    expect(onChangeSpy).toHaveBeenCalledWith([5, 99], expectedValues);
});
