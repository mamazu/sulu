"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const containers_1 = require("sulu-admin-bundle/containers");
const services_1 = require("sulu-admin-bundle/services");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const SettingsVersions_1 = __importDefault(require("../../fields/SettingsVersions"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    post: jest.fn(),
}));
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.reload = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (resourceFormStore) {
    this.options = resourceFormStore.options;
    this.locale = resourceFormStore.locale;
    this.id = resourceFormStore.id;
    this.addSaveHandler = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.options = resourceStore.options;
    this.locale = resourceStore.locale;
    this.id = resourceStore.id;
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions, options) {
    this.options = options;
    this.locale = observableOptions.locale;
    this.id = id;
}));
test('Initialize the list correctly', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    const pageSettingsVersions = (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(containers_1.ListStore).toBeCalledWith('page_versions', 'page_versions', 'page_versions', expect.objectContaining({ locale }), { id: 3, webspace: 'sulu' });
    expect(pageSettingsVersions.find('List').props()).toEqual(expect.objectContaining({
        adapters: ['table'],
        searchable: false,
        selectable: false,
        // $FlowFixMe
        store: containers_1.ListStore.mock.instances[0],
    }));
});
test('Reload the ListStore if a new version was published', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    const listStore = containers_1.ListStore.mock.instances[0];
    const saveHandler = formInspector.addSaveHandler.mock.calls[0][0];
    saveHandler('publish');
    expect(listStore.reload).toBeCalledWith();
});
test('Do not reload the ListStore if page was saved without being published', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    const listStore = containers_1.ListStore.mock.instances[0];
    const saveHandler = formInspector.addSaveHandler.mock.calls[0][0];
    saveHandler('draft');
    expect(listStore.reload).not.toBeCalled();
});
test('Open and cancel restore overlay', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    const pageSettingsVersions = (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(pageSettingsVersions.find('Dialog').prop('open')).toEqual(false);
    pageSettingsVersions.find('List').prop('itemActionsProvider')()[0].onClick(3);
    pageSettingsVersions.update();
    expect(pageSettingsVersions.find('Dialog').prop('open')).toEqual(true);
    pageSettingsVersions.find('Dialog').prop('onCancel')();
    expect(pageSettingsVersions.find('Dialog').prop('open')).toEqual(false);
});
test('Open and confirm restore overlay', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    const route = new services_1.Route({
        name: 'sulu_page.page_edit_form.settings',
        path: '/settings',
        type: 'test',
    });
    route.parent = new services_1.Route({
        name: 'sulu_page.page_edit_form',
        path: '/details',
        type: 'test',
    });
    const router = new services_1.Router();
    router.route = route;
    const postPromise = Promise.resolve();
    services_1.ResourceRequester.post.mockReturnValue(postPromise);
    const pageSettingsVersions = (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} router={router} schemaOptions={schemaOptions}/>);
    expect(pageSettingsVersions.find('Dialog').prop('open')).toEqual(false);
    pageSettingsVersions.find('List').prop('itemActionsProvider')()[0].onClick(3);
    pageSettingsVersions.update();
    expect(pageSettingsVersions.find('Dialog').prop('open')).toEqual(true);
    pageSettingsVersions.find('Dialog').prop('onConfirm')();
    expect(pageSettingsVersions.find('Dialog').prop('confirmLoading')).toEqual(true);
    return postPromise.then(() => {
        expect(pageSettingsVersions.find('Dialog').prop('open')).toEqual(false);
        expect(pageSettingsVersions.find('Dialog').prop('confirmLoading')).toEqual(false);
        expect(router.navigate).toBeCalledWith('sulu_page.page_edit_form', { id: 3, locale, webspace: 'sulu' });
    });
});
test('Throw error when resource_key parameter is undefined', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('The "resource_key" schemaOption is mandatory and must be a string, but received undefined!');
});
test('Throw error when resource_key parameter is not a string', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 123,
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('The "resource_key" schemaOption is mandatory and must be a string, but received number!');
});
test('Use resource_key as a fallback, if list_key parameter is undefined', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions_resource_key',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    const pageSettingsVersions = (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(pageSettingsVersions.instance().listKey).toBe('page_versions_resource_key');
});
test('Throw error when list_key parameter is not a string', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 123,
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('The "list_key" schemaOption must be a string, but received number!');
});
test('Use list_key as a fallback, if user_settings_key parameter is undefined', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions_list_key',
        },
    };
    const pageSettingsVersions = (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(pageSettingsVersions.instance().userSettingsKey).toBe('page_versions_list_key');
});
test('Throw error when user_settings_key parameter is not a string.', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 123,
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('The "user_settings_key" schemaOption must be a string, but received number!');
});
test('Throw error when no parent route is set', () => {
    const locale = mobx_1.observable.box('en');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 3, { locale }, { webspace: 'sulu' }), 'test'));
    const schemaOptions = {
        resource_key: {
            name: 'resource_key',
            value: 'page_versions',
        },
        list_key: {
            name: 'list_key',
            value: 'page_versions',
        },
        user_settings_key: {
            name: 'user_settings_key',
            value: 'page_versions',
        },
    };
    const router = new services_1.Router();
    const postPromise = Promise.resolve();
    services_1.ResourceRequester.post.mockReturnValue(postPromise);
    const pageSettingsVersions = (0, enzyme_1.shallow)(<SettingsVersions_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} router={router} schemaOptions={schemaOptions}/>);
    expect(() => pageSettingsVersions.instance().parentRoute).toThrow('A route with a valid parent route is required for this field type to work properly!');
});
