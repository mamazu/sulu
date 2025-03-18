"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const textEditorRegistry_1 = __importDefault(require("../../registries/textEditorRegistry"));
class TextEditor extends react_1.default.Component {
}
beforeEach(() => {
    textEditorRegistry_1.default.clear();
});
test('Clear all text editors', () => {
    textEditorRegistry_1.default.add('test1', TextEditor);
    expect(Object.keys(textEditorRegistry_1.default.textEditors)).toHaveLength(1);
    textEditorRegistry_1.default.clear();
    expect(Object.keys(textEditorRegistry_1.default.textEditors)).toHaveLength(0);
});
test('Add text editors to the registry', () => {
    textEditorRegistry_1.default.add('test1', TextEditor);
    expect(textEditorRegistry_1.default.get('test1')).toBe(TextEditor);
});
test('Add text editor with already existing key should throw', () => {
    textEditorRegistry_1.default.add('test1', TextEditor);
    expect(() => textEditorRegistry_1.default.add('test1', TextEditor)).toThrow(/test1/);
});
test('Get text editor for not existing key should throw', () => {
    expect(() => textEditorRegistry_1.default.get('test1')).toThrow(/test1/);
});
test('Has should return true if a key exists', () => {
    textEditorRegistry_1.default.add('test1', TextEditor);
    expect(textEditorRegistry_1.default.has('test1')).toEqual(true);
});
test('Has should return false if a key does not exist', () => {
    expect(textEditorRegistry_1.default.has('test')).toEqual(false);
});
