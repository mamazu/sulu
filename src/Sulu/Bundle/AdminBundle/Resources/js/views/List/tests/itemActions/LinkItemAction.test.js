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
const LinkItemAction_1 = __importDefault(require("../../itemActions/LinkItemAction"));
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
jest.mock('../../../../services/Router/Router', () => jest.fn());
function createLinkItemAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new ResourceStore_1.default('test');
    return new LinkItemAction_1.default(listStore, list, router, locales, resourceStore, options);
}
test('Return correct icon action config for given item', () => {
    const linkItemAction = createLinkItemAction({ link_property: 'url', icon: 'su-eye' });
    const item = {
        url: 'www.sulu.io',
    };
    expect(linkItemAction.getItemActionConfig(item)).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-eye',
    }));
});
test('Return disabled icon action config if no item is given', () => {
    const linkItemAction = createLinkItemAction({ link_property: 'url', icon: 'su-eye' });
    expect(linkItemAction.getItemActionConfig()).toEqual(expect.objectContaining({
        disabled: true,
        icon: 'su-eye',
    }));
});
test('Return disabled icon action config if link_property of given icon is not set', () => {
    const linkItemAction = createLinkItemAction({ link_property: 'url', icon: 'su-eye' });
    const item = {
        otherProperty: 'www.sulu.io',
    };
    expect(linkItemAction.getItemActionConfig(item)).toEqual(expect.objectContaining({
        disabled: true,
        icon: 'su-eye',
    }));
});
test('Open correct link for given item if onClick callback is fired', () => {
    const linkItemAction = createLinkItemAction({ link_property: 'url', icon: 'su-eye' });
    const item = {
        url: 'www.sulu.io',
    };
    const itemActionConfig = linkItemAction.getItemActionConfig(item);
    delete window.location;
    window.location = {};
    const clickCallback = itemActionConfig.onClick;
    if (!clickCallback) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    clickCallback('row-id', 1);
    expect(window.location.href).toEqual('www.sulu.io');
});
test('Throw error if "link_property" option is not set', () => {
    const linkItemAction = createLinkItemAction({});
    expect(() => linkItemAction.getItemActionConfig()).toThrow(/link_property/);
});
test('Throw error if given "icon" option is not a string', () => {
    const linkItemAction = createLinkItemAction({ icon: {}, link_property: 'url' });
    expect(() => linkItemAction.getItemActionConfig()).toThrow(/icon/);
});
test('Throw error if given "link_property" option is not a string', () => {
    const linkItemAction = createLinkItemAction({ link_property: {} });
    expect(() => linkItemAction.getItemActionConfig()).toThrow(/link_property/);
});
test('Throw error if value of "link_property" of given item is not a string', () => {
    const linkItemAction = createLinkItemAction({ link_property: 'url' });
    expect(() => linkItemAction.getItemActionConfig({ url: true })).toThrow(/link_property/);
});
