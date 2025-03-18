"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const TextEditor_1 = __importDefault(require("../TextEditor"));
const textEditorRegistry_1 = __importDefault(require("../registries/textEditorRegistry"));
jest.mock('../registries/textEditorRegistry', () => ({
    get: jest.fn(),
}));
test('Render the TextEditor', () => {
    textEditorRegistry_1.default.get.mockReturnValue(() => (<textarea />));
    expect((0, enzyme_1.render)(<TextEditor_1.default adapter="test" locale={undefined} onBlur={jest.fn()} onChange={jest.fn()} options={{}} value={undefined}/>)).toMatchSnapshot();
});
test('Pass correct props to the given adapter', () => {
    class TestAdapter extends react_1.default.Component {
        render() {
            return null;
        }
    }
    textEditorRegistry_1.default.get.mockReturnValue(TestAdapter);
    const locale = mobx_1.observable.box('en');
    const textEditor = (0, enzyme_1.mount)(<TextEditor_1.default adapter="test" disabled={true} locale={locale} onBlur={jest.fn()} onChange={jest.fn()} options={{}} value="testValue"/>);
    expect(textEditor.find('TestAdapter').prop('disabled')).toEqual(true);
    expect(textEditor.find('TestAdapter').prop('locale')).toEqual(locale);
    expect(textEditor.find('TestAdapter').prop('value')).toEqual('testValue');
});
test('Throw an exception if a not existing adapter is used', () => {
    textEditorRegistry_1.default.get.mockImplementation((key) => {
        throw new Error(key);
    });
    expect(() => (0, enzyme_1.shallow)(<TextEditor_1.default adapter="test" locale={undefined} onBlur={jest.fn()} onChange={jest.fn()} options={{}} value={undefined}/>)).toThrow(/test/);
});
