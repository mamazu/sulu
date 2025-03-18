"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const PageSettingsShadowLocaleSelect_1 = __importDefault(require("../../fields/PageSettingsShadowLocaleSelect"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(function (formStore) {
        this.options = formStore.options;
        this.getValueByPath = jest.fn();
        this.locale = formStore.locale;
    }),
    ResourceFormStore: jest.fn(function (resourceStore, options) {
        this.options = options;
        this.locale = resourceStore.locale;
    }),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(function (resourceKey, id, options) {
        this.locale = options.locale;
    }),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Pass correct props to SingleSelect', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        if (path === '/contentLocales') {
            return ['en', 'de', 'nl'];
        }
    });
    const pageSettingsShadowSelect = (0, enzyme_1.shallow)(<PageSettingsShadowLocaleSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value="de"/>);
    expect(pageSettingsShadowSelect.find('SingleSelect').prop('disabled')).toEqual(true);
    expect(pageSettingsShadowSelect.find('SingleSelect').prop('value')).toEqual('de');
    expect(pageSettingsShadowSelect.find('Option').at(0).prop('children')).toEqual('de');
    expect(pageSettingsShadowSelect.find('Option').at(0).prop('value')).toEqual('de');
    expect(pageSettingsShadowSelect.find('Option').at(1).prop('children')).toEqual('nl');
    expect(pageSettingsShadowSelect.find('Option').at(1).prop('value')).toEqual('nl');
});
test('Pass correct props to SingleSelect when no shadow-locale exists', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('de') }), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        if (path === '/contentLocales') {
            return ['de'];
        }
    });
    const pageSettingsShadowSelect = (0, enzyme_1.shallow)(<PageSettingsShadowLocaleSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector}/>);
    expect(pageSettingsShadowSelect.find('SingleSelect').prop('disabled')).toEqual(true);
    expect(pageSettingsShadowSelect.find('SingleSelect').prop('value')).toEqual(undefined);
    expect(pageSettingsShadowSelect.find('Option').length).toEqual(0);
});
test('Call onChange and onFinish if the value is changed', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('nl') }), 'test'));
    formInspector.getValueByPath.mockImplementation((path) => {
        if (path === '/contentLocales') {
            return ['en', 'de', 'nl'];
        }
    });
    const pageSettingsShadowSelect = (0, enzyme_1.shallow)(<PageSettingsShadowLocaleSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value="de"/>);
    pageSettingsShadowSelect.find('SingleSelect').prop('onChange')('en');
    expect(changeSpy).toBeCalledWith('en');
    expect(finishSpy).toBeCalledWith();
});
