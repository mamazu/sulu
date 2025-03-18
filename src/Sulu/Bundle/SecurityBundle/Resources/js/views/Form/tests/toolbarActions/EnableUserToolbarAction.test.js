"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceStore_1 = __importDefault(require("sulu-admin-bundle/stores/ResourceStore"));
const Router_1 = __importDefault(require("sulu-admin-bundle/services/Router"));
const Form_1 = __importDefault(require("sulu-admin-bundle/views/Form/Form"));
const Form_2 = require("sulu-admin-bundle/containers/Form");
const services_1 = require("sulu-admin-bundle/services");
const EnableUserToolbarAction_1 = __importDefault(require("../../toolbarActions/EnableUserToolbarAction"));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function () {
    this.data = {};
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => (class {
    constructor(resourceStore) {
        this.change = jest.fn();
        this.resourceStore = resourceStore;
    }
    get id() {
        return this.resourceStore.id;
    }
    get data() {
        return this.resourceStore.data;
    }
    get locale() {
        return this.resourceStore.locale;
    }
    get loading() {
        return this.resourceStore.loading;
    }
}));
jest.mock('sulu-admin-bundle/services/Router/Router', () => jest.fn());
jest.mock('sulu-admin-bundle/views/Form/Form', () => jest.fn(function () {
    this.errors = [];
    this.showSuccessSnackbar = jest.fn();
    this.submit = jest.fn();
}));
jest.mock('sulu-admin-bundle/services', () => ({
    ResourceRequester: {
        post: jest.fn(),
    },
}));
function createEnableUserToolbarAction() {
    const resourceStore = new ResourceStore_1.default('test');
    const resourceFormStore = new Form_2.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_1.default({
        locales: [],
        resourceStore,
        route: router.route,
        router,
    });
    return new EnableUserToolbarAction_1.default(resourceFormStore, form, router, [], {}, resourceStore);
}
test('Return item config with correct disabled, loading, icon, type and label', () => {
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = false;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    expect(toolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        type: 'button',
        icon: 'su-enter',
        label: 'sulu_security.enable_user',
        loading: false,
    }));
});
test('Return null as item config when resource store is loading', () => {
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = true;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    expect(toolbarAction.getToolbarItemConfig()).toBeFalsy();
});
test('Return null as item config when user has no id yet', () => {
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = true;
    toolbarAction.resourceFormStore.resourceStore.data.id = null;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    expect(toolbarAction.getToolbarItemConfig()).toBeFalsy();
});
test('Return null as item config when user is already enabled', () => {
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = true;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = true;
    expect(toolbarAction.getToolbarItemConfig()).toBeFalsy();
});
test('Call ResourceRequester with correct parameters when button is clicked', () => {
    const enableUserPromise = Promise.resolve({ enabled: true });
    services_1.ResourceRequester.post.mockReturnValue(enableUserPromise);
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = false;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    toolbarAction.resourceFormStore.resourceStore.locale = 'de';
    const toolbarItemConfig = toolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The ToolbarItemConfig should not be undefined or null');
    }
    toolbarItemConfig.onClick();
    expect(services_1.ResourceRequester.post).toBeCalledWith('users', undefined, { action: 'enable', id: 1234, locale: 'de' });
});
test('Return item config with loading button during request', () => {
    const enableUserPromise = Promise.resolve({ enabled: true });
    services_1.ResourceRequester.post.mockReturnValue(enableUserPromise);
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = false;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    expect(toolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        loading: false,
    }));
    const toolbarItemConfig = toolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The ToolbarItemConfig should not be undefined or null');
    }
    toolbarItemConfig.onClick();
    expect(toolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        loading: true,
    }));
    return enableUserPromise.then(() => {
        expect(toolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
            loading: false,
        }));
    });
});
test('Set new enabled value to ResourceFormStore and show success-snackbar on successful request', () => {
    const enableUserPromise = Promise.resolve({ enabled: true });
    services_1.ResourceRequester.post.mockReturnValue(enableUserPromise);
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = false;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    const toolbarItemConfig = toolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The ToolbarItemConfig should not be undefined or null');
    }
    toolbarItemConfig.onClick();
    return enableUserPromise.then(() => {
        expect(toolbarAction.resourceFormStore.change).toBeCalledWith('enabled', true, { isServerValue: true });
        expect(toolbarAction.form.showSuccessSnackbar).toBeCalled();
    });
});
test('Push error to form view on failed request', (done) => {
    const enableUserPromise = Promise.reject();
    services_1.ResourceRequester.post.mockReturnValue(enableUserPromise);
    const toolbarAction = createEnableUserToolbarAction();
    toolbarAction.resourceFormStore.resourceStore.loading = false;
    toolbarAction.resourceFormStore.resourceStore.data.id = 1234;
    toolbarAction.resourceFormStore.resourceStore.data.enabled = false;
    expect(toolbarAction.form.errors).toHaveLength(0);
    const toolbarItemConfig = toolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The ToolbarItemConfig should not be undefined or null');
    }
    toolbarItemConfig.onClick();
    setTimeout(() => {
        expect(toolbarAction.form.errors).toHaveLength(1);
        done();
    });
});
