"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateUserStoreContentLocaleFromRouterAttributes_1 = __importDefault(require("../updateUserStoreContentLocaleFromRouterAttributes"));
const userStore_1 = __importDefault(require("../userStore"));
const Router_1 = require("../../../services/Router");
jest.mock('../../../stores/userStore/userStore', () => ({
    contentLocale: 'fr',
    updateContentLocale: jest.fn(),
}));
test('Should not update userStore when no locale attribute is defined', () => {
    const localizedRoute = new Router_1.Route({
        name: 'localized_route',
        options: {
            locales: ['en', 'de', 'fr'],
        },
        path: '/:locale/example',
        type: 'example',
    });
    (0, updateUserStoreContentLocaleFromRouterAttributes_1.default)(localizedRoute, {});
    expect(userStore_1.default.contentLocale).toBe('fr');
});
test('Should not update userStore when route and attributes are undefined', () => {
    (0, updateUserStoreContentLocaleFromRouterAttributes_1.default)(undefined, undefined);
    expect(userStore_1.default.contentLocale).toBe('fr');
});
test('Should update userStore with attribute locale', () => {
    const localizedRoute = new Router_1.Route({
        name: 'localized_route',
        options: {
            locales: ['en', 'de', 'fr'],
        },
        path: '/:locale/example',
        type: 'example',
    });
    (0, updateUserStoreContentLocaleFromRouterAttributes_1.default)(localizedRoute, {
        locale: 'de',
    });
    expect(userStore_1.default.updateContentLocale).toBeCalledWith('de');
});
