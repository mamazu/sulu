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
const Popover_1 = __importDefault(require("../Popover"));
test('Render a Popover', () => {
    const { container } = (0, react_2.render)(<Popover_1.default icon="su-calendar" label="Set time" size="small" skin="light">{() => 'Child'}</Popover_1.default>);
    expect(container).toMatchSnapshot();
});
test('Disable the Button if the Popover is disabled', () => {
    (0, react_2.render)(<Popover_1.default disabled={true} icon="su-calendar" label="Set time">{() => 'Child'}</Popover_1.default>);
    expect(react_2.screen.queryByRole('button')).toBeDisabled();
});
test('Show a loader if the Popover is loading', () => {
    const { container } = (0, react_2.render)(<Popover_1.default icon="su-calendar" label="Set time" loading={true}>{() => 'Child'}</Popover_1.default>);
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('.loader')).toBeInTheDocument();
});
test('Open popover on click', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_2.render)(<Popover_1.default label="Set time">{() => <h1>Test</h1>}</Popover_1.default>);
    expect(react_2.screen.queryByRole('heading')).not.toBeInTheDocument();
    yield user_event_1.default.click(react_2.screen.queryByRole('button'));
    expect(react_2.screen.getByRole('heading')).toBeInTheDocument();
}));
test('Disabled popover does not open on click', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_2.render)(<Popover_1.default disabled={true} label="Set time">{() => <h1>Test</h1>}</Popover_1.default>);
    expect(react_2.screen.queryByRole('heading')).not.toBeInTheDocument();
    yield user_event_1.default.click(react_2.screen.queryByRole('button'));
    expect(react_2.screen.queryByRole('heading')).not.toBeInTheDocument();
}));
