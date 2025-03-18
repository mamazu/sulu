"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractLoadingStrategy {
    setStructureStrategy(structureStrategy) {
        this.structureStrategy = structureStrategy;
    }
    // eslint-disable-next-line no-unused-vars
    load(resourceKey, options) {
        throw new Error('Not implemented');
    }
}
exports.default = AbstractLoadingStrategy;
