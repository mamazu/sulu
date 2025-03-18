"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const fieldTypeDefaultProps_1 = __importDefault(require("../../../../utils/TestHelper/fieldTypeDefaultProps"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const FormInspector_1 = __importDefault(require("../../FormInspector"));
const ResourceFormStore_1 = __importDefault(require("../../stores/ResourceFormStore"));
const TextEditor_1 = __importDefault(require("../../fields/TextEditor"));
const userStore_1 = __importDefault(require("../../../../stores/userStore"));
jest.mock('../../../../stores/ResourceStore', () => jest.fn());
jest.mock('../../stores/ResourceFormStore', () => jest.fn());
jest.mock('../../FormInspector', () => jest.fn());
jest.mock('../../../../stores/userStore', () => ({}));
test('Pass props correctly to TextEditor', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const options = {};
    const locale = mobx_1.observable.box('en');
    formInspector.locale = locale;
    const textEditor = (0, enzyme_1.shallow)(<TextEditor_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={options} value="xyz"/>);
    expect(textEditor.find('TextEditor').props()).toEqual(expect.objectContaining({
        adapter: 'ckeditor5',
        locale,
        onBlur: finishSpy,
        onChange: changeSpy,
        options,
        value: 'xyz',
        disabled: true,
    }));
});
test('Pass content locale from user to TextEditor if form has no locale', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const options = {};
    userStore_1.default.contentLocale = 'de';
    const textEditor = (0, enzyme_1.shallow)(<TextEditor_1.default {...fieldTypeDefaultProps_1.default} disabled={true} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={options} value="xyz"/>);
    expect(textEditor.find('TextEditor').props().locale).toBeDefined();
    expect(textEditor.find('TextEditor').props().locale.get()).toEqual('de');
});
test('Call onFocus when editor get focus', () => {
    const formInspector = new FormInspector_1.default(new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test'));
    const focusSpy = jest.fn();
    const textEditor = (0, enzyme_1.shallow)(<TextEditor_1.default {...fieldTypeDefaultProps_1.default} formInspector={formInspector} onFocus={focusSpy}/>);
    const target = new EventTarget();
    textEditor.find('TextEditor').props().onFocus({ target });
    expect(focusSpy).toBeCalledWith(target);
});
