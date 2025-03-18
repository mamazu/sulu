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
const Checkbox_1 = __importDefault(require("../../fields/Checkbox"));
const Checkbox_2 = __importDefault(require("../../../../components/Checkbox"));
const Toggler_1 = __importDefault(require("../../../../components/Toggler"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
test('Render Toggler component as heading', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const schemaOptions = {
        description: {
            name: 'description',
            title: 'Hides a block',
        },
        icon: {
            name: 'icon',
            value: 'su-eye',
        },
        label: {
            name: 'label',
            title: 'Hide block',
        },
        skin: {
            name: 'skin',
            value: 'heading',
        },
    };
    expect((0, enzyme_1.render)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toMatchSnapshot();
});
test('Pass the label correctly to Checkbox component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} label="Test" schemaOptions={{ label: { name: 'label', title: 'Checkbox Title' } }}/>);
    expect(checkbox.find(Checkbox_2.default).prop('children')).toEqual('Checkbox Title');
});
test('Pass disabled correctly to Checkbox component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} label="Test" schemaOptions={{ label: { name: 'label', title: 'Checkbox Title' } }}/>);
    expect(checkbox.find(Checkbox_2.default).props().disabled).toEqual(true);
});
test('Should throw an exception if defaultValue is of wrong type', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const schemaOptions = {
        default_value: {
            name: 'default_value',
            value: 'not-boolean',
        },
    };
    expect(() => (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow(/"default_value"/);
});
test('Set default value of null should not call onChange', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const schemaOptions = {
        default_value: {
            name: 'default_value',
            value: null,
        },
    };
    (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).not.toBeCalled();
});
test('Set default value if no value is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const schemaOptions = {
        default_value: {
            name: 'default_value',
            value: false,
        },
    };
    (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions}/>);
    expect(changeSpy).toBeCalledWith(false, { 'isDefaultValue': true });
});
test('Do not set default value if a value is passed', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const schemaOptions = {
        default_value: {
            name: 'default_value',
            value: false,
        },
    };
    (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} schemaOptions={schemaOptions} value={false}/>);
    expect(changeSpy).not.toBeCalled();
});
test('Pass the value of true correctly to Checkbox component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} value={true}/>);
    expect(checkbox.find(Checkbox_2.default).prop('checked')).toEqual(true);
});
test('Pass the value of false correctly to Checkbox component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} value={false}/>);
    expect(checkbox.find(Checkbox_2.default).prop('checked')).toEqual(false);
});
test('Call onChange and onFinish on the changed callback of the Checkbox', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy}/>);
    checkbox.find(Checkbox_2.default).simulate('change', true);
    expect(changeSpy).toBeCalledWith(true);
    expect(finishSpy).toBeCalledWith();
});
test('Pass the label correctly to Toggler component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const schemaOptions = {
        label: { name: 'label', title: 'Toggler Title' },
        type: { name: 'type', value: 'toggler' },
    };
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} label="Test" schemaOptions={schemaOptions}/>);
    expect(checkbox.find(Toggler_1.default).prop('children')).toEqual('Toggler Title');
});
test('Pass disabled correctly to Toggler component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const schemaOptions = {
        label: { name: 'label', title: 'Toggler Title' },
        type: { name: 'type', value: 'toggler' },
    };
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} label="Test" schemaOptions={schemaOptions}/>);
    expect(checkbox.find(Toggler_1.default).props().disabled).toEqual(true);
});
test('Pass the value of true correctly to Toggler component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} label="Test" schemaOptions={{ type: { name: 'type', value: 'toggler' } }} value={true}/>);
    expect(checkbox.find(Toggler_1.default).prop('checked')).toEqual(true);
});
test('Pass the value of false correctly to Toggler component', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} schemaOptions={{ type: { name: 'type', value: 'toggler' } }} value={false}/>);
    expect(checkbox.find(Toggler_1.default).prop('checked')).toEqual(false);
});
test('Call onChange and onFinish on the changed callback of the Toggler', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={{ type: { name: 'type', value: 'toggler' } }}/>);
    checkbox.find(Toggler_1.default).simulate('change', true);
    expect(changeSpy).toBeCalledWith(true);
    expect(finishSpy).toBeCalledWith();
});
test('Call onChange and onFinish on the changed callback of the Toggler with the header skin', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'snippets'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const checkbox = (0, enzyme_1.shallow)(<Checkbox_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={{ skin: { name: 'skin', value: 'heading' }, type: { name: 'type', value: 'toggler' } }}/>);
    checkbox.find(Toggler_1.default).simulate('change', true);
    expect(changeSpy).toBeCalledWith(true);
    expect(finishSpy).toBeCalledWith();
});
