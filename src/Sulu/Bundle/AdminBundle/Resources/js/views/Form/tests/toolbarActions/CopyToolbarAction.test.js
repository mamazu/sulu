"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const Form_1 = require("../../../../containers/Form");
const ResourceRequester_1 = __importDefault(require("../../../../services/ResourceRequester"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const Form_2 = __importDefault(require("../../../../views/Form"));
const CopyToolbarAction_1 = __importDefault(require("../../toolbarActions/CopyToolbarAction"));
const conditionDataProviderRegistry_1 = __importDefault(require("../../../../containers/Form/registries/conditionDataProviderRegistry"));
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
        name: 'current_route_name',
        options: {},
    };
}));
jest.mock('../../../../views/Form', () => jest.fn(function () {
    this.showSuccessSnackbar = jest.fn();
}));
function createCopyToolbarAction(options = {}) {
    const resourceStore = new ResourceStore_1.default('test');
    const formStore = new Form_1.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_2.default({
        locales: [],
        resourceStore,
        route: router.route,
        router,
    });
    return new CopyToolbarAction_1.default(formStore, form, router, [], options, resourceStore);
}
test('Return item config with correct disabled, type and label', () => {
    const copyToolbarAction = createCopyToolbarAction();
    expect(copyToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        label: 'sulu_admin.create_copy',
        type: 'button',
    }));
});
test('Return  item config with enabled button if form store contains an id', () => {
    const copyToolbarAction = createCopyToolbarAction();
    copyToolbarAction.resourceFormStore.resourceStore.id = 123;
    expect(copyToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
    }));
});
test('Return item config if passed visible_condition is met', () => {
    const copyToolbarAction = createCopyToolbarAction({ visible_condition: '_permission.edit' });
    copyToolbarAction.resourceFormStore.resourceStore.data._permission = { edit: true };
    expect(copyToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        label: 'sulu_admin.create_copy',
    }));
});
test('Return empty item config if passed visible_condition is not met', () => {
    const copyToolbarAction = createCopyToolbarAction({ visible_condition: '_permission.edit' });
    copyToolbarAction.resourceFormStore.resourceStore.data._permission = { edit: false };
    expect(copyToolbarAction.getToolbarItemConfig()).toEqual(undefined);
});
test('Include data of conditionDataProviderRegistry when evaluating passed visible_condition', () => {
    const copyToolbarAction = createCopyToolbarAction({ visible_condition: '__conditionDataProviderValue' });
    expect(copyToolbarAction.getToolbarItemConfig()).toBeUndefined();
    conditionDataProviderRegistry_1.default.add(() => ({ __conditionDataProviderValue: true }));
    expect(copyToolbarAction.getToolbarItemConfig()).toBeDefined();
    conditionDataProviderRegistry_1.default.clear();
    conditionDataProviderRegistry_1.default.add(() => ({ __conditionDataProviderValue: false }));
    expect(copyToolbarAction.getToolbarItemConfig()).toBeUndefined();
});
test('Display confirmation dialog when button is clicked', () => {
    const copyToolbarAction = createCopyToolbarAction();
    copyToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    copyToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = copyToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const onClickCallback = toolbarItemConfig.onClick;
    if (!onClickCallback) {
        throw new Error('A onClick callback should be registered on the unpublish option');
    }
    let element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    onClickCallback();
    element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    expect(element.render()).toMatchSnapshot();
});
test('Close confirmation dialog when onCancel callback is fired', () => {
    const copyToolbarAction = createCopyToolbarAction();
    copyToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    copyToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = copyToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const onClickCallback = toolbarItemConfig.onClick;
    if (!onClickCallback) {
        throw new Error('A onClick callback should be registered on the unpublish option');
    }
    let element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    onClickCallback();
    element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    element.prop('onCancel')();
    element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
});
test('Copy resource when confirmation dialog is confirmed', () => {
    const copyPromise = Promise.resolve({ id: 'copied-id', webspace: 'copied-webspace' });
    ResourceRequester_1.default.post.mockReturnValue(copyPromise);
    const copyToolbarAction = createCopyToolbarAction();
    copyToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyToolbarAction.resourceFormStore.resourceKey = 'pages';
    copyToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    copyToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = copyToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the unpublish option');
    }
    let element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    clickHandler();
    expect(element.prop('confirmLoading')).toEqual(false);
    element.prop('onConfirm')();
    element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
    expect(element.prop('confirmLoading')).toEqual(true);
    expect(ResourceRequester_1.default.post).toBeCalledWith('pages', undefined, { action: 'copy', id: 3, webspace: 'sulu_io' });
    return copyPromise.then(() => {
        element = (0, enzyme_1.mount)(copyToolbarAction.getNode());
        expect(copyToolbarAction.form.showSuccessSnackbar).toBeCalledWith();
        expect(element.prop('confirmLoading')).toEqual(false);
        expect(copyToolbarAction.router.navigate).toBeCalledWith('current_route_name', { id: 'copied-id', webspace: 'copied-webspace' });
    });
});
