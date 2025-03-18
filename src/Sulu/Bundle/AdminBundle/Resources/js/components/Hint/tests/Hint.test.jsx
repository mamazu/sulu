"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Hint_1 = __importDefault(require("../Hint"));
test('Render PermissionHint', () => {
    const { container } = (0, react_2.render)(<Hint_1.default icon="su-lock" title="Hint Text"/>);
    expect(container).toMatchSnapshot();
});
