"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoundingNormalizer {
    normalize(data) {
        const { left, top, radius = 0 } = data;
        return {
            left: Math.round(left),
            top: Math.round(top),
            radius: Math.round(radius),
        };
    }
}
exports.default = RoundingNormalizer;
