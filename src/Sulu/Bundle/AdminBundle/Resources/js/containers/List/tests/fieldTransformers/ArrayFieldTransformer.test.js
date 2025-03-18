"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayFieldTransformer_1 = __importDefault(require("../../fieldTransformers/ArrayFieldTransformer"));
const arrayFieldTransformer = new ArrayFieldTransformer_1.default();
test('Test undefined', () => {
    expect(arrayFieldTransformer.transform(undefined)).toBe(null);
});
test('Test empty array', () => {
    expect(arrayFieldTransformer.transform([])).toBe('');
});
test('Test array', () => {
    expect(arrayFieldTransformer.transform(['a', 'b', 'c'])).toBe('a, b, c');
});
