"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const ListStore_1 = __importDefault(require("../../../../containers/List/stores/ListStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const List_1 = __importDefault(require("../../../../views/List"));
const ExportToolbarAction_1 = __importDefault(require("../../toolbarActions/ExportToolbarAction"));
const resourceRouteRegistry_1 = __importDefault(require("../../../../services/ResourceRequester/registries/resourceRouteRegistry"));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../containers/List/stores/ListStore', () => jest.fn(function (resourceKey) {
    this.data = [];
    this.filterQueryOption = {};
    this.searchTerm = mobx_1.observable.box();
    this.resourceKey = resourceKey;
}));
jest.mock('../../../../views/List/List', () => jest.fn(function () {
    this.locale = mobx_1.observable.box();
}));
jest.mock('../../../../services/Router/Router', () => jest.fn());
jest.mock('../../../../services/ResourceRequester/registries/resourceRouteRegistry', () => ({
    getUrl: jest.fn(),
}));
function createExportToolbarAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new ResourceStore_1.default('test');
    return new ExportToolbarAction_1.default(listStore, list, router, locales, resourceStore, options);
}
test('Return config for toolbar item', () => {
    const exportToolbarAction = createExportToolbarAction();
    expect(exportToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        icon: 'su-download',
        label: 'sulu_admin.export',
        type: 'button',
    }));
});
test('Return config for non-empty toolbar item', () => {
    const exportToolbarAction = createExportToolbarAction();
    exportToolbarAction.listStore.data.push({});
    expect(exportToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-download',
        label: 'sulu_admin.export',
        type: 'button',
    }));
});
test('Export current result when button is clicked and dialog is confirmed', () => {
    delete window.location;
    window.location = { assign: jest.fn() };
    const exportToolbarAction = createExportToolbarAction();
    exportToolbarAction.listStore.data.push({});
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/list');
    const toolbarItemConfig = exportToolbarAction.getToolbarItemConfig();
    toolbarItemConfig.onClick();
    const element = (0, enzyme_1.mount)(exportToolbarAction.getNode());
    element.find('Button[skin="primary"]').simulate('click');
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('list', 'test', {
        _format: 'csv',
        delimiter: ';',
        enclosure: '"',
        escape: '\\',
        filter: undefined,
        flat: true,
        locale: undefined,
        newLine: '\\n',
        search: undefined,
    });
    expect(window.location.assign).toBeCalledWith('/list');
});
test('Export current result with applied filter and search when button is clicked and dialog is confirmed', () => {
    delete window.location;
    window.location = { assign: jest.fn() };
    const exportToolbarAction = createExportToolbarAction();
    exportToolbarAction.listStore.data.push({});
    exportToolbarAction.listStore.searchTerm.set('search');
    exportToolbarAction.listStore.filterQueryOption = { test: { eq: 'Test' } };
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/list');
    const toolbarItemConfig = exportToolbarAction.getToolbarItemConfig();
    toolbarItemConfig.onClick();
    const element = (0, enzyme_1.mount)(exportToolbarAction.getNode());
    element.find('Button[skin="primary"]').simulate('click');
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('list', 'test', {
        _format: 'csv',
        delimiter: ';',
        enclosure: '"',
        escape: '\\',
        filter: { test: { eq: 'Test' } },
        flat: true,
        locale: undefined,
        newLine: '\\n',
        search: 'search',
    });
    expect(window.location.assign).toBeCalledWith('/list');
});
