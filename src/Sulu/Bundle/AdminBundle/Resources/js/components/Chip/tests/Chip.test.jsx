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
const Chip_1 = __importDefault(require("../Chip"));
test('Should render chip with children', () => {
    const { container } = (0, react_2.render)(<Chip_1.default value={{}}>Name</Chip_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render medium, primary chip with children', () => {
    const { container } = (0, react_2.render)(<Chip_1.default size="medium" skin="primary" value={{}}>Name</Chip_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render chip with delete icon', () => {
    const { container } = (0, react_2.render)(<Chip_1.default onDelete={jest.fn()} value={{}}>Name</Chip_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render chip without delete icon in disabled state', () => {
    const { container } = (0, react_2.render)(<Chip_1.default disabled={true} onDelete={jest.fn()} value={{}}>Name</Chip_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render chip as clickable', () => {
    const { container } = (0, react_2.render)(<Chip_1.default onClick={jest.fn()} value={{}}>Name</Chip_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should call onClick callback when the button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const value = { name: 'Test' };
    (0, react_2.render)(<Chip_1.default onClick={clickSpy} onDelete={jest.fn()} value={value}>Test</Chip_1.default>);
    yield user_event_1.default.click(react_2.screen.queryByText('Test'));
    expect(clickSpy).toBeCalledWith(value);
}));
test('Should call onDelete callback when the times icon is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSpy = jest.fn();
    const value = { name: 'Test' };
    (0, react_2.render)(<Chip_1.default onDelete={deleteSpy} value={value}>Test</Chip_1.default>);
    yield user_event_1.default.click(react_2.screen.queryByLabelText('su-times'));
    expect(deleteSpy).toBeCalledWith(value);
}));
