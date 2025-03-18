"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const mobx_1 = require("mobx");
const test_utils_1 = require("react-dom/test-utils");
const router_1 = __importDefault(require("fos-jsrouting/router"));
const loglevel_1 = __importDefault(require("loglevel"));
const ListStore_1 = __importDefault(require("../../../../containers/List/stores/ListStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const ResourceStore_1 = __importDefault(require("../../../../stores/ResourceStore"));
const List_1 = __importDefault(require("../../../../views/List"));
const UploadToolbarAction_1 = __importDefault(require("../../toolbarActions/UploadToolbarAction"));
const services_1 = require("../../../../services");
jest.mock('loglevel', () => ({
    warn: jest.fn(),
}));
jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));
jest.mock('../../../../containers/List/stores/ListStore', () => jest.fn(function () {
    this.reload = jest.fn();
}));
jest.mock('../../../../views/List/List', () => jest.fn(function () {
    this.errors = [];
}));
jest.mock('../../../../services/Router', () => jest.fn(function () {
    this.attributes = {
        locale: 'en',
    };
}));
jest.mock('../../../../services/Requester', () => ({
    fetch: jest.fn(),
}));
function createUploadToolbarAction(options = {}) {
    const router = new Router_1.default({});
    const listStore = new ListStore_1.default('test', 'test', 'test', { page: mobx_1.observable.box(1) });
    const list = new List_1.default({
        route: router.route,
        router,
    });
    const locales = [];
    const resourceStore = new ResourceStore_1.default('test');
    return new UploadToolbarAction_1.default(listStore, list, router, locales, resourceStore, options);
}
test('Should correctly render node', () => {
    const uploadToolbarAction = createUploadToolbarAction({
        label: 'foo',
        icon: 'su-times',
        route_name: 'foo',
        request_parameters: {
            foo: 'bar',
            baz: 'foo',
        },
        router_attributes_to_request: {
            '0': 'locale',
            'locale': 'locale2',
        },
        accept: ['text/csv'],
        min_size: 1000,
        max_size: 9999,
        multiple: false,
    });
    expect((0, enzyme_1.render)(uploadToolbarAction.getNode())).toMatchSnapshot();
});
test('Should return config for toolbar item', () => {
    const uploadToolbarAction = createUploadToolbarAction();
    expect(uploadToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        icon: 'su-upload',
        label: 'sulu_admin.upload',
        type: 'button',
    }));
});
test('Should return custom config for toolbar item', () => {
    const uploadToolbarAction = createUploadToolbarAction({
        label: 'foo',
        icon: 'bar',
    });
    expect(uploadToolbarAction.getToolbarItemConfig()).toEqual(expect.objectContaining({
        icon: 'bar',
        label: 'foo',
        type: 'button',
    }));
});
test('Should make xhr request on confirm', () => {
    const promise = Promise.resolve({
        status: 200,
        statusText: '',
        ok: true,
    });
    services_1.Requester.fetch.mockReturnValue(promise);
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const uploadToolbarAction = createUploadToolbarAction({
        route_name: 'foo',
        request_parameters: {
            foo: 'bar',
            baz: 'foo',
        },
        router_attributes_to_request: {
            '0': 'locale',
            'locale': 'locale2',
        },
    });
    const toolbarItemConfig = uploadToolbarAction.getToolbarItemConfig();
    (0, test_utils_1.act)(() => {
        toolbarItemConfig.onClick();
    });
    uploadToolbarAction.handleConfirm([new File(['foo'], 'foo.jpg')]);
    expect(services_1.Requester.fetch).toBeCalledWith('foo?locale=en&locale2=en&foo=bar&baz=foo', expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    }));
    return promise.then(() => {
        expect(uploadToolbarAction.listStore.reload).toBeCalled();
    });
});
test('Should display errors if dropzone error occurs', () => {
    const uploadToolbarAction = createUploadToolbarAction({
        route_name: 'foo',
        multiple: true,
        min_size: 3000,
        max_size: 4000,
    });
    const toolbarItemConfig = uploadToolbarAction.getToolbarItemConfig();
    (0, test_utils_1.act)(() => {
        toolbarItemConfig.onClick();
    });
    uploadToolbarAction.handleError([
        {
            file: {
                name: 'file-invalid-type.jpg',
            },
            errors: [
                {
                    code: 'file-invalid-type',
                },
                {
                    code: 'too-many-files',
                },
            ],
        },
        {
            file: {
                name: 'file-too-large.jpg',
            },
            errors: [
                {
                    code: 'file-too-large',
                },
                {
                    code: 'too-many-files',
                },
            ],
        },
        {
            file: {
                name: 'file-too-small.jpg',
            },
            errors: [
                {
                    code: 'file-too-small',
                },
                {
                    code: 'too-many-files',
                },
            ],
        },
        {
            file: {
                name: 'not-existing-code.jpg',
            },
            errors: [
                {
                    code: 'not-existing-code',
                },
                {
                    code: 'too-many-files',
                },
            ],
        },
    ]);
    expect(uploadToolbarAction.errors).toEqual([
        'sulu_admin.dropzone_error_file-invalid-type',
        'sulu_admin.dropzone_error_file-too-large',
        'sulu_admin.dropzone_error_file-too-small',
        'sulu_admin.unexpected_upload_error',
        'sulu_admin.dropzone_error_too-many-files',
    ]);
    expect(uploadToolbarAction.list.errors).toEqual([
        'sulu_admin.dropzone_error_file-invalid-type',
        'sulu_admin.dropzone_error_file-too-large',
        'sulu_admin.dropzone_error_file-too-small',
        'sulu_admin.unexpected_upload_error',
        'sulu_admin.dropzone_error_too-many-files',
    ]);
    uploadToolbarAction.setDropzoneRef({ open: jest.fn() });
    uploadToolbarAction.handleClick();
    expect(uploadToolbarAction.errors).toEqual([]);
    expect(uploadToolbarAction.list.errors).toEqual([]);
});
test('Should display error if server error occurs', () => {
    const jsonPromise = Promise.resolve({ code: 1005 });
    const fetchPromise = Promise.resolve({
        status: 400,
        statusText: '',
        ok: false,
        json: () => jsonPromise,
    });
    services_1.Requester.fetch.mockReturnValue(fetchPromise);
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const uploadToolbarAction = createUploadToolbarAction({
        route_name: 'foo',
    });
    const toolbarItemConfig = uploadToolbarAction.getToolbarItemConfig();
    (0, test_utils_1.act)(() => {
        toolbarItemConfig.onClick();
    });
    uploadToolbarAction.handleConfirm([new File(['foo'], 'foo.jpg')]);
    expect(services_1.Requester.fetch).toBeCalledWith('foo?', expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    }));
    return Promise.all([fetchPromise, jsonPromise]).then(() => {
        expect(uploadToolbarAction.errors).toEqual([
            'sulu_admin.unexpected_upload_error',
        ]);
        expect(uploadToolbarAction.list.errors).toEqual([
            'sulu_admin.unexpected_upload_error',
        ]);
        uploadToolbarAction.setDropzoneRef({ open: jest.fn() });
        uploadToolbarAction.handleClick();
        expect(uploadToolbarAction.errors).toEqual([]);
        expect(uploadToolbarAction.list.errors).toEqual([]);
    });
});
test('Should display error message returned by server if server error occurs', () => {
    const jsonPromise = Promise.resolve({ detail: 'server-error-message' });
    const fetchPromise = Promise.resolve({
        status: 400,
        statusText: '',
        ok: false,
        json: () => jsonPromise,
    });
    services_1.Requester.fetch.mockReturnValue(fetchPromise);
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const uploadToolbarAction = createUploadToolbarAction({
        route_name: 'foo',
    });
    const toolbarItemConfig = uploadToolbarAction.getToolbarItemConfig();
    (0, test_utils_1.act)(() => {
        toolbarItemConfig.onClick();
    });
    uploadToolbarAction.handleConfirm([new File(['foo'], 'foo.jpg')]);
    expect(services_1.Requester.fetch).toBeCalledWith('foo?', expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    }));
    return Promise.all([fetchPromise, jsonPromise]).then(() => {
        expect(uploadToolbarAction.errors).toEqual([
            'server-error-message',
        ]);
        expect(uploadToolbarAction.list.errors).toEqual([
            'server-error-message',
        ]);
        uploadToolbarAction.setDropzoneRef({ open: jest.fn() });
        uploadToolbarAction.handleClick();
        expect(uploadToolbarAction.errors).toEqual([]);
        expect(uploadToolbarAction.list.errors).toEqual([]);
    });
});
test('Should display error message from deprecated errorCodeMapping option if server error occurs', () => {
    const jsonPromise = Promise.resolve({ code: 1005 });
    const fetchPromise = Promise.resolve({
        status: 400,
        statusText: '',
        ok: false,
        json: () => jsonPromise,
    });
    services_1.Requester.fetch.mockReturnValue(fetchPromise);
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const uploadToolbarAction = createUploadToolbarAction({
        route_name: 'foo',
        errorCodeMapping: {
            '400': 'sulu_admin.bad_request',
        },
    });
    const toolbarItemConfig = uploadToolbarAction.getToolbarItemConfig();
    (0, test_utils_1.act)(() => {
        toolbarItemConfig.onClick();
    });
    uploadToolbarAction.handleConfirm([new File(['foo'], 'foo.jpg')]);
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "errorCodeMapping" option is deprecated'));
    expect(services_1.Requester.fetch).toBeCalledWith('foo?', expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        credentials: 'same-origin',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    }));
    return Promise.all([fetchPromise, jsonPromise]).then(() => {
        expect(uploadToolbarAction.errors).toEqual([
            'sulu_admin.bad_request',
        ]);
        expect(uploadToolbarAction.list.errors).toEqual([
            'sulu_admin.bad_request',
        ]);
        uploadToolbarAction.setDropzoneRef({ open: jest.fn() });
        uploadToolbarAction.handleClick();
        expect(uploadToolbarAction.errors).toEqual([]);
        expect(uploadToolbarAction.list.errors).toEqual([]);
    });
});
test('Should log warnings for deprecated options', () => {
    createUploadToolbarAction({
        routeName: 'foo',
        requestParameters: {
            foo: 'bar',
            baz: 'foo',
        },
        routerAttributesToRequest: {
            '0': 'locale',
            'locale': 'locale2',
        },
        minSize: 1000,
        maxSize: 9999,
    });
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "routeName" option is deprecated'));
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "requestParameters" option is deprecated'));
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "routerAttributesToRequest" option is deprecated'));
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "minSize" option is deprecated'));
    expect(loglevel_1.default.warn).toBeCalledWith(expect.stringContaining('The "maxSize" option is deprecated'));
});
