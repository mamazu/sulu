"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = require("enzyme/build");
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const userStore_1 = __importDefault(require("../../../stores/userStore"));
const FormOverlay_1 = __importDefault(require("../../FormOverlay"));
const ProfileFormOverlay_1 = __importDefault(require("../ProfileFormOverlay"));
const ResourceStore_1 = __importDefault(require("../../../stores/ResourceStore"));
const ResourceFormStore_1 = __importDefault(require("../../Form/stores/ResourceFormStore"));
const React = react_1.default;
jest.mock('../../../containers/Form', () => (class FormMock extends react_1.default.Component {
    render() {
        return <div>form container mock</div>;
    }
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../stores/userStore', () => ({
    setFullName: jest.fn(),
}));
jest.mock('../../../stores/ResourceStore', () => jest.fn((resourceKey, itemId) => {
    return {
        id: itemId,
    };
}));
jest.mock('../../Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey, options, metadataOptions) {
    this.id = resourceStore.id;
    this.formKey = formKey;
    this.options = options;
    this.metadataOptions = metadataOptions;
    this.save = jest.fn();
    this.destroy = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        dirty: false,
        saving: false,
    });
}));
test('Component should render', () => {
    const profileFormOverlay = (0, build_1.mount)(<ProfileFormOverlay_1.default onClose={jest.fn()} open={true}/>);
    expect(profileFormOverlay.render()).toMatchSnapshot();
});
test('Should pass correct props to FormOverlay', () => {
    const closeSpy = jest.fn();
    const profileFormOverlay = (0, build_1.shallow)(<ProfileFormOverlay_1.default onClose={closeSpy} open={true}/>);
    expect(profileFormOverlay.find(FormOverlay_1.default).props()).toEqual(expect.objectContaining({
        confirmText: 'sulu_admin.save',
        formStore: profileFormOverlay.instance().formStore,
        onClose: closeSpy,
        open: true,
        size: 'large',
        title: 'sulu_admin.edit_profile',
    }));
});
test('Should construct ResourceStore and ResourceFormStore with correct parameters when mounted', () => {
    (0, build_1.shallow)(<ProfileFormOverlay_1.default onClose={jest.fn()} open={true}/>);
    expect(ResourceStore_1.default).toBeCalledWith('profile', '-');
    expect(ResourceFormStore_1.default).toBeCalledWith(expect.anything(), 'profile_details');
});
test('Should construct new ResourceStore and ResourceFormStore when closed and opened again', () => {
    const profileFormOverlay = (0, build_1.shallow)(<ProfileFormOverlay_1.default onClose={jest.fn()} open={true}/>);
    const initialFormStore = profileFormOverlay.instance().formStore;
    expect(initialFormStore.destroy).not.toHaveBeenCalled();
    profileFormOverlay.setProps({ open: false });
    profileFormOverlay.setProps({ open: true });
    expect(ResourceStore_1.default).toHaveBeenCalledTimes(2);
    expect(ResourceStore_1.default).lastCalledWith('profile', '-');
    expect(ResourceFormStore_1.default).toHaveBeenCalledTimes(2);
    expect(ResourceFormStore_1.default).lastCalledWith(expect.anything(), 'profile_details');
    expect(initialFormStore.destroy).toHaveBeenCalled();
    expect(initialFormStore).not.toEqual(profileFormOverlay.instance().formStore);
});
test('Should destroy ResourceFormStore when component is unmounted', () => {
    const profileFormOverlay = (0, build_1.shallow)(<ProfileFormOverlay_1.default onClose={jest.fn()} open={true}/>);
    const formStore = profileFormOverlay.instance().formStore;
    expect(formStore.destroy).not.toHaveBeenCalled();
    profileFormOverlay.unmount();
    expect(formStore.destroy).toHaveBeenCalled();
});
test('Should update full name in UserStore and call onClose callback when FormOverlay is confirmed', () => {
    const closeSpy = jest.fn();
    const profileFormOverlay = (0, build_1.shallow)(<ProfileFormOverlay_1.default onClose={closeSpy} open={true}/>);
    profileFormOverlay.instance().formStore.data = {
        firstName: 'Donald',
        lastName: 'Duck',
    };
    expect(userStore_1.default.setFullName).not.toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalled();
    profileFormOverlay.find(FormOverlay_1.default).props().onConfirm();
    expect(userStore_1.default.setFullName).toHaveBeenCalledWith('Donald Duck');
    expect(closeSpy).toHaveBeenCalled();
});
