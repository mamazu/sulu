"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayFieldTransformer {
    transform(value) {
        if (!value) {
            return null;
        }
        return value.join(', ');
    }
}
exports.default = ArrayFieldTransformer;
