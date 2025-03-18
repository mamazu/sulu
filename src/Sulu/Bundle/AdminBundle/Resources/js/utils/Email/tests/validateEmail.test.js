"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateEmail_1 = __importDefault(require("../validateEmail"));
test('The valid email addresses', () => {
    expect((0, validateEmail_1.default)('example@sulu.io')).toBe(true);
    expect((0, validateEmail_1.default)('example@example.org')).toBe(true);
    expect((0, validateEmail_1.default)('example@localhost')).toBe(true);
    expect((0, validateEmail_1.default)('0123@domain123.localhost')).toBe(true);
    expect((0, validateEmail_1.default)('some.name_more-symbols123+postfix@localhost')).toBe(true);
    expect((0, validateEmail_1.default)('some-ip@127.0.0.1')).toBe(true);
});
test('The invalid email addresses', () => {
    expect((0, validateEmail_1.default)(null)).toBe(false);
    expect((0, validateEmail_1.default)('example')).toBe(false);
    expect((0, validateEmail_1.default)('example@')).toBe(false);
    expect((0, validateEmail_1.default)('example@localhost@')).toBe(false);
});
