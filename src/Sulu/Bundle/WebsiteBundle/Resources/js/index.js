"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const containers_1 = require("sulu-admin-bundle/containers");
const CacheClearToolbarAction_1 = __importDefault(require("./containers/CacheClearToolbarAction"));
const AnalyticsDomainSelect_1 = __importDefault(require("./containers/Form/fields/AnalyticsDomainSelect"));
services_1.initializer.addUpdateConfigHook('sulu_website', (config) => {
    CacheClearToolbarAction_1.default.clearCacheEndpoint = config.endpoints.clearCache;
});
containers_1.fieldRegistry.add('analytics_domain_select', AnalyticsDomainSelect_1.default);
