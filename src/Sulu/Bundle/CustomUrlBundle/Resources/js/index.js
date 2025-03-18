"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("sulu-admin-bundle/containers");
const CustomUrl_1 = __importDefault(require("./containers/Form/fields/CustomUrl"));
const CustomUrlsDomainSelect_1 = __importDefault(require("./containers/Form/fields/CustomUrlsDomainSelect"));
const CustomUrlsLocaleSelect_1 = __importDefault(require("./containers/Form/fields/CustomUrlsLocaleSelect"));
containers_1.fieldRegistry.add('custom_url', CustomUrl_1.default);
containers_1.fieldRegistry.add('custom_urls_domain_select', CustomUrlsDomainSelect_1.default);
containers_1.fieldRegistry.add('custom_urls_locale_select', CustomUrlsLocaleSelect_1.default);
