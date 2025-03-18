"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConditionDataProviderRegistry {
    constructor() {
        this.clear();
    }
    clear() {
        this.conditionDataProviders = [];
    }
    add(conditionDataProvider) {
        this.conditionDataProviders.push(conditionDataProvider);
    }
    getAll() {
        return this.conditionDataProviders;
    }
}
exports.default = new ConditionDataProviderRegistry();
