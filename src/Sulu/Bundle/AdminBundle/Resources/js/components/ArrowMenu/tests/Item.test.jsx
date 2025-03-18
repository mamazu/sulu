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
const Item_1 = __importDefault(require("../Item"));
test('Render default Item', () => {
    const { container } = (0, react_2.render)(<Item_1.default value="test">Test Item</Item_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render active Item', () => {
    const { container } = (0, react_2.render)(<Item_1.default active={true} icon="fa-home" value="house">My House</Item_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render disabled Item', () => {
    const { container } = (0, react_2.render)(<Item_1.default active={true} disabled={true} icon="fa-home" value="house">My Item</Item_1.default>);
    expect(container).toMatchSnapshot();
});
test('Clicking the left and right button inside the header should call the right handler', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickHandler = jest.fn();
    (0, react_2.render)(<Item_1.default active={true} icon="fa-home" onClick={clickHandler} value="house">My House</Item_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('My House'));
    expect(clickHandler).toBeCalledWith('house');
}));
test('Clicking the disabled Item should not call a handler', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickHandler = jest.fn();
    (0, react_2.render)(<Item_1.default active={false} disabled={true} icon="fa-home" onClick={clickHandler} value="house">My House</Item_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('My House'));
    expect(clickHandler).not.toBeCalled();
}));
