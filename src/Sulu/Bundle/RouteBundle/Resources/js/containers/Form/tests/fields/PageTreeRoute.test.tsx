import React from 'react';
import {mount} from 'enzyme';
import {FormInspector, ResourceFormStore, SingleSelection, ResourceLocator} from 'sulu-admin-bundle/containers';
import {fieldTypeDefaultProps} from 'sulu-admin-bundle/utils/TestHelper';
import {ResourceStore, SingleSelectionStore} from 'sulu-admin-bundle/stores';
import {extendObservable as mockExtendObservable, observable} from 'mobx';
import PageTreeRoute from '../../fields/PageTreeRoute';

jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key: any) => key),
}));

jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    contentLocale: 'de',
}));

jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function() {
    this.selections = [];
    this.clearSelection = jest.fn();
    this.select = jest.fn();
    this.destroy = jest.fn();
}));

jest.mock(
    'sulu-admin-bundle/stores/ResourceStore',
    () => jest.fn(function(resourceKey: any, id: any, options: any) {
        this.resourceKey = resourceKey;
        this.id = id;

        if (options) {
            this.locale = options.locale;
        }
    })
);

jest.mock('sulu-admin-bundle/containers/Form/stores/MemoryFormStore', () => jest.fn(function(data: any, schema: any) {
    this.data = data;
    this.schema = schema;
    this.change = jest.fn().mockImplementation((name: any, value: any) => {
        this.data[name] = value;
    });
    this.validate = jest.fn().mockReturnValue(true);
    this.destroy = jest.fn();
}));

jest.mock(
    'sulu-admin-bundle/containers/Form/stores/ResourceFormStore',
    () => jest.fn(function(resourceStore: any, formKey: any) {
        this.resourceKey = resourceStore.resourceKey;
        this.id = resourceStore.id;
        this.locale = resourceStore.locale;

        if (formKey) {
            this.formKey = formKey;
        }
    })
);

jest.mock(
    'sulu-admin-bundle/containers/Form/FormInspector',
    () => jest.fn(function(resourceFormStore: any) {
        this.id = resourceFormStore.id;
        this.locale = resourceFormStore.locale;
        this.isFieldModified = jest.fn();
        this.options = {
            webspace: 'webspace',
        };
        this.getPathsByTag = jest.fn().mockReturnValue([]);
    })
);

jest.mock('sulu-admin-bundle/stores/SingleSelectionStore', () => jest.fn(function() {
    this.set = jest.fn((item: any) => {
        this.item = item;
    });
    this.loadItem = jest.fn((id: any) => {
        this.item = {id, url: '/test/' + id};
    });
    this.clear = jest.fn();

    mockExtendObservable(this, {
        item: undefined,
        loading: false,
    });
}));

test('Render a PageTreeRoute', () => {
    const modePromiseValue = 'leaf';
    const modePromise = Promise.resolve(modePromiseValue);
    const modeResolver = jest.fn().mockImplementation(() => modePromise);

    const fieldTypeOptions = {
        modeResolver,
    } as const;

    const value = {
        page: {
            uuid: 'uuid-uuid-uuid-uuid',
        },
        suffix: '/hello',
    } as const;

    const locale = observable.box('de');
    const formInspector = new FormInspector(
        new ResourceFormStore(
            new ResourceStore('pages', 'diuu-diuu-diuu-diuu', {locale}),
            'test'
        )
    );

    const pageTreeRoute = mount(
        <PageTreeRoute
            {...fieldTypeDefaultProps}
            fieldTypeOptions={fieldTypeOptions}
            formInspector={formInspector}
            value={value}
        />
    );

    expect(modeResolver).toHaveBeenCalled();

    return modePromise.then(() => {
        pageTreeRoute.update();
        expect(pageTreeRoute.render()).toMatchSnapshot();
        expect(pageTreeRoute.find(SingleSelection).prop('value')).toBe(value.page.uuid);
        expect(SingleSelectionStore).toHaveBeenCalledWith('pages', 'uuid-uuid-uuid-uuid', locale, undefined);

        const singleSelection = pageTreeRoute.find(SingleSelection);

        singleSelection.instance().singleSelectionStore.item = {};
        singleSelection.update();

        expect(singleSelection.find('.item').text()).toBe('/test/uuid-uuid-uuid-uuid');
        expect(singleSelection.render()).toMatchSnapshot();

        expect(pageTreeRoute.find(ResourceLocator).prop('value')).toBe(value.suffix);
    });
});

test('Render a PageTreeRoute without value', () => {
    const modePromiseValue = 'leaf';
    const modePromise = Promise.resolve(modePromiseValue);
    const modeResolver = jest.fn().mockImplementation(() => modePromise);

    const fieldTypeOptions = {
        modeResolver,
    } as const;

    const formInspector = new FormInspector(new ResourceFormStore(new ResourceStore('pages'), 'test'));

    const pageTreeRoute = mount(
        <PageTreeRoute
            {...fieldTypeDefaultProps}
            fieldTypeOptions={fieldTypeOptions}
            formInspector={formInspector}
            value={null}
        />
    );

    expect(modeResolver).toHaveBeenCalled();

    return modePromise.then(() => {
        pageTreeRoute.update();
        expect(pageTreeRoute.render()).toMatchSnapshot();
        expect(pageTreeRoute.find(SingleSelection).prop('value')).toBe(null);
        expect(pageTreeRoute.find(ResourceLocator).prop('value')).toBe(null);
    });
});
