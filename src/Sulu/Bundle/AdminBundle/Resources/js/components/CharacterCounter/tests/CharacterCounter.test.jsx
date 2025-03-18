"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const CharacterCounter_1 = __importDefault(require("../CharacterCounter"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Should show a positive count if nothing is passed', () => {
    const { container } = (0, react_2.render)(<CharacterCounter_1.default max={20} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Should show a positive count', () => {
    const { container } = (0, react_2.render)(<CharacterCounter_1.default max={20} value="That's a test"/>);
    expect(container).toMatchSnapshot();
});
test('Should show a negative count', () => {
    const { container } = (0, react_2.render)(<CharacterCounter_1.default max={5} value="That's a test"/>);
    expect(container).toMatchSnapshot();
});
test('Should show a positive count with numbers', () => {
    const { container } = (0, react_2.render)(<CharacterCounter_1.default max={5} value={123}/>);
    expect(container).toMatchSnapshot();
});
test('Should show a negative count with numbers', () => {
    const { container } = (0, react_2.render)(<CharacterCounter_1.default max={5} value={123456}/>);
    expect(container).toMatchSnapshot();
});
