"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const DateFieldTransformer_1 = __importDefault(require("../../fieldTransformers/DateFieldTransformer"));
const dateFieldTransformer = new DateFieldTransformer_1.default();
beforeEach(() => {
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test undefined', () => {
    expect(dateFieldTransformer.transform(undefined)).toBe(null);
});
test('Test invalid format', () => {
    expect(dateFieldTransformer.transform('xxx')).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid date given: "xxx". Format needs to be "YYYY-MM-DD"');
});
test('Test valid example', () => {
    expect(dateFieldTransformer.transform('2018-03-10')).toBe('03/10/2018');
});
