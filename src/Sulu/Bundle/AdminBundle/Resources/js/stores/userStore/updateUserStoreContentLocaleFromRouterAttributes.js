"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userStore_1 = __importDefault(require("./userStore"));
const updateUserStoreContentLocaleFromRouterAttributes = function (newRoute, newAttributes) {
    if (!newRoute || !newAttributes) {
        return true;
    }
    // do nothing when the route does not require a locale
    if (!newRoute.availableAttributes.includes('locale')) {
        return true;
    }
    if (newAttributes.locale) {
        const locale = typeof newAttributes.locale.get === 'function'
            // $FlowFixMe
            ? newAttributes.locale.get()
            : newAttributes.locale;
        if (typeof locale !== 'string') {
            throw new Error('The "locale" router attribute must be a string if given!');
        }
        userStore_1.default.updateContentLocale(locale);
    }
    return true;
};
exports.default = updateUserStoreContentLocaleFromRouterAttributes;
