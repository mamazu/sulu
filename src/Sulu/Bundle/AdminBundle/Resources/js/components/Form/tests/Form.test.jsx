"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Form_1 = __importDefault(require("../Form"));
test('Render a form', () => {
    const { container } = (0, react_2.render)(<Form_1.default skin="dark">
            <Form_1.default.Field label="Test1">Test 1</Form_1.default.Field>
            <Form_1.default.Field label="Test1">Test 2</Form_1.default.Field>
        </Form_1.default>);
    expect(container).toMatchSnapshot();
});
