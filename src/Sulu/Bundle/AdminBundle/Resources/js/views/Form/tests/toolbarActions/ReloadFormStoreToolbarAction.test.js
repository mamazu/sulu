"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const router_1 = __importDefault(require("fos-jsrouting/router"));
const ReloadFormStoreToolbarAction_1 = __importDefault(require("../../toolbarActions/ReloadFormStoreToolbarAction"));
const Form_1 = require("../../../../containers/Form");
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const Form_2 = __importDefault(require("../../../../views/Form"));
const Requester_1 = __importDefault(require("../../../../services/Requester"));
jest.mock('../../../../services/Requester', () => ({
    post: jest.fn(),
}));
jest.mock('fos-jsrouting/router', () => ({
    generate: jest.fn(),
}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../containers/Form/stores/metadataStore', () => ({
    getSchema: jest.fn().mockReturnValue(Promise.resolve({})),
    getJsonSchema: jest.fn().mockReturnValue(Promise.resolve({})),
}));
jest.mock('../../../../containers/Form/stores/ResourceFormStore', () => (class {
    constructor(resourceStore) {
        this.options = {};
        this.setMultiple = jest.fn();
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
    this.errors = [];
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.id = id;
    this.data = {};
    this.observableOptions = observableOptions;
    this.locale = {
        get: jest.fn(),
    };
}));
function createReloadFormStoreToolbarAction(options = {}) {
    const resourceStore = new ResourceStore_1.default('test');
    const resourceFormStore = new Form_1.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_2.default({
        locales: [],
        resourceStore,
        route: router.route,
        router,
    });
    return new ReloadFormStoreToolbarAction_1.default(resourceFormStore, form, router, [], Object.assign({ icon: 'su-sync', route: 'test_route', dialogKey: 'test_dialog', dialogTitle: 'Test Dialog', dialogDescription: 'Test Description', label: 'Test Dialog', dialogOkText: 'OK', dialogCancelText: 'Cancel' }, options), resourceStore);
}
test('Throw error if required options are missing', () => {
    expect(() => createReloadFormStoreToolbarAction({ icon: undefined })).toThrow(/Missing required options/);
});
test('Return correct toolbar item config', () => {
    const action = createReloadFormStoreToolbarAction({ label: 'Reload' });
    const config = action.getToolbarItemConfig();
    expect(config).toEqual({
        type: 'button',
        label: 'Reload',
        icon: 'su-sync',
        onClick: expect.any(Function),
    });
});
test('Open dialog on button click', () => {
    const action = createReloadFormStoreToolbarAction();
    const config = action.getToolbarItemConfig();
    config.onClick();
    expect(action.showDialog).toBe(true);
});
test('Close dialog on cancel', () => {
    const action = createReloadFormStoreToolbarAction();
    action.showDialog = true;
    const element = (0, enzyme_1.mount)(action.getNode());
    element.find('Button[skin="secondary"]').simulate('click');
    expect(action.showDialog).toBe(false);
});
test('Fetch data on confirm', () => __awaiter(void 0, void 0, void 0, function* () {
    const action = createReloadFormStoreToolbarAction();
    action.showDialog = true;
    action.resourceFormStore.resourceStore.id = 5;
    action.resourceFormStore.locale.get = jest.fn().mockReturnValue('en');
    action.resourceFormStore.resourceStore.load = jest.fn();
    router_1.default.generate.mockReturnValue('/test/5?locale=en');
    Requester_1.default.post.mockResolvedValue({});
    const element = (0, enzyme_1.mount)(action.getNode());
    element.find('Button[skin="primary"]').simulate('click');
    expect(action.loading).toBe(true);
    yield new Promise((resolve) => setTimeout(resolve));
    expect(Requester_1.default.post).toHaveBeenCalledWith('/test/5?locale=en');
    expect(action.resourceFormStore.resourceStore.load).toHaveBeenCalled();
    expect(action.loading).toBe(false);
    expect(action.showDialog).toBe(false);
}));
test('Handle error on fetch', () => __awaiter(void 0, void 0, void 0, function* () {
    const action = createReloadFormStoreToolbarAction();
    action.showDialog = true;
    const error = new Error('Test Error');
    error.json = jest.fn().mockResolvedValue({ messageKey: 'error.message' });
    Requester_1.default.post.mockRejectedValue(error);
    const element = (0, enzyme_1.mount)(action.getNode());
    element.find('Button[skin="primary"]').simulate('click');
    yield new Promise((resolve) => setTimeout(resolve));
    expect(action.loading).toBe(false);
    expect(action.showDialog).toBe(false);
    expect(action.form.errors).toContain('error.message');
}));
test('Render dialog with correct props', () => {
    const action = createReloadFormStoreToolbarAction({
        dialogCancelText: 'Cancel Test',
        dialogOkText: 'OK Test',
    });
    action.showDialog = true;
    const element = (0, enzyme_1.mount)(action.getNode());
    const dialog = element.find('Dialog');
    expect(dialog.prop('cancelText')).toBe('Cancel Test');
    expect(dialog.prop('confirmText')).toBe('OK Test');
    expect(dialog.prop('title')).toBe('Test Dialog');
    expect(dialog.prop('children')).toBe('Test Description');
});
