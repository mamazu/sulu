"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const SearchStore_1 = __importDefault(require("../SearchStore"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
jest.mock('../../../services/ResourceRequester', () => ({
    getList: jest.fn(),
}));
test('Clear search results from store', () => {
    const searchStore = new SearchStore_1.default('test', []);
    searchStore.searchResults = [{}];
    searchStore.clearSearchResults();
    expect(searchStore.searchResults).toHaveLength(0);
});
test('Send a request using the ResourceRequester when something is being searched', () => {
    const searchStore = new SearchStore_1.default('accounts', ['name', 'number']);
    const searchResults = [{ id: 1, name: 'Sulu' }];
    const searchPromise = Promise.resolve({
        _embedded: {
            accounts: searchResults,
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(searchPromise);
    const autoCompletePromise = searchStore.search('Sulu');
    expect(searchStore.loading).toEqual(true);
    return autoCompletePromise.then(() => {
        expect(ResourceRequester_1.default.getList).toBeCalledWith('accounts', {
            locale: undefined,
            limit: 10,
            page: 1,
            search: 'Sulu',
            searchFields: ['name', 'number'],
        });
        expect(searchStore.searchResults).toEqual(searchResults);
        expect(searchStore.loading).toEqual(false);
    });
});
test('Send a request using the ResourceRequester with given locale when something is being searched', () => {
    const searchStore = new SearchStore_1.default('accounts', ['name', 'number'], {}, mobx_1.observable.box('en'));
    const searchResults = [{ id: 1, name: 'Sulu' }];
    const searchPromise = Promise.resolve({
        _embedded: {
            accounts: searchResults,
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(searchPromise);
    const autoCompletePromise = searchStore.search('Sulu');
    expect(searchStore.loading).toEqual(true);
    return autoCompletePromise.then(() => {
        expect(ResourceRequester_1.default.getList).toBeCalledWith('accounts', {
            locale: 'en',
            limit: 10,
            page: 1,
            search: 'Sulu',
            searchFields: ['name', 'number'],
        });
        expect(searchStore.searchResults).toEqual(searchResults);
        expect(searchStore.loading).toEqual(false);
    });
});
test('Send a request using the ResourceRequester when query is an empty string', () => {
    const searchStore = new SearchStore_1.default('accounts', ['name', 'number']);
    const searchResults = [{ id: 1, name: 'Sulu' }];
    const searchPromise = Promise.resolve({
        _embedded: {
            accounts: searchResults,
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(searchPromise);
    const autoCompletePromise = searchStore.search('');
    expect(searchStore.loading).toEqual(true);
    return autoCompletePromise.then(() => {
        expect(ResourceRequester_1.default.getList).toBeCalledWith('accounts', {
            limit: 10,
            page: 1,
            search: '',
            searchFields: ['name', 'number'],
        });
        expect(searchStore.searchResults).toEqual(searchResults);
        expect(searchStore.loading).toEqual(false);
    });
});
test('Send a request using the ResourceRequester with given options when something is being searched', () => {
    const searchStore = new SearchStore_1.default('accounts', ['name', 'number'], { country: 'US' });
    const searchResults = [{ id: 1, name: 'Sulu' }];
    const searchPromise = Promise.resolve({
        _embedded: {
            accounts: searchResults,
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(searchPromise);
    const autoCompletePromise = searchStore.search('Sulu');
    expect(searchStore.loading).toEqual(true);
    return autoCompletePromise.then(() => {
        expect(ResourceRequester_1.default.getList).toBeCalledWith('accounts', {
            country: 'US',
            locale: undefined,
            limit: 10,
            page: 1,
            search: 'Sulu',
            searchFields: ['name', 'number'],
        });
        expect(searchStore.searchResults).toEqual(searchResults);
        expect(searchStore.loading).toEqual(false);
    });
});
test('Send a request using the ResourceRequester with excludedIds when something is being searched', () => {
    const searchStore = new SearchStore_1.default('accounts', ['name', 'number']);
    const searchResults = [{ id: 1, name: 'Sulu' }];
    const searchPromise = Promise.resolve({
        _embedded: {
            accounts: searchResults,
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(searchPromise);
    const autoCompletePromise = searchStore.search('Sulu', [1, 4]);
    expect(searchStore.loading).toEqual(true);
    return autoCompletePromise.then(() => {
        expect(ResourceRequester_1.default.getList).toBeCalledWith('accounts', {
            excludedIds: [1, 4],
            locale: undefined,
            limit: 10,
            page: 1,
            search: 'Sulu',
            searchFields: ['name', 'number'],
        });
        expect(searchStore.searchResults).toEqual(searchResults);
        expect(searchStore.loading).toEqual(false);
    });
});
test('Reset loading flag in case the request errors', () => {
    const searchStore = new SearchStore_1.default('accounts', ['name', 'number']);
    const searchPromise = Promise.reject();
    ResourceRequester_1.default.getList.mockReturnValue(searchPromise);
    const autoCompletePromise = searchStore.search('Sulu');
    expect(searchStore.loading).toEqual(true);
    return autoCompletePromise.catch(() => {
        expect(searchStore.loading).toEqual(false);
    });
});
