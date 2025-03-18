"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const containers_1 = require("sulu-admin-bundle/containers");
const views_1 = require("sulu-admin-bundle/views");
const Form_1 = require("./containers/Form");
const RolePermissions_1 = __importDefault(require("./containers/RolePermissions"));
const securityContextStore_1 = __importDefault(require("./stores/securityContextStore"));
const EnableUserToolbarAction_1 = __importDefault(require("./views/Form/toolbarActions/EnableUserToolbarAction"));
containers_1.fieldRegistry.add('permissions', Form_1.Permissions);
containers_1.fieldRegistry.add('role_assignments', Form_1.RoleAssignments);
containers_1.fieldRegistry.add('role_permissions', Form_1.RolePermissions);
views_1.formToolbarActionRegistry.add('sulu_security.enable_user', EnableUserToolbarAction_1.default);
services_1.initializer.addUpdateConfigHook('sulu_security', (config) => {
    RolePermissions_1.default.suluSecuritySystem = config.suluSecuritySystem;
    securityContextStore_1.default.suluSecuritySystem = config.suluSecuritySystem;
    securityContextStore_1.default.securityContexts = config.securityContexts;
    // TODO resourceKeyMapping could be removed by using resourceKey instead of separate security context
    securityContextStore_1.default.resourceKeyMapping = config.resourceKeySecurityContextMapping;
});
