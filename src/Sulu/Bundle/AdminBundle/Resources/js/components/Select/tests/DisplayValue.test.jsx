"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const DisplayValue_1 = __importDefault(require("../DisplayValue"));
test('The component should render a CroppedText if value of children prop is a string', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default onClick={jest.fn()}>My value</DisplayValue_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should directly render given children if value of children prop contains another component', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default onClick={jest.fn()}>Some <b>bold</b> text</DisplayValue_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render with the flat skin', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default onClick={jest.fn()} skin="flat">My value</DisplayValue_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render with the dark skin', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default onClick={jest.fn()} skin="dark">My value</DisplayValue_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render with an icon', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default icon="su-plus" onClick={jest.fn()}>My value</DisplayValue_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render when disabled', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default disabled={true} onClick={jest.fn()}>My value</DisplayValue_1.default>);
    expect(container).toMatchSnapshot();
});
test('A click on the component should fire the callback and prevent the default', () => {
    const clickSpy = jest.fn();
    (0, react_1.render)(<DisplayValue_1.default onClick={clickSpy}>My value</DisplayValue_1.default>);
    const display = react_1.screen.queryByRole('button');
    const event = react_1.createEvent.click(display);
    // eslint-disable-next-line testing-library/prefer-user-event
    (0, react_1.fireEvent)(display, event);
    expect(clickSpy).toBeCalled();
    expect(event.defaultPrevented).toBe(true);
});
test('A click on the component should not fire the callback when disabled', () => {
    const clickSpy = jest.fn();
    (0, react_1.render)(<DisplayValue_1.default disabled={true} onClick={clickSpy}>My value</DisplayValue_1.default>);
    const display = react_1.screen.queryByRole('button');
    return user_event_1.default.click(display).then(() => {
        expect(clickSpy).not.toBeCalled();
    });
});
test('The component should use the CroppedText component to cut long texts', () => {
    const { container } = (0, react_1.render)(<DisplayValue_1.default onClick={jest.fn()}>This value should be wrapped in a CroppedText component</DisplayValue_1.default>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.croppedText')).toBeInTheDocument();
});
