"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("fos-jsrouting/router"));
const mobx_1 = require("mobx");
const resourceRouteRegistry_1 = __importDefault(require("../../registries/resourceRouteRegistry"));
test('Set and get endpoints for given key', () => {
    router_1.default.generate.mockImplementation((routeName, { value, }) => {
        return routeName + '?value=' + value;
    });
    resourceRouteRegistry_1.default.setEndpoints({
        snippets: {
            routes: {
                detail: 'get_snippet',
                list: 'get_snippets',
            },
        },
    });
    expect(resourceRouteRegistry_1.default.getUrl('detail', 'snippets', { value: 1 })).toEqual('get_snippet?value=1');
    expect(resourceRouteRegistry_1.default.getUrl('list', 'snippets', { value: 2 })).toEqual('get_snippets?value=2');
});
test('Set and get endpoints for given key with date parameter', () => {
    router_1.default.generate.mockImplementation((routeName, { value, }) => {
        return routeName + '?value=' + value;
    });
    resourceRouteRegistry_1.default.setEndpoints({
        snippets: {
            routes: {
                detail: 'get_snippet',
                list: 'get_snippets',
            },
        },
    });
    expect(resourceRouteRegistry_1.default.getUrl('detail', 'snippets', { value: new Date('2013-12-24 00:00') }))
        .toEqual('get_snippet?value=2013-12-24 00:00');
    expect(resourceRouteRegistry_1.default.getUrl('list', 'snippets', { value: new Date('2020-09-07 00:00') }))
        .toEqual('get_snippets?value=2020-09-07 00:00');
});
test('Set and get endpoints for given key with boxed observable parameter', () => {
    router_1.default.generate.mockImplementation((routeName, { value, }) => {
        return routeName + '?value=' + value;
    });
    resourceRouteRegistry_1.default.setEndpoints({
        snippets: {
            routes: {
                detail: 'get_snippet',
                list: 'get_snippets',
            },
        },
    });
    expect(resourceRouteRegistry_1.default.getUrl('detail', 'snippets', { value: mobx_1.observable.box('boxed-value') }))
        .toEqual('get_snippet?value=boxed-value');
    expect(resourceRouteRegistry_1.default.getUrl('list', 'snippets', { value: mobx_1.observable.box('boxed-value') }))
        .toEqual('get_snippets?value=boxed-value');
});
test('Set and get endpoints for given key with date array parameter', () => {
    router_1.default.generate.mockImplementation((routeName, { dates, }) => {
        return routeName + '?dates=' + dates;
    });
    resourceRouteRegistry_1.default.setEndpoints({
        snippets: {
            routes: {
                detail: 'get_snippet',
                list: 'get_snippets',
            },
        },
    });
    expect(resourceRouteRegistry_1.default.getUrl('detail', 'snippets', { dates: [new Date('2013-12-24 12:00'), new Date('2020-12-24 00:00')] })).toEqual('get_snippet?dates=2013-12-24 12:00,2020-12-24 00:00');
    expect(resourceRouteRegistry_1.default.getUrl('list', 'snippets', { dates: [new Date('2020-09-07 00:00'), new Date('2020-11-05 00:00')] })).toEqual('get_snippets?dates=2020-09-07 00:00,2020-11-05 00:00');
});
test('Set and get endpoints for given key with date in object parameter', () => {
    resourceRouteRegistry_1.default.setEndpoints({
        snippets: {
            routes: {
                detail: 'get_snippet',
                list: 'get_snippets',
            },
        },
    });
    resourceRouteRegistry_1.default.getUrl('detail', 'snippets', { value: { name: 'test', date: new Date('2020-09-07 00:00') } });
    expect(router_1.default.generate).toBeCalledWith('get_snippet', { 'value': { 'name': 'test', 'date': '2020-09-07 00:00' } });
    resourceRouteRegistry_1.default.getUrl('list', 'snippets', { value: { name: 'test', date: new Date('2020-09-07 00:00') } });
    expect(router_1.default.generate).toBeCalledWith('get_snippets', { 'value': { 'name': 'test', 'date': '2020-09-07 00:00' } });
});
test('Throw exception when getting detail url for not existing key', () => {
    expect(() => resourceRouteRegistry_1.default.getUrl('detail', 'not-existing')).toThrow(/"not-existing"/);
});
test('Throw exception when getting list url for not existing key', () => {
    expect(() => resourceRouteRegistry_1.default.getUrl('list', 'not-existing')).toThrow(/"not-existing"/);
});
test('Throw exception when getting detail url for not existing detail url', () => {
    resourceRouteRegistry_1.default.setEndpoints({
        existing: {
            routes: {
                list: 'get_existing',
            },
        },
    });
    expect(() => resourceRouteRegistry_1.default.getUrl('detail', 'existing'))
        .toThrow(/no "detail" route for the resourceKey "existing"/);
});
test('Throw exception when getting detail url for not existing list url', () => {
    resourceRouteRegistry_1.default.setEndpoints({
        existing: {
            routes: {
                detail: 'get_existings',
            },
        },
    });
    expect(() => resourceRouteRegistry_1.default.getUrl('list', 'existing'))
        .toThrow(/no "list" route for the resourceKey "existing"/);
});
