"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const FormOverlay_1 = __importDefault(require("../FormOverlay"));
const Overlay_1 = __importDefault(require("../../../components/Overlay"));
const ResourceStore_1 = __importDefault(require("../../../stores/ResourceStore"));
const MemoryFormStore_1 = __importDefault(require("../../../containers/Form/stores/MemoryFormStore"));
const ResourceFormStore_1 = __importDefault(require("../../../containers/Form/stores/ResourceFormStore"));
const Form_1 = __importDefault(require("../../../containers/Form"));
const Snackbar_1 = __importDefault(require("../../../components/Snackbar"));
const React = react_1.default;
jest.mock('../../../containers/Form', () => (class FormMock extends react_1.default.Component {
    render() {
        return <div>form container mock</div>;
    }
}));
jest.mock('../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../stores/ResourceStore', () => jest.fn((resourceKey, itemId) => {
    return {
        id: itemId,
    };
}));
jest.mock('../../../containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore, formKey, options, metadataOptions) {
    this.id = resourceStore.id;
    this.formKey = formKey;
    this.options = options;
    this.metadataOptions = metadataOptions;
    this.save = jest.fn();
    (0, mobx_1.extendObservable)(this, {
        dirty: false,
        saving: false,
    });
}));
jest.mock('../../../containers/Form/stores/MemoryFormStore', () => jest.fn(function (data, rawSchema, jsonSchema, locale) {
    this.rawSchema = rawSchema;
    this.jsonSchema = jsonSchema;
    this.locale = locale;
    (0, mobx_1.extendObservable)(this, {
        data,
        dirty: false,
    });
}));
test('Component should render', () => {
    const formStore = new MemoryFormStore_1.default({}, {}, undefined, undefined);
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} size="small" title="overlay-title"/>);
    expect(formOverlay.render()).toMatchSnapshot();
});
test('Should pass correct props to Overlay component', () => {
    const formStore = new MemoryFormStore_1.default({}, {}, undefined, undefined);
    formStore.dirty = true;
    const closeSpy = jest.fn();
    const formOverlay = (0, enzyme_1.shallow)(<FormOverlay_1.default confirmDisabled={true} confirmLoading={true} confirmText="confirm-text" formStore={formStore} onClose={closeSpy} onConfirm={jest.fn()} open={true} size="small" title="overlay-title"/>);
    const overlay = formOverlay.find(Overlay_1.default);
    expect(overlay.props()).toEqual(expect.objectContaining({
        confirmDisabled: true,
        confirmLoading: true,
        confirmText: 'confirm-text',
        onClose: closeSpy,
        open: true,
        size: 'small',
        title: 'overlay-title',
    }));
});
test('Should pass correct props to Overlay component when using default values', () => {
    const formStore = new MemoryFormStore_1.default({}, {}, undefined, undefined);
    formStore.dirty = true;
    const closeSpy = jest.fn();
    const formOverlay = (0, enzyme_1.shallow)(<FormOverlay_1.default confirmText="confirm-text" formStore={formStore} onClose={closeSpy} onConfirm={jest.fn()} open={true} title="overlay-title"/>);
    const overlay = formOverlay.find(Overlay_1.default);
    expect(overlay.props()).toEqual(expect.objectContaining({
        confirmDisabled: false,
        confirmLoading: false,
        confirmText: 'confirm-text',
        onClose: closeSpy,
        open: true,
        size: undefined,
        title: 'overlay-title',
    }));
});
test('Should pass correct props to Form component', () => {
    const formStore = new MemoryFormStore_1.default({}, {}, undefined, undefined);
    const formOverlay = (0, enzyme_1.shallow)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} size="small" title="overlay-title"/>);
    const form = formOverlay.find(Form_1.default);
    expect(form.props()).toEqual(expect.objectContaining({
        store: formStore,
    }));
});
test('Should display confirm button as loading if FormStore is saving', () => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const formOverlay = (0, enzyme_1.shallow)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} size="small" title="overlay-title"/>);
    formStore.saving = false;
    expect(formOverlay.find(Overlay_1.default).props().confirmLoading).toEqual(false);
    formStore.saving = true;
    expect(formOverlay.find(Overlay_1.default).props().confirmLoading).toEqual(true);
});
test('Should submit Form container when Overlay is confirmed', () => {
    const formStore = new MemoryFormStore_1.default({}, {}, undefined, undefined);
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={jest.fn()} open={true} size="small" title="overlay-title"/>);
    const submitSpy = jest.fn();
    formOverlay.find(Form_1.default).instance().submit = submitSpy;
    formOverlay.find(Overlay_1.default).props().onConfirm();
    expect(submitSpy).toBeCalled();
});
test('Should save ResourceFormStore and call onConfirm callback on submit of Form', () => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.shallow)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    const savePromise = Promise.resolve();
    formStore.save.mockReturnValueOnce(savePromise);
    formOverlay.find(Form_1.default).props().onSubmit();
    return savePromise.finally(() => {
        expect(formStore.save).toBeCalled();
        expect(confirmSpy).toBeCalled();
    });
});
test('Should call onConfirm callback directly in case of MemoryFormStore on submit of Form', () => {
    const formStore = new MemoryFormStore_1.default({}, {}, undefined, undefined);
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.shallow)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    formOverlay.find(Form_1.default).props().onSubmit();
    expect(confirmSpy).toBeCalled();
});
test('Should display Snackbar with generic message if an error happens while saving ResourceFormStore', (done) => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    const savePromise = Promise.reject('error');
    formStore.save.mockReturnValueOnce(savePromise);
    formOverlay.find(Form_1.default).props().onSubmit();
    // wait until rejection of savePromise was handled by component with setTimeout
    setTimeout(() => {
        expect(formStore.save).toBeCalled();
        expect(confirmSpy).not.toBeCalled();
        formOverlay.update();
        expect(formOverlay.find(Snackbar_1.default).prop('visible')).toBeTruthy();
        expect(formOverlay.find(Snackbar_1.default).prop('message')).toEqual('sulu_admin.form_save_server_error');
        done();
    });
});
test('Should display Snackbar with message from server if an error happens while saving ResourceFormStore', (done) => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    const savePromise = Promise.reject({ code: 100, detail: 'URL is already assigned to another page.' });
    formStore.save.mockReturnValueOnce(savePromise);
    formOverlay.find(Form_1.default).props().onSubmit();
    // wait until rejection of savePromise was handled by component with setTimeout
    setTimeout(() => {
        expect(formStore.save).toBeCalled();
        expect(confirmSpy).not.toBeCalled();
        formOverlay.update();
        expect(formOverlay.find(Snackbar_1.default).prop('visible')).toBeTruthy();
        expect(formOverlay.find(Snackbar_1.default).prop('message')).toEqual('URL is already assigned to another page.');
        done();
    });
});
test('Should display Snackbar if a form is not valid', () => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    formOverlay.find(Form_1.default).props().onError();
    formOverlay.update();
    expect(formOverlay.find(Snackbar_1.default).prop('visible')).toBeTruthy();
    expect(formOverlay.find(Snackbar_1.default).prop('message')).toEqual('sulu_admin.form_contains_invalid_values');
});
test('Should hide Snackbar when closeClick callback of Snackbar is fired', () => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    formOverlay.find(Form_1.default).props().onError();
    formOverlay.update();
    expect(formOverlay.find(Snackbar_1.default).prop('visible')).toBeTruthy();
    formOverlay.find(Snackbar_1.default).props().onCloseClick();
    formOverlay.update();
    expect(formOverlay.find(Snackbar_1.default).props().visible).toBeFalsy();
});
test('Should clear old errors if Overlay is opened a second time', () => {
    const formStore = new ResourceFormStore_1.default(new ResourceStore_1.default('test'), 'test');
    const confirmSpy = jest.fn();
    const formOverlay = (0, enzyme_1.mount)(<FormOverlay_1.default confirmDisabled={false} confirmLoading={false} confirmText="confirm-text" formStore={formStore} onClose={jest.fn()} onConfirm={confirmSpy} open={true} size="small" title="overlay-title"/>);
    formOverlay.find(Form_1.default).props().onError();
    formOverlay.update();
    expect(formOverlay.find(Snackbar_1.default).prop('visible')).toBeTruthy();
    formOverlay.setProps({ open: false });
    formOverlay.setProps({ open: true });
    formOverlay.update();
    expect(formOverlay.find(Snackbar_1.default).props().visible).toBeFalsy();
});
