"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(time) {
    if (!time || typeof time !== 'string') {
        return undefined;
    }
    const timeParts = time.split(':');
    return new Date(0, 0, 0, parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2]));
}
