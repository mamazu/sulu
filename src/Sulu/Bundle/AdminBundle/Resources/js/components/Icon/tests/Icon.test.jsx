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
const Icon_1 = __importDefault(require("../Icon"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
test('Icon should render', () => {
    const { container } = (0, react_2.render)(<Icon_1.default name="su-save"/>);
    expect(container).toMatchSnapshot();
});
test('Icon should not render with invalid icon', () => {
    const { container } = (0, react_2.render)(<Icon_1.default name="xxx"/>);
    expect(container).toMatchSnapshot();
    expect(loglevel_1.default.warn).toHaveBeenCalled();
});
test('Icon should not render with empty string', () => {
    const { container } = (0, react_2.render)(<Icon_1.default name=""/>);
    expect(container).toMatchSnapshot();
    expect(loglevel_1.default.warn).toHaveBeenCalled();
});
test('Icon should render with class names', () => {
    const { container } = (0, react_2.render)(<Icon_1.default className="test" name="su-pen"/>);
    expect(container).toMatchSnapshot();
});
test('Icon should render with onClick handler, role and tabindex', () => {
    const onClickSpy = jest.fn();
    const { container } = (0, react_2.render)(<Icon_1.default className="test" name="su-save" onClick={onClickSpy}/>);
    expect(container).toMatchSnapshot();
});
test('Icon should call the callback on click', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    (0, react_2.render)(<Icon_1.default className="test" name="su-pen" onClick={onClick}/>);
    const icon = react_2.screen.queryByLabelText('su-pen');
    yield user_event_1.default.click(icon);
    expect(onClick).toBeCalled();
}));
test('Icon should call the callback on when space is pressed', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    (0, react_2.render)(<Icon_1.default className="test" name="su-pen" onClick={onClick}/>);
    const icon = react_2.screen.queryByLabelText('su-pen');
    yield user_event_1.default.type(icon, '[Space]');
    expect(onClick).toBeCalled();
}));
test('Icon should call the callback on when enter is pressed', () => __awaiter(void 0, void 0, void 0, function* () {
    const onClick = jest.fn();
    (0, react_2.render)(<Icon_1.default className="test" name="su-pen" onClick={onClick}/>);
    const icon = react_2.screen.queryByLabelText('su-pen');
    yield user_event_1.default.type(icon, '[Enter]');
    expect(onClick).toBeCalled();
}));
test('Should call the given iconRef callback', () => {
    const iconRefSpy = jest.fn();
    (0, react_2.render)(<Icon_1.default className="test" iconRef={iconRefSpy} name="su-pen"/>);
    const icon = react_2.screen.queryByLabelText('su-pen');
    expect(iconRefSpy).toBeCalledWith(icon);
});
