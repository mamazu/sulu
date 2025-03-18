"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const userStore_1 = __importDefault(require("./userStore"));
const updateRouterAttributesFromUserStoreContentLocale = function (route, attributes) {
    // do nothing when locale is explicit set
    if (attributes.locale) {
        return attributes;
    }
    // do nothing when the route does not require a locale
    if (!route.availableAttributes.includes('locale')) {
        return attributes;
    }
    const locales = (0, mobx_1.toJS)(route.options.locales);
    // set content locale if route accept the current content locale
    if (!locales || locales.includes(userStore_1.default.contentLocale)) {
        attributes.locale = userStore_1.default.contentLocale;
    }
    return attributes;
};
exports.default = updateRouterAttributesFromUserStoreContentLocale;
