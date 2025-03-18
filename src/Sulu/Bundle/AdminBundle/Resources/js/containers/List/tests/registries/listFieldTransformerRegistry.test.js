"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listFieldTransformerRegistry_1 = __importDefault(require("../../registries/listFieldTransformerRegistry"));
beforeEach(() => {
    listFieldTransformerRegistry_1.default.clear();
});
test('Clear all transformers', () => {
    const Test1 = class Test1 {
        transform(value) {
            return value;
        }
    };
    listFieldTransformerRegistry_1.default.add('test1', new Test1());
    expect(Object.keys(listFieldTransformerRegistry_1.default.fieldTransformers)).toHaveLength(1);
    listFieldTransformerRegistry_1.default.clear();
    expect(Object.keys(listFieldTransformerRegistry_1.default.fieldTransformers)).toHaveLength(0);
});
test('Add transformer', () => {
    const Test1 = class Test1 {
        transform(value) {
            return value;
        }
    };
    const Test2 = class Test1 {
        transform(value) {
            return value;
        }
    };
    listFieldTransformerRegistry_1.default.add('test1', new Test1());
    listFieldTransformerRegistry_1.default.add('test2', new Test2());
    expect(listFieldTransformerRegistry_1.default.get('test1')).toBeInstanceOf(Test1);
    expect(listFieldTransformerRegistry_1.default.get('test2')).toBeInstanceOf(Test2);
});
test('Add transformer with existing key should throw', () => {
    const Test1 = class Test1 {
        transform(value) {
            return value;
        }
    };
    listFieldTransformerRegistry_1.default.add('test1', new Test1());
    expect(() => listFieldTransformerRegistry_1.default.add('test1', new Test1())).toThrow(/test1/);
});
test('Get transformer of not existing key', () => {
    expect(() => listFieldTransformerRegistry_1.default.get('XXX')).toThrow();
});
test('Has a transformer with an existing key', () => {
    const Test1 = class Test1 {
        transform(value) {
            return value;
        }
    };
    listFieldTransformerRegistry_1.default.add('test1', new Test1());
    expect(listFieldTransformerRegistry_1.default.has('test1')).toEqual(true);
});
test('Has a transformer with not existing key', () => {
    expect(listFieldTransformerRegistry_1.default.has('test')).toEqual(false);
});
