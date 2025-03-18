"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const dateTimeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
function default_1(date) {
    if (!date) {
        return undefined;
    }
    return dateTimeFormat.format(date);
}
