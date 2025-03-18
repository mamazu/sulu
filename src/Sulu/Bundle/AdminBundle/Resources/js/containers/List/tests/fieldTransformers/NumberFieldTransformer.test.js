"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
const NumberFieldTransformer_1 = __importDefault(require("../../fieldTransformers/NumberFieldTransformer"));
const numberFieldTransformer = new NumberFieldTransformer_1.default();
jest.mock('loglevel', () => ({
    error: jest.fn(),
}));
const mockUserStoreUser = jest.fn().mockReturnValue({
    locale: jest.fn(),
});
jest.mock('../../../../stores/userStore', () => {
    return new (class {
        get user() {
            return mockUserStoreUser();
        }
    });
});
test('Test undefined', () => {
    expect(numberFieldTransformer.transform(undefined)).toBe(null);
    expect(numberFieldTransformer.transform(null)).toBe(null);
});
test('Test invalid format', () => {
    expect(numberFieldTransformer.transform('xxx')).toBe(null);
    expect(loglevel_1.default.error).toBeCalledWith('Invalid number given: "xxx"');
});
test('Test valid example', () => {
    expect(numberFieldTransformer.transform(20.3)).toBe('20.3');
});
