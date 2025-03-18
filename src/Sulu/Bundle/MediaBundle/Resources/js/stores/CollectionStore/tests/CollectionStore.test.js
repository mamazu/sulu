"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ResourceRequester_1 = __importDefault(require("sulu-admin-bundle/services/ResourceRequester"));
const CollectionStore_1 = __importDefault(require("../CollectionStore"));
jest.mock('sulu-admin-bundle/services/ResourceRequester', () => ({
    get: jest.fn(),
}));
test('Do not send request without defined collectionId', () => {
    const locale = mobx_1.observable.box();
    new CollectionStore_1.default(undefined, locale);
    expect(ResourceRequester_1.default.get).not.toBeCalled();
});
test('After loading the collection info should be set', (done) => {
    ResourceRequester_1.default.get.mockReturnValue(Promise.resolve({
        id: 2,
        title: 'test',
        _embedded: {
            parent: {
                id: 1,
            },
        },
        _permissions: {
            view: true,
            edit: false,
            delete: false,
        },
    }));
    const locale = mobx_1.observable.box('en');
    const collectionStore = new CollectionStore_1.default(1, locale);
    (0, mobx_1.when)(() => !collectionStore.loading, () => {
        expect(collectionStore.parentId).toEqual(1);
        expect(collectionStore.permissions).toEqual({ view: true, edit: false, delete: false });
        collectionStore.destroy();
        done();
    });
});
test.each([true, false])('Should have a locked value of %s', (locked, done) => {
    ResourceRequester_1.default.get.mockReturnValue(Promise.resolve({
        id: 2,
        title: 'test',
        locked,
    }));
    const locale = mobx_1.observable.box('en');
    const collectionStore = new CollectionStore_1.default(1, locale);
    expect(collectionStore.locked).toEqual(false);
    (0, mobx_1.when)(() => !collectionStore.loading, () => {
        expect(collectionStore.locked).toEqual(locked);
        collectionStore.destroy();
        done();
    });
});
test('Should return an empty permission object if still loading', () => {
    const collectionStore = new CollectionStore_1.default(1, mobx_1.observable.box('en'));
    expect(collectionStore.permissions).toEqual({});
});
test('Should return an empty permission object if no permissions are given', (done) => {
    ResourceRequester_1.default.get.mockReturnValue(Promise.resolve({
        id: 2,
        title: 'test',
        _embedded: {
            parent: {
                id: 1,
            },
        },
    }));
    const locale = mobx_1.observable.box('en');
    const collectionStore = new CollectionStore_1.default(1, locale);
    (0, mobx_1.when)(() => !collectionStore.loading, () => {
        expect(collectionStore.permissions).toEqual({});
        collectionStore.destroy();
        done();
    });
});
test('Should return an empty permission object if no id was given', () => {
    const collectionStore = new CollectionStore_1.default(undefined, mobx_1.observable.box('en'));
    expect(ResourceRequester_1.default.get).not.toBeCalled();
    expect(collectionStore.loading).toEqual(false);
    expect(collectionStore.permissions).toEqual({});
});
