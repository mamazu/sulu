"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const containers_1 = require("sulu-admin-bundle/containers");
const stores_1 = require("sulu-admin-bundle/stores");
const TestHelper_1 = require("sulu-admin-bundle/utils/TestHelper");
const mobx_1 = require("mobx");
const SingleMediaUpload_1 = __importDefault(require("../../fields/SingleMediaUpload"));
const SingleMediaUpload_2 = __importDefault(require("../../../SingleMediaUpload"));
const MediaUploadStore_1 = __importDefault(require("../../../../stores/MediaUploadStore"));
jest.mock('sulu-admin-bundle/stores/ResourceStore', () => jest.fn(function (resourceKey, id, observableOptions) {
    this.locale = observableOptions.locale;
}));
jest.mock('sulu-admin-bundle/containers/Form/stores/ResourceFormStore', () => jest.fn(function (resourceStore) {
    this.locale = resourceStore.locale;
}));
jest.mock('sulu-admin-bundle/containers/Form/FormInspector', () => jest.fn(function (formStore) {
    this.locale = formStore.locale;
}));
jest.mock('sulu-admin-bundle/stores/userStore', () => ({
    contentLocale: 'userContentLocale',
}));
test('Pass correct props', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 3,
        },
        empty_icon: {
            name: 'empty_icon',
            value: 'su-icon',
        },
        image_size: {
            name: 'image_size',
            value: 'sulu-400x400-inset',
        },
        upload_text: {
            name: 'upload_text',
            infoText: 'Drag and drop',
        },
    };
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} disabled={true} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(singleMediaUpload.prop('collectionId')).toEqual(3);
    expect(singleMediaUpload.prop('emptyIcon')).toEqual('su-icon');
    expect(singleMediaUpload.prop('imageSize')).toEqual('sulu-400x400-inset');
    expect(singleMediaUpload.prop('uploadText')).toEqual('Drag and drop');
    expect(singleMediaUpload.prop('disabled')).toEqual(true);
});
test('Pass correct skin to props', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
        skin: {
            name: 'skin',
            value: 'round',
        },
    };
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(singleMediaUpload.prop('skin')).toEqual('round');
});
test('Throw if emptyIcon is set but not a valid value', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
        empty_icon: {
            name: 'empty_icon',
            value: [],
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('"empty_icon"');
});
test('Throw if skin is set but not a valid value', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
        skin: {
            name: 'skin',
            value: 'test',
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('"default" or "round"');
});
test('Throw if image_size is set but not a valid value', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
        image_size: {
            name: 'image_size',
            value: 3,
        },
    };
    expect(() => (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('"image_size"');
});
test('Throw if collectionId is not set', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {};
    expect(() => (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>)).toThrow('"collection_id"');
});
test('Call onChange and onFinish when upload has completed', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const changeSpy = jest.fn();
    const finishSpy = jest.fn();
    const media = { name: 'test.jpg' };
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
    };
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} onChange={changeSpy} onFinish={finishSpy} schemaOptions={schemaOptions}/>);
    singleMediaUpload.find(SingleMediaUpload_2.default).simulate('uploadComplete', media);
    expect(changeSpy).toBeCalledWith(media);
    expect(finishSpy).toBeCalledWith();
});
test('Create a MediaUploadStore when constructed', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
    };
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(singleMediaUpload.instance().mediaUploadStore).toBeInstanceOf(MediaUploadStore_1.default);
    expect(singleMediaUpload.instance().mediaUploadStore.locale.get()).toEqual('en');
    expect(singleMediaUpload.instance().mediaUploadStore.media).toEqual(undefined);
});
test('Create MediaUploadStore with content-locale of user if locale is not present in form-inspector', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, {}), 'test'));
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
    };
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions}/>);
    expect(singleMediaUpload.instance().mediaUploadStore).toBeInstanceOf(MediaUploadStore_1.default);
    expect(singleMediaUpload.instance().mediaUploadStore.locale.get()).toEqual('userContentLocale');
});
test('Create a MediaUploadStore when constructed with data', () => {
    const formInspector = new containers_1.FormInspector(new containers_1.ResourceFormStore(new stores_1.ResourceStore('test', undefined, { locale: mobx_1.observable.box('en') }), 'test'));
    const data = {
        adminUrl: '',
        id: 1,
        locale: 'en',
        mimeType: 'image/jpeg',
        title: 'test',
        thumbnails: {},
        url: '',
    };
    const schemaOptions = {
        collection_id: {
            name: 'collection_id',
            value: 2,
        },
    };
    const singleMediaUpload = (0, enzyme_1.shallow)(<SingleMediaUpload_1.default {...TestHelper_1.fieldTypeDefaultProps} formInspector={formInspector} schemaOptions={schemaOptions} value={data}/>);
    expect(singleMediaUpload.instance().mediaUploadStore).toBeInstanceOf(MediaUploadStore_1.default);
    expect(singleMediaUpload.instance().mediaUploadStore.media).toEqual(data);
});
