"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const QRCode_1 = __importDefault(require("../QRCode"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('QRCode should render', () => {
    const onChange = jest.fn();
    expect((0, enzyme_1.render)(<QRCode_1.default disabled={false} onBlur={jest.fn()} onChange={onChange} valid={false} value="My value"/>)).toMatchSnapshot();
});
