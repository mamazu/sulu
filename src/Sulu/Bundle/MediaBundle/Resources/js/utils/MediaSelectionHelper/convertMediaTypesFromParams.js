"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = convertMediaTypesFromParams;
function convertMediaTypesFromParams(types) {
    if (!types) {
        return [];
    }
    return types.split(',').map((name) => {
        return name.trim();
    });
}
