"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const sidebarRegistry_1 = __importDefault(require("../../registries/sidebarRegistry"));
class Component extends react_1.default.Component {
    render() {
        return <h1>{this.props.title}</h1>;
    }
}
beforeEach(() => {
    sidebarRegistry_1.default.clear();
});
test('Find out if the sidebar-view-registry has a named view', () => {
    expect(sidebarRegistry_1.default.has('test')).toEqual(false);
    sidebarRegistry_1.default.add('test', Component);
    expect(sidebarRegistry_1.default.has('test')).toEqual(true);
});
test('Get named view from sidebar-view-registry', () => {
    sidebarRegistry_1.default.add('test', Component);
    expect(sidebarRegistry_1.default.get('test')).toEqual(Component);
});
test('Add named view with existing key should throw an error', () => {
    sidebarRegistry_1.default.add('test', Component);
    expect(() => sidebarRegistry_1.default.add('test', () => <h1>Test</h1>)).toThrow(/test/);
});
test('Get not existing named view', () => {
    expect(() => sidebarRegistry_1.default.get('test')).toThrow(/test/);
});
test('Disable view', () => {
    sidebarRegistry_1.default.add('test', Component);
    expect(sidebarRegistry_1.default.isDisabled('test')).toBe(false);
    sidebarRegistry_1.default.disable('test');
    expect(sidebarRegistry_1.default.isDisabled('test')).toBe(true);
});
