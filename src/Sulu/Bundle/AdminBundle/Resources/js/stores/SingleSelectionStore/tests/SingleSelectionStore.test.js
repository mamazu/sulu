"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const SingleSelectionStore_1 = __importDefault(require("../SingleSelectionStore"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
jest.mock('../../../services/ResourceRequester', () => ({
    get: jest.fn().mockReturnValue(Promise.resolve({})),
}));
test('Should load item when being constructed', () => {
    const getPromise = Promise.resolve({
        id: 1,
    });
    ResourceRequester_1.default.get.mockReturnValue(getPromise);
    const singleSelectionStore = new SingleSelectionStore_1.default('snippets', 1, mobx_1.observable.box('en'));
    expect(ResourceRequester_1.default.get).toBeCalledWith('snippets', {
        id: 1,
        locale: 'en',
    });
    return getPromise.then(() => {
        expect((0, mobx_1.toJS)(singleSelectionStore.item)).toEqual({ id: 1 });
    });
});
test('Should set item to null when 404 is returned', (done) => {
    const getPromise = Promise.reject({
        status: 404,
    });
    ResourceRequester_1.default.get.mockReturnValue(getPromise);
    const singleSelectionStore = new SingleSelectionStore_1.default('snippets', 1, mobx_1.observable.box('en'));
    expect(ResourceRequester_1.default.get).toBeCalledWith('snippets', {
        id: 1,
        locale: 'en',
    });
    expect((0, mobx_1.toJS)(singleSelectionStore.loading)).toEqual(true);
    setTimeout(() => {
        expect((0, mobx_1.toJS)(singleSelectionStore.item)).toEqual(null);
        expect((0, mobx_1.toJS)(singleSelectionStore.loading)).toEqual(false);
        done();
    });
});
test('Should load item when being constructed with additional options', () => {
    const getPromise = Promise.resolve({
        id: 1,
    });
    ResourceRequester_1.default.get.mockReturnValue(getPromise);
    const singleSelectionStore = new SingleSelectionStore_1.default('snippets', 1, mobx_1.observable.box('en'), { test: 'value' });
    expect(ResourceRequester_1.default.get).toBeCalledWith('snippets', {
        id: 1,
        locale: 'en',
        test: 'value',
    });
    return getPromise.then(() => {
        expect((0, mobx_1.toJS)(singleSelectionStore.item)).toEqual({ id: 1 });
    });
});
test('Should not load item but replace current selection with undefined if no itemId is given', () => {
    const selectionStore = new SingleSelectionStore_1.default('snippets', undefined, mobx_1.observable.box('en'));
    selectionStore.item = { id: 1 };
    selectionStore.loadItem(undefined);
    expect(ResourceRequester_1.default.get).not.toBeCalled();
    expect((0, mobx_1.toJS)(selectionStore.item)).toEqual(undefined);
});
test('Should load items when being constructed without a locale', () => {
    const getPromise = Promise.resolve({
        id: 1,
    });
    ResourceRequester_1.default.get.mockReturnValue(getPromise);
    const singleSelectionStore = new SingleSelectionStore_1.default('snippets', 2);
    expect(ResourceRequester_1.default.get).toBeCalledWith('snippets', {
        id: 2,
        locale: undefined,
    });
    return getPromise.then(() => {
        expect((0, mobx_1.toJS)(singleSelectionStore.item)).toEqual({ id: 1 });
    });
});
test('Should set all item on the store', () => {
    const singleSelectionStore = new SingleSelectionStore_1.default('snippets', undefined, mobx_1.observable.box('en'));
    expect(singleSelectionStore.item).toEqual(undefined);
    singleSelectionStore.set({ id: 3 });
    expect(singleSelectionStore.item).toEqual({ id: 3 });
});
