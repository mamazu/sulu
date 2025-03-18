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
const AddMediaToolbarAction_1 = __importDefault(require("../../toolbarActions/AddMediaToolbarAction"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.options = {};
    this.selectionIds = [];
    this.reload = jest.fn();
}));
jest.mock('sulu-admin-bundle/views/List/List', () => jest.fn());
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn());
jest.mock('sulu-admin-bundle/services/ResourceRequester/ResourceRequester', () => ({
    patch: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore/ResourceStore', () => jest.fn(function () {
    this.data = {};
    this.setMultiple = jest.fn();
}));
function createAddMediaToolbarAction() {
    const router = new services_1.Router({});
    const listStore = new containers_1.ListStore('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new views_1.List({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new stores_1.ResourceStore('test');
    return new AddMediaToolbarAction_1.default(listStore, list, router, locales, resourceStore, {});
}
test('Return config for toolbar item', () => {
    const addMediaToolbarAction = createAddMediaToolbarAction();
    expect(addMediaToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        icon: 'su-plus-circle',
        label: 'sulu_admin.add',
        type: 'button',
    }));
});
test('Open dialog if button is clicked', () => {
    const addMediaToolbarAction = createAddMediaToolbarAction();
    const clickHandler = addMediaToolbarAction.getToolbarItemConfig().onClick;
    expect((0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance().props.open).toEqual(false);
    clickHandler();
    expect((0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance().props.open).toEqual(true);
});
test('Do nothing if overlay is just closed', () => {
    const addMediaToolbarAction = createAddMediaToolbarAction();
    const clickHandler = addMediaToolbarAction.getToolbarItemConfig().onClick;
    clickHandler();
    expect((0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance().props.open).toEqual(true);
    (0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance().props.onClose();
    expect((0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance().props.open).toEqual(false);
    expect(services_1.ResourceRequester.patch).not.toBeCalled();
});
test('Delete selected items if confirm button is clicked', () => {
    const addMediaToolbarAction = createAddMediaToolbarAction();
    addMediaToolbarAction.listStore.options.contactId = 4;
    if (!addMediaToolbarAction.resourceStore) {
        throw new Error('The resourceStore must be set on the ToolbarAction!');
    }
    addMediaToolbarAction.resourceStore.data = { medias: [1, 2] };
    addMediaToolbarAction.resourceStore.resourceKey = 'contacts';
    const clickHandler = addMediaToolbarAction.getToolbarItemConfig().onClick;
    const patchResponse = {};
    const patchPromise = Promise.resolve(patchResponse);
    services_1.ResourceRequester.patch.mockReturnValue(patchPromise);
    clickHandler();
    let mediaOverlay = (0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance();
    expect(mediaOverlay.props.open).toEqual(true);
    mediaOverlay.props.onConfirm([{ id: 3 }, { id: 4 }]);
    mediaOverlay = (0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance();
    expect(mediaOverlay.props).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    expect(services_1.ResourceRequester.patch).toBeCalledWith('contacts', { medias: [1, 2, 3, 4] }, { id: 4 });
    return patchPromise.then(() => {
        mediaOverlay = (0, enzyme_1.shallow)(addMediaToolbarAction.getNode()).instance();
        expect(mediaOverlay.props).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        const resourceStore = addMediaToolbarAction.resourceStore;
        if (!resourceStore) {
            throw new Error('The resourceStore must be set on the ToolbarAction!');
        }
        expect(addMediaToolbarAction.listStore.reload).toBeCalledWith();
        expect(resourceStore.setMultiple).toBeCalledWith(patchResponse);
    });
});
