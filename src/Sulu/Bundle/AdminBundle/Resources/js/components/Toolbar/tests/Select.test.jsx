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
const Select_1 = __importDefault(require("../Select"));
const selectPropsMock = {
    label: 'Choose an option',
    onChange: () => { },
    options: [
        {
            value: 1,
            label: 'An option',
        },
    ],
    value: undefined,
};
test('Render select', () => {
    const { container } = (0, react_1.render)(<Select_1.default {...selectPropsMock}/>);
    expect(container).toMatchSnapshot();
});
test('Render loading select', () => {
    const { container } = (0, react_1.render)(<Select_1.default {...selectPropsMock} loading={true}/>);
    expect(container).toMatchSnapshot();
});
test('Render disabled select', () => {
    const { container } = (0, react_1.render)(<Select_1.default {...selectPropsMock} disabled={true}/>);
    expect(container).toMatchSnapshot();
});
test('Render select with a prepended icon', () => {
    const { container } = (0, react_1.render)(<Select_1.default {...selectPropsMock} icon="fa-floppy-o"/>);
    expect(container).toMatchSnapshot();
});
test('Render select without text', () => {
    const { container } = (0, react_1.render)(<Select_1.default {...selectPropsMock} showText={false}/>);
    expect(container).toMatchSnapshot();
});
test('Render select with a different size', () => {
    const { container } = (0, react_1.render)(<Select_1.default {...selectPropsMock} size="small"/>);
    expect(container).toMatchSnapshot();
});
test('Open select on click', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_1.render)(<Select_1.default {...selectPropsMock}/>);
    const button = react_1.screen.queryByText('Choose an option');
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
    yield user_event_1.default.click(button);
    expect(react_1.screen.getByText('An option')).toBeInTheDocument();
}));
test('Disabled select will not open', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_1.render)(<Select_1.default {...selectPropsMock} disabled={true}/>);
    const button = react_1.screen.queryByText('Choose an option');
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
    yield user_event_1.default.click(button);
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
}));
test('Click on disabled option will not fire onChange', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const propsMock = {
        label: 'Click to open',
        onChange: clickSpy,
        options: [
            {
                value: 1,
                label: 'An option',
                disabled: true,
            },
        ],
        value: undefined,
    };
    (0, react_1.render)(<Select_1.default {...propsMock}/>);
    yield user_event_1.default.click(react_1.screen.queryByText('Click to open'));
    yield user_event_1.default.click(react_1.screen.queryByText('An option'));
    expect(clickSpy).toHaveBeenCalledTimes(0);
}));
test('Click on option fires onChange with the selected value as the first argument', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const propsMock = {
        label: 'Click to open',
        onChange: clickSpy,
        options: [
            {
                value: 1,
                label: 'An option',
            },
            {
                value: 2,
                label: 'Another option',
            },
        ],
        value: undefined,
    };
    (0, react_1.render)(<Select_1.default {...propsMock}/>);
    yield user_event_1.default.click(react_1.screen.queryByText('Click to open'));
    yield user_event_1.default.click(react_1.screen.queryByText('An option'));
    expect(clickSpy.mock.calls[0][0]).toBe(1);
}));
test('The label of the option is written in the toggle-button if you set the options value', () => {
    const clickSpy = jest.fn();
    const propsMock = {
        value: 2,
        label: 'Click to open',
        onChange: clickSpy,
        options: [
            {
                value: 1,
                label: 'An option',
            },
            {
                value: 2,
                label: 'Another option',
            },
        ],
    };
    (0, react_1.render)(<Select_1.default {...propsMock}/>);
    expect(react_1.screen.queryByRole('button')).toHaveTextContent('Another option');
});
