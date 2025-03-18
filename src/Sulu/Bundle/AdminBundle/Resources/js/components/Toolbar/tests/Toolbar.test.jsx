"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const Button_1 = __importDefault(require("../Button"));
const Controls_1 = __importDefault(require("../Controls"));
const Toolbar_1 = __importDefault(require("../Toolbar"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render controls', () => {
    const { container } = (0, react_1.render)(<Toolbar_1.default>
            <Controls_1.default>
                <Button_1.default onClick={jest.fn()}>Test</Button_1.default>
            </Controls_1.default>
            <Controls_1.default>
                <Button_1.default onClick={jest.fn()}>Test</Button_1.default>
            </Controls_1.default>
        </Toolbar_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render dark theme', () => {
    const { container } = (0, react_1.render)(<Toolbar_1.default skin="dark">
            <Controls_1.default>
                <Button_1.default onClick={jest.fn()}>Test</Button_1.default>
            </Controls_1.default>
            <Controls_1.default>
                <Button_1.default onClick={jest.fn()}>Test</Button_1.default>
            </Controls_1.default>
        </Toolbar_1.default>);
    expect(container).toMatchSnapshot();
});
