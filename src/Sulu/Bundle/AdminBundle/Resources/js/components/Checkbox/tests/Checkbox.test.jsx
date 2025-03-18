"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const Checkbox_1 = __importDefault(require("../Checkbox"));
test('The component should render in light skin', () => {
    const { container } = (0, react_1.render)(<Checkbox_1.default skin="light"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in dark skin', () => {
    const { container } = (0, react_1.render)(<Checkbox_1.default skin="dark"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in disabled state', () => {
    const { container } = (0, react_1.render)(<Checkbox_1.default disabled={true}/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in size small', () => {
    const { container } = (0, react_1.render)(<Checkbox_1.default size="small"/>);
    expect(container).toMatchSnapshot();
});
test('The component passes the props correctly to the generic checkbox', () => {
    const onChange = jest.fn();
    (0, react_1.render)(<Checkbox_1.default checked={true} disabled={true} name="my-name" onChange={onChange} value="my-value">
            My label
        </Checkbox_1.default>);
    const input = react_1.screen.getByDisplayValue('my-value');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(input.name).toEqual('my-name');
    expect(input).toBeChecked();
    expect(react_1.screen.getByText('My label')).toBeInTheDocument();
});
