"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PositionNormalizer_1 = __importDefault(require("../../normalizers/PositionNormalizer"));
test('The PositionNormalizer should correctly constrain the selection upwards', () => {
    const position = new PositionNormalizer_1.default(200, 300);
    const selection = position.normalize({ radius: 100, left: -100, top: -50 });
    expect(selection).toEqual({ radius: 100, left: 0, top: 0 });
});
test('The PositionNormalizer should correctly constrain the selection downwards', () => {
    const position = new PositionNormalizer_1.default(200, 300);
    const selection = position.normalize({ radius: 100, left: 300, top: 400 });
    expect(selection).toEqual({ radius: 100, left: 200, top: 300 });
});
test('The PositionNormalizer should not alter already normalized selections', () => {
    const position = new PositionNormalizer_1.default(200, 300);
    const selection = position.normalize({ radius: 100, left: 20, top: 30 });
    expect(selection).toEqual({ radius: 100, left: 20, top: 30 });
});
