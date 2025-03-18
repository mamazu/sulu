"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const stores_1 = require("sulu-admin-bundle/stores");
const mobx_1 = require("mobx");
const PageTreeRoute_1 = __importDefault(require("../../fields/PageTreeRoute"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    contentLocale: 'de',
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.selections = [];
    this.clearSelection = jest.fn();
    this.select = jest.fn();
    this.destroy = jest.fn();
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, options) {
    this.resourceKey = resourceKey;
    this.id = id;
    if (options) {
        this.locale = options.locale;
    }
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/MemoryFormStore', () => jest.fn(function (data, schema) {
    this.data = data;
    this.schema = schema;
    this.change = jest.fn().mockImplementation((name, value) => {
        this.data[name] = value;
    });
    this.validate = jest.fn().mockReturnValue(true);
    this.destroy = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey) {
    this.resourceKey = resourceStore.resourceKey;
    this.id = resourceStore.id;
    this.locale = resourceStore.locale;
    if (formKey) {
        this.formKey = formKey;
    }
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (resourceFormStore) {
    this.id = resourceFormStore.id;
    this.locale = resourceFormStore.locale;
    this.isFieldModified = jest.fn();
    this.options = {
        webspace: 'webspace',
    };
    this.getPathsByTag = jest.fn().mockReturnValue([]);
}));
jest.mock('sulu-admin-bundle/stores/SingleSelectionStore', () => jest.fn(function () {
    this.set = jest.fn((item) => {
        this.item = item;
    });
    this.loadItem = jest.fn((id) => {
        this.item = { id, url: '/test/' + id };
    });
    this.clear = jest.fn();
    (0, mobx_1.extendObservable)(this, {
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
    };
    const value = {
        page: {
            uuid: 'uuid-uuid-uuid-uuid',
        },
        suffix: '/hello',
    };
    const locale = mobx_1.observable.box('de');
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages', 'diuu-diuu-diuu-diuu', { locale }), 'test'));
    const pageTreeRoute = (0, enzyme_1.mount)(<PageTreeRoute_1.default {...TestHelper_1.fieldTypeDefaultProps} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} value={value}/>);
    expect(modeResolver).toHaveBeenCalled();
    return modePromise.then(() => {
        pageTreeRoute.update();
        expect(pageTreeRoute.render()).toMatchSnapshot();
        expect(pageTreeRoute.find(containers_1.SingleSelection).prop('value')).toBe(value.page.uuid);
        expect(stores_1.SingleSelectionStore).toHaveBeenCalledWith('pages', 'uuid-uuid-uuid-uuid', locale, undefined);
        const singleSelection = pageTreeRoute.find(containers_1.SingleSelection);
        singleSelection.instance().singleSelectionStore.item = {};
        singleSelection.update();
        expect(singleSelection.find('.item').text()).toBe('/test/uuid-uuid-uuid-uuid');
        expect(singleSelection.render()).toMatchSnapshot();
        expect(pageTreeRoute.find(containers_1.ResourceLocator).prop('value')).toBe(value.suffix);
    });
});
test('Render a PageTreeRoute without value', () => {
    const modePromiseValue = 'leaf';
    const modePromise = Promise.resolve(modePromiseValue);
    const modeResolver = jest.fn().mockImplementation(() => modePromise);
    const fieldTypeOptions = {
        modeResolver,
    };
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('pages'), 'test'));
    const pageTreeRoute = (0, enzyme_1.mount)(<PageTreeRoute_1.default {...TestHelper_1.fieldTypeDefaultProps} fieldTypeOptions={fieldTypeOptions} formInspector={formInspector} value={null}/>);
    expect(modeResolver).toHaveBeenCalled();
    return modePromise.then(() => {
        pageTreeRoute.update();
        expect(pageTreeRoute.render()).toMatchSnapshot();
        expect(pageTreeRoute.find(containers_1.SingleSelection).prop('value')).toBe(null);
        expect(pageTreeRoute.find(containers_1.ResourceLocator).prop('value')).toBe(null);
    });
});
