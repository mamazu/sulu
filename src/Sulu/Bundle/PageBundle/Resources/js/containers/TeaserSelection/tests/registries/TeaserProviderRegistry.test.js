"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teaserProviderRegistry_1 = __importDefault(require("../../registries/teaserProviderRegistry"));
const defaultTeaserProviderOptions = {
    displayProperties: [],
    listAdapter: '',
    overlayTitle: '',
    resourceKey: '',
    resultToView: null,
    title: '',
    view: null,
};
beforeEach(() => {
    teaserProviderRegistry_1.default.clear();
});
test('Clear all teaserProviders', () => {
    const teaserProviderOptions = Object.assign({}, defaultTeaserProviderOptions);
    teaserProviderRegistry_1.default.add('test1', teaserProviderOptions);
    expect(Object.keys(teaserProviderRegistry_1.default.teaserProviders)).toHaveLength(1);
    teaserProviderRegistry_1.default.clear();
    expect(Object.keys(teaserProviderRegistry_1.default.teaserProviders)).toHaveLength(0);
});
test('Add teaserProvider', () => {
    const teaserProviderOptions1 = Object.assign({}, defaultTeaserProviderOptions);
    const teaserProviderOptions2 = Object.assign({}, defaultTeaserProviderOptions);
    teaserProviderRegistry_1.default.add('test1', teaserProviderOptions1);
    teaserProviderRegistry_1.default.add('test2', teaserProviderOptions2);
    expect(teaserProviderRegistry_1.default.get('test1')).toBe(teaserProviderOptions1);
    expect(teaserProviderRegistry_1.default.get('test2')).toBe(teaserProviderOptions2);
});
test('Add teaserProvider with existing key should throw', () => {
    const teaserProviderOptions = Object.assign({}, defaultTeaserProviderOptions);
    teaserProviderRegistry_1.default.add('test1', teaserProviderOptions);
    expect(() => teaserProviderRegistry_1.default.add('test1', teaserProviderOptions)).toThrow(/test1/);
});
test('Get teaserProvider with existing key', () => {
    const teaserProviderOptions = Object.assign({}, defaultTeaserProviderOptions);
    teaserProviderRegistry_1.default.add('test1', teaserProviderOptions);
    expect(teaserProviderRegistry_1.default.get('test1')).toBe(teaserProviderOptions);
});
test('Get teaserProvider of not existing key', () => {
    expect(() => teaserProviderRegistry_1.default.get('XXX')).toThrow();
});
test('Get existing keys in registry', () => {
    const teaserProviderOptions1 = Object.assign({}, defaultTeaserProviderOptions);
    const teaserProviderOptions2 = Object.assign({}, defaultTeaserProviderOptions);
    teaserProviderRegistry_1.default.add('test1', teaserProviderOptions1);
    teaserProviderRegistry_1.default.add('test2', teaserProviderOptions2);
    expect(teaserProviderRegistry_1.default.keys).toEqual(['test1', 'test2']);
});
