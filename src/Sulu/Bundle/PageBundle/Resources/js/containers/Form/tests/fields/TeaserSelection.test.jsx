"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const services_1 = require("sulu-admin-bundle/services");
const TeaserSelection_1 = __importDefault(require("../../fields/TeaserSelection"));
const TeaserSelection_2 = __importDefault(require("../../../../containers/TeaserSelection"));
const teaserProviderRegistry_1 = __importDefault(require("../../../../containers/TeaserSelection/registries/teaserProviderRegistry"));
const TeaserStore_1 = __importDefault(require("../../../../containers/TeaserSelection/stores/TeaserStore"));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions = {}) {
    this.locale = observableOptions.locale;
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (formStore) {
    this.locale = formStore.locale;
}));
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({}));
jest.mock('../../../../containers/TeaserSelection/stores/TeaserStore', () => jest.fn(function () {
    this.add = jest.fn();
    this.findById = jest.fn();
}));
jest.mock('../../../../containers/TeaserSelection/registries/teaserProviderRegistry', () => ({
    get: jest.fn(),
    keys: [],
}));
test('Pass props correctly to component', () => {
    const changeSpy = jest.fn();
    const value = {
        presentAs: undefined,
        items: [],
    };
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'snippets'));
    const field = (0, enzyme_1.shallow)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} value={value}/>);
    expect(field.find(TeaserSelection_2.default).prop('disabled')).toEqual(false);
    expect(field.find(TeaserSelection_2.default).prop('locale').get()).toEqual('en');
    expect(field.find(TeaserSelection_2.default).prop('presentations')).toBe(undefined);
    expect(field.find(TeaserSelection_2.default).prop('value')).toBe(value);
});
test('Pass disabled value from props to component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets'));
    stores_1.userStore.contentLocale = 'de';
    const field = (0, enzyme_1.shallow)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector}/>);
    expect(field.find(TeaserSelection_2.default).prop('disabled')).toEqual(true);
});
test('Pass locale from userStore when form has no locale', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets'));
    stores_1.userStore.contentLocale = 'de';
    const field = (0, enzyme_1.shallow)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector}/>);
    expect(field.find(TeaserSelection_2.default).prop('locale').get()).toEqual('de');
});
test('Pass presentations prop correctly to component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets'));
    stores_1.userStore.contentLocale = 'de';
    const schemaOptions = {
        present_as: {
            name: 'present_as',
            value: [
                { name: 'test-1', title: 'Test 1' },
                { name: 'test-2', title: 'Test 2' },
            ],
        },
    };
    const field = (0, enzyme_1.shallow)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(field.find(TeaserSelection_2.default).prop('presentations')).toEqual([
        { label: 'Test 1', value: 'test-1' },
        { label: 'Test 2', value: 'test-2' },
    ]);
});
test('Navigate to item when item is clicked', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets'));
    stores_1.userStore.contentLocale = 'de';
    teaserProviderRegistry_1.default.get.mockReturnValue({
        resultToView: { 'attributes/webspaceKey': 'webspace', id: 'id' },
        title: 'Pages',
        view: 'sulu_page.page_edit_form',
    });
    const value = {
        presentAs: '',
        items: [
            {
                id: 5,
                type: 'pages',
            },
            {
                id: 2,
                type: 'pages',
            },
        ],
    };
    const router = new services_1.Router();
    TeaserStore_1.default.mockImplementation(function () {
        this.add = jest.fn();
        this.findById = jest.fn((type, id) => {
            if (id === 5) {
                return { attributes: { webspaceKey: 'sulu_io' }, title: 'Test 1' };
            }
            if (id === 2) {
                return { attributes: { webspaceKey: 'sulu_blog' }, title: 'Test 2' };
            }
        });
    });
    const field = (0, enzyme_1.mount)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} router={router} value={value}/>);
    field.find('MultiItemSelection .content.clickable').at(0).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_page.page_edit_form', { id: 5, webspace: 'sulu_io' });
    field.find('MultiItemSelection .content.clickable').at(1).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_page.page_edit_form', { id: 2, webspace: 'sulu_blog' });
});
test('Throw error if present_as schemaOption is from wrong type', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets'));
    stores_1.userStore.contentLocale = 'de';
    const schemaOptions = {
        present_as: {
            name: 'present_as',
            value: 'test',
        },
    };
    expect(() => (0, enzyme_1.shallow)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow(/present_as/);
});
test('Should call onChange and onFinish callback when TeaserSelection container fires onChange callback', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'snippets'));
    stores_1.userStore.contentLocale = 'de';
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const field = (0, enzyme_1.shallow)(<TeaserSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    field.find(TeaserSelection_2.default).prop('onChange')({
        presentAs: undefined,
        items: [],
    });
    expect(changeSpy).toBeCalledWith({
        presentAs: undefined,
        items: [],
    });
    expect(finishSpy).toBeCalledWith();
});
