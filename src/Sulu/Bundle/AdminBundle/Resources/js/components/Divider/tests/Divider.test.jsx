"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const Divider_1 = __importDefault(require("../Divider"));
test('Render an empty Divider', () => {
    const { container } = (0, react_1.render)(<Divider_1.default />);
    expect(container).toMatchSnapshot();
});
test('Render a Divider with text', () => {
    const { container } = (0, react_1.render)(<Divider_1.default>Test</Divider_1.default>);
    expect(container).toMatchSnapshot();
});
