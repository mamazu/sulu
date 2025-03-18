"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
class SelectBlockPreviewTransformer {
    transform(value, schema) {
        if (!(0, mobx_1.isArrayLike)(value)) {
            return null;
        }
        if (!schema.options || !schema.options.values) {
            throw new Error('The "Select" field type must have a "values" schema option!');
        }
        const values = schema.options.values.value;
        if (!(0, mobx_1.isArrayLike)(values)) {
            throw new Error('The "SingleSelect" field type must have a "values" option defined being an array!');
        }
        const selectedValues = values.filter((option) => value.includes(option.name));
        if (!selectedValues) {
            return null;
        }
        return <p>{selectedValues.map((selectedValue) => selectedValue.title).join(', ')}</p>;
    }
}
exports.default = SelectBlockPreviewTransformer;
