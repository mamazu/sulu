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
const Action_1 = __importDefault(require("../Action"));
test('The component should render', () => {
    const onClick = jest.fn();
    const afterAction = jest.fn();
    const { container } = (0, react_1.render)(<Action_1.default afterAction={afterAction} onClick={onClick} value="my-option">My action</Action_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should call the callbacks after a click', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    const afterAction = jest.fn();
    (0, react_1.render)(<Action_1.default afterAction={afterAction} onClick={onClick} value="my-option">My action</Action_1.default>);
    const button = react_1.screen.queryByText('My action');
    yield user_event_1.default.click(button);
    expect(onClick).toBeCalled();
    expect(afterAction).toBeCalled();
}));
test('The component should call the onClick callbacks without a value', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    (0, react_1.render)(<Action_1.default onClick={onClick}>My action</Action_1.default>);
    const button = react_1.screen.queryByText('My action');
    yield user_event_1.default.click(button);
    expect(onClick).toBeCalledWith(undefined);
}));
test('The component should call the onClick callbacks with its value', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    (0, react_1.render)(<Action_1.default onClick={onClick} value="my-value">My action</Action_1.default>);
    const button = react_1.screen.queryByText('My action');
    yield user_event_1.default.click(button);
    expect(onClick).toBeCalledWith('my-value');
}));
test('A hover on the component should fire the callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    const requestFocusSpy = jest.fn();
    (0, react_1.render)(<Action_1.default onClick={onClick} requestFocus={requestFocusSpy} value="my-value">My action</Action_1.default>);
    const item = react_1.screen.queryByRole('listitem');
    yield user_event_1.default.hover(item);
    expect(requestFocusSpy).toBeCalled();
}));
