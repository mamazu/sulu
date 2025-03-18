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
const DeleteMediaToolbarAction_1 = __importDefault(require("../../toolbarActions/DeleteMediaToolbarAction"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function () {
    this.selectionIds = [];
    this.deleteSelection = jest.fn();
    this.deletingSelection = false;
}));
jest.mock('sulu-admin-bundle/views/List/List', () => jest.fn());
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn());
jest.mock('sulu-admin-bundle/services/ResourceRequester/ResourceRequester', () => ({
    patch: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore/ResourceStore', () => jest.fn(function () {
    this.data = {};
    this.setMultiple = jest.fn();
    this.set = jest.fn();
}));
function createDeleteMediaToolbarAction() {
    const router = new services_1.Router({});
    const listStore = new containers_1.ListStore('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new views_1.List({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new stores_1.ResourceStore('test');
    return new DeleteMediaToolbarAction_1.default(listStore, list, router, locales, resourceStore, {});
}
test('Return config for toolbar item', () => {
    const deleteMediaToolbarAction = createDeleteMediaToolbarAction();
    deleteMediaToolbarAction.listStore.selectionIds = [1];
    expect(deleteMediaToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-trash-alt',
        label: 'sulu_admin.delete',
        type: 'button',
    }));
});
test('Return config for toolbar item when nothing is selected', () => {
    const deleteMediaToolbarAction = createDeleteMediaToolbarAction();
    expect(deleteMediaToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        icon: 'su-trash-alt',
        label: 'sulu_admin.delete',
        type: 'button',
    }));
});
test('Open dialog if button is clicked', () => {
    const deleteMediaToolbarAction = createDeleteMediaToolbarAction();
    const clickHandler = deleteMediaToolbarAction.getToolbarItemConfig().onClick;
    expect((0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance().props.open).toEqual(false);
    clickHandler();
    expect((0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance().props.open).toEqual(true);
});
test('Do nothing if cancel button is clicked', () => {
    const deleteMediaToolbarAction = createDeleteMediaToolbarAction();
    const clickHandler = deleteMediaToolbarAction.getToolbarItemConfig().onClick;
    clickHandler();
    expect((0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance().props.open).toEqual(true);
    (0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance().props.onCancel();
    expect((0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance().props.open).toEqual(false);
    expect(services_1.ResourceRequester.patch).not.toBeCalled();
});
test('Delete selected items if confirm button is clicked', () => {
    const deleteMediaToolbarAction = createDeleteMediaToolbarAction();
    deleteMediaToolbarAction.listStore.selectionIds = [3, 4];
    if (!deleteMediaToolbarAction.resourceStore) {
        throw new Error('The resourceStore must be set on the ToolbarAction!');
    }
    deleteMediaToolbarAction.resourceStore.data = { medias: [1, 2, 3, 4, 5] };
    deleteMediaToolbarAction.resourceStore.resourceKey = 'contacts';
    const clickHandler = deleteMediaToolbarAction.getToolbarItemConfig().onClick;
    const deleteSelectionPromise = Promise.resolve();
    deleteMediaToolbarAction.listStore.deleteSelection.mockReturnValue(deleteSelectionPromise);
    clickHandler();
    let deleteMediaDialog = (0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance();
    expect(deleteMediaDialog.props.open).toEqual(true);
    deleteMediaDialog.props.onConfirm();
    deleteMediaToolbarAction.listStore.deletingSelection = true;
    expect(deleteMediaToolbarAction.listStore.deleteSelection).toBeCalledWith();
    deleteMediaDialog = (0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance();
    expect(deleteMediaDialog.props).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    return deleteSelectionPromise.then(() => {
        deleteMediaToolbarAction.listStore.deletingSelection = false;
        deleteMediaDialog = (0, enzyme_1.shallow)(deleteMediaToolbarAction.getNode()).instance();
        expect(deleteMediaDialog.props).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        const resourceStore = deleteMediaToolbarAction.resourceStore;
        if (!resourceStore) {
            throw new Error('The resourceStore must be set on the ToolbarAction!');
        }
        expect(resourceStore.set).toBeCalledWith('medias', [1, 2, 5]);
    });
});
