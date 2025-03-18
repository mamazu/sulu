"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateRouterAttributesFromView_1 = __importDefault(require("../updateRouterAttributesFromView"));
const viewRegistry_1 = __importDefault(require("../registries/viewRegistry"));
const Router_1 = require("../../../services/Router");
jest.mock('../registries/viewRegistry', () => ({
    get: jest.fn(),
}));
test('Return an empty object if the corresponding View has no getDerivedRouterAttributes function', () => {
    viewRegistry_1.default.get.mockImplementation((key) => {
        if (key === 'test') {
            return {};
        }
    });
    expect((0, updateRouterAttributesFromView_1.default)(new Router_1.Route({
        name: 'test',
        path: '/test',
        type: 'test',
    }), {})).toEqual({});
});
test('Return the attributes returned from the getDerivedRouterAttributes function', () => {
    viewRegistry_1.default.get.mockImplementation((key) => {
        if (key === 'test') {
            return {
                getDerivedRouteAttributes: jest.fn().mockImplementation((route, attributes) => ({
                    value1: 'test1',
                    value2: 'test2',
                    value3: attributes.value3,
                    routeName: route.name,
                })),
            };
        }
    });
    expect((0, updateRouterAttributesFromView_1.default)(new Router_1.Route({
        name: 'test',
        path: '/test',
        type: 'test',
    }), { value3: 'test3' })).toEqual({ value1: 'test1', value2: 'test2', value3: 'test3', routeName: 'test' });
});
test('Return the combined attributes from the current and parent getDerivedrouterAttributes function', () => {
    viewRegistry_1.default.get.mockImplementation((key) => {
        if (key === 'test1') {
            return {
                getDerivedRouteAttributes: jest.fn((route, attributes) => ({
                    routeName1: route.name,
                    value1: attributes.value1,
                })),
            };
        }
        if (key === 'test2') {
            return {
                getDerivedRouteAttributes: jest.fn((route, attributes) => ({
                    routeName2: route.name,
                    value2: attributes.value2,
                })),
            };
        }
        if (key === 'test3') {
            return {
                getDerivedRouteAttributes: jest.fn((route, attributes) => ({
                    routeName3: route.name,
                    value3: attributes.value3,
                })),
            };
        }
    });
    const route1 = new Router_1.Route({
        name: 'test1',
        path: '/test',
        type: 'test1',
    });
    const route2 = new Router_1.Route({
        name: 'test2',
        path: '/test',
        type: 'test2',
    });
    route2.parent = route1;
    const route3 = new Router_1.Route({
        name: 'test3',
        path: '/test',
        type: 'test3',
    });
    route3.parent = route2;
    expect((0, updateRouterAttributesFromView_1.default)(route3, { value1: 'test1', value2: 'test2', value3: 'test3' }))
        .toEqual({
        value1: 'test1',
        value2: 'test2',
        value3: 'test3',
        routeName1: 'test1',
        routeName2: 'test2',
        routeName3: 'test3',
    });
});
