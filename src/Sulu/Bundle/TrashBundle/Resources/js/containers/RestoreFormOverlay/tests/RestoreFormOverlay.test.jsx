"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const services_1 = require("sulu-admin-bundle/services");
const SchemaFormStoreDecorator_1 = __importDefault(require("sulu-admin-bundle/containers/Form/stores/SchemaFormStoreDecorator"));
const RestoreFormOverlay_1 = __importDefault(require("../RestoreFormOverlay"));
const React = react_1.default;
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/SchemaFormStoreDecorator', () => jest.fn(function (initializer) {
    return initializer({}, {});
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/MemoryFormStore', () => jest.fn(function () {
    this.destroy = jest.fn();
    this.changeMultiple = jest.fn();
}));
jest.mock('sulu-admin-bundle/containers/Form/Form', () => (class FormMock extends react_1.default.Component {
    render() {
        return <div>form container mock</div>;
    }
}));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve({})),
}));
test('Component should render', () => {
    const restoreFormOverlay = (0, enzyme_1.mount)(<RestoreFormOverlay_1.default formKey="test" onClose={jest.fn()} onConfirm={jest.fn()} open={true} trashItemId="trash-item-123"/>);
    expect(restoreFormOverlay.render()).toMatchSnapshot();
});
test('Component should not render without formKey', () => {
    const restoreFormOverlay = (0, enzyme_1.mount)(<RestoreFormOverlay_1.default formKey={null} onClose={jest.fn()} onConfirm={jest.fn()} open={true} trashItemId="trash-item-123"/>);
    expect(restoreFormOverlay.render()).toMatchSnapshot();
});
test('Component should not render without trashItemId', () => {
    const restoreFormOverlay = (0, enzyme_1.mount)(<RestoreFormOverlay_1.default formKey="test" onClose={jest.fn()} onConfirm={jest.fn()} open={true} trashItemId={null}/>);
    expect(restoreFormOverlay.render()).toMatchSnapshot();
});
test('Component should call close callback', () => {
    const onClose = jest.fn();
    const restoreFormOverlay = (0, enzyme_1.shallow)(<RestoreFormOverlay_1.default formKey="test" onClose={onClose} onConfirm={jest.fn()} open={true} trashItemId="trash-item-123"/>);
    restoreFormOverlay.find('FormOverlay').prop('onClose')();
    expect(onClose).toHaveBeenCalled();
});
test('Component should call confirm callback', () => {
    const onConfirm = jest.fn();
    const restoreFormOverlay = (0, enzyme_1.shallow)(<RestoreFormOverlay_1.default formKey="test" onClose={jest.fn()} onConfirm={onConfirm} open={true} trashItemId="trash-item-123"/>);
    const data = { foo: 'bar' };
    restoreFormOverlay.instance().formStore.data = data;
    restoreFormOverlay.find('FormOverlay').prop('onConfirm')();
    expect(onConfirm).toHaveBeenCalledWith(data);
});
test('Component should create formStore, load restore data and set it to the formstore', () => {
    const trashItemPromise = Promise.resolve({
        id: 5,
        resourceKey: 'categories',
        resourceId: '33',
        restoreData: {
            key: 'test-key',
            parentId: 32,
        },
    });
    services_1.ResourceRequester.get.mockReturnValue(trashItemPromise);
    const restoreFormOverlay = (0, enzyme_1.shallow)(<RestoreFormOverlay_1.default formKey="test-form-key" onClose={jest.fn()} onConfirm={jest.fn()} open={false} trashItemId="trash-item-123"/>);
    expect(SchemaFormStoreDecorator_1.default).toBeCalledWith(expect.anything(), 'test-form-key');
    expect(services_1.ResourceRequester.get).toBeCalledWith('trash_items', { 'id': 'trash-item-123' });
    expect(restoreFormOverlay.instance().formStore.changeMultiple).not.toBeCalled();
    expect(restoreFormOverlay.instance().formStore.loading).toBeTruthy();
    return trashItemPromise.then(() => {
        expect(restoreFormOverlay.instance().formStore.changeMultiple).toBeCalledWith({ key: 'test-key', parentId: 32 }, { isServerValue: true });
        expect(restoreFormOverlay.instance().formStore.loading).toBeFalsy();
    });
});
test('Component should update formStore on changing form key', () => {
    const onConfirm = jest.fn();
    const restoreFormOverlay = (0, enzyme_1.shallow)(<RestoreFormOverlay_1.default formKey="test" onClose={jest.fn()} onConfirm={onConfirm} open={false} trashItemId="trash-item-123"/>);
    const formStore = restoreFormOverlay.instance().formStore;
    expect(SchemaFormStoreDecorator_1.default).toBeCalledTimes(1);
    expect(SchemaFormStoreDecorator_1.default).toBeCalledWith(expect.anything(), 'test');
    expect(formStore.destroy).not.toHaveBeenCalled();
    restoreFormOverlay.setProps({ formKey: 'other' });
    expect(SchemaFormStoreDecorator_1.default).toBeCalledTimes(2);
    expect(SchemaFormStoreDecorator_1.default).toBeCalledWith(expect.anything(), 'other');
    expect(formStore.destroy).toHaveBeenCalled();
    const newFormStore = restoreFormOverlay.instance().formStore;
    expect(newFormStore).not.toBe(formStore);
    expect(newFormStore.destroy).not.toHaveBeenCalled();
});
test('Component should update formStore on reopen', () => {
    const onConfirm = jest.fn();
    const restoreFormOverlay = (0, enzyme_1.shallow)(<RestoreFormOverlay_1.default formKey="test" onClose={jest.fn()} onConfirm={onConfirm} open={false} trashItemId="trash-item-123"/>);
    const formStore = restoreFormOverlay.instance().formStore;
    restoreFormOverlay.setProps({ open: true });
    expect(formStore.destroy).toHaveBeenCalled();
    const newFormStore = restoreFormOverlay.instance().formStore;
    expect(newFormStore).not.toBe(formStore);
    expect(newFormStore.destroy).not.toHaveBeenCalled();
});
test('Component should destroy formStore on unmount', () => {
    const onConfirm = jest.fn();
    const restoreFormOverlay = (0, enzyme_1.shallow)(<RestoreFormOverlay_1.default formKey="test" onClose={jest.fn()} onConfirm={onConfirm} open={false} trashItemId="trash-item-123"/>);
    const formStore = restoreFormOverlay.instance().formStore;
    restoreFormOverlay.unmount();
    expect(formStore.destroy).toHaveBeenCalled();
});
