"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SizeNormalizer {
    constructor(containerWidth, containerHeight, minWidth = 0, minHeight = 0) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
    }
    normalize(data) {
        let width = Math.max(this.minWidth, data.width);
        let height = Math.max(this.minHeight, data.height);
        width = Math.min(this.containerWidth, width);
        height = Math.min(this.containerHeight, height);
        return Object.assign(Object.assign({}, data), { width, height });
    }
}
exports.default = SizeNormalizer;
