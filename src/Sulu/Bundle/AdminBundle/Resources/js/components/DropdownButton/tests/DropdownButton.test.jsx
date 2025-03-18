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
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const DropdownButton_1 = __importDefault(require("../DropdownButton"));
test('Render dropdown button', () => {
    const { container } = (0, react_2.render)(<DropdownButton_1.default icon="su-plus" label="Add">
            <DropdownButton_1.default.Item onClick={jest.fn()}>Option 1</DropdownButton_1.default.Item>
        </DropdownButton_1.default>);
    expect(container).toMatchSnapshot();
});
test('Clicking dropdown items should call the corresponding callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const option1ClickSpy = jest.fn();
    const option2ClickSpy = jest.fn();
    (0, react_2.render)(<DropdownButton_1.default icon="su-plus" label="Add">
            <DropdownButton_1.default.Item onClick={option1ClickSpy}>Option 1</DropdownButton_1.default.Item>
            <DropdownButton_1.default.Item onClick={option2ClickSpy}>Option 2</DropdownButton_1.default.Item>
        </DropdownButton_1.default>);
    const dropdownButton = react_2.screen.queryByText('Add');
    yield user_event_1.default.click(dropdownButton);
    const option1 = react_2.screen.queryByText('Option 1');
    yield user_event_1.default.click(option1);
    expect(option1ClickSpy).toBeCalled();
    expect(option2ClickSpy).not.toBeCalled();
    option1ClickSpy.mockReset();
    option2ClickSpy.mockReset();
    yield user_event_1.default.click(dropdownButton);
    const option2 = react_2.screen.queryByText('Option 2');
    yield user_event_1.default.click(option2);
    expect(option1ClickSpy).not.toBeCalled();
    expect(option2ClickSpy).toBeCalled();
}));
