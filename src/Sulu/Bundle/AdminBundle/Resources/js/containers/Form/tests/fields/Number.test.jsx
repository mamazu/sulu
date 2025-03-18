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
const Number_1 = __importDefault(require("../../fields/Number"));
const Number_2 = __importDefault(require("../../../../components/Number"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const error = { keyword: 'minLength', parameters: {} };
    const field = (0, enzyme_1.shallow)(<Number_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector}/>);
    expect(field.find(Number_2.default).prop('valid')).toBe(false);
});
test('Pass props correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const field = (0, enzyme_1.shallow)(<Number_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector}/>);
    expect(field.find(Number_2.default).prop('valid')).toBe(true);
    expect(field.find(Number_2.default).prop('disabled')).toBe(true);
});
test('Pass props correctly to component inclusive schemaOptions', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const schemaOptions = {
        min: {
            name: 'min',
            value: 50,
        },
        max: {
            name: 'max',
            value: 100,
        },
        step: {
            name: 'step',
            value: 10,
        },
    };
    const field = (0, enzyme_1.shallow)(<Number_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(field.find(Number_2.default).prop('valid')).toBe(true);
    expect(field.find(Number_2.default).prop('min')).toBe(50);
    expect(field.find(Number_2.default).prop('max')).toBe(100);
    expect(field.find(Number_2.default).prop('step')).toBe(10);
});
test('Should not pass any arguments to onFinish callback', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const finishSpy = jest.fn();
    const input = (0, enzyme_1.shallow)(<Number_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFinish={finishSpy}/>);
    input.find('Number').prop('onBlur')('Test');
    expect(finishSpy).toBeCalledWith();
});
