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
const Backdrop_1 = __importDefault(require("../Backdrop"));
test('The component should render', () => {
    const { container } = (0, react_1.render)(<Backdrop_1.default />);
    expect(container).toMatchSnapshot();
});
test('The component should call a function when clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClickSpy = jest.fn();
    (0, react_1.render)(<Backdrop_1.default onClick={onClickSpy}/>);
    const backdrop = react_1.screen.queryByTestId('backdrop');
    expect(onClickSpy).toHaveBeenCalledTimes(0);
    yield user_event_1.default.click(backdrop);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
}));
