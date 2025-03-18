"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformDateToTimeString_1 = __importDefault(require("../transformDateToTimeString"));
test.each([
    [new Date('2020-02-28 03:24:48'), '03:24:48'],
    [new Date('2000-08-31 12:10:00'), '12:10:00'],
    [new Date('2006-12-31 18:31:10'), '18:31:10'],
    [new Date('1940-12-01 10:39'), '10:39:00'],
    [undefined, undefined],
])('Transform date "%s"', (date, expectedValue) => {
    expect((0, transformDateToTimeString_1.default)(date)).toEqual(expectedValue);
});
