"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const FormInspector_1 = __importDefault(require("sulu-admin-bundle/containers/Form/FormInspector"));
const ResourceFormStore_1 = __importDefault(require("sulu-admin-bundle/containers/Form/stores/ResourceFormStore"));
const Router_1 = __importDefault(require("sulu-admin-bundle/services/Router"));
const ResourceStore_1 = __importDefault(require("sulu-admin-bundle/stores/ResourceStore"));
const SingleSelectionStore_1 = __importDefault(require("sulu-admin-bundle/stores/SingleSelectionStore"));
const mobx_1 = require("mobx");
const SingleMediaSelection_1 = __importDefault(require("../../../SingleMediaSelection"));
const SingleMediaSelection_2 = __importDefault(require("../../fields/SingleMediaSelection"));
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.locale = observableOptions.locale;
}));
jest.mock('sulu-admin-bundle/stores/SingleSelectionStore', () => jest.fn());
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
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
jest.mock('../../../SingleMediaSelectionOverlay', () => jest.fn(() => null));
test('Pass correct props to SingleMediaSelection component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} error={{ keyword: 'mandatory', parameters: {} }} formInspector={formInspector} value={{ displayOption: undefined, id: 33 }}/>);
    expect(mediaSelection.find(SingleMediaSelection_1.default).props().disabled).toEqual(true);
    expect(mediaSelection.find(SingleMediaSelection_1.default).props().valid).toEqual(false);
    expect(mediaSelection.find(SingleMediaSelection_1.default).props().locale.get()).toEqual('en');
    expect(mediaSelection.find(SingleMediaSelection_1.default).props().value).toEqual({ id: 33 });
});
test('Pass content-locale of user to SingleMediaSelection if locale is not present in form-inspector', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, {}), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value={{ displayOption: undefined, id: 33 }}/>);
    expect(mediaSelection.find(SingleMediaSelection_1.default).props().locale.get()).toEqual('userContentLocale');
});
test('Set types on SingleMediaSelectionComponent', () => {
    const changeSpy = jest.fn();
    const schemaOptions = {
        types: { name: 'types', value: 'image,video' },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const singleMediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(singleMediaSelection.find(SingleMediaSelection_1.default).props().types).toEqual(['image', 'video']);
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
            value: [{ name: 'left', value: 'true' }],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).toBeCalledWith({ displayOption: 'left', id: undefined }, { 'isDefaultValue': true });
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
            value: [{ name: 'left', value: 'true' }],
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions} value={{ displayOption: 'left', id: undefined }}/>);
    expect(changeSpy).not.toBeCalled();
});
test('Should call onChange and onFinish if the selection changes', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const mediaSelection = (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={{ displayOption: undefined, id: 55 }}/>);
    mediaSelection.find(SingleMediaSelection_1.default).props().onChange({ id: 44 });
    expect(changeSpy).toBeCalledWith({ id: 44 });
    expect(finishSpy).toBeCalled();
});
test('Should call onItemClick if item is clicked', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const router = new Router_1.default();
    SingleSelectionStore_1.default.mockImplementation(function () {
        this.item = { id: 6, locale: 'de', title: 'Test', mimeType: 'image/jpeg' };
    });
    const mediaSelection = (0, enzyme_1.mount)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} router={router} value={{ displayOption: undefined, id: 55 }}/>);
    mediaSelection.find('SingleItemSelection .item').simulate('click');
    expect(router.navigate).toBeCalledWith('sulu_media.form', { id: 6, locale: 'de' });
});
test('Should throw an error if given value is not an object', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={55}/>)).toThrow(/expects an object with an "id" property/);
});
test('Should throw an error if displayOptions schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ displayOptions: { name: 'displayOptions', value: true } }}/>)).toThrow(/"displayOptions"/);
});
test('Should throw an error if displayOptions schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ displayOptions: { name: 'displayOptions', value: [{ name: 'test', value: true }] } }}/>)).toThrow(/"displayOptions"/);
});
test('Should throw an error if types schemaOption is given but not an array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    expect(() => (0, enzyme_1.shallow)(<SingleMediaSelection_2.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={{ types: { name: 'types', value: true } }}/>)).toThrow(/"types"/);
});
