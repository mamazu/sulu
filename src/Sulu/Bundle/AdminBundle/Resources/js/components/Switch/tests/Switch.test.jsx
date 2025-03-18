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
const Switch_1 = __importDefault(require("../Switch"));
test('The component should render in unchecked state', () => {
    const { container } = (0, react_1.render)(<Switch_1.default checked={false}/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in checked state', () => {
    const { container } = (0, react_1.render)(<Switch_1.default checked={true}/>);
    expect(container).toMatchSnapshot();
});
test('The component should render with class', () => {
    const { container } = (0, react_1.render)(<Switch_1.default checked={false} className="my-class"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render in disabled state', () => {
    const { container } = (0, react_1.render)(<Switch_1.default disabled={true}/>);
    expect(container).toMatchSnapshot();
});
test('The component should render with name', () => {
    const { container } = (0, react_1.render)(<Switch_1.default checked={false} name="my-name"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render without a label container', () => {
    const { container } = (0, react_1.render)(<Switch_1.default checked={false} name="my-name"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render with radio type', () => {
    const { container } = (0, react_1.render)(<Switch_1.default checked={false} className="my-class" type="radio"/>);
    expect(container).toMatchSnapshot();
});
test('A click on the checkbox should trigger the change callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChangeSpy = jest.fn();
    const { rerender } = (0, react_1.render)(<Switch_1.default checked={false} onChange={onChangeSpy}/>);
    yield user_event_1.default.click(react_1.screen.queryByRole('checkbox'));
    expect(onChangeSpy).toBeCalledWith(true, undefined);
    rerender(<Switch_1.default checked={true} onChange={onChangeSpy}/>);
    yield user_event_1.default.click(react_1.screen.queryByRole('checkbox'));
    expect(onChangeSpy).toBeCalledWith(false, undefined);
}));
test('A click on the checkbox should trigger the change callback with the value', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChangeSpy = jest.fn();
    const { rerender } = (0, react_1.render)(<Switch_1.default checked={false} onChange={onChangeSpy} value="my-value"/>);
    yield user_event_1.default.click(react_1.screen.queryByRole('checkbox'));
    expect(onChangeSpy).toHaveBeenCalledWith(true, 'my-value');
    rerender(<Switch_1.default checked={true} onChange={onChangeSpy} value="my-value"/>);
    yield user_event_1.default.click(react_1.screen.queryByRole('checkbox'));
    expect(onChangeSpy).toHaveBeenCalledWith(false, 'my-value');
}));
