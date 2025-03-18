"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformDateForUrl_1 = __importDefault(require("../transformDateForUrl"));
test.each([
    [new Date('2020-02-28 00:00'), '2020-02-28 00:00'],
    [new Date('2000-08-31 12:00'), '2000-08-31 12:00'],
    [new Date('2006-12-31 00:00'), '2006-12-31 00:00'],
    [new Date('1940-12-01 12:00'), '1940-12-01 12:00'],
])('Transform date "%s"', (date, expectedValue) => {
    expect((0, transformDateForUrl_1.default)(date)).toEqual(expectedValue);
});
