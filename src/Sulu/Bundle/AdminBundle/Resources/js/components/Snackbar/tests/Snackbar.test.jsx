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
const Snackbar_1 = __importDefault(require("../Snackbar"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render an error snackbar', () => {
    const { container } = (0, react_2.render)(<Snackbar_1.default message="Something went wrong" onCloseClick={jest.fn()} type="error"/>);
    expect(container).toMatchSnapshot();
});
test('Render an updated error snackbar', () => {
    const { container, rerender } = (0, react_2.render)(<Snackbar_1.default message="Something went wrong" onCloseClick={jest.fn()} type="error"/>);
    rerender(<Snackbar_1.default message="Something went wrong again" onCloseClick={jest.fn()} type="error"/>);
    expect(container).toMatchSnapshot();
});
test('Render a warning snackbar', () => {
    const { container } = (0, react_2.render)(<Snackbar_1.default message="Something unimportant went wrong" onCloseClick={jest.fn()} type="warning"/>);
    expect(container).toMatchSnapshot();
});
test('Render a info snackbar', () => {
    const { container } = (0, react_2.render)(<Snackbar_1.default message="Something unimportant went wrong" onCloseClick={jest.fn()} type="info"/>);
    expect(container).toMatchSnapshot();
});
test('Render a success snackbar', () => {
    const { container } = (0, react_2.render)(<Snackbar_1.default message="Something unimportant went wrong" onCloseClick={jest.fn()} type="success"/>);
    expect(container).toMatchSnapshot();
});
test('Render a floating snackbar', () => {
    const { container } = (0, react_2.render)(<Snackbar_1.default icon="su-copy" message="3 blocks copied to clipboard" onCloseClick={jest.fn()} skin="floating" type="info"/>);
    expect(container).toMatchSnapshot();
});
test('Render an error snackbar without close button', () => {
    const { container } = (0, react_2.render)(<Snackbar_1.default message="Something went wrong" type="error"/>);
    expect(container).toMatchSnapshot();
});
test('Click the snackbar should call the onClick callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_2.render)(<Snackbar_1.default message="Something went wrong" onClick={clickSpy} type="error"/>);
    const snackbar = react_2.screen.queryByText('- Something went wrong');
    yield user_event_1.default.click(snackbar);
    expect(clickSpy).toBeCalled();
}));
test('Call onCloseClick callback when close button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const closeClickSpy = jest.fn();
    (0, react_2.render)(<Snackbar_1.default message="Something went wrong" onCloseClick={closeClickSpy} type="error"/>);
    const icon = react_2.screen.queryByLabelText('su-times');
    yield user_event_1.default.click(icon);
    expect(closeClickSpy).toBeCalledWith();
}));
