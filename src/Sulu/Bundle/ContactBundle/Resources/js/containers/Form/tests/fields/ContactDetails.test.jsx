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
const ContactDetails_1 = __importDefault(require("../../fields/ContactDetails"));
jest.mock('sulu-admin-bundle/containers', () => ({
    FormInspector: jest.fn(),
    ResourceFormStore: jest.fn(),
}));
jest.mock('sulu-admin-bundle/stores', () => ({
    ResourceStore: jest.fn(),
}));
test('Pass props correctly to ContactDetails component', () => {
    const finishSpy = jest.fn();
    const changeSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const value = {
        emails: [],
        faxes: [],
        phones: [],
        socialMedia: [],
        websites: [],
    };
    const bic = (0, enzyme_1.shallow)(<ContactDetails_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={value}/>);
    expect(bic.props()).toEqual(expect.objectContaining({
        onBlur: finishSpy,
        onChange: changeSpy,
        value,
    }));
});
test('Pass undefined as value if null is given', () => {
    const finishSpy = jest.fn();
    const changeSpy = jest.fn();
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test'), 'test'));
    const bic = (0, enzyme_1.shallow)(<ContactDetails_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} value={null}/>);
    expect(bic.prop('value')).toEqual({ emails: [], faxes: [], phones: [], socialMedia: [], websites: [] });
});
