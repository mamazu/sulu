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
const DeleteToolbarAction_1 = __importDefault(require("../../toolbarActions/DeleteToolbarAction"));
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
function createDeleteToolbarAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new ResourceStore_1.default('test');
    return new DeleteToolbarAction_1.default(listStore, list, router, locales, resourceStore, options);
}
test('Return config for toolbar item', () => {
    const deleteToolbarAction = createDeleteToolbarAction();
    expect(deleteToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        icon: 'su-trash-alt',
        label: 'sulu_admin.delete',
        loading: false,
        type: 'button',
    }));
});
test('Return disabled config for toolbar item if one selected item fulfills the passed disabled_condition', () => {
    const deleteToolbarAction = createDeleteToolbarAction({ disabled_condition: 'url == "/"' });
    deleteToolbarAction.listStore.selectionIds.push(1);
    deleteToolbarAction.listStore.selections.push({ id: 1, url: '/test1' });
    expect(deleteToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-trash-alt',
        label: 'sulu_admin.delete',
        loading: false,
        type: 'button',
    }));
    deleteToolbarAction.listStore.selectionIds.push(2);
    deleteToolbarAction.listStore.selections.push({ id: 2, url: '/' });
    expect(deleteToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        icon: 'su-trash-alt',
        label: 'sulu_admin.delete',
        loading: false,
        type: 'button',
    }));
});
test('Return config for toolbar item with selection and currently deleting', () => {
    const deleteToolbarAction = createDeleteToolbarAction();
    deleteToolbarAction.listStore.selectionIds.push(1);
    deleteToolbarAction.listStore.deletingSelection = true;
    expect(deleteToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        icon: 'su-trash-alt',
        label: 'sulu_admin.delete',
        loading: true,
        type: 'button',
    }));
});
test.each([
    true,
    false,
])('Call requestSelectionDelete of list with an allowConflictDeletion value of %s', (allowConflictDeletion) => {
    const deleteToolbarAction = createDeleteToolbarAction({ allow_conflict_deletion: allowConflictDeletion });
    deleteToolbarAction.listStore.selectionIds.push(1);
    deleteToolbarAction.getToolbarItemConfig().onClick();
    expect(deleteToolbarAction.list.requestSelectionDelete).toBeCalledWith(allowConflictDeletion);
});
