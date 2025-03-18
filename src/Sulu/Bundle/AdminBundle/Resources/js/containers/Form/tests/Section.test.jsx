"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const ResourceStore_1 = __importDefault(require("../../../stores/ResourceStore"));
const Field_1 = __importDefault(require("../Field"));
const Section_1 = __importDefault(require("../Section"));
const FormInspector_1 = __importDefault(require("../FormInspector"));
const conditionDataProviderRegistry_1 = __importDefault(require("../registries/conditionDataProviderRegistry"));
const fieldRegistry_1 = __importDefault(require("../registries/fieldRegistry"));
const ResourceFormStore_1 = __importDefault(require("../stores/ResourceFormStore"));
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
test('Render section with children', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('snippets'), 'snippets'));
    fieldRegistry_1.default.get.mockReturnValue(function Text() {
        return <input type="text"/>;
    });
    expect((0, enzyme_1.render)(<Section_1.default data={{}} formInspector={formInspector} name="section" schema={{ label: 'Section', type: 'section' }}>
            <Field_1.default data={{}} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={jest.fn()} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>
        </Section_1.default>)).toMatchSnapshot();
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
    const section = (0, enzyme_1.shallow)(<Section_1.default data={data} formInspector={formInspector} name="section" schema={schema}>
            <Field_1.default data={data} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={jest.fn()} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>
        </Section_1.default>);
    expect(section.find('Section')).toHaveLength(0);
    data.title = 'Changed title!';
    expect(section.find('Section')).toHaveLength(1);
});
test('Render the section if visibleCondition with conditionDataProvider evaluates to true', () => {
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
    const data = { test: 'Test' };
    const section = (0, enzyme_1.shallow)(<Section_1.default data={data} formInspector={formInspector} name="section" schema={schema}>
            <Field_1.default data={data} dataPath="" formInspector={formInspector} name="test" onChange={jest.fn()} onFinish={jest.fn()} onSuccess={jest.fn()} router={undefined} schema={{ label: 'label1', type: 'text' }} schemaPath=""/>
        </Section_1.default>);
    expect(section.find('Section')).toHaveLength(1);
});
