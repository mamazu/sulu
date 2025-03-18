"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jexl_1 = __importDefault(require("jexl"));
// See https://github.com/TomFrost/Jexl/blob/471f167b3ae77924b8eb409ad68d47f75ac930fb/lib/grammar.js#L91
const andBinaryOpFunc = (left, right) => {
    return left.eval().then((leftVal) => {
        if (!leftVal) {
            return leftVal;
        }
        return right.eval();
    });
};
// See https://github.com/TomFrost/Jexl/blob/471f167b3ae77924b8eb409ad68d47f75ac930fb/lib/grammar.js#L101
const orBinaryOpFunc = (left, right) => {
    return left.eval().then((leftVal) => {
        if (leftVal) {
            return leftVal;
        }
        return right.eval();
    });
};
const initializeJexl = () => {
    jexl_1.default.addBinaryOp('AND', 10, andBinaryOpFunc, true);
    jexl_1.default.addBinaryOp('and', 10, andBinaryOpFunc, true);
    jexl_1.default.addBinaryOp('OR', 10, orBinaryOpFunc, true);
    jexl_1.default.addBinaryOp('or', 10, orBinaryOpFunc, true);
    jexl_1.default.addTransform('length', (value) => value.length);
    jexl_1.default.addTransform('includes', (value, search) => value.includes(search));
    jexl_1.default.addTransform('values', (value) => Object.values(value));
};
exports.default = initializeJexl;
