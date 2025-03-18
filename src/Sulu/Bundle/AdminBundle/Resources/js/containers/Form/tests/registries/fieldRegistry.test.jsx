"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fieldRegistry_1 = __importDefault(require("../../registries/fieldRegistry"));
beforeEach(() => {
    fieldRegistry_1.default.clear();
});
test('Clear all fields from FieldRegistry', () => {
    const component1 = () => (<h1>Test1</h1>);
    fieldRegistry_1.default.add('test1', component1);
    expect(Object.keys(fieldRegistry_1.default.fields)).toHaveLength(1);
    fieldRegistry_1.default.clear();
    expect(Object.keys(fieldRegistry_1.default.fields)).toHaveLength(0);
});
test('Add field to FieldRegistry', () => {
    const component1 = () => (<h1>Test1</h1>);
    const component2 = () => (<h1>Test2</h1>);
    fieldRegistry_1.default.add('test1', component1);
    fieldRegistry_1.default.add('test2', component2);
    expect(fieldRegistry_1.default.get('test1')).toBe(component1);
    expect(fieldRegistry_1.default.get('test2')).toBe(component2);
});
test('Add a field with options to the FieldRegistry', () => {
    const component1 = () => (<h1>Test1</h1>);
    const component2 = () => (<h1>Test2</h1>);
    fieldRegistry_1.default.add('test1', component1, { option1: 'value1' });
    fieldRegistry_1.default.add('test2', component2, { option2: 'value2' });
    expect(fieldRegistry_1.default.get('test1')).toBe(component1);
    expect(fieldRegistry_1.default.get('test2')).toBe(component2);
    expect(fieldRegistry_1.default.getOptions('test1')).toEqual({ option1: 'value1' });
    expect(fieldRegistry_1.default.getOptions('test2')).toEqual({ option2: 'value2' });
});
test('Add field with existing key should throw', () => {
    const component1 = () => (<h1>Test1</h1>);
    const component2 = () => (<h1>Test2</h1>);
    fieldRegistry_1.default.add('test1', component1);
    expect(() => fieldRegistry_1.default.add('test1', component2)).toThrow(/test1/);
});
test('Get field with existing key', () => {
    const component1 = () => (<h1>Test1</h1>);
    fieldRegistry_1.default.add('test1', component1);
    expect(fieldRegistry_1.default.get('test1')).toBe(component1);
});
test('Get field of not existing key', () => {
    expect(() => fieldRegistry_1.default.get('XXX')).toThrow();
});
test('Has a field with an existing key', () => {
    fieldRegistry_1.default.add('test', () => null);
    expect(fieldRegistry_1.default.has('test')).toEqual(true);
});
test('Has a field with an not existing key', () => {
    expect(fieldRegistry_1.default.has('test')).toEqual(false);
});
