"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateRouterAttributesFromUserStoreContentLocale_1 = __importDefault(require("../updateRouterAttributesFromUserStoreContentLocale"));
const Router_1 = require("../../../services/Router");
const userStore_1 = __importDefault(require("../userStore"));
jest.mock('../userStore', () => ({}));
test('Should not update locale attribute when route is not localized', () => {
    userStore_1.default.contentLocale = 'fr';
    const unlocalizedRoute = new Router_1.Route({
        name: 'unlocalized_route',
        path: '/example',
        type: 'example',
    });
    const attributes = (0, updateRouterAttributesFromUserStoreContentLocale_1.default)(unlocalizedRoute, {});
    expect(attributes.locale).toBe(undefined);
});
test('Should not update locale attribute when locale was explicit set', () => {
    userStore_1.default.contentLocale = 'fr';
    const localizedRoute = new Router_1.Route({
        name: 'localized_route',
        options: {
            locales: ['en', 'de', 'fr'],
        },
        path: '/:locale/example',
        type: 'example',
    });
    const attributes = (0, updateRouterAttributesFromUserStoreContentLocale_1.default)(localizedRoute, {
        locale: 'de',
    });
    expect(attributes.locale).toBe('de');
});
test('Should not update locale attribute when user store locale is not available for current route', () => {
    userStore_1.default.contentLocale = 'ru';
    const localizedRoute = new Router_1.Route({
        name: 'localized_route',
        options: {
            locales: ['en', 'de', 'fr'],
        },
        path: '/:locale/example',
        type: 'example',
    });
    const attributes = (0, updateRouterAttributesFromUserStoreContentLocale_1.default)(localizedRoute, {});
    expect(attributes.locale).toBe(undefined);
});
test('Should update locale attribute from user store when not explicit set', () => {
    userStore_1.default.contentLocale = 'fr';
    const localizedRoute = new Router_1.Route({
        name: 'localized_route',
        options: {
            locales: ['en', 'de', 'fr'],
        },
        path: '/:locale/example',
        type: 'example',
    });
    const attributes = (0, updateRouterAttributesFromUserStoreContentLocale_1.default)(localizedRoute, {});
    expect(attributes.locale).toBe('fr');
});
test('Should update locale attribute from user store when view does not define specified locales', () => {
    userStore_1.default.contentLocale = 'es';
    const localizedRouteWithoutDefaultLocales = new Router_1.Route({
        name: 'localized_route_without_locales_defined',
        path: '/:locale/example',
        type: 'example',
    });
    const attributes = (0, updateRouterAttributesFromUserStoreContentLocale_1.default)(localizedRouteWithoutDefaultLocales, {});
    expect(attributes.locale).toBe('es');
});
