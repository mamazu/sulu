"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const CircularProgressbar_1 = __importDefault(require("../CircularProgressbar"));
test('Render a CircularProgressbar', () => {
    const { container } = (0, react_1.render)(<CircularProgressbar_1.default percentage={60}/>);
    expect(container).toMatchSnapshot();
});
test('Render a CircularProgressbar without the progress info in the center', () => {
    const { container } = (0, react_1.render)(<CircularProgressbar_1.default hidePercentageText={true} percentage={60}/>);
    expect(container).toMatchSnapshot();
});
test('Render a CircularProgressbar in a different size', () => {
    const { container } = (0, react_1.render)(<CircularProgressbar_1.default percentage={60} size={200}/>);
    expect(container).toMatchSnapshot();
});
