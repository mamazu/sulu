"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
class SingleSelectBlockPreviewTransformer {
    transform(value, schema) {
        if (!schema.options || !schema.options.values) {
            throw new Error('The "SingleSelect" field type must have a "values" schema option!');
        }
        const values = schema.options.values.value;
        if (!(0, mobx_1.isArrayLike)(values)) {
            throw new Error('The "SingleSelect" field type must have a "values" option defined being an array!');
        }
        const selectedValue = values.find((option) => option.name === value);
        if (!selectedValue) {
            return null;
        }
        return <p>{selectedValue.title}</p>;
    }
}
exports.default = SingleSelectBlockPreviewTransformer;
