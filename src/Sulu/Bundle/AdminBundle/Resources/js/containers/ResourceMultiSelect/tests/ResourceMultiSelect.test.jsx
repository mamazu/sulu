"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const ResourceMultiSelect_1 = __importDefault(require("../ResourceMultiSelect"));
const MultiSelect_1 = __importDefault(require("../../../components/MultiSelect"));
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
    const resourceMultiSelect = (0, enzyme_1.mount)(<ResourceMultiSelect_1.default displayProperty="name" onChange={jest.fn()} resourceKey="test" values={[5, 99]}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', { limit: '' }, 'id');
    expect(resourceMultiSelect.render()).toMatchSnapshot();
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
    const resourceMultiSelect = (0, enzyme_1.shallow)(<ResourceMultiSelect_1.default disabled={true} displayProperty="name" onChange={jest.fn()} resourceKey="test" values={undefined}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', { limit: '' }, 'id');
    expect(resourceMultiSelect.find('MultiSelect').prop('disabled')).toEqual(true);
});
test('Render in loading state', () => {
    ResourceListStore_1.default.mockImplementation(function () {
        this.loading = true;
        this.data = undefined;
    });
    const resourceMultiSelect = (0, enzyme_1.shallow)(<ResourceMultiSelect_1.default displayProperty="name" onChange={jest.fn()} resourceKey="test" values={undefined}/>);
    expect(resourceMultiSelect.find('Loader')).toHaveLength(1);
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
    (0, enzyme_1.mount)(<ResourceMultiSelect_1.default displayProperty="name" onChange={jest.fn()} requestParameters={requestParameters} resourceKey="test" values={undefined}/>);
    expect(ResourceListStore_1.default).toBeCalledWith('test', { limit: '', testOption: 'testValue' }, 'id');
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
    const resourceMultiSelect = (0, enzyme_1.mount)(<ResourceMultiSelect_1.default displayProperty="name" onChange={jest.fn()} requestParameters={requestParameters1} resourceKey="test" values={undefined}/>);
    resourceMultiSelect.setProps({
        requestParameters: requestParameters2,
        displayProperty: 'name',
        onChange: jest.fn(),
        resourceKey: 'test',
        values: undefined,
    });
    expect(ResourceListStore_1.default.mock.calls).toEqual([
        ['test', { limit: '' }, 'id'],
        ['test', { limit: '', testOption: 'testValue' }, 'id'],
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
    const resourceMultiSelect = (0, enzyme_1.mount)(<ResourceMultiSelect_1.default displayProperty="name" onChange={jest.fn()} resourceKey="test1" values={undefined}/>);
    resourceMultiSelect.setProps({
        displayProperty: 'name',
        onChange: jest.fn(),
        resourceKey: 'test2',
        values: undefined,
    });
    expect(ResourceListStore_1.default.mock.calls).toEqual([
        ['test1', { limit: '' }, 'id'],
        ['test2', { limit: '' }, 'id'],
    ]);
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
    const resourceMultiSelect = (0, enzyme_1.shallow)(<ResourceMultiSelect_1.default displayProperty="name" onChange={onChangeSpy} resourceKey="test" values={[99]}/>);
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
    resourceMultiSelect.find(MultiSelect_1.default).props().onChange([5, 99]);
    expect(onChangeSpy).toHaveBeenCalledWith([5, 99], expectedValues);
});
test('The component should trigger the close callback', () => {
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
    const closeSpy = jest.fn();
    const resourceMultiSelect = (0, enzyme_1.shallow)(<ResourceMultiSelect_1.default displayProperty="name" onChange={jest.fn()} onClose={closeSpy} resourceKey="test" values={[99]}/>);
    expect(closeSpy).not.toBeCalled();
    resourceMultiSelect.find(MultiSelect_1.default).prop('onClose')();
    expect(closeSpy).toBeCalled();
});
