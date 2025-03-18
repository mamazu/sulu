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
const Iban_1 = __importDefault(require("../../fields/Iban"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(),
    ResourceFormStore: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(),
}));
test('Pass props correctly to Iban component', () => {
    const finishSpy = jest.fn();
    const changeSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const bic = (0, enzyme_1.shallow)(<Iban_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    expect(bic.props()).toEqual(expect.objectContaining({
        disabled: false,
        id: '/',
        onBlur: finishSpy,
        onChange: changeSpy,
        valid: true,
        value: undefined,
    }));
});
test('Pass disabled prop to Iban component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const bic = (0, enzyme_1.shallow)(<Iban_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector}/>);
    expect(bic.prop('disabled')).toEqual(true);
});
test('Pass id prop to Iban component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const bic = (0, enzyme_1.shallow)(<Iban_1.default {...TestHelper_1.fieldTypeDefaultProps} dataPath="/test" formInspector={formInspector}/>);
    expect(bic.prop('id')).toEqual('/test');
});
test('Pass error to Iban component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const bic = (0, enzyme_1.shallow)(<Iban_1.default {...TestHelper_1.fieldTypeDefaultProps} error={{}} formInspector={formInspector}/>);
    expect(bic.prop('valid')).toEqual(false);
});
test('Pass value prop to Iban component', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const bic = (0, enzyme_1.shallow)(<Iban_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} value="Test"/>);
    expect(bic.prop('value')).toEqual('Test');
});
