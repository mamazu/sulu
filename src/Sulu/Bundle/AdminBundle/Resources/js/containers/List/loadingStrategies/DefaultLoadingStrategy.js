"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const AbstractLoadingStrategy_1 = __importDefault(require("./AbstractLoadingStrategy"));
class DefaultLoadingStrategy extends AbstractLoadingStrategy_1.default {
    constructor(options = {}) {
        super();
        this.options = options;
    }
    load(resourceKey, options, parentId) {
        if (!this.options.paginated) {
            options.page = undefined;
            options.limit = undefined;
        }
        return ResourceRequester_1.default.getList(resourceKey, Object.assign({}, options)).then((0, mobx_1.action)((response) => {
            const responseData = response._embedded[resourceKey];
            this.structureStrategy.clear(parentId);
            responseData.forEach((item) => this.structureStrategy.addItem(item, parentId));
            return response;
        }));
    }
}
exports.default = DefaultLoadingStrategy;
