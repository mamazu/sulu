"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class TranslationFieldTransformer {
    transform(value, parameters) {
        if (value === undefined) {
            return null;
        }
        const { prefix = '' } = parameters;
        return (0, utils_1.translate)(prefix + value);
    }
}
exports.default = TranslationFieldTransformer;
