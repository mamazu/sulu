"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buildQueryString_1 = __importDefault(require("../buildQueryString"));
test('Should return empty string if all values are undefined', () => {
    expect((0, buildQueryString_1.default)({ value1: undefined, value2: undefined })).toEqual('');
});
test('Should return empty string if nothing is given', () => {
    expect((0, buildQueryString_1.default)()).toEqual('');
});
test('Should omit undefined parameters', () => {
    expect((0, buildQueryString_1.default)({ value1: 'value1', value2: undefined, value3: 'value3' }))
        .toEqual('?value1=value1&value3=value3');
});
