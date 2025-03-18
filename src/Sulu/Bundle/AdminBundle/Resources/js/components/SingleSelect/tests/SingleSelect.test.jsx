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
const SingleSelect_1 = __importDefault(require("../../SingleSelect"));
const Option = SingleSelect_1.default.Option;
const Divider = SingleSelect_1.default.Divider;
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render a generic select', () => {
    const { container } = (0, react_1.render)(<SingleSelect_1.default value={undefined}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render a select with dark skin', () => {
    const { container } = (0, react_1.render)(<SingleSelect_1.default skin="dark" value={undefined}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should show a disabled select that is disabled', () => {
    (0, react_1.render)(<SingleSelect_1.default disabled={true} skin="dark" value={undefined}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    const input = react_1.screen.queryByRole('button');
    expect(input).toBeDisabled();
});
test('The component should return the default displayValue if no valueless option is present', () => {
    (0, react_1.render)(<SingleSelect_1.default value={undefined}>
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.getByText(/sulu_admin.please_choose/)).toBeInTheDocument();
});
test('The component should return the content of the last valueless option as default displayValue', () => {
    (0, react_1.render)(<SingleSelect_1.default value={undefined}>
            <Option value="option-1">Option 1</Option>
            <Option>Option without value 1</Option>
            <Option>Option without value 2</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.getByText(/Option without value 2/)).toBeInTheDocument();
});
test('The component should return undefined as value if a valueless option is selected', () => {
    (0, react_1.render)(<SingleSelect_1.default value={undefined}>
            <Option value="option-1">Option 1</Option>
            <Option>Option without value 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    const input = react_1.screen.queryByRole('button');
    expect(input).toHaveValue('');
});
test('The component should return the correct displayValue', () => {
    (0, react_1.render)(<SingleSelect_1.default value="option-2">
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.getByText(/Option 2/)).toBeInTheDocument();
});
test('The component should return the correct displayValue and do not care if string or number', () => {
    (0, react_1.render)(<SingleSelect_1.default value={2}>
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Divider />
            <Option value="3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.getByText(/Option 2/)).toBeInTheDocument();
});
test('The component should select the correct option', () => {
    (0, react_1.render)(<SingleSelect_1.default value="option-2">
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.queryByText(/Option 1/)).not.toBeInTheDocument();
    expect(react_1.screen.getByText(/Option 2/)).toBeInTheDocument();
    expect(react_1.screen.queryByText(/Option 3/)).not.toBeInTheDocument();
});
test('The component should select the correct option if value is undefined', () => {
    (0, react_1.render)(<SingleSelect_1.default value={undefined}>
            <Option value={undefined}>undefined</Option>
            <Divider />
            <Option value="value">Value</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.getByText(/undefined/)).toBeInTheDocument();
    expect(react_1.screen.queryByText(/Value/)).not.toBeInTheDocument();
});
test('The component should also select the option with the value 0', () => {
    (0, react_1.render)(<SingleSelect_1.default value={0}>
            <Option value={0}>Option 1</Option>
            <Option value={1}>Option 2</Option>
            <Divider />
            <Option value={2}>Option 3</Option>
        </SingleSelect_1.default>);
    expect(react_1.screen.getByText(/Option 1/)).toBeInTheDocument();
    expect(react_1.screen.queryByText(/Option 2/)).not.toBeInTheDocument();
    expect(react_1.screen.queryByText(/Option 3/)).not.toBeInTheDocument();
});
test('The component should trigger the change callback on select', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChangeSpy = jest.fn();
    (0, react_1.render)(<SingleSelect_1.default onChange={onChangeSpy} value="option-2">
            <Option value="option-1">Option 1</Option>
            <Option value="option-2">Option 2</Option>
            <Divider />
            <Option value="option-3">Option 3</Option>
        </SingleSelect_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByLabelText('su-angle-down'));
    yield user_event_1.default.click(react_1.screen.queryByText('Option 3'));
    expect(onChangeSpy).toHaveBeenCalledWith('option-3');
}));
