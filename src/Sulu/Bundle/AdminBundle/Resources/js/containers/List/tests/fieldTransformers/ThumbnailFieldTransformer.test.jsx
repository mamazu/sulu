"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const ThumbnailFieldTransformer_1 = __importDefault(require("../../fieldTransformers/ThumbnailFieldTransformer"));
const thumbnailTransformer = new ThumbnailFieldTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test undefined', () => {
    expect(thumbnailTransformer.transform(undefined)).toBe(null);
});
test('Test string', () => {
    expect(thumbnailTransformer.transform('Test1')).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid type given: "string". "object" is needed.');
});
test('Test number', () => {
    expect(thumbnailTransformer.transform(5)).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid type given: "number". "object" is needed.');
});
test('Test invalid object', () => {
    expect(thumbnailTransformer.transform({ test: 'test' })).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Object needs property "sulu-40x40".');
});
test('Test valid object', () => {
    expect(thumbnailTransformer.transform({ 'sulu-40x40': '/path/to/image.png' })).toEqual(<img alt={undefined} src="/path/to/image.png"/>);
});
