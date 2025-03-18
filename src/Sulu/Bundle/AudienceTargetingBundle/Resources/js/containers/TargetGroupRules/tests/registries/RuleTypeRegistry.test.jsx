"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ruleTypeRegistry_1 = __importDefault(require("../../registries/ruleTypeRegistry"));
beforeEach(() => {
    ruleTypeRegistry_1.default.clear();
});
test('Clear all rule types from RuleTypeRegistry', () => {
    const component1 = () => (<h1>Test1</h1>);
    ruleTypeRegistry_1.default.add('test1', component1);
    expect(Object.keys(ruleTypeRegistry_1.default.ruleTypes)).toHaveLength(1);
    ruleTypeRegistry_1.default.clear();
    expect(Object.keys(ruleTypeRegistry_1.default.ruleTypes)).toHaveLength(0);
});
test('Add rule type to RuleTypeRegistry', () => {
    const component1 = () => (<h1>Test1</h1>);
    const component2 = () => (<h1>Test2</h1>);
    ruleTypeRegistry_1.default.add('test1', component1);
    ruleTypeRegistry_1.default.add('test2', component2);
    expect(ruleTypeRegistry_1.default.get('test1')).toBe(component1);
    expect(ruleTypeRegistry_1.default.get('test2')).toBe(component2);
});
test('Add rule type with existing key should throw', () => {
    const component1 = () => (<h1>Test1</h1>);
    const component2 = () => (<h1>Test2</h1>);
    ruleTypeRegistry_1.default.add('test1', component1);
    expect(() => ruleTypeRegistry_1.default.add('test1', component2)).toThrow(/test1/);
});
test('Get rule type with existing key', () => {
    const component1 = () => (<h1>Test1</h1>);
    ruleTypeRegistry_1.default.add('test1', component1);
    expect(ruleTypeRegistry_1.default.get('test1')).toBe(component1);
});
test('Get rule type of not existing key', () => {
    expect(() => ruleTypeRegistry_1.default.get('XXX')).toThrow();
});
test('Has a rule type with an existing key', () => {
    ruleTypeRegistry_1.default.add('test', () => null);
    expect(ruleTypeRegistry_1.default.has('test')).toEqual(true);
});
test('Has a rule type with an not existing key', () => {
    expect(ruleTypeRegistry_1.default.has('test')).toEqual(false);
});
