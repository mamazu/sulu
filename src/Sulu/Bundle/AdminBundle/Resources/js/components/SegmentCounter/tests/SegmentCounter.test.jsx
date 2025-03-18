"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const SegmentCounter_1 = __importDefault(require("../SegmentCounter"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Should show a positive count if nothing is passed', () => {
    const { container } = (0, react_2.render)(<SegmentCounter_1.default delimiter="," max={20} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Should show a positive count', () => {
    const { container } = (0, react_2.render)(<SegmentCounter_1.default delimiter="," max={5} value="keyword1, keyword2, keyword3"/>);
    expect(container).toMatchSnapshot();
});
test('Should show a negative count', () => {
    const { container } = (0, react_2.render)(<SegmentCounter_1.default delimiter="|" max={2} value="That|is|a|test"/>);
    expect(container).toMatchSnapshot();
});
