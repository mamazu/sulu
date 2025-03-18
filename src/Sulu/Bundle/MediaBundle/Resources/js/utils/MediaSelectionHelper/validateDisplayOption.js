"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateDisplayOption;
function validateDisplayOption(name) {
    return name === 'leftTop'
        || name === 'top'
        || name === 'rightTop'
        || name === 'left'
        || name === 'middle'
        || name === 'right'
        || name === 'leftBottom'
        || name === 'bottom'
        || name === 'rightBottom';
}
