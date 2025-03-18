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
const Email_1 = __importDefault(require("../../fields/Email"));
const Email_2 = __importDefault(require("../../../../components/Email"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const error = { keyword: 'minLength', parameters: {} };
    const field = (0, enzyme_1.shallow)(<Email_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector}/>);
    expect(field.find(Email_2.default).prop('valid')).toBe(false);
});
test('Pass props correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const field = (0, enzyme_1.shallow)(<Email_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector}/>);
    expect(field.find(Email_2.default).prop('valid')).toBe(true);
    expect(field.find(Email_2.default).prop('disabled')).toBe(true);
});
