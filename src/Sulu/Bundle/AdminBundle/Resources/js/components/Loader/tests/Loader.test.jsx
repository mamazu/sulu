"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const Loader_1 = __importDefault(require("../Loader"));
test('Render loader', () => {
    const { container } = (0, react_2.render)(<Loader_1.default />);
    expect(container).toMatchSnapshot();
});
test('Render loader with additional classname', () => {
    const { container } = (0, react_2.render)(<Loader_1.default className="test"/>);
    expect(container).toMatchSnapshot();
});
test('Render loader with other dimensions', () => {
    const { container } = (0, react_2.render)(<Loader_1.default size={50}/>);
    expect(container).toMatchSnapshot();
});
