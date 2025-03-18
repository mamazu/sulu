"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("fos-jsrouting/router"));
const Request_1 = require("../../utils/Request");
const services_1 = require("../../services");
const defaultOptions = {
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};
class MetadataStore {
    constructor() {
        this.metadataPromises = {};
    }
    loadMetadata(type, key, metadataOptions = {}) {
        const parameters = Object.assign({ type,
            key }, metadataOptions);
        if (!this.metadataPromises[type]) {
            this.metadataPromises[type] = {};
        }
        const keyWithOptions = key + (0, Request_1.buildQueryString)(metadataOptions);
        if (!this.metadataPromises[type][keyWithOptions]) {
            const url = router_1.default.generate('sulu_admin.metadata', parameters);
            const response = services_1.Requester.fetch(url, defaultOptions).then((response) => {
                if (!response.ok) {
                    this.metadataPromises[type][keyWithOptions] = undefined;
                    return Promise.reject(response);
                }
                const cacheControl = response.headers.get('cache-control');
                if (cacheControl && cacheControl.includes('no-store')) {
                    this.metadataPromises[type][keyWithOptions] = undefined;
                }
                return response.json();
            });
            this.metadataPromises[type][keyWithOptions] = response;
            return response;
        }
        return this.metadataPromises[type][keyWithOptions];
    }
}
exports.default = new MetadataStore();
