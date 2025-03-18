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
const ColorPicker_1 = __importDefault(require("../../fields/ColorPicker"));
const ColorPicker_2 = __importDefault(require("../../../../components/ColorPicker"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const error = { keyword: 'minLength', parameters: {} };
    const field = (0, enzyme_1.shallow)(<ColorPicker_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector}/>);
    expect(field.find(ColorPicker_2.default).prop('valid')).toBe(false);
});
test('Pass props correctly to component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const onFinish = jest.fn();
    const onChange = jest.fn();
    const field = (0, enzyme_1.shallow)(<ColorPicker_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} onChange={onChange} onFinish={onFinish} value="#123123"/>);
    const component = field.find(ColorPicker_2.default);
    expect(component.prop('valid')).toBe(true);
    expect(component.prop('onChange')).toBe(onChange);
    expect(component.prop('onBlur')).toBe(onFinish);
    expect(component.prop('disabled')).toBe(true);
});
