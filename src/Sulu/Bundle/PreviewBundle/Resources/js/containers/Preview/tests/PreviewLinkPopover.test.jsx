"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const mobx_1 = require("mobx");
const enzyme_1 = require("enzyme");
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const ResourceRequester_1 = __importDefault(require("sulu-admin-bundle/services/ResourceRequester"));
const PreviewStore_1 = __importDefault(require("../stores/PreviewStore"));
const PreviewLinkPopover_1 = __importDefault(require("../PreviewLinkPopover"));
jest.mock('copy-to-clipboard', () => jest.fn());
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));
jest.mock('../stores/PreviewStore', () => jest.fn(function (resourceKey, id, locale) {
    this.resourceKey = resourceKey;
    this.id = id;
    this.locale = locale.get();
}));
jest.mock('sulu-admin-bundle/utils', () => ({
    translate: jest.fn((key) => key),
}));
beforeEach(() => {
    jest.resetModules();
    PreviewStore_1.default.endpoints = {
        'preview-link': '/admin/p/:token',
    };
});
test('Render popover when preview link is available and copy link to clipboard', () => {
    const promise = Promise.resolve({
        token: '123-123-123',
    });
    ResourceRequester_1.default.get.mockReturnValue(promise);
    const previewStore = new PreviewStore_1.default('pages', '123-123-123', mobx_1.observable.box('de'), 'sulu_io', undefined);
    const component = (0, enzyme_1.shallow)(<PreviewLinkPopover_1.default previewStore={previewStore}/>);
    return promise.then(() => {
        expect(component).toMatchSnapshot();
        expect(ResourceRequester_1.default.get).toBeCalledWith('preview_links', {
            resourceKey: 'pages',
            resourceId: '123-123-123',
            locale: 'de',
        });
        component.instance().handleCopyClick();
        expect(copy_to_clipboard_1.default).toBeCalledWith('/admin/p/123-123-123');
    });
});
test('Render popover when no link is available', (done) => {
    const promise = Promise.reject({
        status: 404,
    });
    ResourceRequester_1.default.get.mockReturnValue(promise);
    const previewStore = new PreviewStore_1.default('pages', '123-123-123', mobx_1.observable.box('de'), 'sulu_io', undefined);
    const component = (0, enzyme_1.shallow)(<PreviewLinkPopover_1.default previewStore={previewStore}/>);
    setTimeout(() => {
        expect(component).toMatchSnapshot();
        expect(ResourceRequester_1.default.get).toBeCalledWith('preview_links', {
            resourceKey: 'pages',
            resourceId: '123-123-123',
            locale: 'de',
        });
        done();
    });
});
test('Generate link', (done) => {
    const promise = Promise.reject({
        status: 404,
    });
    ResourceRequester_1.default.get.mockReturnValue(promise);
    const previewStore = new PreviewStore_1.default('pages', '123-123-123', mobx_1.observable.box('de'), 'sulu_io', undefined);
    const component = (0, enzyme_1.shallow)(<PreviewLinkPopover_1.default previewStore={previewStore}/>);
    setTimeout(() => {
        const promise = Promise.resolve({
            token: '123-123-123',
        });
        ResourceRequester_1.default.post.mockReturnValue(promise);
        component.instance().handleGenerateClick();
        setTimeout(() => {
            expect(component).toMatchSnapshot();
            expect(ResourceRequester_1.default.post).toBeCalledWith('preview_links', {}, {
                action: 'generate',
                dateTime: undefined,
                resourceKey: 'pages',
                resourceId: '123-123-123',
                locale: 'de',
                segmentKey: undefined,
                targetGroupId: undefined,
                webspaceKey: undefined,
            });
            done();
        });
    });
});
test('Revoke Link', (done) => {
    const promise = Promise.resolve({
        token: '123-123-123',
    });
    ResourceRequester_1.default.get.mockReturnValue(promise);
    const previewStore = new PreviewStore_1.default('pages', '123-123-123', mobx_1.observable.box('de'), 'sulu_io', undefined);
    const component = (0, enzyme_1.shallow)(<PreviewLinkPopover_1.default previewStore={previewStore}/>);
    promise.then(() => {
        const promise = Promise.resolve();
        ResourceRequester_1.default.post.mockReturnValue(promise);
        component.instance().handleRevokeClick({ preventDefault: jest.fn() });
        expect(ResourceRequester_1.default.post.mock.calls[0][0]).toBe('preview_links');
        expect(ResourceRequester_1.default.post.mock.calls[0][1]).toStrictEqual({});
        expect(ResourceRequester_1.default.post.mock.calls[0][2]).toStrictEqual({
            action: 'revoke',
            resourceKey: 'pages',
            resourceId: '123-123-123',
            locale: 'de',
        });
        done();
    });
});
