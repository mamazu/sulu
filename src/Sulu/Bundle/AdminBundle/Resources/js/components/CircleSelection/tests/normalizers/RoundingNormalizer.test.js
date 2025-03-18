"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoundingNormalizer_1 = __importDefault(require("../../normalizers/RoundingNormalizer"));
test('The RoundingNormalizer should round correctly', () => {
    const size = new RoundingNormalizer_1.default();
    const selection = size.normalize({ radius: 1.33, left: 5.879, top: 7.1234 });
    expect(selection).toEqual({ radius: 1, left: 6, top: 7 });
});
test('The RoundingNormalizer should not alter already rounded selections', () => {
    const size = new RoundingNormalizer_1.default();
    const selection = size.normalize({ radius: 1, left: 6, top: 7 });
    expect(selection).toEqual({ radius: 1, left: 6, top: 7 });
});
