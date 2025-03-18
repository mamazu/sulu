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
const webspaceStore_1 = __importDefault(require("../../../../stores/webspaceStore"));
const PageSettingsNavigationSelect_1 = __importDefault(require("../../fields/PageSettingsNavigationSelect"));
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
jest.mock('../../../../stores/webspaceStore', () => ({
    getWebspace: jest.fn(),
}));
test('Pass correct props to MultiSelect', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    const webspace = {
        navigations: [
            { key: 'main', title: 'Main Navigation' },
            { key: 'footer', title: 'Footer Navigation' },
        ],
    };
    webspaceStore_1.default.getWebspace.mockReturnValue(webspace);
    const pageSettingsNavigationSelect = (0, enzyme_1.shallow)(<PageSettingsNavigationSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} value={['footer']}/>);
    expect(webspaceStore_1.default.getWebspace).toBeCalledWith('sulu_io');
    expect(pageSettingsNavigationSelect.find('MultiSelect').prop('disabled')).toEqual(true);
    expect(pageSettingsNavigationSelect.find('MultiSelect').prop('values')).toEqual(['footer']);
    expect(pageSettingsNavigationSelect.find('Option').at(0).prop('children')).toEqual('Main Navigation');
    expect(pageSettingsNavigationSelect.find('Option').at(0).prop('value')).toEqual('main');
    expect(pageSettingsNavigationSelect.find('Option').at(1).prop('children')).toEqual('Footer Navigation');
    expect(pageSettingsNavigationSelect.find('Option').at(1).prop('value')).toEqual('footer');
});
test('Call onChange and onBlur if the value is changed', () => {
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    const webspace = {
        navigations: [
            { key: 'main', title: 'Main Navigation' },
            { key: 'footer', title: 'Footer Navigation' },
        ],
    };
    webspaceStore_1.default.getWebspace.mockReturnValue(webspace);
    const pageSettingsNavigationSelect = (0, enzyme_1.shallow)(<PageSettingsNavigationSelect_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={['footer']}/>);
    pageSettingsNavigationSelect.find('MultiSelect').prop('onChange')(['footer', 'main']);
    expect(changeSpy).toBeCalledWith(['footer', 'main']);
    expect(finishSpy).toBeCalledWith();
});
