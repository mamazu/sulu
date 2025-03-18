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
const Button_1 = __importDefault(require("../Button"));
test('Render button', () => {
    const { container } = (0, react_1.render)(<Button_1.default onClick={jest.fn()}>Click</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render success button', () => {
    const { container } = (0, react_1.render)(<Button_1.default onClick={jest.fn()} success={true}>Click</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render primary button', () => {
    const { container } = (0, react_1.render)(<Button_1.default onClick={jest.fn()} primary={true}>Click</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render primary success button', () => {
    const { container } = (0, react_1.render)(<Button_1.default onClick={jest.fn()} primary={true} success={true}>Click</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render loading button', () => {
    const { container } = (0, react_1.render)(<Button_1.default loading={true} onClick={jest.fn()}>Click</Button_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render button with value', () => {
    const { container } = (0, react_1.render)(<Button_1.default label="Click" onClick={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
test('Render button without text', () => {
    const { container } = (0, react_1.render)(<Button_1.default onClick={jest.fn()} showText={false}/>);
    expect(container).toMatchSnapshot();
});
test('Render disabled button', () => {
    const { container } = (0, react_1.render)(<Button_1.default disabled={true} onClick={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
test('Click on button fires onClick callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Button_1.default onClick={clickSpy}/>);
    const button = react_1.screen.queryByRole('button');
    yield user_event_1.default.click(button);
    expect(clickSpy).toBeCalled();
}));
test('Render button with dropdown indicator', () => {
    const { container } = (0, react_1.render)(<Button_1.default hasOptions={true} onClick={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
test('Render button with a different size', () => {
    const { container } = (0, react_1.render)(<Button_1.default onClick={jest.fn()} size="small"/>);
    expect(container).toMatchSnapshot();
});
test('Render button with a prepended icon', () => {
    const { container } = (0, react_1.render)(<Button_1.default icon="fa-trash-o" onClick={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
test('Render an active button', () => {
    const { container } = (0, react_1.render)(<Button_1.default active={true} onClick={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
test('Click on button does not fire onClick callback if button is disabled', () => {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Button_1.default disabled={true} onClick={clickSpy}/>);
    const button = react_1.screen.queryByRole('button');
    return user_event_1.default.click(button).then(() => {
        expect(clickSpy).toHaveBeenCalledTimes(0);
    });
});
