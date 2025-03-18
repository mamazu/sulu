"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const CustomUrl_1 = __importDefault(require("../../fields/CustomUrl"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(function (resourceFormStore) {
        this.id = resourceFormStore.id;
        this.options = resourceFormStore.options;
        this.getValueByPath = jest.fn();
    }),
    ResourceFormStore: jest.fn(function (formStore, formKey, options = {}) {
        this.id = formStore.id;
        this.options = options;
    }),
    ResourceLocatorHistory: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(function (resourceKey, id) {
        this.id = id;
    }),
}));
test('Pass correct props to CustomUrl component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/baseDomain':
                return '*.sulu.io/*';
        }
    });
    const customUrl = (0, enzyme_1.shallow)(<CustomUrl_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={['a', 'b']}/>);
    expect(customUrl.find('CustomUrl').prop('baseDomain')).toEqual('*.sulu.io/*');
    expect(customUrl.find('CustomUrl').prop('value')).toEqual(['a', 'b']);
    expect(customUrl.find(containers_1.ResourceLocatorHistory)).toHaveLength(0);
});
test('Pass correct props to ResourceLocatorHistory component if id an existing resource is loaded', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', 2), 'test', { webspace: 'sulu_io' }));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/baseDomain':
                return '*.sulu.io/*';
        }
    });
    const customUrl = (0, enzyme_1.shallow)(<CustomUrl_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={['a', 'b']}/>);
    expect(customUrl.find('CustomUrl').prop('baseDomain')).toEqual('*.sulu.io/*');
    expect(customUrl.find('CustomUrl').prop('value')).toEqual(['a', 'b']);
    expect(customUrl.find(containers_1.ResourceLocatorHistory).prop('id')).toEqual(2);
    expect(customUrl.find(containers_1.ResourceLocatorHistory).prop('options')).toEqual({ webspace: 'sulu_io' });
    expect(customUrl.find(containers_1.ResourceLocatorHistory).prop('resourceKey')).toEqual('custom_url_routes');
});
test('Pass correct props with empty value to CustomUrl component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/baseDomain':
                return 'sulu.io/*';
        }
    });
    const customUrl = (0, enzyme_1.shallow)(<CustomUrl_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value={undefined}/>);
    expect(customUrl.find('CustomUrl').prop('baseDomain')).toEqual('sulu.io/*');
    expect(customUrl.find('CustomUrl').prop('value')).toEqual([]);
});
test('Call onChange when if a value changes', () => {
    const changeSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/baseDomain':
                return 'sulu.io/*';
        }
    });
    const customUrl = (0, enzyme_1.shallow)(<CustomUrl_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} value={undefined}/>);
    customUrl.find('CustomUrl').prop('onChange')(['test']);
    expect(changeSpy).toBeCalledWith(['test']);
});
test('Call onFinish when if the field is blurred', () => {
    const finishSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test', { webspace: 'sulu_io' }));
    formInspector.getValueByPath.mockImplementation((path) => {
        switch (path) {
            case '/baseDomain':
                return 'sulu.io/*';
        }
    });
    const customUrl = (0, enzyme_1.shallow)(<CustomUrl_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onFinish={finishSpy} value={undefined}/>);
    customUrl.find('CustomUrl').prop('onBlur')();
    expect(finishSpy).toBeCalledWith();
});
