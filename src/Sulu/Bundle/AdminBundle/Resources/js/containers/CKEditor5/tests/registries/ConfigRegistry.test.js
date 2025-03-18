"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configRegistry_1 = __importDefault(require("../../registries/configRegistry"));
beforeEach(() => {
    configRegistry_1.default.clear();
});
test('Add and clear Configs', () => {
    const config1 = jest.fn();
    const config2 = jest.fn();
    configRegistry_1.default.add(config1);
    configRegistry_1.default.add(config2);
    expect(configRegistry_1.default.configs).toEqual([config1, config2]);
    configRegistry_1.default.clear();
    expect(configRegistry_1.default.configs).toEqual([]);
});
