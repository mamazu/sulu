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
const loglevel_1 = __importDefault(require("loglevel"));
const Url_1 = __importDefault(require("../Url"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
test('Render the component as disabled', () => {
    const { container } = (0, react_2.render)(<Url_1.default disabled={true} onChange={jest.fn()} protocols={['http://', 'https://']} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Render the component with an error', () => {
    const { container } = (0, react_2.render)(<Url_1.default defaultProtocol="http://" onChange={jest.fn()} protocols={['http://', 'https://']} valid={false} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Set the correct values for protocol and path when initializing', () => {
    (0, react_2.render)(<Url_1.default onChange={jest.fn()} value="http://www.sulu.io"/>);
    const protocol = react_2.screen.queryByTitle('http://').lastChild;
    const input = react_2.screen.queryByRole('textbox');
    expect(input).toHaveValue('www.sulu.io');
    expect(protocol).toHaveTextContent('http://');
});
test('Set the correct values for protocol and path when updating', () => {
    (0, react_2.render)(<Url_1.default onChange={jest.fn()} value="https://www.sulu.io"/>);
    const protocol = react_2.screen.queryByTitle('https://').lastChild;
    const input = react_2.screen.queryByRole('textbox');
    expect(input).toHaveValue('www.sulu.io');
    expect(protocol).toHaveTextContent('https://');
});
test('Should log a warning if a not available protocol has been given', () => {
    (0, react_2.render)(<Url_1.default onChange={jest.fn()} protocols={['http://']} value="https://www.sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    expect(input).toHaveValue('https://www.sulu.io');
    expect(loglevel_1.default.warn).toBeCalled();
});
test('Show error when invalid email was passed via updated prop', () => {
    const { container, rerender } = (0, react_2.render)(<Url_1.default onChange={jest.fn()} value={undefined}/>);
    expect(container.children[0]).not.toHaveClass('error');
    rerender(<Url_1.default onChange={jest.fn()} value="mailto:invalid-email"/>);
    expect(container.children[0]).toHaveClass('error');
});
test('Should not reset value of protocol select when undefined value is passed', () => {
    const { rerender } = (0, react_2.render)(<Url_1.default onChange={jest.fn()} value="https://"/>);
    expect(react_2.screen.queryByTitle('https://').lastChild).toHaveTextContent('https://');
    expect(react_2.screen.queryByRole('textbox')).toHaveValue('');
    rerender(<Url_1.default onChange={jest.fn()} value={undefined}/>);
    expect(react_2.screen.queryByTitle('https://').lastChild).toHaveTextContent('https://');
    expect(react_2.screen.queryByRole('textbox')).toHaveValue('');
});
test('Remove error when valid email was passed via updated prop', () => {
    const { container, rerender } = (0, react_2.render)(<Url_1.default onChange={jest.fn()} value="mailto:invalid-email"/>);
    expect(container.children[0]).toHaveClass('error');
    rerender(<Url_1.default onChange={jest.fn()} value="mailto:hello@sulu.io"/>);
    expect(container.children[0]).not.toHaveClass('error');
});
test('Remove error when valid email was changed using the text field', () => __awaiter(void 0, void 0, void 0, function* () {
    const { container, rerender } = (0, react_2.render)(<Url_1.default onChange={jest.fn()} value="mailto:invalid-email"/>);
    expect(container.children[0]).toHaveClass('error');
    rerender(<Url_1.default onChange={jest.fn()} value="hello@sulu.io"/>);
    expect(container.children[0]).not.toHaveClass('error');
}));
test('Call onChange callback with the first protocol if none was selected', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="sulu.a"/>);
    const input = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.type(input, 't');
    expect(changeSpy).toBeCalledWith('http://sulu.at');
}));
test('Call onChange callback when protocol was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="https://www.sulu.io"/>);
    yield user_event_1.default.click(react_2.screen.queryByLabelText('su-angle-down'));
    yield user_event_1.default.click(react_2.screen.queryByText('http://'));
    expect(changeSpy).toBeCalledWith('http://www.sulu.io');
}));
test('Call onChange callback when path was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="https://www.sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.type(input, 'x');
    expect(changeSpy).toBeCalledWith('https://www.sulu.iox');
}));
test('Call onChange callback when path was changed but not blurred', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="https://www.sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.type(input, 'x');
    expect(changeSpy).toBeCalledWith('https://www.sulu.iox');
}));
test('Call onChange callback when path was changed to invalid url but not blurred', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="https://www.sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.type(input, '[Backspace]');
    expect(changeSpy).toBeCalledWith('https://www.sulu.i');
}));
test('Call onChange callback if url is not valid but leave the current value', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<Url_1.default onChange={changeSpy} value="https://www.sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('https://').lastChild;
    yield user_event_1.default.type(input, '.');
    expect(changeSpy).toBeCalledWith('https://www.sulu.io.');
    expect(protocol).toHaveTextContent('https://');
    expect(input).toHaveValue('www.sulu.io.');
    expect(container.children[0]).not.toHaveClass('error');
}));
test('Call onChange callback with undefined if email is not valid but leave the current value', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<Url_1.default onChange={changeSpy} value="mailto:hello@sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('mailto:').lastChild;
    yield user_event_1.default.type(input, '@');
    expect(changeSpy).toBeCalledWith(undefined);
    expect(protocol).toHaveTextContent('mailto:');
    expect(input).toHaveValue('hello@sulu.io@');
    yield user_event_1.default.tab();
    expect(container.children[0]).toHaveClass('error');
}));
test('Call onChange callback with correct mail address', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<Url_1.default onChange={changeSpy} protocols={['mailto:']} value="test@example."/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('mailto:').lastChild;
    yield user_event_1.default.type(input, 'a');
    expect(changeSpy).toBeCalledWith('mailto:test@example.a');
    expect(protocol).toHaveTextContent('mailto:');
    expect(input).toHaveValue('test@example.a');
    yield user_event_1.default.tab();
    expect(container.children[0]).not.toHaveClass('error');
}));
test('Call onChange callback with correct value with custom protocol', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<Url_1.default onChange={changeSpy} protocols={['custom-protocol:']} value={undefined}/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('custom-protocol:').lastChild;
    yield user_event_1.default.type(input, 'X');
    expect(changeSpy).toBeCalledWith('custom-protocol:X');
    expect(protocol).toHaveTextContent('custom-protocol:');
    expect(input).toHaveValue('X');
    expect(container.children[0]).not.toHaveClass('error');
}));
test('Call onChange callback with undefined if incorrect mail address is entered', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const { container } = (0, react_2.render)(<Url_1.default onChange={changeSpy} protocols={['mailto:']} value={undefined}/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('mailto:').lastChild;
    yield user_event_1.default.type(input, 'X');
    expect(protocol).toHaveTextContent('mailto');
    expect(input).toHaveValue('X');
    expect(changeSpy).toBeCalledWith(undefined);
    yield user_event_1.default.tab();
    expect(container.children[0]).toHaveClass('error');
}));
test('Should remove the protocol from path and set it on the protocol select', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="http://www.sulu.a"/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('http://').lastChild;
    yield user_event_1.default.type(input, 't');
    expect(protocol).toHaveTextContent('http://');
    expect(input).toHaveValue('www.sulu.at');
}));
test('Should remove the protocol from path and set it on the protocol select if protocol is already selected', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} value="http://www.sulu.a"/>);
    const input = react_2.screen.queryByRole('textbox');
    const protocol = react_2.screen.queryByTitle('http://').lastChild;
    yield user_event_1.default.type(input, 't');
    expect(protocol).toHaveTextContent('http://');
    expect(input).toHaveValue('www.sulu.at');
}));
test('Call onBlur callback when protocol was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const blurSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onBlur={blurSpy} onChange={jest.fn()} value="https://www.sulu.io"/>);
    yield user_event_1.default.click(react_2.screen.queryByLabelText('su-angle-down'));
    yield user_event_1.default.click(react_2.screen.queryByText('http://'));
    expect(blurSpy).toBeCalledWith();
}));
test('Call onBlur callback when path was changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const blurSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onBlur={blurSpy} onChange={jest.fn()} value="https://www.sulu.io"/>);
    const input = react_2.screen.queryByRole('textbox');
    yield user_event_1.default.click(input);
    expect(blurSpy).not.toBeCalledWith();
    yield user_event_1.default.tab();
    expect(blurSpy).toBeCalledWith();
}));
test('Should call onProtocolChange with default protocol', () => {
    const protocolChangeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default defaultProtocol="http://" onChange={jest.fn()} onProtocolChange={protocolChangeSpy} value={undefined}/>);
    expect(protocolChangeSpy).toBeCalledWith('http://');
});
test('Should call onProtocolChange with initial value', () => {
    const protocolChangeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={jest.fn()} onProtocolChange={protocolChangeSpy} value="http://www.google.at"/>);
    expect(protocolChangeSpy).toBeCalledWith('http://');
});
test('Should call onProtocolChange when protocol is changed', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    const protocolChangeSpy = jest.fn();
    (0, react_2.render)(<Url_1.default onChange={changeSpy} onProtocolChange={protocolChangeSpy} value={undefined}/>);
    yield user_event_1.default.click(react_2.screen.queryByLabelText('su-angle-down'));
    yield user_event_1.default.click(react_2.screen.queryByText('https://'));
    expect(protocolChangeSpy).toHaveBeenLastCalledWith('https://');
}));
