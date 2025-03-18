"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SizeNormalizer {
    constructor(containerWidth, containerHeight, maxRadius = undefined, minRadius = undefined) {
        this.maxRadius = this.getComputedMaxRadius(maxRadius, containerWidth, containerHeight);
        this.minRadius = this.getComputedMinRadius(minRadius, this.maxRadius);
    }
    getComputedMaxRadius(maxRadius, containerWidth, containerHeight) {
        const containerDiagonal = Math.sqrt(containerWidth ** 2 + containerHeight ** 2);
        if (maxRadius === undefined) {
            return containerDiagonal;
        }
        else {
            return Math.min(maxRadius, containerDiagonal);
        }
    }
    getComputedMinRadius(minRadius, computedMaxRadius) {
        if (minRadius === undefined) {
            return 0;
        }
        return Math.min(minRadius, computedMaxRadius);
    }
    normalize(data) {
        let { radius = 0 } = data;
        radius = Math.min(this.maxRadius, radius);
        radius = Math.max(this.minRadius, radius);
        return Object.assign(Object.assign({}, data), { radius });
    }
}
exports.default = SizeNormalizer;
