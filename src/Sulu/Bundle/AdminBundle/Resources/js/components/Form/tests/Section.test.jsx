"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Section_1 = __importDefault(require("../Section"));
test('Render section with given colSpan', () => {
    const { container } = (0, react_2.render)(<Section_1.default label="Test">
            <p>Test</p>
        </Section_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render section without label', () => {
    const { container } = (0, react_2.render)(<Section_1.default colSpan={8}>
            <div>Test</div>
        </Section_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render section without label but with divider', () => {
    const { container } = (0, react_2.render)(<Section_1.default>
            <p>Test</p>
        </Section_1.default>);
    expect(container).toMatchSnapshot();
});
