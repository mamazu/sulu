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
const Dialog_1 = __importDefault(require("../Dialog"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render in body when open', () => {
    const { baseElement } = (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmText="Confirm" onCancel={jest.fn()} onConfirm={jest.fn()} open={true} title="My dialog title">
        <div>My dialog content</div>
    </Dialog_1.default>);
    expect(baseElement).toMatchSnapshot();
    expect(react_1.screen.getByText('My dialog content')).toBeInTheDocument();
});
test('The component should render aligned to the left', () => {
    (0, react_1.render)(<Dialog_1.default align="left" cancelText="Cancel" confirmText="Confirm" onCancel={jest.fn()} onConfirm={jest.fn()} open={true} title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    expect(react_1.screen.queryByText('My dialog content').parentElement).toHaveClass('left');
});
test('The component should render in body without cancel button', () => {
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default confirmText="Confirm" onConfirm={onConfirm} open={true} title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    expect(react_1.screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(react_1.screen.getByText('Confirm')).toBeInTheDocument();
});
test('The component should render in body with disabled confirm button', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmDisabled={true} confirmText="Confirm" onCancel={onCancel} onConfirm={onConfirm} open={true} title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    const button = react_1.screen.queryByText('Confirm').parentElement;
    expect(button).toBeDisabled();
});
test('The component should render in body with a large class', () => {
    (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmText="Confirm" onCancel={jest.fn()} onConfirm={jest.fn()} open={true} size="large" title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    const largeDiv = react_1.screen.queryByLabelText('su-exclamation-triangle')
        .parentElement
        .parentElement
        .parentElement
        .parentElement;
    expect(largeDiv).toBeInTheDocument();
    expect(largeDiv).toHaveClass('large');
});
test('The component should render in body with loader instead of confirm button', () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmLoading={true} confirmText="Confirm" onCancel={onCancel} onConfirm={onConfirm} open={true} title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    const loader = react_1.screen.queryByText('Confirm').nextElementSibling;
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loader');
});
test('The component should not render in body when closed', () => {
    (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmText="Confirm" onCancel={jest.fn()} onConfirm={jest.fn()} open={false} title="My dialog title">
            My dialog content
        </Dialog_1.default>);
    expect(react_1.screen.queryByText('My dialog content')).not.toBeInTheDocument();
});
test('The component should call the callback when the confirm button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmText="Confirm" onCancel={onCancel} onConfirm={onConfirm} open={true} title="My dialog title">
            My dialog content
        </Dialog_1.default>);
    const button = react_1.screen.queryByText('Confirm');
    expect(onConfirm).not.toBeCalled();
    yield user_event_1.default.click(button);
    expect(onConfirm).toBeCalled();
}));
test('The component should call the callback when the cancel button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    (0, react_1.render)(<Dialog_1.default cancelText="Cancel" confirmText="Confirm" onCancel={onCancel} onConfirm={onConfirm} open={true} title="My dialog title">
            My dialog content
        </Dialog_1.default>);
    const button = react_1.screen.queryByText('Cancel');
    expect(onCancel).not.toBeCalled();
    yield user_event_1.default.click(button);
    expect(onCancel).toBeCalled();
}));
test('The component should render with a warning', () => {
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default confirmText="Confirm" onConfirm={onConfirm} open={true} snackbarMessage="Something really strange happened" snackbarType="warning" title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    const snackbar = react_1.screen.queryByText(/Something really strange happened/).parentElement;
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveClass('snackbar', 'warning');
    expect(snackbar).not.toHaveClass('error');
    expect(snackbar.children[1]).toHaveTextContent('sulu_admin.warning - Something really strange happened');
});
test('The component should render with an error', () => {
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default confirmText="Confirm" onConfirm={onConfirm} open={true} snackbarMessage="Money transfer unsuccessful" snackbarType="error" title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    const snackbar = react_1.screen.queryByText(/Money transfer unsuccessful/).parentElement;
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveClass('snackbar', 'error');
    expect(snackbar).not.toHaveClass('warning');
    expect(snackbar.children[1]).toHaveTextContent('sulu_admin.error - Money transfer unsuccessful');
});
test('The component should render with an error if the type is unknown', () => {
    const onConfirm = jest.fn();
    (0, react_1.render)(<Dialog_1.default confirmText="Confirm" onConfirm={onConfirm} open={true} snackbarMessage="Money transfer unsuccessful" title="My dialog title">
            <div>My dialog content</div>
        </Dialog_1.default>);
    const snackbar = react_1.screen.queryByText(/Money transfer unsuccessful/).parentElement;
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toHaveClass('snackbar', 'error');
    expect(snackbar).not.toHaveClass('warning');
    expect(snackbar.children[1]).toHaveTextContent('sulu_admin.error - Money transfer unsuccessful');
});
test('The component should call the callback when the snackbar close button is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onSnackbarCloseClick = jest.fn();
    (0, react_1.render)(<Dialog_1.default confirmText="Confirm" onConfirm={jest.fn()} onSnackbarCloseClick={onSnackbarCloseClick} open={true} snackbarMessage="Money transfer unsuccessful" snackbarType="error" title="My dialog title">
            My dialog content
        </Dialog_1.default>);
    const snackbar = react_1.screen.queryByText(/Money transfer unsuccessful/).parentElement;
    const closeIcon = react_1.screen.queryByLabelText('su-times');
    expect(snackbar).toBeInTheDocument();
    expect(onSnackbarCloseClick).not.toBeCalled();
    yield user_event_1.default.click(closeIcon);
    expect(onSnackbarCloseClick).toBeCalled();
}));
test('The component should call the callback when the snackbar is clicked', () => __awaiter(void 0, void 0, void 0, function* () {
    const onSnackbarClick = jest.fn();
    (0, react_1.render)(<Dialog_1.default confirmText="Confirm" onConfirm={jest.fn()} onSnackbarClick={onSnackbarClick} open={true} snackbarMessage="Something really strange happened" snackbarType="warning" title="My dialog title">
            My dialog content
        </Dialog_1.default>);
    const snackbar = react_1.screen.queryByText(/Something really strange happened/).parentElement;
    expect(snackbar).toBeInTheDocument();
    expect(onSnackbarClick).not.toBeCalled();
    yield user_event_1.default.click(snackbar);
    expect(onSnackbarClick).toBeCalled();
}));
