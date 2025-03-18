"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const loglevel_1 = __importDefault(require("loglevel"));
const Form_1 = require("../../../../containers/Form");
const ResourceRequester_1 = __importDefault(require("../../../../services/ResourceRequester"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const Form_2 = __importDefault(require("../../../../views/Form"));
const DeleteDraftToolbarAction_1 = __importDefault(require("../../toolbarActions/DeleteDraftToolbarAction"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.id = id;
    this.data = {};
    this.observableOptions = observableOptions;
    this.locale = {
        get: jest.fn(),
    };
}));
jest.mock('../../../../services/ResourceRequester', () => ({
    post: jest.fn(),
}));
jest.mock('../../../../containers/Form/stores/ResourceFormStore', () => (class {
    constructor(resourceStore) {
        this.options = {};
        this.delete = jest.fn();
        this.changeMultiple = jest.fn();
        this.resourceStore = resourceStore;
    }
    get id() {
        return this.resourceStore.id;
    }
    get locale() {
        return this.resourceStore.locale;
    }
    get data() {
        return this.resourceStore.data;
    }
}));
jest.mock('../../../../services/Router', () => jest.fn(function () {
    this.navigate = jest.fn();
    this.route = {
        options: {},
    };
}));
jest.mock('../../../../views/Form', () => jest.fn(function () {
    this.submit = jest.fn();
    this.showSuccessSnackbar = jest.fn();
}));
function createDeleteDraftToolbarAction(options = {}) {
    const resourceStore = new ResourceStore_1.default('test');
    const formStore = new Form_1.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_2.default({
        locales: [],
        resourceStore,
        route: router.route,
        router,
    });
    return new DeleteDraftToolbarAction_1.default(formStore, form, router, [], options, resourceStore);
}
test('Return enabled item config', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction();
    deleteDraftToolbarAction.resourceFormStore.resourceStore.id = 5;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data.published = true;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data.publishedState = false;
    expect(deleteDraftToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        label: 'sulu_page.delete_draft',
        type: 'button',
    }));
});
test('Return no item config if deprecated display_condition is not met', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction({ display_condition: '_permission.live' });
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    expect(toolbarItemConfig).toEqual(undefined);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "display_condition" option is deprecated'));
});
test('Return no item config if passed visible_condition is not met', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction({ visible_condition: '_permission.live' });
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    expect(toolbarItemConfig).toEqual(undefined);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Return item config if passed visible_condition is met', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction({ visible_condition: '_permission.edit' });
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data._permission = { edit: true };
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig).toEqual(expect.objectContaining({ disabled: true, label: 'sulu_page.delete_draft' }));
});
test('Return disabled item config when page is not published', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction();
    deleteDraftToolbarAction.resourceFormStore.resourceStore.id = 5;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data.published = false;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data.publishedState = false;
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig).toEqual(expect.objectContaining({
        disabled: true,
        label: 'sulu_page.delete_draft',
    }));
});
test('Return disabled item config when page has no draft', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction();
    deleteDraftToolbarAction.resourceFormStore.resourceStore.id = 5;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data.published = true;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.data.publishedState = true;
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig).toEqual(expect.objectContaining({
        disabled: true,
        label: 'sulu_page.delete_draft',
    }));
});
test('Return no dialog if no id is set', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction();
    deleteDraftToolbarAction.resourceFormStore.resourceStore.id = undefined;
    expect(deleteDraftToolbarAction.getNode()).toEqual(null);
});
test('Close dialog when onClose from delete draft dialog is called', () => {
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction();
    deleteDraftToolbarAction.resourceFormStore.resourceStore.id = 3;
    deleteDraftToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    deleteDraftToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('An onClick callback should be registered on the delete draft option');
    }
    let element = (0, enzyme_1.mount)(deleteDraftToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    element = (0, enzyme_1.mount)(deleteDraftToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    element.prop('onCancel')();
    element = (0, enzyme_1.mount)(deleteDraftToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
});
test('Delete draft when dialog is confirmed', () => {
    const data = {
        title: 'Title',
    };
    const deleteDraftPromise = Promise.resolve(data);
    ResourceRequester_1.default.post.mockReturnValue(deleteDraftPromise);
    const deleteDraftToolbarAction = createDeleteDraftToolbarAction();
    deleteDraftToolbarAction.resourceFormStore.resourceStore.id = 3;
    deleteDraftToolbarAction.resourceFormStore.resourceKey = 'snippets';
    deleteDraftToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    deleteDraftToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = deleteDraftToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('An onClick callback should be registered on the delete draft option');
    }
    let element = (0, enzyme_1.mount)(deleteDraftToolbarAction.getNode());
    clickHandler();
    expect(element.prop('confirmLoading')).toEqual(false);
    element.prop('onConfirm')();
    element = (0, enzyme_1.mount)(deleteDraftToolbarAction.getNode());
    expect(element.prop('confirmLoading')).toEqual(true);
    expect(ResourceRequester_1.default.post).toBeCalledWith('snippets', undefined, { action: 'remove-draft', id: 3, locale: deleteDraftToolbarAction.resourceFormStore.locale, webspace: 'sulu_io' });
    return deleteDraftPromise.then(() => {
        element = (0, enzyme_1.mount)(deleteDraftToolbarAction.getNode());
        expect(deleteDraftToolbarAction.form.showSuccessSnackbar).toBeCalledWith();
        expect(element.prop('confirmLoading')).toEqual(false);
        expect(deleteDraftToolbarAction.resourceFormStore.changeMultiple).toBeCalledWith(data, { isServerValue: true });
        expect(deleteDraftToolbarAction.resourceFormStore.dirty).toEqual(false);
    });
});
