"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Column_1 = __importDefault(require("../Column"));
test('Should render column with toolbar', () => {
    expect((0, enzyme_1.render)(<Column_1.default index={0}/>)).toMatchSnapshot();
});
