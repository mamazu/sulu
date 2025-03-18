"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const TextArea_1 = __importDefault(require("../../fields/TextArea"));
const TextArea_2 = __importDefault(require("../../../../components/TextArea"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error correctly to TextArea component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const error = { keyword: 'minLength', parameters: {} };
    const inputInvalid = (0, enzyme_1.shallow)(<TextArea_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector} value="xyz"/>);
    expect(inputInvalid.find(TextArea_2.default).prop('valid')).toBe(false);
});
test('Pass props correctly to TextArea component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const inputValid = (0, enzyme_1.shallow)(<TextArea_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector}/>);
    expect(inputValid.find(TextArea_2.default).prop('maxCharacters')).toBe(undefined);
    expect(inputValid.find(TextArea_2.default).prop('valid')).toBe(true);
    expect(inputValid.find(TextArea_2.default).prop('disabled')).toBe(true);
});
test('Component correctly logs deprecated warning for max_characters', () => {
    const schemaOptions = {
        max_characters: {
            name: 'max_characters',
            value: '70',
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const inputValid = (0, enzyme_1.shallow)(<TextArea_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "max_characters" schema option is deprecated'));
    expect(inputValid.find(TextArea_2.default).prop('maxCharacters')).toBe(70);
    expect(inputValid.find(TextArea_2.default).prop('valid')).toBe(true);
});
test('Component correctly chooses soft_max_length over max_characters', () => {
    const schemaOptions = {
        max_characters: {
            name: 'max_characters',
            value: '55',
        },
        soft_max_length: {
            name: 'soft_max_length',
            value: '70',
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const inputValid = (0, enzyme_1.shallow)(<TextArea_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "max_characters" schema option is deprecated'));
    expect(inputValid.find(TextArea_2.default).prop('maxCharacters')).toBe(70);
    expect(inputValid.find(TextArea_2.default).prop('valid')).toBe(true);
});
test('Pass props correctly including soft_max_length to TextArea component', () => {
    const schemaOptions = {
        soft_max_length: {
            name: 'soft_max_length',
            value: '70',
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const inputValid = (0, enzyme_1.shallow)(<TextArea_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(inputValid.find(TextArea_2.default).prop('maxCharacters')).toBe(70);
    expect(inputValid.find(TextArea_2.default).prop('valid')).toBe(true);
});
test('TextArea should call onFocus when the TextArea gets focus', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const focusSpy = jest.fn();
    const inputValid = (0, enzyme_1.shallow)(<TextArea_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFocus={focusSpy}/>);
    const target = new EventTarget();
    inputValid.find(TextArea_2.default).prop('onFocus')({
        target,
    });
    expect(focusSpy).toBeCalledWith(target);
});
