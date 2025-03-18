"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
class NumberFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        if (isNaN(value)) {
            loglevel_1.default.error('Invalid number given: "' + value + '"');
            return null;
        }
        return value.toLocaleString();
    }
}
exports.default = NumberFieldTransformer;
