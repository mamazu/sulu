"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const ButtonGroup_1 = __importDefault(require("../ButtonGroup"));
const Button_1 = __importDefault(require("../../Button"));
const DropdownButton_1 = __importDefault(require("../../DropdownButton"));
const Icon_1 = __importDefault(require("../../Icon"));
test('Should render one button', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_2.render)(<ButtonGroup_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
        </ButtonGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render two buttons', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_2.render)(<ButtonGroup_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-align-justify"/></Button_1.default>
        </ButtonGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render a button and a dropdown button', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_2.render)(<ButtonGroup_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
            <DropdownButton_1.default>
                <DropdownButton_1.default.Item onClick={jest.fn()}>Test</DropdownButton_1.default.Item>
            </DropdownButton_1.default>
        </ButtonGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render more than two buttons', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_2.render)(<ButtonGroup_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-align-justify"/></Button_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-align-justify"/></Button_1.default>
        </ButtonGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render a button with a custom className', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_2.render)(<ButtonGroup_1.default>
            <Button_1.default className="test" onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
        </ButtonGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('Should render one button with a custom className and another one without', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_2.render)(<ButtonGroup_1.default>
            <Button_1.default className="test" onClick={handleClick}><Icon_1.default name="su-th-large"/></Button_1.default>
            <Button_1.default onClick={handleClick}><Icon_1.default name="su-align-justify"/></Button_1.default>
        </ButtonGroup_1.default>);
    expect(container).toMatchSnapshot();
});
