"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const react_2 = __importDefault(require("react"));
const Item_1 = __importDefault(require("../Item"));
test('The component should render', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_1.render)(<Item_1.default icon="su-search" onClick={handleClick} title="Test" value="test_1"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render active', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_1.render)(<Item_1.default active={true} icon="su-search" onClick={handleClick} title="Test" value="test_1"/>);
    expect(container).toMatchSnapshot();
});
test('The component should render with children', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_1.render)(<Item_1.default icon="su-cog" title="Settings" value="settings">
            <Item_1.default onClick={handleClick} title="Settings 1" value="settings_1"/>
            <Item_1.default onClick={handleClick} title="Settings 2" value="settings_2"/>
        </Item_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render with children an active child and expanded', () => {
    const handleClick = jest.fn();
    const { container } = (0, react_1.render)(<Item_1.default expanded={true} icon="su-cog" title="Settings" value="settings">
            <Item_1.default onClick={handleClick} title="Settings 1" value="settings_1"/>
            <Item_1.default active={true} onClick={handleClick} title="Settings 2" value="settings_2"/>
        </Item_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should handle clicks correctly', () => __awaiter(void 0, void 0, void 0, function* () {
    const handleItemClick = jest.fn();
    const handleSubItemClick = jest.fn();
    (0, react_1.render)(<Item_1.default expanded={true} icon="su-cog" onClick={handleItemClick} title="Settings" value="settings">
            <Item_1.default onClick={handleSubItemClick} title="Settings 1" value="settings_1"/>
            <Item_1.default active={true} onClick={handleSubItemClick} title="Settings 2" value="settings_2"/>
        </Item_1.default>);
    yield user_event_1.default.click(react_1.screen.queryByText('Settings'));
    expect(handleItemClick).toBeCalledWith('settings');
    yield user_event_1.default.click(react_1.screen.queryByText(/Settings 2/));
    expect(handleSubItemClick).toBeCalledWith('settings_2');
}));
