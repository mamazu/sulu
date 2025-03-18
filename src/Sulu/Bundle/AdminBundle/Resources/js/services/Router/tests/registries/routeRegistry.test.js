"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const routeRegistry_1 = __importDefault(require("../../registries/routeRegistry"));
beforeEach(() => {
    routeRegistry_1.default.clear();
});
test('Clear routes from RouteRegistry', () => {
    routeRegistry_1.default.addCollection([
        {
            name: 'route',
            path: '/route',
            options: {},
            attributeDefaults: {},
            rerenderAttributes: [],
            type: 'view',
        },
    ]);
    expect(Object.keys(routeRegistry_1.default.routes)).toHaveLength(1);
    routeRegistry_1.default.clear();
    expect(Object.keys(routeRegistry_1.default.routes)).toHaveLength(0);
});
test('Get routes from RouteRegistry', () => {
    const route1 = {
        name: 'route1',
        type: 'view1',
        path: '/route/1',
        options: {
            test: 'value',
        },
        attributeDefaults: {},
        rerenderAttributes: [],
    };
    const route2 = {
        name: 'route2',
        type: 'view2',
        path: '/route/2',
        options: {
            test2: 'value2',
        },
        attributeDefaults: {},
        rerenderAttributes: [],
    };
    routeRegistry_1.default.addCollection([route1, route2]);
    const routes = routeRegistry_1.default.getAll();
    expect(Object.keys(routes)).toHaveLength(2);
    expect((0, mobx_1.toJS)(routes.route1)).toEqual({
        name: 'route1',
        type: 'view1',
        path: '/route/1',
        options: {
            test: 'value',
        },
        children: [],
        attributeDefaults: {},
        rerenderAttributes: [],
        parent: undefined,
    });
    expect((0, mobx_1.toJS)(routes.route2)).toEqual({
        name: 'route2',
        type: 'view2',
        path: '/route/2',
        options: {
            test2: 'value2',
        },
        children: [],
        attributeDefaults: {},
        rerenderAttributes: [],
        parent: undefined,
    });
});
test('Add a route collection to the RouteRegistry', () => {
    const route1 = {
        name: 'route1',
        type: 'view1',
        path: '/route/1',
        options: {
            test: 'value',
        },
        attributeDefaults: {},
        rerenderAttributes: [],
    };
    const route2 = {
        name: 'route2',
        type: 'view2',
        path: '/route/2',
        options: {
            test2: 'value2',
        },
        attributeDefaults: {},
        rerenderAttributes: [],
    };
    routeRegistry_1.default.addCollection([route1, route2]);
    expect((0, mobx_1.toJS)(routeRegistry_1.default.get('route1'))).toEqual({
        name: 'route1',
        type: 'view1',
        path: '/route/1',
        options: {
            test: 'value',
        },
        parent: undefined,
        children: [],
        attributeDefaults: {},
        rerenderAttributes: [],
    });
    expect((0, mobx_1.toJS)(routeRegistry_1.default.get('route2'))).toEqual({
        name: 'route2',
        type: 'view2',
        path: '/route/2',
        options: {
            test2: 'value2',
        },
        parent: undefined,
        children: [],
        attributeDefaults: {},
        rerenderAttributes: [],
    });
});
test('Add route with existing key should throw', () => {
    const route = {
        name: 'test_route',
        type: 'view',
        path: '/route',
        options: {},
        attributeDefaults: {},
        rerenderAttributes: [],
    };
    routeRegistry_1.default.addCollection([route]);
    expect(() => routeRegistry_1.default.addCollection([route])).toThrow('test_route');
});
test('Set parent and children routes based on passed RouteConfig', () => {
    routeRegistry_1.default.addCollection([
        {
            name: 'sulu_snippet.form',
            path: '/snippets/:uuid',
            options: {},
            attributeDefaults: {},
            rerenderAttributes: [],
            type: 'sulu_admin.tab',
        },
        {
            name: 'sulu_snippet.form.details',
            parent: 'sulu_snippet.form',
            path: '/details',
            options: {},
            attributeDefaults: {},
            rerenderAttributes: [],
            type: 'sulu_admin.form',
        },
        {
            name: 'sulu_snippet.form.taxonomy',
            parent: 'sulu_snippet.form',
            path: '/taxonomy',
            options: {},
            attributeDefaults: {},
            rerenderAttributes: [],
            type: 'sulu_admin.form',
        },
    ]);
    const formRoute = routeRegistry_1.default.get('sulu_snippet.form');
    const detailRoute = routeRegistry_1.default.get('sulu_snippet.form.details');
    const taxonomyRoute = routeRegistry_1.default.get('sulu_snippet.form.taxonomy');
    expect(formRoute.name).toBe('sulu_snippet.form');
    expect(formRoute.children).toHaveLength(2);
    expect(formRoute.children[0]).toBe(detailRoute);
    expect(formRoute.children[1]).toBe(taxonomyRoute);
    expect(detailRoute.name).toBe('sulu_snippet.form.details');
    expect(detailRoute.parent).toBe(formRoute);
    expect(taxonomyRoute.name).toBe('sulu_snippet.form.taxonomy');
    expect(taxonomyRoute.parent).toBe(formRoute);
});
test('Get a non-existing route should throw an exception', () => {
    expect(() => routeRegistry_1.default.get('test')).toThrow(/"test"/);
});
