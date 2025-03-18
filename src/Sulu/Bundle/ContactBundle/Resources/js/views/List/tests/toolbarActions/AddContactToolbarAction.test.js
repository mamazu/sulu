"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const services_1 = require("sulu-admin-bundle/services");
const stores_1 = require("sulu-admin-bundle/stores");
const views_1 = require("sulu-admin-bundle/views");
const AddContactToolbarAction_1 = __importDefault(require("../../toolbarActions/AddContactToolbarAction"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.options = {};
    this.reload = jest.fn();
}));
jest.mock('sulu-admin-bundle/views/List/List', () => jest.fn());
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn());
jest.mock('sulu-admin-bundle/services/ResourceRequester/ResourceRequester', () => ({
    put: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore/ResourceStore', () => jest.fn(function () {
    this.data = {};
    this.setMultiple = jest.fn();
}));
function createAddContactToolbarAction() {
    const router = new services_1.Router({});
    const listStore = new containers_1.ListStore('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new views_1.List({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new stores_1.ResourceStore('test');
    return new AddContactToolbarAction_1.default(listStore, list, router, locales, resourceStore, {});
}
test('Return config for toolbar item', () => {
    const addContactToolbarAction = createAddContactToolbarAction();
    expect(addContactToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        icon: 'su-plus-circle',
        label: 'sulu_admin.add',
        type: 'button',
    }));
});
test('Open dialog if button is clicked', () => {
    const addContactToolbarAction = createAddContactToolbarAction();
    const clickHandler = addContactToolbarAction.getToolbarItemConfig().onClick;
    expect((0, enzyme_1.shallow)(addContactToolbarAction.getNode()).instance().props.open).toEqual(false);
    clickHandler();
    expect((0, enzyme_1.shallow)(addContactToolbarAction.getNode()).instance().props.open).toEqual(true);
});
test('Pass correct options to components', () => {
    const addContactToolbarAction = createAddContactToolbarAction();
    addContactToolbarAction.listStore.options.accountId = 4;
    const clickHandler = addContactToolbarAction.getToolbarItemConfig().onClick;
    clickHandler();
    const node = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(node.find('ResourceSingleSelect').prop('editable')).toEqual(true);
    expect(node.find('SingleAutoComplete').prop('options')).toEqual({ excludedAccountId: 4, flat: false });
});
test('Reset fields if overlay is just closed', () => {
    const addContactToolbarAction = createAddContactToolbarAction();
    const clickHandler = addContactToolbarAction.getToolbarItemConfig().onClick;
    clickHandler();
    let addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.instance().props.open).toEqual(true);
    addContactOverlay.find('SingleAutoComplete').prop('selectionStore').set({ id: 3 });
    addContactOverlay.find('ResourceSingleSelect').prop('onChange')(5);
    addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.find('SingleAutoComplete').prop('selectionStore').item).toEqual({ id: 3 });
    expect(addContactOverlay.find('ResourceSingleSelect').prop('value')).toEqual(5);
    addContactOverlay.instance().props.onClose();
    addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.instance().props.open).toEqual(false);
    clickHandler();
    addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.find('SingleAutoComplete').prop('selectionStore').item).toEqual(undefined);
    expect(addContactOverlay.find('ResourceSingleSelect').prop('value')).toEqual(undefined);
    expect(services_1.ResourceRequester.put).not.toBeCalled();
});
test('Add selected contact to current account', () => {
    const addContactToolbarAction = createAddContactToolbarAction();
    addContactToolbarAction.listStore.options.accountId = 4;
    const clickHandler = addContactToolbarAction.getToolbarItemConfig().onClick;
    const putPromise = Promise.resolve();
    services_1.ResourceRequester.put.mockReturnValue(putPromise);
    clickHandler();
    let addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.instance().props.open).toEqual(true);
    expect(addContactOverlay.instance().props.confirmDisabled).toEqual(true);
    addContactOverlay.find('SingleAutoComplete').prop('selectionStore').set({ id: 3 });
    addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.instance().props.confirmDisabled).toEqual(false);
    addContactOverlay.instance().props.onConfirm();
    addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode()).instance();
    expect(addContactOverlay.props).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    expect(services_1.ResourceRequester.put).toBeCalledWith('account_contacts', { position: undefined }, { accountId: 4, id: 3 });
    return putPromise.then(() => {
        addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode()).instance();
        expect(addContactOverlay.props).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        const resourceStore = addContactToolbarAction.resourceStore;
        if (!resourceStore) {
            throw new Error('The resourceStore must be set on the ToolbarAction!');
        }
        expect(addContactToolbarAction.listStore.reload).toBeCalledWith();
    });
});
test('Add selected contact to current account with position', () => {
    const addContactToolbarAction = createAddContactToolbarAction();
    addContactToolbarAction.listStore.options.accountId = 4;
    const clickHandler = addContactToolbarAction.getToolbarItemConfig().onClick;
    const putPromise = Promise.resolve();
    services_1.ResourceRequester.put.mockReturnValue(putPromise);
    clickHandler();
    let addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode());
    expect(addContactOverlay.instance().props.open).toEqual(true);
    addContactOverlay.find('SingleAutoComplete').prop('selectionStore').set({ id: 3 });
    addContactOverlay.find('ResourceSingleSelect').prop('onChange')(5);
    addContactOverlay.instance().props.onConfirm();
    addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode()).instance();
    expect(addContactOverlay.props).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    expect(services_1.ResourceRequester.put).toBeCalledWith('account_contacts', { position: 5 }, { accountId: 4, id: 3 });
    return putPromise.then(() => {
        addContactOverlay = (0, enzyme_1.shallow)(addContactToolbarAction.getNode()).instance();
        expect(addContactOverlay.props).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        const resourceStore = addContactToolbarAction.resourceStore;
        if (!resourceStore) {
            throw new Error('The resourceStore must be set on the ToolbarAction!');
        }
        expect(addContactToolbarAction.listStore.reload).toBeCalledWith();
    });
});
