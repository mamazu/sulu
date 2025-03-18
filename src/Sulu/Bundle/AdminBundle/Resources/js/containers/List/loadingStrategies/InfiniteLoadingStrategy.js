"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const ResourceRequester_1 = __importDefault(require("../../../services/ResourceRequester"));
const RequestPromise_1 = __importDefault(require("../../../services/Requester/RequestPromise"));
const AbstractLoadingStrategy_1 = __importDefault(require("./AbstractLoadingStrategy"));
const LIMIT = 50;
class InfiniteLoadingStrategy extends AbstractLoadingStrategy_1.default {
    constructor() {
        super(...arguments);
        this.lastLoadedPage = 0;
    }
    load(resourceKey, options, parentId) {
        let previousPagesItemsPromise = new RequestPromise_1.default((resolve) => resolve(undefined));
        previousPagesItemsPromise.setAbortController(new AbortController());
        // make sure that list contains (only) items of previous pages if given page does not match the expected page:
        // - prevent missing items if the application is refreshed with a query parameter like  "?mediaPage=4"
        // - prevent duplicated items if the current page is reloaded (eg. after an item was deleted)
        if (options.page && options.page - 1 !== this.lastLoadedPage) {
            if (options.page === 1) {
                previousPagesItemsPromise = new RequestPromise_1.default((resolve) => resolve([]));
                previousPagesItemsPromise.setAbortController(new AbortController());
            }
            else {
                previousPagesItemsPromise = ResourceRequester_1.default.getList(resourceKey, Object.assign(Object.assign({}, options), { page: 1, limit: (options.page - 1) * LIMIT })).then((previousPagesResponse) => previousPagesResponse._embedded[resourceKey]);
            }
        }
        return previousPagesItemsPromise.then((previousPagesItems) => {
            return ResourceRequester_1.default.getList(resourceKey, Object.assign(Object.assign({}, options), { limit: LIMIT })).then((response) => {
                return [previousPagesItems, response];
            });
        }).then((0, mobx_1.action)(([previousPagesItems, currentPageResponse]) => {
            if (previousPagesItems) {
                this.structureStrategy.clear();
                previousPagesItems.forEach((item) => this.structureStrategy.addItem(item, parentId));
            }
            const currentPageItems = currentPageResponse._embedded[resourceKey];
            currentPageItems.forEach((item) => this.structureStrategy.addItem(item, parentId));
            if (options.page) {
                this.lastLoadedPage = options.page;
            }
            return currentPageResponse;
        }));
    }
}
exports.default = InfiniteLoadingStrategy;
