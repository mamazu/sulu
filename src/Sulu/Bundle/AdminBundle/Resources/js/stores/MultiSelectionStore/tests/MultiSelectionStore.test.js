"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const MultiSelectionStore_1 = __importDefault(require("../MultiSelectionStore"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
jest.mock('../../../services/ResourceRequester', () => ({
    getList: jest.fn().mockReturnValue(Promise.resolve({})),
}));
test('Should load items with correct paramters when being constructed', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 3, 4], mobx_1.observable.box('en'), 'ids', { additionalKey: 'some-value' });
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,3,4',
        limit: undefined,
        locale: 'en',
        page: 1,
        additionalKey: 'some-value',
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
        ]);
    });
});
test('Should not load items but replace current selection with empty array when no itemIds are given', () => {
    const selectionStore = new MultiSelectionStore_1.default('snippets', [], mobx_1.observable.box('en'));
    selectionStore.items = [{ id: 1 }];
    selectionStore.loadItems(undefined);
    expect(ResourceRequester_1.default.getList).not.toBeCalled();
    expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([]);
});
test('Should return item ids', () => {
    const selectionStore = new MultiSelectionStore_1.default('snippets', [], mobx_1.observable.box('en'));
    selectionStore.items = [{ id: 1 }, { id: 4 }];
    expect((0, mobx_1.toJS)(selectionStore.ids)).toEqual([1, 4]);
});
test('Should return the item with the given ID', () => {
    const selectionStore = new MultiSelectionStore_1.default('snippets', [], mobx_1.observable.box('en'));
    const item1 = { id: 1 };
    const item2 = { id: 4 };
    selectionStore.items = [item1, item2];
    expect(selectionStore.getById(4)).toEqual(item2);
});
test('Should return undefined if the given ID does not exist', () => {
    const selectionStore = new MultiSelectionStore_1.default('snippets', [], mobx_1.observable.box('en'));
    const item1 = { id: 1 };
    const item2 = { id: 4 };
    selectionStore.items = [item1, item2];
    expect(selectionStore.getById(5)).toEqual(undefined);
});
test('Should sort items to match order of given ids after loading items when being constructed', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [3, 1, 2], mobx_1.observable.box('en'), 'ids');
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '3,1,2',
        limit: undefined,
        locale: 'en',
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 3 },
            { id: 1 },
            { id: 2 },
        ]);
    });
});
test('Should load items with different filterParameter when being constructed', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 3, 4], mobx_1.observable.box('en'), 'names');
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        names: '1,3,4',
        limit: undefined,
        locale: 'en',
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
        ]);
    });
});
test('Should load items when being constructed in the given locale', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 3, 4], mobx_1.observable.box('de'));
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,3,4',
        limit: undefined,
        locale: 'de',
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
        ]);
    });
});
test('Should load items when being constructed without a locale', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 3, 4]);
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,3,4',
        limit: undefined,
        locale: undefined,
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
        ]);
    });
});
test('Should load items with requestParameters that are set via setRequestParameters method', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 3, 4], undefined, 'ids', { oldKey: 'old-value' });
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,3,4',
        limit: undefined,
        locale: undefined,
        page: 1,
        oldKey: 'old-value',
    });
    selectionStore.setRequestParameters({ newKey: 'new-value' });
    selectionStore.loadItems([1, 3, 4]);
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,3,4',
        limit: undefined,
        locale: undefined,
        page: 1,
        newKey: 'new-value',
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
        ]);
    });
});
test('Should remove an item from the store', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
                { id: 3 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 3], mobx_1.observable.box('en'));
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,3',
        limit: undefined,
        locale: 'en',
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
            { id: 3 },
        ]);
        selectionStore.removeById(1);
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([{ id: 3 }]);
    });
});
test('Should move the items in a store', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
                { id: 2 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 2], mobx_1.observable.box('en'));
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,2',
        limit: undefined,
        locale: 'en',
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
            { id: 2 },
        ]);
        selectionStore.move(0, 1);
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([{ id: 2 }, { id: 1 }]);
    });
});
test('Should set all items on the store', () => {
    const listPromise = Promise.resolve({
        _embedded: {
            snippets: [
                { id: 1 },
                { id: 2 },
            ],
        },
    });
    ResourceRequester_1.default.getList.mockReturnValue(listPromise);
    const selectionStore = new MultiSelectionStore_1.default('snippets', [1, 2], mobx_1.observable.box('en'));
    expect(ResourceRequester_1.default.getList).toBeCalledWith('snippets', {
        ids: '1,2',
        limit: undefined,
        locale: 'en',
        page: 1,
    });
    return listPromise.then(() => {
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([
            { id: 1 },
            { id: 2 },
        ]);
        selectionStore.set([
            { id: 3 },
            { id: 4 },
        ]);
        expect((0, mobx_1.toJS)(selectionStore.items)).toEqual([{ id: 3 }, { id: 4 }]);
    });
});
