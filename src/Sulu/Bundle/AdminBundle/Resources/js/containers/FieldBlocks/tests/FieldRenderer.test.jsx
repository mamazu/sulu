"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Router_1 = __importDefault(require("../../../services/Router"));
const FieldRenderer_1 = __importDefault(require("../FieldRenderer"));
const Form_1 = require("../../Form");
const ResourceStore_1 = __importDefault(require("../../../stores/ResourceStore"));
jest.mock('../../../services/Router/Router', () => jest.fn());
jest.mock('../../Form', () => ({
    FormInspector: jest.fn(),
    ResourceFormStore: jest.fn(),
    Renderer: jest.fn(),
}));
jest.mock('../../../stores/ResourceStore', () => jest.fn());
test('Should pass props correctly to Renderer', () => {
    const fieldFinishSpy = jest.fn();
    const successSpy = jest.fn();
    const value = {
        title: 'Test',
    };
    const data = {
        content: 'test',
        block: value,
    };
    const errors = {
        content: {
            keyword: 'minLength',
            parameters: {},
        },
    };
    const schema = {
        text: { label: 'Label', type: 'text_line', visible: true },
    };
    const formInspector = new Form_1.FormInspector(new Form_1.ResourceFormStore(new ResourceStore_1.default('snippets'), 'snippets'));
    const router = new Router_1.default();
    const formRenderer = (0, enzyme_1.shallow)(<FieldRenderer_1.default data={data} dataPath="/block/0/test" errors={errors} formInspector={formInspector} index={1} onChange={jest.fn()} onFieldFinish={fieldFinishSpy} onSuccess={successSpy} router={router} schema={schema} schemaPath="/test" value={value}/>);
    expect(formRenderer.find(Form_1.Renderer).props()).toEqual(expect.objectContaining({
        data,
        dataPath: '/block/0/test',
        errors,
        formInspector,
        onFieldFinish: fieldFinishSpy,
        onSuccess: successSpy,
        router,
        schema,
        schemaPath: '/test',
        showAllErrors: false,
        value,
    }));
});
test('Should pass showAllErrors prop to Renderer', () => {
    const formInspector = new Form_1.FormInspector(new Form_1.ResourceFormStore(new ResourceStore_1.default('snippets'), 'snippets'));
    const formRenderer = (0, enzyme_1.shallow)(<FieldRenderer_1.default data={{}} dataPath="" formInspector={formInspector} index={2} onChange={jest.fn()} onFieldFinish={jest.fn()} onSuccess={undefined} router={undefined} schema={{}} schemaPath="" showAllErrors={true} value={{}}/>);
    expect(formRenderer.find(Form_1.Renderer).prop('showAllErrors')).toEqual(true);
});
test('Should call onChange callback with correct index', () => {
    const changeSpy = jest.fn();
    const formInspector = new Form_1.FormInspector(new Form_1.ResourceFormStore(new ResourceStore_1.default('snippets'), 'snippets'));
    const formRenderer = (0, enzyme_1.shallow)(<FieldRenderer_1.default data={{}} dataPath="" formInspector={formInspector} index={2} onChange={changeSpy} onFieldFinish={jest.fn()} onSuccess={jest.fn()} router={undefined} schema={{}} schemaPath="" value={{}}/>);
    formRenderer.find(Form_1.Renderer).prop('onChange')('test', 'value');
    expect(changeSpy).toBeCalledWith(2, 'test', 'value');
});
test('Should call onFieldFinish when some subfield finishes editing', () => {
    const fieldFinishSpy = jest.fn();
    const formInspector = new Form_1.FormInspector(new Form_1.ResourceFormStore(new ResourceStore_1.default('snippets'), 'snippets'));
    const formRenderer = (0, enzyme_1.shallow)(<FieldRenderer_1.default data={{}} dataPath="" formInspector={formInspector} index={2} onChange={jest.fn()} onFieldFinish={fieldFinishSpy} onSuccess={jest.fn()} router={undefined} schema={{}} schemaPath="" value={{}}/>);
    formRenderer.find(Form_1.Renderer).prop('onFieldFinish')();
    expect(fieldFinishSpy).toBeCalledWith();
});
