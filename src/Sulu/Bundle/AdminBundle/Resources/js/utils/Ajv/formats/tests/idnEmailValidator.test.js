"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idnEmailValidator_1 = __importDefault(require("../idnEmailValidator"));
test('Normal email address should pass validation', () => {
    expect((0, idnEmailValidator_1.default)('hello@example.com')).toBe(true);
});
test('Invalid email address must not pass validation', () => {
    expect((0, idnEmailValidator_1.default)('invalid')).toBe(false);
});
