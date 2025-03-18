"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conditionDataProviderRegistry_1 = __importDefault(require("../../registries/conditionDataProviderRegistry"));
beforeEach(() => {
    conditionDataProviderRegistry_1.default.clear();
});
test('Clear all fields from conditionDataProviderRegistry', () => {
    conditionDataProviderRegistry_1.default.add(jest.fn());
    expect(conditionDataProviderRegistry_1.default.conditionDataProviders).toHaveLength(1);
    conditionDataProviderRegistry_1.default.clear();
    expect(conditionDataProviderRegistry_1.default.conditionDataProviders).toHaveLength(0);
});
test('Add field to conditionDataProviderRegistry', () => {
    const conditionDataProvider1 = jest.fn();
    const conditionDataProvider2 = jest.fn();
    conditionDataProviderRegistry_1.default.add(conditionDataProvider1);
    conditionDataProviderRegistry_1.default.add(conditionDataProvider2);
    expect(conditionDataProviderRegistry_1.default.getAll()).toEqual([conditionDataProvider1, conditionDataProvider2]);
});
