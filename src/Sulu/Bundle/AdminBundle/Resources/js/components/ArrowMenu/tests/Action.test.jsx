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
const Action_1 = __importDefault(require("../Action"));
test('Render default Action', () => {
    const { container } = (0, react_2.render)(<Action_1.default onClick={jest.fn()}>My Action</Action_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render Action with icon', () => {
    const { container } = (0, react_2.render)(<Action_1.default icon="su-display-default" onClick={jest.fn()}>My Action</Action_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render disabled Action', () => {
    const { container } = (0, react_2.render)(<Action_1.default disabled={true} onClick={jest.fn()}>My Action</Action_1.default>);
    expect(container).toMatchSnapshot();
});
test('Clicking the Action should call the right handler', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickHandler = jest.fn();
    (0, react_2.render)(<Action_1.default onClick={clickHandler}>My Action</Action_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('My Action'));
    expect(clickHandler).toBeCalledWith(undefined);
}));
test('Clicking the Action should call the right handler with the passed value', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickHandler = jest.fn();
    (0, react_2.render)(<Action_1.default onClick={clickHandler} value="test">My Action</Action_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('My Action'));
    expect(clickHandler).toBeCalledWith('test');
}));
test('Clicking the disabled Action should not call a handler', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickHandler = jest.fn();
    (0, react_2.render)(<Action_1.default disabled={true} onClick={clickHandler}>My Action</Action_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('My Action'));
    expect(clickHandler).not.toBeCalled();
}));
