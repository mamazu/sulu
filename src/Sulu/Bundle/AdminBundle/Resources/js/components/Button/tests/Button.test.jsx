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
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const Button_1 = __importDefault(require("../Button"));
test('Should render the button with icon', () => {
    const { container } = (0, react_2.render)(<Button_1.default icon="su-plus">Add something</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin primary', () => {
    const { container } = (0, react_2.render)(<Button_1.default skin="primary"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin secondary', () => {
    const { container } = (0, react_2.render)(<Button_1.default skin="secondary"/>);
    expect(container).toMatchSnapshot();
});
test('should render disabled with skin secondary', () => {
    const { container } = (0, react_2.render)(<Button_1.default disabled={true} skin="secondary"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin link', () => {
    const { container } = (0, react_2.render)(<Button_1.default skin="link"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin text', () => {
    const { container } = (0, react_2.render)(<Button_1.default skin="text"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin icon', () => {
    const { container } = (0, react_2.render)(<Button_1.default skin="icon"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin icon and text', () => {
    const { container } = (0, react_2.render)(<Button_1.default skin="icon">Icon Text</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin icon and active', () => {
    const { container } = (0, react_2.render)(<Button_1.default active={true} skin="icon"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin icon and dropdown icon', () => {
    const { container } = (0, react_2.render)(<Button_1.default showDropdownIcon={true} skin="icon"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin primary and dropdown icon', () => {
    const { container } = (0, react_2.render)(<Button_1.default showDropdownIcon={true} skin="primary"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin secondary and dropdown icon', () => {
    const { container } = (0, react_2.render)(<Button_1.default showDropdownIcon={true} skin="secondary"/>);
    expect(container).toMatchSnapshot();
});
test('Should render with skin link and dropdown icon', () => {
    const { container } = (0, react_2.render)(<Button_1.default showDropdownIcon={true} skin="link"/>);
    expect(container).toMatchSnapshot();
});
test('Should call the callback on click', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    (0, react_2.render)(<Button_1.default onClick={onClick} skin="primary"/>);
    const button = react_2.screen.queryByRole('button');
    yield user_event_1.default.click(button);
    expect(onClick).toBeCalled();
}));
test('Should call the buttonRef callback correctly', () => {
    const buttonRefSpy = jest.fn();
    (0, react_2.render)(<Button_1.default buttonRef={buttonRefSpy}/>);
    const button = react_2.screen.queryByRole('button');
    expect(buttonRefSpy).toBeCalledWith(button);
});
