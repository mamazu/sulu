import React from 'react';
import {mount, shallow} from 'enzyme';
import ResourceCheckboxGroup from '../ResourceCheckboxGroup';
import ResourceListStore from '../../../stores/ResourceListStore';

jest.mock('../../../stores/ResourceListStore', () => jest.fn());

jest.mock('../../../utils/Translator', () => ({
    translate: (key: any) => key,
}));

test('Render with data', () => {
    ResourceListStore.mockImplementation(function() {
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

    const resourceCheckboxGroup = mount(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={jest.fn()}
            resourceKey="test"
            values={undefined}
        />
    );

    expect(ResourceListStore).toBeCalledWith('test', {});
    expect(resourceCheckboxGroup.render()).toMatchSnapshot();
});

test('Render in disabled state', () => {
    ResourceListStore.mockImplementation(function() {
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

    const resourceCheckboxGroup = shallow(
        <ResourceCheckboxGroup
            disabled={true}
            displayProperty="name"
            onChange={jest.fn()}
            resourceKey="test"
            values={undefined}
        />
    );

    expect(ResourceListStore).toBeCalledWith('test', {});
    expect(resourceCheckboxGroup.find('CheckboxGroup').prop('disabled')).toEqual(true);
});

test('Render in loading state', () => {
    ResourceListStore.mockImplementation(function() {
        this.loading = true;
        this.data = undefined;
    });

    const resourceCheckboxGroup = shallow(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={jest.fn()}
            resourceKey="test"
            values={undefined}
        />
    );

    expect(resourceCheckboxGroup.find('Loader')).toHaveLength(1);
});

test('Pass requestParameters', () => {
    ResourceListStore.mockImplementation(function() {
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

    const requestParameters = {'testOption': 'testValue'} as const;

    mount(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={jest.fn()}
            requestParameters={requestParameters}
            resourceKey="test"
            values={undefined}
        />
    );

    expect(ResourceListStore).toBeCalledWith('test', requestParameters);
});

test('Pass requestParameters when requestParameters props changed', () => {
    ResourceListStore.mockImplementation(function() {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
        ];
    });

    const requestParameters1: Record<string, any> = {};
    const requestParameters2 = {'testOption': 'testValue'} as const;

    const resourceCheckboxGroup = mount(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={jest.fn()}
            requestParameters={requestParameters1}
            resourceKey="test"
            values={undefined}
        />
    );

    resourceCheckboxGroup.setProps({
        requestParameters: requestParameters2,
        displayProperty: 'name',
        onChange: jest.fn(),
        resourceKey: 'test',
        values: undefined,
    });

    expect(ResourceListStore.mock.calls).toEqual([
        ['test', requestParameters1],
        ['test', requestParameters2],
    ]);
});

test('Pass requestParameters when resourceKey props changed', () => {
    ResourceListStore.mockImplementation(function() {
        this.loading = false;
        this.data = [
            {
                'id': 2,
                'name': 'Test ABC',
                'someOtherProperty': 'No no',
            },
        ];
    });

    const requestParameters: Record<string, any> = {};

    const resourceCheckboxGroup = mount(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={jest.fn()}
            requestParameters={requestParameters}
            resourceKey="test1"
            values={undefined}
        />
    );

    resourceCheckboxGroup.setProps({
        requestParameters,
        displayProperty: 'name',
        onChange: jest.fn(),
        resourceKey: 'test2',
        values: undefined,
    });

    expect(ResourceListStore.mock.calls).toEqual([
        ['test1', requestParameters],
        ['test2', requestParameters],
    ]);
});

test('Render with values', () => {
    ResourceListStore.mockImplementation(function() {
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

    const resourceCheckboxGroup = mount(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={jest.fn()}
            resourceKey="test"
            values={[5, 99]}
        />
    );

    expect(resourceCheckboxGroup.find('Checkbox').at(0).prop('checked')).toEqual(false);
    expect(resourceCheckboxGroup.find('Checkbox').at(1).prop('checked')).toEqual(true);
    expect(resourceCheckboxGroup.find('Checkbox').at(2).prop('checked')).toEqual(true);
});

test('The component should trigger the change callback', () => {
    ResourceListStore.mockImplementation(function() {
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
    const resourceCheckboxGroup = shallow(
        <ResourceCheckboxGroup
            displayProperty="name"
            onChange={onChangeSpy}
            resourceKey="test"
            values={[99]}
        />
    );

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
