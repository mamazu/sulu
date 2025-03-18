"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const loglevel_1 = __importDefault(require("loglevel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const TimeBlockPreviewTransformer_1 = __importDefault(require("../../blockPreviewTransformers/TimeBlockPreviewTransformer"));
beforeEach(() => {
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
const timeBlockPreviewTransformer = new TimeBlockPreviewTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test undefined', () => {
    expect(timeBlockPreviewTransformer.transform(undefined)).toBe(null);
});
test('Test invalid format', () => {
    expect(timeBlockPreviewTransformer.transform('xxx')).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid time given: "xxx". Format needs to be "HH:mm:ss"');
});
test('Test valid example', () => {
    expect(timeBlockPreviewTransformer.transform('14:09:04')).toEqual(<p>2:09 PM</p>);
});
