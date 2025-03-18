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
const Select_1 = __importDefault(require("../../fields/Select"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Pass props correctly to Select', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    const select = (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} schemaOptions={schemaOptions} value={['test']}/>);
    expect(select.prop('values')).toEqual(['test']);
    expect(select.prop('disabled')).toBe(true);
    expect(select.find('Option').at(0).props()).toEqual(expect.objectContaining({
        value: 'mr',
        children: 'Mister',
    }));
    expect(select.find('Option').at(1).props()).toEqual(expect.objectContaining({
        value: 'ms',
        children: 'Miss',
    }));
});
test('Should throw an exception if defaultValue is of wrong type', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        default_values: {
            name: 'default_values',
            value: {},
        },
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    expect(() => (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow(/"default_values"/);
});
test('Should throw an exception if value is of wrong type', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        values: {
            name: 'values',
            value: [
                {
                    name: [],
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    expect(() => (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow(/"values"/);
});
test('Should call onChange with undefined if value is changed to an empty array', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const schemaOptions = {
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    const select = (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    select.simulate('change', []);
    expect(changeSpy).toBeCalledWith(undefined);
    expect(finishSpy).toBeCalledWith();
});
test('Should call onChange with allowed values only if value contains old values', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const schemaOptions = {
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    const select = (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    select.simulate('change', ['mr', 'removed-value']);
    expect(changeSpy).toBeCalledWith(['mr']);
    expect(finishSpy).toBeCalledWith();
});
test('Should call onFinish callback on every onChange', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const finishSpy = jest.fn();
    const schemaOptions = {
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    const select = (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    select.simulate('change', []);
    expect(finishSpy).toBeCalledWith();
});
test('Set default value of null should not call onChange', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const schemaOptions = {
        default_values: {
            name: 'default_values',
        },
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).not.toBeCalled();
});
test('Set default value if no value is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const schemaOptions = {
        default_values: {
            name: 'default_values',
            value: [{ name: 'mr' }],
        },
        values: {
            name: 'values',
            value: [
                {
                    name: 'mr',
                    title: 'Mister',
                },
                {
                    name: 'ms',
                    title: 'Miss',
                },
            ],
        },
    };
    (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).toBeCalledWith(['mr'], { 'isDefaultValue': true });
});
test('Set default value to a number of 0 should work', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const schemaOptions = {
        default_values: {
            name: 'default_values',
            value: [{ name: 0 }],
        },
        values: {
            name: 'values',
            value: [
                {
                    name: 0,
                    title: 'Mister',
                },
                {
                    name: 1,
                    title: 'Miss',
                },
            ],
        },
    };
    (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).toBeCalledWith([0], { 'isDefaultValue': true });
});
test('Throw error if no value option is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    expect(() => (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector}/>)).toThrow(/"values"/);
});
test('Throw error if value option with wrong is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    expect(() => (0, enzyme_1.shallow)(<Select_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={{ values: { name: 'values', value: true } }}/>)).toThrow(/"values"/);
});
