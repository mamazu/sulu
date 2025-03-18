"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
class IndexStore {
    clear() {
        this.indexPromise = undefined;
    }
    sendRequest() {
        if (!this.indexPromise) {
            this.indexPromise = services_1.ResourceRequester.getList('search_indexes');
        }
        return this.indexPromise;
    }
    loadIndexes() {
        return this.sendRequest().then((response) => {
            return response._embedded.search_indexes;
        });
    }
}
exports.default = new IndexStore();
