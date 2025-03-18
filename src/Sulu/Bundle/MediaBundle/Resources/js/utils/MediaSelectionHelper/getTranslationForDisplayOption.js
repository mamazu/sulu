"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTranslationForDisplayOption;
const utils_1 = require("sulu-admin-bundle/utils");
function getTranslationForDisplayOption(value) {
    switch (value) {
        case 'leftTop':
            return (0, utils_1.translate)('sulu_media.left_top');
        case 'top':
            return (0, utils_1.translate)('sulu_media.top');
        case 'rightTop':
            return (0, utils_1.translate)('sulu_media.right_top');
        case 'left':
            return (0, utils_1.translate)('sulu_media.left');
        case 'middle':
            return (0, utils_1.translate)('sulu_media.middle');
        case 'right':
            return (0, utils_1.translate)('sulu_media.right');
        case 'leftBottom':
            return (0, utils_1.translate)('sulu_media.left_bottom');
        case 'bottom':
            return (0, utils_1.translate)('sulu_media.bottom');
        case 'rightBottom':
            return (0, utils_1.translate)('sulu_media.right_bottom');
        default:
            return '';
    }
}
