"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("url-search-params-polyfill");
const ResourceRequester_1 = __importDefault(require("../ResourceRequester"));
const Requester_1 = __importDefault(require("../../Requester/Requester"));
const resourceRouteRegistry_1 = __importDefault(require("../registries/resourceRouteRegistry"));
jest.mock('../../Requester/Requester', () => ({
    get: jest.fn(),
    patch: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
}));
jest.mock('../registries/resourceRouteRegistry', () => ({
    getUrl: jest.fn(),
}));
test('Should send a get request and return the promise', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5');
    const promise = {};
    Requester_1.default.get.mockReturnValue(promise);
    const result = ResourceRequester_1.default.get('snippets', { id: 5 });
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', { id: 5 });
    expect(Requester_1.default.get).toBeCalledWith('/snippets/5');
    expect(result).toBe(promise);
});
test('Should send a get request without an ID and return the promise', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets');
    const promise = {};
    Requester_1.default.get.mockReturnValue(promise);
    const result = ResourceRequester_1.default.get('snippets');
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', {});
    expect(Requester_1.default.get).toBeCalledWith('/snippets');
    expect(result).toBe(promise);
});
test('Should send a get request with passed options as query parameters', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5?locale=en&action=publish');
    const options = { id: 5, locale: 'en', action: 'publish' };
    ResourceRequester_1.default.get('snippets', options);
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', options);
    expect(Requester_1.default.get).toBeCalledWith('/snippets/5?locale=en&action=publish');
});
test('Should send a list get request and return the promise', () => {
    const promise = {};
    Requester_1.default.get.mockReturnValue(promise);
    const result = ResourceRequester_1.default.getList('snippets', { page: 1, limit: 10 });
    expect(result).toBe(promise);
});
test('Should send a list get request to the correct URL with page and limit parameters', () => {
    resourceRouteRegistry_1.default.getUrl.mockImplementation((type, resourceKey, { flat, limit, page, }) => {
        return '/snippets?page=' + page + '&limit=' + limit + '&flat=' + flat;
    });
    ResourceRequester_1.default.getList('snippets', {
        limit: 20,
        page: 3,
    });
    expect(Requester_1.default.get).toHaveBeenLastCalledWith('/snippets?page=3&limit=20&flat=true');
    ResourceRequester_1.default.getList('snippets', {
        limit: 10,
        page: 5,
    });
    expect(Requester_1.default.get).toHaveBeenLastCalledWith('/snippets?page=5&limit=10&flat=true');
    ResourceRequester_1.default.getList('snippets', {
        limit: 5,
        page: 1,
    });
    expect(Requester_1.default.get).toHaveBeenLastCalledWith('/snippets?page=1&limit=5&flat=true');
    ResourceRequester_1.default.getList('snippets', {
        flat: false,
        limit: 5,
        page: 1,
    });
    expect(Requester_1.default.get).toHaveBeenLastCalledWith('/snippets?page=1&limit=5&flat=true');
});
test('Should send a put request and return the promise', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5');
    const promise = {};
    const data = { title: 'Title' };
    Requester_1.default.put.mockReturnValue(promise);
    const result = ResourceRequester_1.default.put('snippets', data, { id: 5 });
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', { id: 5 });
    expect(Requester_1.default.put).toBeCalledWith('/snippets/5', data);
    expect(result).toBe(promise);
});
test('Should send a put request with passed options as query parameters', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5?locale=en&action=publish');
    const data = { slogan: 'Slogan' };
    const options = { action: 'publish', id: 5, locale: 'en' };
    Requester_1.default.put.mockReturnValue({});
    ResourceRequester_1.default.put('snippets', data, options);
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', { action: 'publish', id: 5, locale: 'en' });
    expect(Requester_1.default.put).toBeCalledWith('/snippets/5?locale=en&action=publish', data);
});
test('Should send a patch request and return the promise', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5');
    const promise = {};
    const data = { title: 'Title' };
    Requester_1.default.patch.mockReturnValue(promise);
    const result = ResourceRequester_1.default.patch('snippets', data, { id: 5 });
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', { id: 5 });
    expect(Requester_1.default.patch).toBeCalledWith('/snippets/5', data);
    expect(result).toBe(promise);
});
test('Should send a patch request with passed options as query parameters', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5?locale=en&action=publish');
    const data = { slogan: 'Slogan' };
    const options = { action: 'publish', id: 5, locale: 'en' };
    Requester_1.default.patch.mockReturnValue({});
    ResourceRequester_1.default.patch('snippets', data, options);
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', { action: 'publish', id: 5, locale: 'en' });
    expect(Requester_1.default.patch).toBeCalledWith('/snippets/5?locale=en&action=publish', data);
});
test('Should send a delete request and return the promise', () => {
    const promise = {};
    Requester_1.default.delete.mockReturnValue(promise);
    const result = ResourceRequester_1.default.delete('snippets', { id: 1 });
    expect(result).toBe(promise);
});
test('Should send a delete request to the correct URL', () => {
    resourceRouteRegistry_1.default.getUrl
        .mockImplementation((type, resourceKey, { id, }) => '/' + resourceKey + '/' + id);
    ResourceRequester_1.default.delete('snippets', { id: 5 });
    expect(Requester_1.default.delete).toBeCalledWith('/snippets/5');
    ResourceRequester_1.default.delete('contacts', { id: 9 });
    expect(Requester_1.default.delete).toBeCalledWith('/contacts/9');
});
test('Should send a delete request with passed options as query parameters', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets/5?locale=en&webspace=sulu');
    const options = { id: 5, locale: 'en', webspace: 'sulu' };
    Requester_1.default.delete.mockReturnValue({});
    ResourceRequester_1.default.delete('snippets', options);
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', { id: 5, locale: 'en', webspace: 'sulu' });
    expect(Requester_1.default.delete).toBeCalledWith('/snippets/5?locale=en&webspace=sulu');
});
test('Should send a delete request and return the promise', () => {
    const promise = {};
    Requester_1.default.delete.mockReturnValue(promise);
    const result = ResourceRequester_1.default.deleteList('snippets', { ids: [3] });
    expect(result).toBe(promise);
});
test('Should send a collection delete request to the correct URL', () => {
    resourceRouteRegistry_1.default.getUrl
        .mockImplementation((type, resourceKey, { ids, }) => '/' + resourceKey + '?ids=' + ids.join(','));
    ResourceRequester_1.default.deleteList('snippets', { ids: [1, 2, 3] });
    expect(Requester_1.default.delete).toBeCalledWith('/snippets?ids=1,2,3');
    ResourceRequester_1.default.deleteList('contacts', { ids: [4, 5, 6] });
    expect(Requester_1.default.delete).toBeCalledWith('/contacts?ids=4,5,6');
});
test('Should send a post request and return the promise', () => {
    resourceRouteRegistry_1.default.getUrl.mockReturnValue('/snippets');
    const promise = {};
    Requester_1.default.post.mockReturnValue(promise);
    const result = ResourceRequester_1.default.post('snippets', {});
    expect(resourceRouteRegistry_1.default.getUrl).toBeCalledWith('detail', 'snippets', {});
    expect(Requester_1.default.post).toBeCalledWith('/snippets', {});
    expect(result).toBe(promise);
});
