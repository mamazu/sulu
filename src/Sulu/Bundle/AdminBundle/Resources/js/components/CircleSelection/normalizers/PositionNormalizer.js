"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionNormalizer {
    constructor(containerWidth, containerHeight) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
    }
    normalize(data) {
        let { left, top } = data;
        left = Math.max(0, left);
        left = Math.min(left, this.containerWidth);
        top = Math.max(0, top);
        top = Math.min(top, this.containerHeight);
        return Object.assign(Object.assign({}, data), { left, top });
    }
}
exports.default = PositionNormalizer;
