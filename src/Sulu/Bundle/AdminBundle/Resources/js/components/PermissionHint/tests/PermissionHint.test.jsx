"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const PermissionHint_1 = __importDefault(require("../PermissionHint"));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render PermissionHint', () => {
    const { container } = (0, react_2.render)(<PermissionHint_1.default />);
    expect(container).toMatchSnapshot();
});
