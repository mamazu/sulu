"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStoreContentLocaleFromRouterAttributes = exports.updateRouterAttributesFromUserStoreContentLocale = exports.logoutOnUnauthorizedResponse = void 0;
const updateRouterAttributesFromUserStoreContentLocale_1 = __importDefault(require("../../stores/userStore/updateRouterAttributesFromUserStoreContentLocale"));
exports.updateRouterAttributesFromUserStoreContentLocale = updateRouterAttributesFromUserStoreContentLocale_1.default;
const updateUserStoreContentLocaleFromRouterAttributes_1 = __importDefault(require("../../stores/userStore/updateUserStoreContentLocaleFromRouterAttributes"));
exports.updateUserStoreContentLocaleFromRouterAttributes = updateUserStoreContentLocaleFromRouterAttributes_1.default;
const userStore_1 = __importDefault(require("./userStore"));
const logoutOnUnauthorizedResponse_1 = __importDefault(require("./logoutOnUnauthorizedResponse"));
exports.logoutOnUnauthorizedResponse = logoutOnUnauthorizedResponse_1.default;
exports.default = userStore_1.default;
