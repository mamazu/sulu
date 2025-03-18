"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const loglevel_1 = __importDefault(require("loglevel"));
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const AbstractLoadingStrategy_1 = __importDefault(require("./AbstractLoadingStrategy"));
class FullLoadingStrategy extends AbstractLoadingStrategy_1.default {
    // @deprecated
    constructor() {
        super();
        loglevel_1.default.warn('The "FullLoadingStrategy" is deprecated since 2.1.9 and will be removed. ' +
            'Use "DefaultLoadingStrategy({paginated: false})" instead.');
    }
    load(resourceKey, options, parentId) {
        return ResourceRequester_1.default
            .getList(resourceKey, Object.assign(Object.assign({}, options), { page: undefined, limit: undefined })).then((0, mobx_1.action)((response) => {
            const responseData = response._embedded[resourceKey];
            this.structureStrategy.clear(parentId);
            responseData.forEach((item) => this.structureStrategy.addItem(item, parentId));
            return response;
        }));
    }
}
exports.default = FullLoadingStrategy;
