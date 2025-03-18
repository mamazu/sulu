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
const Option_1 = __importDefault(require("../Option"));
jest.mock('../../../utils/DOM/afterElementsRendered');
test('The component should render', () => {
    const { container } = (0, react_1.render)(<Option_1.default value="my-option">My option</Option_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render in selected state', () => {
    const { container } = (0, react_1.render)(<Option_1.default selected={true} value="my-option">My option</Option_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render with checkbox', () => {
    const { container } = (0, react_1.render)(<Option_1.default selectedVisualization="checkbox" value="my-option">My option</Option_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render in disabled state', () => {
    const { container } = (0, react_1.render)(<Option_1.default disabled={true} value="my-option">My option</Option_1.default>);
    expect(container).toMatchSnapshot();
});
test('A click on the component should fire the callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_1.render)(<Option_1.default onClick={clickSpy}>My option</Option_1.default>);
    const button = react_1.screen.queryByText('My option');
    yield user_event_1.default.click(button);
    expect(clickSpy).toBeCalled();
}));
test('A hover on the component should fire the callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const requestFocusSpy = jest.fn();
    (0, react_1.render)(<Option_1.default requestFocus={requestFocusSpy}>My option</Option_1.default>);
    const item = react_1.screen.queryByRole('listitem');
    yield user_event_1.default.hover(item);
    expect(requestFocusSpy).toBeCalled();
}));
