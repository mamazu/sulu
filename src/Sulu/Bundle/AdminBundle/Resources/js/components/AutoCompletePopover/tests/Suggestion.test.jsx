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
const Suggestion_1 = __importDefault(require("../Suggestion"));
test('Suggestion should render', () => {
    const { container } = (0, react_2.render)(<Suggestion_1.default icon="fa-ticket" onSelect={jest.fn()} value={{ name: 'suggestion-1' }}>
            Suggestion 1
        </Suggestion_1.default>);
    expect(container).toMatchSnapshot();
});
test('Suggestion should render strong-tags around found chars', () => {
    const { container } = (0, react_2.render)(<Suggestion_1.default icon="fa-ticket" onSelect={jest.fn()} query="sug" value={{ name: 'suggestion-1' }}>
            Suggestion 2
        </Suggestion_1.default>);
    expect(container).toMatchSnapshot();
});
test('Suggestion should render if given query is not a valid regular expression', () => {
    const { container } = (0, react_2.render)(<Suggestion_1.default icon="fa-ticket" onSelect={jest.fn()} query="*+" value={{ name: 'suggestion-1' }}>
            Suggestion 2
        </Suggestion_1.default>);
    expect(container).toMatchSnapshot();
});
test('Clicking on a suggestion should call the onClick handler', () => __awaiter(void 0, void 0, void 0, function* () {
    const selectSpy = jest.fn();
    (0, react_2.render)(<Suggestion_1.default icon="fa-ticket" onSelect={selectSpy} query="sug" value={{ name: 'suggestion-1' }}>
            {() => (<div>Suggestion 3</div>)}
        </Suggestion_1.default>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText('Suggestion 3'));
    expect(selectSpy).toHaveBeenCalledTimes(1);
}));
test('Should highlight the part of the suggestion text which matches the query prop', () => {
    const { container } = (0, react_2.render)(<Suggestion_1.default icon="fa-ticket" onSelect={jest.fn()} query="sug" value={{ name: 'suggestion-1' }}>
            {(highlight) => (<div>{highlight('Suggestion 3')}</div>)}
        </Suggestion_1.default>);
    expect(container).toMatchSnapshot();
});
