"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Form_1 = __importStar(require("../../../../containers/Form"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const Form_2 = __importDefault(require("../../../../views/Form"));
const SaveWithFormDialogToolbarAction_1 = __importDefault(require("../../toolbarActions/SaveWithFormDialogToolbarAction"));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../containers/Form/Form', () => (class extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.submit = jest.fn();
    }
    render() {
        return null;
    }
}));
jest.mock('../../../../containers/Form/stores/ResourceFormStore', () => (class {
    constructor(resourceStore) {
        this.resourceStore = resourceStore;
    }
    get dirty() {
        return this.resourceStore.dirty;
    }
    get saving() {
        return this.resourceStore.saving;
    }
}));
jest.mock('../../../../containers/Form/stores/memoryFormStoreFactory', () => ({
    createFromFormKey: jest.fn(() => ({ destroy: jest.fn() })),
}));
jest.mock('../../../../services/Router', () => jest.fn());
jest.mock('../../../../views/Form', () => jest.fn(function () {
    this.submit = jest.fn();
}));
function createSaveWithFormDialogToolbarAction(options) {
    const locales = [];
    const resourceStore = new ResourceStore_1.default('test');
    const formStore = new Form_1.ResourceFormStore(resourceStore, 'test');
    const router = new Router_1.default({});
    const form = new Form_2.default({
        locales,
        resourceStore,
        route: router.route,
        router,
    });
    return new SaveWithFormDialogToolbarAction_1.default(formStore, form, router, locales, options, resourceStore);
}
test('Return item config with correct disabled, loading, icon, type and value', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ condition: 'true', formKey: 'test' });
    saveWithFormDialogToolbarAction.resourceFormStore.resourceStore.saving = false;
    expect(saveWithFormDialogToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: true,
        label: 'sulu_admin.save',
        loading: false,
        icon: 'su-save',
        type: 'button',
    }));
});
test('Return item config with enabled button when dirty flag is set', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ condition: 'true', formKey: 'test' });
    saveWithFormDialogToolbarAction.resourceFormStore.resourceStore.dirty = true;
    expect(saveWithFormDialogToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        disabled: false,
    }));
});
test('Return item config with loading button when saving flag is set', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ condition: 'true', formKey: 'test' });
    saveWithFormDialogToolbarAction.resourceFormStore.resourceStore.saving = true;
    expect(saveWithFormDialogToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        loading: true,
    }));
});
test('Throw error if no formKey is passed', () => {
    expect(() => createSaveWithFormDialogToolbarAction({})).toThrow(/"formKey"/);
});
test('Destroy store when being destroyed', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ formKey: 'test' });
    saveWithFormDialogToolbarAction.destroy();
    expect(saveWithFormDialogToolbarAction.dialogFormStore.destroy).toBeCalledWith();
});
test('Close dialog when cancel button of dialog is clicked', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ condition: 'true', formKey: 'test', title: 'Test' });
    const toolbarItemConfig = saveWithFormDialogToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the copy locale option');
    }
    let element = (0, enzyme_1.mount)(saveWithFormDialogToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    element = (0, enzyme_1.mount)(saveWithFormDialogToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    element.find('Dialog').prop('onCancel')();
    element = (0, enzyme_1.mount)(saveWithFormDialogToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    const dialogForm = saveWithFormDialogToolbarAction.dialogForm;
    if (!dialogForm) {
        throw new Error('The dialogForm should be defined');
    }
    expect(dialogForm.submit).not.toBeCalled();
});
test('Submit form with passed form data dialog when confirm button of dialog is clicked', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ condition: 'title == "test1" && __parent.title == "test2"', formKey: 'test', title: 'Test' });
    saveWithFormDialogToolbarAction.resourceFormStore.data = {
        title: 'test1',
    };
    saveWithFormDialogToolbarAction.parentResourceStore.data = {
        title: 'test2',
    };
    const toolbarItemConfig = saveWithFormDialogToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the copy locale option');
    }
    let element = (0, enzyme_1.mount)(saveWithFormDialogToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
    clickHandler();
    element = (0, enzyme_1.mount)(saveWithFormDialogToolbarAction.getNode()).at(0);
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: true,
    }));
    saveWithFormDialogToolbarAction.dialogFormStore.data = { test: 'Test' };
    element.find(Form_1.default).prop('onSubmit')();
    element = (0, enzyme_1.mount)(saveWithFormDialogToolbarAction.getNode()).at(0);
    const dialogForm = saveWithFormDialogToolbarAction.dialogForm;
    if (!dialogForm) {
        throw new Error('The dialogForm should be defined');
    }
    expect(saveWithFormDialogToolbarAction.form.submit).toBeCalledWith({ test: 'Test' });
    expect(element.instance().props).toEqual(expect.objectContaining({
        open: false,
    }));
});
test('Submit form without form data dialog when condition does not evaluate to true', () => {
    const saveWithFormDialogToolbarAction = createSaveWithFormDialogToolbarAction({ condition: 'false', formKey: 'test', title: 'Test' });
    const toolbarItemConfig = saveWithFormDialogToolbarAction.getToolbarItemConfig();
    if (!toolbarItemConfig) {
        throw new Error('The toolbarItemConfig should be a value!');
    }
    const clickHandler = toolbarItemConfig.onClick;
    if (!clickHandler) {
        throw new Error('A onClick callback should be registered on the copy locale option');
    }
    clickHandler();
    expect(saveWithFormDialogToolbarAction.form.submit).toBeCalledWith();
});
