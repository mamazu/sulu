"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Tooltip_1 = __importDefault(require("../Tooltip"));
const Icon_1 = __importDefault(require("../../Icon"));
test('The component should render in unfocused state', () => {
    const component = (0, enzyme_1.render)(<Tooltip_1.default label="Copy">
            <button aria-label="Copy" type="button">
                <Icon_1.default name="su-copy"/>
            </button>
        </Tooltip_1.default>);
    expect(component.find('Popover span').length).toBe(0);
    expect(component).toMatchSnapshot();
});
test('The component should render in focused state', () => {
    const component = (0, enzyme_1.mount)(<Tooltip_1.default label="Copy">
            <button aria-label="Copy" type="button">
                <Icon_1.default name="su-copy"/>
            </button>
        </Tooltip_1.default>);
    component.find('button').simulate('focus');
    expect(component.find('Popover span').text()).toBe('Copy');
    expect(component).toMatchSnapshot();
});
test('The component should render in hovered state', () => {
    const component = (0, enzyme_1.mount)(<Tooltip_1.default label="Copy">
            <button aria-label="Copy" type="button">
                <Icon_1.default name="su-copy"/>
            </button>
        </Tooltip_1.default>);
    component.find('Tooltip').simulate('mouseenter');
    expect(component.find('Popover span').text()).toBe('Copy');
    expect(component).toMatchSnapshot();
    component.find('Tooltip').simulate('mouseleave');
    expect(component.find('Popover span').length).toBe(0);
});
