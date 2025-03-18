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
const debounce_1 = __importDefault(require("debounce"));
const PasswordConfirmation_1 = __importDefault(require("../PasswordConfirmation"));
jest.mock('debounce', () => jest.fn((value) => value));
test('Should render two password fields and add a debounced function', () => {
    const { container } = (0, react_2.render)(<PasswordConfirmation_1.default disabled={true} onChange={jest.fn()}/>);
    expect(container).toMatchSnapshot();
    expect(debounce_1.default).toBeCalledWith(expect.any(Function), 500);
});
test('Should render disabled input-components when disabled', () => {
    const { container } = (0, react_2.render)(<PasswordConfirmation_1.default onChange={jest.fn()}/>);
    expect(container).toMatchSnapshot();
    expect(debounce_1.default).toBeCalledWith(expect.any(Function), 500);
});
test('Should only call onChange when both values match after the debounced time', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<PasswordConfirmation_1.default onChange={changeSpy}/>);
    const inputs = react_2.screen.queryAllByDisplayValue('');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(inputs[0], 'asdf');
    yield user_event_1.default.type(inputs[1], 'jklö');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.clear(inputs[1]);
    yield user_event_1.default.type(inputs[1], 'asdf');
    expect(changeSpy).toBeCalledWith('asdf');
}));
test('Should mark the input fields as invalid if they do not match', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<PasswordConfirmation_1.default onChange={changeSpy}/>);
    const inputs = react_2.screen.queryAllByDisplayValue('');
    expect(changeSpy).not.toBeCalled();
    yield user_event_1.default.type(inputs[0], 'asdf');
    yield user_event_1.default.type(inputs[1], 'jklö');
    yield user_event_1.default.tab(); // tab away from input
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.error')).toBeInTheDocument();
    yield user_event_1.default.clear(inputs[1]);
    yield user_event_1.default.type(inputs[1], 'asdf');
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.error')).not.toBeInTheDocument();
}));
test('Should mark the input fields as invalid if the valid prop is false', () => {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<PasswordConfirmation_1.default onChange={changeSpy} valid={false}/>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.error')).toBeInTheDocument();
});
