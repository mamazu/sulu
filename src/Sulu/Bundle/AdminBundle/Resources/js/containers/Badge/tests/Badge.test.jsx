"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enzyme_1 = require("enzyme");
const react_1 = __importDefault(require("react"));
const Router_1 = __importDefault(require("../../../services/Router"));
const Requester_1 = __importDefault(require("../../../services/Requester"));
const Badge_1 = __importDefault(require("../Badge"));
const BadgeStore_1 = __importDefault(require("../stores/BadgeStore"));
jest.mock('../../../services/Requester', () => ({
    get: jest.fn(),
}));
Requester_1.default.handleResponseHooks = [];
const tabViewRoute = {};
jest.mock('../../../services/Router', () => jest.fn(function () {
    this.attributes = {
        id: 5,
        locale: 'en',
    };
    this.route = {
        parent: tabViewRoute,
    };
}));
test('Should create new BadgeStore', () => {
    const router = new Router_1.default({});
    const promise = Promise.resolve({ data: 'foo' });
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const badge = (0, enzyme_1.mount)(<Badge_1.default dataPath="/data" requestParameters={{
            limit: 0,
        }} routeName="foo" router={router} routerAttributesToRequest={{
            id: 'entityId',
            locale: 'locale',
        }} tabViewRoute={tabViewRoute} visibleCondition="value != 0"/>);
    const store = badge.instance().store;
    expect(store).toBeInstanceOf(BadgeStore_1.default);
    expect(store.routeName).toBe('foo');
    expect(store.dataPath).toBe('/data');
    expect(store.requestParameters).toEqual({
        limit: 0,
    });
    expect(store.routerAttributesToRequest).toEqual({
        id: 'entityId',
        locale: 'locale',
    });
    expect(store.tabViewRoute).toBe(tabViewRoute);
    return promise.then(() => {
        expect(store.value).toBe('foo');
    });
});
test('Should pass correct props to badge component', () => {
    const router = new Router_1.default({});
    const promise = Promise.resolve('hello');
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const badge = (0, enzyme_1.mount)(<Badge_1.default dataPath={null} requestParameters={{
            limit: 0,
        }} routeName="foo" router={router} routerAttributesToRequest={{
            id: 'entityId',
            locale: 'locale',
        }} tabViewRoute={tabViewRoute} visibleCondition="value != 0"/>);
    return promise.then(() => {
        badge.update();
        expect(badge.children().find('Badge').length).toBe(1);
        expect(badge.children().find('Badge').text()).toBe('hello');
    });
});
test('Should not render Badge component if visibleCondition fails', () => {
    const router = new Router_1.default({});
    const promise = Promise.resolve({ data: 0 });
    Requester_1.default.get.mockReturnValue(promise);
    Requester_1.default.handleResponseHooks = [];
    const badge = (0, enzyme_1.mount)(<Badge_1.default dataPath="/data" requestParameters={{
            limit: 0,
        }} routeName="foo" router={router} routerAttributesToRequest={{
            id: 'entityId',
            locale: 'locale',
        }} tabViewRoute={tabViewRoute} visibleCondition="value != 0"/>);
    return promise.then(() => {
        badge.update();
        expect(badge.children().find('Badge').length).toBe(0);
    });
});
