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
const Input_1 = __importDefault(require("../../fields/Input"));
const Input_2 = __importDefault(require("../../../../components/Input"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass error correctly to Input component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const error = { keyword: 'minLength', parameters: {} };
    const inputInvalid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} error={error} formInspector={formInspector}/>);
    expect(inputInvalid.find(Input_2.default).prop('valid')).toBe(false);
});
test('Pass props correctly to Input component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const inputValid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector}/>);
    expect(inputValid.find(Input_2.default).prop('maxCharacters')).toBe(undefined);
    expect(inputValid.find(Input_2.default).prop('valid')).toBe(true);
    expect(inputValid.find(Input_2.default).prop('disabled')).toBe(true);
    expect(inputValid.find(Input_2.default).prop('headline')).toBe(undefined);
});
test('Pass headline prop correctly', () => {
    const schemaOptions = {
        headline: {
            name: 'headline',
            value: true,
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const inputValid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(inputValid.find(Input_2.default).prop('headline')).toBe(true);
});
test('Component correctly logs deprecated warning for max_characters', () => {
    const schemaOptions = {
        max_characters: {
            name: 'max_characters',
            value: '70',
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const inputValid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "max_characters" schema option is deprecated'));
    expect(inputValid.find(Input_2.default).prop('maxCharacters')).toBe(70);
    expect(inputValid.find(Input_2.default).prop('valid')).toBe(true);
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
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const inputValid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "max_characters" schema option is deprecated'));
    expect(inputValid.find(Input_2.default).prop('maxCharacters')).toBe(70);
    expect(inputValid.find(Input_2.default).prop('valid')).toBe(true);
});
test('Pass props correctly including soft_max_length to Input component', () => {
    const schemaOptions = {
        soft_max_length: {
            name: 'soft_max_length',
            value: '70',
        },
        max_segments: {
            name: 'max_segments',
            value: '6',
        },
        segment_delimiter: {
            name: 'segment_delimiter',
            value: ',',
        },
    };
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const inputValid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(inputValid.find(Input_2.default).prop('maxCharacters')).toBe(70);
    expect(inputValid.find(Input_2.default).prop('maxSegments')).toBe(6);
    expect(inputValid.find(Input_2.default).prop('segmentDelimiter')).toBe(',');
    expect(inputValid.find(Input_2.default).prop('valid')).toBe(true);
});
test('Should not pass any arguments to onFinish callback', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const finishSpy = jest.fn();
    const input = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFinish={finishSpy}/>);
    input.find('Input').prop('onBlur')('Test');
    expect(finishSpy).toBeCalledWith();
});
test('TextArea should call onFocus when the TextArea gets focus', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const focusSpy = jest.fn();
    const inputValid = (0, enzyme_1.shallow)(<Input_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFocus={focusSpy}/>);
    const target = new EventTarget();
    inputValid.find(Input_2.default).prop('onFocus')({
        target,
    });
    expect(focusSpy).toBeCalledWith(target);
});
