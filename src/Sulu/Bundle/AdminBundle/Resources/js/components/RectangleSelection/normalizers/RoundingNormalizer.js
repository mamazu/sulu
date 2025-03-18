"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoundingNormalizer {
    normalize(data) {
        return {
            width: Math.round(data.width),
            height: Math.round(data.height),
            top: Math.round(data.top),
            left: Math.round(data.left),
        };
    }
}
exports.default = RoundingNormalizer;
