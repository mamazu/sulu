"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SizeNormalizer_1 = __importDefault(require("../../normalizers/SizeNormalizer"));
test('The SizeNormalizer should correctly constrain the selection downwards', () => {
    const size = new SizeNormalizer_1.default(1000, 500, 200, undefined);
    const selection = size.normalize({ radius: 250, left: 0, top: 0 });
    expect(selection).toEqual({ radius: 200, left: 0, top: 0 });
});
test('The SizeNormalizer should correctly constrain the selection upwards', () => {
    const size = new SizeNormalizer_1.default(1000, 500, undefined, 200);
    const selection = size.normalize({ radius: 50, left: 0, top: 0 });
    expect(selection).toEqual({ radius: 200, left: 0, top: 0 });
});
test('The SizeNormalizer should not alter correct selections', () => {
    const size = new SizeNormalizer_1.default(1000, 500, 200, 100);
    const selection = size.normalize({ radius: 150, left: 0, top: 0 });
    expect(selection).toEqual({ radius: 150, left: 0, top: 0 });
});
