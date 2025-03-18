"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockPreviewTransformerRegistry_1 = __importDefault(require("../../registries/blockPreviewTransformerRegistry"));
beforeEach(() => {
    blockPreviewTransformerRegistry_1.default.clear();
});
test('Clear all transformers', () => {
    const Test1 = class Test1 {
        transform(value) {
            return value;
        }
    };
    blockPreviewTransformerRegistry_1.default.add('test1', new Test1());
    expect(Object.keys(blockPreviewTransformerRegistry_1.default.blockPreviewTransformers)).toHaveLength(1);
    blockPreviewTransformerRegistry_1.default.clear();
    expect(Object.keys(blockPreviewTransformerRegistry_1.default.blockPreviewTransformers)).toHaveLength(0);
});
test('Add transformer', () => {
    class Test1 {
        transform(value) {
            return value;
        }
    }
    class Test2 {
        transform(value) {
            return value;
        }
    }
    blockPreviewTransformerRegistry_1.default.add('test1', new Test1());
    blockPreviewTransformerRegistry_1.default.add('test2', new Test2());
    expect(blockPreviewTransformerRegistry_1.default.get('test1')).toBeInstanceOf(Test1);
    expect(blockPreviewTransformerRegistry_1.default.get('test2')).toBeInstanceOf(Test2);
});
test('Get transformer keys sorted by priority', () => {
    class Test {
        transform(value) {
            return value;
        }
    }
    blockPreviewTransformerRegistry_1.default.add('test1', new Test(), 10);
    blockPreviewTransformerRegistry_1.default.add('test2', new Test(), 15);
    blockPreviewTransformerRegistry_1.default.add('test3', new Test(), -10);
    blockPreviewTransformerRegistry_1.default.add('test4', new Test());
    expect(blockPreviewTransformerRegistry_1.default.blockPreviewTransformerKeysByPriority)
        .toEqual(['test2', 'test1', 'test4', 'test3']);
});
test('Add transformer with existing key should throw', () => {
    class Test1 {
        transform(value) {
            return value;
        }
    }
    blockPreviewTransformerRegistry_1.default.add('test1', new Test1());
    expect(() => blockPreviewTransformerRegistry_1.default.add('test1', new Test1())).toThrow(/test1/);
});
test('Get transformer of not existing key', () => {
    expect(() => blockPreviewTransformerRegistry_1.default.get('XXX')).toThrow();
});
test('Has a transformer with an existing key', () => {
    const Test1 = class Test1 {
        transform(value) {
            return value;
        }
    };
    blockPreviewTransformerRegistry_1.default.add('test1', new Test1());
    expect(blockPreviewTransformerRegistry_1.default.has('test1')).toEqual(true);
});
test('Has a transformer with not existing key', () => {
    expect(blockPreviewTransformerRegistry_1.default.has('test')).toEqual(false);
});
