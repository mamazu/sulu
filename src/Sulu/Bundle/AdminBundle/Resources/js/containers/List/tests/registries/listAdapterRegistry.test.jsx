"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const listAdapterRegistry_1 = __importDefault(require("../../registries/listAdapterRegistry"));
const AbstractAdapter_1 = __importDefault(require("../../adapters/AbstractAdapter"));
beforeEach(() => {
    listAdapterRegistry_1.default.clear();
});
class LoadingStrategy {
    constructor() {
        this.destroy = jest.fn();
        this.initialize = jest.fn();
        this.load = jest.fn();
        this.reset = jest.fn();
        this.setStructureStrategy = jest.fn();
    }
}
class StructureStrategy {
    constructor() {
        this.addItem = jest.fn();
        this.clear = jest.fn();
        this.findById = jest.fn();
        this.order = jest.fn();
        this.remove = jest.fn();
    }
}
class TestAdapter extends AbstractAdapter_1.default {
    render() {
        return (<div>Test Adapter</div>);
    }
}
TestAdapter.LoadingStrategy = LoadingStrategy;
TestAdapter.StructureStrategy = StructureStrategy;
TestAdapter.icon = 'su-view';
class TestAdapter2 extends AbstractAdapter_1.default {
    render() {
        return (<div>Test Adapter 2</div>);
    }
}
TestAdapter2.LoadingStrategy = LoadingStrategy;
TestAdapter2.StructureStrategy = StructureStrategy;
TestAdapter2.icon = 'su-view2';
test('Clear all adapters', () => {
    listAdapterRegistry_1.default.add('test1', TestAdapter);
    expect(Object.keys(listAdapterRegistry_1.default.adapters)).toHaveLength(1);
    listAdapterRegistry_1.default.clear();
    expect(Object.keys(listAdapterRegistry_1.default.adapters)).toHaveLength(0);
});
test('Add adapter', () => {
    listAdapterRegistry_1.default.add('test1', TestAdapter);
    listAdapterRegistry_1.default.add('test2', TestAdapter2);
    expect(listAdapterRegistry_1.default.get('test1')).toBe(TestAdapter);
    expect(listAdapterRegistry_1.default.get('test2')).toBe(TestAdapter2);
});
test('Add adapter with options', () => {
    listAdapterRegistry_1.default.add('test1', TestAdapter, { option1: 'value1' });
    listAdapterRegistry_1.default.add('test2', TestAdapter2, { option2: 'value2' });
    expect(listAdapterRegistry_1.default.get('test1')).toEqual(TestAdapter);
    expect(listAdapterRegistry_1.default.getOptions('test1')).toEqual({ option1: 'value1' });
    expect(listAdapterRegistry_1.default.get('test2')).toEqual(TestAdapter2);
    expect(listAdapterRegistry_1.default.getOptions('test2')).toEqual({ option2: 'value2' });
});
test('Add adapter with existing key should throw', () => {
    listAdapterRegistry_1.default.add('test1', TestAdapter);
    expect(() => listAdapterRegistry_1.default.add('test1', TestAdapter)).toThrow(/test1/);
});
test('Get adapter of not existing key', () => {
    expect(() => listAdapterRegistry_1.default.get('XXX')).toThrow();
});
test('Has a adapter with an existing key', () => {
    listAdapterRegistry_1.default.add('test1', TestAdapter);
    expect(listAdapterRegistry_1.default.has('test1')).toEqual(true);
});
test('Has a adapter with not existing key', () => {
    expect(listAdapterRegistry_1.default.has('test')).toEqual(false);
});
