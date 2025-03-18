"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const mousetrap_1 = __importDefault(require("mousetrap"));
const react_1 = __importDefault(require("react"));
const Overlay_1 = __importDefault(require("../Overlay"));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('The component should render in body when open', () => {
    const actions = [
        { title: 'Action 1', onClick: () => { } },
        { title: 'Action 2', onClick: () => { } },
    ];
    const view = (0, enzyme_1.mount)(<Overlay_1.default actions={actions} confirmText="Apply" onClose={jest.fn()} onConfirm={jest.fn()} open={true} size="small" title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('Overlay > Portal').at(0).render()).toMatchSnapshot();
});
test('The component should not render the footer where there is no onConfirm and no actions', () => {
    const view = (0, enzyme_1.mount)(<Overlay_1.default actions={[]} confirmText="Apply" onClose={jest.fn()} onConfirm={undefined} open={true} size="small" title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('Overlay > Portal').at(0).render()).toMatchSnapshot();
});
test('The component should render with a disabled confirm button', () => {
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmDisabled={true} confirmText="Apply" onClose={jest.fn()} onConfirm={jest.fn()} open={true} title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('Button[children="Apply"]').prop('disabled')).toEqual(true);
});
test('The component should render in body with loader instead of confirm button', () => {
    const onClose = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmLoading={true} confirmText="Apply" onClose={onClose} onConfirm={jest.fn()} open={true} title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('Button[children="Apply"]').prop('loading')).toEqual(true);
});
test('The component should not render in body when closed', () => {
    const onClose = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Apply" onClose={onClose} onConfirm={jest.fn()} open={false} title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('Overlay > Portal')).toHaveLength(0);
});
test('The component should request to be closed when the close icon is clicked', () => {
    const closeSpy = jest.fn();
    const view = (0, enzyme_1.shallow)(<Overlay_1.default confirmText="Apply" onClose={closeSpy} onConfirm={jest.fn()} open={true} title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(closeSpy).not.toBeCalled();
    view.find('Icon').simulate('click');
    expect(closeSpy).toBeCalled();
});
test('The component should request to be closed when the esc key is pressed', () => {
    const closeSpy = jest.fn();
    (0, enzyme_1.mount)(<Overlay_1.default confirmText="Apply" onClose={closeSpy} onConfirm={jest.fn()} open={true} title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(closeSpy).not.toBeCalled();
    mousetrap_1.default.trigger('esc');
    expect(closeSpy).toBeCalled();
});
test('The component should bind and unbind the esc key when overlay is opened and closed', () => {
    const closeSpy = jest.fn();
    const overlay = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Apply" onClose={closeSpy} onConfirm={jest.fn()} open={true} title="My overlay title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(closeSpy).not.toBeCalled();
    mousetrap_1.default.trigger('esc');
    expect(closeSpy).toBeCalled();
    closeSpy.mockReset();
    overlay.setProps({ open: false });
    mousetrap_1.default.trigger('esc');
    expect(closeSpy).not.toBeCalled();
    closeSpy.mockReset();
    overlay.setProps({ open: true });
    mousetrap_1.default.trigger('esc');
    expect(closeSpy).toBeCalled();
    closeSpy.mockReset();
});
test('The component should call the callback when the confirm button is clicked', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const view = (0, enzyme_1.shallow)(<Overlay_1.default confirmText="Alright mate!" onClose={onClose} onConfirm={onConfirm} open={true} title="My title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(onConfirm).not.toBeCalled();
    view.find('Button').simulate('click');
    expect(onConfirm).toBeCalled();
});
test('The component should render with a warning', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Alright mate!" onClose={onClose} onConfirm={onConfirm} open={true} snackbarMessage="Something really strange happened" snackbarType="warning" title="My title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('.snackbar.warning')).toHaveLength(1);
    expect(view.find('.snackbar.warning').text()).toBe('sulu_admin.warning - Something really strange happened');
    expect(view.find('.snackbar.error')).toHaveLength(0);
});
test('The component should render with an error', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Alright mate!" onClose={onClose} onConfirm={onConfirm} open={true} snackbarMessage="Money transfer unsuccessful" snackbarType="error" title="My title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('.snackbar.error')).toHaveLength(1);
    expect(view.find('.snackbar.error').text()).toBe('sulu_admin.error - Money transfer unsuccessful');
    expect(view.find('.snackbar.warning')).toHaveLength(0);
});
test('The component should render with an error if type is unknown', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Alright mate!" onClose={onClose} onConfirm={onConfirm} open={true} snackbarMessage="Money transfer unsuccessful" title="My title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(view.find('.snackbar.error')).toHaveLength(1);
    expect(view.find('.snackbar.error').text()).toBe('sulu_admin.error - Money transfer unsuccessful');
    expect(view.find('.snackbar.warning')).toHaveLength(0);
});
test('The component should call the callback when the snackbar close button is clicked', () => {
    const onSnackbarCloseClick = jest.fn();
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Alright mate!" onClose={onClose} onConfirm={onConfirm} onSnackbarCloseClick={onSnackbarCloseClick} open={true} snackbarMessage="Money transfer unsuccessful" snackbarType="error" title="My title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(onSnackbarCloseClick).not.toBeCalled();
    view.find('.snackbar.error .su-times').simulate('click');
    expect(onSnackbarCloseClick).toBeCalled();
});
test('The component should call the callback when the snackbar is clicked', () => {
    const onSnackbarClick = jest.fn();
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const view = (0, enzyme_1.mount)(<Overlay_1.default confirmText="Alright mate!" onClose={onClose} onConfirm={onConfirm} onSnackbarClick={onSnackbarClick} open={true} snackbarMessage="Something really strange happened" snackbarType="warning" title="My title">
            <p>My overlay content</p>
        </Overlay_1.default>);
    expect(onSnackbarClick).not.toBeCalled();
    view.find('.snackbar.warning').simulate('click');
    expect(onSnackbarClick).toBeCalled();
});
