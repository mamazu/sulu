"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listFieldFilterTypeRegistry_1 = __importDefault(require("../../registries/listFieldFilterTypeRegistry"));
const AbstractFieldFilterType_1 = __importDefault(require("../../fieldFilterTypes/AbstractFieldFilterType"));
beforeEach(() => {
    listFieldFilterTypeRegistry_1.default.clear();
});
test('Clear all filter types', () => {
    const Test1 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    listFieldFilterTypeRegistry_1.default.add('test1', Test1);
    expect(Object.keys(listFieldFilterTypeRegistry_1.default.fieldFilterTypes)).toHaveLength(1);
    listFieldFilterTypeRegistry_1.default.clear();
    expect(Object.keys(listFieldFilterTypeRegistry_1.default.fieldFilterTypes)).toHaveLength(0);
});
test('Add filter type', () => {
    const Test1 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    const Test2 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    listFieldFilterTypeRegistry_1.default.add('test1', Test1);
    listFieldFilterTypeRegistry_1.default.add('test2', Test2);
    expect(listFieldFilterTypeRegistry_1.default.get('test1')).toBe(Test1);
    expect(listFieldFilterTypeRegistry_1.default.get('test2')).toBe(Test2);
});
test('Add filter type with existing key should throw', () => {
    const Test1 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    listFieldFilterTypeRegistry_1.default.add('test1', Test1);
    expect(() => listFieldFilterTypeRegistry_1.default.add('test1', Test1)).toThrow(/test1/);
});
test('Get filter type of not existing key', () => {
    expect(() => listFieldFilterTypeRegistry_1.default.get('XXX')).toThrow();
});
test('Has a filter type with an existing key', () => {
    const Test1 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    listFieldFilterTypeRegistry_1.default.add('test1', Test1);
    expect(listFieldFilterTypeRegistry_1.default.has('test1')).toEqual(true);
});
test('Has a filter type with not existing key', () => {
    expect(listFieldFilterTypeRegistry_1.default.has('test')).toEqual(false);
});
test('Add a field filter type with options to the Registry', () => {
    const Test1 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    const Test2 = class Test1 extends AbstractFieldFilterType_1.default {
    };
    listFieldFilterTypeRegistry_1.default.add('test1', Test1, { option1: 'value1' });
    listFieldFilterTypeRegistry_1.default.add('test2', Test2, { option2: 'value2' });
    expect(listFieldFilterTypeRegistry_1.default.get('test1')).toBe(Test1);
    expect(listFieldFilterTypeRegistry_1.default.get('test2')).toBe(Test2);
    expect(listFieldFilterTypeRegistry_1.default.getOptions('test1')).toEqual({ option1: 'value1' });
    expect(listFieldFilterTypeRegistry_1.default.getOptions('test2')).toEqual({ option2: 'value2' });
});
