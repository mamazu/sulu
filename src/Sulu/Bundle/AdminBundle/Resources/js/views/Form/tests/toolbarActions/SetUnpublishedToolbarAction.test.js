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
const SetUnpublishedToolbarAction_1 = __importDefault(require("../../toolbarActions/SetUnpublishedToolbarAction"));
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
function createSetUnpublishedToolbarAction(options = {}) {
    const resourceStore = new ResourceStore_1.default('test');
    const formStore = new Form_1.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_2.default({
        locales: [],
        resourceStore,
        route: router.route,
        router,
    });
    return new SetUnpublishedToolbarAction_1.default(formStore, form, router, [], options, resourceStore);
}
test('Return enabled item config', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = 5;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data.published = true;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data.publishedState = false;
    expect(setUnpublishedToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        label: 'sulu_page.unpublish',
    }));
});
test('Return item config if passed visible_condition is met', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction({ visible_condition: '_permission.edit' });
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data._permission = { edit: true };
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig).toEqual(expect.objectContaining({
        label: 'sulu_page.unpublish',
    }));
});
test('Return empty item config if deprecated display_condition is not met', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction({ display_condition: '_permission.live' });
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    expect(toolbarItemConfig).toEqual(undefined);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "display_condition" option is deprecated'));
});
test('Return empty item config if passed visible_condition is not met', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction({ visible_condition: '_permission.live' });
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    expect(toolbarItemConfig).toEqual(undefined);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Return disabled delete draft and unpublish items when page is not published', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = 5;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data.published = false;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data.publishedState = false;
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig).toEqual(expect.objectContaining({
        disabled: true,
        label: 'sulu_page.unpublish',
    }));
});
test('Return disabled delete draft item when page has no draft', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = 5;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data.published = true;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.data.publishedState = true;
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig).toEqual(expect.objectContaining({
        disabled: false,
        label: 'sulu_page.unpublish',
    }));
});
test('Return disabled item config', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = undefined;
    expect(setUnpublishedToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        label: 'sulu_page.unpublish',
    }));
});
test('Return no dialog if no id is set', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = undefined;
    expect(setUnpublishedToolbarAction.getNode()).toEqual(null);
});
test('Close dialog when onClose from unpublish dialog is called', () => {
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = 3;
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    setUnpublishedToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the unpublish option');
    }
    let element = (0, enzyme_1.mount)(setUnpublishedToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    element = (0, enzyme_1.mount)(setUnpublishedToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    element.prop('onCancel')();
    element = (0, enzyme_1.mount)(setUnpublishedToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
});
test('Unpublish page when dialog is confirmed', () => {
    const data = {
        title: 'Title',
    };
    const unpublishPromise = Promise.resolve(data);
    ResourceRequester_1.default.post.mockReturnValue(unpublishPromise);
    const setUnpublishedToolbarAction = createSetUnpublishedToolbarAction();
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.id = 3;
    setUnpublishedToolbarAction.resourceFormStore.resourceKey = 'pages';
    setUnpublishedToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    setUnpublishedToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = setUnpublishedToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the unpublish option');
    }
    let element = (0, enzyme_1.mount)(setUnpublishedToolbarAction.getNode());
    clickHandler();
    expect(element.prop('confirmLoading')).toEqual(false);
    element.prop('onConfirm')();
    element = (0, enzyme_1.mount)(setUnpublishedToolbarAction.getNode());
    expect(element.prop('confirmLoading')).toEqual(true);
    expect(ResourceRequester_1.default.post).toBeCalledWith('pages', undefined, { action: 'unpublish', id: 3, locale: setUnpublishedToolbarAction.resourceFormStore.locale, webspace: 'sulu_io' });
    return unpublishPromise.then(() => {
        element = (0, enzyme_1.mount)(setUnpublishedToolbarAction.getNode());
        expect(setUnpublishedToolbarAction.form.showSuccessSnackbar).toBeCalledWith();
        expect(element.prop('confirmLoading')).toEqual(false);
        expect(setUnpublishedToolbarAction.resourceFormStore.changeMultiple).toBeCalledWith(data, { isServerValue: true });
        expect(setUnpublishedToolbarAction.resourceFormStore.dirty).toEqual(false);
    });
});
