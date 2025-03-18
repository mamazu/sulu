"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ListStore_1 = __importDefault(require("../../../../containers/List/stores/ListStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const List_1 = __importDefault(require("../../../../views/List"));
const DetailLinkItemAction_1 = __importDefault(require("../../itemActions/DetailLinkItemAction"));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../containers/List/stores/ListStore', () => jest.fn(function () {
    this.selectionIds = [];
    this.selections = [];
    this.deletingSelection = false;
}));
jest.mock('../../../../views/List/List', () => jest.fn(function () {
    this.requestSelectionDelete = jest.fn();
}));
jest.mock('../../../../services/Router/Router', () => (class {
    constructor() {
        this.navigateToResourceView = jest.fn();
        this.hasResourceView = jest.fn();
    }
}));
function createLinkItemAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new ResourceStore_1.default('test');
    return new DetailLinkItemAction_1.default(listStore, list, router, locales, resourceStore, options);
}
test('Return correct icon action config for given item', () => {
    const linkItemAction = createLinkItemAction({
        icon: 'su-test',
        resource_key_property: 'customResourceKey',
        resource_id_property: 'customResourceId',
        resource_view_attributes_property: 'customResourceViewAttributes',
    });
    linkItemAction.router.hasResourceView.mockReturnValue(true);
    const item = {
        customResourceKey: 'resource-key',
        customResourceId: '1',
        customResourceViewAttributes: {},
    };
    const itemActionConfig = linkItemAction.getItemActionConfig(item);
    expect(itemActionConfig).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-test',
    }));
    expect(itemActionConfig.onClick).toBeInstanceOf(Function);
});
test('Return disabled icon action config if no item is given', () => {
    const linkItemAction = createLinkItemAction();
    expect(linkItemAction.getItemActionConfig()).toEqual(expect.objectContaining({
        disabled: true,
    }));
});
test('Return disabled icon action config if link_property of given icon is not set', () => {
    const linkItemAction = createLinkItemAction();
    linkItemAction.router.hasResourceView.mockReturnValue(false);
    const item = {
        resourceKey: 'resource-key',
        resourceId: '1',
        resourceViewAttributes: {},
    };
    const itemActionConfig = linkItemAction.getItemActionConfig(item);
    expect(itemActionConfig).toEqual(expect.objectContaining({
        disabled: true,
    }));
});
test('On click route to correct resource view', () => {
    const linkItemAction = createLinkItemAction();
    linkItemAction.router.hasResourceView.mockReturnValue(false);
    const item = {
        resourceKey: 'resource-key',
        resourceId: '1',
        resourceViewAttributes: {},
    };
    const itemActionConfig = linkItemAction.getItemActionConfig(item);
    const clickCallback = itemActionConfig.onClick;
    expect(clickCallback).toBeInstanceOf(Function);
    if (clickCallback) {
        clickCallback(1, 1);
    }
    expect(linkItemAction.router.navigateToResourceView).toHaveBeenCalledWith('detail', 'resource-key', { id: '1' });
});
test('Throw error if "resource_key_property" option is not correctly set', () => {
    const linkItemAction = createLinkItemAction({
        resource_key_property: {},
    });
    expect(() => linkItemAction.getItemActionConfig()).toThrow(/resource_key_property/);
});
test('Throw error if "resource_key_property" item is not correctly set', () => {
    const linkItemAction = createLinkItemAction();
    const item = { resourceKey: {} };
    expect(() => linkItemAction.getItemActionConfig(item)).toThrow(/resource_key_property/);
});
test('Throw error if "resource_id_property" option is not correctly set', () => {
    const linkItemAction = createLinkItemAction({
        resource_id_property: {},
    });
    expect(() => linkItemAction.getItemActionConfig()).toThrow(/resource_id_property/);
});
test('Throw error if "resource_key_property" item is not correctly set', () => {
    const linkItemAction = createLinkItemAction();
    const item = { resourceId: {} };
    expect(() => linkItemAction.getItemActionConfig(item)).toThrow(/resource_id_property/);
});
test('Throw error if "resource_view_attributes_property" option is not correctly set', () => {
    const linkItemAction = createLinkItemAction({
        resource_view_attributes_property: {},
    });
    expect(() => linkItemAction.getItemActionConfig()).toThrow(/resource_view_attributes_property/);
});
test('Throw error if "resource_key_property" item is not correctly set', () => {
    const linkItemAction = createLinkItemAction();
    const item = { resourceViewAttributes: 'false' };
    expect(() => linkItemAction.getItemActionConfig(item)).toThrow(/resource_view_attributes_property/);
});
