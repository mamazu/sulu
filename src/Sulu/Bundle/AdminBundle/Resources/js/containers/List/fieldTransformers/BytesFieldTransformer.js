"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class BytesFieldTransformer {
    transform(value) {
        if (value === undefined) {
            return null;
        }
        return (0, utils_1.transformBytesToReadableString)(value);
    }
}
exports.default = BytesFieldTransformer;
