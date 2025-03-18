"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const PasswordConfirmation_1 = __importDefault(require("../../fields/PasswordConfirmation"));
const PasswordConfirmation_2 = __importDefault(require("../../../../components/PasswordConfirmation"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error correctly to PasswordConfirmation component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const error = { keyword: 'required', parameters: {} };
    const passwordConfirmation = (0, enzyme_1.shallow)(<PasswordConfirmation_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector}/>);
    expect(passwordConfirmation.find(PasswordConfirmation_2.default).prop('valid')).toBe(false);
});
test('Pass props correctly to PasswordConfirmation component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const passwordConfirmation = (0, enzyme_1.shallow)(<PasswordConfirmation_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    expect(passwordConfirmation.find(PasswordConfirmation_2.default).prop('valid')).toBe(true);
    expect(passwordConfirmation.find(PasswordConfirmation_2.default).prop('disabled')).toBe(true);
    passwordConfirmation.find(PasswordConfirmation_2.default).simulate('change', 'value');
    expect(changeSpy).toBeCalledWith('value');
    expect(finishSpy).toBeCalledWith();
});
