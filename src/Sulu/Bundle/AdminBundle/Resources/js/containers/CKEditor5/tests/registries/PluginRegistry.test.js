"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pluginRegistry_1 = __importDefault(require("../../registries/pluginRegistry"));
beforeEach(() => {
    pluginRegistry_1.default.clear();
});
test('Add and clear Plugins', () => {
    const plugin1 = class {
    };
    const plugin2 = class {
    };
    pluginRegistry_1.default.add(plugin1);
    pluginRegistry_1.default.add(plugin2);
    expect(pluginRegistry_1.default.plugins).toEqual([plugin1, plugin2]);
    pluginRegistry_1.default.clear();
    expect(pluginRegistry_1.default.plugins).toEqual([]);
});
