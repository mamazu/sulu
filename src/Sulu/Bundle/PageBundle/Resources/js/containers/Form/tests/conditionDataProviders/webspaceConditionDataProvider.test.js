"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const defaultWebspace_1 = __importDefault(require("sulu-admin-bundle/utils/TestHelper/defaultWebspace"));
const webspaceStore_1 = __importDefault(require("../../../../stores/webspaceStore"));
const webspaceConditionDataProvider_1 = __importDefault(require("../../conditionDataProviders/webspaceConditionDataProvider"));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey, options, metadataOptions) {
    this.options = options;
    this.metadataOptions = metadataOptions;
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore/ResourceStore', () => jest.fn());
test('Return webspace from data', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'test' }));
    const webspace1 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'test', name: 'Test' });
    const webspace2 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'sulu', name: 'Sulu' });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect((0, webspaceConditionDataProvider_1.default)({ webspace: 'sulu' }, '/test', formInspector))
        .toEqual({ __webspace: webspace2, __webspaces: webspaces });
});
test('Return webspace from options', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu' }, { webspace: 'test' }));
    const webspace1 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'test', name: 'Test' });
    const webspace2 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'sulu', name: 'Sulu' });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect((0, webspaceConditionDataProvider_1.default)({}, '/test', formInspector))
        .toEqual({ __webspace: webspace2, __webspaces: webspaces });
});
test('Return webspace from metadataOptions', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', {}, { webspace: 'test' }));
    const webspace1 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'test', name: 'Test' });
    const webspace2 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'sulu', name: 'Sulu' });
    const webspaces = [webspace1, webspace2];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect((0, webspaceConditionDataProvider_1.default)({}, '/test', formInspector))
        .toEqual({ __webspace: webspace1, __webspaces: webspaces });
});
test('Return empty data if webspace does not exist', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', {}, {}));
    const webspace1 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'test', name: 'Test' });
    const webspaces = [webspace1];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect((0, webspaceConditionDataProvider_1.default)({ webspace: 'sulu' }, '/test', formInspector)).toEqual({ __webspaces: webspaces });
});
test('Return empty data if no webspace prop exists on data', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', {}, {}));
    const webspace1 = Object.assign(Object.assign({}, defaultWebspace_1.default), { key: 'test', name: 'Test' });
    const webspaces = [webspace1];
    webspaceStore_1.default.setWebspaces(webspaces);
    expect((0, webspaceConditionDataProvider_1.default)({}, '/test', formInspector)).toEqual({ __webspaces: webspaces });
});
