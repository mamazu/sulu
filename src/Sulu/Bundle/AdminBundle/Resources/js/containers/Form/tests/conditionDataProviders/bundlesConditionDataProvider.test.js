"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bundlesConditionDataProvider_1 = __importDefault(require("../../conditionDataProviders/bundlesConditionDataProvider"));
jest.mock('../../../../services/initializer', () => ({
    bundles: ['sulu_admin', 'sulu_audience_targeting'],
}));
test('Return all bundles from initializer', () => {
    expect((0, bundlesConditionDataProvider_1.default)()).toEqual({ __bundles: ['sulu_admin', 'sulu_audience_targeting'] });
});
