"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MAX_LENGTH = 50;
class StringBlockPreviewTransformer {
    transform(value) {
        if (typeof value === 'number') {
            value = String(value);
        }
        if (typeof value !== 'string') {
            return null;
        }
        return <p>{value.length > MAX_LENGTH ? value.substring(0, MAX_LENGTH) + '...' : value}</p>;
    }
}
exports.default = StringBlockPreviewTransformer;
