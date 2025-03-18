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
const mousetrap_1 = __importDefault(require("mousetrap"));
const AutoCompletePopover_1 = __importDefault(require("../AutoCompletePopover"));
beforeEach(() => {
    mousetrap_1.default.reset();
});
test('Popover should be hidden when open is set to false', () => {
    (0, react_2.render)(<div>Anchor Element</div>);
    const suggestions = [
        { id: 1, name: 'Test 1 (selector-1)' },
        { id: 2, name: 'Test 2 (selector-2)' },
    ];
    (0, react_2.render)(<AutoCompletePopover_1.default anchorElement={react_2.screen.getByText('Anchor Element')} onSelect={jest.fn()} open={false} query="Test" searchProperties={['name']} suggestions={suggestions}/>);
    expect(react_2.screen.queryByText(/selector-1/)).not.toBeInTheDocument();
});
test('Popover should be shown when open is set to true', () => {
    (0, react_2.render)(<div>Anchor Element</div>);
    const suggestions = [
        { id: 1, name: 'Test 1 (selector-1)' },
        { id: 2, name: 'Test 2 (selector-2)' },
    ];
    (0, react_2.render)(<AutoCompletePopover_1.default anchorElement={react_2.screen.getByText('Anchor Element')} onSelect={jest.fn()} open={true} query="Test" searchProperties={['name']} suggestions={suggestions}/>);
    expect(react_2.screen.getByText(/selector-1/)).toBeInTheDocument();
});
test('Render with highlighted suggestions', () => {
    (0, react_2.render)(<div>Anchor Element</div>);
    const suggestions = [
        { id: 1, name: 'Test 1 (selector-1)' },
        { id: 2, name: 'Test 2 (selector-2)' },
    ];
    const { baseElement } = (0, react_2.render)(<AutoCompletePopover_1.default anchorElement={react_2.screen.getByText('Anchor Element')} onSelect={jest.fn()} open={true} query="Test" searchProperties={['name']} suggestions={suggestions}/>);
    expect(baseElement).toMatchSnapshot();
});
test('Call onClose when Popover is closed', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_2.render)(<div>Anchor Element</div>);
    const suggestions = [
        { id: 1, name: 'Test 1 (selector-1)' },
        { id: 2, name: 'Test 2 (selector-2)' },
    ];
    const closeSpy = jest.fn();
    (0, react_2.render)(<AutoCompletePopover_1.default anchorElement={react_2.screen.getByText('Anchor Element')} onClose={closeSpy()} onSelect={jest.fn()} open={true} query="Test" searchProperties={['name']} suggestions={suggestions}/>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByTestId('backdrop'));
    expect(closeSpy).toBeCalledWith();
}));
test('Call onSelect with clicked suggestion', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_2.render)(<div>Anchor Element</div>);
    const suggestions = [
        { id: 1, name: 'Test 1 (selector-1)' },
        { id: 2, name: 'Test 2 (selector-2)' },
    ];
    const selectSpy = jest.fn();
    (0, react_2.render)(<AutoCompletePopover_1.default anchorElement={react_2.screen.getByText('Anchor Element')} onSelect={selectSpy} open={true} query="Test" searchProperties={['name']} suggestions={suggestions}/>);
    const user = user_event_1.default.setup();
    yield user.click(react_2.screen.getByText(/selector-2/));
    expect(selectSpy).toBeCalledWith(suggestions[1]);
}));
test('Should focus suggestions when pressing up and down key', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, react_2.render)(<div>Anchor Element</div>);
    const suggestions = [
        { id: 1, name: 'Test 1 (selector-1)' },
        { id: 2, name: 'Test 2 (selector-2)' },
    ];
    (0, react_2.render)(<AutoCompletePopover_1.default anchorElement={react_2.screen.getByText('Anchor Element')} onSelect={jest.fn()} open={true} query="Test" searchProperties={['name']} suggestions={suggestions}/>);
    const suggestionElements = react_2.screen.getAllByRole('button').slice(1); // first button is the popover backdrop
    expect(suggestionElements[0]).not.toHaveFocus();
    expect(suggestionElements[1]).not.toHaveFocus();
    mousetrap_1.default.trigger('down');
    expect(suggestionElements[0]).toHaveFocus();
    expect(suggestionElements[1]).not.toHaveFocus();
    mousetrap_1.default.trigger('down');
    expect(suggestionElements[0]).not.toHaveFocus();
    expect(suggestionElements[1]).toHaveFocus();
    mousetrap_1.default.trigger('up');
    expect(suggestionElements[0]).toHaveFocus();
    expect(suggestionElements[1]).not.toHaveFocus();
}));
