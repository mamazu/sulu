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
const CheckboxGroup_1 = __importDefault(require("../CheckboxGroup"));
const Checkbox_1 = __importDefault(require("../Checkbox"));
test('The component should render', () => {
    const { container } = (0, react_2.render)(<CheckboxGroup_1.default className="test" onChange={jest.fn()} values={['value-2', 'value-3']}>
            <Checkbox_1.default value="value-1">Value 1</Checkbox_1.default>
            <Checkbox_1.default value="value-2">Value 2</Checkbox_1.default>
            <Checkbox_1.default value="value-3">Value 3</Checkbox_1.default>
        </CheckboxGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should render disabled', () => {
    const { container } = (0, react_2.render)(<CheckboxGroup_1.default disabled={true} onChange={jest.fn()} values={['value-2', 'value-3']}>
            <Checkbox_1.default value="value-1">Value 1</Checkbox_1.default>
            <Checkbox_1.default value="value-2">Value 2</Checkbox_1.default>
            <Checkbox_1.default value="value-3">Value 3</Checkbox_1.default>
        </CheckboxGroup_1.default>);
    expect(container).toMatchSnapshot();
});
test('The component should call onChange handler when checkboxes are clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const changeSpy = jest.fn();
    (0, react_2.render)(<CheckboxGroup_1.default onChange={changeSpy} values={['value-2', 'value-3']}>
            <Checkbox_1.default value="value-1">Value 1</Checkbox_1.default>
            <Checkbox_1.default value="value-2">Value 2</Checkbox_1.default>
            <Checkbox_1.default value="value-3">Value 3</Checkbox_1.default>
        </CheckboxGroup_1.default>);
    expect(changeSpy).not.toBeCalled();
    const checkbox1 = react_2.screen.getByDisplayValue('value-1');
    const checkbox3 = react_2.screen.getByDisplayValue('value-3');
    yield user_event_1.default.click(checkbox1);
    expect(changeSpy).toHaveBeenLastCalledWith(['value-2', 'value-3', 'value-1']);
    yield user_event_1.default.click(checkbox3);
    expect(changeSpy).toHaveBeenLastCalledWith(['value-2']);
}));
