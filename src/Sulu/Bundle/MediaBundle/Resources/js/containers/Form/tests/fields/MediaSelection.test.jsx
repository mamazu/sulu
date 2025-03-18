"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const FormInspector_1 = __importDefault(require("sulu-admin-bundle/containers/Form/FormInspector"));
const ResourceFormStore_1 = __importDefault(require("sulu-admin-bundle/containers/Form/stores/ResourceFormStore"));
const ResourceStore_1 = __importDefault(require("sulu-admin-bundle/stores/ResourceStore"));
const Router_1 = __importDefault(require("sulu-admin-bundle/services/Router"));
const MediaSelection_1 = __importDefault(require("../../fields/MediaSelection"));
const MultiMediaSelection_1 = __importDefault(require("../../../MultiMediaSelection"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.locale = observableOptions.locale;
    this.destroy = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
}));
jest.mock('sulu-admin-bundle/stores/MultiSelectionStore', () => jest.fn(function () {
    this.loadItems = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        items: [],
    });
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.selections = [];
    this.destroy = jest.fn();
    this.clear = jest.fn();
}));
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (formStore) {
    this.locale = formStore.locale;
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    contentLocale: 'userContentLocale',
}));
test('Pass correct props to MultiMediaSelection component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value={{ displayOption: undefined, ids: [55, 66, 77] }}/>);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().displayOptions).toEqual([]);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().disabled).toEqual(true);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().sortable).toEqual(true);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().locale.get()).toEqual('en');
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().value).toEqual({ ids: [55, 66, 77] });
});
test('Pass content-locale of user to MultiMediaSelection if locale is not present in form-inspector', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, {}), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={{ displayOption: undefined, ids: [55, 66, 77] }}/>);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().locale.get()).toEqual('userContentLocale');
});
test('Set default display option if no value is passed', () => {
    const changeSpy = jest.fn();
    const schemaOptions = {
        defaultDisplayOption: {
            name: 'defaultDisplayOption',
            value: 'left',
        },
        displayOptions: {
            name: 'displayOptions',
            value: [{ name: 'left', value: true }],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, {}), 'test'));
    (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).toBeCalledWith({ displayOption: 'left', ids: [] }, { 'isDefaultValue': true });
});
test('Pass correct props for given schema-options to MultiMediaSelection component', () => {
    const changeSpy = jest.fn();
    const schemaOptions = {
        types: {
            name: 'types',
            value: 'image,video',
        },
        sortable: {
            name: 'sortable',
            value: false,
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, {}), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().types).toEqual(['image', 'video']);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().sortable).toEqual(false);
});
test('Do not set default display option if value is passed', () => {
    const changeSpy = jest.fn();
    const schemaOptions = {
        defaultDisplayOption: {
            name: 'defaultDisplayOption',
            value: 'left',
        },
        displayOptions: {
            name: 'displayOptions',
            value: [{ name: 'left', value: true }],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, {}), 'test'));
    (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions} value={{ displayOption: undefined, ids: [] }}/>);
    expect(changeSpy).not.toBeCalled();
});
test('Should call onChange and onFinish if the selection changes', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={{ displayOption: undefined, ids: [55, 66, 77] }}/>);
    mediaSelection.find(MultiMediaSelection_1.default).props().onChange({ ids: [33, 44] });
    expect(changeSpy).toBeCalledWith({ ids: [33, 44] });
    expect(finishSpy).toBeCalled();
});
test('Should navigate to media if a media is clicked', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const router = new Router_1.default();
    const mediaSelection = (0, enzyme_1.mount)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} router={router} value={{ displayOption: undefined, ids: [55, 66] }}/>);
    mediaSelection.find('MultiMediaSelection').instance().mediaSelectionStore.items = [
        { id: 55, locale: 'en', mimeType: 'application/pdf' },
        { id: 66, locale: 'en', mimeType: 'application/pdf' },
    ];
    mediaSelection.update();
    mediaSelection.find('MultiItemSelection .content').at(0).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_media.form', { id: 55, locale: 'en' });
    mediaSelection.find('MultiItemSelection .content').at(1).simulate('click');
    expect(router.navigate).toHaveBeenLastCalledWith('sulu_media.form', { id: 66, locale: 'en' });
});
test('Should throw an error if given value does not have an ids property', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={{ unrelatedProperty: 123 }}/>)).toThrow(/"ids" property/);
});
test('Should log warning and use ids of objects if given value is an array of objects', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value={[{ id: 55 }, { id: 66 }, { id: 77 }]}/>);
    expect(mediaSelection.find(MultiMediaSelection_1.default).props().value).toEqual({ ids: [55, 66, 77] });
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('expects an object with an "ids" property as value'));
});
test('Should throw an error if displayOptions schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ displayOptions: { name: 'displayOptions', value: true } }}/>)).toThrow(/"displayOptions"/);
});
test('Should throw an error if given value is not an object', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={true}/>)).toThrow(/expects an object/);
});
test('Should throw an error if displayOptions schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ displayOptions: { name: 'displayOptions', value: true } }}/>)).toThrow(/"displayOptions"/);
});
test('Should throw an error if displayOptions schemaOption is given but contains an invalid value', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ displayOptions: { name: 'displayOptions', value: [{ name: 'test', value: true }] } }}/>)).toThrow(/"test"/);
});
test('Should throw an error if types schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ types: { name: 'types', value: true } }}/>)).toThrow(/"types"/);
});
test('Should throw an error if types schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<MediaSelection_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ types: { name: 'types', value: true } }}/>)).toThrow(/"types"/);
});
