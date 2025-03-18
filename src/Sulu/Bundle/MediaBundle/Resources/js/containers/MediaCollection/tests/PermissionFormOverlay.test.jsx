"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const stores_1 = require("sulu-admin-bundle/stores");
const containers_1 = require("sulu-admin-bundle/containers");
const PermissionFormOverlay_1 = __importDefault(require("../PermissionFormOverlay"));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function () {
    this.destroy = jest.fn();
    this.save = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        saving: false,
    });
}));
jest.mock('sulu-admin-bundle/containers/Form/MissingTypeDialog', () => jest.fn(() => null));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function () {
    this.destroy = jest.fn();
    this.data = {};
    this.schema = {};
    this.validate = jest.fn().mockReturnValue(true);
    this.types = {};
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/memoryFormStoreFactory', () => ({
    createFromFormKey: jest.fn(() => ({
        data: {},
        destroy: jest.fn(),
        schema: {},
        validate: jest.fn(() => true),
    })),
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
test('Create new ResourceFormStore when collectionId has changed', () => {
    const permissionFormOverlay = (0, enzyme_1.shallow)(<PermissionFormOverlay_1.default collectionId={1} hasChildren={true} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    expect(stores_1.ResourceStore).toHaveBeenLastCalledWith('permissions', 1, {}, { resourceKey: 'media' });
    expect(containers_1.ResourceFormStore).toHaveBeenLastCalledWith(
    // $FlowFixMe
    stores_1.ResourceStore.mock.instances[0], 'permission_details', { resourceKey: 'media' }, undefined);
    permissionFormOverlay.setProps({ collectionId: 3 });
    expect(stores_1.ResourceStore.mock.instances[0].destroy).toBeCalledWith();
    expect(containers_1.ResourceFormStore.mock.instances[0].destroy).toBeCalledWith();
    expect(stores_1.ResourceStore).toHaveBeenLastCalledWith('permissions', 3, {}, { resourceKey: 'media' });
    expect(containers_1.ResourceFormStore).toHaveBeenLastCalledWith(
    // $FlowFixMe
    stores_1.ResourceStore.mock.instances[1], 'permission_details', { resourceKey: 'media' }, undefined);
    expect(containers_1.memoryFormStoreFactory.createFromFormKey).toHaveBeenLastCalledWith('permission_inheritance');
});
test('Call destroy of created stores', () => {
    const permissionFormOverlay = (0, enzyme_1.shallow)(<PermissionFormOverlay_1.default collectionId={undefined} hasChildren={true} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    const formStore = permissionFormOverlay.instance().formStore;
    const resourceStore = permissionFormOverlay.instance().resourceStore;
    const inheritDialogFormStore = permissionFormOverlay.instance().inheritDialogFormStore;
    formStore.destroy = jest.fn();
    resourceStore.destroy = jest.fn();
    inheritDialogFormStore.destroy = jest.fn();
    permissionFormOverlay.unmount();
    expect(formStore.destroy).toBeCalledWith();
    expect(resourceStore.destroy).toBeCalledWith();
    expect(inheritDialogFormStore.destroy).toBeCalledWith();
});
test('Confirming dialog should save the current value and inherit it', () => {
    const confirmSpy = jest.fn();
    const permissionFormOverlay = (0, enzyme_1.mount)(<PermissionFormOverlay_1.default collectionId={undefined} hasChildren={true} onClose={jest.fn()} onConfirm={confirmSpy} open={true}/>);
    const savePromise = Promise.resolve();
    permissionFormOverlay.instance().resourceStore.save.mockReturnValue(savePromise);
    permissionFormOverlay.update();
    permissionFormOverlay.find('Overlay').prop('onConfirm')();
    permissionFormOverlay.update();
    permissionFormOverlay.instance().inheritDialogFormStore.data.inherit = true;
    permissionFormOverlay.find('Dialog').prop('onConfirm')();
    expect(permissionFormOverlay.instance().resourceStore.save).toBeCalledWith({ inherit: true, resourceKey: 'media' });
    expect(confirmSpy).not.toBeCalled();
    return savePromise.then(() => {
        permissionFormOverlay.update();
        expect(confirmSpy).toBeCalledWith();
    });
});
test('Cancel inherit dialog should not save anything', () => {
    const confirmSpy = jest.fn();
    const closeSpy = jest.fn();
    const permissionFormOverlay = (0, enzyme_1.mount)(<PermissionFormOverlay_1.default collectionId={undefined} hasChildren={true} onClose={closeSpy} onConfirm={confirmSpy} open={true}/>);
    permissionFormOverlay.update();
    permissionFormOverlay.find('Overlay').prop('onConfirm')();
    permissionFormOverlay.update();
    permissionFormOverlay.find('Dialog').prop('onCancel')();
    expect(permissionFormOverlay.instance().resourceStore.save).not.toBeCalled();
    expect(confirmSpy).not.toBeCalled();
    expect(closeSpy).not.toBeCalled();
});
test.each([
    [true],
    [false],
])('Pass saving prop of value "%s" to confirmLoading prop of Overlay', (saving) => {
    const permissionFormOverlay = (0, enzyme_1.shallow)(<PermissionFormOverlay_1.default collectionId={1} hasChildren={true} onClose={jest.fn()} onConfirm={jest.fn()} open={true}/>);
    permissionFormOverlay.instance().resourceStore.saving = saving;
    permissionFormOverlay.update();
    expect(permissionFormOverlay.find('Overlay').prop('confirmLoading')).toEqual(saving);
});
test.each([
    [true],
    [false],
])('Pass open prop of value "%s" to open prop of Overlay', (open) => {
    const permissionFormOverlay = (0, enzyme_1.shallow)(<PermissionFormOverlay_1.default collectionId={1} hasChildren={true} onClose={jest.fn()} onConfirm={jest.fn()} open={open}/>);
    expect(permissionFormOverlay.find('Overlay').prop('open')).toEqual(open);
});
