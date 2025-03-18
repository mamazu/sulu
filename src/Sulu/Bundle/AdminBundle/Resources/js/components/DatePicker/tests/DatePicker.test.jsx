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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const DatePicker_1 = __importDefault(require("../DatePicker"));
beforeEach(() => {
    const constantDate = new Date(Date.UTC(2017, 3, 15, 6, 32, 20));
    Date.now = jest.fn().mockReturnValue(constantDate);
    moment_timezone_1.default.tz.setDefault('Europe/Vienna');
});
test('DatePicker should render', () => {
    const onChange = jest.fn();
    const { baseElement } = (0, react_2.render)(<DatePicker_1.default className="date-picker" onChange={onChange} value={undefined}/>);
    expect(baseElement).toMatchSnapshot();
});
test('DatePicker should render date picker with time picker', () => {
    const onChange = jest.fn();
    const options = {
        timeFormat: true,
    };
    const { baseElement } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} options={options} value={null}/>);
    expect(baseElement).toMatchSnapshot();
});
test('DatePicker should render null value as empty string', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('DatePicker should render date format only with month', () => {
    const onChange = jest.fn();
    const options = {
        dateFormat: 'MMMM',
    };
    const { container } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} options={options} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('DatePicker should render date format only with year', () => {
    const onChange = jest.fn();
    const options = {
        dateFormat: 'YYYY',
    };
    const { container } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} options={options} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('DatePicker should render error', () => {
    const onChange = jest.fn();
    const { container } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} valid={false} value={null}/>);
    expect(container).toMatchSnapshot();
});
test('DatePicker should show disabled Input when disabled', () => {
    const onChange = jest.fn();
    const value = new Date('2017-05-23');
    (0, react_2.render)(<DatePicker_1.default disabled={true} onChange={onChange} value={value}/>);
    const input = react_2.screen.queryByDisplayValue('05/23/2017');
    expect(input).toBeDisabled();
});
test('DatePicker should pass input to inputRef prop', () => {
    const inputRefSpy = jest.fn();
    const value = new Date('2017-05-23');
    (0, react_2.render)(<DatePicker_1.default disabled={true} inputRef={inputRefSpy} onChange={jest.fn()} value={value}/>);
    const input = react_2.screen.queryByDisplayValue('05/23/2017');
    expect(inputRefSpy).toBeCalledWith(input);
});
test('DatePicker should open overlay on icon-click', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const { baseElement } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} value={undefined}/>);
    const overlay = baseElement.querySelector('.rdt');
    expect(overlay).toBeInTheDocument();
    expect(overlay).not.toHaveClass('rdtOpen');
    const icon = react_2.screen.queryByLabelText('su-calendar');
    yield user_event_1.default.click(icon);
    expect(overlay).toHaveClass('rdtOpen');
}));
test('DatePicker should not open overlay on icon-click when disabled', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const { baseElement } = (0, react_2.render)(<DatePicker_1.default disabled={true} onChange={onChange} value={undefined}/>);
    const overlay = baseElement.querySelector('.rdt');
    expect(overlay).toBeInTheDocument();
    expect(overlay).not.toHaveClass('rdtOpen');
    const icon = react_2.screen.queryByLabelText('su-calendar');
    yield user_event_1.default.click(icon);
    expect(overlay).not.toHaveClass('rdtOpen');
}));
test('DatePicker should render with placeholder', () => {
    const onChange = jest.fn();
    (0, react_2.render)(<DatePicker_1.default onChange={onChange} placeholder="My placeholder" value={null}/>);
    const input = react_2.screen.queryByPlaceholderText('My placeholder');
    expect(input).toBeInTheDocument();
});
test('DatePicker should render with value', () => {
    const onChange = jest.fn();
    const value = new Date('2017-05-23');
    (0, react_2.render)(<DatePicker_1.default onChange={onChange} value={value}/>);
    const input = react_2.screen.queryByDisplayValue('05/23/2017');
    expect(input).toBeInTheDocument();
});
test('DatePicker should try to guess incomplete value using format on blur.', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const options = {
        dateFormat: false,
        timeFormat: 'HH:mm',
    };
    (0, react_2.render)(<DatePicker_1.default onChange={onChange} options={options} placeholder="My placeholder" value={null}/>);
    const input = react_2.screen.queryByPlaceholderText('My placeholder');
    yield user_event_1.default.type(input, '9');
    yield user_event_1.default.tab(); // tab away from input
    expect(onChange).toBeCalledWith(expect.any(Date));
    const newValue = onChange.mock.calls[0][0];
    const expectedMoment = (0, moment_timezone_1.default)('09:00', options.timeFormat);
    expect(expectedMoment.isValid()).toBe(true);
    const expectedDate = expectedMoment.toDate();
    expect(newValue && newValue.getHours()).toBe(expectedDate.getHours());
    expect(newValue && newValue.getMinutes()).toBe(expectedDate.getMinutes());
}));
test('DatePicker should render error when invalid value is set', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const options = {
        dateFormat: 'YYYY',
    };
    (0, react_2.render)(<DatePicker_1.default onChange={onChange} options={options} placeholder="My placeholder" value={null}/>);
    // check if showError is set correctly
    const input = react_2.screen.queryByPlaceholderText('My placeholder');
    yield user_event_1.default.type(input, 'xxx');
    yield user_event_1.default.tab(); // tab away from input
    expect(input.parentElement).toHaveClass('error');
    // now add a valid value
    yield user_event_1.default.clear(input);
    yield user_event_1.default.type(input, '2018');
    yield user_event_1.default.tab(); // tab away from input
    expect(input.parentElement).not.toHaveClass('error');
}));
test('DatePicker should set class correctly when overlay was opened/closed', () => __awaiter(void 0, void 0, void 0, function* () {
    const onChange = jest.fn();
    const { baseElement } = (0, react_2.render)(<DatePicker_1.default onChange={onChange} placeholder="My placeholder" value={null}/>);
    // overlay should be closed
    const overlay = baseElement.querySelector('.rdt');
    expect(overlay).toBeInTheDocument();
    expect(overlay).not.toHaveClass('rdtOpen');
    // open dialog and check if class is set
    const icon = react_2.screen.queryByLabelText('su-calendar');
    yield user_event_1.default.click(icon);
    expect(overlay).toHaveClass('rdtOpen');
    // choose a date and check if class was removed again
    const dateCell = react_2.screen.queryAllByText('26');
    yield user_event_1.default.click(dateCell[0]);
    expect(overlay).not.toHaveClass('rdtOpen');
    // check if value is in input
    const input = react_2.screen.queryByPlaceholderText('My placeholder');
    expect(input).toHaveValue('03/26/2017');
}));
