"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const Sticky_js_1 = __importDefault(require("../Sticky.js"));
test('The component should render', () => {
    const component = (0, enzyme_1.render)(<Sticky_js_1.default>{(isSticky) => <span>{isSticky ? 'Stick' : 'Unsticky'}</span>}</Sticky_js_1.default>);
    expect(component).toMatchSnapshot();
});
