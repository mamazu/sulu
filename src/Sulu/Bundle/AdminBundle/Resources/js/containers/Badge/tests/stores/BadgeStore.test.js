"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const router_1 = __importDefault(require("fos-jsrouting/router"));
const BadgeStore_1 = __importDefault(require("../../stores/BadgeStore"));
const Router_1 = __importDefault(require("../../../../services/Router"));
const Requester_1 = __importDefault(require("../../../../services/Requester"));
jest.mock('debounce', () => jest.fn((callback) => callback));
jest.mock('../../../../services/Requester', () => ({
    get: jest.fn(),
}));
Requester_1.default.handleResponseHooks = [];
// Need to use symbol here, because jest transforms {parent: {}} to {parent: [Getter/Setter]}
const mockTabViewRoute = Symbol();
jest.mock('../../../../services/Router', () => jest.fn(function () {
    this.attributes = {
        id: 5,
        locale: 'en',
    };
    (0, mobx_1.extendObservable)(this, {
        route: {
            parent: mockTabViewRoute,
        },
    });
}));
test('Should load data using the Requester', () => {
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const promise = Promise.resolve({ value: 2 });
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const router = new Router_1.default({});
    const badgeStore = new BadgeStore_1.default(router, 'foo', '/value', {
        limit: 0,
        entityClass: 'Foo',
    }, {
        id: 'entityId',
        locale: 'locale',
    }, mockTabViewRoute);
    expect(Requester_1.default.get).toBeCalledWith('foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    return promise.then(() => {
        expect(badgeStore.value).toEqual('2');
    });
});
test('Should load data without datapath', () => {
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const promise = Promise.resolve('hello');
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const router = new Router_1.default({});
    const badgeStore = new BadgeStore_1.default(router, 'foo', null, {
        limit: 0,
        entityClass: 'Foo',
    }, {
        id: 'entityId',
        locale: 'locale',
    }, mockTabViewRoute);
    expect(Requester_1.default.get).toBeCalledWith('foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    return promise.then(() => {
        expect(badgeStore.value).toEqual('hello');
    });
});
test('Should load data if route changes', () => {
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const promise = Promise.resolve('hello');
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const router = new Router_1.default({});
    new BadgeStore_1.default(router, 'foo', null, {
        limit: 0,
        entityClass: 'Foo',
    }, {
        id: 'entityId',
        locale: 'locale',
    }, mockTabViewRoute);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(1, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    router.route = { property: 'value', parent: mockTabViewRoute };
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(2, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
});
test('Should not load data if route changes to other parent', () => {
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const promise = Promise.resolve('hello');
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const router = new Router_1.default({});
    new BadgeStore_1.default(router, 'foo', null, {
        limit: 0,
        entityClass: 'Foo',
    }, {
        id: 'entityId',
        locale: 'locale',
    }, mockTabViewRoute);
    expect(Requester_1.default.get).toHaveBeenCalledTimes(1);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(1, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    router.route = { property: 'value', parent: { other: true } };
    expect(Requester_1.default.get).toHaveBeenCalledTimes(1);
});
test('Should load data on response hook callback', () => {
    router_1.default.generate.mockImplementation((routeName, params) => {
        return routeName + '?' + Object.keys(params).map((key) => key + '=' + params[key]).join('&');
    });
    const promise = Promise.resolve('hello');
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const router = new Router_1.default({});
    const badgeStore = new BadgeStore_1.default(router, 'foo', null, {
        limit: 0,
        entityClass: 'Foo',
    }, {
        id: 'entityId',
        locale: 'locale',
    }, mockTabViewRoute);
    expect(Requester_1.default.handleResponseHooks).toHaveLength(1);
    // Initial request
    expect(Requester_1.default.get).toHaveBeenCalledTimes(1);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(1, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    // Should not perform request because of a "GET" request
    const response1 = { url: 'http://sulu.lo/admin/api/anything' };
    Requester_1.default.handleResponseHooks[0](response1, { method: 'GET' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(1);
    // Should perform request
    const response2 = { url: 'http://sulu.lo/admin/api/anything' };
    Requester_1.default.handleResponseHooks[0](response2, { method: 'POST' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(2);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(2, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    // Should perform request
    const response3 = { url: 'http://sulu.lo/admin/api/anything' };
    Requester_1.default.handleResponseHooks[0](response3, { method: 'PUT' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(3);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(3, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    // Should perform request
    const response4 = { url: 'http://sulu.lo/admin/api/anything' };
    Requester_1.default.handleResponseHooks[0](response4, { method: 'PATCH' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(4);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(4, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    // Should perform request
    const response5 = { url: 'http://sulu.lo/admin/api/anything' };
    Requester_1.default.handleResponseHooks[0](response5, { method: 'DELETE' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(5);
    expect(Requester_1.default.get).toHaveBeenNthCalledWith(5, 'foo?entityId=5&locale=en&limit=0&entityClass=Foo');
    // Should not perform request because of a collaboration request
    const response6 = { url: 'http://sulu.lo/admin/api/collaborations?id=1234&resourceKey=pages' };
    Requester_1.default.handleResponseHooks[0](response6, { method: 'PUT' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(5);
    // Should not perform request because of a preview request
    const response7 = { url: 'https://fullsulu.lo/admin/preview/update?id=1234&locale=en&provider=pages' };
    Requester_1.default.handleResponseHooks[0](response7, { method: 'POST' });
    expect(Requester_1.default.get).toHaveBeenCalledTimes(5);
    badgeStore.destroy();
    expect(Requester_1.default.handleResponseHooks).toHaveLength(0);
});
