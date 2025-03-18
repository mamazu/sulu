"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const TimeFieldTransformer_1 = __importDefault(require("../../fieldTransformers/TimeFieldTransformer"));
const timeFieldTransformer = new TimeFieldTransformer_1.default();
beforeEach(() => {
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
test('Test undefined', () => {
    expect(timeFieldTransformer.transform(undefined)).toBe(null);
});
test('Test invalid format', () => {
    expect(timeFieldTransformer.transform('xxx')).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid time given: "xxx". Format needs to be "HH:mm:ss"');
});
test('Test valid example', () => {
    expect(timeFieldTransformer.transform('14:09')).toBe('2:09 PM');
});
