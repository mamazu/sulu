"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loglevel_1 = __importDefault(require("loglevel"));
class SecurityContextStore {
    getSystems() {
        return Object.keys(this.securityContexts);
    }
    setSecurityContexts(securityContexts) {
        this.securityContexts = securityContexts;
    }
    getSecurityContextByResourceKey(resourceKey) {
        return this.resourceKeyMapping[resourceKey];
    }
    getSecurityContextGroups(system) {
        return this.securityContexts[system];
    }
    getAvailableActions(resourceKey, system) {
        const securitySystems = this.securityContexts[system || this.suluSecuritySystem];
        if (!securitySystems) {
            return [];
        }
        for (const groupKey in securitySystems) {
            const group = securitySystems[groupKey];
            for (const permissionKey in group) {
                if (permissionKey === this.resourceKeyMapping[resourceKey]) {
                    return group[permissionKey];
                }
            }
        }
        return [];
    }
    // @deprecated
    loadSecurityContextGroups(system) {
        loglevel_1.default.warn('The "loadSecurityContextGroups" method is deprecated since 2.2 and will be removed. ' +
            'Use the "getSecurityContextGroups" method instead.');
        return Promise.resolve(this.getSecurityContextGroups(system));
    }
    // @deprecated
    loadAvailableActions(resourceKey) {
        loglevel_1.default.warn('The "loadAvailableActions" method is deprecated since 2.2 and will be removed. ' +
            'Use the "getAvailableActions" method instead.');
        return Promise.resolve(this.getAvailableActions(resourceKey));
    }
}
exports.default = new SecurityContextStore();
