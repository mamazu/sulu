"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const ListStore_1 = __importDefault(require("sulu-admin-bundle/containers/List/stores/ListStore"));
const Router_1 = __importDefault(require("sulu-admin-bundle/services/Router"));
const List_1 = __importDefault(require("sulu-admin-bundle/views/List"));
const Dialog_1 = __importDefault(require("sulu-admin-bundle/components/Dialog"));
const services_1 = require("sulu-admin-bundle/services");
const RestoreItemAction_1 = __importDefault(require("../../itemActions/RestoreItemAction"));
const React = react_1.default;
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    post: jest.fn(),
}));
jest.mock('sulu-admin-bundle/containers/List/stores/ListStore', () => jest.fn(function (resourceKey) {
    this.resourceKey = resourceKey;
    this.reload = jest.fn();
}));
jest.mock('sulu-admin-bundle/views/List/List', () => jest.fn());
jest.mock('sulu-admin-bundle/services/Router', () => jest.fn(function () {
    this.attributes = {};
    this.navigate = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/memoryFormStoreFactory', () => ({
    createFromFormKey: jest.fn(() => ({
        data: {},
    })),
}));
jest.mock('../../../../containers/RestoreFormOverlay', () => (class RestoreFormOverlay extends react_1.default.Component {
    render() {
        return <div>restore form overlay mock</div>;
    }
}));
function createItemAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('list-resource-key', 'list-key', 'settings-key', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    return new RestoreItemAction_1.default(listStore, list, router, undefined, undefined, options);
}
test('Return disabled item action config without callback if no item is given', () => {
    const itemAction = createItemAction();
    expect(itemAction.getItemActionConfig({ id: 'id-1234' })).toEqual(expect.objectContaining({
        disabled: false,
        onClick: expect.anything(),
    }));
    expect(itemAction.getItemActionConfig(undefined)).toEqual(expect.objectContaining({
        disabled: true,
        onClick: undefined,
    }));
});
test('Display dialog if onClick callback is fired', () => {
    const itemAction = createItemAction();
    let dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props()).toEqual(expect.objectContaining({
        open: false,
        cancelText: 'sulu_admin.cancel',
        confirmText: 'sulu_admin.ok',
        title: 'sulu_trash.restore_element',
    }));
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props()).toEqual(expect.objectContaining({
        open: true,
    }));
});
test('Close dialog if it is canceled', () => {
    const itemAction = createItemAction();
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    let dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props().open).toBeTruthy();
    dialog.props().onCancel();
    dialog = (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default);
    expect(dialog.props().open).toBeFalsy();
});
test('Send request and reload list store if dialog is confirmed', () => {
    const postPromise = Promise.resolve();
    services_1.ResourceRequester.post.mockReturnValue(postPromise);
    const itemAction = createItemAction();
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props().onConfirm();
    expect(services_1.ResourceRequester.post).toBeCalledWith('list-resource-key', {}, { action: 'restore', id: 'id-1234' });
    expect((0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props()).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    return postPromise.then(() => {
        expect((0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props()).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        expect(itemAction.listStore.reload).toBeCalledWith();
    });
});
test('Send request and navigate to view if dialog is confirmed and view is configured', () => {
    RestoreItemAction_1.default.restoreConfigurationMapping.test = {
        view: 'test-view',
        resultToView: { id: 'id' },
    };
    const postPromise = Promise.resolve({ id: '1234-1234-1234', key: 'test-key' });
    services_1.ResourceRequester.post.mockReturnValue(postPromise);
    const itemAction = createItemAction();
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234', resourceKey: 'test' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    (0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props().onConfirm();
    expect(services_1.ResourceRequester.post).toBeCalledWith('list-resource-key', {}, { action: 'restore', id: 'id-1234' });
    expect((0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props()).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    return postPromise.then(() => {
        expect((0, enzyme_1.mount)(itemAction.getNode()).find(Dialog_1.default).props()).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        expect(itemAction.router.navigate).toHaveBeenLastCalledWith('test-view', { id: '1234-1234-1234' });
    });
});
test('Display RestoreFormOverlay if onClick callback is fired', () => {
    RestoreItemAction_1.default.restoreConfigurationMapping.test = { form: 'foo' };
    const itemAction = createItemAction();
    let overlay = (0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay');
    expect(overlay.props()).toEqual(expect.objectContaining({
        open: false,
    }));
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234', resourceKey: 'test' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    overlay = (0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay');
    expect(overlay.props()).toEqual(expect.objectContaining({
        open: true,
        formKey: 'foo',
        trashItemId: 'id-1234',
    }));
});
test('Close dialog if it is canceled', () => {
    RestoreItemAction_1.default.restoreConfigurationMapping.test = { form: 'foo' };
    const itemAction = createItemAction();
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234', resourceKey: 'test' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    let overlay = (0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay');
    expect(overlay.props().open).toBeTruthy();
    overlay.props().onClose();
    overlay = (0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay');
    expect(overlay.props().open).toBeFalsy();
});
test('Send request and reload list store if dialog is confirmed', () => {
    RestoreItemAction_1.default.restoreConfigurationMapping.test = { form: 'foo' };
    const postPromise = Promise.resolve();
    services_1.ResourceRequester.post.mockReturnValue(postPromise);
    const itemAction = createItemAction();
    const onClick = itemAction.getItemActionConfig({ id: 'id-1234', resourceKey: 'test' }).onClick;
    if (!onClick) {
        throw new Error('The onClick callback should not be undefined in this case');
    }
    onClick('id-1234', 1);
    const data = { foo: 'bar' };
    (0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay').props().onConfirm(data);
    expect(services_1.ResourceRequester.post).toBeCalledWith('list-resource-key', data, { action: 'restore', id: 'id-1234' });
    expect((0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay').props()).toEqual(expect.objectContaining({
        confirmLoading: true,
        open: true,
    }));
    return postPromise.then(() => {
        expect((0, enzyme_1.mount)(itemAction.getNode()).find('RestoreFormOverlay').props()).toEqual(expect.objectContaining({
            confirmLoading: false,
            open: false,
        }));
        expect(itemAction.listStore.reload).toBeCalledWith();
    });
});
