"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const views_1 = require("sulu-admin-bundle/views");
const services_1 = require("sulu-admin-bundle/services");
const RestoreItemAction_1 = __importDefault(require("./views/List/itemActions/RestoreItemAction"));
views_1.listItemActionRegistry.add('sulu_trash.restore', RestoreItemAction_1.default);
services_1.initializer.addUpdateConfigHook('sulu_trash', (config) => {
    if (!config) {
        // config is undefined if SuluTrashBundle is not registered
        return;
    }
    RestoreItemAction_1.default.restoreConfigurationMapping = config.restoreConfigurationMapping;
});
