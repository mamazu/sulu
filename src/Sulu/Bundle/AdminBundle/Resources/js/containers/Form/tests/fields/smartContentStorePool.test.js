"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const smartContentStorePool_1 = __importDefault(require("../../fields/smartContentStorePool"));
const SmartContentStore_1 = __importDefault(require("../../../SmartContent/stores/SmartContentStore"));
jest.mock('../../../SmartContent/stores/SmartContentStore', () => jest.fn(function () {
    this.excludedIds = [];
    this.setExcludedIds = jest.fn((excludedIds) => {
        this.excludedIds = excludedIds;
    });
    this.items = [];
    (0, mobx_1.extendObservable)(this, { itemsLoading: false });
}));
beforeEach(() => {
    smartContentStorePool_1.default.clear();
});
test('Add and remove SmartContentStores', () => {
    const smartContentStore1 = new SmartContentStore_1.default('pages');
    const smartContentStore2 = new SmartContentStore_1.default('pages');
    smartContentStorePool_1.default.add(smartContentStore1, true);
    smartContentStorePool_1.default.add(smartContentStore2, true);
    expect(smartContentStorePool_1.default.stores).toEqual([smartContentStore1, smartContentStore2]);
    smartContentStorePool_1.default.remove(smartContentStore1);
    expect(smartContentStorePool_1.default.stores).toEqual([smartContentStore2]);
});
test('Add same SmartContentStore twice should throw an error', () => {
    const smartContentStore = new SmartContentStore_1.default('pages');
    smartContentStorePool_1.default.add(smartContentStore, true);
    expect(() => smartContentStorePool_1.default.add(smartContentStore, true)).toThrow(/twice/);
});
test('Updated excluded ids only if excludedDuplicates is set to true', () => {
    const smartContentStore1 = new SmartContentStore_1.default('pages');
    const smartContentStore2 = new SmartContentStore_1.default('pages');
    const smartContentStore3 = new SmartContentStore_1.default('pages');
    const smartContentStore4 = new SmartContentStore_1.default('pages');
    smartContentStorePool_1.default.add(smartContentStore1, true);
    smartContentStorePool_1.default.add(smartContentStore2, true);
    smartContentStorePool_1.default.add(smartContentStore3, false);
    smartContentStorePool_1.default.add(smartContentStore4, true);
    smartContentStore1.items = [{ id: 1 }];
    smartContentStore2.items = [{ id: 2 }, { id: 3 }];
    smartContentStorePool_1.default.updateExcludedIds();
    expect(smartContentStore1.excludedIds).toEqual([]);
    expect(smartContentStore2.excludedIds).toEqual([1]);
    expect(smartContentStore3.excludedIds).toEqual([]);
    expect(smartContentStore4.excludedIds).toEqual([1, 2, 3]);
});
test('Updated excluded ids should wait if something is currently loading', () => {
    const smartContentStore1 = new SmartContentStore_1.default('pages');
    const smartContentStore2 = new SmartContentStore_1.default('pages');
    const smartContentStore3 = new SmartContentStore_1.default('pages');
    smartContentStore1.itemsLoading = true;
    smartContentStore2.itemsLoading = true;
    smartContentStore3.itemsLoading = true;
    smartContentStorePool_1.default.add(smartContentStore1, true);
    smartContentStorePool_1.default.add(smartContentStore2, true);
    smartContentStorePool_1.default.add(smartContentStore3, true);
    smartContentStore1.items = [{ id: 1 }];
    smartContentStore2.items = [{ id: 2 }, { id: 3 }];
    smartContentStorePool_1.default.updateExcludedIds();
    expect(smartContentStore1.excludedIds).toEqual([]);
    expect(smartContentStore2.excludedIds).toEqual([]);
    expect(smartContentStore3.excludedIds).toEqual([]);
    smartContentStore1.itemsLoading = false;
    expect(smartContentStore1.excludedIds).toEqual([]);
    expect(smartContentStore2.excludedIds).toEqual([1]);
    expect(smartContentStore3.excludedIds).toEqual([]);
    smartContentStore2.itemsLoading = false;
    expect(smartContentStore1.excludedIds).toEqual([]);
    expect(smartContentStore2.excludedIds).toEqual([1]);
    expect(smartContentStore3.excludedIds).toEqual([1, 2, 3]);
});
