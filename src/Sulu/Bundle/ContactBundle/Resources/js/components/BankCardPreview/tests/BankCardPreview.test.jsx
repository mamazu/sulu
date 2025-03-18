"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const BankCardPreview_1 = __importDefault(require("../BankCardPreview"));
test('Render BankCardPreview without bank name', () => {
    expect((0, enzyme_1.render)(<BankCardPreview_1.default bankName={undefined} bic="GIBAATWGXXX" iban="AT483200000012345864"/>)).toMatchSnapshot();
});
test('Render BankCardPreview with bank name', () => {
    expect((0, enzyme_1.render)(<BankCardPreview_1.default bankName="Testbank" bic="GIBAATWGXXX" iban="AT483200000012345864"/>)).toMatchSnapshot();
});
