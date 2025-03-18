"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const ProgressBar_1 = __importDefault(require("../ProgressBar"));
test('The component should render', () => {
    const { container } = (0, react_1.render)(<ProgressBar_1.default max={10} value={7}/>);
    expect(container).toMatchSnapshot();
});
test('The component should render with progress skin as default', () => {
    (0, react_1.render)(<ProgressBar_1.default max={10} value={5}/>);
    const progress = react_1.screen.queryByRole('progressbar');
    expect(progress).toHaveAttribute('max', '10');
    expect(progress).toHaveValue(5);
    expect(progress).toHaveClass('progress');
    expect(progress).toHaveTextContent('50%');
});
test('The component should render with success skin', () => {
    (0, react_1.render)(<ProgressBar_1.default max={10} skin="success" value={10}/>);
    const progress = react_1.screen.queryByRole('progressbar');
    expect(progress).toHaveAttribute('max', '10');
    expect(progress).toHaveValue(10);
    expect(progress).toHaveClass('success');
    expect(progress).toHaveTextContent('100%');
});
test('The component should render with warning skin', () => {
    (0, react_1.render)(<ProgressBar_1.default max={10} skin="warning" value={0}/>);
    const progress = react_1.screen.queryByRole('progressbar');
    expect(progress).toHaveAttribute('max', '10');
    expect(progress).toHaveValue(0);
    expect(progress).toHaveClass('warning');
    expect(progress).toHaveTextContent('0%');
});
test('The component should render with error skin', () => {
    (0, react_1.render)(<ProgressBar_1.default max={10} skin="error" value={3}/>);
    const progress = react_1.screen.queryByRole('progressbar');
    expect(progress).toHaveAttribute('max', '10');
    expect(progress).toHaveValue(3);
    expect(progress).toHaveClass('error');
    expect(progress).toHaveTextContent('30%');
});
test('The component should render with max 0', () => {
    (0, react_1.render)(<ProgressBar_1.default max={0} skin="error" value={0}/>);
    const progress = react_1.screen.queryByRole('progressbar');
    expect(progress).toHaveAttribute('max', '1');
    expect(progress).toHaveValue(0);
    expect(progress).toHaveClass('error');
    expect(progress).toHaveTextContent('0%');
});
