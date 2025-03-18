"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const classnames_1 = __importDefault(require("classnames"));
const Icon_1 = __importDefault(require("../../../../components/Icon"));
const IconFieldTransformer_1 = __importDefault(require("../../fieldTransformers/IconFieldTransformer"));
const iconFieldTransformer_scss_1 = __importDefault(require("../../fieldTransformers/iconFieldTransformer.scss"));
const iconFieldTransformer = new IconFieldTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
    warn: jest.fn(),
}));
test('Test value undefined', () => {
    expect(iconFieldTransformer.transform(undefined, {})).toBe(undefined);
});
test('Test value null', () => {
    expect(iconFieldTransformer.transform(null, {})).toBe(null);
});
test('Test parameters/mapping undefined', () => {
    expect(iconFieldTransformer.transform('failed', {})).toBe('failed');
});
test('Test parameters/mapping wrong type', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: 'foo' })).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "mapping" needs to be of type collection.');
});
test('Test parameters/mapping empty', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: {} })).toBe('failed');
});
test('Test icon wrong type', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: 1 } })).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "mapping/failed" needs to be either of type string or collection.');
});
test('Test parameters/default wrong type', () => {
    expect(iconFieldTransformer.transform('default_failed', {
        mapping: { failed: 'su-fail' },
        default: 1
    })).toBe('default_failed');
    expect(loglevel_1.default.warn).toBeCalledWith('Transformer parameter "default" needs to be of type string or collection, number given.');
});
test('Test icon is object without icon', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: {} } })).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "mapping/failed/icon" needs to be of type string.');
});
test('Test icon is object with icon having wrong type', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: { icon: 1 } } })).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "mapping/failed/icon" needs to be of type string.');
});
test('Test icon is object with color having wrong type', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: { icon: 'su-ban', color: ['bar'] } } })).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "mapping/failed/color" needs to be of type string.');
});
test('Test icon not configured', () => {
    expect(iconFieldTransformer.transform('succeeded', { mapping: { failed: 'su-ban' } })).toBe('succeeded');
    expect(loglevel_1.default.warn).toBeCalledWith('There was no icon specified in the "mapping" transformer parameter for the value "succeeded".');
});
test('Test icon string', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: 'su-ban' } })).toEqual(<Icon_1.default className={(0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default.default)} name="su-ban"/>);
});
test('Test icon object', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: { icon: 'su-ban' } } })).toEqual(<Icon_1.default className={(0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default.default)} name="su-ban" style={{}}/>);
});
test('Test parameters/default string', () => {
    expect(iconFieldTransformer.transform('default_failed', {
        default: 'su-default-ban',
        mapping: { failed: 'su-ban' },
    })).toEqual(<Icon_1.default className={(0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default.default)} name="su-default-ban"/>);
});
test('Test parameters/default object', () => {
    expect(iconFieldTransformer.transform('default_failed', {
        default: {
            icon: 'su-default-ban',
            color: 'red',
        },
        mapping: {
            failed: {
                icon: 'su-ban',
            },
        },
    })).toEqual(<Icon_1.default className={(0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default.default)} name="su-default-ban" style={{ color: 'red' }}/>);
});
test('Test icon object with color', () => {
    expect(iconFieldTransformer.transform('failed', { mapping: { failed: { icon: 'su-ban', color: 'red' } } })).toEqual(<Icon_1.default className={(0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default.default)} name="su-ban" style={{ color: 'red' }}/>);
});
test('Test dark skin', () => {
    expect(iconFieldTransformer.transform('failed', { skin: 'dark', mapping: { failed: 'su-ban' } })).toEqual(<Icon_1.default className={(0, classnames_1.default)(iconFieldTransformer_scss_1.default.listIcon, iconFieldTransformer_scss_1.default.dark)} name="su-ban"/>);
});
test('Test invalid skin type', () => {
    iconFieldTransformer.transform('failed', { skin: 123, mapping: { failed: 'su-ban' } });
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "skin" needs to be of type string, number given.');
});
