"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StringFieldTransformer_1 = __importDefault(require("../../fieldTransformers/StringFieldTransformer"));
const stringFieldTransformer = new StringFieldTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test undefined', () => {
    expect(stringFieldTransformer.transform(undefined)).toBe(null);
});
test('Test string', () => {
    expect(stringFieldTransformer.transform('Test1')).toEqual(<span className="textBox" title="Test1">Test1</span>);
});
test('Test number', () => {
    expect(stringFieldTransformer.transform(5)).toEqual(<span className="textBox" title={5}>{5}</span>);
});
