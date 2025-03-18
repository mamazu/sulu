"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDifference;
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
function getDifference(target, source) {
    // if target and source are not the same data structure
    if (typeof target !== typeof source ||
        target === null || source === null ||
        Array.isArray(target) !== Array.isArray(source)) {
        return target;
    }
    // get all unique keys from target and source
    // this is necessary because the keys of the target and source can be different
    const keys = new Set([
        ...Object.keys(target),
        ...Object.keys(source),
    ]);
    // iterate over all keys and compare the values
    const result = {};
    for (const key of keys) {
        const targetValue = target[key] || null;
        const sourceValue = source[key] || null;
        // if the values are not equal, add the value to the result
        if (!(0, fast_deep_equal_1.default)(targetValue, sourceValue)) {
            result[key] = targetValue;
        }
    }
    return Object.keys(result).length > 0 ? result : {};
}
