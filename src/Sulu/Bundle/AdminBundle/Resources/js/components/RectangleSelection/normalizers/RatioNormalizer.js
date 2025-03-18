"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RatioNormalizer {
    constructor(containerWidth, containerHeight, width, height) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        this.minWidth = width;
        this.minHeight = height;
    }
    normalize(data) {
        let height = data.height;
        let width;
        const calculatedWidth = height * (this.minWidth / this.minHeight);
        if (calculatedWidth > this.containerWidth) {
            width = this.containerWidth;
            height = width * (this.minHeight / this.minWidth);
        }
        else {
            width = calculatedWidth;
        }
        return Object.assign(Object.assign({}, data), { width, height });
    }
}
exports.default = RatioNormalizer;
