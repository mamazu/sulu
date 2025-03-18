"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Toolbar_1 = __importDefault(require("../Toolbar"));
const toolbarStorePool_1 = __importDefault(require("../stores/toolbarStorePool"));
let toolbarStoreMock = {};
jest.mock('../stores/toolbarStorePool', () => ({
    createStore: jest.fn(),
    getStore: jest.fn(),
    hasStore: jest.fn(),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../services/initializer', () => ({
    initializedTranslationsLocale: true,
}));
jest.mock('debounce', () => jest.fn((callback) => callback));
beforeEach(() => {
    window.ResizeObserver = jest.fn(function () {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
    });
    toolbarStoreMock = {
        errors: [],
        warnings: [],
        showSuccess: false,
        getBackButtonConfig: jest.fn(),
        getItemsConfig: jest.fn().mockReturnValue([]),
        getIconsConfig: jest.fn().mockReturnValue([]),
        getLocaleConfig: jest.fn(),
    };
});
test('Render the items and icons from the ToolbarStore', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue(undefined);
    toolbarStoreMock.getIconsConfig.mockReturnValue([
        <p key={1}>Test1</p>,
        <p key={2}>Test2</p>,
    ]);
    toolbarStoreMock.getItemsConfig.mockReturnValue([
        {
            type: 'button',
            label: 'Delete',
            disabled: true,
            icon: 'fa-trash-o',
        },
        {
            type: 'dropdown',
            label: 'Save',
            icon: 'fa-floppy-more',
            options: [
                {
                    label: 'Save as draft',
                    onClick: () => { },
                },
                {
                    label: 'Publish',
                    onClick: () => { },
                },
                {
                    label: 'Save and publish',
                    onClick: () => { },
                },
            ],
        },
        {
            type: 'toggler',
            label: 'Toggler',
            onClick: () => { },
            value: true,
        },
    ]);
    expect((0, enzyme_1.render)(<Toolbar_1.default storeKey={storeKey}/>)).toMatchSnapshot();
    expect(toolbarStorePool_1.default.createStore).toBeCalledWith(storeKey);
});
test('Render the error from the ToolbarStore', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue(undefined);
    toolbarStoreMock.errors.push('Something went wrong');
    toolbarStoreMock.getIconsConfig.mockReturnValue([
        <p key={1}>Test1</p>,
        <p key={2}>Test2</p>,
    ]);
    const toolbar = (0, enzyme_1.mount)(<Toolbar_1.default storeKey={storeKey}/>);
    expect(toolbar.render()).toMatchSnapshot();
    expect(toolbarStorePool_1.default.createStore).toBeCalledWith(storeKey);
});
test('Render the warning from the ToolbarStore', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue(undefined);
    toolbarStoreMock.warnings.push('Something unimportant went wrong');
    toolbarStoreMock.getIconsConfig.mockReturnValue([
        <p key={1}>Test1</p>,
        <p key={2}>Test2</p>,
    ]);
    const toolbar = (0, enzyme_1.mount)(<Toolbar_1.default storeKey={storeKey}/>);
    expect(toolbar.render()).toMatchSnapshot();
    expect(toolbarStorePool_1.default.createStore).toBeCalledWith(storeKey);
});
test('Render the items as disabled if one is loading', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue({});
    toolbarStoreMock.getItemsConfig.mockReturnValue([
        {
            type: 'button',
            label: 'Add',
            icon: 'fa-add-o',
            disabled: false,
        },
        {
            type: 'button',
            label: 'Delete',
            icon: 'fa-trash-o',
            loading: true,
        },
    ]);
    const view = (0, enzyme_1.shallow)(<Toolbar_1.default storeKey={storeKey}/>);
    expect(toolbarStorePool_1.default.createStore).toBeCalledWith(storeKey);
    const buttons = view.find('Button');
    expect(buttons.at(0).prop('disabled')).toBe(true);
    expect(buttons.at(1).prop('disabled')).toBe(true);
    expect(buttons.at(2).prop('disabled')).toBe(true);
});
test('Show success message on back button for some time', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue({});
    toolbarStoreMock.showSuccess = true;
    expect((0, enzyme_1.render)(<Toolbar_1.default storeKey={storeKey}/>)).toMatchSnapshot();
});
test('Show success message on navigation button for some time', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue({});
    toolbarStoreMock.showSuccess = true;
    expect((0, enzyme_1.render)(<Toolbar_1.default onNavigationButtonClick={jest.fn()} storeKey={storeKey}/>)).toMatchSnapshot();
});
test('Click on the success message should open the navigation', () => {
    const storeKey = 'testStore';
    const navigationButtonClickSpy = jest.fn();
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue({});
    toolbarStoreMock.showSuccess = true;
    const view = (0, enzyme_1.shallow)(<Toolbar_1.default onNavigationButtonClick={navigationButtonClickSpy} storeKey={storeKey}/>);
    view.find('Button[success=true]').simulate('click');
    expect(navigationButtonClickSpy).toBeCalledWith();
});
test('Click on the success message should navigate back', () => {
    const storeKey = 'testStore';
    const backSpy = jest.fn();
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue({
        onClick: backSpy,
    });
    toolbarStoreMock.showSuccess = true;
    const view = (0, enzyme_1.shallow)(<Toolbar_1.default storeKey={storeKey}/>);
    view.find('Button[success=true]').simulate('click');
    expect(backSpy).toBeCalledWith();
});
test('Remove last error if close button on snackbar is clicked', () => {
    const storeKey = 'testStore';
    toolbarStorePool_1.default.createStore.mockReturnValue(toolbarStoreMock);
    toolbarStoreMock.getLocaleConfig.mockReturnValue(undefined);
    toolbarStoreMock.getBackButtonConfig.mockReturnValue({});
    toolbarStoreMock.errors.push({ code: 100, message: 'Something went wrong' });
    toolbarStoreMock.getItemsConfig.mockReturnValue([
        {
            type: 'button',
            label: 'Add',
            icon: 'fa-add-o',
            disabled: false,
        },
    ]);
    const view = (0, enzyme_1.shallow)(<Toolbar_1.default storeKey={storeKey}/>);
    expect(view.find('Snackbar[type="error"]')).toHaveLength(1);
    expect(toolbarStoreMock.errors).toHaveLength(1);
    view.find('Snackbar[type="error"]').simulate('closeClick');
    expect(toolbarStoreMock.errors).toHaveLength(0);
});
