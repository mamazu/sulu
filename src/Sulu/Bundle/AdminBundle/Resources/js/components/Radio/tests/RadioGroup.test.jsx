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
const RadioGroup_1 = __importDefault(require("../RadioGroup"));
const Radio_1 = __importDefault(require("../Radio"));
test('The component should render', () => {
    const { container } = (0, react_1.render)(<RadioGroup_1.default className="my-group" value="1">
            <Radio_1.default value="1"/>
            <Radio_1.default value="2"/>
            <Radio_1.default value="3"/>
        </RadioGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should check the correct radio', () => {
    (0, react_1.render)(<RadioGroup_1.default value="1">
            <Radio_1.default value="1"/>
            <Radio_1.default value="2"/>
            <Radio_1.default value="3"/>
        </RadioGroup_1.default>);
    const radioGroup = [
        react_1.screen.queryByDisplayValue('1'),
        react_1.screen.queryByDisplayValue('2'),
        react_1.screen.queryByDisplayValue('3'),
    ];
    expect(radioGroup[0]).toBeChecked();
    expect(radioGroup[1]).not.toBeChecked();
    expect(radioGroup[2]).not.toBeChecked();
});
test('The component should pass the disabled state to the radios', () => {
    (0, react_1.render)(<RadioGroup_1.default disabled={true} value="1">
            <Radio_1.default value="1"/>
            <Radio_1.default value="2"/>
            <Radio_1.default value="3"/>
        </RadioGroup_1.default>);
    const radioGroup = [
        react_1.screen.queryByDisplayValue('1'),
        react_1.screen.queryByDisplayValue('2'),
        react_1.screen.queryByDisplayValue('3'),
    ];
    expect(radioGroup[0]).toBeDisabled();
    expect(radioGroup[1]).toBeDisabled();
    expect(radioGroup[2]).toBeDisabled();
});
test('The component should pass the change callback to the radios', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_1.render)(<RadioGroup_1.default onChange={onChange} value="0">
            <Radio_1.default value="1"/>
            <Radio_1.default value="2"/>
            <Radio_1.default value="3"/>
        </RadioGroup_1.default>);
    const radioGroup = [
        react_1.screen.queryByDisplayValue('1'),
        react_1.screen.queryByDisplayValue('2'),
        react_1.screen.queryByDisplayValue('3'),
    ];
    yield user_event_1.default.click(radioGroup[0]);
    yield user_event_1.default.click(radioGroup[1]);
    yield user_event_1.default.click(radioGroup[2]);
    expect(onChange).toHaveBeenCalledTimes(3);
}));
