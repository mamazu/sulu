"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const Radio_1 = __importDefault(require("../Radio"));
test('The component should render in light skin', () => {
    const { container } = (0, react_1.render)(<Radio_1.default skin="light"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in dark skin', () => {
    const { container } = (0, react_1.render)(<Radio_1.default skin="dark"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in disabled state', () => {
    const { container } = (0, react_1.render)(<Radio_1.default disabled={true}/>);
    expect(container).toMatchSnapshot();
});
test('The component pass the props correctly to the generic checkbox', () => {
    (0, react_1.render)(<Radio_1.default checked={true} disabled={true} name="my-name" value="my-value">
            My label
        </Radio_1.default>);
    const checkbox = react_1.screen.queryByDisplayValue('my-value');
    expect(checkbox.value).toEqual('my-value');
    expect(checkbox).toHaveAttribute('name', 'my-name');
    expect(react_1.screen.getByText('My label')).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
});
test('The component pass the the value to the change callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_1.render)(<Radio_1.default onChange={onChange} value="my-value">My label</Radio_1.default>);
    const checkbox = react_1.screen.queryByDisplayValue('my-value');
    yield user_event_1.default.click(checkbox);
    expect(onChange).toHaveBeenCalledWith('my-value');
}));
