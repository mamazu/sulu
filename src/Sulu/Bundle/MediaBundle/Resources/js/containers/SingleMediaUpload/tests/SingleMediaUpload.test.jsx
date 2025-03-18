"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const SingleMediaUpload_1 = __importDefault(require("../SingleMediaUpload"));
const MediaUploadStore_1 = __importDefault(require("../../../stores/MediaUploadStore"));
jest.mock('../../../stores/MediaUploadStore', () => jest.fn(function (media) {
    this.id = media ? media.id : undefined;
    this.create = jest.fn();
    this.update = jest.fn();
    this.delete = jest.fn();
    this.getThumbnail = jest.fn((size) => size);
    this.downloadUrl = (media === null || media === void 0 ? void 0 : media.adminUrl) || (media === null || media === void 0 ? void 0 : media.url);
    this.media = media;
}));
jest.mock('sulu-admin-bundle/utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
test('Render a SingleMediaUpload', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default collectionId={5} mediaUploadStore={mediaUploadStore} uploadText="Upload media"/>)).toMatchSnapshot();
});
test('Render a SingleMediaUpload in disabled state', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default collectionId={5} disabled={true} mediaUploadStore={mediaUploadStore} uploadText="Upload media"/>)).toMatchSnapshot();
});
test('Render a SingleMediaUpload with an error message from the MediaUploadStore', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({ id: 1, locale: 'en', mimeType: 'image/jpeg', title: 'test', thumbnails: {}, url: '', adminUrl: '' }, mobx_1.observable.box('en'));
    mediaUploadStore.error = {
        'code': 5003,
        'detail': 'The uploaded file exceeds the configured maximum filesize.',
    };
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default collectionId={5} disabled={true} mediaUploadStore={mediaUploadStore} uploadText="Upload media"/>)).toMatchSnapshot();
});
test('Render a SingleMediaUpload with an empty icon if no image is passed', () => {
    const mediaUploadStore = new MediaUploadStore_1.default(undefined, mobx_1.observable.box('en'));
    mediaUploadStore.getThumbnail.mockReturnValue(undefined);
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default collectionId={5} mediaUploadStore={mediaUploadStore} uploadText="Upload media"/>)).toMatchSnapshot();
});
test('Render a SingleMediaUpload with the round skin', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default collectionId={5} mediaUploadStore={mediaUploadStore} skin="round" uploadText="Upload media"/>)).toMatchSnapshot();
});
test('Render a SingleMediaUpload with a different image size', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default mediaUploadStore={mediaUploadStore} uploadText="Upload media"/>)).toMatchSnapshot();
});
test('Render a SingleMediaUpload without delete and download button', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    expect((0, enzyme_1.render)(<SingleMediaUpload_1.default deletable={false} downloadable={false} mediaUploadStore={mediaUploadStore} uploadText="Test"/>)).toMatchSnapshot();
});
test('Call update on MediaUploadStore if id is given and drop event occurs', () => {
    const uploadCompleteSpy = jest.fn();
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    const promise = Promise.resolve({});
    mediaUploadStore.update.mockReturnValue(promise);
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default collectionId={7} mediaUploadStore={mediaUploadStore} onUploadComplete={uploadCompleteSpy} uploadText="Upload media"/>);
    const file = { name: 'test.jpg' };
    singleMediaUpload.find('SingleMediaDropzone').prop('onDrop')(file);
    expect(mediaUploadStore.update).toBeCalledWith(file);
    return promise.then(() => {
        expect(uploadCompleteSpy).toBeCalledWith({});
    });
});
test('Call create with passed collectionId if id is not given and drop event occurs', () => {
    const uploadCompleteSpy = jest.fn();
    const mediaUploadStore = new MediaUploadStore_1.default(undefined, mobx_1.observable.box('en'));
    const promise = Promise.resolve({});
    mediaUploadStore.create.mockReturnValue(promise);
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default collectionId={7} mediaUploadStore={mediaUploadStore} onUploadComplete={uploadCompleteSpy} uploadText="Upload media"/>);
    const file = { name: 'test.jpg' };
    singleMediaUpload.find('SingleMediaDropzone').prop('onDrop')(file);
    expect(mediaUploadStore.create).toBeCalledWith(7, file);
    return promise.then(() => {
        expect(uploadCompleteSpy).toBeCalledWith({});
    });
});
test('Download the image when the download button is clicked', () => {
    delete window.location;
    window.location = { assign: jest.fn() };
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: 'test.jpg',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default mediaUploadStore={mediaUploadStore} uploadText="Upload media"/>);
    singleMediaUpload.find('Button[icon="su-download"]').simulate('click');
    expect(window.location.assign).toBeCalledWith('test.jpg');
});
test('Delete the image when the delete button is clicked and the overlay is confirmed', () => {
    const mediaUploadStore = new MediaUploadStore_1.default({
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
        adminUrl: '',
    }, mobx_1.observable.box('en'));
    const deletePromise = Promise.resolve();
    mediaUploadStore.delete.mockReturnValue(deletePromise);
    const uploadCompleteSpy = jest.fn();
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default mediaUploadStore={mediaUploadStore} onUploadComplete={uploadCompleteSpy} uploadText="Upload media"/>);
    singleMediaUpload.find('Button[icon="su-trash-alt"]').simulate('click');
    expect(singleMediaUpload.find('Dialog').prop('open')).toEqual(true);
    expect(singleMediaUpload.find('Dialog').prop('confirmLoading')).toEqual(false);
    singleMediaUpload.find('Dialog').prop('onConfirm')();
    expect(mediaUploadStore.delete).toBeCalled();
    singleMediaUpload.update();
    expect(singleMediaUpload.find('Dialog').prop('confirmLoading')).toEqual(true);
    return deletePromise.then(() => {
        expect(uploadCompleteSpy).toBeCalled();
        singleMediaUpload.update();
        expect(singleMediaUpload.find('Dialog').prop('open')).toEqual(false);
        expect(singleMediaUpload.find('Dialog').prop('confirmLoading')).toEqual(false);
    });
});
test('Throw exception if neither the collectionId nor the media is given', () => {
    const mediaUploadStore = new MediaUploadStore_1.default(undefined, mobx_1.observable.box('en'));
    expect(() => (0, enzyme_1.shallow)(<SingleMediaUpload_1.default mediaUploadStore={mediaUploadStore} uploadText="UploadMedia"/>)).toThrow('"collectionId"');
});
