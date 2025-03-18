"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PositionNormalizer {
    constructor(containerWidth, containerHeight) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
    }
    normalize(data) {
        let left = Math.max(0, data.left);
        let top = Math.max(0, data.top);
        left = Math.min(left, this.containerWidth - data.width);
        top = Math.min(top, this.containerHeight - data.height);
        return Object.assign(Object.assign({}, data), { left, top });
    }
}
exports.default = PositionNormalizer;
