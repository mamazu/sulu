"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const linkTypeRegistry_1 = __importDefault(require("../../registries/linkTypeRegistry"));
beforeEach(() => {
    linkTypeRegistry_1.default.clear();
});
test('Clear all information from linkTypeRegistry', () => {
    const Component = () => (<div />);
    linkTypeRegistry_1.default.add('test1', Component, 'Test1');
    expect(Object.keys(linkTypeRegistry_1.default.titles)).toHaveLength(1);
    expect(Object.keys(linkTypeRegistry_1.default.overlays)).toHaveLength(1);
    expect(Object.keys(linkTypeRegistry_1.default.options)).toHaveLength(1);
    linkTypeRegistry_1.default.clear();
    expect(Object.keys(linkTypeRegistry_1.default.titles)).toHaveLength(0);
    expect(Object.keys(linkTypeRegistry_1.default.overlays)).toHaveLength(0);
    expect(Object.keys(linkTypeRegistry_1.default.options)).toHaveLength(0);
});
test('Add internal link type to LinkTypeRegistry', () => {
    const Component = () => (<div />);
    const options = {
        displayProperties: ['title'],
        emptyText: 'empty',
        icon: 'icon',
        listAdapter: 'listAdapter',
        overlayTitle: 'overlayTitle',
        resourceKey: 'resourceKey',
    };
    linkTypeRegistry_1.default.add('test1', Component, 'Test1', options);
    linkTypeRegistry_1.default.add('test2', Component, 'Test2');
    expect(linkTypeRegistry_1.default.getTitle('test1')).toBe('Test1');
    expect(linkTypeRegistry_1.default.getOverlay('test1')).toBe(Component);
    expect(linkTypeRegistry_1.default.getOptions('test1')).toBe(options);
    expect(linkTypeRegistry_1.default.getTitle('test2')).toBe('Test2');
    expect(linkTypeRegistry_1.default.getOverlay('test2')).toBe(Component);
    expect(linkTypeRegistry_1.default.getOptions('test2')).toBe(undefined);
});
test('Add internal link type with existing key should throw', () => {
    const Component = () => (<div />);
    linkTypeRegistry_1.default.add('test1', Component, 'Test1');
    expect(() => linkTypeRegistry_1.default.add('test1', Component, 'test1 react component')).toThrow(/test1/);
});
test('Get internal link title of not existing key', () => {
    expect(() => linkTypeRegistry_1.default.getTitle('XXX')).toThrow();
});
test('Get internal link overlay of not existing key', () => {
    expect(() => linkTypeRegistry_1.default.getOverlay('XXX')).toThrow();
});
test('Get internal link options of not existing key', () => {
    expect(() => linkTypeRegistry_1.default.getOptions('XXX')).toThrow();
});
