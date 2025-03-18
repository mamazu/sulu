"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const MimeTypeIndicator_1 = __importDefault(require("../MimeTypeIndicator"));
test('Should render a MimeTypeIndicator', () => {
    expect((0, enzyme_1.render)(<MimeTypeIndicator_1.default mimeType="application/vnd.ms-excel"/>)).toMatchSnapshot();
});
test('Should render a MimeTypeIndicator with different dimensions', () => {
    expect((0, enzyme_1.render)(<MimeTypeIndicator_1.default height={200} iconSize={32} mimeType="application/vnd.ms-excel" width={200}/>)).toMatchSnapshot();
});
