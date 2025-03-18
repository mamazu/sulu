"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const Menu_js_1 = __importDefault(require("../Menu.js"));
test('The component should render a menu list', () => {
    const { container } = (0, react_1.render)(<Menu_js_1.default>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </Menu_js_1.default>);
    expect(container).toMatchSnapshot();
});
