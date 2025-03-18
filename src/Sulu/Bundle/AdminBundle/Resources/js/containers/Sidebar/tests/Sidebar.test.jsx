"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Sidebar_1 = __importDefault(require("../Sidebar"));
const sidebarStore_1 = __importDefault(require("../stores/sidebarStore"));
const sidebarRegistry_1 = __importDefault(require("../registries/sidebarRegistry"));
const component = (props) => (<h1>{props.title}</h1>);
jest.mock('../stores/sidebarStore', () => ({}));
jest.mock('../registries/sidebarRegistry', () => ({
    get: jest.fn(),
    isDisabled: jest.fn(),
}));
test('Render correct sidebar view', () => {
    sidebarStore_1.default.view = 'preview';
    sidebarRegistry_1.default.get.mockReturnValue(component);
    sidebarRegistry_1.default.isDisabled.mockReturnValue(false);
    expect((0, enzyme_1.render)(<Sidebar_1.default />)).toMatchSnapshot();
});
test('Render correct sidebar view with props', () => {
    sidebarStore_1.default.view = 'preview';
    sidebarStore_1.default.props = { title: 'Hello world' };
    sidebarRegistry_1.default.get.mockReturnValue(component);
    sidebarRegistry_1.default.isDisabled.mockReturnValue(false);
    const view = (0, enzyme_1.render)(<Sidebar_1.default />);
    expect(view).toMatchSnapshot();
});
test('Return null if view is not set', () => {
    sidebarStore_1.default.view = null;
    sidebarStore_1.default.props = {};
    const view = (0, enzyme_1.render)(<Sidebar_1.default />);
    expect(view).toMatchSnapshot();
});
test('Return null if view is disabled', () => {
    sidebarStore_1.default.view = 'default';
    sidebarStore_1.default.props = {};
    sidebarRegistry_1.default.isDisabled.mockReturnValue(true);
    expect((0, enzyme_1.render)(<Sidebar_1.default />)).toMatchSnapshot();
});
