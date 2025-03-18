"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const DateTimeBlockPreviewTransformer_1 = __importDefault(require("../../blockPreviewTransformers/DateTimeBlockPreviewTransformer"));
beforeEach(() => {
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
const dateTimeBlockPreviewTransformer = new DateTimeBlockPreviewTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test undefined', () => {
    expect(dateTimeBlockPreviewTransformer.transform(undefined)).toBe(null);
});
test('Test invalid format', () => {
    expect(dateTimeBlockPreviewTransformer.transform('xxx')).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid date given: "xxx". Format needs to be "YYYY-MM-DD"');
});
test('Test valid example', () => {
    expect(dateTimeBlockPreviewTransformer.transform('2018-03-10T14:09:04+01:00')).toEqual(<p>03/10/2018</p>);
});
