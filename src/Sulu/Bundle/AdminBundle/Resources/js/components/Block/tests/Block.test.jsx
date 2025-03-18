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
const loglevel_1 = __importDefault(require("loglevel"));
const Block_1 = __importDefault(require("../Block"));
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../utils/Translator', () => ({
    translate: (key) => key,
}));
test('Render an expanded block with multiple types', () => {
    const { container } = (0, react_2.render)(<Block_1.default activeType="type1" expanded={true} handle={<span>Test</span>} icons={['su-eye', 'su-people']} onCollapse={jest.fn()} onExpand={jest.fn()} onSettingsClick={jest.fn()} types={{ 'type1': 'Type1', 'type2': 'Type2' }}>
            Some block content
        </Block_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render an block without handle or collapse or expand button', () => {
    const { container } = (0, react_2.render)(<Block_1.default expanded={true}>
            Some block content
        </Block_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a selected block', () => {
    const { container } = (0, react_2.render)(<Block_1.default expanded={false} selected={true}>
            Some block content
        </Block_1.default>);
    expect(container).toMatchSnapshot();
});
test('Render a collapsed block', () => {
    const { container } = (0, react_2.render)(<Block_1.default expanded={false} icons={['su-eye', 'su-people']} onCollapse={jest.fn()} onExpand={jest.fn()}>
            Some block content
        </Block_1.default>);
    expect(container).toMatchSnapshot();
});
test('Do not show type dropdown if only a single type is passed', () => {
    const { container } = (0, react_2.render)(<Block_1.default expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()} types={{ 'type': 'Type' }}>
            Some block content
        </Block_1.default>);
    // eslint-disable-next-line testing-library/no-container
    const elements = container.getElementsByClassName('select');
    expect(elements).toHaveLength(0);
});
test('Do not show action icon if no actions prop has been passed', () => {
    (0, react_2.render)(<Block_1.default expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()} types={{ 'type': 'Type' }}>
            Some block content
        </Block_1.default>);
    expect(react_2.screen.queryByLabelText('su-more-circle')).not.toBeInTheDocument();
});
test('Do not show action icon if an empty actions prop has been passed', () => {
    (0, react_2.render)(<Block_1.default actions={[]} expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()} types={{ 'type': 'Type' }}>
            Some block content
        </Block_1.default>);
    expect(react_2.screen.queryByLabelText('su-more-circle')).not.toBeInTheDocument();
});
test('Do not show settings icon if no onSettingsClick prop has been passed', () => {
    (0, react_2.render)(<Block_1.default expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()} types={{ 'type': 'Type' }}>
            Some block content
        </Block_1.default>);
    expect(react_2.screen.queryByLabelText('su-cog')).not.toBeInTheDocument();
});
test('Clicking on a collapsed block should call the onExpand callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const expandSpy = jest.fn();
    (0, react_2.render)(<Block_1.default onCollapse={jest.fn()} onExpand={expandSpy}>Block content</Block_1.default>);
    yield user_event_1.default.click(react_2.screen.queryByRole('switch'));
    expect(expandSpy).toHaveBeenCalledTimes(1);
}));
test('Clicking on a expanded block should not call the onExpand callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const expandSpy = jest.fn();
    (0, react_2.render)(<Block_1.default expanded={true} onCollapse={jest.fn()} onExpand={expandSpy}>Block content</Block_1.default>);
    yield user_event_1.default.click(react_2.screen.queryByRole('switch'));
    expect(expandSpy).not.toBeCalled();
}));
test('Clicking the close icon in an expanded block should collapse it', () => __awaiter(void 0, void 0, void 0, function* () {
    const collapseSpy = jest.fn();
    (0, react_2.render)(<Block_1.default expanded={true} onCollapse={collapseSpy} onExpand={jest.fn()}>Block content</Block_1.default>);
    const closeIcon = react_2.screen.queryByLabelText('su-collapse-vertical');
    expect(closeIcon).toBeInTheDocument();
    yield user_event_1.default.click(closeIcon);
    expect(collapseSpy).toHaveBeenCalledTimes(1);
}));
test('Clicking the action icon should open a popover that displays the given actions', () => __awaiter(void 0, void 0, void 0, function* () {
    const actions = [
        {
            type: 'button',
            icon: 'su-test-1',
            label: 'Test Action 1',
            onClick: jest.fn(),
        },
        {
            type: 'divider',
        },
        {
            type: 'button',
            icon: 'su-test-2',
            label: 'Test Action 2',
            onClick: jest.fn(),
        },
        {
            type: 'button',
            icon: 'su-test-3',
            label: 'Test Action 3',
            onClick: jest.fn(),
        },
    ];
    const { container } = (0, react_2.render)(<Block_1.default actions={actions} expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()}>Block content</Block_1.default>);
    const icon = react_2.screen.queryByLabelText('su-more-circle');
    expect(react_2.screen.queryByText(/Test Action 1/)).not.toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    yield user_event_1.default.click(icon);
    expect(react_2.screen.getByText(/Test Action 1/)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
}));
test('Clicking an action in the action popover should fire the respective callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const onActionClickSpy = jest.fn();
    const actions = [
        {
            type: 'button',
            icon: 'su-test-1',
            label: 'Test Action 1',
            onClick: onActionClickSpy,
        },
    ];
    (0, react_2.render)(<Block_1.default actions={actions} expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()}>Block content</Block_1.default>);
    const icon = react_2.screen.queryByLabelText('su-more-circle');
    yield user_event_1.default.click(icon);
    expect(onActionClickSpy).not.toBeCalled();
    yield user_event_1.default.click(react_2.screen.queryByText('Test Action 1'));
    expect(onActionClickSpy).toBeCalledWith();
}));
test('Render remove action if deprecated onRemove prop is set', () => __awaiter(void 0, void 0, void 0, function* () {
    const removeSpy = jest.fn();
    (0, react_2.render)(<Block_1.default expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()} onRemove={removeSpy}>Block content</Block_1.default>);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "onRemove" prop of the "Block" component is deprecated'));
    const actionIcon = react_2.screen.queryByLabelText('su-more-circle');
    expect(actionIcon).toBeInTheDocument();
    yield user_event_1.default.click(actionIcon);
    const removeIcon = react_2.screen.queryByLabelText('su-trash-alt');
    expect(removeIcon).toBeInTheDocument();
    yield user_event_1.default.click(removeIcon);
    expect(removeSpy).toHaveBeenCalledTimes(1);
}));
test('Changing the type should call the onTypeChange callback', () => __awaiter(void 0, void 0, void 0, function* () {
    const typeChangeSpy = jest.fn();
    const types = {
        type1: 'Type 1',
        type2: 'Type 2',
    };
    (0, react_2.render)(<Block_1.default activeType="type1" expanded={true} onCollapse={jest.fn()} onExpand={jest.fn()} onTypeChange={typeChangeSpy} types={types}>
            Block content
        </Block_1.default>);
    const selectButton = react_2.screen.queryByText('Type 1');
    yield user_event_1.default.click(selectButton);
    const typeButton = react_2.screen.queryByText('Type 2');
    yield user_event_1.default.click(typeButton);
    expect(typeChangeSpy).toBeCalledWith('type2');
    expect(typeChangeSpy).toHaveBeenCalledTimes(1);
}));
