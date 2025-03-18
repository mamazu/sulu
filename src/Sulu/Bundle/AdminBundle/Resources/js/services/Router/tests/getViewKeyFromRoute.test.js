"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getViewKeyFromRoute_1 = __importDefault(require("../getViewKeyFromRoute"));
const Route_1 = __importDefault(require("../Route"));
test('Return just the route name if no rerender attributes are given', () => {
    const route = new Route_1.default({
        name: 'route1',
        path: '/route1',
        type: 'view1',
    });
    expect((0, getViewKeyFromRoute_1.default)(route, {})).toEqual('route1');
});
test('Return the route name rerender attributes are not given', () => {
    const route = new Route_1.default({
        name: 'route1',
        options: {},
        path: '/route1',
        rerenderAttributes: ['webspace', 'locale'],
        type: 'view1',
    });
    expect((0, getViewKeyFromRoute_1.default)(route, {})).toEqual('route1');
});
test('Return the route name with the value of the rerender attributes', () => {
    const route = new Route_1.default({
        name: 'route1',
        path: '/route1',
        rerenderAttributes: ['webspace', 'locale'],
        type: 'view1',
    });
    expect((0, getViewKeyFromRoute_1.default)(route, { webspace: 'sulu', locale: 'de' })).toEqual('route1-sulu__de');
});
