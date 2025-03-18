"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const stores_2 = require("sulu-page-bundle/stores");
const CustomUrlsLocaleSelect_1 = __importDefault(require("../../fields/CustomUrlsLocaleSelect"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(function (formStore) {
        this.options = formStore.options;
    }),
    ResourceFormStore: jest.fn(function (resourceStore, formKey, options) {
        this.options = options;
    }),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-page-bundle/stores', () => ({
    webspaceStore: {
        getWebspace: jest.fn(),
    },
}));
test('Pass correct props to MultiSelect', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    const webspace = {
        allLocalizations: [
            { localization: 'de' },
            { localization: 'en' },
        ],
    };
    stores_2.webspaceStore.getWebspace.mockReturnValue(webspace);
    const customUrlsDomainSelect = (0, enzyme_1.shallow)(<CustomUrlsLocaleSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value="en"/>);
    expect(stores_2.webspaceStore.getWebspace).toBeCalledWith('sulu_io');
    expect(customUrlsDomainSelect.find('SingleSelect').prop('disabled')).toEqual(true);
    expect(customUrlsDomainSelect.find('SingleSelect').prop('value')).toEqual('en');
    expect(customUrlsDomainSelect.find('Option').at(0).prop('children')).toEqual('de');
    expect(customUrlsDomainSelect.find('Option').at(0).prop('value')).toEqual('de');
    expect(customUrlsDomainSelect.find('Option').at(1).prop('children')).toEqual('en');
    expect(customUrlsDomainSelect.find('Option').at(1).prop('value')).toEqual('en');
});
test('Call onChange and onBlur if the value is changed', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    const webspace = {
        allLocalizations: [
            { localization: 'de' },
            { localization: 'en' },
        ],
    };
    stores_2.webspaceStore.getWebspace.mockReturnValue(webspace);
    const customUrlsDomainSelect = (0, enzyme_1.shallow)(<CustomUrlsLocaleSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value="de"/>);
    expect(stores_2.webspaceStore.getWebspace).toBeCalledWith('sulu_io');
    customUrlsDomainSelect.find('SingleSelect').prop('onChange')('en');
    expect(changeSpy).toBeCalledWith('en');
    expect(finishSpy).toBeCalledWith();
});
