"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("sulu-admin-bundle/services");
const stores_1 = require("sulu-admin-bundle/stores");
class FormatStore {
    sendRequest() {
        if (!stores_1.userStore.user) {
            throw new Error('A user must be logged in to load the webspaces with the correct locale');
        }
        if (!this.formatPromise) {
            this.formatPromise = services_1.ResourceRequester.getList('formats', { locale: stores_1.userStore.user.locale });
        }
        return this.formatPromise;
    }
    loadFormats() {
        return this.sendRequest().then((response) => {
            return response._embedded.formats;
        });
    }
}
exports.default = new FormatStore();
