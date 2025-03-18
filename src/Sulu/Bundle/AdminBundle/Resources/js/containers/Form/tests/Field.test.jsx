"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const ResourceStore_1 = __importDefault(require("../../../stores/ResourceStore"));
const Router_1 = __importDefault(require("../../../services/Router"));
const conditionDataProviderRegistry_1 = __importDefault(require("../registries/conditionDataProviderRegistry"));
const Field_1 = __importDefault(require("../Field"));
const fieldRegistry_1 = __importDefault(require("../registries/fieldRegistry"));
const FormInspector_1 = __importDefault(require("../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../stores/ResourceFormStore"));
beforeEach(() => {
    conditionDataProviderRegistry_1.default.clear();
});
jest.mock('../../../services/Router/Router', () => jest.fn());
jest.mock('../../../stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.locale = observableOptions === null || observableOptions === void 0 ? void 0 : observableOptions.locale;
}));
jest.mock('../FormInspector', () => jest.fn(function (resourceFormStore) {
    this.locale = resourceFormStore.locale;
}));
jest.mock('../stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
}));
jest.mock('../registries/fieldRegistry', () => ({
    get: jest.fn(),
    getOptions: jest.fn(),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render correct label with correct field type', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    const successSpy = jest.fn();
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={successSpy} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>)).toMatchSnapshot();
    fieldRegistry_1.default.get.mockReturnValue(function DateTime() {
        return <input type="date"/>;
    });
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={successSpy} router={undefined} schema={{ label: 'label2', type: 'datetime' }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render field with correct values for grid', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label1', type: 'text', colSpan: 8, spaceAfter: 3 }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render a required field with correct field type', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label1', required: true, type: 'text' }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render a field without a label', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ type: 'text' }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render a field with a description', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{
            description: 'Small description describing the field',
            label: 'label1',
            type: 'text',
        }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render a field with an error', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" error={{ keyword: 'minLength', parameters: {} }} formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render a field without a const error', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" error={{ keyword: 'const', parameters: {} }} formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>)).toMatchSnapshot();
});
test('Render a field with a error collection', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    const error = {
        ids: {
            keyword: 'minItems',
            parameters: {},
        },
    };
    expect((0, enzyme_1.render)(<Field_1.default data={{}} dataPath="" error={error} formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>)).toMatchSnapshot();
});
test('Pass correct props to FieldType', () => {
    const router = new Router_1.default();
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    const successSpy = jest.fn();
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="date"/>;
    });
    const schema = {
        label: 'Text',
        maxOccurs: 4,
        minOccurs: 2,
        type: 'text_line',
        types: {},
    };
    const data = {
        title: 'Test',
    };
    const field = (0, enzyme_1.shallow)(<Field_1.default data={data} dataPath="/block/0/text" formInspector={formInspector} name="text" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={successSpy} router={router} schema={schema} schemaPath="/text" showAllErrors={true} value="test"/>);
    expect(field.find('Text').props()).toEqual(expect.objectContaining({
        data,
        dataPath: '/block/0/text',
        disabled: false,
        formInspector,
        label: 'Text',
        maxOccurs: 4,
        minOccurs: 2,
        onSuccess: successSpy,
        router,
        schemaPath: '/text',
        showAllErrors: true,
        types: {},
        value: 'test',
    }));
});
test('Do not render anything if visibleCondition evaluates to false', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="date"/>;
    });
    const schema = {
        label: 'Text',
        type: 'text_line',
        visibleCondition: 'title != "Test"',
    };
    const data = (0, mobx_1.observable)({ title: 'Test' });
    const field = (0, enzyme_1.shallow)(<Field_1.default data={data} dataPath="/block/0/text" formInspector={formInspector} name="text" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={schema} schemaPath="/text" showAllErrors={true} value="test"/>);
    expect(field.find('Field')).toHaveLength(0);
    data.title = 'Changed title!';
    expect(field.find('Field')).toHaveLength(1);
});
test('Render the field if visibleCondition with conditionDataProvider evaluates to true', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    conditionDataProviderRegistry_1.default.add((data) => ({ __test: data.test }));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="date"/>;
    });
    const schema = {
        label: 'Text',
        type: 'text_line',
        visibleCondition: '__test == "Test"',
    };
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{ test: 'Test' }} dataPath="/block/0/text" formInspector={formInspector} name="text" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={schema} schemaPath="/text" showAllErrors={true} value="test"/>);
    expect(field.find('Field')).toHaveLength(1);
});
test('Pass disabled flag to FieldType if disabledCondition evaluates to true', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="date"/>;
    });
    const schema = {
        disabledCondition: 'title == "Test"',
        label: 'Text',
        type: 'text_line',
    };
    const data = (0, mobx_1.observable)({ title: 'Test' });
    const field = (0, enzyme_1.shallow)(<Field_1.default data={data} dataPath="/block/0/text" formInspector={formInspector} name="text" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={schema} schemaPath="/text" showAllErrors={true} value="test"/>);
    expect(field.find('Text').prop('disabled')).toEqual(true);
    data.title = 'Change title!';
    expect(field.find('Text').prop('disabled')).toEqual(false);
});
test('Pass disabled flag to FieldType if disabledCondition with conditionDataProvider evaluates to true', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    conditionDataProviderRegistry_1.default.add((data) => ({ __test: data.test }));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="date"/>;
    });
    const schema = {
        disabledCondition: '__test == "Test"',
        label: 'Text',
        type: 'text_line',
    };
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{ test: 'Test' }} dataPath="/block/0/text" formInspector={formInspector} name="text" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={schema} schemaPath="/text" showAllErrors={true} value="test"/>);
    expect(field.find('Text').prop('disabled')).toEqual(true);
});
test('Merge with options from fieldRegistry before passing props to FieldType', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    fieldRegistry_1.default.getOptions.mockReturnValue({
        option: 'value',
    });
    const schema = {
        label: 'Text',
        maxOccurs: 4,
        minOccurs: 2,
        options: {
            anotherOption: { name: 'anotherOption', value: 'anotherValue' },
        },
        type: 'text_line',
        types: {},
    };
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="text" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={schema} schemaPath="" showAllErrors={true} value="test"/>);
    expect(field.find('Text').props()).toEqual(expect.objectContaining({
        fieldTypeOptions: {
            option: 'value',
        },
        maxOccurs: 4,
        minOccurs: 2,
        schemaOptions: {
            anotherOption: { name: 'anotherOption', value: 'anotherValue' },
        },
        showAllErrors: true,
        types: {},
        value: 'test',
    }));
});
test('Call onChange callback when value of Field changes', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    const changeSpy = jest.fn();
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={changeSpy} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label', type: 'text' }} schemaPath=""/>);
    field.find('Text').props().onChange('test value', { isDefaultValue: true });
    expect(changeSpy).toBeCalledWith('test', 'test value', { isDefaultValue: true });
});
test('Do not call onChange callback when value of disabled Field changes', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    const changeSpy = jest.fn();
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{ title: 'Test' }} dataPath="" formInspector={formInspector} name="test" onChange={changeSpy} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label', type: 'text', disabledCondition: 'title == "Test"' }} schemaPath=""/>);
    field.find('Text').props().onChange('test value');
    expect(changeSpy).not.toBeCalled();
});
test('Call onFinish callback after editing the field has finished', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    const finishSpy = jest.fn();
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{}} dataPath="/block/0/test" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={finishSpy} onSuccess={undefined} router={undefined} schema={{ label: 'label', type: 'text' }} schemaPath="/test"/>);
    field.find('Text').simulate('finish');
    expect(finishSpy).toBeCalledWith('/block/0/test', '/test');
});
test('Call onSuccess callback when field calls onSuccess', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    const successSpy = jest.fn();
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    const finishSpy = jest.fn();
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{}} dataPath="/block/0/test" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={finishSpy} onSuccess={successSpy} router={undefined} schema={{ label: 'label', type: 'text' }} schemaPath="/test"/>);
    field.find('Text').simulate('success');
    expect(successSpy).toBeCalled();
});
test('Do not render anything if field does not exist and onInvalid is set to ignore', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockImplementation(() => {
        throw new Error();
    });
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{}} dataPath="/test" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label', type: 'not-existing', onInvalid: 'ignore' }} schemaPath="/test"/>);
    expect(field.isEmptyRender()).toEqual(true);
});
test('Call onFocus callback when Field gets focus', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    const field = (0, enzyme_1.shallow)(<Field_1.default data={{}} dataPath="/title" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{ label: 'label', type: 'text' }} schemaPath="/schema/title" value="test value"/>);
    const target = new EventTarget();
    const dispatchEventSpy = jest.spyOn(target, 'dispatchEvent');
    field.find('Text').props().onFocus(target);
    expect(dispatchEventSpy).toHaveBeenCalled();
    const dispatchedEvent = dispatchEventSpy.mock.calls[0][0];
    expect(dispatchedEvent.type).toBe('sulu.focus');
    expect(dispatchedEvent.bubbles).toBe(true);
    expect(dispatchedEvent.detail).toEqual({
        schemaType: 'text',
        setValue: expect.any(Function),
        getValue: expect.any(Function),
        schemaPath: '/schema/title',
        dataPath: '/title',
        formInspector,
    });
    // Test the getValue function
    expect(dispatchedEvent.detail.getValue()).toBe('test value');
    // Test the setValue function
    const onChangeMock = jest.fn();
    field.setProps({ onChange: onChangeMock });
    dispatchedEvent.detail.setValue('new value');
    expect(onChangeMock).toHaveBeenCalledWith('test', 'new value', undefined);
});
