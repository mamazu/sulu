"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const ListStore_1 = __importDefault(require("sulu-admin-bundle/containers/List/stores/ListStore"));
const Router_1 = __importDefault(require("sulu-admin-bundle/services/Router"));
const List_1 = __importDefault(require("sulu-admin-bundle/views/List"));
const Dialog_1 = __importDefault(require("sulu-admin-bundle/components/Dialog"));
const services_1 = require("sulu-admin-bundle/services");
const RestoreVersionItemAction_1 = __importDefault(require("../../itemActions/RestoreVersionItemAction"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    post: jest.fn(),
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function (resourceKey) {
    this.resourceKey = resourceKey;
}));
jest.mock('sulu-admin-bundle/views/List/List', () => jest.fn());
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.attributes = {};
    this.navigate = jest.fn();
}));
function createItemAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('list-resource-key', 'list-key', 'settings-key', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    return new RestoreVersionItemAction_1.default(listStore, list, router, undefined, undefined, options);
}
test('Return disabled item action config without callback if no item is given', () => {
    const itemAction = createItemAction({ success_view: 'sulu_page.page_edit_form' });
    expect(itemAction.getItemActionConfig({ id: 'version-id-1234' })).toEqual(expect.objectContaining({
        disabled: false,
        onClick: expect.anything(),
    }));
    expect(itemAction.getItemActionConfig(undefined)).toEqual(expect.objectContaining({
        disabled: true,
        onClick: undefined,
    }));
});
test('Display dialog if onClick callback is fired', () => {
    const itemAction = createItemAction({ success_view: 'sulu_page.page_edit_form' });
    let dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props()).toEqual(expect.objectContaining({
        open: false,
        cancelText: 'sulu_admin.cancel',
        confirmText: 'sulu_admin.ok',
        title: 'sulu_page.restore_version',
    }));
    const onClick = itemAction.getItemActionConfig({ id: 'version-id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('version-id-1234', 1);
    dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props()).toEqual(expect.objectContaining({
        open: true,
    }));
});
test('Close dialog if it is canceled', () => {
    const itemAction = createItemAction({ success_view: 'sulu_page.page_edit_form' });
    const onClick = itemAction.getItemActionConfig({ id: 'version-id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('version-id-1234', 1);
    let dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props().open).toBeTruthy();
    dialog.props().onCancel();
    dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props().open).toBeFalsy();
});
test('Send request and navigate to "success_view" if dialog is confirmed', () => {
    const postPromise = Promise.resolve();
    services_1.ResourceRequester.post.mockReturnValue(postPromise);
    const itemAction = createItemAction({ success_view: 'sulu_page.page_edit_form' });
    itemAction.router.attributes = { id: 'page-id', locale: 'de', webspace: 'sulu' };
    const onClick = itemAction.getItemActionConfig({ id: 'version-id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('version-id-1234', 1);
    (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props().onConfirm();
    expect(services_1.ResourceRequester.post).toBeCalledWith('list-resource-key', {}, { action: 'restore', version: 'version-id-1234', id: 'page-id', locale: 'de', webspace: 'sulu' });
    expect((0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props()).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    return postPromise.then(() => {
        expect((0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props()).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        expect(itemAction.router.navigate).toBeCalledWith('sulu_page.page_edit_form', { id: 'page-id', locale: 'de', webspace: 'sulu' });
    });
});
test('Throw error when dialog is confirmed if given "success_view" option is not a string', () => {
    const itemAction = createItemAction({});
    const onClick = itemAction.getItemActionConfig({ id: 'version-id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('version-id-1234', 1);
    const dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(() => dialog.props().onConfirm()).toThrow(/success_view/);
});
