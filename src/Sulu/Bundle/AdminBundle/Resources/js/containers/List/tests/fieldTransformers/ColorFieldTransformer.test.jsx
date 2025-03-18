"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const ColorFieldTransformer_1 = __importDefault(require("../../fieldTransformers/ColorFieldTransformer"));
const colorFieldTransformer_scss_1 = __importDefault(require("./colorFieldTransformer.scss"));
const colorTransformer = new ColorFieldTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test invalid color null', () => {
    const value = null;
    expect(colorTransformer.transform(value)).toBe(value);
});
test('Test invalid color (no hashtag)', () => {
    const value = 'FFF';
    expect(colorTransformer.transform(value)).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith(`Invalid color given: "${value}". Format needs to be "#RGB" or "#RRGGBB".`);
});
test('Test invalid color (length 2)', () => {
    const value = '#FF';
    expect(colorTransformer.transform(value)).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith(`Invalid color given: "${value}". Format needs to be "#RGB" or "#RRGGBB".`);
});
test('Test valid color (lowercase)', () => {
    const value = '#ffffff';
    const style = {};
    style.backgroundColor = value;
    expect(colorTransformer.transform(value)).toEqual(<div className={colorFieldTransformer_scss_1.default.colorBox} style={style}></div>);
});
test('Test valid color (uppercase)', () => {
    const value = '#FFFFFF';
    const style = {};
    style.backgroundColor = value;
    expect(colorTransformer.transform(value)).toEqual(<div className={colorFieldTransformer_scss_1.default.colorBox} style={style}></div>);
});
test('Test valid color (3 length)', () => {
    const value = '#FFF';
    const style = {};
    style.backgroundColor = value;
    expect(colorTransformer.transform(value)).toEqual(<div className={colorFieldTransformer_scss_1.default.colorBox} style={style}></div>);
});
