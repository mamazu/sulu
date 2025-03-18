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
const Number_1 = __importDefault(require("../Number"));
const bindValueToOnChange_1 = __importDefault(require("../../../utils/TestHelper/bindValueToOnChange"));
test('Number should render', () => {
    const { container } = (0, react_2.render)(<Number_1.default onChange={jest.fn()} value={undefined}/>);
    expect(container).toMatchSnapshot();
});
test('Number should render when disabled', () => {
    const { container } = (0, react_2.render)(<Number_1.default disabled={true} onChange={jest.fn()} value={8}/>);
    expect(container).toMatchSnapshot();
});
test('Number should call onChange with parsed value', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_2.render)((0, bindValueToOnChange_1.default)(<Number_1.default onChange={onChange} value={2}/>));
    const input = react_2.screen.queryByDisplayValue(2);
    yield user_event_1.default.type(input, '1.25');
    expect(onChange).toHaveBeenLastCalledWith(21.25, expect.anything());
}));
test('Number should call onChange with undefined when value isn`t a float', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_2.render)(<Number_1.default onChange={onChange} value={2}/>);
    const input = react_2.screen.queryByDisplayValue(2);
    yield user_event_1.default.type(input, 'text');
    expect(onChange).toHaveBeenLastCalledWith(undefined, expect.anything());
}));
test('Number should call onChange with undefined when value is undefined', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    (0, react_2.render)(<Number_1.default onChange={onChange} value={0.5}/>);
    const input = react_2.screen.queryByDisplayValue(0.5);
    yield user_event_1.default.clear(input);
    expect(onChange).toHaveBeenLastCalledWith(undefined, expect.anything());
}));
