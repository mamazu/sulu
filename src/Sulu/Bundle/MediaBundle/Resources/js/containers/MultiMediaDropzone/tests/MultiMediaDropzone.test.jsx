"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const mousetrap_1 = __importDefault(require("mousetrap"));
const containers_1 = require("sulu-admin-bundle/containers");
const MultiMediaDropzone_1 = __importDefault(require("../MultiMediaDropzone"));
const MediaUploadStore_1 = __importDefault(require("../../../stores/MediaUploadStore"));
jest.useFakeTimers();
let mockedMediaUploadStorePromises = [];
beforeEach(() => {
    mockedMediaUploadStorePromises = [];
});
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: (key) => key,
}));
jest.mock('../../../stores/MediaUploadStore', () => jest.fn(function () {
    this.create = jest.fn((_, file) => {
        if (file.name === 'invalid-file') {
            const rejectPromise = Promise.reject({
                'code': 5003,
                'detail': 'The uploaded file exceeds the configured maximum filesize.',
            });
            mockedMediaUploadStorePromises.push(rejectPromise);
            return rejectPromise;
        }
        const resolvePromise = Promise.resolve({
            id: 123,
        });
        mockedMediaUploadStorePromises.push(resolvePromise);
        return resolvePromise;
    });
    this.progress = 45;
    this.getThumbnail = jest.fn((size) => {
        switch (size) {
            case 'sulu-400x-inset':
                return 'http://lorempixel.com/400/250';
        }
    });
}));
jest.mock('sulu-admin-bundle/containers/SingleListOverlay', () => jest.fn(function () {
    return <div>single-list-overlay-mock</div>;
}));
test('Render a MultiMediaDropzone', () => {
    expect((0, enzyme_1.render)(<MultiMediaDropzone_1.default collectionId={3} locale={mobx_1.observable.box()} onClose={jest.fn()} onOpen={jest.fn()} onUpload={jest.fn()} onUploadError={jest.fn()} open={false}>
            <div />
        </MultiMediaDropzone_1.default>)).toMatchSnapshot();
});
test('Render the DropzoneOverlay when the open prop is set to true', () => {
    const multiMediaDropzone = (0, enzyme_1.mount)(<MultiMediaDropzone_1.default collectionId={3} locale={mobx_1.observable.box()} onClose={jest.fn()} onOpen={jest.fn()} onUpload={jest.fn()} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    expect(multiMediaDropzone.find('DropzoneOverlay')).toHaveLength(1);
    expect(multiMediaDropzone.find('DropzoneOverlay').prop('open')).toBeTruthy();
});
test('Component pass correct props to Dropzone component', () => {
    const multiMediaDropzone = (0, enzyme_1.shallow)(<MultiMediaDropzone_1.default accept="application/json" collectionId={3} disabled={false} locale={mobx_1.observable.box()} onClose={jest.fn()} onOpen={jest.fn()} onUpload={jest.fn()} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    expect(multiMediaDropzone.find('Dropzone').props()).toEqual(expect.objectContaining({
        accept: { 'application/json': [] },
        disabled: false,
        noClick: true,
    }));
});
test('Disable dropzone if disabled prop is set to true', () => {
    const multiMediaDropzone = (0, enzyme_1.mount)(<MultiMediaDropzone_1.default collectionId={3} disabled={false} locale={mobx_1.observable.box()} onClose={jest.fn()} onOpen={jest.fn()} onUpload={jest.fn()} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    expect(multiMediaDropzone.find('Dropzone').prop('disabled')).toBeFalsy();
    multiMediaDropzone.setProps({ disabled: true });
    expect(multiMediaDropzone.find('Dropzone').prop('disabled')).toBeTruthy();
});
test('Render media item in dropzone overlay while it is being uploaded', () => {
    const locale = mobx_1.observable.box('en');
    const uploadSpy = jest.fn();
    const multiMediaDropzone = (0, enzyme_1.mount)(<MultiMediaDropzone_1.default collectionId={3} locale={locale} onClose={jest.fn()} onOpen={jest.fn()} onUpload={uploadSpy} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    const files = [
        new File([''], 'fileA'),
        new File([''], 'fileB'),
    ];
    multiMediaDropzone.instance().handleDrop(files);
    multiMediaDropzone.update();
    expect(multiMediaDropzone.find('DropzoneOverlay MediaItem')).toHaveLength(2);
});
test('Should display overlay for selecting collection when file is dropped and no collectionId is given', () => {
    const locale = mobx_1.observable.box('en');
    const uploadSpy = jest.fn();
    const closeSpy = jest.fn();
    const multiMediaDropzone = (0, enzyme_1.shallow)(<MultiMediaDropzone_1.default collectionId={undefined} locale={locale} onClose={closeSpy} onOpen={jest.fn()} onUpload={uploadSpy} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    expect(multiMediaDropzone.find(containers_1.SingleListOverlay).prop('open')).toBeFalsy();
    const files = [
        new File([''], 'fileA'),
        new File([''], 'fileB'),
    ];
    multiMediaDropzone.find('Dropzone').props().onDrop(files);
    expect(MediaUploadStore_1.default).not.toBeCalled();
    expect(multiMediaDropzone.find(containers_1.SingleListOverlay).prop('open')).toBeTruthy();
});
test('Should upload media after selecting collection in overlay when file is dropped without collectionId', () => {
    const locale = mobx_1.observable.box('en');
    const uploadSpy = jest.fn();
    const closeSpy = jest.fn();
    const multiMediaDropzone = (0, enzyme_1.shallow)(<MultiMediaDropzone_1.default collectionId={undefined} locale={locale} onClose={closeSpy} onOpen={jest.fn()} onUpload={uploadSpy} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    const files = [
        new File([''], 'fileA'),
    ];
    multiMediaDropzone.find('Dropzone').props().onDrop(files);
    multiMediaDropzone.find(containers_1.SingleListOverlay).prop('onConfirm')({ id: 1234 });
    const mediaUploadStore1 = MediaUploadStore_1.default.mock.instances[0];
    expect(mediaUploadStore1.create).toBeCalledWith(1234, files[0]);
    expect(multiMediaDropzone.instance().mediaUploadStores.length).toBe(1);
    return Promise.allSettled(mockedMediaUploadStorePromises).then(() => {
        jest.runAllTimers();
        expect(uploadSpy).toBeCalledWith([{ id: 123 }]);
        expect(multiMediaDropzone.instance().mediaUploadStores.length).toBe(0);
        expect(closeSpy).toBeCalled();
    });
});
test('Should not upload media when closing overlay for selecting collection after file is dropped', () => {
    const locale = mobx_1.observable.box('en');
    const uploadSpy = jest.fn();
    const closeSpy = jest.fn();
    const multiMediaDropzone = (0, enzyme_1.shallow)(<MultiMediaDropzone_1.default collectionId={undefined} locale={locale} onClose={closeSpy} onOpen={jest.fn()} onUpload={uploadSpy} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    const files = [
        new File([''], 'fileA'),
    ];
    multiMediaDropzone.find('Dropzone').props().onDrop(files);
    expect(MediaUploadStore_1.default).not.toBeCalled();
    expect(multiMediaDropzone.find(containers_1.SingleListOverlay).prop('open')).toBeTruthy();
    multiMediaDropzone.find(containers_1.SingleListOverlay).prop('onClose')();
    expect(MediaUploadStore_1.default).not.toBeCalled();
    expect(multiMediaDropzone.find(containers_1.SingleListOverlay).prop('open')).toBeFalsy();
});
test('Should upload media when collectionId is set and file is dropped into the dropzone', () => {
    const locale = mobx_1.observable.box('en');
    const uploadSpy = jest.fn();
    const closeSpy = jest.fn();
    const multiMediaDropzone = (0, enzyme_1.shallow)(<MultiMediaDropzone_1.default collectionId={3} locale={locale} onClose={closeSpy} onOpen={jest.fn()} onUpload={uploadSpy} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    const files = [
        new File([''], 'fileA'),
        new File([''], 'fileB'),
    ];
    multiMediaDropzone.find('Dropzone').props().onDrop(files);
    const mediaUploadStore1 = MediaUploadStore_1.default.mock.instances[0];
    const mediaUploadStore2 = MediaUploadStore_1.default.mock.instances[1];
    expect(mediaUploadStore1.create).toBeCalledWith(3, files[0]);
    expect(mediaUploadStore2.create).toBeCalledWith(3, files[1]);
    expect(multiMediaDropzone.instance().mediaUploadStores.length).toBe(2);
    expect(closeSpy).not.toBeCalled();
    return Promise.allSettled(mockedMediaUploadStorePromises).then(() => {
        jest.runAllTimers();
        expect(uploadSpy).toBeCalledWith([
            { id: 123 },
            { id: 123 },
        ]);
        expect(multiMediaDropzone.instance().mediaUploadStores.length).toBe(0);
        expect(closeSpy).toBeCalledWith();
    });
});
test('Should fire onClose and onUploadError callback if an error happens when uploading media', () => {
    const locale = mobx_1.observable.box('en');
    const uploadErrorSpy = jest.fn();
    const closeSpy = jest.fn();
    const multiMediaDropzone = (0, enzyme_1.shallow)(<MultiMediaDropzone_1.default collectionId={3} locale={locale} onClose={closeSpy} onOpen={jest.fn()} onUpload={jest.fn()} onUploadError={uploadErrorSpy} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    multiMediaDropzone.find('Dropzone').props().onDrop([
        new File([''], 'fileA'),
        new File([''], 'invalid-file'),
        new File([''], 'invalid-file'),
    ]);
    expect(closeSpy).not.toBeCalled();
    return Promise.allSettled(mockedMediaUploadStorePromises).then(() => {
        jest.runAllTimers();
        expect(closeSpy).toBeCalledWith();
        expect(multiMediaDropzone.instance().mediaUploadStores.length).toBe(0);
        expect(uploadErrorSpy).toBeCalledWith([
            {
                'code': 5003,
                'detail': 'The uploaded file exceeds the configured maximum filesize.',
            },
            {
                'code': 5003,
                'detail': 'The uploaded file exceeds the configured maximum filesize.',
            },
        ]);
    });
});
test('Should fire close callback when escape button is pressed', () => {
    const locale = mobx_1.observable.box('en');
    const closeSpy = jest.fn();
    (0, enzyme_1.mount)(<MultiMediaDropzone_1.default collectionId={3} locale={locale} onClose={closeSpy} onOpen={jest.fn()} onUpload={jest.fn()} onUploadError={jest.fn()} open={true}>
            <div />
        </MultiMediaDropzone_1.default>);
    expect(closeSpy).not.toBeCalled();
    mousetrap_1.default.trigger('esc');
    expect(closeSpy).toBeCalledWith();
});
