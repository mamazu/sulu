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
const Toggler_1 = __importDefault(require("../Toggler"));
test('Render disabled toggler', () => {
    const { container } = (0, react_2.render)(<Toggler_1.default disabled={true} label="Disabled Toggler" onClick={jest.fn()} value={false}/>);
    expect(container).toMatchSnapshot();
});
test('Render loading toggler', () => {
    const { container } = (0, react_2.render)(<Toggler_1.default label="Disabled Toggler" loading={true} onClick={jest.fn()} value={false}/>);
    expect(container).toMatchSnapshot();
});
test('Render toggler with skin', () => {
    const { container } = (0, react_2.render)(<Toggler_1.default label="Dark Toggler" onClick={jest.fn()} skin="dark" value={false}/>);
    expect(container).toMatchSnapshot();
});
test('Render with active toggler', () => {
    const { container } = (0, react_2.render)(<Toggler_1.default label="Active Toggler" onClick={jest.fn()} value={true}/>);
    expect(container).toMatchSnapshot();
});
test('Call onClick handler when item was clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_2.render)(<Toggler_1.default label="Click Toggler" onClick={clickSpy} value={false}/>);
    yield user_event_1.default.click(react_2.screen.queryByRole('button'));
    expect(clickSpy).toBeCalled();
}));
test('Call onClick handler when toggler was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    (0, react_2.render)(<Toggler_1.default label="Click Toggler" onClick={clickSpy} value={false}/>);
    yield user_event_1.default.click(react_2.screen.queryByRole('checkbox'));
    expect(clickSpy).toBeCalled();
}));
