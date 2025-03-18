"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const router_1 = __importDefault(require("fos-jsrouting/router"));
const loglevel_1 = __importDefault(require("loglevel"));
const Date_1 = require("../../../utils/Date");
function transformParameter(parameter) {
    return (0, mobx_1.isArrayLike)(parameter)
        ? parameter.map(transformParameter).join(',')
        : parameter instanceof Date
            ? (0, Date_1.transformDateForUrl)(parameter)
            : parameter instanceof Object ? transformParameters(parameter) : (0, mobx_1.toJS)(parameter);
}
function transformParameters(parameters) {
    return Object.keys(parameters)
        .filter((parameterKey) => parameters[parameterKey] !== undefined)
        .reduce((transformedParameters, parameterKey) => {
        const value = (0, mobx_1.toJS)(parameters[parameterKey]);
        transformedParameters[parameterKey] = transformParameter(value);
        return transformedParameters;
    }, {});
}
class ResourceRouteRegistry {
    constructor() {
        this.endpoints = {};
        this.configurationPromises = {};
    }
    clear() {
        this.endpoints = {};
        this.configurationPromises = {};
    }
    setRoutingData(data) {
        router_1.default.setRoutingData(data);
    }
    setEndpoints(endpoints) {
        this.endpoints = endpoints;
    }
    // @deprecated
    getDetailUrl(resourceKey, parameters = {}) {
        loglevel_1.default.warn('The "getDetailUrl" method is deprecated since version 2.6 and will be removed. ' +
            'Use the "getUrl" option instead.');
        return this.getUrl('detail', resourceKey, parameters);
    }
    // @deprecated
    getListUrl(resourceKey, parameters = {}) {
        loglevel_1.default.warn('The "getListUrl" method is deprecated since version 2.6 and will be removed. ' +
            'Use the "getUrl" option instead.');
        return this.getUrl('list', resourceKey, parameters);
    }
    getUrl(type, resourceKey, parameters = {}) {
        if (!this.endpoints[resourceKey]) {
            throw new Error('There are no routes for the resourceKey "' + resourceKey + '"!' +
                '\n\nRegistered keys: ' + Object.keys(this.endpoints).sort().join(', '));
        }
        if (!this.endpoints[resourceKey].routes[type]) {
            throw new Error('There is no "' + type + '" route for the resourceKey "' + resourceKey + '"');
        }
        return router_1.default.generate(this.endpoints[resourceKey].routes[type], transformParameters(parameters));
    }
}
exports.default = new ResourceRouteRegistry();
