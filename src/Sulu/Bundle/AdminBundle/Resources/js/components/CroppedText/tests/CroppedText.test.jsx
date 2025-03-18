"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const CroppedText_1 = __importDefault(require("../CroppedText"));
test('CroppedText should render', () => {
    const { container } = (0, react_2.render)(<CroppedText_1.default>This is a text which will get cropped.</CroppedText_1.default>);
    expect(container).toMatchSnapshot();
});
