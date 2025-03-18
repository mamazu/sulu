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
const CopyLocaleToolbarAction_1 = __importDefault(require("../../toolbarActions/CopyLocaleToolbarAction"));
const fieldRegistry_1 = __importDefault(require("../../../../containers/Form/registries/fieldRegistry"));
const metadataStore_1 = __importDefault(require("../../../../containers/Form/stores/metadataStore"));
const Select_1 = __importDefault(require("./../../../../containers/Form/fields/Select"));
const Input_1 = __importDefault(require("./../../../../containers/Form/fields/Input"));
fieldRegistry_1.default.add('select', Select_1.default);
fieldRegistry_1.default.add('text_line', Input_1.default);
const FORM = {
    locales: {
        label: 'Wähle Zielsprachen',
        disabledCondition: null,
        visibleCondition: null,
        description: '* Neue Sprachvariante wird erstellt',
        type: 'select',
        colSpan: 6,
        options: {
            values: {
                name: 'values',
                type: 'collection',
                value: [
                    {
                        name: 'de',
                        type: null,
                        value: 'de',
                        title: 'de',
                        placeholder: null,
                        infoText: null,
                    },
                    {
                        name: 'en',
                        type: null,
                        value: 'en',
                        title: 'en',
                        placeholder: null,
                        infoText: null,
                    },
                ],
                title: null,
                placeholder: null,
                infoText: null,
            },
            default_value: {
                name: 'default_value',
                type: null,
                value: 'de',
                title: null,
                placeholder: null,
                infoText: null,
            },
        },
        types: [],
        defaultType: null,
        required: true,
        spaceAfter: null,
        minOccurs: null,
        maxOccurs: null,
        onInvalid: null,
        tags: [],
    },
};
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.id = id;
    this.observableOptions = observableOptions;
    this.data = {};
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
}));
jest.mock('../../../../containers/Form/stores/metadataStore', () => ({
    getSchema: jest.fn().mockReturnValue(Promise.resolve(FORM)),
    getJsonSchema: jest.fn().mockReturnValue(Promise.resolve({})),
}));
function createCopyLocaleToolbarAction(locales, options = {}) {
    const resourceStore = new ResourceStore_1.default('test');
    const formStore = new Form_1.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_2.default({
        locales: [],
        resourceStore,
        route: router.route,
        router,
    });
    return new CopyLocaleToolbarAction_1.default(formStore, form, router, locales, options, resourceStore);
}
test('Return enabled item config', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de']);
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 5;
    expect(copyLocaleToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
        label: 'sulu_admin.copy_locale',
    }));
});
test('Return no item config if deprecated display_condition is not met', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de'], { display_condition: '_permission.edit' });
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    expect(toolbarItemConfig).toEqual(undefined);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "display_condition" option is deprecated'));
});
test('Return no item config if passed visible_condition is not met', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de'], { visible_condition: '_permission.edit' });
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    expect(toolbarItemConfig).toEqual(undefined);
    expect(loglevel_1.default.warn).not.toBeCalled();
});
test('Return item config if passed visible_condition is met', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de'], { visible_condition: '_permission.edit' });
    copyLocaleToolbarAction.resourceFormStore.resourceStore.data._permission = { edit: true };
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 1;
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig)
        .toEqual(expect.objectContaining({ disabled: false, label: 'sulu_admin.copy_locale', type: 'button' }));
});
test('Return disabled item config if an add form is shown', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de']);
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    expect(toolbarItemConfig.disabled).toEqual(true);
});
test('Return no dialog if no id is set', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en']);
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = undefined;
    expect(copyLocaleToolbarAction.getNode()).toEqual(null);
});
test('Throw error if no locale is given', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en']);
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyLocaleToolbarAction.resourceFormStore.resourceStore.locale = undefined;
    expect(() => copyLocaleToolbarAction.getNode()).toThrow('locale');
});
test('Throw error if no available locales are given', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction();
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyLocaleToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    expect(() => copyLocaleToolbarAction.getNode()).toThrow('locales');
});
test('Close dialog when cancel button of dialog is clicked', () => {
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de']);
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyLocaleToolbarAction.resourceFormStore.resourceStore.locale.get.mockReturnValue('en');
    copyLocaleToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the copy locale option');
    }
    let element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    element.find('Dialog').prop('onCancel')();
    expect(copyLocaleToolbarAction.form.showSuccessSnackbar).not.toBeCalledWith();
    element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
});
test('Close dialog and show success message when onClose from CopyLocaleDialog is called with true', (resolve) => {
    const postPromise = Promise.resolve();
    ResourceRequester_1.default.post.mockReturnValue(postPromise);
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de', 'fr']);
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyLocaleToolbarAction.resourceFormStore.resourceKey = 'snippets';
    const locale = copyLocaleToolbarAction.resourceFormStore.resourceStore.locale;
    locale.get.mockReturnValue('en');
    copyLocaleToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the copy locale option');
    }
    const elementBefore = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode());
    expect(elementBefore.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    setTimeout(() => {
        let element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode());
        expect(element.instance().props).toEqual(expect.objectContaining({
            open: true,
        }));
        element.find('Select').at(0).prop('onChange')(['de', 'fr']);
        element.prop('onConfirm')();
        expect(ResourceRequester_1.default.post).toBeCalledWith('snippets', undefined, { action: 'copy-locale', dest: ['de', 'fr'], id: 3, locale, webspace: 'sulu_io' });
        postPromise.then(() => {
            expect(copyLocaleToolbarAction.form.showSuccessSnackbar).toBeCalledWith();
            element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode()).at(0);
            expect(element.instance().props).toEqual(expect.objectContaining({
                open: false,
            }));
            resolve();
        });
    }, 1);
});
test('Close dialog and show success message when onClose from CopyLocaleDialog is called with true (with additional fields)', (resolve) => {
    const formMetadata = Object.assign(Object.assign({}, FORM), { title: {
            label: 'Test',
            disabledCondition: null,
            visibleCondition: null,
            description: '',
            type: 'text_line',
            colSpan: 6,
        } });
    metadataStore_1.default.getSchema.mockReturnValue(Promise.resolve(formMetadata));
    const postPromise = Promise.resolve();
    ResourceRequester_1.default.post.mockReturnValue(postPromise);
    const copyLocaleToolbarAction = createCopyLocaleToolbarAction(['en', 'de', 'fr']);
    copyLocaleToolbarAction.resourceFormStore.resourceStore.id = 3;
    copyLocaleToolbarAction.resourceFormStore.resourceKey = 'snippets';
    const locale = copyLocaleToolbarAction.resourceFormStore.resourceStore.locale;
    locale.get.mockReturnValue('en');
    copyLocaleToolbarAction.resourceFormStore.options.webspace = 'sulu_io';
    const toolbarItemConfig = copyLocaleToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the copy locale option');
    }
    const elementBefore = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode());
    expect(elementBefore.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    setTimeout(() => {
        let element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode());
        expect(element.instance().props).toEqual(expect.objectContaining({
            open: true,
        }));
        element.find('Input').at(0).prop('onChange')('Test 123');
        element.find('Select').at(0).prop('onChange')(['de', 'fr']);
        element.prop('onConfirm')();
        expect(ResourceRequester_1.default.post).toBeCalledWith('snippets', undefined, { action: 'copy-locale', dest: ['de', 'fr'], id: 3, locale, webspace: 'sulu_io', title: 'Test 123' });
        postPromise.then(() => {
            expect(copyLocaleToolbarAction.form.showSuccessSnackbar).toBeCalledWith();
            element = (0, enzyme_1.mount)(copyLocaleToolbarAction.getNode()).at(0);
            expect(element.instance().props).toEqual(expect.objectContaining({
                open: false,
            }));
            resolve();
        });
    }, 1);
});
