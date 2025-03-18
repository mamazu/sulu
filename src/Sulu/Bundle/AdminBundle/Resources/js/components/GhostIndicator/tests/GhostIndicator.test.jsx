"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const GhostIndicator_1 = __importDefault(require("../GhostIndicator"));
test('Should render with given locale', () => {
    const { container } = (0, react_2.render)(<GhostIndicator_1.default locale="de-at"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with given locale and className', () => {
    const { container } = (0, react_2.render)(<GhostIndicator_1.default className="test" locale="de-at"/>);
    expect(container).toMatchSnapshot();
});
