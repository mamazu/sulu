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
const Dropdown_1 = __importDefault(require("../Dropdown"));
const dropdownPropsMock = {
    label: 'Click to open',
    options: [
        {
            label: 'An option',
            onClick: () => { },
        },
    ],
};
test('Render dropdown', () => {
    const { container } = (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock}/>);
    expect(container).toMatchSnapshot();
});
test('Render loading dropdown', () => {
    const { container } = (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock} loading={true}/>);
    expect(container).toMatchSnapshot();
});
test('Render disabled dropdown', () => {
    const { container } = (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock} disabled={true}/>);
    expect(container).toMatchSnapshot();
});
test('Render dropdown with a prepended icon', () => {
    const { container } = (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock} icon="fa-floppy-o"/>);
    expect(container).toMatchSnapshot();
});
test('Render dropdown without text', () => {
    const { container } = (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock} showText={false}/>);
    expect(container).toMatchSnapshot();
});
test('Render dropdown with a different size', () => {
    const { container } = (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock} size="small"/>);
    expect(container).toMatchSnapshot();
});
test('Open dropdown on click', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock}/>);
    const button = react_1.screen.queryByText('Click to open');
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
    yield user_event_1.default.click(button);
    expect(react_1.screen.getByText('An option')).toBeInTheDocument();
}));
test('Disabled dropdown will not open', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_1.render)(<Dropdown_1.default {...dropdownPropsMock} disabled={true}/>);
    const button = react_1.screen.queryByText('Click to open');
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
    yield user_event_1.default.click(button);
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
}));
test('Click on option fires onClick', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const propsMock = {
        label: 'Click to open',
        options: [
            {
                label: 'An option',
                onClick: clickSpy,
            },
        ],
    };
    (0, react_1.render)(<Dropdown_1.default {...propsMock}/>);
    yield user_event_1.default.click(react_1.screen.queryByText('Click to open'));
    yield user_event_1.default.click(react_1.screen.queryByText('An option'));
    expect(clickSpy).toBeCalled();
}));
test('Click on disabled option will not fire onClick', () => __awaiter(void 0, void 0, void 0, function* () {
    const clickSpy = jest.fn();
    const propsMock = {
        label: 'Click to open',
        options: [
            {
                label: 'An option',
                onClick: clickSpy,
                disabled: true,
            },
            {
                label: 'Another option',
                onClick: jest.fn(),
                disabled: false,
            },
        ],
    };
    (0, react_1.render)(<Dropdown_1.default {...propsMock}/>);
    yield user_event_1.default.click(react_1.screen.queryByText('Click to open'));
    yield user_event_1.default.click(react_1.screen.queryByText('An option'));
    expect(clickSpy).not.toBeCalled();
}));
test('No active options should disable dropdown', () => __awaiter(void 0, void 0, void 0, function* () {
    const propsMock = {
        label: 'Click to open',
        options: [
            {
                label: 'An option',
                onClick: jest.fn(),
                disabled: true,
            },
            {
                label: 'Another option',
                onClick: jest.fn(),
                disabled: true,
            },
        ],
    };
    (0, react_1.render)(<Dropdown_1.default {...propsMock}/>);
    const button = react_1.screen.queryByRole('button');
    expect(button).toBeDisabled();
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
    // click on button shouldn't open the options
    yield user_event_1.default.click(button);
    expect(react_1.screen.queryByText('An option')).not.toBeInTheDocument();
}));
