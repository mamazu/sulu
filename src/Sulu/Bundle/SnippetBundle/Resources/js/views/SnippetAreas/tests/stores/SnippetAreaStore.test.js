"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const SnippetAreaStore_1 = __importDefault(require("../../stores/SnippetAreaStore"));
jest.mock('sulu-admin-bundle/services', () => ({
    ResourceRequester: {
        getList: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}));
test('Load snippet areas when constructing the store', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            areas: [
                {
                    defaultTitle: 'Default 1',
                    defaultUuid: 'some-uuid-1',
                    key: 'default',
                    template: 'default',
                    title: 'Default',
                },
                {
                    defaultTitle: 'Footer 1',
                    defaultUuid: 'some-uuid-2',
                    key: 'footer',
                    template: 'footer',
                    title: 'Footer',
                },
            ],
        },
    });
    services_1.ResourceRequester.getList.mockReturnValue(listPromise);
    const snippetAreaStore = new SnippetAreaStore_1.default('sulu');
    expect(services_1.ResourceRequester.getList).toBeCalledWith('snippet_areas', { webspace: 'sulu' });
    expect(snippetAreaStore.loading).toEqual(true);
    expect(snippetAreaStore.snippetAreas).toEqual({});
    return listPromise.then(() => {
        expect(snippetAreaStore.loading).toEqual(false);
        expect(snippetAreaStore.snippetAreas).toEqual({
            default: {
                defaultTitle: 'Default 1',
                defaultUuid: 'some-uuid-1',
                key: 'default',
                template: 'default',
                title: 'Default',
            },
            footer: {
                defaultTitle: 'Footer 1',
                defaultUuid: 'some-uuid-2',
                key: 'footer',
                template: 'footer',
                title: 'Footer',
            },
        });
    });
});
test('Save snippet area when save is calld', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            areas: [
                {
                    defaultTitle: 'Default 1',
                    defaultUuid: 'some-uuid-1',
                    key: 'default',
                    template: 'default',
                    title: 'Default',
                },
                {
                    defaultTitle: 'Footer 1',
                    defaultUuid: 'some-uuid-2',
                    key: 'footer',
                    template: 'footer',
                    title: 'Footer',
                },
            ],
        },
    });
    services_1.ResourceRequester.getList.mockReturnValue(listPromise);
    const putPromise = Promise.resolve({
        defaultTitle: 'Footer 2',
        defaultUuid: 'some-uuid-3',
        key: 'footer',
        template: 'footer',
        title: 'Footer',
    });
    services_1.ResourceRequester.put.mockReturnValue(putPromise);
    const snippetAreaStore = new SnippetAreaStore_1.default('sulu');
    snippetAreaStore.save('footer', 'some-uuid-3');
    expect(services_1.ResourceRequester.put)
        .toBeCalledWith('snippet_areas', { defaultUuid: 'some-uuid-3' }, { key: 'footer', webspace: 'sulu' });
    expect(snippetAreaStore.saving).toEqual(true);
    return listPromise.then(() => {
        expect(snippetAreaStore.saving).toEqual(false);
        expect(snippetAreaStore.snippetAreas).toEqual({
            default: {
                defaultTitle: 'Default 1',
                defaultUuid: 'some-uuid-1',
                key: 'default',
                template: 'default',
                title: 'Default',
            },
            footer: {
                defaultTitle: 'Footer 2',
                defaultUuid: 'some-uuid-3',
                key: 'footer',
                template: 'footer',
                title: 'Footer',
            },
        });
    });
});
test('Delete snippet area when delete is calld', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            areas: [
                {
                    defaultTitle: 'Default 1',
                    defaultUuid: 'some-uuid-1',
                    key: 'default',
                    template: 'default',
                    title: 'Default',
                },
                {
                    defaultTitle: 'Footer 1',
                    defaultUuid: 'some-uuid-2',
                    key: 'footer',
                    template: 'footer',
                    title: 'Footer',
                },
            ],
        },
    });
    services_1.ResourceRequester.getList.mockReturnValue(listPromise);
    const deletePromise = Promise.resolve({
        defaultTitle: null,
        defaultUuid: null,
        key: 'footer',
        template: 'footer',
        title: 'Footer',
    });
    services_1.ResourceRequester.delete.mockReturnValue(deletePromise);
    const snippetAreaStore = new SnippetAreaStore_1.default('sulu');
    snippetAreaStore.delete('footer');
    expect(services_1.ResourceRequester.delete)
        .toBeCalledWith('snippet_areas', { key: 'footer', webspace: 'sulu' });
    expect(snippetAreaStore.deleting).toEqual(true);
    return listPromise.then(() => {
        expect(snippetAreaStore.deleting).toEqual(false);
        expect(snippetAreaStore.snippetAreas).toEqual({
            default: {
                defaultTitle: 'Default 1',
                defaultUuid: 'some-uuid-1',
                key: 'default',
                template: 'default',
                title: 'Default',
            },
            footer: {
                defaultTitle: null,
                defaultUuid: null,
                key: 'footer',
                template: 'footer',
                title: 'Footer',
            },
        });
    });
});
