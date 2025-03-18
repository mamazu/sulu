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
const Card_1 = __importDefault(require("../Card"));
test('Render a card with its children', () => {
    const { container } = (0, react_2.render)(<Card_1.default><h1>Content!</h1></Card_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a card with its children, edit and remove icon', () => {
    const { container } = (0, react_2.render)(<Card_1.default onEdit={jest.fn()} onRemove={jest.fn()}>Content</Card_1.default>);
    expect(container).toMatchSnapshot();
});
test('Call onEdit callback when edit icon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const editSpy = jest.fn();
    (0, react_2.render)(<Card_1.default id={6} onEdit={editSpy}>Content</Card_1.default>);
    const icon = react_2.screen.queryByLabelText('su-pen');
    yield user_event_1.default.click(icon);
    expect(editSpy).toBeCalledWith(6);
}));
test('Call onRemove callback when remove icon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const removeSpy = jest.fn();
    (0, react_2.render)(<Card_1.default id={2} onRemove={removeSpy}>Content</Card_1.default>);
    const icon = react_2.screen.queryByLabelText('su-trash-alt');
    yield user_event_1.default.click(icon);
    expect(removeSpy).toBeCalledWith(2);
}));
