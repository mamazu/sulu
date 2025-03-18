"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const DateTimeFieldTransformer_1 = __importDefault(require("../../fieldTransformers/DateTimeFieldTransformer"));
const utils_1 = require("../../../../utils");
beforeEach(() => {
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
const dateTimeFieldTransformer = new DateTimeFieldTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Test undefined', () => {
    expect(dateTimeFieldTransformer.transform(undefined, {})).toBe(null);
});
test('Test invalid format', () => {
    expect(dateTimeFieldTransformer.transform('xxx', {})).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid date given: "xxx". Format needs to be in "ISO 8601"');
});
test('Test valid example', () => {
    expect(dateTimeFieldTransformer.transform('2018-03-10T14:09:04+01:00', {})).toEqual(<span className="default">March 10, 2018 2:09 PM</span>);
});
test('Test light skin example', () => {
    expect(dateTimeFieldTransformer.transform('2018-03-10T14:09:04+01:00', { 'skin': 'light' })).toEqual(<span className="light">March 10, 2018 2:09 PM</span>);
});
test('Test invalid skin type', () => {
    dateTimeFieldTransformer.transform('2018-03-10T14:09:04+01:00', { 'skin': 123 });
    expect(loglevel_1.default.error).toBeCalledWith('Transformer parameter "skin" needs to be of type string, number given.');
});
test('Test relative format sameDay example', () => {
    const dateTime = dateTimeFieldTransformer.transform((0, moment_timezone_1.default)(), { format: 'relative' });
    expect(dateTime.props.children).toContain('sulu_admin.sameDay');
    expect(utils_1.translate).toHaveBeenCalledWith('sulu_admin.sameDay');
});
test('Test relative format nextDay example', () => {
    const dateTime = dateTimeFieldTransformer.transform((0, moment_timezone_1.default)().add(1, 'day'), { format: 'relative' });
    expect(dateTime.props.children).toContain('sulu_admin.nextDay');
    expect(utils_1.translate).toHaveBeenCalledWith('sulu_admin.nextDay');
});
test('Test relative format lastDay example', () => {
    const dateTime = dateTimeFieldTransformer.transform((0, moment_timezone_1.default)().subtract(1, 'day'), { format: 'relative' });
    expect(dateTime.props.children).toContain('sulu_admin.lastDay');
    expect(utils_1.translate).toHaveBeenCalledWith('sulu_admin.lastDay');
});
test('Test relative format lastWeek example', () => {
    const momentObject = (0, moment_timezone_1.default)().subtract(7, 'day');
    const dateTime = dateTimeFieldTransformer.transform(momentObject, { format: 'relative' });
    expect(dateTime.props.children).toContain(momentObject.format('LLL'));
    expect(utils_1.translate).toHaveBeenCalledWith('sulu_admin.lastDay');
});
