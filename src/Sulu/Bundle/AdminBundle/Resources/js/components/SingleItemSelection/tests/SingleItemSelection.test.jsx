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
const SingleItemSelection_1 = __importDefault(require("../SingleItemSelection"));
test('Render with given children prop and with custom className', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default className="test" leftButton={leftButton}>Test Item</SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render with right button', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const rightButton = {
        icon: 'su-display-default',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} rightButton={rightButton}>Test Item</SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render with right button with options', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const rightButton = {
        icon: 'su-display-default',
        onClick: jest.fn(),
        options: [
            { label: 'Test1', value: 'test-1' },
        ],
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} rightButton={rightButton}>Test Item</SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render in disabled state', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default disabled={true} leftButton={leftButton} onRemove={jest.fn()}>
            Test Item
        </SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render in item-disabled state without remove button', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default allowRemoveWhileItemDisabled={false} itemDisabled={true} leftButton={leftButton} onRemove={jest.fn()}>
            Test Item
        </SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render in item-disabled state with remove button', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default allowRemoveWhileItemDisabled={true} itemDisabled={true} leftButton={leftButton} onRemove={jest.fn()}>
            Test Item
        </SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render in loading state', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} loading={true}>Test Item</SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render in loading state with no children', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} loading={true}/>);
    expect(container).toMatchSnapshot();
});
test('Render in invalid state', () => {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} valid={false}>Test Item</SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render with given onRemove prop', () => {
    const leftButton = {
        icon: 'su-page',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} onRemove={jest.fn()}>Test Item</SingleItemSelection_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render with emptyText if no children have been passed', () => {
    const leftButton = {
        icon: 'su-page',
        onClick: jest.fn(),
    };
    const { container } = (0, react_2.render)(<SingleItemSelection_1.default emptyText="Nothing!" leftButton={leftButton} onRemove={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
test('Call onClick callback if left button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton}/>);
    const button = react_2.screen.queryByLabelText('su-document');
    yield user_event_1.default.click(button);
    expect(leftButton.onClick).toBeCalledWith();
}));
test('Call onClick callback with option value', () => __awaiter(void 0, void 0, void 0, function* () {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const rightButton = {
        icon: 'su-display-default',
        onClick: jest.fn(),
        options: [
            {
                label: 'Test1',
                value: 'test1',
            },
        ],
    };
    (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} rightButton={rightButton}/>);
    const icon = react_2.screen.queryByLabelText('su-display-default');
    yield user_event_1.default.click(icon);
    const action = react_2.screen.queryByText(/Test1/);
    yield user_event_1.default.click(action);
    expect(rightButton.onClick).toBeCalledWith('test1');
}));
test('Call onClick callback if right button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const rightButton = {
        icon: 'su-display-default',
        onClick: jest.fn(),
    };
    (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} rightButton={rightButton}/>);
    const icon = react_2.screen.queryByLabelText('su-display-default');
    yield user_event_1.default.click(icon);
    expect(rightButton.onClick).toBeCalledWith();
}));
test('Call onItemClick callback should not be called if item is clicked but no id is given', () => __awaiter(void 0, void 0, void 0, function* () {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const itemClickSpy = jest.fn();
    (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} onItemClick={itemClickSpy}>item title</SingleItemSelection_1.default>);
    const item = react_2.screen.queryByText('item title');
    yield user_event_1.default.click(item);
    expect(itemClickSpy).not.toBeCalled();
}));
test('Call onItemClick callback should be called if item is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const value = { id: 5 };
    const itemClickSpy = jest.fn();
    (0, react_2.render)(<SingleItemSelection_1.default id={5} leftButton={leftButton} onItemClick={itemClickSpy} value={value}>
            item title
        </SingleItemSelection_1.default>);
    const item = react_2.screen.queryByText('item title');
    yield user_event_1.default.click(item);
    expect(itemClickSpy).toBeCalledWith(5, value);
}));
test('Call onRemove callback if remove button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const leftButton = {
        icon: 'su-document',
        onClick: jest.fn(),
    };
    const removeSpy = jest.fn();
    (0, react_2.render)(<SingleItemSelection_1.default leftButton={leftButton} onRemove={removeSpy}/>);
    const icon = react_2.screen.queryByLabelText('su-trash-alt');
    yield user_event_1.default.click(icon);
    expect(removeSpy).toBeCalled();
}));
