"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const Toggler_1 = __importDefault(require("../Toggler"));
test('The component should render in the default state', () => {
    const { container } = (0, react_1.render)(<Toggler_1.default checked={true} name="my-name" onChange={jest.fn()} value="my-value">
            Label
        </Toggler_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render in disabled state', () => {
    const { container } = (0, react_1.render)(<Toggler_1.default checked={true} disabled={true} name="my-name" onChange={jest.fn()} value="my-value">
            Label
        </Toggler_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component pass the props correctly to the generic checkbox', () => {
    const onChange = jest.fn();
    (0, react_1.render)(<Toggler_1.default checked={true} disabled={true} name="my-name" onChange={onChange} value="my-value">
            My label
        </Toggler_1.default>);
    const togglerInput = react_1.screen.queryByDisplayValue('my-value');
    expect(togglerInput.value).toBe('my-value');
    expect(togglerInput.name).toBe('my-name');
    expect(togglerInput).toBeChecked();
    expect(togglerInput).toBeDisabled();
    expect(react_1.screen.getByText('My label')).toBeInTheDocument();
});
