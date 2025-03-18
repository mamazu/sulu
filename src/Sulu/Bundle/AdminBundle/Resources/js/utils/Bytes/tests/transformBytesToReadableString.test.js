"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformBytesToReadableString_1 = __importDefault(require("../transformBytesToReadableString"));
test('Test example 0', () => {
    expect((0, transformBytesToReadableString_1.default)(0)).toBe('0 Byte');
});
test('Test example MB', () => {
    expect((0, transformBytesToReadableString_1.default)(12312312)).toBe('12.31 MB');
});
test('Test example KB', () => {
    expect((0, transformBytesToReadableString_1.default)(55500)).toBe('55.50 KB');
});
test('Test example Bytes', () => {
    expect((0, transformBytesToReadableString_1.default)(521)).toBe('521.00 Bytes');
});
