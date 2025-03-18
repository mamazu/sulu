"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Requester_1 = __importDefault(require("../Requester"));
const resourceRouteRegistry_1 = __importDefault(require("./registries/resourceRouteRegistry"));
class ResourceRequester {
    static get(resourceKey, parameters) {
        return Requester_1.default.get(resourceRouteRegistry_1.default.getUrl('detail', resourceKey, Object.assign({}, parameters)));
    }
    static post(resourceKey, data, parameters) {
        return Requester_1.default.post(resourceRouteRegistry_1.default.getUrl('detail', resourceKey, Object.assign({}, parameters)), data);
    }
    static put(resourceKey, data, parameters) {
        return Requester_1.default.put(resourceRouteRegistry_1.default.getUrl('detail', resourceKey, Object.assign({}, parameters)), data);
    }
    static patch(resourceKey, data, parameters) {
        return Requester_1.default.patch(resourceRouteRegistry_1.default.getUrl('detail', resourceKey, Object.assign({}, parameters)), data);
    }
    static patchList(resourceKey, data) {
        return Requester_1.default.patch(resourceRouteRegistry_1.default.getUrl('list', resourceKey), data);
    }
    static getList(resourceKey, options = {}) {
        return Requester_1.default.get(resourceRouteRegistry_1.default.getUrl('list', resourceKey, Object.assign(Object.assign({}, options), { flat: true })));
    }
    static delete(resourceKey, parameters) {
        return Requester_1.default.delete(resourceRouteRegistry_1.default.getUrl('detail', resourceKey, Object.assign({}, parameters)));
    }
    static deleteList(resourceKey, parameters) {
        return Requester_1.default.delete(resourceRouteRegistry_1.default.getUrl('list', resourceKey, parameters));
    }
}
exports.default = ResourceRequester;
