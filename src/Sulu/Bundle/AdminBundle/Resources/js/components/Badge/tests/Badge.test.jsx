"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Badge_1 = __importDefault(require("../Badge"));
test('Render a badge', () => {
    const { container } = (0, react_2.render)(<Badge_1.default>Hello world</Badge_1.default>);
    expect(container).toMatchSnapshot();
});
