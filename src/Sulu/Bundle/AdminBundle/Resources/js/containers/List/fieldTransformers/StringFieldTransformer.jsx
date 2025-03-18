"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const stringFieldTransformer_scss_1 = __importDefault(require("./stringFieldTransformer.scss"));
class StringFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        return <span className={stringFieldTransformer_scss_1.default.textBox} title={value}>{value}</span>;
    }
}
exports.default = StringFieldTransformer;
